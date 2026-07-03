const express = require('express');
const router = express.Router();
const cohortController = require('../controllers/cohort.controller');

router.get('/', cohortController.getCohort);
router.post('/challenge/response', cohortController.postResponse);
router.post('/response/:responseId/upvote', cohortController.upvoteResponse);

module.exports = router;
