/* =============================================================================
   TIME MACHINE — Main Engine (CSS particles, no canvas dependency)
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
// CSS PARTICLE SYSTEM (reliable, no canvas)
// =============================================================================
function createParticles() {
  const field = document.getElementById('particle-field');
  if (!field) return;
  field.innerHTML = '';
  
  const colors = ['#00FF41', '#00E5FF', '#8B5CF6', '#FFD700', '#ff6b9d'];
  
  for (let i = 0; i < 50; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = 2 + Math.random() * 4;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const duration = 8 + Math.random() * 20;
    const delay = Math.random() * duration;
    const x = Math.random() * 100;
    const opacity = 0.1 + Math.random() * 0.3;
    
    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${x}%;
      bottom: -10px;
      background: ${color};
      box-shadow: 0 0 ${size * 3}px ${color};
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
      --p-opacity: ${opacity};
    `;
    field.appendChild(p);
  }
}

// =============================================================================
// BACKGROUND MORPHING (CSS-based)
// =============================================================================
function morphBackground(eraIndex) {
  const era = ERAS[eraIndex] || ERAS[0];
  const bg = document.getElementById('bg-gradient');
  const body = document.body;
  
  if (bg) {
    bg.style.background = `radial-gradient(ellipse at 50% 50%, ${era.bg}, #050508)`;
  }
  // Also morph section title colors
  document.querySelectorAll('.era-section.visible .era-title').forEach(el => {
    el.style.color = era.accent;
  });
}

// =============================================================================
// SCROLL DETECTION
// =============================================================================
const sections = document.querySelectorAll('.era-section');
const dots = document.getElementById('era-dots');
const eraLabel = document.getElementById('era-label');
const scrollThumb = document.getElementById('scroll-thumb');

// Create dots
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
      // Mark section visible
      sections.forEach(s => s.classList.remove('visible'));
      entry.target.classList.add('visible');
      
      // Update dot
      if (dots) {
        dots.querySelectorAll('.era-dot').forEach(d => d.classList.remove('active'));
        const dot = dots.querySelector(`.era-dot[data-idx="${idx}"]`);
        if (dot) dot.classList.add('active');
      }
      
      // Update era label
      if (eraLabel) {
        eraLabel.textContent = ERAS[idx]?.name || '';
        eraLabel.style.color = ERAS[idx]?.accent || '#555';
      }
      
      // Morph background
      morphBackground(idx);
      
      // Update scroll thumb
      if (scrollThumb) {
        const pct = idx / (sections.length - 1);
        scrollThumb.style.height = `${10 + pct * 20}px`;
      }
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => observer.observe(s));

// =============================================================================
// GLITCH EFFECT for retro era
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
            el.style.transform = `${Math.random() * 2 - 1}px, ${Math.random() * 2 - 1}px`;
            el.style.textShadow = `${Math.random() * 4 - 2}px ${Math.random() * 4 - 2}px 0 rgba(255,136,0,0.3)`;
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
// INIT
// =============================================================================
createParticles();
applyGlitch();
console.log('⏳ Time Machine loaded — CSS particle system active');
