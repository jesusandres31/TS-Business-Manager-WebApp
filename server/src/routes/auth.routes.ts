import { Router } from 'express';
import { checkValidation } from '../utils';
import { validateToken } from '../middlewares';
import { limiter } from '../libs';
import { authCtrl } from '../controllers';
import { signinValdn, forgotPsswdValdn } from '../validations';

const router = Router();

/**
 * Signin route for any user role.
 * @method post
 */
router
  .route('/signin')
  // using signinValdn will throw 'undefined' error in client login
  .post(/* signinValdn, checkValidation,*/ limiter, authCtrl.signin);

/**
 * Refresh token.
 * @method get
 */
router.route('/refresh').get(limiter, validateToken, authCtrl.refresh);

/**
 * Forgot password route for tenants.
 * @method patch
 */
/* router
  .route('/forgot-psswd')
  .patch(forgotPsswdValdn, checkValidation, authCtrl.forgotPassword); */

/**
 * Forgot password confirmation route for tenants.
 * @method patch
 */
/* router
  .route('/confirm-forgot-psswd')
  .patch(validateToken, checkValidation, authCtrl.resetPassword); */

export default router;
