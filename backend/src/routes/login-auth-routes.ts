import express from 'express';
import { login, register, logout, validateLogin, validateRegister } from '../../controllers/login-auth-controllers';
import asyncHandler from 'express-async-handler'

const router = express.Router();

router.post('/login', validateLogin, asyncHandler(login));
router.post('/register', validateRegister, asyncHandler(register));
router.post('/logout', asyncHandler(logout));

export default router;
