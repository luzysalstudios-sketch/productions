// Luz y Sal Productions: menú móvil, año del footer y fade-in al hacer scroll.
(function () {
  'use strict';

  var root = document.documentElement;
  root.classList.add('js');

  // Año del footer
  var year = document.querySelector('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());

  // Header con fondo al hacer scroll
  var header = document.querySelector('[data-header]');
  function onScroll() {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Menú móvil
  var toggle = document.querySelector('[data-menu-toggle]');
  var menu = document.getElementById('menu');

  function focusables() {
    return [toggle].concat(Array.prototype.slice.call(menu.querySelectorAll('a')));
  }

  function setMenu(open, returnFocus) {
    header.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = open ? 'Cerrar' : 'Menú';
    if (open) {
      menu.querySelector('a').focus();
    } else if (returnFocus) {
      toggle.focus();
    }
  }

  function isOpen() {
    return toggle.getAttribute('aria-expanded') === 'true';
  }

  if (toggle && menu && header) {
    toggle.addEventListener('click', function () {
      setMenu(!isOpen(), true);
    });

    menu.addEventListener('click', function (e) {
      if (e.target.closest('a') && isOpen()) setMenu(false, false);
    });

    document.addEventListener('keydown', function (e) {
      if (!isOpen()) return;
      if (e.key === 'Escape') {
        setMenu(false, true);
        return;
      }
      // Foco atrapado dentro del menú mientras está abierto
      if (e.key === 'Tab') {
        var items = focusables();
        var first = items[0];
        var last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });

    // Al pasar a escritorio el menú desplegable deja de existir
    window.matchMedia('(min-width: 900px)').addEventListener('change', function (mq) {
      if (mq.matches && isOpen()) setMenu(false, false);
    });
  }

  // Fade-in, una sola vez por elemento
  var items = document.querySelectorAll('.reveal');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduced || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });

  items.forEach(function (el) { io.observe(el); });
})();
