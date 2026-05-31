/* =============================================================================
   DESKTOP — Icon grid + right-click menu
   ============================================================================= */
export function initDesktop(apps) {
  const container = document.getElementById('desktop-icons');
  container.innerHTML = apps.map(app => `
    <div class="desktop-icon" data-app-id="${app.id}" title="${app.desc || app.label}">
      <div class="desktop-icon-icon">${app.icon}</div>
      <div class="desktop-icon-label">${app.label}</div>
    </div>
  `).join('');

  container.querySelectorAll('.desktop-icon').forEach(el => {
    el.addEventListener('dblclick', () => {
      const app = apps.find(a => a.id === el.dataset.appId);
      if (app) app.onOpen();
    });
  });

  // Right-click context menu
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    const existing = document.querySelector('.context-menu');
    if (existing) existing.remove();

    const menu = document.createElement('div');
    menu.className = 'context-menu';
    menu.style.left = e.clientX + 'px';
    menu.style.top = e.clientY + 'px';
    menu.innerHTML = `
      <button class="context-item" data-action="refresh">🔄 Refresh Wallpaper</button>
      <button class="context-item" data-action="projects">📁 Open Projects</button>
      <button class="context-item" data-action="about">👤 About Me</button>
      <div class="context-divider"></div>
      <button class="context-item" data-action="close-all">✕ Close All Windows</button>
    `;
    document.body.appendChild(menu);

    menu.querySelectorAll('.context-item').forEach(item => {
      item.addEventListener('click', () => {
        const action = item.dataset.action;
        if (action === 'refresh') {
          showToast('🔄 Wallpaper refreshed');
        }
        if (action === 'projects') {
          const p = apps.find(a => a.id === 'projects');
          if (p) p.onOpen();
        }
        if (action === 'about') {
          const a = apps.find(x => x.id === 'about');
          if (a) a.onOpen();
        }
        if (action === 'close-all') {
          const { closeAllWindows } = require('./windowManager.js');
          // Use window reference instead
          if (window.__closeAllWindows) window.__closeAllWindows();
          showToast('✕ All windows closed');
        }
        menu.remove();
      });
    });

    // Close on outside click
    setTimeout(() => {
      document.addEventListener('click', () => { if (menu.parentNode) menu.remove(); }, { once: true });
    }, 0);
  });
}

export function showToast(msg) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
}
