let {user}= require('../Models/schemas');
const bcrypt = require('bcrypt');
let errorHandler = require("./handleErrors");
let {StatusCodes} = require('http-status-codes');
let validator = require('../Validations/Joi_validation');


const changePassword=async (req, res)=>{
    const userId= req.user;   
    const {error, value}= validator.changePassword(req.body);
    if(error){
        const errors= errorHandler.handleJoiErrors(error);
        res.status(StatusCodes.BAD_REQUEST).json({"Validation Errors" :errors});
    }
    else{

        try {
            const isUser= await user.findById(userId);
            
        let oldPassword= isUser.password;
        const  isMatch= await bcrypt.compare(value.Old_Password, oldPassword);
        if(isMatch){
            //Hash the new password and update it in database
            const hashPassword= await bcrypt.hash(value.New_Password, 10);
           await user.updateOne(
                {_id:userId},
                {password: hashPassword}
                )
                res.status(StatusCodes.ACCEPTED).send("Password changed successfully");
        }
        else{
            res.status(StatusCodes.FORBIDDEN).json("Incorrect old password");
        }

        } catch (error) {
            const errors= errorHandler.handleMongooseErrors(error);
            res.status(StatusCodes.FORBIDDEN).json({errors});
        }
}

}

module.exports= changePassword;