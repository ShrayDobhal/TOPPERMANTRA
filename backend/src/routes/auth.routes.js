const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const requireAuth = require('../middlewares/auth');

// Sync user from Clerk to local DB
router.post('/sync', requireAuth, authController.syncUser);

module.exports = router;
