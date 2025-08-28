"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/utils.ts
function getFileChecksum(filePath) {
  return (0, import_crypto.createHash)("sha256").update(filePath).digest("hex");
}
async function loadCache(toolName) {
  const cacheDir = `${process.cwd()}/cache/tools`;
  const cachePath = path.join(cacheDir, `${toolName}.json`);
  const exists = await import_fs.promises.access(cachePath).then(
    () => true,
    () => false
  );
  if (!exists) return null;
  const cache = await import_fs.promises.readFile(cachePath, "utf-8");
  return JSON.parse(cache);
}
async function saveCache(toolName, cache) {
  const cacheDir = `${process.cwd()}/cache/tools`;
  await import_fs.promises.mkdir(cacheDir, { recursive: true });
  const cachePath = path.join(cacheDir, `${toolName}.json`);
  await import_fs.promises.writeFile(cachePath, JSON.stringify(cache, null, 2) + "\n");
}
function hrtime() {
  const [t1, t2] = process.hrtime();
  return t1 * 1e9 + t2;
}
function timeDiff(start) {
  return ((hrtime() - start) / 1e6).toPrecision(3);
}
var import_crypto, import_fs, path;
var init_utils = __esm({
  "src/utils.ts"() {
    "use strict";
    import_crypto = require("crypto");
    import_fs = require("fs");
    path = __toESM(require("path"));
  }
});

// src/format-json.ts
var format_json_exports = {};
__export(format_json_exports, {
  executeFormatJson: () => executeFormatJson
});
function convertToChecksum(address) {
  return (0, import_viem.getAddress)(address);
}
function processJsonValue(filePath, check, value) {
  if (typeof value === "string" && ethereumAddressRegex.test(value)) {
    const checksummed = convertToChecksum(value);
    const hasChanged = checksummed !== value;
    if (hasChanged && check)
      throw new Error(
        `${filePath} contains non-checksum addresses. (before: ${value}, after: ${checksummed})`
      );
    return checksummed;
  }
  return value;
}
function processJsonObject(filePath, check, data) {
  return Object.fromEntries(
    Object.entries(data).map(([k, v]) => [k, processJson(filePath, check, v)]).sort(([a], [b]) => a.localeCompare(b))
  );
}
function processJsonArray(filePath, check, data) {
  return data.map((i) => processJson(filePath, check, i));
}
function processJson(filePath, check, data) {
  if (typeof data === "object" && data !== null) {
    return Array.isArray(data) ? processJsonArray(filePath, check, data) : processJsonObject(filePath, check, data);
  }
  return processJsonValue(filePath, check, data);
}
async function processFile(filePath, checkOnly, cache) {
  const t = hrtime();
  const file = await import_fs2.promises.readFile(filePath, "utf-8");
  const checksum = getFileChecksum(file);
  if (cache && cache[filePath] === checksum) {
    console.log(import_chalk.default.gray(filePath), `${timeDiff(t)}ms`, "\u2728");
    return [filePath, checksum];
  }
  const data = JSON.parse(file);
  const updatedData = processJson(filePath, checkOnly, data);
  if (checkOnly) {
    console.log(import_chalk.default.gray(filePath), `${timeDiff(t)}ms`, "\u2705");
    return [filePath, checksum];
  }
  const noUpdate = JSON.stringify(data) === JSON.stringify(updatedData);
  if (noUpdate) {
    console.log(import_chalk.default.gray(filePath), `${timeDiff(t)}ms`, "\u{1F37B}");
    return [filePath, checksum];
  }
  await import_fs2.promises.writeFile(filePath, JSON.stringify(updatedData, null, 2) + "\n");
  console.log(filePath, `${timeDiff(t)}ms`);
  return [filePath, checksum];
}
async function executeFormatJson(globPattern, checkOnly) {
  const t = hrtime();
  const cache = await loadCache("format-json");
  const files = await (0, import_glob.glob)(globPattern);
  if (files.length === 0) {
    console.warn("[WARN] No files found matching the specified pattern.");
    return;
  }
  const jsonFiles = files.filter((file) => path2.extname(file) === ".json");
  if (jsonFiles.length === 0) {
    throw new Error("No JSON files found in the matched files.");
  }
  const result = await Promise.all(
    jsonFiles.map(
      (filePath) => new Promise(
        (resolve2, reject) => processFile(filePath, checkOnly, cache).then(resolve2).catch((err) => {
          console.error(`[ERROR] Error processing ${filePath}:`, err);
          reject(err);
        })
      )
    )
  );
  if (jsonFiles.length < files.length) {
    console.warn(
      `[WARN] ${files.length - jsonFiles.length} non-JSON files were skipped.`
    );
  }
  await saveCache("format-json", Object.fromEntries(result));
  console.log(`\u2728 Job Done. Total time: ${timeDiff(t)}ms`);
}
var import_chalk, import_fs2, import_glob, path2, import_viem, ethereumAddressRegex;
var init_format_json = __esm({
  "src/format-json.ts"() {
    "use strict";
    import_chalk = __toESM(require("chalk"));
    import_fs2 = require("fs");
    import_glob = require("glob");
    path2 = __toESM(require("path"));
    import_viem = require("viem");
    init_utils();
    ethereumAddressRegex = /^0x[a-fA-F0-9]{40}$/;
  }
});

// src/sort-imports.ts
var sort_imports_exports = {};
__export(sort_imports_exports, {
  executeSortImports: () => executeSortImports
});
function trimLineBreak(s) {
  return s.replaceAll(LINE_BREAK_REGEX, "");
}
function toSorted(v) {
  const sorted = v.sort(({ path: a }, { path: b }) => a.localeCompare(b)).map(({ full }) => full);
  return sorted;
}
function sortImports(rawImports, remappings, debug) {
  const src = rawImports.map((i) => {
    const m = i.match(IMPORT_LINE_REGEX);
    if (!m) throw new Error(`Invalid import statement: ${i}`);
    return { full: i, path: m[1] };
  });
  const srcGroups = src.reduce(
    (acc, i) => {
      acc[acc.length - 1].push(trimLineBreak(i.full));
      if (i.full.endsWith("\n")) acc.push([]);
      return acc;
    },
    [[]]
  ).filter((g) => g.length > 0);
  const grouped = /* @__PURE__ */ new Map();
  const ungrouped = [];
  src.forEach((i) => {
    i.full = trimLineBreak(i.full);
    const remapping = remappings.find((r) => i.path.startsWith(r));
    if (!remapping) {
      ungrouped.push(i);
      return;
    }
    if (!grouped.has(remapping)) grouped.set(remapping, []);
    grouped.get(remapping).push(i);
  });
  const dstGroups = [
    ...Array.from(grouped.values()).map(toSorted),
    toSorted(ungrouped)
  ].filter((g) => g.length > 0);
  const update = JSON.stringify(dstGroups) !== JSON.stringify(srcGroups);
  if (debug) {
    console.log(src);
    console.log("=====================================");
    console.log(srcGroups);
    console.log("=====================================");
    console.log(dstGroups);
  }
  return { sortedImports: dstGroups, update };
}
async function processContract({
  filePath,
  remappings,
  cache,
  options
}) {
  try {
    const t = hrtime();
    const contract = await (0, import_promises.readFile)(filePath, "utf-8");
    const checksum = getFileChecksum(contract);
    if (cache && cache[filePath] === checksum) {
      console.log(import_chalk2.default.gray(filePath), `${timeDiff(t)}ms`, "\u2728");
      return;
    }
    const rawImports = [...contract.matchAll(IMPORT_ALL_REGEX)].map(
      (m) => m[1]
    );
    const { sortedImports, update } = sortImports(
      rawImports,
      remappings,
      options.debug
    );
    const output = sortedImports.map((g) => g.join("\n")).join("\n\n");
    if (options.check) {
      if (update) throw new Error(`${filePath}'s imports are not sorted`);
      console.log(import_chalk2.default.gray(filePath), `${timeDiff(t)}ms`, "\u2705");
      return;
    }
    if (!update) {
      console.log(import_chalk2.default.gray(filePath), `${timeDiff(t)}ms`, "\u{1F37B}");
      return;
    }
    const lines = contract.replaceAll(IMPORT_ALL_REGEX, "").split("\n");
    const pragmaIndex = lines.findIndex((l) => l.startsWith("pragma"));
    const newLines = [...lines];
    newLines.splice(pragmaIndex + 1, 0, output);
    await (0, import_promises.writeFile)(filePath, newLines.join("\n"));
    console.log(filePath, `${timeDiff(t)}ms`, "\u{1F6E0}\uFE0F");
  } catch (err) {
    console.error(`[ERROR] Error processing ${filePath}:`, err);
    if (err instanceof Error) {
      throw new Error(`Failed to process ${filePath}: ${err.message}`);
    } else {
      throw new Error(`Failed to process ${filePath}: Unknown error`);
    }
  }
}
async function executeSortImports(options) {
  const t = hrtime();
  const cache = await loadCache("sort-imports");
  const files = await (0, import_glob2.glob)(options.input);
  const targetFiles = files.filter((file) => import_path.default.extname(file) === ".sol");
  if (targetFiles.length === 0) {
    throw new Error("No target files found in the matched files.");
  }
  try {
    let remappingsList = [];
    if ((0, import_fs3.existsSync)("foundry.toml")) {
      const foundryConfig = await (0, import_promises.readFile)("foundry.toml", "utf-8");
      ({
        profile: {
          default: { remappings: remappingsList }
        }
      } = import_toml.default.parse(foundryConfig));
    }
    const remappings = remappingsList.map((l) => l.split("=")[0]);
    await (0, import_util.promisify)(import_child_process.exec)("forge fmt");
    await Promise.all(
      targetFiles.map(
        (filePath) => new Promise(
          (resolve2, reject) => processContract({ filePath, remappings, cache, options }).then(resolve2).catch(reject)
        )
      )
    );
  } catch (err) {
    console.error("An error occurred:", err);
    process.exit(1);
  } finally {
    await (0, import_util.promisify)(import_child_process.exec)("forge fmt");
    await saveCache(
      "sort-imports",
      Object.fromEntries(
        await Promise.all(
          targetFiles.map(async (filePath) => {
            const file = await import_fs3.promises.readFile(filePath, "utf-8");
            const checksum = getFileChecksum(file);
            return [filePath, checksum];
          })
        )
      )
    );
    console.log(`\u2728 Job Done. Total time: ${timeDiff(t)}ms`);
  }
}
var import_chalk2, import_child_process, import_fs3, import_promises, import_glob2, import_path, import_toml, import_util, IMPORT_ALL_REGEX, IMPORT_LINE_REGEX, LINE_BREAK_REGEX;
var init_sort_imports = __esm({
  "src/sort-imports.ts"() {
    "use strict";
    import_chalk2 = __toESM(require("chalk"));
    import_child_process = require("child_process");
    import_fs3 = require("fs");
    import_promises = require("fs/promises");
    import_glob2 = require("glob");
    import_path = __toESM(require("path"));
    import_toml = __toESM(require("toml"));
    import_util = require("util");
    init_utils();
    IMPORT_ALL_REGEX = /^(import\s+(?:(?:[^;'"]+from\s+)?['"])([^'"]+)['"];?\s*)$/gm;
    IMPORT_LINE_REGEX = /^import\s+(?:(?:[^;'"]+from\s+)?['"])([^'"]+)['"];?\s*$/;
    LINE_BREAK_REGEX = /(?:\r\n|\r|\n)/g;
  }
});

// src/transform-abi.ts
var transform_abi_exports = {};
__export(transform_abi_exports, {
  executeTransformAbi: () => executeTransformAbi
});
function findSrcContractAbiFiles(outDir, srcDir) {
  const contractFiles = [];
  function traverseSrc(currentSrcDir, relativePath = "") {
    const entries = fs4.readdirSync(currentSrcDir, { withFileTypes: true });
    for (const entry of entries) {
      const fullSrcPath = path4.join(currentSrcDir, entry.name);
      const currentRelativePath = path4.join(relativePath, entry.name);
      if (entry.isDirectory()) {
        traverseSrc(fullSrcPath, currentRelativePath);
      } else if (entry.isFile() && entry.name.endsWith(".sol")) {
        const contractName = path4.basename(entry.name, ".sol");
        const abiPath = path4.join(
          outDir,
          entry.name,
          `${contractName}.abi.json`
        );
        if (fs4.existsSync(abiPath)) {
          contractFiles.push({
            abiPath,
            srcPath: currentRelativePath,
            contractName
          });
        }
      }
    }
  }
  traverseSrc(srcDir);
  return contractFiles;
}
function transformContractAbi(contract, baseOutputDir) {
  const t = hrtime();
  try {
    const abiContent = fs4.readFileSync(contract.abiPath, "utf8");
    const abiJson = JSON.parse(abiContent);
    const tsContent = `const abi = ${JSON.stringify(abiJson, null, 2)} as const;

export default abi;
`;
    const srcDir = path4.dirname(contract.srcPath);
    const outputDir = path4.join(baseOutputDir, srcDir);
    const outputPath = path4.join(outputDir, `${contract.contractName}.ts`);
    fs4.mkdirSync(outputDir, { recursive: true });
    fs4.writeFileSync(outputPath, tsContent, "utf8");
    console.log(
      import_chalk3.default.green("\u2705"),
      import_chalk3.default.gray(`${contract.contractName} \u2192`),
      path4.relative(process.cwd(), outputPath),
      `${timeDiff(t)}ms`
    );
  } catch (error) {
    console.error(
      import_chalk3.default.red("\u274C"),
      `Error transforming ${contract.contractName}:`,
      error instanceof Error ? error.message : error
    );
    throw error;
  }
}
function generateIndexFiles(abisDir, contracts) {
  const t = hrtime();
  try {
    const contractsByDir = /* @__PURE__ */ new Map();
    for (const contract of contracts) {
      const dir = path4.dirname(contract.srcPath);
      if (!contractsByDir.has(dir)) {
        contractsByDir.set(dir, []);
      }
      contractsByDir.get(dir).push(contract);
    }
    const sortedDirs = Array.from(contractsByDir.keys()).sort();
    for (const dir of sortedDirs) {
      if (dir === ".") continue;
      const dirContracts = contractsByDir.get(dir);
      generateDirectoryIndex(abisDir, dir, dirContracts);
    }
    generateRootIndex(abisDir, contractsByDir, sortedDirs);
    console.log(
      import_chalk3.default.green("\u2728"),
      `Generated ${sortedDirs.length} index.ts files`,
      `${timeDiff(t)}ms`
    );
  } catch (error) {
    console.error(
      import_chalk3.default.red("\u274C"),
      "Error generating index files:",
      error instanceof Error ? error.message : error
    );
    throw error;
  }
}
function generateDirectoryIndex(abisDir, dir, contracts) {
  const imports = [];
  const exports2 = [];
  const sortedContracts = [...contracts].sort(
    (a, b) => a.contractName.localeCompare(b.contractName)
  );
  for (const contract of sortedContracts) {
    const importName = `${contract.contractName}Abi`;
    imports.push(`import ${importName} from './${contract.contractName}.js';`);
    exports2.push(`  ${contract.contractName}: ${importName},`);
  }
  const content = `${imports.join("\n")}

export {
${exports2.join("\n")}
};
`;
  const indexPath = path4.join(abisDir, dir, "index.ts");
  fs4.writeFileSync(indexPath, content, "utf8");
  console.log(
    import_chalk3.default.green("\u2705"),
    import_chalk3.default.gray(`${dir}/index.ts \u2192`),
    path4.relative(process.cwd(), indexPath)
  );
}
function generateRootIndex(abisDir, contractsByDir, sortedDirs) {
  const imports = [];
  const exports2 = [];
  const rootContracts = contractsByDir.get(".") || [];
  const sortedRootContracts = [...rootContracts].sort(
    (a, b) => a.contractName.localeCompare(b.contractName)
  );
  for (const contract of sortedRootContracts) {
    const importName = `${contract.contractName}Abi`;
    imports.push(`import ${importName} from './${contract.contractName}.js';`);
    exports2.push(`  ${contract.contractName}: ${importName},`);
  }
  const nestedExports = {};
  for (const dir of sortedDirs) {
    if (dir === ".") continue;
    const pathParts = dir.split(path4.sep);
    const importAlias = pathParts.join("_") + "_exports";
    const importPath = `./${dir}/index.js`;
    imports.push(
      `import * as ${importAlias} from '${importPath.replace(/\\/g, "/")}';`
    );
    let current = nestedExports;
    for (let i = 0; i < pathParts.length - 1; i++) {
      const part = pathParts[i];
      if (!current[part]) {
        current[part] = {};
      }
      current = current[part];
    }
    current[pathParts[pathParts.length - 1]] = importAlias;
  }
  function stringifyExports(obj, indent = 2) {
    const spaces = " ".repeat(indent);
    const entries = Object.entries(obj).sort(([a], [b]) => a.localeCompare(b));
    if (entries.length === 0) return "{}";
    const lines = entries.map(([key, value]) => {
      const quotedKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : `'${key}'`;
      if (typeof value === "string") {
        if (value.endsWith("_exports")) {
          return `${spaces}${quotedKey}: ...${value},`;
        }
        return `${spaces}${quotedKey}: ${value},`;
      } else {
        const nestedContent = stringifyExports(value, indent + 2);
        return `${spaces}${quotedKey}: ${nestedContent},`;
      }
    });
    return `{
${lines.join("\n")}
${" ".repeat(indent - 2)}}`;
  }
  for (const [key, value] of Object.entries(nestedExports)) {
    const quotedKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : `'${key}'`;
    if (typeof value === "string") {
      if (value.endsWith("_exports")) {
        exports2.push(`  ${quotedKey}: ...${value},`);
      } else {
        exports2.push(`  ${quotedKey}: ${value},`);
      }
    } else {
      const nestedContent = stringifyExports(value, 4);
      exports2.push(`  ${quotedKey}: ${nestedContent},`);
    }
  }
  const content = `${imports.join("\n")}

export default {
${exports2.join("\n")}
};
`;
  const indexPath = path4.join(abisDir, "index.ts");
  fs4.writeFileSync(indexPath, content, "utf8");
  console.log(
    import_chalk3.default.green("\u2705"),
    import_chalk3.default.gray("index.ts \u2192"),
    path4.relative(process.cwd(), indexPath)
  );
}
async function executeTransformAbi(options) {
  const t = hrtime();
  const srcDir = path4.resolve(options.srcDir || "src");
  const outDir = path4.resolve(options.outDir || "out");
  const abisDir = path4.resolve(options.abisDir || "abis");
  if (!fs4.existsSync(outDir)) {
    throw new Error(`Output directory '${outDir}' does not exist`);
  }
  if (!fs4.existsSync(srcDir)) {
    throw new Error(`Source directory '${srcDir}' does not exist`);
  }
  console.log(
    import_chalk3.default.blue("\u{1F50D}"),
    `Searching for contracts in: ${import_chalk3.default.gray(srcDir)}`
  );
  console.log(import_chalk3.default.blue("\u{1F4C2}"), `Looking for ABIs in: ${import_chalk3.default.gray(outDir)}`);
  console.log(import_chalk3.default.blue("\u{1F4C1}"), `Output directory: ${import_chalk3.default.gray(abisDir)}`);
  const contracts = findSrcContractAbiFiles(outDir, srcDir);
  if (contracts.length === 0) {
    console.log(
      import_chalk3.default.yellow("\u2139\uFE0F"),
      "No contracts with ABIs found in src/ directory"
    );
    return;
  }
  console.log(
    import_chalk3.default.blue("\u{1F4C1}"),
    `Found ${import_chalk3.default.cyan(contracts.length)} source contracts with ABIs`
  );
  console.log(import_chalk3.default.blue("\u{1F504}"), "Starting transformation...\n");
  let successCount = 0;
  let errorCount = 0;
  for (const contract of contracts) {
    try {
      transformContractAbi(contract, abisDir);
      successCount++;
    } catch {
      errorCount++;
    }
  }
  console.log(
    import_chalk3.default.green("\n\u2728"),
    `Transformation complete! Generated ${import_chalk3.default.cyan(successCount)} TypeScript ABI files`
  );
  if (errorCount > 0) {
    console.log(
      import_chalk3.default.red(`\u26A0\uFE0F`),
      `Failed to transform ${import_chalk3.default.red(errorCount)} files`
    );
  }
  if (successCount > 0) {
    console.log(import_chalk3.default.blue("\n\u{1F4DD}"), "Generating index.ts files...");
    try {
      generateIndexFiles(
        abisDir,
        contracts.filter(() => {
          return true;
        })
      );
    } catch (error) {
      console.error(
        import_chalk3.default.red("\u274C"),
        "Failed to generate index.ts files:",
        error instanceof Error ? error.message : error
      );
    }
  }
  console.log(import_chalk3.default.gray(`Total time: ${timeDiff(t)}ms`));
}
var import_chalk3, fs4, path4;
var init_transform_abi = __esm({
  "src/transform-abi.ts"() {
    "use strict";
    import_chalk3 = __toESM(require("chalk"));
    fs4 = __toESM(require("fs"));
    path4 = __toESM(require("path"));
    init_utils();
  }
});

// src/index.ts
var import_commander = require("commander");
var program = new import_commander.Command();
program.name("mito-tools").description("Mito development tools collection").version("1.0.0");
program.command("format-json").description(
  "Format JSON files - Sort JSON and convert Ethereum addresses to checksummed format"
).requiredOption("-i --input <pattern>", "Glob pattern for files to process").option(
  "-c --check",
  "Check for non-checksum addresses without modifying files",
  false
).action(async (options) => {
  const { executeFormatJson: executeFormatJson2 } = await Promise.resolve().then(() => (init_format_json(), format_json_exports));
  try {
    await executeFormatJson2(options.input, options.check);
  } catch (err) {
    console.error(`[ERROR] ${err instanceof Error ? err.message : err}`);
    process.exit(1);
  }
});
program.command("sort-imports").description("Sort import statements in Solidity files").requiredOption("-i, --input <pattern>", "Glob pattern for files to process").option(
  "-c, --check",
  "Check for import statement sorting issues without modifying",
  false
).option(
  "-d --debug",
  "Enable debug mode to print debug information like raw imports",
  false
).action(async (options) => {
  const { executeSortImports: executeSortImports2 } = await Promise.resolve().then(() => (init_sort_imports(), sort_imports_exports));
  try {
    await executeSortImports2(options);
  } catch (err) {
    console.error(`[ERROR] ${err instanceof Error ? err.message : err}`);
    process.exit(1);
  }
});
program.command("transform-abi").description("Transform Solidity contract ABI JSON files to TypeScript files").option(
  "-s, --src-dir <path>",
  "Source directory containing .sol files",
  "src"
).option(
  "-o, --out-dir <path>",
  "Forge output directory containing ABI files",
  "out"
).option(
  "-a, --abis-dir <path>",
  "Output directory for TypeScript ABI files",
  "abis"
).action(async (options) => {
  const { executeTransformAbi: executeTransformAbi2 } = await Promise.resolve().then(() => (init_transform_abi(), transform_abi_exports));
  try {
    await executeTransformAbi2(options);
  } catch (err) {
    console.error(`[ERROR] ${err instanceof Error ? err.message : err}`);
    process.exit(1);
  }
});
program.parse(process.argv);
