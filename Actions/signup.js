const schemas =require('../Models/schemas')
const Validation = require("../Validations/Joi_validation")
const bcrypt = require('bcrypt');
const handleErrors = require('./handleErrors')


const signUp = async (req, res)=>{
    const {error, value} =Validation.userJoiSchema(req.body);
    if(error){
        res.status(400).json(error)
    }

    else{
        const hashPassword= await  bcrypt.hash(value.password, 10);
                
                try {

                    const userDetails = new schemas.user({
                        "name": value.name,
                        "phone": value.phone,
                        "email": value.email,
                        "password":hashPassword, //encrypting the password before storing it in database
                        "createdAt": new Date()
                    })
                   await userDetails.save()
                    res.status(201).send(`User account created successfully`);
                }
                catch (error) {
                    const err=handleErrors(error)
                    res.status(400).json(err)
                }  

}

}
module.exports=signUp;