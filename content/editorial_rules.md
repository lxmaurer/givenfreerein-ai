# Given Free Rein — Editorial Rules

These rules control how article content and images are arranged inside the article template.

Agents generating or converting articles must follow these rules.

---

## Hero Image

• Every article must use one hero image.  
• The hero image should be the strongest and most atmospheric image available.  
• The hero title overlays the hero image.

---

## Image Count

Choose the number of body images based on article length.

Short article (<900 words)  
→ 2 body images

Medium article (900–1800 words)  
→ 3–4 body images

Long article (1800+ words)  
→ 4–6 body images

Hero image is not counted as a body image.

---

## Image Placement

Images must be distributed evenly through the article.

Rules:

• Never place images consecutively  
• Follow pattern: text → image → text → image  
• Aim for one image every 2–3 paragraphs  
• Place images at natural section breaks

Bad layout:

text  
image  
image  
image  
text

Preferred layout:

text  
image  
text  
image  
text  
image

---

## Image Selection

Images should match the section topic when possible.

Examples:

Origins/history → historical or foundational image  
Landscape → environment / terrain image  
Working role → horse and rider action  
Tack section → saddle or equipment detail  
Festival/culture → ceremony or gathering

Avoid random image placement.

---

## Image Folder Structure

Each article stores images in its own folder.

Pattern:

images/[article-name]/

Examples:

images/camargue/  
images/escaramuza/  
images/comanche/

---

## Image Naming (recommended)

01-hero.jpg  
02-landscape.jpg  
03-rider.jpg  
04-tack.jpg  
05-festival.jpg

Sequential naming helps both humans and AI.

---

## Layout Safety

When generating or converting articles:

• Do not modify the article template layout  
• Do not change CSS classes  
• Do not change header or footer  
• Only insert content and images into the template
---

## Technical Image Path Rules

Agents must verify image filenames before inserting them.

Rules:

• Only use filenames that actually exist in the article image folder  
• Filenames are case-sensitive  
• Do not invent or guess filenames  
• Image src paths must follow this format:

/images/{article-folder}/{filename}

Example:

/images/camargue/camargue_white_horses.jpg

If the filename cannot be verified in the folder, the agent must stop and report the missing image instead of guessing.