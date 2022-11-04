const { default: mongoose } = require('mongoose');
const { Employee } = require('../models');

mongoose.connect('mongodb://localhost:27017/BasicDBecommerce');

try {
  Employee.find().then((result) => {
    console.log(result);
  });
} catch (error) {
  console.log(error);
}
