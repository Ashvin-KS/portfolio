/* ════ script.js ════════════════════════════
   Ashvin K S — Portfolio Monograph
   Clean, premium transitions and interactions.
   ═══════════════════════════════════════════ */

// Nav: add shadow border on scroll
const nav = document.getElementById('nav');
const handleScroll = () => {
  if (nav) {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }
};
window.addEventListener('scroll', handleScroll, { passive: true });
handleScroll();


// Intersection Observer: scroll-reveal animation lines
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.05,
    rootMargin: '0px 0px -40px 0px'
  }
);
document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));


// Active Link Observer: highlight menu items in navigation on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const activeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          const targetId = link.getAttribute('href');
          const isTarget = targetId === '#' + entry.target.id;
          
          if (isTarget) {
            link.style.color = 'var(--accent)';
          } else {
            link.style.color = '';
          }
        });
      }
    });
  },
  {
    threshold: 0.25,
    rootMargin: '-20% 0px -50% 0px'
  }
);
sections.forEach(sec => activeObserver.observe(sec));


// Clipboard Copy Action: email copy trigger
const emailEl = document.getElementById('contactEmail');
if (emailEl) {
  emailEl.title = 'Copy email address to clipboard';
  
  emailEl.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText('ashvinksg@gmail.com');
      
      const originalText = emailEl.textContent;
      emailEl.textContent = '✓ copied to clipboard';
      emailEl.style.color = 'var(--accent)';
      
      setTimeout(() => {
        emailEl.textContent = originalText;
        emailEl.style.color = '';
      }, 2500);
    } catch (err) {
      window.location.href = 'mailto:ashvinksg@gmail.com';
    }
  });
}
