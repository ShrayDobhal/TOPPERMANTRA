# Topper Mantra — React (Vite)

The Topper Mantra landing page, migrated from a single vanilla HTML/CSS/JS
file to a component-based **React + Vite** application.

## Run it

```bash
cd react-app
npm install
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # production build → dist/
npm run preview  # preview the production build
```

> Requires Node 18+.

## Project structure

```
react-app/
├─ index.html               # entry HTML, loads fonts + /src/main.jsx
├─ vite.config.js           # Vite + @vitejs/plugin-react
├─ package.json
└─ src/
   ├─ main.jsx              # React root
   ├─ App.jsx               # page assembly + cursor glow
   ├─ index.css             # resets, @keyframes, responsive grid breakpoints
   ├─ data.js               # all section content (stats, mentors, copy…)
   └─ components/
      ├─ primitives.jsx     # Reveal, CountUp, CtaButton, GhostButton,
      │                       Eyebrow, useScrolled, useCountdown, useTilt
      ├─ Nav.jsx            # sticky nav, scroll-blur, mobile menu (useState)
      ├─ Hero.jsx           # headline + animated ecosystem node graph
      ├─ Marquee.jsx        # infinite scrolling keyword strip
      ├─ Stats.jsx          # scroll-triggered count-up numbers
      ├─ WhySection.jsx     # hover-lift feature cards
      ├─ Journey.jsx        # 6-step timeline
      ├─ Mentors.jsx        # 3D pointer-tilt mentor cards
      ├─ Community.jsx      # bento community gallery
      ├─ Hackathons.jsx     # live countdown banner
      ├─ Programs.jsx       # entrepreneurship + drone lab
      ├─ JoinCTA.jsx        # final call-to-action
      └─ Footer.jsx
```

## How the migration was done

- **Markup → components.** Each page section became its own component; the
  page is composed in `App.jsx`.
- **Repeated content → `data.js`.** Stats, mentors, journey steps, nav links,
  footer columns, etc. are data arrays the components map over.
- **Imperative JS → React hooks.** The old `componentDidMount` logic is now
  declarative hooks/components:
  - scroll-reveal → `<Reveal>` (IntersectionObserver)
  - number counters → `<CountUp>`
  - hackathon timer → `useCountdown`
  - nav blur on scroll → `useScrolled`
  - mentor card tilt → `useTilt`
  - mobile menu → `useState`
- **Responsive layout → CSS.** Grid templates and breakpoints live in
  `index.css` (`.tm-hero`, `.tm-stats`, …); component visuals stay as inline
  style objects, so nothing depends on a JS resize listener.
- **No global state / router** — it's a single-page marketing site, so plain
  component composition is all it needs.

## Notes

- Imagery is placeholder (striped panels for mentor photos / gallery). Drop
  real assets into `src/assets/` and swap the placeholder blocks.
- Fonts (Space Grotesk + Plus Jakarta Sans) load from Google Fonts in
  `index.html`.
