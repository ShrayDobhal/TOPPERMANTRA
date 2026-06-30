// Mock Supabase Database Schema for Discover Phase R5

export const mockOpportunities = [
  {
    id: "opp-1",
    title: "Software Engineering Intern",
    company: "Stripe",
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg",
    location: "Remote / San Francisco",
    type: "Internship",
    workplaceType: "Remote",
    paidStatus: "Paid",
    stipend: "$8,000 / month",
    duration: "12 Weeks",
    deadline: "2024-11-15",
    daysLeft: 12,
    skills: ["React", "Go", "Distributed Systems"],
    applicants: 1240,
    category: "Trending Internships",
    matchScore: 94,
    description: "Join Stripe's core infrastructure team to build scalable financial services.",
    responsibilities: [
      "Design and implement backend services in Go.",
      "Optimize React components for the Stripe Dashboard.",
      "Collaborate with cross-functional teams."
    ],
    eligibility: "Currently pursuing a BS/MS in Computer Science.",
    benefits: "Stipend, WFH Setup, Mentorship."
  },
  {
    id: "opp-2",
    title: "Smart India Hackathon 2024",
    company: "MoE, Govt of India",
    logo: "https://www.sih.gov.in/img1/logo/SIH_logo_2024_horizontal.png",
    location: "Pan India",
    type: "Hackathon",
    workplaceType: "On-site",
    paidStatus: "Prize Pool",
    stipend: "₹1,00,000 Prize",
    duration: "36 Hours",
    deadline: "2024-10-25",
    daysLeft: 3,
    skills: ["Problem Solving", "Full Stack", "AI/ML"],
    applicants: 5400,
    category: "Hackathons",
    matchScore: 88,
    description: "World's largest open innovation model to solve real-world problems.",
    responsibilities: [
      "Build working prototypes for problem statements.",
      "Present to jury members."
    ],
    eligibility: "Open to all college students in India.",
    benefits: "Funding, Mentorship, Certificates."
  },
  {
    id: "opp-3",
    title: "ML Research Fellow",
    company: "OpenAI",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg",
    location: "San Francisco, CA",
    type: "Research",
    workplaceType: "Hybrid",
    paidStatus: "Paid",
    stipend: "$10,000 / month",
    duration: "6 Months",
    deadline: "2024-12-01",
    daysLeft: 28,
    skills: ["PyTorch", "Transformers", "Python"],
    applicants: 890,
    category: "Research Programs",
    matchScore: 76,
    description: "Contribute to cutting-edge research in large language models.",
    responsibilities: [
      "Run experiments on model alignment.",
      "Publish research papers."
    ],
    eligibility: "Prior research experience or strong ML portfolio.",
    benefits: "Compute resources, publication support."
  },
  {
    id: "opp-4",
    title: "Frontend Developer (Founding Team)",
    company: "Linear",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/c8/Linear_logo.svg",
    location: "Remote",
    type: "Startup Role",
    workplaceType: "Remote",
    paidStatus: "Paid",
    stipend: "$4,000 / month + Equity",
    duration: "Full Time",
    deadline: "2024-11-20",
    daysLeft: 17,
    skills: ["React", "TypeScript", "MobX"],
    applicants: 420,
    category: "Featured This Week",
    matchScore: 98,
    description: "Help us build the magical issue tracker for modern teams.",
    responsibilities: [
      "Build highly interactive UI components.",
      "Ensure 60fps performance."
    ],
    eligibility: "Strong eye for design and performance.",
    benefits: "Remote work, equity, great team."
  },
  {
    id: "opp-5",
    title: "Google Summer of Code 2024",
    company: "Google / Open Source",
    logo: "https://upload.wikimedia.org/wikipedia/commons/archive/8/8b/20210325143309%21Google_Summer_of_Code_logo.svg",
    location: "Global",
    type: "Open Source",
    workplaceType: "Remote",
    paidStatus: "Paid",
    stipend: "$1,500 - $3,000",
    duration: "12 Weeks",
    deadline: "2024-04-04",
    daysLeft: 0,
    skills: ["C++", "Python", "Git"],
    applicants: 12000,
    category: "Recommended For You",
    matchScore: 92,
    description: "Spend your summer writing code for open source organizations.",
    responsibilities: [
      "Submit a proposal.",
      "Code under mentorship."
    ],
    eligibility: "Students worldwide.",
    benefits: "Stipend, global network."
  },
  {
    id: "opp-6",
    title: "Product Design Fellow",
    company: "Airbnb",
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg",
    location: "Remote",
    type: "Internship",
    workplaceType: "Remote",
    paidStatus: "Paid",
    stipend: "$6,500 / month",
    duration: "10 Weeks",
    deadline: "2024-10-30",
    daysLeft: 8,
    skills: ["Figma", "Prototyping", "User Research"],
    applicants: 3100,
    category: "Trending Internships",
    matchScore: 89,
    description: "Design the future of travel with the Airbnb core product team.",
    responsibilities: [
      "Conduct user research.",
      "Design high-fidelity prototypes."
    ],
    eligibility: "Design students or recent grads.",
    benefits: "Travel credits, mentorship."
  },
  {
    id: "opp-7",
    title: "Grace Hopper Celebration Scholarship",
    company: "AnitaB.org",
    logo: "https://upload.wikimedia.org/wikipedia/en/2/29/Anita_Borg_Institute_for_Women_and_Technology_logo.png",
    location: "Orlando, FL",
    type: "Scholarship",
    workplaceType: "On-site",
    paidStatus: "Prize Pool",
    stipend: "Full Travel + Conference Pass",
    duration: "1 Week",
    deadline: "2024-09-01",
    daysLeft: 0,
    skills: ["Leadership", "Diversity", "Tech"],
    applicants: 4500,
    category: "Recommended For You",
    matchScore: 95,
    description: "Attend the world's largest gathering of women technologists.",
    responsibilities: [
      "Participate in career fairs.",
      "Network with global leaders."
    ],
    eligibility: "Women in computing.",
    benefits: "All expenses paid."
  },
  {
    id: "opp-8",
    title: "Backend Engineering Intern",
    company: "Discord",
    logo: "https://upload.wikimedia.org/wikipedia/en/9/98/Discord_logo.svg",
    location: "San Francisco, CA",
    type: "Internship",
    workplaceType: "Hybrid",
    paidStatus: "Paid",
    stipend: "$7,200 / month",
    duration: "12 Weeks",
    deadline: "2024-11-05",
    daysLeft: 14,
    skills: ["Rust", "Elixir", "System Design"],
    applicants: 2800,
    category: "Featured This Week",
    matchScore: 84,
    description: "Help scale Discord's real-time messaging infrastructure to millions of users.",
    responsibilities: [
      "Optimize real-time websocket connections.",
      "Write highly concurrent Rust code."
    ],
    eligibility: "Experience with systems programming.",
    benefits: "Housing stipend, free nitro."
  }
];

export const mockCompanies = [
  { id: "c1", name: "Stripe", logo: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg", openRoles: 12 },
  { id: "c2", name: "Linear", logo: "https://upload.wikimedia.org/wikipedia/commons/c/c8/Linear_logo.svg", openRoles: 4 },
  { id: "c3", name: "Vercel", logo: "https://assets.vercel.com/image/upload/v1588805858/repositories/vercel/logo.png", openRoles: 8 },
  { id: "c4", name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg", openRoles: 45 }
];

export const filterOptions = {
  types: ["Internship", "Hackathon", "Research", "Open Source", "Startup Role", "Scholarship"],
  workplace: ["Remote", "Hybrid", "On-site"],
  paid: ["Paid", "Unpaid", "Prize Pool"],
  experience: ["Beginner", "Intermediate", "Advanced"]
};

// Mock data for Application Tracker
export const mockApplications = [
  { id: 1, title: "Software Engineering Intern", company: "Stripe", status: "Interview", dateApplied: "2024-09-15" },
  { id: 2, title: "Frontend Developer", company: "Linear", status: "Applied", dateApplied: "2024-10-01" },
  { id: 3, title: "Smart India Hackathon", company: "MoE", status: "Shortlisted", dateApplied: "2024-08-20" },
  { id: 4, title: "SDE Intern", company: "Amazon", status: "Rejected", dateApplied: "2024-07-10" }
];
