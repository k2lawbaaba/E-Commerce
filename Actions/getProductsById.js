const Validation = require("../Validations/Joi_validation");
const {product}=require('../Models/schemas')

const getProductById= async(req, res)=>{
   
    const {err, value} = Validation.productById(req.body)
    if(err) res.status(403).send(err);
else{
const id=value.productId;
    try {
        const result= await product.findById(id, "name QuantityInStock PricePerUnit Category Description");
        res.status(201).send(result)
    } catch (error) {
        res.status(403).send(error)
        console.log(error);
    }
}
}
module.exports=getProductById;