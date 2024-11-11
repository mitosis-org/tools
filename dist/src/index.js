import { Command } from 'commander';
import formatJson from './format-json.js';
import generateAbiTypes from './generate-abi-types.js';
import minify from './minify.js';
import sortImports from './sort-imports.js';
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
//# sourceMappingURL=index.js.map