-- Table: public.reference

-- DROP TABLE IF EXISTS public.reference;

CREATE TABLE IF NOT EXISTS public.reference
(
    id integer NOT NULL DEFAULT nextval('reference_id_seq'::regclass),
    "number" smallint NOT NULL,
    reference text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT reference_pkey PRIMARY KEY ("number")
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.reference
    OWNER to postgres;