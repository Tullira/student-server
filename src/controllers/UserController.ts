import { Request, Response, NextFunction } from 'express';
import { User } from '../DTOs';
import prisma from '../database/client';

class UserController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        name,
        phone,
        email,
        password,
      } = req.body;

      const userData = {
        name,
        phone,
        email,
        password,
      };

      const { error } = User.validate(userData);

      if (error) {
        return next({
          status: 400,
          message: error.details,
        });
      }

      const checkEmail = await prisma.user.findUnique({ where: { email } });

      if (checkEmail) {
        return next({
          status: 400,
          message: 'This email is already registred',
        });
      }

      const user = await prisma.user.create({ data: userData });

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

      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

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

      const user = await prisma.user.update({
        where: { id: userId },
        data: newUser,
      });

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

      const user = await prisma.user.delete({
        where: { id: userId },
      });

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
