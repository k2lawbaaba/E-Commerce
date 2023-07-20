const Validation = require("../Validations/Joi_validation");
const bcrypt = require('bcrypt');
const {user} =require('../Models/schemas');
const handleErrors = require('./handleErrors');
let {StatusCodes} = require('http-status-codes');
let jwt = require('jsonwebtoken');



const login = async (req, res)=>{
    // let name, passwordHash, isMatch;
    const {error, value}= Validation.loginSchema(req.body);
    if(error){
        const errors= handleErrors.handleJoiErrors(error);
        res.status(406).json({"message": errors}) ;
    }
    else{
        try {
            const result =await user.findOne({email:value.Email});
            if(result){
          
        //   const token= 
          const match= await  bcrypt.compare(value.Password, result.password)
             
                 if(match){
                     const token= jwt.sign({ _id: result._id }, process.env.SECRET_KEY, { expiresIn: "1h" });
                    res.cookie("jwToken", token, {maxAge: 1000 * 60 * 60});
                     res.status(StatusCodes.ACCEPTED).send("Welcome:" + result.name);
                
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
            console.log(error);
            const errors= handleErrors.handleMongooseErrors(error);
            res.status(StatusCodes.FORBIDDEN).json({"Errors": errors});
    }
}

}
module.exports =login