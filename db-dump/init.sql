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
    id_theme        INT,
    primary key(id)
);

--Table connexion_history--
CREATE TABLE connexion_history (
    id_user         INT,
    ip              varchar(255) not null,
    date            varchar(255) not null
);

--Table Services--
CREATE TABLE services (
    id              SERIAL,
    name            varchar(255) not null,
    color           varchar(255) not null,
    primary key(id)
);

INSERT INTO services(name, color) VALUES ('Twitter', '#1C9CEB');
INSERT INTO services(name, color) VALUES ('Instagram', '#CC0063');
INSERT INTO services(name, color) VALUES ('Discord', '#5562EA');
INSERT INTO services(name, color) VALUES ('Twitch', '#8C45F7');
INSERT INTO services(name, color) VALUES ('Youtube', '#F70000');
INSERT INTO services(name, color) VALUES ('Telegram', '#26A2E1');

--Link Services--
CREATE TABLE link_service (
    id_user         INT,
    id_service      varchar(255) not null
);