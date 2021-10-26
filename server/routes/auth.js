require("dotenv").config();
const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../models/User");
const users = require("../db");

// SIGNUP
router.post(
  "/signup",
  [
    check("email", "Please input a valid email").isEmail(),
    check(
      "password",
      "Please input a password with a min length of 6."
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const { email, password } = req.body;

    // Validate the inputs
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      });
    }

    let checkUser = await User.findAll({
      where: {
        username: email,
      },
    });

    let userAlreadyExists = Array.isArray(checkUser) && checkUser.length;

    // if theres already a user, then its value will be more than 0, i.e. 1
    // so if there is, return error
    if (userAlreadyExists > 0) {
      return res.status(422).json({
        errors: [
          {
            msg: "This user already exists",
          },
        ],
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the password into the db
    const postUser = await User.create({
      username: email,
      password: hashedPassword,
    });

    const token = await JWT.sign({ email }, process.env.ACCESS_SECRET, {
      expiresIn: 360000,
    });

    return res.status(201).json({
      token,
      postUser,
    });
  }
);

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Check if user with email exists
  let user = await User.findAll({
    where: {
      username: email,
    },
  });

  let dbHasUser = Array.isArray(user) && user.length;

  if (!dbHasUser) {
    return res.status(422).json({
      errors: [
        {
          msg: "Invalid Credentials",
        },
      ],
    });
  }

  // Check if the password if valid
  let isMatch = await bcrypt.compare(password, user[0].password);

  if (!isMatch) {
    return res.status(404).json({
      errors: [
        {
          msg: "Invalid Credentials",
        },
      ],
    });
  }

  // Send JSON WEB TOKEN
  const token = await JWT.sign({ email }, process.env.ACCESS_SECRET, {
    expiresIn: 360000,
  });

  let getUser = await User.findAll({
    where: {
      username: email,
    },
  });

  res.json({
    token,
  });
});

// ALL USER
router.get("/all", async (req, res) => {
  let allUsers = await User.findAll();
  res.json(allUsers);
});

module.exports = router;