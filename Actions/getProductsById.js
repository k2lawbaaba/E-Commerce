const Joi = require("joi");
const { product } = require("../Models/schemas");

const getProductById= async(req, res)=>{
   const schema=Joi.object({
        productId:Joi.string().required()
    })
    const {err, value} = schema.validate(req.body)
    if(err) res.status(403).send(err);

    try {
        const result= await productSchema.findOne({_id: value.productId});
        return  res.json({"data":result})
    } catch (error) {
        res.status(403).send(error)
    }
}
module.exports=getProductById;