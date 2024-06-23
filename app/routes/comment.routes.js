import express from 'express';
import * as CommentController from '../controllers/Comment.controller.js';

const router = express.Router();

router.post('/:articleId/comments', CommentController.createComment);
router.get('/:articleId/comments', CommentController.getCommentsByArticleId);

export default router;
