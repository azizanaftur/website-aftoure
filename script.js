/* =========================================================
   PARTICLES
========================================================= */
(function spawnParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  // Motes (dust naik)
  for (let i = 0; i < 30; i++) {
    const mote = document.createElement('div');
    mote.className = 'mote';

    mote.style.left = Math.random() * 100 + 'vw';
    mote.style.top = (55 + Math.random() * 45) + 'vh';

    const duration = 12 + Math.random() * 14;
    const delay = Math.random() * duration;
    const dx = (Math.random() * 80 - 40) + 'px';

    mote.style.setProperty('--duration', duration + 's');
    mote.style.setProperty('--delay', delay + 's');
    mote.style.setProperty('--dx', dx);

    const size = 1.5 + Math.random() * 2;
    mote.style.width = size + 'px';
    mote.style.height = size + 'px';

    container.appendChild(mote);
  }

  // Dust (turun)
  for (let i = 0; i < 25; i++) {
    const dust = document.createElement('div');
    dust.className = 'dust';

    dust.style.left = Math.random() * 100 + 'vw';

    const duration = 18 + Math.random() * 20;
    const delay = Math.random() * duration;
    const dx = (Math.random() * 200 - 100) + 'px';

    dust.style.setProperty('--duration', duration + 's');
    dust.style.setProperty('--delay', delay + 's');
    dust.style.setProperty('--dx', dx);

    container.appendChild(dust);
  }
})();

/* =========================================================
   PAGE TRANSITION
========================================================= */
const veilOverlay = document.getElementById('veilOverlay');
let transitioning = false;

function spawnTransitionEffect() {
  if (!veilOverlay) return;

  veilOverlay
    .querySelectorAll('.flake, .spark, .ring')
    .forEach(el => el.remove());

  // Falling flakes
  for (let i = 0; i < 40; i++) {
    const flake = document.createElement('div');
    flake.className = 'flake';

    const size = 2 + Math.random() * 4;
    flake.style.width = size + 'px';
    flake.style.height = size + 'px';
    flake.style.left = Math.random() * 100 + 'vw';

    const midX = (Math.random() * 100 - 50) + 'px';
    const endX = (Math.random() * 200 - 100) + 'px';
    const duration = 0.9 + Math.random() * 0.6;
    const delay = Math.random() * 0.4;

    flake.style.setProperty('--mid-x', midX);
    flake.style.setProperty('--end-x', endX);
    flake.style.setProperty('--duration', duration + 's');
    flake.style.setProperty('--delay', delay + 's');

    veilOverlay.appendChild(flake);
  }

  // Rising sparks
  for (let i = 0; i < 18; i++) {
    const spark = document.createElement('div');
    spark.className = 'spark';

    const size = 3 + Math.random() * 4;
    spark.style.width = size + 'px';
    spark.style.height = size + 'px';
    spark.style.left = Math.random() * 100 + 'vw';
    spark.style.top = (70 + Math.random() * 30) + 'vh';

    const drift = (Math.random() * 80 - 40) + 'px';
    const duration = 1 + Math.random() * 0.5;
    const delay = Math.random() * 0.5;

    spark.style.setProperty('--drift', drift);
    spark.style.setProperty('--duration', duration + 's');
    spark.style.setProperty('--delay', delay + 's');

    veilOverlay.appendChild(spark);
  }

  // Rings
  for (let i = 0; i < 3; i++) {
    const ring = document.createElement('div');
    ring.className = 'ring';

    const size = 300 + i * 250;
    ring.style.width = size + 'px';
    ring.style.height = size + 'px';
    ring.style.animationDelay = (i * 0.15) + 's';

    veilOverlay.appendChild(ring);
  }
}

function changePage(page) {
  if (transitioning) return;
  if (!document.getElementById(page)) return;

  transitioning = true;

  spawnTransitionEffect();
  veilOverlay.classList.add('active');

  setTimeout(() => {
    document.querySelectorAll('.page').forEach(section => {
      section.classList.remove('active');
    });

    const target = document.getElementById(page);
    if (target) target.classList.add('active');

    document.querySelectorAll('nav a').forEach(link => {
      link.classList.toggle('active', link.dataset.page === page);
    });

    window.scrollTo({ top: 0, behavior: 'instant' });

    animateMeters();
  }, 600);

  setTimeout(() => {
    veilOverlay.classList.remove('active');
    setTimeout(() => { transitioning = false; }, 300);
  }, 1400);
}

/* =========================================================
   NAVIGATION
========================================================= */
document.querySelectorAll('[data-page]').forEach(el => {
  el.addEventListener('click', event => {
    event.preventDefault();
    changePage(el.dataset.page);
  });
});

/* =========================================================
   METER ANIMATION
========================================================= */
function animateMeters() {
  document.querySelectorAll('.skill-meter-fill').forEach(fill => {
    fill.style.width = '0%';
    const target = fill.dataset.width || '0%';
    setTimeout(() => {
      fill.style.width = target;
    }, 320);
  });
}

/* =========================================================
   KEYBOARD NAVIGATION
========================================================= */
document.addEventListener('keydown', event => {
  const keys = {
    '1': 'home',
    '2': 'about',
    '3': 'skill',
    '4': 'works',
    '5': 'notes',
    '6': 'contact'
  };
  if (keys[event.key]) changePage(keys[event.key]);
});

/* =========================================================
   MOUSE PARALLAX
========================================================= */
let mouseX = 0, mouseY = 0;

document.addEventListener('mousemove', event => {
  mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
  mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
});

function parallaxLoop() {
  const motes = document.querySelectorAll('.mote');
  motes.forEach((mote, index) => {
    if (index % 3 === 0) {
      const depth = 0.5 + (index % 5) * 0.1;
      mote.style.marginLeft = (mouseX * 10 * depth) + 'px';
      mote.style.marginTop = (mouseY * 10 * depth) + 'px';
    }
  });
  requestAnimationFrame(parallaxLoop);
}
parallaxLoop();

/* =========================================================
   CARD HOVER TILT
========================================================= */
document.querySelectorAll('.work, .skill-item').forEach(card => {
  card.addEventListener('mousemove', event => {
    const rect = card.getBoundingClientRect();
    if (rect.width < 300) return;

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -1.5;
    const rotateY = ((x - centerX) / centerX) * 1.5;

    card.style.transform =
      `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* =========================================================
   INITIAL
========================================================= */
window.addEventListener('load', () => {
  setTimeout(animateMeters, 700);
});

/* =========================================================
   AMBIENT PULSE
========================================================= */
setInterval(() => {
  const light = document.querySelector('.horizon-glow');
  if (!light) return;
  light.style.opacity = (0.5 + Math.random() * 0.5).toFixed(2);
}, 5000);
