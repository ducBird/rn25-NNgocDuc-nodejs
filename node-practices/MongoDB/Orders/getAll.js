const { default: mongoose } = require('mongoose');
const { Order } = require('../models');

mongoose.connect('mongodb://localhost:27017/BasicDBecommerce');

try {
  Order.find().then((result) => {
    console.log(result);
  });
} catch (error) {
  console.log(error);
}
