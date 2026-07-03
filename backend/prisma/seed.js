const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create test user (Shray)
  const user = await prisma.user.upsert({
    where: { email: 'shray@example.com' },
    update: {},
    create: {
      clerkId: 'user_2m1x1',
      email: 'shray@example.com',
      fullName: 'Shray D.',
      college: 'UPES Dehradun',
      branch: 'CS/IT',
      year: '3rd Year',
      level: 8,
      contributionScore: 2480,
      streak: 21,
      longestStreak: 34,
      xp: 1240,
    },
  });

  // Create Mentor
  const mentorId = 'mentor-001';
  
  // Create Cohort
  const cohort = await prisma.cohort.create({
    data: {
      name: 'CS/IT Cohort Alpha',
      branch: 'CS/IT',
      mentorId: mentorId,
      mentorName: 'Dr. Amit Kumar',
      mentorInstitution: 'IIT Delhi',
      maxSize: 50,
      currentWeek: 9,
    }
  });

  // Add Current User to Cohort
  await prisma.cohortMember.create({
    data: {
      userId: user.id,
      cohortId: cohort.id,
      status: 'active',
    }
  });

  // Create Cohort Challenge
  await prisma.cohortChallenge.create({
    data: {
      cohortId: cohort.id,
      week: 9,
      title: 'Design a Rate Limiter for an API Gateway',
      description: 'You are building a rate limiter...',
      postedBy: mentorId,
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    }
  });

  // Create Projects
  const project1 = await prisma.project.create({
    data: {
      title: 'Food Delivery App',
      description: 'Build a full-stack food delivery platform with real-time order tracking, payment integration, and restaurant management dashboard.',
      mentorId: mentorId,
      mentorName: 'Dr. Amit Kumar',
      mentorInstitution: 'IIT Delhi',
      branch: 'CS/IT',
      techStack: '["React", "Node.js", "PostgreSQL", "Stripe", "Socket.io"]',
      difficulty: 'Advanced',
    }
  });

  // Create Subparts
  await prisma.projectSubpart.create({
    data: {
      projectId: project1.id,
      title: 'Payment Gateway Integration',
      description: 'Integrate Stripe payment gateway with order checkout flow. Handle payment success, failure, and refund scenarios.',
      status: 'claimed',
      difficulty: 'Advanced',
      estimatedHours: 16,
      xpReward: 300,
      claimedById: user.id,
      claimedAt: new Date(),
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    }
  });

  await prisma.projectSubpart.create({
    data: {
      projectId: project1.id,
      title: 'Cart & Checkout Flow',
      description: 'Build the shopping cart with add/remove items, quantity management, and a multi-step checkout process.',
      status: 'available',
      difficulty: 'Intermediate',
      estimatedHours: 14,
      xpReward: 250,
    }
  });

  // Create Community Channels
  const channel = await prisma.channel.create({
    data: {
      name: 'CS/IT',
      branch: 'CS/IT',
      type: 'branch',
    }
  });

  // Create Post
  const post = await prisma.hubPost.create({
    data: {
      channelId: channel.id,
      userId: user.id,
      tag: 'Showcase',
      title: 'I built a real-time collaborative code editor',
      content: 'Used CRDTs + WebSockets to build a Google Docs-like code editor.',
      upvotes: 56,
    }
  });

  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
