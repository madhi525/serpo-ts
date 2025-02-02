import { Request, Response } from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.JWT_SECRET || 'default-secret-salt';

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user){
    return res.status(404).json({ message: 'User not found' });
  } 

  if (user){
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch){
      return res.status(401).json({ message: 'Invalid credentials' });
    } 
  
    const token = jwt.sign({ id: user._id, role: user.role }, secret, { expiresIn: '1h' });
    return res.json({ token, role: user.role });
  }

};

export const register = async (req: Request, res: Response) => {
  const { username, password, role } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, password: hashedPassword, role });
  await newUser.save();

  res.status(201).json({ message: 'User registered successfully' });
};
