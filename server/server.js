const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')
const {generateMessage, generateLocationMessage} = require('./utils/message')
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users')


const publicPath = path.join(__dirname + '../../public')
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server)
let users = new Users();


app.use(express.static(publicPath))

io.on('connection', (socket) => {
  console.log('Nouveau user connection');


  ///////////////////////////////////////////////
  // disconnecting emails
  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);

    if(user){
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
    }



    console.log('you dont have connection')
  })

  // socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'))
  // socket.broadcast.emit('newMessage', generateMessage('Admin','new user joined'));


  /////////////////////////////////////////////////
  socket.on('join', (params, callback)=>{
    if (!isRealString(params.name) || !isRealString(params.room)) {
     return callback('Name and room name are required')
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room)
    

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'))
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));
    callback()
  })


  ///////////////////////////////////////////////////
  socket.on('createMessage', (mes, callback) => {
    console.log('ton nuevo mensaje', mes)
    io.emit('newMessage', generateMessage(mes.from, mes.text));
      callback();
  })


  ///////////////////////////////////////////////////
  socket.on('createLocationMessage', (coords)=>{
    // console.log('this is it')
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
  })

})



server.listen(port, () => {
  console.log(`Server is up on ${port}`)
})
