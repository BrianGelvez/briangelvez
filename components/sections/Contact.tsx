"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { GitBranch, Link as LinkIcon, Mail, Send } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PERSONAL_INFO } from "@/lib/constants";

type FormState = {
  name: string;
  email: string;
  message: string;
  company: string; // honeypot anti-bots (invisible)
};

const initialState: FormState = {
  name: "",
  email: "",
  message: "",
  company: "",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Contact() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<{
    type: "idle" | "success" | "error" | "loading";
    message?: string;
  }>({ type: "idle" });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();

    if (!name || !email || !message) {
      setStatus({
        type: "error",
        message: "Completá nombre, email y mensaje.",
      });
      return;
    }
    if (!EMAIL_REGEX.test(email)) {
      setStatus({
        type: "error",
        message: "Ingresá un email válido.",
      });
      return;
    }
    if (message.length < 10) {
      setStatus({
        type: "error",
        message: "Contame un poco más — al menos 10 caracteres.",
      });
      return;
    }

    setStatus({ type: "loading" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          company: form.company,
        }),
      });

      const data = (await response
        .json()
        .catch(() => ({}))) as { error?: string };

      if (!response.ok) {
        setStatus({
          type: "error",
          message:
            data.error ??
            "No pude enviar el mensaje. Probá de nuevo o escribime por email/LinkedIn.",
        });
        return;
      }

      setStatus({
        type: "success",
        message: "Mensaje enviado. Si hay match, seguimos la conversación.",
      });
      setForm(initialState);
    } catch {
      setStatus({
        type: "error",
        message: "Hubo un problema de red. Probá nuevamente en unos minutos.",
      });
    }
  }

  return (
    <section id="contact" className="py-24 sm:py-28">
      <div className="section-shell space-y-10">
        <SectionHeader
          eyebrow="Conectemos"
          title="Este portfolio es mi CV. Si llegaste hasta acá, es por algo."
          description="Estoy abierto a nuevas oportunidades, desafíos tecnológicos y trabajar con equipos que valoran disciplina, criterio y ejecución."
        />

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <ScrollReveal>
            <aside className="section-grid rounded-[2rem] p-6 sm:p-8">
              <p className="font-display text-3xl leading-tight text-foreground">
                ¿Trabajamos juntos?
              </p>
              <p className="mt-4 max-w-md text-base leading-8 text-foreground-secondary">
                Busco proyectos donde pueda aportar ejecución, foco en producto y
                criterio técnico. Diferente camino. La misma mentalidad.
              </p>

              <div className="mt-8 space-y-4">
                <Link
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-4 text-sm text-foreground-secondary hover:border-accent/35 hover:text-accent"
                >
                  <Mail size={18} />
                  {PERSONAL_INFO.email}
                </Link>
                <Link
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-4 text-sm text-foreground-secondary hover:border-accent/35 hover:text-accent"
                >
                  <GitBranch size={18} />
                  GitHub
                </Link>
                <Link
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-4 text-sm text-foreground-secondary hover:border-accent/35 hover:text-accent"
                >
                  <LinkIcon size={18} />
                  LinkedIn
                </Link>
              </div>
            </aside>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <form
              onSubmit={onSubmit}
              noValidate
              className="section-grid rounded-[2rem] p-6 sm:p-8"
              aria-describedby="contact-status"
            >
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: "-10000px",
                  top: "auto",
                  width: "1px",
                  height: "1px",
                  overflow: "hidden",
                }}
              >
                <label>
                  Empresa
                  <input
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.company}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        company: event.target.value,
                      }))
                    }
                  />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 text-sm text-foreground-secondary">
                  Nombre
                  <input
                    name="name"
                    autoComplete="name"
                    value={form.name}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, name: event.target.value }))
                    }
                    className="w-full rounded-2xl border border-white/8 bg-background/80 px-4 py-3 text-foreground outline-none ring-0 placeholder:text-foreground-muted focus:border-accent/40"
                    placeholder="Tu nombre"
                    maxLength={80}
                    required
                  />
                </label>
                <label className="space-y-2 text-sm text-foreground-secondary">
                  Email
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    inputMode="email"
                    value={form.email}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, email: event.target.value }))
                    }
                    className="w-full rounded-2xl border border-white/8 bg-background/80 px-4 py-3 text-foreground outline-none ring-0 placeholder:text-foreground-muted focus:border-accent/40"
                    placeholder="tu@email.com"
                    maxLength={254}
                    required
                  />
                </label>
              </div>

              <label className="mt-4 block space-y-2 text-sm text-foreground-secondary">
                Mensaje
                <textarea
                  name="message"
                  value={form.message}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, message: event.target.value }))
                  }
                  rows={6}
                  maxLength={3000}
                  className="w-full resize-none rounded-[1.5rem] border border-white/8 bg-background/80 px-4 py-3 text-foreground outline-none placeholder:text-foreground-muted focus:border-accent/40"
                  placeholder="Contame qué necesitás y vemos si tiene sentido trabajar juntos."
                  required
                />
              </label>

              <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  disabled={status.type === "loading"}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-accent/25 bg-accent px-6 py-4 text-sm font-semibold text-background transition-colors disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status.type === "loading" ? "Enviando..." : "Enviar mensaje"}
                  <Send size={16} />
                </button>
                <p
                  id="contact-status"
                  aria-live="polite"
                  role="status"
                  className={`text-sm ${
                    status.type === "error"
                      ? "text-danger"
                      : status.type === "success"
                        ? "text-accent"
                        : "text-foreground-secondary"
                  }`}
                >
                  {status.message ?? "Respuesta rápida por email o LinkedIn."}
                </p>
              </div>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
