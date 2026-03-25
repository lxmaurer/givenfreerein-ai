/**
 * featured-story.js
 * Dynamically populates the featured story block and sidebar on all main pages.
 * Data source: content/articles.json
 *
 * Category mapping:
 *   index.html        → most recent article across all categories
 *   cultures.html     → most recent Cultures article
 *   breeds.html       → most recent Breeds article
 *   destinations.html → most recent Destinations article
 *   craftsmanship.html→ most recent Craftsmanship article
 *
 * Required IDs in HTML:
 *   #featured-block      — the featured-block div
 *   #featured-title      — the h2 element
 *   #featured-link       — the <a> inside the h2
 *   #featured-img        — the <img> inside the figure
 *   #featured-caption    — the <figcaption>
 *   #featured-read-link  — the "Read the Article →" btn-read link
 *   #featured-region     — the region span (or byline div on index)
 *   #latest-stories-list — the sidebar <ul>
 */
(function () {
  const categoryMap = {
    'index.html':         null,           // null = all categories
    'cultures.html':      'Cultures',
    'breeds.html':        'Breeds',
    'destinations.html':  'Destinations',
    'craftsmanship.html': 'Craftsmanship',
  };

  const pageName = window.location.pathname.split('/').pop() || 'index.html';
  if (!categoryMap.hasOwnProperty(pageName)) return;
  const category = categoryMap[pageName];

  // Reveal the featured block (with a fade) once the correct data has been populated.
  // The block starts at opacity:0 via CSS to prevent flash of stale hardcoded content.
  var featuredBlock = document.getElementById('featured-block');

  function revealFeaturedBlock() {
    if (featuredBlock) {
      featuredBlock.style.transition = 'opacity 0.4s ease';
      featuredBlock.style.opacity = '1';
    }
  }

  fetch('content/articles.json')
    .then(function (res) { return res.json(); })
    .then(function (data) {
      var articles = data.articles || [];

      // Filter by category when on a category page
      if (category !== null) {
        articles = articles.filter(function (a) { return a.category === category; });
      }

      // Sort newest-first by published_date (ISO string comparison works for YYYY-MM-DD)
      articles.sort(function (a, b) {
        return b.published_date.localeCompare(a.published_date);
      });

      if (articles.length === 0) return;

      var featured = articles[0];
      var sidebarItems = articles.slice(1, 4);

      // ── Featured title link ──────────────────────────────────────────────
      var titleLink = document.getElementById('featured-link');
      if (titleLink) {
        titleLink.textContent = featured.title;
        titleLink.href = featured.local_file;
      }

      // ── Hero image ───────────────────────────────────────────────────────
      var img = document.getElementById('featured-img');
      if (img) {
        img.src = featured.hero_image;
        img.alt = featured.hero_alt;
      }

      // ── Caption / excerpt ────────────────────────────────────────────────
      var caption = document.getElementById('featured-caption');
      if (caption) {
        caption.textContent = featured.excerpt;
        // Also populate the mobile-only excerpt <p> that sits after the figure
        var excerptP = document.getElementById('featured-excerpt') || document.createElement('p');
        excerptP.id = 'featured-excerpt';
        excerptP.textContent = featured.excerpt;
        if (!document.getElementById('featured-excerpt')) {
          var figureEl = caption.closest('figure');
          if (figureEl) {
            figureEl.insertAdjacentElement('afterend', excerptP);
          }
        }
      }

      // ── Read link ────────────────────────────────────────────────────────
      var readLink = document.getElementById('featured-read-link');
      if (readLink) {
        readLink.href = featured.local_file;
      }

      // ── Byline region ────────────────────────────────────────────────────
      // index.html uses a <div> with "Featured Story · Region" pattern
      // category pages use a <span> that shows just the region
      var regionEl = document.getElementById('featured-region');
      if (regionEl) {
        if (regionEl.tagName.toUpperCase() === 'DIV') {
          regionEl.textContent = 'Featured Story \u00b7 ' + featured.region;
        } else {
          regionEl.textContent = featured.region;
        }
      }

      // ── Sidebar latest stories list ──────────────────────────────────────
      var list = document.getElementById('latest-stories-list');
      if (list && sidebarItems.length > 0) {
        list.innerHTML = sidebarItems
          .map(function (a) {
            return '<li><a href="' + a.local_file + '">' + a.title + '</a></li>';
          })
          .join('');
      }

      revealFeaturedBlock();
    })
    .catch(function () {
      // Fail silently — reveal whatever hardcoded fallback content is in the HTML
      revealFeaturedBlock();
    });
}());
