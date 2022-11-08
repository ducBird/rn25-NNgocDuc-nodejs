var express = require('express');
var router = express.Router();

let dataCategories = [
  {
    id: 1,
    name: 'Laptop',
    description: 'Laptop',
  },
  {
    id: 2,
    name: 'SmartPhone',
    description: 'Điện thoại thông minh',
  },
  {
    id: 3,
    name: 'GiaDung',
    description: 'Đồ điện tử gia dụng',
  },
  {
    id: 4,
    name: 'SmartWatch',
    description: 'Đồng hồ thông minh',
  },
  {
    id: 5,
    name: 'IPhone',
    description: 'Điện thoại IPhone',
  },
];

/* GET list dataCategories. */
router.get('/', function (req, res, next) {
  res.send(dataCategories);
});

/* GET item at dataCategories. */
router.get('/:id', function (req, res, next) {
  if (req.params.id === 'search') {
    next();
    return;
  }
  const getID = parseInt(req.params.id); //'/:id' đặt tên ở đây như thế nào thì gọi req.param.id như thế
  const found = dataCategories.find((x) => {
    return x.id === getID;
  });
  if (found) {
    res.send(found);
    return;
  } else {
    res.status(404).send("Can't find category");
    return;
  }
});

/* Search item dataCategories. */
// router.get('/search/name', function (req, res, next) { hoặc như phía dưới nhưng phải kiểm tra điều kiện ở những url phía trên để tránh trùng lặp url chỗ 'next'
router.get('/search', function (req, res, next) {
  const { id, name } = req.query;
  console.log(id);
  console.log(name);
  res.send('OK');
});

/* POST insert item at dataCategories. */
router.post('/', function (req, res, next) {
  const newCategory = req.body;
  dataCategories.push(newCategory);
  res.status(201).send({ message: 'Insert item category success' });
});

/* PATCH updated item at dataCategories. */
router.patch('/:id', (req, res, next) => {
  const { id } = req.params;
  const { name, description } = req.body;

  let found = dataCategories.find((x) => {
    return (x.id = parseInt(id));
  });

  found.name = name;
  found.description = description;

  res.send({ message: 'Updated is success' });
});

/* DELETE remove item at dataCategories. */
router.delete('/:id', function (req, res, next) {
  const getID = req.params.id;
  dataCategories = dataCategories.filter((x) => x.id !== parseInt(getID));

  console.log(getID);
  res.status(202).send({ message: 'Deleted success' });
});

module.exports = router;
