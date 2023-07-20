const signUp = require("../Actions/signup");
const login= require('../Actions/login');
const createProducts= require('../Actions/createProducts');
const getProductById = require('../Actions/getProductsById');
const getProducts = require("../Actions/getAllProducts");
const changePassword = require('../Actions/changePassword');
let deleteProduct = require('../Actions/deleteProducts');
let updateProduct = require('../Actions/updateProducts');


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
    getProducts(req, res);

}
module.exports.updateProduct= (req, res)=>{
    updateProduct(req, res);

}
module.exports.get_productById= (req, res)=>{
    getProductById(req, res);
}
module.exports.put_changePassword= (req, res)=>{
    changePassword(req, res);
}
module.exports.logout = (req, res)=>{
    res.cookie("jwToken", "", {maxAge: 1});
    res.status(201).send("Successfully logged out");
}
module.exports.deleteProduct=(req, res)=>{
    deleteProduct(req, res);
}
module.exports.set_cookies =(req, res)=>{
    // res.setHeader('Set-Cookie', 'newUser=true');

    res.cookie('newUser', false);
    res.cookie("isAdmin", true,{ maxAge:1000 * 60*60*24, httpOnly: true, secure: true});
    res.cookie('checking', false, {maxAge: 190*40, size:6})

    res.send("Cookies don land!!!")
    

  
}