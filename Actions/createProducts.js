const schemas =require('../Models/schemas');
const Validation = require("../Validations/Joi_validation");
const handleErrors = require('./handleErrors')


const createProducts= async (req, res)=>{
    const {error, value} = Validation.productSchema(req.body)
    if(error){
        res.status(401).send(error)
    }

    try {
        const products = new schemas.product({
            "Name": value.Name,
            "QuantityInStock": value.QuantityInStock,
            "PricePerUnit" :value.price,
            "Description": value.description,
            "Category": value.Category,
            "CreatedAt": new Date()
        })
        const product = await products.save();
        res.status(201).send(product)
    } catch (error) {
        res.status(403).send(eerror)
    }
}
module.exports=createProducts;