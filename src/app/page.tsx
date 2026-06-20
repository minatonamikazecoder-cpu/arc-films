import React from "react";
import { createClient } from "@/lib/supabase/server";
import HeroSection from "@/components/home/HeroSection";
import MarqueeStrip from "@/components/home/MarqueeStrip";
import FeaturedReel from "@/components/home/FeaturedReel";
import ServicesGrid from "@/components/home/ServicesGrid";
import WorkShowcase from "@/components/home/WorkShowcase";
import ParallaxStatement from "@/components/home/ParallaxStatement";
import AboutStrip from "@/components/home/AboutStrip";
import VideoGallery from "@/components/home/VideoGallery";
import LogoGallery from "@/components/home/LogoGallery";
import Animation3DSection from "@/components/home/Animation3DSection";
import ThumbnailGrid from "@/components/home/ThumbnailGrid";
import CTASection from "@/components/home/CTASection";

export const revalidate = 31536000; // Revalidate on-demand (indefinite cache, 1 year TTL)

export default async function Home() {
  const supabase = await createClient();

  // Fetch data in parallel
  const [servicesResult, showcaseResult, bannersResult] = await Promise.all([
    supabase
      .from("services")
      .select("id, title, slug, short_description, icon_svg")
      .eq("is_active", true)
      .order("sort_order", { ascending: true }),
    supabase
      .from("work_items")
      .select("id, title, subtitle, slug, media_type, media_url, is_featured, work_categories(name, slug)")
      .eq("is_active", true)
      .eq("is_home_showcase", true)
      .order("sort_order", { ascending: true }),
    supabase
      .from("banners")
      .select("section, media_type, media_url, alt_text, is_active")
      .eq("is_active", true)
      .order("sort_order", { ascending: true }),
  ]);

  const services = servicesResult.data;
  const showcaseData = showcaseResult.data;
  const banners = bannersResult.data;

  interface ShowcaseDbRow {
    id: string;
    title: string;
    subtitle: string | null;
    slug: string;
    media_type: string;
    media_url: string;
    is_featured: boolean;
    work_categories: { name: string; slug: string } | { name: string; slug: string }[] | null;
  }

  const showcase = (showcaseData as unknown as ShowcaseDbRow[] || []).map((item) => ({
    id: item.id,
    title: item.title,
    subtitle: item.subtitle || undefined,
    slug: item.slug,
    media_type: item.media_type,
    media_url: item.media_url,
    is_featured: item.is_featured,
    work_categories: Array.isArray(item.work_categories)
      ? item.work_categories[0] || null
      : item.work_categories || null
  }));

  return (
    <main>
      <HeroSection banners={banners || []} />
      <MarqueeStrip />
      <FeaturedReel />
      <ServicesGrid services={services || []} />
      <WorkShowcase items={showcase} />
      <ParallaxStatement banners={banners || []} />
      <AboutStrip banners={banners || []} />
      <VideoGallery />
      <LogoGallery />
      <Animation3DSection />
      <ThumbnailGrid />
      <CTASection />
    </main>
  );
}
