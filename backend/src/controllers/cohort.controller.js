const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getCohort = async (req, res, next) => {
  try {
    const userId = req.user?.id || (await prisma.user.findFirst({ where: { email: 'shray@example.com' } })).id;
    
    // Find cohort for this user
    const member = await prisma.cohortMember.findFirst({
      where: { userId },
      include: {
        cohort: {
          include: {
            members: {
              include: { user: true }
            },
            challenges: {
              include: { responses: { include: { user: true } } },
              orderBy: { week: 'desc' },
              take: 1
            }
          }
        }
      }
    });

    if (!member) {
      return res.status(404).json({ success: false, message: 'No cohort found' });
    }

    res.status(200).json({ success: true, data: member.cohort });
  } catch (error) {
    next(error);
  }
};

exports.postResponse = async (req, res, next) => {
  try {
    const { challengeId, content } = req.body;
    const userId = req.user?.id || (await prisma.user.findFirst({ where: { email: 'shray@example.com' } })).id;

    const response = await prisma.challengeResponse.create({
      data: { challengeId, userId, content, upvotes: 0 },
      include: { user: true }
    });
    res.status(201).json({ success: true, data: response });
  } catch (error) {
    next(error);
  }
};

exports.upvoteResponse = async (req, res, next) => {
  try {
    const { responseId } = req.params;
    const response = await prisma.challengeResponse.update({
      where: { id: responseId },
      data: { upvotes: { increment: 1 } },
      include: { user: true }
    });
    res.status(200).json({ success: true, data: response });
  } catch (error) {
    next(error);
  }
};
