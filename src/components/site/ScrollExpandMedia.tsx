import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type ScrollExpandMediaProps = {
  children: ReactNode;
  className?: string;
  startWidth?: number;
  startHeight?: number;
  startRadius?: number;
  endRadius?: number;
  mediaZoom?: number;
  scrollDistance?: number;
  holdDistance?: number;
};

export function ScrollExpandMedia({
  children,
  className,
  startWidth = 70,
  startHeight = 70,
  startRadius = 28,
  endRadius = 0,
  mediaZoom = 1.2,
  scrollDistance = 1,
  holdDistance = 0.25,
}: ScrollExpandMediaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const expansionEnd = scrollDistance / (scrollDistance + holdDistance);
  const width = useTransform(scrollYProgress, [0, expansionEnd], [`${startWidth}vw`, "100vw"]);
  const height = useTransform(scrollYProgress, [0, expansionEnd], [`${startHeight}vh`, "100vh"]);
  const borderRadius = useTransform(scrollYProgress, [0, expansionEnd], [startRadius, endRadius]);
  const scale = useTransform(scrollYProgress, [0, expansionEnd], [mediaZoom, 1]);

  return (
    <div
      ref={containerRef}
      className={cn("relative hidden h-[195vh] md:block", className)}
      aria-label="Clinic image"
    >
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <motion.div
          className="relative overflow-hidden bg-secondary shadow-[0_24px_70px_-28px_color-mix(in_oklab,var(--primary)_30%,transparent)]"
          style={reduceMotion ? { width: "70vw", height: "70vh", borderRadius: startRadius } : { width, height, borderRadius }}
        >
          <motion.div className="size-full" style={reduceMotion ? undefined : { scale }}>
            {children}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}