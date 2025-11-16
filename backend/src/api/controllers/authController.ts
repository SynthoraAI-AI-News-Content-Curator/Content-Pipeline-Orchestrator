import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '@models/User';
import { AppError, asyncHandler } from '@api/middleware/errorHandler';
import { AuthRequest } from '@api/middleware/auth';

const generateToken = (userId: string): string => {
  const jwtSecret = process.env.JWT_SECRET || 'your-secret-key';
  const jwtExpiresIn = process.env.JWT_EXPIRES_IN || '7d';

  return jwt.sign({ id: userId }, jwtSecret, { expiresIn: jwtExpiresIn });
};

const setCookieToken = (res: Response, token: string): void => {
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  // Check if user exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError('User already exists', 400);
  }

  // Create user
  const user = await User.create({
    email,
    password,
    name,
  });

  // Generate token
  const token = generateToken(user._id.toString());
  setCookieToken(res, token);

  res.status(201).json({
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
    token,
  });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Check if email and password exist
  if (!email || !password) {
    throw new AppError('Please provide email and password', 400);
  }

  // Get user with password
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    throw new AppError('Invalid credentials', 401);
  }

  // Check if password is correct
  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new AppError('Invalid credentials', 401);
  }

  // Update last login
  user.lastLogin = new Date();
  await user.save();

  // Generate token
  const token = generateToken(user._id.toString());
  setCookieToken(res, token);

  res.json({
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
    token,
  });
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0),
  });

  res.json({ message: 'Logout successful' });
});

export const getCurrentUser = asyncHandler(async (req: AuthRequest, res: Response) => {
  const user = await User.findById(req.user._id).populate('favorites');

  res.json(user);
});
