/* =============================================================================
   APP: Stack — Tech skills organized by category
   ============================================================================= */
const TECH = {
  'AI / ML': ['Python', 'LiveKit', 'ONNX', 'PyTorch', 'LangChain', 'MCP', 'OpenAI', 'Anthropic', 'TensorRT'],
  'Languages': ['Python', 'TypeScript', 'JavaScript', 'Java', 'SQL'],
  'Backend': ['FastAPI', 'Node.js', 'Spring Boot', 'Express', 'REST APIs'],
  'Frontend': ['React', 'Angular', 'HTML/CSS', 'Vite'],
  'Infrastructure': ['AWS', 'Docker', 'Redis', 'Postgres', 'WebRTC'],
  'Tools': ['Git/GitHub', 'Figma', 'Adobe Suite', 'JIRA', 'VS Code'],
};

export function renderStack() {
  const cats = Object.entries(TECH).map(([cat, items]) => `
    <div class="stack-cat">
      <div class="stack-cat-title">${cat}</div>
      <div class="stack-cat-tags">
        ${items.map(t => `<span class="proj-tag">${t}</span>`).join('')}
      </div>
    </div>
  `).join('');

  return {
    html: `
      <div style="margin-bottom:12px;font-size:13px;color:var(--text-secondary);">
        <span style="color:var(--accent-green);font-weight:600;">${Object.values(TECH).flat().length}</span> technologies across <span style="color:var(--accent-cyan);font-weight:600;">${Object.keys(TECH).length}</span> domains.
      </div>
      <div class="stack-cats">${cats}</div>
    `
  };
}
