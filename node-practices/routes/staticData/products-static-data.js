var express = require('express');
var router = express.Router();

let dataProducts = [
  {
    id: 1,
    name: 'Table',
    price: 100000,
    discount: 20,
    stock: 100,
    categoryID: 1,
    supplierID: 2,
    description: 'Ghế công thái học',
  },
  {
    id: 2,
    name: 'SamSung Galaxy S8',
    price: 200000,
    discount: 20,
    stock: 100,
    categoryID: 3,
    supplierID: 2,
    description: 'Smart Phone Galaxy',
  },
  {
    id: 3,
    name: 'IPHONE 14 Pro',
    price: 1900000,
    discount: 2,
    stock: 99,
    categoryID: 2,
    supplierID: 1,
    description: 'IPhone 14 Pro 128GB',
  },
  {
    id: 4,
    name: 'OLEVS',
    price: 1200000,
    discount: 20,
    stock: 13,
    categoryID: 4,
    supplierID: 5,
    description: 'Đồng hồ olevs chính hãng',
  },
  {
    id: 5,
    name: 'AirPort',
    price: 123000,
    discount: 20,
    stock: 100,
    categoryID: 1,
    supplierID: 5,
    description: 'AirPort',
  },
];

/* GET list dataProducts. */
router.get('/', function (req, res, next) {
  res.send(dataProducts);
});

/* GET item at dataProducts. */
router.get('/:id', function (req, res, next) {
  if (req.params.id === 'search') {
    next();
    return;
  }
  const getID = parseInt(req.params.id);
  const found = dataProducts.find((x) => {
    return x.id === getID;
  });
  if (found) {
    res.send(found);
    return;
  } else {
    res.status(404).send("Can't find product");
    return;
  }
});

/* Search item dataProducts. */
// router.get('/search/name', function (req, res, next) { hoặc như phía dưới nhưng phải kiểm tra điều kiện ở những url phía trên để tránh trùng lặp url chỗ 'next'
router.get('/search', function (req, res, next) {
  const { id, name } = req.query;
  console.log(`id: ${id}`);
  console.log(name);
  res.send('Search Ok');
});

/* POST insert item at dataProducts. */
router.post('/', function (req, res, next) {
  const newCategory = req.body;
  dataProducts.push(newCategory);
  res.status(201).send({ message: 'Insert item category success' });
});

/* PATCH updated item at dataProducts. */
router.patch('/:id', (req, res, next) => {
  const { id } = req.params;
  const { name, description } = req.body;

  let found = dataProducts.find((x) => {
    return (x.id = parseInt(id));
  });

  found.name = name;
  found.description = description;

  res.send({ message: 'Updated is success' });
});

/* DELETE remove item at dataProducts. */
router.delete('/:id', function (req, res, next) {
  const getID = req.params.id;
  dataProducts = dataProducts.filter((x) => x.id !== parseInt(getID));

  console.log(getID);
  res.status(202).send({ message: 'Deleted success' });
});

module.exports = router;
