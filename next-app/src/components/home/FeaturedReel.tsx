"use client";

import Image from "next/image";
import SkeletonMedia from "@/components/SkeletonMedia";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import { useVideoModal } from "@/components/layout/VideoModal";

interface FeaturedReelProps {
  reel?: {
    title: string;
    year: string;
    video_url: string;
    thumbnail_url?: string | null;
  } | null;
}

export default function FeaturedReel({ reel }: FeaturedReelProps) {
  const { openVideoModal } = useVideoModal();

  const title = reel?.title || "ARC Films — Official Showreel";
  const year = reel?.year || "2026";
  const videoUrl = reel?.video_url || "https://youtu.be/e88jccNOcpo";
  const thumbnailUrl = reel?.thumbnail_url || "/images/reel.png";

  const handlePlayReel = () => {
    openVideoModal(videoUrl);
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
              <SkeletonMedia src={thumbnailUrl} alt={title} type="image" fill sizes="(max-width: 900px) 100vw, 80vw" />
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
              <span className="reel-year">{year}</span>
              <span className="reel-title-sm">{title}</span>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
