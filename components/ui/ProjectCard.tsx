import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, GitBranch, Globe } from "lucide-react";
import { Project } from "@/types";
import { TechBadge } from "@/components/ui/TechBadge";

type ProjectCardProps = {
  project: Project;
  featured?: boolean;
};

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  return (
    <article className="panel-border section-grid group rounded-[2rem] p-6 sm:p-7">
      <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-white/8">
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          sizes="(min-width: 1280px) 40vw, (min-width: 640px) 80vw, 92vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {project.status === "production" ? (
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-accent">
            <span className="status-dot" />
            Producción
          </span>
        ) : (
          <span className="rounded-full border border-blue/20 bg-blue/10 px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-blue">
            Cliente
          </span>
        )}
        {featured ? (
          <span className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-foreground-secondary">
            Destacado
          </span>
        ) : null}
      </div>

      <div className="mt-6 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-accent">
            {project.subtitle}
          </p>
          <h3 className="mt-3 font-display text-3xl text-foreground">
            {project.title}
          </h3>
        </div>
        {project.liveUrl ? (
          <Link
            href={project.liveUrl}
            target="_blank"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/8 bg-white/[0.04] text-foreground-secondary hover:border-accent/25 hover:text-accent"
          >
            <ArrowUpRight size={18} />
          </Link>
        ) : null}
      </div>

      <p className="mt-4 max-w-2xl text-base leading-8 text-foreground-secondary">
        {project.description}
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        {project.liveUrl ? (
          <Link
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-4 py-2 text-sm text-accent transition hover:border-accent/40 hover:bg-accent/15"
          >
            <Globe size={16} />
            Ver web
          </Link>
        ) : null}
        {project.githubUrl ? (
          <Link
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-foreground-secondary transition hover:border-white/20 hover:text-foreground"
          >
            <GitBranch size={16} />
            GitHub
          </Link>
        ) : null}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        {project.stack.map((item) => (
          <TechBadge key={item} label={item} />
        ))}
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {project.metrics.map((metric) => (
          <div
            key={metric}
            className="rounded-[1.25rem] border border-white/8 bg-background/60 px-4 py-3 text-sm text-foreground-secondary"
          >
            {metric}
          </div>
        ))}
      </div>
    </article>
  );
}
