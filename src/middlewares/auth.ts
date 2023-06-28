import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export default async function auth(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) throw new Error('Invalid token');

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);

    res.locals.token = decodedToken;
    next();
  } catch (error) {
    res.status(401).send({ error: error.message });
  }
}
