"use client";

import Image from "next/image";
import SkeletonMedia from "@/components/SkeletonMedia";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import { useVideoModal } from "@/components/layout/VideoModal";

export default function FeaturedReel() {
  const { openVideoModal } = useVideoModal();

  const handlePlayReel = () => {
    openVideoModal("https://res.cloudinary.com/dkodvlw5s/video/upload/v1737427499/reel_qfz921.mp4");
  };

  return (
    <section className="reel-section" id="reelSection">
      <div className="reel-container">
        <AnimateOnScroll className="section-label">
          <span>01</span>
          <span>Featured Reel</span>
        </AnimateOnScroll>

        <div className="reel-text">
          <h2 className="reel-title">
            <AnimateOnScroll variant="reveal" delay={0}>
              <span>Every Frame</span>
            </AnimateOnScroll>
            <AnimateOnScroll variant="reveal" delay={150}>
              <span className="italic">Tells A Story</span>
            </AnimateOnScroll>
          </h2>
        </div>

        <AnimateOnScroll variant="reveal" delay={300}>
          <div className="reel-player" id="reelPlayer">
            <div className="reel-thumb">
              <SkeletonMedia src="/images/reel.png" alt="ARC Films Showreel" type="image" fill sizes="(max-width: 900px) 100vw, 80vw" />
              <div className="reel-overlay">
                <button className="reel-play-btn" id="reelPlayBtn" onClick={handlePlayReel}>
                  <div className="reel-play-ring"></div>
                  <div className="reel-play-ring delay"></div>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M8 5L19 12L8 19V5Z" fill="white" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="reel-info">
              <span className="reel-year">2024</span>
              <span className="reel-title-sm">ARC Films — Official Showreel</span>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
