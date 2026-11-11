/* Global behaviour: header, menu, reveal, config-driven links. ~2 KB, no dependencies. */
(function () {
  var d = document, C = window.COLLEGE || {};
  d.documentElement.classList.remove('no-js');

  // Header turns solid on scroll
  var header = d.querySelector('.site-header');
  function onScroll() { header.classList.toggle('is-solid', window.scrollY > 40); }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile menu
  var toggle = d.querySelector('.nav-toggle'), nav = d.getElementById('site-nav');
  function setMenu(open) {
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open);
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    d.body.classList.toggle('nav-open', open);
    header.classList.toggle('menu-open', open);
  }
  toggle.addEventListener('click', function () { setMenu(!nav.classList.contains('open')); });
  d.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      setMenu(false);
      d.querySelectorAll('.has-sub.sub-open').forEach(function (li) { li.classList.remove('sub-open'); li.firstElementChild.setAttribute('aria-expanded', 'false'); });
    }
  });

  // Dropdowns (click for touch, hover/focus handled by CSS on desktop)
  d.querySelectorAll('.has-sub > button').forEach(function (b) {
    b.addEventListener('click', function (e) {
      e.stopPropagation();
      var li = b.parentNode, open = !li.classList.contains('sub-open');
      d.querySelectorAll('.has-sub.sub-open').forEach(function (o) { o.classList.remove('sub-open'); o.firstElementChild.setAttribute('aria-expanded', 'false'); });
      li.classList.toggle('sub-open', open);
      b.setAttribute('aria-expanded', open);
    });
  });
  d.addEventListener('click', function (e) {
    if (!e.target.closest('.has-sub')) d.querySelectorAll('.has-sub.sub-open').forEach(function (o) { o.classList.remove('sub-open'); o.firstElementChild.setAttribute('aria-expanded', 'false'); });
  });
  nav.addEventListener('click', function (e) { if (e.target.closest('a') && nav.classList.contains('open')) setMenu(false); });
  window.addEventListener('resize', function () { if (window.innerWidth > 980) setMenu(false); });

  // Scroll reveal
  var items = d.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    items.forEach(function (el) { io.observe(el); });
  } else { items.forEach(function (el) { el.classList.add('in'); }); }

  // Year
  d.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  // Official links from config.js (admit card / result)
  d.querySelectorAll('[data-link]').forEach(function (a) {
    var url = C[a.getAttribute('data-link')];
    if (url) { a.href = url; a.target = '_blank'; a.rel = 'noopener'; }
    else { a.removeAttribute('href'); a.setAttribute('aria-disabled', 'true'); a.textContent = 'Link will be updated soon'; }
  });

  // WhatsApp floating button
  var num = (C.whatsappNumber || '').replace(/\D/g, '');
  var fab = d.querySelector('.wa-fab');
  if (fab && num) {
    fab.href = 'https://wa.me/' + num + '?text=' + encodeURIComponent('Hello, I would like to know more about ' + (C.name || 'the college') + '.');
    fab.classList.add('show');
  }

  // Demo notice
  if (C.showDemoNotice) {
    var p = d.createElement('div');
    p.className = 'demo-pill';
    p.innerHTML = '<span>Demo site: sample content</span><button type="button" aria-label="Dismiss notice">&times;</button>';
    p.querySelector('button').onclick = function () { p.remove(); };
    d.body.appendChild(p);
  }
})();
