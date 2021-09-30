import {
  Request, Response, NextFunction,
} from 'express';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories';
import { User } from '../DTOs';

class UserController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        name,
        phone,
        email,
        password,
      } = req.body;

      const userRepository = getCustomRepository(UserRepository);

      const userData = {
        name,
        phone,
        email,
        password,
      };

      const { error } = User.validate({ userData });

      if (error) {
        return next({
          status: 400,
          message: error.details,
        });
      }

      const user = await userRepository.save(userData);

      res.locals = {
        status: 201,
        message: 'User created',
        user,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async read(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;

      const userRepository = getCustomRepository(UserRepository);
      const user = await userRepository.findById(userId);

      if (!user) {
        return next({
          status: 404,
          message: 'User not found',
        });
      }

      if (user === 'ERROR') {
        return next({
          status: 400,
          message: 'Incorrect parameters',
        });
      }

      res.locals = {
        status: 200,
        user,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export default new UserController();
