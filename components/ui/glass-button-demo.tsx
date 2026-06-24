"use client";

import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { GlassButton } from "@/components/ui/apple-tahoe-liquid-glass-button";
import { Zap } from "lucide-react";

export default function GlassButtonDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonWrapperRef = useRef<HTMLDivElement>(null);

  // Cursor position, smoothed with spring physics so the button trails the pointer.
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (containerRef.current && buttonWrapperRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const buttonRect = buttonWrapperRef.current.getBoundingClientRect();
      cursorX.set(containerRect.width / 2 - buttonRect.width / 2);
      cursorY.set(containerRect.height / 2 - buttonRect.height / 2);
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!buttonWrapperRef.current) return;
      const buttonRect = buttonWrapperRef.current.getBoundingClientRect();
      cursorX.set(e.clientX - buttonRect.width / 2);
      cursorY.set(e.clientY - buttonRect.height / 2);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY]);

  return (
    <div
      ref={containerRef}
      className="relative flex h-screen w-full overflow-hidden bg-black"
    >
      {/* Vibrant background so the refraction is visible (known-good Unsplash photo). */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1620121692029-d088224ddc74?auto=format&fit=crop&w=2400&q=80')",
        }}
      />

      <motion.div
        ref={buttonWrapperRef}
        className="absolute left-0 top-0 z-10"
        style={{ x: smoothX, y: smoothY }}
      >
        <GlassButton size="default" contentClassName="flex items-center gap-2">
          <span>Generate</span>
          <Zap className="h-5 w-5" />
        </GlassButton>
      </motion.div>
    </div>
  );
}
