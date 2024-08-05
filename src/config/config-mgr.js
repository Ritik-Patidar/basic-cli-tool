import { cosmiconfigSync } from 'cosmiconfig';
import Ajv from 'ajv';
import chalk from 'chalk';
import { schema } from './schema.js';
import betterAjvErrors from 'better-ajv-errors';
import createLogger from '../logger.js';

const logger = createLogger('config:mgr')
const configLoader = cosmiconfigSync('tool');
const ajv = new Ajv({
    options: {
        jsonPointers: true,
    }
});

export function getConfig() {
    const result = configLoader.search(process.cwd());
    if (!result) {
        logger.warning('Could not find configuration, using default');
        return { port: 1234 };
    } else {
        const isValid = ajv.validate(schema, result.config);
        if (!isValid) {
            logger.warning('Invalid configuration was supplied');
            console.log(betterAjvErrors(schema, result.config, ajv.errors));
            process.exit(1);
        }
        logger.debug('Found configuration', result.config);
        return result.config;
    }
}