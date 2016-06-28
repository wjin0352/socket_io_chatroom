var express = require('express');
var app = express();
app.use(express.static('public'));

var socket_io = require('socket.io');
var http = require('http');
var server = http.Server(app);
var io = socket_io(server);

// Broadcast and display a message to connected users when someone connects or disconnects
// Display a count of how many users are connected
// Add support for nicknames
// Add "{user} is typing" functionality
// Show who's online
// Add private messaging

var count = 0;

io.on('connection', function(socket) {
  var player = 'unknown';
  count++;

  console.log('Client connected');

  socket.broadcast.emit(player + ' has connected', count);

  socket.on('message', function(message) {
    console.log(player + ' says: ', message);
    io.emit('message', player + ': ' + message);
  });

  socket.on('disconnect', function(disconnect) {
    console.log(player + ' disconnected');
    count--;
    socket.broadcast.emit(player + ' has disconnected', count);
  });

  socket.on('register', function(userName) {
    player = userName;
    socket.broadcast.emit('register', userName);
  })
});


server.listen(8080);


