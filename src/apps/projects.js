/* =============================================================================
   APP: Projects — AI project showcase
   ============================================================================= */
const PROJECTS = [
  { icon: '🎙', name: 'VoxCraft TTS Studio', desc: 'Enterprise TTS engine using ONNX inference. 31 languages, 10 voice styles, studio-quality output.', tags: ['Python', 'ONNX', 'PyTorch', 'FastAPI'], color: 'green', detail: 'Built a full TTS studio with Supertonic 3 (99M params). Features expression tags (&lt;laugh&gt;, &lt;whisper&gt;), speed control (0.7x-2.0x), batch processing, and waveform preview. All inference runs 100% locally.', github: 'https://github.com/ShyamKumar1/voxcraft' },
  { icon: '🤖', name: 'Intelli Catalog — LiveKit Agent', desc: 'Real-time voice assistant for EPC. LiveKit Agents framework, 8 function tools, multi-turn context.', tags: ['Python', 'LiveKit', 'WebRTC', 'GPT-4o'], color: 'cyan', detail: 'Complete voice pipeline: Silero VAD → DeepGram STT → GPT-4o LLM → Cartesia TTS. 8 EPC-specific tools including search_parts, check_availability, add_to_cart. Docker-deployable.', github: 'https://github.com/ShyamKumar1/intellicatalog-livekit', demo: 'https://intellicatalog-demo.vercel.app' },
  { icon: '💹', name: 'RR28 — AI Crypto Agent', desc: 'AI crypto trading bot with backtesting, multi-strategy, and real-time market analysis.', tags: ['Python', 'ML', 'CCXT', 'Pandas'], color: 'purple', detail: 'Algorithmic trading agent with backtest_all.py for strategy evaluation, real-time data pipelines, and ML-based signal generation. Supports multiple exchanges.', github: 'https://github.com/ShyamKumar1/RR28' },
  { icon: '🦷', name: 'DentFlow AI', desc: 'AI-powered dental practice management. Patient records, AI diagnostics, appointment scheduling.', tags: ['Python', 'Node.js', 'React', 'AI'], color: 'green', detail: 'Full-stack dental platform with AI-assisted diagnostics, treatment planning, patient management, and analytics dashboard.', github: 'https://github.com/ShyamKumar1/dentflow-ai' },
  { icon: '📊', name: 'AI Code Evaluator', desc: 'Automated code evaluation with static analysis and ML-based quality assessment.', tags: ['Python', 'AI', 'AST'], color: 'cyan', detail: 'Benchmark-driven evaluation tool using static analysis and ML to assess code quality, identify patterns, and provide actionable feedback.', github: 'https://github.com/ShyamKumar1/ai-code-evaluator' },
  { icon: '🔧', name: 'Coder815 — MCP Server', desc: 'Production MCP server bridging AI agents with engineering workflows.', tags: ['Node.js', 'MCP', 'TypeScript'], color: 'purple', detail: 'Production-grade MCP (Model Context Protocol) server enabling secure, structured tool access for AI coding agents.', github: 'https://github.com/ShyamKumar1/Coder815' },
  { icon: '🧠', name: 'OpenCode Agent Teams', desc: 'Multi-agent orchestration for collaborative software development.', tags: ['Node.js', 'AI', 'Orchestration'], color: 'green', detail: 'Framework for coordinating multiple AI agents on complex dev tasks. Features task decomposition, inter-agent communication, and progress tracking.', github: 'https://github.com/ShyamKumar1/OpenCode-Agent-Teams' },
  { icon: '🏗️', name: 'ProjectsHub', desc: 'Full-stack project management with Kanban, teams, and GitHub integration.', tags: ['Node.js', 'React', 'Postgres'], color: 'cyan', detail: 'Comprehensive PM tool with task management, team collaboration, activity streaks, and real-time notifications.', github: 'https://github.com/ShyamKumar1/ProjectsHub' },
];

export function renderProjects() {
  let currentDetail = null;

  const cards = PROJECTS.map((p, i) => `
    <div class="proj-card" data-index="${i}">
      <div class="proj-card-icon">${p.icon}</div>
      <div class="proj-card-name">${p.name}</div>
      <div class="proj-card-desc">${p.desc}</div>
      <div class="proj-card-tags">
        ${p.tags.map(t => `<span class="proj-tag ${p.color}">${t}</span>`).join('')}
      </div>
    </div>
  `).join('');

  const detail = `<div class="proj-detail" id="proj-detail"></div>`;

  const html = `
    <div style="margin-bottom:10px;font-size:13px;color:var(--text-secondary);">
      <span style="color:var(--accent-green);font-weight:600;">8 projects</span> shipped. Click any card for details.
    </div>
    <div class="projects-grid">${cards}</div>
    ${detail}
  `;

  // Return content + bind handler
  return {
    html,
    afterRender: (container) => {
      container.querySelectorAll('.proj-card').forEach(el => {
        el.addEventListener('click', () => {
          const idx = parseInt(el.dataset.index);
          const p = PROJECTS[idx];
          const detailEl = document.getElementById('proj-detail');
          if (!detailEl) return;

          if (currentDetail === idx) {
            detailEl.classList.remove('visible');
            currentDetail = null;
            return;
          }

          currentDetail = idx;
          detailEl.innerHTML = `
            <div style="font-size:32px;margin-bottom:8px;">${p.icon}</div>
            <h3>${p.name}</h3>
            <div style="display:flex;gap:4px;flex-wrap:wrap;margin-bottom:8px;">
              ${p.tags.map(t => `<span class="proj-tag ${p.color}">${t}</span>`).join('')}
            </div>
            <p>${p.detail}</p>
            <div class="proj-detail-links">
              <a href="${p.github}" target="_blank" class="proj-link-gh">🐙 GitHub →</a>
              ${p.demo ? `<a href="${p.demo}" target="_blank" class="proj-link-demo">🚀 Live Demo →</a>` : ''}
            </div>
          `;
          detailEl.classList.add('visible');
        });
      });
    }
  };
}
