"use client";

import { motion } from "framer-motion";

const dots = Array.from({ length: 22 }, (_, index) => ({
  id: index,
  width: 4 + (index % 4) * 2,
  left: `${(index * 13) % 100}%`,
  top: `${(index * 17) % 100}%`,
  duration: 5 + (index % 5),
  delay: index * 0.12,
}));

export function ParticlesBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_30%),radial-gradient(circle_at_20%_25%,_rgba(0,255,136,0.16),_transparent_30%),linear-gradient(180deg,_rgba(10,10,15,0.65),_rgba(10,10,15,1))]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:56px_56px] opacity-20" />
      {dots.map((dot) => (
        <motion.span
          key={dot.id}
          className="absolute rounded-full bg-accent/80 blur-[1px]"
          style={{
            width: dot.width,
            height: dot.width,
            left: dot.left,
            top: dot.top,
          }}
          animate={{
            y: [0, -18, 0],
            opacity: [0.2, 0.9, 0.2],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: dot.duration,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: dot.delay,
          }}
        />
      ))}
      <motion.div
        className="absolute left-1/2 top-0 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]"
        animate={{ opacity: [0.32, 0.5, 0.32], scale: [1, 1.1, 1] }}
        transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
    </div>
  );
}
