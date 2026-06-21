/* =====================================================
   ARC FILMS — Premium JavaScript
   3D Effects | Parallax | Cursor | Animations
   ===================================================== */

'use strict';

// ===== UTILITY =====
const qs = (sel, root = document) => root.querySelector(sel);
const qsa = (sel, root = document) => [...root.querySelectorAll(sel)];
const clamp = (val, min, max) => Math.min(Math.max(val, min), max);
const lerp = (a, b, t) => a + (b - a) * t;
const map = (val, inMin, inMax, outMin, outMax) => 
  outMin + ((val - inMin) / (inMax - inMin)) * (outMax - outMin);

// ===== STATE =====
let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
let cursor = { x: mouse.x, y: mouse.y };
let follower = { x: mouse.x, y: mouse.y };
let scrollY = 0;
let isLoaded = false;

// ===== PRELOADER =====
function initPreloader() {
  const preloader = qs('#preloader');
  const progress = qs('#preloaderProgress');
  const count = qs('#preloaderCount');
  
  if (!preloader) return;
  
  let p = 0;
  const interval = setInterval(() => {
    p += Math.random() * 15;
    if (p >= 100) {
      p = 100;
      clearInterval(interval);
      setTimeout(() => {
        preloader.classList.add('hidden');
        isLoaded = true;
        initRevealAnimations();
        animateCounters();
      }, 600);
    }
    if (progress) progress.style.width = p + '%';
    if (count) count.textContent = Math.floor(p) + '%';
  }, 80);
}

// ===== CUSTOM CURSOR =====
function initCursor() {
  const cursorEl = qs('#cursor');
  const followerEl = qs('#cursorFollower');
  
  if (!cursorEl || !followerEl) return;
  
  document.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  document.addEventListener('mouseleave', () => {
    cursorEl.style.opacity = '0';
    followerEl.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    cursorEl.style.opacity = '1';
    followerEl.style.opacity = '1';
  });

  // Hide custom cursor when hovering over iframes
  document.addEventListener('mouseover', (e) => {
    if (e.target.tagName === 'IFRAME') {
      cursorEl.style.opacity = '0';
      followerEl.style.opacity = '0';
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.tagName === 'IFRAME') {
      cursorEl.style.opacity = '1';
      followerEl.style.opacity = '1';
    }
  });
  
  // Hover detection
  const hoverEls = qsa('a, button, .service-card, .work-item, .logo-item, .thumb-item, .tilt-card, .anim3d-item');
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorEl.classList.add('hovering');
      followerEl.classList.add('hovering');
    });
    el.addEventListener('mouseleave', () => {
      cursorEl.classList.remove('hovering');
      followerEl.classList.remove('hovering');
    });
  });
  
  function animateCursor() {
    cursor.x = lerp(cursor.x, mouse.x, 0.8);
    cursor.y = lerp(cursor.y, mouse.y, 0.8);
    follower.x = lerp(follower.x, mouse.x, 0.12);
    follower.y = lerp(follower.y, mouse.y, 0.12);
    
    cursorEl.style.left = cursor.x + 'px';
    cursorEl.style.top = cursor.y + 'px';
    followerEl.style.left = follower.x + 'px';
    followerEl.style.top = follower.y + 'px';
    
    requestAnimationFrame(animateCursor);
  }
  
  animateCursor();
}

// ===== NAV ===== 
function initNav() {
  const nav = qs('#nav');
  const hamburger = qs('#navHamburger');
  const mobileMenu = qs('#navMobile');
  
  window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
    if (nav) {
      if (scrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }
  }, { passive: true });
  
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
    
    // Close on mobile link click
    qsa('.nav-mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }
}

// ===== 3D HERO CANVAS =====
function initHeroCanvas() {
  const canvas = qs('#heroCanvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);
  
  // Particles
  const particles = [];
  const PARTICLE_COUNT = 80;
  
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.5 + 0.1,
      color: Math.random() > 0.7 ? '#3b82f6' : '#ffffff',
    });
  }
  
  // Arc geometry
  let arcAngle = 0;
  
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Mouse parallax effect on particles
    const mx = (mouse.x / canvas.width - 0.5) * 30;
    const my = (mouse.y / canvas.height - 0.5) * 30;
    
    // Draw large arc inspired by logo
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const r1 = Math.min(canvas.width, canvas.height) * 0.45;
    const r2 = r1 * 0.88;
    const r3 = r1 * 0.75;
    
    // Outer arc
    ctx.beginPath();
    ctx.arc(cx + mx * 0.1, cy + my * 0.1, r1, Math.PI + arcAngle, 2 * Math.PI + arcAngle);
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.05)';
    ctx.lineWidth = 1;
    ctx.stroke();
    
    // Middle arc
    ctx.beginPath();
    ctx.arc(cx + mx * 0.15, cy + my * 0.15, r2, Math.PI + arcAngle * 1.2, 2 * Math.PI + arcAngle * 1.2);
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.08)';
    ctx.lineWidth = 0.5;
    ctx.stroke();
    
    // Inner arc
    ctx.beginPath();
    ctx.arc(cx + mx * 0.2, cy + my * 0.2, r3, Math.PI + arcAngle * 1.5, 2 * Math.PI + arcAngle * 1.5);
    ctx.strokeStyle = 'rgba(99, 102, 241, 0.06)';
    ctx.lineWidth = 0.5;
    ctx.stroke();
    
    // Animate particles
    particles.forEach((p, i) => {
      p.x += p.vx + mx * 0.002;
      p.y += p.vy + my * 0.002;
      
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;
      
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.opacity * (1 - scrollY / window.innerHeight * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
      
      // Draw connections between nearby particles
      for (let j = i + 1; j < particles.length; j++) {
        const dx = p.x - particles[j].x;
        const dy = p.y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(59, 130, 246, ${(1 - dist / 120) * 0.08})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    });
    
    arcAngle += 0.002;
    requestAnimationFrame(draw);
  }
  
  draw();
}

// ===== PARALLAX =====
function initParallax() {
  const statementImg = qs('#statementBgImg');
  
  function onScroll() {
    scrollY = window.scrollY;
    
    // Statement section parallax
    if (statementImg) {
      const section = qs('#statementSection');
      if (section) {
        const rect = section.getBoundingClientRect();
        const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        const offset = progress * 80 - 40;
        statementImg.style.transform = `scale(1.1) translateY(${offset}px)`;
      }
    }
    
    // Hero content slight parallax
    const heroContent = qs('#heroContent');
    if (heroContent && scrollY < window.innerHeight) {
      heroContent.style.transform = `translateY(${scrollY * 0.3}px)`;
      heroContent.style.opacity = 1 - scrollY / (window.innerHeight * 0.7);
    }
  }
  
  window.addEventListener('scroll', onScroll, { passive: true });
}

// ===== REVEAL ANIMATIONS =====
function initRevealAnimations() {
  const reveals = qsa('.reveal, .reveal-left, .reveal-right, .section-label, .reel-title span, .services-title, .work-title, .about-title, .videos-title, .logos-title, .anim3d-title, .thumbnails-title, .cta-title, .about-text, .reel-player, .services-desc');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0) translateX(0)';
        }, i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  
  reveals.forEach(el => {
    if (!el.style.opacity) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    }
    observer.observe(el);
  });
  
  // Cards observer
  const cards = qsa('.service-card, .work-item, .logo-item, .thumb-item, .anim3d-item, .video-cell');
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.delay || 0);
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0) scale(1)';
        }, delay);
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05 });
  
  cards.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px) scale(0.96)';
    el.style.transition = 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
    if (!el.dataset.delay) el.dataset.delay = (i % 6) * 80;
    cardObserver.observe(el);
  });
}

// ===== SKILL BARS =====
function initSkillBars() {
  const fills = qsa('.skill-fill');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const width = entry.target.dataset.width;
        setTimeout(() => {
          entry.target.style.width = width + '%';
        }, 200);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  fills.forEach(fill => observer.observe(fill));
}

// ===== COUNTER ANIMATION =====
function animateCounters() {
  const counters = qsa('.stat-num');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.dataset.count);
        let current = 0;
        const step = target / 60;
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          entry.target.textContent = Math.floor(current);
        }, 16);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(counter => observer.observe(counter));
}

// ===== HORIZONTAL DRAG SCROLL =====
function initDragScroll() {
  const gallery = qs('#workGallery');
  const track = qs('#workTrack');
  
  if (!gallery || !track) return;
  
  let isDragging = false;
  let startX = 0;
  let scrollLeft = 0;
  let velocity = 0;
  let lastX = 0;
  let animFrame;
  
  gallery.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX - gallery.offsetLeft;
    scrollLeft = gallery.scrollLeft;
    lastX = e.pageX;
    gallery.style.cursor = 'grabbing';
    cancelAnimationFrame(animFrame);
  });
  
  gallery.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - gallery.offsetLeft;
    const walk = (x - startX) * 1.5;
    velocity = e.pageX - lastX;
    lastX = e.pageX;
    gallery.scrollLeft = scrollLeft - walk;
  });
  
  gallery.addEventListener('mouseup', () => {
    isDragging = false;
    gallery.style.cursor = 'grab';
    momentum();
  });
  
  gallery.addEventListener('mouseleave', () => {
    if (isDragging) {
      isDragging = false;
      gallery.style.cursor = 'grab';
      momentum();
    }
  });
  
  function momentum() {
    if (Math.abs(velocity) < 0.5) return;
    gallery.scrollLeft -= velocity;
    velocity *= 0.92;
    animFrame = requestAnimationFrame(momentum);
  }
  
  // Touch support
  let touchStartX = 0;
  let touchScrollLeft = 0;
  
  gallery.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].pageX;
    touchScrollLeft = gallery.scrollLeft;
  }, { passive: true });
  
  gallery.addEventListener('touchmove', (e) => {
    const walk = (touchStartX - e.touches[0].pageX) * 1.5;
    gallery.scrollLeft = touchScrollLeft + walk;
  }, { passive: true });
}

// ===== 3D TILT CARDS =====
function initTiltCards() {
  const cards = qsa('.tilt-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      
      const rotX = (y - 0.5) * -15;
      const rotY = (x - 0.5) * 15;
      
      card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.03)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale(1)';
      card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    });
    
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.15s ease';
    });
  });
}

// ===== SERVICE CARD 3D =====
function initServiceCards() {
  const cards = qsa('.service-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      
      const glow = card.querySelector('.service-card-glow');
      if (glow) {
        glow.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(59, 130, 246, 0.15), transparent 70%)`;
      }
    });
  });
}

// ===== VIDEO MODAL =====
function initVideoModal() {
  const modal = qs('#videoModal');
  const modalVideo = qs('#modalVideo');
  const closeBtn = qs('#videoModalClose');
  const overlay = qs('#videoModalOverlay');
  
  if (!modal || !modalVideo) return;
  
  function openModal(src) {
    modalVideo.src = src;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    modalVideo.play().catch(() => {});
  }
  
  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    modalVideo.pause();
    modalVideo.src = '';
  }
  
  // All video trigger buttons
  const triggers = qsa('[data-video]');
  triggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(trigger.dataset.video);
    });
  });
  
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (overlay) overlay.addEventListener('click', closeModal);
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

// ===== MARQUEE DUPLICATE =====
function initMarquee() {
  const content = qs('#marqueeContent');
  if (!content) return;
  
  // Clone for seamless loop
  const clone = content.cloneNode(true);
  content.parentElement.appendChild(clone);
}

// ===== REEL TITLE ANIMATION =====
function initReelTitle() {
  const spans = qsa('.reel-title span');
  
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      spans.forEach((span, i) => {
        setTimeout(() => {
          span.classList.add('visible');
        }, i * 150);
      });
      observer.disconnect();
    }
  }, { threshold: 0.3 });
  
  const reelText = qs('.reel-text');
  if (reelText) observer.observe(reelText);
}

// ===== SCROLL-BASED OPACITY =====
function initScrollEffects() {
  const hero = qs('#hero');
  const scrollIndicator = qs('#scrollIndicator');
  
  window.addEventListener('scroll', () => {
    const s = window.scrollY;
    
    // Fade scroll indicator
    if (scrollIndicator) {
      scrollIndicator.style.opacity = Math.max(0, 1 - s / 200);
    }
  }, { passive: true });
}

// ===== CTA MAGNETIC BUTTON =====
function initMagneticButtons() {
  const btns = qsa('.btn-primary, .btn-contact, #ctaBtn');
  
  btns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
      btn.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
    });
    
    btn.addEventListener('mouseenter', () => {
      btn.style.transition = 'transform 0.15s ease';
    });
  });
}

// ===== GRID LINE ANIMATION (CTA BG) =====
function initCTAEffect() {
  const ctaSection = qs('#ctaSection');
  if (!ctaSection) return;
  
  ctaSection.addEventListener('mousemove', (e) => {
    const rect = ctaSection.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    const glow = `radial-gradient(ellipse 60% 60% at ${x * 100}% ${y * 100}%, rgba(59,130,246,0.12), transparent 70%)`;
    const gridLines = ctaSection.querySelector('.cta-grid-lines');
    if (gridLines) {
      gridLines.style.background = glow + ', ' + `
        linear-gradient(rgba(59,130,246,0.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(59,130,246,0.05) 1px, transparent 1px)
      `;
      gridLines.style.backgroundSize = 'auto, 60px 60px, 60px 60px';
    }
  });
}

// ===== SCROLL PROGRESS =====
function initScrollProgress() {
  const bar = document.createElement('div');
  bar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 2px;
    background: linear-gradient(90deg, #4f46e5, #3b82f6);
    z-index: 9999;
    transition: width 0.1s;
    pointer-events: none;
  `;
  document.body.appendChild(bar);
  
  window.addEventListener('scroll', () => {
    const progress = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    bar.style.width = progress + '%';
  }, { passive: true });
}

// ===== ACTIVE NAV LINKS =====
function initActiveNav() {
  const sections = qsa('section[id]');
  const navLinks = qsa('.nav-link');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove('active'));
        const id = entry.target.id;
        const activeLink = qs(`.nav-link[href*="${id}"]`);
        // Only mark home as active when near top
        if (id === 'hero') {
          const homeLink = qs('.nav-link[href="index.html"]');
          if (homeLink) homeLink.classList.add('active');
        }
      }
    });
  }, { threshold: 0.3 });
  
  sections.forEach(section => observer.observe(section));
}

// ===== STAGGER GRID ITEMS =====
function staggerObserve(selector, staggerMs = 60) {
  const items = qsa(selector);
  
  const observer = new IntersectionObserver((entries) => {
    const visible = entries.filter(e => e.isIntersecting);
    if (visible.length === 0) return;
    
    const parent = visible[0].target.closest('.logos-grid, .thumbnails-grid, .videos-grid, .anim3d-grid');
    if (!parent) return;
    
    const parentItems = qsa(selector, parent);
    parentItems.forEach((item, i) => {
      setTimeout(() => {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0) scale(1)';
      }, i * staggerMs);
    });
    
    visible.forEach(e => observer.unobserve(e.target));
  }, { threshold: 0.05, rootMargin: '0px 0px -80px 0px' });
  
  items.forEach(item => observer.observe(item));
}

// ===== VIDEO HOVER PLAY =====
function initVideoHoverPlay() {
  const workItems = qsa('.work-item video, .anim3d-item video');
  workItems.forEach(video => {
    video.muted = true;
    video.loop = true;
    video.autoplay = true;
    video.setAttribute('playsinline', '');
    video.play().catch(() => {});
  });
}

// ===== LAZY YOUTUBE EMBEDS =====
function initLazyYouTube() {
  const iframes = qsa('iframe[src*="youtube.com/embed/"]');
  iframes.forEach(iframe => {
    const src = iframe.src;
    const match = src.match(/\/embed\/([^/?]+)/);
    if (!match) return;
    const videoId = match[1];
    
    const container = document.createElement('div');
    container.className = 'youtube-lazy-container';
    
    const title = iframe.getAttribute('title') || 'YouTube Video';
    
    container.innerHTML = `
      <img src="https://img.youtube.com/vi/${videoId}/maxresdefault.jpg" onerror="this.src='https://img.youtube.com/vi/${videoId}/hqdefault.jpg'" alt="${title}" class="youtube-lazy-thumb">
      <div class="youtube-lazy-play">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z"/>
        </svg>
      </div>
    `;
    
    iframe.parentNode.replaceChild(container, iframe);
    
    container.addEventListener('click', () => {
      const newIframe = document.createElement('iframe');
      newIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
      newIframe.title = title;
      newIframe.frameBorder = '0';
      newIframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      newIframe.allowFullscreen = true;
      
      container.innerHTML = '';
      container.appendChild(newIframe);
    });
  });
}

// ===== INIT ALL =====
document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initLazyYouTube();
  initCursor();
  initNav();
  initHeroCanvas();
  initParallax();
  initSkillBars();
  initDragScroll();
  initTiltCards();
  initServiceCards();
  initVideoModal();
  initMarquee();
  initReelTitle();
  initScrollEffects();
  initMagneticButtons();
  initCTAEffect();
  initScrollProgress();
  initActiveNav();
  initVideoHoverPlay();
  
  // Stagger animations for grid sections
  staggerObserve('.logo-item', 50);
  staggerObserve('.thumb-item', 60);
  staggerObserve('.video-cell', 100);
  staggerObserve('.anim3d-item', 80);
  
  // Init reveals after a slight delay
  setTimeout(initRevealAnimations, 100);
  setTimeout(animateCounters, 500);
});

// ===== RESIZE HANDLER =====
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    // Re-init things that depend on window size
  }, 250);
});

// ===== PREVENT SCROLL DURING MODAL =====
window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    const modal = qs('#videoModal');
    if (modal && modal.classList.contains('open')) {
      e.preventDefault();
    }
  }
});

// ===== PERFORMANCE: Intersection Observer polyfill check =====
if (!('IntersectionObserver' in window)) {
  qsa('.service-card, .work-item, .logo-item, .thumb-item').forEach(el => {
    el.style.opacity = '1';
    el.style.transform = 'none';
  });
}
