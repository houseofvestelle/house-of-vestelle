# House of Vestelle — Website

The public website for **houseofvestelle.com**.

This is a completely separate project from the Mark Andrew photography site. It has
its own folder, its own GitHub repository, and its own Vercel project. The two
never share code, accounts, or domains.

## What's here right now

The **production landing site** on the "Orangerie" brand look — champagne ivory,
antique gold, one emerald jewel band:

- `index.html` — the real landing page: hero, "the fitting" steps, the house
  range, two doors (client → app.houseofvestelle.com, photographer →
  /for-photographers/), the jewel band, and the pre-launch waitlist (marked
  for removal at launch).
- `for-photographers/` — the founding-studio sales page (tiers, FAQ, sign-up).
- `api/subscribe.js` — both forms land in GoHighLevel (clients tagged `HOV`,
  photographers tagged `HOV-photographer`).
- Legal pages + `/thank-you/`.

## How it's published

- **Hosting:** Vercel (free). Connected to this GitHub repo — every push to the
  `main` branch publishes automatically. The local repo may be AHEAD of the
  live site; check the log before assuming what's live.
- **Domain:** houseofvestelle.com, pointed at the Vercel project.
- The styling engine is a SEPARATE repo/deploy (Netlify) — see
  `~/Projects/house-of-vestelle-styling-engine/DEPLOY.md`. Its home is
  app.houseofvestelle.com, which this site's "Begin your styling" buttons
  already point to.

## Brand

Full brand spec lives one folder up: `brand-spec-vestelle-orangerie.md` and
`House-of-Vestelle-Brand-Bible.pdf`.

- Background **Limewash Ivory** `#FAF6EE` · Surface **Champagne Plaster** `#F2E9DB`
- Text **Bronze Ink** `#241F19` · Jewel **Salon Emerald** `#122B23`
- Accent **Antique Gold Leaf** `#C5A059`
- Fonts: **Italiana** (display) · **EB Garamond** (body) · **Marcellus** (labels)
