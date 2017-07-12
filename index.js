require('dotenv').config();
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

server.listen(port, function () {
    console.log('Server listening at port %d', port);
});

app.use(express.static(__dirname + '/public'));

// var numUsers = 0;
var devices = [];
var ledRoom = 'led-room';
var userRoom = 'user-room';
var addedDevice = false;
var addedUser = false;

io.on('connection', function (socket) {

    socket.on('room', function(room) {
        console.log('join room');
        socket.join(room);
    });

    // socket.on('new message', function (data) {
    //   socket.broadcast.emit('new message', {
    //     username: socket.username,
    //     message: data
    //   });
    // });

    // socket.on('add user', function (username) {
    //   if (addedUser) return;

    //   socket.username = username;
    //   ++numUsers;
    //   addedUser = true;
    //   socket.emit('login', {
    //     numUsers: numUsers
    //   });
    //   socket.broadcast.emit('user joined', {
    //     username: socket.username,
    //     numUsers: numUsers
    //   });
    // });

    // socket.on('typing', function () {
    //   socket.broadcast.emit('typing', {
    //     username: socket.username
    //   });
    // });

    // socket.on('stop typing', function () {
    //   socket.broadcast.emit('stop typing', {
    //     username: socket.username
    //   });
    // });

    socket.on('disconnect', function () {
        console.log('disconnect');
        // if (addedUser) {
        //     // --numUsers;

        //     socket.broadcast.emit('user left', {
        //         username: socket.username,
        //         numUsers: numUsers
        //     });
        // }
    });
});

io.sockets.in(ledRoom).on('add-device', function (device) {
    if (addedDevice || typeof device.name == 'undefined') {
        return;
    }

    device.push({
        name: device.name
    });

    // socket.username = username;
    // ++numUsers;
    // addedUser = true;
    // socket.emit('login', {
    //   numUsers: numUsers
    // });
    // socket.broadcast.emit('user joined', {
    //   username: socket.username,
    //   numUsers: numUsers
    // });
});

var ledRoomInstance = io.sockets.in(ledRoom);
var userRoomInstance = io.sockets.in(userRoom);
ledRoomInstance.on('join', function(data) {
    console.log("Device joined the led-room.");
    console.log(data);
});

ledRoomInstance.on('leave', function(data) {
    console.log("Device left the led-room.");
    console.log(data);
});

userRoomInstance.on('join', function(data) {
    console.log("Someone joined the user-room.");
    console.log(data);
});

userRoomInstance.on('leave', function(data) {
    console.log("Someone left the user-room.");
    console.log(data);
});


// socket.broadcast.to('some super awesome room').emit('join');
