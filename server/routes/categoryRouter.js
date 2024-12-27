const express = require("express");
const { categoryImage } = require("../utils/multer");
const { getAllCategory, createCategory, deleteCategory, editCategory } = require("../controllers/categoryController");


// Initiate express app
const categoryRouter = express.Router();

// Define routes
categoryRouter.route('/').get(getAllCategory).post(categoryImage, createCategory)
categoryRouter.route('/:id').delete(deleteCategory).put(categoryImage, editCategory)

// export default
module.exports = categoryRouter;