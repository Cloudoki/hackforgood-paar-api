const Hapi = require('hapi');
const config = require('config');
const log = require('lib/logger');

log.fatal('Starting PAAR API');

// Instantiate Hapi server
const server = new Hapi.Server();

// Add connections for both servers
server.connection(config.get('servers').api);
server.connection(config.get('servers').chat);

// Register plugins
server.register(require('lib/plugins'), (err) => {
    if (err) {
        log.fatal(err, 'Hapi failed to register plugins');
        throw (err);
    }

    log.info('All plugins were loaded successfuly. Starting servers...');
    server.start((err) => {
        if (err) {
            log.fatal(err, 'Failed to start servers');
            throw err;
        }

        log.info({ 'chat': config.get('servers').chat.port, 'api': config.get('servers').api.port }, 'Servers up and running');
    });
});