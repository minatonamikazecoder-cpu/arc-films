"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

interface BannerDbItem {
  section: string;
  media_type: string;
  media_url: string;
  alt_text?: string;
  is_active: boolean;
}

interface ParallaxStatementProps {
  banners?: BannerDbItem[];
}

export default function ParallaxStatement({ banners }: ParallaxStatementProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  
  const statementBanner = banners?.find((b) => b.section === "statement" && b.is_active);
  const imgUrl = statementBanner?.media_url || "/images/about.png";

  useEffect(() => {
    const section = sectionRef.current;
    const img = imgRef.current;
    if (!section || !img) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();

      // Check if section is in viewport
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        const offset = progress * 80 - 40;
        img.style.transform = `scale(1.1) translateY(${offset}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once initially
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="statement-section" id="statementSection" ref={sectionRef}>
      <div className="statement-bg" style={{ position: "relative" }}>
        <Image
          src={imgUrl}
          alt="ARC Films behind the scenes"
          className="statement-bg-img"
          id="statementBgImg"
          ref={imgRef}
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
        <div className="statement-overlay"></div>
      </div>
      <div className="statement-content">
        <blockquote className="statement-quote">
          &quot;We believe every frame is a decision.
          <br />
          Every cut, a breath.
          <br />
          Every story, a universe.&quot;
        </blockquote>
        <cite className="statement-cite">— Yash Pancholi, Founder &amp; Creative Director</cite>
      </div>
    </section>
  );
}
