const Validation = require("../Validations/Joi_validation")
const bcrypt = require('bcrypt');
const handleErrors = require('./handleErrors')



login = async (req, res)=>{
    const collection ="userDetails"
    let name, password;
    const {error, value}= Validation.loginSchema(req.body);
    if(error){
        res.status(406).json({"message": error}) ;
    }
    else{
    try {
        const isExist =await collection.findOne({email: value.email}, "name password -_id");
       if(isExist !==null){
        //check password
        isExist.array.forEach(element => {
            name=element.name;
            password = element.password;
        });
        const match = await bcrypt.compare(value.password, password);
        if(match){
        res.status(201).send(`${name}, welcome...`)
        }
        else{
            res.status(400).send(`Incorrect password`)
        }

       }
       else{
        res.status(403).send("Email doesn't exist!");
       }
    } catch (error) {
        console.error(error);
        return false;
    }
}

}
module.exports =login