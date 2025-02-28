import { Request, Response } from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import cors from 'cors';
import { body, validationResult } from 'express-validator';

dotenv.config();

// Pastikan JWT_SECRET di .env (tidak gunakan default)
if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in environment variables');
}
const secret = process.env.JWT_SECRET;

/**
 * @route POST /auth/login
 * @desc Login user & set HttpOnly Cookie
 * @access Public
 */
export const login = async (req: Request, res: Response): Promise<any> => {
  try{
  // Validasi input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Buat JWT Token
    const token = jwt.sign({ id: user._id, role: user.role, personel: user.personel }, secret, { expiresIn: '1h' });

    // Set token di HttpOnly Cookie
    res.cookie('token', token, {
      httpOnly: true, // Tidak bisa diakses oleh JS di frontend
      secure: process.env.NODE_ENV === 'production', // Hanya diaktifkan di HTTPS (produksi)
      sameSite: 'strict', // Mencegah CSRF
      maxAge: 3600000, // 1 jam
    });

    res.status(200).json({ message: 'Login successful', role: user.role, personel: user.personel });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * @route POST /auth/register
 * @desc Register new user
 * @access Public
 */
export const register = async (req: Request, res: Response): Promise<any> => {
  // Validasi input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, role });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Middleware: Validasi Input
 */
export const validateLogin = [
  body('username').isString().trim().escape(),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

export const validateRegister = [
  body('username').isString().trim().escape(),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role').isIn(['admin', 'serpo']).withMessage('Invalid role'),
];

/**
 * @route POST /auth/logout
 * @desc Logout user
 * @access Private
 */
export const logout = (req: Request, res: Response) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out successfully' });
};
