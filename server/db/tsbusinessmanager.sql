--
-- PostgreSQL database dump
--

-- Dumped from database version 14.4
-- Dumped by pg_dump version 14.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: tsbusinessmanager; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE tsbusinessmanager WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_Zambia.1252';


ALTER DATABASE tsbusinessmanager OWNER TO postgres;

\connect tsbusinessmanager

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: coki; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA coki;


ALTER SCHEMA coki OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: checking_accounts; Type: TABLE; Schema: coki; Owner: postgres
--

CREATE TABLE coki.checking_accounts (
    id integer NOT NULL,
    client_id integer NOT NULL,
    report_master_id integer DEFAULT '-1'::integer NOT NULL,
    created timestamp without time zone NOT NULL,
    previous_debt numeric(12,2) DEFAULT 0 NOT NULL,
    movement numeric(12,2) DEFAULT 0 NOT NULL,
    CONSTRAINT checking_accounts_created_check CHECK ((created >= '1900-01-01 00:00:00'::timestamp without time zone))
);


ALTER TABLE coki.checking_accounts OWNER TO postgres;

--
-- Name: checking_accounts_id_seq; Type: SEQUENCE; Schema: coki; Owner: postgres
--

CREATE SEQUENCE coki.checking_accounts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE coki.checking_accounts_id_seq OWNER TO postgres;

--
-- Name: checking_accounts_id_seq; Type: SEQUENCE OWNED BY; Schema: coki; Owner: postgres
--

ALTER SEQUENCE coki.checking_accounts_id_seq OWNED BY coki.checking_accounts.id;


--
-- Name: clients; Type: TABLE; Schema: coki; Owner: postgres
--

CREATE TABLE coki.clients (
    id integer NOT NULL,
    locality text DEFAULT ''::character varying NOT NULL,
    company_name text DEFAULT ''::character varying NOT NULL,
    name text NOT NULL,
    surname text DEFAULT ''::character varying NOT NULL,
    email text DEFAULT ''::character varying NOT NULL,
    phone text DEFAULT ''::character varying NOT NULL,
    address text DEFAULT ''::character varying NOT NULL,
    enabled boolean DEFAULT true NOT NULL,
    tax_id text DEFAULT ''::character varying NOT NULL,
    debt numeric(12,2) DEFAULT 0 NOT NULL,
    CONSTRAINT clients_address_check CHECK ((length(address) <= 80)),
    CONSTRAINT clients_company_name_check CHECK ((length(company_name) <= 80)),
    CONSTRAINT clients_email_check CHECK ((length(email) <= 80)),
    CONSTRAINT clients_locality_check CHECK ((length(locality) <= 80)),
    CONSTRAINT clients_name_check CHECK ((length(name) <= 80)),
    CONSTRAINT clients_phone_check CHECK ((length(phone) <= 80)),
    CONSTRAINT clients_surname_check CHECK ((length(surname) <= 80)),
    CONSTRAINT clients_tax_id_check CHECK ((length(tax_id) <= 80))
);


ALTER TABLE coki.clients OWNER TO postgres;

--
-- Name: clients_id_seq; Type: SEQUENCE; Schema: coki; Owner: postgres
--

CREATE SEQUENCE coki.clients_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE coki.clients_id_seq OWNER TO postgres;

--
-- Name: clients_id_seq; Type: SEQUENCE OWNED BY; Schema: coki; Owner: postgres
--

ALTER SEQUENCE coki.clients_id_seq OWNED BY coki.clients.id;


--
-- Name: products; Type: TABLE; Schema: coki; Owner: postgres
--

CREATE TABLE coki.products (
    id integer NOT NULL,
    product_type_id integer NOT NULL,
    name text NOT NULL,
    stock numeric(10,2) DEFAULT 0 NOT NULL,
    sale_price numeric(10,2) DEFAULT 0 NOT NULL,
    barcode text DEFAULT ''::character varying NOT NULL,
    min_stock numeric(10,2) DEFAULT 0 NOT NULL,
    enabled boolean DEFAULT true NOT NULL,
    CONSTRAINT products_barcode_check CHECK ((length(barcode) <= 80)),
    CONSTRAINT products_min_stock_check CHECK ((min_stock >= (0)::numeric)),
    CONSTRAINT products_name_check CHECK ((length(name) <= 80)),
    CONSTRAINT products_sale_price_check CHECK ((sale_price >= (0)::numeric)),
    CONSTRAINT products_stock_check CHECK ((stock >= (0)::numeric))
);


ALTER TABLE coki.products OWNER TO postgres;

--
-- Name: products_id_seq; Type: SEQUENCE; Schema: coki; Owner: postgres
--

CREATE SEQUENCE coki.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE coki.products_id_seq OWNER TO postgres;

--
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: coki; Owner: postgres
--

ALTER SEQUENCE coki.products_id_seq OWNED BY coki.products.id;


--
-- Name: profile; Type: TABLE; Schema: coki; Owner: postgres
--

CREATE TABLE coki.profile (
    profile text DEFAULT ''::character varying NOT NULL,
    company_name text DEFAULT ''::character varying NOT NULL,
    language text DEFAULT 'EN'::character varying NOT NULL,
    locality text DEFAULT ''::character varying NOT NULL,
    created timestamp without time zone NOT NULL,
    max_members integer DEFAULT 1 NOT NULL,
    payment_type_id integer NOT NULL,
    product_type_id integer NOT NULL,
    sale_type_id integer NOT NULL,
    enabled boolean DEFAULT true NOT NULL,
    email text DEFAULT ''::character varying NOT NULL,
    phone text DEFAULT ''::character varying NOT NULL,
    website text DEFAULT ''::character varying NOT NULL,
    CONSTRAINT profile_company_name_check CHECK ((length(company_name) <= 80)),
    CONSTRAINT profile_created_check CHECK ((created >= '1900-01-01 00:00:00'::timestamp without time zone)),
    CONSTRAINT profile_email_check CHECK ((length(email) <= 80)),
    CONSTRAINT profile_language_check CHECK ((length(language) <= 3)),
    CONSTRAINT profile_locality_check CHECK ((length(locality) <= 80)),
    CONSTRAINT profile_phone_check CHECK ((length(phone) <= 80)),
    CONSTRAINT profile_profile_check CHECK ((length(profile) <= 80)),
    CONSTRAINT profile_website_check CHECK ((length(website) <= 80))
);


ALTER TABLE coki.profile OWNER TO postgres;

--
-- Name: providers; Type: TABLE; Schema: coki; Owner: postgres
--

CREATE TABLE coki.providers (
    id integer NOT NULL,
    locality text DEFAULT ''::character varying NOT NULL,
    company_name text DEFAULT ''::character varying NOT NULL,
    name text NOT NULL,
    surname text DEFAULT ''::character varying NOT NULL,
    email text DEFAULT ''::character varying NOT NULL,
    phone text DEFAULT ''::character varying NOT NULL,
    address text DEFAULT ''::character varying NOT NULL,
    enabled boolean DEFAULT true NOT NULL,
    tax_id text DEFAULT ''::character varying NOT NULL,
    CONSTRAINT providers_address_check CHECK ((length(address) <= 80)),
    CONSTRAINT providers_company_name_check CHECK ((length(company_name) <= 80)),
    CONSTRAINT providers_email_check CHECK ((length(email) <= 80)),
    CONSTRAINT providers_locality_check CHECK ((length(locality) <= 80)),
    CONSTRAINT providers_name_check CHECK ((length(name) <= 80)),
    CONSTRAINT providers_phone_check CHECK ((length(phone) <= 80)),
    CONSTRAINT providers_surname_check CHECK ((length(surname) <= 80)),
    CONSTRAINT providers_tax_id_check CHECK ((length(tax_id) <= 80))
);


ALTER TABLE coki.providers OWNER TO postgres;

--
-- Name: providers_detail; Type: TABLE; Schema: coki; Owner: postgres
--

CREATE TABLE coki.providers_detail (
    id integer NOT NULL,
    product_id integer NOT NULL,
    provider_id integer NOT NULL,
    purchase_price numeric(12,2) DEFAULT 0 NOT NULL,
    CONSTRAINT providers_detail_purchase_price_check CHECK ((purchase_price >= (0)::numeric))
);


ALTER TABLE coki.providers_detail OWNER TO postgres;

--
-- Name: providers_detail_id_seq; Type: SEQUENCE; Schema: coki; Owner: postgres
--

CREATE SEQUENCE coki.providers_detail_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE coki.providers_detail_id_seq OWNER TO postgres;

--
-- Name: providers_detail_id_seq; Type: SEQUENCE OWNED BY; Schema: coki; Owner: postgres
--

ALTER SEQUENCE coki.providers_detail_id_seq OWNED BY coki.providers_detail.id;


--
-- Name: providers_id_seq; Type: SEQUENCE; Schema: coki; Owner: postgres
--

CREATE SEQUENCE coki.providers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE coki.providers_id_seq OWNER TO postgres;

--
-- Name: providers_id_seq; Type: SEQUENCE OWNED BY; Schema: coki; Owner: postgres
--

ALTER SEQUENCE coki.providers_id_seq OWNED BY coki.providers.id;


--
-- Name: report_detail; Type: TABLE; Schema: coki; Owner: postgres
--

CREATE TABLE coki.report_detail (
    id integer NOT NULL,
    report_master_id integer NOT NULL,
    product_id integer NOT NULL,
    subtotal numeric(10,2) NOT NULL,
    amount numeric(10,3) DEFAULT 0 NOT NULL,
    units numeric(10,2) DEFAULT 0 NOT NULL,
    unit_price numeric(12,2) DEFAULT 0 NOT NULL,
    fee_percentage numeric(6,2) DEFAULT 0 NOT NULL,
    CONSTRAINT report_detail_amount_check CHECK ((amount >= (0)::numeric)),
    CONSTRAINT report_detail_price_by_unit_check CHECK ((unit_price >= (0)::numeric)),
    CONSTRAINT report_detail_subtotal_check CHECK ((subtotal >= (0)::numeric)),
    CONSTRAINT report_detail_units_check CHECK ((units >= (0)::numeric))
);


ALTER TABLE coki.report_detail OWNER TO postgres;

--
-- Name: report_detail_id_seq; Type: SEQUENCE; Schema: coki; Owner: postgres
--

CREATE SEQUENCE coki.report_detail_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE coki.report_detail_id_seq OWNER TO postgres;

--
-- Name: report_detail_id_seq; Type: SEQUENCE OWNED BY; Schema: coki; Owner: postgres
--

ALTER SEQUENCE coki.report_detail_id_seq OWNED BY coki.report_detail.id;


--
-- Name: report_master; Type: TABLE; Schema: coki; Owner: postgres
--

CREATE TABLE coki.report_master (
    id integer NOT NULL,
    client_id integer NOT NULL,
    user_id integer NOT NULL,
    sale_type_id integer NOT NULL,
    payment_type_id integer NOT NULL,
    created timestamp without time zone NOT NULL,
    total numeric(10,2) NOT NULL,
    fee_percentage numeric(6,2) DEFAULT 0 NOT NULL,
    payment numeric(12,2) DEFAULT 0 NOT NULL,
    debt numeric(12,2) DEFAULT 0 NOT NULL,
    CONSTRAINT report_master_created_check CHECK ((created >= '1900-01-01 00:00:00'::timestamp without time zone)),
    CONSTRAINT report_master_debt_check CHECK ((debt >= (0)::numeric)),
    CONSTRAINT report_master_payment_check CHECK ((payment >= (0)::numeric)),
    CONSTRAINT report_master_total_check CHECK ((total >= (0)::numeric)),
    CONSTRAINT report_master_total_check1 CHECK ((total >= (0)::numeric))
);


ALTER TABLE coki.report_master OWNER TO postgres;

--
-- Name: report_master_id_seq; Type: SEQUENCE; Schema: coki; Owner: postgres
--

CREATE SEQUENCE coki.report_master_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE coki.report_master_id_seq OWNER TO postgres;

--
-- Name: report_master_id_seq; Type: SEQUENCE OWNED BY; Schema: coki; Owner: postgres
--

ALTER SEQUENCE coki.report_master_id_seq OWNED BY coki.report_master.id;


--
-- Name: users; Type: TABLE; Schema: coki; Owner: postgres
--

CREATE TABLE coki.users (
    id integer NOT NULL,
    role_id integer NOT NULL,
    locality text DEFAULT ''::character varying NOT NULL,
    name text NOT NULL,
    surname text DEFAULT ''::character varying NOT NULL,
    email text DEFAULT ''::character varying NOT NULL,
    phone text DEFAULT ''::character varying NOT NULL,
    username text NOT NULL,
    password text NOT NULL,
    enabled boolean DEFAULT true NOT NULL,
    CONSTRAINT users_email_check CHECK ((length(email) <= 80)),
    CONSTRAINT users_locality_check CHECK ((length(locality) <= 80)),
    CONSTRAINT users_name_check CHECK ((length(name) <= 80)),
    CONSTRAINT users_password_check CHECK ((length(password) <= 100)),
    CONSTRAINT users_phone_check CHECK ((length(phone) <= 80)),
    CONSTRAINT users_surname_check CHECK ((length(surname) <= 80)),
    CONSTRAINT users_username_check CHECK ((length(username) <= 80))
);


ALTER TABLE coki.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: coki; Owner: postgres
--

CREATE SEQUENCE coki.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE coki.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: coki; Owner: postgres
--

ALTER SEQUENCE coki.users_id_seq OWNED BY coki.users.id;


--
-- Name: languages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.languages (
    id character varying(3) DEFAULT ''::character varying NOT NULL,
    name text NOT NULL,
    CONSTRAINT languages_name_check CHECK ((length(name) <= 80))
);


ALTER TABLE public.languages OWNER TO postgres;

--
-- Name: payment_types; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payment_types (
    id integer NOT NULL,
    name text NOT NULL,
    CONSTRAINT payment_types_id_check CHECK ((id > 0)),
    CONSTRAINT payment_types_name_check CHECK ((length(name) <= 80))
);


ALTER TABLE public.payment_types OWNER TO postgres;

--
-- Name: product_types; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product_types (
    id integer NOT NULL,
    name text NOT NULL,
    CONSTRAINT product_types_id_check CHECK ((id > 0)),
    CONSTRAINT product_types_name_check CHECK ((length(name) <= 80))
);


ALTER TABLE public.product_types OWNER TO postgres;

--
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    name text NOT NULL,
    CONSTRAINT roles_id_check CHECK ((id > 0)),
    CONSTRAINT roles_name_check CHECK ((length(name) <= 80))
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- Name: sale_types; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sale_types (
    id integer NOT NULL,
    name text NOT NULL,
    CONSTRAINT sale_types_id_check CHECK ((id > 0)),
    CONSTRAINT sale_types_name_check CHECK ((length(name) <= 80))
);


ALTER TABLE public.sale_types OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    role_id integer NOT NULL,
    locality text DEFAULT ''::character varying NOT NULL,
    name text NOT NULL,
    surname text DEFAULT ''::character varying NOT NULL,
    email text DEFAULT ''::character varying NOT NULL,
    phone text DEFAULT ''::character varying NOT NULL,
    username text NOT NULL,
    password text NOT NULL,
    enabled boolean DEFAULT true NOT NULL,
    CONSTRAINT users_email_check CHECK ((length(email) <= 80)),
    CONSTRAINT users_locality_check CHECK ((length(locality) <= 80)),
    CONSTRAINT users_name_check CHECK ((length(name) <= 80)),
    CONSTRAINT users_password_check CHECK ((length(password) <= 80)),
    CONSTRAINT users_phone_check CHECK ((length(phone) <= 80)),
    CONSTRAINT users_surname_check CHECK ((length(surname) <= 80)),
    CONSTRAINT users_username_check CHECK ((length(username) <= 80))
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: checking_accounts id; Type: DEFAULT; Schema: coki; Owner: postgres
--

ALTER TABLE ONLY coki.checking_accounts ALTER COLUMN id SET DEFAULT nextval('coki.checking_accounts_id_seq'::regclass);


--
-- Name: clients id; Type: DEFAULT; Schema: coki; Owner: postgres
--

ALTER TABLE ONLY coki.clients ALTER COLUMN id SET DEFAULT nextval('coki.clients_id_seq'::regclass);


--
-- Name: products id; Type: DEFAULT; Schema: coki; Owner: postgres
--

ALTER TABLE ONLY coki.products ALTER COLUMN id SET DEFAULT nextval('coki.products_id_seq'::regclass);


--
-- Name: providers id; Type: DEFAULT; Schema: coki; Owner: postgres
--

ALTER TABLE ONLY coki.providers ALTER COLUMN id SET DEFAULT nextval('coki.providers_id_seq'::regclass);


--
-- Name: providers_detail id; Type: DEFAULT; Schema: coki; Owner: postgres
--

ALTER TABLE ONLY coki.providers_detail ALTER COLUMN id SET DEFAULT nextval('coki.providers_detail_id_seq'::regclass);


--
-- Name: report_detail id; Type: DEFAULT; Schema: coki; Owner: postgres
--

ALTER TABLE ONLY coki.report_detail ALTER COLUMN id SET DEFAULT nextval('coki.report_detail_id_seq'::regclass);


--
-- Name: report_master id; Type: DEFAULT; Schema: coki; Owner: postgres
--

ALTER TABLE ONLY coki.report_master ALTER COLUMN id SET DEFAULT nextval('coki.report_master_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: coki; Owner: postgres
--

ALTER TABLE ONLY coki.users ALTER COLUMN id SET DEFAULT nextval('coki.users_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: checking_accounts; Type: TABLE DATA; Schema: coki; Owner: postgres
--

COPY coki.checking_accounts (id, client_id, report_master_id, created, previous_debt, movement) FROM stdin;
\.


--
-- Data for Name: clients; Type: TABLE DATA; Schema: coki; Owner: postgres
--

COPY coki.clients (id, locality, company_name, name, surname, email, phone, address, enabled, tax_id, debt) FROM stdin;
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: coki; Owner: postgres
--

COPY coki.products (id, product_type_id, name, stock, sale_price, barcode, min_stock, enabled) FROM stdin;
\.


--
-- Data for Name: profile; Type: TABLE DATA; Schema: coki; Owner: postgres
--

COPY coki.profile (profile, company_name, language, locality, created, max_members, payment_type_id, product_type_id, sale_type_id, enabled, email, phone, website) FROM stdin;
coki	Empresa Coki	ES	Goya, Corrientes	2021-02-27 17:24:50.174	5	1	1	1	t	cokisinc@gmail.com	3777999888	www.cokisinc.com
\.


--
-- Data for Name: providers; Type: TABLE DATA; Schema: coki; Owner: postgres
--

COPY coki.providers (id, locality, company_name, name, surname, email, phone, address, enabled, tax_id) FROM stdin;
\.


--
-- Data for Name: providers_detail; Type: TABLE DATA; Schema: coki; Owner: postgres
--

COPY coki.providers_detail (id, product_id, provider_id, purchase_price) FROM stdin;
\.


--
-- Data for Name: report_detail; Type: TABLE DATA; Schema: coki; Owner: postgres
--

COPY coki.report_detail (id, report_master_id, product_id, subtotal, amount, units, unit_price, fee_percentage) FROM stdin;
\.


--
-- Data for Name: report_master; Type: TABLE DATA; Schema: coki; Owner: postgres
--

COPY coki.report_master (id, client_id, user_id, sale_type_id, payment_type_id, created, total, fee_percentage, payment, debt) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: coki; Owner: postgres
--

COPY coki.users (id, role_id, locality, name, surname, email, phone, username, password, enabled) FROM stdin;
20	2	Goya, Corrientes	Juan Horacio	Zini	coki@gmail.com	3777644509	cokizini	$2b$10$43X6efbW39HncVy0XO.K3uUM0Q63MebgfnG8GzC.afdYB9EDEjJg.	t
1	2	Corrientes	Jesus Andres	Zini	jesusandreszini14@gmail.com	3777305250	jesusandres	$2b$10$Jf6y2I3HVX3ihz2cqbwP7uZWzHS13NM3n7OjceombWRoH6jvfOEQ.	f
18	4	Goya, Corrientes	Horacio antonio	Zini	hora@gmail.com	3777998542	horacioantonio	$2b$10$GHfZDVnMOUnDiA3cuKaXg..atTDELAXei1IXta.AhbyYaVszdY7Hm	f
17	5	Goya, Corrientes	Maria liliana	Zini	mari@gmail.com	3777986598	marialiliana	$2b$10$fUUnOkGFdIDR7D9SvcFT4ezQ3wgmXLzpjs.R9XfyMhshWeN1F57Ee	f
4	3	Goya	Lucia Veronica	Zini	lucia@gmail.com	377777070	luciaveronica	$2b$10$X0GGxL5ecwNKtf3vvKg2D.rERFT6CZutwJQZN.w5sjGXNY1TjHElK	f
\.


--
-- Data for Name: languages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.languages (id, name) FROM stdin;
EN	english
ES	spanish
PT	portuguese
\.


--
-- Data for Name: payment_types; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payment_types (id, name) FROM stdin;
1	instant_payment
2	checking_account
\.


--
-- Data for Name: product_types; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.product_types (id, name) FROM stdin;
1	unit
2	kilogram
3	liters
4	meters
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (id, name) FROM stdin;
1	dev
2	manager
3	admin
4	seller
5	supervisor
\.


--
-- Data for Name: sale_types; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sale_types (id, name) FROM stdin;
1	direct
2	shipping
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, role_id, locality, name, surname, email, phone, username, password, enabled) FROM stdin;
1	1	Goya	Jesus Andres	Zini	jesusandres31.dev@gmail.com	3777305250	dev.yisus	$2b$10$vd4rd/rt8DQjy9ofmpCNQ.Go2yjeQ2/LZ/VbAoAQBAQLt2fZyK0ly	t
\.


--
-- Name: checking_accounts_id_seq; Type: SEQUENCE SET; Schema: coki; Owner: postgres
--

SELECT pg_catalog.setval('coki.checking_accounts_id_seq', 1, false);


--
-- Name: clients_id_seq; Type: SEQUENCE SET; Schema: coki; Owner: postgres
--

SELECT pg_catalog.setval('coki.clients_id_seq', 31, true);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: coki; Owner: postgres
--

SELECT pg_catalog.setval('coki.products_id_seq', 67, true);


--
-- Name: providers_detail_id_seq; Type: SEQUENCE SET; Schema: coki; Owner: postgres
--

SELECT pg_catalog.setval('coki.providers_detail_id_seq', 285, true);


--
-- Name: providers_id_seq; Type: SEQUENCE SET; Schema: coki; Owner: postgres
--

SELECT pg_catalog.setval('coki.providers_id_seq', 13, true);


--
-- Name: report_detail_id_seq; Type: SEQUENCE SET; Schema: coki; Owner: postgres
--

SELECT pg_catalog.setval('coki.report_detail_id_seq', 104, true);


--
-- Name: report_master_id_seq; Type: SEQUENCE SET; Schema: coki; Owner: postgres
--

SELECT pg_catalog.setval('coki.report_master_id_seq', 52, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: coki; Owner: postgres
--

SELECT pg_catalog.setval('coki.users_id_seq', 20, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- Name: checking_accounts checking_accounts_pkey; Type: CONSTRAINT; Schema: coki; Owner: postgres
--

ALTER TABLE ONLY coki.checking_accounts
    ADD CONSTRAINT checking_accounts_pkey PRIMARY KEY (id);


--
-- Name: clients clients_company_name_key; Type: CONSTRAINT; Schema: coki; Owner: postgres
--

ALTER TABLE ONLY coki.clients
    ADD CONSTRAINT clients_company_name_key UNIQUE (company_name);


--
-- Name: clients clients_pkey; Type: CONSTRAINT; Schema: coki; Owner: postgres
--

ALTER TABLE ONLY coki.clients
    ADD CONSTRAINT clients_pkey PRIMARY KEY (id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: coki; Owner: postgres
--

ALTER TABLE ONLY coki.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: profile profile_company_name_key; Type: CONSTRAINT; Schema: coki; Owner: postgres
--

ALTER TABLE ONLY coki.profile
    ADD CONSTRAINT profile_company_name_key UNIQUE (company_name);


--
-- Name: profile profile_email_key; Type: CONSTRAINT; Schema: coki; Owner: postgres
--

ALTER TABLE ONLY coki.profile
    ADD CONSTRAINT profile_email_key UNIQUE (email);


--
-- Name: profile profile_profile_name_key; Type: CONSTRAINT; Schema: coki; Owner: postgres
--

ALTER TABLE ONLY coki.profile
    ADD CONSTRAINT profile_profile_name_key UNIQUE (profile);


--
-- Name: providers providers_company_name_key; Type: CONSTRAINT; Schema: coki; Owner: postgres
--

ALTER TABLE ONLY coki.providers
    ADD CONSTRAINT providers_company_name_key UNIQUE (company_name);


--
-- Name: providers_detail providers_detail_pkey; Type: CONSTRAINT; Schema: coki; Owner: postgres
--

ALTER TABLE ONLY coki.providers_detail
    ADD CONSTRAINT providers_detail_pkey PRIMARY KEY (id);


--
-- Name: providers providers_pkey; Type: CONSTRAINT; Schema: coki; Owner: postgres
--

ALTER TABLE ONLY coki.providers
    ADD CONSTRAINT providers_pkey PRIMARY KEY (id);


--
-- Name: report_detail report_detail_pkey; Type: CONSTRAINT; Schema: coki; Owner: postgres
--

ALTER TABLE ONLY coki.report_detail
    ADD CONSTRAINT report_detail_pkey PRIMARY KEY (id);


--
-- Name: report_master report_master_pkey; Type: CONSTRAINT; Schema: coki; Owner: postgres
--

ALTER TABLE ONLY coki.report_master
    ADD CONSTRAINT report_master_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: coki; Owner: postgres
--

ALTER TABLE ONLY coki.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: coki; Owner: postgres
--

ALTER TABLE ONLY coki.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: languages languages_iso_code_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_iso_code_key UNIQUE (id);


--
-- Name: languages languages_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_name_key UNIQUE (name);


--
-- Name: payment_types payment_types_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payment_types
    ADD CONSTRAINT payment_types_name_key UNIQUE (name);


--
-- Name: payment_types payment_types_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payment_types
    ADD CONSTRAINT payment_types_pkey PRIMARY KEY (id);


--
-- Name: product_types product_types_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_types
    ADD CONSTRAINT product_types_name_key UNIQUE (name);


--
-- Name: product_types product_types_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_types
    ADD CONSTRAINT product_types_pkey PRIMARY KEY (id);


--
-- Name: roles roles_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_name_key UNIQUE (name);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- Name: sale_types sale_types_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sale_types
    ADD CONSTRAINT sale_types_name_key UNIQUE (name);


--
-- Name: sale_types sale_types_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sale_types
    ADD CONSTRAINT sale_types_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: checking_accounts checking_accounts-clients-fk; Type: FK CONSTRAINT; Schema: coki; Owner: postgres
--

ALTER TABLE ONLY coki.checking_accounts
    ADD CONSTRAINT "checking_accounts-clients-fk" FOREIGN KEY (client_id) REFERENCES coki.clients(id);


--
-- Name: products products-product_types-fk; Type: FK CONSTRAINT; Schema: coki; Owner: postgres
--

ALTER TABLE ONLY coki.products
    ADD CONSTRAINT "products-product_types-fk" FOREIGN KEY (product_type_id) REFERENCES public.product_types(id);


--
-- Name: profile profile-payment_type-fk; Type: FK CONSTRAINT; Schema: coki; Owner: postgres
--

ALTER TABLE ONLY coki.profile
    ADD CONSTRAINT "profile-payment_type-fk" FOREIGN KEY (payment_type_id) REFERENCES public.payment_types(id);


--
-- Name: profile profile-product_type_id-fk; Type: FK CONSTRAINT; Schema: coki; Owner: postgres
--

ALTER TABLE ONLY coki.profile
    ADD CONSTRAINT "profile-product_type_id-fk" FOREIGN KEY (product_type_id) REFERENCES public.product_types(id);


--
-- Name: profile profile-sale_type_id-fk; Type: FK CONSTRAINT; Schema: coki; Owner: postgres
--

ALTER TABLE ONLY coki.profile
    ADD CONSTRAINT "profile-sale_type_id-fk" FOREIGN KEY (sale_type_id) REFERENCES public.sale_types(id);


--
-- Name: providers_detail providers_detail-products-fk; Type: FK CONSTRAINT; Schema: coki; Owner: postgres
--

ALTER TABLE ONLY coki.providers_detail
    ADD CONSTRAINT "providers_detail-products-fk" FOREIGN KEY (product_id) REFERENCES coki.products(id);


--
-- Name: providers_detail providers_detail-providers-fk; Type: FK CONSTRAINT; Schema: coki; Owner: postgres
--

ALTER TABLE ONLY coki.providers_detail
    ADD CONSTRAINT "providers_detail-providers-fk" FOREIGN KEY (provider_id) REFERENCES coki.providers(id);


--
-- Name: report_detail report_detail-products-fk; Type: FK CONSTRAINT; Schema: coki; Owner: postgres
--

ALTER TABLE ONLY coki.report_detail
    ADD CONSTRAINT "report_detail-products-fk" FOREIGN KEY (product_id) REFERENCES coki.products(id);


--
-- Name: report_detail report_detail-report_master-fk; Type: FK CONSTRAINT; Schema: coki; Owner: postgres
--

ALTER TABLE ONLY coki.report_detail
    ADD CONSTRAINT "report_detail-report_master-fk" FOREIGN KEY (report_master_id) REFERENCES coki.report_master(id);


--
-- Name: report_master report_master-clients-fk; Type: FK CONSTRAINT; Schema: coki; Owner: postgres
--

ALTER TABLE ONLY coki.report_master
    ADD CONSTRAINT "report_master-clients-fk" FOREIGN KEY (client_id) REFERENCES coki.clients(id);


--
-- Name: report_master report_master-payment_types-fk; Type: FK CONSTRAINT; Schema: coki; Owner: postgres
--

ALTER TABLE ONLY coki.report_master
    ADD CONSTRAINT "report_master-payment_types-fk" FOREIGN KEY (payment_type_id) REFERENCES public.payment_types(id);


--
-- Name: report_master report_master-sale_types-fk; Type: FK CONSTRAINT; Schema: coki; Owner: postgres
--

ALTER TABLE ONLY coki.report_master
    ADD CONSTRAINT "report_master-sale_types-fk" FOREIGN KEY (sale_type_id) REFERENCES public.sale_types(id);


--
-- Name: report_master report_master-users-fk; Type: FK CONSTRAINT; Schema: coki; Owner: postgres
--

ALTER TABLE ONLY coki.report_master
    ADD CONSTRAINT "report_master-users-fk" FOREIGN KEY (user_id) REFERENCES coki.users(id);


--
-- Name: users users-roles-fk; Type: FK CONSTRAINT; Schema: coki; Owner: postgres
--

ALTER TABLE ONLY coki.users
    ADD CONSTRAINT "users-roles-fk" FOREIGN KEY (role_id) REFERENCES public.roles(id);


--
-- Name: users users-roles-fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "users-roles-fk" FOREIGN KEY (role_id) REFERENCES public.roles(id);


--
-- PostgreSQL database dump complete
--

