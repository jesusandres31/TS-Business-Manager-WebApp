DELETE FROM payment_types WHERE id > 2;
UPDATE payment_types SET name = 'instant_payment' WHERE id = 1;
UPDATE payment_types SET name = 'checking_account' WHERE id = 2;
SELECT * FROM payment_types;
