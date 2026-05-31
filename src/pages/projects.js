/* =============================================================================
   PROJECTS PAGE — Showroom interactive cards
   ============================================================================= */
import { router } from '../js/router.js';

const FEATURED_PROJECTS = [
  {
    icon: '🎙',
    name: 'VoxCraft TTS Studio',
    desc: 'Enterprise-grade TTS engine running 100% locally with ONNX inference. Supports 31 languages, 10 voice styles, expression tags, and studio-quality 44.1kHz output.',
    tags: ['Python', 'ONNX', 'PyTorch', 'FastAPI', 'TensorRT'],
    tagColors: ['python', '', '', '', ''],
    details: 'Built a full TTS studio with Supertonic 3 (99M params). Features expression tags (&lt;laugh&gt;, &lt;whisper&gt;), speed control (0.7x-2.0x), batch processing, and waveform preview. All inference runs locally — no API calls, zero data leaves the machine.',
    links: { github: 'https://github.com/ShyamKumar1/voxcraft' },
  },
  {
    icon: '🤖',
    name: 'Intelli Catalog — LiveKit Agent',
    desc: 'Real-time voice and chat assistant for Electronic Parts Catalogs (EPC). Built with LiveKit Agents framework, 8 function-calling tools, multi-turn context retention.',
    tags: ['Python', 'LiveKit', 'WebRTC', 'GPT-4o', 'Deepgram', 'Cartesia'],
    tagColors: ['python', '', '', '', '', ''],
    details: 'Full LiveKit voice pipeline: Silero VAD → Deepgram STT → GPT-4o LLM with function calling → Cartesia TTS. 8 EPC-specific tools (search_parts, check_availability, add_to_cart, etc.). Docker-deployable, self-hosted or LiveKit Cloud.',
    links: {
      github: 'https://github.com/ShyamKumar1/intellicatalog-livekit',
      demo: 'https://intellicatalog-demo.vercel.app',
    },
  },
  {
    icon: '💹',
    name: 'RR28 — AI Crypto Trading Agent',
    desc: 'AI-powered cryptocurrency trading bot with backtesting engine, multi-strategy support, and real-time market analysis.',
    tags: ['Python', 'ML', 'CCXT', 'Pandas', 'WebSocket'],
    tagColors: ['python', 'ml', '', '', ''],
    details: 'Algorithmic trading agent supporting multiple exchanges via CCXT. Features backtest_all.py for strategy evaluation, real-time data pipelines, and ML-based signal generation. Built with production-grade error handling.',
    links: { github: 'https://github.com/ShyamKumar1/RR28' },
  },
  {
    icon: '🦷',
    name: 'DentFlow AI — Dental Platform',
    desc: 'AI-powered dental practice management system. Patient records, AI-assisted diagnosis, appointment scheduling, and analytics dashboard.',
    tags: ['Python', 'Node.js', 'React', 'Postgres', 'Docker', 'AI'],
    tagColors: ['python', 'js', '', '', '', 'ml'],
    details: 'Full-stack dental practice platform with AI features. Includes patient management, AI-assisted diagnostic tools, treatment planning, and analytics. Built with modern stack for scalability.',
    links: { github: 'https://github.com/ShyamKumar1/dentflow-ai' },
  },
  {
    icon: '📊',
    name: 'AI Code Evaluator',
    desc: 'Automated code evaluation engine powered by AI. Analyzes code quality, suggests improvements, and generates test cases.',
    tags: ['Python', 'AI', 'Static Analysis', 'AST'],
    tagColors: ['python', 'ml', '', ''],
    details: 'Benchmark-driven AI code evaluation tool. Uses static analysis and ML models to assess code quality, identify patterns, and provide actionable feedback. Designed for educational and CI/CD integration.',
    links: { github: 'https://github.com/ShyamKumar1/ai-code-evaluator' },
  },
  {
    icon: '🔧',
    name: 'Coder815 — MCP Server',
    desc: 'Production Engineering MCP (Model Context Protocol) server. Enables AI agents to interact with production engineering tools and workflows.',
    tags: ['Node.js', 'MCP', 'TypeScript', 'API'],
    tagColors: ['js', '', '', ''],
    details: 'Production-grade MCP server that bridges AI coding agents with engineering workflows. Implements the Model Context Protocol for secure, structured tool access.',
    links: { github: 'https://github.com/ShyamKumar1/Coder815' },
  },
  {
    icon: '🧠',
    name: 'OpenCode Agent Teams',
    desc: 'Multi-agent orchestration system. Coordinates multiple AI agents working on complex software development tasks.',
    tags: ['Node.js', 'TypeScript', 'AI Agents', 'Orchestration'],
    tagColors: ['js', '', 'ml', ''],
    details: 'Multi-agent coordination framework that enables teams of AI agents to collaborate on software development tasks. Features task decomposition, inter-agent communication, and progress tracking.',
    links: { github: 'https://github.com/ShyamKumar1/OpenCode-Agent-Teams' },
  },
  {
    icon: '🏗️',
    name: 'ProjectsHub',
    desc: 'Full-stack project management platform with team collaboration, task tracking, activity logging, and GitHub integration.',
    tags: ['Node.js', 'React', 'Postgres', 'Redis', 'Docker'],
    tagColors: ['js', '', '', '', ''],
    details: 'Comprehensive project management tool built with modern stack. Features include task management with Kanban board, team collaboration, activity streaks, GitHub integration, and real-time notifications.',
    links: { github: 'https://github.com/ShyamKumar1/ProjectsHub' },
  },
];

export function renderProjects(container) {
  container.innerHTML = `
    <div class="projects-page">
      <div class="page-header">
        <div class="page-tag">// featured work</div>
        <h1 class="page-title">
          AI Projects I've <span class="highlight">Shipped</span>
        </h1>
        <p class="page-subtitle">
          From TTS engines running on local ONNX to real-time voice agents on LiveKit —
          each project is a production-grade system I designed, built, and deployed.
        </p>
      </div>
      <div class="projects-grid" id="projects-grid">
        ${FEATURED_PROJECTS.map((p, i) => `
          <div class="project-card" data-index="${i}" onclick="window.__openProject(${i})">
            <div class="project-card-icon">${p.icon}</div>
            <h3 class="project-card-name">${p.name}</h3>
            <p class="project-card-desc">${p.desc}</p>
            <div class="project-card-tags">
              ${p.tags.map((tag, ti) => `
                <span class="project-tag ${p.tagColors[ti] || ''}">${tag}</span>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Project Detail Modal -->
    <div class="project-modal" id="project-modal">
      <div class="modal-overlay" onclick="window.__closeProject()"></div>
      <div class="modal-content" id="modal-content"></div>
    </div>
  `;

  // Expose open/close functions globally for onclick
  window.__openProject = (index) => {
    const p = FEATURED_PROJECTS[index];
    if (!p) return;

    const modal = document.getElementById('project-modal');
    const content = document.getElementById('modal-content');

    content.innerHTML = `
      <button class="modal-close" onclick="window.__closeProject()">✕</button>
      <div style="font-size:48px;margin-bottom:16px;">${p.icon}</div>
      <h2 style="font-size:24px;font-weight:700;margin-bottom:8px;">${p.name}</h2>
      <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:20px;">
        ${p.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
      </div>
      <p style="font-size:15px;color:var(--text-secondary);line-height:1.8;margin-bottom:24px;">
        ${p.details}
      </p>
      <div style="display:flex;gap:12px;">
        ${p.links.github ? `<a href="${p.links.github}" target="_blank" class="project-link" style="padding:10px 20px;border:1px solid var(--border-color);border-radius:8px;font-size:13px;">🐙 GitHub →</a>` : ''}
        ${p.links.demo ? `<a href="${p.links.demo}" target="_blank" class="project-link" style="padding:10px 20px;border:1px solid var(--terminal-green);border-radius:8px;font-size:13px;color:var(--terminal-green);">🚀 Live Demo →</a>` : ''}
      </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.__closeProject = () => {
    const modal = document.getElementById('project-modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  // Close modal on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') window.__closeProject();
  });
}
