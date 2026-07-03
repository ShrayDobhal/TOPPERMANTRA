const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getCommunity = async (req, res, next) => {
  try {
    const channels = await prisma.channel.findMany();
    const posts = await prisma.hubPost.findMany({
      include: {
        user: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.status(200).json({ success: true, channels, posts });
  } catch (error) {
    next(error);
  }
};

exports.createPost = async (req, res, next) => {
  try {
    const { title, content, tag, channelId } = req.body;
    const userId = req.user?.id || (await prisma.user.findFirst({ where: { email: 'shray@example.com' } })).id;

    // Rate Limiting Logic (Max posts per day based on user level)
    const user = await prisma.user.findUnique({ where: { id: userId } });
    const maxPosts = user.level >= 10 ? 5 : 3;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const postsToday = await prisma.hubPost.count({
      where: {
        userId,
        createdAt: { gte: today }
      }
    });

    if (postsToday >= maxPosts) {
      return res.status(429).json({ success: false, message: `Rate limit reached. You can only post ${maxPosts} times per day.` });
    }

    const post = await prisma.hubPost.create({
      data: {
        title,
        content,
        tag,
        channelId: channelId || 'ch-global',
        userId,
        upvotes: 0,
      },
      include: {
        user: true
      }
    });

    res.status(201).json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};

exports.upvotePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const post = await prisma.hubPost.update({
      where: { id: postId },
      data: { upvotes: { increment: 1 } },
      include: { user: true }
    });

    res.status(200).json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};

exports.upvoteComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const comment = await prisma.hubComment.update({
      where: { id: commentId },
      data: { upvotes: { increment: 1 } },
      include: { user: true }
    });
    res.status(200).json({ success: true, data: comment });
  } catch (error) {
    next(error);
  }
};
