import { Request, Response, NextFunction } from 'express';

// Helper function to handle async routes
const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next); // Pass errors to Express error handler
  };
};

// Use asyncHandler in authRoutes
import express from 'express';
import { login, register } from '../../controllers/authControllers';
const router = express.Router();

router.post('/login', asyncHandler(login));
router.post('/register', asyncHandler(register));

export default router;
