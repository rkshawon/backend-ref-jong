import { NextFunction, Request, Response } from 'express';

export default function getAllMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const urlParts = req.url.split('/');
    const id = urlParts[urlParts.length - 1];
    if (req.method === 'GET' && !id) {
      return next();
    } else {
      return res.status(403).json({ message: 'Forbidden: You do not have permission.' });
    }
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(500).json({ message: 'Invalid token' });
  }
}
