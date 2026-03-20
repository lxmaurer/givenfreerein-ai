const article = {
  siteTitle: "Given Free Rein",
  siteTagline: "Equestrian Culture Journal",
  navigation: ["Journal", "Destinations", "Breeds", "Culture"],

  kicker: "ARTICLE CATEGORY · LOCATION",
  title: "ARTICLE TITLE",

  heroImage:
    "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=1800&q=80",

  heroAlt: "Hero image placeholder",

  standfirst:
    "A short standfirst that introduces the horse, place, culture, or central argument of the article in one strong paragraph.",

  articleLabel: "Long-form feature",

  sidebar: {
    detailsLabel: "Article Details",
    items: [
      { label: "Series", value: "SERIES NAME" },
      { label: "Reading time", value: "X–Y minutes" },
      {
        label: "Focus",
        value: "Breed, travel, tack, culture, festival, or historical feature",
      },
    ],

    signupLabel: "Newsletter",
    signupTitle: "Join the Ride",
    signupText:
      "A short newsletter prompt that feels editorial and consistent with the rest of the page.",

    signupPlaceholder: "your@email.com",
    signupButton: "Subscribe",
  },

  blocks: [
    {
      type: "text",
      paragraphs: [
        "Opening body paragraph. Establish the setting, tone, and horse culture context.",
        "Second paragraph expanding the introduction and guiding the reader into the story.",
      ],
    },

    {
      type: "image",
      src: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1600&q=80",
      alt: "Horse landscape",
      caption:
        "Image caption describing landscape, horse culture, tack, rider, or travel scene.",
    },

    {
      type: "section",
      heading: "SECTION HEADING",
      paragraphs: [
        "Main section paragraph introducing history, culture, landscape, or working tradition.",
        "Second paragraph expanding the story and adding depth.",
      ],
    },

    {
      type: "imageNote",
      image: {
        src: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=1400&q=80",
        alt: "Horse detail",
        caption: "Inline image caption showing detail or moment.",
      },

      noteLabel: "Side Note",
      noteText:
        "Use this area for gear explanations, cultural notes, horse breed details, or travel facts.",
    },

    {
      type: "quote",
      label: "Pull Quote",
      text:
        "Insert a powerful line from the article here to create emphasis and visual rhythm.",
    },

    {
      type: "section",
      heading: "SECOND SECTION HEADING",
      paragraphs: [
        "Second major section of the article.",
        "Additional paragraph continuing the narrative.",
      ],
    },

    {
      type: "landscapeBreak",
      src: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1800&q=80",
      alt: "Landscape break",
      caption:
        "A wide atmospheric image to give the reader a visual pause in longer features.",
    },

    {
      type: "splitImages",
      intro:
        "Optional short introduction above a two-image comparison block.",

      images: [
        {
          src: "https://images.unsplash.com/photo-1507149833265-60c372daea22?auto=format&fit=crop&w=1200&q=80",
          alt: "Horse 1",
        },
        {
          src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80",
          alt: "Horse 2",
        },
      ],
    },

    {
      type: "section",
      heading: "CLOSING REFLECTION",
      paragraphs: [
        "Closing paragraph drawing meaning from the horse culture explored in the article.",
        "Final reflective line consistent with the Given Free Rein voice.",
      ],
    },
  ],

  relatedHeadingLabel: "Further Reading",
  relatedHeading: "Related Articles",

  related: [
    {
      title: "RELATED ARTICLE ONE",
      excerpt: "Short excerpt for the related article.",
      image:
        "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "RELATED ARTICLE TWO",
      excerpt: "Short excerpt for the related article.",
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "RELATED ARTICLE THREE",
      excerpt: "Short excerpt for the related article.",
      image:
        "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=1200&q=80",
    },
  ],

  footerText:
    "Given Free Rein — documenting the human–horse bond across cultures.",

  footerLinks: "Journal · Destinations · Breed Features · Contact",
};

function TextBlock({ paragraphs }) {
  return (
    <section className="space-y-6 text-[18px] leading-9 text-[#3b342e]">
      {paragraphs.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </section>
  );
}

function SectionBlock({ heading, paragraphs }) {
  return (
    <section className="mb-14">
      <h2 className="mb-5 text-[2.2rem] leading-tight text-[#241d17] md:text-[2.8rem]">
        {heading}
      </h2>

      <div className="space-y-6 text-[18px] leading-9 text-[#3b342e]">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </section>
  );
}

function ImageBlock({ src, alt, caption }) {
  return (
    <figure className="my-14">
      <img
        src={src}
        alt={alt}
        className="h-[430px] w-full rounded-[28px] object-cover"
      />

      <figcaption className="mt-4 border-l-2 border-[#d7cec0] pl-4 text-[13px] italic leading-6 text-[#8b847c]">
        {caption}
      </figcaption>
    </figure>
  );
}

function QuoteBlock({ label, text }) {
  return (
    <aside className="my-16 rounded-[30px] border border-[#e3ddd2] bg-[#f3efe8] p-8">
      <p className="text-[11px] uppercase tracking-[0.35em] text-[#8a8175]">
        {label}
      </p>

      <blockquote className="mt-4 text-3xl leading-snug text-[#3a342f]">
        “{text}”
      </blockquote>
    </aside>
  );
}

function ArticleBlock({ block }) {
  switch (block.type) {
    case "text":
      return <TextBlock paragraphs={block.paragraphs} />;

    case "section":
      return (
        <SectionBlock
          heading={block.heading}
          paragraphs={block.paragraphs}
        />
      );

    case "image":
      return (
        <ImageBlock
          src={block.src}
          alt={block.alt}
          caption={block.caption}
        />
      );

    case "quote":
      return <QuoteBlock label={block.label} text={block.text} />;

    default:
      return null;
  }
}

export default function GivenFreeReinArticleTemplate() {
  return (
    <div className="min-h-screen bg-[#f7f4ef] text-[#2a241f]">

      <main>

        <section className="relative overflow-hidden">
          <img
            src={article.heroImage}
            alt={article.heroAlt}
            className="w-full h-[60vh] object-cover"
          />

          <div className="absolute bottom-10 left-10 text-white">
            <p className="uppercase tracking-widest text-sm">
              {article.kicker}
            </p>

            <h1 className="text-5xl font-semibold mt-2">
              {article.title}
            </h1>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-6 py-14">
          <p className="text-xl leading-9 text-[#4a433c]">
            {article.standfirst}
          </p>
        </section>

        <article className="max-w-3xl mx-auto px-6 space-y-8">

          {article.blocks.map((block, i) => (
            <ArticleBlock key={i} block={block} />
          ))}

        </article>

      </main>

    </div>
  );
}