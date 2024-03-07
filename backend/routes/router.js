const express = require("express");
const router = new express.Router();
// const Products = require("../models/productsSchema");
const User = require("../models/userdata");
const bodyParser = require("body-parser");
var jwt = require("jsonwebtoken");

// const authenicate = require("../middleware/authenticate");
var nodemailer = require("nodemailer");
const {
  register,
  login,
  code,
  verify,
  posts,
  contact,
} = require("../functions/functions");
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ravihalbharat@gmail.com",
    pass: "zrig xqtk fnjc tkrc",
  },
});

const bcrypt = require("bcryptjs");
const saltRounds = 10;
const verificationCodes = {};

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/code").post(code);
router.route("/verify").put(verify);
router.route("/posts").get(posts);
router.route("/contact").post(contact);

module.exports = router;
