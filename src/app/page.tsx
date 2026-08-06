"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";

// Custom cursor (no SSR — accesses window)
const CustomCursor = dynamic(() => import("@/components/CustomCursor"), {
  ssr: false,
});

// Canvas particle background (no SSR)
const BackgroundCanvas = dynamic(() => import("@/components/BackgroundCanvas"), {
  ssr: false,
});

// Sections
import HeroSection from "@/components/HeroSection";
import VideoWebSection from "@/components/VideoWebSection";
import ArsenalSection from "@/components/ArsenalSection";
import InstagramSection from "@/components/InstagramSection";
import ContactSection from "@/components/ContactSection";
import RotatingCard from "@/components/RotatingCard";

/* ─── Navigation ────────────────────────────────────────
   Floating cylindrical pill navbar with glossy finish
   ─────────────────────────────────────────────────────── */
function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "WORK", href: "#work" },
    { label: "SERVICES", href: "#services" },
    { label: "CONTACT", href: "#contact" },
  ];

  return (
    <>
      {/* ── Floating Pill Navbar ───────────────────────── */}
      <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <motion.nav
          className="pointer-events-auto flex items-center justify-between relative overflow-hidden min-w-0"
          initial={{ opacity: 0, y: -45, scale: 0.88 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 90,
            damping: 16,
            mass: 0.8,
            delay: 0.1,
          }}
          style={{
            background:
              "linear-gradient(160deg, rgba(22,22,22,0.96) 0%, rgba(10,10,10,0.98) 50%, rgba(16,16,16,0.96) 100%)",
            backdropFilter: "blur(32px) saturate(220%) brightness(1.08)",
            WebkitBackdropFilter: "blur(32px) saturate(220%) brightness(1.08)",
            borderRadius: "999px",
            border: "1px solid rgba(255,255,255,0.10)",
            boxShadow: [
              "0 0 0 1px rgba(0,0,0,0.6)",
              "0 2px 0 rgba(220,38,38,0.15)",
              "0 4px 32px rgba(0,0,0,0.7)",
              "0 12px 48px rgba(0,0,0,0.5)",
              "inset 0 1px 0 rgba(255,255,255,0.14)",
              "inset 0 -1px 0 rgba(0,0,0,0.4)",
            ].join(", "),
            padding: "0 14px 0 20px",
            height: "46px",
            width: "clamp(340px, 92vw, 980px)",
            maxWidth: "980px",
            minWidth: "0",
          }}
        >
          {/* ── Gloss highlight band (top arc) */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              borderRadius: "999px",
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.03) 40%, transparent 60%)",
            }}
          />

          {/* ── Entrance Light Sweep Animation ── */}
          <motion.div
            className="absolute top-0 bottom-0 w-24 pointer-events-none z-10"
            initial={{ left: "-30%" }}
            animate={{ left: "130%" }}
            transition={{
              duration: 1.2,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.6,
            }}
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%)",
              transform: "skewX(-20deg)",
            }}
          />

          {/* ── Red bottom glow line */}
          <div
            className="absolute bottom-0 left-[15%] right-[15%] h-[1px] pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(220,38,38,0.4) 30%, rgba(220,38,38,0.6) 50%, rgba(220,38,38,0.4) 70%, transparent)",
              filter: "blur(1px)",
            }}
          />

          {/* ── Tab Logo ───────────────────────── */}
          <motion.a
            href="#hero"
            data-cursor-button
            className="relative group flex items-center py-1.5 z-20"
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
            whileHover={{ scale: 1.08 }}
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="relative w-7 h-7 rounded-full overflow-hidden flex items-center justify-center bg-black/40 border border-white/10 group-hover:border-[#DC2626]/50 transition-colors shadow-sm">
              <Image
                src="/favicon.png"
                alt="Logo"
                width={26}
                height={26}
                className="object-contain p-0.5"
              />
            </div>
          </motion.a>

          {/* ── Nav Links ─────────────────────── */}
          <div className="hidden md:flex items-center gap-6 z-20">
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                className="flex items-center"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.45,
                  delay: 0.45 + i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <motion.a
                  href={link.href}
                  data-cursor-button
                  className="relative font-mono text-[8.5px] tracking-[0.22em] text-white/50 px-5 py-2 group transition-colors duration-200"
                  whileHover={{ color: "rgba(255,255,255,0.95)" }}
                >
                  {link.label}
                  {/* Hover pill background */}
                  <motion.span
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  />
                </motion.a>
              </motion.div>
            ))}
          </div>

          {/* ── Mobile nav links ───────────────── */}
          <div className="flex md:hidden items-center gap-2 z-20 overflow-x-auto px-2">
            <div className="flex flex-1 items-center justify-center gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="min-w-[4.5rem] whitespace-nowrap px-3 py-2 text-[9px] tracking-[0.2em] text-white/80 transition-colors duration-200 hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="min-w-[5rem] whitespace-nowrap rounded-full bg-[#DC2626]/90 px-3 py-2 text-center text-[9px] tracking-[0.2em] text-white transition-colors duration-200 hover:bg-[#f14c4c]"
            >
              HIRE ME
            </a>
          </div>

          {/* ── Hire Me — inner pill button ──── */}
          <motion.a
            href="#contact"
            data-cursor-button
            className="hidden md:flex font-mono text-[8px] tracking-[0.22em] text-white items-center relative overflow-hidden z-20"
            initial={{ opacity: 0, scale: 0.8, x: 15 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 14,
              delay: 0.7,
            }}
            style={{
              background:
                "linear-gradient(160deg, rgba(220,38,38,0.85) 0%, rgba(160,20,20,0.9) 100%)",
              borderRadius: "999px",
              padding: "6px 20px",
              margin: "5px 0",
              border: "1px solid rgba(220,38,38,0.6)",
              boxShadow: [
                "0 0 16px rgba(220,38,38,0.25)",
                "inset 0 1px 0 rgba(255,180,180,0.25)",
                "inset 0 -1px 0 rgba(0,0,0,0.3)",
              ].join(", "),
            }}
            whileHover={{
              background:
                "linear-gradient(160deg, rgba(240,50,50,0.95) 0%, rgba(180,25,25,0.98) 100%)",
              boxShadow: [
                "0 0 28px rgba(220,38,38,0.45)",
                "0 0 8px rgba(220,38,38,0.2)",
                "inset 0 1px 0 rgba(255,180,180,0.3)",
              ].join(", "),
            }}
          >
            {/* ── Continuous Pulsing Glow Overlay */}
            <motion.div
              className="absolute inset-0 pointer-events-none rounded-full"
              animate={{
                boxShadow: [
                  "0 0 10px rgba(220,38,38,0.2), inset 0 1px 0 rgba(255,180,180,0.2)",
                  "0 0 24px rgba(220,38,38,0.7), inset 0 1px 0 rgba(255,255,255,0.45)",
                  "0 0 10px rgba(220,38,38,0.2), inset 0 1px 0 rgba(255,180,180,0.2)",
                ],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* ── Continuous Light Sweep Beam */}
            <motion.div
              className="absolute top-0 bottom-0 w-10 pointer-events-none z-10"
              initial={{ left: "-100%" }}
              animate={{ left: "220%" }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                repeatDelay: 1.5,
                ease: "easeInOut",
              }}
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%)",
                transform: "skewX(-25deg)",
              }}
            />

            {/* Inner sheen */}
            <span
              className="absolute inset-0 pointer-events-none"
              style={{
                borderRadius: "999px",
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 45%, transparent 55%)",
              }}
            />

            <motion.span
              className="relative z-10"
              animate={{
                textShadow: [
                  "0 0 2px rgba(255,255,255,0.2)",
                  "0 0 8px rgba(255,255,255,0.8)",
                  "0 0 2px rgba(255,255,255,0.2)",
                ],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              HIRE ME
            </motion.span>
          </motion.a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden z-50 px-3 py-2 text-white/70 hover:text-white focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            <div className="w-5 h-4 flex flex-col justify-between items-end">
              <span className={`h-[1.5px] bg-white transition-all duration-300 ${mobileMenuOpen ? "w-5 rotate-45 translate-y-[7px] bg-[#DC2626]" : "w-5"}`} />
              <span className={`h-[1.5px] bg-white transition-all duration-300 ${mobileMenuOpen ? "opacity-0 w-0" : "w-3"}`} />
              <span className={`h-[1.5px] bg-white transition-all duration-300 ${mobileMenuOpen ? "w-5 -rotate-45 -translate-y-[7px] bg-[#DC2626]" : "w-4"}`} />
            </div>
          </button>
        </motion.nav>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 md:hidden px-6"
            style={{
              background: "rgba(4,4,4,0.97)",
              backdropFilter: "blur(40px) saturate(180%)",
              WebkitBackdropFilter: "blur(40px) saturate(180%)",
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-display text-3xl tracking-[0.25em] text-white/80 hover:text-[#DC2626] transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="font-mono text-xs tracking-[0.25em] text-white px-8 py-3 mt-2"
              style={{
                background: "linear-gradient(160deg, rgba(220,38,38,0.85) 0%, rgba(160,20,20,0.9) 100%)",
                borderRadius: "999px",
                border: "1px solid rgba(220,38,38,0.5)",
                boxShadow: "0 0 20px rgba(220,38,38,0.3), inset 0 1px 0 rgba(255,180,180,0.2)",
              }}
            >
              HIRE ME
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ─── Page Progress Bar ──────────────────────────────── */
function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left"
      style={{
        scaleX,
        background:
          "linear-gradient(90deg, #DC2626 0%, #ff6b6b 50%, #DC2626 100%)",
        boxShadow: "0 0 8px rgba(220,38,38,0.8)",
      }}
    />
  );
}

/* ─── Root Page ─────────────────────────────────────── */
export default function Home() {
  return (
    <>
      {/* ── Global cursor (client only) ─────────────── */}
      <CustomCursor />

      {/* ── Scroll progress bar ─────────────────────── */}
      <ProgressBar />

      {/* ── Navigation ──────────────────────────────── */}
      <Navigation />

      {/* ── Persistent background layers ────────────── */}

      {/* Animated CSS grid */}
      <div className="bg-grid" aria-hidden="true" />

      {/* Film-grain noise */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Vignette */}
      <div className="vignette" aria-hidden="true" />

      {/* Canvas particle system */}
      <BackgroundCanvas />

      {/* ── Main content ────────────────────────────── */}
      <main className="relative z-10">
        {/* Section 01 — Hero */}
        <HeroSection />

        {/* ── Rotating Card Showcase ──────────────────── */}
        <section className="relative z-10 min-h-screen w-full flex flex-col items-center justify-center py-16 pl-10 pr-6 gap-8 border-[10px] [border-color:transparent]">
          <div className="flex flex-col items-center gap-3 mb-4">
            <span className="font-mono text-[9px] tracking-[0.4em] text-[#DC2626]">INTERACTIVE</span>
            <h2 className="font-display text-4xl md:text-5xl tracking-widest text-white">THE CARD</h2>
            <p className="font-mono text-[10px] tracking-[0.2em] text-white/30">TAP ON CARD TO CONNECT WITH US</p>
          </div>
          <RotatingCard />
        </section>

        {/* Horizontal rule with label */}
        <div className="relative z-10 flex items-center pl-10 pr-6 md:pl-10 md:pr-12 py-2">
          <div className="h-px flex-1 bg-gradient-to-r from-[#DC2626]/30 to-transparent" />
          <span className="font-mono text-[8px] tracking-[0.3em] text-white/15 px-4">
            SELECTED PROJECTS
          </span>
          <div className="h-px flex-1 bg-gradient-to-l from-[#DC2626]/30 to-transparent" />
        </div>

        {/* Section 02 — Video Web */}
        <VideoWebSection />

        {/* Section 03 — Services Arsenal */}
        <ArsenalSection />

        {/* Section 04 — Socials */}
        <InstagramSection />

        {/* Section 05 — Contact Pulse */}
        <ContactSection />
      </main>
    </>
  );
}
