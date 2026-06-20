"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

interface AnimateOnScrollProps {
  children: ReactNode;
  className?: string;
  delay?: number; // delay in milliseconds
  variant?: "reveal" | "reveal-left" | "reveal-right" | "card";
  style?: React.CSSProperties;
}

export default function AnimateOnScroll({
  children,
  className = "",
  delay = 0,
  variant = "reveal",
  style: customStyle,
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          observer.unobserve(element);
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [delay]);

  const getVariantClass = () => {
    switch (variant) {
      case "reveal":
        return "reveal";
      case "reveal-left":
        return "reveal-left";
      case "reveal-right":
        return "reveal-right";
      default:
        return "";
    }
  };

  const visibleClass = isVisible ? "visible" : "";

  const style = variant === "card"
    ? {
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0) scale(1)" : "translateY(40px) scale(0.96)",
        transition: "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
        ...customStyle,
      }
    : customStyle;

  return (
    <div
      ref={ref}
      className={`${getVariantClass()} ${visibleClass} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
