const User = require("../models/user");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    //if user already exist
    const userExist = await User.exists({ email: email.toLowerCase() })

    if (userExist) {
      return res.status(409).send("E-mail already in user.")
      //conflict => 409
    }

    //bcrypt password
    const bcryptPassword = await bcrypt.hash(password, 12);

    //create user
    const user = await User.create({
      username,
      email: email.toLowerCase(),
      password: bcryptPassword
    })

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

    res.status(201).json({
      isSuccess: true,
      data: {
        email: user.email,
        username: user.username,
        token
      },
      message: "User register success"
    })

  } catch (err) {
    return res.status(500).send("Error occurs please try again")
  }
}