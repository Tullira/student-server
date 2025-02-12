import { Request, Response, NextFunction } from 'express';
import { UserRepository } from '../repositories';
import { User, UpdateUser } from '../DTOs';

class UserController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userData = User.parse(req.body);

      const user = await UserRepository.create(userData);

      res.locals = {
        status: 201,
        message: 'User criado com sucesso!',
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

      const user = await UserRepository.findById(userId);

      if (!user) {
        return next({
          status: 404,
          message: 'User não encontrado',
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

  async readAll(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await UserRepository.findAll();

      if (!user) {
        return next({
          status: 404,
          message: 'Users não encontrados',
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
      const userData = UpdateUser.parse(req.body);

      const userexists = await UserRepository.findById(userId);

      if (!userexists) {
        return next({
          status: 404,
          message: 'User não encontrado',
        });
      }

      const user = await UserRepository.update(userId, userData);

      res.locals = {
        status: 200,
        data: user,
        message: 'User atualizado!',
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;

      const userexists = await UserRepository.findById(userId);

      if (!userexists) {
        return next({
          status: 404,
          message: 'User não encontrado',
        });
      }

      await UserRepository.delete(userId);

      res.locals = {
        status: 200,
        message: 'User deletado',
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export default new UserController();
