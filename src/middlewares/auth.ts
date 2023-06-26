import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '@database/client';

export default async function auth(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) throw new Error('Invalid token');
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    res.locals.user = Date.now() < decoded.exp ? user : null;
    next();
  } catch (error) {
    res.status(401).send({ error: error.message });
  }
}
