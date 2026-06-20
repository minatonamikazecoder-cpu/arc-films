"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => {
      const nextState = !prev;
      document.body.style.overflow = nextState ? "hidden" : "";
      return nextState;
    });
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = "";
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Work", href: "/work" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  // Helper to check if a link is active
  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  // Do not show public navbar on admin pages
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <nav className={`nav ${isScrolled ? "scrolled" : ""}`} id="nav">
      <div className="nav-inner">
        <Link href="/" className="nav-logo" id="navLogo" onClick={closeMobileMenu}>
          <svg width="80" height="40" viewBox="0 0 80 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M40 3 A30 30 0 0 1 70 33" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            <path d="M40 3 A30 30 0 0 0 10 33" stroke="white" strokeWidth="0.5" fill="none" strokeLinecap="round" opacity="0.5"/>
            <text x="7" y="38" fontFamily="Bebas Neue" fontSize="18" fill="white" letterSpacing="5">ARC</text>
          </svg>
          <span className="nav-logo-sub">FILMS</span>
        </Link>

        <div className="nav-links" id="navLinks">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link ${isActive(link.href) ? "active" : ""}`}
              data-text={link.label}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="nav-right">
          <Link href="/contact" className="btn-contact" id="navCta" onClick={closeMobileMenu}>
            <span>Let&apos;s Talk</span>
          </Link>
          <button
            className={`nav-hamburger ${isMobileMenuOpen ? "active" : ""}`}
            id="navHamburger"
            aria-label="Menu"
            onClick={toggleMobileMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`nav-mobile ${isMobileMenuOpen ? "open" : ""}`} id="navMobile">
        <div className="nav-mobile-inner">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-mobile-link"
              onClick={closeMobileMenu}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
