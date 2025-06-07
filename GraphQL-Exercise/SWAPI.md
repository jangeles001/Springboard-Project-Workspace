## Tasks 📋

### Basic Tasks

1. **List All Films**: Retrieve the titles of all films available in SWAPI.

### Query

```GraphQL:
{
    allFilms{
        films{
            title
        }
    }

}
```

### Response

```JSON:
{
  "data": {
    "allFilms": {
      "films": [
        {
          "title": "A New Hope"
        },
        {
          "title": "The Empire Strikes Back"
        },
        {
          "title": "Return of the Jedi"
        },
        {
          "title": "The Phantom Menace"
        },
        {
          "title": "Attack of the Clones"
        },
        {
          "title": "Revenge of the Sith"
        },
    }
  }
}
```

2. **Fetch a Specific Character**: Get the name of a specific character using their unique ID.

### Query

```GraphQL:
{
  person(id: "cGVvcGxlOjE=") {
    name
  }
}

```

### Response

```JSON:
{
  "data": {
    "person": {
      "name": "Luke Skywalker"
    }
  }
}
```

3. **Explore Planets**: Get the names of the first 5 planets in the Star Wars universe.

### Query

```GraphQL:
{
    allPlanets(first:5){
        planets{
            name
        }
    }
}
```

### Response

```JSON:
{
  "data": {
    "allPlanets": {
      "planets": [
        {
          "name": "Tatooine"
        },
        {
          "name": "Alderaan"
        },
        {
          "name": "Yavin IV"
        },
        {
          "name": "Hoth"
        },
        {
          "name": "Dagobah"
        }
      ]
    }
  }
}
```

4. **Starships Information**: Fetch names and models of 3 starships.

### Query

```GraphQL:
{
    allStarships(first: 3){
        starships{
            name, model
        }
    }
}
```

### Response

```JSON:
{
  "data": {
    "allStarships": {
      "starships": [
        {
          "name": "CR90 corvette",
          "model": "CR90 corvette"
        },
        {
          "name": "Star Destroyer",
          "model": "Imperial I-class Star Destroyer"
        },
        {
          "name": "Sentinel-class landing craft",
          "model": "Sentinel-class landing craft"
        }
      ]
    }
  }
}
```

### Intermediate Tasks

1. **Character and Their Starships**: For each of the first 5 characters, list the names of starships they've piloted.

### Query

```GraphQL:
{
  allPeople(first: 5) {
    people {
      name
      starshipConnection {
        starships{
          name
        }
      }
    }
  }
}
```

### Response

```JSON:
{
  "data": {
    "allPeople": {
      "people": [
        {
          "name": "Luke Skywalker",
          "starshipConnection": {
            "starships": [
              {
                "name": "X-wing"
              },
              {
                "name": "Imperial shuttle"
              }
            ]
          }
        },
        {
          "name": "C-3PO",
          "starshipConnection": {
            "starships": []
          }
        },
        {
          "name": "R2-D2",
          "starshipConnection": {
            "starships": []
          }
        },
        {
          "name": "Darth Vader",
          "starshipConnection": {
            "starships": [
              {
                "name": "TIE Advanced x1"
              }
            ]
          }
        },
        {
          "name": "Leia Organa",
          "starshipConnection": {
            "starships": []
          }
        }
      ]
    }
```

2. **Species and Their Languages**: Retrieve names and languages of 5 species.

### Query

```GraphQL:
{
  allSpecies(first: 5){
    species{
      name, language
    }
  }
}
```

### Response

```JSON:
{
  "data": {
    "allSpecies": {
      "species": [
        {
          "name": "Human",
          "language": "Galactic Basic"
        },
        {
          "name": "Droid",
          "language": "n/a"
        },
        {
          "name": "Wookiee",
          "language": "Shyriiwook"
        },
        {
          "name": "Rodian",
          "language": "Galatic Basic"
        },
        {
          "name": "Hutt",
          "language": "Huttese"
        }
      ]
    }
  }
}
```

3. **Planets and Their Climates**: Query for the names and climates of 5 planets.

### Query

```GraphQL:
{
 	allPlanets(first: 5){
    planets{
      name, climates
    }
  }
}
```

### Response

```JSON:
{
  "data": {
    "allPlanets": {
      "planets": [
        {
          "name": "Tatooine",
          "climates": [
            "arid"
          ]
        },
        {
          "name": "Alderaan",
          "climates": [
            "temperate"
          ]
        },
        {
          "name": "Yavin IV",
          "climates": [
            "temperate",
            "tropical"
          ]
        },
        {
          "name": "Hoth",
          "climates": [
            "frozen"
          ]
        },
        {
          "name": "Dagobah",
          "climates": [
            "murky"
          ]
        }
      ]
    }
  }
}
```

4. **Vehicles and Their Costs**: Get names and cost in credits for 3 vehicles.

### Query

```GraphQL:
{
 	allVehicles(first: 3){
    vehicles{
      name, costInCredits
    }
  }
}
```

### Response

```JSON:
{
  "data": {
    "allVehicles": {
      "vehicles": [
        {
          "name": "Sand Crawler",
          "costInCredits": 150000
        },
        {
          "name": "T-16 skyhopper",
          "costInCredits": 14500
        },
        {
          "name": "X-34 landspeeder",
          "costInCredits": 10550
        }
      ]
    }
  }
}
```

### Advanced Tasks

1. **Characters in a Specific Film**: List all characters appearing in a given film by ID.

### Query

```GraphQL:
{
  film(id: "ZmlsbXM6MQ=="){
    title
    characterConnection{
      characters{
        name
      }
    }
  }
}
```

### Response

```JSON:
{
  "data": {
    "film": {
      "title": "A New Hope",
      "characterConnection": {
        "characters": [
          {
            "name": "Luke Skywalker"
          },
          {
            "name": "C-3PO"
          },
          {
            "name": "R2-D2"
          },
          {
            "name": "Darth Vader"
          },
          {
            "name": "Leia Organa"
          },
          {
            "name": "Owen Lars"
          },
          {
            "name": "Beru Whitesun lars"
          },
          {
            "name": "R5-D4"
          },
          {
            "name": "Biggs Darklighter"
          },
          {
            "name": "Obi-Wan Kenobi"
          },
          {
            "name": "Wilhuff Tarkin"
          },
          {
            "name": "Chewbacca"
          },
          {
            "name": "Han Solo"
          },
          {
            "name": "Greedo"
          },
          {
            "name": "Jabba Desilijic Tiure"
          },
          {
            "name": "Wedge Antilles"
          },
          {
            "name": "Jek Tono Porkins"
          },
          {
            "name": "Raymus Antilles"
          }
        ]
      }
    }
  }
}
```

2. **Multi-Film Characters**: Find characters that appear in more than one film.

### Query

```GraphQL:
{
  allPeople{
    people{
      name,
      filmConnection{
        totalCount
      }
    }
  }
}
```

### Response

```JSON:
{
  "data": {
    "allPeople": {
      "people": [
        {
          "name": "Luke Skywalker",
          "filmConnection": {
            "totalCount": 5
          }
        },
        {
          "name": "C-3PO",
          "filmConnection": {
            "totalCount": 6
          }
        },
        {
          "name": "R2-D2",
          "filmConnection": {
            "totalCount": 7
          }
        },
        {
          "name": "Darth Vader",
          "filmConnection": {
            "totalCount": 4
          }
        },
        {
          "name": "Leia Organa",
          "filmConnection": {
            "totalCount": 5
          }
        },
        {
          "name": "Owen Lars",
          "filmConnection": {
            "totalCount": 3
          }
        },
        {
          "name": "Beru Whitesun lars",
          "filmConnection": {
            "totalCount": 3
          }
        },
        {
          "name": "R5-D4",
          "filmConnection": {
            "totalCount": 1
          }
        },
        {
          "name": "Biggs Darklighter",
          "filmConnection": {
            "totalCount": 1
          }
        },
        {
          "name": "Obi-Wan Kenobi",
          "filmConnection": {
            "totalCount": 6
          }
        },
        {
          "name": "Anakin Skywalker",
          "filmConnection": {
            "totalCount": 3
          }
        },
        {
          "name": "Wilhuff Tarkin",
          "filmConnection": {
            "totalCount": 2
          }
        },
        {
          "name": "Chewbacca",
          "filmConnection": {
            "totalCount": 5
          }
        },
        {
          "name": "Han Solo",
          "filmConnection": {
            "totalCount": 4
          }
        },
        {
          "name": "Greedo",
          "filmConnection": {
            "totalCount": 1
          }
        },
        {
          "name": "Jabba Desilijic Tiure",
          "filmConnection": {
            "totalCount": 3
          }
        },
        {
          "name": "Wedge Antilles",
          "filmConnection": {
            "totalCount": 3
          }
        },
        {
          "name": "Jek Tono Porkins",
          "filmConnection": {
            "totalCount": 1
          }
        },
        {
          "name": "Yoda",
          "filmConnection": {
            "totalCount": 5
          }
        },
        {
          "name": "Palpatine",
          "filmConnection": {
            "totalCount": 5
          }
        },
        {
          "name": "Boba Fett",
          "filmConnection": {
            "totalCount": 3
          }
        },
        {
          "name": "IG-88",
          "filmConnection": {
            "totalCount": 1
          }
        },
        {
          "name": "Bossk",
          "filmConnection": {
            "totalCount": 1
          }
        },
        {
          "name": "Lando Calrissian",
          "filmConnection": {
            "totalCount": 2
          }
        },
        {
          "name": "Lobot",
          "filmConnection": {
            "totalCount": 1
          }
        },
        {
          "name": "Ackbar",
          "filmConnection": {
            "totalCount": 2
          }
        },
        {
          "name": "Mon Mothma",
          "filmConnection": {
            "totalCount": 1
          }
        },
        {
          "name": "Arvel Crynyd",
          "filmConnection": {
            "totalCount": 1
          }
        },
        {
          "name": "Wicket Systri Warrick",
          "filmConnection": {
            "totalCount": 1
          }
        },
        {
          "name": "Nien Nunb",
          "filmConnection": {
            "totalCount": 1
          }
        },
        {
          "name": "Qui-Gon Jinn",
          "filmConnection": {
            "totalCount": 1
          }
        },
        {
          "name": "Nute Gunray",
          "filmConnection": {
            "totalCount": 3
          }
        },
        {
          "name": "Finis Valorum",
          "filmConnection": {
            "totalCount": 1
          }
        },
        {
          "name": "Padmé Amidala",
          "filmConnection": {
            "totalCount": 3
          }
        },
        {
          "name": "Jar Jar Binks",
          "filmConnection": {
            "totalCount": 2
          }
        },
        {
          "name": "Roos Tarpals",
          "filmConnection": {
            "totalCount": 1
          }
        },
        {
          "name": "Rugor Nass",
          "filmConnection": {
            "totalCount": 1
          }
        },
        {
          "name": "Ric Olié",
          "filmConnection": {
            "totalCount": 1
          }
        },
        {
          "name": "Watto",
          "filmConnection": {
            "totalCount": 2
          }
        },
        {
          "name": "Sebulba",
          "filmConnection": {
            "totalCount": 1
          }
        },
        {
          "name": "Quarsh Panaka",
          "filmConnection": {
            "totalCount": 1
          }
        },
        {
          "name": "Shmi Skywalker",
          "filmConnection": {
            "totalCount": 2
          }
        },
        {
          "name": "Darth Maul",
          "filmConnection": {
            "totalCount": 1
          }
        },
        {
          "name": "Bib Fortuna",
          "filmConnection": {
            "totalCount": 1
          }
        },
        {
          "name": "Ayla Secura",
          "filmConnection": {
            "totalCount": 3
          }
        },
        {
          "name": "Ratts Tyerel",
          "filmConnection": {
            "totalCount": 1
          }
        },
        {
          "name": "Dud Bolt",
          "filmConnection": {
            "totalCount": 1
          }
        },
        {
          "name": "Gasgano",
          "filmConnection": {
            "totalCount": 1
          }
        },
        {
          "name": "Ben Quadinaros",
          "filmConnection": {
            "totalCount": 1
          }
        },
        {
          "name": "Mace Windu",
          "filmConnection": {
            "totalCount": 3
          }
        },
        {
          "name": "Ki-Adi-Mundi",
          "filmConnection": {
            "totalCount": 3
          }
        },
        {
          "name": "Kit Fisto",
          "filmConnection": {
            "totalCount": 3
          }
        },
        {
          "name": "Eeth Koth",
          "filmConnection": {
            "totalCount": 2
          }
        },
        {
          "name": "Adi Gallia",
          "filmConnection": {
            "totalCount": 2
          }
        },
        {
          "name": "Saesee Tiin",
          "filmConnection": {
            "totalCount": 2
          }
        },
        {
          "name": "Yarael Poof",
          "filmConnection": {
            "totalCount": 1
          }
        },
        {
          "name": "Plo Koon",
          "filmConnection": {
            "totalCount": 3
          }
        },
        {
          "name": "Mas Amedda",
          "filmConnection": {
            "totalCount": 2
          }
        },
        {
          "name": "Gregar Typho",
          "filmConnection": {
            "totalCount": 1
          }
        },
        {
          "name": "Cordé",
          "filmConnection": {
            "totalCount": 1
          }
        },
        {
          "name": "Cliegg Lars",
          "filmConnection": {
            "totalCount": 1
          }
        },
        {
          "name": "Poggle the Lesser",
          "filmConnection": {
            "totalCount": 2
          }
        },
        {
          "name": "Luminara Unduli",
          "filmConnection": {
            "totalCount": 2
          }
        },
        {
          "name": "Barriss Offee",
          "filmConnection": {
            "totalCount": 1
          }
        },
        {
          "name": "Dormé",
          "filmConnection": {
            "totalCount": 1
          }
        },
        {
          "name": "Dooku",
          "filmConnection": {
            "totalCount": 2
          }
        },
        {
          "name": "Bail Prestor Organa",
          "filmConnection": {
            "totalCount": 2
          }
        },
        {
          "name": "Jango Fett",
          "filmConnection": {
            "totalCount": 1
          }
        },
        {
          "name": "Zam Wesell",
          "filmConnection": {
            "totalCount": 1
          }
        },
        {
          "name": "Dexter Jettster",
          "filmConnection": {
            "totalCount": 1
          }
        },
        {
          "name": "Lama Su",
          "filmConnection": {
            "totalCount": 1
          }
        },
        {
          "name": "Taun We",
          "filmConnection": {
            "totalCount": 1
          }
        },
        {
          "name": "Jocasta Nu",
          "filmConnection": {
            "totalCount": 1
          }
        },
        {
          "name": "R4-P17",
          "filmConnection": {
            "totalCount": 2
          }
        },
        {
          "name": "Wat Tambor",
          "filmConnection": {
            "totalCount": 1
          }
        },
        {
          "name": "San Hill",
          "filmConnection": {
            "totalCount": 1
          }
        },
        {
          "name": "Shaak Ti",
          "filmConnection": {
            "totalCount": 2
          }
        },
        {
          "name": "Grievous",
          "filmConnection": {
            "totalCount": 1
          }
        },
        {
          "name": "Tarfful",
          "filmConnection": {
            "totalCount": 1
          }
        },
        {
          "name": "Raymus Antilles",
          "filmConnection": {
            "totalCount": 2
          }
        },
        {
          "name": "Sly Moore",
          "filmConnection": {
            "totalCount": 2
          }
        },
        {
          "name": "Tion Medon",
          "filmConnection": {
            "totalCount": 1
          }
        },
        {
          "name": "Finn",
          "filmConnection": {
            "totalCount": 1
          }
        },
        {
          "name": "Rey",
          "filmConnection": {
            "totalCount": 1
          }
        },
        {
          "name": "Poe Dameron",
          "filmConnection": {
            "totalCount": 1
          }
        },
        {
          "name": "BB8",
          "filmConnection": {
            "totalCount": 1
          }
        },
        {
          "name": "Captain Phasma",
          "filmConnection": {
            "totalCount": 1
          }
        }
      ]
    }
  }
}
```

3. **Aggregate Film Statistics**: Calculate the total number of characters across all films.

### Query

```GraphQL:
{
  allFilms {
    films {
      title,
      characterConnection {
        totalCount
      }
    }
  }
}
```

### Response

```JSON:
{
  "data": {
    "allFilms": {
      "films": [
        {
          "title": "A New Hope",
          "characterConnection": {
            "totalCount": 18
          }
        },
        {
          "title": "The Empire Strikes Back",
          "characterConnection": {
            "totalCount": 16
          }
        },
        {
          "title": "Return of the Jedi",
          "characterConnection": {
            "totalCount": 20
          }
        },
        {
          "title": "The Phantom Menace",
          "characterConnection": {
            "totalCount": 34
          }
        },
        {
          "title": "Attack of the Clones",
          "characterConnection": {
            "totalCount": 40
          }
        },
        {
          "title": "Revenge of the Sith",
          "characterConnection": {
            "totalCount": 34
          }
        },
        {
          "title": "The Force Awakens",
          "characterConnection": {
            "totalCount": 11
          }
        }
      ]
    }
  }
}
```

### Complex Tasks

1. **Full Character Profiles**: Compile a full profile for a given character, including their films, starships, and homeworld.

### Query

```GraphQL:
{
  person(id: "cGVvcGxlOjE=") {
    name
    filmConnection{
    	films{
        title
      }
    }
    starshipConnection{
      starships{
        name
      }
    }
    homeworld{
      name
    }
  }
}
```

### Response

```JSON:
{
  "data": {
    "person": {
      "name": "Luke Skywalker",
      "filmConnection": {
        "films": [
          {
            "title": "A New Hope"
          },
          {
            "title": "The Empire Strikes Back"
          },
          {
            "title": "Return of the Jedi"
          },
          {
            "title": "Revenge of the Sith"
          },
          {
            "title": "The Force Awakens"
          }
        ]
      },
      "starshipConnection": {
        "starships": [
          {
            "name": "X-wing"
          },
          {
            "name": "Imperial shuttle"
          }
        ]
      },
      "homeworld": {
        "name": "Tatooine"
      }
    }
  }
}
```

2. **Link Characters with Their Planets**: Query the first 5 characters, including the name and population of their homeworld.

### Query

```GraphQL:
{
  allPeople(first: 5){
    people{
      name
      homeworld{
        name
        population
      }
    }
  }
}
```

### Response

```JSON:
{
  "data": {
    "allPeople": {
      "people": [
        {
          "name": "Luke Skywalker",
          "homeworld": {
            "name": "Tatooine",
            "population": 200000
          }
        },
        {
          "name": "C-3PO",
          "homeworld": {
            "name": "Tatooine",
            "population": 200000
          }
        },
        {
          "name": "R2-D2",
          "homeworld": {
            "name": "Naboo",
            "population": 4500000000
          }
        },
        {
          "name": "Darth Vader",
          "homeworld": {
            "name": "Tatooine",
            "population": 200000
          }
        },
        {
          "name": "Leia Organa",
          "homeworld": {
            "name": "Alderaan",
            "population": 2000000000
          }
        }
      ]
    }
  }
}
```

3. **Vehicles, Their Pilots, and Pilots' Species**: For the first 3 vehicles, list their names, pilots, and the species of those pilots.

### Query

```GraphQL:
{
  allVehicles(first:3){
    vehicles{
      name
      pilotConnection{
        pilots{
          name
          species{
            name
          }
        }
      }
    }
  }
}
```

### Response

```JSON:
{
  "data": {
    "allVehicles": {
      "vehicles": [
        {
          "name": "Sand Crawler",
          "pilotConnection": {
            "pilots": []
          }
        },
        {
          "name": "T-16 skyhopper",
          "pilotConnection": {
            "pilots": []
          }
        },
        {
          "name": "X-34 landspeeder",
          "pilotConnection": {
            "pilots": []
          }
        }
      ]
    }
  }
}
```

4. **Films and Their Associated Entities**: For the first 3 films, list all related characters, planets, and starships.

### Query

```GraphQL:
{
  allFilms(first: 3){
    films{
      title
      characterConnection{
        characters{
          name
        }
      }
      planetConnection{
        planets{
          name
        }
      }
      starshipConnection{
        starships{
          name
        }
      }
    }
  }
}
```

### Response

```JSON:
{
  "data": {
    "allFilms": {
      "films": [
        {
          "title": "A New Hope",
          "characterConnection": {
            "characters": [
              {
                "name": "Luke Skywalker"
              },
              {
                "name": "C-3PO"
              },
              {
                "name": "R2-D2"
              },
              {
                "name": "Darth Vader"
              },
              {
                "name": "Leia Organa"
              },
              {
                "name": "Owen Lars"
              },
              {
                "name": "Beru Whitesun lars"
              },
              {
                "name": "R5-D4"
              },
              {
                "name": "Biggs Darklighter"
              },
              {
                "name": "Obi-Wan Kenobi"
              },
              {
                "name": "Wilhuff Tarkin"
              },
              {
                "name": "Chewbacca"
              },
              {
                "name": "Han Solo"
              },
              {
                "name": "Greedo"
              },
              {
                "name": "Jabba Desilijic Tiure"
              },
              {
                "name": "Wedge Antilles"
              },
              {
                "name": "Jek Tono Porkins"
              },
              {
                "name": "Raymus Antilles"
              }
            ]
          },
          "planetConnection": {
            "planets": [
              {
                "name": "Tatooine"
              },
              {
                "name": "Alderaan"
              },
              {
                "name": "Yavin IV"
              }
            ]
          },
          "starshipConnection": {
            "starships": [
              {
                "name": "CR90 corvette"
              },
              {
                "name": "Star Destroyer"
              },
              {
                "name": "Sentinel-class landing craft"
              },
              {
                "name": "Death Star"
              },
              {
                "name": "Millennium Falcon"
              },
              {
                "name": "Y-wing"
              },
              {
                "name": "X-wing"
              },
              {
                "name": "TIE Advanced x1"
              }
            ]
          }
        },
        {
          "title": "The Empire Strikes Back",
          "characterConnection": {
            "characters": [
              {
                "name": "Luke Skywalker"
              },
              {
                "name": "C-3PO"
              },
              {
                "name": "R2-D2"
              },
              {
                "name": "Darth Vader"
              },
              {
                "name": "Leia Organa"
              },
              {
                "name": "Obi-Wan Kenobi"
              },
              {
                "name": "Chewbacca"
              },
              {
                "name": "Han Solo"
              },
              {
                "name": "Wedge Antilles"
              },
              {
                "name": "Yoda"
              },
              {
                "name": "Palpatine"
              },
              {
                "name": "Boba Fett"
              },
              {
                "name": "IG-88"
              },
              {
                "name": "Bossk"
              },
              {
                "name": "Lando Calrissian"
              },
              {
                "name": "Lobot"
              }
            ]
          },
          "planetConnection": {
            "planets": [
              {
                "name": "Hoth"
              },
              {
                "name": "Dagobah"
              },
              {
                "name": "Bespin"
              },
              {
                "name": "Ord Mantell"
              }
            ]
          },
          "starshipConnection": {
            "starships": [
              {
                "name": "Star Destroyer"
              },
              {
                "name": "Millennium Falcon"
              },
              {
                "name": "Y-wing"
              },
              {
                "name": "X-wing"
              },
              {
                "name": "Executor"
              },
              {
                "name": "Rebel transport"
              },
              {
                "name": "Slave 1"
              },
              {
                "name": "Imperial shuttle"
              },
              {
                "name": "EF76 Nebulon-B escort frigate"
              }
            ]
          }
        },
        {
          "title": "Return of the Jedi",
          "characterConnection": {
            "characters": [
              {
                "name": "Luke Skywalker"
              },
              {
                "name": "C-3PO"
              },
              {
                "name": "R2-D2"
              },
              {
                "name": "Darth Vader"
              },
              {
                "name": "Leia Organa"
              },
              {
                "name": "Obi-Wan Kenobi"
              },
              {
                "name": "Chewbacca"
              },
              {
                "name": "Han Solo"
              },
              {
                "name": "Jabba Desilijic Tiure"
              },
              {
                "name": "Wedge Antilles"
              },
              {
                "name": "Yoda"
              },
              {
                "name": "Palpatine"
              },
              {
                "name": "Boba Fett"
              },
              {
                "name": "Lando Calrissian"
              },
              {
                "name": "Ackbar"
              },
              {
                "name": "Mon Mothma"
              },
              {
                "name": "Arvel Crynyd"
              },
              {
                "name": "Wicket Systri Warrick"
              },
              {
                "name": "Nien Nunb"
              },
              {
                "name": "Bib Fortuna"
              }
            ]
          },
          "planetConnection": {
            "planets": [
              {
                "name": "Tatooine"
              },
              {
                "name": "Dagobah"
              },
              {
                "name": "Endor"
              },
              {
                "name": "Naboo"
              },
              {
                "name": "Coruscant"
              }
            ]
          },
          "starshipConnection": {
            "starships": [
              {
                "name": "CR90 corvette"
              },
              {
                "name": "Star Destroyer"
              },
              {
                "name": "Millennium Falcon"
              },
              {
                "name": "Y-wing"
              },
              {
                "name": "X-wing"
              },
              {
                "name": "Executor"
              },
              {
                "name": "Rebel transport"
              },
              {
                "name": "Imperial shuttle"
              },
              {
                "name": "EF76 Nebulon-B escort frigate"
              },
              {
                "name": "Calamari Cruiser"
              },
              {
                "name": "A-wing"
              },
              {
                "name": "B-wing"
              }
            ]
          }
        }
      ]
    }
  }
}
```
