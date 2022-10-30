import { Router } from 'express';
import infoRoutes from './info.routes';
import mainRoutes from './main.routes';
import authRoutes from './auth.routes';
import settingRoutes from './setting.routes';
import extraRoutes from './extra.routes';
import devRouter from './dev';
import userRoutes from './user';

const router = Router();

router.use('/', infoRoutes);

router.use('/api', mainRoutes);

router.use('/api/ext', extraRoutes);

router.use('/api/auth', authRoutes);

router.use('/api/set', settingRoutes);

router.use('/api/dev', devRouter);

router.use('/api/usr', userRoutes);

export default router;
