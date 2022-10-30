import { Router } from 'express';
import { validateToken, checkRole } from '../../middlewares';
import { checkingAccCtrl } from '../../controllers';

const router = Router();

/**
 * Get a checking account by client.
 * @method get
 */
router.route('/get-checking-account/:clientId/:pageNumber/:itemsPerPage').get(
  validateToken,
  /* checkRole(['manager', 'admin']), */
  checkingAccCtrl.getCheckingAccByClient
);

export default router;
