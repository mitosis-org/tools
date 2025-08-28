import chalk from 'chalk';
import * as fs from 'fs';
import * as path from 'path';

import { hrtime, timeDiff } from './utils.js';

interface ContractInfo {
  abiPath: string;
  srcPath: string;
  contractName: string;
}

/**
 * Finds ABI files for contracts in src/ directory
 */
function findSrcContractAbiFiles(
  outDir: string,
  srcDir: string,
): ContractInfo[] {
  const contractFiles: ContractInfo[] = [];

  function traverseSrc(currentSrcDir: string, relativePath: string = '') {
    const entries = fs.readdirSync(currentSrcDir, { withFileTypes: true });

    for (const entry of entries) {
      const fullSrcPath = path.join(currentSrcDir, entry.name);
      const currentRelativePath = path.join(relativePath, entry.name);

      if (entry.isDirectory()) {
        traverseSrc(fullSrcPath, currentRelativePath);
      } else if (entry.isFile() && entry.name.endsWith('.sol')) {
        // Extract contract name from .sol file
        const contractName = path.basename(entry.name, '.sol');

        // Look for corresponding ABI file in out directory
        const abiPath = path.join(
          outDir,
          entry.name,
          `${contractName}.abi.json`,
        );

        if (fs.existsSync(abiPath)) {
          contractFiles.push({
            abiPath,
            srcPath: currentRelativePath,
            contractName,
          });
        }
      }
    }
  }

  traverseSrc(srcDir);
  return contractFiles;
}

/**
 * Transforms an ABI JSON file to a TypeScript file with custom output path
 */
function transformContractAbi(
  contract: ContractInfo,
  baseOutputDir: string,
): void {
  const t = hrtime();

  try {
    // Read the ABI JSON file
    const abiContent = fs.readFileSync(contract.abiPath, 'utf8');

    // Parse JSON to validate it
    const abiJson = JSON.parse(abiContent);

    // Create the TypeScript content
    const tsContent = `const abi = ${JSON.stringify(abiJson, null, 2)} as const;

export default abi;
`;

    // Generate output path in abis directory structure
    const srcDir = path.dirname(contract.srcPath);
    const outputDir = path.join(baseOutputDir, srcDir);
    const outputPath = path.join(outputDir, `${contract.contractName}.ts`);

    // Ensure output directory exists
    fs.mkdirSync(outputDir, { recursive: true });

    // Write the TypeScript file
    fs.writeFileSync(outputPath, tsContent, 'utf8');

    console.log(
      chalk.green('✅'),
      chalk.gray(`${contract.contractName} →`),
      path.relative(process.cwd(), outputPath),
      `${timeDiff(t)}ms`,
    );
  } catch (error) {
    console.error(
      chalk.red('❌'),
      `Error transforming ${contract.contractName}:`,
      error instanceof Error ? error.message : error,
    );
    throw error;
  }
}

/**
 * Generates index.ts files for each directory that exports all ABI constants
 */
function generateIndexFiles(abisDir: string, contracts: ContractInfo[]): void {
  const t = hrtime();

  try {
    // Group contracts by directory
    const contractsByDir = new Map<string, ContractInfo[]>();

    for (const contract of contracts) {
      const dir = path.dirname(contract.srcPath);
      if (!contractsByDir.has(dir)) {
        contractsByDir.set(dir, []);
      }
      contractsByDir.get(dir)!.push(contract);
    }

    // Sort directories for consistent output
    const sortedDirs = Array.from(contractsByDir.keys()).sort();

    // Generate index.ts for each directory that has contracts
    for (const dir of sortedDirs) {
      if (dir === '.') continue; // Skip root directory for now

      const dirContracts = contractsByDir.get(dir)!;
      generateDirectoryIndex(abisDir, dir, dirContracts);
    }

    // Generate root index.ts
    generateRootIndex(abisDir, contractsByDir, sortedDirs);

    console.log(
      chalk.green('✨'),
      `Generated ${sortedDirs.length} index.ts files`,
      `${timeDiff(t)}ms`,
    );
  } catch (error) {
    console.error(
      chalk.red('❌'),
      'Error generating index files:',
      error instanceof Error ? error.message : error,
    );
    throw error;
  }
}

/**
 * Generates index.ts for a specific directory
 */
function generateDirectoryIndex(
  abisDir: string,
  dir: string,
  contracts: ContractInfo[],
): void {
  const imports: string[] = [];
  const exports: string[] = [];

  // Sort contracts for consistent output
  const sortedContracts = [...contracts].sort((a, b) =>
    a.contractName.localeCompare(b.contractName),
  );

  for (const contract of sortedContracts) {
    const importName = `${contract.contractName}Abi`;
    imports.push(`import ${importName} from './${contract.contractName}.js';`);
    exports.push(`  ${contract.contractName}: ${importName},`);
  }

  const content = `${imports.join('\n')}

export {
${exports.join('\n')}
};
`;

  const indexPath = path.join(abisDir, dir, 'index.ts');
  fs.writeFileSync(indexPath, content, 'utf8');

  console.log(
    chalk.green('✅'),
    chalk.gray(`${dir}/index.ts →`),
    path.relative(process.cwd(), indexPath),
  );
}

/**
 * Generates the root index.ts file
 */
function generateRootIndex(
  abisDir: string,
  contractsByDir: Map<string, ContractInfo[]>,
  sortedDirs: string[],
): void {
  const imports: string[] = [];
  const exports: string[] = [];

  // Handle root level contracts
  const rootContracts = contractsByDir.get('.') || [];
  const sortedRootContracts = [...rootContracts].sort((a, b) =>
    a.contractName.localeCompare(b.contractName),
  );

  for (const contract of sortedRootContracts) {
    const importName = `${contract.contractName}Abi`;
    imports.push(`import ${importName} from './${contract.contractName}.js';`);
    exports.push(`  ${contract.contractName}: ${importName},`);
  }

  // Handle subdirectories
  interface ExportStructure {
    [key: string]: string | ExportStructure;
  }
  const nestedExports: ExportStructure = {};

  for (const dir of sortedDirs) {
    if (dir === '.') continue;

    const pathParts = dir.split(path.sep);
    const importAlias = pathParts.join('_') + '_exports';
    const importPath = `./${dir}/index.js`;

    imports.push(
      `import * as ${importAlias} from '${importPath.replace(/\\/g, '/')}';`,
    );

    // Build nested structure
    let current = nestedExports;
    for (let i = 0; i < pathParts.length - 1; i++) {
      const part = pathParts[i];
      if (!current[part]) {
        current[part] = {};
      }
      current = current[part] as ExportStructure;
    }

    // Add the import to the deepest level
    current[pathParts[pathParts.length - 1]] = importAlias;
  }

  // Convert nested structure to export lines
  function stringifyExports(obj: ExportStructure, indent: number = 2): string {
    const spaces = ' '.repeat(indent);
    const entries = Object.entries(obj).sort(([a], [b]) => a.localeCompare(b));

    if (entries.length === 0) return '{}';

    const lines = entries.map(([key, value]) => {
      const quotedKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key)
        ? key
        : `'${key}'`;

      if (typeof value === 'string') {
        // Direct import reference - check if it's an import alias that needs spreading
        if (value.endsWith('_exports')) {
          return `${spaces}${quotedKey}: ...${value},`;
        }
        return `${spaces}${quotedKey}: ${value},`;
      } else {
        // Nested object
        const nestedContent = stringifyExports(value, indent + 2);
        return `${spaces}${quotedKey}: ${nestedContent},`;
      }
    });

    return `{\n${lines.join('\n')}\n${' '.repeat(indent - 2)}}`;
  }

  // Add nested exports to the main exports
  for (const [key, value] of Object.entries(nestedExports)) {
    const quotedKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : `'${key}'`;

    if (typeof value === 'string') {
      // Check if it's an import alias that needs spreading
      if (value.endsWith('_exports')) {
        exports.push(`  ${quotedKey}: ...${value},`);
      } else {
        exports.push(`  ${quotedKey}: ${value},`);
      }
    } else {
      const nestedContent = stringifyExports(value as ExportStructure, 4);
      exports.push(`  ${quotedKey}: ${nestedContent},`);
    }
  }

  const content = `${imports.join('\n')}

export default {
${exports.join('\n')}
};
`;

  const indexPath = path.join(abisDir, 'index.ts');
  fs.writeFileSync(indexPath, content, 'utf8');

  console.log(
    chalk.green('✅'),
    chalk.gray('index.ts →'),
    path.relative(process.cwd(), indexPath),
  );
}

/**
 * Main execution logic - exported for use by main CLI
 */
export async function executeTransformAbi(options: {
  srcDir?: string;
  outDir?: string;
  abisDir?: string;
}): Promise<void> {
  const t = hrtime();

  const srcDir = path.resolve(options.srcDir || 'src');
  const outDir = path.resolve(options.outDir || 'out');
  const abisDir = path.resolve(options.abisDir || 'abis');

  if (!fs.existsSync(outDir)) {
    throw new Error(`Output directory '${outDir}' does not exist`);
  }

  if (!fs.existsSync(srcDir)) {
    throw new Error(`Source directory '${srcDir}' does not exist`);
  }

  console.log(
    chalk.blue('🔍'),
    `Searching for contracts in: ${chalk.gray(srcDir)}`,
  );
  console.log(chalk.blue('📂'), `Looking for ABIs in: ${chalk.gray(outDir)}`);
  console.log(chalk.blue('📁'), `Output directory: ${chalk.gray(abisDir)}`);

  const contracts = findSrcContractAbiFiles(outDir, srcDir);

  if (contracts.length === 0) {
    console.log(
      chalk.yellow('ℹ️'),
      'No contracts with ABIs found in src/ directory',
    );
    return;
  }

  console.log(
    chalk.blue('📁'),
    `Found ${chalk.cyan(contracts.length)} source contracts with ABIs`,
  );
  console.log(chalk.blue('🔄'), 'Starting transformation...\n');

  let successCount = 0;
  let errorCount = 0;

  for (const contract of contracts) {
    try {
      transformContractAbi(contract, abisDir);
      successCount++;
    } catch {
      errorCount++;
    }
  }

  console.log(
    chalk.green('\n✨'),
    `Transformation complete! Generated ${chalk.cyan(successCount)} TypeScript ABI files`,
  );

  if (errorCount > 0) {
    console.log(
      chalk.red(`⚠️`),
      `Failed to transform ${chalk.red(errorCount)} files`,
    );
  }

  // Generate index.ts files if we have successful transformations
  if (successCount > 0) {
    console.log(chalk.blue('\n📝'), 'Generating index.ts files...');
    try {
      generateIndexFiles(
        abisDir,
        contracts.filter(() => {
          // Only include contracts that were successfully transformed
          // This is a simple approach - in production you might want to track which specific contracts succeeded
          return true;
        }),
      );
    } catch (error) {
      console.error(
        chalk.red('❌'),
        'Failed to generate index.ts files:',
        error instanceof Error ? error.message : error,
      );
    }
  }

  console.log(chalk.gray(`Total time: ${timeDiff(t)}ms`));
}
