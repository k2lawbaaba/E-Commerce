const schemas =require('../Models/schemas');
const Validation = require("../Validations/Joi_validation");
const handleErrors = require('./handleErrors');
let {StatusCodes} = require('http-status-codes');


const createProducts= async (req, res)=>{
    const {error, value} = Validation.productSchema(req.body)
    if(error){
        const errors = handleErrors.handleJoiErrors(error);
        res.status(StatusCodes.NOT_ACCEPTABLE).json({"Validation Errors": errors});
    }
else{

    try {
        const products = new schemas.product({
            "Name": value.Name,
            "QuantityInStock": value.QuantityInStock,
            "PricePerUnit" :value.PricePerUnit,
            "Description": value.Description,
            "Category": value.Category,
            "CreatedAt": new Date(),
            "UpdatedAt":null
        })
        const product = await products.save();
        res.status(201).send(product)
    } catch (error) {
        const {message, enumValues}= error.errors.Category.properties;
        res.status(StatusCodes.FORBIDDEN).json({"Error Message": message, "Categories": enumValues});
    }
}
}
module.exports=createProducts;