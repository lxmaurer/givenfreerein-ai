// Keyword database for internal linking.
// Each entry defines one destination URL and the phrases that should link to it.
window.articleKeywordDatabase = [
  {
    url: "article-andalusian.html",
    keywords: [
      "Andalusian",
      "Andalusian horse",
      "PRE horse",
      "Pura Raza Espanola"
    ]
  },
  {
    url: "article-camargue.html",
    keywords: [
      "Camargue",
      "Camargue horse",
      "horses of the Camargue",
      "Gardian"
    ]
  },
  {
    url: "article-comanche.html",
    keywords: [
      "Comanche",
      "Comanche horse nation",
      "Southern Plains horse culture"
    ]
  },
  {
    url: "article-escaramuza.html",
    keywords: [
      "Escaramuza",
      "Mexican escaramuza",
      "women charra riders"
    ]
  },
  {
    url: "article-the-side-saddle.html",
    keywords: [
      "side saddle",
      "side-saddle",
      "riding aside"
    ]
  },
  {
    url: "article-spanish-saddle.html",
    keywords: [
      "Spanish saddle",
      "Silla Vaquera",
      "doma vaquera saddle",
      "Spanish tack"
    ]
  },
  {
    url: "article-soul-of-spain-part-1.html",
    keywords: [
      "Soul of Spain Part I",
      "Bloodlines of Empire",
      "Iberian horse origins"
    ]
  },
  {
    url: "article-soul-of-spain-part-2.html",
    keywords: [
      "Soul of Spain Part II",
      "The Vaquero",
      "Spanish vaquero",
      "vaquero tradition"
    ]
  },
  {
    url: "article-fell-pony.html",
    keywords: [
      "Fell Pony",
      "The Fell Pony",
      "Cumbrian pony"
    ]
  },
  {
    url: "article-my-search-for-the-fell-pony.html",
    keywords: [
      "Search for the Fell Pony",
      "my search for the fell pony"
    ]
  },
  {
    url: "article-falabella.html",
    keywords: [
      "Falabella",
      "Falabella horse",
      "Argentine miniature horse"
    ]
  },
  {
    url: "article-marwari.html",
    keywords: [
      "Marwari",
      "Marwari horse",
      "curved ears horse"
    ]
  },
  {
    url: "article-pushkar.html",
    keywords: [
      "Pushkar",
      "Pushkar Fair",
      "Pushkar Camel Fair"
    ]
  },
  {
    url: "article-tbourida.html",
    keywords: [
      "Tbourida",
      "fantasia",
      "Moroccan fantasia",
      "powder game"
    ]
  },
  {
    url: "article-sandalwood-pony.html",
    keywords: [
      "Sandalwood pony",
      "Sandalwood Pony of Sumba",
      "Sumba pony"
    ]
  },
  {
    url: "article-sumba.html",
    keywords: [
      "Sumba",
      "Pasola",
      "horses of Sumba"
    ]
  },
  {
    url: "article-spirit-horses-of-yakutia.html",
    keywords: [
      "Yakutia",
      "Yakut horse",
      "Spirit Horses of Yakutia"
    ]
  },
  {
    url: "article-australian-stock-horse.html",
    keywords: [
      "Australian Stock Horse",
      "stock horse",
      "Waler lineage"
    ]
  },
  {
    url: "article-return-of-the-horse.html",
    keywords: [
      "return of the horse",
      "rewilding with horses",
      "horse rewilding"
    ]
  },
  {
    url: "article-billy-barge-horse.html",
    keywords: [
      "Billy Barge",
      "Billy Barge horse",
      "Australian horseman"
    ]
  },
  {
    url: "article-bloodlines-borders.html",
    keywords: [
      "bloodlines and borders",
      "bloodlines borders"
    ]
  }
];

// Backwards-compatible flat map consumed by auto-link-articles.js.
window.articleLinkMap = window.articleKeywordDatabase.reduce((map, entry) => {
  for (const keyword of entry.keywords) {
    map[keyword] = entry.url;
  }
  return map;
}, {});