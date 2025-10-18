const express = require("express");
const router = express.Router();
const {
  getAllInventoryItems,
  createNewInventoryItem,
  getItem,
  updateInventoryItem,
  removeInventoryItem,
} = require("../controllers/itemsController");

router.route("/").get(getAllInventoryItems).post(createNewInventoryItem);

router
  .route("/:item")
  .get(getItem)
  .patch(updateInventoryItem)
  .delete(removeInventoryItem);

router.use((err, req, res, next) => {
  return res.status(500).json({ error: err.message || err });
});

module.exports = router;
