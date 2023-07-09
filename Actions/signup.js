const schemas =require('../Models/schemas')
const Validation = require("../Validations/Joi_validation")
const createToken = require('../Validations/jwt')
const {handleMongooseErrors, handleJoiErrors} = require('./handleErrors')


const signUp = async (req, res)=>{
    const {error, value} =Validation.userJoiSchema(req.body);
    if(error){
        // console.log(error);
       const errors= handleJoiErrors(error)
        res.status(400).json({errors})
    }

    else{               
                try {

                    const userDetails = new schemas.user({
                        name: value.name,
                         phone: value.phone,
                        email: value.email,
                        password:value.password, 
                        createdAt: new Date().toLocaleString()
                    });
                  const newUser= await userDetails.save();
                  const token= createToken(newUser._id);
                  res.cookie("jwt", token, {httpOnly: true, secure: true, maxAge: 1000 * 60 * 60});
                    res.status(201).send(`User account created successfully`);
    
                }
                catch (error) {
                
                    const errors=handleMongooseErrors(error)
                    res.status(400).json({errors})
                }  

}

}
module.exports=signUp;