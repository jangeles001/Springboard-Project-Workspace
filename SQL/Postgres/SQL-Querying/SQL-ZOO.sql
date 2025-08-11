/*
0 SELECT BASICS
1.) Modify it to show the population of Germany
*/

SELECT population
FROM world
WHERE name = 'Germany';

/*
2.) Show the name and the population for 'Sweden', 'Norway' and 'Denmark'.
*/

SELECT name, population 
FROM world
WHERE name 
IN ('Sweden', 'Norway', 'Denmark');

/*
3.) Modify it to show the country and the area for countries with an area between 200,000 and 250,000.
*/

SELECT name, area 
FROM world
WHERE area 
BETWEEN 200000 
AND 250000;
-------------------------------------------------------------------------------------------------
/*
1 SELECT NAME
1.) Find the country that start with Y.
*/

SELECT name
FROM world
WHERE name 
LIKE 'Y%';

/*
2.) Find the countries that end with y.
*/

SELECT name
FROM world
WHERE name 
LIKE '%y';

/*
3.) Find the countries that contain the letter x.
*/

SELECT name 
FROM world
WHERE name 
LIKE '%x%';

/*
4.) Find the countries that end with land.
*/

SELECT name 
FROM world
WHERE name 
LIKE '%land';

/*
5.) Find the countries that start with C and end with ia.
*/

SELECT name 
FROM world
WHERE name 
LIKE 'C%ia';

/*
6.) Find the country that has oo in the name.
*/

SELECT name 
FROM world
WHERE name 
LIKE '%oo%';

/*
7.) Find the countries that have three or more a in the name.
*/

SELECT name 
FROM world
WHERE name 
LIKE '%a%a%a%';

/*
8.) Find the countries that have "t" as the second character.
*/

SELECT name
FROM world 
WHERE name 
LIKE '_t%'
ORDER BY name;

/*
9.) Find the countries that have two "o" characters separated by two others.
*/

SELECT name 
FROM world
WHERE name 
LIKE '%o__o%';

/*
10.) Find the countries that have exactly four characters.
*/

SELECT name 
FROM world
WHERE name 
LIKE '____';

/*
Harder Questions
11.) Find the country where the name is the capital city.
*/

SELECT w.name
FROM world w
WHERE w.capital 
LIKE w.name;

/*
12.) Find the country where the capital is the country plus "City".
*/

SELECT w.name
FROM world w
WHERE w.capital 
LIKE concat(w.name, '%City');

/*
13.) Find the capital and the name where the capital includes the name of the country.
*/

SELECT w.capital, w.name
FROM world w
WHERE w.capital 
LIKE concat(w.name,'%');

/*
14.) Find the capital and the name where the capital is an extension of name of the country.
*/

SELECT w.capital, w.name
FROM world w
WHERE w.capital 
LIKE concat(w.name,'_%');

/*
15.) Show the name and the extension where the capital is a proper (non-empty) extension of name of the country.
*/

SELECT w.name, 
REPLACE(w.capital, w.name, '') AS extension
FROM world w 
WHERE w.capital 
LIKE concat(w.name, '_%');

-------------------------------------------------------------------------------------------------
/*
2 SELECT FROM WORLD
1.) Observe the result of running this SQL command to show the name, continent and population of all countries.
*/

SELECT w.name, w.continent, w.population 
FROM world w;


/*
2.)How to use WHERE to filter records. 
Show the name for the countries that have a population of at least 200 million. 200 million is 200000000, there are eight zeros
*/

SELECT w.name 
FROM world w
WHERE population >= 200000000;

/*
3.) Give the name and the per capita GDP for those countries with a population of at least 200 million.
*/

SELECT w.name, 
w.GDP/w.population AS 'per capita GDP'
FROM world w
WHERE population >= 200000000;

/*
4.) Show the name and population in millions for the countries of the continent 'South America'. 
Divide the population by 1000000 to get population in millions.
*/

SELECT w.name, 
w.population/1000000 AS 'population (millions)'
FROM world w
WHERE w.continent 
LIKE 'South America';

/*
5.) Show the name and population for France, Germany, Italy.
*/

SELECT w.name, w.population
FROM world w
WHERE w.name 
IN ('France','Germany', 'Italy');

/*
6.) Show the countries which have a name that includes the word 'United'
*/

SELECT w.name
FROM world w
WHERE w.name 
LIKE '%United%';

/*
7.) Two ways to be big: A country is big if it has an area of more than 3 million sq km or it has a population of more than 250 million.
Show the countries that are big by area or big by population. Show name, population and area.
*/

SELECT w.name, w.population, w.area
FROM world w
WHERE w.area > 3000000 
OR w.population > 250000000;

/*
8.) Exclusive OR (XOR). Show the countries that are big by area (more than 3 million) or big by population (more than 250 million) but not both. 
Show name, population and area.
Australia has a big area but a small population, it should be included.
Indonesia has a big population but a small area, it should be included.
China has a big population and big area, it should be excluded.
United Kingdom has a small population and a small area, it should be excluded.
*/

SELECT w.name, w.population, w.area
FROM world w
WHERE w.area > 3000000 
XOR w.population > 250000000;

/*
9.) Show the name and population in millions and the GDP in billions for the countries of the continent 'South America'. 
Use the ROUND function to show the values to two decimal places.
For Americas show population in millions and GDP in billions both to 2 decimal places.
*/

SELECT w.name, 
ROUND(w.population/1000000.0,2), 
ROUND(w.GDP/1000000000.0, 2)
FROM world w
WHERE w.continent 
LIKE 'South America';

/*
10.) Show the name and per-capita GDP for those countries with a GDP of at least one trillion (1000000000000; that is 12 zeros). 
Round this value to the nearest 1000.
Show per-capita GDP for the trillion dollar countries to the nearest $1000.
*/

SELECT w.name, 
ROUND(w.GDP/population,-3)
FROM world w
WHERE w.GDP >= 1000000000000;

/*
11.) Greece has capital Athens.
Each of the strings 'Greece', and 'Athens' has 6 characters.
Show the name and capital where the name and the capital have the same number of characters.
You can use the LENGTH function to find the number of characters in a string
For Microsoft SQL Server the function LENGTH is LEN
*/

SELECT w.name, w.capital
FROM world w
WHERE LENGTH(name) = LENGTH(capital);

/*
12.) The capital of Sweden is Stockholm. Both words start with the letter 'S'.
Show the name and the capital where the first letters of each match. Don't include countries where the name and the capital are the same word.
You can use the function LEFT to isolate the first character.
You can use <> as the NOT EQUALS operator.
*/

SELECT w.name, w.capital
FROM world w
WHERE LEFT(w.name, 1) = LEFT(w.capital, 1) 
AND w.name <> w.capital;

/*
13.) Equatorial Guinea and Dominican Republic have all of the vowels (a e i o u) in the name. 
They don't count because they have more than one word in the name.
Find the country that has all the vowels and no spaces in its name.
You can use the phrase name NOT LIKE '%a%' to exclude characters from your results.
The query shown misses countries like Bahamas and Belarus because they contain at least one 'a'
*/

SELECT name
FROM world
WHERE name LIKE '%a%'
AND name LIKE '%e%'
AND name LIKE '%i%'
AND name LIKE '%o%'
AND name LIKE '%u%'
AND name NOT LIKE '% %';

-------------------------------------------------------------------------------------------------

/*
3 SELECT from Nobel
1.) Change the query shown so that it displays Nobel prizes for 1950.
*/

SELECT n.yr, n.subject, n.winner
FROM nobel n
WHERE yr = 1950;

/*
2.) Show who won the 1962 prize for literature.
*/

SELECT n.winner
FROM nobel n
WHERE yr = 1962
AND subject = 'literature';

/*
3.) Show the year and subject that won 'Albert Einstein' his prize.
*/

SELECT n.yr, n.subject
FROM nobel n
WHERE n.winner = 'Albert Einstein';

/*
4.) Give the name of the 'peace' winners since the year 2000, including 2000.
*/

SELECT n.winner 
FROM nobel n
WHERE n.yr >= 2000 
AND subject = 'peace';

/*
5.) Show all details (yr, subject, winner) of the literature prize winners for 1980 to 1989 inclusive.
*/

SELECT *
FROM nobel n
WHERE n.yr >= 1980 
AND n.yr <= 1989
AND n.subject = 'literature';

/*
6.) Show all details of the presidential winners:
Theodore Roosevelt
Thomas Woodrow Wilson
Jimmy Carter
Barack Obama
*/

SELECT * FROM nobel n
WHERE n.winner 
IN 
(
'Theodore Roosevelt',
'Thomas Woodrow Wilson',
'Jimmy Carter', 
'Barack Obama'
);


/*
7.) Show the winners with first name John.
*/

SELECT n.winner
FROM nobel n
WHERE n.winner 
LIKE 'John%';

/*
8.) Show the year, subject, and name of physics winners for 1980 together with the chemistry winners for 1984.
*/

SELECT *
FROM nobel n
WHERE n.subject = 'physics' 
AND n.yr = 1980 
XOR n.subject = 'chemistry' 
AND n.yr = 1984; 

/*
9.) Show the year, subject, and name of winners for 1980 excluding chemistry and medicine.
*/

SELECT * 
FROM nobel n
WHERE n.subject NOT IN ('chemistry', 'medicine') 
AND n.yr = 1980;

/*
10.) Show year, subject, and name of people who won a 'Medicine' prize in an early year (before 1910, not including 1910) 
together with winners of a 'Literature' prize in a later year (after 2004, including 2004)
*/

SELECT * 
FROM nobel n
WHERE n.subject = 'medicine' 
AND n.yr < 1910
OR n.subject = 'literature' 
AND n.yr >= 2004;

/*
11.) Find all details of the prize won by PETER GRÜNBERG
Non-ASCII characters
The u in his name has an umlaut. You may find this link useful https://en.wikipedia.org/wiki/%C3%9C#Keyboarding
*/

SELECT * 
FROM nobel n
WHERE n.winner 
LIKE 'Peter Grünberg';

/*
12.) Find all details of the prize won by EUGENE O'NEILL.
*/

SELECT * 
FROM nobel n
WHERE n.winner 
LIKE 'Eugene O''Neill';

/*
13.) Knights in order
List the winners, year and subject where the winner starts with Sir. Show the the most recent first, then by name order
*/

SELECT n.winner, n.yr, n.subject
FROM nobel n
WHERE n.winner 
LIKE 'SIR_%' 
ORDER BY n.yr DESC, n.winner;


/*
14.) The expression subject IN ('chemistry','physics') can be used as a value - it will be 0 or 1.
Show the 1984 winners and subject ordered by subject and winner name; but list chemistry and physics last.
*/

SELECT n.winner, n.subject
FROM nobel n
WHERE n.yr=1984
ORDER BY n.subject IN ('physics','chemistry') ASC, n.subject,n.winner;

-------------------------------------------------------------------------------------------------

/*
5 SUM and COUNT
1.) Show the total population of the world.
*/

SELECT SUM(population)
FROM world;

/*
2.) List all the continents - just once each.
*/

SELECT w.continent 
FROM world w
GROUP BY w.continent;

/*
3.) Give the total GDP of Africa.
*/

SELECT SUM(w.GDP) as total_GDP
FROM world w
WHERE w.continent = 'Africa'
GROUP BY w.continent;

/*
4.) How many countries have an area of at least 1000000.
*/

SELECT COUNT(*) 
FROM world w
WHERE w.area >= 1000000;

/*
5.) What is the total population of ('Estonia', 'Latvia', 'Lithuania').
*/

SELECT SUM(w.population)
FROM world w
WHERE w.name 
IN ('Estonia', 'Latvia', 'Lithuania');

/*
6.) For each continent show the continent and number of countries.
*/

SELECT w.continent, COUNT(*)
FROM world w
GROUP BY w.continent;

-- 7.) For each continent show the continent and number of countries with populations of at least 10 million. --


SELECT w.continent, COUNT(*)
FROM world w
WHERE w.population >= 10000000
GROUP BY w.continent;


-- 8.) List the continents that have a total population of at least 100 million. --


SELECT w.continent
FROM world w
GROUP BY w.continent
HAVING SUM(w.population) >= 100000000;

-------------------------------------------------------------------------------------------------

-- 4 SELECT within SELECT --
-- 1.) List each country name where the population is larger than that of 'Russia'. --
SELECT name FROM world
WHERE population > (
SELECT population 
FROM world
WHERE name='Russia'
);

-- 2.) Show the countries in Europe with a per capita GDP greater than 'United Kingdom'. --
SELECT w.name FROM world w
WHERE w.gdp/w.population > (
SELECT w2.gdp/w2.population 
FROM world w2
WHERE w2.name='United Kingdom'
)
AND w.continent = 'EUROPE';


-- 3.) List the name and continent of countries in the continents containing either Argentina or Australia. Order by name of the country. --
SELECT w.name, w.continent FROM world w
WHERE w.continent IN (
SELECT w2.continent 
FROM world w2
WHERE w2.name ='Argentina' 
OR w2.name = "Australia"
) 
ORDER BY w.name;

-- 4.) Which country has a population that is more than United Kingdom but less than Germany? Show the name and the population. --
SELECT w.name, w.population FROM world w
WHERE w.population > (
SELECT w2.population 
FROM world w2
WHERE w2.name ='United Kingdom'
) 
AND w.population < (
SELECT w3.population 
FROM world w3
WHERE w3.name ='Germany'
);

--5.) Germany (population roughly 80 million) has the largest population of the countries in Europe. Austria (population 8.5 million) has 11% of the population of Germany.

-- Show the name and the population of each country in Europe. Show the population as a percentage of the population of Germany. --

-- The format should be Name, Percentage for example: --

-- name	percentage --
-- Albania	3% --
-- Andorra	0% --
-- Austria	11% --
SELECT w.name, CONCAT(ROUND((w.population/(SELECT w2.population FROM world w2
      WHERE w2.name ='Germany')*100), 0),'%')
FROM world w
WHERE w.continent = 'Europe';

--6.) Which countries have a GDP greater than every country in Europe? [Give the name only.] (Some countries may have NULL gdp values) --
SELECT w.name
FROM world w
WHERE w.gdp > ALL(SELECT w2.gdp
                  FROM world w2
                  WHERE w2.gdp > 0 AND w2.continent = 'Europe')

--7.) Find the largest country (by area) in each continent, show the continent, the name and the area:
-- The above example is known as a correlated or synchronized sub-query. --
SELECT x.continent, x.name, x.area 
FROM world x
WHERE x.area >= ALL(SELECT y.area FROM world y
                    WHERE y.continent=x.continent
                    AND y.area > 0)

--8.) List each continent and the name of the country that comes first alphabetically. --
SELECT w.continent, MIN(w.name) AS first_country
FROM world w
GROUP BY w.continent;

--9.) Find the continents where all countries have a population <= 25000000. Then find the names of the countries associated with these continents. Show name, continent and population. --
SELECT w.name, w.continent, w.population
FROM world w
WHERE w.continent IN (
SELECT w2.continent
FROM world w2
GROUP BY w2.continent
HAVING MAX(w2.population) <= 25000000
);

--10.) Some countries have populations more than three times that of all of their neighbours (in the same continent). Give the countries and continents. --
SELECT w.name, w.continent
FROM world w
WHERE NOT EXISTS (
SELECT 1
FROM world w2
WHERE w.continent = w2.continent
AND w.name <> w2.name
AND w.population <= 3 * w2.population
);