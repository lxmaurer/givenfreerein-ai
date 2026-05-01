// Keyword database for internal linking.
// Each entry defines one destination URL and the phrases that should link to it.
window.articleKeywordDatabase = [
  {
    url: "content/source-articles/article-andalusian.html",
    keywords: [
      "Andalusian",
      "Andalusian horse",
      "PRE horse",
      "Pura Raza Espanola",
      "Iberian horse",
      "Spanish horse",
      "Spanish horses first escaped"
    ]
  },
  {
    url: "content/source-articles/article-camargue.html",
    keywords: [
      "Camargue",
      "Camargue horse",
      "horses of the Camargue",
      "Gardian",
      "white horses of the Camargue",
      "Rhone delta horses"
    ]
  },
  {
    url: "content/source-articles/article-comanche.html",
    keywords: [
      "Comanche",
      "Comanche horse nation",
      "Southern Plains horse culture",
      "Comanche horsemanship",
      "Plains horse culture"
    ]
  },
  {
    url: "content/source-articles/article-escaramuza.html",
    keywords: [
      "Escaramuza",
      "Mexican escaramuza",
      "women charra riders",
      "charra riders",
      "Mexican sidesaddle"
    ]
  },
  {
    url: "content/source-articles/article-the-side-saddle.html",
    keywords: [
      "side saddle",
      "side-saddle",
      "riding aside",
      "sidesaddle riding",
      "history of side saddle"
    ]
  },
  {
    url: "content/source-articles/article-spanish-saddle.html",
    keywords: [
      "Spanish saddle",
      "Silla Vaquera",
      "doma vaquera saddle",
      "Spanish tack",
      "vaquera saddle",
      "traditional Spanish saddle",
      "just a rope halter"
    ]
  },
  {
    url: "content/source-articles/article-soul-of-spain-part-1.html",
    keywords: [
      "Soul of Spain Part I",
      "Bloodlines of Empire",
      "Iberian horse origins",
      "history of the Iberian horse",
      "Part I Bloodlines of Empire"
    ]
  },
  {
    url: "content/source-articles/article-soul-of-spain-part-2.html",
    keywords: [
      "Soul of Spain Part II",
      "The Vaquero",
      "Spanish vaquero",
      "vaquero tradition",
      "Part II The Vaquero",
      "doma vaquera"
    ]
  },
  {
    url: "content/source-articles/article-fell-pony.html",
    keywords: [
      "Fell Pony",
      "The Fell Pony",
      "Cumbrian pony",
      "Fell ponies",
      "native pony of Cumbria"
    ]
  },
  {
    url: "content/source-articles/article-my-search-for-the-fell-pony.html",
    keywords: [
      "Search for the Fell Pony",
      "my search for the fell pony",
      "journey to find the Fell Pony",
      "Fell Pony travel story"
    ]
  },
  {
    url: "content/source-articles/article-falabella.html",
    keywords: [
      "Falabella",
      "Falabella horse",
      "Argentine miniature horse",
      "miniature horse from Argentina",
      "Falabella breed"
    ]
  },
  {
    url: "content/source-articles/article-marwari.html",
    keywords: [
      "Marwari",
      "Marwari horse",
      "curved ears horse",
      "Marwari breed",
      "Indian Marwari horse"
    ]
  },
  {
    url: "content/source-articles/article-pushkar.html",
    keywords: [
      "Pushkar",
      "Pushkar Fair",
      "Pushkar Camel Fair",
      "Pushkar horse fair",
      "Rajasthan horse fair"
    ]
  },
  {
    url: "content/source-articles/article-tbourida.html",
    keywords: [
      "Tbourida",
      "fantasia",
      "Moroccan fantasia",
      "powder game",
      "Moroccan cavalry display",
      "Tbourida charge"
    ]
  },
  {
    url: "content/source-articles/article-sandalwood-pony.html",
    keywords: [
      "Sandalwood pony",
      "Sandalwood Pony of Sumba",
      "Sumba pony",
      "Sandalwood horse",
      "Indonesia island horse"
    ]
  },
  {
    url: "content/source-articles/article-sumba.html",
    keywords: [
      "Sumba",
      "Pasola",
      "horses of Sumba",
      "Sumba horse culture",
      "Indonesian horse island"
    ]
  },
  {
    url: "content/source-articles/article-spirit-horses-of-yakutia.html",
    keywords: [
      "Yakutia",
      "Yakut horse",
      "Spirit Horses of Yakutia",
      "Sakha horse",
      "Arctic horse culture"
    ]
  },
  {
    url: "content/source-articles/article-australian-stock-horse.html",
    keywords: [
      "Australian Stock Horse",
      "stock horse",
      "Waler lineage",
      "Australian stockman horse",
      "campdraft horse"
    ]
  },
  {
    url: "content/source-articles/article-return-of-the-horse.html",
    keywords: [
      "return of the horse",
      "rewilding with horses",
      "horse rewilding",
      "rewilding horses",
      "rewilding projects"
    ]
  },
  {
    url: "content/source-articles/article-billy-barge-horse.html",
    keywords: [
      "Billy Barge",
      "Billy Barge horse",
      "Australian horseman",
      "outback horseman",
      "horse handling in Australia"
    ]
  },
  {
    url: "content/source-articles/article-bloodlines-borders.html",
    keywords: [
      "bloodlines and borders",
      "bloodlines borders",
      "horse bloodlines",
      "equine bloodline history"
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