# Orryvelle films

Scroll-driven films of the automation systems shown on orryvelle.com case studies. Each film is a
static page, played by the viewer's own scroll inside the laptop on the case study (`ScrollShowcase`
in `src/components/studio/Showcase.tsx`).

- English films: `src/pages/en/`, Bulgarian films: `src/pages/bg/`.
- Build: `npm install`, then `npm run build`. Output goes to `../public/films/` and is committed,
  because the website build does not build the films.
- The films are `noindex`; the case study pages are what search engines index.
