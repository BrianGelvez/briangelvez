"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDownRight, Sparkles } from "lucide-react";
import { MouseEvent, useCallback } from "react";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { Counter } from "@/components/ui/Counter";
import { ParticlesBackground } from "@/components/ui/ParticlesBackground";
import { useLenisScroll } from "@/components/ui/LenisProvider";
import { PERSONAL_INFO } from "@/lib/constants";

const heroEase: [number, number, number, number] = [0.22, 1, 0.36, 1];
const NAV_OFFSET = -80;

export function Hero() {
  const { scrollTo } = useLenisScroll();

  const handleAnchor = useCallback(
    (event: MouseEvent<HTMLAnchorElement>, href: string) => {
      if (!href.startsWith("#")) return;
      event.preventDefault();
      const el = document.getElementById(href.slice(1));
      if (!el) return;
      if (typeof window !== "undefined" && window.history?.pushState) {
        window.history.pushState(null, "", href);
      }
      scrollTo(el, { offset: NAV_OFFSET });
    },
    [scrollTo],
  );

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden pt-28"
    >
      <ParticlesBackground />
      <div className="section-shell relative z-10 grid gap-12 py-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: heroEase }}
            className="mb-6 inline-flex items-center gap-3 rounded-full border border-accent/15 bg-accent/6 px-4 py-2 text-xs uppercase tracking-[0.32em] text-accent"
          >
            <Sparkles size={14} />
            Programador Autodidacta
          </motion.div>

          <AnimatedText
            text={PERSONAL_INFO.heroHeadline}
            className="font-display text-5xl leading-[0.95] tracking-[-0.04em] text-foreground sm:text-6xl lg:text-6xl"
            accentWords={["Construyo", "reales", "negocios"]}
          />

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: heroEase, delay: 0.18 }}
            className="mt-6 max-w-2xl text-lg leading-8 text-foreground-secondary md:text-xl"
          >
            Tengo experiencia construyendo sistemas, integraciones y
            herramientas para proyectos con usuarios reales.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: heroEase, delay: 0.28 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <Link
              href="#projects"
              onClick={(event) => handleAnchor(event, "#projects")}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-accent/25 bg-accent px-6 py-4 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5"
            >
              Ver proyectos
              <ArrowDownRight size={18} />
            </Link>
            <Link
              href="#contact"
              onClick={(event) => handleAnchor(event, "#contact")}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-6 py-4 text-sm font-semibold text-foreground transition-colors hover:border-accent/35 hover:text-accent"
            >
              Contactame
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: heroEase, delay: 0.38 }}
            className="mt-12 grid gap-4 sm:grid-cols-3"
          >
            <Counter value={10} suffix=" +" label="Proyectos creados" />
            <Counter
              value={750}
              suffix=" +"
              label="conversaciones en producción"
            />
            <Counter value={2500} suffix=" +" label="personas alcanzadas" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: heroEase, delay: 0.2 }}
          className="relative"
        >
          <div className="panel-border section-grid grid-noise rounded-[2rem] p-5 sm:p-7">
            {/* <div className="absolute left-5 top-5 rounded-full border border-accent/20 bg-background/80 px-3 py-1 text-[10px] uppercase tracking-[0.32em] text-accent">
              En servicio
            </div> */}
            <div className="absolute right-6 top-6 hidden h-20 w-20 rounded-full bg-accent/12 blur-3xl sm:block" />
            <div className="relative overflow-hidden rounded-[1.5rem] border border-white/8 bg-[radial-gradient(circle_at_top,_rgba(0,255,136,0.14),_transparent_45%),linear-gradient(180deg,_rgba(255,255,255,0.05),_rgba(255,255,255,0.01))] p-4">
              <div className="mb-4 flex items-center justify-between rounded-2xl border border-white/7 bg-background/70 px-4 py-3">
                <div>
                  <p className="font-display text-sm tracking-[0.2em] italic text-accent">
                    briangelvez.exe
                  </p>
                  <p className="text-sm text-foreground-secondary">
                    Disciplina aplicada a productos reales
                  </p>
                </div>
                <div className="status-dot" />
              </div>

              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.4rem] border border-white/7 bg-[linear-gradient(160deg,_rgba(59,130,246,0.16),_transparent_38%),linear-gradient(180deg,_rgba(0,255,136,0.12),_rgba(10,10,15,0.2))]">
                <Image
                  src="/images/briangelvez.png"
                  alt="Retrato de Brian Gelvez, Full Stack Developer"
                  fill
                  priority
                  sizes="(min-width: 1024px) 32vw, (min-width: 640px) 42vw, 90vw"
                  className="object-cover object-top"
                />
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background via-background/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="font-display text-2xl text-foreground">
                    Brian Gelvez
                  </p>
                  <p className="mt-2 max-w-xs text-sm leading-6 text-foreground-secondary">
                    De la Compañía Comando 602 a deployar sistemas que hoy usan
                    personas reales.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
