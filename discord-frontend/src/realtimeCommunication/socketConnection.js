import io from 'socket.io-client'

let socket = null;
export const connectWithSocketServer = (userDetails) => {
  const jwtToken = userDetails.token;

  socket = io('http://localhost:5001', {
    auth: {
      token: jwtToken
    }
  })

  socket.on('connect', () => {
    console.log("user connected");
    console.log(socket.id);
  })
}


//connectWithSocketServer //call this function when login complete