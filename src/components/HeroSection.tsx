"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";

/* ─── Stagger letter animation helper ────────────────── */
const letterVariants = {
  hidden: { opacity: 0, y: 60, rotateX: -40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

const subtitleVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 1.2 },
  },
};

const wordVariant = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
} as const;

/* ─── Scan-line reveal component ─────────────────────── */
function ScanReveal({ onComplete }: { onComplete: () => void }) {
  return (
    <motion.div
      className="absolute inset-0 z-20 pointer-events-none"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 1.8, duration: 0.5 }}
    >
      {/* Black mask that shrinks away revealing the photo */}
      <motion.div
        className="absolute inset-0 bg-black origin-top"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{
          duration: 1.2,
          ease: [0.77, 0, 0.175, 1],
          delay: 0.3,
        }}
        onAnimationComplete={onComplete}
      />
      {/* Red laser line */}
      <motion.div
        className="absolute left-0 right-0 h-[1.5px] z-10"
        style={{
          background:
            "linear-gradient(90deg, transparent, #DC2626, #ff6b6b, #DC2626, transparent)",
          boxShadow:
            "0 0 8px 1px rgba(220,38,38,0.45), 0 0 16px 2px rgba(220,38,38,0.15)",
        }}
        initial={{ top: "0%" }}
        animate={{ top: "100%" }}
        transition={{
          duration: 1.2,
          ease: [0.77, 0, 0.175, 1],
          delay: 0.3,
        }}
      />
    </motion.div>
  );
}

/* ─── B&W Blend mask canvas ──────────────────────────── */
function BlendCanvas({
  mouseX,
  mouseY,
  containerRef,
}: {
  mouseX: number;
  mouseY: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = container.getBoundingClientRect();
    const relX = mouseX - rect.left;
    const relY = mouseY - rect.top;

    canvas.width = rect.width;
    canvas.height = rect.height;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Soft red glow instead of a darkening mask
    const radius = 54;
    const glowGrad = ctx.createRadialGradient(relX, relY, 0, relX, relY, radius);
    glowGrad.addColorStop(0, "rgba(220,38,38,0.14)");
    glowGrad.addColorStop(0.5, "rgba(220,38,38,0.03)");
    glowGrad.addColorStop(1, "rgba(255,255,255,0)");

    ctx.fillStyle = glowGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle edge highlight at cursor position
    ctx.globalCompositeOperation = "source-over";
    ctx.strokeStyle = "rgba(255,255,255,0.14)";
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.arc(relX, relY, radius * 0.55, 0, Math.PI * 2);
    ctx.stroke();
  }, [mouseX, mouseY, containerRef]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
      style={{ mixBlendMode: "screen" }}
    />
  );
}

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scanDone, setScanDone] = useState(false);
  const [isOnPhoto, setIsOnPhoto] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Parallax motion values for the photo
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 80, damping: 20 });
  const springY = useSpring(rawY, { stiffness: 80, damping: 20 });
  const photoX = useTransform(springX, [-1, 1], [-12, 12]);
  const photoY = useTransform(springY, [-1, 1], [-12, 12]);

  const handlePhotoMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    rawX.set(nx);
    rawY.set(ny);
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  // ── Display text ──────────────────────────────────────
  // UPDATE: Replace with your actual name
  const displayName = "PRATHAMESH SUTAR";
  const subtitleWords = ["EDITOR", "/", "VIDEOGRAPHER", "/", "CINEMATOGRAPHER"];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden border-[10px] [border-color:transparent]"
    >
      {/* ── Radial gradient backdrop ─────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(220,38,38,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Zoomed background photo (visible on hover) filling the whole screen */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        initial={{ opacity: 0, scale: 1 }}
        animate={{
          opacity: isOnPhoto ? 0.12 : 0,
          scale: isOnPhoto ? 1.05 : 1,
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Image
          src="/my-photo.jpg"
          alt="Full Screen Background"
          fill
          className="object-cover object-top blur-[4px]"
        />
      </motion.div>

      {/* ── Corner labels ────────────────────────────── */}
      <motion.div
        className="absolute top-16 left-8 font-mono text-[10px] tracking-[0.25em] text-white/30 hidden md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
      >
        {/* UPDATE: your initials or location */}
        PORTFOLIO — 2026
      </motion.div>
      <motion.div
        className="absolute top-16 right-8 font-mono text-[10px] tracking-[0.25em] text-white/30 hidden md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
      >
        {/* UPDATE: your tagline */}
        TIME · LIGHT · TRUTH
      </motion.div>

      {/* ── Main content grid ─────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center gap-10 px-6 text-center">
        {/* ── Display title ─────────────────────────── */}
        <div className="overflow-hidden" style={{ perspective: 800 }}>
          <motion.h1
            className="font-display text-[clamp(3rem,10vw,9rem)] leading-none tracking-wider"
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.04, delayChildren: 1.8 } } }}
          >
            {displayName.split("").map((char, i) => (
              <motion.span
                key={i}
                className="inline-block"
                custom={i}
                variants={letterVariants}
                style={{
                  color: char === " " ? "transparent" : "#fff",
                  marginRight: char === " " ? "0.25em" : undefined,
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>
        </div>

        {/* ── Portrait Centerpiece ───────────────────── */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 18, delay: 0.2 }}
          className="relative"
        >
          {/* Photo container */}
          <motion.div
            ref={containerRef}
            data-cursor-photo
            className="relative w-[240px] h-[300px] md:w-[280px] md:h-[360px] overflow-hidden rounded-[4px] border border-[#DC2626]/[0.25]"
            style={{
              x: photoX,
              y: photoY,
            }}
            animate={{
              boxShadow: isOnPhoto
                ? "0 0 0 1px rgba(220,38,38,0.35), 0 0 24px rgba(220,38,38,0.14)"
                : "0 0 0 1px rgba(220,38,38,0.25)",
              borderColor: isOnPhoto ? "rgba(220,38,38,0.5)" : "rgba(220,38,38,0.25)",
            }}
            transition={{ duration: 0.3 }}
            onMouseMove={handlePhotoMouseMove}
            onMouseEnter={() => setIsOnPhoto(true)}
            onMouseLeave={() => {
              setIsOnPhoto(false);
              rawX.set(0);
              rawY.set(0);
            }}
          >
            {/* ── Portrait image ─────────────────────── */}
            {/* UPDATE: Replace /my-photo.jpg with your actual portrait image */}
            <Image
              src="/my-photo.jpg"
              alt="Portrait" // UPDATE: your name
              fill
              className="object-cover object-top"
              style={{
                filter: isOnPhoto
                  ? "contrast(1.05) brightness(1.03) saturate(1.05)"
                  : "contrast(1) brightness(1)",
                transition: "filter 0.3s ease",
              }}
              priority
            />

            {/* B&W blend mask on hover */}
            {isOnPhoto && (
              <BlendCanvas
                mouseX={mousePos.x}
                mouseY={mousePos.y}
                containerRef={containerRef}
              />
            )}

            {/* Scanlines always on photo */}
            <div className="scanlines" />

            {/* B&W overlay (grayscale) that the mask reveals */}
            {isOnPhoto && (
              <div
                className="absolute inset-0 pointer-events-none z-[5]"
                style={{
                  backgroundImage: `url(/my-photo.jpg)`, // UPDATE
                  backgroundSize: "cover",
                  backgroundPosition: "center top",
                  filter: "grayscale(0.25) contrast(1.08) brightness(1.05)",
                  mixBlendMode: "screen",
                  opacity: isOnPhoto ? 0.2 : 0,
                }}
              />
            )}

            {/* Glitch overlay — randomly flickers */}
            {isOnPhoto && (
              <motion.div
                className="absolute inset-0 z-[8] pointer-events-none"
                style={{
                  backgroundImage: `url(/my-photo.jpg)`, // UPDATE
                  backgroundSize: "cover",
                  backgroundPosition: "center top",
                  filter: "hue-rotate(180deg) saturate(2) contrast(1.4)",
                  animation: "glitch 0.4s steps(5) infinite",
                  opacity: isOnPhoto ? 0.04 : 0,
                }}
              />
            )}

            {/* Red corner accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#DC2626] z-20" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#DC2626] z-20" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#DC2626] z-20" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#DC2626] z-20" />

            {/* Cinematic scan-line reveal on load */}
            {!scanDone && (
              <ScanReveal onComplete={() => setScanDone(true)} />
            )}
          </motion.div>
        </motion.div>

        {/* ── Subtitle stagger ──────────────────────── */}
        <motion.div
          className="flex items-center gap-3 flex-wrap justify-center"
          variants={subtitleVariants}
          initial="hidden"
          animate="visible"
        >
          {subtitleWords.map((word, i) => (
            <motion.span
              key={i}
              variants={wordVariant}
              className={
                word === "/"
                  ? "text-[#DC2626] font-mono text-sm"
                  : "font-mono text-xs md:text-sm tracking-[0.3em] text-white/70"
              }
            >
              {word}
            </motion.span>
          ))}
        </motion.div>

        {/* ── Scroll hint ───────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.2, duration: 0.8 }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[9px] tracking-[0.3em] text-white/30">
            SCROLL TO EXPLORE
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-[1px] h-8 bg-gradient-to-b from-[#DC2626] to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
