const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// Mongoose Datatypes:
// https://mongoosejs.com/docs/schematypes.html
const productSchema = new Schema({
  name: { type: String, required: [true, 'Name product is require'] },
  price: {
    type: Number,
    required: [true, 'Price is require'],
    min: [0, 'Must be at least 0, got {VALUE}'],
  },
  discount: {
    type: Number,
    required: [true, 'Discount product is require'],
    min: 0,
    max: 100,
  },
  stock: {
    type: Number,
    required: [true, 'Stock is required'],
    min: 0,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  supplierId: {
    type: Schema.Types.ObjectId,
    ref: 'Supplier',
    required: true,
  },
  description: {
    type: String,
  },
});

const Product = model('Product', productSchema);

module.exports = Product;
