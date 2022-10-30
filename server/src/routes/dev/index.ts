import { Router } from 'express';
import tenantRoutes from './tenant.routes';

const router = Router();

router.use('/', tenantRoutes);

export default router;
