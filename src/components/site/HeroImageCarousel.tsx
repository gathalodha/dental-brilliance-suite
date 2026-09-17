import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export type HeroCarouselImage = {
  id: string;
  image_url: string;
  alt_text?: string | null;
};

export function HeroImageCarousel({ images }: { images: HeroCarouselImage[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const hasMultiple = images.length > 1;

  useEffect(() => {
    if (activeIndex >= images.length) setActiveIndex(0);
  }, [activeIndex, images.length]);

  useEffect(() => {
    if (!hasMultiple || reduceMotion) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, 5500);
    return () => window.clearInterval(timer);
  }, [hasMultiple, images.length, reduceMotion]);

  const showNext = () => setActiveIndex((current) => (current + 1) % images.length);
  const showPrevious = () => setActiveIndex((current) => (current - 1 + images.length) % images.length);
  const activeImage = images[activeIndex];

  if (!activeImage) return null;

  return (
    <div className="relative h-[520px] overflow-hidden rounded-[2rem] shadow-[0_30px_80px_-30px_color-mix(in_oklab,var(--cocoa)_35%,transparent)] md:h-[640px]">
      <AnimatePresence initial={false} mode="popLayout">
        <motion.img
          key={activeImage.id}
          src={activeImage.image_url}
          alt={activeImage.alt_text || "Modern dental clinic"}
          className="absolute inset-0 size-full object-cover"
          initial={{ opacity: 0, x: reduceMotion ? 0 : "12%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: reduceMotion ? 0 : "-12%" }}
          transition={{ duration: reduceMotion ? 0.15 : 0.7, ease: [0.22, 1, 0.36, 1] }}
          drag={hasMultiple && !reduceMotion ? "x" : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.12}
          onDragEnd={(_, info) => {
            if (info.offset.x < -45) showNext();
            if (info.offset.x > 45) showPrevious();
          }}
        />
      </AnimatePresence>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-cocoa/25 via-transparent to-transparent" />

      {hasMultiple && (
        <>
          <div className="absolute inset-x-0 bottom-5 z-10 flex justify-center gap-2" aria-label="Choose carousel image">
            {images.map((image, index) => (
              <button
                key={image.id}
                type="button"
                aria-label={`Show image ${index + 1}`}
                aria-current={index === activeIndex}
                onClick={() => setActiveIndex(index)}
                className={`h-1.5 rounded-full shadow-sm transition-all ${index === activeIndex ? "w-6 bg-background" : "w-1.5 bg-background/60 hover:bg-background/90"}`}
              />
            ))}
          </div>
          <Button
            type="button"
            size="icon"
            variant="secondary"
            aria-label="Show next image"
            onClick={showNext}
            className="absolute bottom-4 right-4 z-20 size-9 rounded-full border border-background/60 bg-background/90 shadow-lg backdrop-blur hover:bg-background"
          >
            <ChevronDown className="size-4" />
          </Button>
        </>
      )}
    </div>
  );
}