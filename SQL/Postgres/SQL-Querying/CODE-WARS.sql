/*
SQL Basics: Simple WHERE and ORDER BY
For this challenge you need to create a simple SELECT statement that will return all columns from the people table WHERE their age is over 50

people table schema
-id
-name
-age

You should return all people fields where their age is over 50 and order by the age descending

*/

SELECT *
FROM people p
WHERE p.age > 50
ORDER BY p.age DESC;

/*
SQL Basics: Simple SUM
For this challenge you need to create a simple SUM statement that will sum all the ages.

people table schema
-id
-name
-age
-select table schema
-age_sum (sum of ages)

NOTE: Your solution should use pure SQL. Ruby is used within the test cases to do the actual testing.

NOTE2: You need to use ALIAS for creating age_sum
*/

SELECT SUM(p.age) AS age_sum
FROM people p;

/*
SQL Basics: Simple MIN / MAX
For this challenge you need to create a simple MIN / MAX statement that will return the Minimum and Maximum ages out of all the people.

people table schema
-id
-name
-age
-select table schema
-age_min (minimum of ages)
-age_max (maximum of ages)
*/

SELECT MIN(p.age) AS age_min,
MAX(p.age) AS age_max
FROM people p;

/*
Find all active students
Create a simple SELECT query to display student information of all ACTIVE students.

TABLE STRUCTURE:
students
-Id (integer)	FirstName (text)	LastName (text)	IsActive (boolean)

Note:

IsActive (true = 1 or false = 0)
see specification: Datatypes In SQLite
*/

SELECT * 
FROM students s
WHERE IsActive;

/*
SQL Basics: Simple GROUP BY
For this challenge you need to create a simple GROUP BY statement, you want to group all the people by their age and count the people who have the same age.

people table schema
-id
-name
-age
-select table schema
-age [group by]
-people_count (people count)
*/

SELECT p.age, COUNT(*) 
FROM people p
GROUP BY p.age;

/*
SQL Basics: Simple HAVING
For this challenge you need to create a simple HAVING statement, you want to count how many people have the same age and return the groups with 10 or more people who have that age.

people table schema
-id
-name
-age
-return table schema
-age
-total_people
*/

SELECT p.age, COUNT(*) AS people_count
FROM people p
GROUP BY p.age
HAVING COUNT(*) >= 10;

