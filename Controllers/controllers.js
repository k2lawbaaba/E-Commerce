const signUp = require("../Actions/signup");
const login= require('../Actions/login');
const createProducts= require('../Actions/createProducts');
const getProductById = require('../Actions/getProductsById');
const getProducts = require("../Actions/getAllProducts")



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
module.exports.get_productById= (req, res)=>{
    getProductById(req, res);
}
module.exports.put_updateUserPassword= (req, res)=>{
    res.send("password updated")
}