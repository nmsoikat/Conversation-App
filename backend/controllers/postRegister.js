const User = require("../models/user");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.register = async (req, res, next) => {
  try {
    const { username, mail, password } = req.body;

    //if user already exist
    const userExist = await User.exists({ mail: mail.toLowerCase() })

    if (userExist) {
      return res.status(409).send("E-mail already in user.")
      //conflict => 409
    }

    //bcrypt password
    const bcryptPassword = await bcrypt.hash(password, 12);

    //create user
    const user = await User.create({
      username,
      mail: mail.toLowerCase(),
      password: bcryptPassword
    })

    //create JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        mail: user.mail
      },
      process.env.JWT_SECRET
      // {
      //   expiresIn: '24h'
      // }
    )

    res.status(201).json({
      isSuccess: true,
      userDetails: {
        mail: user.mail,
        token: token,
        username: user.username,
        profileImg: user.profileImg,
        _id: user._id
      },
      message: "User register success"
    })

  } catch (err) {
    console.log(err);
    return res.status(500).send("Error occurs please try again")
  }
}