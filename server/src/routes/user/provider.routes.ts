import { Router } from 'express';
import { checkValidation } from '../../utils';
import { validateToken, checkRole } from '../../middlewares';
import { providerCtrl } from '../../controllers';
import { providerValdn } from '../../validations';

const router = Router();

/**
 * Create a provider.
 * @method post
 */
router.route('/create-provider').post(
  validateToken,
  /* checkRole(['manager', 'admin']), */
  providerValdn,
  checkValidation,
  providerCtrl.createProvider
);

/**
 * Get all providers.
 * @method get
 */
router.route('/get-providers').get(
  validateToken,
  /* checkRole(['manager', 'admin', 'seller', 'supervisor']), */
  providerCtrl.getProviders
);

/**
 * Get a specific provider.
 * @method get
 */
router.route('/get-provider/:id').get(
  validateToken,
  /* checkRole(['manager', 'admin']), */
  providerCtrl.getProviderById
);

/**
 * Update a provider.
 * @method put
 */
router.route('/update-provider/:id').put(
  validateToken,
  /* checkRole(['manager', 'admin']), */
  providerValdn,
  checkValidation,
  providerCtrl.updateProviderById
);

/**
 * Disable a provider.
 * @method delete
 */
router.route('/disable-provider/:id').delete(
  validateToken,
  /* checkRole(['manager', 'admin']), */
  providerCtrl.disableProviderById
);

/**
 * Enable a provider.
 * @method patch
 */
router.route('/enable-provider/:id').patch(
  validateToken,
  /* checkRole(['manager', 'admin']), */
  providerCtrl.enableProviderById
);

export default router;
