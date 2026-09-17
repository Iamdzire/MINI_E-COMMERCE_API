import categoryModel from '../Models/categoryModel.js'
import cloudinary from '../Config/cloudinary.js'

export const createCategory = async (req, res) => {
    try {
        const categoryName = req.body.Name
        const categoryImage = req.body.Image
        if(!req.file){
            return res.status(400).json({
                Message: "Please upload an image!!"
            })
        }
        const result = await cloudinary.uploader.upload(req.file.path)
        const imageUrl = result.secure_url

        const category = await categoryModel.create(
            {Name: categoryName, Image: imageUrl}
        )
        return res.status(201).json({
            Message: "Category successfully created",
            Data: category
        })
    }catch(error){
        return res.status(500).json({
            Message: error.message
        })
    }
}

export const getAllCategories = async (req, res) => {
    try {
        const getAll = await categoryModel.find().populate('Products')
        if(!getAll){
            return res.status(404).json({
                Message: "Please create a category"
            })
        }
        return res.status(200).json({
            Message: "All Categories fetched successfully",
            Data: getAll
        })
    }catch(error){
        return res.status(500).json({
            Message: error.message
        })
    }
}


export const getSingleCategory = async (req, res) => {
    try {
        const categoryId = req.params.category_id
        const getSingle = await categoryModel.findById(categoryId).populate('Products')
        if(!getSingle){
            return res.status(404).json({
                Message: "Category not found"
            })
        }
        return res.status(200).json({
            Message: "Category found successfully",
            data: getSingle
        })
    }catch(error){
        return res.status(500).json({
            Message: error.message
        })
    }
}