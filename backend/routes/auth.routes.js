import express from 'express'
const router = express.Router();
import { loginUser, signupUser , getUser } from '../controllers/auth.controller.js';
import { authenticate } from '../auth.middleware.js';

router.post('/signup',signupUser)
router.post('/login',loginUser)
router.get('/me', authenticate,getUser)






export  const authRouter= router;