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
  const renderedServices = (services || []).map((s, idx) => ({
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
  }));

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
