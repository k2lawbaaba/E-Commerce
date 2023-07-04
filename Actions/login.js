const Validation = require("../Validations/Joi_validation");
const mongoose =require('mongoose');
const bcrypt = require('bcrypt');
const handleErrors = require('./handleErrors');



const login = async (req, res)=>{
    // let name, passwordHash, isMatch;
    const {error, value}= Validation.loginSchema(req.body);
    if(error){
        res.status(406).json({"message": error}) ;
    }
    else{
        try {
            const user = mongoose.connection.collection("users");
            const result =await user.findOne({email:value.email});
                      console.log(user);
            if(result){
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
            console.log(error);

    }
}

}
module.exports =login