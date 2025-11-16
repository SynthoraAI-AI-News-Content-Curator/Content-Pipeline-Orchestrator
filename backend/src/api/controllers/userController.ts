import { Response } from 'express';
import User from '@models/User';
import Article from '@models/Article';
import { AppError, asyncHandler } from '@api/middleware/errorHandler';
import { AuthRequest } from '@api/middleware/auth';

export const getFavorites = asyncHandler(async (req: AuthRequest, res: Response) => {
  const user = await User.findById(req.user._id).populate('favorites');

  res.json({ favorites: user?.favorites || [] });
});

export const addFavorite = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { articleId } = req.params;

  // Check if article exists
  const article = await Article.findById(articleId);
  if (!article) {
    throw new AppError('Article not found', 404);
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    throw new AppError('User not found', 404);
  }

  // Check if already favorited
  if (user.favorites.includes(articleId as any)) {
    throw new AppError('Article already in favorites', 400);
  }

  user.favorites.push(articleId as any);
  await user.save();

  res.json({ message: 'Article added to favorites', favorites: user.favorites });
});

export const removeFavorite = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { articleId } = req.params;

  const user = await User.findById(req.user._id);
  if (!user) {
    throw new AppError('User not found', 404);
  }

  user.favorites = user.favorites.filter((fav) => fav.toString() !== articleId);
  await user.save();

  res.json({ message: 'Article removed from favorites', favorites: user.favorites });
});

export const updatePreferences = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { topics, emailNotifications, theme } = req.body;

  const user = await User.findById(req.user._id);
  if (!user) {
    throw new AppError('User not found', 404);
  }

  if (topics) user.preferences.topics = topics;
  if (emailNotifications !== undefined) user.preferences.emailNotifications = emailNotifications;
  if (theme) user.preferences.theme = theme;

  await user.save();

  res.json({ preferences: user.preferences });
});
