import AnimateOnScroll from "@/components/AnimateOnScroll";

export default function VideoGallery() {
  const videos = [
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
              <div className="video-cell-inner">
                <iframe
                  src={video.embedUrl}
                  title={`ARC Films - ${video.title}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
                <div className="video-cell-label">
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
