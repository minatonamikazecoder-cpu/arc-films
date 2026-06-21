"use client";

import { useState } from "react";
import Image from "next/image";

interface SkeletonMediaProps {
  src: string;
  alt?: string;
  type?: "image" | "video" | "iframe";
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  style?: React.CSSProperties;
}

export default function SkeletonMedia({
  src,
  alt = "",
  type = "image",
  className = "",
  fill = true,
  width,
  height,
  sizes,
  style,
}: SkeletonMediaProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      className={`skeleton-media-wrapper ${className}`}
      style={{
        position: fill ? "absolute" : "relative",
        width: fill ? "100%" : width,
        height: fill ? "100%" : height,
        overflow: "hidden",
        ...style,
      }}
    >
      {/* Skeleton overlay */}
      <div
        className="skeleton-overlay"
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          zIndex: 1,
          opacity: isLoaded ? 0 : 1,
          transition: "opacity 0.5s ease",
          pointerEvents: "none",
        }}
      >
        <div 
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
            animation: "shimmer 1.5s infinite linear",
            transform: "translateX(-100%)",
          }} 
        />
      </div>

      {/* Actual Media */}
      {type === "image" ? (
        <Image
          src={src}
          alt={alt}
          fill={fill}
          width={!fill ? width : undefined}
          height={!fill ? height : undefined}
          sizes={sizes}
          style={{ objectFit: "cover", opacity: isLoaded ? 1 : 0, transition: "opacity 0.5s ease" }}
          onLoad={() => setIsLoaded(true)}
          priority={false}
        />
      ) : type === "video" ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{ objectFit: "cover", width: "100%", height: "100%", opacity: isLoaded ? 1 : 0, transition: "opacity 0.5s ease" }}
          onLoadedData={() => setIsLoaded(true)}
        >
          <source src={src} type="video/mp4" />
        </video>
      ) : (
        <iframe
          src={src}
          title={alt}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          style={{ width: "100%", height: "100%", opacity: isLoaded ? 1 : 0, transition: "opacity 0.5s ease" }}
          onLoad={() => setIsLoaded(true)}
        ></iframe>
      )}

      <style jsx>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}
