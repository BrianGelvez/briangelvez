import { BriefcaseBusiness, Shield } from "lucide-react";
import { ExperienceItem } from "@/types";
import { TechBadge } from "@/components/ui/TechBadge";

type TimelineItemProps = {
  item: ExperienceItem;
};

export function TimelineItem({ item }: TimelineItemProps) {
  const Icon = item.type === "military" ? Shield : BriefcaseBusiness;

  return (
    <article className="relative mb-8">
      <div className="absolute -left-[3.375rem] top-8 grid h-11 w-11 place-items-center rounded-full border border-accent/18 bg-surface text-accent shadow-[0_0_25px_rgba(0,255,136,0.14)] sm:-left-[3.875rem]">
        <Icon size={18} />
      </div>

      <div className="section-grid rounded-[2rem] p-6 sm:p-8">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-accent">
              {item.period}
            </p>
            <h3 className="mt-3 font-display text-3xl text-foreground">
              {item.role}
            </h3>
            <p className="mt-2 text-lg text-foreground-secondary">
              {item.company} · {item.location}
            </p>
          </div>
          {item.highlight ? (
            <div className="rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-sm text-accent">
              {item.highlight}
            </div>
          ) : null}
        </div>

        <p className="mt-5 max-w-3xl text-base leading-8 text-foreground-secondary">
          {item.description}
        </p>

        {item.achievements ? (
          <div className="mt-6 grid gap-3">
            {item.achievements.map((achievement) => (
              <div
                key={achievement}
                className="rounded-[1.35rem] border border-white/8 bg-background/60 px-4 py-3 text-sm leading-7 text-foreground-secondary"
              >
                {achievement}
              </div>
            ))}
          </div>
        ) : null}

        <div className="mt-6 flex flex-wrap gap-3">
          {(item.stack ?? item.skills ?? []).map((skill) => (
            <TechBadge key={skill} label={skill} />
          ))}
        </div>
      </div>
    </article>
  );
}
