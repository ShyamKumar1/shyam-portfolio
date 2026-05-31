/* =============================================================================
   TIME MACHINE — Enhanced Engine
   ============================================================================= */

// =============================================================================
// ERA PALETTES
// =============================================================================
const ERAS = [
  { name: 'Intro', bg: '#0a0a12', accent: '#00FF41' },
  { name: '2016', bg: '#1a0f05', accent: '#ff8800' },
  { name: '2019', bg: '#0a0f1a', accent: '#4488ff' },
  { name: '2022', bg: '#0a0a14', accent: '#4488ff' },
  { name: '2025', bg: '#140a14', accent: '#ff6b9d' },
  { name: '2025', bg: '#0f140a', accent: '#ffd700' },
  { name: 'AI', bg: '#050510', accent: '#00FF41' },
  { name: 'Future', bg: '#050510', accent: '#00E5FF' },
];

// =============================================================================
// CSS PARTICLE SYSTEM
// =============================================================================
function createParticles() {
  const field = document.getElementById('particle-field');
  if (!field) return;
  field.innerHTML = '';

  const colors = ['#00FF41', '#00E5FF', '#8B5CF6', '#FFD700', '#ff6b9d', '#FF5F6D'];

  // 60 round particles
  for (let i = 0; i < 60; i++) {
    const p = document.createElement('div');
    const size = 2 + Math.random() * 5;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const duration = 10 + Math.random() * 25;
    const delay = Math.random() * duration;
    const x = Math.random() * 100;
    const opacity = 0.08 + Math.random() * 0.35;

    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${x}%;
      bottom: -10px;
      background: ${color};
      border-radius: ${Math.random() > 0.6 ? '2px' : '50%'};
      box-shadow: 0 0 ${size * 4}px ${color};
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
      --p-opacity: ${opacity};
    `;
    if (Math.random() > 0.6) p.classList.add('diamond');
    field.appendChild(p);
  }
}

// =============================================================================
// MOUSE AMBIENT GLOW
// =============================================================================
function initMouseGlow() {
  const glow = document.getElementById('ambient-glow');
  if (!glow) return;

  let targetX = window.innerWidth / 2, targetY = window.innerHeight / 2;
  let currentX = targetX, currentY = targetY;

  document.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
  });

  function animateGlow() {
    currentX += (targetX - currentX) * 0.05;
    currentY += (targetY - currentY) * 0.05;
    glow.style.left = currentX + 'px';
    glow.style.top = currentY + 'px';
    requestAnimationFrame(animateGlow);
  }
  animateGlow();

  // Hide glow when not moving
  let hideTimer;
  document.addEventListener('mousemove', () => {
    glow.style.opacity = '1';
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => { glow.style.opacity = '0'; }, 3000);
  });
}

// =============================================================================
// SCROLL PROGRESS BAR (top)
// =============================================================================
function initProgressBar() {
  const fill = document.getElementById('progress-top-fill');
  if (!fill) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    fill.style.width = progress + '%';
  });
}

// =============================================================================
// BACKGROUND MORPHING
// =============================================================================
function morphBackground(eraIndex) {
  const era = ERAS[eraIndex] || ERAS[0];
  const bg = document.getElementById('bg-gradient');
  const glow = document.getElementById('ambient-glow');

  if (bg) {
    bg.style.background = `radial-gradient(ellipse at 50% 50%, ${era.bg}, #050508)`;
  }
  if (glow) {
    const accent = era.accent;
    const r = parseInt(accent.slice(1,3), 16);
    const g = parseInt(accent.slice(3,5), 16);
    const b = parseInt(accent.slice(5,7), 16);
    glow.style.background = `radial-gradient(circle, rgba(${r},${g},${b},0.08) 0%, transparent 60%)`;
  }
}

// =============================================================================
// SCROLL DETECTION
// =============================================================================
const sections = document.querySelectorAll('.era-section');
const dots = document.getElementById('era-dots');
const eraLabel = document.getElementById('era-label');
const scrollThumb = document.getElementById('scroll-thumb');

sections.forEach((_, i) => {
  const dot = document.createElement('div');
  dot.className = 'era-dot';
  dot.dataset.idx = i;
  dot.addEventListener('click', () => {
    document.getElementById(`sec-${i}`).scrollIntoView({ behavior: 'smooth' });
  });
  if (dots) dots.appendChild(dot);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const idx = parseInt(entry.target.dataset.era);
    if (entry.isIntersecting) {
      sections.forEach(s => s.classList.remove('visible'));
      entry.target.classList.add('visible');

      if (dots) {
        dots.querySelectorAll('.era-dot').forEach(d => d.classList.remove('active'));
        const dot = dots.querySelector(`.era-dot[data-idx="${idx}"]`);
        if (dot) dot.classList.add('active');
      }

      if (eraLabel) {
        eraLabel.textContent = ERAS[idx]?.name || '';
        eraLabel.style.color = ERAS[idx]?.accent || '#555';
      }

      morphBackground(idx);

      if (scrollThumb) {
        const pct = idx / (sections.length - 1);
        scrollThumb.style.height = `${10 + pct * 20}px`;
      }
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => observer.observe(s));

// =============================================================================
// GLITCH EFFECT
// =============================================================================
function applyGlitch() {
  document.querySelectorAll('.era-section[data-era="1"] .era-title').forEach(el => {
    let glitchInterval;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          let count = 0;
          glitchInterval = setInterval(() => {
            if (count++ > 5) { clearInterval(glitchInterval); return; }
            el.style.transform = `translate(${Math.random()*2-1}px, ${Math.random()*2-1}px)`;
            el.style.textShadow = `${Math.random()*4-2}px ${Math.random()*4-2}px 0 rgba(255,136,0,0.3)`;
            setTimeout(() => { el.style.transform = ''; el.style.textShadow = ''; }, 100);
          }, 2000);
        } else {
          if (glitchInterval) clearInterval(glitchInterval);
        }
      });
    }, { threshold: 0.5 });
    obs.observe(el);
  });
}

// =============================================================================
// PARALLAX ON SCROLL (subtle movement of sections)
// =============================================================================
function initParallax() {
  const particleField = document.getElementById('particle-field');
  if (!particleField) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    particleField.style.transform = `translateY(${scrollY * 0.15}px)`;
  });
}

// =============================================================================
// TYPEWRITER EFFECT FOR HERO SUBTITLE
// =============================================================================
function initTypewriter() {
  const el = document.querySelector('.hero-sub');
  if (!el) return;

  const text = el.textContent;
  el.textContent = '';
  el.style.visibility = 'visible';

  let i = 0;
  function type() {
    if (i < text.length) {
      el.textContent += text[i];
      i++;
      setTimeout(type, 30 + Math.random() * 20);
    }
  }
  setTimeout(type, 1500);
}

// =============================================================================
// INIT
// =============================================================================
createParticles();
initMouseGlow();
initProgressBar();
initParallax();
applyGlitch();
initTypewriter();
console.log('⏳ Time Machine v2 — Enhanced with glow, progress bar, parallax, typewriter');
