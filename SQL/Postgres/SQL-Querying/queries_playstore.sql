-- Table "public.analytics"
--      Column      |  Type   | Collation | Nullable |                Default
-- -----------------+---------+-----------+----------+---------------------------------------
--  id              | integer |           | not null | nextval('analytics_id_seq'::regclass)
--  app_name        | text    |           | not null |
--  category        | text    |           | not null |
--  rating          | real    |           |          |
--  reviews         | integer |           |          |
--  size            | text    |           |          |
--  min_installs    | integer |           |          |
--  price           | real    |           |          |
--  content_rating  | text    |           |          |
--  genres          | text[]  |           |          |
--  last_updated    | date    |           |          |
--  current_version | text    |           |          |
--  android_version | text    |           |          |
-- Indexes:
--     "analytics_pkey" PRIMARY KEY, btree (id)

-- 1. Find the app with an ID of ***1880*** --
SELECT a.app_name
FROM analytics a
WHERE a.id = 1880;

-- 2. Find the ID and app name for all apps that were last updated on August 01, 2018. --
SELECT a.app_name, a.id
FROM analytics a
WHERE last_updated::date = '2018-01-18';

-- 3. Count the number of apps in each category, e.g. “Family | 1972”. --
SELECT a.category, COUNT(*) AS app_count
FROM analytics a
GROUP BY category;

-- 4. Find the top 5 most-reviewed apps and the number of reviews for each. --
SELECT a.app_name, a.reviews
FROM analytics a
ORDER BY a.reviews DESC
LIMIT 5;

-- 5. Find the app that has the most reviews with a rating greater than equal to 4.8. --
SELECT a.app_name, a.reviews, a.rating
FROM analytics a
WHERE a.rating >= 4.8 
ORDER BY a.reviews DESC
LIMIT 1;

-- 6. Find the average rating for each category ordered by the highest rated to lowest rated. --
SELECT a.category, AVG(a.rating)
FROM analytics a
GROUP BY a.category
ORDER BY AVG(a.rating) DESC;

-- 7. Find the name, price, and rating of the most expensive app with a rating that’s less than 3. --
SELECT a.app_name, a.price, a.rating
FROM analytics a
WHERE a.rating < 3
ORDER BY a.price DESC
LIMIT 1;

-- 8. Find all apps with a min install not exceeding 50, that have a rating. Order your results by highest rated first. --
SELECT a.app_name
FROM analytics a
WHERE a.min_installs < 50 AND a.rating > 0
ORDER BY a.rating DESC, a.min_installs DESC;

-- 9. Find the names of all apps that are rated less than 3 with at least 10000 reviews. --
SELECT a.app_name
FROM analytics a
WHERE a.rating < 3 AND a.reviews >= 10000;

-- 10. Find the top 10 most-reviewed apps that cost between 10 cents and a dollar. --
SELECT a.app_name, a.reviews, a.price
FROM analytics a
WHERE a.price > .10 AND a.price < 1
ORDER BY a.reviews DESC
LIMIT 10;

-- 11. Find the most out of date app. Hint: You don’t need to do it this way, but it’s possible to do with a 
-- subquery: http://www.postgresqltutorial.com/postgresql-max-function/ --
SELECT a.app_name, a.last_updated
FROM analytics a
ORDER BY a.last_updated::date ASC
LIMIT 1;

--USING MIN()
SELECT a.app_name, a.last_updated
FROM analytics a
WHERE a.last_updated = (
SELECT MIN(last_updated)
FROM analytics
);


-- 12. Find the most expensive app (the query is very similar to #11). --
SELECT a.app_name, a.price
FROM analytics a
ORDER BY a.price ASC
LIMIT 1;

--USING MIN()
SELECT a.app_name, a.price
FROM analytics a
WHERE a.price = (
SELECT MIN(price)
FROM analytics
)
LIMIT 1;

-- 13. Count all the reviews in the Google Play Store. --
SELECT SUM(a.reviews) AS total_reviews
FROM analytics a;

-- 14. Find all the categories that have more than 300 apps in them. --
SELECT a.category, COUNT(*) AS total_apps 
FROM analytics a
GROUP BY a.category
HAVING COUNT(*) > 300
ORDER BY COUNT(*) DESC;

-- 15. Find the app that has the highest proportion of min_installs to reviews, among apps that have been installed at least 100,000 times. --
-- Display the name of the app along with the number of reviews, the min_installs, and the proportion. --
SELECT a.app_name, a.reviews, a.min_installs, (min_installs * 1.0 / reviews) AS proportion
FROM analytics a
WHERE a.min_installs >= 100000
ORDER BY proportion DESC
LIMIT 1;

-- *** FURTHER STUDY *** ---
-- FS1. Find the name and rating of the top rated apps in each category, among apps that have been installed at least 50,000 times. --
SELECT a.category, a.app_name
FROM analytics a
WHERE a.rating = (
SELECT MAX(a2.rating)
FROM analytics a2
WHERE a2.category = a.category
AND a2.min_installs >= 50000
)
AND a.min_installs >= 50000;

-- FS2. Find all the apps that have a name similar to “facebook”. --
SELECT a.*
FROM analytics a
WHERE a.app_name ILIKE '%facebook%';

-- FS3. Find all the apps that have more than 1 genre. --
SELECT a.app_name, a.genres
FROM analytics a
WHERE CARDINALITY(a.genres) > 1;

-- FS4. Find all the apps that have education as one of their genres. --
SELECT a.app_name, a.genres
FROM analytics a, UNNEST(a.genres) g
WHERE lower(g) LIKE '%education%';