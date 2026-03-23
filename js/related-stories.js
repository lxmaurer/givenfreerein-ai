/**
 * related-stories.js
 * Dynamically populates the Related Stories section on each article page
 * with up to 3 articles from the same category, sorted newest-first.
 * Data source: content/articles.json
 */
(function () {
  var section  = document.getElementById('related-stories-section');
  var heading  = document.getElementById('related-stories-heading');
  var grid     = document.getElementById('related-stories-grid');

  if (!section || !heading || !grid) return;

  // Derive the page filename (e.g. "article-comanche.html")
  var pageName = window.location.pathname.split('/').pop() || '';
  if (!pageName) return;

  // Heading label per category
  var headingMap = {
    'Cultures':      'More Culture Stories',
    'Breeds':        'More Breed Stories',
    'Destinations':  'More Destination Stories',
    'Craftsmanship': 'More Craftsmanship Stories',
  };

  fetch('content/articles.json')
    .then(function (res) { return res.json(); })
    .then(function (data) {
      var articles = data.articles || [];

      // Find the current article by filename match
      var current = articles.find(function (a) { return a.local_file === pageName; });
      if (!current) return; // Not in articles.json — leave hardcoded content alone

      var category = current.category;

      // Filter: same category, not the current article
      var related = articles.filter(function (a) {
        return a.category === category && a.local_file !== pageName;
      });

      // Hide section if nothing to show
      if (related.length === 0) {
        section.style.display = 'none';
        return;
      }

      // Sort newest-first
      related.sort(function (a, b) {
        return b.published_date.localeCompare(a.published_date);
      });

      // Take up to 3
      related = related.slice(0, 3);

      // Update heading
      heading.textContent = headingMap[category] || ('More ' + category + ' Stories');

      // Render cards
      grid.innerHTML = related.map(function (a) {
        return '<div class="article-v2-related-card">' +
          '<img class="article-v2-related-thumb" src="' + a.hero_image + '" alt="' + a.hero_alt + '">' +
          '<div class="article-v2-related-tag">' + a.category + '</div>' +
          '<h3><a href="' + a.local_file + '">' + a.title + '</a></h3>' +
          '<p>' + a.excerpt + '</p>' +
          '</div>';
      }).join('');
    })
    .catch(function () {
      // Fail silently — fallback hardcoded content remains visible
    });
}());
