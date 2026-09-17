import productModel from '../Models/productModel.js'
import categoryModel from '../Models/categoryModel.js'
import cloudinary from '../Config/cloudinary.js'

export const uploadProduct = async (req, res) => {
    try {
        const categoryId = req.params.category_id
        const category = await categoryModel.findById(categoryId)
        if(!category){
            return res.status(404).json({
                Message: "Category not found"
            })
        }
        const productName = req.body.Name
        const productDescription = req.body.Description
        const productPrice = req.body.Price
        const productQuantity = req.body.Quantity
        const productImage = req.body.Image
        if(!req.file){
            return res.status(400).json({
                Message: "Please upload an image"
            })
        }
        const result = await cloudinary.uploader.upload(req.file.path)
        const imageUrl = result.secure_url
        
        const product = await productModel.create(
            {Name: productName, Description: productDescription, Price: productPrice, Quantity: productQuantity, Image: imageUrl}
        )
        await category.Products.push(product._id)
        await category.save()
        return res.status(201).json({
            Message: "Product uploaded successfully",
            Data: product
        })
    }catch(error){
        return res.status(500).json({
            Message: error.meaasge
        })
    }
}


export const getAllProducts = async (req, res) => {
    try {
        const getAll = await productModel.find()
        if(!getAll){
            return res.status(404).json({
                Message: "Please upload a product"
            })
        }
        return res.status(200).json({
            Message: "All products fetched successfully",
            data: getAll
        })
    }catch(error){
        return res.status(500).json({
            Message: error.message
        })
    }
}



export const getProductsByCategory = async (req, res) => {
    try {
        const categoryId = req.params.category_id
        const category = await categoryModel.findById(categoryId).populate('Products')
        if(!category){
            return res.status(404).json({
                Message: "Category not found"
            })
        }
        return res.status(200).json({
            Message: "Category fetched successfully",
            Data: category
        })
    }catch(error){
        return res.status(500).json({
            Message: error.message
        })
    }
}


export const updateProduct = async (req, res) => {
    try {
        const productId = req.params.product_id
        const productName = req.body.Name
        const productDescription = req.body.Description
        const productPrice = req.body.Price
        const productQuantity = req.body.Quantity
        const productImage = req.body.Image
        if(!req.file){
            return res.status(400).json({
                Message: "Please upload an image!!!"
            })
        }
        const result = await cloudinary.uploader.upload(req.file.path)
        const imageUrl = result.secure_url

        const update = await productModel.findByIdAndUpdate(productId,
            {Name: productName, Description: productDescription, Price: productPrice, Quantity: productQuantity, Image: imageUrl}, {returnDocument: 'after'}
        )
        return res.status(200).json({
            Message: "Product updated successfully",
            Data: update
        })
    }catch(error){
        return res.status(500).json({
            Message: error.message
        })
    }
}


export const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.product_id
        const product = await productModel.findByIdAndDelete(productId)
        if(!product){
            return res.status(404).json({
                Message: "Product not found"
            })
        }
        return res.status(200).json({
            Message: "Product deleted successfully",
            Data: product
        })
    }catch(error){
        return res.status(500).json({
            Message: error.message
        })
    }
}