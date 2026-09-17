import mongoose from 'mongoose'

const categorySchema = mongoose.Schema({
    Name: {type: String, required: true},
    Image: {type: String, required: true},
    Products: [{type: mongoose.Schema.Types.ObjectId, ref: 'Products'}]
})

const categoryModel = mongoose.model('Categories', categorySchema, 'Categories')
export default categoryModel