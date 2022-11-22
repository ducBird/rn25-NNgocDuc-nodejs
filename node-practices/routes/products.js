var express = require('express');
var router = express.Router();

const { default: mongoose } = require('mongoose');
const { Product } = require('../models');

//MONGOOSE
mongoose.connect('mongodb://127.0.0.1:27017/BasicDBecommerce');

//MONGODB
const { findDocuments } = require('../helpers/MongoDbHelper');

//============================BEGIN MONGOOSE============================//

/* GET data Products. */
router.get('/', function (req, res, next) {
  // try {
  //   Product.find().then((result) => {
  //     res.send(result);
  //   });
  // } catch (error) {
  //   console.log(error);
  //   res.sendStatus(500);
  // }

  try {
    Product.find()
      .lean({ virtuals: true })
      .populate('category')
      .populate('supplier')
      .then((result) => {
        res.send(result);
      });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// GET data Product
router.get('/:id', function (req, res, next) {
  const getId = req.params.id;
  if (getId === 'search') {
    next();
    return;
  }
  try {
    // const id = '636404585452ff76b963e61d';
    const id = req.params.id;
    Product.findById(id)
      .lean({ virtuals: true })
      .populate('category')
      .populate('supplier')
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

// Search Product
router.get('/search', (req, res, next) => {
  const { id, firstName, lastName } = req.query;
  console.log(`id: ${id}`);
  res.send('OK query string');
});

//Insert Product
router.post('/', (req, res, next) => {
  try {
    const data = req.body;
    const newItem = new Product(data);
    newItem.save().then((result) => {
      res.send(result);
      return;
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

//Update Product
router.patch('/:id', (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    Product.findByIdAndUpdate(id, data, {
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

//Remove Product
router.delete('/:id', (req, res, next) => {
  try {
    const { id } = req.params;
    Product.findByIdAndDelete(id).then((result) => {
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

const lookupCategory = {
  $lookup: {
    from: 'categories', // foreign collection name
    localField: 'categoryId',
    foreignField: '_id',
    as: 'category', // alias
  },
};

const lookupSupplier = {
  $lookup: {
    from: 'suppliers', // foreign collection name
    localField: 'supplierId',
    foreignField: '_id',
    as: 'supplier', // alias
  },
};

//QUETIONS 1-----------------------------
// Hiển thị tất cả các mặt hàng có giảm giá <= 10%
router.get('/questions/1', async (req, res, next) => {
  try {
    let query = { discount: { $lte: 10 } };
    const results = await findDocuments({ query: query }, 'products');
    res.json({ ok: true, results });
  } catch (error) {
    res.status(500).json(error);
  }
});

//QUETIONS 2-----------------------------
// Hiển thị tất cả các mặt hàng có tồn kho <= 5
router.get('/questions/search', async (req, res, next) => {
  const { stock } = req.query;
  console.log(stock);
  try {
    let query = { stock: { $lte: stock } };
    const results = await findDocuments({ query: query }, 'products');
    res.json({ ok: true, results });
  } catch (error) {
    res.status(500).json(error);
  }
});

//QUETIONS 3-----------------------------
//Hiển thị tất cả các mặt hàng có Giá bán sau khi đã giảm giá <= 100.000
router.get('/questions/3', async (req, res, next) => {
  try {
    const discount = { $subtract: [100, '$discount'] };
    const priceMulDiscount = { $multiply: ['$price', discount] };
    const priceBeforeDiscount = { $divide: [priceMulDiscount, 100] };

    let aggregate = [
      { $match: { $expr: { $lte: [priceBeforeDiscount, 18000] } } },
    ];
    const results = await findDocuments({ aggregate: aggregate }, 'products');
    res.json({ ok: true, results });
  } catch (error) {
    res.status(500).json(error);
  }
});

//QUETIONS 1-----------------------------

//============================END MONGODB============================//
module.exports = router;
