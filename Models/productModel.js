import mongoose from 'mongoose'

const productSchema = mongoose.Schema({
    Name: {type: String, required: true},
    Description: {type: String, required: true},
    Price: {type: Number, required: true},
    Quantity: {type: Number, required: true},
    Image: {type: String, required: true}
}, {timestamps: true})

const productModel = mongoose.model('Products', productSchema, 'Products')
export default productModel