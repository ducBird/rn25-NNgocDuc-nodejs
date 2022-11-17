var express = require('express');
var router = express.Router();

const { default: mongoose } = require('mongoose');
const { Order } = require('../models');

//MONGOOSE
mongoose.connect('mongodb://127.0.0.1:27017/BasicDBecommerce');

//MONGODB
const { findDocuments } = require('../helpers/MongoDbHelper');

//============================BEGIN MONGOOSE============================//

/* GET data Orders. */
router.get('/', function (req, res, next) {
  try {
    Order.find()
      .populate('orderDetails.product')
      .populate('customer')
      .populate('employee')
      .then((result) => {
        res.send(result);
      });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// GET data Order
router.get('/:id', function (req, res, next) {
  const getId = req.params.id;
  if (getId === 'search') {
    next();
    return;
  }
  try {
    // const id = '636404585452ff76b963e61d';
    const id = req.params.id;
    Order.findById(id)
      .populate('orderDetails.product')
      .populate('customer')
      .populate('employee')
      .then((result) => {
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

// Search Order
router.get('/search', (req, res, next) => {
  const { id, firstName, lastName } = req.query;
  console.log(`id: ${id}`);
  res.send('OK query string');
});

//Insert Order
router.post('/', (req, res, next) => {
  try {
    const data = req.body;
    const newItem = new Order(data);
    newItem.save().then((result) => {
      res.send(result);
      return;
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

//Update Order
router.patch('/:id', (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    Order.findByIdAndUpdate(id, data, {
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

//Remove Order
router.delete('/:id', (req, res, next) => {
  try {
    const { id } = req.params;
    Order.findByIdAndDelete(id).then((result) => {
      res.send(result);
      return;
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
    return;
  }
});

//============================END MONGOOSE============================//

//============================BEGIN MONGODB============================//
/**
 * import query mongodb
 * const { ...methods } = require('../helpers/MongoDbHelper');
 */

//QUETIONS 4-----------------------------

//============================END MONGODB============================//

module.exports = router;
