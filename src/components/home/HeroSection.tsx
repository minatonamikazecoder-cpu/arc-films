"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useVideoModal } from "@/components/layout/VideoModal";

interface BannerDbItem {
  section: string;
  media_type: string;
  media_url: string;
  alt_text?: string;
  is_active: boolean;
}

interface HeroSectionProps {
  banners?: BannerDbItem[];
}

export default function HeroSection({ banners }: HeroSectionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { openVideoModal } = useVideoModal();
  const [scrollOpacity, setScrollOpacity] = useState(1);
  
  const heroBanner = banners?.find((b) => b.section === "hero" && b.is_active);
  const reelUrl = heroBanner?.media_url || "https://res.cloudinary.com/dkodvlw5s/video/upload/v1737427499/reel_qfz921.mp4";
  
  // Stats counter state
  const [projectsCount, setProjectsCount] = useState(0);
  const [yearsCount, setYearsCount] = useState(0);
  const [clientsCount, setClientsCount] = useState(0);

  useEffect(() => {
    console.log("HeroSection useEffect started");
    // 1. Scroll opacity handler
    const handleScroll = () => {
      const s = window.scrollY;
      setScrollOpacity(Math.max(0, 1 - s / 200));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // 2. Stats animation observer
    const statsSection = document.getElementById("heroStats");
    let hasAnimated = false;
    
    const animateStat = (target: number, setter: (val: number) => void) => {
      let current = 0;
      const step = target / 60;
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setter(Math.floor(current));
      }, 16);
    };

    const statsObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          hasAnimated = true;
          animateStat(200, setProjectsCount);
          animateStat(5, setYearsCount);
          animateStat(50, setClientsCount);
          statsObserver.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (statsSection) {
      statsObserver.observe(statsSection);
    }

    // 3. 3D Particle Canvas
    const canvas = canvasRef.current;
    console.log("Canvas ref in useEffect:", canvas);
    if (!canvas) {
      console.log("Canvas ref is null, returning early");
      return;
    }

    const ctx = canvas.getContext("2d");
    console.log("Canvas ctx in useEffect:", ctx);
    if (!ctx) {
      console.log("Canvas ctx is null, returning early");
      return;
    }

    let animationFrameId: number;
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let arcAngle = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    document.addEventListener("mousemove", handleMouseMove);

    const resize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Initialize particles
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
    }
    const particles: Particle[] = [];
    const PARTICLE_COUNT = 80;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        color: Math.random() > 0.7 ? "#3b82f6" : "#ffffff",
      });
    }

    const draw = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const scrollYVal = window.scrollY;
      const mx = (mouse.x / canvas.width - 0.5) * 30;
      const my = (mouse.y / canvas.height - 0.5) * 30;

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const r1 = Math.min(canvas.width, canvas.height) * 0.45;
      const r2 = r1 * 0.88;
      const r3 = r1 * 0.75;

      // Outer arc
      ctx.beginPath();
      ctx.arc(cx + mx * 0.1, cy + my * 0.1, r1, Math.PI + arcAngle, 2 * Math.PI + arcAngle);
      ctx.strokeStyle = "rgba(59, 130, 246, 0.05)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Middle arc
      ctx.beginPath();
      ctx.arc(
        cx + mx * 0.15,
        cy + my * 0.15,
        r2,
        Math.PI + arcAngle * 1.2,
        2 * Math.PI + arcAngle * 1.2
      );
      ctx.strokeStyle = "rgba(59, 130, 246, 0.08)";
      ctx.lineWidth = 0.5;
      ctx.stroke();

      // Inner arc
      ctx.beginPath();
      ctx.arc(
        cx + mx * 0.2,
        cy + my * 0.2,
        r3,
        Math.PI + arcAngle * 1.5,
        2 * Math.PI + arcAngle * 1.5
      );
      ctx.strokeStyle = "rgba(99, 102, 241, 0.06)";
      ctx.lineWidth = 0.5;
      ctx.stroke();

      // Draw particles
      particles.forEach((p, i) => {
        p.x += p.vx + mx * 0.002;
        p.y += p.vy + my * 0.002;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity * (1 - scrollYVal / window.innerHeight * 2);
        ctx.fill();
        ctx.globalAlpha = 1;

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const dx = p.x - particles[j].x;
          const dy = p.y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${(1 - dist / 120) * 0.08})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      arcAngle += 0.002;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
      statsObserver.disconnect();
    };
  }, []);

  return (
    <section className="hero" id="hero">
      <div className="hero-bg">
        <div className="hero-noise"></div>
        <div className="hero-particles" id="heroParticles"></div>
        <div className="hero-gradient"></div>
      </div>

      {/* 3D Scene Canvas */}
      <canvas className="hero-canvas" id="heroCanvas" ref={canvasRef}></canvas>

      <div className="hero-content" id="heroContent">
        <div className="hero-eyebrow">
          <span className="hero-line"></span>
          <span className="hero-eyebrow-text">Visual Storytelling Studio</span>
          <span className="hero-line"></span>
        </div>

        <h1 className="hero-title" id="heroTitle">
          <span className="hero-title-line">We Don&apos;t</span>
          <span className="hero-title-line italic">Make Films</span>
          <span className="hero-title-line">We Architect</span>
          <span className="hero-title-line accent">Moments</span>
        </h1>

        <p className="hero-sub">
          ARC Films — Cinematic experiences that transcend the screen.
          <br />
          From documentary to brand film, we tell stories that endure.
        </p>

        <div className="hero-actions">
          <Link href="/work" className="btn-primary" id="heroReel">
            <span className="btn-inner">View Our Work</span>
            <span className="btn-arrow">→</span>
          </Link>
          <button
            className="btn-play"
            id="heroPlay"
            onClick={() =>
              openVideoModal(reelUrl)
            }
          >
            <span className="btn-play-ring"></span>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M6 3.5L14.5 9L6 14.5V3.5Z" fill="white" />
            </svg>
            <span>Play Reel</span>
          </button>
        </div>
      </div>

      <div
        className="hero-scroll-indicator"
        id="scrollIndicator"
        style={{ opacity: scrollOpacity }}
      >
        <div className="hero-scroll-line"></div>
        <span>Scroll</span>
      </div>

      {/* Floating Stats */}
      <div className="hero-stats" id="heroStats">
        <div className="hero-stat">
          <span className="stat-num" data-count="200">
            {projectsCount}
          </span>
          <span className="stat-plus">+</span>
          <span className="stat-label">Projects</span>
        </div>
        <div className="hero-stat">
          <span className="stat-num" data-count="5">
            {yearsCount}
          </span>
          <span className="stat-plus">+</span>
          <span className="stat-label">Years</span>
        </div>
        <div className="hero-stat">
          <span className="stat-num" data-count="50">
            {clientsCount}
          </span>
          <span className="stat-plus">+</span>
          <span className="stat-label">Clients</span>
        </div>
      </div>
    </section>
  );
}
