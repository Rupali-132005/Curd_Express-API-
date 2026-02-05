const express = require("express");
const routes = express.Router();

// In-memory pizza items
let items = 
  [
  {
    "id": 1,
    "name": "Margherita",
    "description": "Classic pizza with tomato sauce, mozzarella, and basil",
    "price": 12.99,
    "category": "Vegetarian",
    "ingredients": ["tomato sauce", "mozzarella", "basil"],
    "available": true
  },
  {
    "id": 2,
    "name": "Pepperoni Pizza",
    "description": "Spicy pepperoni with mozzarella cheese and rich tomato sauce",
    "price": 15.99,
    "category": "Non-Vegetarian",
    "ingredients": ["tomato sauce", "mozzarella", "pepperoni"],
    "available": true
  },
  {
    "id": 3,
    "name": "Farmhouse Pizza",
    "description": "Loaded with fresh vegetables and mozzarella cheese",
    "price": 14.49,
    "category": "Vegetarian",
    "ingredients": ["tomato sauce", "mozzarella", "capsicum", "onion", "tomato"],
    "available": true
  }
];

// ---------------- CREATE ITEM ----------------
// POST /items
routes.post("/", (req, res) => {
    items.push({
       "id" :req.query.id,
       "name": req.query.name,
       "description": req.query.description,
       "price": req.query.price,
       "category": req.query.category,
       "ingredients": req.query.ingredients,
       "available": req.query.available,
    });
    res.send(`item with title ${req.query.id} added successfully`);
});

// ---------------- GET ALL ITEMS ----------------
// GET /items
routes.get("/", (req, res) => {
  res.send(items);
});

// ---------------- GET ITEM BY ID ----------------
// GET /items/:id
routes.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find(i => i.id === id);

  if (!item) {
    return res.send({ message: "Item not found" });
  }

  res.send(item);
});

// ---------------- UPDATE ITEM ----------------
// PUT /items/:id
routes.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);   // ✅ convert to number

    let filtered_items = items.filter(i => i.id === id);

    if (filtered_items.length > 0) {

        let filtered_item = filtered_items[0];

        // ✅ use body instead of query
        let name = req.query.name;
        let description = req.query.description;
        let price = req.query.price;
        let category = req.query.category;
        let ingredients = req.query.ingredients;
        let available = req.query.available;

        // update only if provided
    
        if (name) filtered_item.name = name;
        if (description) filtered_item.description = description;
        if (price) filtered_item.price = price;
        if (category) filtered_item.category = category;
        if (ingredients) filtered_item.ingredients = ingredients;
        if (available !== undefined) filtered_item.available = available;

        // remove old + push updated
        items = items.filter(item => item.id !== id);
        items.push(filtered_item);
        res.send(`User with the email  ${id} updated.`);
        }
        else{
            res.send(`User with the email  ${id} not found.`);
        }
});

// ---------------- DELETE ITEM ----------------
// DELETE /items/:id
routes.delete('/:id',(req,res)=>{
    const name = req.params.id;
    items = items.filter(i => i.id !== id);
    res.send(`items with id ${id} deleted successfully`);
});

module.exports = routes;

