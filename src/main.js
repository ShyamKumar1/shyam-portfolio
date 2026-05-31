/* =============================================================================
   MAIN — OS boot, desktop init, app launcher
   ============================================================================= */
import { initWallpaper } from './os/wallpaper.js';
import { bootSequence } from './os/boot.js';
import { createWindow, closeWindow, closeAllWindows } from './os/windowManager.js';
import { initTaskbar, populateStartMenu } from './os/taskbar.js';
import { initDesktop } from './os/desktop.js';
import { renderProjects } from './apps/projects.js';
import { renderStack } from './apps/stack.js';
import { renderResume } from './apps/resume.js';
import { renderAbout } from './apps/about.js';
import { renderTerminal } from './apps/terminal.js';

// Expose closeAllWindows for context menu
window.__closeAllWindows = closeAllWindows;

// App definitions
const APPS = [
  {
    id: 'projects', icon: '📁', label: 'Projects', desc: 'AI project showcase',
    onOpen: () => openApp('projects', '📁', 'Projects', 640, 420, renderProjects),
  },
  {
    id: 'stack', icon: '🛠️', label: 'Tech Stack', desc: 'Skills & technologies',
    onOpen: () => openApp('stack', '🛠️', 'Tech Stack', 440, 360, renderStack),
  },
  {
    id: 'resume', icon: '📄', label: 'Resume', desc: 'Experience & education',
    onOpen: () => openApp('resume', '📄', 'Resume', 520, 420, renderResume),
  },
  {
    id: 'about', icon: '👤', label: 'About Me', desc: 'Bio & contact',
    onOpen: () => openApp('about', '👤', 'About Me', 560, 440, renderAbout),
  },
  {
    id: 'terminal', icon: '💻', label: 'Terminal', desc: 'Command-line interface',
    onOpen: () => openApp('terminal', '💻', 'Terminal', 520, 360, renderTerminal),
  },
  {
    id: 'github', icon: '🐙', label: 'GitHub', desc: 'Open GitHub profile',
    onOpen: () => window.open('https://github.com/ShyamKumar1', '_blank'),
  },
];

function openApp(id, icon, title, width, height, renderFn) {
  const result = renderFn();
  const winId = createWindow({
    title,
    icon,
    width,
    height,
    appId: id,
    content: result.html,
  });

  // Run afterRender if exists
  if (result.afterRender) {
    // Wait for DOM to render
    setTimeout(() => result.afterRender(), 50);
  }
}

// Start menu items
const START_ITEMS = APPS.filter(a => a.id !== 'github');

// Boot
bootSequence(() => {
  // Init wallpaper
  const canvas = document.getElementById('wallpaper-canvas');
  if (canvas) initWallpaper(canvas);

  // Init desktop
  initDesktop(APPS);

  // Init taskbar
  initTaskbar();
  populateStartMenu(START_ITEMS);
  window.__updateTaskbar();

  // Wire start menu items
  document.querySelectorAll('.start-item').forEach(el => {
    el.addEventListener('click', () => {
      const app = START_ITEMS.find(a => a.id === el.dataset.appId);
      if (app) app.onOpen();
      document.getElementById('start-menu').classList.add('hidden');
    });
  });

  // Wire start menu footer buttons
  document.getElementById('start-about')?.addEventListener('click', () => {
    const about = APPS.find(a => a.id === 'about');
    if (about) about.onOpen();
    document.getElementById('start-menu').classList.add('hidden');
  });
  document.getElementById('start-github')?.addEventListener('click', () => {
    window.open('https://github.com/ShyamKumar1', '_blank');
    document.getElementById('start-menu').classList.add('hidden');
  });

  // Auto-open projects on boot
  setTimeout(() => {
    const projects = APPS.find(a => a.id === 'projects');
    if (projects) projects.onOpen();
  }, 600);
});
