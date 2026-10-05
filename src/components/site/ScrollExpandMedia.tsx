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
  sideContent?: ReactNode;
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
  sideContent,
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
  const left = useTransform(scrollYProgress, [0, expansionEnd], ["4vw", "0vw"]);
  const sideOpacity = useTransform(scrollYProgress, [0, Math.min(0.3, expansionEnd)], [1, 0]);
  const sideX = useTransform(scrollYProgress, [0, Math.min(0.3, expansionEnd)], [0, 42]);

  return (
    <div
      ref={containerRef}
      className={cn("relative hidden h-[195vh] md:block", className)}
      aria-label="Clinic image"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 overflow-hidden bg-secondary shadow-[0_24px_70px_-28px_color-mix(in_oklab,var(--primary)_30%,transparent)]"
          style={reduceMotion ? { left: "4vw", width: `${startWidth}vw`, height: `${startHeight}vh`, borderRadius: startRadius } : { left, width, height, borderRadius }}
        >
          <motion.div className="size-full" style={reduceMotion ? undefined : { scale }}>
            {children}
          </motion.div>
        </motion.div>
        {sideContent && (
          <motion.div
            className="absolute right-[4vw] top-1/2 w-[38vw] max-w-xl -translate-y-1/2"
            style={reduceMotion ? undefined : { opacity: sideOpacity, x: sideX }}
            aria-hidden={reduceMotion ? undefined : false}
          >
            {sideContent}
          </motion.div>
        )}
      </div>
    </div>
  );
}