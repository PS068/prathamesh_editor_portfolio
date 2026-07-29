"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useAnimationFrame,
} from "framer-motion";

interface CursorState {
  isHovering: boolean;
  isOnPhoto: boolean;
  isOnVideo: boolean;
  isOnButton: boolean;
}

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring physics — outer ring lags behind for liquid feel
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const ringX = useSpring(cursorX, springConfig);
  const ringY = useSpring(cursorY, springConfig);

  const [state, setState] = useState<CursorState>({
    isHovering: false,
    isOnPhoto: false,
    isOnVideo: false,
    isOnButton: false,
  });

  const [visible, setVisible] = useState(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const isPhoto =
        el.closest("[data-cursor-photo]") !== null;
      const isVideo =
        el.closest("[data-cursor-video]") !== null;
      const isButton =
        el.closest("[data-cursor-button]") !== null ||
        el.tagName === "BUTTON" ||
        el.tagName === "A" ||
        el.closest("a") !== null ||
        el.closest("button") !== null;

      setState({
        isHovering: isPhoto || isVideo || isButton,
        isOnPhoto: isPhoto,
        isOnVideo: isVideo,
        isOnButton: isButton && !isPhoto && !isVideo,
      });
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(rafRef.current);
    };
  }, [cursorX, cursorY, visible]);

  // Determine ring size and style
  const ringSize = state.isOnPhoto
    ? 80
    : state.isOnVideo
    ? 64
    : state.isHovering
    ? 48
    : 32;

  const ringColor = state.isOnPhoto
    ? "rgba(220,38,38,0.6)"
    : state.isOnVideo
    ? "rgba(220,38,38,0.4)"
    : "rgba(255,255,255,0.15)";

  const dotSize = state.isHovering ? 4 : 6;

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null; // Hide on touch devices
  }

  return (
    <>
      {/* ── Outer Ring ─────────────────────────────────── */}
      <motion.div
        className="cursor-ring fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border flex items-center justify-center"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          width: ringSize,
          height: ringSize,
          borderColor: ringColor,
          borderWidth: state.isOnPhoto ? 2 : 1,
          boxShadow: state.isOnPhoto
            ? `0 0 20px rgba(220,38,38,0.5), inset 0 0 20px rgba(220,38,38,0.1)`
            : state.isOnVideo
            ? `0 0 12px rgba(220,38,38,0.3)`
            : "none",
          opacity: visible ? 1 : 0,
          mixBlendMode: state.isOnButton ? "difference" : "normal",
        }}
        animate={{
          width: ringSize,
          height: ringSize,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
      >
        {/* SCANNING label — only shown on photo */}
        {state.isOnPhoto && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="font-mono text-[9px] tracking-[0.2em] text-[#DC2626] select-none whitespace-nowrap"
          >
            SCANNING
          </motion.span>
        )}
        {/* PLAY label — shown on video */}
        {state.isOnVideo && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-mono text-[9px] tracking-[0.15em] text-white select-none"
          >
            ▶ PLAY
          </motion.span>
        )}
      </motion.div>

      {/* ── Inner Dot ──────────────────────────────────── */}
      <motion.div
        className="cursor-dot fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          width: dotSize,
          height: dotSize,
          backgroundColor: state.isOnPhoto
            ? "#DC2626"
            : state.isOnButton
            ? "#fff"
            : "#DC2626",
          opacity: visible ? 1 : 0,
          boxShadow: `0 0 ${state.isOnPhoto ? 12 : 6}px rgba(220,38,38,0.8)`,
        }}
        animate={{ width: dotSize, height: dotSize }}
        transition={{ type: "spring", damping: 30, stiffness: 400 }}
      />
    </>
  );
}
