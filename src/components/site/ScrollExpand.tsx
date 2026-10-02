import { motion, useScroll, useTransform, useReducedMotion, useSpring } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface ScrollExpandProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  startScale?: number;
  endScale?: number;
  startRotation?: number;
  endRotation?: number;
}

export function ScrollExpand({
  children,
  className,
  containerClassName,
  startScale = 0.85,
  endScale = 1,
  startRotation = -2,
  endRotation = 0,
}: ScrollExpandProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Transform values based on scroll progress
  // We want the expansion to happen as it comes into view (0 to 0.5)
  const scaleValue = useTransform(scrollYProgress, [0, 0.4], [startScale, endScale]);
  const rotateValue = useTransform(scrollYProgress, [0, 0.4], [startRotation, endRotation]);
  const opacityValue = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const yValue = useTransform(scrollYProgress, [0, 0.4], [60, 0]);

  // Smooth springs for better feel
  const scale = useSpring(scaleValue, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const rotate = useSpring(rotateValue, { stiffness: 100, damping: 30 });
  const opacity = useSpring(opacityValue, { stiffness: 100, damping: 30 });
  const y = useSpring(yValue, { stiffness: 100, damping: 30 });

  return (
    <div ref={containerRef} className={cn("relative w-full", containerClassName)}>
      <motion.div
        style={{
          scale: shouldReduceMotion ? 1 : scale,
          rotate: shouldReduceMotion ? 0 : rotate,
          opacity: shouldReduceMotion ? 1 : opacity,
          y: shouldReduceMotion ? 0 : y,
        }}
        className={cn("origin-center will-change-transform", className)}
      >
        {children}
      </motion.div>
    </div>
  );
}
