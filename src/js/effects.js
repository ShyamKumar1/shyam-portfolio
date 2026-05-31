/* =============================================================================
   EFFECTS ENGINE — Matrix rain, terminal typing, scroll reveals
   ============================================================================= */

// =============================================================================
// MATRIX RAIN (background canvas)
// =============================================================================
export function initMatrixRain() {
  const canvas = document.getElementById('matrix-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height, columns, drops;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    columns = Math.floor(width / 20);
    drops = Array(columns).fill(1);
  }

  resize();
  window.addEventListener('resize', resize);

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789{}[]<>/\\|!@#$%^&*()_+-=';
  const fontSize = 14;

  function draw() {
    ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
    ctx.fillRect(0, 0, width, height);
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      const x = i * 20;
      const y = drops[i] * fontSize;

      // Gradient from bright to dim
      const brightness = Math.max(0, 1 - (drops[i] / (height / fontSize)) * 0.8);
      ctx.fillStyle = `rgba(0, 255, 65, ${brightness * 0.3})`;
      ctx.fillText(char, x, y);

      if (y > height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  setInterval(draw, 50);
}

// =============================================================================
// TERMINAL TYPING EFFECT
// =============================================================================
export function typeTerminal(containerId, lines, speed = 20) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = '';
  let lineIndex = 0;
  let charIndex = 0;
  let currentLine = null;
  let isPaused = false;

  function createLine(line) {
    const div = document.createElement('div');
    div.className = 'terminal-line';
    div.style.animationDelay = '0ms';
    return div;
  }

  function typeNext() {
    if (lineIndex >= lines.length) {
      // Done typing, show cursor
      const cursor = document.createElement('span');
      cursor.className = 'terminal-cursor';
      container.appendChild(cursor);
      return;
    }

    const line = lines[lineIndex];

    if (!currentLine) {
      currentLine = createLine(line);
      container.appendChild(currentLine);
    }

    if (charIndex < line.text.length) {
      currentLine.innerHTML += line.text[charIndex];
      charIndex++;
      setTimeout(typeNext, speed);
    } else {
      currentLine.style.color = line.color || 'inherit';
      currentLine = null;
      charIndex = 0;
      lineIndex++;
      setTimeout(typeNext, speed * 5); // pause between lines
    }
  }

  typeNext();
}

// =============================================================================
// PARAGRAPH REVEAL ON SCROLL
// =============================================================================
export function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
  );

  document.querySelectorAll('.fade-in, .timeline-item, .project-card').forEach(el => {
    if (!el.classList.contains('project-card')) {
      // Project cards get hover, not scroll reveal
    }
    el.classList.add('fade-in');
    observer.observe(el);
  });
}

// =============================================================================
// TECH CONSTELLATION (canvas-based interactive node graph)
// =============================================================================
export function initTechConstellation(containerId, techs, connections) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const canvas = document.createElement('canvas');
  canvas.width = container.clientWidth;
  canvas.height = container.clientHeight;
  container.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let animationId;
  let mouseX = 0, mouseY = 0;

  // Layout nodes in an organic pattern
  const nodes = techs.map((tech, i) => {
    const angle = (i / techs.length) * Math.PI * 2 + Math.random() * 0.5;
    const radius = 120 + Math.random() * 80;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    return {
      name: tech.name,
      category: tech.category,
      x: cx + Math.cos(angle) * radius,
      y: cy + Math.sin(angle) * radius,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: 8 + Math.random() * 6,
      color: tech.color || '#00E5FF',
    };
  });

  container.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  });

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Gentle floating motion
    nodes.forEach(node => {
      node.x += node.vx;
      node.y += node.vy;
      if (node.x < 50 || node.x > canvas.width - 50) node.vx *= -1;
      if (node.y < 50 || node.y > canvas.height - 50) node.vy *= -1;
    });

    // Draw connections
    connections.forEach(([i, j]) => {
      const a = nodes[i];
      const b = nodes[j];
      if (!a || !b) return;

      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 250) {
        const alpha = (1 - dist / 250) * 0.3;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(0, 229, 255, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    });

    // Draw nodes
    nodes.forEach(node => {
      const dx = mouseX - node.x;
      const dy = mouseY - node.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const isHovered = dist < 40;
      const radius = isHovered ? node.radius * 1.8 : node.radius;

      // Glow
      const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, radius * 3);
      glow.addColorStop(0, `${node.color}33`);
      glow.addColorStop(1, 'transparent');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(node.x, node.y, radius * 3, 0, Math.PI * 2);
      ctx.fill();

      // Node
      ctx.beginPath();
      ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = node.color;
      ctx.fill();

      if (isHovered) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius + 4, 0, Math.PI * 2);
        ctx.strokeStyle = node.color;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Label
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '12px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(node.name, node.x, node.y - radius - 12);
      }
    });

    animationId = requestAnimationFrame(draw);
  }

  draw();

  // Handle resize
  const resizeObserver = new ResizeObserver(() => {
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
  });
  resizeObserver.observe(container);
}

// =============================================================================
// FLOATING PARTICLES
// =============================================================================
export function initParticles(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;';
  canvas.width = container.clientWidth;
  canvas.height = container.clientHeight;
  container.style.position = 'relative';
  container.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  const particles = Array.from({ length: 40 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    r: 1 + Math.random() * 2,
    alpha: 0.2 + Math.random() * 0.3,
  }));

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 229, 255, ${p.alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(animate);
  }
  animate();
}
