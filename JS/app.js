/* ============================================================
   ALDRIN JOHN AMIR CHUA — Portfolio Animations
   GSAP 3 + ScrollTrigger  |  Rich animation suite
   ============================================================ */

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────────────────
   1. PAGE PRELOADER
   ───────────────────────────────────────────────────────────── */
const preloader = document.getElementById('preloader');
const chars     = document.querySelectorAll('.preloader-char');
const barFill   = document.getElementById('preloader-fill');

// Hide page scroll while loading
document.body.style.overflow = 'hidden';

const preloaderTl = gsap.timeline({
  onComplete() {
    document.body.style.overflow = '';
    runPageAnimations();
  }
});

preloaderTl
  // Characters drop in staggered
  .to(chars, {
    y: 0,
    opacity: 1,
    duration: 0.7,
    stagger: 0.04,
    ease: 'power3.out',
  })
  // Progress bar fills
  .to(barFill, {
    scaleX: 1,
    duration: 0.9,
    ease: 'power2.inOut',
  }, '-=0.3')
  // Brief pause
  .to({}, { duration: 0.2 })
  // Characters fly up and out
  .to(chars, {
    y: '-110%',
    opacity: 0,
    duration: 0.5,
    stagger: 0.03,
    ease: 'power3.in',
  })
  // Preloader panel slides up out of view
  .to(preloader, {
    yPercent: -100,
    duration: 0.9,
    ease: 'power4.inOut',
  }, '-=0.2');


/* ─────────────────────────────────────────────────────────────
   2. ALL PAGE ANIMATIONS (run after preloader exits)
   ───────────────────────────────────────────────────────────── */
function runPageAnimations() {

  /* ── CUSTOM CURSOR (dot + lagging ring) ─────────────────── */
  const dot  = document.createElement('div');
  const ring = document.createElement('div');
  dot.className  = 'cursor-dot';
  ring.className = 'cursor-ring';
  document.body.appendChild(dot);
  document.body.appendChild(ring);

  let mx = 0, my = 0;

  window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  gsap.ticker.add(() => {
    gsap.set(dot,  { x: mx, y: my });
    gsap.to(ring,  { x: mx, y: my, duration: 0.2, ease: 'power2.out' });
  });

  // Cursor grows on hoverable elements
  document.querySelectorAll('a, button, [data-magnetic], .skill-card, .project-row').forEach(el => {
    el.addEventListener('mouseenter', () => {
      gsap.to(dot,  { scale: 3,  background: '#28c840', duration: 0.3, ease: 'power2.out' });
      gsap.to(ring, { scale: 0,  duration: 0.25 });
    });
    el.addEventListener('mouseleave', () => {
      gsap.to(dot,  { scale: 1,  background: '#f5f5f7', duration: 0.5, ease: 'elastic.out(1,0.4)' });
      gsap.to(ring, { scale: 1,  duration: 0.5, ease: 'elastic.out(1,0.4)' });
    });
  });


  /* ── NAV: glass on scroll ───────────────────────────────── */
  const nav = document.getElementById('nav');
  ScrollTrigger.create({
    start: 'top -64',
    onEnter:     () => nav.classList.add('scrolled'),
    onLeaveBack: () => nav.classList.remove('scrolled'),
  });

  // Nav links: underline wipe in on hover
  document.querySelectorAll('.nav-link').forEach(link => {
    const line = document.createElement('span');
    line.style.cssText = `
      display:block; height:1px; background:#28c840;
      transform:scaleX(0); transform-origin:left;
      position:absolute; bottom:-2px; left:0; right:0;
    `;
    link.style.position = 'relative';
    link.appendChild(line);

    link.addEventListener('mouseenter', () => gsap.to(line, { scaleX:1, duration:0.3, ease:'power2.out' }));
    link.addEventListener('mouseleave', () => gsap.to(line, { scaleX:0, transformOrigin:'right', duration:0.25, ease:'power2.in' }));
  });


  /* ── HERO ENTRANCE SEQUENCE ─────────────────────────────── */
  const heroTl = gsap.timeline({ defaults: { ease: 'power4.out' } });

  heroTl
    .from('.nav-inner',    { y: -30, opacity: 0, duration: 1 })
    .from('#hero-eyebrow', { y: 24,  opacity: 0, duration: 0.9 }, '-=0.5')
    .from('#hero-title',   { y: 90,  opacity: 0, duration: 1.2 }, '-=0.75')
    .from('#hero-sub',     { y: 40,  opacity: 0, duration: 0.9 }, '-=0.85')
    .from('#hero-cta',     { y: 28,  opacity: 0, duration: 0.8 }, '-=0.7')
    .from('#hero-photo',   {
      x: 60, opacity: 0, duration: 1.1,
      ease: 'power3.out',
      clipPath: 'inset(0 30% 0 0 round 32px)',
      onComplete() {
        gsap.to('#hero-photo', { clipPath: 'inset(0 0% 0 0 round 32px)', duration: 0 });
      }
    }, '-=1.1')
    .from('#scroll-hint', { opacity: 0, duration: 0.8 }, '-=0.3');


  /* ── BADGE PULSE & SCROLL LINE ──────────────────────────── */
  gsap.to('.badge-dot', {
    boxShadow: '0 0 0 7px rgba(48, 209, 88, 0.3)',
    duration: 1.1, ease: 'sine.inOut', yoyo: true, repeat: -1,
  });

  gsap.to('.scroll-line', {
    scaleY: 0.1, transformOrigin: 'top',
    duration: 1.4, ease: 'sine.inOut', yoyo: true, repeat: -1,
  });


  /* ── HERO TEXT FADES OUT AS YOU SCROLL ──────────────────── */
  gsap.to('.hero-text', {
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: '55% top',
      scrub: 1.2,
    },
    opacity: 0, y: -60, ease: 'none',
  });


  /* ── HERO PHOTO FLOAT LOOP ──────────────────────────────── */
  gsap.to('.hero-photo-frame', {
    y: -16, duration: 3.8,
    ease: 'sine.inOut', yoyo: true, repeat: -1,
  });


  /* ── SECTION LABELS — draw underline on scroll ──────────── */
  document.querySelectorAll('.section-label').forEach(label => {
    const underline = document.createElement('span');
    underline.style.cssText = `
      display:block; height:2px; background:#28c840;
      transform:scaleX(0); transform-origin:left; border-radius:2px;
      margin-top:4px; opacity:1;
    `;
    label.appendChild(underline);

    // Use fromTo so GSAP fully controls both start AND end state — prevents flicker
    gsap.fromTo(label,
      { y: 20, opacity: 0 },
      {
        scrollTrigger: { trigger: label, start: 'top 88%', toggleActions: 'play none none reverse' },
        y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
      }
    );
    gsap.to(underline, {
      scrollTrigger: { trigger: label, start: 'top 86%', toggleActions: 'play none none reverse' },
      scaleX: 1, duration: 0.6, delay: 0.2, ease: 'power3.out',
    });
  });


  /* ── HEADING WORD SPLIT — clip reveal ───────────────────── */
  document.querySelectorAll('[data-split]').forEach(heading => {
    const html = heading.innerHTML;
    const parts = html.split(/(<br\s*\/?>|\s)/g);
    heading.innerHTML = parts.map(p => {
      if (/^<br/i.test(p)) return p;
      if (/^\s+$/.test(p))  return ' ';
      return `<span class="word-line"><span style="display:inline-block">${p}</span></span>`;
    }).join('');

    const spans = heading.querySelectorAll('.word-line > span');
    gsap.from(spans, {
      scrollTrigger: { trigger: heading, start: 'top 88%', toggleActions: 'play none none reverse' },
      y: '120%', opacity: 0,
      duration: 0.9, stagger: 0.08, ease: 'power4.out',
    });
  });


  /* ── DATA-REVEAL — general fade-up ─────────────────────── */
  document.querySelectorAll('[data-reveal]').forEach(el => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' },
      y: 44, opacity: 0, duration: 0.9, ease: 'power3.out',
    });
  });


  /* ── ABOUT: left column lines wipe in ───────────────────── */
  gsap.from('.about-body', {
    scrollTrigger: { trigger: '.about-section', start: 'top 72%', toggleActions: 'play none none reverse' },
    y: 36, opacity: 0, duration: 0.85, stagger: 0.18, ease: 'power3.out',
  });


  /* ── STAT COUNTERS ──────────────────────────────────────── */
  document.querySelectorAll('.stat-num').forEach(el => {
    const raw    = el.textContent.trim();
    const num    = parseFloat(raw);
    const suffix = raw.replace(/[\d.]/g, '');
    const obj    = { val: 0 };

    // Set display to 0+ immediately so it doesn't flash the raw value
    el.textContent = '0' + suffix;

    gsap.to(obj, {
      scrollTrigger: { trigger: el, start: 'top 92%', toggleActions: 'play none none none' },
      val: num, duration: 1.8, ease: 'power2.out',
      onUpdate()   { el.textContent = Math.round(obj.val) + suffix; },
      onComplete() { el.textContent = num + suffix; },
    });
  });


  /* ── SKILLS CARDS: uniform stagger slide-up ──────────────── */
  gsap.fromTo('.skill-card',
    { y: 50, opacity: 0 },
    {
      scrollTrigger: { trigger: '#skills', start: 'top 75%', toggleActions: 'play none none reverse' },
      y: 0, opacity: 1, duration: 0.7,
      stagger: 0.1, ease: 'power3.out',
    }
  );

  // Infinite marquee using JS position (CSS-independent)
  const track = document.querySelector('.skills-ticker-track');
  if (track) {
    const clone = track.cloneNode(true);
    clone.classList.add('clone');
    track.parentElement.appendChild(clone);

    gsap.to([track, clone], {
      x: `-=${track.scrollWidth + 12}`,
      duration: 22,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x(x) {
          const w = track.scrollWidth + 12;
          return `${parseFloat(x) % w}px`;
        }
      }
    });
  }


  /* ── PROJECTS: stagger slide in ────────────────────────── */
  document.querySelectorAll('[data-project]').forEach((row, i) => {
    gsap.from(row, {
      scrollTrigger: { trigger: row, start: 'top 90%', toggleActions: 'play none none reverse' },
      x: -50, opacity: 0,
      duration: 0.9, delay: i * 0.08, ease: 'power3.out',
    });
  });

  /* ── CERTIFICATES: horizontal scrub slider ───────────────── */
  const certSection = document.querySelector('.certificates-section');
  const certGrid = document.querySelector('.cert-grid');
  
  if (certSection && certGrid) {
    // Calculate how far to move: the width of the grid minus the width of the viewport/container
    // We add a little padding so the last item doesn't stick to the very edge.
    
    gsap.to(certGrid, {
      x: () => -(certGrid.scrollWidth - certSection.offsetWidth + 80),
      ease: 'none',
      scrollTrigger: {
        trigger: certSection,
        start: 'center center', // Pin when the center of the section hits the center of the viewport
        end: () => `+=${certGrid.scrollWidth}`, // The scroll distance equals the width of the grid
        pin: true,
        scrub: 1, // Smooth scrubbing, takes 1 second to "catch up" to the scrollbar
        invalidateOnRefresh: true // Recalculates the x distance on resize
      }
    });
  }


  // Project number pops on hover
  document.querySelectorAll('.project-row').forEach(row => {
    const num = row.querySelector('.project-num');
    row.addEventListener('mouseenter', () =>
      gsap.to(num, { color: '#28c840', scale: 1.15, duration: 0.3, ease: 'power2.out' })
    );
    row.addEventListener('mouseleave', () =>
      gsap.to(num, { color: '#a1a1a6', scale: 1, duration: 0.4, ease: 'elastic.out(1,0.5)' })
    );
  });


  /* ── CONTACT SECTION ────────────────────────────────────── */
  // Heading wipes UP into view (no parallax that caused overlap)
  gsap.from('.contact-heading', {
    scrollTrigger: { trigger: '.contact-section', start: 'top 78%', toggleActions: 'play none none reverse' },
    y: 80, opacity: 0, duration: 1.1, ease: 'power4.out',
  });

  // Contact cards stagger in from below
  gsap.from('.contact-link', {
    scrollTrigger: { trigger: '.contact-links', start: 'top 85%', toggleActions: 'play none none reverse' },
    y: 40, opacity: 0, duration: 0.7,
    stagger: 0.12, ease: 'power3.out',
  });


  /* ── MAGNETIC BUTTONS ───────────────────────────────────── */
  document.querySelectorAll('[data-magnetic]').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r  = btn.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width  / 2)) * 0.3;
      const dy = (e.clientY - (r.top  + r.height / 2)) * 0.3;
      gsap.to(btn, { x: dx, y: dy, duration: 0.4, ease: 'power2.out' });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.5)' });
    });
  });


  /* ── FOOTER ENTRANCE ────────────────────────────────────── */
  gsap.from('.footer-inner > *', {
    scrollTrigger: { trigger: '.footer', start: 'top 92%', toggleActions: 'play none none reverse' },
    y: 20, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
  });


  /* ── SCROLL PROGRESS LINE (top of page) ─────────────────── */
  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
    position: fixed; top: 0; left: 0; height: 2px;
    background: #28c840; width: 0%; z-index: 9997;
    transform-origin: left; pointer-events: none;
  `;
  document.body.appendChild(progressBar);

  gsap.to(progressBar, {
    scrollTrigger: {
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.3,
    },
    width: '100%',
    ease: 'none',
  });

} // end runPageAnimations()
