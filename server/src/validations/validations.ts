import { check } from 'express-validator';

/**
 * Profile
 */

export const profile = check('profile', 'profile is invalid')
  .exists({ checkNull: true })
  .isString()
  .isLength({ min: 2, max: 30 });

export const company_name = check('company_name', 'company_name is invalid')
  .exists({ checkNull: true })
  .isString()
  .isLength({ min: 2, max: 80 });

export const tax_id = check('tax_id', 'tax_id is invalid')
  .exists({ checkNull: true })
  .isString()
  .isLength({ min: 0, max: 50 });

export const language = check('language', 'language is invalid')
  .exists({ checkNull: true })
  .isString()
  .isLength({ min: 2, max: 3 });

export const locality = check('locality', 'locality is invalid')
  .exists({ checkNull: true })
  .isString()
  .isLength({ min: 0, max: 50 });

export const created = check('created', 'created is invalid')
  .exists({ checkNull: true })
  .isString()
  .isLength({ min: 10, max: 20 });

export const max_members = check('max_members', 'max_members is invalid')
  .exists({ checkNull: true })
  .isInt({ min: 0, max: 100 })
  .isLength({ max: 3 });

export const payment_type_id = check(
  'payment_type_id',
  'payment_type_id is invalid'
)
  .exists({ checkNull: true })
  .isInt({ min: 1 })
  .isLength({ max: 1 });

export const product_type_id = check(
  'product_type_id',
  'product_type_id is invalid'
)
  .exists({ checkNull: true })
  .isInt({ min: 1 })
  .isLength({ max: 1 });

export const sale_type_id = check('sale_type_id', 'sale_type_id is invalid')
  .exists({ checkNull: true })
  .isInt({ min: 1 })
  .isLength({ max: 1 });

export const enabled = check('enabled', 'enabled is invalid')
  .exists({ checkNull: true })
  .isBoolean();

// Manager

export const manager_name = check(
  'manager.manager_name',
  'manager_name is invalid'
)
  .exists({ checkNull: true })
  .isString()
  .trim()
  .isLength({ min: 1, max: 50 });

export const manager_surname = check(
  'manager.manager_surname',
  'manager_surname is invalid'
)
  .exists({ checkNull: true })
  .isString()
  .trim()
  .isLength({ min: 1, max: 50 });

export const manager_email = check(
  'manager.manager_email',
  'manager_email is invalid'
)
  .exists({ checkNull: true })
  .isString()
  .trim()
  .isLength({ min: 0, max: 50 });

export const manager_phone = check(
  'manager.manager_phone',
  'manager_phone number is invalid'
)
  .exists({ checkNull: true })
  .isString()
  .trim()
  .isLength({ min: 0, max: 50 });

export const manager_username = check(
  'manager.manager_username',
  'manager_username is invalid'
)
  .exists({ checkNull: true })
  .isString()
  .trim()
  .isLength({ min: 5, max: 30 });

export const manager_password = check(
  'manager.manager_password',
  'manager_password is invalid'
)
  .exists({ checkNull: true })
  .isString()
  .trim()
  .isLength({ min: 5, max: 30 });

/**
 * User
 */

export const role_id = check('role_id', 'role_id is invalid')
  .exists({ checkNull: true })
  .isInt({ min: 2, max: 5 })
  .isLength({ max: 1 });

export const name = check('name', 'name is invalid')
  .exists({ checkNull: true })
  .isString()
  .trim()
  .isLength({ min: 0, max: 80 });

export const surname = check('surname', 'Surname is invalid')
  .exists({ checkNull: true })
  .isString()
  .trim()
  .isLength({ min: 0, max: 50 });

export const email = check('email', 'Email is invalid')
  .exists({ checkNull: true })
  .isString()
  .trim()
  .isLength({ min: 0, max: 50 });

export const website = check('website', 'Website is invalid')
  .exists({ checkNull: true })
  .isString()
  .trim()
  .isLength({ min: 0, max: 80 });

export const phone = check('phone', 'Phone number is invalid')
  .exists({ checkNull: true })
  .isString()
  .trim()
  .isLength({ min: 0, max: 50 });

export const username = check('username', 'Username is invalid')
  .exists({ checkNull: true })
  .isString()
  .trim()
  .isLength({ min: 5, max: 30 });

export const password = check('password', 'Password is invalid')
  .exists({ checkNull: true })
  .isString()
  .trim()
  .isLength({ min: 5, max: 30 });

export const new_user_or_psswd = check(
  'new_user_or_psswd',
  'new_user_or_psswd is invalid'
)
  .exists({ checkNull: true })
  .isString()
  .trim()
  .isLength({ min: 5, max: 30 });

/**
 * Providers || Clients
 */

export const address = check('address', 'Address number is invalid')
  .exists({ checkNull: true })
  .isString()
  .trim()
  .isLength({ min: 0, max: 50 });

export const debt = check('debt', 'debt is invalid')
  .exists({ checkNull: true })
  .isDecimal({ force_decimal: false, decimal_digits: '0,2', locale: 'en-US' })
  .isLength({ max: 12 });

/**
 * Checking Account
 */

export const updated_debt = check('updated_debt', 'updated_debt is invalid')
  .exists({ checkNull: true })
  .isDecimal({ force_decimal: false, decimal_digits: '0,2', locale: 'en-US' })
  .isLength({ max: 12 });

export const previous_debt = check('previous_debt', 'previous_debt is invalid')
  .exists({ checkNull: true })
  .isDecimal({ force_decimal: false, decimal_digits: '0,2', locale: 'en-US' })
  .isLength({ max: 12 });

export const movement = check('movement', 'movement is invalid')
  .exists({ checkNull: true })
  .isDecimal({ force_decimal: false, decimal_digits: '0,2', locale: 'en-US' })
  .isLength({ max: 12 });

/**
 * Products
 */

export const stock = check('stock', 'stock is invalid')
  .exists({ checkNull: true })
  .isDecimal({ force_decimal: false, decimal_digits: '0,2', locale: 'en-US' })
  .isLength({ max: 10 });

export const sale_price = check('sale_price', 'sale_price is invalid')
  .exists({ checkNull: true })
  .isDecimal({ force_decimal: false, decimal_digits: '0,2', locale: 'en-US' })
  .isLength({ max: 12 });

export const barcode = check('barcode', 'barcode is invalid')
  .exists({ checkNull: true })
  .isString()
  .trim()
  .isLength({ min: 0, max: 50 });

export const min_stock = check('min_stock', 'min_stock is invalid')
  .exists({ checkNull: true })
  .isDecimal({ force_decimal: false, decimal_digits: '0,2', locale: 'en-US' })
  .isLength({ max: 10 });

/**
 * Provider_detail
 */

export const provider_id = check(
  'provider_details.*.provider_id',
  'provider_id is invalid'
)
  .exists({ checkNull: true })
  .isInt()
  .isLength({ max: 8 });

export const purchase_price = check(
  'provider_details.*.purchase_price',
  'purchase_price is invalid'
)
  .exists({ checkNull: true })
  .isDecimal({ force_decimal: false, decimal_digits: '0,2', locale: 'en-US' })
  .isLength({ max: 13 });

/**
 * Report_master
 */

export const client_id = check('client_id', 'client_id is invalid')
  .exists({ checkNull: true })
  .isInt()
  .isLength({ max: 8 });

export const user_id = check('user_id', 'user_id is invalid')
  .exists({ checkNull: true })
  .isInt()
  .isLength({ max: 8 });

export const total = check('total', 'total is invalid')
  .exists({ checkNull: true })
  .isDecimal({ force_decimal: false, decimal_digits: '0,2', locale: 'en-US' })
  .isLength({ max: 12 });

export const payment = check('payment', 'payment is invalid')
  .exists({ checkNull: true })
  .isDecimal({ force_decimal: false, decimal_digits: '0,2', locale: 'en-US' })
  .isLength({ max: 12 });

export const fee_percentageTotal = check(
  'fee_percentageTotal',
  'fee_percentageTotal is invalid'
)
  .exists({ checkNull: true })
  .isDecimal({ force_decimal: false, decimal_digits: '0,2', locale: 'en-US' })
  .isLength({ max: 6 });

/**
 * Report_detail
 */

export const product_id = check(
  'report_details.*.product_id',
  'product_id is invalid'
)
  .exists({ checkNull: true })
  .isInt()
  .isLength({ max: 8 });

export const amount = check('report_details.*.amount', 'amount is invalid')
  .exists({ checkNull: true })
  .isDecimal({ force_decimal: false, decimal_digits: '0,3', locale: 'en-US' })
  .isLength({ max: 10 });

export const units = check('report_details.*.units', 'units is invalid')
  .exists({ checkNull: true })
  .isDecimal({ force_decimal: false, decimal_digits: '0,2', locale: 'en-US' })
  .isLength({ max: 10 });

export const unit_price = check(
  'report_details.*.unit_price',
  'unit_price is invalid'
)
  .exists({ checkNull: true })
  .isDecimal({ force_decimal: false, decimal_digits: '0,2', locale: 'en-US' })
  .isLength({ max: 12 });

export const fee_percentage = check(
  'report_details.*.fee_percentage',
  'fee_percentage is invalid'
)
  .exists({ checkNull: true })
  .isDecimal({ force_decimal: false, decimal_digits: '0,2', locale: 'en-US' })
  .isLength({ max: 6 });

export const subtotal = check(
  'report_details.*.subtotal',
  'subtotal is invalid'
)
  .exists({ checkNull: true })
  .isDecimal({ force_decimal: false, decimal_digits: '0,2', locale: 'en-US' })
  .isLength({ max: 12 });

export const old_debt = check('old_debt', 'old_debt is invalid')
  .exists({ checkNull: true })
  .isDecimal({ force_decimal: false, decimal_digits: '0,2', locale: 'en-US' })
  .isLength({ max: 12 });
