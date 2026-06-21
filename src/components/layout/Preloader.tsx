"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    if (pathname?.startsWith("/admin")) {
      if (onComplete) onComplete();
      return;
    }
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 15 + 5;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setTimeout(() => {
          setIsHidden(true);
          if (onComplete) onComplete();
        }, 200);
      }
      setProgress(p);
    }, 25);

    return () => clearInterval(interval);
  }, [onComplete]);

  if (pathname?.startsWith("/admin")) return null;

  return (
    <div className={`preloader ${isHidden ? "hidden" : ""}`} id="preloader">
      <div className="preloader-inner">
        <div className="preloader-logo">
          <svg width="120" height="60" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M60 5 A45 45 0 0 1 105 50" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/>
            <path d="M60 5 A45 45 0 0 0 15 50" stroke="white" strokeWidth="0.5" fill="none" strokeLinecap="round" opacity="0.4"/>
            <text x="18" y="58" fontFamily="Bebas Neue" fontSize="28" fill="white" letterSpacing="8">ARC</text>
          </svg>
          <span className="preloader-sub">FILMS</span>
        </div>
        <div className="preloader-bar">
          <div className="preloader-progress" id="preloaderProgress" style={{ width: `${progress}%` }} />
        </div>
        <span className="preloader-count" id="preloaderCount">{Math.floor(progress)}%</span>
      </div>
    </div>
  );
}
