/* =============================================================================
   SPA ROUTER — Hash-based routing with page transitions
   ============================================================================= */

class Router {
  constructor() {
    this.routes = {};
    this.currentPage = null;
    this.isTransitioning = false;
    this.init();
  }

  register(name, renderFn) {
    this.routes[name] = renderFn;
  }

  init() {
    window.addEventListener('hashchange', () => this.navigate());
    // If no hash, set home
    if (!window.location.hash || window.location.hash === '#') {
      window.location.hash = '#home';
    } else {
      this.navigate();
    }
  }

  async navigate() {
    if (this.isTransitioning) return;

    const hash = window.location.hash.slice(1) || 'home';
    const renderFn = this.routes[hash];

    if (!renderFn) {
      window.location.hash = '#home';
      return;
    }

    this.isTransitioning = true;

    // Page transition out
    const transition = document.getElementById('page-transition');
    transition.className = 'page-transition active';

    await this.sleep(400);

    // Render new page
    const app = document.getElementById('app');
    app.innerHTML = '';
    renderFn(app);

    // Update nav
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('active', link.dataset.route === hash);
    });

    // Show navbar on non-home pages
    const navbar = document.getElementById('navbar');
    if (hash === 'home') {
      navbar.classList.remove('visible');
    } else {
      navbar.classList.add('visible');
    }

    // Page transition in
    transition.className = 'page-transition out';

    await this.sleep(400);
    transition.className = 'page-transition';

    this.currentPage = hash;
    this.isTransitioning = false;

    // Trigger scroll animations
    this.initScrollAnimations();
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
      observer.observe(el);
    });
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const router = new Router();
