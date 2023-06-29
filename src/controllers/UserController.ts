import { Request, Response, NextFunction } from 'express';
import { hash } from 'bcryptjs';
import { UserRepository } from '../repositories';
import { User } from '../DTOs';

class UserController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userData = req.body;

      const userRepository = new UserRepository();

      const validatedData = User.parse(userData);

      const checkEmail = await userRepository.findByEmail(validatedData.email);

      if (checkEmail) {
        return next({
          status: 400,
          message: 'This email is already registred',
        });
      }

      const userDataWithHashedPassword = {
        ...validatedData,
        password: await hash(validatedData.password, 6),
      };

      const user = await userRepository.create(userDataWithHashedPassword);

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
      // deixei o params aqui pois pode ser utilizado na busca de um perfil que não seja o seu.
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
      const { id: userId } = res.locals.token;
      const {
        name,
        phone,
        email,
        password,
      } = req.body;

      const newUser = {
        name,
        phone,
        email,
        password,
      };

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
      const { id: userId } = res.locals.token;

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
