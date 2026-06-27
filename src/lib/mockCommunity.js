export const mockChapters = [
  {
    id: "nsut-chapter",
    name: "NSUT Chapter",
    type: "College",
    description: "The official Netaji Subhas University of Technology builder community. Connect with peers, join study groups, and build projects together.",
    coverImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1200",
    avatar: "N",
    memberCount: 1450,
    isJoined: true,
    tags: ["Engineering", "Delhi", "Startups"]
  },
  {
    id: "ai-builders",
    name: "AI Builders",
    type: "Interest",
    description: "A community for students passionate about Artificial Intelligence, Machine Learning, and Neural Networks.",
    coverImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1200",
    avatar: "🤖",
    memberCount: 8900,
    isJoined: true,
    tags: ["AI", "ML", "Python"]
  },
  {
    id: "dtu-chapter",
    name: "DTU Chapter",
    type: "College",
    description: "Delhi Technological University's hub for innovation, hackathons, and placements.",
    coverImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1200",
    avatar: "D",
    memberCount: 2100,
    isJoined: false,
    tags: ["Engineering", "Delhi"]
  }
];

export const mockPosts = [
  {
    id: "post-1",
    author: {
      name: "Aditya Verma",
      avatar: "A",
      role: "Top Contributor",
      college: "NSUT"
    },
    communityId: "nsut-chapter",
    communityName: "NSUT Chapter",
    title: "How to crack Google Summer of Code (GSoC) in 2027?",
    content: "I've been preparing for GSoC and wanted to share my roadmap. The most important thing is to start contributing to open source early. Don't wait for the organizations to be announced. Pick a project you actually use (like VLC, Mozilla, or some React libraries) and start looking at 'good first issues'.\n\n### My Checklist:\n1. Learn Git & GitHub properly\n2. Setup the local environment for at least 2 projects\n3. Join their Discord/Slack channels\n4. Be polite when asking for help\n\nWho else is targeting GSoC this year?",
    timestamp: "2 hours ago",
    upvotes: 245,
    downvotes: 12,
    commentCount: 48,
    tags: ["GSoC", "Open Source", "Advice"]
  },
  {
    id: "post-2",
    author: {
      name: "Priya Singh",
      avatar: "P",
      role: "Member",
      college: "IIIT Delhi"
    },
    communityId: "ai-builders",
    communityName: "AI Builders",
    title: "Need teammates for the upcoming Smart India Hackathon!",
    content: "Our team is currently looking for a strong frontend developer who knows React and TailwindCSS. We are building an AI-powered healthcare diagnostic tool. We already have 2 ML engineers and 1 backend dev. Drop your GitHub profiles below if you are interested!",
    timestamp: "5 hours ago",
    upvotes: 120,
    downvotes: 2,
    commentCount: 15,
    tags: ["Hackathon", "Recruiting", "SIH"]
  },
  {
    id: "post-3",
    author: {
      name: "Dr. Arvind Gupta",
      avatar: "AG",
      role: "Mentor",
      college: "Microsoft"
    },
    communityId: "ai-builders",
    communityName: "AI Builders",
    title: "AMA: I'm a Senior AI Researcher at Microsoft. Ask me anything!",
    content: "Hi everyone! I've been working in the AI industry for over 15 years, starting from early NLP models to modern LLMs. I'll be answering questions for the next 2 hours about career paths, research vs engineering, and what companies look for in fresh graduates.",
    timestamp: "1 day ago",
    upvotes: 890,
    downvotes: 5,
    commentCount: 234,
    tags: ["AMA", "Career", "Mentorship"]
  }
];

export const mockComments = [
  {
    id: "comment-1",
    author: { name: "Rahul Sharma", avatar: "R", role: "Member" },
    content: "This is exactly what I needed! Do you recommend focusing on Python or C++ for the open source projects?",
    timestamp: "1 hour ago",
    upvotes: 45,
    isAccepted: false,
    replies: [
      {
        id: "reply-1",
        author: { name: "Aditya Verma", avatar: "A", role: "Author" },
        content: "Honestly, Python is much more beginner-friendly for GSoC because there are tons of scientific computing and web organizations that use it. C++ is great if you want to contribute to core systems or game engines.",
        timestamp: "45 mins ago",
        upvotes: 20
      }
    ]
  },
  {
    id: "comment-2",
    author: { name: "Sneha Patel", avatar: "S", role: "Member" },
    content: "I started contributing to a Python project last month. The maintainers are super helpful if you just ask questions properly instead of demanding answers.",
    timestamp: "30 mins ago",
    upvotes: 15,
    isAccepted: true,
    replies: []
  }
];

export const mockEvents = [
  {
    id: "event-1",
    title: "Mastering React Hooks Workshop",
    community: "Web Dev Hub",
    date: "Tomorrow, 6:00 PM",
    attendees: 120,
    type: "Virtual"
  },
  {
    id: "event-2",
    title: "NSUT Offline Meetup & Pitch Session",
    community: "NSUT Chapter",
    date: "Oct 15, 2:00 PM",
    attendees: 45,
    type: "In-Person"
  }
];
