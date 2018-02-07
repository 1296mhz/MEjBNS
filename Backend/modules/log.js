/**
 * Created by cshlovjah on 06.02.18.
 */
var winston = require('winston');


const tsFormat = () => (new Date());

const logger = new (winston.Logger)({
    transports: [
        // colorize the output to the console

        new (winston.transports.Console)({
            colorize: true,
            timestamp: tsFormat
        })
    ]
});
logger.level = 'debug';
logger.info('Hello world');
logger.debug('Debugging info');
