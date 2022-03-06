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
    twitter_refresh varchar(255),
    twitter_date   varchar(255),
    spotify_token   varchar(255),
    reddit_token   varchar(255),
    spotify_refresh varchar(255),
    spotify_date   varchar(255),
    reddit_refresh varchar(255),
    reddit_date varchar(255),
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
INSERT INTO services(name, color) VALUES ('Spotify', '#1DB954');
INSERT INTO services(name, color) VALUES ('Discord', '#5562EA');
INSERT INTO services(name, color) VALUES ('Twitch', '#8C45F7');
INSERT INTO services(name, color) VALUES ('Reddit', '#FF5700');
INSERT INTO services(name, color) VALUES ('Telegram', '#26A2E1');
INSERT INTO services(name, color) VALUES ('Clash Royale', '#488bf4');

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

INSERT INTO actions(description, id_service, params) VALUES ('A new tweet from specific user is posted', 1, ARRAY['User @']);                       -- 1
INSERT INTO actions(description, id_service, params) VALUES ('A streamer starts a game specific stream', 4, ARRAY['Streamer name', 'Game name']);   -- 2
INSERT INTO actions(description, id_service, params) VALUES ('You start a stream', 4, ARRAY['Your username']);                                      -- 3
INSERT INTO actions(description, id_service, params) VALUES ('When you are mentionned', 1, null);                                                   -- 4
INSERT INTO actions(description, id_service, params) VALUES ('You like a song', 2, null);                                                           -- 5
INSERT INTO actions(description, id_service, params) VALUES ('A streamer exceed an amount of viewer', 4, ARRAY['Streamer name', 'Amount']);         -- 6
INSERT INTO actions(description, id_service, params) VALUES ('A selected streamer starts a new stream', 4, ARRAY['Streamer name']);                 -- 7
INSERT INTO actions(description, id_service, params) VALUES ('You start listening a song', 2, null);                                                -- 8
INSERT INTO actions(description, id_service, params) VALUES ('You post a tweet', 1, null);                                                          -- 9
INSERT INTO actions(description, id_service, params) VALUES ('You win a game', 7, ARRAY['Your tag']);                                               -- 10
INSERT INTO actions(description, id_service, params) VALUES ('You lose a game', 7, ARRAY['Your tag']);                                              -- 11


--Reactions--
CREATE TABLE reactions (
    id                  SERIAL,
    description         varchar(255) NOT NULL,
    id_service          INT,
    params              text[],
    primary key(id)
);

INSERT INTO reactions(description, id_service, params) VALUES ('Message a specific user on discord', 3, ARRAY['Username']);                         -- 1
INSERT INTO reactions(description, id_service, params) VALUES ('Send message to group chat', 6, ARRAY['Group name']);                               -- 2
INSERT INTO reactions(description, id_service, params) VALUES ('Message on discord server', 3, ARRAY['Server name', 'Channel name']);               -- 3
INSERT INTO reactions(description, id_service, params) VALUES ('Post a tweet', 1, ARRAY['Tweet text']);                                             -- 4
INSERT INTO reactions(description, id_service, params) VALUES ('Send message at a specific user', 6, ARRAY['User']);                                -- 5
INSERT INTO reactions(description, id_service, params) VALUES ('Will play a specific song', 2, ARRAY['Artist name', 'Song name']);                  -- 6
INSERT INTO reactions(description, id_service, params) VALUES ('Post a subreddit', 5, ARRAY['Subreddit', 'Title', 'Text']);                         -- 7


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

--Conversation--
CREATE TABLE conversation (
    id                  SERIAL,
    name                text,
    users               text[],
    primary key(id)
);

--Messages--
CREATE TABLE messages (
    id                  SERIAL,
    id_conv             int,
    id_sender           int,
    msg                 text,
    date                text,
    primary key(id)
);