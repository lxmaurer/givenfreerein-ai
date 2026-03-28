// js/related-reading.js
// Dynamically replaces Related Reading links in article pages

(function() {
  // Utility: shuffle array in place
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Get current article filename (without query/hash)
  function getCurrentFilename() {
    const path = window.location.pathname;
    return path.substring(path.lastIndexOf('/') + 1);
  }

  // Find all links in the article body
  function getAllBodyLinks() {
    return Array.from(document.querySelectorAll('.article-v2-content a')).map(a => a.getAttribute('href'));
  }

  // Main logic
  document.addEventListener('DOMContentLoaded', function() {
    const heading = document.getElementById('related-reading-heading');
    const list = document.getElementById('related-reading-list');
    if (!heading || !list) return;

    fetch('content/articles.json')
      .then(res => res.json())
      .then(articles => {
        const filename = getCurrentFilename();
        const current = articles.find(a => a.local_file === filename);
        if (!current) return;
        const currentCategory = current.category;
        const bodyLinks = getAllBodyLinks();

        // Exclude current article
        let candidates = articles.filter(a => a.local_file !== filename);

        // Prefer cross-category
        let crossCategory = candidates.filter(a => a.category !== currentCategory);
        let sameCategory = candidates.filter(a => a.category === currentCategory && !bodyLinks.includes(a.local_file));

        // Fallback: if not enough cross-category, fill from same category
        let picks = shuffle(crossCategory).slice(0, 3);
        if (picks.length < 3) {
          const needed = 3 - picks.length;
          picks = picks.concat(shuffle(sameCategory).slice(0, needed));
        }
        // Still not enough? Fill with any remaining
        if (picks.length < 3) {
          const needed = 3 - picks.length;
          const leftovers = candidates.filter(a => !picks.includes(a));
          picks = picks.concat(shuffle(leftovers).slice(0, needed));
        }
        picks = picks.slice(0, 3);

        // Build HTML
        list.innerHTML = '';
        picks.forEach(a => {
          const li = document.createElement('li');
          const link = document.createElement('a');
          link.href = a.local_file;
          link.textContent = a.title;
          li.appendChild(link);
          list.appendChild(li);
        });
      });
  });
})();
