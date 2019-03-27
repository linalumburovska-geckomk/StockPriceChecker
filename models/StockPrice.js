const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stockPriceSchema = new Schema({
    stock: String,
    price: Number,
    like: Boolean
});


const ModelClass = mongoose.model('stockPriceSchema', stockPriceSchema);

module.exports = ModelClass;
