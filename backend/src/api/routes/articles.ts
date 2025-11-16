import express from 'express';
import { authenticate, authorize } from '@api/middleware/auth';
import * as articleController from '@api/controllers/articleController';

const router = express.Router();

/**
 * @swagger
 * /api/articles:
 *   get:
 *     summary: Get paginated list of articles
 *     tags: [Articles]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Items per page
 *       - in: query
 *         name: source
 *         schema:
 *           type: string
 *         description: Filter by source
 *       - in: query
 *         name: topics
 *         schema:
 *           type: string
 *         description: Filter by topics (comma-separated)
 *     responses:
 *       200:
 *         description: List of articles
 */
router.get('/', articleController.getArticles);

/**
 * @swagger
 * /api/articles/{id}:
 *   get:
 *     summary: Get article by ID
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Article details
 *       404:
 *         description: Article not found
 */
router.get('/:id', articleController.getArticleById);

/**
 * @swagger
 * /api/articles:
 *   post:
 *     summary: Create a new article (admin only)
 *     tags: [Articles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - url
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *               url:
 *                 type: string
 *               content:
 *                 type: string
 *               source:
 *                 type: string
 *     responses:
 *       201:
 *         description: Article created
 */
router.post('/', authenticate, authorize('admin'), articleController.createArticle);

/**
 * @swagger
 * /api/articles/{id}:
 *   put:
 *     summary: Update article (admin only)
 *     tags: [Articles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Article updated
 */
router.put('/:id', authenticate, authorize('admin'), articleController.updateArticle);

/**
 * @swagger
 * /api/articles/{id}:
 *   delete:
 *     summary: Delete article (admin only)
 *     tags: [Articles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Article deleted
 */
router.delete('/:id', authenticate, authorize('admin'), articleController.deleteArticle);

// Article Q&A
router.post('/:id/qa', articleController.askQuestion);

// Related articles
router.get('/:id/related', articleController.getRelatedArticles);

// Rate article
router.post('/:id/rate', authenticate, articleController.rateArticle);

export default router;
