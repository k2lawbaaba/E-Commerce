const Validation = require("../Validations/Joi_validation")
const schemas =require('../Models/schemas')
const handleErrors = require('./handleErrors')



const login = async (req, res)=>{
   
    const {error, value}= Validation.loginSchema(req.body);
    if(error){
        res.status(406).json({"message": error}) ;
    }
    else{
        try {
            const isExist =await schemas.userDetails(value.email, value.password);
            console.log(isExist);
      res.status(201).send(isExist.name)
    } catch (error) {
        // const err= handleErrors(error)
        res.status(403).send(error)
    }
}

}
module.exports =login