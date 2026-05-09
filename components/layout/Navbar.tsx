"use client";

import Link from "next/link";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NAV_ITEMS, PERSONAL_INFO } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("hero");
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) =>
      document.getElementById(item.href.slice(1)),
    ).filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) {
          setActive(visible.target.id);
        }
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: [0.2, 0.45, 0.7] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    return scrollY.on("change", (value) => setScrolled(value > 18));
  }, [scrollY]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "py-3" : "py-5",
      )}
    >
      <div
        className={cn(
          "section-shell flex items-center justify-between rounded-full border px-4 py-3 md:px-6",
          scrolled
            ? "border-white/10 bg-[rgba(10,10,15,0.72)] backdrop-blur-xl"
            : "border-transparent bg-transparent",
        )}
      >
        <Link href="#hero" className="group flex items-center gap-3">
          <span className="relative grid h-12 w-12 place-items-center rounded-2xl border border-accent/20 bg-surface text-sm font-semibold text-accent shadow-[0_0_25px_rgba(0,255,136,0.16)]">
            <span className="font-display text-lg">BG</span>
            <span className="absolute right-[0.52rem] h-4 w-px bg-accent/90 animate-[blink_1s_steps(2,end)_infinite]" />
          </span>
          <div className="hidden sm:block">
            <p className="font-display text-sm uppercase tracking-[0.28em] text-foreground">
              {PERSONAL_INFO.name}
            </p>
            <p className="text-xs text-foreground-secondary">
              {PERSONAL_INFO.tagline}
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-white/5  p-1 md:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.href.slice(1);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm text-foreground-secondary",
                  isActive && "bg-white/6 text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((current) => !current)}
          className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-surface text-foreground md:hidden"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="section-shell mt-3 rounded-[2rem] border border-white/10 bg-[rgba(10,10,15,0.95)] p-5 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-2">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-3 text-sm text-foreground-secondary"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
