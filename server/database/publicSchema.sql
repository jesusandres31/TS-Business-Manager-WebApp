/* #################################### START TRANSACTION #################################### */

BEGIN;

  /* #################################### CREATE TABLES #################################### */

  CREATE TABLE "roles"
  (
    "id" int PRIMARY KEY NOT NULL CHECK("id" > 0) UNIQUE,
    "name" text NOT NULL CHECK(LENGTH("name") <= 80) UNIQUE
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
    "username" text NOT NULL CHECK(LENGTH("username") <= 80) UNIQUE,
    "password" text NOT NULL CHECK(LENGTH("password") <= 100),
    "enabled" boolean NOT NULL DEFAULT true
  );

  -- ISO 639-1 
  CREATE TABLE "languages"
  (
    "id" varchar(3) NOT NULL UNIQUE DEFAULT '',
    "name" text NOT NULL CHECK(LENGTH("name") <= 80) UNIQUE
  );

  CREATE TABLE "payment_types"
  (
    "id" int PRIMARY KEY NOT NULL CHECK("id" > 0) UNIQUE,
    "name" text NOT NULL CHECK(LENGTH("name") <= 80) UNIQUE
  );

  CREATE TABLE "sale_types"
  (
    "id" int PRIMARY KEY NOT NULL CHECK("id" > 0) UNIQUE,
    "name" text NOT NULL CHECK(LENGTH("name") <= 80) UNIQUE
  );

  -- Unit of Measurement
  CREATE TABLE "product_types"
  (
    "id" int PRIMARY KEY NOT NULL CHECK("id" > 0) UNIQUE,
    "name" text NOT NULL CHECK(LENGTH("name") <= 80) UNIQUE
  );

  /* #################################### SET RELATIONSHIP #################################### */

  ALTER TABLE "users" ADD CONSTRAINT "users-roles-fk" FOREIGN KEY ("role_id") REFERENCES roles ("id");

  /* #################################### INSERT ROLES DATA #################################### */

  INSERT INTO roles
    (id, name)
  VALUES
    (1, 'dev'),
    (2, 'manager'),
    (3, 'admin'),
    (4, 'seller'),
    (5, 'supervisor');

  /* #################################### INSERT LANGUAGES #################################### */

  INSERT INTO languages
    (id, name)
  VALUES
    ('EN', 'english'),
    ('ES', 'spanish'),
    ('PT', 'portuguese');

  /* #################################### INSERT TYPES DATA #################################### */

  INSERT INTO product_types
    (id, name)
  VALUES
    (1, 'unit'),
    (2, 'kilogram'),
    (3, 'liters'),
    (4, 'meters');

  INSERT INTO payment_types
    (id, name)
  VALUES
    (1, 'instant_payment'),
    (2, 'checking_account');

  INSERT INTO sale_types
    (id, name)
  VALUES
    (1, 'direct'),
    (2, 'shipping');

  /* #################################### END TRANSACTION #################################### */

  COMMIT;