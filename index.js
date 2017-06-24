const Hapi = require('hapi');
const config = require('config');
const log = require('lib/logger');

log.fatal('>>>>>>>>>>>>>>> Starting PAAR API <<<<<<<<<<<<<<<<');

const server = new Hapi.Server();
server.connection(config.get('server'));

// Register plugins
server.register(require('lib/plugins'), (err) => {
    if (err) {
        log.fatal(err, 'Hapi failed to register plugins');
        throw (err);
    }

    log.info('All plugins were loaded successfuly');

    server.start((err) => {
        if (err) {
            log.fatal(err, 'Failed to start server');
            throw err;
        }

        log.info('API server is up and running on port %s', config.get('server').port);
    });
});