import { Router } from 'express';
import { validateToken, checkRole } from '../../middlewares';
import { providerDetailCtrl } from '../../controllers';

const router = Router();

/**
 * Get all providers-detail.
 * @method get
 */
router.route('/get-providers-detail').get(
  validateToken,
  /* checkRole(['manager', 'admin', 'seller', 'supervisor']), */
  providerDetailCtrl.getProvidersDetail
);

/**
 * Get provider products.
 * @method get
 */
router.route('/get-providers-products/:id').get(
  validateToken,
  /* checkRole(['manager', 'admin', 'seller', 'supervisor']), */
  providerDetailCtrl.getProviderProductsById
);

/**
 * Get product providers.
 * @method get
 */
router.route('/get-products-providers/:id').get(
  validateToken,
  /* checkRole(['manager', 'admin', 'seller', 'supervisor']), */
  providerDetailCtrl.getProductProvidersById
);

/**
 * Remove a provider from a product.
 * @param id providers_detail id
 * @method delete
 */
router.route('/remove-provider/:id').delete(
  validateToken,
  /* checkRole(['manager', 'admin']), */
  providerDetailCtrl.removeProviderById
);

/**
 * Remove a product from a provider.
 * @param id providers_detail id
 * @method delete
 */
router.route('/remove-product/:id').delete(
  validateToken,
  /* checkRole(['manager', 'admin']), */
  providerDetailCtrl.removeProductById
);

export default router;
