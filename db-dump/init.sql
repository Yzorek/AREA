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
    id_status       INT,
    is_tutorial_mode bool,
    twitter_token   varchar(255),
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

--Weather--
CREATE TABLE weather (
    id              SERIAL,
    id_user         INT,
    countryCode     varchar(255) not null,
    city            varchar(255) not null,
    primary key(id)
);

--Widget--
CREATE TABLE widget (
    id              SERIAL,
    id_user         INT,
    id_widget       INT,
    primary key(id)
);

--Widget Config Weather--
CREATE TABLE widget_config_weather (
    id                  SERIAL,
    id_user             INT,
    id_widget           INT,
    id_weather_config   INT,
    primary key(id)
);

--Actions--
CREATE TABLE actions (
    id                  SERIAL,
    description         varchar(255) NOT NULL,
    id_service          INT,
    params              text[],
    primary key(id)
);

INSERT INTO actions(description, id_service, params) VALUES ('A new tweet from specific user is posted', 1, ARRAY['User @']);
INSERT INTO actions(description, id_service, params) VALUES ('A streamer starts a game specific stream', 4, ARRAY['Streamer name', 'Game name']);
INSERT INTO actions(description, id_service, params) VALUES ('Like a video', 5, null);
INSERT INTO actions(description, id_service, params) VALUES ('You start a stream', 4, ARRAY['Your username']);
INSERT INTO actions(description, id_service, params) VALUES ('When you are mentionned', 1, null);
INSERT INTO actions(description, id_service, params) VALUES ('Share a new video', 5, null);
INSERT INTO actions(description, id_service, params) VALUES ('You post a new video', 5, null);
INSERT INTO actions(description, id_service, params) VALUES ('A streamer exceed an amount of viewer', 4, ARRAY['Streamer name', 'Amount']);
INSERT INTO actions(description, id_service, params) VALUES ('A selected streamer starts a new stream', 4, ARRAY['Streamer name']);
INSERT INTO actions(description, id_service, params) VALUES ('Make a new instagram reel', 2, null);
INSERT INTO actions(description, id_service, params) VALUES ('Post a tweet', 1, null);


--Reactions--
CREATE TABLE reactions (
    id                  SERIAL,
    description         varchar(255) NOT NULL,
    id_service          INT,
    params              text[],
    primary key(id)
);

INSERT INTO reactions(description, id_service, params) VALUES ('Message a specific user on discord', 3, ARRAY['Username', 'Message']);
INSERT INTO reactions(description, id_service, params) VALUES ('Send message to group chat', 6, ARRAY['Group name']);
INSERT INTO reactions(description, id_service, params) VALUES ('Message on discord server', 3, ARRAY['Server name', 'Channel name']);
INSERT INTO reactions(description, id_service, params) VALUES ('Post a tweet', 1, ARRAY['Tweet text']);
INSERT INTO reactions(description, id_service, params) VALUES ('Send message at a specific user', 6, ARRAY['User']);


--Link Actions Reactions--
CREATE TABLE link_actions_reactions (
    id                  SERIAL,
    id_user             INT NOT NULL,
    id_actions          INT NOT NULL,
    id_reactions        INT NOT NULL,
    params_action       text,
    params_reaction     text,
    is_active           bool,
    primary key(id)
);