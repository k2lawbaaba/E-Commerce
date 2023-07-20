let {product}= require('../Models/schemas');
let errorHandler = require('./handleErrors');
let validator= require('../Validations/Joi_validation');
let {StatusCodes} = require('http-status-codes');

const deleteProduct= async (req, res)=>{
    
    const { err, value}= validator.productById(req.params);
    if (err) {
        const error= errorHandler.handleJoiErrors(err);
        res.status(StatusCodes.NOT_ACCEPTABLE).json({"Validator error": error});

    } 
    else {
        try {
            const deletedProd = await product.findByIdAndDelete(value.id);
            if (deletedProd) {
                res.status(StatusCodes.OK).send(`Product with ID ${value.id} is deleted successfully.`);
            } else {
                res.status(StatusCodes.EXPECTATION_FAILED).send(`Product with ID ${value.id} doesn't exist or already deleted.`);
                
            }
            
        } 
        
        catch (error) {

            const errors= errorHandler.handleMongooseErrors(error);
            res.status(StatusCodes.FORBIDDEN).json({"Database Error": errors});
        }
    }
}

module.exports=deleteProduct;