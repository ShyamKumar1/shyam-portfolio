/* =============================================================================
   SPA ROUTER — Hash-based routing with page transitions
   ============================================================================= */

class Router {
  constructor() {
    this.routes = {};
    this.currentPage = null;
    this.isTransitioning = false;
    this.pendingHash = null;
    this.init();
  }

  register(name, renderFn) {
    this.routes[name] = renderFn;
  }

  init() {
    window.addEventListener('hashchange', () => this.queueNavigate());
    
    // Start with home
    if (!window.location.hash || window.location.hash === '#') {
      history.replaceState(null, '', '#home');
    }
    
    // Initial render without transition
    this.renderPage(window.location.hash.slice(1) || 'home', false);
  }

  queueNavigate() {
    const hash = window.location.hash.slice(1) || 'home';
    if (this.isTransitioning) {
      this.pendingHash = hash;
      return;
    }
    this.renderPage(hash, true);
  }

  renderPage(hash, animate = true) {
    const renderFn = this.routes[hash];
    if (!renderFn) {
      window.location.hash = '#home';
      return;
    }

    this.isTransitioning = true;
    this.pendingHash = null;
    const app = document.getElementById('app');
    const transition = document.getElementById('page-transition');
    const navbar = document.getElementById('navbar');

    if (animate) {
      // Page transition out
      transition.className = 'page-transition active';
      transition.style.transform = 'scaleY(1)';
      transition.style.opacity = '1';
    }

    setTimeout(() => {
      // Render new content
      app.innerHTML = '';
      renderFn(app);

      // Update navigation
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.dataset.route === hash);
      });

      // Show/hide navbar
      if (hash === 'home') {
        navbar?.classList.remove('visible');
      } else {
        navbar?.classList.add('visible');
      }

      if (animate) {
        // Page transition in
        transition.style.transform = 'scaleY(0)';
        setTimeout(() => {
          transition.style.opacity = '0';
          this.isTransitioning = false;
          
          // Process any pending navigation
          if (this.pendingHash && this.pendingHash !== hash) {
            const pending = this.pendingHash;
            this.pendingHash = null;
            this.renderPage(pending, true);
          }
        }, 400);
      } else {
        transition.style.opacity = '0';
        transition.style.transform = 'scaleY(0)';
        this.isTransitioning = false;
      }

      // Reinitialize scroll animations
      this.initScrollAnimations();
      this.currentPage = hash;
    }, animate ? 400 : 50);
  }

  initScrollAnimations() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.fade-in, .timeline-item').forEach(el => {
      if (!el.classList.contains('visible')) {
        observer.observe(el);
      }
    });
  }
}

export const router = new Router();
