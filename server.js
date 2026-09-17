import 'dotenv/config'
import mongoose from 'mongoose'
import express from 'express'
import categoryRoute from './Routes/categoryRoute.js'
import productRoute from './Routes/productRoute.js'

const onSuccess = () => console.log("MongoDB connected")
const onFailure = () => console.log("Connection failed")

const atlas_string = process.env.MONGO_URL

mongoose.connect(atlas_string)
                                .then(onSuccess, onFailure)



const app = express()
const port = 3000

app.use(express.json())
app.get('/', (req, res) => res.send("Welcome"))
app.use('/categories', categoryRoute)
app.use('/products', productRoute)


app.listen(port, () => console.log(`Server is listening on port ${port}`))
