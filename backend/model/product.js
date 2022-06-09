const mongoose = require('mongoose')
const { Schema } = mongoose

const productSchema = new Schema({
    name: String,
    brand: String,
    price: Number,
})
const Product = mongoose.model('Product', productSchema);

module.exports = Product