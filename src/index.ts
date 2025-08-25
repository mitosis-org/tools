import { Command } from 'commander';

const program = new Command();

program
  .name('mito-tools')
  .description('Mito development tools collection')
  .version('1.0.0');

// Add format-json command
program
  .command('format-json')
  .description(
    'Format JSON files - Sort JSON and convert Ethereum addresses to checksummed format',
  )
  .requiredOption('-i --input <pattern>', 'Glob pattern for files to process')
  .option(
    '-c --check',
    'Check for non-checksum addresses without modifying files',
    false,
  )
  .action(async (options) => {
    const { executeFormatJson } = await import('./format-json.js');
    try {
      await executeFormatJson(options.input, options.check);
    } catch (err) {
      console.error(`[ERROR] ${err instanceof Error ? err.message : err}`);
      process.exit(1);
    }
  });

// Add sort-imports command
program
  .command('sort-imports')
  .description('Sort import statements in Solidity files')
  .requiredOption('-i, --input <pattern>', 'Glob pattern for files to process')
  .option(
    '-c, --check',
    'Check for import statement sorting issues without modifying',
    false,
  )
  .option(
    '-d --debug',
    'Enable debug mode to print debug information like raw imports',
    false,
  )
  .action(async (options) => {
    const { executeSortImports } = await import('./sort-imports.js');
    try {
      await executeSortImports(options);
    } catch (err) {
      console.error(`[ERROR] ${err instanceof Error ? err.message : err}`);
      process.exit(1);
    }
  });

// Add transform-abi command
program
  .command('transform-abi')
  .description('Transform Solidity contract ABI JSON files to TypeScript files')
  .option('-s, --src-dir <path>', 'Source directory containing .sol files', 'src')
  .option('-o, --out-dir <path>', 'Forge output directory containing ABI files', 'out')
  .option('-a, --abis-dir <path>', 'Output directory for TypeScript ABI files', 'abis')
  .action(async (options) => {
    const { executeTransformAbi } = await import('./transform-abi.js');
    try {
      await executeTransformAbi(options);
    } catch (err) {
      console.error(`[ERROR] ${err instanceof Error ? err.message : err}`);
      process.exit(1);
    }
  });

program.parse(process.argv);
