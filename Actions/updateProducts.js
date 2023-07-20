const Validation = require("../Validations/Joi_validation");
const {product}=require('../Models/schemas');
let errorHandler= require('./handleErrors');
let {StatusCodes}= require('http-status-codes');

const updateProduct = async (req, res)=>{
    const {error, value} = Validation.updateProductSchema(req.body);
    if (error) {
        const errors= errorHandler.handleJoiErrors(error);
        res.status(StatusCodes.NOT_ACCEPTABLE).json({"Validation Error": errors});
    } else {

        try {
            const updatedProd = await product.findByIdAndUpdate({_id:value.productId},
                {
                    "Name": value.Name,
                    "QuantityInStock": value.QuantityInStock,
                    "PricePerUnit" :value.PricePerUnit,
                    "Description": value.Description,
                    "Category": value.Category,
                    "UpdatedAt":new Date()
                },
                {new: true}
                )
                if (updatedProd) {
                    res.status(StatusCodes.OK).json({"Updated Product": updatedProd});
                } else {
                    res.status(StatusCodes.BAD_REQUEST).send("Updating failed. Check the Product ID");
                }

        } catch (error) {
            const errors = errorHandler.handleMongooseErrors(error);
            res.status(StatusCodes.FORBIDDEN).json({"Database Error": errors});
        }
        
    }

}
module.exports=updateProduct;