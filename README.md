# Rotar Atelier — The Experience

Landing page for **Rotar Atelier**, a premium artisanal catering & pastry studio
(platters, group brunch, corporate events). Static site, no build step, no framework.

Brand identity: black / cream / gold, serif logotype (Cormorant Garamond) with
spaced sans-serif labels (Jost) — matches the brand board (monogram "RT",
tagline "The Experience").

## Structure

```
index.html          Public landing page (hero, services, process, testimonials, contact)
styles.css           Design tokens + all styling for the landing page
script.js             Nav, scroll reveal, contact form (mailto)
admin/                Private logo archive (Supabase-backed)
  index.html            Login + upload UI
  admin.css             Styling (reuses landing page tokens)
  admin.js               Supabase auth + storage logic
  config.js               Supabase project URL + anon key
  SETUP.md                 Step-by-step Supabase setup guide
assets/                Static assets (currently empty — add product/brand photos here)
```

## Running locally

Static site — any static server works:

```bash
npx serve -p 3444 .
```

Then open `http://localhost:3444`.

**Important:** all internal links/scripts use absolute paths (`/styles.css`,
`/admin/admin.js`, etc.) rather than relative ones. Static servers that rewrite
`/admin/index.html` → `/admin` (clean URLs) break relative paths otherwise —
this bit us once already, keep paths absolute when adding new pages.

## Admin / Logo Archive (`/admin`)

A private, unindexed page (`noindex`) where the Rotar Atelier team can upload
and archive logo files (SVG, PNG, PDF, AI...) to Supabase Storage.

- **Read** (viewing/downloading files) is public via the storage bucket's public URL.
- **Write** (upload/delete) requires signing in — enforced by Supabase Row Level
  Security, not by anything in the frontend code. The `anon` key in `config.js`
  is safe to expose client-side by design.

Full setup instructions (create Supabase project, storage bucket, RLS policies,
admin user): see [`admin/SETUP.md`](admin/SETUP.md).

## Deployment

Static output — deployable to Vercel, Netlify, or any static host. No build
command or output directory needed; the project root **is** the output.

### Vercel

```bash
vercel --prod
```

Or connect the GitHub repo in the Vercel dashboard for auto-deploy on every push.

## Brand tokens

| Token | Value |
|---|---|
| Black | `#14120f` |
| Cream | `#f6f1e7` |
| Gold | `#c8a15c` |
| Headings | Cormorant Garamond |
| Body / labels | Jost |

Defined as CSS custom properties in `styles.css` (`:root`).

## Editing guide

| Change | Where |
|---|---|
| Copy / sections on the landing page | `index.html` |
| Colors, spacing, type | `styles.css` (`:root` tokens at the top) |
| Contact form behavior | `script.js` — currently opens a pre-filled `mailto:` draft; swap for a real form backend (e.g. Formspree, a Supabase table) when ready |
| Testimonials | `index.html` → `#testimoniale` section — current quotes are placeholders, replace with real client testimonials |
| Logo archive | `admin/` — see `admin/SETUP.md` |

## Status / open items

- [x] Real product photography (`assets/hero-craft.jpg`, `craft-*.jpg`) and real logo lockups (`assets/logo-*.png`, extracted from `rotar logo.pdf`)
- [x] Real phone (0720 786 883) and address (Strada Popa Savu 56, parter, București) wired into header, hero, contact section, footer, and mobile sticky CTA
- [ ] Replace placeholder testimonials with real client quotes
- [ ] Replace placeholder contact email (`contact@rotaratelier.ro`) in `script.js`
- [ ] Connect a persistent form backend instead of `mailto:`
