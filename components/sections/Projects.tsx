import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { PROJECTS } from "@/lib/constants";

export function Projects() {
  return (
    <section id="projects" className="py-24 sm:py-28">
      <div className="section-shell space-y-10">
        <SectionHeader
          eyebrow="En producción"
          title="Sistemas que ya están haciendo trabajo real"
          description="Estos proyectos no nacieron para decorar un portfolio. Fueron creados para resolver problemas concretos de clientes, equipos y usuarios."
        />

        <div className="grid gap-5 xl:grid-cols-2">
          {PROJECTS.map((project, index) => (
            <ScrollReveal key={project.id} delay={index * 0.08}>
              <ProjectCard project={project} featured={index === 0} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
