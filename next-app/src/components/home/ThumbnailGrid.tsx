import Image from "next/image";
import AnimateOnScroll from "@/components/AnimateOnScroll";

export default function ThumbnailGrid() {
  const thumbnails = [
    { src: "https://res.cloudinary.com/dkodvlw5s/image/upload/v1737512064/Thumbnail_1_f7zjxd.png", alt: "Thumbnail 1" },
    { src: "https://res.cloudinary.com/dkodvlw5s/image/upload/v1737512064/mr_beast_wbvmpp.png", alt: "Thumbnail 2" },
    { src: "https://res.cloudinary.com/dkodvlw5s/image/upload/v1737512061/1_ee0dvs.jpg", alt: "Thumbnail 3" },
    { src: "https://res.cloudinary.com/dkodvlw5s/image/upload/v1737512059/fianl_qinatl.png", alt: "Thumbnail 4" },
    { src: "https://res.cloudinary.com/dkodvlw5s/image/upload/v1737512057/6_pwt7xa.png", alt: "Thumbnail 5" },
    { src: "https://res.cloudinary.com/dkodvlw5s/image/upload/v1737512057/v1_see1wc.png", alt: "Thumbnail 6" },
    { src: "https://res.cloudinary.com/dkodvlw5s/image/upload/v1737512057/4_fv4g2m.png", alt: "Thumbnail 7" },
    { src: "https://res.cloudinary.com/dkodvlw5s/image/upload/v1737427725/thubnail_real_estate-min_iapywm.png", alt: "Thumbnail 8" },
    { src: "https://res.cloudinary.com/dkodvlw5s/image/upload/v1737427722/thubnail_3-min_khqjiz.png", alt: "Thumbnail 9" },
    { src: "https://res.cloudinary.com/dkodvlw5s/image/upload/v1737427720/journalism-min_ezgsnt.jpg", alt: "Thumbnail 10" },
  ];

  return (
    <section className="thumbnails-section" id="thumbnailsSection">
      <div className="thumbnails-container">
        <AnimateOnScroll className="section-label">
          <span>08</span>
          <span>Thumbnail Design</span>
        </AnimateOnScroll>
        <h2 className="thumbnails-title">
          <AnimateOnScroll variant="reveal" delay={0}>
            <span>The First</span>
          </AnimateOnScroll>
          <AnimateOnScroll variant="reveal" delay={150}>
            <span className="italic">Impression</span>
          </AnimateOnScroll>
        </h2>

        <div className="thumbnails-grid" id="thumbnailsGrid">
          {thumbnails.map((thumb, idx) => (
            <AnimateOnScroll
              key={idx}
              variant="card"
              delay={idx * 60}
              className="thumb-item"
              style={{ position: "relative" }}
            >
              <Image src={thumb.src} alt={thumb.alt} fill sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 25vw" style={{ objectFit: "cover" }} />
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
