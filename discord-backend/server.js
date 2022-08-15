const express = require("express")
const http = require('http')
const mongoose = require("mongoose")
const cors = require('cors')
require('dotenv').config()



const socketServer = require('./socketServer')



const authRoutes = require("./routes/authRoutes")
const friendsInvitationRoutes = require("./routes/friendsInvitationRoutes")


/**
 * process.env.PORT
  automatically get from deployed server machine
 */
const PORT = process.env.PORT || process.env.API_PORT

const app = express()
app.use(express.json())
app.use(cors())


//register routes
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/friend-invitation", friendsInvitationRoutes)

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