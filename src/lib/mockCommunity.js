// Mock Supabase Database Schema for Community Phase R4

export const mockSpaces = [
  { id: "ai-builders", name: "AI Builders", icon: "🧠", members: 1240, online: 342, postsToday: 45, nextEvent: "LLM Fine-tuning Workshop" },
  { id: "web-dev", name: "Web Developers", icon: "💻", members: 3400, online: 890, postsToday: 120, nextEvent: "React 19 Deep Dive" },
  { id: "startups", name: "Startup Founders", icon: "🚀", members: 850, online: 156, postsToday: 24, nextEvent: "Pitch Deck Review" },
  { id: "open-source", name: "Open Source", icon: "🌍", members: 2100, online: 450, postsToday: 67, nextEvent: "GSoC Prep Session" },
  { id: "hackathons", name: "Hackathon Hub", icon: "🏆", members: 4200, online: 1200, postsToday: 210, nextEvent: "SIH Team Formation" },
  { id: "cp", name: "Competitive Programming", icon: "⚡", members: 1800, online: 320, postsToday: 55, nextEvent: "Codeforces Div 2 Watchparty" },
  { id: "product", name: "Product Managers", icon: "📊", members: 950, online: 110, postsToday: 18, nextEvent: "Case Study Breakdown" },
  { id: "security", name: "Cyber Security", icon: "🛡️", members: 1100, online: 230, postsToday: 30, nextEvent: "CTF Practice" }
];

export const mockChapters = [
  { id: "iit-d", name: "IIT Delhi", members: 850, activeDiscussions: 12, topEvent: "Rendezvous Hack", logoUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/f/fd/Indian_Institute_of_Technology_Delhi_Logo.svg/1200px-Indian_Institute_of_Technology_Delhi_Logo.svg.png" },
  { id: "bits-p", name: "BITS Pilani", members: 720, activeDiscussions: 8, topEvent: "APOGEE Showcase", logoUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/BITS_Pilani-Logo.svg/1200px-BITS_Pilani-Logo.svg.png" },
  { id: "dtu", name: "Delhi Technological University", members: 1200, activeDiscussions: 24, topEvent: "Engifest Tech", logoUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b5/DTU%2C_Delhi_official_logo.png/220px-DTU%2C_Delhi_official_logo.png" },
  { id: "vips", name: "VIPS Delhi", members: 450, activeDiscussions: 5, topEvent: "Init() Hackathon", logoUrl: "https://vips.edu/wp-content/uploads/2022/10/VIPS-Logo-1.png" },
  { id: "nsut", name: "NSUT", members: 980, activeDiscussions: 15, topEvent: "Moksha Innovate", logoUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/6/60/Netaji_Subhas_University_of_Technology.svg/1200px-Netaji_Subhas_University_of_Technology.svg.png" },
  { id: "mait", name: "MAIT", members: 600, activeDiscussions: 9, topEvent: "TechSurge", logoUrl: "https://mait.ac.in/images/logo.png" }
];

export const mockThreads = [
  { id: 1, title: "How should I prepare for SIH 2024?", author: "Rahul Sharma", category: "Hackathons", replies: 24, views: 342, timeAgo: "2 hours ago", avatar: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=150" },
  { id: 2, title: "Google STEP Interview Experience & Questions", author: "Priya Patel", category: "Interviews", replies: 45, views: 1205, timeAgo: "5 hours ago", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" },
  { id: 3, title: "Looking for React teammates for upcoming hackathon", author: "Amit Kumar", category: "Teambuilding", replies: 8, views: 156, timeAgo: "1 day ago", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150" },
  { id: 4, title: "Resume Review Thread - Post yours here!", author: "Admin Sarah", category: "Career", replies: 112, views: 2400, timeAgo: "2 days ago", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150" },
  { id: 5, title: "Best AI Projects to build in 2024?", author: "Kabir Khan", category: "Projects", replies: 34, views: 890, timeAgo: "3 days ago", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150" }
];

export const mockAnnouncements = [
  { id: 1, title: "🚀 Platform Update: Real-time Collab is Live!", content: "You can now collaborate on projects in real-time. Join the #projects space to test it out.", date: "Today, 10:00 AM", type: "Platform" },
  { id: 2, title: "🏆 Smart India Hackathon Registration Open", content: "Form your teams in the Hackathon Hub and apply before Friday.", date: "Yesterday", type: "Hackathon" },
  { id: 3, title: "💼 New Internship Opportunities Posted", content: "Check the #internships channel for exclusive openings at Stripe and Linear.", date: "Oct 12", type: "Career" }
];

export const mockEvents = [
  { id: 1, title: "Mastering System Design", type: "Masterclass", date: "Sat, Oct 15", time: "6:00 PM IST", host: "Sandeep (Ex-Amazon)", seats: "45 left" },
  { id: 2, title: "Resume Roasting Session", type: "Workshop", date: "Sun, Oct 16", time: "4:00 PM IST", host: "Topper Mantra Team", seats: "Filling fast" },
  { id: 3, title: "Open Source Contribution Walkthrough", type: "Live Coding", date: "Wed, Oct 19", time: "7:00 PM IST", host: "Neha (GSoC '23)", seats: "120 seats" }
];

export const mockLeaderboard = [
  { rank: 1, name: "Vikram Singh", xp: 12450, badges: ["Top Helper", "React Pro"], avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150" },
  { rank: 2, name: "Anjali Gupta", xp: 11200, badges: ["Top Builder"], avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" },
  { rank: 3, name: "Rohan Desai", xp: 9800, badges: ["Mentor"], avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150" },
  { rank: 4, name: "Neha Verma", xp: 8400, badges: ["Hackathon Winner"], avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150" },
  { rank: 5, name: "Kabir Khan", xp: 7200, badges: ["Open Source"], avatar: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=150" }
];
