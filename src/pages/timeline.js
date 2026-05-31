/* =============================================================================
   TIMELINE PAGE — Professional Experience
   ============================================================================= */

const EXPERIENCE = [
  {
    date: 'Aug 2025 — Present',
    role: 'Chief Operating Officer',
    company: 'Technitude Info Solutions Pvt Ltd',
    desc: 'Leading operations, brand communication, and digital strategy for a dual-vertical IT services and Ed-Tech company. Architected end-to-end brand restructuring, built centralized content pipelines, and created comprehensive SOPs for multi-stakeholder operations.',
  },
  {
    date: '2023 — Present',
    role: 'Founder & CEO',
    company: 'Trilimedia Digital Agency',
    desc: 'Founded and scaled a full-service digital agency. Delivered branding, social media management, and creative strategy for 10+ clients across F&B, retail, IT, fitness, and education. Built brand identity systems, content workflows, and press kits from scratch.',
  },
  {
    date: 'Mar 2022 — Nov 2024',
    role: 'Programming Analyst',
    company: 'Cognizant Technology Solutions',
    desc: 'Progressed from intern to Programming Analyst in under 3 years. Developed enterprise web applications using Java (Spring Boot), Angular, TypeScript, and AWS. Star of the Quarter award recipient for exceptional contribution and delivery quality.',
  },
];

const EDUCATION = [
  {
    date: '2019 — 2022',
    role: 'Bachelor of Technology — CSE',
    company: 'JNTUA College of Engineering, Anantapur',
    desc: 'Specialized in Computer Science & Engineering.',
  },
  {
    date: '2016 — 2019',
    role: 'Diploma — Computer Engineering',
    company: 'SV Government Polytechnic, Tirupati',
    desc: 'Foundation in computer engineering principles.',
  },
];

const CERTIFICATIONS = [
  'AWS Certified Cloud Practitioner (CLF-C02)',
  'IBM AI Fundamentals — IBM SkillsBuild',
  'Google Cloud: Load Balancing on Compute Engine',
  'Social Media Marketing Certification',
];

export function renderTimeline(container) {
  container.innerHTML = `
    <div class="timeline-page">
      <div class="page-header">
        <div class="page-tag">// career</div>
        <h1 class="page-title">
          My <span class="highlight">Journey</span>
        </h1>
        <p class="page-subtitle">
          From enterprise development at Cognizant to founding my own agency and
          building AI systems. Every role shaped how I approach AI engineering.
        </p>
      </div>

      <h2 style="font-size:20px;font-weight:700;margin-bottom:24px;font-family:var(--font-mono);color:var(--terminal-green);">
        &gt; experience
      </h2>
      <div class="timeline">
        ${EXPERIENCE.map(exp => `
          <div class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-date">${exp.date}</div>
            <div class="timeline-role">${exp.role}</div>
            <div class="timeline-company">${exp.company}</div>
            <div class="timeline-desc">${exp.desc}</div>
          </div>
        `).join('')}
      </div>

      <h2 style="font-size:20px;font-weight:700;margin:48px 0 24px;font-family:var(--font-mono);color:var(--accent-cyan);">
        &gt; education
      </h2>
      <div class="timeline">
        ${EDUCATION.map(edu => `
          <div class="timeline-item">
            <div class="timeline-dot" style="background:var(--accent-cyan);box-shadow:0 0 20px rgba(0,229,255,0.15);"></div>
            <div class="timeline-date" style="color:var(--accent-cyan);">${edu.date}</div>
            <div class="timeline-role">${edu.role}</div>
            <div class="timeline-company" style="color:var(--accent-cyan);">${edu.company}</div>
            <div class="timeline-desc">${edu.desc}</div>
          </div>
        `).join('')}
      </div>

      <h2 style="font-size:20px;font-weight:700;margin:48px 0 24px;font-family:var(--font-mono);color:var(--accent-purple);">
        &gt; certifications
      </h2>
      <div style="display:flex;flex-wrap:wrap;gap:8px;">
        ${CERTIFICATIONS.map(cert => `
          <span class="project-tag ml" style="font-size:13px;padding:6px 14px;">${cert}</span>
        `).join('')}
      </div>
    </div>
  `;

  // Trigger scroll animations after render
  setTimeout(() => {
    const items = document.querySelectorAll('.timeline-item');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );
    items.forEach(el => observer.observe(el));
  }, 100);
}
