import express from 'express';
import * as ArticleController from '../controllers/Article.controller.js';

const router = express.Router();

router.post('/', ArticleController.createArticle);
router.get('/', ArticleController.getArticles);
router.put('/:id', ArticleController.updateArticle);
router.delete('/:id', ArticleController.deleteArticle);
router.patch('/:id/viewCount', ArticleController.incrementViewCount);

export default router;
