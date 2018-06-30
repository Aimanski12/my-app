 let socket = io();

 socket.on('connect', function () {
   console.log('connected to the server');

   //  socket.emit('createEmail', {
   //    to: 'yonski@email.com',
   //    text: 'Hey. this is me bitch'
   //  });
   //  socket.emit('createMessage', {
   //    to: 'piedra@punto.com',
   //    text: 'Mi espalda'
   //  });




 })

 socket.on('disconnect', function () {
   console.log('disconnected from the server')
 })


 // socket.on('newEmail', function(email){
 //   console.log('tu as email nouveau', email)
 //  console.log(`You have new email.
 //     from: ${email.from}
 //     message: ${email.text}
 //     date: ${email.createdAt}

 //  `);



socket.on('newMessage', function (message) {
  console.log('tienes nuevo mensaje', message);
  var li = $('<li></li>');
  li.text(`${message.from}: ${message.text}`);



  $('#messages').append(li)



 })


// socket.emit('createMessage', {
//   from: 'frank',
//   text: 'hi'
// }, function(data){
//   console.log('ich bin ein junge: ', data)
// });



$('#message-form').on('submit', function(e){
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'yonski',
    text: $('[name=message]').val()
  }, function(data){
      console.log('jQuery Worked', data)
  })
})

