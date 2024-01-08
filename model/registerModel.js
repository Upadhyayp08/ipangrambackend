const mongoose = require("mongoose");

const registerSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Department: { type: String },
  City: { type: String, required: true },
  Email: { type: String, unique: true, required: true },
  Password: { type: String, required: true },
  Role: { type: String, required: true },
});

const Register = mongoose.model("Register", registerSchema);

module.exports = Register;
