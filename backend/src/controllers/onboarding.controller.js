const prisma = require('../config/prisma');
const { successResponse, errorResponse } = require('../utils/apiResponse');
const { onboardingSchema } = require('../validators/user.schema');

exports.submitOnboarding = async (req, res, next) => {
  try {
    const { userId } = req.auth;
    const body = req.body;

    // Validate request body
    const validatedData = onboardingSchema.parse(body);

    // Extract relation data
    const { skills, interests, ...userData } = validatedData;

    // We do this in a transaction to ensure all or nothing is saved
    const result = await prisma.$transaction(async (tx) => {
      // 1. Update User basic info
      const updatedUser = await tx.user.update({
        where: { clerkId: userId },
        data: {
          ...userData,
          xp: 100, // Award initial XP for completing onboarding
          level: 1,
        }
      });

      // 2. Clear existing skills/interests if any (for idempotency)
      await tx.userSkill.deleteMany({ where: { userId: updatedUser.id } });
      await tx.userInterest.deleteMany({ where: { userId: updatedUser.id } });

      // 3. Insert new skills
      if (skills && skills.length > 0) {
        await tx.userSkill.createMany({
          data: skills.map(skill => ({
            userId: updatedUser.id,
            skill
          }))
        });
      }

      // 4. Insert new interests
      if (interests && interests.length > 0) {
        await tx.userInterest.createMany({
          data: interests.map(interest => ({
            userId: updatedUser.id,
            interest
          }))
        });
      }

      // Return fully populated user
      return await tx.user.findUnique({
        where: { id: updatedUser.id },
        include: { skills: true, interests: true }
      });
    });

    return successResponse(res, 200, 'Onboarding completed successfully', { user: result });

  } catch (error) {
    next(error);
  }
};
