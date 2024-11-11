"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const fs_1 = require("fs");
const glob_1 = require("glob");
const path_1 = require("path");
exports.default = new commander_1.Command().name('generate-abi-types').action(() => {
    // XXX: THIS CAN BE IMPROVED
    const filter = (0, glob_1.globSync)(`${__dirname}/src/{branch,hub,interfaces,lib,message,twab}/**/*.sol`)
        .map(path_1.parse)
        .map(({ name }) => name);
    const entries = (0, fs_1.readdirSync)('abis');
    const contracts = [];
    for (const entry of entries) {
        if ((0, path_1.extname)(entry) !== '.json')
            continue;
        const name = entry.replace('.abi.json', '');
        const content = (0, fs_1.readFileSync)(`${__dirname}/../abis/${entry}`);
        (0, fs_1.rmSync)(`abis/${entry}`);
        if (!filter.includes(name) ||
            !Array.isArray(content) ||
            content.length === 0) {
            console.log(`Skipping ${entry}`);
            continue;
        }
        contracts.push(name);
        let builder = '';
        builder += `const ${name} = ${JSON.stringify(content, null, 2)} as const;\n\n`;
        builder += `export { ${name} };\n`;
        (0, fs_1.writeFileSync)(`${__dirname}/abis/${name}.ts`, builder);
    }
    let builder = '';
    for (const contract of contracts) {
        builder += `export * from './${contract}';\n`;
    }
    (0, fs_1.writeFileSync)(`${__dirname}/abis/index.ts`, builder);
});
