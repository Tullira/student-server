import { Router } from 'express';
import { UserController } from '@controllers';

const UserRouter = Router();

UserRouter.route('/').post(UserController.create);
UserRouter.route('/').get(UserController.readAll);
UserRouter.route('/:userId').get(UserController.read);
UserRouter.route('/:userId').patch(UserController.update);
UserRouter.route('/:userId').delete(UserController.delete);

export default UserRouter;
