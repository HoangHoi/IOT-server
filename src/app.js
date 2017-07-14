import './sass/app.scss';
require('./bootstrap');

let socket = io();
let ledStatus = 0;
let send = true;
let ledColor = {
    r: 255,
    g: 255,
    b: 255,
    a: 1,
};

socket.on('led-status', function(data) {
    console.log('led-status');
    console.log(data);
    ledStatus = data.status;
    ledColor = data.color;
    console.log(111111);
    $('#led').css('background-color', 'rgba(' + ledColor.r + ', ' + ledColor.g + ', ' + ledColor.b + ', ' + ledColor.a + ')');
    if (data.status) {
        console.log(ledStatus);
        console.log('ledStatus true');
        $('#led').css('box-shadow', '10px 10px 5px #888888');
    } else {
        console.log(ledStatus);
        console.log('ledStatus false');
        console.log(ledStatus);
        $('#led').css('box-shadow', 'none');
    }
});

socket.emit('get-led-status');

$('#button').change(function (event) {
    var data;
    if ($(this).prop('checked')) {
        data = {status: 1};
    } else {
        data = {status: 0};
    }

    socket.emit('led-change', data);
});



$('#colorpicker').spectrum({
    color: '#f00',
    flat: true,
    width: '500px',
    showInput: true,
    allowEmpty: false,
    showAlpha: true,
    showButtons: false,
    showInitial: true,
    preferredFormat: 'rgb',
    move: function(color) {
        if (send) {
            send = false;
            setTimeout(function(){send = true;}, 100);
            socket.emit('led-change', {
                color: color.toRgb()
            });
        }
    }
});
