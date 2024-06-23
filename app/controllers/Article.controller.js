import * as ArticleService from '../services/article.service.js';

export const createArticle = async (req, res) => {
  try {
    const article = await ArticleService.createArticle(req.body);
    res.status(201).json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getArticles = async (req, res) => {
  try {
    const articles = await ArticleService.getArticles();
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateArticle = async (req, res) => {
  try {
    const article = await ArticleService.updateArticle(req.params.id, req.body);
    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteArticle = async (req, res) => {
  try {
    await ArticleService.deleteArticle(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const incrementViewCount = async (req, res) => {
  try {
    const article = await ArticleService.incrementViewCount(req.params.id);
    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
