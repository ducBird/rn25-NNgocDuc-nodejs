const { default: mongoose } = require('mongoose');
const { Product } = require('../models');

mongoose.connect('mongodb://localhost:27017/BasicDBecommerce');

try {
  const id = '6363e488433cecb6858babfb';
  const data = { firstName: 'New name' };
  Product.findByIdAndUpdate(id, data, {
    new: true,
  }).then((result) => {
    console.log(result);
  });
} catch (error) {
  console.log(error);
}
