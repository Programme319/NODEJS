const {validationResult} = require('express-validator');

const {products_array} = require('../data/products.js');

const showproducts = (req, res) => {
    res.json(products_array);
};

const productbyid = (req, res) => { //:id is a parameter in the url (dynamic/variable)
    const productId = +req.params.id;
    const product = products_array.find((product) => product.id === productId);//searching for product with id
    if(!product) {
        res.status(404).json({message: "product not found"});
    }
    res.json(product);
};

const addproduct = (req, res) => {

    // const newProduct = req.body;
    const errors = validationResult(req);

    if(!errors.isEmpty()) { 
        return res.status(400).json({errors: errors.array()});
    }
    const product = {id: products_array.length + 1, ...req.body};//creating new product object with unique id
    products_array.push(product);//pushing the new product to the main array
    res.status(201).json(product); //show the new element
};

const updateproduct = (req, res) => {
    let productId = +req.params.id;
    let product = products_array.findIndex((product) => product.id === productId);
    if(product === -1) {
        return res.status(404).json({message: "product not found"});
    }
    product={...products_array[product], ...req.body};//updating the product with new data
    products_array[product]=product;
    res.json(product);
};

const deleteproduct = (req, res) => {
    let productId = +req.params.id;
    let productIndex = products_array.findIndex((product) => product.id === productId);
    if(productIndex === -1) {
        return res.status(404).json({message: "product not found"});
    }
    products_array.splice(productIndex, 1);
    res.json({message: "product deleted successfully"});
};

module.exports = {
    showproducts,
    productbyid,
    addproduct,
    updateproduct,
    deleteproduct
};