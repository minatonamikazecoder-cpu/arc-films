import React from "react";
import { createPublicClient } from "@/lib/supabase/public";
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
  const supabase = createPublicClient();

  // Fetch data in parallel
  const [servicesResult, workItemsResult, bannersResult, featuredReelResult] = await Promise.all([
    supabase
      .from("services")
      .select("id, title, slug, short_description, icon_svg")
      .eq("is_active", true)
      .order("sort_order", { ascending: true }),
    supabase
      .from("work_items")
      .select("id, title, subtitle, slug, media_type, media_url, thumbnail_url, alt_text, aspect_ratio, is_featured, is_home_showcase, work_categories(name, slug)")
      .eq("is_active", true)
      .order("sort_order", { ascending: true }),
    supabase
      .from("banners")
      .select("section, media_type, media_url, alt_text, is_active")
      .eq("is_active", true)
      .order("sort_order", { ascending: true }),
    supabase
      .from("featured_reel")
      .select("title, year, video_url, thumbnail_url")
      .eq("is_active", true)
      .maybeSingle()
  ]);

  const services = servicesResult.data;
  const workItems = workItemsResult.data || [];
  const banners = bannersResult.data;
  const featuredReel = featuredReelResult.data || null;

  interface ShowcaseDbRow {
    id: string;
    title: string;
    subtitle: string | null;
    slug: string;
    media_type: string;
    media_url: string;
    thumbnail_url: string | null;
    alt_text: string | null;
    aspect_ratio: string | null;
    is_featured: boolean;
    is_home_showcase: boolean;
    work_categories: { name: string; slug: string } | { name: string; slug: string }[] | null;
  }

  const typedWorkItems = workItems as unknown as ShowcaseDbRow[];

  const showcase = typedWorkItems.filter(item => item.is_home_showcase).map((item) => ({
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

  const getItemsByCategory = (slug: string) => {
    return typedWorkItems.filter(item => {
      const cat = Array.isArray(item.work_categories) ? item.work_categories[0] : item.work_categories;
      return cat?.slug === slug;
    });
  };

  const videoItems = getItemsByCategory("video");
  const logoItems = getItemsByCategory("logo");
  const animation3DItems = getItemsByCategory("3d");
  const thumbnailItems = getItemsByCategory("thumbnails");

  return (
    <main>
      <HeroSection banners={banners || []} />
      <MarqueeStrip />
      <FeaturedReel reel={featuredReel} />
      <ServicesGrid services={services || []} />
      <WorkShowcase items={showcase} />
      <ParallaxStatement banners={banners || []} />
      <AboutStrip banners={banners || []} />
      <VideoGallery items={videoItems} />
      <LogoGallery items={logoItems} />
      <Animation3DSection items={animation3DItems} />
      <ThumbnailGrid items={thumbnailItems} />
      <CTASection />
    </main>
  );
}
