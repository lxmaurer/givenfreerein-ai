# Claude Handoff - Given Free Rein

Use this file to onboard Claude quickly in a new chat.

## 1) Paste-Ready Claude Prompt

Copy and paste this into Claude at the start of a session:

```
You are helping on the Given Free Rein website project.

Project root:
/Users/cassandramaurer/givenfreerein-ai

Current goals:
- Keep the existing editorial style.
- Improve content quality and internal linking relevance.
- Avoid aggressive auto-linking spam.
- Build and maintain article pages with consistent structure.

Critical rules:
- Follow SITE_RULES.md and WORKFLOW.md.
- Do not redesign the homepage unless explicitly asked.
- Prefer small targeted edits over large rewrites.
- Verify changes on localhost when possible.
- Keep article templates and layout conventions consistent.

Internal linking system:
- Keyword map: js/article-link-map.js
- Auto-link engine: js/auto-link-articles.js
- Link behavior should be relevance-first, not dense/spammy.

Article builder automation:
- Builder script: js/agents/operator.py
- New builds should:
  1) include internal-link scripts in generated HTML,
  2) auto-register starter keywords for new article URLs in js/article-link-map.js,
  3) preserve existing keyword map entries.

Recent project status:
- Repo is on main and synced with origin/main.
- Latest commit includes internal-link relevance tuning and keyword auto-registration.

How to respond:
- Be concise.
- Explain what changed and why.
- Show exact file paths touched.
- If uncertain, ask one precise clarification question.
```

## 2) Where We Are Now

- Branch: `main`
- Remote: `origin` -> `https://github.com/lxmaurer/givenfreerein-ai.git`
- Internal linking is active and tuned to be relevance-first.
- New article builds now support keyword auto-registration and script injection via `js/agents/operator.py`.

Recent key commits:
- `670176a` feat(internal-links): tune relevance and auto-register keywords for new builds
- `fedefeb` feat(internal-links): add keyword map and auto-linking scripts
- `41c0bb7` feat(articles): add expanded article collection with media assets

## 3) What GitHub Copilot Has Been Doing

- Rebuilt and fixed major article pages (including Soul of Spain updates).
- Corrected image mapping issues (hero/body placement and file replacements).
- Added and tuned internal cross-linking system.
- Reduced over-aggressive keyword linking to relevance-first behavior.
- Added build-time automation so new articles are included in the keyword system.
- Grouped work into clean commits and pushed to remote.

## 4) Best Way To Share Tasks With Claude

Use this short format for each request:

```
Goal:
What you want changed in one sentence.

Scope:
Exact files or pages (if known).

Constraints:
What must not change (layout, fonts, sections, etc.).

Success check:
How we know the task is done.
```

Example:

```
Goal:
Add 1-2 relevant internal links in article-comanche.html body text.

Scope:
article-comanche.html, js/article-link-map.js

Constraints:
No homepage changes. No aggressive keyword additions.

Success check:
Comanche page has only relevant in-body links and no sidebar/related spam links.
```

## 5) High-Value Files For Claude To Read First

- `SITE_RULES.md`
- `WORKFLOW.md`
- `TASK_QUEUE.md`
- `js/article-link-map.js`
- `js/auto-link-articles.js`
- `js/agents/operator.py`

## 6) Team Preference Summary

- Prefer practical fixes over broad redesigns.
- Keep edits focused and reversible.
- Preserve site voice and editorial structure.
- Link quality matters more than link quantity.
