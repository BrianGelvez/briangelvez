import { NextResponse } from "next/server";
import { Resend } from "resend";
import { PERSONAL_INFO } from "@/lib/constants";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
  company?: string; // Honeypot: no debe venir con contenido
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const NAME_MIN = 2;
const NAME_MAX = 80;
const MESSAGE_MIN = 10;
const MESSAGE_MAX = 3000;

// Rate limiting simple en memoria (por IP). Para producción seria: Upstash / Redis.
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 3;
const rateLimitMap = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = rateLimitMap.get(ip) ?? [];
  const recent = hits.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  rateLimitMap.set(ip, recent);
  return recent.length > RATE_LIMIT_MAX;
}

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "unknown";
  return request.headers.get("x-real-ip") ?? "unknown";
}

function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return badRequest("El cuerpo del pedido no es un JSON válido.");
  }

  if (body.company && body.company.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!name || !email || !message) {
    return badRequest("Completá nombre, email y mensaje.");
  }

  if (name.length < NAME_MIN || name.length > NAME_MAX) {
    return badRequest("El nombre debe tener entre 2 y 80 caracteres.");
  }

  if (!EMAIL_REGEX.test(email) || email.length > 254) {
    return badRequest("Ingresá un email válido.");
  }

  if (message.length < MESSAGE_MIN || message.length > MESSAGE_MAX) {
    return badRequest(
      `El mensaje debe tener entre ${MESSAGE_MIN} y ${MESSAGE_MAX} caracteres.`,
    );
  }

  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Enviaste varios mensajes seguidos. Probá en un minuto." },
      { status: 429 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const contactEmail = process.env.CONTACT_EMAIL ?? PERSONAL_INFO.email;
  const fromEmail =
    process.env.RESEND_FROM_EMAIL ??
    "Portfolio Brian Gelvez <onboarding@resend.dev>";

  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY no está configurado");
    return NextResponse.json(
      {
        error:
          "El formulario está temporalmente fuera de servicio. Escribime a " +
          PERSONAL_INFO.email +
          " o por LinkedIn.",
      },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br/>");

  try {
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [contactEmail],
      replyTo: email,
      subject: `Nuevo mensaje desde el portfolio — ${name}`,
      text: `Nombre: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <div style="font-family: -apple-system, Segoe UI, Roboto, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; background:#0a0a0f; color:#f0f0f5;">
          <h2 style="margin:0 0 12px; color:#00ff88;">Nuevo mensaje desde el portfolio</h2>
          <p style="margin:0 0 6px;"><strong>Nombre:</strong> ${safeName}</p>
          <p style="margin:0 0 18px;"><strong>Email:</strong> <a href="mailto:${safeEmail}" style="color:#00ff88;">${safeEmail}</a></p>
          <div style="padding:16px; border:1px solid #1e1e2e; border-radius:12px; background:#111118; line-height:1.6;">
            ${safeMessage}
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json(
        {
          error:
            "No pude enviar el mensaje ahora. Probá en unos minutos o escribime directo por email/LinkedIn.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json(
      {
        error:
          "Hubo un problema en el servidor. Probá en unos minutos o escribime por email/LinkedIn.",
      },
      { status: 500 },
    );
  }
}
