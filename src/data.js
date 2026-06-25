// ============================================================
// Topper Mantra — shared data
// ============================================================

export const ECOSYSTEM = [
  { label: 'Students',   glyph: '◆', pos: { left: '6%',  top: '8%' },     anim: 'tmFloatA 6s ease-in-out infinite' },
  { label: 'Mentors',    glyph: '★', pos: { right: '2%', top: '14%' },    anim: 'tmFloatB 7s ease-in-out infinite' },
  { label: 'Hackathons', glyph: '⚡', pos: { right: '0%', top: '58%' },    anim: 'tmFloatC 6.5s ease-in-out infinite' },
  { label: 'Startups',   glyph: '▲', pos: { left: '10%', bottom: '6%' },  anim: 'tmFloatB 7.5s ease-in-out infinite' },
  { label: 'Careers',    glyph: '●', pos: { left: '-4%', top: '46%' },    anim: 'tmFloatA 6.8s ease-in-out infinite' },
]

export const STATS = [
  { to: 5000, label: 'Students' },
  { to: 100,  label: 'Mentors' },
  { to: 50,   label: 'Hackathons' },
  { to: 200,  label: 'Projects' },
  { to: 20,   label: 'Startup Collabs' },
]

export const WHY_CARDS = [
  { t: 'Mentorship',         d: '1:1 guidance from people who have walked the path you want to take.',      s: 'circle' },
  { t: 'Community',          d: 'A high-trust network of ambitious peers who push each other forward.',     s: 'square' },
  { t: 'Hackathons',         d: 'Build under pressure, ship fast, and get noticed by founders.',            s: 'diamond' },
  { t: 'Startup Ecosystem',  d: 'Direct exposure to early-stage startups, internships and real work.',      s: 'circle' },
  { t: 'Opportunities',      d: 'Internships, fellowships and roles surfaced straight to you.',             s: 'square' },
  { t: 'Entrepreneurship',   d: 'From your first idea to incubation, pitch decks and investor intros.',     s: 'diamond' },
]

export const JOURNEY = [
  { t: 'Join',    d: 'Create your profile and find your tribe.' },
  { t: 'Learn',   d: 'Soak up mentorship and resources.' },
  { t: 'Build',   d: 'Ship real projects with your team.' },
  { t: 'Network', d: 'Meet founders, mentors and peers.' },
  { t: 'Launch',  d: 'Put your work in front of the world.' },
  { t: 'Grow',    d: 'Land roles, funding and your future.' },
]

export const MENTORS = [
  { n: 'Aarav Mehta', r: 'Senior PM',   c: 'Razorpay', tags: ['Product', '0→1', 'Fintech'] },
  { n: 'Sneha Iyer',  r: 'Eng Lead',    c: 'Zerodha',  tags: ['Backend', 'Scale', 'Mentoring'] },
  { n: 'Rohit Verma', r: 'Founder',     c: 'Stealth',  tags: ['Startups', 'Fundraising'] },
  { n: 'Priya Nair',  r: 'Design Lead', c: 'CRED',     tags: ['UX', 'Brand', 'Systems'] },
]

export const COMMUNITY_TILES = [
  { l: 'Networking events', s: 'Monthly in-person meetups across cities', ph: 'event photo', big: true },
  { l: 'Workshops',         s: 'Hands-on sessions',  ph: 'workshop' },
  { l: 'Speaker sessions',  s: 'Founders & operators', ph: 'talk' },
  { l: 'Discord',           s: '24/7 builder chat',  ph: 'community' },
  { l: 'Student meetups',   s: 'Campus chapters',    ph: 'meetup' },
]

export const INCUBATOR = [
  'Startup Bootcamp', 'Founder Circles', 'Pitch Competitions',
  'Investor Connect', 'Startup Challenges', 'Demo Days',
]

export const MARQUEE = [
  'MENTORSHIP', 'HACKATHONS', 'STARTUP EXPOSURE', 'REAL PROJECTS',
  'NETWORKING', 'FELLOWSHIPS', 'COMMUNITY',
]

export const FOOTER_COLS = [
  { h: 'Explore',  items: ['Mentors', 'Hackathons', 'Projects', 'Opportunities'] },
  { h: 'Programs', items: ['Entrepreneurship', 'Drone Lab', 'Fellowships', 'Dashboard'] },
  { h: 'Company',  items: ['About', 'Community', 'Contact', 'Careers'] },
]
