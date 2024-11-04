import { Router } from 'express';

import UserRoutes from './UserRoutes';
import UserOnSubjectRoutes from './UserOnSubjectRoutes';
import SubjectRoutes from './SubjectRoutes';
import AuthRouter from './AuthRoutes';
import FileRouter from './FileRoutes';

const router = Router();

router.use('/user', UserRoutes);

router.use('/userOnSubject', UserOnSubjectRoutes);

router.use('/subject', SubjectRoutes);

router.use('/sessions', AuthRouter);
router.use('/file', FileRouter);
router.route('/').get((_, res) => {
  res.status(200).send('Made with 💚 and &lt; &#x0002F; &gt; by CITi');
});

export default router;
