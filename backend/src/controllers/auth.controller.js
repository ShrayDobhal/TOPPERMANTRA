const prisma = require('../config/prisma');
const { successResponse, errorResponse } = require('../utils/apiResponse');

// This endpoint is called right after the user signs up via Clerk
// to sync the user to our local PostgreSQL database.
exports.syncUser = async (req, res, next) => {
  try {
    // req.auth is injected by ClerkExpressRequireAuth
    const { userId } = req.auth; 
    
    // We expect the frontend to pass the basic user info obtained from Clerk
    const { email, fullName, profileImage } = req.body;

    if (!email || !fullName) {
      return errorResponse(res, 400, 'Email and Full Name are required to sync user.');
    }

    // Check if user already exists
    let user = await prisma.user.findUnique({
      where: { clerkId: userId }
    });

    if (!user) {
      // Create new user in our DB
      user = await prisma.user.create({
        data: {
          clerkId: userId,
          email,
          fullName,
          profileImage: profileImage || null
        }
      });
    }

    return successResponse(res, 200, 'User synced successfully', { user });
  } catch (error) {
    next(error);
  }
};
