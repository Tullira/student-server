import {
  NextFunction, Request, Response,
} from 'express';
import { compare } from 'bcryptjs';

import {
  UserRepository, TokenRepository, clearCookies, setCookie,
} from '@repositories/index';

class LoginController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const userRepository = new UserRepository();

      const user = await userRepository.findByEmail(email);

      if (!user) {
        return res.status(400).json({
          status: 400,
          message: 'Invalid credentials.',
        });
      }

      const checkPassword = await compare(password, user.password);

      if (!checkPassword) {
        return res.status(400).json({
          status: 400,
          message: 'Invalid credentials.',
        });
      }
      const tokenRepository = new TokenRepository();
      const acessToken = await tokenRepository.generateAccessToken(user, '30s');
      const refreshToken = await tokenRepository.generateRefreshToken(user, '1d');

      setCookie(res, 'accessToken', acessToken);
      setCookie(res, 'refreshToken', refreshToken);

      res.locals = {
        status: 200,
        message: 'User logged',
        data: {
          user,
          acessToken,
          refreshToken,
        },
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.header('Authorization')?.replace('Bearer ', '');

      if (!refreshToken) {
        clearCookies(res, 'accessToken');

        return res.status(401).json({
          status: 401,
          message: 'Invalid token',
        });
      }

      const tokenRepository = new TokenRepository();
      const decodedRefreshToken = tokenRepository.verifyRefreshToken(refreshToken);

      if (!decodedRefreshToken) {
        clearCookies(res, 'accessToken');

        return res.status(401).json({
          status: 401,
          message: 'Invalid token',
        });
      }

      const userRepository = new UserRepository();

      const user = await userRepository.findById(decodedRefreshToken.id);

      if (!user) {
        return res.status(400).json({
          status: 400,
          message: 'User not found',
        });
      }

      const acessToken = await tokenRepository.generateAccessToken(user, '30s');

      setCookie(res, 'accessToken', acessToken);
      setCookie(res, 'refreshToken', refreshToken);

      res.locals = {
        status: 200,
        message: 'Token refreshed',
        data: {
          user,
          acessToken,
        },
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      clearCookies(res, 'accessToken');
      clearCookies(res, 'refreshToken');

      res.locals = {
        status: 200,
        message: 'User logged out',
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export default new LoginController();
