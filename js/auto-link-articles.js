document.addEventListener("DOMContentLoaded", function () {


  const article = document.querySelector('.article-v2-content');
  if (!article || !window.articleLinkMap) return;

  const skipTags = ["A","SCRIPT","STYLE","H1","H2","H3","H4","H5","H6"];

  const phrases = Object.keys(window.articleLinkMap)
    .sort((a, b) => b.length - a.length);

  const linked = new Set();

  // Get the current page path (no leading slash)
  const currentPath = window.location.pathname.replace(/^\/+/, "");

  function processTextNode(node) {
    if (!node.parentNode) return;
    if (skipTags.includes(node.parentNode.nodeName)) return;

    let text = node.nodeValue;

    for (const phrase of phrases) {
      if (linked.has(phrase)) continue;

      const url = window.articleLinkMap[phrase];
      // Normalize both for comparison: remove leading slashes
      const normalizedUrl = (url || "").replace(/^\/+/, "");
      if (normalizedUrl === currentPath) continue; // skip self-link

      const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`\\b${escaped}\\b`, 'i');

      if (regex.test(text)) {
        const newHTML = text.replace(regex, (matched) => `<a href="${url}">${matched}</a>`);

        const span = document.createElement("span");
        span.innerHTML = newHTML;

        node.parentNode.replaceChild(span, node);

        linked.add(phrase);

        return;
      }
    }
  }

  function walk(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      processTextNode(node);
    }

    if (node.nodeType === Node.ELEMENT_NODE &&
        !skipTags.includes(node.nodeName)) {
      for (let child = node.firstChild; child; child = child.nextSibling) {
        walk(child);
      }
    }
  }

  walk(article);

});