const { default: mongoose } = require('mongoose');
const { Customer } = require('../models');

mongoose.connect('mongodb://localhost:27017/BasicDBecommerce');

try {
  const id = '636404585452ff76b963e61d';
  Customer.findById(id).then((result) => {
    console.log(result);
  });
} catch (error) {
  console.log(error);
}
