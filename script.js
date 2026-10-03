 // =====================
// PAGE LOADER
// =====================
(function() {
  const loader = document.getElementById('loader');

  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hide');
    }, 1400);
  });
})();

// =====================
// NAV ACTIVE STATE ON SCROLL
// =====================
const sections = document.querySelectorAll('section[id], header[id]');
const navLinks = document.querySelectorAll('nav ul a');

window.addEventListener('scroll', () => {
  let current = '';
  const scrollY = window.scrollY;

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.offsetHeight;
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});

// =====================
// SCROLL ANIMATION
// =====================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeUp 0.6s ease both';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(
  '.project-card, .contact-card, .about-text, .avatar-box, .skill'
).forEach(el => observer.observe(el));

// =====================
// CONSOLE SIGNATURE
// =====================
console.log(
  '%c[aftour] system loaded ✓',
  'color:#ffd60a; font-family:monospace; font-size:14px;'
);
