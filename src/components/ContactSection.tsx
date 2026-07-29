"use client";

import { useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

/* ─── Social Links ──────────────────────────────────────
   UPDATE: Replace href values with your actual profile URLs
   ─────────────────────────────────────────────────────── */
const SOCIAL_LINKS = [
  {
    label: "LINKEDIN",
    href: "https://linkedin.com/in/prathamesh-sutar-402067243", // UPDATE
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="4" y="9" width="6" height="14" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "VIMEO",
    href: "https://vimeo.com/yourprofile", // UPDATE
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M22 7.42c-.09 2.01-1.49 4.76-4.2 8.25C15.04 19.33 12.6 21 10.55 21c-1.31 0-2.42-1.21-3.32-3.64l-1.82-6.68C4.72 8.25 4.08 7 3.42 7c-.14 0-.64.3-1.49.9L.8 6.6c.94-.82 1.86-1.64 2.77-2.47C4.87 3.04 6.1 2.5 6.85 2.43c1.73-.17 2.79.01 3.2 3.8.43 4.07.73 6.6.9 7.59.5 2.26 1.05 3.39 1.64 3.39.46 0 1.16-.73 2.09-2.2.93-1.46 1.42-2.58 1.48-3.34.13-1.27-.37-1.9-1.48-1.9-.53 0-1.07.12-1.63.35 1.08-3.55 3.14-5.28 6.17-5.18 2.25.07 3.31 1.53 3.18 4.48z" />
      </svg>
    ),
  },
  {
    label: "INSTAGRAM",
    href: "https://instagram.com/ps_cinex.10", // UPDATE
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
];

/* ─── Magnetic Social Link ────────────────────────────── */
function MagneticLink({
  link,
  index,
}: {
  link: (typeof SOCIAL_LINKS)[0];
  index: number;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15 });
  const springY = useSpring(y, { stiffness: 200, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.35);
    y.set((e.clientY - cy) * 0.35);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor-button
      className="relative flex items-center gap-3 font-mono text-[10px] tracking-[0.25em] text-white/40 border border-white/[0.08] px-6 py-3 rounded-sm overflow-hidden group"
      style={{ x: springX, y: springY }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={{
        borderColor: hovered ? "rgba(220,38,38,0.4)" : "rgba(255,255,255,0.08)",
        color: hovered ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.4)",
      }}
    >
      {/* Fill slide on hover */}
      <motion.div
        className="absolute inset-0 bg-[#DC2626]"
        initial={{ x: "-100%" }}
        animate={{ x: hovered ? "0%" : "-100%" }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />
      <span className="relative z-10 transition-colors duration-300">
        {link.icon}
      </span>
      <span className="relative z-10">{link.label}</span>
    </motion.a>
  );
}

/* ─── Section ─────────────────────────────────────────── */
export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [btnHovered, setBtnHovered] = useState(false);
  const [formFocus, setFormFocus] = useState<string | null>(null);

  // Magnetic CTA button
  const btnRef = useRef<HTMLButtonElement>(null);
  const btnX = useMotionValue(0);
  const btnY = useMotionValue(0);
  const btnSpringX = useSpring(btnX, { stiffness: 150, damping: 12 });
  const btnSpringY = useSpring(btnY, { stiffness: 150, damping: 12 });

  const handleBtnMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    btnX.set((e.clientX - (rect.left + rect.width / 2)) * 0.3);
    btnY.set((e.clientY - (rect.top + rect.height / 2)) * 0.3);
  };

  return (
    <section
      id="contact"
      className="relative w-full py-14 md:py-20 pl-10 pr-6 md:pl-10 md:pr-12 lg:pl-10 lg:pr-16 overflow-hidden border-[10px] [border-color:transparent]"
    >
      {/* Top separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#DC2626]/30 to-transparent" />

      {/* Large ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 50% 100%, rgba(220,38,38,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-[1800px] mx-auto w-full rounded-[2px] border border-transparent/[0.06] bg-white/[0.02] px-6 py-8 md:px-12 md:py-12 flex flex-col justify-center border-[10px] [border-color:transparent]">
        <div ref={sectionRef} className="text-center">
          {/* ── Section label ─────────────────────────── */}
          <motion.div
            className="font-mono text-[10px] tracking-[0.3em] text-[#DC2626] mb-6"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            04 / CONTACT
          </motion.div>

          {/* ── Availability indicator ─────────────────── */}
          <motion.div
            className="flex items-center justify-center gap-3 mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            {/* Pulse rings container */}
            <div className="relative w-3 h-3">
              <div
                className="absolute inset-0 rounded-full bg-[#DC2626] pulse-ring"
                style={{ boxShadow: "0 0 6px rgba(220,38,38,0.8)" }}
              />
              <div className="absolute inset-0 rounded-full bg-[#DC2626] pulse-ring-2" />
              <div className="absolute inset-0 rounded-full bg-[#DC2626] pulse-ring-3" />
              <div className="relative w-3 h-3 rounded-full bg-[#DC2626]" />
            </div>
            <span className="font-mono text-xs tracking-[0.25em] text-white/60">
              AVAILABLE FOR YOUR PROJECTS
            </span>
          </motion.div>

          {/* ── Heading ───────────────────────────────── */}
          <motion.h2
            className="font-display text-[clamp(3rem,8vw,7rem)] leading-none tracking-wider mb-6"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            LET&apos;S CREATE
            <br />
            <span className="text-gradient-red">SOMETHING</span>
            <br />
            REAL.
          </motion.h2>

          {/* ── Subtext ───────────────────────────────── */}
          <div className="flex justify-center mb-8">
            <motion.p
              className="font-body text-sm text-white/40 leading-relaxed max-w-lg text-center"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              {/* UPDATE: your contact intro copy */}
              Commercial briefs, passion projects, or just a conversation about
              light and story — the dialogue is always open.
            </motion.p>
          </div>

          {/* ── Glowing CTA Button ────────────────────── */}
          <motion.div
            className="flex justify-center mb-10"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 20 }}
          >
            <motion.button
              ref={btnRef}
              data-cursor-button
              className="relative btn-crimson px-12 py-5 text-sm tracking-[0.2em] font-mono overflow-hidden rounded-sm"
              style={{ x: btnSpringX, y: btnSpringY }}
              onMouseMove={handleBtnMove}
              onMouseEnter={() => setBtnHovered(true)}
              onMouseLeave={() => {
                setBtnHovered(false);
                btnX.set(0);
                btnY.set(0);
              }}
              animate={{
                boxShadow: btnHovered
                  ? "0 0 0 2px rgba(220,38,38,0.6), 0 20px 60px rgba(220,38,38,0.5), 0 4px 20px rgba(220,38,38,0.4)"
                  : "0 0 0 1px rgba(220,38,38,0.2), 0 8px 30px rgba(220,38,38,0.2)",
              }}
              transition={{ duration: 0.3 }}
              onClick={() => {
                // UPDATE: Replace with your email or form action
                window.location.href = "mailto:prathameshsutar068@gmail.com";
              }}
            >
              {/* Shimmer */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
                animate={btnHovered ? { translateX: "200%" } : { translateX: "-100%" }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
              <span className="relative z-10">PROJECT INQUIRY</span>
            </motion.button>
          </motion.div>

          {/* ── Divider ───────────────────────────────── */}
          <motion.div
            className="flex items-center gap-6 mb-10"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
          >
            <div className="flex-1 h-px bg-white/[0.06]" />
            <span className="font-mono text-[9px] tracking-[0.3em] text-white/20">
              OR FIND ME AT
            </span>
            <div className="flex-1 h-px bg-white/[0.06]" />
          </motion.div>

          {/* ── Magnetic social links ──────────────────── */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {SOCIAL_LINKS.map((link, i) => (
              <MagneticLink key={link.label} link={link} index={i} />
            ))}
          </div>

          {/* ── Direct email ──────────────────────────── */}
          <motion.div
            className="mt-12"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.9 }}
          >
            {/* UPDATE: Replace with your email */}
            <a
              href="mailto:your@email.com"
              data-cursor-button
              className="font-mono text-xs tracking-[0.2em] text-white/25 hover:text-[#DC2626] transition-colors duration-300 animated-underline"
            >
              prathameshsutar068@gmail.com {/* UPDATE */}
            </a>
          </motion.div>
        </div>

        {/* ── Footer ────────────────────────────────────── */}
        <motion.div
          className="mt-14 flex flex-col gap-3 border-t border-white/[0.06] pt-6 text-center sm:flex-row sm:items-center sm:justify-between"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2 }}
        >
          <span className="font-mono text-[9px] tracking-[0.25em] text-white/20">
            {/* UPDATE: your name */}
            © 2024 Prathamesh Sutar
          </span>
          <span className="font-mono text-[9px] tracking-[0.25em] text-white/20">
            CRAFTED WITH PRECISION
          </span>
        </motion.div>
      </div>
    </section>
  );
}
