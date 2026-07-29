"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";

/* ─── Project data ──────────────────────────────────────
   UPDATE: Replace titles, categories, and video paths below
   ─────────────────────────────────────────────────────── */
const PROJECTS = [
  {
    id: 1,
    title: "Jaguar Reel",
    category: "Reel",
    duration: "12 sec",
    year: "2026",
    src: "https://res.cloudinary.com/r1q1nsrs/video/upload/v1785252865/Jaguae_Edit_3_mroqpn.mov",
    // Cloudinary auto-thumbnail: first frame as JPEG
    poster: "https://res.cloudinary.com/r1q1nsrs/video/upload/so_0/v1785252865/Jaguae_Edit_3_mroqpn.jpg",
    aspect: "16/9",
  },
  {
    id: 2,
    title: "Mountain Ride",
    category: "Cinematic Reel",
    duration: "29 sec",
    year: "2026",
    src: "https://res.cloudinary.com/r1q1nsrs/video/upload/v1785255455/Subo_ealekg.mov",
    poster: "https://res.cloudinary.com/r1q1nsrs/video/upload/so_0/v1785255455/Subo_ealekg.jpg",
    aspect: "9/16",
  },
  {
    id: 3,
    title: "Car Shoot",
    category: "Cinematic Shot",
    duration: "23 sec",
    year: "2026",
    src: "https://res.cloudinary.com/r1q1nsrs/video/upload/v1785253504/Diwan_i20_ajmgno.mov",
    poster: "https://res.cloudinary.com/r1q1nsrs/video/upload/so_0/v1785253504/Diwan_i20_ajmgno.jpg",
    aspect: "16/9",
  },
  {
    id: 4,
    title: "XUV 7XO",
    category: "Automotive Reel",
    duration: "18 sec",
    year: "2026",
    src: "https://res.cloudinary.com/r1q1nsrs/video/upload/v1785252978/Timeline_2_gxl52q.mov",
    poster: "https://res.cloudinary.com/r1q1nsrs/video/upload/so_0/v1785252978/Timeline_2_gxl52q.jpg",
    aspect: "16/9",
  },
  {
    id: 5,
    title: "Souls United",
    category: "Wedding Film",
    duration: "1:59",
    year: "2026",
    src: "https://www.udrop.com/file/OTNT/Wedding_Nikhil_mama.mp4",
    // Wedding video is on udrop — use a warm golden placeholder gradient via Cloudinary
    poster: "https://res.cloudinary.com/r1q1nsrs/image/upload/w_800,h_450,c_fill,b_rgb:1a0a00,l_text:Arial_40_bold:शुभ%20विवाह,co_rgb:d4a017/v1/placeholder_wedding",
    aspect: "16/9",
  },
  {
    id: 6,
    title: "Nature Edit",
    category: "Reel",
    duration: "14 sec",
    year: "2026",
    src: "https://res.cloudinary.com/r1q1nsrs/video/upload/v1785253280/nature_23_awvuli.mov",
    poster: "https://res.cloudinary.com/r1q1nsrs/video/upload/so_0/v1785253280/nature_23_awvuli.jpg",
    aspect: "16/9",
  },
];

/* ─── Single Video Card ───────────────────────────────── */
function VideoCard({
  project,
  index,
  onOpen,
}: {
  project: (typeof PROJECTS)[0];
  index: number;
  onOpen: (project: (typeof PROJECTS)[0]) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovered, setHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 200,
    damping: 20,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(nx);
    mouseY.set(ny);
    setGlowPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const handleMouseEnter = () => {
    setHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => { });
    }
  };

  const handleMouseLeave = () => {
    setHovered(false);
    mouseX.set(0);
    mouseY.set(0);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      const nextMuted = !isMuted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
      if (!nextMuted) {
        videoRef.current.play().catch(() => { });
      }
    }
  };

  const isPortrait = project.aspect === "9/16";

  // Auto-convert Cloudinary player embed URL to direct MP4 stream URL for HTML5 video
  let videoSrc = project.src;
  if (project.src.includes("player.cloudinary.com/embed")) {
    try {
      const urlObj = new URL(project.src);
      const cloudName = urlObj.searchParams.get("cloud_name");
      const publicId = urlObj.searchParams.get("public_id");
      if (cloudName && publicId) {
        videoSrc = `https://res.cloudinary.com/${cloudName}/video/upload/${publicId}.mp4`;
      }
    } catch (e) {
      // fallback
    }
  }

  const isEmbed = videoSrc.includes("/embed") || videoSrc.includes("iframe");

  return (
    <motion.div
      ref={cardRef}
      data-cursor-video
      onClick={() => onOpen(project)}
      className={`relative overflow-hidden rounded-[2px] cursor-pointer group w-full h-full border-[10px] [border-color:transparent] ${isPortrait ? "row-span-2" : ""}`}
      style={{
        perspective: 1200,
      }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        delay: index * 0.1,
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 3D tilt wrapper */}
      <motion.div
        className="relative w-full h-full"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        {/* Video or Embed element */}
        {isEmbed ? (
          <iframe
            src={`${videoSrc}&autoplay=1&muted=${isMuted ? 1 : 0}&controls=0`}
            className="absolute inset-0 w-full h-full border-0 pointer-events-none"
            allow="autoplay; fullscreen"
          />
        ) : (
          <video
            ref={videoRef}
            src={videoSrc}
            poster={project.poster}
            className="absolute inset-0 w-full h-full object-cover"
            muted={isMuted}
            loop
            playsInline
            preload="auto"
          />
        )}

        {/* Dark overlay — fades out on hover */}
        <motion.div
          className="absolute inset-0 bg-black"
          animate={{ opacity: hovered ? 0.15 : 0.55 }}
          transition={{ duration: 0.4 }}
        />

        {/* Red ambient glow that follows mouse */}
        {hovered && (
          <div
            className="absolute inset-0 pointer-events-none transition-all duration-200"
            style={{
              background: `radial-gradient(circle 160px at ${glowPos.x}% ${glowPos.y}%, rgba(220,38,38,0.4) 0%, transparent 70%)`,
            }}
          />
        )}

        {/* Scanlines */}
        <div className="scanlines opacity-40" />

        {/* Card info overlay */}
        <div className="absolute inset-0 flex flex-col justify-between p-4 z-10">
          {/* Top badges & Sound Toggle */}
          <div className="flex items-center justify-between w-full">
            <button
              onClick={toggleMute}
              className="z-20 font-mono text-[9px] tracking-[0.15em] text-white/80 bg-black/70 border border-white/20 hover:border-[#DC2626] px-2 py-1 rounded-sm flex items-center gap-1 backdrop-blur-md transition-colors"
              title={isMuted ? "Click to enable sound" : "Click to mute"}
            >
              {isMuted ? "🔇 SOUND OFF" : "🔊 SOUND ON"}
            </button>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[9px] tracking-[0.2em] text-white/50 bg-black/60 px-2 py-0.5 rounded-sm">
                {project.year}
              </span>
              <motion.span
                className="font-mono text-[9px] tracking-[0.2em] text-[#DC2626] border border-[#DC2626]/40 px-2 py-0.5 rounded-sm"
                animate={
                  hovered
                    ? { opacity: [1, 0.5, 1], transition: { repeat: Infinity, duration: 0.8 } }
                    : { opacity: 1 }
                }
              >
                {project.duration}
              </motion.span>
            </div>
          </div>

          {/* Bottom info */}
          <motion.div
            className="overflow-hidden"
            animate={{ y: hovered ? 0 : 8, opacity: hovered ? 1 : 0.7 }}
            transition={{ duration: 0.3 }}
          >
            <div className="font-mono text-[9px] tracking-[0.25em] text-[#DC2626] mb-1">
              {project.category.toUpperCase()}
            </div>
            <div className="font-display text-lg md:text-xl tracking-wider text-white">
              {project.title}
            </div>
          </motion.div>

          {/* Play indicator */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            animate={{ opacity: hovered ? 0.3 : 1, scale: hovered ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-12 h-12 rounded-full border border-white/40 flex items-center justify-center backdrop-blur-sm bg-black/30 group-hover:border-[#DC2626]">
              <div
                className="w-0 h-0 ml-1"
                style={{
                  borderTop: "8px solid transparent",
                  borderBottom: "8px solid transparent",
                  borderLeft: "14px solid rgba(255,255,255,0.9)",
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Red edge border on hover */}
        <motion.div
          className="absolute inset-0 rounded-[2px] pointer-events-none z-20"
          animate={{
            boxShadow: hovered
              ? "inset 0 0 0 1px rgba(220,38,38,0.6), 0 0 40px rgba(220,38,38,0.3), 0 20px 60px rgba(0,0,0,0.5)"
              : "inset 0 0 0 1px rgba(255,255,255,0.06)",
          }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>
    </motion.div>
  );
}

/* ─── Section ─────────────────────────────────────────── */
export default function VideoWebSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState<(typeof PROJECTS)[0] | null>(null);

  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProject(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Helper to parse Cloudinary embed URLs into direct MP4
  const getDirectSrc = (src: string) => {
    if (src.includes("player.cloudinary.com/embed")) {
      try {
        const urlObj = new URL(src);
        const cloudName = urlObj.searchParams.get("cloud_name");
        const publicId = urlObj.searchParams.get("public_id");
        if (cloudName && publicId) {
          return `https://res.cloudinary.com/${cloudName}/video/upload/${publicId}.mp4`;
        }
      } catch (e) { }
    }
    return src;
  };

  return (
    <section id="work" className="relative min-h-screen w-full flex flex-col justify-center py-16 md:py-24 px-6 md:px-12 lg:px-16 overflow-hidden border-[10px] [border-color:transparent]">
      {/* Section separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#DC2626]/30 to-transparent" />

      {/* Ambient gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(220,38,38,0.05) 0%, transparent 60%)",
          }}
        />
      </div>

      <div className="w-full max-w-[1800px] mx-auto flex flex-col justify-center border-[10px] [border-color:transparent]">
        {/* ── Header ──────────────────────────────────── */}
        <div ref={headerRef} className="w-full mb-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <motion.div
                className="font-mono text-[10px] tracking-[0.3em] text-[#DC2626] mb-3"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                02 / SELECTED WORK
              </motion.div>
              <motion.h2
                className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-none tracking-wider"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              >
                THE REEL
              </motion.h2>
            </div>
            <motion.p
              className="font-body text-sm text-white/40 max-w-xs leading-relaxed"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Stories captured through commercial, documentary, and narrative films
              across three continents. Select a project to experience with sound.
            </motion.p>
          </div>
          {/* Divider */}
          <motion.div
            className="mt-8 h-px"
            initial={{ scaleX: 0, originX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            style={{ background: "linear-gradient(90deg, #DC2626 0%, transparent 100%)" }}
          />
        </div>

        {/* ── Video Grid ──────────────────────────────── */}
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-[220px] md:auto-rows-[260px] lg:auto-rows-[280px]">
            {PROJECTS.map((project, i) => (
              <VideoCard
                key={project.id}
                project={project}
                index={i}
                onOpen={(p) => setSelectedProject(p)}
              />
            ))}
          </div>
        </div>

        {/* ── View all CTA ─────────────────────────────── */}
        <motion.div
          className="w-full mt-12 flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <a
            href="#contact"
            data-cursor-button
            className="font-mono text-xs tracking-[0.3em] text-white/40 border border-white/10 px-8 py-3 hover:border-[#DC2626]/50 hover:text-white/70 transition-all duration-400 animated-underline"
          >
            VIEW FULL PORTFOLIO
          </a>
        </motion.div>
      </div>

      {/* ── Fullscreen Video Lightbox Modal with Full Audio ── */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={`relative bg-black border border-white/10 rounded-sm overflow-hidden flex flex-col ${selectedProject.aspect === "9/16"
                ? "w-auto max-h-[90vh]"
                : "w-full max-w-5xl"
                }`}
              style={{
                aspectRatio: selectedProject.aspect,
                // For portrait videos: constrain height and let width follow aspect ratio
                ...(selectedProject.aspect === "9/16"
                  ? { height: "min(90vh, 90dvh)" }
                  : {}),
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header — always visible, close button always accessible */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black/80 shrink-0">
                <div>
                  <div className="font-mono text-[10px] tracking-[0.2em] text-[#DC2626]">
                    {selectedProject.category.toUpperCase()} · {selectedProject.year}
                  </div>
                  <h3 className="font-display text-base md:text-xl text-white tracking-wider leading-tight">
                    {selectedProject.title}
                  </h3>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); setSelectedProject(null); }}
                  className="font-mono text-xs text-white/70 hover:text-white bg-black/60 border border-white/20 hover:border-[#DC2626] hover:bg-[#DC2626]/10 px-3 py-1.5 rounded-sm transition-all duration-200 flex items-center gap-2 shrink-0"
                >
                  ✕ CLOSE <span className="text-white/30">[ESC]</span>
                </button>
              </div>

              {/* Video Player Container */}
              <div className="relative flex-1 min-h-0 bg-black flex items-center justify-center overflow-hidden">
                <video
                  src={getDirectSrc(selectedProject.src)}
                  poster={selectedProject.poster}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
