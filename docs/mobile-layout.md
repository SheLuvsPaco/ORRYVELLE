# Mobile layout system (phones, 760 px and below)

The phone layout follows one grid, one spacing scale, one type scale and two compact patterns. Desktop and tablet (761 px and up) are out of scope and must not change.

Sources: Carbon 2x grid (4 columns, 16 px margin), Apple HIG (44 pt targets, 17 pt body), Material (48 dp targets, 8 dp spacing), NN/g (mobile carousels need a visible peek and stop working after 3 to 5 items; accordions suit FAQs and long lists; progressive disclosure), GOV.UK spacing (component spacing fixed, section spacing smaller on phones), WCAG 2.2 target size.

## Rules for every change

- Write phone rules only inside `@media (max-width: 760px)` (or a smaller max-width). Never edit a rule that applies above 760 px.
- Use the tokens below; no new magic numbers. Every spacing value is on the scale.
- Content stays in the HTML. Hiding is allowed only for decorative, `aria-hidden` visuals, duplicated blocks and secondary text that is still visible on desktop.
- Brand: graphite, parchment, bronze, condensed uppercase display type, rectangular controls with 2 to 4 px radii, crosshair corner marks on containers (not on every row). No 8 to 16 px rounded corners.
- The three disciplines get identical treatment.
- English and Bulgarian share every rule; check the Bulgarian page at 320, 393 and 430 px.
- Reduced motion is on for the owner: nothing may look broken or half-rendered with it.

## Grid

| | Value |
|---|---|
| Columns | 4 (stretch) |
| Margin | 16 px (`.container`) |
| Gutter | 16 px |
| Content width at 393 px | 361 px, column about 78 px |

Text and cards span all 4 columns. 2 + 2 is only for numbers, logos and one-word labels. 1 + 3 is for icon or number rows. Check alignment locally with `?grid` on any URL (dev server only).

## Tokens (`:root` inside the phone query in `globals.css`)

| Token | Value | Use |
|---|---|---|
| `--m-sec` | 64px | section padding top and bottom |
| `--m-sec-lg` | 80px | hero bottom, final CTA, footer top |
| `--m-intro` | 32px | section intro to its content |
| `--m-card-pad` | 20px | padding of every card |
| `--m-card-gap` | 16px | between cards |
| `--m-inner` | 12px | between elements inside a card |
| `--m-h1` | clamp(36px, 11.2vw, 46px) | page titles (44 at 393 px) |
| `--m-h2` | clamp(28px, 8.7vw, 36px) | section titles (34 at 393 px) |
| `--m-h3` | 24px | card titles |
| `--m-h4` | 20px | row titles |
| `--m-lead` | 18px | hero and article lede |
| `--m-body` | 16px | body text, line-height 1.55 |
| `--m-small` | 14px | secondary text, lists, meta |
| `--m-label` | 12px | eyebrows, chips, tags, captions (0.08em tracking) |

Spacing scale: 4, 8, 12, 16, 20, 24, 32, 48, 64, 80. No real text below 12 px (mockup text inside illustrations is exempt).

## Components

- **Card:** 1 px border, 4 px radius, padding `--m-card-pad`, no ring shadows, no card inside a card. Text inside a card starts 36 px from the screen edge everywhere.
- **Buttons:** 52 px tall, full width when they are the section's primary action, stacked with 12 px gap. One filled (primary) button per screen; repeated actions become outline buttons or 44 px text links.
- **Tap targets:** every link and control at least 44 px tall (breadcrumbs, text links, footer links, FAQ rows, filters).
- **1 + 3 row:** icon or number in a 40 px first column, title (`--m-h4`) and one to three lines of text (`--m-small` to `--m-body`), 1 px divider, padding 16 0, no box per row.
- **Snap rail:** for 3 to 6 same-type items only (work, related guides). Card width 84% (a 16% peek of the next card), 12 px gap, `scroll-snap-type: x mandatory`, scroll padding 16, bleeds to the screen edges, a link to the full list beside it.
- **Visuals:** one representative visual per section at most. Decorative mockups inside lists are hidden on phones; the section keeps its first or most representative visual, cropped to a calm height.

## Progress

- [x] Tokens, base type, section rhythm, buttons, header, announcement, floating booking, footer, enquiry block (globals.css)
- [x] Home hero, stage, technology band, studio intro
- [x] Services bento, process, integrations hub, why-us
- [x] Service page, solution and industry pages, related guides, FAQ
- [x] About, contact, industries index, insights index, article
- [x] Work index, work rails, case studies
- [x] Full review at 320, 393 and 430 px in both languages; desktop pixel check; speed check

Result (393 px, before to after): home 23.2 to 15.5 screens, service pages about 22 to 14.5, every page 0% spacing off the scale (was 36 to 56%), 6 to 8 text sizes per page (was 12 to 26), no page wider than the screen at 320, 393 or 430 px, desktop and tablet identical across all 82 pages, Lighthouse mobile 98 to 100 performance and 97 to 100 accessibility.

## Checks before changing phone styles

The scripts used for this pass live outside the repo; the rules they enforce are: phone rules only inside phone queries, every spacing value on the scale, text sizes from the tokens, nothing wider than the viewport at 320, 393 and 430 px (check `document.body.scrollWidth`, not only the document, because `body` clips overflow), and desktop screenshots unchanged.
