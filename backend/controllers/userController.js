const User = require("../models/user");
const fs = require('fs')
const path = require("path")

exports.updateUsername = async (req, res, next) => {
  try {
    const { userId, username } = req.body;
    const user = await User.findByIdAndUpdate(userId, { username }, { new: true })

    return res.status(200).json({
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

    const oldUser = await User.findByIdAndUpdate(userId, { profileImg: file.filename }) //update and return old data
    const updatedUser = await User.findById(userId)


    //console.log(path.resolve('../frontend/public/upload', file.filename)); -> C:\...\...\...\Conversation-App\frontend\public\upload\5-1665692524428.jpg
    //console.log(path.join('frontend', 'public', 'upload', file.filename)); -> frontend\public\upload\3-1665692379777.jpg
    //remove old image file in async way
    if (oldUser.profileImg) {
      await new Promise((resolve, reject) => {
        fs.unlink(path.resolve('../frontend/public/upload', oldUser.profileImg), (err) => {
          if (err) {
            reject("old image is not deleted")
          }

          resolve("old image is deleted")
        })
      })
    }

    return res.status(200).json({
      isSuccess: true,
      userDetails: {
        profileImg: updatedUser.profileImg,
      },
      message: "Profile image updated"
    })
  } catch (err) {
    console.log(err);
    return res.status(500).send("Error occurs please try again")
  }
}