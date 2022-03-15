create table users (
    id serial not null primary key,
    fullname varchar(40),
    username character(15) not null,
    password character varying not null,
    isadmin integer not null default 0,
    active integer not null default 1,
    created_by integer,
    created_at timestamp not null default current_timestamp
);
ALTER TABLE users
  OWNER TO postgres;
GRANT ALL ON TABLE users TO postgres;

insert into users(fullname, username, password, isadmin, active, created_by)
values ('Administrador', 'admin', '$2a$10$Z0.J2AZa44av6sVM20qXu.JNscwf6IYBqwH/nMRL84b1jBtZlzHDu', 1, 1, 1); -- la contraseña es 1 al 5

CREATE TABLE work_order_status
(
  id serial NOT NULL,
  description character varying,
  CONSTRAINT work_order_status_pkey PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE work_order_status
  OWNER TO postgres;
GRANT ALL ON TABLE work_order_status TO postgres;

CREATE TABLE work_order_fuel
(
  id serial NOT NULL,
  description character varying,
  CONSTRAINT work_order_fuel_pkey PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);

ALTER TABLE work_order_fuel
  OWNER TO postgres;
GRANT ALL ON TABLE work_order_fuel TO postgres;

CREATE TABLE work_orders
(
  id serial NOT NULL,
  cliente character varying,
  vehiculo character varying,
  encargado integer,
  statusid integer,
  fuelid integer,
  telefono character varying,
  chapa character varying,
  vinnro character varying,
  recorrido character varying,
  description text,
  created_by integer,
  created_at timestamp without time zone NOT NULL DEFAULT now(),
  CONSTRAINT work_orders_pkey PRIMARY KEY (id),
  CONSTRAINT fk_user_wo FOREIGN KEY (encargado)
      REFERENCES users (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT fk_wo_status FOREIGN KEY (statusid)
      REFERENCES work_order_status (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT fk_wo_fuel FOREIGN KEY (fuelid)
      REFERENCES work_order_fuel (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
ALTER TABLE work_orders
  OWNER TO postgres;
GRANT ALL ON TABLE work_orders TO postgres;

CREATE TABLE work_order_files
(
  id serial NOT NULL,
  work_order integer,
  filename character varying,
  filetype character varying,
  created_at timestamp without time zone NOT NULL DEFAULT now(),
  CONSTRAINT work_order_files_pkey PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE work_order_files
  OWNER TO postgres;
GRANT ALL ON TABLE work_order_files TO postgres;

create table work_order_comments
(
    id serial NOT NULL,
    work_order integer,
    comment character varying,
    created_at timestamp without time zone not null default now(),
    created_by integer,
    constraint work_order_comments_pkey primary key (id),
    CONSTRAINT fk_user_woc FOREIGN KEY (created_by)
      REFERENCES users (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);
ALTER TABLE work_order_comments
  OWNER TO postgres;
GRANT ALL ON TABLE work_order_comments TO postgres;