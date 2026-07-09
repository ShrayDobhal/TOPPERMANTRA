export const showcaseMentors = [
  {
    id: "m1",
    firstName: "Rahul",
    lastName: "Sharma",
    avatarUrl: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=400&q=80",
    college: "IIT Delhi",
    degree: "B.Tech Computer Science",
    company: "Google",
    role: "Software Engineer",
    expertise: "Web Development",
    categories: ["Web Development", "System Design"],
    experienceType: "Alumni", // Student, Alumni, Founder, Industry
    yearsOfExperience: 3,
    achievements: ["SIH National Winner", "Google Summer of Code"],
    languages: ["English", "Hindi"],
    rating: 4.9,
    totalSessions: 220,
    price: 0, // Free mentorship
    isAvailable: true,
    bio: "I graduated from IIT Delhi in 2023 and currently work at Google on the Chrome V8 team. I specialize in frontend architectures, open-source contributions, and scaling web applications.",
    journey: "Started coding in 11th grade. Struggled with DSA until my 2nd year. Cracked GSoC in 3rd year which changed my entire trajectory. Now, I want to help you do the same.",
    projects: [
      { name: "React Flow Extension", link: "github.com/rahul/react-flow-ext" },
      { name: "Open source portfolio template", link: "github.com/rahul/portfolio" }
    ],
    reviews: [
      { studentName: "Aman Gupta", rating: 5, text: "Rahul's mock interview was harder than my actual Google interview. Incredibly helpful.", date: "2 weeks ago" },
      { studentName: "Priya Das", rating: 5, text: "Helped me structure my GSoC proposal perfectly.", date: "1 month ago" }
    ],
    skills: ["React", "Node.js", "System Design", "Open Source"]
  },
  {
    id: "m2",
    firstName: "Neha",
    lastName: "Kapoor",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
    college: "BITS Pilani",
    degree: "M.Sc Data Science",
    company: "OpenAI",
    role: "Research Intern",
    expertise: "AI",
    categories: ["AI", "ML", "Research"],
    experienceType: "Student",
    yearsOfExperience: 2,
    achievements: ["Published at NeurIPS", "Kaggle Grandmaster"],
    languages: ["English"],
    rating: 5.0,
    totalSessions: 85,
    price: 0,
    isAvailable: true,
    bio: "Currently a final year student at BITS Pilani. I've spent the last 2 years deep diving into LLMs and generative AI. My research focuses on model efficiency.",
    journey: "Shifted from Web Dev to AI in my sophomore year. Failed 10+ research internship interviews before landing my first big break. I know exactly what top labs look for.",
    projects: [
      { name: "Mini-Transformer Implementation", link: "github.com/neha/mini-t" }
    ],
    reviews: [
      { studentName: "Karan Singh", rating: 5, text: "Neha explained backpropagation better than my professor ever did.", date: "3 weeks ago" }
    ],
    skills: ["PyTorch", "NLP", "Machine Learning", "Research Papers"]
  },
  {
    id: "m3",
    firstName: "Arjun",
    lastName: "Reddy",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    college: "IIT Bombay",
    degree: "B.Tech Electrical",
    company: "BuildSpace",
    role: "Founder",
    expertise: "Startup",
    categories: ["Startup", "Product", "Web Development"],
    experienceType: "Founder",
    yearsOfExperience: 4,
    achievements: ["Raised $2M Seed", "Y-Combinator W22"],
    languages: ["English", "Telugu", "Hindi"],
    rating: 4.8,
    totalSessions: 310,
    price: 500, // INR per session
    isAvailable: false,
    bio: "Dropped out of IITB to build my first startup. Sold it for a modest exit. Now building my second company. I mentor students who want to build products, not just pass exams.",
    journey: "Realized early on that CGPA isn't everything. Started building SaaS tools in dorm room. I can help you validate ideas, get first users, and raise capital.",
    projects: [],
    reviews: [
      { studentName: "Sanya M.", rating: 5, text: "Arjun tore my pitch deck apart and helped me rebuild it. We got funded a month later.", date: "1 week ago" }
    ],
    skills: ["Product Management", "Growth", "Next.js", "Fundraising"]
  },
  {
    id: "m4",
    firstName: "Sneha",
    lastName: "Iyer",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    college: "NIT Trichy",
    degree: "B.Tech CSE",
    company: "Atlassian",
    role: "SDE-2",
    expertise: "DSA",
    categories: ["DSA", "Competitive Programming", "Career"],
    experienceType: "Industry",
    yearsOfExperience: 3,
    achievements: ["ICPC Regional Finalist", "Codeforces Candidate Master"],
    languages: ["English", "Tamil"],
    rating: 4.9,
    totalSessions: 150,
    price: 0,
    isAvailable: true,
    bio: "I help students crack FAANG interviews. I specialize in teaching dynamic programming and graph algorithms in an intuitive way.",
    journey: "Was a completely average student until I discovered competitive programming. It changed how I approach problem-solving entirely.",
    projects: [],
    reviews: [
      { studentName: "Rohan D.", rating: 5, text: "Finally understood DP thanks to Sneha!", date: "2 months ago" }
    ],
    skills: ["C++", "Java", "Algorithms", "Interview Prep"]
  },
  {
    id: "m5",
    firstName: "Vikram",
    lastName: "Singh",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    college: "IIIT Hyderabad",
    degree: "B.Tech CSE",
    company: "Amazon",
    role: "Senior SDE",
    expertise: "Backend Design",
    categories: ["System Design", "Web Development", "Career"],
    experienceType: "Industry",
    yearsOfExperience: 5,
    achievements: ["Amazon Bar Raiser", "Top 1% Leetcode"],
    languages: ["English", "Hindi"],
    rating: 4.8,
    totalSessions: 420,
    price: 300,
    isAvailable: true,
    bio: "Backend specialist focusing on distributed systems and microservices. I conduct actual interviews at Amazon and know exactly what we look for in SDE-1 and SDE-2 candidates.",
    journey: "Failed my first 5 tech interviews out of college. Spent a year mastering system design and eventually cracked Amazon. I'll teach you the frameworks to never fail a system design round.",
    projects: [],
    reviews: [
      { studentName: "Rajat Verma", rating: 5, text: "Vikram's system design mock interview was a game changer.", date: "4 days ago" }
    ],
    skills: ["AWS", "Microservices", "Java", "System Architecture"]
  },
  {
    id: "m6",
    firstName: "Pooja",
    lastName: "Desai",
    avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80",
    college: "NID Ahmedabad",
    degree: "M.Des Interaction Design",
    company: "Airbnb",
    role: "Product Designer",
    expertise: "UI/UX",
    categories: ["Design", "Product"],
    experienceType: "Alumni",
    yearsOfExperience: 3,
    achievements: ["Awwwards Winner", "Design systems expert"],
    languages: ["English", "Gujarati"],
    rating: 5.0,
    totalSessions: 112,
    price: 0,
    isAvailable: true,
    bio: "Helping developers understand design, and helping designers build portfolios that actually get them hired. I specialize in UX research and high-fidelity prototyping.",
    journey: "Transitioned from a pure engineering background to design. It's the best decision I ever made.",
    projects: [],
    reviews: [
      { studentName: "Anjali T.", rating: 5, text: "Pooja completely roasted my portfolio, and it was exactly what I needed. Landed a gig 2 weeks later.", date: "1 month ago" }
    ],
    skills: ["Figma", "User Research", "Prototyping", "Design Systems"]
  }
];

export const filterOptions = {
  colleges: ["IIT Delhi", "IIT Bombay", "IIT Kanpur", "IIT Madras", "IIT Roorkee", "IIT Kharagpur", "BITS Pilani", "IIIT Hyderabad", "NIT Trichy"],
  categories: ["AI", "ML", "Web Development", "Competitive Programming", "DSA", "System Design", "Research", "Blockchain", "Product", "Startup", "Career"],
  experience: ["Student", "Alumni", "Founder", "Industry"]
};
