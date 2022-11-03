const { default: mongoose } = require('mongoose');
const { Order } = require('../models');
// MONGOOSE
mongoose.connect('mongodb://localhost:27017/BasicDBecommerce');

try {
  const data = {
    createdDate: '2022-03-03',
    shippedDate: '2022-04-04',
    status: 'COMPLETED',
    description: 'Giao hàng thành công',
    shippingAddress: 'Phù Mỹ - Bình Định',
    paymentType: 'CASH',
    customerId: '6364033a1a0c70693909a3d8',
    employeeId: '636407175e45171fad2d17ab',
  };

  const newItem = new Order(data);
  newItem.save().then((result) => {
    console.log(result);
  });
} catch (err) {
  console.log(err);
}
