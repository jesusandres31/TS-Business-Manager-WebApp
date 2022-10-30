import { Router } from 'express';
import { checkValidation } from '../../utils';
import { checkRole, validateToken } from '../../middlewares';
import { profileCtrl } from '../../controllers';
import {
  profileValueConfValdn,
  profileGlobalConfValdn,
} from '../../validations';

const router = Router();

/**
 * Get profile info.
 * @method get
 */
router.route('/get-profile').get(
  validateToken,
  /* checkRole(['manager', 'admin', 'seller', 'supervisor']), */
  profileCtrl.getProfile
);

/**
 * Update global config.
 * @method put
 */
router.route('/update-global-config').put(
  validateToken,
  /* checkRole(['manager']), */
  profileGlobalConfValdn,
  checkValidation,
  profileCtrl.updateGlobalConfig
);

/**
 * Update value config.
 * @method put
 */
router.route('/update-value-config').put(
  validateToken,
  /* checkRole(['manager']), */
  profileValueConfValdn,
  checkValidation,
  profileCtrl.updateValueConfig
);

export default router;
