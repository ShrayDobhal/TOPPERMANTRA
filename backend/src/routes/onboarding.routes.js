const express = require('express');
const router = express.Router();
const onboardingController = require('../controllers/onboarding.controller');
const requireAuth = require('../middlewares/auth');

router.post('/', requireAuth, onboardingController.submitOnboarding);

module.exports = router;
