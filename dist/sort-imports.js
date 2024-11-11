"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const child_process_1 = require("child_process");
const commander_1 = require("commander");
const fs_1 = require("fs");
const promises_1 = require("fs/promises");
const glob_1 = require("glob");
const path_1 = __importDefault(require("path"));
const toml_1 = __importDefault(require("toml"));
const util_1 = require("util");
const utils_1 = require("./utils");
const IMPORT_ALL_REGEX = /^(import\s+(?:(?:[^;'"]+from\s+)?['"])([^'"]+)['"];?\s*)$/gm;
const IMPORT_LINE_REGEX = /^import\s+(?:(?:[^;'"]+from\s+)?['"])([^'"]+)['"];?\s*$/;
const LINE_BREAK_REGEX = /(?:\r\n|\r|\n)/g;
// Core logic functions
function trimLineBreak(s) {
    return s.replaceAll(LINE_BREAK_REGEX, '');
}
function toSorted(v) {
    const sorted = v
        .sort(({ path: a }, { path: b }) => a.localeCompare(b))
        .map(({ full }) => full);
    return sorted;
}
function sortImports(rawImports, remappings, debug) {
    const src = rawImports.map((i) => {
        const m = i.match(IMPORT_LINE_REGEX);
        if (!m)
            throw new Error(`Invalid import statement: ${i}`);
        return { full: i, path: m[1] };
    });
    const srcGroups = src
        .reduce((acc, i) => {
        acc[acc.length - 1].push(trimLineBreak(i.full));
        if (i.full.endsWith('\n'))
            acc.push([]);
        return acc;
    }, [[]])
        .filter((g) => g.length > 0);
    const grouped = new Map();
    const ungrouped = [];
    src.forEach((i) => {
        i.full = trimLineBreak(i.full);
        const remapping = remappings.find((r) => i.path.startsWith(r));
        if (!remapping) {
            ungrouped.push(i);
            return;
        }
        if (!grouped.has(remapping))
            grouped.set(remapping, []);
        grouped.get(remapping).push(i);
    });
    const dstGroups = [
        ...Array.from(grouped.values()).map(toSorted),
        toSorted(ungrouped),
    ].filter((g) => g.length > 0);
    const update = JSON.stringify(dstGroups) !== JSON.stringify(srcGroups);
    if (debug) {
        console.log(src);
        console.log('=====================================');
        console.log(srcGroups);
        console.log('=====================================');
        console.log(dstGroups);
    }
    return { sortedImports: dstGroups, update };
}
async function processContract({ filePath, remappings, cache, options, }) {
    try {
        const t = (0, utils_1.hrtime)();
        const contract = await (0, promises_1.readFile)(filePath, 'utf-8');
        const checksum = (0, utils_1.getFileChecksum)(contract);
        if (cache && cache[filePath] === checksum) {
            console.log(chalk_1.default.gray(filePath), `${(0, utils_1.timeDiff)(t)}ms`, '✨');
            return;
        }
        const rawImports = [...contract.matchAll(IMPORT_ALL_REGEX)].map((m) => m[1]);
        const { sortedImports, update } = sortImports(rawImports, remappings, options.debug);
        const output = sortedImports.map((g) => g.join('\n')).join('\n\n');
        if (options.check) {
            if (update)
                throw new Error(`${filePath}'s imports are not sorted`);
            console.log(chalk_1.default.gray(filePath), `${(0, utils_1.timeDiff)(t)}ms`, '✅');
            return;
        }
        if (!update) {
            console.log(chalk_1.default.gray(filePath), `${(0, utils_1.timeDiff)(t)}ms`, '🍻');
            return;
        }
        const lines = contract.replaceAll(IMPORT_ALL_REGEX, '').split('\n');
        const pragmaIndex = lines.findIndex((l) => l.startsWith('pragma'));
        await (0, promises_1.writeFile)(filePath, lines.toSpliced(pragmaIndex + 1, 0, output).join('\n'));
        console.log(filePath, `${(0, utils_1.timeDiff)(t)}ms`, '🛠️');
    }
    catch (err) {
        console.error(`[ERROR] Error processing ${filePath}:`, err);
        if (err instanceof Error) {
            throw new Error(`Failed to process ${filePath}: ${err.message}`);
        }
        else {
            throw new Error(`Failed to process ${filePath}: Unknown error`);
        }
    }
}
// Main execution logic
async function executeCommand(options) {
    const t = (0, utils_1.hrtime)();
    const cache = await (0, utils_1.loadCache)('sort-imports');
    const files = await (0, glob_1.glob)(options.input);
    const targetFiles = files.filter((file) => path_1.default.extname(file) === '.sol');
    if (targetFiles.length === 0) {
        throw new Error('No target files found in the matched files.');
    }
    try {
        const foundryConfig = await (0, promises_1.readFile)('foundry.toml', 'utf-8');
        const { profile: { default: { remappings: remappingsList }, }, } = toml_1.default.parse(foundryConfig);
        const remappings = remappingsList.map((l) => l.split('=')[0]);
        await (0, util_1.promisify)(child_process_1.exec)('forge fmt');
        await Promise.all(targetFiles.map((filePath) => new Promise((resolve, reject) => processContract({ filePath, remappings, cache, options })
            .then(resolve)
            .catch(reject))));
    }
    catch (err) {
        console.error('An error occurred:', err);
        process.exit(1);
    }
    finally {
        await (0, util_1.promisify)(child_process_1.exec)('forge fmt');
        await (0, utils_1.saveCache)('sort-imports', Object.fromEntries(await Promise.all(targetFiles.map(async (filePath) => {
            const file = await fs_1.promises.readFile(filePath, 'utf-8');
            const checksum = (0, utils_1.getFileChecksum)(file);
            return [filePath, checksum];
        }))));
        console.log(`✨ Job Done. Total time: ${(0, utils_1.timeDiff)(t)}ms`);
    }
}
// Command setup
exports.default = new commander_1.Command()
    .name('sort-imports')
    .description('CLI tool to sort import statements in Solidity files')
    .requiredOption('-i, --input <pattern>', 'Glob pattern for files to process')
    .option('-c, --check', 'check for import statement sorting issues without modifying', false)
    .option('-d --debug', 'enable debug mode to print debug information like raw imports', false)
    .action(async (options) => {
    try {
        await executeCommand(options);
    }
    catch (err) {
        console.error(`[ERROR] ${err instanceof Error ? err.message : err}`);
        process.exit(1);
    }
});
