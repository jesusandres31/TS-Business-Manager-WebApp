import { Router } from 'express';
import { tenantCtrl } from '../../controllers';
import { checkValidation } from '../../utils';
import { checkRole, validateToken } from '../../middlewares';
import { limiter } from '../../libs';
import {
  signupTenantValdn,
  maxMembValdn,
  newProfileNameValdn,
} from '../../validations';

const router = Router();

/**
 * Signup a tenant.
 * @method post
 */
router.route('/signup-tenant').post(
  // limiter,
  validateToken,
  checkRole(['dev']),
  signupTenantValdn,
  checkValidation,
  tenantCtrl.signupTenant
);

/**
 * Get all tenants.
 * @method get
 */
router
  .route('/get-tenants')
  .get(validateToken, checkRole(['dev']), tenantCtrl.getTenants);

/**
 * Get a specific tenant.
 * @method get
 */
router
  .route('/get-tenant/:profile')
  .get(validateToken, checkRole(['dev']), tenantCtrl.getTenantByPro);

/**
 * Get users from a tenant.
 * @method get
 */
router
  .route('/get-tenant-users/:profile')
  .get(validateToken, checkRole(['dev']), tenantCtrl.getTenantUsers);

/**
 * Disable a tenant.
 * @method delete
 */
router
  .route('/disable-tenant/:profile')
  .delete(validateToken, checkRole(['dev']), tenantCtrl.disableTenantByPro);

/**
 * Enable a tenant.
 * @method patch
 */
router
  .route('/enable-tenant/:profile')
  .patch(validateToken, checkRole(['dev']), tenantCtrl.enableTenantByPro);

/**
 * Disable user from a tenant.
 * @method delete
 */
router
  .route('/disable-tenant-user/:profile/:user')
  .delete(validateToken, checkRole(['dev']), tenantCtrl.disableTenantUser);

/**
 * Enable user from a tenant.
 * @method patch
 */
router
  .route('/enable-tenant-user/:profile/:user')
  .patch(validateToken, checkRole(['dev']), tenantCtrl.enableTenantUser);

/**
 * Update 'max_member' attribute of a tenant.
 * @method patch
 */
router
  .route('/update-max-mem/:profile')
  .patch(
    validateToken,
    checkRole(['dev']),
    maxMembValdn,
    checkValidation,
    tenantCtrl.updateMaxMem
  );

/**
 * Reset password of 'Manager' users from a tenant.
 * @method patch
 */
router
  .route('/reset-mgr-psswd/:profile')
  .patch(validateToken, checkRole(['dev']), tenantCtrl.resetMgrPsswd);

/**
 * Change 'schema_name' attribute of a tenant.
 * @method patch
 */
router
  .route('/change-schema-name/:profile')
  .patch(
    validateToken,
    checkRole(['dev']),
    newProfileNameValdn,
    checkValidation,
    tenantCtrl.changeSchemaName
  );

export default router;
