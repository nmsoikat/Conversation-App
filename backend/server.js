const express = require("express")
const http = require('http')
const mongoose = require("mongoose")
const cors = require('cors')
require('dotenv').config()



const socketServer = require('./socketServer')



const authRoutes = require("./routes/authRoutes")
const friendsInvitationRoutes = require("./routes/friendsInvitationRoutes")
const userRoutes = require("./routes/userRoutes")


/**
 * process.env.PORT
  automatically get from deployed server machine
 */
const PORT = process.env.PORT || process.env.API_PORT

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('public'))

//register routes
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/friend-invitation", friendsInvitationRoutes)
app.use("/api/v1/user", userRoutes)

app.use((err, req, res, next) => {
  if (err.name === "MulterError") {
    return res.status(400).send("Profile image upload failed. " + err.message)
  }

  return res.status(400).send("Something went very wrong!")
})

const server = http.createServer(app)
socketServer.registerSocketServer(server)

// connect to db
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    // if db not connected our application will not work perfectly
    // so run server if db is connected
    server.listen(PORT, () => {
      // if server can run and listen successfully then, this callback will call
      console.log("Server is running on:", PORT);
    })

  })
  .catch((err) => {
    console.log("DB connection fail. Server not started");
    console.log(err);
  })