const prisma = require('../config/prisma');
const { successResponse, errorResponse } = require('../utils/apiResponse');

exports.getDashboardData = async (req, res, next) => {
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

    // Mock aggregate data based on user profile for Phase 14
    // In a real app, this would query actual tasks, recommendations, etc.
    
    const dashboardData = {
      profile: {
        fullName: user.fullName,
        careerGoal: user.careerGoal || 'Undecided',
        level: user.level,
        xp: user.xp,
        streak: user.streak,
        communityScore: user.communityScore,
        progressPercentage: 68 // Mock dynamic calculation
      },
      todayTasks: [
        { id: 1, text: `Learn more about ${user.careerGoal || 'your field'}`, completed: false, category: 'Learning' },
        { id: 2, text: 'Complete Profile Setup', completed: true, category: 'Career' },
      ],
      recommendations: [
        { type: 'Mentor', title: 'Sarah Chen', subtitle: 'Senior Engineer' },
        { type: 'Internship', title: 'Frontend Developer', subtitle: 'Stripe • Remote' }
      ]
    };

    return successResponse(res, 200, 'Dashboard data retrieved', dashboardData);

  } catch (error) {
    next(error);
  }
};
