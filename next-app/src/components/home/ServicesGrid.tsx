import ServiceCard from "@/components/ServiceCard";
import AnimateOnScroll from "@/components/AnimateOnScroll";

interface ServiceDbItem {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  icon_svg?: string;
}

interface ServicesGridProps {
  services?: ServiceDbItem[];
}

export default function ServicesGrid({ services }: ServicesGridProps) {
  const staticServices = [
    {
      num: "01",
      title: "Video Production",
      description: "Cinematic storytelling from concept to final cut. Films, documentaries, commercials, and branded content that move people.",
      href: "/work#video",
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="12" stroke="#3b82f6" strokeWidth="1.5" />
          <circle cx="20" cy="20" r="5" fill="#3b82f6" />
          <line x1="20" y1="2" x2="20" y2="8" stroke="#3b82f6" strokeWidth="1.5" />
          <line x1="20" y1="32" x2="20" y2="38" stroke="#3b82f6" strokeWidth="1.5" />
          <line x1="2" y1="20" x2="8" y2="20" stroke="#3b82f6" strokeWidth="1.5" />
          <line x1="32" y1="20" x2="38" y2="20" stroke="#3b82f6" strokeWidth="1.5" />
        </svg>
      ),
    },
    {
      num: "02",
      title: "Motion Graphics",
      description: "Short-form content, reels, and dynamic visual narratives crafted for maximum impact across every platform.",
      href: "/work#motion",
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <rect x="8" y="12" width="24" height="16" rx="2" stroke="#3b82f6" strokeWidth="1.5" />
          <path d="M16 8 L24 8" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M16 32 L24 32" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M17 18 L23 20 L17 22 Z" fill="#3b82f6" />
        </svg>
      ),
    },
    {
      num: "03",
      title: "Logo Design",
      description: "Marks that endure. Strategic visual identities built on research, craft, and a deep understanding of your brand's DNA.",
      href: "/work#logo",
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <path d="M20 6 C28 6 34 12 34 20 C34 28 28 34 20 34 C12 34 6 28 6 20 C6 12 12 6 20 6Z" stroke="#3b82f6" strokeWidth="1.5" fill="none" />
          <path d="M14 20 L20 14 L26 20 L20 26 Z" stroke="#3b82f6" strokeWidth="1.5" fill="none" />
        </svg>
      ),
    },
    {
      num: "04",
      title: "Brand Identity",
      description: "Complete visual systems — from color theory to typography, every touchpoint crafted to make your brand unforgettable.",
      href: "/work#branding",
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <rect x="6" y="6" width="12" height="12" rx="2" stroke="#3b82f6" strokeWidth="1.5" />
          <rect x="22" y="6" width="12" height="12" rx="2" stroke="#3b82f6" strokeWidth="1.5" />
          <rect x="6" y="22" width="12" height="12" rx="2" stroke="#3b82f6" strokeWidth="1.5" />
          <rect x="22" y="22" width="12" height="12" rx="2" stroke="#3b82f6" strokeWidth="1.5" />
        </svg>
      ),
    },
    {
      num: "05",
      title: "3D Animation",
      description: "Dimensional storytelling that blurs the line between art and technology. Product visualizations to abstract motion art.",
      href: "/work#3d",
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <path d="M20 8 L28 16 L20 32 L12 16 Z" stroke="#3b82f6" strokeWidth="1.5" fill="none" />
          <circle cx="20" cy="16" r="3" fill="#3b82f6" />
        </svg>
      ),
    },
    {
      num: "06",
      title: "Thumbnail Design",
      description: "Click-stopping thumbnail art that converts browsers into viewers. Psychology-driven design that communicates in milliseconds.",
      href: "/work#thumbnails",
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <rect x="6" y="8" width="28" height="20" rx="2" stroke="#3b82f6" strokeWidth="1.5" />
          <rect x="10" y="12" width="10" height="8" rx="1" fill="#3b82f6" opacity="0.3" />
          <rect x="22" y="12" width="8" height="3" rx="1" fill="#3b82f6" opacity="0.5" />
          <rect x="22" y="17" width="6" height="3" rx="1" fill="#3b82f6" opacity="0.5" />
        </svg>
      ),
    },
  ];

  const renderedServices = (services && services.length > 0)
    ? services.map((s, idx) => ({
        num: String(idx + 1).padStart(2, "0"),
        title: s.title,
        description: s.short_description,
        href: `/work#${s.slug}`,
        icon: s.icon_svg ? (
          <div dangerouslySetInnerHTML={{ __html: s.icon_svg }} style={{ display: "inline-flex", width: 40, height: 40 }} />
        ) : (
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="12" stroke="#3b82f6" strokeWidth="1.5" />
            <circle cx="20" cy="20" r="5" fill="#3b82f6" />
          </svg>
        )
      }))
    : staticServices;

  return (
    <section className="services-section" id="servicesSection">
      <div className="services-container">
        <AnimateOnScroll className="section-label">
          <span>02</span>
          <span>What We Do</span>
        </AnimateOnScroll>

        <h2 className="services-title">
          <AnimateOnScroll variant="reveal" delay={0}>
            <span>Craft Without</span>
          </AnimateOnScroll>
          <AnimateOnScroll variant="reveal" delay={150}>
            <span className="italic">Compromise</span>
          </AnimateOnScroll>
        </h2>

        <AnimateOnScroll variant="reveal" delay={300}>
          <p className="services-desc">Six disciplines. One unwavering commitment to excellence.</p>
        </AnimateOnScroll>

        <div className="services-grid" id="servicesGrid">
          {renderedServices.map((service, index) => (
            <ServiceCard
              key={service.num}
              index={index}
              num={service.num}
              title={service.title}
              description={service.description}
              href={service.href}
              icon={service.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
