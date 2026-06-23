# House of Vestelle — Website

The public website for **houseofvestelle.com**.

This is a completely separate project from the Mark Andrew photography site. It has
its own folder, its own GitHub repository, and its own Vercel project. The two
never share code, accounts, or domains.

## What's here right now

A single coming-soon page (`index.html`) on the "Orangerie" brand look —
champagne ivory, antique gold, one emerald jewel band. It captures email
sign-ups ("By invitation") and links to @houseofvestelle. The styling service
itself stays private until the 2026 launch.

## How it's published

- **Hosting:** Vercel (free). Connected to this GitHub repo — every push to the
  `main` branch publishes automatically.
- **Domain:** houseofvestelle.com, pointed at the Vercel project.

## Email capture

The sign-up form is ready but not yet wired to an inbox. To turn it on, create a
free form endpoint (e.g. Formspree) and paste the URL into the `FORM_ENDPOINT`
value near the bottom of `index.html`. Until then the form still shows the
confirmation message, so it's never broken.

## Brand

Full brand spec lives one folder up: `brand-spec-vestelle-orangerie.md` and
`House-of-Vestelle-Brand-Bible.pdf`.

- Background **Limewash Ivory** `#FAF6EE` · Surface **Champagne Plaster** `#F2E9DB`
- Text **Bronze Ink** `#241F19` · Jewel **Salon Emerald** `#122B23`
- Accent **Antique Gold Leaf** `#C5A059`
- Fonts: **Italiana** (display) · **EB Garamond** (body) · **Marcellus** (labels)
