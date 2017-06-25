const chatUsers = require('lib/plugins/chat/chatUsers');
const log = require('lib/logger');

module.exports = {};

// onJoin event handler
module.exports.onJoin = function(opts) {
    this.username = opts.username;

    // Emit
    this.broadcast.emit('joined', { username: opts.username });
    this.emit('users', { users: chatUsers.getList() });

    chatUsers.add(opts.username, this);
    log.debug({ username: opts.username }, 'JOIN');
    log.info('Total joined users %d', chatUsers.getCount());
};

// onLeave event handler
module.exports.onLeave = function(opts) {
    this.broadcast.emit('left', { username: this.username });
    chatUsers.drop(this.username);
    this.disconnect();
    log.debug({ message: opts, username: this.username }, 'TERMINATE');
    log.info('Total joined users %d', chatUsers.getCount());
};

// onLeave event handler
module.exports.onDisconnect = function(opts) {
    this.broadcast.emit('left', { username: this.username });
    chatUsers.drop(this.username);
    log.debug({ message: opts, username: this.username }, 'DISCONNECT');
    log.info('Total joined users %d', chatUsers.getCount());
};

// onMessage event handler
module.exports.onMessage = function(opts) {
    let out = {
        username: this.username,
        message: opts.message
    };
    this.broadcast.emit('newMessage', out);
    log.debug(out, 'MESSAGE');
};