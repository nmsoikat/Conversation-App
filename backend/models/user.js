const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  mail: { type: String, required: true, unique: true },
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  profileImg: {
    type: String
  }
})

module.exports = mongoose.model('User', userSchema)