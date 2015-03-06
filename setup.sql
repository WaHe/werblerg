CREATE TABLE IF NOT EXISTS posts (
  source   TEXT                     NOT NULL,
  html     TEXT                     NOT NULL,
  synopsis TEXT                     NOT NULL,
  title    TEXT                     NOT NULL,
  date     TIMESTAMP WITH TIME ZONE NOT NULL,
  id       SERIAL UNIQUE            NOT NULL PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS categories (
  id   SERIAL UNIQUE NOT NULL PRIMARY KEY,
  name VARCHAR(50)   NOT NULL
);

CREATE TABLE IF NOT EXISTS post_categories (
  post_id     INT REFERENCES posts (id),
  category_id INT REFERENCES categories (id)
);
