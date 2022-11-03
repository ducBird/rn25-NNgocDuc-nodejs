const { default: mongoose } = require('mongoose');
const { Product } = require('../models');
// MONGOOSE
mongoose.connect('mongodb://localhost:27017/BasicDBecommerce');

try {
  const data = {
    name: 'Iphone14promax',
    price: 1234,
    discount: 0,
    stock: 0,
    categoryId: '636278b3e9b986258deebe79',
    supplierId: '6363e41b277f3801fb1278cf',
    description: 'Iphone mới nhất',
  };

  const newItem = new Product(data);
  newItem.save().then((result) => {
    console.log(result);
  });
} catch (err) {
  console.log(err);
}
