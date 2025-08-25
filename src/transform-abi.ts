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

  console.log(chalk.blue('🔍'), `Searching for contracts in: ${chalk.gray(srcDir)}`);
  console.log(chalk.blue('📂'), `Looking for ABIs in: ${chalk.gray(outDir)}`);
  console.log(chalk.blue('📁'), `Output directory: ${chalk.gray(abisDir)}`);

  const contracts = findSrcContractAbiFiles(outDir, srcDir);

  if (contracts.length === 0) {
    console.log(chalk.yellow('ℹ️'), 'No contracts with ABIs found in src/ directory');
    return;
  }

  console.log(chalk.blue('📁'), `Found ${chalk.cyan(contracts.length)} source contracts with ABIs`);
  console.log(chalk.blue('🔄'), 'Starting transformation...\n');

  let successCount = 0;
  let errorCount = 0;

  for (const contract of contracts) {
    try {
      transformContractAbi(contract, abisDir);
      successCount++;
    } catch (error) {
      errorCount++;
    }
  }

  console.log(
    chalk.green('\n✨'),
    `Transformation complete! Generated ${chalk.cyan(successCount)} TypeScript ABI files`,
  );
  
  if (errorCount > 0) {
    console.log(chalk.red(`⚠️`), `Failed to transform ${chalk.red(errorCount)} files`);
  }
  
  console.log(chalk.gray(`Total time: ${timeDiff(t)}ms`));
}
