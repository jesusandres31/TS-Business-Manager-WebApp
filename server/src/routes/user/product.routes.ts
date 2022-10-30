import { Router } from 'express';
import { checkValidation } from '../../utils';
import { validateToken, checkRole } from '../../middlewares';
import { productCtrl } from '../../controllers';
import {
  productValdn,
  productStockValdn,
  productSalePriceValdn,
} from '../../validations';

const router = Router();

/**
 * Create a product.
 * @method post
 */
router.route('/create-product').post(
  validateToken,
  /* checkRole(['manager', 'admin']), */
  productValdn,
  checkValidation,
  productCtrl.createProduct
);

/**
 * Get all products.
 * @method get
 */
router.route('/get-products').get(
  validateToken,
  /* checkRole(['manager', 'admin', 'seller', 'supervisor']), */
  productCtrl.getProducts
);

/**
 * Get a specific product.
 * @method get
 */
router.route('/get-product/:id').get(
  validateToken,
  /* checkRole(['manager', 'admin']), */
  productCtrl.getProductById
);

/**
 * Update a product.
 * @method put
 */
router.route('/update-product/:id').put(
  validateToken,
  /* checkRole(['manager', 'admin']), */
  productValdn,
  checkValidation,
  productCtrl.updateProductById
);

/**
 * Disable a product.
 * @method delete
 */
router.route('/disable-product/:id').delete(
  validateToken,
  /* checkRole(['manager', 'admin']), */
  productCtrl.disableProductById
);

/**
 * Enable a product.
 * @method patch
 */
router.route('/enable-product/:id').patch(
  validateToken,
  /* checkRole(['manager', 'admin']), */
  productCtrl.enableProductById
);

/**
 * Update product's stock.
 * @method patch
 */
router.route('/update-stock/:id').patch(
  validateToken,
  /* checkRole(['manager', 'admin']), */
  productStockValdn,
  checkValidation,
  productCtrl.updateProductStock
);

/**
 * Update product's Sale Price.
 * @method patch
 */
router.route('/update-sale-price/:id').patch(
  validateToken,
  /* checkRole(['manager', 'admin']), */
  productSalePriceValdn,
  checkValidation,
  productCtrl.updateProductSalePrice
);

export default router;
