import express from 'express'
import {uploadProduct, getAllProducts, getProductsByCategory, updateProduct, deleteProduct} from '../Controllers/productController.js'
import upload from '../Config/multer.js'

const productRoute = express.Router()

productRoute.post('/upload/:category_id', upload.single('Image'), uploadProduct)
productRoute.get('/get-all', getAllProducts)
productRoute.get('/get-products-by-category/:category_id', getProductsByCategory)
productRoute.put('/update/:product_id', upload.single('Image'), updateProduct)
productRoute.delete('/delete/:product_id', deleteProduct)

export default productRoute