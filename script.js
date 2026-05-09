/* =============================================
   PARTICLES CANVAS
   ============================================= */
(function initParticles() {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, particles;
  const COUNT = 60;

  function resize() {
    w = canvas.width = canvas.offsetWidth;
    h = canvas.height = canvas.offsetHeight;
  }

  function mkParticle() {
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.5 + 0.3,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.5 + 0.1,
    };
  }

  function init() {
    resize();
    particles = Array.from({ length: COUNT }, mkParticle);
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(129, 140, 248, ${p.alpha})`;
      ctx.fill();

      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0 || p.x > w) p.dx *= -1;
      if (p.y < 0 || p.y > h) p.dy *= -1;
    });

    // draw lines between nearby particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(99, 102, 241, ${0.12 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => { resize(); });
  init();
  draw();
})();

/* =============================================
   TYPING EFFECT
   ============================================= */
(function initTyping() {
  const el = document.getElementById('typing-text');
  if (!el) return;
  const words = ['Software Developer', 'Frontend Engineer', 'Backend Developer', 'Full-Stack Dev'];
  let wi = 0, ci = 0, deleting = false;

  function tick() {
    const word = words[wi];
    if (!deleting) {
      el.textContent = word.slice(0, ci + 1);
      ci++;
      if (ci === word.length) {
        deleting = true;
        setTimeout(tick, 1800);
        return;
      }
    } else {
      el.textContent = word.slice(0, ci - 1);
      ci--;
      if (ci === 0) {
        deleting = false;
        wi = (wi + 1) % words.length;
      }
    }
    setTimeout(tick, deleting ? 55 : 100);
  }
  setTimeout(tick, 800);
})();

/* =============================================
   MOUSE PARALLAX on HERO GLOWS
   ============================================= */
(function initParallax() {
  const glow1 = document.querySelector('.hero__glow--1');
  const glow2 = document.querySelector('.hero__glow--2');
  if (!glow1 || !glow2) return;

  document.addEventListener('mousemove', e => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;
    glow1.style.transform = `translate(${dx * 30}px, ${dy * 20}px)`;
    glow2.style.transform = `translate(${-dx * 20}px, ${-dy * 15}px)`;
  });
})();

/* =============================================
   SCROLL-REVEAL with STAGGER
   ============================================= */
(function initReveal() {
  const items = document.querySelectorAll('[data-reveal]');
  if (!items.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.dataset.delay || 0;
        setTimeout(() => el.classList.add('revealed'), delay);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.12 });

  items.forEach(el => observer.observe(el));
})();

/* =============================================
   NAV: active link on scroll + shrink on scroll
   ============================================= */
(function initNav() {
  const nav = document.querySelector('.nav');
  const links = document.querySelectorAll('.nav__links a');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // shrink nav
    if (window.scrollY > 60) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }

    // active link
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    links.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  });
})();

/* =============================================
   CURSOR SPOTLIGHT (subtle glow following cursor)
   ============================================= */
(function initSpotlight() {
  const spotlight = document.createElement('div');
  spotlight.className = 'cursor-spotlight';
  document.body.appendChild(spotlight);

  document.addEventListener('mousemove', e => {
    spotlight.style.left = e.clientX + 'px';
    spotlight.style.top = e.clientY + 'px';
  });
})();

/* =============================================
   SKILL BAR FILL on scroll
   ============================================= */
(function initSkillBars() {
  const bars = document.querySelectorAll('.skill-bar__fill');
  if (!bars.length) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.width = e.target.dataset.width;
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  bars.forEach(b => observer.observe(b));
})();
