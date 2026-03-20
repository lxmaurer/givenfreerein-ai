# Agent Workflow

1. Site Auditor inspects the site and adds new issues as Pending.
2. Designer refines vague Pending tasks into clear implementation instructions.
3. Fixer reads the first Pending task, marks it In Progress, implements it, then moves it to Needs Verification.
4. Verifier reads the first Needs Verification task, checks it visually, and moves it to Completed or Failed.
5. Agents should only act on the statuses assigned to their role.
6. No agent should work on more than one task at a time.reference-article.html is used only for layout analysis.

Agents should extract:

• article structure
• content hierarchy
• image placement rhythm
• figure and caption structure

Agents must NOT copy:

• fonts
• colors
• margins
• padding
• Squarespace CSS classes