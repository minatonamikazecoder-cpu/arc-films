"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import AnimateOnScroll from "@/components/AnimateOnScroll";

interface ServiceCardProps {
  index: number;
  num: string;
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
}

export default function ServiceCard({
  index,
  num,
  title,
  description,
  href,
  icon,
}: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [glowStyle, setGlowStyle] = useState<React.CSSProperties>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    setGlowStyle({
      background: `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(59, 130, 246, 0.15), transparent 70%)`,
    });
  };

  const handleMouseLeave = () => {
    setGlowStyle({});
  };

  return (
    <AnimateOnScroll variant="card" delay={(index % 6) * 80} className="h-full">
      <div
        ref={cardRef}
        className="service-card h-full"
        data-index={index}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="service-card-inner">
          <div className="service-icon">{icon}</div>
          <span className="service-num">{num}</span>
          <h3 className="service-title">{title}</h3>
          <p className="service-desc">{description}</p>
          <Link href={href} className="service-link">
            Explore <span>→</span>
          </Link>
          <div className="service-card-glow" style={glowStyle} />
        </div>
      </div>
    </AnimateOnScroll>
  );
}
