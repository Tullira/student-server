import { Router } from 'express';

import UserRouter from './UserRoutes';

const router = Router();

router.use('/user', UserRouter);

export default router;
