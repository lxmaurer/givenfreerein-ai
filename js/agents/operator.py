
import re
import sys
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parents[2]
TEMPLATE_PATH = PROJECT_ROOT / "article-template-v2.html"
TEMPLATE_FALLBACK_PATH = PROJECT_ROOT / "article-template.html"
SOURCE_DIR = PROJECT_ROOT / "content" / "source-articles"
OUTPUT_DIR = PROJECT_ROOT / "content" / "built-articles"
IMAGES_DIR = PROJECT_ROOT / "images"
KEYWORD_MAP_PATH = PROJECT_ROOT / "js" / "article-link-map.js"

VALID_IMAGE_EXTS = {".jpg", ".jpeg", ".png", ".webp"}


def unique_preserve_order(items):
    seen = set()
    ordered = []
    for item in items:
        if not item:
            continue
        value = item.strip()
        if not value:
            continue
        lowered = value.lower()
        if lowered in seen:
            continue
        seen.add(lowered)
        ordered.append(value)
    return ordered


def generate_starter_keywords(article_name: str, article_title: str):
    slug_phrase = article_name.replace("-", " ").strip()
    slug_title_case = " ".join(word.capitalize() for word in slug_phrase.split())

    candidates = [
        article_title,
        slug_title_case,
        slug_phrase,
    ]

    # Add useful title fragments for long-form titles.
    for splitter in [":", " - "]:
        if splitter in article_title:
            parts = [part.strip() for part in article_title.split(splitter) if part.strip()]
            candidates.extend(parts)

    # Keep only reasonably specific phrases.
    filtered = [item for item in candidates if len(item) >= 4]
    return unique_preserve_order(filtered)[:6]


def ensure_internal_link_scripts(html: str):
    script_map = '<script src="/js/article-link-map.js"></script>'
    script_auto = '<script src="/js/auto-link-articles.js"></script>'

    has_map = script_map in html
    has_auto = script_auto in html
    if has_map and has_auto:
        return html

    insertion = []
    if not has_map:
        insertion.append(f"  {script_map}")
    if not has_auto:
        insertion.append(f"  {script_auto}")
    insertion_block = "\n" + "\n".join(insertion) + "\n"

    if "</body>" in html:
        return html.replace("</body>", f"{insertion_block}</body>")
    return html + insertion_block


def register_article_keywords(article_name: str, article_title: str):
    if not KEYWORD_MAP_PATH.exists():
        print(f"Keyword map not found, skipping auto-registration: {KEYWORD_MAP_PATH}")
        return False

    content = KEYWORD_MAP_PATH.read_text(encoding="utf-8")
    target_url = f"article-{article_name}.html"

    existing_urls = set(re.findall(r'url:\s*"([^"]+)"', content))
    if target_url in existing_urls:
        return False

    keywords = generate_starter_keywords(article_name, article_title)
    if not keywords:
        return False

    marker = "\n];\n\n// Backwards-compatible flat map consumed by auto-link-articles.js."
    marker_index = content.find(marker)
    if marker_index == -1:
        print("Could not locate keyword database marker; skipping auto-registration.")
        return False

    escaped_keywords = [kw.replace("\\", "\\\\").replace('"', '\\"') for kw in keywords]
    keyword_lines = "\n".join([f'      "{kw}"' + ("," if i < len(escaped_keywords) - 1 else "") for i, kw in enumerate(escaped_keywords)])

    entry = (
        "  {\n"
        f"    url: \"{target_url}\",\n"
        "    keywords: [\n"
        f"{keyword_lines}\n"
        "    ]\n"
        "  },\n"
    )

    updated = content[:marker_index] + entry + content[marker_index:]
    KEYWORD_MAP_PATH.write_text(updated, encoding="utf-8")
    return True


def parse_article_file(path: Path):
    text = path.read_text(encoding="utf-8")

    title_match = re.search(r"TITLE:\s*(.*)", text)
    standfirst_match = re.search(r"STANDFIRST:\s*(.*)", text)
    byline_match = re.search(r"BYLINE:\s*(.*)", text)
    body_match = re.search(r"BODY:\s*(.*)", text, re.DOTALL)

    if not title_match or not body_match:
        raise ValueError("Article file must contain TITLE and BODY.")

    title = title_match.group(1).strip()
    standfirst = standfirst_match.group(1).strip() if standfirst_match else ""
    byline = byline_match.group(1).strip() if byline_match else ""
    body = body_match.group(1).strip()

    paragraphs = [p.strip() for p in body.split("\n\n") if p.strip()]

    return {
        "title": title,
        "standfirst": standfirst,
        "byline": byline,
        "paragraphs": paragraphs,
    }


def get_article_images(article_name: str):
    article_image_dir = IMAGES_DIR / article_name

    if not article_image_dir.exists() or not article_image_dir.is_dir():
        return []

    images = [
        file for file in sorted(article_image_dir.iterdir())
        if file.suffix.lower() in VALID_IMAGE_EXTS
    ]

    return images


def build_body_html(paragraphs, article_name: str, article_title: str, body_images):
    parts = []
    image_index = 0

    for i, paragraph in enumerate(paragraphs, start=1):
        parts.append(f"<p>{paragraph}</p>")

        if i % 2 == 0 and image_index < len(body_images):
            image_file = body_images[image_index]
            figure_html = f'''<figure class="article-v2-figure">
    <img src="../../images/{article_name}/{image_file.name}" alt="{article_title}">
    <figcaption>{article_title}</figcaption>
</figure>'''
            parts.append(figure_html)
            image_index += 1

    return "\n".join(parts)


def build_article(article_name: str):
    source_file = SOURCE_DIR / f"{article_name}.txt"

    if not source_file.exists():
        print(f"Source article not found: {source_file}")
        return

    if TEMPLATE_PATH.exists():
        template_path = TEMPLATE_PATH
    elif TEMPLATE_FALLBACK_PATH.exists():
        template_path = TEMPLATE_FALLBACK_PATH
    else:
        print(f"Template not found: {TEMPLATE_PATH} or {TEMPLATE_FALLBACK_PATH}")
        return

    if not OUTPUT_DIR.exists() or not OUTPUT_DIR.is_dir():
        print(f"Output directory missing or invalid: {OUTPUT_DIR}")
        return

    article_data = parse_article_file(source_file)
    template = template_path.read_text(encoding="utf-8")

    images = get_article_images(article_name)
    images = sorted([img for img in images if img.suffix.lower() in VALID_IMAGE_EXTS], key=lambda x: x.name)
    num_images = len(images)
    if num_images > 0:
        hero_image = f"../../images/{article_name}/{images[0].name}"
        body_images = images[1:]
    else:
        hero_image = ""
        body_images = []

    body_html = build_body_html(
        article_data["paragraphs"],
        article_name,
        article_data["title"],
        body_images
    )

    # Calculate read time (minimum 1 min, 200 wpm)
    all_body_text = " ".join(article_data["paragraphs"])
    word_count = len(all_body_text.split())
    read_time = max(1, int((word_count + 199) // 200))
    resolved_date = "9 March 2026"
    resolved_read_time = f"{read_time} min read"

    output_html = template
    output_html = output_html.replace("{{TITLE}}", article_data["title"])
    output_html = output_html.replace("{{STANDFIRST}}", article_data["standfirst"])
    output_html = output_html.replace("{{BYLINE}}", article_data["byline"])
    output_html = output_html.replace("{{BODY}}", body_html)
    output_html = output_html.replace("{{HERO_IMAGE}}", hero_image)
    output_html = output_html.replace("DATE HERE", resolved_date)
    output_html = output_html.replace("READ TIME HERE", resolved_read_time)

    # Remove any remaining placeholders
    for unresolved in ["{{HERO_IMAGE}}", "DATE HERE", "READ TIME HERE"]:
        output_html = output_html.replace(unresolved, "")

    output_html = ensure_internal_link_scripts(output_html)

    output_filename = f"article-{article_name}.html"
    output_path = OUTPUT_DIR / output_filename
    output_path.write_text(output_html, encoding="utf-8")

    keywords_added = register_article_keywords(article_name, article_data["title"])

    print(f"Built article: {output_path}")
    print(f"Images found: {num_images}")
    if num_images > 0:
        print(f"Hero image: ../../images/{article_name}/{images[0].name}")
    else:
        print("Hero image: NONE")
    print(f"Date: {resolved_date}")
    print(f"Read time: {resolved_read_time}")
    if keywords_added:
        print(f"Keyword entry added to: {KEYWORD_MAP_PATH}")
    else:
        print("Keyword entry unchanged (already present or unavailable).")


print("Given Free Rein Article Builder Ready")

if len(sys.argv) > 1:
    # Command-line mode
    cmd = " ".join(sys.argv[1:]).strip()
    if cmd.lower().startswith("build "):
        article_name = cmd[6:].strip()
        try:
            build_article(article_name)
        except Exception as e:
            print(f"Error: {e}")
    elif cmd.lower() == "exit":
        print("Builder shutting down.")
    else:
        print("Try: build camargue")
else:
    # Interactive mode
    while True:
        task = input("\nWhat should I do? ").strip()

        if task.lower() == "exit":
            print("Builder shutting down.")
            break

        if task.lower().startswith("build "):
            article_name = task[6:].strip()
            try:
                build_article(article_name)
            except Exception as e:
                print(f"Error: {e}")
        else:
            print("Try: build camargue")