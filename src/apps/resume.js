/* =============================================================================
   APP: Resume — Experience timeline + education
   ============================================================================= */
const EXPERIENCE = [
  { date: 'Aug 2025 — Present', role: 'Chief Operating Officer', company: 'Technitude Info Solutions', desc: 'Leading operations, brand strategy, and digital transformation for a dual-vertical IT/Ed-Tech company. Built centralized content pipelines and comprehensive SOPs.' },
  { date: '2023 — Present', role: 'Founder & CEO', company: 'Trilimedia Digital Agency', desc: 'Founded a full-service digital agency. Delivered branding and strategy for 10+ clients across F&B, retail, IT, fitness, and education.' },
  { date: 'Mar 2022 — Nov 2024', role: 'Programming Analyst', company: 'Cognizant Technology Solutions', desc: 'Developed enterprise apps with Java, Angular, TypeScript, AWS. Star of the Quarter award recipient.' },
];

const EDUCATION = [
  { date: '2019 — 2022', role: 'B.Tech — Computer Science & Engineering', company: 'JNTUA College of Engineering, Anantapur' },
  { date: '2016 — 2019', role: 'Diploma — Computer Engineering', company: 'SV Government Polytechnic, Tirupati' },
];

const CERTS = [
  'AWS Certified Cloud Practitioner', 'IBM AI Fundamentals', 'Google Cloud: Load Balancing',
  'Social Media Marketing Certification', 'Star of the Quarter — Cognizant'
];

export function renderResume() {
  return {
    html: `
      <div class="resume-section">
        <div class="resume-section-title">$ experience</div>
        ${EXPERIENCE.map(e => `
          <div class="timeline-item">
            <div class="timeline-date">${e.date}</div>
            <div class="timeline-role">${e.role}</div>
            <div class="timeline-company">${e.company}</div>
            <div class="timeline-desc">${e.desc}</div>
          </div>
        `).join('')}
      </div>
      <div class="resume-section">
        <div class="resume-section-title" style="color:var(--accent-cyan);">$ education</div>
        ${EDUCATION.map(e => `
          <div class="timeline-item">
            <div class="timeline-date" style="color:var(--accent-cyan);">${e.date}</div>
            <div class="timeline-role">${e.role}</div>
            <div class="timeline-company" style="color:var(--accent-cyan);">${e.company}</div>
          </div>
        `).join('')}
      </div>
      <div class="resume-section">
        <div class="resume-section-title" style="color:var(--accent-purple);">$ certifications</div>
        <div>${CERTS.map(c => `<span class="cert-badge">✦ ${c}</span>`).join('')}</div>
      </div>
    `
  };
}
