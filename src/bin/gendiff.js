#!/usr/bin/env node

import { Command } from 'commander';
import diff from './index.js';

const program = new Command();
program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1', '-v, --version', 'output the version number')
  .option('-f, --format <type>', 'output format')
  .action((filePath1, filePath2) => {
    console.log(diff(filePath1, filePath2));
  });
program.parse(process.argv);
