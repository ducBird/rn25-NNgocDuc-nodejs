const { default: mongoose } = require('mongoose');
const { Category } = require('../models');

mongoose.connect('mongodb://localhost:27017/BasicDBecommerce');

try {
  Category.find().then((result) => {
    console.log(result);
  });
} catch (error) {
  console.log(error);
}
