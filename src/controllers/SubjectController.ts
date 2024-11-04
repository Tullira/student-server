import { Request, Response, NextFunction } from 'express';
import { SubjectRepository } from '../repositories';
import { Subject, UpdateSubject } from '../DTOs';

class SubjectController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const subjectData = Subject.parse(req.body);

      const subject = await SubjectRepository.create(subjectData);

      res.locals = {
        status: 201,
        message: 'Subject criado com sucesso!',
        data: subject,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async read(req: Request, res: Response, next: NextFunction) {
    try {
      const { subjectId } = req.params;

      const subject = await SubjectRepository.findById(subjectId);

      if (!subject) {
        return next({
          status: 404,
          message: 'Subject não encontrado',
        });
      }

      res.locals = {
        status: 200,
        data: subject,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async readAll(req: Request, res: Response, next: NextFunction) {
    try {
      const subject = await SubjectRepository.findAll();

      if (!subject) {
        return next({
          status: 404,
          message: 'Subjects não encontrados',
        });
      }

      res.locals = {
        status: 200,
        data: subject,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { subjectId } = req.params;
      const subjectData = UpdateSubject.parse(req.body);

      const subjectexists = await SubjectRepository.findById(subjectId);

      if (!subjectexists) {
        return next({
          status: 404,
          message: 'Subject não encontrado',
        });
      }

      const subject = await SubjectRepository.update(subjectId, subjectData);

      res.locals = {
        status: 200,
        data: subject,
        message: 'Subject atualizado!',
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { subjectId } = req.params;

      const subjectexists = await SubjectRepository.findById(subjectId);

      if (!subjectexists) {
        return next({
          status: 404,
          message: 'Subject não encontrado',
        });
      }

      await SubjectRepository.delete(subjectId);

      res.locals = {
        status: 200,
        message: 'Subject deletado',
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export default new SubjectController();
