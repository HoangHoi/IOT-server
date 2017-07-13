import './sass/app.scss';
require('./bootstrap');

let socket = io();

socket.on('led-status', function(data) {
    console.log(data);
});

$('#colorpicker').spectrum({
    color: '#f00',
    flat: true,
    width: '500px',
    showInput: true,
    allowEmpty: false,
    // showAlpha: true,
    showButtons: false,
    showInitial: true,
    preferredFormat: 'rgb',
    move: function(color) {
        socket.emit('led-change', {
            color: color.toHexString()
        });
    }
});
