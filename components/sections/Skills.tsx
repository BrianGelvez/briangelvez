import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TechBadge } from "@/components/ui/TechBadge";
import { SKILLS } from "@/lib/constants";

export function Skills() {
  return (
    <section id="skills" className="py-24 sm:py-28">
      <div className="section-shell space-y-10">
        <SectionHeader
          eyebrow="Tecnologías y herramientas"
          title="Mi stack de desarrollo"
          description="Este es el stack que utilizo en mi trabajo diario para construir aplicaciones web y resolver necesidades reales."
        />

        <div className="grid gap-5 lg:grid-cols-2">
          {Object.entries(SKILLS).map(([key, value], index) => (
            <ScrollReveal key={key} delay={index * 0.07}>
              <article className="section-grid rounded-[2rem] p-6">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.32em] text-accent">
                      {value.eyebrow}
                    </p>
                    <h3 className="mt-2 font-display text-2xl text-foreground">
                      {value.title}
                    </h3>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  {value.items.map((item) => (
                    <TechBadge key={item} label={item} highlight={item === "Next.js" || item === "NestJS" || item === "PostgreSQL" || item === "IA en Gnal."} />
                  ))}
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
