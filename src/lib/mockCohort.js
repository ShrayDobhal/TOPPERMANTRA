// ============================================================
// Mock Cohort Data — 50-student groups with challenges
// Maps to PRD Pillar 1: The Cohort (Group Mentorship)
// ============================================================

export const cohortMentor = {
  id: 'mentor-001',
  name: 'Dr. Amit Kumar',
  title: 'Senior Software Engineer',
  institution: 'IIT Delhi',
  avatar: null,
  specialization: 'Full-Stack Development & System Design',
  isOnline: true,
};

export const currentCohort = {
  id: 'cohort-cs-01',
  name: 'CS/IT Cohort Alpha',
  branch: 'CS/IT',
  mentorId: 'mentor-001',
  mentor: cohortMentor,
  maxSize: 50,
  activeMembers: 47,
  removedMembers: 3,
  createdAt: '2026-05-01T00:00:00',
  currentWeek: 9,
};

// ---- Cohort Members (50 students) ----
const firstNames = ['Aarav', 'Priya', 'Rohan', 'Sneha', 'Vikram', 'Ananya', 'Karan', 'Diya', 'Arjun', 'Meera',
  'Aditya', 'Pooja', 'Rahul', 'Nisha', 'Amit', 'Kavya', 'Sanjay', 'Riya', 'Deepak', 'Simran',
  'Manish', 'Anjali', 'Suresh', 'Neha', 'Rajesh', 'Tanvi', 'Vivek', 'Divya', 'Harish', 'Sakshi',
  'Gaurav', 'Ishita', 'Nikhil', 'Shruti', 'Pankaj', 'Bhavna', 'Kunal', 'Tanya', 'Mohit', 'Ritika',
  'Varun', 'Megha', 'Akash', 'Pallavi', 'Siddharth', 'Komal', 'Ashish', 'Swati', 'Tushar', 'Jyoti'];

const lastInitials = ['K', 'M', 'S', 'D', 'T', 'P', 'R', 'B', 'G', 'V',
  'L', 'N', 'C', 'J', 'A', 'H', 'F', 'W', 'E', 'I',
  'O', 'U', 'X', 'Y', 'Z', 'K', 'M', 'S', 'D', 'T',
  'P', 'R', 'B', 'G', 'V', 'L', 'N', 'C', 'J', 'A',
  'H', 'F', 'W', 'E', 'I', 'O', 'U', 'X', 'Y', 'Z'];

const colleges = ['UPES Dehradun', 'SRM Chennai', 'VIT Vellore', 'Manipal University', 'Amity Noida',
  'LPU Jalandhar', 'Chitkara University', 'KIIT Bhubaneswar', 'Chandigarh University', 'Thapar University'];

export const cohortMembers = firstNames.map((name, i) => {
  const daysInactive = i < 35 ? Math.floor(Math.random() * 5) : // Active
    i < 44 ? Math.floor(Math.random() * 10) + 5 : // Somewhat inactive
    Math.floor(Math.random() * 7) + 14; // Flagged

  let status = 'active';
  if (i >= 47) status = 'removed';
  else if (daysInactive >= 14 && daysInactive < 21) status = 'yellow';
  else if (daysInactive >= 21) status = 'red';

  return {
    id: `mem-${String(i + 1).padStart(3, '0')}`,
    name: `${name} ${lastInitials[i]}.`,
    college: colleges[i % colleges.length],
    contributionScore: Math.floor(Math.random() * 3000) + 500,
    streak: status === 'active' ? Math.floor(Math.random() * 30) + 1 : 0,
    status,
    daysInactive,
    lastActivityAt: new Date(Date.now() - daysInactive * 86400000).toISOString(),
    joinedAt: '2026-05-01T00:00:00',
    challengesCompleted: Math.floor(Math.random() * 8) + 1,
    isCurrentUser: i === 13, // Shray is at position 14 (rank #14)
  };
});

// ---- Weekly Mastery Challenges ----
export const weeklyChallenge = {
  id: 'challenge-w9',
  cohortId: 'cohort-cs-01',
  week: 9,
  title: 'Design a Rate Limiter for an API Gateway',
  description: `You are building a rate limiter for a production API gateway that handles 10,000 requests per second. Design a system that:

1. Supports multiple rate limiting algorithms (Token Bucket, Sliding Window)
2. Works in a distributed environment (multiple servers)
3. Handles edge cases like clock drift and network partitions
4. Returns proper HTTP 429 responses with Retry-After headers

**Deliverable**: Post your solution as pseudocode or working code. Explain your algorithm choice and tradeoffs.`,
  postedBy: 'mentor-001',
  postedAt: '2026-06-30T09:00:00',
  deadline: '2026-07-06T23:59:00',
  responsesCount: 23,
  status: 'active', // active | closed
};

export const previousChallenges = [
  {
    id: 'challenge-w8',
    week: 8,
    title: 'Build a URL Shortener with Analytics',
    responsesCount: 38,
    topResponder: 'Aarav K.',
    status: 'closed',
    postedAt: '2026-06-23T09:00:00',
  },
  {
    id: 'challenge-w7',
    week: 7,
    title: 'Implement a LRU Cache from Scratch',
    responsesCount: 42,
    topResponder: 'Priya M.',
    status: 'closed',
    postedAt: '2026-06-16T09:00:00',
  },
  {
    id: 'challenge-w6',
    week: 6,
    title: 'Design a Notification Service Architecture',
    responsesCount: 31,
    topResponder: 'Vikram T.',
    status: 'closed',
    postedAt: '2026-06-09T09:00:00',
  },
];

// ---- Challenge Responses (for current challenge) ----
export const challengeResponses = [
  {
    id: 'resp-001',
    challengeId: 'challenge-w9',
    userId: 'mem-001',
    userName: 'Aarav K.',
    content: `## Token Bucket Approach

I'd use a **Token Bucket algorithm** with Redis as the distributed state store.

\`\`\`python
class TokenBucket:
    def __init__(self, rate, capacity):
        self.rate = rate
        self.capacity = capacity
        
    def allow_request(self, key):
        # Use Redis MULTI/EXEC for atomicity
        tokens = redis.get(f"tokens:{key}")
        last_refill = redis.get(f"refill:{key}")
        # Refill tokens based on elapsed time
        elapsed = time.now() - last_refill
        new_tokens = min(self.capacity, tokens + elapsed * self.rate)
        if new_tokens >= 1:
            redis.set(f"tokens:{key}", new_tokens - 1)
            return True
        return False
\`\`\`

**Why Token Bucket?** It naturally handles burst traffic while maintaining a steady average rate. The Redis-backed approach ensures distributed consistency.

**Tradeoffs**: Slightly higher latency due to Redis calls. Could use local cache with periodic sync for ultra-low latency scenarios.`,
    upvotes: 12,
    createdAt: '2026-06-30T14:30:00',
  },
  {
    id: 'resp-002',
    challengeId: 'challenge-w9',
    userId: 'mem-004',
    userName: 'Sneha D.',
    content: `## Sliding Window Log

I prefer the **Sliding Window Log** for precision. Each request timestamp is logged, and we count requests in the window.

Key advantage: No burst issues like fixed window counters.
Key disadvantage: Memory-heavy at scale.

For distributed systems, I'd use a Lua script in Redis to make the check-and-increment atomic.`,
    upvotes: 8,
    createdAt: '2026-07-01T10:15:00',
  },
  {
    id: 'resp-003',
    challengeId: 'challenge-w9',
    userId: 'stu-001',
    userName: 'Shray D.',
    content: `## Hybrid: Sliding Window Counter

I'd combine Fixed Window + Sliding Window for the best of both worlds.

The idea: Use two adjacent fixed windows and weight the count based on the overlap percentage with the sliding window.

This gives near-perfect accuracy with O(1) memory per user — much better than sliding window log.

For distributed setup, I'd use Redis Cluster with hash slots to partition by user ID.`,
    upvotes: 15,
    createdAt: '2026-07-01T16:45:00',
    isCurrentUser: true,
  },
];
