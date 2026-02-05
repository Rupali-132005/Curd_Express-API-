const express = require("express");
const router = express.Router();

// In-memory pizza items
let items = [
  {
    id: 1,
    name: "Margherita",
    description: "Classic pizza with tomato sauce, mozzarella, and basil",
    price: 12.99,
    category: "Vegetarian",
    ingredients: ["tomato sauce", "mozzarella", "basil"],
    available: true
  }
];

// ---------------- CREATE ITEM ----------------
// POST /items
router.post("/", (req, res) => {
  const { name, description, price, category, ingredients, available } = req.body;

  if (!name || !description || !price || !category || !ingredients) {
    return res.status(400).json({ message: "All required fields must be provided" });
  }

  const newItem = {
    id: items.length ? items[items.length - 1].id + 1 : 1,
    name,
    description,
    price,
    category,
    ingredients,
    available: available ?? true
  };

  items.push(newItem);
  res.status(201).json(newItem);
});

// ---------------- GET ALL ITEMS ----------------
// GET /items
router.get("/", (req, res) => {
  res.json(items);
});

// ---------------- GET ITEM BY ID ----------------
// GET /items/:id
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find(i => i.id === id);

  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }

  res.json(item);
});

// ---------------- UPDATE ITEM ----------------
// PUT /items/:id
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = items.findIndex(i => i.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Item not found" });
  }

  items[index] = {
    ...items[index],
    ...req.body,
    id
  };

  res.json(items[index]);
});

// ---------------- DELETE ITEM ----------------
// DELETE /items/:id
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = items.findIndex(i => i.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Item not found" });
  }

  const deletedItem = items.splice(index, 1)[0];

  res.json({
    message: "Item deleted successfully",
    deletedItem
  });
});

module.exports = router;
