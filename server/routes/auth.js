require("dotenv").config();
const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../models/User");

// SIGNUP
router.post(
  "/signup",
  [
    // email + password validation with express-validator
    check("email", "Please input a valid email.").isEmail(),
    check(
      "password",
      "Please input a password with a min length of 6."
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const { email, password } = req.body;

    // Validate the inputs
    const errors = validationResult(req);

    // if errors exist in our validation, respond back with a JSON of all the errors
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      });
    }

    // Sequelize method to find all users "where" the data matches
    let checkUser = await User.findAll({
      where: {
        username: email,
      },
    });

    // if theres already a user, then its value will be more than 0, i.e. 1
    // so if there is, return error
    let userAlreadyExists = Array.isArray(checkUser) && checkUser.length;
    if (userAlreadyExists > 0) {
      return res.status(422).json({
        errors: [
          {
            msg: "This user already exists in our database.",
          },
        ],
      });
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the email and password into the db
    const postUser = await User.create({
      username: email,
      password: hashedPassword,
    });

    // Assign a JWT token upon signup using their email
    const token = await JWT.sign({ email }, process.env.ACCESS_SECRET, {
      expiresIn: 360000,
    });

    // Send JWT signup token
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

  // if db has this user, then its value will be more than 0, i.e. 1
  let dbHasUser = Array.isArray(user) && user.length;
  // if db doesn't have this user, we respond "invalid credentials" error
  if (!dbHasUser) {
    return res.status(422).json({
      errors: [
        {
          msg: "Invalid credentials.",
        },
      ],
    });
  }

  // Check if the password they entered is valid using bcrypt
  let isMatch = await bcrypt.compare(password, user[0].password);

  if (!isMatch) {
    return res.status(404).json({
      errors: [
        {
          msg: "Invalid credentials.",
        },
      ],
    });
  }

  // Sign their login with a JWT token
  const token = await JWT.sign({ email }, process.env.ACCESS_SECRET, {
    expiresIn: 360000,
  });

  // Send JWT
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
