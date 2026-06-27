export const mockProjects = [
  {
    id: "proj-1",
    title: "EcoVision AI",
    tagline: "AI-powered waste management classification and tracking system.",
    description: "EcoVision is an open-source project aimed at helping municipalities automatically classify waste using computer vision. Built with PyTorch and React, it features real-time classification, a dashboard for tracking analytics, and a mobile app for citizens to report illegal dumping.",
    coverImage: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=800",
    category: "Artificial Intelligence",
    difficulty: "Advanced",
    status: "in-progress",
    technologies: ["React", "Python", "PyTorch", "Node.js", "MongoDB"],
    duration: "12 Weeks",
    likes: 342,
    bookmarks: 89,
    githubUrl: "https://github.com/toppermantra/ecovision",
    demoUrl: "https://ecovision.demo.com",
    githubStats: {
      stars: 128,
      forks: 34,
      issues: 12,
      commits: 456
    },
    team: [
      { name: "Shray Dobhal", role: "Owner & AI Engineer", avatar: "S" },
      { name: "Priya Singh", role: "Frontend Developer", avatar: "P" },
      { name: "Rahul Sharma", role: "Data Scientist", avatar: "R" }
    ],
    openRoles: [
      { role: "UX Designer", description: "Design the citizen mobile app interfaces." },
      { role: "Backend Developer", description: "Help scale the Node.js API." }
    ],
    mentors: [
      { name: "Dr. Arvind Gupta", role: "AI Researcher at Microsoft" }
    ],
    milestones: [
      { title: "Dataset Collection", status: "completed", date: "Oct 1" },
      { title: "Model Training", status: "completed", date: "Oct 15" },
      { title: "API Integration", status: "in-progress", date: "Nov 5" },
      { title: "Beta Launch", status: "pending", date: "Dec 1" }
    ]
  },
  {
    id: "proj-2",
    title: "CampusConnect",
    tagline: "A unified social network for college campus events and clubs.",
    description: "CampusConnect solves the problem of fragmented communication across WhatsApp, Telegram, and Discord by providing a single platform for all college clubs to post events, manage memberships, and broadcast announcements.",
    coverImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800",
    category: "Web Development",
    difficulty: "Intermediate",
    status: "completed",
    technologies: ["Next.js", "TailwindCSS", "Supabase", "Vercel"],
    duration: "8 Weeks",
    likes: 512,
    bookmarks: 145,
    githubUrl: "https://github.com/toppermantra/campusconnect",
    demoUrl: "https://campusconnect.demo.com",
    githubStats: {
      stars: 45,
      forks: 12,
      issues: 3,
      commits: 210
    },
    team: [
      { name: "Ananya Patel", role: "Full Stack Developer", avatar: "A" },
      { name: "Karan Mehta", role: "UI/UX Designer", avatar: "K" }
    ],
    openRoles: [],
    mentors: [],
    milestones: [
      { title: "Design System", status: "completed", date: "Aug 10" },
      { title: "Auth & DB Setup", status: "completed", date: "Aug 20" },
      { title: "Feed Implementation", status: "completed", date: "Sep 5" },
      { title: "Production Launch", status: "completed", date: "Sep 20" }
    ]
  },
  {
    id: "proj-3",
    title: "DeFi Locker",
    tagline: "Secure smart contract for time-locked crypto assets.",
    description: "A decentralized application (dApp) that allows users to lock their ERC-20 tokens for a specific period. Useful for team token vesting and forced hodling.",
    coverImage: "https://images.unsplash.com/photo-1639762681485-074b7f4ec67e?auto=format&fit=crop&q=80&w=800",
    category: "Blockchain",
    difficulty: "Advanced",
    status: "in-progress",
    technologies: ["Solidity", "React", "Hardhat", "Ethers.js"],
    duration: "6 Weeks",
    likes: 189,
    bookmarks: 45,
    githubUrl: "https://github.com/toppermantra/defilocker",
    demoUrl: null,
    githubStats: {
      stars: 89,
      forks: 22,
      issues: 8,
      commits: 134
    },
    team: [
      { name: "Vikram Reddy", role: "Smart Contract Dev", avatar: "V" }
    ],
    openRoles: [
      { role: "Frontend Developer", description: "Build the Web3 integration UI." },
      { role: "Smart Contract Auditor", description: "Review Solidity code for vulnerabilities." }
    ],
    mentors: [],
    milestones: [
      { title: "Contract Writing", status: "completed", date: "Nov 1" },
      { title: "Testnet Deployment", status: "in-progress", date: "Nov 15" },
      { title: "Frontend Integration", status: "pending", date: "Nov 25" }
    ]
  }
];

export const mockTasks = [
  { id: "task-1", title: "Setup Project Repository", status: "completed", priority: "High", assignee: "Shray Dobhal" },
  { id: "task-2", title: "Design Database Schema", status: "completed", priority: "High", assignee: "Rahul Sharma" },
  { id: "task-3", title: "Implement Auth Flow", status: "in-progress", priority: "High", assignee: "Priya Singh" },
  { id: "task-4", title: "Create Dashboard UI", status: "todo", priority: "Medium", assignee: "Priya Singh" },
  { id: "task-5", title: "Write API Documentation", status: "backlog", priority: "Low", assignee: "Unassigned" },
  { id: "task-6", title: "Train ResNet50 Model", status: "in-progress", priority: "High", assignee: "Shray Dobhal" },
  { id: "task-7", title: "Code Review: Auth PR", status: "review", priority: "High", assignee: "Rahul Sharma" }
];
