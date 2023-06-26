import {
  NextFunction, Request, Response,
} from 'express';

import { UserRepository } from '@repositories/userRepository';
import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';

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

      const token = await jwt.sign(user, process.env.JWT_SECRET as string, {
        expiresIn: '1d',
      });

      res.locals = {
        status: 200,
        message: 'User logged',
        data: {
          user,
          token,
        },
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export default new LoginController();
