import AnimateOnScroll from "@/components/AnimateOnScroll";

export default function Animation3DSection() {
  const items = [
    {
      label: "3D Scene",
      src: "https://res.cloudinary.com/dkodvlw5s/video/upload/v1737514693/3d_ih4mik.mp4",
      isTall: false,
    },
    {
      label: "Character Animation",
      src: "https://res.cloudinary.com/dkodvlw5s/video/upload/v1737514596/1_xytlei.mp4",
      isTall: true,
    },
    {
      label: "Stylized Portrait",
      src: "https://res.cloudinary.com/dkodvlw5s/video/upload/v1737514538/3d_sam_houser_kxfy3t.mp4",
      isTall: false,
    },
    {
      label: "Environment Scene",
      src: "https://res.cloudinary.com/dkodvlw5s/video/upload/v1737514508/3d_scene_1_2_zpi58f.mp4",
      isTall: false,
    },
  ];

  return (
    <section className="anim3d-section" id="anim3dSection">
      <div className="anim3d-container">
        <AnimateOnScroll className="section-label">
          <span>07</span>
          <span>3D Animations</span>
        </AnimateOnScroll>
        <h2 className="anim3d-title">
          <AnimateOnScroll variant="reveal" delay={0}>
            <span>Beyond The</span>
          </AnimateOnScroll>
          <AnimateOnScroll variant="reveal" delay={150}>
            <span className="italic">Third Dimension</span>
          </AnimateOnScroll>
        </h2>

        <div className="anim3d-grid">
          {items.map((item, index) => (
            <AnimateOnScroll
              key={index}
              variant="card"
              delay={index * 80}
              className={`anim3d-item ${item.isTall ? "tall" : ""}`}
            >
              <video autoPlay muted loop playsInline>
                <source src={item.src} type="video/mp4" />
              </video>
              <div className="anim3d-item-overlay">
                <span>{item.label}</span>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
