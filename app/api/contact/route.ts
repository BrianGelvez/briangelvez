import { NextResponse } from "next/server";
import { Resend } from "resend";
import { PERSONAL_INFO } from "@/lib/constants";

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  const body = (await request.json()) as ContactPayload;
  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Completá nombre, email y mensaje." },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "Ingresá un email válido." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const contactEmail = process.env.CONTACT_EMAIL ?? PERSONAL_INFO.email;

  if (!apiKey || !contactEmail) {
    return NextResponse.json(
      {
        error:
          "El formulario todavía no está configurado en el servidor. Usá el email o LinkedIn de contacto.",
      },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);

  await resend.emails.send({
    from: "Portfolio Brian Gelvez <onboarding@resend.dev>",
    to: [contactEmail],
    replyTo: email,
    subject: `Nuevo mensaje desde el portfolio de ${name}`,
    text: `Nombre: ${name}\nEmail: ${email}\n\n${message}`,
  });

  return NextResponse.json({ ok: true });
}
