const Validation = require("../Validations/Joi_validation");
const {product}=require('../Models/schemas');
let errorHandler= require('./handleErrors');
let {StatusCodes}= require('http-status-codes');

const getProductById= async(req, res)=>{
   
    const {err, value} = Validation.productById(req.params)
    if(err) 
    {
        const error= errorHandler.handleJoiErrors(err);
        res.status(StatusCodes.NOT_ACCEPTABLE).json({"Validation error": error});
    }
else{

    try {
        const result= await product.findById(value.id, "name QuantityInStock PricePerUnit Category Description");
        res.status(201).send(result)
    } catch (error) {
        let errors= errorHandler.handleMongooseErrors(error);
        res.status(StatusCodes.FORBIDDEN).json({"Error Message" : errors});
        
    }
}
}
module.exports=getProductById;