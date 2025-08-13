DROP DATABASE IF EXISTS craigslist;

CREATE DATABASE craigslist;

\c craigslist

CREATE TABLE regions
(
    region_id SERIAL PRIMARY KEY,
    region_name VARCHAR(50) NOT NULL
);

CREATE TABLE users
(
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(50) UNIQUE NOT NULL,
    preferred_region INTEGER DEFAULT NULL REFERENCES regions(region_id) ON DELETE SET NULL
);

CREATE TABLE posts
(
    post_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    creator_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    loc VARCHAR(20),
    region INTEGER REFERENCES regions(region_id) ON DELETE SET NULL,
    post_date DATE DEFAULT CURRENT_DATE
);

CREATE TABLE categories
(
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(20) NOT NULL
);

CREATE TABLE post_categories (
    post_id INTEGER REFERENCES posts(post_id) ON DELETE CASCADE,
    category_id INTEGER REFERENCES categories(category_id) ON DELETE CASCADE,
    PRIMARY KEY (post_id, category_id)
);