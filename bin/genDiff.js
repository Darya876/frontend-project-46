#!/usr/bin/env node

import { Command } from 'commander';
import genDiff from '../src/index.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1', '-V, --version', 'output usage information')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .helpOption('-h, --help', 'output the version number')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2, options) => {
    console.log(genDiff(filepath1, filepath2, options.format));
  });

program.parse();
