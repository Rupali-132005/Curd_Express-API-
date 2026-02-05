const express= require('express');
const routes = require('./routes/users.js');
const route = require('./routes/items.js');

const app = express();

const PORT = 3000;

app.use(express.json()); // Middleware to parse JSON bodies

app.use("/users",routes);
app.use("/items",route);

app.listen(PORT,()=>{
    console.log(`🍕 Pizza Store API running at http://localhost:${PORT}`);
});

