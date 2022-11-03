const { default: mongoose } = require('mongoose');
const { Product } = require('../models');

mongoose.connect('mongodb://localhost:27017/BasicDBecommerce');

try {
  Product.find().then((result) => {
    console.log(result);
  });
} catch (error) {
  console.log(error);
}
