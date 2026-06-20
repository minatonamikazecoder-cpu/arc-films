export default function MarqueeStrip() {
  const marqueeItems = [
    "Film Production",
    "Motion Graphics",
    "Brand Identity",
    "3D Animation",
    "Logo Design",
    "Video Editing",
    "Thumbnail Design",
    "Cinematography",
    "Storytelling",
  ];

  return (
    <section className="marquee-section">
      <div className="marquee-track">
        {/* Render twice for seamless loop */}
        {[1, 2].map((loopIndex) => (
          <div key={loopIndex} className="marquee-content" id={loopIndex === 1 ? "marqueeContent" : undefined}>
            {marqueeItems.map((item, idx) => (
              <span key={idx}>
                {item}
                <span className="dot"> ◆ </span>
              </span>
            ))}
            {marqueeItems.map((item, idx) => (
              <span key={`dup-${idx}`}>
                {item}
                <span className="dot"> ◆ </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
