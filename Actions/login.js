const Validation = require("../Validations/Joi_validation");
const bcrypt = require('bcrypt');
const {user} =require('../Models/schemas')
const jwt= require("jsonwebtoken");
// const handleErrors = require('./handleErrors');



const login = async (req, res)=>{
    // let name, passwordHash, isMatch;
    const {error, value}= Validation.loginSchema(req.body);
    if(error){
        res.status(406).json({"message": error}) ;
    }
    else{
        try {
            const result =await user.findOne({email:value.email});
            if(result){
          
        //   const token= 
          const match= await  bcrypt.compare(value.password, result.password)
             
                 if(match){
                     res.status(201).send("Welcome:" + result.name);
                
                 }
                 else{
                     res.status(403).send("Incorrect Password");
                 } 
            }
            else{
                res.status(403).send('invalid email');
            }

        } 
        catch (error) {
            // const err= handleErrors(error)
            res.status(403).send(error)
        

    }
}

}
module.exports =login