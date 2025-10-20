const axios = require("axios");
const { db, connectDB } = require("./db");
let books = [];

describe(" API endpoint tests", () => {
  beforeAll(async () => {
    await connectDB();
  });

  beforeEach(async () => {
    await db.query("DELETE FROM books"); // clean DB
    await db.query(
      `INSERT INTO books(isbn, amazon_url, author, language, pages, publisher, title, year)
     VALUES($1,$2,$3,$4,$5,$6,$7,$8)`,
      [
        "0691161518",
        "http://a.co/newlink",
        "Matthew Lane",
        "english",
        270,
        "Princeton University Press",
        "Power-Up: Unlocking the Hidden Mathematics in Video Games (2nd Edition)",
        2025,
      ]
    );
    const result = await db.query("SELECT * FROM books ORDER BY isbn");
    books = result.rows;
  });

  test("GET /books returns all books", async () => {
    const results = await axios.get("http://localhost:3000/books");
    expect(results.status).toBe(200);
    expect(results.data.books).toEqual(books);
  });
  test("GET /books/:book returns a specific book", async () => {
    const results = await axios.get("http://localhost:3000/books/0691161518");
    expect(results.data.book).toMatchObject(books[0]);
  });
  test("POST /books creates a specific book", async () => {
    const newBook = {
      isbn: "1234567890",
      amazon_url: "http://example.com",
      author: "Test Author",
      language: "english",
      pages: 100,
      publisher: "Test Publisher",
      title: "Test Book",
      year: 2025,
    };
    const results = await axios.post("http://localhost:3000/books", newBook);
    expect(results.status).toBe(201);
    expect(results.data.book).toMatchObject(newBook);

    const bookResults = await axios.get("http://localhost:3000/books");
    const createdBook = bookResults.data.books.find(
      (book) => book.isbn === newBook.isbn
    );
    expect(createdBook).toBeDefined();
    expect(createdBook).toMatchObject(newBook);
  });
  test("POST /books invalid information provided", async () => {
    const newBook = {
      isbn: "1234567890",
      amazon_url: "http://example.com",
      author: null,
      language: "english",
      pages: "fdsafds",
      publisher: "Test Publisher",
      title: "Test Book",
    };

    await expect(
      axios.post("http://localhost:3000/books", newBook)
    ).rejects.toMatchObject({
      response: {
        status: 400,
        data: {
          error: expect.any(Array),
        },
      },
    });
  });
  test("PUT /books/:book Update a specifc book information", async () => {
    const updatedBook = {
      isbn: "0691161518",
      amazon_url: "http://example.com",
      author: "Test Author",
      language: "english",
      pages: 100,
      publisher: "Test Publisher",
      title: "Test Book",
      year: 2025,
    };

    const results = await axios.put(
      "http://localhost:3000/books/0691161518",
      updatedBook
    );

    expect(results.status).toBe(200);
    expect(results.data.book).toMatchObject(updatedBook);
  });
  test("PUT /books invalid information provided", async () => {
    const updatedBook = {
      isbn: "1234567890",
      amazon_url: "http://example.com",
      author: null,
      language: "english",
      publisher: "Test Publisher",
      title: "Test Book",
    };

    await expect(
      axios.put("http://localhost:3000/books", updatedBook)
    ).rejects.toMatchObject({
      response: {
        status: 404,
        data: {
          error: expect.any(Object),
        },
      },
    });
  });
  test("DELETE /books/:book deletes a book from the database", async () => {
    const results = await axios.delete(
      "http://localhost:3000/books/0691161518"
    );
    expect(results.status).toBe(200);
  });
  test("DELETE /books/:book deletes a nonexistent book from the database", async () => {
    await expect(
      axios.delete("http://localhost:3000/books/1234567890")
    ).rejects.toMatchObject({
      response: {
        status: 404,
        data: {
          error: expect.any(Object),
        },
      },
    });
  });

  afterAll(async () => {
    await db.end();
  });
});
