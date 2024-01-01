import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const originalToken = req.header('Authorization')
  const token = originalToken?.replace('Bearer ', '')

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    const decoded = jwt.verify(token, 'your_secret_key')
    req.body.userId = (decoded as { userId: string }).userId
    next()
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' })
  }
}
