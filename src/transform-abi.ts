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
        // First try nested path (matching source structure)
        let abiPath = path.join(
          outDir,
          currentRelativePath,
          `${contractName}.abi.json`,
        );

        // If not found, try flattened path (Foundry default)
        if (!fs.existsSync(abiPath)) {
          abiPath = path.join(
            outDir,
            entry.name,
            `${contractName}.abi.json`,
          );
        }

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
 * Returns true if the transformation was successful, false if skipped
 */
function transformContractAbi(
  contract: ContractInfo,
  baseOutputDir: string,
): boolean {
  const t = hrtime();

  try {
    // Read the ABI JSON file
    const abiContent = fs.readFileSync(contract.abiPath, 'utf8');

    // Parse JSON to validate it
    const abiJson = JSON.parse(abiContent);

    // Skip empty ABIs
    if (Array.isArray(abiJson) && abiJson.length === 0) {
      console.log(
        chalk.yellow('⏭️'),
        chalk.gray(`${contract.contractName} →`),
        'Skipped (empty ABI)',
      );
      return false;
    }

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
    return true;
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

    // Find all directories that need index files (including intermediate ones)
    const allDirs = new Set<string>();

    for (const contract of contracts) {
      const dir = path.dirname(contract.srcPath);
      const parts = dir.split(path.sep);

      // Add all parent directories
      for (let i = 1; i <= parts.length; i++) {
        const parentDir = parts.slice(0, i).join(path.sep);
        if (parentDir !== '.') {
          allDirs.add(parentDir);
        }
      }
    }

    // Sort directories by depth (deepest first) to ensure subdirectories are processed before parents
    const sortedDirs = Array.from(allDirs).sort((a, b) => {
      const depthA = a.split(path.sep).length;
      const depthB = b.split(path.sep).length;
      if (depthA !== depthB) {
        return depthB - depthA; // Deeper directories first
      }
      return a.localeCompare(b);
    });

    // Generate index.ts for each directory
    for (const dir of sortedDirs) {
      const dirContracts = contractsByDir.get(dir) || [];
      generateDirectoryIndex(abisDir, dir, dirContracts, contracts);
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
  allContracts: ContractInfo[],
): void {
  const imports: string[] = [];
  const exports: string[] = [];

  // Sort contracts for consistent output
  const sortedContracts = [...contracts].sort((a, b) =>
    a.contractName.localeCompare(b.contractName),
  );

  // Import direct contracts
  for (const contract of sortedContracts) {
    const importName = `${contract.contractName}Abi`;
    imports.push(`import ${importName} from './${contract.contractName}.js';`);
    exports.push(`  ${contract.contractName}: ${importName},`);
  }

  // Find subdirectories of the current directory
  const subdirs = new Set<string>();
  for (const contract of allContracts) {
    const contractDir = path.dirname(contract.srcPath);
    // Check if this contract is in a subdirectory of the current directory
    if (contractDir.startsWith(dir + path.sep)) {
      const relativePath = contractDir.slice(dir.length + 1);
      const firstSubdir = relativePath.split(path.sep)[0];
      if (firstSubdir) {
        subdirs.add(firstSubdir);
      }
    }
  }

  // Sort subdirectories for consistent output
  const sortedSubdirs = Array.from(subdirs).sort();

  // Import from subdirectory index.ts files
  for (const subdir of sortedSubdirs) {
    // Convert to camelCase for import alias
    const words = subdir.split('-');
    const camelCase = words
      .map((word, index) => {
        if (index === 0) {
          return word;
        }
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join('');
    const importAlias = camelCase + 'Exports';
    const importPath = `./${subdir}/index.js`;

    imports.push(
      `import ${importAlias} from '${importPath.replace(/\\/g, '/')}';`,
    );

    // Add to exports
    const quotedKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(subdir)
      ? subdir
      : `'${subdir}'`;
    exports.push(`  ${quotedKey}: ${importAlias},`);
  }

  const content = `${imports.join('\n')}

const abis = {
${exports.join('\n')}
};

export default abis;
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

  // Handle subdirectories - only import from top-level directories
  const topLevelDirs = new Set<string>();

  for (const dir of sortedDirs) {
    if (dir === '.') continue;

    const pathParts = dir.split(path.sep);
    topLevelDirs.add(pathParts[0]);
  }

  // Sort top-level directories for consistent output
  const sortedTopLevelDirs = Array.from(topLevelDirs).sort();

  for (const topDir of sortedTopLevelDirs) {
    // Convert to camelCase: my-contracts -> myContractsExports
    const words = topDir.split('-');
    const camelCase = words
      .map((word, index) => {
        if (index === 0) {
          return word; // Keep first word lowercase
        }
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join('');
    const importAlias = camelCase + 'Exports';
    const importPath = `./${topDir}/index.js`;

    imports.push(
      `import ${importAlias} from '${importPath.replace(/\\/g, '/')}';`,
    );

    // Add to exports
    const quotedKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(topDir)
      ? topDir
      : `'${topDir}'`;
    exports.push(`  ${quotedKey}: ${importAlias},`);
  }

  const content = `${imports.join('\n')}

const abis = {
${exports.join('\n')}
};

export default abis;
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
  let skippedCount = 0;
  let errorCount = 0;
  const successfulContracts: ContractInfo[] = [];

  for (const contract of contracts) {
    try {
      const success = transformContractAbi(contract, abisDir);
      if (success) {
        successCount++;
        successfulContracts.push(contract);
      } else {
        skippedCount++;
      }
    } catch {
      errorCount++;
    }
  }

  console.log(
    chalk.green('\n✨'),
    `Transformation complete! Generated ${chalk.cyan(successCount)} TypeScript ABI files`,
  );

  if (skippedCount > 0) {
    console.log(
      chalk.yellow(`ℹ️`),
      `Skipped ${chalk.yellow(skippedCount)} empty ABI files`,
    );
  }

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
      generateIndexFiles(abisDir, successfulContracts);
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
