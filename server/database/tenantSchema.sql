
/* #################################### CREATE TABLES #################################### */

CREATE TABLE "profile"
(
  -- schema and domain name
  "profile" text NOT NULL CHECK(LENGTH("profile") <= 80) DEFAULT '' UNIQUE,
  "company_name" text NOT NULL CHECK(LENGTH("company_name") <= 80) DEFAULT '' UNIQUE,
  -- ISO 639-1 
  "language" text NOT NULL CHECK(LENGTH("language") <= 3) NOT NULL DEFAULT 'EN',
  -- ISO 3166
  "locality" text NOT NULL CHECK(LENGTH("locality") <= 80) DEFAULT '',
  "email" text NOT NULL CHECK(LENGTH("email") <= 80) DEFAULT '' UNIQUE,
  "phone" text NOT NULL CHECK(LENGTH("phone") <= 80) DEFAULT '',
  "website" text NOT NULL CHECK(LENGTH("website") <= 80) DEFAULT '',
  "created" timestamp NOT NULL CHECK("created" >= '1900-01-01'),
  "max_members" int NOT NULL DEFAULT 1,
  "sale_type_id" int NOT NULL,
  "payment_type_id" int NOT NULL,
  "product_type_id" int NOT NULL,
  "enabled" boolean NOT NULL DEFAULT true
);

CREATE TABLE "users"
(
  "id" SERIAL PRIMARY KEY NOT NULL,
  "role_id" int NOT NULL,
  "locality" text NOT NULL CHECK(LENGTH("locality") <= 80) DEFAULT '',
  "name" text NOT NULL CHECK(LENGTH("name") <= 80),
  "surname" text NOT NULL CHECK(LENGTH("surname") <= 80) DEFAULT '',
  "email" text NOT NULL CHECK(LENGTH("email") <= 80) DEFAULT '',
  "phone" text NOT NULL CHECK(LENGTH("phone") <= 80) DEFAULT '',
  "username" text NOT NULL CHECK(LENGTH("username") <= 80) NOT NULL UNIQUE,
  "password" text NOT NULL CHECK(LENGTH("password") <= 100) NOT NULL,
  "enabled" boolean NOT NULL DEFAULT true
);

CREATE TABLE "report_master"
(
  "id" SERIAL PRIMARY KEY NOT NULL,
  "client_id" int NOT NULL,
  "user_id" int NOT NULL,
  "sale_type_id" int NOT NULL,
  "payment_type_id" int NOT NULL,
  "created" timestamp NOT NULL CHECK("created" >= '1900-01-01'),
  "fee_percentage" decimal(6,2) NOT NULL DEFAULT 0,
  "total" decimal(12,2) NOT NULL CHECK("total" >= 0),
  "payment" decimal(12,2) NOT NULL CHECK("payment" >= 0) DEFAULT 0,
  "debt" decimal(12,2) NOT NULL CHECK("debt" >= 0) DEFAULT 0,
  "enabled" boolean NOT NULL DEFAULT true
);

CREATE TABLE "clients"
(
  "id" SERIAL PRIMARY KEY NOT NULL,
  "locality" text NOT NULL CHECK(LENGTH("locality") <= 80) DEFAULT '',
  "company_name" text NOT NULL CHECK(LENGTH("company_name") <= 80) DEFAULT '' UNIQUE,
  "tax_id" text NOT NULL CHECK(LENGTH("tax_id") <= 80) DEFAULT '',
  "name" text NOT NULL CHECK(LENGTH("name") <= 80),
  "surname" text NOT NULL CHECK(LENGTH("surname") <= 80) DEFAULT '',
  "email" text NOT NULL CHECK(LENGTH("email") <= 80) DEFAULT '',
  "phone" text NOT NULL CHECK(LENGTH("phone") <= 80) DEFAULT '',
  "address" text NOT NULL CHECK(LENGTH("address") <= 80) DEFAULT '',
  "debt" decimal(12,2) NOT NULL DEFAULT 0,
  "enabled" boolean NOT NULL DEFAULT true
);

CREATE TABLE "report_detail"
(
  "id" SERIAL PRIMARY KEY NOT NULL,
  "report_master_id" int NOT NULL,
  "product_id" int NOT NULL,
  "amount" decimal(10,3) NOT NULL CHECK("amount" >= 0) DEFAULT 0,
  "units" decimal(10,2) NOT NULL CHECK("units" >= 0) DEFAULT 0,
  "unit_price" decimal(12,2) NOT NULL CHECK("unit_price" >= 0) DEFAULT 0,
  "fee_percentage" decimal(6,2) NOT NULL DEFAULT 0,
  "subtotal" decimal(12,2) NOT NULL CHECK("subtotal" >= 0)
);

CREATE TABLE "products"
(
  "id" SERIAL PRIMARY KEY NOT NULL,
  "product_type_id" int NOT NULL,
  "name" text NOT NULL CHECK(LENGTH("name") <= 80),
  "stock" decimal(10,2) NOT NULL CHECK("stock" >= 0) DEFAULT 0,
  "sale_price" decimal(12,2) NOT NULL CHECK("sale_price" >= 0) DEFAULT 0,
  "barcode" text NOT NULL CHECK(LENGTH("barcode") <= 80) DEFAULT '',
  "min_stock" decimal(10,2) NOT NULL CHECK("min_stock" >= 0) DEFAULT 0,
  "enabled" boolean NOT NULL DEFAULT true
);

CREATE TABLE "providers_detail"
(
  "id" SERIAL PRIMARY KEY NOT NULL,
  "product_id" int NOT NULL,
  "provider_id" int NOT NULL,
  "purchase_price" decimal(12,2) NOT NULL CHECK("purchase_price" >= 0) DEFAULT 0
);

CREATE TABLE "providers"
(
  "id" SERIAL PRIMARY KEY NOT NULL,
  "locality" text NOT NULL CHECK(LENGTH("locality") <= 80) DEFAULT '',
  "company_name" text NOT NULL CHECK(LENGTH("company_name") <= 80) DEFAULT '' UNIQUE,
  "tax_id" text NOT NULL CHECK(LENGTH("tax_id") <= 80) DEFAULT '',
  "name" text NOT NULL CHECK(LENGTH("name") <= 80),
  "surname" text NOT NULL CHECK(LENGTH("surname") <= 80) DEFAULT '',
  "email" text NOT NULL CHECK(LENGTH("email") <= 80) DEFAULT '',
  "phone" text NOT NULL CHECK(LENGTH("phone") <= 80) DEFAULT '',
  "address" text NOT NULL CHECK(LENGTH("address") <= 80) DEFAULT '',
  "enabled" boolean NOT NULL DEFAULT true
);

CREATE TABLE "checking_accounts"
(
  "id" SERIAL PRIMARY KEY NOT NULL,
  "client_id" int NOT NULL,
  -- -1 means that it's a debt update
  "report_master_id" int NOT NULL DEFAULT -1,
  "created" timestamp NOT NULL CHECK("created" >= '1900-01-01'),
  "previous_debt" decimal(12,2) NOT NULL DEFAULT 0,
  "movement" decimal(12,2) NOT NULL DEFAULT 0
);

/* #################################### SET RELATIONSHIP #################################### */

ALTER TABLE "profile" ADD CONSTRAINT "profile-payment_type-fk" FOREIGN KEY ("payment_type_id") REFERENCES public.payment_types ("id");

ALTER TABLE "profile" ADD CONSTRAINT "profile-product_type_id-fk" FOREIGN KEY ("product_type_id") REFERENCES public.product_types ("id");

ALTER TABLE "profile" ADD CONSTRAINT "profile-sale_type_id-fk" FOREIGN KEY ("sale_type_id") REFERENCES public.sale_types ("id");

ALTER TABLE "users" ADD CONSTRAINT "users-roles-fk" FOREIGN KEY ("role_id") REFERENCES public.roles ("id");

ALTER TABLE "report_master" ADD CONSTRAINT "report_master-clients-fk" FOREIGN KEY ("client_id") REFERENCES clients ("id");

ALTER TABLE "report_master" ADD CONSTRAINT "report_master-users-fk" FOREIGN KEY ("user_id") REFERENCES users ("id");

ALTER TABLE "report_master" ADD CONSTRAINT "report_master-sale_types-fk" FOREIGN KEY ("sale_type_id") REFERENCES public.sale_types ("id");

ALTER TABLE "report_master" ADD CONSTRAINT "report_master-payment_types-fk" FOREIGN KEY ("payment_type_id") REFERENCES public.payment_types ("id");

ALTER TABLE "report_detail" ADD CONSTRAINT "report_detail-report_master-fk" FOREIGN KEY ("report_master_id") REFERENCES report_master ("id");

ALTER TABLE "report_detail" ADD CONSTRAINT "report_detail-products-fk" FOREIGN KEY ("product_id") REFERENCES products ("id");

ALTER TABLE "products" ADD CONSTRAINT "products-product_types-fk" FOREIGN KEY ("product_type_id") REFERENCES public.product_types ("id");

ALTER TABLE "providers_detail" ADD CONSTRAINT "providers_detail-products-fk" FOREIGN KEY ("product_id") REFERENCES products ("id");

ALTER TABLE "providers_detail" ADD CONSTRAINT "providers_detail-providers-fk" FOREIGN KEY ("provider_id") REFERENCES providers ("id");

ALTER TABLE "checking_accounts" ADD CONSTRAINT "checking_accounts-clients-fk" FOREIGN KEY ("client_id") REFERENCES clients ("id");
