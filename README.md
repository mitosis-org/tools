# Mitosis Tools

A collection of development tools for blockchain and Ethereum projects, designed to streamline common development tasks.

## Features

- **JSON Formatting**: Format JSON files with key sorting and Ethereum address checksumming
- **Solidity Import Sorting**: Automatically sort import statements in Solidity files
- **ABI Transformation**: Transform Solidity contract ABI JSON files to TypeScript files with proper typing

## Installation

### Global Installation

```bash
npm install -g @mitosis-org/tools
# or
yarn global add @mitosis-org/tools
```

### Local Installation

```bash
npm install --save-dev @mitosis-org/tools
# or
yarn add --dev @mitosis-org/tools
```

## Usage

### Format JSON Files

Format JSON files by sorting keys and converting Ethereum addresses to checksummed format:

```bash
# Format all JSON files in current directory
mito-tools format-json -i "*.json"

# Format JSON files in specific directory
mito-tools format-json -i "config/*.json"

# Check for formatting issues without modifying files
mito-tools format-json -i "*.json" --check
```

**Features:**

- Sorts JSON object keys alphabetically
- Converts Ethereum addresses to checksummed format using EIP-55
- Maintains file structure and formatting
- Caching for improved performance on subsequent runs

### Sort Solidity Imports

Sort import statements in Solidity files based on Foundry remappings:

```bash
# Sort imports in all Solidity files
mito-tools sort-imports -i "src/**/*.sol"

# Check for import sorting issues without modifying files
mito-tools sort-imports -i "src/**/*.sol" --check

# Enable debug mode for troubleshooting
mito-tools sort-imports -i "src/**/*.sol" --debug
```

**Features:**

- Groups imports by Foundry remappings
- Sorts imports alphabetically within groups
- Automatically runs `forge fmt` before and after processing
- Respects existing import groupings

### Transform ABI Files

Transform Solidity contract ABI JSON files from Forge output to TypeScript files:

```bash
# Transform all ABIs using default directories
mito-tools transform-abi

# Specify custom directories
mito-tools transform-abi --src-dir contracts --out-dir forge-out --abis-dir generated-abis

# Using short options
mito-tools transform-abi -s contracts -o forge-out -a generated-abis
```

**Features:**

- Finds all Solidity contracts in the source directory
- Locates corresponding ABI JSON files in Forge output directory
- Generates TypeScript files with proper const assertions
- Preserves source directory structure in output
- Automatically generates an index.ts file that exports all ABIs
- Provides detailed progress and error reporting

**Options:**

- `-s, --src-dir <path>`: Source directory containing .sol files (default: "src")
- `-o, --out-dir <path>`: Forge output directory containing ABI files (default: "out")
- `-a, --abis-dir <path>`: Output directory for TypeScript ABI files (default: "abis")

**Example Output Structure:**

Given this source structure:

```
src/
├── Token.sol
├── my-contracts/
│   ├── Token.sol
│   └── Staking.sol
└── governance/
    └── Governor.sol
```

The tool generates:

```
abis/
├── Token.ts
├── my-contracts/
│   ├── Token.ts
│   ├── Staking.ts
│   └── index.ts
├── governance/
│   ├── Governor.ts
│   └── index.ts
└── index.ts
```

Each directory gets its own `index.ts` file to avoid naming conflicts:

**`abis/my-contracts/index.ts`:**

```typescript
import TokenAbi from './Token.js';
import StakingAbi from './Staking.js';

export {
  Token: TokenAbi,
  Staking: StakingAbi,
};
```

**`abis/governance/index.ts`:**

```typescript
import GovernorAbi from './Governor.js';

export {
  Governor: GovernorAbi,
};
```

**Root `abis/index.ts`:**

```typescript
import TokenAbi from './Token.js';
import * as my_contracts_exports from './my-contracts/index.js';
import * as governance_exports from './governance/index.js';

export default {
  Token: TokenAbi,
  'my-contracts': ...my_contracts_exports,
  governance: ...governance_exports,
};
```

Note: This approach handles duplicate contract names across directories (e.g., `Token.sol` in both root and `my-contracts/`) without conflicts.

## Requirements

- Node.js >= 16
- For Solidity import sorting: Foundry (forge command must be available)

## Development

### Building

```bash
yarn build
```

### Linting

```bash
yarn lint
```

### Formatting

```bash
yarn format
```

### Testing

```bash
yarn test
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests and linting (`yarn test && yarn lint`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Changelog

### v1.0.0

- Initial release
- JSON formatting with Ethereum address checksumming
- Solidity import sorting with Foundry remapping support
- ABI transformation from JSON to TypeScript
