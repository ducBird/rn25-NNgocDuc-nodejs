const { default: mongoose } = require('mongoose');
const { Supplier } = require('../models');

mongoose.connect('mongodb://localhost:27017/BasicDBecommerce');

try {
  const id = '6363e488433cecb6858babfb';
  Supplier.findById(id).then((result) => {
    console.log(result);
  });
} catch (error) {
  console.log(error);
}
