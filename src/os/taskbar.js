/* =============================================================================
   TASKBAR — Window list, clock, start menu
   ============================================================================= */
import { getOpenWindows, restoreWindow, closeAllWindows } from './windowManager.js';

export function initTaskbar() {
  updateClock();
  setInterval(updateClock, 1000);

  // Start button
  document.getElementById('start-btn').addEventListener('click', () => {
    document.getElementById('start-menu').classList.toggle('hidden');
  });

  // Close start menu on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('#start-btn') && !e.target.closest('.start-menu')) {
      document.getElementById('start-menu').classList.add('hidden');
    }
  });

  window.__updateTaskbar = updateTaskbarWindows;
}

function updateClock() {
  const now = new Date();
  const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  document.getElementById('tray-clock').textContent = time;
}

function updateTaskbarWindows() {
  const container = document.getElementById('taskbar-windows');
  const windows = getOpenWindows();
  
  container.innerHTML = windows.map(w => `
    <button class="taskbar-window ${w.isActive ? 'active' : ''} ${w.minimized ? '' : ''}"
      data-win-id="${w.id}">
      ${w.title} ${w.minimized ? '(min)' : ''}
    </button>
  `).join('');

  container.querySelectorAll('.taskbar-window').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.winId;
      const win = getOpenWindows().find(w => w.id === id);
      if (win) {
        if (win.minimized || !win.isActive) {
          restoreWindow(id);
        }
      }
    });
  });
}

export function populateStartMenu(icons) {
  const container = document.getElementById('start-items');
  container.innerHTML = icons.map(app => `
    <button class="start-item" data-app-id="${app.id}">
      <span class="si-icon">${app.icon}</span>
      <div>
        <div class="si-label">${app.label}</div>
        <div class="si-desc">${app.desc || ''}</div>
      </div>
    </button>
  `).join('');
}
