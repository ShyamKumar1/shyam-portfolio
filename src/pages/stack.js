/* =============================================================================
   STACK PAGE — Tech Constellation + Categories
   ============================================================================= */
import { initTechConstellation } from '../js/effects.js';

const TECH_STACK = [
  // AI / ML
  { name: 'Python', category: 'Languages', color: '#00FF41' },
  { name: 'TypeScript', category: 'Languages', color: '#3178C6' },
  { name: 'Java', category: 'Languages', color: '#ED8B00' },
  { name: 'JavaScript', category: 'Languages', color: '#FFD700' },
  
  // AI Frameworks
  { name: 'LiveKit', category: 'AI/Realtime', color: '#00E5FF' },
  { name: 'ONNX', category: 'AI/Realtime', color: '#8B5CF6' },
  { name: 'PyTorch', category: 'AI/Realtime', color: '#EE4C2C' },
  { name: 'LangChain', category: 'AI/Realtime', color: '#00A86B' },
  { name: 'MCP', category: 'AI/Realtime', color: '#FF6B6B' },
  { name: 'OpenAI', category: 'AI/Realtime', color: '#00A67E' },
  { name: 'Anthropic', category: 'AI/Realtime', color: '#D4A574' },
  
  // Backend
  { name: 'FastAPI', category: 'Backend', color: '#009688' },
  { name: 'Node.js', category: 'Backend', color: '#339933' },
  { name: 'Spring Boot', category: 'Backend', color: '#6DB33F' },
  { name: 'Express', category: 'Backend', color: '#888888' },
  
  // Frontend
  { name: 'React', category: 'Frontend', color: '#61DAFB' },
  { name: 'Angular', category: 'Frontend', color: '#DD0031' },
  { name: 'Vite', category: 'Frontend', color: '#646CFF' },
  
  // Infrastructure
  { name: 'AWS', category: 'Infrastructure', color: '#FF9900' },
  { name: 'Docker', category: 'Infrastructure', color: '#2496ED' },
  { name: 'Redis', category: 'Infrastructure', color: '#DC382D' },
  { name: 'Postgres', category: 'Infrastructure', color: '#336791' },
  { name: 'WebRTC', category: 'Infrastructure', color: '#00A2FF' },
  
  // Tools
  { name: 'Git/GitHub', category: 'Tools', color: '#F05032' },
  { name: 'Figma', category: 'Tools', color: '#F24E1E' },
  { name: 'Adobe Suite', category: 'Tools', color: '#FF0000' },
  { name: 'JIRA', category: 'Tools', color: '#0052CC' },
];

const CONNECTIONS = [
  [0, 3], [0, 5], [0, 7], [0, 4],    // Python connections
  [3, 11], [3, 12],                    // JS connections
  [4, 22], [4, 23],                    // LiveKit connections
  [5, 6], [5, 0],                      // ONNX/PyTorch
  [7, 8], [7, 0],                      // LangChain/MCP
  [11, 12], [11, 19], [11, 20],        // Backend connections
  [14, 16], [14, 17],                  // Frontend connections
  [18, 22], [18, 23],                  // AWS/Infra
  [18, 24], [18, 19],                  // AWS/Docker
  [21, 0], [21, 20],                   // Git/Python
];

const CATEGORIES = {
  'AI/Realtime': TECH_STACK.filter(t => t.category === 'AI/Realtime'),
  Languages: TECH_STACK.filter(t => t.category === 'Languages'),
  Backend: TECH_STACK.filter(t => t.category === 'Backend'),
  Frontend: TECH_STACK.filter(t => t.category === 'Frontend'),
  Infrastructure: TECH_STACK.filter(t => t.category === 'Infrastructure'),
  Tools: TECH_STACK.filter(t => t.category === 'Tools'),
};

export function renderStack(container) {
  container.innerHTML = `
    <div class="stack-page">
      <div class="page-header">
        <div class="page-tag">// tech stack</div>
        <h1 class="page-title">
          Tools I <span class="highlight">Wield</span>
        </h1>
        <p class="page-subtitle">
          From AI inference to cloud infrastructure — the stack I use to ship production systems.
          Hover the constellation to explore connections.
        </p>
      </div>

      <div class="stack-canvas-container" id="constellation-container"></div>

      <div class="stack-categories">
        ${Object.entries(CATEGORIES).map(([cat, items]) => `
          <div class="stack-category">
            <div class="stack-category-title">${cat}</div>
            <div class="stack-category-tags">
              ${items.map(t => `<span class="project-tag">${t.name}</span>`).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  // Init constellation after render
  setTimeout(() => {
    initTechConstellation('constellation-container', TECH_STACK, CONNECTIONS);
  }, 500);
}
