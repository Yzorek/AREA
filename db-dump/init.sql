--Table clients--
CREATE TABLE clients (
    id              SERIAL,
    username        varchar(255) not null,
    first_name      varchar(255) not null,
    last_name       varchar(255) not null,
    email           varchar(255) not null,
    password        varchar(255) not null,
    is_identified   bool,
    avatar          varchar(255),
    auth            varchar(255),
    primary key(id)
);

--Table connexion_history--
CREATE TABLE connexion_history (
    id_user         INT,
    ip              varchar(255) not null,
    date            varchar(255) not null
);