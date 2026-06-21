"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type VideoModalContextType = {
  openVideoModal: (url: string) => void;
  closeVideoModal: () => void;
};

const VideoModalContext = createContext<VideoModalContextType | undefined>(undefined);

export function VideoModalProvider({ children }: { children: React.ReactNode }) {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const openVideoModal = (url: string) => {
    setVideoUrl(url);
    document.body.style.overflow = "hidden";
  };

  const closeVideoModal = () => {
    setVideoUrl(null);
    document.body.style.overflow = "";
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeVideoModal();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <VideoModalContext.Provider value={{ openVideoModal, closeVideoModal }}>
      {children}
      {videoUrl && (
        <div className="video-modal open" id="videoModal">
          <div className="video-modal-overlay" onClick={closeVideoModal}></div>
          <div className="video-modal-inner">
            <button className="video-modal-close" onClick={closeVideoModal}>
              ✕
            </button>
            <div className="video-modal-content">
              <video id="modalVideo" src={videoUrl} controls autoPlay playsInline />
            </div>
          </div>
        </div>
      )}
    </VideoModalContext.Provider>
  );
}

export function useVideoModal() {
  const context = useContext(VideoModalContext);
  if (!context) {
    throw new Error("useVideoModal must be used within a VideoModalProvider");
  }
  return context;
}
