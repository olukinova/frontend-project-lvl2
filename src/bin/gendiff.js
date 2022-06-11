#!/usr/bin/env node

import { Command } from 'commander';

const program = new Command();
program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1', '-v, --version', 'output the version number')
  .option('-f, --format <type>', 'output format');
program.parse(process.argv);
