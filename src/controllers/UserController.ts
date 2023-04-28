import { Request, Response, NextFunction } from 'express';
import { UserRepository } from '../repositories';
import { User, userType } from '../DTOs';

class UserController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        name,
        phone,
        email,
        password,
      }: userType = req.body;

      const userRepository = new UserRepository();

      const userData = {
        name,
        phone,
        email,
        password,
      };

      const validation = User.safeParse(userData);

      if (validation.success === false) {
        return next({
          status: 400,
          message: validation.error.issues[0].message,
        });
      }

      const checkEmail = await userRepository.findByEmail(email);

      if (checkEmail) {
        return next({
          status: 400,
          message: 'This email is already registred',
        });
      }

      const user = await userRepository.create(userData);

      res.locals = {
        status: 201,
        message: 'User created',
        data: user,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async read(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;

      const userRepository = new UserRepository();

      const user = await userRepository.findById(userId);

      if (!user) {
        return next({
          status: 404,
          message: 'User not found',
        });
      }

      res.locals = {
        status: 200,
        data: user,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const newUser = req.body;

      const userRepository = new UserRepository();

      const user = await userRepository.update(userId, newUser);

      if (!user) {
        return next({
          status: 404,
          message: 'User not found',
        });
      }

      res.locals = {
        status: 200,
        data: user,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;

      const userRepository = new UserRepository();

      const user = await userRepository.delete(userId);

      if (!user) {
        return next({
          status: 404,
          message: 'User not found',
        });
      }

      res.locals = {
        status: 200,
        message: 'User deleted',
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export default new UserController();
