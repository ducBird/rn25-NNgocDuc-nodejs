const { default: mongoose } = require('mongoose');
const { Category } = require('../models');
// MONGOOSE
mongoose.connect('mongodb://localhost:27017/BasicDBecommerce');

try {
  const data = {
    name: 'Điện lạnh',
    description: 'Mô tả ...',
  };

  const newItem = new Category(data);
  newItem.save().then((result) => {
    console.log(result);
  });
} catch (err) {
  console.log(err);
}
