/* =============================================================================
   MAIN ENTRY POINT
   ============================================================================= */
import { router } from './router.js';
import { initMatrixRain, initScrollReveal } from './effects.js';
import { renderHome } from '../pages/home.js';
import { renderProjects } from '../pages/projects.js';
import { renderStack } from '../pages/stack.js';
import { renderTimeline } from '../pages/timeline.js';
import { renderAbout } from '../pages/about.js';

// Register all routes
router.register('home', renderHome);
router.register('projects', renderProjects);
router.register('stack', renderStack);
router.register('timeline', renderTimeline);
router.register('about', renderAbout);

// Init background effects
initMatrixRain();

// Navbar scroll behavior
let lastScrollY = 0;
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  const currentScrollY = window.scrollY;
  
  if (currentScrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  lastScrollY = currentScrollY;
});
