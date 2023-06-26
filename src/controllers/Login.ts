import { NextFunction, Request, Response } from 'express';

import { User } from '@DTOs/User';
import { UserRepository } from '@repositories/userRepository';

export class LoginController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const userRepository = new UserRepository();

      const user = await userRepository.findByEmail(email);

      if (!user) {
        return res.status(404).json({
          status: 404,
          message: 'User not found',
        });
      }

      const checkPassword = await User.comparePassword(password, user.password);

      if (!checkPassword) {
        return res.status(401).json({
          status: 401,
          message: 'Invalid password',
        });
      }

      const token = await User.generateToken(user.id);

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
