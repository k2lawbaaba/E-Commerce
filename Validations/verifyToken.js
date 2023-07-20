const jwt= require("jsonwebtoken");
require('dotenv').config();
const {user}= require('../Models/schemas');


const verifyToken= async(req, res, next)=>{
    const token= req.cookies.jwToken;

    if(token){
        
     jwt.verify(token, process.env.SECRET_KEY, async(error, decoded)=>{
        if(error || !decoded){
            req.user=null;
            res.status(403).send("Access denied. You must login first");
        }
        else{
            const userID= await user.findById(decoded._id);
            req.user=userID._id;
            next()
        }
     })
    }
    else{
        req.user=null;
        res.status(403).send("Access denied. You must login first");
    }

}
module.exports=verifyToken;