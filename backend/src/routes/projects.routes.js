const express = require('express');
const router = express.Router();
const projectsController = require('../controllers/projects.controller');

router.get('/', projectsController.getProjects);
router.post('/claim', projectsController.claimSubpart);
router.post('/aid', projectsController.requestAid);
router.post('/submit', projectsController.submitReview);
router.post('/waitlist', projectsController.joinWaitlist);

module.exports = router;
