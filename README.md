# Topper Mantra - The Operating System for Students

Topper Mantra is a premium, high-performance ecosystem designed to bridge the gap between Tier 2/3 college students and top-tier career opportunities. It acts as an operating system for student builders, providing mentorship, curated projects, startup exposure, hackathons, an AI-powered resume intelligence engine, and a community of ambitious peers.

## 🚀 Features & Production Status

Topper Mantra has transitioned into a robust, domain-driven SaaS application architecture capable of serving high-scale traffic with real-time data integrations.

### 🧠 Core Modules
- **AI Resume Intelligence:** Upload, parse, and score resumes via OpenAI GPT-4o-mini edge functions. Provides actionable feedback, ATS compatibility scores, and personalized career roadmaps.
- **Project Forge:** A Kanban-style project management environment with full live Supabase data integration.
- **Gamification Engine:** PostgreSQL-driven XP points, automated daily streaks, heatmap tracking, and real-time badge assignments.
- **Mentorship Hub:** Integrated matching, peer-review cycles, and session dashboards.
- **Domain-Driven Onboarding:** Strict URL validations, dynamic daily streak tracking, and resilient state persistence.

### 🎨 Frontend Architecture
- **Modern UI:** Built with a scalable, minimalist, and dynamic design language inspired by top-tier SaaS platforms.
- **Interactive Visualizations:** Premium React/Framer Motion-driven animations.
- **Component-Driven:** A strictly organized atomic structure separating UI elements, layout components, and major page sections.
- **Global State Management:** Powered by Zustand for lightweight and fast state distribution.

### ⚙️ Backend Architecture (Supabase Edge & Postgres)
The platform uses an extensive microservices backend:
- **Canonical DB Schema:** A massive, production-patched schema incorporating real-time PostgreSQL triggers.
- **11 Edge Functions:**
  - `resume-analyzer` & `resume-generator`
  - `mentor-matching` & `opportunity-matching`
  - `custodian-bot` (Automated moderation)
  - `growth-recommendations`, `portfolio-generator`
  - `emails`, `notifications`, `payments`, `ai`

## 🛠 Tech Stack
- **Frontend Framework:** React 18, Vite
- **Styling:** Tailwind CSS, PostCSS, Framer Motion
- **Icons & Visualization:** Lucide React, Recharts
- **State & Data Fetching:** Zustand, TanStack React Query, Axios
- **Backend & Auth:** Supabase (Auth, Postgres, Edge Functions, Storage)
- **Document Processing:** pdfjs-dist, mammoth, html2pdf.js

## 📂 Project Structure
```
toppr-mantra/
├── src/
│   ├── modules/        # Domain-driven features (onboarding, projects, spaces, resume)
│   ├── components/     # Reusable building blocks and UI primitives
│   ├── contexts/       # React contexts (e.g., AuthContext)
│   ├── store/          # Zustand global state stores
│   ├── lib/            # Utilities, API integrations, and Supabase client
│   ├── pages/          # Top-level routing components
│   ├── App.jsx         # Main router and component registry
│   └── main.jsx        # Application entry point
├── supabase/
│   ├── functions/      # Deno-based Edge Functions microservices
│   └── migrations/     # PostgreSQL schema migrations and PRD patches
└── package.json
```

## 💻 Local Development
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file and configure your Supabase credentials (`VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`).
4. Start the development server:
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
