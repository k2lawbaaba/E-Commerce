const signUp = require("../Actions/signup")
const login= require('../Actions/login')
const express = require('express')


const app= express();
// middleware
// app.use(express.json());

module.exports.sign_up= (req, res)=>{
    signUp(req, res);
}
module.exports.login= (req, res)=>{
    login(req,res)
}
module.exports.create_products= (req, res)=>{
    res.send("products created")
}
module.exports.get_products= (req, res)=>{
    res.send("Product lists")
}
module.exports.get_product= (req, res)=>{
    res.send("the Product")
}

module.exports.put_updateUserPassword= (req, res)=>{
    res.send("password updated")
}