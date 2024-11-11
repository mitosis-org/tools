"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const format_json_1 = __importDefault(require("./format-json"));
const generate_abi_types_1 = __importDefault(require("./generate-abi-types"));
const minify_1 = __importDefault(require("./minify"));
const sort_imports_1 = __importDefault(require("./sort-imports"));
new commander_1.Command()
    .name('mito-tools')
    .addCommand(format_json_1.default)
    .addCommand(generate_abi_types_1.default)
    .addCommand(minify_1.default)
    .addCommand(sort_imports_1.default)
    .parseAsync(process.argv)
    .catch((err) => {
    console.error('[ERROR] Command parsing error:', err);
    process.exit(1);
});
