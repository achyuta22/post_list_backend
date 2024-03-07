const express = require("express");
const router = new express.Router();
// const Products = require("../models/productsSchema");
const post = require("../models/postdata");
const User = require("../models/userdata");
const bodyParser = require("body-parser");
var jwt = require("jsonwebtoken");
// const authenicate = require("../middleware/authenticate");
var nodemailer = require("nodemailer");

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
const register = async (req, res) => {
  console.log("req sent");
  console.log(req.body);
  if (req.body) {
    const userfound = await User.findOne({ email: req.body.email });
    if (userfound) {
      console.log("email already registered");
      res.send({ msg: "email already registered", status: 409 });
    }
    if (!userfound) {
      const { fname, email, password } = req.body;
      let hashedpassword;
      hashedpassword = await bcrypt.hash(password, saltRounds);
      const user = new User({
        fname,
        email,
        password: hashedpassword,
      });
      const storeddata = await user.save();
      console.log(storeddata);
      const token = await jwt.sign(
        {
          data: "foobar",
        },
        "secret",
        { expiresIn: "1h" }
      );
      res
        .status(201)
        .json({ msg: "successfully registered", status: 201, token: token });
      var mailOptions = {
        from: "ravihalbharat@gmail.com",
        to: email,
        subject: "Successful Signup",
        text: "Welcome to Post Links",
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      //   User.save({
      //     email,
      //   });
    }
  }
};
const login = async (req, res) => {
  console.log("req for login");
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      const hash = user.password;
      bcrypt.compare(password, hash, async function (err, result) {
        if (!result) {
          // res.status(400).json({ msg: "passwords not matching" });
          res.send({ msg: "passwords not matching", status: 400 });
        } else {
          const token = await jwt.sign(
            {
              data: "foobar",
            },
            "secret",
            { expiresIn: "1h" }
          );
          console.log(token);
          res.send({ msg: "successful login", status: 201, token: token });
        }
      });
    } else {
      res.send({ msg: "user not found", status: 404 });
    }
  } catch (error) {}
};

const code = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email: email });
  console.log(user);
  if (user != null) {
    const code = Math.floor(100000 + Math.random() * 900000);

    // Store the verification code
    verificationCodes[email] = code;
    var mailOptions = {
      from: "ravihalbharat@gmail.com",
      to: email,
      subject: "Password Reset",
      text: `Your verification code is: ${code}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
        res.send({ msg: "Verification code sent", status: 266 });
      }
    });
  } else {
    res.send({ message: "email not registered", status: 404 });
  }
};
const verify = async (req, res) => {
  console.log(req.body);
  const { email, code, password } = req.body;
  if (verificationCodes[email] == code) {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = await User.findOneAndUpdate(
      { email: email },
      { password: hashedPassword },
      { new: true }
    );
    if (user) {
      console.log("password reset");
      res.send({ message: "password reset", status: 201 });
    } else {
      console.log("error while updating password");
      res.send({ message: "error while updating password", status: 405 });
    }
  } else {
    res.send({ message: "enter correct code", status: 466 });
    console.log("code is incorrect");
  }
};

const posts = async (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.send({ message: "No token provided", status: 402 });
  }

  jwt.verify(token.replace("Bearer ", ""), "secret", async (err, decoded) => {
    if (err) {
      console.log(err);
      console.log("token expired");
      return res.send({ message: "Token expired or invalid", status: 401 });
    } else {
      // Token is valid
      // Proceed with your application logic
      const postsdata = await post.find({});
      console.log(postsdata);
      // return res.send({ message: JSON.stringify(postsdata), status: 200 });
      return res.status(200).json({ posts: postsdata });
    }
  });
};
const contact = async (req, res) => {
  const { email, subject, message } = req.body;
  console.log(req.body);
  var mailOptions1 = {
    from: email,
    to: "ravihalbharat@gmail.com",
    subject: subject,
    text: message,
  };
  transporter.sendMail(mailOptions1, function (error, info) {
    if (error) {
      console.log(error);
      res.send({ message: "error while sending mail", status: 400 });
    } else {
      res.send({ message: "successfully sent", status: 200 });
      console.log("Email sent: " + info.response);
    }
  });
};

// module.exports = router;
module.exports = { register, login, posts, verify, code, contact };
