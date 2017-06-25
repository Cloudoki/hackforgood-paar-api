const Lab = require('lab');
const lab = exports.lab = Lab.script();

const config = require('config');
const io = require('socket.io')

const serverPublicPath = 'http://localhost:' + config.get('servers').chat.port;

// Chat tests
lab.experiment('chat', () => {

    // Test connection stablished
    lab.test('Connection is established', (done) => {

    });
});