const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')
const {generateMessage, generateLocationMessage} = require('./utils/message')




const publicPath = path.join(__dirname + '../../public')
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server)

app.use(express.static(publicPath))

io.on('connection', (socket) => {
  console.log('Nouveau user connection');


  ///////////////////////////////////////////////
  // disconnecting emails
  socket.on('disconnect', () => {
    console.log('you dont have connection')
  })

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'))

  socket.broadcast.emit('newMessage', generateMessage('Admin','new user joined'));


  socket.on('createMessage', (mes, callback) => {
    console.log('ton nuevo mensaje', mes)
    io.emit('newMessage', generateMessage(mes.from, mes.text));
      callback('du ist eine fraune');
  })

  socket.on('createLocationMessage', (coords)=>{
    // console.log('this is it')
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
  })

})



server.listen(port, () => {
  console.log(`Server is up on ${port}`)
})
