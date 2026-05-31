/* =============================================================================
   BOOT — Startup sequence
   ============================================================================= */
export function bootSequence(onComplete) {
  const bar = document.getElementById('boot-bar');
  const status = document.getElementById('boot-status');
  const screen = document.getElementById('boot-screen');

  const steps = [
    { pct: 10, msg: 'Initializing kernel...' },
    { pct: 20, msg: 'Loading AI modules...' },
    { pct: 32, msg: 'Starting voice pipeline...' },
    { pct: 45, msg: 'Mounting project filesystem...' },
    { pct: 55, msg: 'Calibrating neural networks...' },
    { pct: 68, msg: 'Loading TTS engine (31 languages)...' },
    { pct: 78, msg: 'Connecting LiveKit agent...' },
    { pct: 88, msg: 'Warming up inference models...' },
    { pct: 95, msg: 'Finalizing boot sequence...' },
    { pct: 100, msg: 'System ready.' },
  ];

  let i = 0;
  function nextStep() {
    if (i >= steps.length) {
      setTimeout(() => {
        screen.classList.add('fade-out');
        setTimeout(() => {
          screen.style.display = 'none';
          document.getElementById('desktop').classList.remove('hidden');
          if (onComplete) onComplete();
        }, 800);
      }, 400);
      return;
    }
    const step = steps[i];
    bar.style.width = step.pct + '%';
    status.textContent = step.msg;
    i++;
    setTimeout(nextStep, 200 + Math.random() * 300);
  }
  nextStep();
}
