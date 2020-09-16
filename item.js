const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const itemSchema = new mongoose.Schema({
  _id: ObjectId,
  code: String,
  name: String,
  m_code: String,
  category: String,
  etc1: String,
  etc2: String,
  etc3: String,
  standard: String,
  unit: String,
  receiving_price: Number,
  price: Number,
  inventory_quantity: Number
});

module.exports = mongoose.model('Item', itemSchema);