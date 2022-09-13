const User = require("../models/user");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

exports.login = async (req, res, next) => {
  try {
    const { mail, password } = req.body;

    //find user
    const user = await User.findOne({ mail: mail.toLowerCase() })

    if (user && (await bcrypt.compare(password, user.password))) {
      // login
      //create JWT token
      const token = jwt.sign(
        {
          userId: user._id,
          mail: user.mail
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '24h'
        }
      )

      return res.status(201).json({
        isSuccess: true,
        userDetails: {
          mail: user.mail,
          token: token,
          username: user.username,
          _id: user._id
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