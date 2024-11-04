import { Router } from 'express';
import { SubjectController } from '@controllers';

const SubjectRouter = Router();

SubjectRouter.route('/').post(SubjectController.create);
SubjectRouter.route('/').get(SubjectController.readAll);
SubjectRouter.route('/:subjectId').get(SubjectController.read);
SubjectRouter.route('/:subjectId').patch(SubjectController.update);
SubjectRouter.route('/:subjectId').delete(SubjectController.delete);

export default SubjectRouter;
