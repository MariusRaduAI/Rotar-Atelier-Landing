# Rotar Atelier

Landing page for **Rotar Atelier**, private-chef catering in Bucharest.
Static site, no build step. English by default, Romanian at one click
(flag switch in the header, choice remembered).

Page order follows the client's questions:

| Section | Anchor | Question it answers |
|---|---|---|
| Hero | `#top` | Who are you? |
| What we cater | `#cater` | What do you have? |
| How we cater | `#how` | What does it look like? |
| We come to you | `#visit` | How does it work? |
| Calm service | `#calm` | Who takes care of it? |
| Gallery + social proof | `#gallery` | Is it any good? |
| FAQ | `#faq` | What are the practical rules? |
| Lead form | `#start` | How do I start? |

## Structure

```
index.html      Page markup (English text ships in the HTML)
styles.css      All styling; tokens at the top
i18n.js         Every string, EN and RO, plus the language switcher
script.js       Header, mobile menu, smart form, lead form, gallery, scroll progress
assets/         Photos + WebP siblings, logo marks, favicons, PWA icons
admin/          Private logo archive (Supabase), self-contained, see admin/SETUP.md
PRODUCT.md      Audience, tone, anti-references, principles
robots.txt      Crawler rules (blocks /admin/); sitemap line commented out until the real domain is set
sitemap.xml     Single-URL sitemap (client-side language switch, no separate paths)
manifest.json   PWA manifest (installable "add to home screen")
```

## Running locally

```bash
npx serve -p 3446 .
```

Paths are absolute (`/styles.css`, `/assets/...`) on purpose: static hosts
that rewrite `/admin/index.html` to `/admin` break relative paths.

## Editing copy

Everything visible is in `i18n.js`, under `en` and `ro`. Keys are grouped by
section (`cater.*`, `how.*`, `visit.*`, `calm.*`, `gifts.*`, `start.*`,
`form.*`). To change a sentence, change it in both languages.

The HTML carries the English text too, so the page still reads correctly if
JavaScript is off. If you change English copy, change it in both places.

## Things to configure in `script.js`

**Testimonials.** `TESTIMONIALS` is empty, so the "What clients say" block is
hidden and nothing invented is shown. Add real quotes to show it:

```js
var TESTIMONIALS = [
  { quote: { en: '...', ro: '...' }, by: { en: 'Name, role, company', ro: '...' } }
];
```

**Lead form.** With `FORM_ENDPOINT` empty, submitting opens WhatsApp
(`+40 720 786 883`) with the request pre-filled, so a lead can never go to a
dead inbox. To post to a real inbox or database instead, set `FORM_ENDPOINT`
to a URL that accepts JSON (Formspree, a serverless function, etc.).

## Photography

Event food (the strongest material): `hero.jpg` (the shared table, with the
gold cutlery — also the hero background), `cater.jpg` (under the "What we
cater" intro), `chef-piping.jpg` (in "How we cater"). Everything else lives
in the `#gallery` reel: `mezze.jpg`, `skewers-tall.jpg`, `tasting.jpg`,
`tasting-angle.jpg`, `gallery-baker.jpg`, `gallery-sandwich.jpg`,
`gallery-focaccia.jpg`, `gallery-rolls.jpg`.

Still missing: edible gifts and a finished event table, in the same style.

## The gallery reel (`#gallery`)

A horizontal, swipeable filmstrip, not a static mosaic: native `scroll-snap`
gives touch devices a real swipe for free; `script.js` adds synced dots,
prev/next buttons, and mouse-drag for desktop trackpads. Each `<figure
class="slide">` in `index.html` is one photo; the last slide is a CTA card
(`.slide-cta`) instead of a photo. Captions are `g.s1.t`/`g.s1.p` through
`g.s8.t`/`g.s8.p` in `i18n.js` — short, story-caption length, not full
paragraphs. On mobile a slide is `80vw` wide so the next one peeks at the
edge; on desktop, `min(62vw, 420px)`.

## The header seal (`#top` → scroll)

The header is transparent over the hero and solidifies once the visitor
scrolls past it (`#top-sentinel` + an `IntersectionObserver` in `script.js`
toggle `.is-scrolled` on `#siteHeader`). The wordmark folds away at the same
moment, leaving just the RT mark — the recurring brand signature, echoed
again as the slowly-turning seal (`.hero-seal`, `assets/logo-full-cream.png`)
in the hero itself.

## FAQ (`#faq`)

Native `<details>/<summary>` accordion, no JS required for the open/close
behavior (a chevron rotates via a CSS `::after` on `[open]`). The eight
questions and answers live in `i18n.js` (`faq.q1`–`faq.q8` / `faq.a1`–`faq.a8`)
and are grounded in facts the client confirmed directly — deposit, rescheduling,
allergies, and coverage area — not invented. The same eight pairs are mirrored
in the `FAQPage` JSON-LD block in `<head>` (English only, per schema.org
convention) so they can also surface as a Google FAQ rich result.

## Lead form confirmation (`#start`)

Submitting swaps `#formFields` for `#formConfirm` instead of a small inline
status line — a full panel with a checkmark, a restated next step, and (since
the primary path opens WhatsApp in a new tab, which some browsers block) a
visible fallback link to the exact same pre-filled WhatsApp message, plus a
"send another request" reset. Wired in `script.js`'s `showConfirm()`.

**Smart format suggestion.** Picking an occasion (`#occasion`) pre-fills the
format field (`#f-format`) with a sensible guess — set menu for corporate
lunches/meetings, bespoke for private events/cakes/dessert bars, live-chef for
launches/shoots (`OCCASION_FORMAT` map in `script.js`). It only fires until the
visitor touches the format field themselves (`formatTouched`), so it never
overwrites a deliberate choice.

## WhatsApp floating button

Site-wide `.wa-fab` (bottom-right, above the sticky mobile CTA bar) links
straight to `wa.me/40720786883` with a one-time pulse ring on load. Same
number as the lead form's WhatsApp fallback and the "Call us" block.

## Automatic language detection (`i18n.js`)

On first visit (no saved preference), the page reads `navigator.languages` /
`navigator.language` and shows Romanian if any of them start with `ro`,
otherwise English — but never writes that guess to `localStorage`. Only an
explicit click on a flag persists a choice (`setLang` → `safeSet`), so a
Romanian visitor whose browser is set to English (or vice versa) still gets a
fresh guess on their next visit instead of getting stuck on a first-run guess.

## Performance and technical SEO

- Every content photo ships as `<picture><source type="image/webp">` with the
  original JPEG as fallback (~38% smaller on average); `assets/*.webp` are
  hand-generated siblings, not a build step.
- `robots.txt`, `sitemap.xml`, `manifest.json` are all in place. The sitemap
  and the two JSON-LD blocks in `<head>` use a placeholder,
  `REPLACE-WITH-REAL-DOMAIN` — **search for it and replace it with the real
  production domain before launch**, then uncomment the `Sitemap:` line in
  `robots.txt`.
- Two `<script type="application/ld+json">` blocks: `LocalBusiness` +
  `FoodEstablishment` (name, address, phone, service area, `sameAs` linking to
  holybakery.ro) and `FAQPage` (mirrors `#faq`).

## Visual craft

Gold `::selection` highlight, a gold-on-black themed scrollbar
(`scrollbar-color` + the WebKit pseudo-elements), and a thin gold
scroll-progress bar fixed at the very top of the viewport
(`.scroll-progress`, filled by a `requestAnimationFrame`-throttled listener in
`script.js`).

## Deployment

Static output, deployable to Vercel or any static host. No build command.
Pushing to `main` deploys automatically when the repo is connected to Vercel.

## Open items

- [ ] **Replace `REPLACE-WITH-REAL-DOMAIN`** in `sitemap.xml` and the two JSON-LD blocks in `index.html` once the production domain is live, then uncomment the `Sitemap:` line in `robots.txt`
- [ ] Real testimonials (see above)
- [ ] Decide where leads should land: a real inbox, or a Supabase table shown in `/admin`
- [ ] Menu tiers section (three set menus plus a build-your-own fourth), planned but not built
- [ ] Analytics (e.g. Plausible), not yet added
- [ ] Chef bio/photo, Instagram link, Google Reviews widget — discussed, not yet approved
- [ ] Confirm the inferred copy: "Calm service" commitments, "We arrive" step, six category descriptions, and the gallery captions (`g.s1`–`g.s8` in `i18n.js`)
- [ ] More photography for the reel: edible gifts, a finished event table

`tight-leading` (the one previously-unresolved `impeccable detect` finding) was
confirmed a false positive by the client and is now suppressed via
`.impeccable/config.json` — see that file for the reasoning trail.
