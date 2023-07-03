const schemas =require('../Models/schemas')
const Validation = require("../Validations/Joi_validation")
const bcrypt = require('bcrypt');


 // handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code, err.index, err.keyPattern);
    let key= Object.keys(err.keyPattern);
    let errors = { email: '', phone: '' };
  
        switch (key[0]) {
            case "phone":
                errors.phone = 'Phone number already exist';
                return errors;
                // break;
            case "email":
                errors.email= "Email already exist";
                return errors
        
            default:
                break;
        }
    // validation errors
    if (err.message.includes('Phone number already exist')) {
      console.log(err);
      Object.values(err.errors).forEach(({ properties }) => {
        console.log(val);
        console.log(properties);
        errors[properties.path] = properties.message;
      });
    }
  
    return errors;
  }

const signUp = async (req, res)=>{
    const {error, value} =Validation.userSchema(req.body)
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