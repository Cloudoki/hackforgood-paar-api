var convict = require('convict');

// Config schema
var config = convict({
    env: {
        doc: "The applicaton environment.",
        format: ["production", "staging", "development"],
        default: "development",
        env: "NODE_ENV"
    },
    servers: {
        api: {
            host: {
                doc: "The IP address to bind.",
                format: "ipaddress",
                default: "0.0.0.0",
                env: "PAAR_API_IP_ADDRESS",
            },
            port: {
                doc: "The port to bind.",
                format: "port",
                default: 4000,
                env: "PAAR_API_PORT"
            },
            labels: {
                doc: "API server label.",
                format: Array,
                default: ['api']
            }
        },
        chat: {
            host: {
                doc: "The IP address to bind.",
                format: "ipaddress",
                default: "0.0.0.0",
                env: "PAAR_CHAT_IP_ADDRESS",
            },
            port: {
                doc: "The port to bind.",
                format: "port",
                default: 4001,
                env: "PAAR_CHAT_PORT"
            },
            labels: {
                doc: "Chat server label.",
                format: Array,
                default: ['chat']
            }
        },
    },
    logger: {
        name: {
            doc: "API logger name",
            format: String,
            default: 'Paar-API'
        },
        level: {
            doc: "Logger level",
            format: ['trace', 'debug', 'info', 'warn', 'error', 'fatal'],
            default: 'trace'
        }
    }
});

// Load environment dependent configuration
var env = config.get('env');

if (env !== 'production') {
    config.loadFile('./config/envs/' + env + '.json');
}

// Perform validation
config.validate({ allowed: 'strict' });

module.exports = config;