"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SkeletonMedia from "@/components/SkeletonMedia";
import AnimateOnScroll from "@/components/AnimateOnScroll";

interface BannerDbItem {
  section: string;
  media_type: string;
  media_url: string;
  alt_text?: string;
  is_active: boolean;
}

interface AboutStripProps {
  banners?: BannerDbItem[];
}

export default function AboutStrip({ banners }: AboutStripProps) {
  const skillsRef = useRef<HTMLDivElement>(null);
  const [animateSkills, setAnimateSkills] = useState(false);
  
  const aboutBanner = banners?.find((b) => b.section === "about" && b.is_active);
  const mainImgUrl = aboutBanner?.media_url || "/images/about.png";

  useEffect(() => {
    const skillsContainer = skillsRef.current;
    if (!skillsContainer) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setAnimateSkills(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(skillsContainer);

    return () => {
      observer.disconnect();
    };
  }, []);

  const skills = [
    { label: "Film Production", width: 95 },
    { label: "Motion Design", width: 90 },
    { label: "Brand Identity", width: 85 },
    { label: "3D Animation", width: 80 },
  ];

  return (
    <section className="about-section" id="aboutSection">
      <div className="about-container">
        <div className="about-left">
          <AnimateOnScroll className="section-label">
            <span>04</span>
            <span>About ARC Films</span>
          </AnimateOnScroll>
          <h2 className="about-title">
            <AnimateOnScroll variant="reveal" delay={0}>
              <span>Born From</span>
            </AnimateOnScroll>
            <AnimateOnScroll variant="reveal" delay={150}>
              <span className="italic">Obsession</span>
            </AnimateOnScroll>
          </h2>
          <AnimateOnScroll variant="reveal" delay={300}>
            <p className="about-text">
              ARC Films is a visual storytelling studio founded on a singular obsession: creating work that matters. Based in India, working worldwide.
            </p>
          </AnimateOnScroll>
          <AnimateOnScroll variant="reveal" delay={400}>
            <p className="about-text">
              We&apos;re a collective of directors, designers, motion artists, and technologists who believe that great storytelling can change how people see the world.
            </p>
          </AnimateOnScroll>

          <div className="about-skills" ref={skillsRef}>
            {skills.map((skill, index) => (
              <div className="about-skill" key={index}>
                <span className="skill-label">{skill.label}</span>
                <div className="skill-bar">
                  <div
                    className="skill-fill"
                    style={{
                      width: animateSkills ? `${skill.width}%` : "0%",
                      transition: "width 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <AnimateOnScroll variant="reveal" delay={500}>
            <Link href="/about" className="btn-outline">
              Full Story →
            </Link>
          </AnimateOnScroll>
        </div>

        <div className="about-right">
          <div className="about-img-stack">
            <div className="about-img-main" style={{ position: "relative", overflow: "hidden" }}>
              <SkeletonMedia src={mainImgUrl} alt="ARC Films - Behind the Scenes" type="image" fill sizes="(max-width: 900px) 100vw, 50vw" />
            </div>
            <div className="about-img-accent" style={{ position: "relative", width: "100%", height: "180px", overflow: "hidden" }}>
              <SkeletonMedia src="/images/reel.png" alt="ARC Films - On Location" type="image" fill />
            </div>
            <div className="about-badge">
              <span className="badge-year">Est.</span>
              <span className="badge-num">2019</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
