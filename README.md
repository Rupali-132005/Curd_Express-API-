# Pizza Store Express CRUD API

A simple Express.js application for managing pizza store items with full CRUD (Create, Read, Update, Delete) operations.

## Table of Contents
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Testing with Postman](#testing-with-postman)
- [Project Structure](#project-structure)
- [Contributing](#contributing)

## Features

- Create new pizza items
- Retrieve all pizza items
- Retrieve specific pizza items by ID
- Update existing pizza items
- Delete pizza items
- In-memory data storage
- RESTful API design
- JSON request/response format

## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (version 14.0 or higher)
- **npm** (Node Package Manager)
- **Postman** (for API testing)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pizza-store-api
   ```

2. **Initialize the project**
   ```bash
   npm init -y
   ```

3. **Install required dependencies**
   ```bash
   npm install express body-parser
   ```

4. **Start the server**
   ```bash
   node server.js
   ```

   The server will start running on `http://localhost:3000`

## Usage

### Starting the Application
```bash
npm start
```

The API will be available at `http://localhost:3000`

### Sample Pizza Item Structure
```json
{
  "id": 1,
  "name": "Margherita",
  "description": "Classic pizza with tomato sauce, mozzarella, and basil",
  "price": 12.99,
  "category": "Vegetarian",
  "ingredients": ["tomato sauce", "mozzarella", "basil"],
  "available": true
}
```

## API Endpoints

### Base URL
```
http://localhost:3000
```

### 1. Create Item
- **Endpoint:** `POST /items`
- **Description:** Add a new pizza item to the store
- **Request Body:**
  ```json
  {
    "name": "Pepperoni Pizza",
    "description": "Classic pepperoni with mozzarella cheese",
    "price": 15.99,
    "category": "Non-Vegetarian",
    "ingredients": ["tomato sauce", "mozzarella", "pepperoni"],
    "available": true
  }
  ```
- **Response:**
  ```json
  {
    "id": 2,
    "name": "Pepperoni Pizza",
    "description": "Classic pepperoni with mozzarella cheese",
    "price": 15.99,
    "category": "Non-Vegetarian",
    "ingredients": ["tomato sauce", "mozzarella", "pepperoni"],
    "available": true
  }
  ```

### 2. Get All Items
- **Endpoint:** `GET /items`
- **Description:** Retrieve all pizza items from the store
- **Response:**
  ```json
  [
    {
      "id": 1,
      "name": "Margherita",
      "description": "Classic pizza with tomato sauce, mozzarella, and basil",
      "price": 12.99,
      "category": "Vegetarian",
      "ingredients": ["tomato sauce", "mozzarella", "basil"],
      "available": true
    }
  ]
  ```

### 3. Get Item by ID
- **Endpoint:** `GET /items/:id`
- **Description:** Retrieve a specific pizza item by its ID
- **URL Parameter:** `id` (integer)
- **Response:**
  ```json
  {
    "id": 1,
    "name": "Margherita",
    "description": "Classic pizza with tomato sauce, mozzarella, and basil",
    "price": 12.99,
    "category": "Vegetarian",
    "ingredients": ["tomato sauce", "mozzarella", "basil"],
    "available": true
  }
  ```

### 4. Update Item
- **Endpoint:** `PUT /items/:id`
- **Description:** Update an existing pizza item by its ID
- **URL Parameter:** `id` (integer)
- **Request Body:**
  ```json
  {
    "name": "Updated Margherita",
    "description": "Premium Margherita with fresh basil",
    "price": 14.99,
    "category": "Vegetarian",
    "ingredients": ["tomato sauce", "mozzarella", "fresh basil"],
    "available": true
  }
  ```
- **Response:**
  ```json
  {
    "id": 1,
    "name": "Updated Margherita",
    "description": "Premium Margherita with fresh basil",
    "price": 14.99,
    "category": "Vegetarian",
    "ingredients": ["tomato sauce", "mozzarella", "fresh basil"],
    "available": true
  }
  ```

### 5. Delete Item
- **Endpoint:** `DELETE /items/:id`
- **Description:** Delete a pizza item by its ID
- **URL Parameter:** `id` (integer)
- **Response:**
  ```json
  {
    "message": "Item deleted successfully",
    "deletedItem": {
      "id": 1,
      "name": "Margherita",
      "description": "Classic pizza with tomato sauce, mozzarella, and basil",
      "price": 12.99,
      "category": "Vegetarian",
      "ingredients": ["tomato sauce", "mozzarella", "basil"],
      "available": true
    }
  }
  ```

## Testing with Postman

### Setting Up Postman Collection

1. **Open Postman** and create a new collection called "Pizza Store API"

2. **Set up Environment Variables** (optional):
   - Variable: `base_url`
   - Value: `http://localhost:3000`

### Test Cases

#### 1. Create a New Pizza Item
- **Method:** POST
- **URL:** `{{base_url}}/items`
- **Headers:** `Content-Type: application/json`
- **Body (raw JSON):**
  ```json
  {
    "name": "Hawaiian Pizza",
    "description": "Pizza with ham, pineapple, and mozzarella",
    "price": 16.99,
    "category": "Non-Vegetarian",
    "ingredients": ["tomato sauce", "mozzarella", "ham", "pineapple"],
    "available": true
  }
  ```

#### 2. Get All Items
- **Method:** GET
- **URL:** `{{base_url}}/items`

#### 3. Get Item by ID
- **Method:** GET
- **URL:** `{{base_url}}/items/1`

#### 4. Update Item
- **Method:** PUT
- **URL:** `{{base_url}}/items/1`
- **Headers:** `Content-Type: application/json`
- **Body (raw JSON):**
  ```json
  {
    "name": "Updated Hawaiian Pizza",
    "price": 18.99,
    "available": false
  }
  ```

#### 5. Delete Item
- **Method:** DELETE
- **URL:** `{{base_url}}/items/1`

### Expected HTTP Status Codes
- **200 OK:** Successful GET, PUT operations
- **201 Created:** Successful POST operation
- **404 Not Found:** Item not found for GET, PUT, DELETE operations
- **500 Internal Server Error:** Server errors

## Project Structure

```
pizza-store-api/
├── server.js          # Main application file
├── package.json       # Project dependencies and scripts
├── package-lock.json  # Locked dependency versions
└── README.md         # Project documentation
```

### Sample server.js Structure
```javascript
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// In-memory data storage
let items = [];
let nextId = 1;

// Routes
app.post('/items', (req, res) => { /* Create item */ });
app.get('/items', (req, res) => { /* Get all items */ });
app.get('/items/:id', (req, res) => { /* Get item by ID */ });
app.put('/items/:id', (req, res) => { /* Update item */ });
app.delete('/items/:id', (req, res) => { /* Delete item */ });

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
```

## Error Handling

The API includes basic error handling for:
- Invalid item IDs
- Missing required fields
- Server errors

Example error response:
```json
{
  "error": "Item not found",
  "message": "No item exists with ID: 999"
}
```

## Future Enhancements

- Add data validation middleware
- Implement database integration (MongoDB/PostgreSQL)
- Add authentication and authorization
- Include unit and integration tests
- Add logging functionality
- Implement pagination for large datasets

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Happy Coding! 🍕**
