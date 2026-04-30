# PROCESS.md

This file documents **how** I worked on one feature in this repo: the scrollytelling Library demo (the full-page sticky slide that cross-fades images as you scroll). This document was created with the help of the AI used to make the project. 

## 1) One feature — the prompts I used

Feature: **Scrollytelling Library demo page** (static, no backend), deployed on GitHub Pages.

Prompts (in order, lightly formatted but not “improved”):

1. **Initial build**
   - “based on … `04-your-assignment.md` … make a new version of the library page … standalone page just to show the scrollytelling effect … self contained in the `side_project` folder and should be set up for git and git pages”

2. **Scroll behavior fixes**
   - “a couple of problems first it never makes it to the first entry when scrolling. and each entry should take up a full screen size and the image should stick and fade out when scrolled passed as the new one fades in”

3. **Pages images + remove left cards**
   - “ok it just fixed on my end however new issues have arose. The images are not loading on the page. Also the side cards stating the document should not be showing The focus should be on whats in the Active document area. It should show the image, the pages, file size, Name, and document number only while keeping the scollytelling effect”

4. **Slide-style overlay like screenshot**
   - “it looks better but the images its scrolling through should be centered the text should be in the same box in the image almost like a slide. similar to the attached screenshot”

5. **Full-page stage + overlay content**
   - “is there a way to make the contents on the right instead fill the main page and fufill the same scrollytelly style. also the overlay should not say \"Scroll to see ...\" it should instead say the pages and file size. and the bottom boxes that say the name pages and size should be removed”

## 2) Exit checks — pass and fail

Exit checks I used for that feature:

- **Local lint passes (`npm.cmd run lint`)**
  - Fail (initially): ESLint was scanning the vendored `refs/` template and failing on its code
  - Fix: ignore `refs/**` for this repo’s linting
  - Pass (final): lint is clean

- **Static export build passes (`npm.cmd run build`)**
  - Pass (final): generates `out/` successfully

- **Pages deployment renders the demo (not the README)**
  - Fail (initially): I was effectively viewing/serving the repo content instead of a deployed `out/` site
  - Fix: ensure `side_project` is the repo root and Pages Source is “GitHub Actions”; confirm the Actions deploy job produces the site
  - Pass (final): demo loads at the GitHub Pages URL

- **Images load on GitHub Pages**
  - Fail (initially): images referenced as `/images/...` broke under project-site basePath
  - Fix: prefix assets using `NEXT_PUBLIC_BASE_PATH` so URLs become `/<repo>/images/...`
  - Pass (final): images render on Pages

- **Scrollytelling behavior works as specified**
  - Fail (initially): “step 1” wasn’t reliably becoming active again at the top
  - Fix: switch from IntersectionObserver “middle band” approach to scroll-based viewport-overlap calculation; make each step `100vh`; drive cross-fade from overlap ratio
  - Pass (final): first slide activates; each step is full-screen; sticky slide cross-fades correctly

- **UI scope: focus on the sticky slide**
  - Fail (initially): left-side “document cards” were visible and drew attention
  - Fix: convert left column into invisible `100vh` scroll triggers; move the information into a slide-style overlay on the image; remove bottom fact boxes
  - Pass (final): main content is the sticky slide; overlay shows pages + file size

## 3) Failure-mode reflection

Failure mode I hit: **does more than you asked**.

Early versions of the demo included extra UI elements that weren’t part of the target look (visible document cards, extra “helper” info, and additional panels). Those additions were meant to make debugging easier, but they distracted from the actual scrollytelling “slide” style you wanted. Once I saw the mismatch, I changed how I directed the AI: I started giving stricter UI constraints (“only show these fields”, “remove the left cards”, “overlay should show pages + file size”, “full-page stage”), and I treated each change as a scoped iteration with a concrete exit check (Pages works, images load, scrolly transitions look right).
