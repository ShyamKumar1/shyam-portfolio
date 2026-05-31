/* =============================================================================
   APP: Terminal — Interactive command-line
   ============================================================================= */
const COMMANDS = {
  help: { desc: 'Show available commands', fn: () => `
${'Available commands:'.padEnd(30)} ${'Description'}
${'─'.repeat(50)}
${'help'.padEnd(30)} Show available commands
${'projects'.padEnd(30)} List AI projects
${'skills'.padEnd(30)} Show tech stack
${'about'.padEnd(30)} About me
${'contact'.padEnd(30)} Contact info
${'clear'.padEnd(30)} Clear terminal
${'whoami'.padEnd(30)} Who is this?
${'stats'.padEnd(30)} Portfolio statistics
${'github'.padEnd(30)} Open GitHub profile
${'linkedin'.padEnd(30)} Open LinkedIn profile
  `},
  whoami: { desc: 'Who is this?', fn: () => `Shyam Kumar Gatti — AI Engineer. Builder of voice agents, TTS engines, and AI systems.` },
  projects: { desc: 'List AI projects', fn: () => `
${'Project'.padEnd(30)} ${'Stack'}
${'─'.repeat(50)}
${'VoxCraft TTS Studio'.padEnd(30)} Python, ONNX, PyTorch
${'Intelli Catalog LiveKit'.padEnd(30)} Python, LiveKit, WebRTC
${'RR28 Crypto Agent'.padEnd(30)} Python, ML, CCXT
${'DentFlow AI'.padEnd(30)} Python, Node.js, React
${'AI Code Evaluator'.padEnd(30)} Python, AI, Static Analysis
${'Coder815 MCP Server'.padEnd(30)} Node.js, MCP, TypeScript
${'OpenCode Agent Teams'.padEnd(30)} Node.js, AI Agents
${'ProjectsHub'.padEnd(30)} Node.js, React, Postgres
  `},
  skills: { desc: 'Show tech stack', fn: () => `
${'Category'.padEnd(20)} ${'Technologies'}
${'─'.repeat(50)}
${'AI/ML'.padEnd(20)} Python, LiveKit, ONNX, PyTorch, LangChain, MCP
${'Languages'.padEnd(20)} Python, TypeScript, JavaScript, Java, SQL
${'Backend'.padEnd(20)} FastAPI, Node.js, Spring Boot, Express
${'Frontend'.padEnd(20)} React, Angular, HTML/CSS, Vite
${'Infra'.padEnd(20)} AWS, Docker, Redis, Postgres, WebRTC
${'Tools'.padEnd(20)} Git, Figma, Adobe Suite, JIRA
  `},
  about: { desc: 'About me', fn: () => `AI Engineer · Founder · Full-stack foundation meets AI specialization. 7+ AI projects shipped. 4+ years experience. 3 companies. 31 TTS languages. Based in India.` },
  contact: { desc: 'Contact info', fn: () => `Email: gatti.shyamkumar@gmail.com\nLinkedIn: linkedin.com/in/shyam-kumar-gatti\nGitHub: github.com/ShyamKumar1` },
  stats: { desc: 'Portfolio stats', fn: () => `📊 Portfolio Stats:\n• 8 AI Projects\n• 27 Technologies\n• 3 Companies\n• 4+ Years Experience\n• 31 TTS Languages\n• 1 Star of Quarter Award` },
  github: { desc: 'Open GitHub', fn: () => { window.open('https://github.com/ShyamKumar1', '_blank'); return '🌐 Opening GitHub...'; } },
  linkedin: { desc: 'Open LinkedIn', fn: () => { window.open('https://linkedin.com/in/shyam-kumar-gatti', '_blank'); return '🌐 Opening LinkedIn...'; } },
  clear: { desc: 'Clear terminal', fn: () => '__CLEAR__' },
};

export function renderTerminal() {
  const html = `
    <div class="terminal" id="terminal-window">
      <div class="terminal-output" id="term-output">
        <span class="green">╔═══════════════════════════════════════╗</span>
        <span class="green">║   SHYAM OS — Terminal v1.0            ║</span>
        <span class="green">╚═══════════════════════════════════════╝</span>
        <span>Type <span class="cyan">help</span> for available commands.</span>
      </div>
      <div class="terminal-input-line">
        <span class="terminal-prompt">shyam@os:~$</span>
        <input type="text" class="terminal-input" id="term-input" autofocus spellcheck="false" autocomplete="off">
      </div>
    </div>
  `;

  return {
    html,
    afterRender: () => {
      const input = document.getElementById('term-input');
      const output = document.getElementById('term-output');
      if (!input || !output) return;

      const appendOutput = (text) => {
        const pre = document.createElement('pre');
        pre.style.margin = '0';
        pre.style.fontFamily = 'inherit';
        pre.style.fontSize = 'inherit';
        pre.style.lineHeight = 'inherit';
        pre.innerHTML = text;
        output.appendChild(pre);
        output.scrollTop = output.scrollHeight;
      };

      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const cmd = input.value.trim().toLowerCase();
          input.value = '';

          appendOutput(`<span class="green">shyam@os:~$</span> <span>${cmd}</span>`);

          if (cmd === '') return;

          const command = COMMANDS[cmd];
          if (command) {
            const result = command.fn();
            if (result === '__CLEAR__') {
              output.innerHTML = '';
            } else {
              appendOutput(result);
            }
          } else {
            appendOutput(`<span class="dim">Command not found: ${cmd}. Type <span class="cyan">help</span> for available commands.</span>`);
          }

          output.scrollTop = output.scrollHeight;
        }
      });

      // Focus input when terminal is clicked
      document.getElementById('terminal-window')?.addEventListener('click', () => input.focus());

      // Small delay to focus
      setTimeout(() => input.focus(), 100);
    }
  };
}
