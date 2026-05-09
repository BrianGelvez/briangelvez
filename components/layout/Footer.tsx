import Link from "next/link";
import { GitBranch, Link as LinkIcon, Mail } from "lucide-react";
import { PERSONAL_INFO } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-white/6 py-10">
      <div className="section-shell flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-lg text-foreground">{PERSONAL_INFO.name}</p>
          <p className="text-sm text-foreground-secondary">
            Hecho con Next.js, TypeScript y una mentalidad de producción.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-foreground-secondary">
          <Link href={PERSONAL_INFO.github} target="_blank" className="inline-flex items-center gap-2 hover:text-accent">
            <GitBranch size={16} />
            GitHub
          </Link>
          <Link href={PERSONAL_INFO.linkedin} target="_blank" className="inline-flex items-center gap-2 hover:text-accent">
            <LinkIcon size={16} />
            LinkedIn
          </Link>
          <Link href={`mailto:${PERSONAL_INFO.email}`} className="inline-flex items-center gap-2 hover:text-accent">
            <Mail size={16} />
            Email
          </Link>
        </div>
      </div>
    </footer>
  );
}
