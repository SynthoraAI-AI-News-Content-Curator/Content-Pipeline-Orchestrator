import { Request, Response, NextFunction } from 'express';
import Article from '@models/Article';
import { AppError, asyncHandler } from '@api/middleware/errorHandler';
import { summarizeContent } from '@services/aiService';
import { findSimilarArticles } from '@services/vectorService';
import { answerQuestion } from '@services/qaService';
import { AuthRequest } from '@api/middleware/auth';

export const getArticles = asyncHandler(async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;
  const source = req.query.source as string;
  const topics = req.query.topics ? (req.query.topics as string).split(',') : undefined;

  const query: any = { status: 'published' };
  if (source) query.source = source;
  if (topics) query.topics = { $in: topics };

  const articles = await Article.find(query)
    .sort({ publishedAt: -1, createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .select('-content -embedding');

  const total = await Article.countDocuments(query);

  res.json({
    articles,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  });
});

export const getArticleById = asyncHandler(async (req: Request, res: Response) => {
  const article = await Article.findById(req.params.id);

  if (!article) {
    throw new AppError('Article not found', 404);
  }

  // Increment view count
  article.viewCount += 1;
  await article.save();

  res.json(article);
});

export const createArticle = asyncHandler(async (req: Request, res: Response) => {
  const { title, url, content, source, topics, imageUrl } = req.body;

  // Generate summary
  const summary = await summarizeContent(content);

  const article = await Article.create({
    title,
    url,
    content,
    summary,
    source: source || 'manual',
    topics: topics || [],
    imageUrl,
    status: 'published',
  });

  res.status(201).json(article);
});

export const updateArticle = asyncHandler(async (req: Request, res: Response) => {
  const article = await Article.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!article) {
    throw new AppError('Article not found', 404);
  }

  res.json(article);
});

export const deleteArticle = asyncHandler(async (req: Request, res: Response) => {
  const article = await Article.findByIdAndDelete(req.params.id);

  if (!article) {
    throw new AppError('Article not found', 404);
  }

  res.status(204).send();
});

export const askQuestion = asyncHandler(async (req: Request, res: Response) => {
  const { question } = req.body;
  const article = await Article.findById(req.params.id);

  if (!article) {
    throw new AppError('Article not found', 404);
  }

  const answer = await answerQuestion(article, question);

  res.json({ question, answer });
});

export const getRelatedArticles = asyncHandler(async (req: Request, res: Response) => {
  const article = await Article.findById(req.params.id);

  if (!article) {
    throw new AppError('Article not found', 404);
  }

  const relatedArticles = await findSimilarArticles(article, 6);

  res.json({ related: relatedArticles });
});

export const rateArticle = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { rating } = req.body;
  const article = await Article.findById(req.params.id);

  if (!article) {
    throw new AppError('Article not found', 404);
  }

  if (rating < 1 || rating > 5) {
    throw new AppError('Rating must be between 1 and 5', 400);
  }

  // Remove existing rating from this user
  article.ratings = article.ratings.filter(
    (r) => r.userId.toString() !== req.user._id.toString()
  );

  // Add new rating
  article.ratings.push({
    userId: req.user._id,
    rating,
    createdAt: new Date(),
  });

  await article.save();

  res.json({ averageRating: article.averageRating, totalRatings: article.ratings.length });
});
