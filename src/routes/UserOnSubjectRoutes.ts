import { Router } from 'express';
import UserOnSubjectController from '../controllers/UserOnSubjectController';

const userOnSubjectRouter = Router();

userOnSubjectRouter.route('/').post(UserOnSubjectController.create);
userOnSubjectRouter.route('/:userId/:subjectId').get(UserOnSubjectController.read);
userOnSubjectRouter.route('/:userId/:subjectId').patch(UserOnSubjectController.update);
userOnSubjectRouter.route('/:userId/:subjectId').delete(UserOnSubjectController.delete);

// Rota para ler todos os UserOnSubject associados a um userId
userOnSubjectRouter.route('/user/:userId').get(UserOnSubjectController.findByUserId);

// Rota para ler todos os UserOnSubject associados a um subjectId
userOnSubjectRouter.route('/subject/:subjectId').get(UserOnSubjectController.findBySubjectId);

export default userOnSubjectRouter;
