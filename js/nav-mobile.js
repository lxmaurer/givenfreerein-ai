/**
 * nav-mobile.js — Injects a hamburger toggle button into the site nav and
 * handles open/close on mobile viewports. Works alongside the mobile CSS in
 * article-template-v2.css (the button is hidden on desktop via CSS).
 */

(function () {
  function init() {
    // Only target the header navbar (the first .site-header .navbar)
    var header = document.querySelector('header.site-header');
    if (!header) return;
    var navbar = header.querySelector('.navbar');
    var navMenu = header.querySelector('.nav-menu');
    if (!navbar || !navMenu) return;

    // Prevent duplicate hamburger
    if (navbar.querySelector('.nav-toggle')) return;

    // Create the hamburger button
    var toggle = document.createElement('button');
    toggle.className = 'nav-toggle';
    toggle.setAttribute('aria-label', 'Toggle navigation menu');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.innerHTML = '<span></span><span></span><span></span>';

    // Insert before the nav-menu list
    navbar.insertBefore(toggle, navMenu);

    // Toggle open/close
    toggle.addEventListener('click', function () {
      var isOpen = navMenu.classList.toggle('nav-open');
      toggle.classList.toggle('is-open', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu when a nav link is clicked
    var links = navMenu.querySelectorAll('a');
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener('click', function () {
        navMenu.classList.remove('nav-open');
        toggle.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
