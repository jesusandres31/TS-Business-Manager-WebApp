import { Router } from 'express';
import { checkValidation } from '../../utils';
import { validateToken, checkRole } from '../../middlewares';
import { invoiceCtrl } from '../../controllers';
import { reportValdn } from '../../validations';

const router = Router();

/**
 * Create an invoice.
 * @method post
 */
router.route('/create-invoice').post(
  validateToken,
  /* checkRole(['manager', 'admin', 'seller']), */
  reportValdn,
  checkValidation,
  invoiceCtrl.createInvoice
);

/**
 * Get all invoices.
 * @method get
 */
router.route('/get-invoices').get(
  validateToken,
  /* checkRole(['manager', 'admin', 'seller', 'supervisor']), */
  invoiceCtrl.getInvoices
);

/**
 * Get invoice detail by header id.
 * @method get
 */
router.route('/get-invoice-detail/:id').get(
  validateToken,
  /* checkRole(['manager', 'admin', 'seller', 'supervisor']), */
  invoiceCtrl.getInvoiceDetailById
);

/**
 * Get a specific invoice.
 * @method get
 */
router.route('/get-invoice/:id').get(
  validateToken,
  /* checkRole(['manager', 'admin', 'seller', 'supervisor']), */
  invoiceCtrl.getInvoiceById
);

/**
 * Get articles to distribute.
 * @method post
 */
router.route('/get-articles-to-distribute').post(
  validateToken,
  // articlesToDistributeValdn
  /* checkRole(['manager', 'admin', 'seller', 'supervisor']), */
  invoiceCtrl.getArticlesToDistribute
);

/**
 * Update an invoice.
 * @method put
 */
router.route('/update-invoice/:id').put(
  validateToken,
  /* checkRole(['manager', 'admin', 'seller']), */
  reportValdn,
  checkValidation,
  invoiceCtrl.updateInvoiceById
);

/**
 * Delete an invoice.
 * @method delete
 */
router.route('/delete-invoice/:id').delete(
  validateToken,
  /* checkRole(['manager', 'admin', 'seller']), */
  invoiceCtrl.deleteInvoiceById
);

export default router;
