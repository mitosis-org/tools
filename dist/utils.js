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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileChecksum = getFileChecksum;
exports.loadCache = loadCache;
exports.saveCache = saveCache;
exports.hrtime = hrtime;
exports.timeDiff = timeDiff;
const crypto_1 = require("crypto");
const fs_1 = require("fs");
const path = __importStar(require("path"));
function getFileChecksum(filePath) {
    return (0, crypto_1.createHash)('sha256').update(filePath).digest('hex');
}
async function loadCache(toolName) {
    const cacheDir = `${process.cwd()}/cache/tools`;
    const cachePath = path.join(cacheDir, `${toolName}.json`);
    const exists = await fs_1.promises.access(cachePath).then(() => true, () => false);
    if (!exists)
        return null;
    const cache = await fs_1.promises.readFile(cachePath, 'utf-8');
    return JSON.parse(cache);
}
async function saveCache(toolName, cache) {
    const cacheDir = `${process.cwd()}/cache/tools`;
    await fs_1.promises.mkdir(cacheDir, { recursive: true });
    const cachePath = path.join(cacheDir, `${toolName}.json`);
    await fs_1.promises.writeFile(cachePath, JSON.stringify(cache, null, 2) + '\n');
}
function hrtime() {
    const [t1, t2] = process.hrtime();
    return t1 * 1_000_000_000 + t2;
}
function timeDiff(start) {
    return ((hrtime() - start) / 1_000_000).toPrecision(3);
}
