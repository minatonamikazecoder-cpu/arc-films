"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import AnimateOnScroll from "@/components/AnimateOnScroll";

interface ShowcaseDbItem {
  id: string;
  title: string;
  subtitle?: string;
  slug: string;
  media_type: string;
  media_url: string;
  is_featured: boolean;
  work_categories?: {
    name: string;
    slug: string;
  } | null;
}

interface WorkShowcaseProps {
  items?: ShowcaseDbItem[];
}

export default function WorkShowcase({ items }: WorkShowcaseProps) {
  const galleryRef = useRef<HTMLDivElement>(null);
  
  const staticItems = [
    {
      id: "1",
      category: "Video Production",
      title: "Cinematic Showreel",
      mediaType: "video" as const,
      mediaUrl: "https://res.cloudinary.com/dkodvlw5s/video/upload/v1737427524/video_pwazu4.mp4",
      href: "/work#video",
    },
    {
      id: "2",
      category: "Logo Animation",
      title: "Dynamic Brand Reveal",
      mediaType: "video" as const,
      mediaUrl: "https://res.cloudinary.com/dkodvlw5s/video/upload/v1737427486/logo_q70c1i.mp4",
      href: "/work#logo-anim",
    },
    {
      id: "3",
      category: "3D Animation",
      title: "Dimensional Worlds",
      mediaType: "video" as const,
      mediaUrl: "https://res.cloudinary.com/dkodvlw5s/video/upload/v1737514508/3d_scene_1_2_zpi58f.mp4",
      href: "/work#3d",
    },
    {
      id: "4",
      category: "Brand Identity",
      title: "Identity Systems",
      mediaType: "image" as const,
      mediaUrl: "https://res.cloudinary.com/dkodvlw5s/image/upload/v1737427466/brand-identity-preview_nkj7du.jpg",
      href: "/work#branding",
      isLarge: true,
    },
    {
      id: "5",
      category: "Motion",
      title: "Logo in Motion",
      mediaType: "video" as const,
      mediaUrl: "https://res.cloudinary.com/dkodvlw5s/video/upload/v1737427467/log_animation_anibuj.mp4",
      href: "/work#logo-anim",
    },
    {
      id: "6",
      category: "Short Form Content",
      title: "Viral Moments",
      mediaType: "video" as const,
      mediaUrl: "https://res.cloudinary.com/dkodvlw5s/video/upload/v1737427499/reel_qfz921.mp4",
      href: "/work#motion",
    },
  ];

  const renderedItems = (items && items.length > 0)
    ? items.map((item, idx) => ({
        id: item.id,
        category: item.work_categories?.name || item.subtitle || "Showcase",
        title: item.title,
        mediaType: (item.media_type === "video" || item.media_type === "youtube") ? ("video" as const) : ("image" as const),
        mediaUrl: item.media_url,
        href: `/work#${item.work_categories?.slug || "video"}`,
        isLarge: idx === 3
      }))
    : staticItems;

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;
    let velocity = 0;
    let lastX = 0;
    let animFrame: number;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      startX = e.pageX - gallery.offsetLeft;
      scrollLeft = gallery.scrollLeft;
      lastX = e.pageX;
      gallery.style.cursor = "grabbing";
      cancelAnimationFrame(animFrame);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - gallery.offsetLeft;
      const walk = (x - startX) * 1.5;
      velocity = e.pageX - lastX;
      lastX = e.pageX;
      gallery.scrollLeft = scrollLeft - walk;
    };

    const onMouseUp = () => {
      isDragging = false;
      gallery.style.cursor = "grab";
      momentum();
    };

    const onMouseLeave = () => {
      if (isDragging) {
        isDragging = false;
        gallery.style.cursor = "grab";
        momentum();
      }
    };

    const momentum = () => {
      if (Math.abs(velocity) < 0.5) return;
      gallery.scrollLeft -= velocity;
      velocity *= 0.92;
      animFrame = requestAnimationFrame(momentum);
    };

    // Touch Support
    let touchStartX = 0;
    let touchScrollLeft = 0;

    const onTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].pageX;
      touchScrollLeft = gallery.scrollLeft;
    };

    const onTouchMove = (e: TouchEvent) => {
      const walk = (touchStartX - e.touches[0].pageX) * 1.5;
      gallery.scrollLeft = touchScrollLeft + walk;
    };

    // Register event listeners
    gallery.addEventListener("mousedown", onMouseDown);
    gallery.addEventListener("mousemove", onMouseMove);
    gallery.addEventListener("mouseup", onMouseUp);
    gallery.addEventListener("mouseleave", onMouseLeave);
    
    gallery.addEventListener("touchstart", onTouchStart, { passive: true });
    gallery.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      gallery.removeEventListener("mousedown", onMouseDown);
      gallery.removeEventListener("mousemove", onMouseMove);
      gallery.removeEventListener("mouseup", onMouseUp);
      gallery.removeEventListener("mouseleave", onMouseLeave);
      
      gallery.removeEventListener("touchstart", onTouchStart);
      gallery.removeEventListener("touchmove", onTouchMove);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  return (
    <section className="work-section" id="workSection">
      <div className="work-header">
        <AnimateOnScroll className="section-label">
          <span>03</span>
          <span>Selected Work</span>
        </AnimateOnScroll>
        <h2 className="work-title">
          <AnimateOnScroll variant="reveal" delay={0}>
            <span>Where Vision</span>
          </AnimateOnScroll>
          <AnimateOnScroll variant="reveal" delay={150}>
            <span className="italic">Meets Frame</span>
          </AnimateOnScroll>
        </h2>
        <AnimateOnScroll variant="reveal" delay={300}>
          <Link href="/work" className="btn-outline">
            View All Work →
          </Link>
        </AnimateOnScroll>
      </div>

      <div className="work-gallery" id="workGallery" ref={galleryRef} style={{ cursor: "grab" }}>
        <div className="work-track" id="workTrack">
          {renderedItems.map((item, index) => (
            <AnimateOnScroll
              key={item.id}
              variant="card"
              delay={(index % 6) * 80}
              className={`work-item ${item.isLarge ? "large" : ""}`}
            >
              <div className="work-item-inner">
                <div className="work-item-media">
                  {item.mediaType === "video" ? (
                    <video autoPlay muted loop playsInline>
                      <source src={item.mediaUrl} type="video/mp4" />
                    </video>
                  ) : (
                    <Image src={item.mediaUrl} alt={item.title} fill sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw" style={{ objectFit: "cover" }} />
                  )}
                  <div className="work-item-overlay">
                    <Link href={item.href} className="work-item-link">
                      View Project →
                    </Link>
                  </div>
                </div>
                <div className="work-item-info">
                  <span className="work-item-cat">{item.category}</span>
                  <h3 className="work-item-title">{item.title}</h3>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>

      <div className="work-drag-hint" id="workDragHint">
        <span>← Drag to explore →</span>
      </div>
    </section>
  );
}
