"use client";

import React, { useState } from "react";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import CTASection from "@/components/home/CTASection";

export interface Category {
  id: string;
  name: string;
  slug: string;
  display_name: string;
  section_title?: string;
  sort_order: number;
  is_active: boolean;
}

export interface WorkItem {
  id: string;
  category_id: string;
  title: string;
  subtitle?: string;
  slug: string;
  media_type: string;
  media_url: string;
  thumbnail_url?: string;
  alt_text?: string;
  aspect_ratio?: string;
  is_featured: boolean;
  is_home_showcase: boolean;
  sort_order: number;
  is_active: boolean;
}

interface WorkPageClientProps {
  categories: Category[];
  workItems: WorkItem[];
}

export default function WorkPageClient({ categories, workItems }: WorkPageClientProps) {
  const [activeFilter, setActiveFilter] = useState("all");

  const handleFilterClick = (filterId: string) => {
    setActiveFilter(filterId);
    let targetId = filterId;
    if (filterId === "all") {
      // Find the first category slug to scroll to
      targetId = categories[0]?.slug || "";
    }
    
    if (targetId) {
      const element = document.getElementById(targetId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 50);
      }
    }
  };

  const getGridClassName = (slug: string) => {
    switch (slug) {
      case "video": return "video-work-grid";
      case "logo": return "logo-work-grid";
      case "logo-anim": return "logo-anim-grid";
      case "motion": return "shortform-grid";
      case "branding": return "branding-grid";
      case "3d": return "three-d-grid";
      case "thumbnails": return "thumb-full-grid";
      default: return "video-work-grid";
    }
  };

  const getItemClassName = (slug: string) => {
    switch (slug) {
      case "video": return "video-work-item";
      case "logo": return "logo-work-item tilt-card";
      case "logo-anim": return "logo-anim-item";
      case "motion": return "shortform-item";
      case "branding": return "branding-item";
      case "3d": return "three-d-item";
      case "thumbnails": return "thumb-full-item";
      default: return "video-work-item";
    }
  };

  return (
    <main className="work-page">
      {/* Hero */}
      <div className="work-page-hero">
        <AnimateOnScroll className="section-label">
          <span>Portfolio</span>
          <span>Selected Work 2019–2025</span>
        </AnimateOnScroll>
        <h1 className="work-page-title">
          <AnimateOnScroll variant="reveal" delay={0}>
            <span>Our</span>
          </AnimateOnScroll>
          <AnimateOnScroll variant="reveal" delay={150}>
            <span className="line2">Body of Work</span>
          </AnimateOnScroll>
        </h1>
      </div>

      {/* Filter Tabs */}
      {categories.length > 0 && (
        <div className="work-filters">
          <div className="filter-tabs">
            <button
              className={`filter-tab ${activeFilter === "all" ? "active" : ""}`}
              onClick={() => handleFilterClick("all")}
            >
              All Work
            </button>
            {categories.map((filter) => (
              <button
                key={filter.id}
                className={`filter-tab ${activeFilter === filter.slug ? "active" : ""}`}
                onClick={() => handleFilterClick(filter.slug)}
              >
                {filter.display_name}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="work-full-section">
        <div className="work-full-inner">
          {categories.length === 0 ? (
            <div style={{ textAlign: "center", color: "#64748b", padding: "64px" }}>
              No portfolio work found. Please check back later.
            </div>
          ) : (
            categories.map((cat) => {
              const catItems = workItems.filter((item) => item.category_id === cat.id);
              if (catItems.length === 0) return null;

              const gridClass = getGridClassName(cat.slug);
              const itemClass = getItemClassName(cat.slug);
              const numLabel = String(catItems.length).padStart(2, "0");

              return (
                <div key={cat.id} id={cat.slug} style={{ marginBottom: "64px" }}>
                  {/* Section Divider */}
                  <div className="section-divider">
                    <h2>{cat.section_title || cat.display_name}</h2>
                    <div className="divider-line"></div>
                    <span className="section-label" style={{ margin: 0 }}>
                      <span style={{ color: "var(--blue-bright)" }}>{numLabel}</span>
                    </span>
                  </div>

                  {/* Grid */}
                  <div className={gridClass}>
                    {catItems.map((item, idx) => (
                      <AnimateOnScroll
                        key={item.id}
                        variant="card"
                        delay={idx * 60}
                        className={itemClass}
                      >
                        {item.media_type === "youtube" ? (
                          <iframe
                            src={item.media_url}
                            title={item.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            loading="lazy"
                          />
                        ) : item.media_type === "video" ? (
                          <video autoPlay muted loop playsInline poster={item.thumbnail_url}>
                            <source src={item.media_url} type="video/mp4" />
                          </video>
                        ) : (
                          <img src={item.media_url} alt={item.alt_text || item.title} loading="lazy" />
                        )}

                        {/* Title Info overlays for Video or when subtitle/title present */}
                        {(cat.slug === "video" || item.subtitle || item.title) && (
                          <div className="video-work-info">
                            <span className="video-work-cat">{item.subtitle || cat.display_name}</span>
                            <div className="video-work-title">{item.title}</div>
                          </div>
                        )}
                      </AnimateOnScroll>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* CTA */}
      <CTASection
        label="Like What You See?"
        titleLine1="Start Your"
        titleLine2="Project Today"
        btnText="Get In Touch"
        btnHref="/contact"
        hideSocials={true}
      />
    </main>
  );
}
