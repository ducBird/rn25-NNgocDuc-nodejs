const { default: mongoose } = require('mongoose');

const { Customer } = require('../models');
// MONGOOSE
mongoose.connect('mongodb://localhost:27017/BasicDBecommerce');

try {
  const id = '6363e488433cecb6858babfb';

  Customer.findByIdAndDelete(id).then((result) => {
    console.log(result);
  });
} catch (err) {
  console.log(err);
}
