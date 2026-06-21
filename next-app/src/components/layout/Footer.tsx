"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Do not show public footer on admin pages
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="footer" id="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <Link href="/" className="footer-logo">
              <svg width="60" height="32" viewBox="0 0 60 32" fill="none">
                <path d="M30 2 A22 22 0 0 1 52 24" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                <path d="M30 2 A22 22 0 0 0 8 24" stroke="white" strokeWidth="0.5" fill="none" strokeLinecap="round" opacity="0.5"/>
                <text x="5" y="30" fontFamily="Bebas Neue" fontSize="14" fill="white" letterSpacing="4">ARC</text>
              </svg>
              <span>FILMS</span>
            </Link>
            <p className="footer-tagline">Visual Storytelling Studio</p>
            <p className="footer-desc">
              Creating cinematic experiences that transcend the screen. Based in India. Working worldwide.
            </p>
          </div>

          <div className="footer-nav">
            <div className="footer-nav-col">
              <h4>Navigate</h4>
              <Link href="/">Home</Link>
              <Link href="/work">Work</Link>
              <Link href="/services">Services</Link>
              <Link href="/about">About</Link>
              <Link href="/contact">Contact</Link>
            </div>
            <div className="footer-nav-col">
              <h4>Services</h4>
              <Link href="/work#video">Video Production</Link>
              <Link href="/work#motion">Motion Graphics</Link>
              <Link href="/work#logo">Logo Design</Link>
              <Link href="/work#branding">Brand Identity</Link>
              <Link href="/work#3d">3D Animation</Link>
              <Link href="/work#thumbnails">Thumbnails</Link>
            </div>
            <div className="footer-nav-col">
              <h4>Connect</h4>
              <a href="https://www.instagram.com/yash_pancholi_37?igsh=MWp4MHExZHB3amJx" target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
              <a href="https://www.linkedin.com/in/pancholi-yash-b161792b5/" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <a href="mailto:yashpancholi111@gmail.com">Email Us</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copy">
            <span>© {new Date().getFullYear()} ARC Films. All rights reserved.</span>
            <span>Built with intention.</span>
          </div>
          <div className="footer-back-top">
            <button id="backToTop" onClick={handleBackToTop}>
              Back to Top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
