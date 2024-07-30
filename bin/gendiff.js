#!/usr/bin/env node

import { Command } from 'commander';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .option('-V, --version', 'output usage information')
  .helpOption('-h, --help', 'output the version number');

program.parse();
