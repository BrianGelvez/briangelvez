type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
}: SectionHeaderProps) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs uppercase tracking-[0.32em] text-accent">{eyebrow}</p>
      <h2 className="mt-4 font-display text-4xl leading-tight tracking-[-0.03em] text-foreground sm:text-5xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-8 text-foreground-secondary sm:text-lg">
        {description}
      </p>
    </div>
  );
}
