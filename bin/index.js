#!/usr/bin/env node
import arg from 'arg';

const args = arg({
  '--start': Boolean,
  '--build': Boolean,
});

console.log(args);