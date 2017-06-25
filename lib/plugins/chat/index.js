const handlers = require('lib/plugins/chat/handlers');
const log = require('lib/logger');

module.exports = {};

module.exports.register = function(server, options, next) {
    let io = require('socket.io')(server.select('chat').listener);

    io.on('connection', function(socket) {
        log.debug('New connection');

        // Handle onJoin events to bind user with socket
        socket.on('join', handlers.onJoin);

        // User quit chat events, release socket
        socket.on('leave', handlers.onLeave);
        socket.on('disconnect', handlers.onDisconnect);

        // broadcast
        socket.on('newMessage', handlers.onMessage);
    });

    next();
};

module.exports.register.attributes = {
    name: 'chat',
    version: '0.0.1'
};