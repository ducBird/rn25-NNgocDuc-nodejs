var express = require('express');
var router = express.Router();

const { default: mongoose } = require('mongoose');
const { Customer } = require('../models');

mongoose.connect('mongodb://127.0.0.1:27017/BasicDBecommerce');

/* GET data Customers. */
router.get('/', function (req, res, next) {
  try {
    Customer.find().then((result) => {
      res.send(result);
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// GET data Customer
router.get('/:id', function (req, res, next) {
  const getId = req.params.id;
  if (getId === 'search') {
    next();
    return;
  }
  try {
    // const id = '636404585452ff76b963e61d';
    const id = req.params.id;
    Customer.findById(id).then((result) => {
      // console.log(result);
      res.send(result);
      return;
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
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
  try {
    const data = req.body;
    const newItem = new Customer(data);
    newItem.save().then((result) => {
      res.send(result);
      return;
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

//Update Customer
router.patch('/:id', (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    Customer.findByIdAndUpdate(id, data, {
      new: true,
    }).then((result) => {
      // console.log(result);
      res.send(result);
      return;
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
    return;
  }
});

//Remove Customer
router.delete('/:id', (req, res, next) => {
  try {
    const { id } = req.params;
    Customer.findByIdAndDelete(id).then((result) => {
      res.send(result);
      return;
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
    return;
  }
});

module.exports = router;
