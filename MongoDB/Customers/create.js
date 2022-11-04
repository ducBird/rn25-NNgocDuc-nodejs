const { default: mongoose } = require('mongoose');
const { Customer } = require('../models');
// MONGOOSE
mongoose.connect('mongodb://localhost:27017/BasicDBecommerce');

try {
  const data = {
    firstName: 'Tran',
    lastName: 'A',
    phoneNumber: '0987654321',
    address: 'Ho Chi Minh',
    email: 'trana@gmail.com',
    birthDay: '2022-10-01',
  };

  const newItem = new Customer(data);
  newItem.save().then((result) => {
    console.log(result);
  });
} catch (err) {
  console.log(err);
}
