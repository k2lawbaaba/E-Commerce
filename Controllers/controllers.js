const signUp = require("../Actions/signup");
const login= require('../Actions/login');
const createProducts= require('../Actions/createProducts')
const getProductById = require('../Actions/getAllProducts')
const express = require('express');



const app= express();


module.exports.sign_up= (req, res)=>{
    signUp(req, res);
}
module.exports.login= (req, res)=>{
    login(req,res)
}
module.exports.create_products= (req, res)=>{
    createProducts(req, res);
}
module.exports.get_products= (req, res)=>{
    getProductById(req, res)
}
module.exports.get_product= (req, res)=>{
    getProductById(req, res);
}
module.exports.put_updateUserPassword= (req, res)=>{
    res.send("password updated")
}