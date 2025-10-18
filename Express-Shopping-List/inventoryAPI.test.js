const axios = require("axios");
const { loadInventory, getInventory } = require("./fakeDb");
let inventory = [];

describe("Test API Routes", () => {
  beforeAll(async () => {
    // Load data from file before tests run
    await loadInventory();
  });

  beforeEach(async () => {
    await loadInventory(); // Reloads from file

    // Always get the latest in-memory version
    inventory = getInventory();
  });

  test("Returns correct message and status codes for get all items", async () => {
    const getAllRes = await axios.get("http://localhost:5000/items/");
    expect(getAllRes.status).toEqual(200);
    expect(getAllRes.data).toEqual(inventory);
  });
  test(" Returns correct message and status codes for create an item", async () => {
    const newItem = { name: "pear", price: 2.3 };
    const createOneRes = await axios.post(
      "http://localhost:5000/items/",
      newItem
    );
    expect(createOneRes.status).toEqual(201);
    expect(createOneRes.data).toEqual({ added: { ...newItem } });
  });
  test(" Returns correct message and status codes for get one item", async () => {
    const getOneRes = await axios.get("http://localhost:5000/items/pear");
    expect(getOneRes.status).toEqual(200);
    expect(getOneRes.data).toEqual({ name: "pear", price: 2.3 });
  });
  test(" Returns correct message and status codes for update one item", async () => {
    const updatedItem = {
      name: "sandwhich",
      price: 7.5,
    };
    const updateOneRes = await axios.patch(
      "http://localhost:5000/items/pear",
      updatedItem
    );
    expect(updateOneRes.status).toEqual(200);
    expect(updateOneRes.data).toEqual({
      updated: { ...updatedItem },
    });
  });
  test(" Returns correct message and status codes for delete one", async () => {
    const deleteOneRes = await axios.delete(
      "http://localhost:5000/items/sandwhich"
    );
    expect(deleteOneRes.status).toEqual(200);
    expect(deleteOneRes.data).toEqual("Deleted");
  });
});
