const {product} = require('../Models/schemas');

const getProducts = async (req, res) => {
  try {
    const results = await product.find({},'-__v')  ; 
    res.status(201).json({"Products": results});
  } catch (error) {
    res.status(403).send(error);
  }
};

module.exports = getProducts;


