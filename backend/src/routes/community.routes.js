const express = require('express');
const router = express.Router();
const communityController = require('../controllers/community.controller');

router.get('/', communityController.getCommunity);
router.post('/posts', communityController.createPost);
router.post('/posts/:postId/upvote', communityController.upvotePost);
router.post('/comments/:commentId/upvote', communityController.upvoteComment);

module.exports = router;
