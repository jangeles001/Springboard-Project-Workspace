-- from the terminal run:
-- psql < outer_space.sql

DROP DATABASE IF EXISTS outer_space;

CREATE DATABASE outer_space;

\c outer_space

-- CREATE TABLE planets
-- (
--   id SERIAL PRIMARY KEY,
--   name TEXT NOT NULL,
--   orbital_period_in_years FLOAT NOT NULL,
--   orbits_around TEXT NOT NULL,
--   galaxy TEXT NOT NULL,
--   moons TEXT[]
-- );


CREATE TABLE galaxies (
    galaxy_id SERIAL PRIMARY KEY,
    galaxy_name TEXT NOT NULL UNIQUE
);

CREATE TABLE stars (
    star_id SERIAL PRIMARY KEY,
    star_name TEXT NOT NULL UNIQUE,
    galaxy_id INTEGER NOT NULL REFERENCES galaxies(galaxy_id)
);

CREATE TABLE planets (
    planet_id SERIAL PRIMARY KEY,
    planet_name TEXT NOT NULL UNIQUE,
    orbital_period_in_years FLOAT NOT NULL,
    star_id INTEGER NOT NULL REFERENCES stars(star_id)
);

CREATE TABLE moons (
    moon_id SERIAL PRIMARY KEY,
    moon_name TEXT NOT NULL,
    planet_id INTEGER NOT NULL REFERENCES planets(planet_id)
);

-- INSERT INTO planets
--   (name, orbital_period_in_years, orbits_around, galaxy, moons)
-- VALUES
--   ('Earth', 1.00, 'The Sun', 'Milky Way', '{"The Moon"}'),
--   ('Mars', 1.88, 'The Sun', 'Milky Way', '{"Phobos", "Deimos"}'),
--   ('Venus', 0.62, 'The Sun', 'Milky Way', '{}'),
--   ('Neptune', 164.8, 'The Sun', 'Milky Way', '{"Naiad", "Thalassa", "Despina", "Galatea", "Larissa", "S/2004 N 1", "Proteus", "Triton", "Nereid", "Halimede", "Sao", "Laomedeia", "Psamathe", "Neso"}'),
--   ('Proxima Centauri b', 0.03, 'Proxima Centauri', 'Milky Way', '{}'),
--   ('Gliese 876 b', 0.23, 'Gliese 876', 'Milky Way', '{}');

INSERT INTO galaxies (galaxy_name) 
VALUES
('Milky Way');

INSERT INTO stars (star_name, galaxy_id) 
VALUES
('The Sun', 1),
('Proxima Centauri', 1),
('Gliese 876', 1);

INSERT INTO planets (planet_name, orbital_period_in_years, star_id) 
VALUES
('Earth', 1.00, 1),
('Mars', 1.88, 1),
('Venus', 0.62, 1),
('Neptune', 164.8, 1),
('Proxima Centauri b', 0.03, 2),
('Gliese 876 b', 0.23, 3);

INSERT INTO moons (moon_name, planet_id) 
VALUES
('The Moon', 1),
('Phobos', 2),
('Naiad', 4),
('Thalassa', 4),
('Despina', 4),
('Galatea', 4),
('Larissa', 4),
('S/2004 N 1', 4),
('Proteus', 4),
('Triton', 4),
('Nereid', 4),
('Halimede', 4),
('Sao', 4),
('Laomedeia', 4),
('Psamathe', 4),
('Neso', 4);