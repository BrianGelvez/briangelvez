"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type AnimatedTextProps = {
  text: string;
  className?: string;
  accentWords?: string[];
};

export function AnimatedText({
  text,
  className,
  accentWords = [],
}: AnimatedTextProps) {
  const words = text.split(" ");

  return (
    <motion.h1
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08 } },
      }}
      className={className}
    >
      {words.map((word, index) => {
        const cleanWord = word.replace(/[.,]/g, "");
        const accent = accentWords.includes(cleanWord);

        return (
          <motion.span
            key={`${word}-${index}`}
            variants={{
              hidden: { opacity: 0, y: 36 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
              },
            }}
            className={cn("mr-[0.22em] inline-block", accent && "text-gradient")}
          >
            {word}
          </motion.span>
        );
      })}
    </motion.h1>
  );
}
