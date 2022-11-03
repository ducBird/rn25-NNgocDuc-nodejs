const { default: mongoose } = require('mongoose');
const { Supplier } = require('../models');
// MONGOOSE
mongoose.connect('mongodb://localhost:27017/BasicDBecommerce');

try {
  const data = {
    name: 'Apple',
    email: 'nguyenduc@gmail.com',
    phoneNumber: '0903203020',
    address: 'Binh dinh',
  };

  const newItem = new Supplier(data);
  newItem.save().then((result) => {
    console.log(result);
  });
} catch (err) {
  console.log(err);
}
