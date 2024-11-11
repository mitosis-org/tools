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
const commander_1 = require("commander");
const fs = __importStar(require("fs"));
function minifyFile(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        const minifiedContent = minifyContent(data);
        fs.writeFileSync(filePath, minifiedContent, 'utf8');
        console.log(`File ${filePath} has been successfully minified.`);
    }
    catch (error) {
        console.error(`Error processing file ${filePath}:`, error);
    }
}
function minifyContent(content) {
    const multilineCommentRegex = /\/\*[\s\S]*?\*\//g;
    const singleLineCommentRegex = /\/\/.*$/gm;
    const emptyLinesRegex = /^\s*[\r\n]/gm;
    const multipleLineBreaksRegex = /[\r\n]+/g;
    const trailingWhitespaceRegex = /[ \t]+$/gm;
    return content
        .replace(multilineCommentRegex, '')
        .replace(singleLineCommentRegex, '')
        .replace(emptyLinesRegex, '')
        .replace(multipleLineBreaksRegex, '\n')
        .replace(trailingWhitespaceRegex, '')
        .trim();
}
exports.default = new commander_1.Command().name('minify').action(() => {
    const filePath = process.argv[2];
    if (!filePath) {
        console.log('Usage: yarn minify <file_path>');
        process.exit(1);
    }
    minifyFile(filePath);
});
