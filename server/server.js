const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')



const publicPath = path.join(__dirname + '../../public')
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server)

app.use(express.static(publicPath))

io.on('connection', (socket)=> {
  console.log('Nouveau user connection');

///////////////////////////////////////////////
// passing email object  
  // socket.emit('newEmail', {
  //   from: 'manski@mail.com',
  //   text: 'hey bitch.',
  //   createdAt: new Date().getMonth()
  // });

///////////////////////////////////////////////
// creating emails
  // socket.on('createEmail', (newEmail) =>{
  //   console.log('createEmail', newEmail);
  // })

///////////////////////////////////////////////
// disconnecting emails
  socket.on('disconnect', ()=>{
    console.log('you dont have connection')
  })

///////////////////////////////////////////////
// newMessage
  // socket.emit('newMessage', {
  //   from: 'nanay@email.com',
  //   text: 'this is our new message',
  //   createdAt: new Date().getFullYear()
  // })



socket.on('createMessage', (mes)=>{
  console.log('ton nuevo mensaje', mes)
  io.emit('newMessage', {
    from: mes.email,
    text: mes.text,
    createdAt: new Date().getTime()
  })
})



})



server.listen(port, ()=>{
  console.log(`Server is up on ${port}`)
})



