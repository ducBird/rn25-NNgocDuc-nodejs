const { default: mongoose } = require('mongoose');
const { Order } = require('../models');

mongoose.connect('mongodb://localhost:27017/BasicDBecommerce');

try {
  const id = '63640bfe9959efd51f1874c3';
  Order.findById(id).then((result) => {
    console.log(result);
  });
} catch (error) {
  console.log(error);
}
