const { default: mongoose } = require('mongoose');
const { Employee } = require('../models');

mongoose.connect('mongodb://localhost:27017/BasicDBecommerce');

try {
  const id = '636407175e45171fad2d17ab';
  Employee.findById(id).then((result) => {
    console.log(result);
  });
} catch (error) {
  console.log(error);
}
