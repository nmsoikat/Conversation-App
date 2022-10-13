const User = require("../models/user");

exports.updateUsername = async (req, res, next) => {
  try {
    const { userId, username } = req.body;
    const user = await User.findByIdAndUpdate(userId, { username }, {new:true})

    return res.status(201).json({
      isSuccess: true,
      userDetails: {
        username: user.username,
      },
      message: "Username updated"
    })
  } catch (err) {
    console.log(err);
    return res.status(500).send("Error occurs please try again")
  }
}

exports.updateUserProfileImage = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const file = req.file

    const user = await User.findByIdAndUpdate(userId, { profileImg: file.filename }, {new: true})

    return res.status(201).json({
      isSuccess: true,
      userDetails: {
        profileImg: user.profileImg,
      },
      message: "Profile image updated"
    })
  } catch (err) {
    console.log(err);
    return res.status(500).send("Error occurs please try again")
  }
}