const Validation = require("../Validations/Joi_validation");
const mongoose =require('mongoose');

const getProductById= async(req, res)=>{
   
    const {err, value} = Validation.productById(req.body)
    if(err) res.status(403).send(err);
else{
const id=value.productId;
    try {
        const products = mongoose.connection.collection('products');
        const result= await products.findById(id).exec();
        console.log((id));
        res.status(201).send(result)
    } catch (error) {
        res.status(403).send(error)
        console.log(error);
    }
}
}
module.exports=getProductById;