# AGENTS.md — BisaExcel.com

Version: 4.0
Language: English
Purpose: Master operating instructions for AI coding agents working on BisaExcel.com.

This file is intentionally instruction-only. It does not contain implementation snippets, boilerplate code, or generated examples. Agents must inspect the existing project before editing anything.

---

## 1. Project Identity

BisaExcel.com is a freemium Excel learning platform for Indonesian users.

The current product direction approved by the client:

- A place to learn Excel from zero.
- Most learning content can be accessible for free, but the word “free” should not be over-emphasized in public messaging.
- The website may monetize through selected exclusive videos, paid explanations, paid answer keys, paid premium exercises, and paid Excel templates.
- The website should feel professional and practical, not like a game-first platform.

Primary product areas:

- Learn by Reading: written Excel tutorials and articles.
- Learn by Video: syllabus-based video learning, mostly via YouTube embeds, with some exclusive videos possible later.
- Excel Practice: exercises users can attempt, with paid answer keys or paid explanations.
- Tips: business formulas, LAMBDA dictionary, and REGEX pattern dictionary.
- Templates: downloadable Excel templates, mainly paid digital products.

Do not reposition the product as a full paid LMS, marketplace, or esports platform unless the client explicitly asks for that change.

---

## 2. Current Implementation Baseline

Before making changes, inspect the actual repository.

Current known direction:

- Frontend is React with Vite and TypeScript.
- Styling uses Tailwind CSS.
- Public pages and route structure are still evolving.
- Backend, database, payment, and real authentication may not exist yet.
- Do not assume Laravel, Supabase, Midtrans, or any database exists unless those files are present in the repository and the task explicitly asks to use them.

If a file, route, function, component, schema, or API endpoint is not present, do not invent it. Ask for confirmation or create it only when the task explicitly requires it.

---

## 3. Document Priority

When instructions conflict, follow this priority:

1. The user’s latest direct instruction.
2. AGENTS.md.
3. DESIGN.md.
4. Existing project files.
5. Older roadmap or context documents.

If an older document says “Excel Esports” but the latest client direction says “Excel Practice,” follow the latest client direction.

---

## 4. Anti-Hallucination Rules

AI agents must not:

- Invent file names, components, hooks, stores, services, models, controllers, schemas, or endpoints.
- Assume backend APIs exist before reading the project.
- Build with libraries that are not installed or approved.
- Change the tech stack without explicit approval.
- Add features that were not requested.
- Rewrite the whole design system when only a route, copy, or layout update is requested.
- Create backend, authentication, payment, or database code unless the task explicitly asks for it.
- Use old product positioning such as “Excel Esports” in the public navigation unless the user explicitly requests it.
- Overuse “free” in headings or CTAs. The platform is mostly free at the beginning, but the business model includes paid parts.
- Treat placeholder pages as real finished features.
- Remove old routes before adding safe redirects or compatibility routes.

When uncertain, ask before implementing.

---

## 5. Required Agent Workflow

Before coding, the agent must respond with:

- The goal of the task in one sentence.
- The files likely to be touched.
- The routes likely to be affected.
- The assumptions being made.
- Any missing context that may block implementation.

During implementation, the agent must:

- Make small, focused changes.
- Preserve working pages.
- Keep imports valid.
- Reuse existing layout and UI patterns.
- Use local dummy data when backend is not available.
- Avoid broad refactors unless requested.

After implementation, the agent must report:

- Files created.
- Files changed.
- Routes added or updated.
- Old routes preserved or redirected.
- Build or lint result, if run.
- Remaining risks or next steps.

---

## 6. Product Route Direction

Use this route direction unless the user provides a newer one.

Public routes:

- Home: landing page.
- Learn: written Excel tutorials.
- Learn Detail: individual article or tutorial.
- Video: syllabus-based video learning list.
- Video Detail: video lesson page.
- Excel Practice: list of exercises.
- Practice Detail: individual exercise page.
- Practice Explanation: locked or paid answer/explanation page.
- Tips: main tips hub.
- Business Formulas: business formula collection.
- LAMBDA Dictionary: LAMBDA function collection.
- REGEX Dictionary: REGEX pattern collection.
- Tip Detail: individual tip page.
- Templates: downloadable Excel templates.
- Template Detail: individual template product page.
- Login, Register, Dashboard: only if already present or explicitly requested.

Legacy compatibility:

- If the existing project has “courses,” it may be mapped to “learn” or “video” depending on the page content.
- If the existing project has “esports,” it should not be shown in the main navigation. It may redirect to Excel Practice or reuse the same page under a new label.
- If the existing project has “pricing,” keep it only if needed. For the current product direction, monetization should mainly appear through templates, locked explanations, premium exercises, and exclusive videos.

---

## 7. Public Navigation Direction

Recommended public navigation:

- Learn
- Video
- Excel Practice
- Tips
- Templates

Recommended CTAs:

- Sign In
- Start Learning

Avoid overcrowding the navigation. Do not put internal feature pages, test result pages, admin pages, or legacy route names in the main navbar.

---

## 8. Feature Boundaries

Learn by Reading:

- Use for written tutorials.
- Content should be structured from beginner to practical work use cases.
- Use local dummy data until a content system exists.

Learn by Video:

- Use for syllabus-based video learning.
- YouTube embeds are acceptable.
- Some videos may be marked exclusive, but do not implement real access control unless requested.

Excel Practice:

- Exercises can be visible.
- Answer keys and explanations may be locked or marked paid.
- Some exercises may be marked premium later.
- Do not implement real payment unless requested.

Tips:

- Must include three core categories: Business Formulas, LAMBDA Dictionary, and REGEX Pattern Dictionary.
- This section is important for SEO and product differentiation.
- Tips should be searchable or filterable when the UI supports it.

Templates:

- Downloadable Excel templates are digital products.
- Templates may be paid.
- Use placeholder purchase/download states unless payment is explicitly requested.

---

## 9. Content and Copy Rules

Use professional, simple, Indonesian-facing copy even if the code/documentation is in English.

Preferred positioning:

- “Learn Excel from zero with structured materials.”
- “Learn through articles, syllabus-based videos, practical exercises, formula tips, and ready-to-use templates.”
- “Practice first, then unlock the full explanation if needed.”

Avoid:

- “Everything is free.”
- “Excel Esports” as the main product label.
- Heavy gaming language in the core learning flow.
- Overpromising advanced LMS features that are not built yet.

---

## 10. Technical Safety Rules

Before adding or editing routes:

- Read the current router file.
- Read the current route constants file, if it exists.
- Preserve current working routes.
- Add redirects or aliases for old routes if necessary.
- Do not delete pages without confirming they are unused.

Before adding UI:

- Read DESIGN.md.
- Reuse existing layout components.
- Use existing tokens and patterns.
- Do not introduce new colors or fonts unless DESIGN.md is updated first.

Before adding data fetching:

- Check whether a backend exists.
- If no backend exists, use local dummy data.
- Do not create API clients or hooks that call imaginary endpoints.

Before adding dependencies:

- Check package.json.
- Prefer existing dependencies.
- Ask before installing new packages.

---

## 11. Recommended File Placement

Keep these files at the repository root:

- AGENTS.md: agent behavior, coding workflow, product boundaries, anti-hallucination rules.
- DESIGN.md: visual system and UI behavior.

Optional future documents:

- CONTEXT.md: business roadmap and product context.
- CONTENT.md: article, video, practice, tips, and template content planning.
- API.md or docs/api: backend/API documentation only when a real backend exists.

Do not overload AGENTS.md with long code examples or full implementation templates.

---

## 12. Quality Checklist

Before finalizing a task, verify:

- The requested change is aligned with the latest client direction.
- The main navigation is focused.
- The UI does not overuse “free.”
- The public site does not lead with “esports.”
- Routes do not break existing pages.
- Imports are valid.
- Dummy data is clearly local if no backend exists.
- No imaginary API endpoints were added.
- No unapproved package was introduced.
- The visual style follows DESIGN.md.
- The agent’s final response includes exactly what changed and what still needs attention.

---

## 13. When to Ask the User

Ask before continuing if:

- The task requires backend/payment/auth but the current project does not have it.
- A route or feature can be interpreted in more than one way.
- The requested change conflicts with the client-approved product direction.
- A required file is missing.
- The agent would need to delete or heavily rewrite existing work.
- A new dependency seems necessary.

Do not ask for small styling details that are already defined in DESIGN.md.

---

## 14. Final Reminder

This project is currently best treated as a practical freemium Excel learning platform.

Build toward this flow:

Learn by reading → Watch syllabus-based videos → Practice Excel → Unlock explanations if needed → Use tips → Download templates.

Keep implementation grounded in the actual repository.
