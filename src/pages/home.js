/* =============================================================================
   HOME PAGE — Terminal Hero
   ============================================================================= */
import { router } from '../js/router.js';
import { typeTerminal } from '../js/effects.js';

const projects = [
  { icon: '🎙', name: 'VoxCraft', desc: 'TTS Studio — ONNX, 31 languages' },
  { icon: '🤖', name: 'Intelli Catalog', desc: 'LiveKit Voice Agent for EPC' },
  { icon: '💹', name: 'RR28', desc: 'AI Crypto Trading Agent' },
  { icon: '🦷', name: 'DentFlow AI', desc: 'AI-Powered Dental Platform' },
  { icon: '📊', name: 'Code Evaluator', desc: 'AI Code Analysis Engine' },
  { icon: '🔧', name: 'Coder815', desc: 'Production MCP Server' },
];

export function renderHome(container) {
  container.innerHTML = `
    <div class="hero-page">
      <div class="hero-terminal">
        <div class="terminal-header">
          <span class="terminal-dot red"></span>
          <span class="terminal-dot yellow"></span>
          <span class="terminal-dot green"></span>
          <span class="terminal-title">shyam@ai-engineer:~$</span>
        </div>
        <div class="terminal-body" id="terminal-body">
          <div id="terminal-lines"></div>
          <div style="margin-top:24px;" id="hero-after-type">
            <div class="hero-stats">
              <div class="hero-stat">
                <div class="hero-stat-number">7+</div>
                <div class="hero-stat-label">AI Projects Shipped</div>
              </div>
              <div class="hero-stat">
                <div class="hero-stat-number">4+</div>
                <div class="hero-stat-label">Years Building</div>
              </div>
              <div class="hero-stat">
                <div class="hero-stat-number">3</div>
                <div class="hero-stat-label">Companies</div>
              </div>
              <div class="hero-stat">
                <div class="hero-stat-number">31</div>
                <div class="hero-stat-label">TTS Languages</div>
              </div>
            </div>
            <div class="hero-ctas">
              <button class="hero-btn primary" onclick="window.location.hash='#projects'">
                View Projects →
              </button>
              <button class="hero-btn secondary" onclick="window.location.hash='#about'">
                About Me
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Type terminal lines after render
  setTimeout(() => {
    typeTerminal('terminal-lines', [
      { text: 'SYSTEM: Booting AI Engineering Portfolio...', color: '#555577' },
      { text: 'SYSTEM: Loading neural networks...', color: '#555577' },
      { text: 'SYSTEM: Initializing voice pipeline...', color: '#555577' },
      { text: '', color: '#555577' },
      { text: '$ whoami', color: '#00FF41' },
      { text: 'SHYAM KUMAR GATTI', color: '#FFFFFF' },
      { text: 'AI Engineer · Builder · Ship-it Energy', color: '#00E5FF' },
      { text: '', color: '#555577' },
      { text: '$ cat /etc/ai-engineer/profile', color: '#00FF41' },
      { text: 'Building voice agents, TTS systems, multi-agent architectures,', color: '#8888AA' },
      { text: 'and AI-powered platforms. Full-stack foundation (Java, Angular,', color: '#8888AA' },
      { text: 'AWS) meets AI specialization (LiveKit, ONNX, MCP, LangChain).', color: '#8888AA' },
      { text: '', color: '#555577' },
      { text: '$ ls projects/ai/', color: '#00FF41' },
      ...projects.map(p => ({
        text: `${p.icon}  ${p.name.padEnd(20)} ${p.desc}`,
        color: '#00E5FF'
      })),
      { text: '', color: '#555577' },
      { text: '$ echo "Ready to ship."', color: '#00FF41' },
      { text: 'Ready to ship.', color: '#00FF41' },
    ], 15);
  }, 300);
}
