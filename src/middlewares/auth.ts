import TokenRepository from '@repositories/tokenRepository';
import { Request, Response, NextFunction } from 'express';

export default async function auth(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) throw new Error('Invalid token');

    const tokenRepository = new TokenRepository();
    const decodedToken = tokenRepository.verifyAccessToken(token);

    res.locals.token = decodedToken;
    next();
  } catch (error) {
    res.status(401).send({ error: error.message });
  }
}
