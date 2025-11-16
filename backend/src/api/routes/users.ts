import express from 'express';
import { authenticate } from '@api/middleware/auth';
import * as userController from '@api/controllers/userController';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

router.get('/favorites', userController.getFavorites);
router.post('/favorites/:articleId', userController.addFavorite);
router.delete('/favorites/:articleId', userController.removeFavorite);
router.put('/preferences', userController.updatePreferences);

export default router;
