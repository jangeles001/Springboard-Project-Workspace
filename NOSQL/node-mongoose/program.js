const connect = require("./db");

const runDatabaseQueries = async () => {
  const db = await connect();
  const movies = db.collection("movies");
  const users = db.collection("users");
  const comments = db.collection("comments");

  // Run this query, should get top 5 best rated movies on IMDB
  // const topMovies = await movies.find({ "imdb.rating": { $gt: 8.0 } })
  //   .project({ title: 1, year: 1, "imdb.rating": 1 })
  //   .sort({ "imdb.rating": -1 })
  //   .limit(5)
  //   .toArray();

  // console.log('Top Rated Movies:', topMovies);

  // const lucasMovies = await movies.find({ directors: "George Lucas"}).project({title: 1, year: 1, description: 1 }).toArray();

  // console.log("George Lucas Movies: ", lucasMovies);

  // ### Create
  // 1. **Insert a New Document into the Users Collection**: Practice adding a new user document to the users collection. Include fields name and email.
  const user = await users.find({ name: "James Acaster" }).toArray();

  if (user.length) {
    await users.deleteOne({ _id: user[0]._id });
  }

  await users.insertOne({
    name: "James Acaster",
    email: "James2335@ymail.com",
    password: "coolguy5498Z",
  });

  //-----------------------------------------------------------------------------------------------------

  // ### Read
  // 1. Find all movies directed by Christopher Nolan.
  const christopherNolanMovies = await movies
    .find({ directors: "Christopher Nolan" })
    .project({ title: 1, directors: 1 })
    .toArray();

  // 2. Find movies that include the genre "Action" and sort (descending) them by year.
  const actionMovies = await movies
    .aggregate([
      { $match: { genres: "Action" } },
      {
        $addFields: {
          numericYear: {
            $cond: {
              if: {
                $regexMatch: { input: { $toString: "$year" }, regex: /^\d+$/ },
              },
              then: { $toInt: "$year" },
              else: null,
            },
          },
        },
      },
      { $sort: { numericYear: -1 } },
      { $project: { title: 1, genres: 1, year: 1 } },
    ])
    .toArray();

  // 3. Find movies with an IMDb rating greater than 8 and return only the title and IMDB information.
  const ratingGreaterThanEight = await movies
    .find({ "imdb.rating": { $gt: 8 } })
    .project({ title: 1, imdb: 1 })
    .toArray();

  // 4. Find movies that starred both "Tom Hanks" and "Tim Allen".
  const tomAndTim = await movies
    .find({ cast: { $all: ["Tom Hanks", "Tim Allen"] } })
    .project({ title: 1, cast: 1 })
    .toArray();

  // 5. Find movies that starred both and only "Tom Hanks" and "Tim Allen".
  const onlyTomAndTim = await movies
    .find({ cast: { $all: ["Tom Hanks", "Tim Allen"], $size: 2 } })
    .project({ title: 1, cast: 1 })
    .toArray();

  // 6. Find comedy movies that are directed by Steven Spielberg.
  const spielbergComedies = await movies
    .find({ directors: "Steven Spielberg", genres: "Comedy" })
    .project({ title: 1, directors: 1, genres: 1 })
    .toArray();

  //-----------------------------------------------------------------------------------------------------

  // ### Update
  // 1. Add a new field "available_on" with the value "Sflix" to "The Matrix".
  let theMatrix = await movies.find({ title: "The Matrix" }).toArray();

  await movies.updateOne(
    { _id: theMatrix[0]._id },
    { $set: { available_on: "Sflix" } }
  );

  // 2. Increment the metacritic of "The Matrix" by 1.
  await movies.updateOne(
    { _id: theMatrix[0]._id },
    { $inc: { metacritic: 1 } }
  );

  // 3. Add a new genre "Gen Z" to all movies released in the year 1997.
  await movies.updateMany({ year: 1997 }, { $push: { genres: "Gen Z" } });

  // 4. Increase IMDb rating by 1 for all movies with a rating less than 5.
  await movies.updateMany(
    { "imdb.rating": { $lt: 5 } },
    { $inc: { "imdb.rating": 1 } }
  );

  //-----------------------------------------------------------------------------------------------------

  // ### Delete
  // 1. Delete a comment with a specific ID.
  let comment = await comments
    .find()
    .project({ name: 1, text: 1 })
    .limit(1)
    .toArray();

  await comments.deleteOne({ _id: comment[0]._id });

  // 2. Delete all comments made for "The Matrix". Refrences id from update section question 1.
  await comments.deleteMany({ movie_id: theMatrix[0]._id });

  // 3. Delete all movies that do not have any genres.
  await movies.deleteMany({
    $or: [{ genres: { $exists: false } }, { genres: { $size: 0 } }],
  });

  //-----------------------------------------------------------------------------------------------------
  // ### Aggregate
  // 1. Aggregate movies to count how many were released each year and display from the earliest year to the latest.
  const aggregatedMovies = await movies
    .aggregate([
      { $match: { year: { $exists: true } } },
      { $group: { _id: "$year", totalQuantity: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ])
    .toArray();

  // 2. Calculate the average IMDb rating for movies grouped by director and display from highest to lowest.
  const averageImdbRating = await movies
    .aggregate([
      { $match: { "imdb.rating": { $exists: true } } },
      { $unwind: "$directors" },
      {
        $group: { _id: "$directors", averageRating: { $avg: "$imdb.rating" } },
      },
      { $sort: { averageRating: -1 } },
    ])
    .toArray();

  process.exit(0);
};

runDatabaseQueries();
