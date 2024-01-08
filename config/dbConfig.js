const mongoose = require("mongoose");
require("dotenv").config();
// const dbConnect = mongoose.connect(process.env.mongoUrl, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
const dbConnect = mongoose.connect(process.env.mongoUrl);

module.exports = dbConnect;
