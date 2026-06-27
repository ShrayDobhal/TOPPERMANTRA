const prisma = require('../config/prisma');
const { successResponse, errorResponse } = require('../utils/apiResponse');
const { profileUpdateSchema } = require('../validators/user.schema');

exports.getProfile = async (req, res, next) => {
  try {
    const { userId } = req.auth;

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: {
        skills: true,
        interests: true,
      }
    });

    if (!user) {
      return errorResponse(res, 404, 'User not found');
    }

    return successResponse(res, 200, 'User profile retrieved', { user });

  } catch (error) {
    next(error);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { userId } = req.auth;
    const body = req.body;

    const validatedData = profileUpdateSchema.parse(body);

    const { skills, interests, ...userData } = validatedData;

    const result = await prisma.$transaction(async (tx) => {
      const updatedUser = await tx.user.update({
        where: { clerkId: userId },
        data: userData
      });

      if (skills) {
        await tx.userSkill.deleteMany({ where: { userId: updatedUser.id } });
        await tx.userSkill.createMany({
          data: skills.map(skill => ({ userId: updatedUser.id, skill }))
        });
      }

      if (interests) {
        await tx.userInterest.deleteMany({ where: { userId: updatedUser.id } });
        await tx.userInterest.createMany({
          data: interests.map(interest => ({ userId: updatedUser.id, interest }))
        });
      }

      return await tx.user.findUnique({
        where: { id: updatedUser.id },
        include: { skills: true, interests: true }
      });
    });

    return successResponse(res, 200, 'Profile updated successfully', { user: result });

  } catch (error) {
    next(error);
  }
};
