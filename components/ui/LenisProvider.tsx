"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import Lenis from "lenis";

type ScrollTarget = string | number | HTMLElement;

type ScrollOptions = {
  offset?: number;
  immediate?: boolean;
};

type LenisContextValue = {
  scrollTo: (target: ScrollTarget, options?: ScrollOptions) => void;
};

const LenisContext = createContext<LenisContextValue | null>(null);

export function useLenisScroll(): LenisContextValue {
  const ctx = useContext(LenisContext);
  if (ctx) return ctx;

  return {
    scrollTo: (target, options) => {
      if (typeof window === "undefined") return;
      const behavior: ScrollBehavior = "smooth";
      const offset = options?.offset ?? 0;

      if (typeof target === "number") {
        window.scrollTo({ top: target + offset, behavior });
        return;
      }
      const el =
        target instanceof HTMLElement
          ? target
          : document.querySelector<HTMLElement>(target);
      if (!el) return;
      const y = el.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top: y, behavior });
    },
  };
}

type LenisProviderProps = {
  children: ReactNode;
};

export function LenisProvider({ children }: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = mediaQuery.matches;
    if (mediaQuery.matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      syncTouch: false,
    });
    lenisRef.current = lenis;

    let frame = 0;
    function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo = useCallback<LenisContextValue["scrollTo"]>(
    (target, options) => {
      const lenis = lenisRef.current;
      const offset = options?.offset ?? 0;

      if (lenis) {
        lenis.scrollTo(target, {
          offset,
          immediate: options?.immediate,
        });
        return;
      }

      if (typeof window === "undefined") return;
      const behavior: ScrollBehavior = reducedMotionRef.current
        ? "auto"
        : "smooth";

      if (typeof target === "number") {
        window.scrollTo({ top: target + offset, behavior });
        return;
      }
      const el =
        target instanceof HTMLElement
          ? target
          : document.querySelector<HTMLElement>(target);
      if (!el) return;
      const y = el.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top: y, behavior });
    },
    [],
  );

  return (
    <LenisContext.Provider value={{ scrollTo }}>
      {children}
    </LenisContext.Provider>
  );
}
