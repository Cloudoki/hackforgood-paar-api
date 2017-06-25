module.exports = {};

let users = {};

// Bind a socket to a user
module.exports.add = function(username, socket) {
    users[username] = socket;
};

// Unbind socket from user
module.exports.drop = function(username) {
    delete users[username];
};

// Get all joined users
module.exports.getList = function() {
    return Object.keys(users);
};

// Count total joined users
module.exports.getCount = function() {
    return Object.keys(users).length;
};