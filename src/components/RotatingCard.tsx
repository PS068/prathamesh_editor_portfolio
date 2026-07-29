"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function RotatingCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showPhone, setShowPhone]   = useState(false);
  const [copied, setCopied]         = useState(false);

  // Mouse-tracked tilt values
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 120, damping: 18 });
  const springY = useSpring(rawY, { stiffness: 120, damping: 18 });

  // Map raw -1..1 to rotation degrees
  const rotateY = useTransform(springX, [-1, 1], [-22, 22]);
  const rotateX = useTransform(springY, [-1, 1], [14, -14]);

  // Shine/glare position
  const shineX = useTransform(springX, [-1, 1], [0, 100]);
  const shineY = useTransform(springY, [-1, 1], [0, 100]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    rawX.set(nx);
    rawY.set(ny);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rawX.set(0);
    rawY.set(0);
  };

  const handleCardClick = () => {
    setShowContact(true);
  };

  const handleWhatsApp = () => {
    window.open("https://wa.me/919370657289", "_blank");
    setShowContact(false);
  };

  const handleCall = () => {
    setShowPhone(true);
  };

  const handleCallNow = () => {
    window.location.href = "tel:+919370657289";
  };

  const handleCopyNumber = async () => {
    await navigator.clipboard.writeText("+91 93706 57289");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEmail = () => {
    window.location.href = "mailto:prathameshsutar068@gmail.com";
    setShowContact(false);
  };

  // ── Contact options config ──────────────────────────
  const contactOptions = [
    {
      label: "WhatsApp",
      sub: "Message",
      delay: 0.32,
      color: { r: 37, g: 211, b: 102 },
      hex: "#25D366",
      bgHex: "#128C7E",
      onClick: handleWhatsApp,
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
    },
    {
      label: "Call",
      sub: "Direct",
      delay: 0.4,
      color: { r: 220, g: 38, b: 38 },
      hex: "#EF4444",
      bgHex: "#991B1B",
      onClick: handleCall,
      icon: (
        <svg viewBox="0 0 24 24" width="19" height="19" fill="white">
          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
        </svg>
      ),
    },
    {
      label: "Email",
      sub: "Write",
      delay: 0.48,
      color: { r: 139, g: 92, b: 246 },
      hex: "#A78BFA",
      bgHex: "#5B21B6",
      onClick: handleEmail,
      icon: (
        <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="3" fill="none" />
          <polyline points="2,7 12,14 22,7" />
        </svg>
      ),
    },
  ];

  return (
    <div className="relative flex items-center justify-center" style={{ perspective: "1000px" }}>

      {/* ── Outer wrapper — slow auto-rotation when NOT hovered ── */}
      <motion.div
        animate={isHovered ? { rotateY: 0 } : { rotateY: [0, 360] }}
        transition={
          isHovered
            ? { duration: 0.4, ease: "easeOut" as const }
            : { duration: 12, repeat: Infinity, ease: "linear" as const, repeatType: "loop" as const }
        }
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* ── Inner wrapper — mouse tilt on hover ── */}
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          onClick={handleCardClick}
          style={{
            rotateX: isHovered ? rotateX : 0,
            rotateY: isHovered ? rotateY : 0,
            transformStyle: "preserve-3d",
          }}
          className="relative w-[260px] h-[360px] md:w-[300px] md:h-[420px] cursor-pointer select-none"
        >
          {/* ── Card face ── */}
          <div
            className="absolute inset-0 rounded-2xl overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #1a0a0a 0%, #0d0d0d 100%)",
              border: "1px solid rgba(220,38,38,0.35)",
              boxShadow: isHovered
                ? "0 30px 70px rgba(220,38,38,0.35), 0 0 0 1px rgba(220,38,38,0.5), inset 0 0 30px rgba(220,38,38,0.05)"
                : "0 10px 40px rgba(220,38,38,0.15), 0 0 0 1px rgba(220,38,38,0.2)",
              transition: "box-shadow 0.4s ease",
            }}
          >
            {/* Image — revealed on hover */}
            <motion.div
              className="absolute inset-0"
              animate={{ opacity: isHovered ? 1 : 0.08 }}
              transition={{ duration: 0.5, ease: "easeOut" as const }}
            >
              <Image src="/card-photo.jpg" alt="Portrait" fill className="object-cover object-center" priority />
              <motion.div
                className="absolute inset-0"
                animate={{
                  background: isHovered
                    ? "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.75) 100%)"
                    : "linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.95) 100%)",
                }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>

            {/* Default front face */}
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6"
              animate={{ opacity: isHovered ? 0 : 1 }}
              transition={{ duration: 0.35 }}
            >
              <svg viewBox="0 0 100 100" className="w-24 h-24 text-[#DC2626] opacity-20" fill="none" stroke="currentColor" strokeWidth="0.8">
                <circle cx="50" cy="50" r="45" />
                <circle cx="50" cy="50" r="30" />
                <circle cx="50" cy="50" r="15" />
                <line x1="50" y1="5" x2="50" y2="95" />
                <line x1="5" y1="50" x2="95" y2="50" />
                <line x1="18" y1="18" x2="82" y2="82" />
                <line x1="82" y1="18" x2="18" y2="82" />
              </svg>
              <div className="text-center">
                <p className="font-mono text-[9px] tracking-[0.4em] text-[#DC2626] mb-2">Your Vision. Our Edit.</p>
                <p className="font-display text-2xl text-white/80 tracking-widest">MY CARD</p>
              </div>
              <motion.div
                className="absolute inset-0 rounded-2xl border border-[#DC2626]/20"
                animate={{ scale: [1, 1.04, 1], opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" as const }}
              />
            </motion.div>

            {/* Hover content overlay */}
            <motion.div
              className="absolute inset-0 flex flex-col justify-end p-5 z-10"
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.4, delay: isHovered ? 0.1 : 0 }}
            >
              <div className="ml-2">
                <p className="font-mono text-[8px] tracking-[0.4em] text-[#DC2626] mb-1">BEHIND THE LENS</p>
                <p className="font-display text-xl text-white leading-tight tracking-widest">CRAFTING<br />VISUAL STORIES</p>
              </div>
            </motion.div>

            {/* Shine / glare layer */}
            {isHovered && (
              <motion.div
                className="absolute inset-0 pointer-events-none rounded-2xl z-20"
                style={{
                  background: `radial-gradient(circle at ${shineX.get()}% ${shineY.get()}%, rgba(255,255,255,0.1) 0%, transparent 60%)`,
                }}
              />
            )}

            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-[#DC2626] rounded-tl-2xl z-20" />
            <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-[#DC2626] rounded-tr-2xl z-20" />
            <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-[#DC2626] rounded-bl-2xl z-20" />
            <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-[#DC2626] rounded-br-2xl z-20" />

            {/* Scanlines overlay */}
            <div className="scanlines absolute inset-0 z-30 pointer-events-none opacity-30" />
          </div>
        </motion.div>
      </motion.div>

      {/* ══════════════════════════════════════════════════════
          CONTACT POPUP — Glossy curved glass window
      ══════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {showContact && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[999]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setShowContact(false)}
              style={{
                background: "radial-gradient(ellipse 80% 65% at 50% 40%, rgba(55,0,0,0.5) 0%, rgba(4,3,7,0.88) 100%)",
                backdropFilter: "blur(20px)",
              }}
            />

            {/* Glossy Panel */}
            <motion.div
              className="fixed z-[1000]"
              style={{ left: "50%", top: "50%", x: "-50%", y: "-50%" }}
              initial={{ scale: 0.8, opacity: 0, y: "calc(-50% + 30px)" }}
              animate={{ scale: 1, opacity: 1, y: "-50%" }}
              exit={{ scale: 0.85, opacity: 0, y: "calc(-50% + 20px)" }}
              transition={{ type: "spring", stiffness: 370, damping: 32, mass: 0.8 }}
            >
              {/* Ambient glow halo */}
              <div
                className="absolute pointer-events-none"
                style={{
                  inset: "-30px",
                  borderRadius: "3rem",
                  background: "radial-gradient(ellipse at 50% 20%, rgba(220,38,38,0.28) 0%, rgba(139,92,246,0.06) 55%, transparent 75%)",
                  filter: "blur(22px)",
                  zIndex: -1,
                }}
              />

              {/* Outer glow border */}
              <div
                className="absolute pointer-events-none"
                style={{
                  inset: "-1.5px",
                  borderRadius: "2.3rem",
                  background: "linear-gradient(145deg, rgba(220,38,38,0.5) 0%, rgba(255,255,255,0.04) 35%, rgba(139,92,246,0.15) 100%)",
                  filter: "blur(0.5px)",
                  zIndex: -1,
                }}
              />

              {/* Glass surface */}
              <div
                className="relative overflow-hidden"
                style={{
                  width: "min(560px, 94vw)",
                  borderRadius: "2.2rem",
                  /* Rich glossy dark background — deep charcoal with red tint */
                  background: "linear-gradient(160deg, #1c0a0a 0%, #0c0a10 30%, #100808 60%, #0a0808 100%)",
                  border: "1px solid rgba(255,255,255,0.13)",
                  boxShadow: [
                    "0 50px 120px rgba(0,0,0,0.85)",
                    "0 0 0 0.5px rgba(220,38,38,0.35)",
                    "inset 0 2px 0 rgba(255,255,255,0.14)",
                    "inset 0 -2px 0 rgba(0,0,0,0.6)",
                    "inset 1px 0 0 rgba(255,255,255,0.04)",
                    "inset -1px 0 0 rgba(255,255,255,0.04)",
                  ].join(", "),
                }}
              >
                {/* Glass top highlight bar */}
                <div
                  className="absolute top-0 left-0 right-0 pointer-events-none"
                  style={{
                    height: "1.5px",
                    background: "linear-gradient(90deg, transparent 3%, rgba(255,255,255,0.12) 25%, rgba(255,255,255,0.42) 50%, rgba(255,255,255,0.12) 75%, transparent 97%)",
                  }}
                />

                {/* Large top-left gloss orb — makes it look truly glossy */}
                <div
                  className="absolute pointer-events-none"
                  style={{
                    top: "-20px", left: "-20px",
                    width: "70%", height: "55%",
                    background: "radial-gradient(ellipse at 20% 15%, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.03) 40%, transparent 70%)",
                    borderRadius: "50%",
                  }}
                />

                {/* Bottom subtle red ambient */}
                <div
                  className="absolute bottom-0 left-0 right-0 pointer-events-none"
                  style={{
                    height: "40%",
                    background: "radial-gradient(ellipse at 50% 100%, rgba(180,20,20,0.08) 0%, transparent 70%)",
                  }}
                />

                {/* ── Cancel button — offset 10px from outer border to sit inside the inner inset ── */}
                <motion.button
                  onClick={() => setShowContact(false)}
                  className="absolute z-50 flex items-center justify-center rounded-full"
                  style={{
                    top: 14, right: 14,
                    width: 34, height: 34,
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.16)",
                  }}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.28, type: "spring", stiffness: 320, damping: 22 }}
                  whileHover={{
                    scale: 1.12,
                    background: "rgba(220,60,60,0.22)",
                    border: "1px solid rgba(255,100,100,0.4)",
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="rgba(255,255,255,0.72)" strokeWidth={2.5} strokeLinecap="round">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </motion.button>

                {/* ── CONTENT — wrapped in 10px margin to create invisible inner border spacing ── */}
                <div className="relative flex flex-col gap-8" style={{ margin: 10, padding: "calc(2.25rem - 10px) calc(2.5rem - 10px) calc(2.25rem - 10px)" }}>

                  {/* ── Header — glossy orb + text ── */}
                  <motion.div
                    className="flex flex-col items-center gap-5 pt-1"
                    initial={{ opacity: 0, y: -14, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.08, type: "spring", stiffness: 250, damping: 22 }}
                  >
                    {/* Glossy orb with pulse rings */}
                    <div className="relative flex items-center justify-center" style={{ width: 84, height: 84 }}>
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="absolute rounded-full"
                          style={{ width: 84, height: 84, border: "1px solid rgba(220,38,38,0.3)" }}
                          animate={{ scale: [1, 1.5 + i * 0.35, 1], opacity: [0.5, 0, 0.5] }}
                          transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: i * 0.62 }}
                        />
                      ))}

                      {/* Glossy orb */}
                      <div
                        className="relative w-[84px] h-[84px] rounded-full flex items-center justify-center"
                        style={{
                          background: "linear-gradient(150deg, #cc2020 0%, #8a0a0a 55%, #3d0000 100%)",
                          boxShadow: [
                            "0 0 0 1.5px rgba(220,38,38,0.6)",
                            "0 12px 45px rgba(220,38,38,0.6)",
                            "0 0 80px rgba(220,38,38,0.2)",
                            "inset 0 2px 0 rgba(255,255,255,0.35)",
                            "inset 0 -3px 8px rgba(0,0,0,0.6)",
                          ].join(", "),
                        }}
                      >
                        <div
                          className="absolute inset-0 rounded-full pointer-events-none"
                          style={{ background: "linear-gradient(145deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.08) 35%, transparent 60%)" }}
                        />
                        <svg viewBox="0 0 24 24" width="32" height="32" fill="white" style={{ position: "relative", zIndex: 10 }}>
                          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.01 2.18 2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14z" />
                        </svg>
                      </div>
                    </div>

                    {/* Header text */}
                    <div className="text-center">
                      <p className="text-[10px] font-mono tracking-[0.5em] text-[#DC2626] uppercase mb-2">
                        Connect With Us
                      </p>
                      <h2 className="text-[23px] font-semibold text-white mb-2" style={{ letterSpacing: "-0.01em", lineHeight: 1.2 }}>
                        Get In Touch
                      </h2>
                      <p className="text-white/30 text-[12px] tracking-wide font-light">
                        Choose your preferred way to reach us
                      </p>
                    </div>
                  </motion.div>

                  {/* ── Divider ── */}
                  <motion.div
                    style={{
                      height: "1px",
                      background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08) 25%, rgba(220,38,38,0.3) 50%, rgba(255,255,255,0.08) 75%, transparent)",
                    }}
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ delay: 0.26, duration: 0.7, ease: "easeOut" }}
                  />

                  {/* ── Contact tiles ── */}
                  <div className="flex gap-6">
                    {contactOptions.map(({ label, sub, delay, color, hex, bgHex, onClick, icon }) => (
                      <motion.button
                        key={label}
                        onClick={onClick}
                        className="relative flex-1 flex flex-col items-center gap-4 pt-5 pb-5 px-3 rounded-2xl overflow-hidden group"
                        style={{
                          /* Subtle tinted glass tile */
                          background: `linear-gradient(165deg, rgba(${color.r},${color.g},${color.b},0.12) 0%, rgba(${color.r},${color.g},${color.b},0.04) 100%)`,
                          /* Clearly visible coloured border */
                          border: `1.5px solid rgba(${color.r},${color.g},${color.b},0.45)`,
                          boxShadow: [
                            `0 4px 20px rgba(${color.r},${color.g},${color.b},0.08)`,
                            "inset 0 1.5px 0 rgba(255,255,255,0.1)",
                            "inset 0 -1px 0 rgba(0,0,0,0.3)",
                          ].join(", "),
                        }}
                        initial={{ opacity: 0, y: 22 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay, duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
                        whileHover={{ scale: 1.04, y: -5 }}
                        whileTap={{ scale: 0.96 }}
                        onMouseEnter={(e) => {
                          const el = e.currentTarget as HTMLButtonElement;
                          el.style.background = `linear-gradient(165deg, rgba(${color.r},${color.g},${color.b},0.2) 0%, rgba(${color.r},${color.g},${color.b},0.08) 100%)`;
                          el.style.borderColor = `rgba(${color.r},${color.g},${color.b},0.72)`;
                          el.style.boxShadow = [
                            `0 12px 35px rgba(${color.r},${color.g},${color.b},0.28)`,
                            "inset 0 1.5px 0 rgba(255,255,255,0.14)",
                          ].join(", ");
                        }}
                        onMouseLeave={(e) => {
                          const el = e.currentTarget as HTMLButtonElement;
                          el.style.background = `linear-gradient(165deg, rgba(${color.r},${color.g},${color.b},0.12) 0%, rgba(${color.r},${color.g},${color.b},0.04) 100%)`;
                          el.style.borderColor = `rgba(${color.r},${color.g},${color.b},0.45)`;
                          el.style.boxShadow = [
                            `0 4px 20px rgba(${color.r},${color.g},${color.b},0.08)`,
                            "inset 0 1.5px 0 rgba(255,255,255,0.1)",
                            "inset 0 -1px 0 rgba(0,0,0,0.3)",
                          ].join(", ");
                        }}
                      >
                        {/* Top glass sheen */}
                        <div
                          className="absolute top-0 left-0 right-0 pointer-events-none"
                          style={{
                            height: "40%",
                            borderRadius: "0.875rem 0.875rem 0 0",
                            background: "linear-gradient(180deg, rgba(255,255,255,0.07) 0%, transparent 100%)",
                          }}
                        />

                        {/* Icon badge */}
                        <div
                          className="relative flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                          style={{
                            width: 44, height: 44,
                            borderRadius: "50%",
                            background: `linear-gradient(145deg, ${hex} 0%, ${bgHex} 100%)`,
                            boxShadow: [
                              `0 6px 18px rgba(${color.r},${color.g},${color.b},0.42)`,
                              "inset 0 1.5px 0 rgba(255,255,255,0.3)",
                              "inset 0 -1px 0 rgba(0,0,0,0.3)",
                            ].join(", "),
                          }}
                        >
                          {/* Gloss cap on badge */}
                          <div
                            className="absolute inset-0 rounded-full pointer-events-none"
                            style={{ background: "linear-gradient(145deg, rgba(255,255,255,0.3) 0%, transparent 55%)" }}
                          />
                          {icon}
                        </div>

                        {/* Label */}
                        <div className="text-center">
                          <p className="text-[13px] font-semibold mb-1.5" style={{ color: "rgba(255,255,255,0.92)" }}>
                            {label}
                          </p>
                          <p className="text-[9px] tracking-[0.3em] font-mono uppercase" style={{ color: hex }}>
                            {sub}
                          </p>
                        </div>

                        {/* Bottom glow line on hover */}
                        <div
                          className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{ background: `linear-gradient(90deg, transparent 15%, ${hex} 50%, transparent 85%)` }}
                        />
                      </motion.button>
                    ))}
                  </div>

                  {/* ── Dismiss hint ── */}
                  <motion.p
                    className="text-center font-mono text-[9px] tracking-[0.38em] uppercase"
                    style={{ color: "rgba(255,255,255,0.16)" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.62 }}
                  >
                    Let's discuss your next project.
                  </motion.p>

                </div>
                {/* ── Phone detail overlay ── */}
                <AnimatePresence>
                  {showPhone && (
                    <motion.div
                      className="absolute inset-0 z-40 flex flex-col items-center justify-center gap-7 px-8"
                      style={{
                        borderRadius: "2.2rem",
                        background: "linear-gradient(160deg, #1c0a0a 0%, #0c0a10 30%, #100808 60%, #0a0808 100%)",
                      }}
                      initial={{ opacity: 0, y: 40, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 30, scale: 0.96 }}
                      transition={{ type: "spring", stiffness: 280, damping: 24 }}
                    >
                      {/* Back button */}
                      <motion.button
                        onClick={() => setShowPhone(false)}
                        className="absolute z-50 flex items-center gap-2 rounded-full"
                        style={{
                          top: 14, left: 14,
                          padding: "6px 14px 6px 10px",
                          background: "rgba(255,255,255,0.07)",
                          border: "1px solid rgba(255,255,255,0.13)",
                          color: "rgba(255,255,255,0.6)",
                          fontSize: 11,
                          fontFamily: "monospace",
                          letterSpacing: "0.06em",
                        }}
                        whileHover={{ background: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.9)" }}
                        whileTap={{ scale: 0.94 }}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.18 }}
                      >
                        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
                          <path d="M19 12H5M12 5l-7 7 7 7" />
                        </svg>
                        BACK
                      </motion.button>

                      {/* Close button */}
                      <motion.button
                        onClick={() => { setShowPhone(false); setShowContact(false); }}
                        className="absolute z-50 flex items-center justify-center rounded-full"
                        style={{
                          top: 14, right: 14,
                          width: 34, height: 34,
                          background: "rgba(255,255,255,0.08)",
                          border: "1px solid rgba(255,255,255,0.16)",
                        }}
                        whileHover={{ background: "rgba(220,60,60,0.22)", border: "1px solid rgba(255,100,100,0.4)" }}
                        whileTap={{ scale: 0.9 }}
                        initial={{ opacity: 0, scale: 0.6 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.22 }}
                      >
                        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="rgba(255,255,255,0.72)" strokeWidth={2.5} strokeLinecap="round">
                          <path d="M18 6 6 18M6 6l12 12" />
                        </svg>
                      </motion.button>

                      {/* Phone icon orb */}
                      <motion.div
                        className="flex items-center justify-center rounded-full"
                        style={{
                          width: 72, height: 72,
                          background: "linear-gradient(145deg, #ef4444 0%, #991b1b 60%, #3d0000 100%)",
                          boxShadow: [
                            "0 0 0 1.5px rgba(220,38,38,0.6)",
                            "0 12px 40px rgba(220,38,38,0.55)",
                            "inset 0 2px 0 rgba(255,255,255,0.3)",
                            "inset 0 -3px 8px rgba(0,0,0,0.5)",
                          ].join(", "),
                        }}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <svg viewBox="0 0 24 24" width="28" height="28" fill="white">
                          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                        </svg>
                      </motion.div>

                      {/* Label */}
                      <motion.div
                        className="flex flex-col items-center gap-2"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.18 }}
                      >
                        <p className="text-[10px] font-mono tracking-[0.45em] uppercase" style={{ color: "#EF4444" }}>
                          Phone Number
                        </p>
                        <p
                          className="text-[28px] font-semibold tracking-tight text-white select-all"
                          style={{ letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}
                        >
                          +91 93706 57289
                        </p>
                      </motion.div>

                      {/* Action buttons */}
                      <motion.div
                        className="flex gap-4 w-full"
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.26 }}
                      >
                        {/* Call button */}
                        <motion.button
                          onClick={handleCallNow}
                          className="flex-1 flex items-center justify-center gap-2.5 rounded-2xl py-4"
                          style={{
                            background: "linear-gradient(145deg, #22c55e 0%, #15803d 100%)",
                            boxShadow: "0 8px 28px rgba(34,197,94,0.4), inset 0 1.5px 0 rgba(255,255,255,0.25)",
                            border: "1px solid rgba(34,197,94,0.5)",
                            color: "white",
                            fontWeight: 600,
                            fontSize: 14,
                            letterSpacing: "0.02em",
                          }}
                          whileHover={{ scale: 1.03, boxShadow: "0 12px 36px rgba(34,197,94,0.55), inset 0 1.5px 0 rgba(255,255,255,0.25)" }}
                          whileTap={{ scale: 0.97 }}
                        >
                          <svg viewBox="0 0 24 24" width="16" height="16" fill="white">
                            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                          </svg>
                          Call Now
                        </motion.button>

                        {/* Copy button */}
                        <motion.button
                          onClick={handleCopyNumber}
                          className="flex-1 flex items-center justify-center gap-2.5 rounded-2xl py-4"
                          style={{
                            background: copied
                              ? "linear-gradient(145deg, rgba(34,197,94,0.18) 0%, rgba(34,197,94,0.06) 100%)"
                              : "rgba(255,255,255,0.07)",
                            border: copied
                              ? "1px solid rgba(34,197,94,0.5)"
                              : "1px solid rgba(255,255,255,0.14)",
                            color: copied ? "#86efac" : "rgba(255,255,255,0.7)",
                            fontWeight: 600,
                            fontSize: 14,
                            letterSpacing: "0.02em",
                            transition: "all 0.3s ease",
                          }}
                          whileHover={{ background: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.95)" }}
                          whileTap={{ scale: 0.97 }}
                        >
                          {copied ? (
                            <>
                              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#86efac" strokeWidth={2.5} strokeLinecap="round">
                                <path d="M20 6 9 17l-5-5" />
                              </svg>
                              Copied!
                            </>
                          ) : (
                            <>
                              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                                <rect x="9" y="9" width="13" height="13" rx="2" />
                                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                              </svg>
                              Copy
                            </>
                          )}
                        </motion.button>
                      </motion.div>

                      {/* Hint */}
                      <motion.p
                        className="text-center font-mono text-[9px] tracking-[0.35em] uppercase"
                        style={{ color: "rgba(255,255,255,0.14)" }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        Tap to call · Long-press to copy
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
