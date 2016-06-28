$(document).ready(function() {
  var socket = io();
  var input = $('input.msg');
  var name = $('input.name');
  var names = $('#names')
  var messages = $('#messages');

  var addMessage = function(message) {
    messages.append('<div>' + message + '</div>');
  };

  var addUser = function(userName) {
    names.append('<div>' + userName + '</div>');
  }

// event handler for message input
  input.on('keydown', function(event) {
    if (event.keyCode != 13) {
      return;
    }

    var message = input.val();
    socket.emit('message', message);
    input.val('');
  });

// event handler for user name input
  name.on('keydown', function(event) {
    if (event.keyCode != 13) {
    return;
    }

    var userName = name.val();
    socket.emit('register', userName);
  });

// listen for these events and call the functions
// this piggy backs off the event handlers/socket.emit triggers above
  socket.on('message', addMessage);
  socket.on('register', addMessage)
});
