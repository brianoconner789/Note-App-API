// src/routes/auth.routes.ts
import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user.model';

const router = express.Router();

router.post('/register', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const user = await UserModel.create({
      username,
      password,
    });

    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

router.post('/login', async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
  
      const user = await UserModel.findOne({ username });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const passwordMatch = await (user as any).comparePassword(password);
  
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });
  
      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  });
export default router;
