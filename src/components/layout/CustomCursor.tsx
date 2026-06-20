"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [follower, setFollower] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    document.addEventListener("mousemove", handleMouseMove);

    // Follower lerp loop
    let currentFollowerX = mouseX;
    let currentFollowerY = mouseY;
    let frameId: number;

    const animateFollower = () => {
      currentFollowerX += (mouseX - currentFollowerX) * 0.12;
      currentFollowerY += (mouseY - currentFollowerY) * 0.12;
      setFollower({ x: currentFollowerX, y: currentFollowerY });
      frameId = requestAnimationFrame(animateFollower);
    };

    frameId = requestAnimationFrame(animateFollower);

    // Hover listener
    const addHoverListeners = () => {
      const targets = document.querySelectorAll(
        "a, button, .service-card, .work-item, .logo-item, .thumb-item, .tilt-card, .anim3d-item, [role='button']"
      );
      targets.forEach((target) => {
        target.addEventListener("mouseenter", () => setIsHovering(true));
        target.addEventListener("mouseleave", () => setIsHovering(false));
      });
    };

    // Run initially
    addHoverListeners();

    // Re-run on mutation observer to catch new items (like dynamic ones)
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(frameId);
      observer.disconnect();
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div
        id="cursor"
        className={`cursor ${isHovering ? "hovering" : ""}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
      <div
        id="cursorFollower"
        className={`cursor-follower ${isHovering ? "hovering" : ""}`}
        style={{
          left: `${follower.x}px`,
          top: `${follower.y}px`,
        }}
      />
    </>
  );
}
