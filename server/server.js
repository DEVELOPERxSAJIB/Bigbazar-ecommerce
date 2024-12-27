const app = require("./app.js");
const connectDatabase = require("./config/database");
const express = require("express");
const path = require("path");

const __dirnametohid = path.resolve()

// handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log(`Error: ${err.message}`)
  console.log(`server is shutting down due to uncaught exception`)
})

// config dotven
require("colors");
require("dotenv").config();

connectDatabase();

if (process.env.NODE_ENV === 'PRODUCTION') {
  app.use(express.static(path.join(__dirnametohid, 'client', 'dist')));

  app.get('*', (req, res) =>
    res.sendFile(path.join(__dirnametohid, 'client', 'dist', 'index.html'))
  );
}

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(
    `server is running on port ${PORT} in ${process.env.NODE_ENV} mode`.bgBlue
  );
});



// // hander server errors
// process.on("unhandledRejection", (err) => {
//   console.log(`Error : ${err.message}`);
//   console.log(`server is shutting down due to unhandle rejection`);
//   server.close(() => {
//     process.exit(1);
//   });
// });
