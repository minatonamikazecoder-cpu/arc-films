"use client";

import React, { useRef } from "react";
import Image from "next/image";
import SkeletonMedia from "@/components/SkeletonMedia";
import AnimateOnScroll from "@/components/AnimateOnScroll";

interface LogoItemProps {
  src: string;
  alt: string;
  index: number;
}

export default function LogoItem({ src, alt, index }: LogoItemProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const rotX = (y - 0.5) * -15;
    const rotY = (x - 0.5) * 15;

    card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.03)`;
    card.style.transition = "transform 0.15s ease";
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    card.style.transform = "perspective(800px) rotateX(0) rotateY(0) scale(1)";
    card.style.transition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)";
  };

  return (
    <AnimateOnScroll variant="card" delay={index * 50}>
      <div
        ref={cardRef}
        className="logo-item tilt-card"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ position: "relative", overflow: "hidden" }}
      >
        <SkeletonMedia src={src} alt={alt} type="image" fill sizes="(max-width: 600px) 50vw, (max-width: 1200px) 25vw, 15vw" />
      </div>
    </AnimateOnScroll>
  );
}
