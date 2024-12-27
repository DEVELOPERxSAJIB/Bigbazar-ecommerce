const User = require("../modals/User");
const createError = require("http-errors")
const mongoose = require("mongoose")


const findWithId = async (Model, id, options = {}) => {
  try {

    const item = await Model.findById(id, options);

    if (!item) {
      throw createError(404, `No such ${Model.modelName} found with given Id`)
    }

    return item

  } catch (error) {
    if (error instanceof mongoose.Error) {
     throw createError(400, `Invalid ${Model.modelName} Id`);
    }

    throw error
  }
};

module.exports = findWithId;