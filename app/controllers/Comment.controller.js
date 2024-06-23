import * as CommentService from '../services/comment.service.js';

export const createComment = async (req, res) => {
  try {
    const comment = await CommentService.createComment(req.params.articleId, req.body.content);
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCommentsByArticleId = async (req, res) => {
  try {
    const comments = await CommentService.getCommentsByArticleId(req.params.articleId);
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
