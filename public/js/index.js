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


socket.on('newLocationMessage', function(message){
  let li = $('<li></li>');
  let a = $('<a target="_blank">My Location</a>');

  li.text(`${message.from}: `);
  a.attr('href', message.url);

  li.append(a);
  $('#messages').append(li)
}); 




// socket.emit('createMessage', {
//   from: 'frank',
//   text: 'hi'
// }, function(data){
//   console.log('ich bin ein junge: ', data)
// });



$('#message-form').on('submit', function(e){
  e.preventDefault();
  var messageTextbox = $('[name=message]');

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function(data){
      messageTextbox.val('');
  })
})


let locationButton = $('#send-location');
locationButton.on('click', function(){
  // console.log('it is working')
  
  
  if(!navigator.geolocation){
    return alert('Geolocation not suported by your browser.');
  }
  locationButton.attr('disabled', 'disabled').text('Sending...')

  navigator.geolocation.getCurrentPosition(function (position){
    // console.log(position)
    
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
    locationButton.removeAttr('disabled').text('Send location');
  }, function() {
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location');
  })


})