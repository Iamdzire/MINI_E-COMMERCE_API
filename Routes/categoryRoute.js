import express from 'express'
import {createCategory, getAllCategories, getSingleCategory} from '../Controllers/categoryController.js'
import upload from '../Config/multer.js'

const categoryRoute = express.Router()

categoryRoute.post('/create', upload.single('Image'), createCategory)
categoryRoute.get('/get-all', getAllCategories)
categoryRoute.get('/get-single/:category_id', getSingleCategory)

export default categoryRoute