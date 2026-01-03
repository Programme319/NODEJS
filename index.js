const express = require('express');
const app = express()
app.use(express.json()); //middleware to parse json data
const {body, validationResult} = require('express-validator');//importing validation functions that body for the send data and validationresult is for the massege

let products_array=[ //instead of real API or database
    {id:1, name:"laptop", price:45000},
    {id:2, name:"mobile", price:15000},
    {id:3, name:"laptop", price:45000},
    {id:4, name:"mobile", price:15000},
];

app.get('/products', (req, res) => {
    res.json(products_array);
});
// crud operations
app.get('/products/:id', (req, res) => { //:id is a parameter in the url (dynamic/variable)
    const productId = +req.params.id;
    const product = products_array.find((product) => product.id === productId);//searching for product with id
    if(!product) {
        res.status(404).json({message: "product not found"});
    }
    res.json(product);
});

app.post('/products',[  //validation middleware using express-validator
    body('name') //proberty name in the request body
        .isString().withMessage('Name must be a string')
        .isLength({min: 3}).withMessage('Name must be at least 3 characters long'),
    body('price')
        .isNumeric().withMessage('Price must be a number')
        .isFloat({gt: 0}).withMessage('Price must be greater than 0')
    ] ,(req, res) => {

    // const newProduct = req.body;
    const errors = validationResult(req);

    if(!errors.isEmpty()) { 
        return res.status(400).json({errors: errors.array()});
    }
    const product = {id: products_array.length + 1, ...req.body};//creating new product object with unique id
    products_array.push(product);//pushing the new product to the main array
    res.status(201).json(product); //show the new element
});

//update product
app.patch('/products/:id', (req, res) => {
    let productId = +req.params.id;
    let product = products_array.findIndex((product) => product.id === productId);
    if(product === -1) {
        return res.status(404).json({message: "product not found"});
    }
    product={...products_array[product], ...req.body};//updating the product with new data
    products_array[product]=product;
    res.json(product);
});

//delete product
app.delete('/products/:id', (req, res) => {
    let productId = +req.params.id;
    let productIndex = products_array.findIndex((product) => product.id === productId);
    if(productIndex === -1) {
        return res.status(404).json({message: "product not found"});
    }
    products_array.splice(productIndex, 1);
    res.json({message: "product deleted successfully"});
});

// the port to run the project
app.listen(3002, () => {
    console.log("server is listening on port 3002");
});
