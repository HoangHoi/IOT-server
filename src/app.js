import './sass/app.scss';
require('./bootstrap');

let socket = io();
let ledStatus = 'off';
let ledColor = {
    r: 255,
    g: 255,
    b: 255,
    a: 1,
};

socket.on('led-status', function(data) {
    console.log(data);
    ledStatus = data.status;
    ledColor = data.color;
    $('#led').css('background-color', 'rgba(' + ledColor.r + ', ' + ledColor.g + ', ' + ledColor.b + ', ' + ledColor.a + ')');
    if (ledStatus == 'on') {
        $('#led').css('box-shadow', '10px 10px 5px #888888');
        $('#button').bootstrapToggle('on');
    } else {
        $('#led').css('box-shadow', 'none');
        $('#button').bootstrapToggle('off');
    }
});

socket.emit('get-led-status');

$('#button').change(function (event) {
    // event.stopImmediatePropagation();
    // console.log(event);
    var data;
    if (ledStatus == 'on') {
        data = {status: 'off'};
        // $('#button').bootstrapToggle('off');
    } else {
        data = {status: 'on'};
        // $('#button').bootstrapToggle('on');
    }

    console.log(data);
    socket.emit('led-change', data);
});

$('#control').on('click', 'btn', function (event) {
    event.preventDefault();
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
        // console.log(color.toRgb());
        socket.emit('led-change', {
            color: color.toRgb()
        });
    }
});
