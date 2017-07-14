require('dotenv').config();
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var colors = require('colors');
var port = process.env.PORT || 3000;

server.listen(port, function () {
    console.log('Server listening at port %d', port);
});

app.use(express.static(__dirname + '/public'));

// var devices = [];
// var users = [];
var ledRoom = 'led-room';
var userRoom = 'user-room';
var ledStatus = 'on';
var ledColor = {
    r: 255,
    g: 255,
    b: 255,
    a: 1,
};
// var addedDevice = false;
// var addedUser = false;
// var ledRoomInstance = io.sockets.in(ledRoom);
// var userRoomInstance = io.sockets.in(userRoom);

io.on('connection', function (socket) {
    console.log('New client connect'.gray);
    socket.on('room', function(room) {
        console.log('join room');
        socket.join(room);
    });

    socket.on('led-change', function(data) {
        if (typeof data.status == 'undefined') {
            data.status = ledStatus;
        } else {
            ledStatus = data.status;
        }

        if (typeof data.color == 'undefined') {
            data.color = ledColor;
        } else {
            ledColor = data.color;
        }

        socket.broadcast.emit('led-change', data);
        console.log('Change led status'.gray);
        console.log('--status: '.gray + data.status);
        console.log('--color: '.gray);
        console.log(('----r: ' + data.color.r).red);
        console.log(('----g: ' + data.color.g).green);
        console.log(('----b: ' + data.color.b).blue);
        console.log(('----a: ' + data.color.a).white);
    });

    socket.on('led-status', function(data) {
        if (typeof data.status == 'undefined') {
            data.status = ledStatus;
        } else {
            ledStatus = data.status;
        }

        if (typeof data.color == 'undefined') {
            data.color = ledColor;
        } else {
            ledColor = data.color;
        }

        socket.broadcast.emit('led-status', data);
    });

    socket.on('get-led-status', function() {
        var data = {
            status: ledStatus,
            color: ledColor
        };
        socket.emit('led-status', data);
    });

    socket.on('disconnect', function () {
        console.log('Client disconnect'.gray);
    });
});

// ledRoomInstance.on('add-device', function (device) {
//     devices.push({
//         name: device.name
//     });
// });

// userRoomInstance.on('add-user', function(user) {
//     if (addedUser || typeof user.name == 'undefined') {
//         return;
//     }

//     users.push({
//         name: user.name
//     });
// });


// ledRoomInstance.on('join', function(data) {
//     console.log("Device joined the led-room.");
//     console.log(data);
// });

// ledRoomInstance.on('leave', function(data) {
//     console.log("Device left the led-room.");
//     console.log(data);
// });

// userRoomInstance.on('join', function(data) {
//     console.log("Someone joined the user-room.");
//     console.log(data);
// });

// userRoomInstance.on('leave', function(data) {
//     console.log("Someone left the user-room.");
//     console.log(data);
// });


// socket.broadcast.to('some super awesome room').emit('join');
