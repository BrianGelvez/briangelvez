import { cn } from "@/lib/utils";

type TechBadgeProps = {
  label: string;
  highlight?: boolean;
};

export function TechBadge({ label, highlight = false }: TechBadgeProps) {
  return (
    <span
      className={cn(
        "rounded-full border px-4 py-2 text-sm text-foreground-secondary transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30 hover:text-accent",
        highlight
          ? "border-accent/22 bg-accent/10 text-accent shadow-[0_0_24px_rgba(0,255,136,0.12)]"
          : "border-white/8 bg-white/[0.03]",
      )}
    >
      {label}
    </span>
  );
}
