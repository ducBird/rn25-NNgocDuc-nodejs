const { default: mongoose } = require('mongoose');
const { Category } = require('../models');

mongoose.connect('mongodb://localhost:27017/BasicDBecommerce');

try {
  const id = '6363d7cbc1c4600d349acfdd';
  Category.findById(id).then((result) => {
    console.log(result);
  });
} catch (error) {
  console.log(error);
}
