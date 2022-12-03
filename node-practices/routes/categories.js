var express = require('express');
var router = express.Router();

const { default: mongoose } = require('mongoose');
const { Category } = require('../models');

//MONGOOSE
mongoose.connect('mongodb://127.0.0.1:27017/BasicDBecommerce');

//MONGODB
const { findDocuments } = require('../helpers/MongoDbHelper');
const passport = require('passport');

//============================BEGIN MONGOOSE============================//

/* GET list dataCategories. */
router.get('/', function (req, res, next) {
  try {
    Category.find()
      .sort({ name: 1 })
      .then((result) => {
        res.send(result);
        // console.log(result);
      });
  } catch (error) {
    // console.log(error);
    res.sendStatus(500);
  }
});

/* GET item at dataCategories. */
router.get('/:id', function (req, res, next) {
  if (req.params.id === 'search') {
    next();
    return;
  }
  try {
    const { id } = req.params;
    Category.findById(id).then((result) => {
      // console.log(result);
      res.send(result);
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
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
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  function (req, res, next) {
    try {
      const data = req.body;
      const newItem = new Category(data);
      newItem.save().then((result) => {
        // console.log(result);
        res.send(result);
      });
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }
);

/* PATCH updated item at dataCategories. */
router.patch('/:id', (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    Category.findByIdAndUpdate(id, data, {
      new: true,
    }).then((result) => {
      res.send(result);
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

/* DELETE remove item at dataCategories. */
router.delete('/:id', function (req, res, next) {
  try {
    const { id } = req.params;
    Category.findByIdAndDelete(id).then((result) => {
      // console.log(result);
      res.send(result);
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
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
