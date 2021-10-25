require("dotenv").config();

const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const token = req.header("x-auth-token");

  // CHECK IF WE EVEN HAVE A TOKEN
  if (!token) {
    res.status(401).json({
      errors: [
        {
          msg: "ERROR: No token found.",
        },
      ],
    });
  }

  try {
    const user = await jwt.verify(token, process.env.ACCESS_SECRET);
    req.user = user.email;
    next();
  } catch (error) {
    res.status(400).json({
      errors: [
        {
          msg: "ERROR: Invalid token.",
        },
      ],
    });
  }
};
