const mongoose = require("mongoose");
// const validator = require("validator");
// const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secretKey = "jfyfy";
const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: { type: String, required: true, minlength: 6 },
});

const User = mongoose.model("postList", userSchema);

module.exports = User;
