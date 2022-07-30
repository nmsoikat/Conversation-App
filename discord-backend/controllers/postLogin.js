const User = require("../models/user");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //find user
    const user = await User.findOne({ email: email.toLowerCase() })

    if (user && (await bcrypt.compare(password, user.password))) {
      // login
      //create JWT token
      const token = jwt.sign(
        {
          userId: user._id,
          email: user.email
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '24h'
        }
      )

      return res.status(201).json({
        isSuccess: true,
        data: {
          email: user.email,
          username: user.username,
          token
        },
        message: "User register success"
      })
    }

    //invalid credential
    return res.status(400).send("Invalid user credential, Please try again")

  } catch (err) {
    console.log(err);
    return res.status(500).send("Error occurs please try again")
  }
}