var express = require('express');
var router = express.Router();

let phoneRandom = () => {
  return `0${Math.random().toString().substring(2, 11)}`;
};

let dataSuppliers = [
  {
    id: 1,
    name: 'ABC company',
    email: 'abccom@gmail.com',
    phoneNumber: phoneRandom(),
    address: 'Ha Noi',
  },
  {
    id: 2,
    name: 'DEF company',
    email: 'defcom@gmail.com',
    phoneNumber: phoneRandom(),
    address: 'Binh Dinh',
  },
  {
    id: 3,
    name: 'GHI company',
    email: 'ghicom@gmail.com',
    phoneNumber: phoneRandom(),
    address: 'Nghe An',
  },
  {
    id: 4,
    name: 'KLM company',
    email: 'klmcom@gmail.com',
    phoneNumber: phoneRandom(),
    address: 'Long An',
  },
  {
    id: 5,
    name: 'NOP company',
    email: 'nopcom@gmail.com',
    phoneNumber: phoneRandom(),
    address: 'Binh Duong',
  },
];

/* GET data supplier. */
router.get('/', function (req, res, next) {
  res.send(dataSuppliers);
});

// GET data supplier
router.get('/:id', function (req, res, next) {
  const getId = req.params.id;
  if (getId === 'search') {
    next();
    return;
  }
  const foundSupplier = dataSuppliers.find((x) => x.id === parseInt(getId));
  if (foundSupplier != null) {
    res.send(foundSupplier);
    return;
  } else {
    res.status(404).send({ message: 'Supplier not found!' });
    return;
  }
});

// Search supplier
router.get('/search', (req, res, next) => {
  const { id, name, address } = req.query;
  console.log(id);
  console.log(name);
  console.log(address);
  res.send('OK query string');
});

//Insert Supplier
router.post('/', (req, res, next) => {
  const { id, name, email, address, phoneNumber } = req.body;
  dataSuppliers.push({ id, name, email, address, phoneNumber });
  res.status(201).send({ message: 'Interted success' });
});

//Update Supplier
router.patch('/:id', (req, res, next) => {
  const { id } = req.params;
  const { name, email, phoneNumber, address } = req.body;
  const foundSupplier = dataSuppliers.find((x) => x.id === parseInt(id));
  foundSupplier.name = name;
  foundSupplier.email = email;
  foundSupplier.phoneNumber = phoneNumber;
  foundSupplier.address = address;
  res.send('OK patch');
});

//Remove supplier
router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  dataSuppliers = dataSuppliers.filter((x) => x.id !== parseInt(id));
  res.status(202).send({ message: 'Deleted success' });
});

module.exports = router;
