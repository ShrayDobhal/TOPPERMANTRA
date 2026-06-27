const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard.controller');
const requireAuth = require('../middlewares/auth');

router.get('/', requireAuth, dashboardController.getDashboardData);

module.exports = router;
