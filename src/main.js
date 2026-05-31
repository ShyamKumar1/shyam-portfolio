/* =============================================================================
   TIME MACHINE — Main Engine
   ============================================================================= */

// =============================================================================
// ERA DEFINITIONS — Each era has a distinct visual style
// =============================================================================
const ERAS = [
  { name: 'Intro', bg1: '#0a0a0f', bg2: '#0a0a0f', particles: 0, colors: [] },
  { name: '2016', bg1: '#1a0f05', bg2: '#0a0a0f', particles: 60, colors: ['#ff8800', '#ff6600', '#ff4400'], size: [1, 3], speed: [0.2, 0.6], opacity: [0.1, 0.3] },
  { name: '2019', bg1: '#0a0f1a', bg2: '#0f0a1a', particles: 50, colors: ['#4488ff', '#6655ff', '#88aaff'], size: [1, 2.5], speed: [0.1, 0.4], opacity: [0.1, 0.25] },
  { name: '2022', bg1: '#0a0a14', bg2: '#0a1420', particles: 40, colors: ['#2266cc', '#4488ff', '#66aaff'], size: [1, 2], speed: [0.1, 0.3], opacity: [0.1, 0.2] },
  { name: '2023', bg1: '#140a14', bg2: '#1a0a0f', particles: 55, colors: ['#ff6b9d', '#ff4488', '#ff88bb'], size: [1, 3], speed: [0.2, 0.5], opacity: [0.1, 0.3] },
  { name: '2025', bg1: '#0f140a', bg2: '#14100a', particles: 45, colors: ['#ffd700', '#ffaa00', '#ffcc44'], size: [1, 2.5], speed: [0.1, 0.4], opacity: [0.1, 0.25] },
  { name: 'AI', bg1: '#050510', bg2: '#0a0515', particles: 100, colors: ['#00FF41', '#00E5FF', '#8B5CF6', '#FFD700'], size: [1, 4], speed: [0.1, 0.8], opacity: [0.1, 0.4] },
  { name: 'Future', bg1: '#050510', bg2: '#0a0515', particles: 80, colors: ['#00FF41', '#00E5FF', '#8B5CF6'], size: [1, 3], speed: [0.1, 0.5], opacity: [0.1, 0.3] },
];

// =============================================================================
// CANVAS PARTICLE ENGINE
// =============================================================================
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let currentEra = 0;
let targetEra = 0;
let bgColors = ['#0a0a0f', '#0a0a0f'];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor(era) {
    this.reset(era);
  }
  reset(era) {
    const e = ERAS[era] || ERAS[0];
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * (e.speed?.[1] || 0.3);
    this.vy = (Math.random() - 0.5) * (e.speed?.[1] || 0.3);
    this.r = (e.size?.[0] || 1) + Math.random() * ((e.size?.[1] || 2) - (e.size?.[0] || 1));
    this.color = e.colors?.length ? e.colors[Math.floor(Math.random() * e.colors.length)] : '#fff';
    this.alpha = (e.opacity?.[0] || 0.1) + Math.random() * ((e.opacity?.[1] || 0.3) - (e.opacity?.[0] || 0.1));
    this.era = era;
  }
  update(lerpFactor) {
    // Lerp toward target era's visual properties
    const targetEraData = ERAS[targetEra] || ERAS[0];
    const currentEraData = ERAS[this.era] || ERAS[0];
    
    if (this.era !== targetEra) {
      this.era += lerpFactor * (targetEra > this.era ? 1 : -1);
      if (Math.abs(this.era - targetEra) < 0.5) this.era = targetEra;
      
      // Morph visual properties
      const t = targetEraData;
      const c = currentEraData;
      const mix = Math.abs(this.era - targetEra) < 0.5 ? 1 : 0.5;
      
      if (t.colors?.length) {
        this.color = t.colors[Math.floor(Math.random() * t.colors.length)];
      }
      this.alpha = (t.opacity?.[0] || 0.1) + Math.random() * ((t.opacity?.[1] || 0.3) - (t.opacity?.[0] || 0.1));
    }
    
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < -10) this.x = canvas.width + 10;
    if (this.x > canvas.width + 10) this.x = -10;
    if (this.y < -10) this.y = canvas.height + 10;
    if (this.y > canvas.height + 10) this.y = -10;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.alpha;
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

// Initialize particles for first era
for (let i = 0; i < ERAS[0].particles; i++) {
  particles.push(new Particle(0));
}

let time = 0;
function animate() {
  time += 0.01;
  
  // Smooth background transition
  const currentBg = ERAS[currentEra] || ERAS[0];
  const targetBg = ERAS[targetEra] || ERAS[0];
  bgColors[0] = lerpColor(bgColors[0], targetBg.bg1, 0.03);
  bgColors[1] = lerpColor(bgColors[1], targetBg.bg2, 0.03);
  
  // Draw background
  const grad = ctx.createRadialGradient(
    canvas.width/2 + Math.sin(time) * 200, canvas.height/2 + Math.cos(time*0.7) * 100, 0,
    canvas.width/2, canvas.height/2, canvas.width * 0.8
  );
  grad.addColorStop(0, bgColors[0]);
  grad.addColorStop(1, bgColors[1]);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Morph particle count toward target
  const targetCount = targetBg.particles;
  while (particles.length < targetCount) {
    particles.push(new Particle(targetEra));
  }
  while (particles.length > targetCount) {
    particles.pop();
  }
  
  // Update and draw particles
  const lerpFactor = Math.min(0.05, 1 / Math.max(1, Math.abs(targetEra - currentEra)));
  particles.forEach(p => {
    p.update(lerpFactor);
    p.draw();
  });
  
  currentEra += (targetEra - currentEra) * 0.03;
  requestAnimationFrame(animate);
}

function lerpColor(c1, c2, t) {
  const parse = (c) => {
    const r = parseInt(c.slice(1,3), 16);
    const g = parseInt(c.slice(3,5), 16);
    const b = parseInt(c.slice(5,7), 16);
    return [r, g, b];
  };
  const [r1, g1, b1] = parse(c1 || '#0a0a0f');
  const [r2, g2, b2] = parse(c2 || '#0a0a0f');
  const r = Math.round(r1 + (r2 - r1) * t);
  const g = Math.round(g1 + (g2 - g1) * t);
  const b = Math.round(b1 + (b2 - b1) * t);
  return `rgb(${r},${g},${b})`;
}

animate();

// =============================================================================
// SCROLL DETECTION — Track which era section is visible
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
  dots.appendChild(dot);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const idx = parseInt(entry.target.dataset.era);
    if (entry.isIntersecting) {
      // Mark section and dot as active
      sections.forEach(s => s.classList.remove('visible'));
      entry.target.classList.add('visible');
      
      dots.querySelectorAll('.era-dot').forEach(d => d.classList.remove('active'));
      const dot = dots.querySelector(`.era-dot[data-idx="${idx}"]`);
      if (dot) dot.classList.add('active');
      
      // Update era label
      eraLabel.textContent = ERAS[idx]?.name || '';
      eraLabel.style.color = ERAS[idx]?.colors?.[0] || '#555';
      
      // Update target era for canvas
      targetEra = Math.min(idx, ERAS.length - 1);
      
      // Update scroll thumb
      const pct = idx / (sections.length - 1);
      scrollThumb.style.height = `${10 + pct * 20}px`;
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => observer.observe(s));

// =============================================================================
// GLITCH TEXT EFFECT for retro sections
// =============================================================================
function applyGlitch() {
  document.querySelectorAll('.era-section[data-era="1"] .era-title').forEach(el => {
    const text = el.textContent;
    let glitchInterval;
    
    const observer2 = new IntersectionObserver((entries) => {
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
    observer2.observe(el);
  });
}

applyGlitch();

console.log('⏳ Time Machine loaded — ready to travel through Shyam\'s journey.');
