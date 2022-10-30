import { Router } from 'express';
import userRoutes from './user.routes';
import profileRoutes from './profile.routes';
import clientRoutes from './client.routes';
import providerRoutes from './provider.routes';
import productRoutes from './product.routes';
import invoiceRoutes from './invoice.routes';
import statisticRoutes from './statistic.routes';
import providerDetailRoutes from './providerDetail.routes';
import checkingAccountsRoutes from './checkingAccounts.routes';

const router = Router();

router.use(
  '/',
  userRoutes,
  profileRoutes,
  clientRoutes,
  providerRoutes,
  productRoutes,
  invoiceRoutes,
  statisticRoutes,
  providerDetailRoutes,
  checkingAccountsRoutes
);

export default router;
