/* =============================================================================
   APP: About — Bio + Contact
   ============================================================================= */
export function renderAbout() {
  return {
    html: `
      <div class="about-grid">
        <div class="about-bio">
          <p>I'm <strong>Shyam Kumar Gatti</strong> — an <strong>AI Engineer</strong> based in India. My career spans enterprise development at <strong>Cognizant</strong>, founding a digital agency, and building production <strong>AI systems</strong>.</p>
          <p>I build <strong>voice agents</strong> with LiveKit, <strong>TTS engines</strong> with ONNX, <strong>trading bots</strong> with ML, and <strong>multi-agent systems</strong> with MCP. Every project ships.</p>
          <p>I speak both <strong>engineering</strong> and <strong>strategy</strong>. I architect voice pipelines AND design the brand around them. That intersection is where I live.</p>
          <p>Outside code: bikes, anime, and building things that matter.<br>
          Languages: English · Hindi · Kannada · Telugu</p>
        </div>
        <div>
          <div style="margin-bottom:16px;">
            <div style="display:flex;gap:12px;padding:10px 0;border-bottom:1px solid var(--border-window);font-size:13px;">
              <span style="color:var(--text-dim);min-width:80px;font-family:var(--font-mono);font-size:11px;">📍 Location</span>
              <span>Andhra Pradesh, India</span>
            </div>
            <div style="display:flex;gap:12px;padding:10px 0;border-bottom:1px solid var(--border-window);font-size:13px;">
              <span style="color:var(--text-dim);min-width:80px;font-family:var(--font-mono);font-size:11px;">⚡ Status</span>
              <span style="color:var(--accent-green);">Open to AI Engineering roles</span>
            </div>
            <div style="display:flex;gap:12px;padding:10px 0;border-bottom:1px solid var(--border-window);font-size:13px;">
              <span style="color:var(--text-dim);min-width:80px;font-family:var(--font-mono);font-size:11px;">📅 Experience</span>
              <span>4+ years</span>
            </div>
            <div style="display:flex;gap:12px;padding:10px 0;font-size:13px;">
              <span style="color:var(--text-dim);min-width:80px;font-family:var(--font-mono);font-size:11px;">🏆 Award</span>
              <span>Star of the Quarter — Cognizant</span>
            </div>
          </div>

          <div style="font-size:13px;font-weight:600;color:var(--accent-cyan);margin-bottom:8px;">Connect</div>
          <div class="contact-list">
            <a class="contact-item" href="mailto:gatti.shyamkumar@gmail.com" target="_blank">
              <span class="contact-item-icon">📧</span>
              <div class="contact-item-info"><h4>Email</h4><span>gatti.shyamkumar@gmail.com</span></div>
            </a>
            <a class="contact-item" href="https://linkedin.com/in/shyam-kumar-gatti" target="_blank">
              <span class="contact-item-icon">💼</span>
              <div class="contact-item-info"><h4>LinkedIn</h4><span>linkedin.com/in/shyam-kumar-gatti</span></div>
            </a>
            <a class="contact-item" href="https://github.com/ShyamKumar1" target="_blank">
              <span class="contact-item-icon">🐙</span>
              <div class="contact-item-info"><h4>GitHub</h4><span>github.com/ShyamKumar1</span></div>
            </a>
          </div>
        </div>
      </div>
    `
  };
}
