import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TimelineItem } from "@/components/ui/TimelineItem";
import { EXPERIENCE } from "@/lib/constants";

export function Experience() {
  return (
    <section id="experience" className="py-24 sm:py-28">
      <div className="section-shell space-y-10">
        <SectionHeader
          eyebrow="Experiencia"
          title="Donde aprendí a resolver problemas reales."
          description="No fue el camino más directo, arranqué desde cero y con pasión, y cada etapa me dejó algo que hoy aplico en mi trabajo."
        />

        <div className="relative ml-4 border-l border-white/8 pl-8 sm:ml-6 sm:pl-10">
          {EXPERIENCE.map((item, index) => (
            <ScrollReveal key={item.id} delay={index * 0.08}>
              <TimelineItem item={item} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
