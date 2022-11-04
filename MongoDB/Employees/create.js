const { default: mongoose } = require('mongoose');
const { Employee } = require('../models');
// MONGOOSE
mongoose.connect('mongodb://localhost:27017/BasicDBecommerce');

try {
  const data = {
    firstName: 'Nguyen',
    lastName: 'B',
    phoneNumber: '0987654321',
    address: 'Ha Noi',
    email: 'trana@gmail.com',
    birthDay: '2022-10-01',
  };

  const newItem = new Employee(data);
  newItem.save().then((result) => {
    console.log(result);
  });
} catch (err) {
  console.log(err);
}
