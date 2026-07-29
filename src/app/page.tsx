"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

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
   UPDATE: Replace "YN" with your initials
   ─────────────────────────────────────────────────────── */
function Navigation() {
  const { scrollY } = useScroll();
  const navOpacity = useTransform(scrollY, [0, 80], [0, 1]);
  const navBlur = useTransform(scrollY, [0, 80], [0, 20]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "WORK", href: "#work" },
    { label: "SERVICES", href: "#services" },
    { label: "CONTACT", href: "#contact" },
  ];

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 px-8 md:px-16 lg:px-24 h-16 flex items-center justify-between"
        style={{
          backgroundColor: `rgba(0,0,0,${navOpacity.get()})`,
          backdropFilter: `blur(${navBlur.get()}px)`,
          borderBottom: "1px solid rgba(220,38,38,0.06)",
        }}
      >
        {/* Logo / Initials */}
        <motion.a
          href="#hero"
          data-cursor-button
          className="font-display text-xl tracking-[0.2em] text-white relative z-50"
          whileHover={{ color: "#DC2626" }}
          transition={{ duration: 0.2 }}
          onClick={() => setMobileMenuOpen(false)}
        >
          PS
          <span className="absolute -bottom-1 left-10 right-0 h-[1px] bg-[#DC2626] scale-x-0 group-hover:scale-x-100 transition-transform" />
        </motion.a>

        {/* Nav links (Desktop) */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              data-cursor-button
              className="font-mono text-[10px] tracking-[0.25em] text-white/40 hover:text-white transition-colors duration-300 animated-underline"
              whileHover={{ color: "#fff" }}
            >
              {link.label}
            </motion.a>
          ))}
        </div>

        {/* CTA pill (Desktop) */}
        <motion.a
          href="#contact"
          data-cursor-button
          className="hidden md:flex font-mono text-[9px] tracking-[0.2em] text-[#DC2626] border border-[#DC2626]/30 px-4 py-2 rounded-sm"
          whileHover={{
            backgroundColor: "rgba(220,38,38,0.1)",
            borderColor: "rgba(220,38,38,0.7)",
          }}
          transition={{ duration: 0.2 }}
        >
          HIRE ME
        </motion.a>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden z-50 p-2 text-white/70 hover:text-white focus:outline-none"
          aria-label="Toggle mobile menu"
        >
          <div className="w-6 h-5 flex flex-col justify-between items-end relative">
            <span
              className={`h-[2px] bg-white transition-all duration-300 ${
                mobileMenuOpen ? "w-6 rotate-45 translate-y-[9px] bg-[#DC2626]" : "w-6"
              }`}
            />
            <span
              className={`h-[2px] bg-white transition-all duration-300 ${
                mobileMenuOpen ? "opacity-0 w-0" : "w-4"
              }`}
            />
            <span
              className={`h-[2px] bg-white transition-all duration-300 ${
                mobileMenuOpen ? "w-6 -rotate-45 -translate-y-[9px] bg-[#DC2626]" : "w-5"
              }`}
            />
          </div>
        </button>
      </motion.nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden px-6"
          >
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-display text-3xl tracking-[0.25em] text-white/80 hover:text-[#DC2626] transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-4 font-mono text-xs tracking-[0.25em] text-[#DC2626] border border-[#DC2626]/50 px-8 py-3 rounded-sm bg-[#DC2626]/10"
              >
                HIRE ME
              </a>
            </div>
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
