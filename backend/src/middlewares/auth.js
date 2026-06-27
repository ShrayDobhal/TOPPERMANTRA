const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node');

// This middleware enforces that the user must be authenticated.
// It checks the Authorization header for a valid Clerk JWT.
// If valid, it attaches the Clerk user ID to req.auth.userId
const requireAuth = ClerkExpressRequireAuth({
  // options can be provided here if needed
});

module.exports = requireAuth;
