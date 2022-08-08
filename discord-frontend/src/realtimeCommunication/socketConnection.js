import io from 'socket.io-client'

let socket = null;
export const connectWithSocketServer = () => {
  socket = io('http://localhost:5001')

  socket.on('connect', () => {
    console.log("user connected");
    console.log(socket.id);
  })
}


//connectWithSocketServer //call this function when login complete