import Link from "next/link";
import LogoItem from "@/components/LogoItem";
import AnimateOnScroll from "@/components/AnimateOnScroll";

export default function LogoGallery() {
  const logos = [
    { src: "https://res.cloudinary.com/dkodvlw5s/image/upload/v1737427617/1_gipsva.png", alt: "Logo 1" },
    { src: "https://res.cloudinary.com/dkodvlw5s/image/upload/v1737427616/2_bdoh9s.png", alt: "Logo 2" },
    { src: "https://res.cloudinary.com/dkodvlw5s/image/upload/v1737427617/3_q1bvhu.jpg", alt: "Logo 3" },
    { src: "https://res.cloudinary.com/dkodvlw5s/image/upload/v1737427618/4_quskhm.jpg", alt: "Logo 4" },
    { src: "https://res.cloudinary.com/dkodvlw5s/image/upload/v1737427618/5_vxn5se.jpg", alt: "Logo 5" },
    { src: "https://res.cloudinary.com/dkodvlw5s/image/upload/v1737427620/6_eio16e.jpg", alt: "Logo 6" },
    { src: "https://res.cloudinary.com/dkodvlw5s/image/upload/v1737427617/7_bb3kkz.jpg", alt: "Logo 7" },
    { src: "https://res.cloudinary.com/dkodvlw5s/image/upload/v1737427620/8_rwrklf.jpg", alt: "Logo 8" },
    { src: "https://res.cloudinary.com/dkodvlw5s/image/upload/v1737427618/9_lbhsjd.png", alt: "Logo 9" },
    { src: "https://res.cloudinary.com/dkodvlw5s/image/upload/v1737427624/10_ozxj05.jpg", alt: "Logo 10" },
    { src: "https://res.cloudinary.com/dkodvlw5s/image/upload/v1737427626/11_bkelts.jpg", alt: "Logo 11" },
    { src: "https://res.cloudinary.com/dkodvlw5s/image/upload/v1737427625/12_lplpat.jpg", alt: "Logo 12" },
  ];

  return (
    <section className="logos-section" id="logosSection">
      <div className="logos-container">
        <AnimateOnScroll className="section-label">
          <span>06</span>
          <span>Logo Portfolio</span>
        </AnimateOnScroll>
        <h2 className="logos-title">
          <AnimateOnScroll variant="reveal" delay={0}>
            <span>Marks That</span>
          </AnimateOnScroll>
          <AnimateOnScroll variant="reveal" delay={150}>
            <span className="italic">Endure</span>
          </AnimateOnScroll>
        </h2>

        <div className="logos-grid" id="logosGrid">
          {logos.map((logo, index) => (
            <LogoItem
              key={index}
              src={logo.src}
              alt={logo.alt}
              index={index}
            />
          ))}
        </div>

        <div className="logos-see-more">
          <AnimateOnScroll variant="reveal" delay={200}>
            <Link href="/work#logo" className="btn-outline">
              See All Logos →
            </Link>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
