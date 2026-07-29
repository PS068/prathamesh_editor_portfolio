"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

/* ─── Accounts Data ────────────────────────────────────── */
const ACCOUNTS = [
  {
    id: "ps_cinex.10",
    handle: "@PS",
    title: "MAIN EDITING ACCOUNT",
    description: "My primary portfolio and main editing account where I showcase my best work.",
    link: "https://instagram.com/ps_cinex.10",
  },
  {
    id: "spgx.01",
    handle: "@SPG",
    title: "CO-FOUNDER & EDITOR",
    description: "A collaborative page handled by 3 editors. We create and share high-quality edits together.",
    link: "https://instagram.com/spgx.01",
  },
  {
    id: "prathameshsutar068",
    handle: "@prathameshsutar068",
    title: "PRIVATE ACCOUNT",
    description: "My personal and private space.                                                             _",
    link: "https://instagram.com/prathameshsutar068",
  },
];

/* ─── Single Account Card ─────────────────────────────── */
function AccountCard({
  account,
  index,
}: {
  account: (typeof ACCOUNTS)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const inView = useInView(cardRef, { once: true, margin: "-50px" });
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <motion.a
      href={account.link}
      target="_blank"
      rel="noopener noreferrer"
      ref={cardRef}
      className="relative w-full mx-auto min-h-full overflow-hidden rounded-[2px] flex flex-col group no-underline border-[10px] [border-color:transparent]"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: index * 0.15,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-cursor-button
    >
      {/* ── Mouse-tracked red radial flood ──────────── */}
      <motion.div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle 250px at ${mousePos.x}% ${mousePos.y}%, rgba(220,38,38,0.08) 0%, transparent 70%)`,
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* ── Border glow on hover ─────────────────────── */}
      <motion.div
        className="absolute inset-0 rounded-[2px] pointer-events-none"
        animate={{
          boxShadow: hovered
            ? "inset 0 0 0 1px rgba(220,38,38,0.3), 0 0 30px rgba(220,38,38,0.05)"
            : "inset 0 0 0 1px rgba(255,255,255,0.06)",
        }}
        transition={{ duration: 0.4 }}
      />


      {/* ── Content wrapper — transparent inner border creates gap from white outline ── */}
      <div className="relative z-10 flex flex-col gap-6 border-[10px] [border-color:transparent] p-6 md:p-8 flex-1">

        {/* ── Icon & Handle ─────────────────────────────── */}
        <div className="flex items-center gap-4">
          <motion.div
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.02]"
            style={{
              borderColor: hovered ? "rgba(220,38,38,0.4)" : "rgba(255,255,255,0.1)",
              color: hovered ? "#DC2626" : "rgba(255,255,255,0.8)",
              transition: "all 0.4s ease",
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </motion.div>
          <div>
            <h3 className="font-display text-[clamp(1.2rem,2vw,1.5rem)] tracking-wider text-white group-hover:text-[#DC2626] transition-colors duration-300">
              {account.handle}
            </h3>
            <div className="font-mono text-[9px] tracking-[0.2em] text-white/40 mt-1">
              {account.title}
            </div>
          </div>
        </div>

        {/* ── Description ──────────────────────────────── */}
        <p className="font-body text-sm text-white/50 leading-relaxed mt-2 group-hover:text-white/70 transition-colors duration-300">
          {account.description}
        </p>

        {/* ── Arrow indicator ──────────────────────────── */}
        <div className="mt-auto pt-6 flex items-center gap-3 border-t border-white/[0.06] opacity-50 group-hover:opacity-100 transition-opacity duration-300">
          <div className="h-px flex-1 bg-white/[0.06] group-hover:bg-[#DC2626]/30 transition-colors duration-300" />
          <span className="font-mono text-[9px] tracking-[0.2em] text-[#DC2626]">
            VIEW PROFILE
          </span>
        </div>

      </div>
    </motion.a>
  );
}

/* ─── Section ─────────────────────────────────────────── */
export default function InstagramSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section
      id="instagram"
      className="relative w-full py-14 md:py-20 pl-10 pr-6 md:pl-10 md:pr-12 lg:pl-10 lg:pr-16 overflow-hidden border-[10px] [border-color:transparent]"
    >
      {/* Top separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#DC2626]/30 to-transparent" />

      {/* Background pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, #ffffff 0px, #ffffff 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, #ffffff 0px, #ffffff 1px, transparent 1px, transparent 40px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-[1800px] mx-auto w-full rounded-[2px] border-[10px] [border-color:transparent] bg-white/[0.02] px-6 py-8 md:px-10 md:py-12 flex flex-col justify-center">
        {/* ── Header ──────────────────────────────────── */}
        <div ref={headerRef} className="w-full mb-10 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <motion.div
                className="font-mono text-[10px] tracking-[0.3em] text-[#DC2626] mb-3"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                04 / SOCIALS
              </motion.div>
              <motion.h2
                className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-none tracking-wider text-white"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              >
                INSTAGRAM
              </motion.h2>
            </div>
            <motion.div
              className="flex items-center justify-center gap-3 md:justify-start"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
            >
              <span className="font-mono text-[10px] tracking-[0.2em] text-white/40 max-w-[200px] text-center md:text-right">
                FOLLOW FOR THE RECENT EDITS
              </span>
            </motion.div>
          </div>
          <motion.div
            className="mt-8 h-px"
            initial={{ scaleX: 0, originX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            style={{ background: "linear-gradient(90deg, #DC2626 0%, transparent 100%)" }}
          />
        </div>

        {/* ── Services Grid ────────────────────────────── */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {ACCOUNTS.map((account, i) => (
            <AccountCard key={account.id} account={account} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
