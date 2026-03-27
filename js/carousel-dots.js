(function () {
  function initCarouselDots(grid, cardSelector) {
    var cards = grid.querySelectorAll(cardSelector);
    if (cards.length < 2) return;

    var dotsEl = document.createElement('div');
    dotsEl.className = 'carousel-dots';
    for (var i = 0; i < cards.length; i++) {
      var dot = document.createElement('span');
      dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      dotsEl.appendChild(dot);
    }
    grid.parentNode.insertBefore(dotsEl, grid.nextSibling);

    var dots = dotsEl.querySelectorAll('.carousel-dot');
    grid.addEventListener('scroll', function () {
      var index = Math.round(grid.scrollLeft / grid.offsetWidth);
      dots.forEach(function (d, i) { d.classList.toggle('active', i === index); });
    }, { passive: true });
  }

  document.querySelectorAll('.article-v2-related-grid').forEach(function (grid) {
    initCarouselDots(grid, '.article-v2-related-card');
  });

  document.querySelectorAll('.explore-grid').forEach(function (grid) {
    initCarouselDots(grid, '.explore-card');
  });
})();
