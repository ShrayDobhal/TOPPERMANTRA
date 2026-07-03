const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getProjects = async (req, res, next) => {
  try {
    const projects = await prisma.project.findMany({
      include: {
        subparts: true
      }
    });

    res.status(200).json({ success: true, data: projects });
  } catch (error) {
    next(error);
  }
};

exports.claimSubpart = async (req, res, next) => {
  try {
    const { subpartId } = req.body;
    const userId = req.user?.id || (await prisma.user.findFirst({ where: { email: 'shray@example.com' } })).id;

    // Check how many claims the user has
    const activeClaims = await prisma.projectSubpart.count({
      where: { claimedById: userId, status: 'claimed' }
    });

    if (activeClaims >= 2) {
      return res.status(400).json({ success: false, message: 'Max claims reached (2)' });
    }

    const subpart = await prisma.projectSubpart.update({
      where: { id: subpartId },
      data: {
        status: 'claimed',
        claimedById: userId,
        claimedAt: new Date(),
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) // 3 days
      }
    });

    res.status(200).json({ success: true, data: subpart });
  } catch (error) {
    next(error);
  }
};

exports.requestAid = async (req, res, next) => {
  try {
    const { subpartId, type, content, videoUrl } = req.body;
    const userId = req.user?.id || (await prisma.user.findFirst({ where: { email: 'shray@example.com' } })).id;

    const aidRequest = await prisma.aidRequest.create({
      data: { subpartId, userId, type, content, videoUrl, status: 'open' }
    });
    res.status(201).json({ success: true, data: aidRequest });
  } catch (error) { next(error); }
};

exports.submitReview = async (req, res, next) => {
  try {
    const { subpartId, codeUrl, demoUrl } = req.body;
    const userId = req.user?.id || (await prisma.user.findFirst({ where: { email: 'shray@example.com' } })).id;

    const submission = await prisma.submission.create({
      data: { subpartId, userId, codeUrl, demoUrl, status: 'pending' }
    });
    res.status(201).json({ success: true, data: submission });
  } catch (error) { next(error); }
};

exports.joinWaitlist = async (req, res, next) => {
  try {
    const { subpartId } = req.body;
    const userId = req.user?.id || (await prisma.user.findFirst({ where: { email: 'shray@example.com' } })).id;

    const currentWaitlist = await prisma.waitlist.findMany({ where: { subpartId }, orderBy: { position: 'desc' }, take: 1 });
    const position = currentWaitlist.length > 0 ? currentWaitlist[0].position + 1 : 1;

    const waitlist = await prisma.waitlist.create({
      data: { subpartId, userId, position }
    });
    res.status(201).json({ success: true, data: waitlist });
  } catch (error) { next(error); }
};
