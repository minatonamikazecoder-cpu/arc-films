import AnimateOnScroll from "@/components/AnimateOnScroll";
import SkeletonMedia from "@/components/SkeletonMedia";

interface VideoGalleryProps {
  items?: {
    id: string;
    title: string;
    media_type: string;
    media_url: string;
  }[] | null;
}

export default function VideoGallery({ items }: VideoGalleryProps) {
  const videos = items && items.length > 0
    ? items
        .filter((item) => item.media_type === "youtube")
        .map((item, idx) => ({
          num: String(idx + 1).padStart(2, "0"),
          title: item.title,
          embedUrl: item.media_url,
          isFeatured: idx === 0,
        }))
    : [
        {
          num: "01",
          title: "Featured Film",
          embedUrl: "https://www.youtube.com/embed/YKV7ap2W-ss?si=nHkSFcd2FUjP6PYu",
          isFeatured: true,
        },
        {
          num: "02",
          title: "Cinematic Story",
          embedUrl: "https://www.youtube.com/embed/1QC9X_QW52k?si=Lmx7A3AwMjMkB_Rm",
        },
        {
          num: "03",
          title: "Emotional Journey",
          embedUrl: "https://www.youtube.com/embed/XbIqAguXTS4?si=jwGa3GzdbYv6IM_p",
        },
        {
          num: "04",
          title: "Visual Poetry",
          embedUrl: "https://www.youtube.com/embed/2TZszpoCUrI?si=KqrRBKNYZVHWLXhB",
        },
        {
          num: "05",
          title: "Documentary Reel",
          embedUrl: "https://www.youtube.com/embed/M__w4K27iO8?si=wNbrluriGiTCYG_U",
        },
      ];

  return (
    <section className="videos-section" id="videosSection">
      <div className="videos-container">
        <AnimateOnScroll className="section-label">
          <span>05</span>
          <span>Film Gallery</span>
        </AnimateOnScroll>
        <h2 className="videos-title">
          <AnimateOnScroll variant="reveal" delay={0}>
            <span>Stories That</span>
          </AnimateOnScroll>
          <AnimateOnScroll variant="reveal" delay={150}>
            <span className="italic">Move People</span>
          </AnimateOnScroll>
        </h2>

        <div className="videos-grid" id="videosGrid">
          {videos.map((video, idx) => (
            <AnimateOnScroll
              key={video.num}
              variant="card"
              delay={idx * 100}
              className={`video-cell ${video.isFeatured ? "featured" : ""}`}
            >
              <div className="video-cell-inner" style={{ position: "relative" }}>
                <SkeletonMedia
                  src={video.embedUrl}
                  alt={`ARC Films - ${video.title}`}
                  type="iframe"
                  fill
                />
                <div className="video-cell-label" style={{ zIndex: 10 }}>
                  <span className="video-cell-num">{video.num}</span>
                  <span className="video-cell-title">{video.title}</span>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
