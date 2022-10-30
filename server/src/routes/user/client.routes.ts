import { Router } from 'express';
import { checkValidation } from '../../utils';
import { validateToken, checkRole } from '../../middlewares';
import { clientCtrl } from '../../controllers';
import { clientValdn, updateClientDebtValdn } from '../../validations';

const router = Router();

/**
 * Create a client.
 * @method post
 */
router.route('/create-client').post(
  validateToken,
  /* checkRole(['manager', 'admin']), */
  clientValdn,
  checkValidation,
  clientCtrl.createClient
);

/**
 * Get all clients.
 * @method get
 */
router.route('/get-clients').get(
  validateToken,
  /* checkRole(['manager', 'admin', 'seller', 'supervisor']), */
  clientCtrl.getClients
);

/**
 * Get a specific client.
 * @method get
 */
router.route('/get-client/:id').get(
  validateToken,
  /* checkRole(['manager', 'admin']), */
  clientCtrl.getClientById
);

/**
 * Update a client.
 * @method put
 */
router.route('/update-client/:id').put(
  validateToken,
  /* checkRole(['manager', 'admin']), */
  clientValdn,
  checkValidation,
  clientCtrl.updateClientById
);

/**
 * Update client debt.
 * @method put
 */
router.route('/update-client-debt').put(
  validateToken,
  /* checkRole(['manager', 'admin', 'seller']), */
  updateClientDebtValdn,
  checkValidation,
  clientCtrl.updateClientDebt
);

/**
 * Disable a client.
 * @method delete
 */
router.route('/disable-client/:id').delete(
  validateToken,
  /* checkRole(['manager', 'admin']), */
  clientCtrl.disableClientById
);

/**
 * Enable a client.
 * @method patch
 */
router.route('/enable-client/:id').patch(
  validateToken,
  /* checkRole(['manager', 'admin']), */
  clientCtrl.enableClientById
);

export default router;
