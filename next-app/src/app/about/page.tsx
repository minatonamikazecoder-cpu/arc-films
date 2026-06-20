import Link from "next/link";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import CTASection from "@/components/home/CTASection";

export default function AboutPage() {
  const values = [
    {
      num: "01",
      title: "Story First",
      desc: "Every technical decision serves the narrative. We never let craft outshine the human truth at the heart of every project.",
    },
    {
      num: "02",
      title: "No Compromise",
      desc: "We don't settle. Every frame, every cut, every pixel is a conscious decision made in service of the highest possible standard.",
    },
    {
      num: "03",
      title: "Collaboration",
      desc: "Your vision is sacred. We don't impose — we listen, interpret, and amplify what you're trying to say to the world.",
    },
  ];

  const stats = [
    { num: "200+", label: "Projects Completed" },
    { num: "50+", label: "Happy Clients" },
    { num: "6+", label: "Disciplines" },
    { num: "5+", label: "Years of Experience" },
  ];

  const steps = [
    {
      num: "01",
      title: "Discovery",
      desc: "We start with a deep dive into your brand, goals, audience, and vision. This foundation shapes everything that follows.",
    },
    {
      num: "02",
      title: "Strategy",
      desc: "We define the creative direction, messaging, and approach. Every decision is intentional and aligned to your objectives.",
    },
    {
      num: "03",
      title: "Creation",
      desc: "The making. Whether on set, in the edit suite, or in the design tool — this is where obsession becomes reality.",
    },
    {
      num: "04",
      title: "Delivery",
      desc: "Files, assets, and guidance tailored for every platform. We don't deliver and disappear — we see it through.",
    },
  ];

  const tools = [
    { name: "Premiere Pro", cat: "Video Edit" },
    { name: "After Effects", cat: "Motion" },
    { name: "Cinema 4D", cat: "3D" },
    { name: "Blender", cat: "3D" },
    { name: "Photoshop", cat: "Design" },
    { name: "Illustrator", cat: "Design" },
    { name: "DaVinci Resolve", cat: "Color Grade" },
    { name: "Figma", cat: "UI / Brand" },
    { name: "ARRI ALEXA", cat: "Camera" },
    { name: "Sony FX6", cat: "Camera" },
    { name: "DJI Ronin", cat: "Stabilizer" },
    { name: "RED Camera", cat: "Cinema" },
  ];

  return (
    <main className="about-page">
      {/* Hero */}
      <div className="about-page-hero">
        <div className="about-hero-left">
          <AnimateOnScroll className="section-label">
            <span>About</span>
            <span>Our Story</span>
          </AnimateOnScroll>
          <h1 className="about-page-title">
            <AnimateOnScroll variant="reveal" delay={0}>
              <span>Born From</span>
            </AnimateOnScroll>
            <AnimateOnScroll variant="reveal" delay={150}>
              <span className="line2">Obsession</span>
            </AnimateOnScroll>
          </h1>
          <AnimateOnScroll variant="reveal" delay={300}>
            <p className="about-hero-text">
              ARC Films was founded on one belief: that storytelling is the most powerful force in the universe. We are a visual storytelling studio that exists to help brands, creators, and visionaries tell their story in the most compelling way possible.
            </p>
          </AnimateOnScroll>
          <AnimateOnScroll variant="reveal" delay={400}>
            <p className="about-hero-text" style={{ marginTop: "-16px", fontSize: "15px", color: "var(--white-50)" }}>
              Led by Yash Pancholi — filmmaker, designer, and creative director — we combine technical mastery with artistic vision to create work that transcends the ordinary.
            </p>
          </AnimateOnScroll>
          <AnimateOnScroll variant="reveal" delay={500}>
            <Link href="/contact" className="btn-primary" style={{ marginTop: "16px" }}>
              <span>Work With Us</span>
              <span className="btn-arrow">→</span>
            </Link>
          </AnimateOnScroll>
        </div>

        <div className="about-hero-right">
          <AnimateOnScroll variant="reveal" delay={300} className="about-hero-img h-full w-full">
            <img src="/images/about.png" alt="Yash Pancholi - Founder & Creative Director of ARC Films" loading="lazy" />
          </AnimateOnScroll>
          <div className="about-hero-badge">
            <span className="badge-year">Est.</span>
            <span className="badge-num">2019</span>
          </div>
        </div>
      </div>

      {/* Values */}
      <section className="values-section">
        <div className="values-inner">
          <AnimateOnScroll className="section-label">
            <span>Philosophy</span>
            <span>What We Stand For</span>
          </AnimateOnScroll>
          <h2 className="values-title">
            <AnimateOnScroll variant="reveal" delay={0}>
              <span>Our Core</span>
            </AnimateOnScroll>
            <AnimateOnScroll variant="reveal" delay={150}>
              <span className="italic">Beliefs</span>
            </AnimateOnScroll>
          </h2>

          <div className="values-grid">
            {values.map((val, idx) => (
              <AnimateOnScroll key={idx} variant="card" delay={idx * 80} className="value-item">
                <div className="value-num">{val.num}</div>
                <h3 className="value-title">{val.title}</h3>
                <p className="value-desc">{val.desc}</p>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Band */}
      <div className="stats-band">
        <div className="stats-band-inner">
          {stats.map((stat, idx) => (
            <AnimateOnScroll key={idx} variant="card" delay={idx * 50} className="stats-band-item">
              <div className="stats-band-num">{stat.num}</div>
              <div className="stats-band-label">{stat.label}</div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>

      {/* Process */}
      <section className="process-section">
        <div className="process-inner">
          <AnimateOnScroll className="section-label">
            <span>Process</span>
            <span>How We Work</span>
          </AnimateOnScroll>
          <h2 className="process-title">
            <AnimateOnScroll variant="reveal" delay={0}>
              <span>From Brief</span>
            </AnimateOnScroll>
            <AnimateOnScroll variant="reveal" delay={150}>
              <span className="italic">To Screen</span>
            </AnimateOnScroll>
          </h2>

          <div className="process-steps">
            {steps.map((step, idx) => (
              <AnimateOnScroll key={idx} variant="card" delay={idx * 80} className="process-step">
                <div className="process-step-num">{step.num}</div>
                <div className="process-step-title">{step.title}</div>
                <p className="process-step-desc">{step.desc}</p>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="tools-section">
        <div className="tools-inner">
          <AnimateOnScroll className="section-label">
            <span>Tools</span>
            <span>Our Creative Stack</span>
          </AnimateOnScroll>
          <h2 className="tools-title">
            <AnimateOnScroll variant="reveal" delay={0}>
              <span>The Arsenal</span>
            </AnimateOnScroll>
          </h2>

          <div className="tools-grid">
            {tools.map((tool, idx) => (
              <AnimateOnScroll key={idx} variant="card" delay={idx * 40} className="tool-item">
                <div className="tool-name">{tool.name}</div>
                <div className="tool-cat">{tool.cat}</div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <CTASection
        label="Ready to Start?"
        titleLine1="Let's Build"
        titleLine2="Something Together"
        btnText="Start a Conversation"
        btnHref="/contact"
        hideSocials={true}
      />
    </main>
  );
}
