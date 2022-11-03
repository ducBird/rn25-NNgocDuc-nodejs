const { default: mongoose } = require('mongoose');
const { Customer } = require('../models');

mongoose.connect('mongodb://localhost:27017/BasicDBecommerce');

try {
  Customer.find().then((result) => {
    console.log(result);
  });
} catch (error) {
  console.log(error);
}
