var express = require('express');
var router = express.Router();

let phoneRandom = () => {
  return `0${Math.random().toString().substring(2, 11)}`;
};

let dataCustomers = [
  {
    id: 1,
    firstName: 'Nguyen',
    lastName: 'A',
    phoneNumber: phoneRandom(),
    address: 'Ha Noi',
    email: 'nguyena@gmail.com',
    brithDay: '1/1/1',
  },
  {
    id: 2,
    firstName: 'Tran',
    lastName: 'B',
    phoneNumber: phoneRandom(),
    address: 'Ha Noi',
    email: 'tranb@gmail.com',
    brithDay: '1/1/1',
  },
  {
    id: 3,
    firstName: 'Phan',
    lastName: 'C',
    phoneNumber: phoneRandom(),
    address: 'Ha Noi',
    email: 'phanc@gmail.com',
    brithDay: '1/1/1',
  },
  {
    id: 4,
    firstName: 'Dang',
    lastName: 'D',
    phoneNumber: phoneRandom(),
    address: 'Ha Noi',
    email: 'dangd@gmail.com',
    brithDay: '1/1/1',
  },
  {
    id: 5,
    firstName: 'Pham',
    lastName: 'E',
    phoneNumber: phoneRandom(),
    address: 'Ha Noi',
    email: 'phame@gmail.com',
    brithDay: '1/1/1',
  },
];

/* GET data Customers. */
router.get('/', function (req, res, next) {
  res.send(dataCustomers);
});

// GET data Customer
router.get('/:id', function (req, res, next) {
  const getId = req.params.id;
  if (getId === 'search') {
    next();
    return;
  }
  const foundCustomer = dataCustomers.find((x) => x.id === parseInt(getId));
  if (foundCustomer != null) {
    res.send(foundCustomer);
    return;
  } else {
    res.status(404).send({ message: 'Customer not found!' });
    return;
  }
});

// Search Customer
router.get('/search', (req, res, next) => {
  const { id, firstName, lastName } = req.query;
  console.log(`id: ${id}`);
  res.send('OK query string');
});

//Insert Customer
router.post('/', (req, res, next) => {
  const newCustomer = req.body;
  dataCustomers.push(newCustomer);
  res.status(201).send({ message: 'Interted success' });
});

//Update Customer
router.patch('/:id', (req, res, next) => {
  const { id } = req.params;
  const newCustomer = req.body;
  const foundCustomer = dataCustomers.find((x) => x.id === parseInt(id));
  foundCustomer.name = newCustomer.name;
  foundCustomer.firstName = newCustomer.firstName;
  foundCustomer.lastName = newCustomer.lastName;
  foundCustomer.phoneNumber = newCustomer.phoneNumber;
  foundCustomer.address = newCustomer.address;
  foundCustomer.email = newCustomer.email;
  foundCustomer.brithDay = newCustomer.brithDay;
  res.send('Update success');
});

//Remove Customer
router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  dataCustomers = dataCustomers.filter((x) => x.id !== parseInt(id));
  res.status(202).send({ message: 'Deleted success' });
});

module.exports = router;
