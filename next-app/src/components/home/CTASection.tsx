"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import AnimateOnScroll from "@/components/AnimateOnScroll";

interface CTASectionProps {
  label?: string;
  titleLine1?: string;
  titleLine2?: string;
  description?: string;
  btnText?: string;
  btnHref?: string;
  hideSocials?: boolean;
}

export default function CTASection({
  label = "Ready to Begin?",
  titleLine1 = "Let's Make",
  titleLine2 = "Something Legendary",
  description = "Whether it's a feature film, brand identity, or a single frame that stops the world — we're ready when you are.",
  btnText = "Start a Project",
  btnHref = "/contact",
  hideSocials = false,
}: CTASectionProps) {
  const ctaRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);

  const [gridStyle, setGridStyle] = useState<React.CSSProperties>({});
  const [btnStyle, setBtnStyle] = useState<React.CSSProperties>({});

  const handleCTAMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const cta = ctaRef.current;
    if (!cta) return;

    const rect = cta.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const glow = `radial-gradient(ellipse 60% 60% at ${x * 100}% ${y * 100}%, rgba(59, 130, 246, 0.12), transparent 70%)`;
    setGridStyle({
      background: `${glow}, linear-gradient(rgba(59, 130, 246, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.05) 1px, transparent 1px)`,
      backgroundSize: "auto, 60px 60px, 60px 60px",
    });
  };

  const handleCTAMouseLeave = () => {
    setGridStyle({});
  };

  const handleBtnMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const btn = btnRef.current;
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    setBtnStyle({
      transform: `translate(${x * 0.15}px, ${y * 0.15}px)`,
      transition: "transform 0.15s ease",
    });
  };

  const handleBtnMouseLeave = () => {
    setBtnStyle({
      transform: "translate(0, 0)",
      transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
    });
  };

  return (
    <section
      className="cta-section"
      id="ctaSection"
      ref={ctaRef}
      onMouseMove={handleCTAMouseMove}
      onMouseLeave={handleCTAMouseLeave}
    >
      <div className="cta-bg">
        <div className="cta-noise"></div>
        <div className="cta-grid-lines" style={gridStyle}></div>
      </div>
      <div className="cta-content">
        <AnimateOnScroll className="cta-label">{label}</AnimateOnScroll>
        <h2 className="cta-title">
          <AnimateOnScroll variant="reveal" delay={0}>
            <span>{titleLine1}</span>
          </AnimateOnScroll>
          <AnimateOnScroll variant="reveal" delay={150}>
            <span className="italic">{titleLine2}</span>
          </AnimateOnScroll>
        </h2>
        <AnimateOnScroll variant="reveal" delay={300}>
          <p className="cta-desc">{description}</p>
        </AnimateOnScroll>
        <div className="cta-actions">
          <AnimateOnScroll variant="reveal" delay={400} className="inline-block">
            <Link
              href={btnHref}
              className="btn-primary large"
              id="ctaBtn"
              ref={btnRef}
              style={btnStyle}
              onMouseMove={handleBtnMouseMove}
              onMouseLeave={handleBtnMouseLeave}
            >
              <span>{btnText}</span>
              <span className="btn-arrow">→</span>
            </Link>
          </AnimateOnScroll>
          {!hideSocials && (
            <div className="cta-social">
              <a
                href="https://www.instagram.com/yash_pancholi_37?igsh=MWp4MHExZHB3amJx"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-social-link"
                aria-label="Instagram"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/pancholi-yash-b161792b5/"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-social-link"
                aria-label="LinkedIn"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a
                href="mailto:yashpancholi111@gmail.com"
                className="cta-social-link"
                aria-label="Email"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
