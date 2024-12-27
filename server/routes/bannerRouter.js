const express = require("express");
const { bannerImage } = require("../utils/multer");
const { getAllBanner, createBanner, deleteBanner } = require("../controllers/bannerController");


// Initiate express app
const bannerRouter = express.Router();

// Define routes
bannerRouter.route('/').get(getAllBanner).post(bannerImage, createBanner)
bannerRouter.route('/:id').delete(deleteBanner);

// export default
module.exports = bannerRouter;

