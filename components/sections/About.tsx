import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StoryStageItem } from "@/components/ui/StoryStageItem";
import { STORY_STAGES, VALUES } from "@/lib/constants";

export function About() {
  return (
    <section id="about" className="py-24 sm:py-28">
      <div className="section-shell space-y-10">
        <SectionHeader
          eyebrow="Mi historia"
          title="Mi recorrido."
          description="Mi camino hacia el desarrollo no fue lineal. Antes de trabajar en software, pasé por una etapa de formación muy distinta que hoy también forma parte de cómo trabajo."
        />

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <ScrollReveal>
            <article className="section-grid grid-noise rounded-[2rem] p-6 sm:p-8">
              <div className="space-y-8">
                {STORY_STAGES.map((stage, index) => (
                  <StoryStageItem
                    key={stage.id}
                    stage={stage}
                    index={index}
                  />
                ))}
              </div>
            </article>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <aside className="grid gap-4">
              {VALUES.map((value) => (
                <article
                  key={value.title}
                  className="section-grid rounded-[1.75rem] p-5 transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="mb-2 inline-flex rounded-2xl border border-accent/15 bg-accent/8 p-3 text-accent">
                    <value.icon size={20} />
                  </div>
                  <h3 className="font-display text-xl text-foreground mb-1">
                    {value.title}
                  </h3>
                  <p className="text-sm leading-5 text-foreground-secondary">
                    {value.description}
                  </p>
                </article>
              ))}
            </aside>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
