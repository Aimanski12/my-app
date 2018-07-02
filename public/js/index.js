let socket = io();

function scrollToBottom() {
  // Selector
  let messages = $('#messages');
  let newMessage = messages.children('li:last-child')
  // height
  let clientHeight = messages.prop('clientHeight');
  let scrollTop = messages.prop('scrollTop');
  let scrollHeight = messages.prop('scrollHeight');
  let newMessageHeight = newMessage.innerHeight();
  let lastMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
    // console.log('should scroll')
    // console.log(lastMessageHeight)
    // console.log(scrollHeight)
    messages.scrollTop(scrollHeight)
  }
}




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
  // console.log('tienes nuevo mensaje', message);
  let formattedTime = moment(message.createdAt).format('h:mm a')
  // var li = $('<li></li>');
  // li.text(`${message.from}: ${message.text} ${formattedTime}`);
  // $('#messages').append(li)

  let template = $('#message_template').html();
  let html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });

  $('#messages').append(html);
  scrollToBottom();

 })

socket.on('newLocationMessage', function(message){
  let formattedTime = moment(message.createdAt).format('h:mm a')
  // console.log(formattedTime)
  let template = $('#location_template').html();
  let html = Mustache.render(template, {
    from: message.from,
    createdAt: formattedTime,
    url: message.url
  })

  // let li = $('<li></li>');
  // let a = $('<a target="_blank">My Location </a><i>'+formattedTime+'</i>');
  // li.text(`${message.from}: `);
  // a.attr('href', message.url);
  // li.append(a);
  $('#messages').append(html)
  scrollToBottom();
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
      longitude: position.coords.longitude,
    })
    locationButton.removeAttr('disabled').text('Send location');
  }, function() {
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location');
  })


})