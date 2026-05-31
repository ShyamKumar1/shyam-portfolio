/* =============================================================================
   ABOUT PAGE — Bio + Contact
   ============================================================================= */

export function renderAbout(container) {
  container.innerHTML = `
    <div class="about-page">
      <div class="page-header">
        <div class="page-tag">// about + connect</div>
        <h1 class="page-title">
          Let's <span class="highlight">Build</span>
        </h1>
        <p class="page-subtitle">
          AI Engineer with a rare combination: full-stack technical foundation and
          creative leadership. I ship systems that work and tell stories that stick.
        </p>
      </div>

      <div class="about-grid">
        <div class="about-bio">
          <p>
            I'm <strong>Shyam Kumar Gatti</strong> — an <strong>AI Engineer</strong> based in India.
            My career spans enterprise software development at <strong>Cognizant</strong>,
            founding and scaling a digital agency, and building <strong>AI systems</strong> 
            that work in production.
          </p>
          <p>
            I build <strong>voice agents</strong> with LiveKit, <strong>TTS engines</strong> 
            with ONNX, <strong>trading bots</strong> with ML, and <strong>multi-agent systems</strong> 
            with MCP. Every project is production-grade — deployed, tested, shipping.
          </p>
          <p>
            What sets me apart? I speak both <strong>engineering</strong> and <strong>strategy</strong>.
            I can architect a voice pipeline AND explain it to stakeholders. I can train a model
            AND design the brand around it. That intersection is where I live.
          </p>
          <p>
            Outside of code: I love <strong>bikes, anime, and building things</strong> that matter.
            I communicate in English, Hindi, Kannada, and Telugu.
          </p>
        </div>

        <div>
          <h3>Quick Facts</h3>
          <div class="info-item">
            <span class="info-label">📍 Location</span>
            <span class="info-value">Andhra Pradesh, India</span>
          </div>
          <div class="info-item">
            <span class="info-label">🎯 Role</span>
            <span class="info-value">AI Engineer</span>
          </div>
          <div class="info-item">
            <span class="info-label">⚡ Status</span>
            <span class="info-value" style="color:var(--terminal-green);">Open to opportunities</span>
          </div>
          <div class="info-item">
            <span class="info-label">🌐 Languages</span>
            <span class="info-value">English, Hindi, Kannada, Telugu</span>
          </div>
          <div class="info-item">
            <span class="info-label">📅 Experience</span>
            <span class="info-value">4+ years</span>
          </div>
          <div class="info-item">
            <span class="info-label">🏆 Award</span>
            <span class="info-value">Star of the Quarter — Cognizant</span>
          </div>
        </div>
      </div>

      <div class="contact-section">
        <h2>Let's Connect</h2>
        <p>I'm actively looking for AI Engineering roles. If you're building something that needs voice AI, real-time agents, or production ML — let's talk.</p>
        
        <div class="contact-links">
          <a href="mailto:gatti.shyamkumar@gmail.com" class="contact-link" target="_blank">
            <div class="contact-link-icon">📧</div>
            <div class="contact-link-info">
              <h4>Email</h4>
              <span>gatti.shyamkumar@gmail.com</span>
            </div>
          </a>
          
          <a href="https://linkedin.com/in/shyam-kumar-gatti" class="contact-link" target="_blank">
            <div class="contact-link-icon">💼</div>
            <div class="contact-link-info">
              <h4>LinkedIn</h4>
              <span>linkedin.com/in/shyam-kumar-gatti</span>
            </div>
          </a>
          
          <a href="https://github.com/ShyamKumar1" class="contact-link" target="_blank">
            <div class="contact-link-icon">🐙</div>
            <div class="contact-link-info">
              <h4>GitHub</h4>
              <span>github.com/ShyamKumar1</span>
            </div>
          </a>
          
          <a href="tel:+916302691075" class="contact-link" target="_blank">
            <div class="contact-link-icon">📞</div>
            <div class="contact-link-info">
              <h4>Phone</h4>
              <span>+91 63026 91075</span>
            </div>
          </a>
        </div>
      </div>

      <div class="footer">
        <span class="green">&gt;_</span> shyam kumar gatti · Built to ship AI · ${new Date().getFullYear()}
      </div>
    </div>
  `;
}
