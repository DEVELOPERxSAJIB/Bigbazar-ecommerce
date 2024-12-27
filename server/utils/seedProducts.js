const Product = require("../modals/Product")
const products = require("../data/product.json")
const connectDatabase = require("../config/database.js")
const { connect } = require('mongoose');

// setting up dotenv
require("dotenv").config()
connectDatabase()

const seedProduct = async () => {
    try {
        
        await Product.deleteMany()
        console.log('products are deleted')

        await Product.insertMany(products)
        console.log('all products are added')

        process.exit()

    } catch (error) {
        console.log(error.message)
        process.exit()
    }
}

seedProduct()