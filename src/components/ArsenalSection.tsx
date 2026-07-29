"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

/* ─── Service Data ──────────────────────────────────────
   UPDATE: descriptions, stats, and any details below
   ─────────────────────────────────────────────────────── */
const SERVICES = [
  {
    id: "cinematography",
    index: "01",
    title: "CINEMATOGRAPHY",
    subtitle: "The Art of Light",
    description:
      // UPDATE: your cinematography description
      "Transforming raw vision into visual poetry. Every frame is a deliberate composition — light sculpted, and motion choreographed to serve the story.",
    stats: [
      { label: "Projects", value: "10+" },  // UPDATE
      { label: "Car reels", value: "50+" },   // UPDATE
      { label: "Experience", value: "4+ yrs" },       // UPDATE
    ],
    tags: ["iPhone 17 pro Max"], // UPDATE
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        <rect x="2" y="12" width="32" height="24" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M34 18l10-6v24l-10-6V18z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="18" cy="24" r="6" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="18" cy="24" r="2" fill="currentColor" />
        <line x1="6" y1="12" x2="6" y2="36" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.3" />
      </svg>
    ),
  },
  {
    id: "colorgrading",
    index: "02",
    title: "COLOR GRADING",
    subtitle: "The Language of Tone",
    description:
      // UPDATE: your color grading description
      "Color is emotion rendered tangible. From the warmth of golden hour to the cold silence of night — every grade is a tonal signature that defines the world of your story.",
    stats: [
      { label: "Hours Graded", value: "5K+" },  // UPDATE
      { label: "LUTs Built", value: "200+" },   // UPDATE
      { label: "Formats", value: "All" },
    ],
    tags: ["DAVINCI RESOLVE", "Capcut pro", "Lightroom"], // UPDATE
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="1.5" />
        <path d="M24 4 A20 20 0 0 1 44 24" stroke="#DC2626" strokeWidth="2" />
        <path d="M44 24 A20 20 0 0 1 24 44" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" />
        <path d="M24 44 A20 20 0 0 1 4 24" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.2" />
        <path d="M4 24 A20 20 0 0 1 24 4" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.1" />
        <circle cx="24" cy="24" r="4" fill="#DC2626" />
        <line x1="24" y1="4" x2="24" y2="44" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.2" />
        <line x1="4" y1="24" x2="44" y2="24" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.2" />
      </svg>
    ),
  },
  {
    id: "editing",
    index: "03",
    title: "NARRATIVE EDITING",
    subtitle: "The Pulse of Story",
    description:
      // UPDATE: your narrative editing description
      "Editing is the invisible architecture of feeling. Through rhythm, pacing, and the precise orchestration of cuts — emotion is manufactured from raw material.",
    stats: [
      { label: "Cut Hours", value: "8K+" },  // UPDATE
      { label: "Festivals", value: "23" },   // UPDATE
      { label: "Formats", value: "10+" },    // UPDATE
    ],
    tags: ["DAVINCI RESOLVE", "CAPCUT PRO", "ELEVEN LABS"], // UPDATE
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        <rect x="4" y="8" width="40" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <rect x="4" y="21" width="24" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <rect x="4" y="34" width="32" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <rect x="8" y="10" width="6" height="2" rx="0.5" fill="#DC2626" />
        <rect x="8" y="23" width="10" height="2" rx="0.5" fill="#DC2626" />
        <rect x="8" y="36" width="4" height="2" rx="0.5" fill="#DC2626" />
        <line x1="30" y1="24" x2="44" y2="24" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.3" />
        <circle cx="44" cy="24" r="3" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
];

/* ─── Single Service Card ─────────────────────────────── */
function ServiceCard({
  service,
  index,
}: {
  service: (typeof SERVICES)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { once: true, margin: "-80px" });
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  // Parallax offset: subtle shift based on cursor position relative to center
  const parallaxX = hovered ? (mousePos.x - 50) * 0.18 : 0;
  const parallaxY = hovered ? (mousePos.y - 50) * 0.18 : 0;

  return (
    <motion.div
      ref={cardRef}
      className="relative w-full mx-auto min-h-full overflow-hidden rounded-[2px] flex flex-col group border-[10px] [border-color:transparent]"
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: index * 0.15,
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── Cinematography BG image (cursor-parallax) ── */}
      {service.id === "cinematography" && (
        <motion.div
          className="absolute inset-0 pointer-events-none flex items-center justify-center"
          style={{ overflow: "hidden" }}
        >
          <motion.img
            src="/cinematography-bg.jpg"
            alt=""
            aria-hidden="true"
            style={{
              /* Show the full 9:16 image — no crop, no zoom, no rotate */
              width: "auto",
              height: "100%",
              maxWidth: "100%",
              objectFit: "contain",
              objectPosition: "center",
              opacity: hovered ? 0.15 : 0,
              x: parallaxX,
              y: parallaxY,
              filter: "grayscale(100%) contrast(1.1)",
              transition: "opacity 0.6s ease",
            }}
          />
        </motion.div>
      )}

      {/* ── Color Grading BG image (cursor-parallax) ── */}
      {service.id === "colorgrading" && (
        <motion.div
          className="absolute inset-0 pointer-events-none flex items-center justify-center"
          style={{ overflow: "hidden" }}
        >
          <motion.img
            src="/colorgrading-bg.png"
            alt=""
            aria-hidden="true"
            style={{
              /* Show the full image — no crop, no zoom, no rotate */
              width: "100%",
              height: "auto",
              maxHeight: "100%",
              objectFit: "contain",
              objectPosition: "center",
              opacity: hovered ? 0.15 : 0,
              x: parallaxX,
              y: parallaxY,
              filter: "contrast(1.1)",
              transition: "opacity 0.6s ease",
            }}
          />
        </motion.div>
      )}

      {/* ── Narrative Editing BG image (cursor-parallax) ── */}
      {service.id === "editing" && (
        <motion.div
          className="absolute inset-0 pointer-events-none flex items-center justify-center"
          style={{ overflow: "hidden" }}
        >
          <motion.img
            src="/editing-bg.png"
            alt=""
            aria-hidden="true"
            style={{
              /* Show the full image — no crop, no zoom, no rotate */
              width: "100%",
              height: "auto",
              maxHeight: "100%",
              objectFit: "contain",
              objectPosition: "center",
              opacity: hovered ? 0.15 : 0,
              x: parallaxX,
              y: parallaxY,
              filter: "contrast(1.1)",
              transition: "opacity 0.6s ease",
            }}
          />
        </motion.div>
      )}

      {/* ── Mouse-tracked red radial flood ──────────── */}
      <motion.div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle 300px at ${mousePos.x}% ${mousePos.y}%, rgba(220,38,38,0.12) 0%, transparent 70%)`,
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* ── Border glow on hover ─────────────────────── */}
      <motion.div
        className="absolute inset-0 rounded-[2px] pointer-events-none"
        animate={{
          boxShadow: hovered
            ? "inset 0 0 0 1px rgba(220,38,38,0.35), 0 0 40px rgba(220,38,38,0.08)"
            : "inset 0 0 0 1px rgba(255,255,255,0.06)",
        }}
        transition={{ duration: 0.4 }}
      />

      {/* ── Content wrapper — transparent inner border creates gap from white outline ── */}
      <div className="relative z-10 flex flex-col gap-6 border-[10px] [border-color:transparent] p-6 md:p-8 flex-1">

      {/* ── Index label ─────────────────────────────── */}
      <motion.div
        className="font-mono text-[10px] tracking-[0.3em] text-[#DC2626]"
        initial={{ opacity: 0, x: -10 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: index * 0.15 + 0.2 }}
      >
        {service.index} / SERVICE
      </motion.div>

      {/* ── Icon ─────────────────────────────────────── */}
      <motion.div
        className="text-white/80 w-10 h-10"
        initial={{ scale: 0, rotate: -20 }}
        animate={inView ? { scale: 1, rotate: 0 } : {}}
        transition={{
          delay: index * 0.15 + 0.3,
          type: "spring",
          stiffness: 200,
          damping: 15,
        }}
        style={{
          filter: hovered
            ? "drop-shadow(0 0 8px rgba(220,38,38,0.6))"
            : "drop-shadow(0 0 0px transparent)",
          transition: "filter 0.4s ease",
          color: hovered ? "#DC2626" : "rgba(255,255,255,0.8)",
        }}
      >
        {service.icon}
      </motion.div>

      {/* ── Title + subtitle ─────────────────────────── */}
      <div>
        <motion.h3
          className="font-display text-[clamp(1.6rem,3vw,2.5rem)] tracking-wider leading-none mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: index * 0.15 + 0.35, duration: 0.7 }}
        >
          {service.title}
        </motion.h3>
        <motion.div
          className="font-mono text-[10px] tracking-[0.25em] text-[#DC2626]"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: index * 0.15 + 0.45 }}
        >
          {service.subtitle.toUpperCase()}
        </motion.div>
      </div>

      {/* ── Description ──────────────────────────────── */}
      <motion.p
        className="font-body text-sm text-white/50 leading-relaxed"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: index * 0.15 + 0.5, duration: 0.8 }}
      >
        {service.description}
      </motion.p>

      {/* ── Stats ────────────────────────────────────── */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-5 mt-2 border-t border-white/[0.06]">
        {service.stats.map((stat, si) => (
          <motion.div
            key={stat.label}
            className="flex flex-col gap-1"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.15 + 0.55 + si * 0.08 }}
          >
            <div className="font-display text-xl tracking-wider text-[#DC2626]">
              {stat.value}
            </div>
            <div className="font-mono text-[9px] tracking-[0.2em] text-white/30">
              {stat.label.toUpperCase()}
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Tech tags ────────────────────────────────── */}
      <div className="flex flex-wrap gap-2 pt-1">
        {service.tags.map((tag, ti) => (
          <motion.span
            key={tag}
            className="font-mono text-[8px] tracking-[0.15em] text-white/30 border border-white/[0.08] px-2 py-1 rounded-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: index * 0.15 + 0.65 + ti * 0.06 }}
            style={{
              borderColor: hovered ? "rgba(220,38,38,0.2)" : undefined,
              color: hovered ? "rgba(255,255,255,0.5)" : undefined,
              transition: "all 0.3s ease",
            }}
          >
            {tag}
          </motion.span>
        ))}
      </div>
      </div>
    </motion.div>
  );
}

/* ─── Section ─────────────────────────────────────────── */
export default function ArsenalSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section
      id="services"
      className="relative w-full py-14 md:py-20 pl-10 pr-6 md:pl-10 md:pr-12 lg:pl-10 lg:pr-16 overflow-hidden border-[10px] [border-color:transparent]"
    >
      {/* Top separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#DC2626]/30 to-transparent" />

      {/* Background pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, #DC2626 0px, #DC2626 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, #DC2626 0px, #DC2626 1px, transparent 1px, transparent 40px)",
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
                03 / CAPABILITIES
              </motion.div>
              <motion.h2
                className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-none tracking-wider"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              >
                THE ARSENAL
              </motion.h2>
            </div>
            <motion.div
              className="flex items-center justify-center gap-3 md:justify-start"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
            >
              <div
                className="w-2 h-2 rounded-full bg-[#DC2626]"
                style={{ animation: "availablePulse 1.8s ease-in-out infinite" }}
              />
              <span className="font-mono text-[10px] tracking-[0.2em] text-white/40">
                ACCEPTING PROJECTS
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
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
