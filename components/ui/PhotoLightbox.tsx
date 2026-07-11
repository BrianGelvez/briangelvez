"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { StoryPhoto } from "@/types";

const MOBILE_QUERY = "(max-width: 639px)";

function subscribeMediaQuery(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia(MOBILE_QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getIsMobileSnapshot(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia(MOBILE_QUERY).matches;
}

function useIsMobile(): boolean {
  return useSyncExternalStore(
    subscribeMediaQuery,
    getIsMobileSnapshot,
    () => false,
  );
}

function subscribeMounted(callback: () => void): () => void {
  callback();
  return () => {};
}

function useIsMounted(): boolean {
  return useSyncExternalStore(
    subscribeMounted,
    () => true,
    () => false,
  );
}

type PhotoLightboxProps = {
  photos: StoryPhoto[];
  initialIndex?: number;
  open: boolean;
  onClose: () => void;
  stageLabel?: string;
};

const SWIPE_THRESHOLD = 60;

export function PhotoLightbox({
  photos,
  initialIndex = 0,
  open,
  onClose,
  stageLabel,
}: PhotoLightboxProps) {
  const mounted = useIsMounted();
  const isMobile = useIsMobile();
  const [index, setIndex] = useState(initialIndex);
  const [loaded, setLoaded] = useState(false);
  const [direction, setDirection] = useState(0);
  const [prevOpen, setPrevOpen] = useState(open);
  const thumbsRef = useRef<HTMLDivElement>(null);

  if (prevOpen !== open) {
    setPrevOpen(open);
    if (open) {
      setIndex(initialIndex);
      setDirection(0);
    }
  }

  const goTo = useCallback(
    (i: number, dir: number) => {
      setDirection(dir);
      setLoaded(false);
      setIndex(i);
    },
    [],
  );

  const next = useCallback(() => {
    goTo((index + 1) % photos.length, 1);
  }, [goTo, index, photos.length]);

  const prev = useCallback(() => {
    goTo((index - 1 + photos.length) % photos.length, -1);
  }, [goTo, index, photos.length]);

  useEffect(() => {
    if (!open) return;

    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };

    document.addEventListener("keydown", handler);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, next, prev, onClose]);

  useEffect(() => {
    const el = thumbsRef.current?.querySelector<HTMLButtonElement>(
      `[data-thumb-index="${index}"]`,
    );
    el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [index]);

  const current = photos[index];

  if (!mounted) return null;

  const tree = (
    <AnimatePresence>
      {open && current ? (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col overflow-hidden bg-background/95 backdrop-blur-xl max-sm:h-[100dvh] max-sm:w-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          role="dialog"
          aria-modal="true"
          aria-label="Galería de fotos"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,255,136,0.08),transparent_60%)]" />

          <header className="relative z-10 flex items-center justify-between gap-4 px-4 pt-[max(1rem,env(safe-area-inset-top))] pb-3 sm:px-10 sm:py-5">
            <div className="flex items-center gap-3 min-w-0">
              <span className="status-dot shrink-0" />
              <div className="flex flex-col leading-tight min-w-0">
                {stageLabel ? (
                  <span className="truncate text-[10px] uppercase tracking-[0.3em] text-accent sm:text-[11px] sm:tracking-[0.32em]">
                    {stageLabel}
                  </span>
                ) : null}
                <span className="text-xs text-foreground-secondary sm:text-sm">
                  {index + 1}{" "}
                  <span className="text-foreground-secondary/50">/</span>{" "}
                  {photos.length}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-foreground-secondary transition-colors hover:border-accent/40 hover:text-accent sm:h-11 sm:w-11"
              aria-label="Cerrar galería"
            >
              <X size={18} />
            </button>
          </header>

          <div className="relative z-10 flex flex-1 min-h-0 items-center justify-center px-3 sm:px-10">
            {photos.length > 1 ? (
              <button
                type="button"
                onClick={prev}
                className="absolute left-3 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-foreground transition hover:border-accent/40 hover:text-accent sm:grid sm:left-6"
                aria-label="Foto anterior"
              >
                <ChevronLeft size={22} />
              </button>
            ) : null}

            <div className="relative flex h-full w-full max-w-6xl items-center justify-center">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.figure
                  key={current.src}
                  className="relative flex h-full w-full flex-col items-center justify-center touch-pan-y"
                  custom={direction}
                  variants={{
                    enter: (d: number) => ({
                      opacity: 0,
                      scale: 0.98,
                      x: d * 40,
                    }),
                    center: { opacity: 1, scale: 1, x: 0 },
                    leave: (d: number) => ({
                      opacity: 0,
                      scale: 0.98,
                      x: -d * 40,
                    }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="leave"
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  drag={photos.length > 1 ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.15}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -SWIPE_THRESHOLD) next();
                    else if (info.offset.x > SWIPE_THRESHOLD) prev();
                  }}
                >
                  <div className="relative flex w-full max-h-full items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] shadow-[0_40px_120px_-30px_rgba(0,255,136,0.25)] sm:rounded-[1.75rem]">
                    {!loaded ? (
                      <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-transparent" />
                    ) : null}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={current.src}
                      alt={current.alt}
                      draggable={false}
                      onLoad={() => setLoaded(true)}
                      className="pointer-events-none block max-h-[58vh] w-auto max-w-full object-contain select-none sm:max-h-[68vh]"
                    />
                  </div>

                  {current.caption ? (
                    <figcaption className="mt-3 mb-2 max-w-2xl px-3 text-center text-xs leading-relaxed text-foreground-secondary sm:mt-4 sm:text-sm">
                      {current.caption}
                    </figcaption>
                  ) : null}
                </motion.figure>
              </AnimatePresence>
            </div>

            {photos.length > 1 ? (
              <button
                type="button"
                onClick={next}
                className="absolute right-3 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-foreground transition hover:border-accent/40 hover:text-accent sm:grid sm:right-6"
                aria-label="Siguiente foto"
              >
                <ChevronRight size={22} />
              </button>
            ) : null}
          </div>

          {photos.length > 1 ? (
            <div className="relative z-10 flex items-center justify-center gap-4 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 sm:hidden">
              <button
                type="button"
                onClick={prev}
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-foreground transition active:scale-95 active:border-accent/40"
                aria-label="Foto anterior"
              >
                <ChevronLeft size={20} />
              </button>

              <div
                className="flex flex-1 items-center justify-center gap-1.5"
                role="tablist"
                aria-label="Seleccionar foto"
              >
                {photos.map((photo, i) => (
                  <button
                    key={photo.src}
                    type="button"
                    role="tab"
                    aria-selected={i === index}
                    aria-label={`Ir a foto ${i + 1}`}
                    onClick={() => goTo(i, i > index ? 1 : -1)}
                    className={`h-1.5 rounded-full transition-all ${
                      i === index
                        ? "w-6 bg-accent shadow-[0_0_10px_rgba(0,255,136,0.45)]"
                        : "w-1.5 bg-white/20"
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={next}
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-foreground transition active:scale-95 active:border-accent/40"
                aria-label="Siguiente foto"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          ) : null}

          {photos.length > 1 ? (
            <div
              ref={thumbsRef}
              className="relative z-10 hidden gap-3 overflow-x-auto px-10 pb-10 sm:flex sm:justify-center"
            >
              {photos.map((photo, i) => (
                <button
                  key={photo.src}
                  type="button"
                  data-thumb-index={i}
                  onClick={() => goTo(i, i > index ? 1 : -1)}
                  className={`relative aspect-[4/3] w-24 shrink-0 overflow-hidden rounded-xl border transition ${
                    i === index
                      ? "border-accent shadow-[0_0_0_2px_rgba(0,255,136,0.25)]"
                      : "border-white/10 opacity-55 hover:opacity-100"
                  }`}
                  aria-label={`Ver foto ${i + 1}`}
                  aria-current={i === index}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo.src}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          ) : null}

          <div className="pointer-events-none absolute bottom-2 left-1/2 hidden -translate-x-1/2 text-[11px] uppercase tracking-[0.32em] text-foreground-secondary/40 sm:block">
            Usá ← → · Esc para cerrar
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );

  return isMobile ? createPortal(tree, document.body) : tree;
}
