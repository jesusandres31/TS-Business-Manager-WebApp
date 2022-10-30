import { Router } from 'express';
import { checkValidation } from '../utils';
import { validateToken, checkRole } from '../middlewares';
import { limiter } from '../libs';
import { settingCtrl } from '../controllers';
import { changePsswdValdn, changeUsernameValdn } from '../validations';

const router = Router();

/**
 * Get my user.
 * @method get
 */
router
  .route('/get-my-user')
  .get(
    validateToken,
    checkRole(['manager', 'admin', 'seller', 'supervisor', 'dev']),
    settingCtrl.getMyUser
  );

/**
 * Change password route for any role.
 * @method put
 */
router
  .route('/change-password')
  .put(
    limiter,
    validateToken,
    checkRole(['manager', 'admin', 'seller', 'supervisor', 'dev']),
    changePsswdValdn,
    checkValidation,
    settingCtrl.changePsswd
  );

/**
 * Change username route for any role.
 * @method put
 */
router
  .route('/change-username')
  .put(
    limiter,
    validateToken,
    checkRole(['manager', 'admin', 'seller', 'supervisor', 'dev']),
    changeUsernameValdn,
    checkValidation,
    settingCtrl.changeUsername
  );

export default router;
