const mongoose = require("mongoose");

const connectDatabase = () => {
  try {
    const connect = mongoose.connect(process.env.MONGO_URI);

    if (connect) {
      console.log(`MongoDb is connected to the host successfully`.bgWhite);
    }
  } catch (error) {
    console.log(`${error.message}`.bgRed);
  }
};

module.exports = connectDatabase;
