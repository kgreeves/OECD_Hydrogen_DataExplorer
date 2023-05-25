CREATE TABLE IF NOT EXISTS public.project
(
    id integer NOT NULL DEFAULT nextval('project_id_seq'::regclass),
    ref smallint,
    project_name character varying(100) COLLATE pg_catalog."default",
    country character varying(10) COLLATE pg_catalog."default",
    date_online smallint,
    decomission_date smallint,
    status character varying(30) COLLATE pg_catalog."default",
    technology character varying(30) COLLATE pg_catalog."default",
    technology_comments text COLLATE pg_catalog."default",
    technology_type character varying(30) COLLATE pg_catalog."default",
    technology_type_if_renew character varying(30) COLLATE pg_catalog."default",
    product character varying(30) COLLATE pg_catalog."default",
    enduse_refining boolean,
    enduse_ammonia boolean,
    enduse_methanol boolean,
    enduse_iron_steel boolean,
    enduse_other_ind boolean,
    enduse_mobility boolean,
    enduse_power boolean,
    enduse_grid_inj boolean,
    enduse_chp boolean,
    enduse_domestic_heat boolean,
    enduse_biofuels boolean,
    enduse_synfuels boolean,
    enduse_ch4_grid_inj boolean,
    enduse_ch4_mobility boolean,
    announced_size character varying(50) COLLATE pg_catalog."default",
    norm_capacity_mwel real,
    norm_capacity_nm3_h2h real,
    norm_capacity_kt_h2y real,
    norm_capacity_t_co2_capt_per_y real,
    iea_zeroc_norm_capacity_est_nm3_h2h real,
    reference_id text COLLATE pg_catalog."default",
    dataset_version smallint NOT NULL,
    date_updated time(0) with time zone NOT NULL DEFAULT now()
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.project
    OWNER to postgres;