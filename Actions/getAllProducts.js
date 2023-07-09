const {product} = require('../Models/schemas')
const getProducts = async (req, res) => {
  try {
    const results = await product.find({},'-__v')  ; // Use .toArray() to convert the cursor to an array
    res.status(201).json(results);
  } catch (error) {
    res.status(403).send(error);
  }
};

module.exports = getProducts;


