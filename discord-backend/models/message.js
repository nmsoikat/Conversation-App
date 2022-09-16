const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
  author: {
    type: mongoose.Types.ObjectId,
    ref: "User"
  },
  content: String,
  date: Date,
  type: String
})

module.exports = mongoose.model("Message", messageSchema)