const { default: mongoose } = require('mongoose');
const { Order } = require('../models');

mongoose.connect('mongodb://localhost:27017/BasicDBecommerce');

try {
  const id = '6363e488433cecb6858babfb';
  const data = { firstName: 'New name' };
  Order.findByIdAndUpdate(id, data, {
    new: true,
  }).then((result) => {
    console.log(result);
  });
} catch (error) {
  console.log(error);
}
