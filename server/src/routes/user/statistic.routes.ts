import { Router } from 'express';
import { statisticCtrl } from '../../controllers';
import { validateToken, checkRole } from '../../middlewares';

const router = Router();
/**
 * CLIENTS STATS #######################################################
 */

/**
 * Get clients by invoices.
 * @method post
 */
router.route('/get-clients-by-invoices').post(
  validateToken,
  /* checkRole(['manager', 'admin', 'seller', 'supervisor']), */
  statisticCtrl.getClientsByInvoices
);

/**
 * Get products sold by client
 * @method post
 */
router.route('/get-products-sold-by-client/:id').post(
  validateToken,
  /* checkRole(['manager', 'admin', 'seller', 'supervisor']), */
  statisticCtrl.getProductsSoldByClient
);

/**
 * Get total sold to clients.
 * @method post
 */
router.route('/get-total-sold-to-clients').post(
  validateToken,
  /* checkRole(['manager', 'admin', 'seller', 'supervisor']), */
  statisticCtrl.getTotalSoldToClients
);

/**
 * PROVIDERS STATS #######################################################
 */

/**
 * Get products by providers.
 * @method get
 */
router.route('/get-products-by-providers').get(
  validateToken,
  /* checkRole(['manager', 'admin', 'seller', 'supervisor']), */
  statisticCtrl.getProductsByProviders
);

/**
 * Get total sold by providers.
 * @method post
 */
router.route('/get-total-sold-by-providers').post(
  validateToken,
  /* checkRole(['manager', 'admin', 'seller', 'supervisor']), */
  statisticCtrl.getTotalSoldByProviders
);

/**
 * Get products sold by providers.
 * @method post
 */
router.route('/get-products-sold-by-provider/:id').post(
  validateToken,
  /* checkRole(['manager', 'admin', 'seller', 'supervisor']), */
  statisticCtrl.getProductsSoldByProvider
);

/**
 * PRODUCTS STATS #######################################################
 */

/**
 * Get products by invoice.
 * @method post
 */
router.route('/get-products-by-invoice').post(
  validateToken,
  /* checkRole(['manager', 'admin', 'seller', 'supervisor']), */
  statisticCtrl.getProductsByInvoice
);

/**
 * Get clients purchases by product.
 * @method post
 */
router.route('/get-clients-purchases-by-product/:id').post(
  validateToken,
  /* checkRole(['manager', 'admin', 'seller', 'supervisor']), */
  statisticCtrl.getClientsPurchasesByProduct
);

/**
 * PROFITS STATS #######################################################
 */

/**
 * Get gross profits.
 * @method post
 */
router.route('/get-gross-profits').post(
  validateToken,
  /* checkRole(['manager', 'admin', 'seller', 'supervisor']), */
  statisticCtrl.getGrossProfits
);

/**
 * Get total debts.
 * @method get
 */
router.route('/get-total-debts').get(
  validateToken,
  /* checkRole(['manager', 'admin', 'seller', 'supervisor']), */
  statisticCtrl.getTotalDebts
);

export default router;
