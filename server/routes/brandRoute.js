const express = require("express");
const { createBrand, getAllBrand, deleteBrand, editBrand } = require("../controllers/brandController");
const { brandImage } = require("../utils/multer");


// Initiate express app
const brandRouter = express.Router();

// Define routes
brandRouter.route('/').get(getAllBrand).post(brandImage, createBrand)
brandRouter.route('/:id').delete(deleteBrand).put(brandImage, editBrand)

// export default
module.exports = brandRouter;

