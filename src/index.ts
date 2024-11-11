import { Command } from 'commander';

import formatJson from './format-json';
import generateAbiTypes from './generate-abi-types';
import minify from './minify';
import sortImports from './sort-imports';

new Command()
  .name('mito-tools')
  .addCommand(formatJson)
  .addCommand(generateAbiTypes)
  .addCommand(minify)
  .addCommand(sortImports)
  .parseAsync(process.argv)
  .catch((err) => {
    console.error('[ERROR] Command parsing error:', err);
    process.exit(1);
  });
