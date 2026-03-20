document.addEventListener("DOMContentLoaded", function () {
  const article = document.querySelector(".article-v2-content");
  if (!article || !window.articleLinkMap) return;

  const MAX_TOTAL_LINKS = 10;
  const MAX_LINKS_PER_URL = 1;
  const MAX_LINKS_PER_PHRASE = 1;
  const MAX_LINKS_PER_TEXT_NODE = 1;

  const skipTags = ["A", "SCRIPT", "STYLE", "H1", "H2", "H3", "H4", "H5", "H6"];
  const skipContainers = [
    ".article-v2-related",
    ".article-v2-sidebar",
    ".article-v2-related-reading",
    "nav",
    "footer"
  ];

  const entries = Object.keys(window.articleLinkMap)
    .sort((a, b) => b.length - a.length)
    .map((phrase) => ({ phrase, url: window.articleLinkMap[phrase] }));

  const linksByPhrase = new Map();
  const linksByUrl = new Map();

  let totalLinks = 0;
  const currentPath = window.location.pathname.replace(/^\/+/, "");

  function canLinkToUrl(url) {
    const count = linksByUrl.get(url) || 0;
    return count < MAX_LINKS_PER_URL;
  }

  function recordLink(phrase, url) {
    linksByPhrase.set(phrase, (linksByPhrase.get(phrase) || 0) + 1);
    linksByUrl.set(url, (linksByUrl.get(url) || 0) + 1);
    totalLinks += 1;
  }

  function findBestMatch(text) {
    for (const entry of entries) {
      const phraseCount = linksByPhrase.get(entry.phrase) || 0;
      if (phraseCount >= MAX_LINKS_PER_PHRASE) continue;
      if (!entry.url) continue;

      const normalizedUrl = entry.url.replace(/^\/+/, "");
      if (normalizedUrl === currentPath) continue;
      if (!canLinkToUrl(entry.url)) continue;

      const escaped = entry.phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(`\\b${escaped}\\b`, "i");
      const match = regex.exec(text);
      if (match) {
        return { entry, match, regex };
      }
    }
    return null;
  }

  function processTextNode(node) {
    if (!node.parentNode) return;
    if (skipTags.includes(node.parentNode.nodeName)) return;
    if (node.parentElement && skipContainers.some((selector) => node.parentElement.closest(selector))) {
      return;
    }

    let currentNode = node;
    let linksInNode = 0;

    while (currentNode && totalLinks < MAX_TOTAL_LINKS && linksInNode < MAX_LINKS_PER_TEXT_NODE) {
      const text = currentNode.nodeValue;
      if (!text || !text.trim()) return;

      const result = findBestMatch(text);
      if (!result) return;

      const { entry, match } = result;
      const index = match.index;
      const matchedText = match[0];

      if (index < 0) return;

      const before = text.slice(0, index);
      const after = text.slice(index + matchedText.length);

      const fragment = document.createDocumentFragment();
      if (before) fragment.appendChild(document.createTextNode(before));

      const link = document.createElement("a");
      link.href = entry.url;
      link.textContent = matchedText;
      fragment.appendChild(link);

      let afterNode = null;
      if (after) {
        afterNode = document.createTextNode(after);
        fragment.appendChild(afterNode);
      }

      currentNode.parentNode.replaceChild(fragment, currentNode);
      recordLink(entry.phrase, entry.url);
      linksInNode += 1;
      currentNode = afterNode;
    }
  }

  function walk(node) {
    if (totalLinks >= MAX_TOTAL_LINKS) return;

    if (node.nodeType === Node.TEXT_NODE) {
      processTextNode(node);
      return;
    }

    if (node.nodeType === Node.ELEMENT_NODE && !skipTags.includes(node.nodeName)) {
      const children = Array.from(node.childNodes);
      for (const child of children) {
        walk(child);
        if (totalLinks >= MAX_TOTAL_LINKS) break;
      }
    }
  }

  walk(article);
});
