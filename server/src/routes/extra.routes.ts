import { Router } from 'express';
import { extraCtrl } from '../controllers';
import { extraLimiter } from '../libs';
import { validateToken, checkRole } from '../middlewares';

const router = Router();

/**
 * Get roles.
 * @method get
 */
router.route('/get-roles').get(extraLimiter, extraCtrl.getRoles);

/**
 * Get payment types.
 * @method get
 */
router.route('/get-payment-types').get(extraLimiter, extraCtrl.getPaymentTypes);

/**
 * Get product types.
 * @method get
 */
router.route('/get-product-types').get(extraLimiter, extraCtrl.getProductTypes);

/**
 * Get sale types.
 * @method get
 */
router.route('/get-sale-types').get(extraLimiter, extraCtrl.getSaleTypes);

/**
 * Get all languages.
 * @method get
 */
router.route('/get-langs').get(extraLimiter, extraCtrl.getLanguages);

/**
 * Get a specific language.
 * @method get
 */
router.route('/get-lang/:lang').get(extraLimiter, extraCtrl.getLanguageByCod);

export default router;
