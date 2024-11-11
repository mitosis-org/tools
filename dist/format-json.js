"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const commander_1 = require("commander");
const fs_1 = require("fs");
const glob_1 = require("glob");
const path = __importStar(require("path"));
const viem_1 = require("viem");
const utils_1 = require("./utils");
const ethereumAddressRegex = /^0x[a-fA-F0-9]{40}$/;
// Address handling
function convertToChecksum(address) {
    return (0, viem_1.getAddress)(address);
}
function processJsonValue(filePath, check, value) {
    if (typeof value === 'string' && ethereumAddressRegex.test(value)) {
        const checksummed = convertToChecksum(value);
        const hasChanged = checksummed !== value;
        if (hasChanged && check)
            throw new Error(`${filePath} contains non-checksum addresses.` +
                ` (before: ${value}, after: ${checksummed})`);
        return checksummed;
    }
    return value;
}
function processJsonObject(filePath, check, data) {
    return Object.fromEntries(Object.entries(data)
        .map(([k, v]) => [k, processJson(filePath, check, v)])
        .sort(([a], [b]) => a.localeCompare(b)));
}
function processJsonArray(filePath, check, data) {
    return data.map((i) => processJson(filePath, check, i));
}
function processJson(filePath, check, data) {
    if (typeof data === 'object' && data !== null) {
        return Array.isArray(data)
            ? processJsonArray(filePath, check, data)
            : processJsonObject(filePath, check, data);
    }
    return processJsonValue(filePath, check, data);
}
// File processing
async function processFile(filePath, checkOnly, cache) {
    const t = (0, utils_1.hrtime)();
    const file = await fs_1.promises.readFile(filePath, 'utf-8');
    const checksum = (0, utils_1.getFileChecksum)(file);
    if (cache && cache[filePath] === checksum) {
        console.log(chalk_1.default.gray(filePath), `${(0, utils_1.timeDiff)(t)}ms`, '✨');
        return [filePath, checksum];
    }
    const data = JSON.parse(file);
    const updatedData = processJson(filePath, checkOnly, data);
    if (checkOnly) {
        console.log(chalk_1.default.gray(filePath), `${(0, utils_1.timeDiff)(t)}ms`, '✅');
        return [filePath, checksum];
    }
    const noUpdate = JSON.stringify(data) === JSON.stringify(updatedData);
    if (noUpdate) {
        console.log(chalk_1.default.gray(filePath), `${(0, utils_1.timeDiff)(t)}ms`, '🍻');
        return [filePath, checksum];
    }
    await fs_1.promises.writeFile(filePath, JSON.stringify(updatedData, null, 2) + '\n');
    console.log(filePath, `${(0, utils_1.timeDiff)(t)}ms`);
    return [filePath, checksum];
}
// Main execution logic
async function executeCommand(globPattern, checkOnly) {
    const t = (0, utils_1.hrtime)();
    const cache = await (0, utils_1.loadCache)('format-json');
    const files = await (0, glob_1.glob)(globPattern);
    if (files.length === 0) {
        console.warn('[WARN] No files found matching the specified pattern.');
        return;
    }
    const jsonFiles = files.filter((file) => path.extname(file) === '.json');
    if (jsonFiles.length === 0) {
        throw new Error('No JSON files found in the matched files.');
    }
    const result = await Promise.all(jsonFiles.map((filePath) => new Promise((resolve, reject) => processFile(filePath, checkOnly, cache)
        .then(resolve)
        .catch((err) => {
        console.error(`[ERROR] Error processing ${filePath}:`, err);
        reject(err);
    }))));
    if (jsonFiles.length < files.length) {
        console.warn(`[WARN] ${files.length - jsonFiles.length} non-JSON files were skipped.`);
    }
    await (0, utils_1.saveCache)('format-json', Object.fromEntries(result));
    console.log(`✨ Job Done. Total time: ${(0, utils_1.timeDiff)(t)}ms`);
}
// Command setup
exports.default = new commander_1.Command()
    .name('format-json')
    .description(`Format JSON files
- Sort JSON
- Ethereum address to checksummed address`)
    .requiredOption('-i --input <pattern>', 'Glob pattern for files to process')
    .option('-c --check', 'Check for non-checksum addresses without modifying files', false)
    .action(async (options) => {
    try {
        await executeCommand(options.input, options.check);
    }
    catch (err) {
        console.error(`[ERROR] ${err instanceof Error ? err.message : err}`);
        process.exit(1);
    }
});
