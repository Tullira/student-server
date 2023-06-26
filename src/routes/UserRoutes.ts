import { Router } from 'express';
import auth from 'src/middlewares/auth';
import { UserController } from '../controllers';

const userRouter = Router();

userRouter.route('/')
  .post(
    UserController.create,
  );

userRouter.route('/:userId')
  .get(
    [auth],
    UserController.read,
  );

userRouter.route('/:userId')
  .patch(
    [auth],
    UserController.update,
  );

userRouter.route('/:userId')
  .delete(
    [auth],
    UserController.delete,
  );

export default userRouter;
