const express= require('express');
const routes = require('./routes/users.js');
const route = require('./routes/movies.js');

const app = express();

const PORT = 5000;

app.use(express.json()); // Middleware to parse JSON bodies

app.use("/users",routes);
app.use("/movies",route);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});
