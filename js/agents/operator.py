
import re
import sys
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parents[2]
TEMPLATE_PATH = PROJECT_ROOT / "article-template-v2.html"
SOURCE_DIR = PROJECT_ROOT / "content" / "source-articles"
OUTPUT_DIR = PROJECT_ROOT / "content" / "built-articles"
IMAGES_DIR = PROJECT_ROOT / "images"

VALID_IMAGE_EXTS = {".jpg", ".jpeg", ".png", ".webp"}


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

    if not TEMPLATE_PATH.exists():
        print(f"Template not found: {TEMPLATE_PATH}")
        return

    if not OUTPUT_DIR.exists() or not OUTPUT_DIR.is_dir():
        print(f"Output directory missing or invalid: {OUTPUT_DIR}")
        return

    article_data = parse_article_file(source_file)
    template = TEMPLATE_PATH.read_text(encoding="utf-8")

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

    output_filename = f"article-{article_name}.html"
    output_path = OUTPUT_DIR / output_filename
    output_path.write_text(output_html, encoding="utf-8")

    print(f"Built article: {output_path}")
    print(f"Images found: {num_images}")
    if num_images > 0:
        print(f"Hero image: ../../images/{article_name}/{images[0].name}")
    else:
        print("Hero image: NONE")
    print(f"Date: {resolved_date}")
    print(f"Read time: {resolved_read_time}")


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