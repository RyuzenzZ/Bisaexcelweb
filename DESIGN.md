# DESIGN.md â€” BisaExcel.com

Version: 3.0
Language: English
Purpose: Visual and UX instructions for AI agents and developers working on BisaExcel.com.

This file is intentionally instruction-only. It defines visual direction, component behavior, layout principles, and UX rules. It does not include implementation snippets or ready-to-copy code.

---

## 1. Design Vision

BisaExcel.com should feel like a professional Excel learning platform for career growth and practical work.

Design personality:

- Professional.
- Clear.
- Structured.
- Premium but not intimidating.
- Practical for workers, students, admins, finance staff, HR staff, business owners, and beginners.
- Slightly gamified only where it supports learning motivation.

The product should not feel like a gaming website, even if it has practice, scoring, or locked explanations.

Core design sentence:

BisaExcel.com should look like a serious learning and productivity platform, with enough energy to make Excel practice feel engaging.

---

## 2. Product Direction Reflected in Design

The design must support five main areas:

- Learn by Reading: written Excel tutorials.
- Learn by Video: syllabus-based YouTube video learning with some exclusive items possible.
- Excel Practice: exercises with locked or paid explanations.
- Tips: business formulas, LAMBDA dictionary, and REGEX pattern dictionary.
- Templates: downloadable Excel templates, mostly paid products.

The design should make the learning flow obvious:

Learn â†’ Watch â†’ Practice â†’ Unlock Explanation â†’ Use Tips â†’ Download Templates.

Avoid making the platform look like a full paid course marketplace at the early stage.

---

## 3. Brand Style

Theme name:

Dark Premium Green.

Primary mood:

- Smart.
- Trustworthy.
- Focused.
- Career-oriented.
- Work-ready.

Avoid:

- Generic white startup design.
- Overly playful school-like LMS design.
- Neon green that looks cheap.
- Too many gradients.
- Too many glow effects.
- Too much gaming language.
- Public UI labels that say â€œEsportsâ€ as the main concept.
- Overusing â€œfreeâ€ in headlines.

---

## 4. Color System

Use the following color roles consistently. Do not introduce random colors without updating this file.

Core surfaces:

- Base background: #080E0A.
- Elevated background: #0D1610.
- Card background: #111E14.
- Card hover background: #162419.
- Overlay background: #1C2E20.
- Input background: #0F1A12.

Primary brand:

- Primary green: #16A34A.
- Primary hover green: #15803D.
- Deep green border: #14532D.
- Deep green tint: #0A2E18.

Reward and premium accents:

- Amber reward: #F59E0B.
- Soft amber: #FBBF24.
- Use amber for XP, premium labels, locked explanations, and paid template highlights.

Information accents:

- Sky blue: #0EA5E9.
- Use sky blue only for informational labels, links, or secondary highlights.

Status colors:

- Success: #22C55E.
- Warning: #F59E0B.
- Danger: #EF4444.

Text:

- Primary text: #E8F0EA.
- Secondary text: #8BA98F.
- Muted text: #4D6650.
- Inverse text for bright buttons: #0F172A.

Borders:

- Subtle border: #1E3022.
- Default border: #254A2A.
- Strong or focused border: #2D6A35.

Color rules:

- Dark mode is the default visual identity.
- Do not use white or light gray as the main background.
- Use bright white only when necessary for button text or small highlights.
- Keep green as the main action color.
- Use amber sparingly for premium, locked, reward, or paid elements.
- Use red only for destructive actions or error states.

---

## 5. Typography

Recommended font roles:

- Headings, body text, buttons, menu labels, and impact stats: Montserrat.
- Headings, body text, buttons, menu labels, and impact stats: Montserrat.
- Formula and Excel-like expressions: JetBrains Mono.
- Headings, body text, buttons, menu labels, and impact stats: Montserrat.

Typography rules:

- Headings should feel confident and readable.
- Body text must remain easy to read on dark backgrounds.
- Avoid using too many font styles on one page.
- Use mono styling only for formulas, patterns, or technical Excel examples.
- Large marketing headlines should be short and clear.
- Avoid overly long hero text.

Recommended hierarchy:

- Hero headline: large, bold, and concise.
- Page title: clear and direct.
- Section title: short and benefit-driven.
- Card title: specific and scannable.
- Body copy: simple, practical, and not too formal.
- Metadata: small, muted, and secondary.

---

## 6. Layout Principles

General layout:

- Use generous spacing.
- Keep content centered on public pages.
- Use card-based sections for learning materials, videos, exercises, tips, and templates.
- Keep navigation simple and focused.
- Avoid overcrowding the hero section.
- Each page should have one primary action.

Responsive behavior:

- Mobile should be one column.
- Tablet can use two columns.
- Desktop can use wider grids or split layouts.
- Do not hide important learning actions on mobile.
- Navigation should collapse cleanly on small screens.

Spacing principles:

- Use consistent section spacing.
- Cards should breathe and not look cramped.
- Related items should be grouped visually.
- Primary CTA areas need enough empty space around them.

---

## 7. Component Guidelines

Buttons:

- Primary buttons use green.
- Secondary buttons use outline or subtle dark styling.
- Locked, premium, or paid actions may use amber accents.
- Destructive buttons use red and should be rare.
- Every button must have a clear label.
- Avoid vague labels such as â€œClick Here.â€

Cards:

- Cards should use dark surfaces with subtle borders.
- Hover states should be visible but not excessive.
- Cards must clearly show the item type: article, video, practice, tip, or template.
- Paid or locked items should be indicated clearly but not aggressively.
- Template cards should feel product-like and trustworthy.

Inputs:

- Inputs should use dark backgrounds and visible focus states.
- Search inputs should be prominent on content-heavy pages.
- Placeholder text must be muted and easy to understand.
- Forms should be short at the early stage.

Badges:

- Use badges to show level, category, status, locked access, premium access, or content type.
- Do not overuse badges on a single card.
- Amber badges should usually mean premium, paid, locked, or reward.
- Green badges should usually mean available, completed, beginner-friendly, or active.

Modals and dialogs:

- Use only when needed.
- Keep modal copy short.
- Clearly separate cancel and confirm actions.
- Avoid using modals for large content reading.

Loading and empty states:

- Every data-driven page should have loading, empty, and error states.
- Empty states should explain what the user can do next.
- Error states should be calm and helpful.

---

## 8. Page Guidelines

Home page:

- The home page should explain the platform simply.
- It should highlight the five main areas: Learn, Video, Excel Practice, Tips, and Templates.
- It should not over-emphasize that everything is free.
- It should not lead with esports or heavy gamification.
- Primary CTA: Start Learning.
- Secondary CTA: View Excel Practice or View Tips.

Learn page:

- Show written tutorials in a structured way.
- Use categories such as Excel Basics, Formulas, Data Cleaning, Reporting, Dashboard, and Business Use Cases.
- Cards should show title, category, difficulty, short description, and reading time when available.

Video page:

- Show syllabus-based learning.
- Each video should feel part of a learning path.
- Use labels for open videos and exclusive videos.
- Include references to practice files if available.
- Do not make the page look like a random video gallery.

Excel Practice page:

- This is a key feature.
- Exercises should be organized by level and topic.
- The user should understand what they need to do before opening a task.
- Locked explanations should be shown clearly.
- Use softer copy such as â€œUnlock Full Explanationâ€ instead of aggressive payment language.
- Some exercises may be marked premium later.

Tips page:

- This section is an SEO and retention asset.
- The three main categories must be visually clear: Business Formulas, LAMBDA Dictionary, and REGEX Patterns.
- Search and category filtering should be prioritized when the content grows.
- Formula examples should be readable and scannable.

Templates page:

- Templates should feel like digital products.
- Show practical use cases, not just file names.
- Include labels for category, suitable user, and expected benefit.
- Paid templates should look premium but still trustworthy.
- Do not overload the user with too many pricing elements early.

Auth pages:

- Keep them minimal and clean.
- Use the product brand and one clear benefit statement.
- Do not add unnecessary fields.

Dashboard:

- The dashboard should focus on progress and next action.
- Show recently viewed learning materials, practice history, saved tips, and downloaded templates when available.
- If backend data is not available, use clearly local dummy data.

Admin pages:

- Admin UI should be functional and clear.
- Avoid spending too much visual effort on admin polish at the MVP stage.
- Prioritize content management clarity.

---

## 9. Navigation Rules

Recommended public navigation:

- Learn.
- Video.
- Excel Practice.
- Tips.
- Templates.

Recommended CTA area:

- Sign In.
- Start Learning.

Navigation rules:

- Do not show too many items.
- Do not show internal detail routes in the main navigation.
- Do not use â€œEsportsâ€ as a primary navigation label.
- Keep legacy routes hidden from the public navigation if they still exist.
- Use dropdowns only when they reduce clutter.

---

## 10. Copywriting Tone

Tone:

- Clear.
- Friendly.
- Professional.
- Practical.
- Encouraging.
- Not too formal.
- Not too salesy.

Preferred copy direction:

- â€œMaster Excel from zero with structured materials.â€
- â€œLearn through articles, syllabus-based videos, practice tasks, formula tips, and ready-to-use templates.â€
- â€œPractice first, then unlock the full explanation when you need it.â€
- â€œFind business formulas, LAMBDA functions, and REGEX patterns faster.â€

Avoid:

- â€œEverything is free.â€
- â€œBecome an Excel legend overnight.â€
- â€œExcel Esportsâ€ as a front-facing core label.
- Aggressive payment copy.
- Claims about features that are not built.

---

## 11. Premium and Locked Content Treatment

Locked content should feel useful, not manipulative.

Use premium states for:

- Full answer keys.
- Step-by-step explanations.
- Solution files.
- Exclusive videos.
- Premium exercises.
- Paid templates.

Premium UI rules:

- Use amber accents.
- Keep the card readable.
- Show what the user gets after unlocking.
- Do not hide the learning objective.
- Avoid making the whole platform feel paywalled.

Suggested labels:

- Exclusive.
- Locked Explanation.
- Full Explanation.
- Solution File.
- Premium Exercise.
- Paid Template.

Avoid labels that sound harsh or desperate.

---

## 12. Accessibility and Usability

Minimum rules:

- Text must have strong contrast on dark backgrounds.
- Interactive elements must have visible hover and focus states.
- Click targets must be comfortable on mobile.
- Do not rely on color alone to show locked, error, success, or active states.
- Use clear labels for buttons and forms.
- Keep paragraphs short.
- Avoid long uninterrupted text blocks.

---

## 13. Animation Rules

Animation should support clarity, not distract.

Use animation for:

- Page transitions.
- Card hover.
- Progress changes.
- Success feedback.
- Unlock or completion moments.

Avoid animation for:

- Long reading content.
- Form inputs.
- Too many items at once.
- Repeated background effects that distract from learning.

Motion personality:

- Smooth.
- Short.
- Subtle.
- Premium.
- Not game-heavy.

---

## 14. Visual Consistency Checklist

Before shipping a page or component, check:

- The page uses the Dark Premium Green direction.
- The page matches the latest product direction.
- The main CTA is clear.
- The UI does not overuse â€œfree.â€
- The UI does not lead with esports language.
- Cards, buttons, badges, and inputs feel consistent.
- Locked or paid states are clear but not aggressive.
- Mobile layout works.
- Empty and loading states exist if needed.
- Colors and fonts follow this document.
- The page does not claim features that are not built.

---

## 15. Final Design Reminder

BisaExcel.com should not look like a generic LMS.

It should look like a practical Excel learning and productivity platform where users can:

Learn from written tutorials, watch syllabus-based videos, practice Excel tasks, unlock explanations when needed, search useful formula tips, and download work-ready templates.

