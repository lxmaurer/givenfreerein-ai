
console.log('homepage-stories loaded');
// homepage-stories.js
// Replaces homepage related stories with 3 random articles (excluding featured)

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

document.addEventListener('DOMContentLoaded', function () {
  const section = document.getElementById('homepage-stories-section');
  const grid = document.getElementById('homepage-stories-grid');
  if (!section || !grid) return;

  fetch('./content/articles.json')
    .then(res => res.json())
    .then(data => {
      const articles = data.articles;
      if (!Array.isArray(articles)) return;
      // Find featured (latest published_date)
      let featured = articles.reduce((latest, art) => {
        return (!latest || new Date(art.published_date) > new Date(latest.published_date)) ? art : latest;
      }, null);
      // Exclude featured
      let pool = articles.filter(a => a !== featured);
      shuffle(pool);
      let picks = pool.slice(0, 3);
      grid.innerHTML = picks.map(article => `
        <div class="article-v2-related-card">
          <img class="article-v2-related-thumb" src="${article.hero_image}" alt="${article.hero_alt || ''}">
          <div class="article-v2-related-tag">${article.category || ''}</div>
          <h3><a href="${article.local_file}">${article.title}</a></h3>
          <p>${article.excerpt || ''}</p>
        </div>
      `).join('');
    });
});
