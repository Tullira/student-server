import { Router } from 'express';
import { LoginController } from '../controllers';

const AuthRouter = Router();

AuthRouter.route('/')
  .post(
    LoginController.login,
  );

export default AuthRouter;
