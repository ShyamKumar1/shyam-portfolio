/* =============================================================================
   WINDOW MANAGER — Create, drag, close, minimize, z-index
   ============================================================================= */
let windowIdCounter = 0;
const openWindows = {};
let highestZ = 10;

export function createWindow(config) {
  const { title, icon, width = 520, height = 380, content = '', appId } = config;
  const id = `win-${++windowIdCounter}`;
  const container = document.getElementById('window-container');

  const win = document.createElement('div');
  win.className = 'window active';
  win.id = id;
  win.style.width = width + 'px';
  win.style.height = height + 'px';
  win.style.left = Math.max(40, 60 + (windowIdCounter % 6) * 40) + 'px';
  win.style.top = Math.max(40, 40 + (windowIdCounter % 6) * 35) + 'px';
  win.style.zIndex = ++highestZ;
  win.dataset.appId = appId || '';

  win.innerHTML = `
    <div class="window-header" id="${id}-header">
      <div class="window-dots">
        <div class="window-dot close" data-action="close" title="Close"></div>
        <div class="window-dot minimize" data-action="minimize" title="Minimize"></div>
        <div class="window-dot maximize" data-action="maximize" title="Maximize"></div>
      </div>
      <div class="window-title">${icon || ''} ${title}</div>
    </div>
    <div class="window-body" id="${id}-body">${content}</div>
  `;

  container.appendChild(win);
  openWindows[id] = { el: win, title, appId, minimized: false };

  // Dot actions
  win.querySelectorAll('.window-dot').forEach(dot => {
    dot.addEventListener('click', (e) => {
      e.stopPropagation();
      const action = dot.dataset.action;
      if (action === 'close') closeWindow(id);
      if (action === 'minimize') minimizeWindow(id);
      if (action === 'maximize') toggleMaximize(id);
    });
  });

  // Focus on click
  win.addEventListener('mousedown', () => focusWindow(id));

  // Drag
  makeDraggable(win, document.getElementById(`${id}-header`));

  // Update taskbar
  if (window.__updateTaskbar) window.__updateTaskbar();

  return id;
}

function focusWindow(id) {
  const win = openWindows[id];
  if (!win || win.minimized) return;
  win.el.style.zIndex = ++highestZ;
  win.el.classList.add('active');
  Object.keys(openWindows).forEach(k => {
    if (k !== id) openWindows[k].el.classList.remove('active');
  });
  if (window.__updateTaskbar) window.__updateTaskbar();
}

export function closeWindow(id) {
  const win = openWindows[id];
  if (!win) return;
  win.el.remove();
  delete openWindows[id];
  if (window.__updateTaskbar) window.__updateTaskbar();
  if (window.__onWindowClose) window.__onWindowClose(id);
}

export function minimizeWindow(id) {
  const win = openWindows[id];
  if (!win) return;
  win.minimized = !win.minimized;
  win.el.classList.toggle('minimized');
  if (window.__updateTaskbar) window.__updateTaskbar();
}

function toggleMaximize(id) {
  const win = openWindows[id];
  if (!win) return;
  if (win.el.style.width === '100%') {
    win.el.style.width = win._prevW || '520px';
    win.el.style.height = win._prevH || '380px';
    win.el.style.left = win._prevL || '60px';
    win.el.style.top = win._prevT || '40px';
  } else {
    win._prevW = win.el.style.width;
    win._prevH = win.el.style.height;
    win._prevL = win.el.style.left;
    win._prevT = win.el.style.top;
    win.el.style.width = '100%';
    win.el.style.height = '100%';
    win.el.style.left = '0';
    win.el.style.top = '0';
  }
}

export function restoreWindow(id) {
  const win = openWindows[id];
  if (!win) return;
  win.minimized = false;
  win.el.classList.remove('minimized');
  focusWindow(id);
}

function makeDraggable(win, handle) {
  let isDragging = false, startX, startY, origX, origY;
  handle.addEventListener('mousedown', (e) => {
    if (e.target.closest('.window-dots')) return;
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    origX = parseInt(win.style.left) || 0;
    origY = parseInt(win.style.top) || 0;
    win.style.cursor = 'grabbing';
    e.preventDefault();
  });
  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    win.style.left = (origX + e.clientX - startX) + 'px';
    win.style.top = (origY + e.clientY - startY) + 'px';
  });
  document.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      win.style.cursor = '';
    }
  });
}

export function getOpenWindows() {
  return Object.entries(openWindows).map(([id, w]) => ({
    id, title: w.title, minimized: w.minimized, appId: w.appId,
    isActive: w.el.classList.contains('active'),
  }));
}

export function closeAllWindows() {
  Object.keys(openWindows).forEach(id => closeWindow(id));
}
