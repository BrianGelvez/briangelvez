"use client";

import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type CounterProps = {
  value: number;
  label: string;
  suffix?: string;
};

export function Counter({ value, label, suffix = "" }: CounterProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 1200;
    const start = performance.now();
    let frame = 0;

    const step = (timestamp: number) => {
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(Math.round(progress * value));

      if (progress < 1) {
        frame = requestAnimationFrame(step);
      }
    };

    frame = requestAnimationFrame(step);

    return () => cancelAnimationFrame(frame);
  }, [isInView, value]);

  return (
    <div ref={ref} className="section-grid rounded-[1.5rem] p-5">
      <p className="font-display text-4xl text-foreground">
        {count}
        {suffix}
      </p>
      <p className="mt-2 text-sm uppercase tracking-[0.24em] text-foreground-secondary">
        {label}
      </p>
    </div>
  );
}
