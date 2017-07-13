window.$ = window.jQuery = require('jquery');
require('bootstrap-sass');
let token = document.head.querySelector('meta[name="csrf-token"]');
$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': token.content
    }
});

// import Echo from 'laravel-echo';

// window.Pusher = require('pusher-js');
window.io = require('socket.io-client');
// console.log(window.location.hostname);
// window.Echo = new Echo({
//     namespace: 'App.Events',
//     broadcaster: 'socket.io',
//     host: `${window.location.hostname}:9090`
    // broadcaster: 'pusher',
    // key: '11f716410294b4f3867d',
    // cluster: 'ap1',
    // encrypted: true
// });
