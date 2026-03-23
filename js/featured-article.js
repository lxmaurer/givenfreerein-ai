/**
 * featured-article.js
 *
 * Automatically populates the homepage featured article block
 * from content/articles.json, picking the article with the most
 * recent published_date.
 *
 * To feature a new article: add it to content/articles.json with
 * today's date as published_date and it will automatically appear here.
 */
(function () {
  var el = document.getElementById('featured-article');
  if (!el) return;

  fetch('content/articles.json')
    .then(function (r) { return r.json(); })
    .then(function (data) {
      var articles = (data.articles || []).filter(function (a) {
        return a.published_date;
      });
      if (!articles.length) return;

      articles.sort(function (a, b) {
        return new Date(b.published_date) - new Date(a.published_date);
      });

      var art = articles[0];
      el.innerHTML =
        '<div style="font-family: \'Playfair Display\', Georgia, serif; font-size: 0.72rem; letter-spacing: 0.26em; text-transform: uppercase; color: #8b6f47; margin-bottom: 0.75rem;">Featured Story \u00b7 ' + art.category + '</div>' +
        '<h2 style="margin-top: 0;"><a href="' + art.local_file + '" style="color: inherit; text-decoration: none;">' + art.title + '</a></h2>' +
        '<figure class="article-v2-figure">' +
          '<img src="' + art.hero_image + '" alt="' + (art.hero_alt || '') + '">' +
          '<figcaption>' + art.excerpt + '</figcaption>' +
        '</figure>' +
        '<a href="' + art.local_file + '" class="btn-read" style="display: inline-block; margin-top: auto;">Read the Article &#8594;</a>';
    })
    .catch(function () {
      // silently keep the static fallback content already in the HTML
    });
})();
