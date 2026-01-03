const express = require('express');
const router = express.Router();

const {body} = require('express-validator');

const productcontroller = require('../controllers/routes_controller.js');


//! routes section
router.route('/products')
    .get(productcontroller.showproducts)
    .post([  //validation middleware using express-validator
        body('name') //proberty name in the request body
            .isString().withMessage('Name must be a string')
            .isLength({min: 3}).withMessage('Name must be at least 3 characters long'),
        body('price')
        .isNumeric().withMessage('Price must be a number')
        .isFloat({gt: 0}).withMessage('Price must be greater than 0')
    ] , productcontroller.addproduct);

router.route('/products/:id')
    .get(productcontroller.productbyid)
    .patch(productcontroller.updateproduct)
    .delete(productcontroller.deleteproduct);

module.exports = router;