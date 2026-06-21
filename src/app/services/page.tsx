import React from "react";
import Image from "next/image";
import SkeletonMedia from "@/components/SkeletonMedia";
import { createClient } from "@/lib/supabase/server";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import CTASection from "@/components/home/CTASection";

export const revalidate = 31536000; // Revalidate on-demand (indefinite cache, 1 year TTL)

interface ServiceRow {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  long_description?: string;
  category_label?: string;
  includes?: unknown; // could be array or JSON string
  preview_media_type?: string;
  preview_media_url?: string;
  sort_order: number;
  is_active: boolean;
}

export default async function ServicesPage() {
  const supabase = await createClient();

  const { data: dbServices } = await supabase
    .from("services")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  const services = (dbServices || []) as ServiceRow[];

  return (
    <main className="services-page">
      <div className="services-page-hero">
        <AnimateOnScroll className="section-label">
          <span>Services</span>
          <span>What We Offer</span>
        </AnimateOnScroll>
        <h1 className="services-page-title">
          <AnimateOnScroll variant="reveal" delay={0}>
            <span>{services.length > 0 ? `${services.length} Ways We` : "How We"}</span>
          </AnimateOnScroll>
          <AnimateOnScroll variant="reveal" delay={150}>
            <span className="line2">Tell Your Story</span>
          </AnimateOnScroll>
        </h1>
        <AnimateOnScroll variant="reveal" delay={300}>
          <p className="services-page-sub">
            Every discipline we practice is built on the same foundation: relentless attention to craft, deep respect for your vision, and an obsessive commitment to excellence.
          </p>
        </AnimateOnScroll>
      </div>

      <div className="service-full-list">
        {services.length === 0 ? (
          <div style={{ textAlign: "center", color: "#64748b", padding: "64px" }}>
            No services listed at the moment. Please check back later.
          </div>
        ) : (
          services.map((service, index) => {
            const num = String(index + 1).padStart(2, "0");
            const elementId = `service-${service.slug || service.id}`;
            
            // Parse includes array safely
            let includesList: string[] = [];
            if (service.includes) {
              if (Array.isArray(service.includes)) {
                includesList = service.includes;
              } else if (typeof service.includes === "string") {
                try {
                  includesList = JSON.parse(service.includes);
                } catch {
                  includesList = [];
                }
              }
            }

            return (
              <div className="service-full-item" id={elementId} key={service.id}>
                <div className="service-full-left">
                  <AnimateOnScroll variant="reveal" delay={0}>
                    <div className="service-full-num">{num}</div>
                  </AnimateOnScroll>
                  <AnimateOnScroll variant="reveal" delay={100}>
                    <h2 className="service-full-title">{service.title}</h2>
                  </AnimateOnScroll>
                  <AnimateOnScroll variant="reveal" delay={200}>
                    <span className="service-full-cat">{service.category_label || "Other"}</span>
                  </AnimateOnScroll>
                </div>
                <div className="service-full-right">
                  <AnimateOnScroll variant="reveal" delay={150}>
                    <p className="service-full-desc">
                      {service.long_description || service.short_description}
                    </p>
                  </AnimateOnScroll>
                  
                  {includesList.length > 0 && (
                    <div className="service-full-includes">
                      <AnimateOnScroll variant="reveal" delay={200}>
                        <h4>What&apos;s Included</h4>
                      </AnimateOnScroll>
                      <ul>
                        {includesList.map((item, idx) => (
                          <AnimateOnScroll
                            key={idx}
                            variant="card"
                            delay={idx * 40}
                            className="inline-flex"
                          >
                            <li>{item}</li>
                          </AnimateOnScroll>
                        ))}
                      </ul>
                    </div>
                  )}

                  {service.preview_media_url && (
                    <AnimateOnScroll variant="reveal" delay={300} className="service-full-preview" style={{ position: "relative", overflow: "hidden", minHeight: "300px" }}>
                      {service.preview_media_type === "youtube" ? (
                        <SkeletonMedia
                          src={service.preview_media_url}
                          alt={service.title}
                          type="iframe"
                          fill
                        />
                      ) : service.preview_media_type === "video" ? (
                        <SkeletonMedia
                          src={service.preview_media_url}
                          alt={service.title}
                          type="video"
                          fill
                        />
                      ) : (
                        <SkeletonMedia
                          src={service.preview_media_url}
                          alt={service.title}
                          type="image"
                          fill
                          sizes="(max-width: 900px) 100vw, 50vw"
                        />
                      )}
                    </AnimateOnScroll>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* CTA */}
      <CTASection
        label="Ready to Start?"
        titleLine1="Let's Make"
        titleLine2="Something Great"
        description="Tell us what you need. We'll tell you how we can make it extraordinary."
        btnText="Get a Quote"
        btnHref="/contact"
        hideSocials={true}
      />
    </main>
  );
}
