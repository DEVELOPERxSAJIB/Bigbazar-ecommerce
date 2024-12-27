const cloudinary = require("cloudinary");

// config Cloudnary
cloudinary.v2.config({
  cloud_name: "djdkjrlp8",
  api_key: "767212511153515",
  api_secret: "UouvfbLHI_yNUTaf_mroowujq9c",
});

// @User
// Profile picture upload
const cloudUploadAvatar = async (avaterInfo) => {
  const results = await cloudinary.uploader.upload(avaterInfo.path, {
    folder: "avatars",
  });
  return results;
};

// Profile picture Delete
const cloudDeleteAvatar = async (public_id) => {
  await cloudinary.uploader.destroy(public_id);
};

// @Products
// Product Images Upload
const cloudProductImagesUpload = async (req) => {
  const results = await Promise.all(
    req.files.map(async (file) => {
      const result = await cloudinary.uploader.upload(file.path);
      return result;
    })
  );

  return results;
};


// Product Images Delete
const cloudProductImagesDelete = async (publidIds) => {
  await Promise.all(
    publidIds.map(async (public_id) => {
      await cloudinary.uploader.destroy(public_id);
    })
  );
};

// @BrandAndCategory
const singleImageUpload = async(file) => {
  const result = await cloudinary.uploader.upload(file.path);
  return result;
}
const singleImageDelete = async(public_id) => {
   await cloudinary.uploader.destroy(public_id);
}

module.exports = {
  cloudUploadAvatar,
  cloudDeleteAvatar,
  cloudProductImagesUpload,
  cloudProductImagesDelete,

  singleImageUpload,
  singleImageDelete
};
