import { Router } from 'express';
import { mainCtrl } from '../controllers';
import { initialSetupLimiter, limiter } from '../libs';

const router = Router();

/**
 * API greet.
 * @method get
 */
router.route('/').get(limiter, mainCtrl.index);

/**
 * Check API status.
 * @method get
 */
router.route('/health/check').get(limiter, mainCtrl.processHealthCheck);

/**
 * Initial Setup:
 * Create Public Shema and Dev account.
 * Used only first time the app is deployed.
 * @method get
 */
router.route('/initial-setup').get(initialSetupLimiter, mainCtrl.initialSetups);

export default router;
