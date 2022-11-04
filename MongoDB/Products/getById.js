const { default: mongoose } = require('mongoose');
const { Product } = require('../models');

mongoose.connect('mongodb://localhost:27017/BasicDBecommerce');

try {
  const id = '63640bfe9959efd51f1874c3';
  Product.findById(id).then((result) => {
    console.log(result);
  });
} catch (error) {
  console.log(error);
}
