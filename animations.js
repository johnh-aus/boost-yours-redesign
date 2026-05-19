(function () {
  'use strict';

  var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Hero parallax ── */
  var parallaxBgs = document.querySelectorAll('.detail-hero-bg, .cs-hero-bg');
  if (parallaxBgs.length && !REDUCED) {
    window.addEventListener('scroll', function () {
      var y = window.scrollY;
      parallaxBgs.forEach(function (el) {
        el.style.transform = 'translateY(' + (y * 0.28) + 'px)';
      });
    }, { passive: true });
  }

  if (REDUCED) {
    document.querySelectorAll('.anim-el').forEach(function (el) {
      el.classList.add('is-visible');
    });
    return;
  }

  /* ── Stagger groups ── */
  var STAGGER = [
    '.system-steps',
    '.results-numbers',
    '.cs-grid',
    '.overview-grid',
    '.related-grid',
    '.cs-stats-row',
    '.text-center',
    '.ba-stat-list',
    '.challenge-inner',
    '.about-inner',
    '.quote-inner',
  ];

  STAGGER.forEach(function (sel) {
    document.querySelectorAll(sel).forEach(function (group) {
      if (group.closest('.site-nav') || group.closest('.site-footer')) return;
      Array.from(group.children).forEach(function (child, i) {
        if (!child.classList.contains('anim-el')) {
          child.classList.add('anim-el');
        }
        child.style.transitionDelay = Math.min(i * 0.1, 0.45) + 's';
      });
    });
  });

  /* ── Solo elements ── */
  var SOLO = [
    'h1',
    '.detail-result-big',
    '.detail-hero-sub',
    '.cs-hero-sub',
    '.ba-container',
    '.cs-eyebrow',
    '.detail-tag',
    '.detail-breadcrumb',
  ];

  SOLO.forEach(function (sel) {
    document.querySelectorAll(sel).forEach(function (el) {
      if (
        el.closest('.site-nav') ||
        el.closest('.site-footer') ||
        el.classList.contains('anim-el')
      ) return;
      el.classList.add('anim-el');
    });
  });

  /* ── Observer ── */
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.anim-el').forEach(function (el) {
      el.classList.add('is-visible');
    });
    return;
  }

  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.07, rootMargin: '0px 0px -24px 0px' });

  document.querySelectorAll('.anim-el').forEach(function (el) {
    obs.observe(el);
  });

})();
