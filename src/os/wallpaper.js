/* =============================================================================
   WALLPAPER — Animated gradient canvas background
   ============================================================================= */
export function initWallpaper(canvas) {
  const ctx = canvas.getContext('2d');
  let mouseX = 0, mouseY = 0;
  let time = 0;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });

  const nodes = Array.from({ length: 30 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.2,
    vy: (Math.random() - 0.5) * 0.2,
    r: 20 + Math.random() * 40,
  }));

  function draw() {
    time += 0.005;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Gradient background
    const grad = ctx.createRadialGradient(
      mouseX + Math.sin(time) * 100, mouseY + Math.cos(time * 0.7) * 100, 0,
      canvas.width / 2, canvas.height / 2, canvas.width * 0.7
    );
    grad.addColorStop(0, '#0F0F1A');
    grad.addColorStop(0.3, '#0A0A15');
    grad.addColorStop(0.6, '#080810');
    grad.addColorStop(1, '#050508');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Floating orbs
    nodes.forEach(n => {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < -100 || n.x > canvas.width + 100) n.vx *= -1;
      if (n.y < -100 || n.y > canvas.height + 100) n.vy *= -1;

      const pulse = Math.sin(time * 2 + n.r) * 0.3 + 0.5;
      const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r);
      g.addColorStop(0, `rgba(0, 255, 65, ${pulse * 0.04})`);
      g.addColorStop(0.5, `rgba(0, 229, 255, ${pulse * 0.02})`);
      g.addColorStop(1, 'transparent');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fill();
    });

    // Subtle grid
    ctx.strokeStyle = 'rgba(255,255,255,0.015)';
    ctx.lineWidth = 1;
    const step = 60;
    for (let x = 0; x < canvas.width; x += step) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += step) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
    }

    requestAnimationFrame(draw);
  }
  draw();
}
