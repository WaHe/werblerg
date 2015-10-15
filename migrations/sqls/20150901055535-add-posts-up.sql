CREATE TABLE IF NOT EXISTS posts (
  source   TEXT                     NOT NULL,
  html     TEXT                     NOT NULL,
  synopsis TEXT                     NOT NULL,
  title    TEXT                     NOT NULL,
  date     TIMESTAMP WITH TIME ZONE NOT NULL,
  id       SERIAL UNIQUE            NOT NULL PRIMARY KEY
);
