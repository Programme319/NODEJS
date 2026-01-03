const express = require('express');
const app = express();
app.use(express.json()); //middleware to parse json data

//!import section
const productroutes = require('./routes/products_routes.js');

//!route middleware
app.use('/', productroutes); //all routes in productroutes will be prefixed with /api



// the port to run the project
app.listen(3002, () => {
    console.log("server is listening on port 3002");
});
