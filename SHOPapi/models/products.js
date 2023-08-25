const mongoose = require('mongoose')
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: String
    },
    imageURL: {
        type: String
    }
})

module.exports = mongoose.model('Products', productSchema)