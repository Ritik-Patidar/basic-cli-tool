#!/usr/bin/env node
import arg from 'arg';

try {
    const args = arg({
        '--start': Boolean,
        '--build': Boolean,
    });

    if (args['--start']) {
        console.log('starting the app');
    }
} catch (e) {
    console.log(e.message);
}