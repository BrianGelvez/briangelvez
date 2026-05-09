"use client";

import { useState } from "react";
import { Images } from "lucide-react";
import type { StoryStage } from "@/types";
import { PhotoLightbox } from "@/components/ui/PhotoLightbox";

type StoryStageItemProps = {
  stage: StoryStage;
  index: number;
};

export function StoryStageItem({ stage, index }: StoryStageItemProps) {
  const [open, setOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const hasPhotos = stage.photos.length > 0;
  const previews = stage.photos.slice(0, 3);

  const openAt = (i: number) => {
    setStartIndex(i);
    setOpen(true);
  };

  return (
    <div className="relative pl-8">
      <div className="absolute left-0 top-2 h-full w-px bg-gradient-to-b from-accent via-blue/40 to-transparent" />
      <div className="absolute left-[-6px] top-2 h-3.5 w-3.5 rounded-full border border-accent/50 bg-background" />

      <p className="mb-2 text-xs uppercase tracking-[0.32em] text-accent">
        Etapa {index + 1}
      </p>
      <h3 className="font-display text-2xl text-foreground">{stage.title}</h3>
      <p className="mt-3 max-w-2xl text-base leading-8 text-foreground-secondary">
        {stage.description}
      </p>

      {hasPhotos ? (
        <div className="mt-5 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={() => openAt(0)}
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-accent/25 bg-accent/8 px-5 py-2.5 text-sm text-foreground transition hover:border-accent/50 hover:bg-accent/12"
            aria-label={`Ver ${stage.photos.length} fotos de ${stage.title}`}
          >
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-accent/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="grid h-7 w-7 place-items-center rounded-full border border-accent/30 bg-accent/15 text-accent">
              <Images size={14} />
            </span>
            <span className="font-medium">Ver fotos</span>
            <span className="rounded-full border border-white/10 bg-background/60 px-2 py-0.5 text-[11px] text-foreground-secondary">
              {stage.photos.length}
            </span>
          </button>

          <div className="flex -space-x-3">
            {previews.map((photo, i) => (
              <button
                key={photo.src}
                type="button"
                onClick={() => openAt(i)}
                className="relative h-11 w-11 overflow-hidden rounded-full border-2 border-background bg-surface transition hover:z-10 hover:scale-110"
                aria-label={`Ver foto ${i + 1}`}
                style={{ zIndex: previews.length - i }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.src}
                  alt=""
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <PhotoLightbox
        photos={stage.photos}
        initialIndex={startIndex}
        open={open}
        onClose={() => setOpen(false)}
        stageLabel={`Etapa ${index + 1}`}
      />
    </div>
  );
}
