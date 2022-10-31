var express = require('express');
var router = express.Router();

let dataOrders = [
  {
    id: 1,
    createdDate: '1/1/1',
    shippedDate: '1/2/1',
    status: 'WAITING',
    description: 'New order',
    shippingAddress: 'Ha Noi',
    paymentType: 'CASH',
    customerID: 4,
    employeeID: 1,
  },
  {
    id: 2,
    createdDate: '1/1/1',
    shippedDate: '1/2/1',
    status: 'COMPLETED',
    description: 'New order',
    shippingAddress: 'Ha Noi',
    paymentType: 'CASH',
    customerID: 2,
    employeeID: 3,
  },
  {
    id: 3,
    createdDate: '1/1/1',
    shippedDate: '1/2/1',
    status: 'CANCELED',
    description: 'New order',
    shippingAddress: 'Ha Noi',
    paymentType: 'CREDIT CARD',
    customerID: 3,
    employeeID: 1,
  },
  {
    id: 4,
    createdDate: '1/1/1',
    shippedDate: '1/2/1',
    status: 'WAITING',
    description: 'New order',
    shippingAddress: 'Ha Noi',
    paymentType: 'CASH',
    customerID: 3,
    employeeID: 4,
  },
  {
    id: 5,
    createdDate: '1/1/1',
    shippedDate: '1/2/1',
    status: 'COMPLETED',
    description: 'New order',
    shippingAddress: 'Ha Noi',
    paymentType: 'CREDIT CARD',
    customerID: 5,
    employeeID: 3,
  },
];

/* GET data supplier. */
router.get('/', (req, res, next) => {
  res.send(dataOrders);
});

const foundOrder = (xID) => {
  return dataOrders.find((x) => x.id === parseInt(xID));
};

// GET data supplier
router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  if (id === 'search') {
    next();
    return;
  }
  if (foundOrder(id)) {
    res.send(foundOrder(id));
    return;
  } else {
    res.send({ message: 'Order not found' });
    return;
  }
});

// Search order
router.get('/search', (req, res, next) => {
  const { id, status } = req.query;
  res.send(`id: ${id} \nstatus: ${status}`);
});

//Insert order
router.post('/', (req, res, next) => {
  const newOrder = req.body;
  dataOrders.push(newOrder);
  res.send({ message: 'Inserted success' });
});

//Update order
router.patch('/:id', (req, res, next) => {
  const { id } = req.params;
  const {
    createdDate,
    shippedDate,
    status,
    description,
    shippingAddress,
    paymentType,
    customerID,
    employeeID,
  } = req.body;

  const orderUpdate = foundOrder(id);
  if (orderUpdate) {
    orderUpdate.createdDate = createdDate;
    orderUpdate.shippedDate = shippedDate;
    orderUpdate.status = status;
    orderUpdate.description = description;
    orderUpdate.shippingAddress = shippingAddress;
    orderUpdate.paymentType = paymentType;
    orderUpdate.customerID = customerID;
    orderUpdate.employeeID = employeeID;
    res.send({ message: 'Updated success' });
    return;
  } else {
    res.send({ message: 'Order you will update not found' });
    return;
  }
});

//Remove order
router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  if (foundOrder(id)) {
    dataOrders = dataOrders.filter((x) => x.id !== parseInt(id));
    res.status(202).send({ message: 'Deleted success' });
    return;
  } else {
    res.status(401).send({ message: 'Deleted failed' });
  }
});

module.exports = router;
