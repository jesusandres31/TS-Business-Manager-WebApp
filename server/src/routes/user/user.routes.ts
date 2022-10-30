import { Router } from 'express';
import { checkValidation } from '../../utils';
import { validateToken, checkRole } from '../../middlewares';
import { userCtrl } from '../../controllers';
import { signupUserValdn, updateUserValdn } from '../../validations';

const router = Router();

/**
 * Signup an user.
 * @method post
 */
router.route('/signup-user').post(
  validateToken,
  /* checkRole(['manager']), */
  signupUserValdn,
  checkValidation,
  userCtrl.signupUser
);

/**
 * Get all users.
 * @method get
 */
router.route('/get-users').get(
  validateToken,
  /* checkRole(['manager', 'admin', 'seller', 'supervisor']), */
  userCtrl.getUsers
);

/**
 * Get a specific users.
 * @method get
 */
router.route('/get-user/:id').get(
  validateToken,
  /* checkRole(['manager']), */
  userCtrl.getUserById
);

/**
 * Update an users.
 * @method put
 */
router.route('/update-user/:id').put(
  validateToken,
  /* checkRole(['manager']), */
  updateUserValdn,
  checkValidation,
  userCtrl.updateUserById
);

/**
 * Disable an user.
 * @method delete
 */
router.route('/disable-user/:id').delete(
  validateToken,
  /* checkRole(['manager']), */
  userCtrl.disableUserById
);

/**
 * Enable an user.
 * @method patch
 */
router
  .route('/enable-user/:id')
  .patch(validateToken, /* checkRole(['manager']), */ userCtrl.enableUserById);

/**
 * Reset password of an user.
 * @method patch
 */
router
  .route('/reset-user-psswd/:id')
  .patch(validateToken /* checkRole(['manager']), */, userCtrl.resetUserPsswd);

export default router;
