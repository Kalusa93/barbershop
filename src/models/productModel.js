const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter a product name"]
        },
        type: {
            type: String,
            required: true
        },
        barber: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false
        },
        date: {
            type: String,
            required: true,
        },
        images: {
            type: Array,
            required: false,
        }
    },
    {
        timestamps: true
    }
)


const Product = mongoose.model('Product', productSchema);

module.exports = Product;