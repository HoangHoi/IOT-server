import '../sass/app.scss';
require('./bootstrap');

$('#send').on('click', function () {
    let message = $('#input').val();
    if (message != '') {
        $.ajax({
            url: 'comment',
            type: 'POST',
            dataType: 'json',
            data: {message: message},
        });
    }
});

// Echo.private('chat-room')
//     .listen('ChatEvent', (e) => {
//         console.log(e);
//         $('#content').append(`<div class="well">${e.message}</div>`);
//     });
// Echo.channel('chat')
//     .emit('typing', {
//         name: 'aaa'
//     });
// Echo.private('chat-room')
//     .listenForWhisper('typing', (e) => {
//         console.log(e.name);
//     });
