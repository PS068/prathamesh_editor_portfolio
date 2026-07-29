"use client";

import { useEffect, useRef } from "react";
import { useAnimationFrame } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
}

export default function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Spawn initial particles
    for (let i = 0; i < 60; i++) {
      spawnParticle(canvas.width, canvas.height);
    }

    return () => window.removeEventListener("resize", resize);
  }, []);

  function spawnParticle(w: number, h: number) {
    particlesRef.current.push({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      life: Math.random() * 200,
      maxLife: 200 + Math.random() * 200,
      size: Math.random() * 1.5 + 0.3,
    });
  }

  useAnimationFrame((t) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    timeRef.current = t * 0.001;
    const { width, height } = canvas;

    // Clear with slight trail (ghosting)
    ctx.fillStyle = "rgba(0,0,0,0.15)";
    ctx.fillRect(0, 0, width, height);

    // Update + draw particles
    particlesRef.current = particlesRef.current.filter((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.life++;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      const alpha =
        Math.sin((p.life / p.maxLife) * Math.PI) * 0.5;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(220,38,38,${alpha * 0.4})`;
      ctx.fill();

      // Draw connections between nearby particles
      particlesRef.current.forEach((other) => {
        const dx = other.x - p.x;
        const dy = other.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120 && dist > 0) {
          const lineAlpha = (1 - dist / 120) * alpha * 0.15;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(other.x, other.y);
          ctx.strokeStyle = `rgba(220,38,38,${lineAlpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      });

      return p.life < p.maxLife;
    });

    // Respawn dead particles
    const deficit = 60 - particlesRef.current.length;
    for (let i = 0; i < deficit; i++) {
      spawnParticle(width, height);
    }

    // Draw slow drifting horizontal scan lines
    const scanY =
      ((timeRef.current * 30) % (height + 40)) - 20;
    const grad = ctx.createLinearGradient(0, scanY - 2, 0, scanY + 2);
    grad.addColorStop(0, "transparent");
    grad.addColorStop(0.5, "rgba(220,38,38,0.04)");
    grad.addColorStop(1, "transparent");
    ctx.fillStyle = grad;
    ctx.fillRect(0, scanY - 2, width, 4);
  });

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.8 }}
    />
  );
}
