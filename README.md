# Mitosis Tools

A collection of development tools for blockchain and Ethereum projects, designed to streamline common development tasks.

## Features

- **JSON Formatting**: Format JSON files with key sorting and Ethereum address checksumming
- **Solidity Import Sorting**: Automatically sort import statements in Solidity files

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
