import { Router } from 'express';

import UserRouter from './UserRoutes';
import AuthRouter from './AuthRoutes';

const router = Router();

router.use('/user', UserRouter);
router.use('/sessions', AuthRouter);
router.route('/').get((req, res) => {
  res.send('Made with 💚 and &lt; &#x0002F; &gt; by CITi');
});

export default router;
