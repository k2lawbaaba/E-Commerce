const mongoose = require('mongoose');

const getProducts = async (req, res) => {
  try {
    const products = mongoose.connection.collection("products");
    const results = await products.find({}).toArray(); // Use .toArray() to convert the cursor to an array

    console.log(results);
    res.status(201).json(results);
  } catch (error) {
    res.status(403).send(error);
  }
};

module.exports = getProducts;


