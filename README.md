# Topper Mantra - The Operating System for Students

Topper Mantra is a premium, high-performance ecosystem designed to bridge the gap between Tier 2/3 college students and top-tier career opportunities. It acts as an operating system for student builders, providing mentorship, curated projects, startup exposure, hackathons, and a community of ambitious peers.

## 🚀 Features
- **Modern UI Architecture:** Built with a scalable, minimalist, and dynamic design language inspired by top-tier SaaS platforms (Stripe, Linear, Vercel).
- **Interactive Visualizations:** Premium React/Framer Motion-driven animations that explain the "Opportunity Gap" dynamically without heavy static assets.
- **Responsive Layout:** Perfectly engineered to look beautiful on any device, from ultrawide desktops to mobile screens.
- **Component-Driven:** A strictly organized atomic structure separating UI elements, layout components, and major page sections.

## 🛠 Tech Stack
- **Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Routing:** React Router v6

## 📂 Project Structure
The `src/` directory has been organized for scalable production maintenance:
```
src/
├── assets/         # Static visual assets and branding
├── components/     # Reusable building blocks
│   ├── common/     # Shared features (e.g., Hero visualizations)
│   ├── layout/     # Structural components (Nav, Header, Footer)
│   ├── sections/   # Major page blocks (OpportunityGap, Ecosystem, Roadmap)
│   └── ui/         # Base design system primitives (Buttons, Badges)
├── layouts/        # Page wrappers and layout contexts
├── lib/            # Utilities and configuration functions
├── pages/          # Top-level routing components
├── App.jsx         # Main router and component registry
├── main.jsx        # Application entry point
└── index.css       # Global styles and Tailwind directives
```

## 💻 Local Development
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## 🏗 Build for Production
To generate a highly optimized static build for deployment:
```bash
npm run build
```
The output will be placed in the `/dist` directory, ready to be hosted on Vercel, Netlify, or any static hosting provider.

## 📝 License
Copyright © 2026 Topper Mantra. All rights reserved.
