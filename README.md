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
| Lead form | `#start` | How do I start? |

## Structure

```
index.html      Page markup (English text ships in the HTML)
styles.css      All styling; tokens at the top
i18n.js         Every string, EN and RO, plus the language switcher
script.js       Header, mobile menu, occasion prefill, testimonials, lead form
assets/         Photos, logo marks, favicons
admin/          Private logo archive (Supabase), self-contained, see admin/SETUP.md
PRODUCT.md      Audience, tone, anti-references, principles
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

Event food (the strongest material): `hero.jpg` (the shared table, with the gold
cutlery), `cater.jpg`, `mezze.jpg` (annotated), `skewers-band.jpg` /
`skewers-tall.jpg` (full-bleed band, desktop / mobile), `tasting.jpg`
(annotated), `tasting-angle.jpg`. Kitchen shots: `chef-piping.jpg`,
`gallery-baker.jpg`, `gallery-focaccia.jpg`, `gallery-rolls.jpg`,
`gallery-sandwich.jpg`.

**Annotated photos.** In `index.html` a `.pin` sits at `left/top` percentages
over an image whose container keeps the image's own aspect ratio, so the
numbers stay on the food at every size. Each pin matches a numbered line in the
`.legend` next to it; hovering a legend line lifts its pin. The dish names are
`g1.l*` / `g3.l*` in `i18n.js`, written from what is visible in the photos, so
check them with the kitchen.

Still missing: edible gifts and a finished event table, in the same style.

## Deployment

Static output, deployable to Vercel or any static host. No build command.
Pushing to `main` deploys automatically when the repo is connected to Vercel.

## Open items

- [ ] Real testimonials (see above)
- [ ] Decide where leads should land: a real inbox, or a Supabase table shown in `/admin`
- [ ] Add `og:image` once the production domain is known (`assets/og.jpg` is ready)
- [ ] Menu tiers section (three set menus plus a build-your-own fourth), planned
- [ ] Confirm the inferred copy: "Calm service" commitments, "We arrive" step, six category descriptions, and the dish names under the annotated photos
