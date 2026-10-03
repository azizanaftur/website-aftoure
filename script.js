// =====================
// PAGE LOADER
// =====================
(function() {
  const loader = document.getElementById('loader');
  const loaderPage = document.getElementById('loaderPage');

  // Ambil nama halaman dari URL
  const path = window.location.pathname.split('/').pop() || 'index.html';
  const pageName = path.replace('.html', '') || 'home';
  if (loaderPage) loaderPage.textContent = pageName;

  // Sembunyikan loader setelah halaman siap
  window.addEventListener('load', () => {
    setTimeout(() => {
      if (loader) loader.classList.add('hide');
    }, 1400); // 1.4 detik
  });
})();

// =====================
// TRANSISI ANTAR HALAMAN
// =====================
document.querySelectorAll('a[href$=".html"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');

    // Skip kalau link eksternal atau anchor
    if (href.startsWith('http') || href.startsWith('#')) return;
    if (this.target === '_blank') return;

    e.preventDefault();
    const loader = document.getElementById('loader');
    if (loader) {
      loader.classList.remove('hide');
    }

    setTimeout(() => {
      window.location.href = href;
    }, 700);
  });
});

// =====================
// ANIMASI SCROLL (muncul saat masuk viewport)
// =====================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeUp 0.6s ease both';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.prev-card, .project-card, .contact-card, .about-text, .avatar-box')
  .forEach(el => observer.observe(el));

// =====================
// KURSOR BLINK (opsional)
// =====================
console.log('%c[aftour] system loaded ✓', 'color:#ffd60a; font-family:monospace; font-size:14px;');
