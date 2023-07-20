const schemas =require('../Models/schemas')
const Validation = require("../Validations/Joi_validation");
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
                        name: value.Name,
                         phone: value.Phone,
                        email: value.Email,
                        password:value.Password, 
                        createdAt: new Date().toLocaleString()
                    });
                  await userDetails.save();
                 
                    res.status(201).send(`User account created successfully`);
    
                }
                catch (error) {
                    console.log(error);
                    const errors=handleMongooseErrors(error)
                    res.status(400).json({errors})
                }  

}

}
module.exports=signUp;