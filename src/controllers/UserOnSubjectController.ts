import { Request, Response, NextFunction } from 'express';
import { UserOnSubjectRepository } from '../repositories';
import { UserOnSubject, UpdateUserOnSubject } from '../DTOs';

class UserOnSubjectController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userOnSubjectData = UserOnSubject.parse(req.body);
      const userOnSubject = await UserOnSubjectRepository.create(userOnSubjectData);

      res.locals = {
        status: 201,
        message: 'UserOnSubject criado com sucesso!',
        data: userOnSubject,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async read(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, subjectId } = req.params;
      const userOnSubject = await UserOnSubjectRepository.findByIds(userId, subjectId);

      if (!userOnSubject) {
        return next({
          status: 404,
          message: 'UserOnSubject não encontrado.',
        });
      }

      res.locals = {
        status: 200,
        data: userOnSubject,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async readAll(req: Request, res: Response, next: NextFunction) {
    try {
      const userOnSubject = await UserOnSubjectRepository.findAll();
      res.locals = {
        status: 200,
        data: userOnSubject,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async findByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const userOnSubject = await UserOnSubjectRepository.findByUserId(userId);

      res.locals = {
        status: 200,
        data: userOnSubject,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async findBySubjectId(req: Request, res: Response, next: NextFunction) {
    try {
      const { subjectId } = req.params;
      const userOnSubject = await UserOnSubjectRepository.findBySubjectId(subjectId);

      res.locals = {
        status: 200,
        data: userOnSubject,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, subjectId } = req.params;
      const userOnSubjectData = UpdateUserOnSubject.parse(req.body);

      const userOnSubjectExists = await UserOnSubjectRepository.findByIds(userId, subjectId);

      if (!userOnSubjectExists) {
        return next({
          status: 404,
          message: 'UserOnSubject não encontrado.',
        });
      }

      const userOnSubject = await UserOnSubjectRepository.update(userId, subjectId, userOnSubjectData);

      res.locals = {
        status: 200,
        data: userOnSubject,
        message: 'UserOnSubject atualizado com sucesso!',
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, subjectId } = req.params;

      const userOnSubjectExists = await UserOnSubjectRepository.findByIds(userId, subjectId);

      if (!userOnSubjectExists) {
        return next({
          status: 404,
          message: 'UserOnSubject não encontrado.',
        });
      }

      await UserOnSubjectRepository.delete(userId, subjectId);

      res.locals = {
        status: 200,
        message: 'UserOnSubject deletado com sucesso.',
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export default new UserOnSubjectController();
