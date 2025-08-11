-- Join the two tables so that every column and record appears, regardless of if there is not an owner_id . Your output should look like this: --
SELECT *
FROM owners
FULL OUTER JOIN vehicles
ON owners.id = vehicles.owner_id;

-- Count the number of cars for each owner. Display the owners first_name , last_name and count of vehicles. The first_name should be ordered in ascending order. --
SELECT o.first_name, o.last_name, COUNT(v.id) AS count
FROM owners o
JOIN vehicles v ON v.owner_id = o.id
GROUP BY o.id
ORDER BY o.first_name ASC;

-- Count the number of cars for each owner and display the average price for each of the cars as integers. Display the owners first_name , last_name, average price and count of vehicles. --
-- The first_name should be ordered in descending order. Only display results with more than one vehicle and an average price greater than 10000. --
SELECT o.first_name, o.last_name, ROUND(AVG(v.price)::numeric, 0) AS average_price, COUNT(v.id) AS count
FROM owners o
JOIN vehicles v ON v.owner_id = o.id
GROUP BY o.id
HAVING AVG(v.price) > 10000
ORDER BY o.first_name DESC;

------------------------------------------------------------------------------------------------------------------------------------------------------------------------

-- Part Two: SQL Zoo --
-- 6 The JOIN operation --

-- 1.) Modify it to show the matchid and player name for all goals scored by Germany. To identify German players, check for: teamid = 'GER' --
SELECT g.matchid, g.player FROM goal g 
WHERE g.teamid LIKE 'GER';

-- 2.) Show id, stadium, team1, team2 for just game 1012 --
SELECT g.id, g.stadium, g.team1, g.team2
FROM game g
WHERE g.id = 1012;

-- 3.) Modify it to show the player, teamid, stadium and mdate for every German goal. --
SELECT goal.player, goal.teamid, g.stadium, g.mdate
FROM game g JOIN goal ON (g.id=goal.matchid)
WHERE goal.teamid = 'GER';

-- 4.) Show the team1, team2 and player for every goal scored by a player called Mario player LIKE 'Mario%' --
SELECT g.team1, g.team2, goal.player
FROM game g JOIN goal ON (g.id=goal.matchid)
WHERE goal.player LIKE 'Mario%';

-- 5.) Show player, teamid, coach, gtime for all goals scored in the first 10 minutes gtime<=10 --
SELECT g.player, g.teamid, eteam.coach, g.gtime
FROM goal g JOIN eteam ON (g.teamid=eteam.id)
WHERE gtime <= 10;

-- 6.) List the dates of the matches and the name of the team in which 'Fernando Santos' was the team1 coach. --
SELECT g.mdate, eteam.teamname
FROM game g JOIN eteam ON (g.team1 = eteam.id)
WHERE eteam.coach LIKE ('Fernando Santos')

-- 7.) List the player for every goal scored in a game where the stadium was 'National Stadium, Warsaw' --
SELECT g.player
FROM goal g JOIN game ON (g.matchid = game.id)
WHERE game.stadium LIKE ('National Stadium, Warsaw')

-- 8.) Instead show the name of all players who scored a goal against Germany. --
SELECT DISTINCT g.player
FROM goal g JOIN game ON (g.matchid = game.id)
WHERE g.teamid != ('GER') AND (game.team1 = 'GER' OR game.team2 = 'GER')

-- 9.) Show teamname and the total number of goals scored. --
SELECT eteam.teamname, COUNT(*)
FROM eteam JOIN goal ON eteam.id= goal.teamid
GROUP BY eteam.teamname
ORDER BY eteam.teamname

-- 10.) Show the stadium and the number of goals scored in each stadium. --
SELECT g.stadium, COUNT(*)
FROM game g JOIN goal ON (g.id = goal.matchid)
GROUP BY g.stadium
ORDER BY g.stadium

-- 11.) For every match involving 'POL', show the matchid, date and the number of goals scored. --
SELECT goal.matchid, g.mdate, COUNT(*)
FROM game g JOIN goal ON (goal.matchid = g.id)
WHERE (g.team1 = 'POL' OR g.team2 = 'POL')
GROUP BY goal.matchid, g.mdate

-- 12.) For every match where 'GER' scored, show matchid, match date and the number of goals scored by 'GER' --
SELECT goal.matchid, g.mdate, COUNT(*)
FROM game g JOIN goal ON (goal.matchid = g.id)
WHERE (goal.teamid = 'GER')
GROUP BY goal.matchid, g.mdate

-- 13.) List every match with the goals scored by each team as shown. This will use "CASE WHEN" which has not been explained in any previous exercises. --
SELECT 
g1.mdate,
g1.team1,
SUM(CASE WHEN g.teamid = g1.team1 THEN 1 ELSE 0 END) AS score1,
g1.team2,
SUM(CASE WHEN g.teamid = g1.team2 THEN 1 ELSE 0 END) AS score2
FROM game g1
LEFT JOIN goal g ON g1.id = g.matchid
GROUP BY g1.mdate, g.matchid, g1.team1, g1.team2
ORDER BY g1.mdate, g.matchid, g1.team1, g1.team2;


------------------------------------------------------------------------------------------------------------------------------------------------------------------------

/*

DATA SHAPE/CATEGORY NAME

                    movie
id	title	yr	director	budget	gross

         actor
        id	name

    casting
movieid	actorid	ord

*/


-- 6 The JOIN operation --
-- 1.) List the films where the yr is 1962 and the budget is over 2000000 [Show id, title] --
SELECT m.id, m.title
FROM movie m
WHERE yr=1962 AND m.budget > 2000000;

-- 2.) Give year of 'Citizen Kane'. --
SELECT m.yr
FROM movie m
WHERE title LIKE ('Citizen Kane');

-- 3.) List all of the Star Trek movies, include the id, title and yr (all of these movies start with the words Star Trek in the title). Order results by year. --
SELECT m.id, m.title, m.yr
FROM movie m 
WHERE m.title LIKE ('Star Trek%')
ORDER BY m.yr ASC;

-- 4.) What id number does the actor 'Glenn Close' have? --
SELECT a.id 
FROM actor a
WHERE a.name LIKE ('Glenn Close');

-- 5.) What is the id of the 1942 film 'Casablanca' --
SELECT m.id
FROM movie m
WHERE m.title LIKE ('Casablanca') AND m.yr = 1942;

-- 6.) Obtain the cast list for 1942's 'Casablanca'. Use movieid=11768, (or whatever value you got from the previous question) --
SELECT a.name
FROM actor a JOIN casting ON (a.id=casting.actorid)
WHERE casting.movieid = 132689;

-- 7.) Obtain the cast list for the film 'Alien' --
SELECT a.name
FROM actor a JOIN casting ON (a.id=casting.actorid)
WHERE casting.movieid = (SELECT m.id FROM movie m
                         WHERE m.title LIKE ("ALIEN"));

-- 8.) List the films in which 'Harrison Ford' has appeared --
SELECT m.title 
FROM movie m JOIN casting ON (m.id = casting.movieid)
WHERE casting.actorid IN (SELECT a.id FROM actor a
                          WHERE a.name LIKE ('Harrison Ford'));

-- 9.) List the films where 'Harrison Ford' has appeared - but not in the starring role. [Note: the ord field of casting gives the position of the actor. If ord=1 then this actor is in the starring role] --
SELECT m.title 
FROM movie m JOIN casting ON (m.id = casting.movieid)
WHERE casting.actorid IN (SELECT a.id FROM actor a
                          WHERE a.name LIKE ('Harrison Ford'))
AND casting.ord != 1;

-- 10.) List the films together with the leading star for all 1962 films. --
SELECT m.title, a.name
FROM movie m
JOIN casting c ON (m.id = c.movieid)
JOIN actor a ON (c.actorid = a.id)
WHERE c.ord = 1 AND m.yr = 1962;

-- 11.) Which were the busiest years for 'Rock Hudson', show the year and the number of movies he made each year for any year in which he made more than 2 movies. --
SELECT m.yr,COUNT(m.title) FROM
  movie m JOIN casting c ON m.id = c.movieid
        JOIN actor a ON c.actorid = a.id
WHERE name='Rock Hudson'
GROUP BY m.yr
HAVING COUNT(m.title) > 2

-- 12.) List the film title and the leading actor for all of the films 'Julie Andrews' played in. --
SELECT m.title, a.name
FROM movie m JOIN casting c ON (c.movieid = m.id
                              AND ord=1)
            JOIN actor a ON (c.actorid = a.id)
    WHERE m.id IN (SELECT c.movieid FROM casting c 
Where c.actorid IN (
    SELECT a.id FROM actor a
    WHERE name LIKE ('Julie Andrews')));

-- 13.) Obtain a list, in alphabetical order, of actors who've had at least 15 starring roles. --
SELECT a.name
FROM actor a
JOIN casting c ON (a.id = c.actorid)
WHERE c.ord = 1        
GROUP BY a.name
HAVING COUNT(*) >= 15    
ORDER BY a.name;

-- 14.) List the films released in the year 1978 ordered by the number of actors in the cast, then by title. --
SELECT 
m.title, 
COUNT(c.actorid) AS num_actors
FROM movie m
JOIN casting c ON m.id = c.movieid
WHERE m.yr = 1978
GROUP BY m.id, m.title
ORDER BY num_actors DESC, m.title ASC;

-- 15.) List all the people who have worked with 'Art Garfunkel'. --
SELECT DISTINCT a2.name
FROM actor a
JOIN casting c1 ON a.id = c1.actorid
JOIN casting c2 ON c1.movieid = c2.movieid
JOIN actor a2 ON c2.actorid = a2.id
WHERE a.name = 'Art Garfunkel'
AND a2.name <> 'Art Garfunkel'