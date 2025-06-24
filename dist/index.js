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
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
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

// ../../../.yarn/berry/cache/commander-npm-14.0.0-1e0a7932ab-10c0.zip/node_modules/commander/lib/error.js
var require_error = __commonJS({
  "../../../.yarn/berry/cache/commander-npm-14.0.0-1e0a7932ab-10c0.zip/node_modules/commander/lib/error.js"(exports2) {
    var CommanderError2 = class extends Error {
      /**
       * Constructs the CommanderError class
       * @param {number} exitCode suggested exit code which could be used with process.exit
       * @param {string} code an id string representing the error
       * @param {string} message human-readable description of the error
       */
      constructor(exitCode, code, message) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
        this.code = code;
        this.exitCode = exitCode;
        this.nestedError = void 0;
      }
    };
    var InvalidArgumentError2 = class extends CommanderError2 {
      /**
       * Constructs the InvalidArgumentError class
       * @param {string} [message] explanation of why argument is invalid
       */
      constructor(message) {
        super(1, "commander.invalidArgument", message);
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
      }
    };
    exports2.CommanderError = CommanderError2;
    exports2.InvalidArgumentError = InvalidArgumentError2;
  }
});

// ../../../.yarn/berry/cache/commander-npm-14.0.0-1e0a7932ab-10c0.zip/node_modules/commander/lib/argument.js
var require_argument = __commonJS({
  "../../../.yarn/berry/cache/commander-npm-14.0.0-1e0a7932ab-10c0.zip/node_modules/commander/lib/argument.js"(exports2) {
    var { InvalidArgumentError: InvalidArgumentError2 } = require_error();
    var Argument2 = class {
      /**
       * Initialize a new command argument with the given name and description.
       * The default is that the argument is required, and you can explicitly
       * indicate this with <> around the name. Put [] around the name for an optional argument.
       *
       * @param {string} name
       * @param {string} [description]
       */
      constructor(name, description) {
        this.description = description || "";
        this.variadic = false;
        this.parseArg = void 0;
        this.defaultValue = void 0;
        this.defaultValueDescription = void 0;
        this.argChoices = void 0;
        switch (name[0]) {
          case "<":
            this.required = true;
            this._name = name.slice(1, -1);
            break;
          case "[":
            this.required = false;
            this._name = name.slice(1, -1);
            break;
          default:
            this.required = true;
            this._name = name;
            break;
        }
        if (this._name.length > 3 && this._name.slice(-3) === "...") {
          this.variadic = true;
          this._name = this._name.slice(0, -3);
        }
      }
      /**
       * Return argument name.
       *
       * @return {string}
       */
      name() {
        return this._name;
      }
      /**
       * @package
       */
      _concatValue(value, previous) {
        if (previous === this.defaultValue || !Array.isArray(previous)) {
          return [value];
        }
        return previous.concat(value);
      }
      /**
       * Set the default value, and optionally supply the description to be displayed in the help.
       *
       * @param {*} value
       * @param {string} [description]
       * @return {Argument}
       */
      default(value, description) {
        this.defaultValue = value;
        this.defaultValueDescription = description;
        return this;
      }
      /**
       * Set the custom handler for processing CLI command arguments into argument values.
       *
       * @param {Function} [fn]
       * @return {Argument}
       */
      argParser(fn) {
        this.parseArg = fn;
        return this;
      }
      /**
       * Only allow argument value to be one of choices.
       *
       * @param {string[]} values
       * @return {Argument}
       */
      choices(values) {
        this.argChoices = values.slice();
        this.parseArg = (arg, previous) => {
          if (!this.argChoices.includes(arg)) {
            throw new InvalidArgumentError2(
              `Allowed choices are ${this.argChoices.join(", ")}.`
            );
          }
          if (this.variadic) {
            return this._concatValue(arg, previous);
          }
          return arg;
        };
        return this;
      }
      /**
       * Make argument required.
       *
       * @returns {Argument}
       */
      argRequired() {
        this.required = true;
        return this;
      }
      /**
       * Make argument optional.
       *
       * @returns {Argument}
       */
      argOptional() {
        this.required = false;
        return this;
      }
    };
    function humanReadableArgName(arg) {
      const nameOutput = arg.name() + (arg.variadic === true ? "..." : "");
      return arg.required ? "<" + nameOutput + ">" : "[" + nameOutput + "]";
    }
    exports2.Argument = Argument2;
    exports2.humanReadableArgName = humanReadableArgName;
  }
});

// ../../../.yarn/berry/cache/commander-npm-14.0.0-1e0a7932ab-10c0.zip/node_modules/commander/lib/help.js
var require_help = __commonJS({
  "../../../.yarn/berry/cache/commander-npm-14.0.0-1e0a7932ab-10c0.zip/node_modules/commander/lib/help.js"(exports2) {
    var { humanReadableArgName } = require_argument();
    var Help2 = class {
      constructor() {
        this.helpWidth = void 0;
        this.minWidthToWrap = 40;
        this.sortSubcommands = false;
        this.sortOptions = false;
        this.showGlobalOptions = false;
      }
      /**
       * prepareContext is called by Commander after applying overrides from `Command.configureHelp()`
       * and just before calling `formatHelp()`.
       *
       * Commander just uses the helpWidth and the rest is provided for optional use by more complex subclasses.
       *
       * @param {{ error?: boolean, helpWidth?: number, outputHasColors?: boolean }} contextOptions
       */
      prepareContext(contextOptions) {
        this.helpWidth = this.helpWidth ?? contextOptions.helpWidth ?? 80;
      }
      /**
       * Get an array of the visible subcommands. Includes a placeholder for the implicit help command, if there is one.
       *
       * @param {Command} cmd
       * @returns {Command[]}
       */
      visibleCommands(cmd) {
        const visibleCommands = cmd.commands.filter((cmd2) => !cmd2._hidden);
        const helpCommand = cmd._getHelpCommand();
        if (helpCommand && !helpCommand._hidden) {
          visibleCommands.push(helpCommand);
        }
        if (this.sortSubcommands) {
          visibleCommands.sort((a, b) => {
            return a.name().localeCompare(b.name());
          });
        }
        return visibleCommands;
      }
      /**
       * Compare options for sort.
       *
       * @param {Option} a
       * @param {Option} b
       * @returns {number}
       */
      compareOptions(a, b) {
        const getSortKey = (option) => {
          return option.short ? option.short.replace(/^-/, "") : option.long.replace(/^--/, "");
        };
        return getSortKey(a).localeCompare(getSortKey(b));
      }
      /**
       * Get an array of the visible options. Includes a placeholder for the implicit help option, if there is one.
       *
       * @param {Command} cmd
       * @returns {Option[]}
       */
      visibleOptions(cmd) {
        const visibleOptions = cmd.options.filter((option) => !option.hidden);
        const helpOption = cmd._getHelpOption();
        if (helpOption && !helpOption.hidden) {
          const removeShort = helpOption.short && cmd._findOption(helpOption.short);
          const removeLong = helpOption.long && cmd._findOption(helpOption.long);
          if (!removeShort && !removeLong) {
            visibleOptions.push(helpOption);
          } else if (helpOption.long && !removeLong) {
            visibleOptions.push(
              cmd.createOption(helpOption.long, helpOption.description)
            );
          } else if (helpOption.short && !removeShort) {
            visibleOptions.push(
              cmd.createOption(helpOption.short, helpOption.description)
            );
          }
        }
        if (this.sortOptions) {
          visibleOptions.sort(this.compareOptions);
        }
        return visibleOptions;
      }
      /**
       * Get an array of the visible global options. (Not including help.)
       *
       * @param {Command} cmd
       * @returns {Option[]}
       */
      visibleGlobalOptions(cmd) {
        if (!this.showGlobalOptions) return [];
        const globalOptions = [];
        for (let ancestorCmd = cmd.parent; ancestorCmd; ancestorCmd = ancestorCmd.parent) {
          const visibleOptions = ancestorCmd.options.filter(
            (option) => !option.hidden
          );
          globalOptions.push(...visibleOptions);
        }
        if (this.sortOptions) {
          globalOptions.sort(this.compareOptions);
        }
        return globalOptions;
      }
      /**
       * Get an array of the arguments if any have a description.
       *
       * @param {Command} cmd
       * @returns {Argument[]}
       */
      visibleArguments(cmd) {
        if (cmd._argsDescription) {
          cmd.registeredArguments.forEach((argument) => {
            argument.description = argument.description || cmd._argsDescription[argument.name()] || "";
          });
        }
        if (cmd.registeredArguments.find((argument) => argument.description)) {
          return cmd.registeredArguments;
        }
        return [];
      }
      /**
       * Get the command term to show in the list of subcommands.
       *
       * @param {Command} cmd
       * @returns {string}
       */
      subcommandTerm(cmd) {
        const args = cmd.registeredArguments.map((arg) => humanReadableArgName(arg)).join(" ");
        return cmd._name + (cmd._aliases[0] ? "|" + cmd._aliases[0] : "") + (cmd.options.length ? " [options]" : "") + // simplistic check for non-help option
        (args ? " " + args : "");
      }
      /**
       * Get the option term to show in the list of options.
       *
       * @param {Option} option
       * @returns {string}
       */
      optionTerm(option) {
        return option.flags;
      }
      /**
       * Get the argument term to show in the list of arguments.
       *
       * @param {Argument} argument
       * @returns {string}
       */
      argumentTerm(argument) {
        return argument.name();
      }
      /**
       * Get the longest command term length.
       *
       * @param {Command} cmd
       * @param {Help} helper
       * @returns {number}
       */
      longestSubcommandTermLength(cmd, helper) {
        return helper.visibleCommands(cmd).reduce((max, command) => {
          return Math.max(
            max,
            this.displayWidth(
              helper.styleSubcommandTerm(helper.subcommandTerm(command))
            )
          );
        }, 0);
      }
      /**
       * Get the longest option term length.
       *
       * @param {Command} cmd
       * @param {Help} helper
       * @returns {number}
       */
      longestOptionTermLength(cmd, helper) {
        return helper.visibleOptions(cmd).reduce((max, option) => {
          return Math.max(
            max,
            this.displayWidth(helper.styleOptionTerm(helper.optionTerm(option)))
          );
        }, 0);
      }
      /**
       * Get the longest global option term length.
       *
       * @param {Command} cmd
       * @param {Help} helper
       * @returns {number}
       */
      longestGlobalOptionTermLength(cmd, helper) {
        return helper.visibleGlobalOptions(cmd).reduce((max, option) => {
          return Math.max(
            max,
            this.displayWidth(helper.styleOptionTerm(helper.optionTerm(option)))
          );
        }, 0);
      }
      /**
       * Get the longest argument term length.
       *
       * @param {Command} cmd
       * @param {Help} helper
       * @returns {number}
       */
      longestArgumentTermLength(cmd, helper) {
        return helper.visibleArguments(cmd).reduce((max, argument) => {
          return Math.max(
            max,
            this.displayWidth(
              helper.styleArgumentTerm(helper.argumentTerm(argument))
            )
          );
        }, 0);
      }
      /**
       * Get the command usage to be displayed at the top of the built-in help.
       *
       * @param {Command} cmd
       * @returns {string}
       */
      commandUsage(cmd) {
        let cmdName = cmd._name;
        if (cmd._aliases[0]) {
          cmdName = cmdName + "|" + cmd._aliases[0];
        }
        let ancestorCmdNames = "";
        for (let ancestorCmd = cmd.parent; ancestorCmd; ancestorCmd = ancestorCmd.parent) {
          ancestorCmdNames = ancestorCmd.name() + " " + ancestorCmdNames;
        }
        return ancestorCmdNames + cmdName + " " + cmd.usage();
      }
      /**
       * Get the description for the command.
       *
       * @param {Command} cmd
       * @returns {string}
       */
      commandDescription(cmd) {
        return cmd.description();
      }
      /**
       * Get the subcommand summary to show in the list of subcommands.
       * (Fallback to description for backwards compatibility.)
       *
       * @param {Command} cmd
       * @returns {string}
       */
      subcommandDescription(cmd) {
        return cmd.summary() || cmd.description();
      }
      /**
       * Get the option description to show in the list of options.
       *
       * @param {Option} option
       * @return {string}
       */
      optionDescription(option) {
        const extraInfo = [];
        if (option.argChoices) {
          extraInfo.push(
            // use stringify to match the display of the default value
            `choices: ${option.argChoices.map((choice) => JSON.stringify(choice)).join(", ")}`
          );
        }
        if (option.defaultValue !== void 0) {
          const showDefault = option.required || option.optional || option.isBoolean() && typeof option.defaultValue === "boolean";
          if (showDefault) {
            extraInfo.push(
              `default: ${option.defaultValueDescription || JSON.stringify(option.defaultValue)}`
            );
          }
        }
        if (option.presetArg !== void 0 && option.optional) {
          extraInfo.push(`preset: ${JSON.stringify(option.presetArg)}`);
        }
        if (option.envVar !== void 0) {
          extraInfo.push(`env: ${option.envVar}`);
        }
        if (extraInfo.length > 0) {
          const extraDescription = `(${extraInfo.join(", ")})`;
          if (option.description) {
            return `${option.description} ${extraDescription}`;
          }
          return extraDescription;
        }
        return option.description;
      }
      /**
       * Get the argument description to show in the list of arguments.
       *
       * @param {Argument} argument
       * @return {string}
       */
      argumentDescription(argument) {
        const extraInfo = [];
        if (argument.argChoices) {
          extraInfo.push(
            // use stringify to match the display of the default value
            `choices: ${argument.argChoices.map((choice) => JSON.stringify(choice)).join(", ")}`
          );
        }
        if (argument.defaultValue !== void 0) {
          extraInfo.push(
            `default: ${argument.defaultValueDescription || JSON.stringify(argument.defaultValue)}`
          );
        }
        if (extraInfo.length > 0) {
          const extraDescription = `(${extraInfo.join(", ")})`;
          if (argument.description) {
            return `${argument.description} ${extraDescription}`;
          }
          return extraDescription;
        }
        return argument.description;
      }
      /**
       * Format a list of items, given a heading and an array of formatted items.
       *
       * @param {string} heading
       * @param {string[]} items
       * @param {Help} helper
       * @returns string[]
       */
      formatItemList(heading, items, helper) {
        if (items.length === 0) return [];
        return [helper.styleTitle(heading), ...items, ""];
      }
      /**
       * Group items by their help group heading.
       *
       * @param {Command[] | Option[]} unsortedItems
       * @param {Command[] | Option[]} visibleItems
       * @param {Function} getGroup
       * @returns {Map<string, Command[] | Option[]>}
       */
      groupItems(unsortedItems, visibleItems, getGroup) {
        const result = /* @__PURE__ */ new Map();
        unsortedItems.forEach((item) => {
          const group = getGroup(item);
          if (!result.has(group)) result.set(group, []);
        });
        visibleItems.forEach((item) => {
          const group = getGroup(item);
          if (!result.has(group)) {
            result.set(group, []);
          }
          result.get(group).push(item);
        });
        return result;
      }
      /**
       * Generate the built-in help text.
       *
       * @param {Command} cmd
       * @param {Help} helper
       * @returns {string}
       */
      formatHelp(cmd, helper) {
        const termWidth = helper.padWidth(cmd, helper);
        const helpWidth = helper.helpWidth ?? 80;
        function callFormatItem(term, description) {
          return helper.formatItem(term, termWidth, description, helper);
        }
        let output = [
          `${helper.styleTitle("Usage:")} ${helper.styleUsage(helper.commandUsage(cmd))}`,
          ""
        ];
        const commandDescription = helper.commandDescription(cmd);
        if (commandDescription.length > 0) {
          output = output.concat([
            helper.boxWrap(
              helper.styleCommandDescription(commandDescription),
              helpWidth
            ),
            ""
          ]);
        }
        const argumentList = helper.visibleArguments(cmd).map((argument) => {
          return callFormatItem(
            helper.styleArgumentTerm(helper.argumentTerm(argument)),
            helper.styleArgumentDescription(helper.argumentDescription(argument))
          );
        });
        output = output.concat(
          this.formatItemList("Arguments:", argumentList, helper)
        );
        const optionGroups = this.groupItems(
          cmd.options,
          helper.visibleOptions(cmd),
          (option) => option.helpGroupHeading ?? "Options:"
        );
        optionGroups.forEach((options, group) => {
          const optionList = options.map((option) => {
            return callFormatItem(
              helper.styleOptionTerm(helper.optionTerm(option)),
              helper.styleOptionDescription(helper.optionDescription(option))
            );
          });
          output = output.concat(this.formatItemList(group, optionList, helper));
        });
        if (helper.showGlobalOptions) {
          const globalOptionList = helper.visibleGlobalOptions(cmd).map((option) => {
            return callFormatItem(
              helper.styleOptionTerm(helper.optionTerm(option)),
              helper.styleOptionDescription(helper.optionDescription(option))
            );
          });
          output = output.concat(
            this.formatItemList("Global Options:", globalOptionList, helper)
          );
        }
        const commandGroups = this.groupItems(
          cmd.commands,
          helper.visibleCommands(cmd),
          (sub) => sub.helpGroup() || "Commands:"
        );
        commandGroups.forEach((commands, group) => {
          const commandList = commands.map((sub) => {
            return callFormatItem(
              helper.styleSubcommandTerm(helper.subcommandTerm(sub)),
              helper.styleSubcommandDescription(helper.subcommandDescription(sub))
            );
          });
          output = output.concat(this.formatItemList(group, commandList, helper));
        });
        return output.join("\n");
      }
      /**
       * Return display width of string, ignoring ANSI escape sequences. Used in padding and wrapping calculations.
       *
       * @param {string} str
       * @returns {number}
       */
      displayWidth(str) {
        return stripColor(str).length;
      }
      /**
       * Style the title for displaying in the help. Called with 'Usage:', 'Options:', etc.
       *
       * @param {string} str
       * @returns {string}
       */
      styleTitle(str) {
        return str;
      }
      styleUsage(str) {
        return str.split(" ").map((word) => {
          if (word === "[options]") return this.styleOptionText(word);
          if (word === "[command]") return this.styleSubcommandText(word);
          if (word[0] === "[" || word[0] === "<")
            return this.styleArgumentText(word);
          return this.styleCommandText(word);
        }).join(" ");
      }
      styleCommandDescription(str) {
        return this.styleDescriptionText(str);
      }
      styleOptionDescription(str) {
        return this.styleDescriptionText(str);
      }
      styleSubcommandDescription(str) {
        return this.styleDescriptionText(str);
      }
      styleArgumentDescription(str) {
        return this.styleDescriptionText(str);
      }
      styleDescriptionText(str) {
        return str;
      }
      styleOptionTerm(str) {
        return this.styleOptionText(str);
      }
      styleSubcommandTerm(str) {
        return str.split(" ").map((word) => {
          if (word === "[options]") return this.styleOptionText(word);
          if (word[0] === "[" || word[0] === "<")
            return this.styleArgumentText(word);
          return this.styleSubcommandText(word);
        }).join(" ");
      }
      styleArgumentTerm(str) {
        return this.styleArgumentText(str);
      }
      styleOptionText(str) {
        return str;
      }
      styleArgumentText(str) {
        return str;
      }
      styleSubcommandText(str) {
        return str;
      }
      styleCommandText(str) {
        return str;
      }
      /**
       * Calculate the pad width from the maximum term length.
       *
       * @param {Command} cmd
       * @param {Help} helper
       * @returns {number}
       */
      padWidth(cmd, helper) {
        return Math.max(
          helper.longestOptionTermLength(cmd, helper),
          helper.longestGlobalOptionTermLength(cmd, helper),
          helper.longestSubcommandTermLength(cmd, helper),
          helper.longestArgumentTermLength(cmd, helper)
        );
      }
      /**
       * Detect manually wrapped and indented strings by checking for line break followed by whitespace.
       *
       * @param {string} str
       * @returns {boolean}
       */
      preformatted(str) {
        return /\n[^\S\r\n]/.test(str);
      }
      /**
       * Format the "item", which consists of a term and description. Pad the term and wrap the description, indenting the following lines.
       *
       * So "TTT", 5, "DDD DDDD DD DDD" might be formatted for this.helpWidth=17 like so:
       *   TTT  DDD DDDD
       *        DD DDD
       *
       * @param {string} term
       * @param {number} termWidth
       * @param {string} description
       * @param {Help} helper
       * @returns {string}
       */
      formatItem(term, termWidth, description, helper) {
        const itemIndent = 2;
        const itemIndentStr = " ".repeat(itemIndent);
        if (!description) return itemIndentStr + term;
        const paddedTerm = term.padEnd(
          termWidth + term.length - helper.displayWidth(term)
        );
        const spacerWidth = 2;
        const helpWidth = this.helpWidth ?? 80;
        const remainingWidth = helpWidth - termWidth - spacerWidth - itemIndent;
        let formattedDescription;
        if (remainingWidth < this.minWidthToWrap || helper.preformatted(description)) {
          formattedDescription = description;
        } else {
          const wrappedDescription = helper.boxWrap(description, remainingWidth);
          formattedDescription = wrappedDescription.replace(
            /\n/g,
            "\n" + " ".repeat(termWidth + spacerWidth)
          );
        }
        return itemIndentStr + paddedTerm + " ".repeat(spacerWidth) + formattedDescription.replace(/\n/g, `
${itemIndentStr}`);
      }
      /**
       * Wrap a string at whitespace, preserving existing line breaks.
       * Wrapping is skipped if the width is less than `minWidthToWrap`.
       *
       * @param {string} str
       * @param {number} width
       * @returns {string}
       */
      boxWrap(str, width) {
        if (width < this.minWidthToWrap) return str;
        const rawLines = str.split(/\r\n|\n/);
        const chunkPattern = /[\s]*[^\s]+/g;
        const wrappedLines = [];
        rawLines.forEach((line) => {
          const chunks = line.match(chunkPattern);
          if (chunks === null) {
            wrappedLines.push("");
            return;
          }
          let sumChunks = [chunks.shift()];
          let sumWidth = this.displayWidth(sumChunks[0]);
          chunks.forEach((chunk) => {
            const visibleWidth = this.displayWidth(chunk);
            if (sumWidth + visibleWidth <= width) {
              sumChunks.push(chunk);
              sumWidth += visibleWidth;
              return;
            }
            wrappedLines.push(sumChunks.join(""));
            const nextChunk = chunk.trimStart();
            sumChunks = [nextChunk];
            sumWidth = this.displayWidth(nextChunk);
          });
          wrappedLines.push(sumChunks.join(""));
        });
        return wrappedLines.join("\n");
      }
    };
    function stripColor(str) {
      const sgrPattern = /\x1b\[\d*(;\d*)*m/g;
      return str.replace(sgrPattern, "");
    }
    exports2.Help = Help2;
    exports2.stripColor = stripColor;
  }
});

// ../../../.yarn/berry/cache/commander-npm-14.0.0-1e0a7932ab-10c0.zip/node_modules/commander/lib/option.js
var require_option = __commonJS({
  "../../../.yarn/berry/cache/commander-npm-14.0.0-1e0a7932ab-10c0.zip/node_modules/commander/lib/option.js"(exports2) {
    var { InvalidArgumentError: InvalidArgumentError2 } = require_error();
    var Option2 = class {
      /**
       * Initialize a new `Option` with the given `flags` and `description`.
       *
       * @param {string} flags
       * @param {string} [description]
       */
      constructor(flags, description) {
        this.flags = flags;
        this.description = description || "";
        this.required = flags.includes("<");
        this.optional = flags.includes("[");
        this.variadic = /\w\.\.\.[>\]]$/.test(flags);
        this.mandatory = false;
        const optionFlags = splitOptionFlags(flags);
        this.short = optionFlags.shortFlag;
        this.long = optionFlags.longFlag;
        this.negate = false;
        if (this.long) {
          this.negate = this.long.startsWith("--no-");
        }
        this.defaultValue = void 0;
        this.defaultValueDescription = void 0;
        this.presetArg = void 0;
        this.envVar = void 0;
        this.parseArg = void 0;
        this.hidden = false;
        this.argChoices = void 0;
        this.conflictsWith = [];
        this.implied = void 0;
        this.helpGroupHeading = void 0;
      }
      /**
       * Set the default value, and optionally supply the description to be displayed in the help.
       *
       * @param {*} value
       * @param {string} [description]
       * @return {Option}
       */
      default(value, description) {
        this.defaultValue = value;
        this.defaultValueDescription = description;
        return this;
      }
      /**
       * Preset to use when option used without option-argument, especially optional but also boolean and negated.
       * The custom processing (parseArg) is called.
       *
       * @example
       * new Option('--color').default('GREYSCALE').preset('RGB');
       * new Option('--donate [amount]').preset('20').argParser(parseFloat);
       *
       * @param {*} arg
       * @return {Option}
       */
      preset(arg) {
        this.presetArg = arg;
        return this;
      }
      /**
       * Add option name(s) that conflict with this option.
       * An error will be displayed if conflicting options are found during parsing.
       *
       * @example
       * new Option('--rgb').conflicts('cmyk');
       * new Option('--js').conflicts(['ts', 'jsx']);
       *
       * @param {(string | string[])} names
       * @return {Option}
       */
      conflicts(names) {
        this.conflictsWith = this.conflictsWith.concat(names);
        return this;
      }
      /**
       * Specify implied option values for when this option is set and the implied options are not.
       *
       * The custom processing (parseArg) is not called on the implied values.
       *
       * @example
       * program
       *   .addOption(new Option('--log', 'write logging information to file'))
       *   .addOption(new Option('--trace', 'log extra details').implies({ log: 'trace.txt' }));
       *
       * @param {object} impliedOptionValues
       * @return {Option}
       */
      implies(impliedOptionValues) {
        let newImplied = impliedOptionValues;
        if (typeof impliedOptionValues === "string") {
          newImplied = { [impliedOptionValues]: true };
        }
        this.implied = Object.assign(this.implied || {}, newImplied);
        return this;
      }
      /**
       * Set environment variable to check for option value.
       *
       * An environment variable is only used if when processed the current option value is
       * undefined, or the source of the current value is 'default' or 'config' or 'env'.
       *
       * @param {string} name
       * @return {Option}
       */
      env(name) {
        this.envVar = name;
        return this;
      }
      /**
       * Set the custom handler for processing CLI option arguments into option values.
       *
       * @param {Function} [fn]
       * @return {Option}
       */
      argParser(fn) {
        this.parseArg = fn;
        return this;
      }
      /**
       * Whether the option is mandatory and must have a value after parsing.
       *
       * @param {boolean} [mandatory=true]
       * @return {Option}
       */
      makeOptionMandatory(mandatory = true) {
        this.mandatory = !!mandatory;
        return this;
      }
      /**
       * Hide option in help.
       *
       * @param {boolean} [hide=true]
       * @return {Option}
       */
      hideHelp(hide = true) {
        this.hidden = !!hide;
        return this;
      }
      /**
       * @package
       */
      _concatValue(value, previous) {
        if (previous === this.defaultValue || !Array.isArray(previous)) {
          return [value];
        }
        return previous.concat(value);
      }
      /**
       * Only allow option value to be one of choices.
       *
       * @param {string[]} values
       * @return {Option}
       */
      choices(values) {
        this.argChoices = values.slice();
        this.parseArg = (arg, previous) => {
          if (!this.argChoices.includes(arg)) {
            throw new InvalidArgumentError2(
              `Allowed choices are ${this.argChoices.join(", ")}.`
            );
          }
          if (this.variadic) {
            return this._concatValue(arg, previous);
          }
          return arg;
        };
        return this;
      }
      /**
       * Return option name.
       *
       * @return {string}
       */
      name() {
        if (this.long) {
          return this.long.replace(/^--/, "");
        }
        return this.short.replace(/^-/, "");
      }
      /**
       * Return option name, in a camelcase format that can be used
       * as an object attribute key.
       *
       * @return {string}
       */
      attributeName() {
        if (this.negate) {
          return camelcase(this.name().replace(/^no-/, ""));
        }
        return camelcase(this.name());
      }
      /**
       * Set the help group heading.
       *
       * @param {string} heading
       * @return {Option}
       */
      helpGroup(heading) {
        this.helpGroupHeading = heading;
        return this;
      }
      /**
       * Check if `arg` matches the short or long flag.
       *
       * @param {string} arg
       * @return {boolean}
       * @package
       */
      is(arg) {
        return this.short === arg || this.long === arg;
      }
      /**
       * Return whether a boolean option.
       *
       * Options are one of boolean, negated, required argument, or optional argument.
       *
       * @return {boolean}
       * @package
       */
      isBoolean() {
        return !this.required && !this.optional && !this.negate;
      }
    };
    var DualOptions = class {
      /**
       * @param {Option[]} options
       */
      constructor(options) {
        this.positiveOptions = /* @__PURE__ */ new Map();
        this.negativeOptions = /* @__PURE__ */ new Map();
        this.dualOptions = /* @__PURE__ */ new Set();
        options.forEach((option) => {
          if (option.negate) {
            this.negativeOptions.set(option.attributeName(), option);
          } else {
            this.positiveOptions.set(option.attributeName(), option);
          }
        });
        this.negativeOptions.forEach((value, key) => {
          if (this.positiveOptions.has(key)) {
            this.dualOptions.add(key);
          }
        });
      }
      /**
       * Did the value come from the option, and not from possible matching dual option?
       *
       * @param {*} value
       * @param {Option} option
       * @returns {boolean}
       */
      valueFromOption(value, option) {
        const optionKey = option.attributeName();
        if (!this.dualOptions.has(optionKey)) return true;
        const preset = this.negativeOptions.get(optionKey).presetArg;
        const negativeValue = preset !== void 0 ? preset : false;
        return option.negate === (negativeValue === value);
      }
    };
    function camelcase(str) {
      return str.split("-").reduce((str2, word) => {
        return str2 + word[0].toUpperCase() + word.slice(1);
      });
    }
    function splitOptionFlags(flags) {
      let shortFlag;
      let longFlag;
      const shortFlagExp = /^-[^-]$/;
      const longFlagExp = /^--[^-]/;
      const flagParts = flags.split(/[ |,]+/).concat("guard");
      if (shortFlagExp.test(flagParts[0])) shortFlag = flagParts.shift();
      if (longFlagExp.test(flagParts[0])) longFlag = flagParts.shift();
      if (!shortFlag && shortFlagExp.test(flagParts[0]))
        shortFlag = flagParts.shift();
      if (!shortFlag && longFlagExp.test(flagParts[0])) {
        shortFlag = longFlag;
        longFlag = flagParts.shift();
      }
      if (flagParts[0].startsWith("-")) {
        const unsupportedFlag = flagParts[0];
        const baseError = `option creation failed due to '${unsupportedFlag}' in option flags '${flags}'`;
        if (/^-[^-][^-]/.test(unsupportedFlag))
          throw new Error(
            `${baseError}
- a short flag is a single dash and a single character
  - either use a single dash and a single character (for a short flag)
  - or use a double dash for a long option (and can have two, like '--ws, --workspace')`
          );
        if (shortFlagExp.test(unsupportedFlag))
          throw new Error(`${baseError}
- too many short flags`);
        if (longFlagExp.test(unsupportedFlag))
          throw new Error(`${baseError}
- too many long flags`);
        throw new Error(`${baseError}
- unrecognised flag format`);
      }
      if (shortFlag === void 0 && longFlag === void 0)
        throw new Error(
          `option creation failed due to no flags found in '${flags}'.`
        );
      return { shortFlag, longFlag };
    }
    exports2.Option = Option2;
    exports2.DualOptions = DualOptions;
  }
});

// ../../../.yarn/berry/cache/commander-npm-14.0.0-1e0a7932ab-10c0.zip/node_modules/commander/lib/suggestSimilar.js
var require_suggestSimilar = __commonJS({
  "../../../.yarn/berry/cache/commander-npm-14.0.0-1e0a7932ab-10c0.zip/node_modules/commander/lib/suggestSimilar.js"(exports2) {
    var maxDistance = 3;
    function editDistance(a, b) {
      if (Math.abs(a.length - b.length) > maxDistance)
        return Math.max(a.length, b.length);
      const d = [];
      for (let i = 0; i <= a.length; i++) {
        d[i] = [i];
      }
      for (let j = 0; j <= b.length; j++) {
        d[0][j] = j;
      }
      for (let j = 1; j <= b.length; j++) {
        for (let i = 1; i <= a.length; i++) {
          let cost = 1;
          if (a[i - 1] === b[j - 1]) {
            cost = 0;
          } else {
            cost = 1;
          }
          d[i][j] = Math.min(
            d[i - 1][j] + 1,
            // deletion
            d[i][j - 1] + 1,
            // insertion
            d[i - 1][j - 1] + cost
            // substitution
          );
          if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
            d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
          }
        }
      }
      return d[a.length][b.length];
    }
    function suggestSimilar(word, candidates) {
      if (!candidates || candidates.length === 0) return "";
      candidates = Array.from(new Set(candidates));
      const searchingOptions = word.startsWith("--");
      if (searchingOptions) {
        word = word.slice(2);
        candidates = candidates.map((candidate) => candidate.slice(2));
      }
      let similar = [];
      let bestDistance = maxDistance;
      const minSimilarity = 0.4;
      candidates.forEach((candidate) => {
        if (candidate.length <= 1) return;
        const distance = editDistance(word, candidate);
        const length = Math.max(word.length, candidate.length);
        const similarity = (length - distance) / length;
        if (similarity > minSimilarity) {
          if (distance < bestDistance) {
            bestDistance = distance;
            similar = [candidate];
          } else if (distance === bestDistance) {
            similar.push(candidate);
          }
        }
      });
      similar.sort((a, b) => a.localeCompare(b));
      if (searchingOptions) {
        similar = similar.map((candidate) => `--${candidate}`);
      }
      if (similar.length > 1) {
        return `
(Did you mean one of ${similar.join(", ")}?)`;
      }
      if (similar.length === 1) {
        return `
(Did you mean ${similar[0]}?)`;
      }
      return "";
    }
    exports2.suggestSimilar = suggestSimilar;
  }
});

// ../../../.yarn/berry/cache/commander-npm-14.0.0-1e0a7932ab-10c0.zip/node_modules/commander/lib/command.js
var require_command = __commonJS({
  "../../../.yarn/berry/cache/commander-npm-14.0.0-1e0a7932ab-10c0.zip/node_modules/commander/lib/command.js"(exports2) {
    var EventEmitter2 = require("node:events").EventEmitter;
    var childProcess = require("node:child_process");
    var path5 = require("node:path");
    var fs4 = require("node:fs");
    var process3 = require("node:process");
    var { Argument: Argument2, humanReadableArgName } = require_argument();
    var { CommanderError: CommanderError2 } = require_error();
    var { Help: Help2, stripColor } = require_help();
    var { Option: Option2, DualOptions } = require_option();
    var { suggestSimilar } = require_suggestSimilar();
    var Command2 = class _Command extends EventEmitter2 {
      /**
       * Initialize a new `Command`.
       *
       * @param {string} [name]
       */
      constructor(name) {
        super();
        this.commands = [];
        this.options = [];
        this.parent = null;
        this._allowUnknownOption = false;
        this._allowExcessArguments = false;
        this.registeredArguments = [];
        this._args = this.registeredArguments;
        this.args = [];
        this.rawArgs = [];
        this.processedArgs = [];
        this._scriptPath = null;
        this._name = name || "";
        this._optionValues = {};
        this._optionValueSources = {};
        this._storeOptionsAsProperties = false;
        this._actionHandler = null;
        this._executableHandler = false;
        this._executableFile = null;
        this._executableDir = null;
        this._defaultCommandName = null;
        this._exitCallback = null;
        this._aliases = [];
        this._combineFlagAndOptionalValue = true;
        this._description = "";
        this._summary = "";
        this._argsDescription = void 0;
        this._enablePositionalOptions = false;
        this._passThroughOptions = false;
        this._lifeCycleHooks = {};
        this._showHelpAfterError = false;
        this._showSuggestionAfterError = true;
        this._savedState = null;
        this._outputConfiguration = {
          writeOut: (str) => process3.stdout.write(str),
          writeErr: (str) => process3.stderr.write(str),
          outputError: (str, write) => write(str),
          getOutHelpWidth: () => process3.stdout.isTTY ? process3.stdout.columns : void 0,
          getErrHelpWidth: () => process3.stderr.isTTY ? process3.stderr.columns : void 0,
          getOutHasColors: () => useColor() ?? (process3.stdout.isTTY && process3.stdout.hasColors?.()),
          getErrHasColors: () => useColor() ?? (process3.stderr.isTTY && process3.stderr.hasColors?.()),
          stripColor: (str) => stripColor(str)
        };
        this._hidden = false;
        this._helpOption = void 0;
        this._addImplicitHelpCommand = void 0;
        this._helpCommand = void 0;
        this._helpConfiguration = {};
        this._helpGroupHeading = void 0;
        this._defaultCommandGroup = void 0;
        this._defaultOptionGroup = void 0;
      }
      /**
       * Copy settings that are useful to have in common across root command and subcommands.
       *
       * (Used internally when adding a command using `.command()` so subcommands inherit parent settings.)
       *
       * @param {Command} sourceCommand
       * @return {Command} `this` command for chaining
       */
      copyInheritedSettings(sourceCommand) {
        this._outputConfiguration = sourceCommand._outputConfiguration;
        this._helpOption = sourceCommand._helpOption;
        this._helpCommand = sourceCommand._helpCommand;
        this._helpConfiguration = sourceCommand._helpConfiguration;
        this._exitCallback = sourceCommand._exitCallback;
        this._storeOptionsAsProperties = sourceCommand._storeOptionsAsProperties;
        this._combineFlagAndOptionalValue = sourceCommand._combineFlagAndOptionalValue;
        this._allowExcessArguments = sourceCommand._allowExcessArguments;
        this._enablePositionalOptions = sourceCommand._enablePositionalOptions;
        this._showHelpAfterError = sourceCommand._showHelpAfterError;
        this._showSuggestionAfterError = sourceCommand._showSuggestionAfterError;
        return this;
      }
      /**
       * @returns {Command[]}
       * @private
       */
      _getCommandAndAncestors() {
        const result = [];
        for (let command = this; command; command = command.parent) {
          result.push(command);
        }
        return result;
      }
      /**
       * Define a command.
       *
       * There are two styles of command: pay attention to where to put the description.
       *
       * @example
       * // Command implemented using action handler (description is supplied separately to `.command`)
       * program
       *   .command('clone <source> [destination]')
       *   .description('clone a repository into a newly created directory')
       *   .action((source, destination) => {
       *     console.log('clone command called');
       *   });
       *
       * // Command implemented using separate executable file (description is second parameter to `.command`)
       * program
       *   .command('start <service>', 'start named service')
       *   .command('stop [service]', 'stop named service, or all if no name supplied');
       *
       * @param {string} nameAndArgs - command name and arguments, args are `<required>` or `[optional]` and last may also be `variadic...`
       * @param {(object | string)} [actionOptsOrExecDesc] - configuration options (for action), or description (for executable)
       * @param {object} [execOpts] - configuration options (for executable)
       * @return {Command} returns new command for action handler, or `this` for executable command
       */
      command(nameAndArgs, actionOptsOrExecDesc, execOpts) {
        let desc = actionOptsOrExecDesc;
        let opts = execOpts;
        if (typeof desc === "object" && desc !== null) {
          opts = desc;
          desc = null;
        }
        opts = opts || {};
        const [, name, args] = nameAndArgs.match(/([^ ]+) *(.*)/);
        const cmd = this.createCommand(name);
        if (desc) {
          cmd.description(desc);
          cmd._executableHandler = true;
        }
        if (opts.isDefault) this._defaultCommandName = cmd._name;
        cmd._hidden = !!(opts.noHelp || opts.hidden);
        cmd._executableFile = opts.executableFile || null;
        if (args) cmd.arguments(args);
        this._registerCommand(cmd);
        cmd.parent = this;
        cmd.copyInheritedSettings(this);
        if (desc) return this;
        return cmd;
      }
      /**
       * Factory routine to create a new unattached command.
       *
       * See .command() for creating an attached subcommand, which uses this routine to
       * create the command. You can override createCommand to customise subcommands.
       *
       * @param {string} [name]
       * @return {Command} new command
       */
      createCommand(name) {
        return new _Command(name);
      }
      /**
       * You can customise the help with a subclass of Help by overriding createHelp,
       * or by overriding Help properties using configureHelp().
       *
       * @return {Help}
       */
      createHelp() {
        return Object.assign(new Help2(), this.configureHelp());
      }
      /**
       * You can customise the help by overriding Help properties using configureHelp(),
       * or with a subclass of Help by overriding createHelp().
       *
       * @param {object} [configuration] - configuration options
       * @return {(Command | object)} `this` command for chaining, or stored configuration
       */
      configureHelp(configuration) {
        if (configuration === void 0) return this._helpConfiguration;
        this._helpConfiguration = configuration;
        return this;
      }
      /**
       * The default output goes to stdout and stderr. You can customise this for special
       * applications. You can also customise the display of errors by overriding outputError.
       *
       * The configuration properties are all functions:
       *
       *     // change how output being written, defaults to stdout and stderr
       *     writeOut(str)
       *     writeErr(str)
       *     // change how output being written for errors, defaults to writeErr
       *     outputError(str, write) // used for displaying errors and not used for displaying help
       *     // specify width for wrapping help
       *     getOutHelpWidth()
       *     getErrHelpWidth()
       *     // color support, currently only used with Help
       *     getOutHasColors()
       *     getErrHasColors()
       *     stripColor() // used to remove ANSI escape codes if output does not have colors
       *
       * @param {object} [configuration] - configuration options
       * @return {(Command | object)} `this` command for chaining, or stored configuration
       */
      configureOutput(configuration) {
        if (configuration === void 0) return this._outputConfiguration;
        this._outputConfiguration = Object.assign(
          {},
          this._outputConfiguration,
          configuration
        );
        return this;
      }
      /**
       * Display the help or a custom message after an error occurs.
       *
       * @param {(boolean|string)} [displayHelp]
       * @return {Command} `this` command for chaining
       */
      showHelpAfterError(displayHelp = true) {
        if (typeof displayHelp !== "string") displayHelp = !!displayHelp;
        this._showHelpAfterError = displayHelp;
        return this;
      }
      /**
       * Display suggestion of similar commands for unknown commands, or options for unknown options.
       *
       * @param {boolean} [displaySuggestion]
       * @return {Command} `this` command for chaining
       */
      showSuggestionAfterError(displaySuggestion = true) {
        this._showSuggestionAfterError = !!displaySuggestion;
        return this;
      }
      /**
       * Add a prepared subcommand.
       *
       * See .command() for creating an attached subcommand which inherits settings from its parent.
       *
       * @param {Command} cmd - new subcommand
       * @param {object} [opts] - configuration options
       * @return {Command} `this` command for chaining
       */
      addCommand(cmd, opts) {
        if (!cmd._name) {
          throw new Error(`Command passed to .addCommand() must have a name
- specify the name in Command constructor or using .name()`);
        }
        opts = opts || {};
        if (opts.isDefault) this._defaultCommandName = cmd._name;
        if (opts.noHelp || opts.hidden) cmd._hidden = true;
        this._registerCommand(cmd);
        cmd.parent = this;
        cmd._checkForBrokenPassThrough();
        return this;
      }
      /**
       * Factory routine to create a new unattached argument.
       *
       * See .argument() for creating an attached argument, which uses this routine to
       * create the argument. You can override createArgument to return a custom argument.
       *
       * @param {string} name
       * @param {string} [description]
       * @return {Argument} new argument
       */
      createArgument(name, description) {
        return new Argument2(name, description);
      }
      /**
       * Define argument syntax for command.
       *
       * The default is that the argument is required, and you can explicitly
       * indicate this with <> around the name. Put [] around the name for an optional argument.
       *
       * @example
       * program.argument('<input-file>');
       * program.argument('[output-file]');
       *
       * @param {string} name
       * @param {string} [description]
       * @param {(Function|*)} [parseArg] - custom argument processing function or default value
       * @param {*} [defaultValue]
       * @return {Command} `this` command for chaining
       */
      argument(name, description, parseArg, defaultValue) {
        const argument = this.createArgument(name, description);
        if (typeof parseArg === "function") {
          argument.default(defaultValue).argParser(parseArg);
        } else {
          argument.default(parseArg);
        }
        this.addArgument(argument);
        return this;
      }
      /**
       * Define argument syntax for command, adding multiple at once (without descriptions).
       *
       * See also .argument().
       *
       * @example
       * program.arguments('<cmd> [env]');
       *
       * @param {string} names
       * @return {Command} `this` command for chaining
       */
      arguments(names) {
        names.trim().split(/ +/).forEach((detail) => {
          this.argument(detail);
        });
        return this;
      }
      /**
       * Define argument syntax for command, adding a prepared argument.
       *
       * @param {Argument} argument
       * @return {Command} `this` command for chaining
       */
      addArgument(argument) {
        const previousArgument = this.registeredArguments.slice(-1)[0];
        if (previousArgument && previousArgument.variadic) {
          throw new Error(
            `only the last argument can be variadic '${previousArgument.name()}'`
          );
        }
        if (argument.required && argument.defaultValue !== void 0 && argument.parseArg === void 0) {
          throw new Error(
            `a default value for a required argument is never used: '${argument.name()}'`
          );
        }
        this.registeredArguments.push(argument);
        return this;
      }
      /**
       * Customise or override default help command. By default a help command is automatically added if your command has subcommands.
       *
       * @example
       *    program.helpCommand('help [cmd]');
       *    program.helpCommand('help [cmd]', 'show help');
       *    program.helpCommand(false); // suppress default help command
       *    program.helpCommand(true); // add help command even if no subcommands
       *
       * @param {string|boolean} enableOrNameAndArgs - enable with custom name and/or arguments, or boolean to override whether added
       * @param {string} [description] - custom description
       * @return {Command} `this` command for chaining
       */
      helpCommand(enableOrNameAndArgs, description) {
        if (typeof enableOrNameAndArgs === "boolean") {
          this._addImplicitHelpCommand = enableOrNameAndArgs;
          if (enableOrNameAndArgs && this._defaultCommandGroup) {
            this._initCommandGroup(this._getHelpCommand());
          }
          return this;
        }
        const nameAndArgs = enableOrNameAndArgs ?? "help [command]";
        const [, helpName, helpArgs] = nameAndArgs.match(/([^ ]+) *(.*)/);
        const helpDescription = description ?? "display help for command";
        const helpCommand = this.createCommand(helpName);
        helpCommand.helpOption(false);
        if (helpArgs) helpCommand.arguments(helpArgs);
        if (helpDescription) helpCommand.description(helpDescription);
        this._addImplicitHelpCommand = true;
        this._helpCommand = helpCommand;
        if (enableOrNameAndArgs || description) this._initCommandGroup(helpCommand);
        return this;
      }
      /**
       * Add prepared custom help command.
       *
       * @param {(Command|string|boolean)} helpCommand - custom help command, or deprecated enableOrNameAndArgs as for `.helpCommand()`
       * @param {string} [deprecatedDescription] - deprecated custom description used with custom name only
       * @return {Command} `this` command for chaining
       */
      addHelpCommand(helpCommand, deprecatedDescription) {
        if (typeof helpCommand !== "object") {
          this.helpCommand(helpCommand, deprecatedDescription);
          return this;
        }
        this._addImplicitHelpCommand = true;
        this._helpCommand = helpCommand;
        this._initCommandGroup(helpCommand);
        return this;
      }
      /**
       * Lazy create help command.
       *
       * @return {(Command|null)}
       * @package
       */
      _getHelpCommand() {
        const hasImplicitHelpCommand = this._addImplicitHelpCommand ?? (this.commands.length && !this._actionHandler && !this._findCommand("help"));
        if (hasImplicitHelpCommand) {
          if (this._helpCommand === void 0) {
            this.helpCommand(void 0, void 0);
          }
          return this._helpCommand;
        }
        return null;
      }
      /**
       * Add hook for life cycle event.
       *
       * @param {string} event
       * @param {Function} listener
       * @return {Command} `this` command for chaining
       */
      hook(event, listener) {
        const allowedValues = ["preSubcommand", "preAction", "postAction"];
        if (!allowedValues.includes(event)) {
          throw new Error(`Unexpected value for event passed to hook : '${event}'.
Expecting one of '${allowedValues.join("', '")}'`);
        }
        if (this._lifeCycleHooks[event]) {
          this._lifeCycleHooks[event].push(listener);
        } else {
          this._lifeCycleHooks[event] = [listener];
        }
        return this;
      }
      /**
       * Register callback to use as replacement for calling process.exit.
       *
       * @param {Function} [fn] optional callback which will be passed a CommanderError, defaults to throwing
       * @return {Command} `this` command for chaining
       */
      exitOverride(fn) {
        if (fn) {
          this._exitCallback = fn;
        } else {
          this._exitCallback = (err) => {
            if (err.code !== "commander.executeSubCommandAsync") {
              throw err;
            } else {
            }
          };
        }
        return this;
      }
      /**
       * Call process.exit, and _exitCallback if defined.
       *
       * @param {number} exitCode exit code for using with process.exit
       * @param {string} code an id string representing the error
       * @param {string} message human-readable description of the error
       * @return never
       * @private
       */
      _exit(exitCode, code, message) {
        if (this._exitCallback) {
          this._exitCallback(new CommanderError2(exitCode, code, message));
        }
        process3.exit(exitCode);
      }
      /**
       * Register callback `fn` for the command.
       *
       * @example
       * program
       *   .command('serve')
       *   .description('start service')
       *   .action(function() {
       *      // do work here
       *   });
       *
       * @param {Function} fn
       * @return {Command} `this` command for chaining
       */
      action(fn) {
        const listener = (args) => {
          const expectedArgsCount = this.registeredArguments.length;
          const actionArgs = args.slice(0, expectedArgsCount);
          if (this._storeOptionsAsProperties) {
            actionArgs[expectedArgsCount] = this;
          } else {
            actionArgs[expectedArgsCount] = this.opts();
          }
          actionArgs.push(this);
          return fn.apply(this, actionArgs);
        };
        this._actionHandler = listener;
        return this;
      }
      /**
       * Factory routine to create a new unattached option.
       *
       * See .option() for creating an attached option, which uses this routine to
       * create the option. You can override createOption to return a custom option.
       *
       * @param {string} flags
       * @param {string} [description]
       * @return {Option} new option
       */
      createOption(flags, description) {
        return new Option2(flags, description);
      }
      /**
       * Wrap parseArgs to catch 'commander.invalidArgument'.
       *
       * @param {(Option | Argument)} target
       * @param {string} value
       * @param {*} previous
       * @param {string} invalidArgumentMessage
       * @private
       */
      _callParseArg(target, value, previous, invalidArgumentMessage) {
        try {
          return target.parseArg(value, previous);
        } catch (err) {
          if (err.code === "commander.invalidArgument") {
            const message = `${invalidArgumentMessage} ${err.message}`;
            this.error(message, { exitCode: err.exitCode, code: err.code });
          }
          throw err;
        }
      }
      /**
       * Check for option flag conflicts.
       * Register option if no conflicts found, or throw on conflict.
       *
       * @param {Option} option
       * @private
       */
      _registerOption(option) {
        const matchingOption = option.short && this._findOption(option.short) || option.long && this._findOption(option.long);
        if (matchingOption) {
          const matchingFlag = option.long && this._findOption(option.long) ? option.long : option.short;
          throw new Error(`Cannot add option '${option.flags}'${this._name && ` to command '${this._name}'`} due to conflicting flag '${matchingFlag}'
-  already used by option '${matchingOption.flags}'`);
        }
        this._initOptionGroup(option);
        this.options.push(option);
      }
      /**
       * Check for command name and alias conflicts with existing commands.
       * Register command if no conflicts found, or throw on conflict.
       *
       * @param {Command} command
       * @private
       */
      _registerCommand(command) {
        const knownBy = (cmd) => {
          return [cmd.name()].concat(cmd.aliases());
        };
        const alreadyUsed = knownBy(command).find(
          (name) => this._findCommand(name)
        );
        if (alreadyUsed) {
          const existingCmd = knownBy(this._findCommand(alreadyUsed)).join("|");
          const newCmd = knownBy(command).join("|");
          throw new Error(
            `cannot add command '${newCmd}' as already have command '${existingCmd}'`
          );
        }
        this._initCommandGroup(command);
        this.commands.push(command);
      }
      /**
       * Add an option.
       *
       * @param {Option} option
       * @return {Command} `this` command for chaining
       */
      addOption(option) {
        this._registerOption(option);
        const oname = option.name();
        const name = option.attributeName();
        if (option.negate) {
          const positiveLongFlag = option.long.replace(/^--no-/, "--");
          if (!this._findOption(positiveLongFlag)) {
            this.setOptionValueWithSource(
              name,
              option.defaultValue === void 0 ? true : option.defaultValue,
              "default"
            );
          }
        } else if (option.defaultValue !== void 0) {
          this.setOptionValueWithSource(name, option.defaultValue, "default");
        }
        const handleOptionValue = (val, invalidValueMessage, valueSource) => {
          if (val == null && option.presetArg !== void 0) {
            val = option.presetArg;
          }
          const oldValue = this.getOptionValue(name);
          if (val !== null && option.parseArg) {
            val = this._callParseArg(option, val, oldValue, invalidValueMessage);
          } else if (val !== null && option.variadic) {
            val = option._concatValue(val, oldValue);
          }
          if (val == null) {
            if (option.negate) {
              val = false;
            } else if (option.isBoolean() || option.optional) {
              val = true;
            } else {
              val = "";
            }
          }
          this.setOptionValueWithSource(name, val, valueSource);
        };
        this.on("option:" + oname, (val) => {
          const invalidValueMessage = `error: option '${option.flags}' argument '${val}' is invalid.`;
          handleOptionValue(val, invalidValueMessage, "cli");
        });
        if (option.envVar) {
          this.on("optionEnv:" + oname, (val) => {
            const invalidValueMessage = `error: option '${option.flags}' value '${val}' from env '${option.envVar}' is invalid.`;
            handleOptionValue(val, invalidValueMessage, "env");
          });
        }
        return this;
      }
      /**
       * Internal implementation shared by .option() and .requiredOption()
       *
       * @return {Command} `this` command for chaining
       * @private
       */
      _optionEx(config, flags, description, fn, defaultValue) {
        if (typeof flags === "object" && flags instanceof Option2) {
          throw new Error(
            "To add an Option object use addOption() instead of option() or requiredOption()"
          );
        }
        const option = this.createOption(flags, description);
        option.makeOptionMandatory(!!config.mandatory);
        if (typeof fn === "function") {
          option.default(defaultValue).argParser(fn);
        } else if (fn instanceof RegExp) {
          const regex = fn;
          fn = (val, def) => {
            const m = regex.exec(val);
            return m ? m[0] : def;
          };
          option.default(defaultValue).argParser(fn);
        } else {
          option.default(fn);
        }
        return this.addOption(option);
      }
      /**
       * Define option with `flags`, `description`, and optional argument parsing function or `defaultValue` or both.
       *
       * The `flags` string contains the short and/or long flags, separated by comma, a pipe or space. A required
       * option-argument is indicated by `<>` and an optional option-argument by `[]`.
       *
       * See the README for more details, and see also addOption() and requiredOption().
       *
       * @example
       * program
       *     .option('-p, --pepper', 'add pepper')
       *     .option('--pt, --pizza-type <TYPE>', 'type of pizza') // required option-argument
       *     .option('-c, --cheese [CHEESE]', 'add extra cheese', 'mozzarella') // optional option-argument with default
       *     .option('-t, --tip <VALUE>', 'add tip to purchase cost', parseFloat) // custom parse function
       *
       * @param {string} flags
       * @param {string} [description]
       * @param {(Function|*)} [parseArg] - custom option processing function or default value
       * @param {*} [defaultValue]
       * @return {Command} `this` command for chaining
       */
      option(flags, description, parseArg, defaultValue) {
        return this._optionEx({}, flags, description, parseArg, defaultValue);
      }
      /**
       * Add a required option which must have a value after parsing. This usually means
       * the option must be specified on the command line. (Otherwise the same as .option().)
       *
       * The `flags` string contains the short and/or long flags, separated by comma, a pipe or space.
       *
       * @param {string} flags
       * @param {string} [description]
       * @param {(Function|*)} [parseArg] - custom option processing function or default value
       * @param {*} [defaultValue]
       * @return {Command} `this` command for chaining
       */
      requiredOption(flags, description, parseArg, defaultValue) {
        return this._optionEx(
          { mandatory: true },
          flags,
          description,
          parseArg,
          defaultValue
        );
      }
      /**
       * Alter parsing of short flags with optional values.
       *
       * @example
       * // for `.option('-f,--flag [value]'):
       * program.combineFlagAndOptionalValue(true);  // `-f80` is treated like `--flag=80`, this is the default behaviour
       * program.combineFlagAndOptionalValue(false) // `-fb` is treated like `-f -b`
       *
       * @param {boolean} [combine] - if `true` or omitted, an optional value can be specified directly after the flag.
       * @return {Command} `this` command for chaining
       */
      combineFlagAndOptionalValue(combine = true) {
        this._combineFlagAndOptionalValue = !!combine;
        return this;
      }
      /**
       * Allow unknown options on the command line.
       *
       * @param {boolean} [allowUnknown] - if `true` or omitted, no error will be thrown for unknown options.
       * @return {Command} `this` command for chaining
       */
      allowUnknownOption(allowUnknown = true) {
        this._allowUnknownOption = !!allowUnknown;
        return this;
      }
      /**
       * Allow excess command-arguments on the command line. Pass false to make excess arguments an error.
       *
       * @param {boolean} [allowExcess] - if `true` or omitted, no error will be thrown for excess arguments.
       * @return {Command} `this` command for chaining
       */
      allowExcessArguments(allowExcess = true) {
        this._allowExcessArguments = !!allowExcess;
        return this;
      }
      /**
       * Enable positional options. Positional means global options are specified before subcommands which lets
       * subcommands reuse the same option names, and also enables subcommands to turn on passThroughOptions.
       * The default behaviour is non-positional and global options may appear anywhere on the command line.
       *
       * @param {boolean} [positional]
       * @return {Command} `this` command for chaining
       */
      enablePositionalOptions(positional = true) {
        this._enablePositionalOptions = !!positional;
        return this;
      }
      /**
       * Pass through options that come after command-arguments rather than treat them as command-options,
       * so actual command-options come before command-arguments. Turning this on for a subcommand requires
       * positional options to have been enabled on the program (parent commands).
       * The default behaviour is non-positional and options may appear before or after command-arguments.
       *
       * @param {boolean} [passThrough] for unknown options.
       * @return {Command} `this` command for chaining
       */
      passThroughOptions(passThrough = true) {
        this._passThroughOptions = !!passThrough;
        this._checkForBrokenPassThrough();
        return this;
      }
      /**
       * @private
       */
      _checkForBrokenPassThrough() {
        if (this.parent && this._passThroughOptions && !this.parent._enablePositionalOptions) {
          throw new Error(
            `passThroughOptions cannot be used for '${this._name}' without turning on enablePositionalOptions for parent command(s)`
          );
        }
      }
      /**
       * Whether to store option values as properties on command object,
       * or store separately (specify false). In both cases the option values can be accessed using .opts().
       *
       * @param {boolean} [storeAsProperties=true]
       * @return {Command} `this` command for chaining
       */
      storeOptionsAsProperties(storeAsProperties = true) {
        if (this.options.length) {
          throw new Error("call .storeOptionsAsProperties() before adding options");
        }
        if (Object.keys(this._optionValues).length) {
          throw new Error(
            "call .storeOptionsAsProperties() before setting option values"
          );
        }
        this._storeOptionsAsProperties = !!storeAsProperties;
        return this;
      }
      /**
       * Retrieve option value.
       *
       * @param {string} key
       * @return {object} value
       */
      getOptionValue(key) {
        if (this._storeOptionsAsProperties) {
          return this[key];
        }
        return this._optionValues[key];
      }
      /**
       * Store option value.
       *
       * @param {string} key
       * @param {object} value
       * @return {Command} `this` command for chaining
       */
      setOptionValue(key, value) {
        return this.setOptionValueWithSource(key, value, void 0);
      }
      /**
       * Store option value and where the value came from.
       *
       * @param {string} key
       * @param {object} value
       * @param {string} source - expected values are default/config/env/cli/implied
       * @return {Command} `this` command for chaining
       */
      setOptionValueWithSource(key, value, source) {
        if (this._storeOptionsAsProperties) {
          this[key] = value;
        } else {
          this._optionValues[key] = value;
        }
        this._optionValueSources[key] = source;
        return this;
      }
      /**
       * Get source of option value.
       * Expected values are default | config | env | cli | implied
       *
       * @param {string} key
       * @return {string}
       */
      getOptionValueSource(key) {
        return this._optionValueSources[key];
      }
      /**
       * Get source of option value. See also .optsWithGlobals().
       * Expected values are default | config | env | cli | implied
       *
       * @param {string} key
       * @return {string}
       */
      getOptionValueSourceWithGlobals(key) {
        let source;
        this._getCommandAndAncestors().forEach((cmd) => {
          if (cmd.getOptionValueSource(key) !== void 0) {
            source = cmd.getOptionValueSource(key);
          }
        });
        return source;
      }
      /**
       * Get user arguments from implied or explicit arguments.
       * Side-effects: set _scriptPath if args included script. Used for default program name, and subcommand searches.
       *
       * @private
       */
      _prepareUserArgs(argv, parseOptions) {
        if (argv !== void 0 && !Array.isArray(argv)) {
          throw new Error("first parameter to parse must be array or undefined");
        }
        parseOptions = parseOptions || {};
        if (argv === void 0 && parseOptions.from === void 0) {
          if (process3.versions?.electron) {
            parseOptions.from = "electron";
          }
          const execArgv = process3.execArgv ?? [];
          if (execArgv.includes("-e") || execArgv.includes("--eval") || execArgv.includes("-p") || execArgv.includes("--print")) {
            parseOptions.from = "eval";
          }
        }
        if (argv === void 0) {
          argv = process3.argv;
        }
        this.rawArgs = argv.slice();
        let userArgs;
        switch (parseOptions.from) {
          case void 0:
          case "node":
            this._scriptPath = argv[1];
            userArgs = argv.slice(2);
            break;
          case "electron":
            if (process3.defaultApp) {
              this._scriptPath = argv[1];
              userArgs = argv.slice(2);
            } else {
              userArgs = argv.slice(1);
            }
            break;
          case "user":
            userArgs = argv.slice(0);
            break;
          case "eval":
            userArgs = argv.slice(1);
            break;
          default:
            throw new Error(
              `unexpected parse option { from: '${parseOptions.from}' }`
            );
        }
        if (!this._name && this._scriptPath)
          this.nameFromFilename(this._scriptPath);
        this._name = this._name || "program";
        return userArgs;
      }
      /**
       * Parse `argv`, setting options and invoking commands when defined.
       *
       * Use parseAsync instead of parse if any of your action handlers are async.
       *
       * Call with no parameters to parse `process.argv`. Detects Electron and special node options like `node --eval`. Easy mode!
       *
       * Or call with an array of strings to parse, and optionally where the user arguments start by specifying where the arguments are `from`:
       * - `'node'`: default, `argv[0]` is the application and `argv[1]` is the script being run, with user arguments after that
       * - `'electron'`: `argv[0]` is the application and `argv[1]` varies depending on whether the electron application is packaged
       * - `'user'`: just user arguments
       *
       * @example
       * program.parse(); // parse process.argv and auto-detect electron and special node flags
       * program.parse(process.argv); // assume argv[0] is app and argv[1] is script
       * program.parse(my-args, { from: 'user' }); // just user supplied arguments, nothing special about argv[0]
       *
       * @param {string[]} [argv] - optional, defaults to process.argv
       * @param {object} [parseOptions] - optionally specify style of options with from: node/user/electron
       * @param {string} [parseOptions.from] - where the args are from: 'node', 'user', 'electron'
       * @return {Command} `this` command for chaining
       */
      parse(argv, parseOptions) {
        this._prepareForParse();
        const userArgs = this._prepareUserArgs(argv, parseOptions);
        this._parseCommand([], userArgs);
        return this;
      }
      /**
       * Parse `argv`, setting options and invoking commands when defined.
       *
       * Call with no parameters to parse `process.argv`. Detects Electron and special node options like `node --eval`. Easy mode!
       *
       * Or call with an array of strings to parse, and optionally where the user arguments start by specifying where the arguments are `from`:
       * - `'node'`: default, `argv[0]` is the application and `argv[1]` is the script being run, with user arguments after that
       * - `'electron'`: `argv[0]` is the application and `argv[1]` varies depending on whether the electron application is packaged
       * - `'user'`: just user arguments
       *
       * @example
       * await program.parseAsync(); // parse process.argv and auto-detect electron and special node flags
       * await program.parseAsync(process.argv); // assume argv[0] is app and argv[1] is script
       * await program.parseAsync(my-args, { from: 'user' }); // just user supplied arguments, nothing special about argv[0]
       *
       * @param {string[]} [argv]
       * @param {object} [parseOptions]
       * @param {string} parseOptions.from - where the args are from: 'node', 'user', 'electron'
       * @return {Promise}
       */
      async parseAsync(argv, parseOptions) {
        this._prepareForParse();
        const userArgs = this._prepareUserArgs(argv, parseOptions);
        await this._parseCommand([], userArgs);
        return this;
      }
      _prepareForParse() {
        if (this._savedState === null) {
          this.saveStateBeforeParse();
        } else {
          this.restoreStateBeforeParse();
        }
      }
      /**
       * Called the first time parse is called to save state and allow a restore before subsequent calls to parse.
       * Not usually called directly, but available for subclasses to save their custom state.
       *
       * This is called in a lazy way. Only commands used in parsing chain will have state saved.
       */
      saveStateBeforeParse() {
        this._savedState = {
          // name is stable if supplied by author, but may be unspecified for root command and deduced during parsing
          _name: this._name,
          // option values before parse have default values (including false for negated options)
          // shallow clones
          _optionValues: { ...this._optionValues },
          _optionValueSources: { ...this._optionValueSources }
        };
      }
      /**
       * Restore state before parse for calls after the first.
       * Not usually called directly, but available for subclasses to save their custom state.
       *
       * This is called in a lazy way. Only commands used in parsing chain will have state restored.
       */
      restoreStateBeforeParse() {
        if (this._storeOptionsAsProperties)
          throw new Error(`Can not call parse again when storeOptionsAsProperties is true.
- either make a new Command for each call to parse, or stop storing options as properties`);
        this._name = this._savedState._name;
        this._scriptPath = null;
        this.rawArgs = [];
        this._optionValues = { ...this._savedState._optionValues };
        this._optionValueSources = { ...this._savedState._optionValueSources };
        this.args = [];
        this.processedArgs = [];
      }
      /**
       * Throw if expected executable is missing. Add lots of help for author.
       *
       * @param {string} executableFile
       * @param {string} executableDir
       * @param {string} subcommandName
       */
      _checkForMissingExecutable(executableFile, executableDir, subcommandName) {
        if (fs4.existsSync(executableFile)) return;
        const executableDirMessage = executableDir ? `searched for local subcommand relative to directory '${executableDir}'` : "no directory for search for local subcommand, use .executableDir() to supply a custom directory";
        const executableMissing = `'${executableFile}' does not exist
 - if '${subcommandName}' is not meant to be an executable command, remove description parameter from '.command()' and use '.description()' instead
 - if the default executable name is not suitable, use the executableFile option to supply a custom name or path
 - ${executableDirMessage}`;
        throw new Error(executableMissing);
      }
      /**
       * Execute a sub-command executable.
       *
       * @private
       */
      _executeSubCommand(subcommand, args) {
        args = args.slice();
        let launchWithNode = false;
        const sourceExt = [".js", ".ts", ".tsx", ".mjs", ".cjs"];
        function findFile(baseDir, baseName) {
          const localBin = path5.resolve(baseDir, baseName);
          if (fs4.existsSync(localBin)) return localBin;
          if (sourceExt.includes(path5.extname(baseName))) return void 0;
          const foundExt = sourceExt.find(
            (ext2) => fs4.existsSync(`${localBin}${ext2}`)
          );
          if (foundExt) return `${localBin}${foundExt}`;
          return void 0;
        }
        this._checkForMissingMandatoryOptions();
        this._checkForConflictingOptions();
        let executableFile = subcommand._executableFile || `${this._name}-${subcommand._name}`;
        let executableDir = this._executableDir || "";
        if (this._scriptPath) {
          let resolvedScriptPath;
          try {
            resolvedScriptPath = fs4.realpathSync(this._scriptPath);
          } catch {
            resolvedScriptPath = this._scriptPath;
          }
          executableDir = path5.resolve(
            path5.dirname(resolvedScriptPath),
            executableDir
          );
        }
        if (executableDir) {
          let localFile = findFile(executableDir, executableFile);
          if (!localFile && !subcommand._executableFile && this._scriptPath) {
            const legacyName = path5.basename(
              this._scriptPath,
              path5.extname(this._scriptPath)
            );
            if (legacyName !== this._name) {
              localFile = findFile(
                executableDir,
                `${legacyName}-${subcommand._name}`
              );
            }
          }
          executableFile = localFile || executableFile;
        }
        launchWithNode = sourceExt.includes(path5.extname(executableFile));
        let proc2;
        if (process3.platform !== "win32") {
          if (launchWithNode) {
            args.unshift(executableFile);
            args = incrementNodeInspectorPort(process3.execArgv).concat(args);
            proc2 = childProcess.spawn(process3.argv[0], args, { stdio: "inherit" });
          } else {
            proc2 = childProcess.spawn(executableFile, args, { stdio: "inherit" });
          }
        } else {
          this._checkForMissingExecutable(
            executableFile,
            executableDir,
            subcommand._name
          );
          args.unshift(executableFile);
          args = incrementNodeInspectorPort(process3.execArgv).concat(args);
          proc2 = childProcess.spawn(process3.execPath, args, { stdio: "inherit" });
        }
        if (!proc2.killed) {
          const signals = ["SIGUSR1", "SIGUSR2", "SIGTERM", "SIGINT", "SIGHUP"];
          signals.forEach((signal) => {
            process3.on(signal, () => {
              if (proc2.killed === false && proc2.exitCode === null) {
                proc2.kill(signal);
              }
            });
          });
        }
        const exitCallback = this._exitCallback;
        proc2.on("close", (code) => {
          code = code ?? 1;
          if (!exitCallback) {
            process3.exit(code);
          } else {
            exitCallback(
              new CommanderError2(
                code,
                "commander.executeSubCommandAsync",
                "(close)"
              )
            );
          }
        });
        proc2.on("error", (err) => {
          if (err.code === "ENOENT") {
            this._checkForMissingExecutable(
              executableFile,
              executableDir,
              subcommand._name
            );
          } else if (err.code === "EACCES") {
            throw new Error(`'${executableFile}' not executable`);
          }
          if (!exitCallback) {
            process3.exit(1);
          } else {
            const wrappedError = new CommanderError2(
              1,
              "commander.executeSubCommandAsync",
              "(error)"
            );
            wrappedError.nestedError = err;
            exitCallback(wrappedError);
          }
        });
        this.runningCommand = proc2;
      }
      /**
       * @private
       */
      _dispatchSubcommand(commandName, operands, unknown) {
        const subCommand = this._findCommand(commandName);
        if (!subCommand) this.help({ error: true });
        subCommand._prepareForParse();
        let promiseChain;
        promiseChain = this._chainOrCallSubCommandHook(
          promiseChain,
          subCommand,
          "preSubcommand"
        );
        promiseChain = this._chainOrCall(promiseChain, () => {
          if (subCommand._executableHandler) {
            this._executeSubCommand(subCommand, operands.concat(unknown));
          } else {
            return subCommand._parseCommand(operands, unknown);
          }
        });
        return promiseChain;
      }
      /**
       * Invoke help directly if possible, or dispatch if necessary.
       * e.g. help foo
       *
       * @private
       */
      _dispatchHelpCommand(subcommandName) {
        if (!subcommandName) {
          this.help();
        }
        const subCommand = this._findCommand(subcommandName);
        if (subCommand && !subCommand._executableHandler) {
          subCommand.help();
        }
        return this._dispatchSubcommand(
          subcommandName,
          [],
          [this._getHelpOption()?.long ?? this._getHelpOption()?.short ?? "--help"]
        );
      }
      /**
       * Check this.args against expected this.registeredArguments.
       *
       * @private
       */
      _checkNumberOfArguments() {
        this.registeredArguments.forEach((arg, i) => {
          if (arg.required && this.args[i] == null) {
            this.missingArgument(arg.name());
          }
        });
        if (this.registeredArguments.length > 0 && this.registeredArguments[this.registeredArguments.length - 1].variadic) {
          return;
        }
        if (this.args.length > this.registeredArguments.length) {
          this._excessArguments(this.args);
        }
      }
      /**
       * Process this.args using this.registeredArguments and save as this.processedArgs!
       *
       * @private
       */
      _processArguments() {
        const myParseArg = (argument, value, previous) => {
          let parsedValue = value;
          if (value !== null && argument.parseArg) {
            const invalidValueMessage = `error: command-argument value '${value}' is invalid for argument '${argument.name()}'.`;
            parsedValue = this._callParseArg(
              argument,
              value,
              previous,
              invalidValueMessage
            );
          }
          return parsedValue;
        };
        this._checkNumberOfArguments();
        const processedArgs = [];
        this.registeredArguments.forEach((declaredArg, index) => {
          let value = declaredArg.defaultValue;
          if (declaredArg.variadic) {
            if (index < this.args.length) {
              value = this.args.slice(index);
              if (declaredArg.parseArg) {
                value = value.reduce((processed, v) => {
                  return myParseArg(declaredArg, v, processed);
                }, declaredArg.defaultValue);
              }
            } else if (value === void 0) {
              value = [];
            }
          } else if (index < this.args.length) {
            value = this.args[index];
            if (declaredArg.parseArg) {
              value = myParseArg(declaredArg, value, declaredArg.defaultValue);
            }
          }
          processedArgs[index] = value;
        });
        this.processedArgs = processedArgs;
      }
      /**
       * Once we have a promise we chain, but call synchronously until then.
       *
       * @param {(Promise|undefined)} promise
       * @param {Function} fn
       * @return {(Promise|undefined)}
       * @private
       */
      _chainOrCall(promise, fn) {
        if (promise && promise.then && typeof promise.then === "function") {
          return promise.then(() => fn());
        }
        return fn();
      }
      /**
       *
       * @param {(Promise|undefined)} promise
       * @param {string} event
       * @return {(Promise|undefined)}
       * @private
       */
      _chainOrCallHooks(promise, event) {
        let result = promise;
        const hooks = [];
        this._getCommandAndAncestors().reverse().filter((cmd) => cmd._lifeCycleHooks[event] !== void 0).forEach((hookedCommand) => {
          hookedCommand._lifeCycleHooks[event].forEach((callback) => {
            hooks.push({ hookedCommand, callback });
          });
        });
        if (event === "postAction") {
          hooks.reverse();
        }
        hooks.forEach((hookDetail) => {
          result = this._chainOrCall(result, () => {
            return hookDetail.callback(hookDetail.hookedCommand, this);
          });
        });
        return result;
      }
      /**
       *
       * @param {(Promise|undefined)} promise
       * @param {Command} subCommand
       * @param {string} event
       * @return {(Promise|undefined)}
       * @private
       */
      _chainOrCallSubCommandHook(promise, subCommand, event) {
        let result = promise;
        if (this._lifeCycleHooks[event] !== void 0) {
          this._lifeCycleHooks[event].forEach((hook) => {
            result = this._chainOrCall(result, () => {
              return hook(this, subCommand);
            });
          });
        }
        return result;
      }
      /**
       * Process arguments in context of this command.
       * Returns action result, in case it is a promise.
       *
       * @private
       */
      _parseCommand(operands, unknown) {
        const parsed = this.parseOptions(unknown);
        this._parseOptionsEnv();
        this._parseOptionsImplied();
        operands = operands.concat(parsed.operands);
        unknown = parsed.unknown;
        this.args = operands.concat(unknown);
        if (operands && this._findCommand(operands[0])) {
          return this._dispatchSubcommand(operands[0], operands.slice(1), unknown);
        }
        if (this._getHelpCommand() && operands[0] === this._getHelpCommand().name()) {
          return this._dispatchHelpCommand(operands[1]);
        }
        if (this._defaultCommandName) {
          this._outputHelpIfRequested(unknown);
          return this._dispatchSubcommand(
            this._defaultCommandName,
            operands,
            unknown
          );
        }
        if (this.commands.length && this.args.length === 0 && !this._actionHandler && !this._defaultCommandName) {
          this.help({ error: true });
        }
        this._outputHelpIfRequested(parsed.unknown);
        this._checkForMissingMandatoryOptions();
        this._checkForConflictingOptions();
        const checkForUnknownOptions = () => {
          if (parsed.unknown.length > 0) {
            this.unknownOption(parsed.unknown[0]);
          }
        };
        const commandEvent = `command:${this.name()}`;
        if (this._actionHandler) {
          checkForUnknownOptions();
          this._processArguments();
          let promiseChain;
          promiseChain = this._chainOrCallHooks(promiseChain, "preAction");
          promiseChain = this._chainOrCall(
            promiseChain,
            () => this._actionHandler(this.processedArgs)
          );
          if (this.parent) {
            promiseChain = this._chainOrCall(promiseChain, () => {
              this.parent.emit(commandEvent, operands, unknown);
            });
          }
          promiseChain = this._chainOrCallHooks(promiseChain, "postAction");
          return promiseChain;
        }
        if (this.parent && this.parent.listenerCount(commandEvent)) {
          checkForUnknownOptions();
          this._processArguments();
          this.parent.emit(commandEvent, operands, unknown);
        } else if (operands.length) {
          if (this._findCommand("*")) {
            return this._dispatchSubcommand("*", operands, unknown);
          }
          if (this.listenerCount("command:*")) {
            this.emit("command:*", operands, unknown);
          } else if (this.commands.length) {
            this.unknownCommand();
          } else {
            checkForUnknownOptions();
            this._processArguments();
          }
        } else if (this.commands.length) {
          checkForUnknownOptions();
          this.help({ error: true });
        } else {
          checkForUnknownOptions();
          this._processArguments();
        }
      }
      /**
       * Find matching command.
       *
       * @private
       * @return {Command | undefined}
       */
      _findCommand(name) {
        if (!name) return void 0;
        return this.commands.find(
          (cmd) => cmd._name === name || cmd._aliases.includes(name)
        );
      }
      /**
       * Return an option matching `arg` if any.
       *
       * @param {string} arg
       * @return {Option}
       * @package
       */
      _findOption(arg) {
        return this.options.find((option) => option.is(arg));
      }
      /**
       * Display an error message if a mandatory option does not have a value.
       * Called after checking for help flags in leaf subcommand.
       *
       * @private
       */
      _checkForMissingMandatoryOptions() {
        this._getCommandAndAncestors().forEach((cmd) => {
          cmd.options.forEach((anOption) => {
            if (anOption.mandatory && cmd.getOptionValue(anOption.attributeName()) === void 0) {
              cmd.missingMandatoryOptionValue(anOption);
            }
          });
        });
      }
      /**
       * Display an error message if conflicting options are used together in this.
       *
       * @private
       */
      _checkForConflictingLocalOptions() {
        const definedNonDefaultOptions = this.options.filter((option) => {
          const optionKey = option.attributeName();
          if (this.getOptionValue(optionKey) === void 0) {
            return false;
          }
          return this.getOptionValueSource(optionKey) !== "default";
        });
        const optionsWithConflicting = definedNonDefaultOptions.filter(
          (option) => option.conflictsWith.length > 0
        );
        optionsWithConflicting.forEach((option) => {
          const conflictingAndDefined = definedNonDefaultOptions.find(
            (defined) => option.conflictsWith.includes(defined.attributeName())
          );
          if (conflictingAndDefined) {
            this._conflictingOption(option, conflictingAndDefined);
          }
        });
      }
      /**
       * Display an error message if conflicting options are used together.
       * Called after checking for help flags in leaf subcommand.
       *
       * @private
       */
      _checkForConflictingOptions() {
        this._getCommandAndAncestors().forEach((cmd) => {
          cmd._checkForConflictingLocalOptions();
        });
      }
      /**
       * Parse options from `argv` removing known options,
       * and return argv split into operands and unknown arguments.
       *
       * Side effects: modifies command by storing options. Does not reset state if called again.
       *
       * Examples:
       *
       *     argv => operands, unknown
       *     --known kkk op => [op], []
       *     op --known kkk => [op], []
       *     sub --unknown uuu op => [sub], [--unknown uuu op]
       *     sub -- --unknown uuu op => [sub --unknown uuu op], []
       *
       * @param {string[]} argv
       * @return {{operands: string[], unknown: string[]}}
       */
      parseOptions(argv) {
        const operands = [];
        const unknown = [];
        let dest = operands;
        const args = argv.slice();
        function maybeOption(arg) {
          return arg.length > 1 && arg[0] === "-";
        }
        const negativeNumberArg = (arg) => {
          if (!/^-\d*\.?\d+(e[+-]?\d+)?$/.test(arg)) return false;
          return !this._getCommandAndAncestors().some(
            (cmd) => cmd.options.map((opt) => opt.short).some((short) => /^-\d$/.test(short))
          );
        };
        let activeVariadicOption = null;
        while (args.length) {
          const arg = args.shift();
          if (arg === "--") {
            if (dest === unknown) dest.push(arg);
            dest.push(...args);
            break;
          }
          if (activeVariadicOption && (!maybeOption(arg) || negativeNumberArg(arg))) {
            this.emit(`option:${activeVariadicOption.name()}`, arg);
            continue;
          }
          activeVariadicOption = null;
          if (maybeOption(arg)) {
            const option = this._findOption(arg);
            if (option) {
              if (option.required) {
                const value = args.shift();
                if (value === void 0) this.optionMissingArgument(option);
                this.emit(`option:${option.name()}`, value);
              } else if (option.optional) {
                let value = null;
                if (args.length > 0 && (!maybeOption(args[0]) || negativeNumberArg(args[0]))) {
                  value = args.shift();
                }
                this.emit(`option:${option.name()}`, value);
              } else {
                this.emit(`option:${option.name()}`);
              }
              activeVariadicOption = option.variadic ? option : null;
              continue;
            }
          }
          if (arg.length > 2 && arg[0] === "-" && arg[1] !== "-") {
            const option = this._findOption(`-${arg[1]}`);
            if (option) {
              if (option.required || option.optional && this._combineFlagAndOptionalValue) {
                this.emit(`option:${option.name()}`, arg.slice(2));
              } else {
                this.emit(`option:${option.name()}`);
                args.unshift(`-${arg.slice(2)}`);
              }
              continue;
            }
          }
          if (/^--[^=]+=/.test(arg)) {
            const index = arg.indexOf("=");
            const option = this._findOption(arg.slice(0, index));
            if (option && (option.required || option.optional)) {
              this.emit(`option:${option.name()}`, arg.slice(index + 1));
              continue;
            }
          }
          if (dest === operands && maybeOption(arg) && !(this.commands.length === 0 && negativeNumberArg(arg))) {
            dest = unknown;
          }
          if ((this._enablePositionalOptions || this._passThroughOptions) && operands.length === 0 && unknown.length === 0) {
            if (this._findCommand(arg)) {
              operands.push(arg);
              if (args.length > 0) unknown.push(...args);
              break;
            } else if (this._getHelpCommand() && arg === this._getHelpCommand().name()) {
              operands.push(arg);
              if (args.length > 0) operands.push(...args);
              break;
            } else if (this._defaultCommandName) {
              unknown.push(arg);
              if (args.length > 0) unknown.push(...args);
              break;
            }
          }
          if (this._passThroughOptions) {
            dest.push(arg);
            if (args.length > 0) dest.push(...args);
            break;
          }
          dest.push(arg);
        }
        return { operands, unknown };
      }
      /**
       * Return an object containing local option values as key-value pairs.
       *
       * @return {object}
       */
      opts() {
        if (this._storeOptionsAsProperties) {
          const result = {};
          const len = this.options.length;
          for (let i = 0; i < len; i++) {
            const key = this.options[i].attributeName();
            result[key] = key === this._versionOptionName ? this._version : this[key];
          }
          return result;
        }
        return this._optionValues;
      }
      /**
       * Return an object containing merged local and global option values as key-value pairs.
       *
       * @return {object}
       */
      optsWithGlobals() {
        return this._getCommandAndAncestors().reduce(
          (combinedOptions, cmd) => Object.assign(combinedOptions, cmd.opts()),
          {}
        );
      }
      /**
       * Display error message and exit (or call exitOverride).
       *
       * @param {string} message
       * @param {object} [errorOptions]
       * @param {string} [errorOptions.code] - an id string representing the error
       * @param {number} [errorOptions.exitCode] - used with process.exit
       */
      error(message, errorOptions) {
        this._outputConfiguration.outputError(
          `${message}
`,
          this._outputConfiguration.writeErr
        );
        if (typeof this._showHelpAfterError === "string") {
          this._outputConfiguration.writeErr(`${this._showHelpAfterError}
`);
        } else if (this._showHelpAfterError) {
          this._outputConfiguration.writeErr("\n");
          this.outputHelp({ error: true });
        }
        const config = errorOptions || {};
        const exitCode = config.exitCode || 1;
        const code = config.code || "commander.error";
        this._exit(exitCode, code, message);
      }
      /**
       * Apply any option related environment variables, if option does
       * not have a value from cli or client code.
       *
       * @private
       */
      _parseOptionsEnv() {
        this.options.forEach((option) => {
          if (option.envVar && option.envVar in process3.env) {
            const optionKey = option.attributeName();
            if (this.getOptionValue(optionKey) === void 0 || ["default", "config", "env"].includes(
              this.getOptionValueSource(optionKey)
            )) {
              if (option.required || option.optional) {
                this.emit(`optionEnv:${option.name()}`, process3.env[option.envVar]);
              } else {
                this.emit(`optionEnv:${option.name()}`);
              }
            }
          }
        });
      }
      /**
       * Apply any implied option values, if option is undefined or default value.
       *
       * @private
       */
      _parseOptionsImplied() {
        const dualHelper = new DualOptions(this.options);
        const hasCustomOptionValue = (optionKey) => {
          return this.getOptionValue(optionKey) !== void 0 && !["default", "implied"].includes(this.getOptionValueSource(optionKey));
        };
        this.options.filter(
          (option) => option.implied !== void 0 && hasCustomOptionValue(option.attributeName()) && dualHelper.valueFromOption(
            this.getOptionValue(option.attributeName()),
            option
          )
        ).forEach((option) => {
          Object.keys(option.implied).filter((impliedKey) => !hasCustomOptionValue(impliedKey)).forEach((impliedKey) => {
            this.setOptionValueWithSource(
              impliedKey,
              option.implied[impliedKey],
              "implied"
            );
          });
        });
      }
      /**
       * Argument `name` is missing.
       *
       * @param {string} name
       * @private
       */
      missingArgument(name) {
        const message = `error: missing required argument '${name}'`;
        this.error(message, { code: "commander.missingArgument" });
      }
      /**
       * `Option` is missing an argument.
       *
       * @param {Option} option
       * @private
       */
      optionMissingArgument(option) {
        const message = `error: option '${option.flags}' argument missing`;
        this.error(message, { code: "commander.optionMissingArgument" });
      }
      /**
       * `Option` does not have a value, and is a mandatory option.
       *
       * @param {Option} option
       * @private
       */
      missingMandatoryOptionValue(option) {
        const message = `error: required option '${option.flags}' not specified`;
        this.error(message, { code: "commander.missingMandatoryOptionValue" });
      }
      /**
       * `Option` conflicts with another option.
       *
       * @param {Option} option
       * @param {Option} conflictingOption
       * @private
       */
      _conflictingOption(option, conflictingOption) {
        const findBestOptionFromValue = (option2) => {
          const optionKey = option2.attributeName();
          const optionValue = this.getOptionValue(optionKey);
          const negativeOption = this.options.find(
            (target) => target.negate && optionKey === target.attributeName()
          );
          const positiveOption = this.options.find(
            (target) => !target.negate && optionKey === target.attributeName()
          );
          if (negativeOption && (negativeOption.presetArg === void 0 && optionValue === false || negativeOption.presetArg !== void 0 && optionValue === negativeOption.presetArg)) {
            return negativeOption;
          }
          return positiveOption || option2;
        };
        const getErrorMessage = (option2) => {
          const bestOption = findBestOptionFromValue(option2);
          const optionKey = bestOption.attributeName();
          const source = this.getOptionValueSource(optionKey);
          if (source === "env") {
            return `environment variable '${bestOption.envVar}'`;
          }
          return `option '${bestOption.flags}'`;
        };
        const message = `error: ${getErrorMessage(option)} cannot be used with ${getErrorMessage(conflictingOption)}`;
        this.error(message, { code: "commander.conflictingOption" });
      }
      /**
       * Unknown option `flag`.
       *
       * @param {string} flag
       * @private
       */
      unknownOption(flag) {
        if (this._allowUnknownOption) return;
        let suggestion = "";
        if (flag.startsWith("--") && this._showSuggestionAfterError) {
          let candidateFlags = [];
          let command = this;
          do {
            const moreFlags = command.createHelp().visibleOptions(command).filter((option) => option.long).map((option) => option.long);
            candidateFlags = candidateFlags.concat(moreFlags);
            command = command.parent;
          } while (command && !command._enablePositionalOptions);
          suggestion = suggestSimilar(flag, candidateFlags);
        }
        const message = `error: unknown option '${flag}'${suggestion}`;
        this.error(message, { code: "commander.unknownOption" });
      }
      /**
       * Excess arguments, more than expected.
       *
       * @param {string[]} receivedArgs
       * @private
       */
      _excessArguments(receivedArgs) {
        if (this._allowExcessArguments) return;
        const expected = this.registeredArguments.length;
        const s = expected === 1 ? "" : "s";
        const forSubcommand = this.parent ? ` for '${this.name()}'` : "";
        const message = `error: too many arguments${forSubcommand}. Expected ${expected} argument${s} but got ${receivedArgs.length}.`;
        this.error(message, { code: "commander.excessArguments" });
      }
      /**
       * Unknown command.
       *
       * @private
       */
      unknownCommand() {
        const unknownName = this.args[0];
        let suggestion = "";
        if (this._showSuggestionAfterError) {
          const candidateNames = [];
          this.createHelp().visibleCommands(this).forEach((command) => {
            candidateNames.push(command.name());
            if (command.alias()) candidateNames.push(command.alias());
          });
          suggestion = suggestSimilar(unknownName, candidateNames);
        }
        const message = `error: unknown command '${unknownName}'${suggestion}`;
        this.error(message, { code: "commander.unknownCommand" });
      }
      /**
       * Get or set the program version.
       *
       * This method auto-registers the "-V, --version" option which will print the version number.
       *
       * You can optionally supply the flags and description to override the defaults.
       *
       * @param {string} [str]
       * @param {string} [flags]
       * @param {string} [description]
       * @return {(this | string | undefined)} `this` command for chaining, or version string if no arguments
       */
      version(str, flags, description) {
        if (str === void 0) return this._version;
        this._version = str;
        flags = flags || "-V, --version";
        description = description || "output the version number";
        const versionOption = this.createOption(flags, description);
        this._versionOptionName = versionOption.attributeName();
        this._registerOption(versionOption);
        this.on("option:" + versionOption.name(), () => {
          this._outputConfiguration.writeOut(`${str}
`);
          this._exit(0, "commander.version", str);
        });
        return this;
      }
      /**
       * Set the description.
       *
       * @param {string} [str]
       * @param {object} [argsDescription]
       * @return {(string|Command)}
       */
      description(str, argsDescription) {
        if (str === void 0 && argsDescription === void 0)
          return this._description;
        this._description = str;
        if (argsDescription) {
          this._argsDescription = argsDescription;
        }
        return this;
      }
      /**
       * Set the summary. Used when listed as subcommand of parent.
       *
       * @param {string} [str]
       * @return {(string|Command)}
       */
      summary(str) {
        if (str === void 0) return this._summary;
        this._summary = str;
        return this;
      }
      /**
       * Set an alias for the command.
       *
       * You may call more than once to add multiple aliases. Only the first alias is shown in the auto-generated help.
       *
       * @param {string} [alias]
       * @return {(string|Command)}
       */
      alias(alias) {
        if (alias === void 0) return this._aliases[0];
        let command = this;
        if (this.commands.length !== 0 && this.commands[this.commands.length - 1]._executableHandler) {
          command = this.commands[this.commands.length - 1];
        }
        if (alias === command._name)
          throw new Error("Command alias can't be the same as its name");
        const matchingCommand = this.parent?._findCommand(alias);
        if (matchingCommand) {
          const existingCmd = [matchingCommand.name()].concat(matchingCommand.aliases()).join("|");
          throw new Error(
            `cannot add alias '${alias}' to command '${this.name()}' as already have command '${existingCmd}'`
          );
        }
        command._aliases.push(alias);
        return this;
      }
      /**
       * Set aliases for the command.
       *
       * Only the first alias is shown in the auto-generated help.
       *
       * @param {string[]} [aliases]
       * @return {(string[]|Command)}
       */
      aliases(aliases) {
        if (aliases === void 0) return this._aliases;
        aliases.forEach((alias) => this.alias(alias));
        return this;
      }
      /**
       * Set / get the command usage `str`.
       *
       * @param {string} [str]
       * @return {(string|Command)}
       */
      usage(str) {
        if (str === void 0) {
          if (this._usage) return this._usage;
          const args = this.registeredArguments.map((arg) => {
            return humanReadableArgName(arg);
          });
          return [].concat(
            this.options.length || this._helpOption !== null ? "[options]" : [],
            this.commands.length ? "[command]" : [],
            this.registeredArguments.length ? args : []
          ).join(" ");
        }
        this._usage = str;
        return this;
      }
      /**
       * Get or set the name of the command.
       *
       * @param {string} [str]
       * @return {(string|Command)}
       */
      name(str) {
        if (str === void 0) return this._name;
        this._name = str;
        return this;
      }
      /**
       * Set/get the help group heading for this subcommand in parent command's help.
       *
       * @param {string} [heading]
       * @return {Command | string}
       */
      helpGroup(heading) {
        if (heading === void 0) return this._helpGroupHeading ?? "";
        this._helpGroupHeading = heading;
        return this;
      }
      /**
       * Set/get the default help group heading for subcommands added to this command.
       * (This does not override a group set directly on the subcommand using .helpGroup().)
       *
       * @example
       * program.commandsGroup('Development Commands:);
       * program.command('watch')...
       * program.command('lint')...
       * ...
       *
       * @param {string} [heading]
       * @returns {Command | string}
       */
      commandsGroup(heading) {
        if (heading === void 0) return this._defaultCommandGroup ?? "";
        this._defaultCommandGroup = heading;
        return this;
      }
      /**
       * Set/get the default help group heading for options added to this command.
       * (This does not override a group set directly on the option using .helpGroup().)
       *
       * @example
       * program
       *   .optionsGroup('Development Options:')
       *   .option('-d, --debug', 'output extra debugging')
       *   .option('-p, --profile', 'output profiling information')
       *
       * @param {string} [heading]
       * @returns {Command | string}
       */
      optionsGroup(heading) {
        if (heading === void 0) return this._defaultOptionGroup ?? "";
        this._defaultOptionGroup = heading;
        return this;
      }
      /**
       * @param {Option} option
       * @private
       */
      _initOptionGroup(option) {
        if (this._defaultOptionGroup && !option.helpGroupHeading)
          option.helpGroup(this._defaultOptionGroup);
      }
      /**
       * @param {Command} cmd
       * @private
       */
      _initCommandGroup(cmd) {
        if (this._defaultCommandGroup && !cmd.helpGroup())
          cmd.helpGroup(this._defaultCommandGroup);
      }
      /**
       * Set the name of the command from script filename, such as process.argv[1],
       * or require.main.filename, or __filename.
       *
       * (Used internally and public although not documented in README.)
       *
       * @example
       * program.nameFromFilename(require.main.filename);
       *
       * @param {string} filename
       * @return {Command}
       */
      nameFromFilename(filename) {
        this._name = path5.basename(filename, path5.extname(filename));
        return this;
      }
      /**
       * Get or set the directory for searching for executable subcommands of this command.
       *
       * @example
       * program.executableDir(__dirname);
       * // or
       * program.executableDir('subcommands');
       *
       * @param {string} [path]
       * @return {(string|null|Command)}
       */
      executableDir(path6) {
        if (path6 === void 0) return this._executableDir;
        this._executableDir = path6;
        return this;
      }
      /**
       * Return program help documentation.
       *
       * @param {{ error: boolean }} [contextOptions] - pass {error:true} to wrap for stderr instead of stdout
       * @return {string}
       */
      helpInformation(contextOptions) {
        const helper = this.createHelp();
        const context = this._getOutputContext(contextOptions);
        helper.prepareContext({
          error: context.error,
          helpWidth: context.helpWidth,
          outputHasColors: context.hasColors
        });
        const text = helper.formatHelp(this, helper);
        if (context.hasColors) return text;
        return this._outputConfiguration.stripColor(text);
      }
      /**
       * @typedef HelpContext
       * @type {object}
       * @property {boolean} error
       * @property {number} helpWidth
       * @property {boolean} hasColors
       * @property {function} write - includes stripColor if needed
       *
       * @returns {HelpContext}
       * @private
       */
      _getOutputContext(contextOptions) {
        contextOptions = contextOptions || {};
        const error = !!contextOptions.error;
        let baseWrite;
        let hasColors;
        let helpWidth;
        if (error) {
          baseWrite = (str) => this._outputConfiguration.writeErr(str);
          hasColors = this._outputConfiguration.getErrHasColors();
          helpWidth = this._outputConfiguration.getErrHelpWidth();
        } else {
          baseWrite = (str) => this._outputConfiguration.writeOut(str);
          hasColors = this._outputConfiguration.getOutHasColors();
          helpWidth = this._outputConfiguration.getOutHelpWidth();
        }
        const write = (str) => {
          if (!hasColors) str = this._outputConfiguration.stripColor(str);
          return baseWrite(str);
        };
        return { error, write, hasColors, helpWidth };
      }
      /**
       * Output help information for this command.
       *
       * Outputs built-in help, and custom text added using `.addHelpText()`.
       *
       * @param {{ error: boolean } | Function} [contextOptions] - pass {error:true} to write to stderr instead of stdout
       */
      outputHelp(contextOptions) {
        let deprecatedCallback;
        if (typeof contextOptions === "function") {
          deprecatedCallback = contextOptions;
          contextOptions = void 0;
        }
        const outputContext = this._getOutputContext(contextOptions);
        const eventContext = {
          error: outputContext.error,
          write: outputContext.write,
          command: this
        };
        this._getCommandAndAncestors().reverse().forEach((command) => command.emit("beforeAllHelp", eventContext));
        this.emit("beforeHelp", eventContext);
        let helpInformation = this.helpInformation({ error: outputContext.error });
        if (deprecatedCallback) {
          helpInformation = deprecatedCallback(helpInformation);
          if (typeof helpInformation !== "string" && !Buffer.isBuffer(helpInformation)) {
            throw new Error("outputHelp callback must return a string or a Buffer");
          }
        }
        outputContext.write(helpInformation);
        if (this._getHelpOption()?.long) {
          this.emit(this._getHelpOption().long);
        }
        this.emit("afterHelp", eventContext);
        this._getCommandAndAncestors().forEach(
          (command) => command.emit("afterAllHelp", eventContext)
        );
      }
      /**
       * You can pass in flags and a description to customise the built-in help option.
       * Pass in false to disable the built-in help option.
       *
       * @example
       * program.helpOption('-?, --help' 'show help'); // customise
       * program.helpOption(false); // disable
       *
       * @param {(string | boolean)} flags
       * @param {string} [description]
       * @return {Command} `this` command for chaining
       */
      helpOption(flags, description) {
        if (typeof flags === "boolean") {
          if (flags) {
            if (this._helpOption === null) this._helpOption = void 0;
            if (this._defaultOptionGroup) {
              this._initOptionGroup(this._getHelpOption());
            }
          } else {
            this._helpOption = null;
          }
          return this;
        }
        this._helpOption = this.createOption(
          flags ?? "-h, --help",
          description ?? "display help for command"
        );
        if (flags || description) this._initOptionGroup(this._helpOption);
        return this;
      }
      /**
       * Lazy create help option.
       * Returns null if has been disabled with .helpOption(false).
       *
       * @returns {(Option | null)} the help option
       * @package
       */
      _getHelpOption() {
        if (this._helpOption === void 0) {
          this.helpOption(void 0, void 0);
        }
        return this._helpOption;
      }
      /**
       * Supply your own option to use for the built-in help option.
       * This is an alternative to using helpOption() to customise the flags and description etc.
       *
       * @param {Option} option
       * @return {Command} `this` command for chaining
       */
      addHelpOption(option) {
        this._helpOption = option;
        this._initOptionGroup(option);
        return this;
      }
      /**
       * Output help information and exit.
       *
       * Outputs built-in help, and custom text added using `.addHelpText()`.
       *
       * @param {{ error: boolean }} [contextOptions] - pass {error:true} to write to stderr instead of stdout
       */
      help(contextOptions) {
        this.outputHelp(contextOptions);
        let exitCode = Number(process3.exitCode ?? 0);
        if (exitCode === 0 && contextOptions && typeof contextOptions !== "function" && contextOptions.error) {
          exitCode = 1;
        }
        this._exit(exitCode, "commander.help", "(outputHelp)");
      }
      /**
       * // Do a little typing to coordinate emit and listener for the help text events.
       * @typedef HelpTextEventContext
       * @type {object}
       * @property {boolean} error
       * @property {Command} command
       * @property {function} write
       */
      /**
       * Add additional text to be displayed with the built-in help.
       *
       * Position is 'before' or 'after' to affect just this command,
       * and 'beforeAll' or 'afterAll' to affect this command and all its subcommands.
       *
       * @param {string} position - before or after built-in help
       * @param {(string | Function)} text - string to add, or a function returning a string
       * @return {Command} `this` command for chaining
       */
      addHelpText(position, text) {
        const allowedValues = ["beforeAll", "before", "after", "afterAll"];
        if (!allowedValues.includes(position)) {
          throw new Error(`Unexpected value for position to addHelpText.
Expecting one of '${allowedValues.join("', '")}'`);
        }
        const helpEvent = `${position}Help`;
        this.on(helpEvent, (context) => {
          let helpStr;
          if (typeof text === "function") {
            helpStr = text({ error: context.error, command: context.command });
          } else {
            helpStr = text;
          }
          if (helpStr) {
            context.write(`${helpStr}
`);
          }
        });
        return this;
      }
      /**
       * Output help information if help flags specified
       *
       * @param {Array} args - array of options to search for help flags
       * @private
       */
      _outputHelpIfRequested(args) {
        const helpOption = this._getHelpOption();
        const helpRequested = helpOption && args.find((arg) => helpOption.is(arg));
        if (helpRequested) {
          this.outputHelp();
          this._exit(0, "commander.helpDisplayed", "(outputHelp)");
        }
      }
    };
    function incrementNodeInspectorPort(args) {
      return args.map((arg) => {
        if (!arg.startsWith("--inspect")) {
          return arg;
        }
        let debugOption;
        let debugHost = "127.0.0.1";
        let debugPort = "9229";
        let match2;
        if ((match2 = arg.match(/^(--inspect(-brk)?)$/)) !== null) {
          debugOption = match2[1];
        } else if ((match2 = arg.match(/^(--inspect(-brk|-port)?)=([^:]+)$/)) !== null) {
          debugOption = match2[1];
          if (/^\d+$/.test(match2[3])) {
            debugPort = match2[3];
          } else {
            debugHost = match2[3];
          }
        } else if ((match2 = arg.match(/^(--inspect(-brk|-port)?)=([^:]+):(\d+)$/)) !== null) {
          debugOption = match2[1];
          debugHost = match2[3];
          debugPort = match2[4];
        }
        if (debugOption && debugPort !== "0") {
          return `${debugOption}=${debugHost}:${parseInt(debugPort) + 1}`;
        }
        return arg;
      });
    }
    function useColor() {
      if (process3.env.NO_COLOR || process3.env.FORCE_COLOR === "0" || process3.env.FORCE_COLOR === "false")
        return false;
      if (process3.env.FORCE_COLOR || process3.env.CLICOLOR_FORCE !== void 0)
        return true;
      return void 0;
    }
    exports2.Command = Command2;
    exports2.useColor = useColor;
  }
});

// ../../../.yarn/berry/cache/commander-npm-14.0.0-1e0a7932ab-10c0.zip/node_modules/commander/index.js
var require_commander = __commonJS({
  "../../../.yarn/berry/cache/commander-npm-14.0.0-1e0a7932ab-10c0.zip/node_modules/commander/index.js"(exports2) {
    var { Argument: Argument2 } = require_argument();
    var { Command: Command2 } = require_command();
    var { CommanderError: CommanderError2, InvalidArgumentError: InvalidArgumentError2 } = require_error();
    var { Help: Help2 } = require_help();
    var { Option: Option2 } = require_option();
    exports2.program = new Command2();
    exports2.createCommand = (name) => new Command2(name);
    exports2.createOption = (flags, description) => new Option2(flags, description);
    exports2.createArgument = (name, description) => new Argument2(name, description);
    exports2.Command = Command2;
    exports2.Option = Option2;
    exports2.Argument = Argument2;
    exports2.Help = Help2;
    exports2.CommanderError = CommanderError2;
    exports2.InvalidArgumentError = InvalidArgumentError2;
    exports2.InvalidOptionArgumentError = InvalidArgumentError2;
  }
});

// ../../../.yarn/berry/cache/chalk-npm-5.4.1-2f3fe4660a-10c0.zip/node_modules/chalk/source/vendor/ansi-styles/index.js
function assembleStyles() {
  const codes = /* @__PURE__ */ new Map();
  for (const [groupName, group] of Object.entries(styles)) {
    for (const [styleName, style] of Object.entries(group)) {
      styles[styleName] = {
        open: `\x1B[${style[0]}m`,
        close: `\x1B[${style[1]}m`
      };
      group[styleName] = styles[styleName];
      codes.set(style[0], style[1]);
    }
    Object.defineProperty(styles, groupName, {
      value: group,
      enumerable: false
    });
  }
  Object.defineProperty(styles, "codes", {
    value: codes,
    enumerable: false
  });
  styles.color.close = "\x1B[39m";
  styles.bgColor.close = "\x1B[49m";
  styles.color.ansi = wrapAnsi16();
  styles.color.ansi256 = wrapAnsi256();
  styles.color.ansi16m = wrapAnsi16m();
  styles.bgColor.ansi = wrapAnsi16(ANSI_BACKGROUND_OFFSET);
  styles.bgColor.ansi256 = wrapAnsi256(ANSI_BACKGROUND_OFFSET);
  styles.bgColor.ansi16m = wrapAnsi16m(ANSI_BACKGROUND_OFFSET);
  Object.defineProperties(styles, {
    rgbToAnsi256: {
      value(red, green, blue) {
        if (red === green && green === blue) {
          if (red < 8) {
            return 16;
          }
          if (red > 248) {
            return 231;
          }
          return Math.round((red - 8) / 247 * 24) + 232;
        }
        return 16 + 36 * Math.round(red / 255 * 5) + 6 * Math.round(green / 255 * 5) + Math.round(blue / 255 * 5);
      },
      enumerable: false
    },
    hexToRgb: {
      value(hex) {
        const matches = /[a-f\d]{6}|[a-f\d]{3}/i.exec(hex.toString(16));
        if (!matches) {
          return [0, 0, 0];
        }
        let [colorString] = matches;
        if (colorString.length === 3) {
          colorString = [...colorString].map((character) => character + character).join("");
        }
        const integer = Number.parseInt(colorString, 16);
        return [
          /* eslint-disable no-bitwise */
          integer >> 16 & 255,
          integer >> 8 & 255,
          integer & 255
          /* eslint-enable no-bitwise */
        ];
      },
      enumerable: false
    },
    hexToAnsi256: {
      value: (hex) => styles.rgbToAnsi256(...styles.hexToRgb(hex)),
      enumerable: false
    },
    ansi256ToAnsi: {
      value(code) {
        if (code < 8) {
          return 30 + code;
        }
        if (code < 16) {
          return 90 + (code - 8);
        }
        let red;
        let green;
        let blue;
        if (code >= 232) {
          red = ((code - 232) * 10 + 8) / 255;
          green = red;
          blue = red;
        } else {
          code -= 16;
          const remainder = code % 36;
          red = Math.floor(code / 36) / 5;
          green = Math.floor(remainder / 6) / 5;
          blue = remainder % 6 / 5;
        }
        const value = Math.max(red, green, blue) * 2;
        if (value === 0) {
          return 30;
        }
        let result = 30 + (Math.round(blue) << 2 | Math.round(green) << 1 | Math.round(red));
        if (value === 2) {
          result += 60;
        }
        return result;
      },
      enumerable: false
    },
    rgbToAnsi: {
      value: (red, green, blue) => styles.ansi256ToAnsi(styles.rgbToAnsi256(red, green, blue)),
      enumerable: false
    },
    hexToAnsi: {
      value: (hex) => styles.ansi256ToAnsi(styles.hexToAnsi256(hex)),
      enumerable: false
    }
  });
  return styles;
}
var ANSI_BACKGROUND_OFFSET, wrapAnsi16, wrapAnsi256, wrapAnsi16m, styles, modifierNames, foregroundColorNames, backgroundColorNames, colorNames, ansiStyles, ansi_styles_default;
var init_ansi_styles = __esm({
  "../../../.yarn/berry/cache/chalk-npm-5.4.1-2f3fe4660a-10c0.zip/node_modules/chalk/source/vendor/ansi-styles/index.js"() {
    ANSI_BACKGROUND_OFFSET = 10;
    wrapAnsi16 = (offset = 0) => (code) => `\x1B[${code + offset}m`;
    wrapAnsi256 = (offset = 0) => (code) => `\x1B[${38 + offset};5;${code}m`;
    wrapAnsi16m = (offset = 0) => (red, green, blue) => `\x1B[${38 + offset};2;${red};${green};${blue}m`;
    styles = {
      modifier: {
        reset: [0, 0],
        // 21 isn't widely supported and 22 does the same thing
        bold: [1, 22],
        dim: [2, 22],
        italic: [3, 23],
        underline: [4, 24],
        overline: [53, 55],
        inverse: [7, 27],
        hidden: [8, 28],
        strikethrough: [9, 29]
      },
      color: {
        black: [30, 39],
        red: [31, 39],
        green: [32, 39],
        yellow: [33, 39],
        blue: [34, 39],
        magenta: [35, 39],
        cyan: [36, 39],
        white: [37, 39],
        // Bright color
        blackBright: [90, 39],
        gray: [90, 39],
        // Alias of `blackBright`
        grey: [90, 39],
        // Alias of `blackBright`
        redBright: [91, 39],
        greenBright: [92, 39],
        yellowBright: [93, 39],
        blueBright: [94, 39],
        magentaBright: [95, 39],
        cyanBright: [96, 39],
        whiteBright: [97, 39]
      },
      bgColor: {
        bgBlack: [40, 49],
        bgRed: [41, 49],
        bgGreen: [42, 49],
        bgYellow: [43, 49],
        bgBlue: [44, 49],
        bgMagenta: [45, 49],
        bgCyan: [46, 49],
        bgWhite: [47, 49],
        // Bright color
        bgBlackBright: [100, 49],
        bgGray: [100, 49],
        // Alias of `bgBlackBright`
        bgGrey: [100, 49],
        // Alias of `bgBlackBright`
        bgRedBright: [101, 49],
        bgGreenBright: [102, 49],
        bgYellowBright: [103, 49],
        bgBlueBright: [104, 49],
        bgMagentaBright: [105, 49],
        bgCyanBright: [106, 49],
        bgWhiteBright: [107, 49]
      }
    };
    modifierNames = Object.keys(styles.modifier);
    foregroundColorNames = Object.keys(styles.color);
    backgroundColorNames = Object.keys(styles.bgColor);
    colorNames = [...foregroundColorNames, ...backgroundColorNames];
    ansiStyles = assembleStyles();
    ansi_styles_default = ansiStyles;
  }
});

// ../../../.yarn/berry/cache/chalk-npm-5.4.1-2f3fe4660a-10c0.zip/node_modules/chalk/source/vendor/supports-color/index.js
function hasFlag(flag, argv = globalThis.Deno ? globalThis.Deno.args : import_node_process.default.argv) {
  const prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--";
  const position = argv.indexOf(prefix + flag);
  const terminatorPosition = argv.indexOf("--");
  return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
}
function envForceColor() {
  if ("FORCE_COLOR" in env) {
    if (env.FORCE_COLOR === "true") {
      return 1;
    }
    if (env.FORCE_COLOR === "false") {
      return 0;
    }
    return env.FORCE_COLOR.length === 0 ? 1 : Math.min(Number.parseInt(env.FORCE_COLOR, 10), 3);
  }
}
function translateLevel(level) {
  if (level === 0) {
    return false;
  }
  return {
    level,
    hasBasic: true,
    has256: level >= 2,
    has16m: level >= 3
  };
}
function _supportsColor(haveStream, { streamIsTTY, sniffFlags = true } = {}) {
  const noFlagForceColor = envForceColor();
  if (noFlagForceColor !== void 0) {
    flagForceColor = noFlagForceColor;
  }
  const forceColor = sniffFlags ? flagForceColor : noFlagForceColor;
  if (forceColor === 0) {
    return 0;
  }
  if (sniffFlags) {
    if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) {
      return 3;
    }
    if (hasFlag("color=256")) {
      return 2;
    }
  }
  if ("TF_BUILD" in env && "AGENT_NAME" in env) {
    return 1;
  }
  if (haveStream && !streamIsTTY && forceColor === void 0) {
    return 0;
  }
  const min = forceColor || 0;
  if (env.TERM === "dumb") {
    return min;
  }
  if (import_node_process.default.platform === "win32") {
    const osRelease = import_node_os.default.release().split(".");
    if (Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
      return Number(osRelease[2]) >= 14931 ? 3 : 2;
    }
    return 1;
  }
  if ("CI" in env) {
    if (["GITHUB_ACTIONS", "GITEA_ACTIONS", "CIRCLECI"].some((key) => key in env)) {
      return 3;
    }
    if (["TRAVIS", "APPVEYOR", "GITLAB_CI", "BUILDKITE", "DRONE"].some((sign) => sign in env) || env.CI_NAME === "codeship") {
      return 1;
    }
    return min;
  }
  if ("TEAMCITY_VERSION" in env) {
    return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
  }
  if (env.COLORTERM === "truecolor") {
    return 3;
  }
  if (env.TERM === "xterm-kitty") {
    return 3;
  }
  if ("TERM_PROGRAM" in env) {
    const version2 = Number.parseInt((env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
    switch (env.TERM_PROGRAM) {
      case "iTerm.app": {
        return version2 >= 3 ? 3 : 2;
      }
      case "Apple_Terminal": {
        return 2;
      }
    }
  }
  if (/-256(color)?$/i.test(env.TERM)) {
    return 2;
  }
  if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
    return 1;
  }
  if ("COLORTERM" in env) {
    return 1;
  }
  return min;
}
function createSupportsColor(stream2, options = {}) {
  const level = _supportsColor(stream2, {
    streamIsTTY: stream2 && stream2.isTTY,
    ...options
  });
  return translateLevel(level);
}
var import_node_process, import_node_os, import_node_tty, env, flagForceColor, supportsColor, supports_color_default;
var init_supports_color = __esm({
  "../../../.yarn/berry/cache/chalk-npm-5.4.1-2f3fe4660a-10c0.zip/node_modules/chalk/source/vendor/supports-color/index.js"() {
    import_node_process = __toESM(require("node:process"), 1);
    import_node_os = __toESM(require("node:os"), 1);
    import_node_tty = __toESM(require("node:tty"), 1);
    ({ env } = import_node_process.default);
    if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false") || hasFlag("color=never")) {
      flagForceColor = 0;
    } else if (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) {
      flagForceColor = 1;
    }
    supportsColor = {
      stdout: createSupportsColor({ isTTY: import_node_tty.default.isatty(1) }),
      stderr: createSupportsColor({ isTTY: import_node_tty.default.isatty(2) })
    };
    supports_color_default = supportsColor;
  }
});

// ../../../.yarn/berry/cache/chalk-npm-5.4.1-2f3fe4660a-10c0.zip/node_modules/chalk/source/utilities.js
function stringReplaceAll(string, substring, replacer) {
  let index = string.indexOf(substring);
  if (index === -1) {
    return string;
  }
  const substringLength = substring.length;
  let endIndex = 0;
  let returnValue = "";
  do {
    returnValue += string.slice(endIndex, index) + substring + replacer;
    endIndex = index + substringLength;
    index = string.indexOf(substring, endIndex);
  } while (index !== -1);
  returnValue += string.slice(endIndex);
  return returnValue;
}
function stringEncaseCRLFWithFirstIndex(string, prefix, postfix, index) {
  let endIndex = 0;
  let returnValue = "";
  do {
    const gotCR = string[index - 1] === "\r";
    returnValue += string.slice(endIndex, gotCR ? index - 1 : index) + prefix + (gotCR ? "\r\n" : "\n") + postfix;
    endIndex = index + 1;
    index = string.indexOf("\n", endIndex);
  } while (index !== -1);
  returnValue += string.slice(endIndex);
  return returnValue;
}
var init_utilities = __esm({
  "../../../.yarn/berry/cache/chalk-npm-5.4.1-2f3fe4660a-10c0.zip/node_modules/chalk/source/utilities.js"() {
  }
});

// ../../../.yarn/berry/cache/chalk-npm-5.4.1-2f3fe4660a-10c0.zip/node_modules/chalk/source/index.js
function createChalk(options) {
  return chalkFactory(options);
}
var stdoutColor, stderrColor, GENERATOR, STYLER, IS_EMPTY, levelMapping, styles2, applyOptions, chalkFactory, getModelAnsi, usedModels, proto, createStyler, createBuilder, applyStyle, chalk, chalkStderr, source_default;
var init_source = __esm({
  "../../../.yarn/berry/cache/chalk-npm-5.4.1-2f3fe4660a-10c0.zip/node_modules/chalk/source/index.js"() {
    init_ansi_styles();
    init_supports_color();
    init_utilities();
    ({ stdout: stdoutColor, stderr: stderrColor } = supports_color_default);
    GENERATOR = Symbol("GENERATOR");
    STYLER = Symbol("STYLER");
    IS_EMPTY = Symbol("IS_EMPTY");
    levelMapping = [
      "ansi",
      "ansi",
      "ansi256",
      "ansi16m"
    ];
    styles2 = /* @__PURE__ */ Object.create(null);
    applyOptions = (object, options = {}) => {
      if (options.level && !(Number.isInteger(options.level) && options.level >= 0 && options.level <= 3)) {
        throw new Error("The `level` option should be an integer from 0 to 3");
      }
      const colorLevel = stdoutColor ? stdoutColor.level : 0;
      object.level = options.level === void 0 ? colorLevel : options.level;
    };
    chalkFactory = (options) => {
      const chalk2 = (...strings) => strings.join(" ");
      applyOptions(chalk2, options);
      Object.setPrototypeOf(chalk2, createChalk.prototype);
      return chalk2;
    };
    Object.setPrototypeOf(createChalk.prototype, Function.prototype);
    for (const [styleName, style] of Object.entries(ansi_styles_default)) {
      styles2[styleName] = {
        get() {
          const builder = createBuilder(this, createStyler(style.open, style.close, this[STYLER]), this[IS_EMPTY]);
          Object.defineProperty(this, styleName, { value: builder });
          return builder;
        }
      };
    }
    styles2.visible = {
      get() {
        const builder = createBuilder(this, this[STYLER], true);
        Object.defineProperty(this, "visible", { value: builder });
        return builder;
      }
    };
    getModelAnsi = (model, level, type, ...arguments_) => {
      if (model === "rgb") {
        if (level === "ansi16m") {
          return ansi_styles_default[type].ansi16m(...arguments_);
        }
        if (level === "ansi256") {
          return ansi_styles_default[type].ansi256(ansi_styles_default.rgbToAnsi256(...arguments_));
        }
        return ansi_styles_default[type].ansi(ansi_styles_default.rgbToAnsi(...arguments_));
      }
      if (model === "hex") {
        return getModelAnsi("rgb", level, type, ...ansi_styles_default.hexToRgb(...arguments_));
      }
      return ansi_styles_default[type][model](...arguments_);
    };
    usedModels = ["rgb", "hex", "ansi256"];
    for (const model of usedModels) {
      styles2[model] = {
        get() {
          const { level } = this;
          return function(...arguments_) {
            const styler = createStyler(getModelAnsi(model, levelMapping[level], "color", ...arguments_), ansi_styles_default.color.close, this[STYLER]);
            return createBuilder(this, styler, this[IS_EMPTY]);
          };
        }
      };
      const bgModel = "bg" + model[0].toUpperCase() + model.slice(1);
      styles2[bgModel] = {
        get() {
          const { level } = this;
          return function(...arguments_) {
            const styler = createStyler(getModelAnsi(model, levelMapping[level], "bgColor", ...arguments_), ansi_styles_default.bgColor.close, this[STYLER]);
            return createBuilder(this, styler, this[IS_EMPTY]);
          };
        }
      };
    }
    proto = Object.defineProperties(() => {
    }, {
      ...styles2,
      level: {
        enumerable: true,
        get() {
          return this[GENERATOR].level;
        },
        set(level) {
          this[GENERATOR].level = level;
        }
      }
    });
    createStyler = (open, close, parent) => {
      let openAll;
      let closeAll;
      if (parent === void 0) {
        openAll = open;
        closeAll = close;
      } else {
        openAll = parent.openAll + open;
        closeAll = close + parent.closeAll;
      }
      return {
        open,
        close,
        openAll,
        closeAll,
        parent
      };
    };
    createBuilder = (self, _styler, _isEmpty) => {
      const builder = (...arguments_) => applyStyle(builder, arguments_.length === 1 ? "" + arguments_[0] : arguments_.join(" "));
      Object.setPrototypeOf(builder, proto);
      builder[GENERATOR] = self;
      builder[STYLER] = _styler;
      builder[IS_EMPTY] = _isEmpty;
      return builder;
    };
    applyStyle = (self, string) => {
      if (self.level <= 0 || !string) {
        return self[IS_EMPTY] ? "" : string;
      }
      let styler = self[STYLER];
      if (styler === void 0) {
        return string;
      }
      const { openAll, closeAll } = styler;
      if (string.includes("\x1B")) {
        while (styler !== void 0) {
          string = stringReplaceAll(string, styler.close, styler.open);
          styler = styler.parent;
        }
      }
      const lfIndex = string.indexOf("\n");
      if (lfIndex !== -1) {
        string = stringEncaseCRLFWithFirstIndex(string, closeAll, openAll, lfIndex);
      }
      return openAll + string + closeAll;
    };
    Object.defineProperties(createChalk.prototype, styles2);
    chalk = createChalk();
    chalkStderr = createChalk({ level: stderrColor ? stderrColor.level : 0 });
    source_default = chalk;
  }
});

// ../../../.yarn/berry/cache/@isaacs-balanced-match-npm-4.0.1-8965afafe6-10c0.zip/node_modules/@isaacs/balanced-match/dist/esm/index.js
var balanced, maybeMatch, range;
var init_esm = __esm({
  "../../../.yarn/berry/cache/@isaacs-balanced-match-npm-4.0.1-8965afafe6-10c0.zip/node_modules/@isaacs/balanced-match/dist/esm/index.js"() {
    balanced = (a, b, str) => {
      const ma = a instanceof RegExp ? maybeMatch(a, str) : a;
      const mb = b instanceof RegExp ? maybeMatch(b, str) : b;
      const r = ma !== null && mb != null && range(ma, mb, str);
      return r && {
        start: r[0],
        end: r[1],
        pre: str.slice(0, r[0]),
        body: str.slice(r[0] + ma.length, r[1]),
        post: str.slice(r[1] + mb.length)
      };
    };
    maybeMatch = (reg, str) => {
      const m = str.match(reg);
      return m ? m[0] : null;
    };
    range = (a, b, str) => {
      let begs, beg, left, right = void 0, result;
      let ai = str.indexOf(a);
      let bi = str.indexOf(b, ai + 1);
      let i = ai;
      if (ai >= 0 && bi > 0) {
        if (a === b) {
          return [ai, bi];
        }
        begs = [];
        left = str.length;
        while (i >= 0 && !result) {
          if (i === ai) {
            begs.push(i);
            ai = str.indexOf(a, i + 1);
          } else if (begs.length === 1) {
            const r = begs.pop();
            if (r !== void 0)
              result = [r, bi];
          } else {
            beg = begs.pop();
            if (beg !== void 0 && beg < left) {
              left = beg;
              right = bi;
            }
            bi = str.indexOf(b, i + 1);
          }
          i = ai < bi && ai >= 0 ? ai : bi;
        }
        if (begs.length && right !== void 0) {
          result = [left, right];
        }
      }
      return result;
    };
  }
});

// ../../../.yarn/berry/cache/@isaacs-brace-expansion-npm-5.0.0-754d3cb3f5-10c0.zip/node_modules/@isaacs/brace-expansion/dist/esm/index.js
function numeric(str) {
  return !isNaN(str) ? parseInt(str, 10) : str.charCodeAt(0);
}
function escapeBraces(str) {
  return str.replace(slashPattern, escSlash).replace(openPattern, escOpen).replace(closePattern, escClose).replace(commaPattern, escComma).replace(periodPattern, escPeriod);
}
function unescapeBraces(str) {
  return str.replace(escSlashPattern, "\\").replace(escOpenPattern, "{").replace(escClosePattern, "}").replace(escCommaPattern, ",").replace(escPeriodPattern, ".");
}
function parseCommaParts(str) {
  if (!str) {
    return [""];
  }
  const parts = [];
  const m = balanced("{", "}", str);
  if (!m) {
    return str.split(",");
  }
  const { pre, body, post } = m;
  const p = pre.split(",");
  p[p.length - 1] += "{" + body + "}";
  const postParts = parseCommaParts(post);
  if (post.length) {
    ;
    p[p.length - 1] += postParts.shift();
    p.push.apply(p, postParts);
  }
  parts.push.apply(parts, p);
  return parts;
}
function expand(str) {
  if (!str) {
    return [];
  }
  if (str.slice(0, 2) === "{}") {
    str = "\\{\\}" + str.slice(2);
  }
  return expand_(escapeBraces(str), true).map(unescapeBraces);
}
function embrace(str) {
  return "{" + str + "}";
}
function isPadded(el) {
  return /^-?0\d/.test(el);
}
function lte(i, y) {
  return i <= y;
}
function gte(i, y) {
  return i >= y;
}
function expand_(str, isTop) {
  const expansions = [];
  const m = balanced("{", "}", str);
  if (!m)
    return [str];
  const pre = m.pre;
  const post = m.post.length ? expand_(m.post, false) : [""];
  if (/\$$/.test(m.pre)) {
    for (let k = 0; k < post.length; k++) {
      const expansion = pre + "{" + m.body + "}" + post[k];
      expansions.push(expansion);
    }
  } else {
    const isNumericSequence = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(m.body);
    const isAlphaSequence = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(m.body);
    const isSequence = isNumericSequence || isAlphaSequence;
    const isOptions = m.body.indexOf(",") >= 0;
    if (!isSequence && !isOptions) {
      if (m.post.match(/,(?!,).*\}/)) {
        str = m.pre + "{" + m.body + escClose + m.post;
        return expand_(str);
      }
      return [str];
    }
    let n;
    if (isSequence) {
      n = m.body.split(/\.\./);
    } else {
      n = parseCommaParts(m.body);
      if (n.length === 1 && n[0] !== void 0) {
        n = expand_(n[0], false).map(embrace);
        if (n.length === 1) {
          return post.map((p) => m.pre + n[0] + p);
        }
      }
    }
    let N;
    if (isSequence && n[0] !== void 0 && n[1] !== void 0) {
      const x = numeric(n[0]);
      const y = numeric(n[1]);
      const width = Math.max(n[0].length, n[1].length);
      let incr = n.length === 3 && n[2] !== void 0 ? Math.abs(numeric(n[2])) : 1;
      let test = lte;
      const reverse = y < x;
      if (reverse) {
        incr *= -1;
        test = gte;
      }
      const pad2 = n.some(isPadded);
      N = [];
      for (let i = x; test(i, y); i += incr) {
        let c;
        if (isAlphaSequence) {
          c = String.fromCharCode(i);
          if (c === "\\") {
            c = "";
          }
        } else {
          c = String(i);
          if (pad2) {
            const need = width - c.length;
            if (need > 0) {
              const z = new Array(need + 1).join("0");
              if (i < 0) {
                c = "-" + z + c.slice(1);
              } else {
                c = z + c;
              }
            }
          }
        }
        N.push(c);
      }
    } else {
      N = [];
      for (let j = 0; j < n.length; j++) {
        N.push.apply(N, expand_(n[j], false));
      }
    }
    for (let j = 0; j < N.length; j++) {
      for (let k = 0; k < post.length; k++) {
        const expansion = pre + N[j] + post[k];
        if (!isTop || isSequence || expansion) {
          expansions.push(expansion);
        }
      }
    }
  }
  return expansions;
}
var escSlash, escOpen, escClose, escComma, escPeriod, escSlashPattern, escOpenPattern, escClosePattern, escCommaPattern, escPeriodPattern, slashPattern, openPattern, closePattern, commaPattern, periodPattern;
var init_esm2 = __esm({
  "../../../.yarn/berry/cache/@isaacs-brace-expansion-npm-5.0.0-754d3cb3f5-10c0.zip/node_modules/@isaacs/brace-expansion/dist/esm/index.js"() {
    init_esm();
    escSlash = "\0SLASH" + Math.random() + "\0";
    escOpen = "\0OPEN" + Math.random() + "\0";
    escClose = "\0CLOSE" + Math.random() + "\0";
    escComma = "\0COMMA" + Math.random() + "\0";
    escPeriod = "\0PERIOD" + Math.random() + "\0";
    escSlashPattern = new RegExp(escSlash, "g");
    escOpenPattern = new RegExp(escOpen, "g");
    escClosePattern = new RegExp(escClose, "g");
    escCommaPattern = new RegExp(escComma, "g");
    escPeriodPattern = new RegExp(escPeriod, "g");
    slashPattern = /\\\\/g;
    openPattern = /\\{/g;
    closePattern = /\\}/g;
    commaPattern = /\\,/g;
    periodPattern = /\\./g;
  }
});

// ../../../.yarn/berry/cache/minimatch-npm-10.0.3-23e96438f0-10c0.zip/node_modules/minimatch/dist/esm/assert-valid-pattern.js
var MAX_PATTERN_LENGTH, assertValidPattern;
var init_assert_valid_pattern = __esm({
  "../../../.yarn/berry/cache/minimatch-npm-10.0.3-23e96438f0-10c0.zip/node_modules/minimatch/dist/esm/assert-valid-pattern.js"() {
    MAX_PATTERN_LENGTH = 1024 * 64;
    assertValidPattern = (pattern) => {
      if (typeof pattern !== "string") {
        throw new TypeError("invalid pattern");
      }
      if (pattern.length > MAX_PATTERN_LENGTH) {
        throw new TypeError("pattern is too long");
      }
    };
  }
});

// ../../../.yarn/berry/cache/minimatch-npm-10.0.3-23e96438f0-10c0.zip/node_modules/minimatch/dist/esm/brace-expressions.js
var posixClasses, braceEscape, regexpEscape, rangesToString, parseClass;
var init_brace_expressions = __esm({
  "../../../.yarn/berry/cache/minimatch-npm-10.0.3-23e96438f0-10c0.zip/node_modules/minimatch/dist/esm/brace-expressions.js"() {
    posixClasses = {
      "[:alnum:]": ["\\p{L}\\p{Nl}\\p{Nd}", true],
      "[:alpha:]": ["\\p{L}\\p{Nl}", true],
      "[:ascii:]": ["\\x00-\\x7f", false],
      "[:blank:]": ["\\p{Zs}\\t", true],
      "[:cntrl:]": ["\\p{Cc}", true],
      "[:digit:]": ["\\p{Nd}", true],
      "[:graph:]": ["\\p{Z}\\p{C}", true, true],
      "[:lower:]": ["\\p{Ll}", true],
      "[:print:]": ["\\p{C}", true],
      "[:punct:]": ["\\p{P}", true],
      "[:space:]": ["\\p{Z}\\t\\r\\n\\v\\f", true],
      "[:upper:]": ["\\p{Lu}", true],
      "[:word:]": ["\\p{L}\\p{Nl}\\p{Nd}\\p{Pc}", true],
      "[:xdigit:]": ["A-Fa-f0-9", false]
    };
    braceEscape = (s) => s.replace(/[[\]\\-]/g, "\\$&");
    regexpEscape = (s) => s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    rangesToString = (ranges) => ranges.join("");
    parseClass = (glob2, position) => {
      const pos = position;
      if (glob2.charAt(pos) !== "[") {
        throw new Error("not in a brace expression");
      }
      const ranges = [];
      const negs = [];
      let i = pos + 1;
      let sawStart = false;
      let uflag = false;
      let escaping = false;
      let negate = false;
      let endPos = pos;
      let rangeStart = "";
      WHILE: while (i < glob2.length) {
        const c = glob2.charAt(i);
        if ((c === "!" || c === "^") && i === pos + 1) {
          negate = true;
          i++;
          continue;
        }
        if (c === "]" && sawStart && !escaping) {
          endPos = i + 1;
          break;
        }
        sawStart = true;
        if (c === "\\") {
          if (!escaping) {
            escaping = true;
            i++;
            continue;
          }
        }
        if (c === "[" && !escaping) {
          for (const [cls, [unip, u, neg]] of Object.entries(posixClasses)) {
            if (glob2.startsWith(cls, i)) {
              if (rangeStart) {
                return ["$.", false, glob2.length - pos, true];
              }
              i += cls.length;
              if (neg)
                negs.push(unip);
              else
                ranges.push(unip);
              uflag = uflag || u;
              continue WHILE;
            }
          }
        }
        escaping = false;
        if (rangeStart) {
          if (c > rangeStart) {
            ranges.push(braceEscape(rangeStart) + "-" + braceEscape(c));
          } else if (c === rangeStart) {
            ranges.push(braceEscape(c));
          }
          rangeStart = "";
          i++;
          continue;
        }
        if (glob2.startsWith("-]", i + 1)) {
          ranges.push(braceEscape(c + "-"));
          i += 2;
          continue;
        }
        if (glob2.startsWith("-", i + 1)) {
          rangeStart = c;
          i += 2;
          continue;
        }
        ranges.push(braceEscape(c));
        i++;
      }
      if (endPos < i) {
        return ["", false, 0, false];
      }
      if (!ranges.length && !negs.length) {
        return ["$.", false, glob2.length - pos, true];
      }
      if (negs.length === 0 && ranges.length === 1 && /^\\?.$/.test(ranges[0]) && !negate) {
        const r = ranges[0].length === 2 ? ranges[0].slice(-1) : ranges[0];
        return [regexpEscape(r), false, endPos - pos, false];
      }
      const sranges = "[" + (negate ? "^" : "") + rangesToString(ranges) + "]";
      const snegs = "[" + (negate ? "" : "^") + rangesToString(negs) + "]";
      const comb = ranges.length && negs.length ? "(" + sranges + "|" + snegs + ")" : ranges.length ? sranges : snegs;
      return [comb, uflag, endPos - pos, true];
    };
  }
});

// ../../../.yarn/berry/cache/minimatch-npm-10.0.3-23e96438f0-10c0.zip/node_modules/minimatch/dist/esm/unescape.js
var unescape;
var init_unescape = __esm({
  "../../../.yarn/berry/cache/minimatch-npm-10.0.3-23e96438f0-10c0.zip/node_modules/minimatch/dist/esm/unescape.js"() {
    unescape = (s, { windowsPathsNoEscape = false } = {}) => {
      return windowsPathsNoEscape ? s.replace(/\[([^\/\\])\]/g, "$1") : s.replace(/((?!\\).|^)\[([^\/\\])\]/g, "$1$2").replace(/\\([^\/])/g, "$1");
    };
  }
});

// ../../../.yarn/berry/cache/minimatch-npm-10.0.3-23e96438f0-10c0.zip/node_modules/minimatch/dist/esm/ast.js
var types, isExtglobType, startNoTraversal, startNoDot, addPatternStart, justDots, reSpecials, regExpEscape, qmark, star, starNoEmpty, AST;
var init_ast = __esm({
  "../../../.yarn/berry/cache/minimatch-npm-10.0.3-23e96438f0-10c0.zip/node_modules/minimatch/dist/esm/ast.js"() {
    init_brace_expressions();
    init_unescape();
    types = /* @__PURE__ */ new Set(["!", "?", "+", "*", "@"]);
    isExtglobType = (c) => types.has(c);
    startNoTraversal = "(?!(?:^|/)\\.\\.?(?:$|/))";
    startNoDot = "(?!\\.)";
    addPatternStart = /* @__PURE__ */ new Set(["[", "."]);
    justDots = /* @__PURE__ */ new Set(["..", "."]);
    reSpecials = new Set("().*{}+?[]^$\\!");
    regExpEscape = (s) => s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    qmark = "[^/]";
    star = qmark + "*?";
    starNoEmpty = qmark + "+?";
    AST = class _AST {
      type;
      #root;
      #hasMagic;
      #uflag = false;
      #parts = [];
      #parent;
      #parentIndex;
      #negs;
      #filledNegs = false;
      #options;
      #toString;
      // set to true if it's an extglob with no children
      // (which really means one child of '')
      #emptyExt = false;
      constructor(type, parent, options = {}) {
        this.type = type;
        if (type)
          this.#hasMagic = true;
        this.#parent = parent;
        this.#root = this.#parent ? this.#parent.#root : this;
        this.#options = this.#root === this ? options : this.#root.#options;
        this.#negs = this.#root === this ? [] : this.#root.#negs;
        if (type === "!" && !this.#root.#filledNegs)
          this.#negs.push(this);
        this.#parentIndex = this.#parent ? this.#parent.#parts.length : 0;
      }
      get hasMagic() {
        if (this.#hasMagic !== void 0)
          return this.#hasMagic;
        for (const p of this.#parts) {
          if (typeof p === "string")
            continue;
          if (p.type || p.hasMagic)
            return this.#hasMagic = true;
        }
        return this.#hasMagic;
      }
      // reconstructs the pattern
      toString() {
        if (this.#toString !== void 0)
          return this.#toString;
        if (!this.type) {
          return this.#toString = this.#parts.map((p) => String(p)).join("");
        } else {
          return this.#toString = this.type + "(" + this.#parts.map((p) => String(p)).join("|") + ")";
        }
      }
      #fillNegs() {
        if (this !== this.#root)
          throw new Error("should only call on root");
        if (this.#filledNegs)
          return this;
        this.toString();
        this.#filledNegs = true;
        let n;
        while (n = this.#negs.pop()) {
          if (n.type !== "!")
            continue;
          let p = n;
          let pp = p.#parent;
          while (pp) {
            for (let i = p.#parentIndex + 1; !pp.type && i < pp.#parts.length; i++) {
              for (const part of n.#parts) {
                if (typeof part === "string") {
                  throw new Error("string part in extglob AST??");
                }
                part.copyIn(pp.#parts[i]);
              }
            }
            p = pp;
            pp = p.#parent;
          }
        }
        return this;
      }
      push(...parts) {
        for (const p of parts) {
          if (p === "")
            continue;
          if (typeof p !== "string" && !(p instanceof _AST && p.#parent === this)) {
            throw new Error("invalid part: " + p);
          }
          this.#parts.push(p);
        }
      }
      toJSON() {
        const ret = this.type === null ? this.#parts.slice().map((p) => typeof p === "string" ? p : p.toJSON()) : [this.type, ...this.#parts.map((p) => p.toJSON())];
        if (this.isStart() && !this.type)
          ret.unshift([]);
        if (this.isEnd() && (this === this.#root || this.#root.#filledNegs && this.#parent?.type === "!")) {
          ret.push({});
        }
        return ret;
      }
      isStart() {
        if (this.#root === this)
          return true;
        if (!this.#parent?.isStart())
          return false;
        if (this.#parentIndex === 0)
          return true;
        const p = this.#parent;
        for (let i = 0; i < this.#parentIndex; i++) {
          const pp = p.#parts[i];
          if (!(pp instanceof _AST && pp.type === "!")) {
            return false;
          }
        }
        return true;
      }
      isEnd() {
        if (this.#root === this)
          return true;
        if (this.#parent?.type === "!")
          return true;
        if (!this.#parent?.isEnd())
          return false;
        if (!this.type)
          return this.#parent?.isEnd();
        const pl = this.#parent ? this.#parent.#parts.length : 0;
        return this.#parentIndex === pl - 1;
      }
      copyIn(part) {
        if (typeof part === "string")
          this.push(part);
        else
          this.push(part.clone(this));
      }
      clone(parent) {
        const c = new _AST(this.type, parent);
        for (const p of this.#parts) {
          c.copyIn(p);
        }
        return c;
      }
      static #parseAST(str, ast, pos, opt) {
        let escaping = false;
        let inBrace = false;
        let braceStart = -1;
        let braceNeg = false;
        if (ast.type === null) {
          let i2 = pos;
          let acc2 = "";
          while (i2 < str.length) {
            const c = str.charAt(i2++);
            if (escaping || c === "\\") {
              escaping = !escaping;
              acc2 += c;
              continue;
            }
            if (inBrace) {
              if (i2 === braceStart + 1) {
                if (c === "^" || c === "!") {
                  braceNeg = true;
                }
              } else if (c === "]" && !(i2 === braceStart + 2 && braceNeg)) {
                inBrace = false;
              }
              acc2 += c;
              continue;
            } else if (c === "[") {
              inBrace = true;
              braceStart = i2;
              braceNeg = false;
              acc2 += c;
              continue;
            }
            if (!opt.noext && isExtglobType(c) && str.charAt(i2) === "(") {
              ast.push(acc2);
              acc2 = "";
              const ext2 = new _AST(c, ast);
              i2 = _AST.#parseAST(str, ext2, i2, opt);
              ast.push(ext2);
              continue;
            }
            acc2 += c;
          }
          ast.push(acc2);
          return i2;
        }
        let i = pos + 1;
        let part = new _AST(null, ast);
        const parts = [];
        let acc = "";
        while (i < str.length) {
          const c = str.charAt(i++);
          if (escaping || c === "\\") {
            escaping = !escaping;
            acc += c;
            continue;
          }
          if (inBrace) {
            if (i === braceStart + 1) {
              if (c === "^" || c === "!") {
                braceNeg = true;
              }
            } else if (c === "]" && !(i === braceStart + 2 && braceNeg)) {
              inBrace = false;
            }
            acc += c;
            continue;
          } else if (c === "[") {
            inBrace = true;
            braceStart = i;
            braceNeg = false;
            acc += c;
            continue;
          }
          if (isExtglobType(c) && str.charAt(i) === "(") {
            part.push(acc);
            acc = "";
            const ext2 = new _AST(c, part);
            part.push(ext2);
            i = _AST.#parseAST(str, ext2, i, opt);
            continue;
          }
          if (c === "|") {
            part.push(acc);
            acc = "";
            parts.push(part);
            part = new _AST(null, ast);
            continue;
          }
          if (c === ")") {
            if (acc === "" && ast.#parts.length === 0) {
              ast.#emptyExt = true;
            }
            part.push(acc);
            acc = "";
            ast.push(...parts, part);
            return i;
          }
          acc += c;
        }
        ast.type = null;
        ast.#hasMagic = void 0;
        ast.#parts = [str.substring(pos - 1)];
        return i;
      }
      static fromGlob(pattern, options = {}) {
        const ast = new _AST(null, void 0, options);
        _AST.#parseAST(pattern, ast, 0, options);
        return ast;
      }
      // returns the regular expression if there's magic, or the unescaped
      // string if not.
      toMMPattern() {
        if (this !== this.#root)
          return this.#root.toMMPattern();
        const glob2 = this.toString();
        const [re, body, hasMagic2, uflag] = this.toRegExpSource();
        const anyMagic = hasMagic2 || this.#hasMagic || this.#options.nocase && !this.#options.nocaseMagicOnly && glob2.toUpperCase() !== glob2.toLowerCase();
        if (!anyMagic) {
          return body;
        }
        const flags = (this.#options.nocase ? "i" : "") + (uflag ? "u" : "");
        return Object.assign(new RegExp(`^${re}$`, flags), {
          _src: re,
          _glob: glob2
        });
      }
      get options() {
        return this.#options;
      }
      // returns the string match, the regexp source, whether there's magic
      // in the regexp (so a regular expression is required) and whether or
      // not the uflag is needed for the regular expression (for posix classes)
      // TODO: instead of injecting the start/end at this point, just return
      // the BODY of the regexp, along with the start/end portions suitable
      // for binding the start/end in either a joined full-path makeRe context
      // (where we bind to (^|/), or a standalone matchPart context (where
      // we bind to ^, and not /).  Otherwise slashes get duped!
      //
      // In part-matching mode, the start is:
      // - if not isStart: nothing
      // - if traversal possible, but not allowed: ^(?!\.\.?$)
      // - if dots allowed or not possible: ^
      // - if dots possible and not allowed: ^(?!\.)
      // end is:
      // - if not isEnd(): nothing
      // - else: $
      //
      // In full-path matching mode, we put the slash at the START of the
      // pattern, so start is:
      // - if first pattern: same as part-matching mode
      // - if not isStart(): nothing
      // - if traversal possible, but not allowed: /(?!\.\.?(?:$|/))
      // - if dots allowed or not possible: /
      // - if dots possible and not allowed: /(?!\.)
      // end is:
      // - if last pattern, same as part-matching mode
      // - else nothing
      //
      // Always put the (?:$|/) on negated tails, though, because that has to be
      // there to bind the end of the negated pattern portion, and it's easier to
      // just stick it in now rather than try to inject it later in the middle of
      // the pattern.
      //
      // We can just always return the same end, and leave it up to the caller
      // to know whether it's going to be used joined or in parts.
      // And, if the start is adjusted slightly, can do the same there:
      // - if not isStart: nothing
      // - if traversal possible, but not allowed: (?:/|^)(?!\.\.?$)
      // - if dots allowed or not possible: (?:/|^)
      // - if dots possible and not allowed: (?:/|^)(?!\.)
      //
      // But it's better to have a simpler binding without a conditional, for
      // performance, so probably better to return both start options.
      //
      // Then the caller just ignores the end if it's not the first pattern,
      // and the start always gets applied.
      //
      // But that's always going to be $ if it's the ending pattern, or nothing,
      // so the caller can just attach $ at the end of the pattern when building.
      //
      // So the todo is:
      // - better detect what kind of start is needed
      // - return both flavors of starting pattern
      // - attach $ at the end of the pattern when creating the actual RegExp
      //
      // Ah, but wait, no, that all only applies to the root when the first pattern
      // is not an extglob. If the first pattern IS an extglob, then we need all
      // that dot prevention biz to live in the extglob portions, because eg
      // +(*|.x*) can match .xy but not .yx.
      //
      // So, return the two flavors if it's #root and the first child is not an
      // AST, otherwise leave it to the child AST to handle it, and there,
      // use the (?:^|/) style of start binding.
      //
      // Even simplified further:
      // - Since the start for a join is eg /(?!\.) and the start for a part
      // is ^(?!\.), we can just prepend (?!\.) to the pattern (either root
      // or start or whatever) and prepend ^ or / at the Regexp construction.
      toRegExpSource(allowDot) {
        const dot = allowDot ?? !!this.#options.dot;
        if (this.#root === this)
          this.#fillNegs();
        if (!this.type) {
          const noEmpty = this.isStart() && this.isEnd();
          const src = this.#parts.map((p) => {
            const [re, _, hasMagic2, uflag] = typeof p === "string" ? _AST.#parseGlob(p, this.#hasMagic, noEmpty) : p.toRegExpSource(allowDot);
            this.#hasMagic = this.#hasMagic || hasMagic2;
            this.#uflag = this.#uflag || uflag;
            return re;
          }).join("");
          let start2 = "";
          if (this.isStart()) {
            if (typeof this.#parts[0] === "string") {
              const dotTravAllowed = this.#parts.length === 1 && justDots.has(this.#parts[0]);
              if (!dotTravAllowed) {
                const aps = addPatternStart;
                const needNoTrav = (
                  // dots are allowed, and the pattern starts with [ or .
                  dot && aps.has(src.charAt(0)) || // the pattern starts with \., and then [ or .
                  src.startsWith("\\.") && aps.has(src.charAt(2)) || // the pattern starts with \.\., and then [ or .
                  src.startsWith("\\.\\.") && aps.has(src.charAt(4))
                );
                const needNoDot = !dot && !allowDot && aps.has(src.charAt(0));
                start2 = needNoTrav ? startNoTraversal : needNoDot ? startNoDot : "";
              }
            }
          }
          let end = "";
          if (this.isEnd() && this.#root.#filledNegs && this.#parent?.type === "!") {
            end = "(?:$|\\/)";
          }
          const final2 = start2 + src + end;
          return [
            final2,
            unescape(src),
            this.#hasMagic = !!this.#hasMagic,
            this.#uflag
          ];
        }
        const repeated = this.type === "*" || this.type === "+";
        const start = this.type === "!" ? "(?:(?!(?:" : "(?:";
        let body = this.#partsToRegExp(dot);
        if (this.isStart() && this.isEnd() && !body && this.type !== "!") {
          const s = this.toString();
          this.#parts = [s];
          this.type = null;
          this.#hasMagic = void 0;
          return [s, unescape(this.toString()), false, false];
        }
        let bodyDotAllowed = !repeated || allowDot || dot || !startNoDot ? "" : this.#partsToRegExp(true);
        if (bodyDotAllowed === body) {
          bodyDotAllowed = "";
        }
        if (bodyDotAllowed) {
          body = `(?:${body})(?:${bodyDotAllowed})*?`;
        }
        let final = "";
        if (this.type === "!" && this.#emptyExt) {
          final = (this.isStart() && !dot ? startNoDot : "") + starNoEmpty;
        } else {
          const close = this.type === "!" ? (
            // !() must match something,but !(x) can match ''
            "))" + (this.isStart() && !dot && !allowDot ? startNoDot : "") + star + ")"
          ) : this.type === "@" ? ")" : this.type === "?" ? ")?" : this.type === "+" && bodyDotAllowed ? ")" : this.type === "*" && bodyDotAllowed ? `)?` : `)${this.type}`;
          final = start + body + close;
        }
        return [
          final,
          unescape(body),
          this.#hasMagic = !!this.#hasMagic,
          this.#uflag
        ];
      }
      #partsToRegExp(dot) {
        return this.#parts.map((p) => {
          if (typeof p === "string") {
            throw new Error("string type in extglob ast??");
          }
          const [re, _, _hasMagic, uflag] = p.toRegExpSource(dot);
          this.#uflag = this.#uflag || uflag;
          return re;
        }).filter((p) => !(this.isStart() && this.isEnd()) || !!p).join("|");
      }
      static #parseGlob(glob2, hasMagic2, noEmpty = false) {
        let escaping = false;
        let re = "";
        let uflag = false;
        for (let i = 0; i < glob2.length; i++) {
          const c = glob2.charAt(i);
          if (escaping) {
            escaping = false;
            re += (reSpecials.has(c) ? "\\" : "") + c;
            continue;
          }
          if (c === "\\") {
            if (i === glob2.length - 1) {
              re += "\\\\";
            } else {
              escaping = true;
            }
            continue;
          }
          if (c === "[") {
            const [src, needUflag, consumed, magic] = parseClass(glob2, i);
            if (consumed) {
              re += src;
              uflag = uflag || needUflag;
              i += consumed - 1;
              hasMagic2 = hasMagic2 || magic;
              continue;
            }
          }
          if (c === "*") {
            if (noEmpty && glob2 === "*")
              re += starNoEmpty;
            else
              re += star;
            hasMagic2 = true;
            continue;
          }
          if (c === "?") {
            re += qmark;
            hasMagic2 = true;
            continue;
          }
          re += regExpEscape(c);
        }
        return [re, unescape(glob2), !!hasMagic2, uflag];
      }
    };
  }
});

// ../../../.yarn/berry/cache/minimatch-npm-10.0.3-23e96438f0-10c0.zip/node_modules/minimatch/dist/esm/escape.js
var escape;
var init_escape = __esm({
  "../../../.yarn/berry/cache/minimatch-npm-10.0.3-23e96438f0-10c0.zip/node_modules/minimatch/dist/esm/escape.js"() {
    escape = (s, { windowsPathsNoEscape = false } = {}) => {
      return windowsPathsNoEscape ? s.replace(/[?*()[\]]/g, "[$&]") : s.replace(/[?*()[\]\\]/g, "\\$&");
    };
  }
});

// ../../../.yarn/berry/cache/minimatch-npm-10.0.3-23e96438f0-10c0.zip/node_modules/minimatch/dist/esm/index.js
var minimatch, starDotExtRE, starDotExtTest, starDotExtTestDot, starDotExtTestNocase, starDotExtTestNocaseDot, starDotStarRE, starDotStarTest, starDotStarTestDot, dotStarRE, dotStarTest, starRE, starTest, starTestDot, qmarksRE, qmarksTestNocase, qmarksTestNocaseDot, qmarksTestDot, qmarksTest, qmarksTestNoExt, qmarksTestNoExtDot, defaultPlatform, path, sep, GLOBSTAR, qmark2, star2, twoStarDot, twoStarNoDot, filter, ext, defaults, braceExpand, makeRe, match, globMagic, regExpEscape2, Minimatch;
var init_esm3 = __esm({
  "../../../.yarn/berry/cache/minimatch-npm-10.0.3-23e96438f0-10c0.zip/node_modules/minimatch/dist/esm/index.js"() {
    init_esm2();
    init_assert_valid_pattern();
    init_ast();
    init_escape();
    init_unescape();
    init_ast();
    init_escape();
    init_unescape();
    minimatch = (p, pattern, options = {}) => {
      assertValidPattern(pattern);
      if (!options.nocomment && pattern.charAt(0) === "#") {
        return false;
      }
      return new Minimatch(pattern, options).match(p);
    };
    starDotExtRE = /^\*+([^+@!?\*\[\(]*)$/;
    starDotExtTest = (ext2) => (f) => !f.startsWith(".") && f.endsWith(ext2);
    starDotExtTestDot = (ext2) => (f) => f.endsWith(ext2);
    starDotExtTestNocase = (ext2) => {
      ext2 = ext2.toLowerCase();
      return (f) => !f.startsWith(".") && f.toLowerCase().endsWith(ext2);
    };
    starDotExtTestNocaseDot = (ext2) => {
      ext2 = ext2.toLowerCase();
      return (f) => f.toLowerCase().endsWith(ext2);
    };
    starDotStarRE = /^\*+\.\*+$/;
    starDotStarTest = (f) => !f.startsWith(".") && f.includes(".");
    starDotStarTestDot = (f) => f !== "." && f !== ".." && f.includes(".");
    dotStarRE = /^\.\*+$/;
    dotStarTest = (f) => f !== "." && f !== ".." && f.startsWith(".");
    starRE = /^\*+$/;
    starTest = (f) => f.length !== 0 && !f.startsWith(".");
    starTestDot = (f) => f.length !== 0 && f !== "." && f !== "..";
    qmarksRE = /^\?+([^+@!?\*\[\(]*)?$/;
    qmarksTestNocase = ([$0, ext2 = ""]) => {
      const noext = qmarksTestNoExt([$0]);
      if (!ext2)
        return noext;
      ext2 = ext2.toLowerCase();
      return (f) => noext(f) && f.toLowerCase().endsWith(ext2);
    };
    qmarksTestNocaseDot = ([$0, ext2 = ""]) => {
      const noext = qmarksTestNoExtDot([$0]);
      if (!ext2)
        return noext;
      ext2 = ext2.toLowerCase();
      return (f) => noext(f) && f.toLowerCase().endsWith(ext2);
    };
    qmarksTestDot = ([$0, ext2 = ""]) => {
      const noext = qmarksTestNoExtDot([$0]);
      return !ext2 ? noext : (f) => noext(f) && f.endsWith(ext2);
    };
    qmarksTest = ([$0, ext2 = ""]) => {
      const noext = qmarksTestNoExt([$0]);
      return !ext2 ? noext : (f) => noext(f) && f.endsWith(ext2);
    };
    qmarksTestNoExt = ([$0]) => {
      const len = $0.length;
      return (f) => f.length === len && !f.startsWith(".");
    };
    qmarksTestNoExtDot = ([$0]) => {
      const len = $0.length;
      return (f) => f.length === len && f !== "." && f !== "..";
    };
    defaultPlatform = typeof process === "object" && process ? typeof process.env === "object" && process.env && process.env.__MINIMATCH_TESTING_PLATFORM__ || process.platform : "posix";
    path = {
      win32: { sep: "\\" },
      posix: { sep: "/" }
    };
    sep = defaultPlatform === "win32" ? path.win32.sep : path.posix.sep;
    minimatch.sep = sep;
    GLOBSTAR = Symbol("globstar **");
    minimatch.GLOBSTAR = GLOBSTAR;
    qmark2 = "[^/]";
    star2 = qmark2 + "*?";
    twoStarDot = "(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?";
    twoStarNoDot = "(?:(?!(?:\\/|^)\\.).)*?";
    filter = (pattern, options = {}) => (p) => minimatch(p, pattern, options);
    minimatch.filter = filter;
    ext = (a, b = {}) => Object.assign({}, a, b);
    defaults = (def) => {
      if (!def || typeof def !== "object" || !Object.keys(def).length) {
        return minimatch;
      }
      const orig = minimatch;
      const m = (p, pattern, options = {}) => orig(p, pattern, ext(def, options));
      return Object.assign(m, {
        Minimatch: class Minimatch extends orig.Minimatch {
          constructor(pattern, options = {}) {
            super(pattern, ext(def, options));
          }
          static defaults(options) {
            return orig.defaults(ext(def, options)).Minimatch;
          }
        },
        AST: class AST extends orig.AST {
          /* c8 ignore start */
          constructor(type, parent, options = {}) {
            super(type, parent, ext(def, options));
          }
          /* c8 ignore stop */
          static fromGlob(pattern, options = {}) {
            return orig.AST.fromGlob(pattern, ext(def, options));
          }
        },
        unescape: (s, options = {}) => orig.unescape(s, ext(def, options)),
        escape: (s, options = {}) => orig.escape(s, ext(def, options)),
        filter: (pattern, options = {}) => orig.filter(pattern, ext(def, options)),
        defaults: (options) => orig.defaults(ext(def, options)),
        makeRe: (pattern, options = {}) => orig.makeRe(pattern, ext(def, options)),
        braceExpand: (pattern, options = {}) => orig.braceExpand(pattern, ext(def, options)),
        match: (list, pattern, options = {}) => orig.match(list, pattern, ext(def, options)),
        sep: orig.sep,
        GLOBSTAR
      });
    };
    minimatch.defaults = defaults;
    braceExpand = (pattern, options = {}) => {
      assertValidPattern(pattern);
      if (options.nobrace || !/\{(?:(?!\{).)*\}/.test(pattern)) {
        return [pattern];
      }
      return expand(pattern);
    };
    minimatch.braceExpand = braceExpand;
    makeRe = (pattern, options = {}) => new Minimatch(pattern, options).makeRe();
    minimatch.makeRe = makeRe;
    match = (list, pattern, options = {}) => {
      const mm = new Minimatch(pattern, options);
      list = list.filter((f) => mm.match(f));
      if (mm.options.nonull && !list.length) {
        list.push(pattern);
      }
      return list;
    };
    minimatch.match = match;
    globMagic = /[?*]|[+@!]\(.*?\)|\[|\]/;
    regExpEscape2 = (s) => s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    Minimatch = class {
      options;
      set;
      pattern;
      windowsPathsNoEscape;
      nonegate;
      negate;
      comment;
      empty;
      preserveMultipleSlashes;
      partial;
      globSet;
      globParts;
      nocase;
      isWindows;
      platform;
      windowsNoMagicRoot;
      regexp;
      constructor(pattern, options = {}) {
        assertValidPattern(pattern);
        options = options || {};
        this.options = options;
        this.pattern = pattern;
        this.platform = options.platform || defaultPlatform;
        this.isWindows = this.platform === "win32";
        this.windowsPathsNoEscape = !!options.windowsPathsNoEscape || options.allowWindowsEscape === false;
        if (this.windowsPathsNoEscape) {
          this.pattern = this.pattern.replace(/\\/g, "/");
        }
        this.preserveMultipleSlashes = !!options.preserveMultipleSlashes;
        this.regexp = null;
        this.negate = false;
        this.nonegate = !!options.nonegate;
        this.comment = false;
        this.empty = false;
        this.partial = !!options.partial;
        this.nocase = !!this.options.nocase;
        this.windowsNoMagicRoot = options.windowsNoMagicRoot !== void 0 ? options.windowsNoMagicRoot : !!(this.isWindows && this.nocase);
        this.globSet = [];
        this.globParts = [];
        this.set = [];
        this.make();
      }
      hasMagic() {
        if (this.options.magicalBraces && this.set.length > 1) {
          return true;
        }
        for (const pattern of this.set) {
          for (const part of pattern) {
            if (typeof part !== "string")
              return true;
          }
        }
        return false;
      }
      debug(..._) {
      }
      make() {
        const pattern = this.pattern;
        const options = this.options;
        if (!options.nocomment && pattern.charAt(0) === "#") {
          this.comment = true;
          return;
        }
        if (!pattern) {
          this.empty = true;
          return;
        }
        this.parseNegate();
        this.globSet = [...new Set(this.braceExpand())];
        if (options.debug) {
          this.debug = (...args) => console.error(...args);
        }
        this.debug(this.pattern, this.globSet);
        const rawGlobParts = this.globSet.map((s) => this.slashSplit(s));
        this.globParts = this.preprocess(rawGlobParts);
        this.debug(this.pattern, this.globParts);
        let set = this.globParts.map((s, _, __) => {
          if (this.isWindows && this.windowsNoMagicRoot) {
            const isUNC = s[0] === "" && s[1] === "" && (s[2] === "?" || !globMagic.test(s[2])) && !globMagic.test(s[3]);
            const isDrive = /^[a-z]:/i.test(s[0]);
            if (isUNC) {
              return [...s.slice(0, 4), ...s.slice(4).map((ss) => this.parse(ss))];
            } else if (isDrive) {
              return [s[0], ...s.slice(1).map((ss) => this.parse(ss))];
            }
          }
          return s.map((ss) => this.parse(ss));
        });
        this.debug(this.pattern, set);
        this.set = set.filter((s) => s.indexOf(false) === -1);
        if (this.isWindows) {
          for (let i = 0; i < this.set.length; i++) {
            const p = this.set[i];
            if (p[0] === "" && p[1] === "" && this.globParts[i][2] === "?" && typeof p[3] === "string" && /^[a-z]:$/i.test(p[3])) {
              p[2] = "?";
            }
          }
        }
        this.debug(this.pattern, this.set);
      }
      // various transforms to equivalent pattern sets that are
      // faster to process in a filesystem walk.  The goal is to
      // eliminate what we can, and push all ** patterns as far
      // to the right as possible, even if it increases the number
      // of patterns that we have to process.
      preprocess(globParts) {
        if (this.options.noglobstar) {
          for (let i = 0; i < globParts.length; i++) {
            for (let j = 0; j < globParts[i].length; j++) {
              if (globParts[i][j] === "**") {
                globParts[i][j] = "*";
              }
            }
          }
        }
        const { optimizationLevel = 1 } = this.options;
        if (optimizationLevel >= 2) {
          globParts = this.firstPhasePreProcess(globParts);
          globParts = this.secondPhasePreProcess(globParts);
        } else if (optimizationLevel >= 1) {
          globParts = this.levelOneOptimize(globParts);
        } else {
          globParts = this.adjascentGlobstarOptimize(globParts);
        }
        return globParts;
      }
      // just get rid of adjascent ** portions
      adjascentGlobstarOptimize(globParts) {
        return globParts.map((parts) => {
          let gs = -1;
          while (-1 !== (gs = parts.indexOf("**", gs + 1))) {
            let i = gs;
            while (parts[i + 1] === "**") {
              i++;
            }
            if (i !== gs) {
              parts.splice(gs, i - gs);
            }
          }
          return parts;
        });
      }
      // get rid of adjascent ** and resolve .. portions
      levelOneOptimize(globParts) {
        return globParts.map((parts) => {
          parts = parts.reduce((set, part) => {
            const prev = set[set.length - 1];
            if (part === "**" && prev === "**") {
              return set;
            }
            if (part === "..") {
              if (prev && prev !== ".." && prev !== "." && prev !== "**") {
                set.pop();
                return set;
              }
            }
            set.push(part);
            return set;
          }, []);
          return parts.length === 0 ? [""] : parts;
        });
      }
      levelTwoFileOptimize(parts) {
        if (!Array.isArray(parts)) {
          parts = this.slashSplit(parts);
        }
        let didSomething = false;
        do {
          didSomething = false;
          if (!this.preserveMultipleSlashes) {
            for (let i = 1; i < parts.length - 1; i++) {
              const p = parts[i];
              if (i === 1 && p === "" && parts[0] === "")
                continue;
              if (p === "." || p === "") {
                didSomething = true;
                parts.splice(i, 1);
                i--;
              }
            }
            if (parts[0] === "." && parts.length === 2 && (parts[1] === "." || parts[1] === "")) {
              didSomething = true;
              parts.pop();
            }
          }
          let dd = 0;
          while (-1 !== (dd = parts.indexOf("..", dd + 1))) {
            const p = parts[dd - 1];
            if (p && p !== "." && p !== ".." && p !== "**") {
              didSomething = true;
              parts.splice(dd - 1, 2);
              dd -= 2;
            }
          }
        } while (didSomething);
        return parts.length === 0 ? [""] : parts;
      }
      // First phase: single-pattern processing
      // <pre> is 1 or more portions
      // <rest> is 1 or more portions
      // <p> is any portion other than ., .., '', or **
      // <e> is . or ''
      //
      // **/.. is *brutal* for filesystem walking performance, because
      // it effectively resets the recursive walk each time it occurs,
      // and ** cannot be reduced out by a .. pattern part like a regexp
      // or most strings (other than .., ., and '') can be.
      //
      // <pre>/**/../<p>/<p>/<rest> -> {<pre>/../<p>/<p>/<rest>,<pre>/**/<p>/<p>/<rest>}
      // <pre>/<e>/<rest> -> <pre>/<rest>
      // <pre>/<p>/../<rest> -> <pre>/<rest>
      // **/**/<rest> -> **/<rest>
      //
      // **/*/<rest> -> */**/<rest> <== not valid because ** doesn't follow
      // this WOULD be allowed if ** did follow symlinks, or * didn't
      firstPhasePreProcess(globParts) {
        let didSomething = false;
        do {
          didSomething = false;
          for (let parts of globParts) {
            let gs = -1;
            while (-1 !== (gs = parts.indexOf("**", gs + 1))) {
              let gss = gs;
              while (parts[gss + 1] === "**") {
                gss++;
              }
              if (gss > gs) {
                parts.splice(gs + 1, gss - gs);
              }
              let next = parts[gs + 1];
              const p = parts[gs + 2];
              const p2 = parts[gs + 3];
              if (next !== "..")
                continue;
              if (!p || p === "." || p === ".." || !p2 || p2 === "." || p2 === "..") {
                continue;
              }
              didSomething = true;
              parts.splice(gs, 1);
              const other = parts.slice(0);
              other[gs] = "**";
              globParts.push(other);
              gs--;
            }
            if (!this.preserveMultipleSlashes) {
              for (let i = 1; i < parts.length - 1; i++) {
                const p = parts[i];
                if (i === 1 && p === "" && parts[0] === "")
                  continue;
                if (p === "." || p === "") {
                  didSomething = true;
                  parts.splice(i, 1);
                  i--;
                }
              }
              if (parts[0] === "." && parts.length === 2 && (parts[1] === "." || parts[1] === "")) {
                didSomething = true;
                parts.pop();
              }
            }
            let dd = 0;
            while (-1 !== (dd = parts.indexOf("..", dd + 1))) {
              const p = parts[dd - 1];
              if (p && p !== "." && p !== ".." && p !== "**") {
                didSomething = true;
                const needDot = dd === 1 && parts[dd + 1] === "**";
                const splin = needDot ? ["."] : [];
                parts.splice(dd - 1, 2, ...splin);
                if (parts.length === 0)
                  parts.push("");
                dd -= 2;
              }
            }
          }
        } while (didSomething);
        return globParts;
      }
      // second phase: multi-pattern dedupes
      // {<pre>/*/<rest>,<pre>/<p>/<rest>} -> <pre>/*/<rest>
      // {<pre>/<rest>,<pre>/<rest>} -> <pre>/<rest>
      // {<pre>/**/<rest>,<pre>/<rest>} -> <pre>/**/<rest>
      //
      // {<pre>/**/<rest>,<pre>/**/<p>/<rest>} -> <pre>/**/<rest>
      // ^-- not valid because ** doens't follow symlinks
      secondPhasePreProcess(globParts) {
        for (let i = 0; i < globParts.length - 1; i++) {
          for (let j = i + 1; j < globParts.length; j++) {
            const matched = this.partsMatch(globParts[i], globParts[j], !this.preserveMultipleSlashes);
            if (matched) {
              globParts[i] = [];
              globParts[j] = matched;
              break;
            }
          }
        }
        return globParts.filter((gs) => gs.length);
      }
      partsMatch(a, b, emptyGSMatch = false) {
        let ai = 0;
        let bi = 0;
        let result = [];
        let which = "";
        while (ai < a.length && bi < b.length) {
          if (a[ai] === b[bi]) {
            result.push(which === "b" ? b[bi] : a[ai]);
            ai++;
            bi++;
          } else if (emptyGSMatch && a[ai] === "**" && b[bi] === a[ai + 1]) {
            result.push(a[ai]);
            ai++;
          } else if (emptyGSMatch && b[bi] === "**" && a[ai] === b[bi + 1]) {
            result.push(b[bi]);
            bi++;
          } else if (a[ai] === "*" && b[bi] && (this.options.dot || !b[bi].startsWith(".")) && b[bi] !== "**") {
            if (which === "b")
              return false;
            which = "a";
            result.push(a[ai]);
            ai++;
            bi++;
          } else if (b[bi] === "*" && a[ai] && (this.options.dot || !a[ai].startsWith(".")) && a[ai] !== "**") {
            if (which === "a")
              return false;
            which = "b";
            result.push(b[bi]);
            ai++;
            bi++;
          } else {
            return false;
          }
        }
        return a.length === b.length && result;
      }
      parseNegate() {
        if (this.nonegate)
          return;
        const pattern = this.pattern;
        let negate = false;
        let negateOffset = 0;
        for (let i = 0; i < pattern.length && pattern.charAt(i) === "!"; i++) {
          negate = !negate;
          negateOffset++;
        }
        if (negateOffset)
          this.pattern = pattern.slice(negateOffset);
        this.negate = negate;
      }
      // set partial to true to test if, for example,
      // "/a/b" matches the start of "/*/b/*/d"
      // Partial means, if you run out of file before you run
      // out of pattern, then that's fine, as long as all
      // the parts match.
      matchOne(file, pattern, partial = false) {
        const options = this.options;
        if (this.isWindows) {
          const fileDrive = typeof file[0] === "string" && /^[a-z]:$/i.test(file[0]);
          const fileUNC = !fileDrive && file[0] === "" && file[1] === "" && file[2] === "?" && /^[a-z]:$/i.test(file[3]);
          const patternDrive = typeof pattern[0] === "string" && /^[a-z]:$/i.test(pattern[0]);
          const patternUNC = !patternDrive && pattern[0] === "" && pattern[1] === "" && pattern[2] === "?" && typeof pattern[3] === "string" && /^[a-z]:$/i.test(pattern[3]);
          const fdi = fileUNC ? 3 : fileDrive ? 0 : void 0;
          const pdi = patternUNC ? 3 : patternDrive ? 0 : void 0;
          if (typeof fdi === "number" && typeof pdi === "number") {
            const [fd, pd] = [file[fdi], pattern[pdi]];
            if (fd.toLowerCase() === pd.toLowerCase()) {
              pattern[pdi] = fd;
              if (pdi > fdi) {
                pattern = pattern.slice(pdi);
              } else if (fdi > pdi) {
                file = file.slice(fdi);
              }
            }
          }
        }
        const { optimizationLevel = 1 } = this.options;
        if (optimizationLevel >= 2) {
          file = this.levelTwoFileOptimize(file);
        }
        this.debug("matchOne", this, { file, pattern });
        this.debug("matchOne", file.length, pattern.length);
        for (var fi = 0, pi = 0, fl = file.length, pl = pattern.length; fi < fl && pi < pl; fi++, pi++) {
          this.debug("matchOne loop");
          var p = pattern[pi];
          var f = file[fi];
          this.debug(pattern, p, f);
          if (p === false) {
            return false;
          }
          if (p === GLOBSTAR) {
            this.debug("GLOBSTAR", [pattern, p, f]);
            var fr = fi;
            var pr = pi + 1;
            if (pr === pl) {
              this.debug("** at the end");
              for (; fi < fl; fi++) {
                if (file[fi] === "." || file[fi] === ".." || !options.dot && file[fi].charAt(0) === ".")
                  return false;
              }
              return true;
            }
            while (fr < fl) {
              var swallowee = file[fr];
              this.debug("\nglobstar while", file, fr, pattern, pr, swallowee);
              if (this.matchOne(file.slice(fr), pattern.slice(pr), partial)) {
                this.debug("globstar found match!", fr, fl, swallowee);
                return true;
              } else {
                if (swallowee === "." || swallowee === ".." || !options.dot && swallowee.charAt(0) === ".") {
                  this.debug("dot detected!", file, fr, pattern, pr);
                  break;
                }
                this.debug("globstar swallow a segment, and continue");
                fr++;
              }
            }
            if (partial) {
              this.debug("\n>>> no match, partial?", file, fr, pattern, pr);
              if (fr === fl) {
                return true;
              }
            }
            return false;
          }
          let hit;
          if (typeof p === "string") {
            hit = f === p;
            this.debug("string match", p, f, hit);
          } else {
            hit = p.test(f);
            this.debug("pattern match", p, f, hit);
          }
          if (!hit)
            return false;
        }
        if (fi === fl && pi === pl) {
          return true;
        } else if (fi === fl) {
          return partial;
        } else if (pi === pl) {
          return fi === fl - 1 && file[fi] === "";
        } else {
          throw new Error("wtf?");
        }
      }
      braceExpand() {
        return braceExpand(this.pattern, this.options);
      }
      parse(pattern) {
        assertValidPattern(pattern);
        const options = this.options;
        if (pattern === "**")
          return GLOBSTAR;
        if (pattern === "")
          return "";
        let m;
        let fastTest = null;
        if (m = pattern.match(starRE)) {
          fastTest = options.dot ? starTestDot : starTest;
        } else if (m = pattern.match(starDotExtRE)) {
          fastTest = (options.nocase ? options.dot ? starDotExtTestNocaseDot : starDotExtTestNocase : options.dot ? starDotExtTestDot : starDotExtTest)(m[1]);
        } else if (m = pattern.match(qmarksRE)) {
          fastTest = (options.nocase ? options.dot ? qmarksTestNocaseDot : qmarksTestNocase : options.dot ? qmarksTestDot : qmarksTest)(m);
        } else if (m = pattern.match(starDotStarRE)) {
          fastTest = options.dot ? starDotStarTestDot : starDotStarTest;
        } else if (m = pattern.match(dotStarRE)) {
          fastTest = dotStarTest;
        }
        const re = AST.fromGlob(pattern, this.options).toMMPattern();
        if (fastTest && typeof re === "object") {
          Reflect.defineProperty(re, "test", { value: fastTest });
        }
        return re;
      }
      makeRe() {
        if (this.regexp || this.regexp === false)
          return this.regexp;
        const set = this.set;
        if (!set.length) {
          this.regexp = false;
          return this.regexp;
        }
        const options = this.options;
        const twoStar = options.noglobstar ? star2 : options.dot ? twoStarDot : twoStarNoDot;
        const flags = new Set(options.nocase ? ["i"] : []);
        let re = set.map((pattern) => {
          const pp = pattern.map((p) => {
            if (p instanceof RegExp) {
              for (const f of p.flags.split(""))
                flags.add(f);
            }
            return typeof p === "string" ? regExpEscape2(p) : p === GLOBSTAR ? GLOBSTAR : p._src;
          });
          pp.forEach((p, i) => {
            const next = pp[i + 1];
            const prev = pp[i - 1];
            if (p !== GLOBSTAR || prev === GLOBSTAR) {
              return;
            }
            if (prev === void 0) {
              if (next !== void 0 && next !== GLOBSTAR) {
                pp[i + 1] = "(?:\\/|" + twoStar + "\\/)?" + next;
              } else {
                pp[i] = twoStar;
              }
            } else if (next === void 0) {
              pp[i - 1] = prev + "(?:\\/|" + twoStar + ")?";
            } else if (next !== GLOBSTAR) {
              pp[i - 1] = prev + "(?:\\/|\\/" + twoStar + "\\/)" + next;
              pp[i + 1] = GLOBSTAR;
            }
          });
          return pp.filter((p) => p !== GLOBSTAR).join("/");
        }).join("|");
        const [open, close] = set.length > 1 ? ["(?:", ")"] : ["", ""];
        re = "^" + open + re + close + "$";
        if (this.negate)
          re = "^(?!" + re + ").+$";
        try {
          this.regexp = new RegExp(re, [...flags].join(""));
        } catch (ex) {
          this.regexp = false;
        }
        return this.regexp;
      }
      slashSplit(p) {
        if (this.preserveMultipleSlashes) {
          return p.split("/");
        } else if (this.isWindows && /^\/\/[^\/]+/.test(p)) {
          return ["", ...p.split(/\/+/)];
        } else {
          return p.split(/\/+/);
        }
      }
      match(f, partial = this.partial) {
        this.debug("match", f, this.pattern);
        if (this.comment) {
          return false;
        }
        if (this.empty) {
          return f === "";
        }
        if (f === "/" && partial) {
          return true;
        }
        const options = this.options;
        if (this.isWindows) {
          f = f.split("\\").join("/");
        }
        const ff = this.slashSplit(f);
        this.debug(this.pattern, "split", ff);
        const set = this.set;
        this.debug(this.pattern, "set", set);
        let filename = ff[ff.length - 1];
        if (!filename) {
          for (let i = ff.length - 2; !filename && i >= 0; i--) {
            filename = ff[i];
          }
        }
        for (let i = 0; i < set.length; i++) {
          const pattern = set[i];
          let file = ff;
          if (options.matchBase && pattern.length === 1) {
            file = [filename];
          }
          const hit = this.matchOne(file, pattern, partial);
          if (hit) {
            if (options.flipNegate) {
              return true;
            }
            return !this.negate;
          }
        }
        if (options.flipNegate) {
          return false;
        }
        return this.negate;
      }
      static defaults(def) {
        return minimatch.defaults(def).Minimatch;
      }
    };
    minimatch.AST = AST;
    minimatch.Minimatch = Minimatch;
    minimatch.escape = escape;
    minimatch.unescape = unescape;
  }
});

// ../../../.yarn/berry/cache/lru-cache-npm-11.0.2-72e1eedbe6-10c0.zip/node_modules/lru-cache/dist/esm/index.js
var perf, warned, PROCESS, emitWarning, AC, AS, shouldWarn, TYPE, isPosInt, getUintArray, ZeroArray, Stack, LRUCache;
var init_esm4 = __esm({
  "../../../.yarn/berry/cache/lru-cache-npm-11.0.2-72e1eedbe6-10c0.zip/node_modules/lru-cache/dist/esm/index.js"() {
    perf = typeof performance === "object" && performance && typeof performance.now === "function" ? performance : Date;
    warned = /* @__PURE__ */ new Set();
    PROCESS = typeof process === "object" && !!process ? process : {};
    emitWarning = (msg, type, code, fn) => {
      typeof PROCESS.emitWarning === "function" ? PROCESS.emitWarning(msg, type, code, fn) : console.error(`[${code}] ${type}: ${msg}`);
    };
    AC = globalThis.AbortController;
    AS = globalThis.AbortSignal;
    if (typeof AC === "undefined") {
      AS = class AbortSignal {
        onabort;
        _onabort = [];
        reason;
        aborted = false;
        addEventListener(_, fn) {
          this._onabort.push(fn);
        }
      };
      AC = class AbortController {
        constructor() {
          warnACPolyfill();
        }
        signal = new AS();
        abort(reason) {
          if (this.signal.aborted)
            return;
          this.signal.reason = reason;
          this.signal.aborted = true;
          for (const fn of this.signal._onabort) {
            fn(reason);
          }
          this.signal.onabort?.(reason);
        }
      };
      let printACPolyfillWarning = PROCESS.env?.LRU_CACHE_IGNORE_AC_WARNING !== "1";
      const warnACPolyfill = () => {
        if (!printACPolyfillWarning)
          return;
        printACPolyfillWarning = false;
        emitWarning("AbortController is not defined. If using lru-cache in node 14, load an AbortController polyfill from the `node-abort-controller` package. A minimal polyfill is provided for use by LRUCache.fetch(), but it should not be relied upon in other contexts (eg, passing it to other APIs that use AbortController/AbortSignal might have undesirable effects). You may disable this with LRU_CACHE_IGNORE_AC_WARNING=1 in the env.", "NO_ABORT_CONTROLLER", "ENOTSUP", warnACPolyfill);
      };
    }
    shouldWarn = (code) => !warned.has(code);
    TYPE = Symbol("type");
    isPosInt = (n) => n && n === Math.floor(n) && n > 0 && isFinite(n);
    getUintArray = (max) => !isPosInt(max) ? null : max <= Math.pow(2, 8) ? Uint8Array : max <= Math.pow(2, 16) ? Uint16Array : max <= Math.pow(2, 32) ? Uint32Array : max <= Number.MAX_SAFE_INTEGER ? ZeroArray : null;
    ZeroArray = class extends Array {
      constructor(size2) {
        super(size2);
        this.fill(0);
      }
    };
    Stack = class _Stack {
      heap;
      length;
      // private constructor
      static #constructing = false;
      static create(max) {
        const HeapCls = getUintArray(max);
        if (!HeapCls)
          return [];
        _Stack.#constructing = true;
        const s = new _Stack(max, HeapCls);
        _Stack.#constructing = false;
        return s;
      }
      constructor(max, HeapCls) {
        if (!_Stack.#constructing) {
          throw new TypeError("instantiate Stack using Stack.create(n)");
        }
        this.heap = new HeapCls(max);
        this.length = 0;
      }
      push(n) {
        this.heap[this.length++] = n;
      }
      pop() {
        return this.heap[--this.length];
      }
    };
    LRUCache = class _LRUCache {
      // options that cannot be changed without disaster
      #max;
      #maxSize;
      #dispose;
      #disposeAfter;
      #fetchMethod;
      #memoMethod;
      /**
       * {@link LRUCache.OptionsBase.ttl}
       */
      ttl;
      /**
       * {@link LRUCache.OptionsBase.ttlResolution}
       */
      ttlResolution;
      /**
       * {@link LRUCache.OptionsBase.ttlAutopurge}
       */
      ttlAutopurge;
      /**
       * {@link LRUCache.OptionsBase.updateAgeOnGet}
       */
      updateAgeOnGet;
      /**
       * {@link LRUCache.OptionsBase.updateAgeOnHas}
       */
      updateAgeOnHas;
      /**
       * {@link LRUCache.OptionsBase.allowStale}
       */
      allowStale;
      /**
       * {@link LRUCache.OptionsBase.noDisposeOnSet}
       */
      noDisposeOnSet;
      /**
       * {@link LRUCache.OptionsBase.noUpdateTTL}
       */
      noUpdateTTL;
      /**
       * {@link LRUCache.OptionsBase.maxEntrySize}
       */
      maxEntrySize;
      /**
       * {@link LRUCache.OptionsBase.sizeCalculation}
       */
      sizeCalculation;
      /**
       * {@link LRUCache.OptionsBase.noDeleteOnFetchRejection}
       */
      noDeleteOnFetchRejection;
      /**
       * {@link LRUCache.OptionsBase.noDeleteOnStaleGet}
       */
      noDeleteOnStaleGet;
      /**
       * {@link LRUCache.OptionsBase.allowStaleOnFetchAbort}
       */
      allowStaleOnFetchAbort;
      /**
       * {@link LRUCache.OptionsBase.allowStaleOnFetchRejection}
       */
      allowStaleOnFetchRejection;
      /**
       * {@link LRUCache.OptionsBase.ignoreFetchAbort}
       */
      ignoreFetchAbort;
      // computed properties
      #size;
      #calculatedSize;
      #keyMap;
      #keyList;
      #valList;
      #next;
      #prev;
      #head;
      #tail;
      #free;
      #disposed;
      #sizes;
      #starts;
      #ttls;
      #hasDispose;
      #hasFetchMethod;
      #hasDisposeAfter;
      /**
       * Do not call this method unless you need to inspect the
       * inner workings of the cache.  If anything returned by this
       * object is modified in any way, strange breakage may occur.
       *
       * These fields are private for a reason!
       *
       * @internal
       */
      static unsafeExposeInternals(c) {
        return {
          // properties
          starts: c.#starts,
          ttls: c.#ttls,
          sizes: c.#sizes,
          keyMap: c.#keyMap,
          keyList: c.#keyList,
          valList: c.#valList,
          next: c.#next,
          prev: c.#prev,
          get head() {
            return c.#head;
          },
          get tail() {
            return c.#tail;
          },
          free: c.#free,
          // methods
          isBackgroundFetch: (p) => c.#isBackgroundFetch(p),
          backgroundFetch: (k, index, options, context) => c.#backgroundFetch(k, index, options, context),
          moveToTail: (index) => c.#moveToTail(index),
          indexes: (options) => c.#indexes(options),
          rindexes: (options) => c.#rindexes(options),
          isStale: (index) => c.#isStale(index)
        };
      }
      // Protected read-only members
      /**
       * {@link LRUCache.OptionsBase.max} (read-only)
       */
      get max() {
        return this.#max;
      }
      /**
       * {@link LRUCache.OptionsBase.maxSize} (read-only)
       */
      get maxSize() {
        return this.#maxSize;
      }
      /**
       * The total computed size of items in the cache (read-only)
       */
      get calculatedSize() {
        return this.#calculatedSize;
      }
      /**
       * The number of items stored in the cache (read-only)
       */
      get size() {
        return this.#size;
      }
      /**
       * {@link LRUCache.OptionsBase.fetchMethod} (read-only)
       */
      get fetchMethod() {
        return this.#fetchMethod;
      }
      get memoMethod() {
        return this.#memoMethod;
      }
      /**
       * {@link LRUCache.OptionsBase.dispose} (read-only)
       */
      get dispose() {
        return this.#dispose;
      }
      /**
       * {@link LRUCache.OptionsBase.disposeAfter} (read-only)
       */
      get disposeAfter() {
        return this.#disposeAfter;
      }
      constructor(options) {
        const { max = 0, ttl, ttlResolution = 1, ttlAutopurge, updateAgeOnGet, updateAgeOnHas, allowStale, dispose, disposeAfter, noDisposeOnSet, noUpdateTTL, maxSize = 0, maxEntrySize = 0, sizeCalculation, fetchMethod, memoMethod, noDeleteOnFetchRejection, noDeleteOnStaleGet, allowStaleOnFetchRejection, allowStaleOnFetchAbort, ignoreFetchAbort } = options;
        if (max !== 0 && !isPosInt(max)) {
          throw new TypeError("max option must be a nonnegative integer");
        }
        const UintArray = max ? getUintArray(max) : Array;
        if (!UintArray) {
          throw new Error("invalid max value: " + max);
        }
        this.#max = max;
        this.#maxSize = maxSize;
        this.maxEntrySize = maxEntrySize || this.#maxSize;
        this.sizeCalculation = sizeCalculation;
        if (this.sizeCalculation) {
          if (!this.#maxSize && !this.maxEntrySize) {
            throw new TypeError("cannot set sizeCalculation without setting maxSize or maxEntrySize");
          }
          if (typeof this.sizeCalculation !== "function") {
            throw new TypeError("sizeCalculation set to non-function");
          }
        }
        if (memoMethod !== void 0 && typeof memoMethod !== "function") {
          throw new TypeError("memoMethod must be a function if defined");
        }
        this.#memoMethod = memoMethod;
        if (fetchMethod !== void 0 && typeof fetchMethod !== "function") {
          throw new TypeError("fetchMethod must be a function if specified");
        }
        this.#fetchMethod = fetchMethod;
        this.#hasFetchMethod = !!fetchMethod;
        this.#keyMap = /* @__PURE__ */ new Map();
        this.#keyList = new Array(max).fill(void 0);
        this.#valList = new Array(max).fill(void 0);
        this.#next = new UintArray(max);
        this.#prev = new UintArray(max);
        this.#head = 0;
        this.#tail = 0;
        this.#free = Stack.create(max);
        this.#size = 0;
        this.#calculatedSize = 0;
        if (typeof dispose === "function") {
          this.#dispose = dispose;
        }
        if (typeof disposeAfter === "function") {
          this.#disposeAfter = disposeAfter;
          this.#disposed = [];
        } else {
          this.#disposeAfter = void 0;
          this.#disposed = void 0;
        }
        this.#hasDispose = !!this.#dispose;
        this.#hasDisposeAfter = !!this.#disposeAfter;
        this.noDisposeOnSet = !!noDisposeOnSet;
        this.noUpdateTTL = !!noUpdateTTL;
        this.noDeleteOnFetchRejection = !!noDeleteOnFetchRejection;
        this.allowStaleOnFetchRejection = !!allowStaleOnFetchRejection;
        this.allowStaleOnFetchAbort = !!allowStaleOnFetchAbort;
        this.ignoreFetchAbort = !!ignoreFetchAbort;
        if (this.maxEntrySize !== 0) {
          if (this.#maxSize !== 0) {
            if (!isPosInt(this.#maxSize)) {
              throw new TypeError("maxSize must be a positive integer if specified");
            }
          }
          if (!isPosInt(this.maxEntrySize)) {
            throw new TypeError("maxEntrySize must be a positive integer if specified");
          }
          this.#initializeSizeTracking();
        }
        this.allowStale = !!allowStale;
        this.noDeleteOnStaleGet = !!noDeleteOnStaleGet;
        this.updateAgeOnGet = !!updateAgeOnGet;
        this.updateAgeOnHas = !!updateAgeOnHas;
        this.ttlResolution = isPosInt(ttlResolution) || ttlResolution === 0 ? ttlResolution : 1;
        this.ttlAutopurge = !!ttlAutopurge;
        this.ttl = ttl || 0;
        if (this.ttl) {
          if (!isPosInt(this.ttl)) {
            throw new TypeError("ttl must be a positive integer if specified");
          }
          this.#initializeTTLTracking();
        }
        if (this.#max === 0 && this.ttl === 0 && this.#maxSize === 0) {
          throw new TypeError("At least one of max, maxSize, or ttl is required");
        }
        if (!this.ttlAutopurge && !this.#max && !this.#maxSize) {
          const code = "LRU_CACHE_UNBOUNDED";
          if (shouldWarn(code)) {
            warned.add(code);
            const msg = "TTL caching without ttlAutopurge, max, or maxSize can result in unbounded memory consumption.";
            emitWarning(msg, "UnboundedCacheWarning", code, _LRUCache);
          }
        }
      }
      /**
       * Return the number of ms left in the item's TTL. If item is not in cache,
       * returns `0`. Returns `Infinity` if item is in cache without a defined TTL.
       */
      getRemainingTTL(key) {
        return this.#keyMap.has(key) ? Infinity : 0;
      }
      #initializeTTLTracking() {
        const ttls = new ZeroArray(this.#max);
        const starts = new ZeroArray(this.#max);
        this.#ttls = ttls;
        this.#starts = starts;
        this.#setItemTTL = (index, ttl, start = perf.now()) => {
          starts[index] = ttl !== 0 ? start : 0;
          ttls[index] = ttl;
          if (ttl !== 0 && this.ttlAutopurge) {
            const t = setTimeout(() => {
              if (this.#isStale(index)) {
                this.#delete(this.#keyList[index], "expire");
              }
            }, ttl + 1);
            if (t.unref) {
              t.unref();
            }
          }
        };
        this.#updateItemAge = (index) => {
          starts[index] = ttls[index] !== 0 ? perf.now() : 0;
        };
        this.#statusTTL = (status, index) => {
          if (ttls[index]) {
            const ttl = ttls[index];
            const start = starts[index];
            if (!ttl || !start)
              return;
            status.ttl = ttl;
            status.start = start;
            status.now = cachedNow || getNow();
            const age = status.now - start;
            status.remainingTTL = ttl - age;
          }
        };
        let cachedNow = 0;
        const getNow = () => {
          const n = perf.now();
          if (this.ttlResolution > 0) {
            cachedNow = n;
            const t = setTimeout(() => cachedNow = 0, this.ttlResolution);
            if (t.unref) {
              t.unref();
            }
          }
          return n;
        };
        this.getRemainingTTL = (key) => {
          const index = this.#keyMap.get(key);
          if (index === void 0) {
            return 0;
          }
          const ttl = ttls[index];
          const start = starts[index];
          if (!ttl || !start) {
            return Infinity;
          }
          const age = (cachedNow || getNow()) - start;
          return ttl - age;
        };
        this.#isStale = (index) => {
          const s = starts[index];
          const t = ttls[index];
          return !!t && !!s && (cachedNow || getNow()) - s > t;
        };
      }
      // conditionally set private methods related to TTL
      #updateItemAge = () => {
      };
      #statusTTL = () => {
      };
      #setItemTTL = () => {
      };
      /* c8 ignore stop */
      #isStale = () => false;
      #initializeSizeTracking() {
        const sizes = new ZeroArray(this.#max);
        this.#calculatedSize = 0;
        this.#sizes = sizes;
        this.#removeItemSize = (index) => {
          this.#calculatedSize -= sizes[index];
          sizes[index] = 0;
        };
        this.#requireSize = (k, v, size2, sizeCalculation) => {
          if (this.#isBackgroundFetch(v)) {
            return 0;
          }
          if (!isPosInt(size2)) {
            if (sizeCalculation) {
              if (typeof sizeCalculation !== "function") {
                throw new TypeError("sizeCalculation must be a function");
              }
              size2 = sizeCalculation(v, k);
              if (!isPosInt(size2)) {
                throw new TypeError("sizeCalculation return invalid (expect positive integer)");
              }
            } else {
              throw new TypeError("invalid size value (must be positive integer). When maxSize or maxEntrySize is used, sizeCalculation or size must be set.");
            }
          }
          return size2;
        };
        this.#addItemSize = (index, size2, status) => {
          sizes[index] = size2;
          if (this.#maxSize) {
            const maxSize = this.#maxSize - sizes[index];
            while (this.#calculatedSize > maxSize) {
              this.#evict(true);
            }
          }
          this.#calculatedSize += sizes[index];
          if (status) {
            status.entrySize = size2;
            status.totalCalculatedSize = this.#calculatedSize;
          }
        };
      }
      #removeItemSize = (_i) => {
      };
      #addItemSize = (_i, _s, _st) => {
      };
      #requireSize = (_k, _v, size2, sizeCalculation) => {
        if (size2 || sizeCalculation) {
          throw new TypeError("cannot set size without setting maxSize or maxEntrySize on cache");
        }
        return 0;
      };
      *#indexes({ allowStale = this.allowStale } = {}) {
        if (this.#size) {
          for (let i = this.#tail; true; ) {
            if (!this.#isValidIndex(i)) {
              break;
            }
            if (allowStale || !this.#isStale(i)) {
              yield i;
            }
            if (i === this.#head) {
              break;
            } else {
              i = this.#prev[i];
            }
          }
        }
      }
      *#rindexes({ allowStale = this.allowStale } = {}) {
        if (this.#size) {
          for (let i = this.#head; true; ) {
            if (!this.#isValidIndex(i)) {
              break;
            }
            if (allowStale || !this.#isStale(i)) {
              yield i;
            }
            if (i === this.#tail) {
              break;
            } else {
              i = this.#next[i];
            }
          }
        }
      }
      #isValidIndex(index) {
        return index !== void 0 && this.#keyMap.get(this.#keyList[index]) === index;
      }
      /**
       * Return a generator yielding `[key, value]` pairs,
       * in order from most recently used to least recently used.
       */
      *entries() {
        for (const i of this.#indexes()) {
          if (this.#valList[i] !== void 0 && this.#keyList[i] !== void 0 && !this.#isBackgroundFetch(this.#valList[i])) {
            yield [this.#keyList[i], this.#valList[i]];
          }
        }
      }
      /**
       * Inverse order version of {@link LRUCache.entries}
       *
       * Return a generator yielding `[key, value]` pairs,
       * in order from least recently used to most recently used.
       */
      *rentries() {
        for (const i of this.#rindexes()) {
          if (this.#valList[i] !== void 0 && this.#keyList[i] !== void 0 && !this.#isBackgroundFetch(this.#valList[i])) {
            yield [this.#keyList[i], this.#valList[i]];
          }
        }
      }
      /**
       * Return a generator yielding the keys in the cache,
       * in order from most recently used to least recently used.
       */
      *keys() {
        for (const i of this.#indexes()) {
          const k = this.#keyList[i];
          if (k !== void 0 && !this.#isBackgroundFetch(this.#valList[i])) {
            yield k;
          }
        }
      }
      /**
       * Inverse order version of {@link LRUCache.keys}
       *
       * Return a generator yielding the keys in the cache,
       * in order from least recently used to most recently used.
       */
      *rkeys() {
        for (const i of this.#rindexes()) {
          const k = this.#keyList[i];
          if (k !== void 0 && !this.#isBackgroundFetch(this.#valList[i])) {
            yield k;
          }
        }
      }
      /**
       * Return a generator yielding the values in the cache,
       * in order from most recently used to least recently used.
       */
      *values() {
        for (const i of this.#indexes()) {
          const v = this.#valList[i];
          if (v !== void 0 && !this.#isBackgroundFetch(this.#valList[i])) {
            yield this.#valList[i];
          }
        }
      }
      /**
       * Inverse order version of {@link LRUCache.values}
       *
       * Return a generator yielding the values in the cache,
       * in order from least recently used to most recently used.
       */
      *rvalues() {
        for (const i of this.#rindexes()) {
          const v = this.#valList[i];
          if (v !== void 0 && !this.#isBackgroundFetch(this.#valList[i])) {
            yield this.#valList[i];
          }
        }
      }
      /**
       * Iterating over the cache itself yields the same results as
       * {@link LRUCache.entries}
       */
      [Symbol.iterator]() {
        return this.entries();
      }
      /**
       * A String value that is used in the creation of the default string
       * description of an object. Called by the built-in method
       * `Object.prototype.toString`.
       */
      [Symbol.toStringTag] = "LRUCache";
      /**
       * Find a value for which the supplied fn method returns a truthy value,
       * similar to `Array.find()`. fn is called as `fn(value, key, cache)`.
       */
      find(fn, getOptions = {}) {
        for (const i of this.#indexes()) {
          const v = this.#valList[i];
          const value = this.#isBackgroundFetch(v) ? v.__staleWhileFetching : v;
          if (value === void 0)
            continue;
          if (fn(value, this.#keyList[i], this)) {
            return this.get(this.#keyList[i], getOptions);
          }
        }
      }
      /**
       * Call the supplied function on each item in the cache, in order from most
       * recently used to least recently used.
       *
       * `fn` is called as `fn(value, key, cache)`.
       *
       * If `thisp` is provided, function will be called in the `this`-context of
       * the provided object, or the cache if no `thisp` object is provided.
       *
       * Does not update age or recenty of use, or iterate over stale values.
       */
      forEach(fn, thisp = this) {
        for (const i of this.#indexes()) {
          const v = this.#valList[i];
          const value = this.#isBackgroundFetch(v) ? v.__staleWhileFetching : v;
          if (value === void 0)
            continue;
          fn.call(thisp, value, this.#keyList[i], this);
        }
      }
      /**
       * The same as {@link LRUCache.forEach} but items are iterated over in
       * reverse order.  (ie, less recently used items are iterated over first.)
       */
      rforEach(fn, thisp = this) {
        for (const i of this.#rindexes()) {
          const v = this.#valList[i];
          const value = this.#isBackgroundFetch(v) ? v.__staleWhileFetching : v;
          if (value === void 0)
            continue;
          fn.call(thisp, value, this.#keyList[i], this);
        }
      }
      /**
       * Delete any stale entries. Returns true if anything was removed,
       * false otherwise.
       */
      purgeStale() {
        let deleted = false;
        for (const i of this.#rindexes({ allowStale: true })) {
          if (this.#isStale(i)) {
            this.#delete(this.#keyList[i], "expire");
            deleted = true;
          }
        }
        return deleted;
      }
      /**
       * Get the extended info about a given entry, to get its value, size, and
       * TTL info simultaneously. Returns `undefined` if the key is not present.
       *
       * Unlike {@link LRUCache#dump}, which is designed to be portable and survive
       * serialization, the `start` value is always the current timestamp, and the
       * `ttl` is a calculated remaining time to live (negative if expired).
       *
       * Always returns stale values, if their info is found in the cache, so be
       * sure to check for expirations (ie, a negative {@link LRUCache.Entry#ttl})
       * if relevant.
       */
      info(key) {
        const i = this.#keyMap.get(key);
        if (i === void 0)
          return void 0;
        const v = this.#valList[i];
        const value = this.#isBackgroundFetch(v) ? v.__staleWhileFetching : v;
        if (value === void 0)
          return void 0;
        const entry = { value };
        if (this.#ttls && this.#starts) {
          const ttl = this.#ttls[i];
          const start = this.#starts[i];
          if (ttl && start) {
            const remain = ttl - (perf.now() - start);
            entry.ttl = remain;
            entry.start = Date.now();
          }
        }
        if (this.#sizes) {
          entry.size = this.#sizes[i];
        }
        return entry;
      }
      /**
       * Return an array of [key, {@link LRUCache.Entry}] tuples which can be
       * passed to {@link LRUCache#load}.
       *
       * The `start` fields are calculated relative to a portable `Date.now()`
       * timestamp, even if `performance.now()` is available.
       *
       * Stale entries are always included in the `dump`, even if
       * {@link LRUCache.OptionsBase.allowStale} is false.
       *
       * Note: this returns an actual array, not a generator, so it can be more
       * easily passed around.
       */
      dump() {
        const arr = [];
        for (const i of this.#indexes({ allowStale: true })) {
          const key = this.#keyList[i];
          const v = this.#valList[i];
          const value = this.#isBackgroundFetch(v) ? v.__staleWhileFetching : v;
          if (value === void 0 || key === void 0)
            continue;
          const entry = { value };
          if (this.#ttls && this.#starts) {
            entry.ttl = this.#ttls[i];
            const age = perf.now() - this.#starts[i];
            entry.start = Math.floor(Date.now() - age);
          }
          if (this.#sizes) {
            entry.size = this.#sizes[i];
          }
          arr.unshift([key, entry]);
        }
        return arr;
      }
      /**
       * Reset the cache and load in the items in entries in the order listed.
       *
       * The shape of the resulting cache may be different if the same options are
       * not used in both caches.
       *
       * The `start` fields are assumed to be calculated relative to a portable
       * `Date.now()` timestamp, even if `performance.now()` is available.
       */
      load(arr) {
        this.clear();
        for (const [key, entry] of arr) {
          if (entry.start) {
            const age = Date.now() - entry.start;
            entry.start = perf.now() - age;
          }
          this.set(key, entry.value, entry);
        }
      }
      /**
       * Add a value to the cache.
       *
       * Note: if `undefined` is specified as a value, this is an alias for
       * {@link LRUCache#delete}
       *
       * Fields on the {@link LRUCache.SetOptions} options param will override
       * their corresponding values in the constructor options for the scope
       * of this single `set()` operation.
       *
       * If `start` is provided, then that will set the effective start
       * time for the TTL calculation. Note that this must be a previous
       * value of `performance.now()` if supported, or a previous value of
       * `Date.now()` if not.
       *
       * Options object may also include `size`, which will prevent
       * calling the `sizeCalculation` function and just use the specified
       * number if it is a positive integer, and `noDisposeOnSet` which
       * will prevent calling a `dispose` function in the case of
       * overwrites.
       *
       * If the `size` (or return value of `sizeCalculation`) for a given
       * entry is greater than `maxEntrySize`, then the item will not be
       * added to the cache.
       *
       * Will update the recency of the entry.
       *
       * If the value is `undefined`, then this is an alias for
       * `cache.delete(key)`. `undefined` is never stored in the cache.
       */
      set(k, v, setOptions = {}) {
        if (v === void 0) {
          this.delete(k);
          return this;
        }
        const { ttl = this.ttl, start, noDisposeOnSet = this.noDisposeOnSet, sizeCalculation = this.sizeCalculation, status } = setOptions;
        let { noUpdateTTL = this.noUpdateTTL } = setOptions;
        const size2 = this.#requireSize(k, v, setOptions.size || 0, sizeCalculation);
        if (this.maxEntrySize && size2 > this.maxEntrySize) {
          if (status) {
            status.set = "miss";
            status.maxEntrySizeExceeded = true;
          }
          this.#delete(k, "set");
          return this;
        }
        let index = this.#size === 0 ? void 0 : this.#keyMap.get(k);
        if (index === void 0) {
          index = this.#size === 0 ? this.#tail : this.#free.length !== 0 ? this.#free.pop() : this.#size === this.#max ? this.#evict(false) : this.#size;
          this.#keyList[index] = k;
          this.#valList[index] = v;
          this.#keyMap.set(k, index);
          this.#next[this.#tail] = index;
          this.#prev[index] = this.#tail;
          this.#tail = index;
          this.#size++;
          this.#addItemSize(index, size2, status);
          if (status)
            status.set = "add";
          noUpdateTTL = false;
        } else {
          this.#moveToTail(index);
          const oldVal = this.#valList[index];
          if (v !== oldVal) {
            if (this.#hasFetchMethod && this.#isBackgroundFetch(oldVal)) {
              oldVal.__abortController.abort(new Error("replaced"));
              const { __staleWhileFetching: s } = oldVal;
              if (s !== void 0 && !noDisposeOnSet) {
                if (this.#hasDispose) {
                  this.#dispose?.(s, k, "set");
                }
                if (this.#hasDisposeAfter) {
                  this.#disposed?.push([s, k, "set"]);
                }
              }
            } else if (!noDisposeOnSet) {
              if (this.#hasDispose) {
                this.#dispose?.(oldVal, k, "set");
              }
              if (this.#hasDisposeAfter) {
                this.#disposed?.push([oldVal, k, "set"]);
              }
            }
            this.#removeItemSize(index);
            this.#addItemSize(index, size2, status);
            this.#valList[index] = v;
            if (status) {
              status.set = "replace";
              const oldValue = oldVal && this.#isBackgroundFetch(oldVal) ? oldVal.__staleWhileFetching : oldVal;
              if (oldValue !== void 0)
                status.oldValue = oldValue;
            }
          } else if (status) {
            status.set = "update";
          }
        }
        if (ttl !== 0 && !this.#ttls) {
          this.#initializeTTLTracking();
        }
        if (this.#ttls) {
          if (!noUpdateTTL) {
            this.#setItemTTL(index, ttl, start);
          }
          if (status)
            this.#statusTTL(status, index);
        }
        if (!noDisposeOnSet && this.#hasDisposeAfter && this.#disposed) {
          const dt = this.#disposed;
          let task;
          while (task = dt?.shift()) {
            this.#disposeAfter?.(...task);
          }
        }
        return this;
      }
      /**
       * Evict the least recently used item, returning its value or
       * `undefined` if cache is empty.
       */
      pop() {
        try {
          while (this.#size) {
            const val = this.#valList[this.#head];
            this.#evict(true);
            if (this.#isBackgroundFetch(val)) {
              if (val.__staleWhileFetching) {
                return val.__staleWhileFetching;
              }
            } else if (val !== void 0) {
              return val;
            }
          }
        } finally {
          if (this.#hasDisposeAfter && this.#disposed) {
            const dt = this.#disposed;
            let task;
            while (task = dt?.shift()) {
              this.#disposeAfter?.(...task);
            }
          }
        }
      }
      #evict(free) {
        const head = this.#head;
        const k = this.#keyList[head];
        const v = this.#valList[head];
        if (this.#hasFetchMethod && this.#isBackgroundFetch(v)) {
          v.__abortController.abort(new Error("evicted"));
        } else if (this.#hasDispose || this.#hasDisposeAfter) {
          if (this.#hasDispose) {
            this.#dispose?.(v, k, "evict");
          }
          if (this.#hasDisposeAfter) {
            this.#disposed?.push([v, k, "evict"]);
          }
        }
        this.#removeItemSize(head);
        if (free) {
          this.#keyList[head] = void 0;
          this.#valList[head] = void 0;
          this.#free.push(head);
        }
        if (this.#size === 1) {
          this.#head = this.#tail = 0;
          this.#free.length = 0;
        } else {
          this.#head = this.#next[head];
        }
        this.#keyMap.delete(k);
        this.#size--;
        return head;
      }
      /**
       * Check if a key is in the cache, without updating the recency of use.
       * Will return false if the item is stale, even though it is technically
       * in the cache.
       *
       * Check if a key is in the cache, without updating the recency of
       * use. Age is updated if {@link LRUCache.OptionsBase.updateAgeOnHas} is set
       * to `true` in either the options or the constructor.
       *
       * Will return `false` if the item is stale, even though it is technically in
       * the cache. The difference can be determined (if it matters) by using a
       * `status` argument, and inspecting the `has` field.
       *
       * Will not update item age unless
       * {@link LRUCache.OptionsBase.updateAgeOnHas} is set.
       */
      has(k, hasOptions = {}) {
        const { updateAgeOnHas = this.updateAgeOnHas, status } = hasOptions;
        const index = this.#keyMap.get(k);
        if (index !== void 0) {
          const v = this.#valList[index];
          if (this.#isBackgroundFetch(v) && v.__staleWhileFetching === void 0) {
            return false;
          }
          if (!this.#isStale(index)) {
            if (updateAgeOnHas) {
              this.#updateItemAge(index);
            }
            if (status) {
              status.has = "hit";
              this.#statusTTL(status, index);
            }
            return true;
          } else if (status) {
            status.has = "stale";
            this.#statusTTL(status, index);
          }
        } else if (status) {
          status.has = "miss";
        }
        return false;
      }
      /**
       * Like {@link LRUCache#get} but doesn't update recency or delete stale
       * items.
       *
       * Returns `undefined` if the item is stale, unless
       * {@link LRUCache.OptionsBase.allowStale} is set.
       */
      peek(k, peekOptions = {}) {
        const { allowStale = this.allowStale } = peekOptions;
        const index = this.#keyMap.get(k);
        if (index === void 0 || !allowStale && this.#isStale(index)) {
          return;
        }
        const v = this.#valList[index];
        return this.#isBackgroundFetch(v) ? v.__staleWhileFetching : v;
      }
      #backgroundFetch(k, index, options, context) {
        const v = index === void 0 ? void 0 : this.#valList[index];
        if (this.#isBackgroundFetch(v)) {
          return v;
        }
        const ac = new AC();
        const { signal } = options;
        signal?.addEventListener("abort", () => ac.abort(signal.reason), {
          signal: ac.signal
        });
        const fetchOpts = {
          signal: ac.signal,
          options,
          context
        };
        const cb = (v2, updateCache = false) => {
          const { aborted } = ac.signal;
          const ignoreAbort = options.ignoreFetchAbort && v2 !== void 0;
          if (options.status) {
            if (aborted && !updateCache) {
              options.status.fetchAborted = true;
              options.status.fetchError = ac.signal.reason;
              if (ignoreAbort)
                options.status.fetchAbortIgnored = true;
            } else {
              options.status.fetchResolved = true;
            }
          }
          if (aborted && !ignoreAbort && !updateCache) {
            return fetchFail(ac.signal.reason);
          }
          const bf2 = p;
          if (this.#valList[index] === p) {
            if (v2 === void 0) {
              if (bf2.__staleWhileFetching) {
                this.#valList[index] = bf2.__staleWhileFetching;
              } else {
                this.#delete(k, "fetch");
              }
            } else {
              if (options.status)
                options.status.fetchUpdated = true;
              this.set(k, v2, fetchOpts.options);
            }
          }
          return v2;
        };
        const eb = (er) => {
          if (options.status) {
            options.status.fetchRejected = true;
            options.status.fetchError = er;
          }
          return fetchFail(er);
        };
        const fetchFail = (er) => {
          const { aborted } = ac.signal;
          const allowStaleAborted = aborted && options.allowStaleOnFetchAbort;
          const allowStale = allowStaleAborted || options.allowStaleOnFetchRejection;
          const noDelete = allowStale || options.noDeleteOnFetchRejection;
          const bf2 = p;
          if (this.#valList[index] === p) {
            const del = !noDelete || bf2.__staleWhileFetching === void 0;
            if (del) {
              this.#delete(k, "fetch");
            } else if (!allowStaleAborted) {
              this.#valList[index] = bf2.__staleWhileFetching;
            }
          }
          if (allowStale) {
            if (options.status && bf2.__staleWhileFetching !== void 0) {
              options.status.returnedStale = true;
            }
            return bf2.__staleWhileFetching;
          } else if (bf2.__returned === bf2) {
            throw er;
          }
        };
        const pcall = (res, rej) => {
          const fmp = this.#fetchMethod?.(k, v, fetchOpts);
          if (fmp && fmp instanceof Promise) {
            fmp.then((v2) => res(v2 === void 0 ? void 0 : v2), rej);
          }
          ac.signal.addEventListener("abort", () => {
            if (!options.ignoreFetchAbort || options.allowStaleOnFetchAbort) {
              res(void 0);
              if (options.allowStaleOnFetchAbort) {
                res = (v2) => cb(v2, true);
              }
            }
          });
        };
        if (options.status)
          options.status.fetchDispatched = true;
        const p = new Promise(pcall).then(cb, eb);
        const bf = Object.assign(p, {
          __abortController: ac,
          __staleWhileFetching: v,
          __returned: void 0
        });
        if (index === void 0) {
          this.set(k, bf, { ...fetchOpts.options, status: void 0 });
          index = this.#keyMap.get(k);
        } else {
          this.#valList[index] = bf;
        }
        return bf;
      }
      #isBackgroundFetch(p) {
        if (!this.#hasFetchMethod)
          return false;
        const b = p;
        return !!b && b instanceof Promise && b.hasOwnProperty("__staleWhileFetching") && b.__abortController instanceof AC;
      }
      async fetch(k, fetchOptions = {}) {
        const {
          // get options
          allowStale = this.allowStale,
          updateAgeOnGet = this.updateAgeOnGet,
          noDeleteOnStaleGet = this.noDeleteOnStaleGet,
          // set options
          ttl = this.ttl,
          noDisposeOnSet = this.noDisposeOnSet,
          size: size2 = 0,
          sizeCalculation = this.sizeCalculation,
          noUpdateTTL = this.noUpdateTTL,
          // fetch exclusive options
          noDeleteOnFetchRejection = this.noDeleteOnFetchRejection,
          allowStaleOnFetchRejection = this.allowStaleOnFetchRejection,
          ignoreFetchAbort = this.ignoreFetchAbort,
          allowStaleOnFetchAbort = this.allowStaleOnFetchAbort,
          context,
          forceRefresh = false,
          status,
          signal
        } = fetchOptions;
        if (!this.#hasFetchMethod) {
          if (status)
            status.fetch = "get";
          return this.get(k, {
            allowStale,
            updateAgeOnGet,
            noDeleteOnStaleGet,
            status
          });
        }
        const options = {
          allowStale,
          updateAgeOnGet,
          noDeleteOnStaleGet,
          ttl,
          noDisposeOnSet,
          size: size2,
          sizeCalculation,
          noUpdateTTL,
          noDeleteOnFetchRejection,
          allowStaleOnFetchRejection,
          allowStaleOnFetchAbort,
          ignoreFetchAbort,
          status,
          signal
        };
        let index = this.#keyMap.get(k);
        if (index === void 0) {
          if (status)
            status.fetch = "miss";
          const p = this.#backgroundFetch(k, index, options, context);
          return p.__returned = p;
        } else {
          const v = this.#valList[index];
          if (this.#isBackgroundFetch(v)) {
            const stale = allowStale && v.__staleWhileFetching !== void 0;
            if (status) {
              status.fetch = "inflight";
              if (stale)
                status.returnedStale = true;
            }
            return stale ? v.__staleWhileFetching : v.__returned = v;
          }
          const isStale = this.#isStale(index);
          if (!forceRefresh && !isStale) {
            if (status)
              status.fetch = "hit";
            this.#moveToTail(index);
            if (updateAgeOnGet) {
              this.#updateItemAge(index);
            }
            if (status)
              this.#statusTTL(status, index);
            return v;
          }
          const p = this.#backgroundFetch(k, index, options, context);
          const hasStale = p.__staleWhileFetching !== void 0;
          const staleVal = hasStale && allowStale;
          if (status) {
            status.fetch = isStale ? "stale" : "refresh";
            if (staleVal && isStale)
              status.returnedStale = true;
          }
          return staleVal ? p.__staleWhileFetching : p.__returned = p;
        }
      }
      async forceFetch(k, fetchOptions = {}) {
        const v = await this.fetch(k, fetchOptions);
        if (v === void 0)
          throw new Error("fetch() returned undefined");
        return v;
      }
      memo(k, memoOptions = {}) {
        const memoMethod = this.#memoMethod;
        if (!memoMethod) {
          throw new Error("no memoMethod provided to constructor");
        }
        const { context, forceRefresh, ...options } = memoOptions;
        const v = this.get(k, options);
        if (!forceRefresh && v !== void 0)
          return v;
        const vv = memoMethod(k, v, {
          options,
          context
        });
        this.set(k, vv, options);
        return vv;
      }
      /**
       * Return a value from the cache. Will update the recency of the cache
       * entry found.
       *
       * If the key is not found, get() will return `undefined`.
       */
      get(k, getOptions = {}) {
        const { allowStale = this.allowStale, updateAgeOnGet = this.updateAgeOnGet, noDeleteOnStaleGet = this.noDeleteOnStaleGet, status } = getOptions;
        const index = this.#keyMap.get(k);
        if (index !== void 0) {
          const value = this.#valList[index];
          const fetching = this.#isBackgroundFetch(value);
          if (status)
            this.#statusTTL(status, index);
          if (this.#isStale(index)) {
            if (status)
              status.get = "stale";
            if (!fetching) {
              if (!noDeleteOnStaleGet) {
                this.#delete(k, "expire");
              }
              if (status && allowStale)
                status.returnedStale = true;
              return allowStale ? value : void 0;
            } else {
              if (status && allowStale && value.__staleWhileFetching !== void 0) {
                status.returnedStale = true;
              }
              return allowStale ? value.__staleWhileFetching : void 0;
            }
          } else {
            if (status)
              status.get = "hit";
            if (fetching) {
              return value.__staleWhileFetching;
            }
            this.#moveToTail(index);
            if (updateAgeOnGet) {
              this.#updateItemAge(index);
            }
            return value;
          }
        } else if (status) {
          status.get = "miss";
        }
      }
      #connect(p, n) {
        this.#prev[n] = p;
        this.#next[p] = n;
      }
      #moveToTail(index) {
        if (index !== this.#tail) {
          if (index === this.#head) {
            this.#head = this.#next[index];
          } else {
            this.#connect(this.#prev[index], this.#next[index]);
          }
          this.#connect(this.#tail, index);
          this.#tail = index;
        }
      }
      /**
       * Deletes a key out of the cache.
       *
       * Returns true if the key was deleted, false otherwise.
       */
      delete(k) {
        return this.#delete(k, "delete");
      }
      #delete(k, reason) {
        let deleted = false;
        if (this.#size !== 0) {
          const index = this.#keyMap.get(k);
          if (index !== void 0) {
            deleted = true;
            if (this.#size === 1) {
              this.#clear(reason);
            } else {
              this.#removeItemSize(index);
              const v = this.#valList[index];
              if (this.#isBackgroundFetch(v)) {
                v.__abortController.abort(new Error("deleted"));
              } else if (this.#hasDispose || this.#hasDisposeAfter) {
                if (this.#hasDispose) {
                  this.#dispose?.(v, k, reason);
                }
                if (this.#hasDisposeAfter) {
                  this.#disposed?.push([v, k, reason]);
                }
              }
              this.#keyMap.delete(k);
              this.#keyList[index] = void 0;
              this.#valList[index] = void 0;
              if (index === this.#tail) {
                this.#tail = this.#prev[index];
              } else if (index === this.#head) {
                this.#head = this.#next[index];
              } else {
                const pi = this.#prev[index];
                this.#next[pi] = this.#next[index];
                const ni = this.#next[index];
                this.#prev[ni] = this.#prev[index];
              }
              this.#size--;
              this.#free.push(index);
            }
          }
        }
        if (this.#hasDisposeAfter && this.#disposed?.length) {
          const dt = this.#disposed;
          let task;
          while (task = dt?.shift()) {
            this.#disposeAfter?.(...task);
          }
        }
        return deleted;
      }
      /**
       * Clear the cache entirely, throwing away all values.
       */
      clear() {
        return this.#clear("delete");
      }
      #clear(reason) {
        for (const index of this.#rindexes({ allowStale: true })) {
          const v = this.#valList[index];
          if (this.#isBackgroundFetch(v)) {
            v.__abortController.abort(new Error("deleted"));
          } else {
            const k = this.#keyList[index];
            if (this.#hasDispose) {
              this.#dispose?.(v, k, reason);
            }
            if (this.#hasDisposeAfter) {
              this.#disposed?.push([v, k, reason]);
            }
          }
        }
        this.#keyMap.clear();
        this.#valList.fill(void 0);
        this.#keyList.fill(void 0);
        if (this.#ttls && this.#starts) {
          this.#ttls.fill(0);
          this.#starts.fill(0);
        }
        if (this.#sizes) {
          this.#sizes.fill(0);
        }
        this.#head = 0;
        this.#tail = 0;
        this.#free.length = 0;
        this.#calculatedSize = 0;
        this.#size = 0;
        if (this.#hasDisposeAfter && this.#disposed) {
          const dt = this.#disposed;
          let task;
          while (task = dt?.shift()) {
            this.#disposeAfter?.(...task);
          }
        }
      }
    };
  }
});

// ../../../.yarn/berry/cache/minipass-npm-7.1.2-3a5327d36d-10c0.zip/node_modules/minipass/dist/esm/index.js
var import_node_events, import_node_stream, import_node_string_decoder, proc, isStream, isReadable, isWritable, EOF, MAYBE_EMIT_END, EMITTED_END, EMITTING_END, EMITTED_ERROR, CLOSED, READ, FLUSH, FLUSHCHUNK, ENCODING, DECODER, FLOWING, PAUSED, RESUME, BUFFER, PIPES, BUFFERLENGTH, BUFFERPUSH, BUFFERSHIFT, OBJECTMODE, DESTROYED, ERROR, EMITDATA, EMITEND, EMITEND2, ASYNC, ABORT, ABORTED, SIGNAL, DATALISTENERS, DISCARDED, defer, nodefer, isEndish, isArrayBufferLike, isArrayBufferView, Pipe, PipeProxyErrors, isObjectModeOptions, isEncodingOptions, Minipass;
var init_esm5 = __esm({
  "../../../.yarn/berry/cache/minipass-npm-7.1.2-3a5327d36d-10c0.zip/node_modules/minipass/dist/esm/index.js"() {
    import_node_events = require("node:events");
    import_node_stream = __toESM(require("node:stream"), 1);
    import_node_string_decoder = require("node:string_decoder");
    proc = typeof process === "object" && process ? process : {
      stdout: null,
      stderr: null
    };
    isStream = (s) => !!s && typeof s === "object" && (s instanceof Minipass || s instanceof import_node_stream.default || isReadable(s) || isWritable(s));
    isReadable = (s) => !!s && typeof s === "object" && s instanceof import_node_events.EventEmitter && typeof s.pipe === "function" && // node core Writable streams have a pipe() method, but it throws
    s.pipe !== import_node_stream.default.Writable.prototype.pipe;
    isWritable = (s) => !!s && typeof s === "object" && s instanceof import_node_events.EventEmitter && typeof s.write === "function" && typeof s.end === "function";
    EOF = Symbol("EOF");
    MAYBE_EMIT_END = Symbol("maybeEmitEnd");
    EMITTED_END = Symbol("emittedEnd");
    EMITTING_END = Symbol("emittingEnd");
    EMITTED_ERROR = Symbol("emittedError");
    CLOSED = Symbol("closed");
    READ = Symbol("read");
    FLUSH = Symbol("flush");
    FLUSHCHUNK = Symbol("flushChunk");
    ENCODING = Symbol("encoding");
    DECODER = Symbol("decoder");
    FLOWING = Symbol("flowing");
    PAUSED = Symbol("paused");
    RESUME = Symbol("resume");
    BUFFER = Symbol("buffer");
    PIPES = Symbol("pipes");
    BUFFERLENGTH = Symbol("bufferLength");
    BUFFERPUSH = Symbol("bufferPush");
    BUFFERSHIFT = Symbol("bufferShift");
    OBJECTMODE = Symbol("objectMode");
    DESTROYED = Symbol("destroyed");
    ERROR = Symbol("error");
    EMITDATA = Symbol("emitData");
    EMITEND = Symbol("emitEnd");
    EMITEND2 = Symbol("emitEnd2");
    ASYNC = Symbol("async");
    ABORT = Symbol("abort");
    ABORTED = Symbol("aborted");
    SIGNAL = Symbol("signal");
    DATALISTENERS = Symbol("dataListeners");
    DISCARDED = Symbol("discarded");
    defer = (fn) => Promise.resolve().then(fn);
    nodefer = (fn) => fn();
    isEndish = (ev) => ev === "end" || ev === "finish" || ev === "prefinish";
    isArrayBufferLike = (b) => b instanceof ArrayBuffer || !!b && typeof b === "object" && b.constructor && b.constructor.name === "ArrayBuffer" && b.byteLength >= 0;
    isArrayBufferView = (b) => !Buffer.isBuffer(b) && ArrayBuffer.isView(b);
    Pipe = class {
      src;
      dest;
      opts;
      ondrain;
      constructor(src, dest, opts) {
        this.src = src;
        this.dest = dest;
        this.opts = opts;
        this.ondrain = () => src[RESUME]();
        this.dest.on("drain", this.ondrain);
      }
      unpipe() {
        this.dest.removeListener("drain", this.ondrain);
      }
      // only here for the prototype
      /* c8 ignore start */
      proxyErrors(_er) {
      }
      /* c8 ignore stop */
      end() {
        this.unpipe();
        if (this.opts.end)
          this.dest.end();
      }
    };
    PipeProxyErrors = class extends Pipe {
      unpipe() {
        this.src.removeListener("error", this.proxyErrors);
        super.unpipe();
      }
      constructor(src, dest, opts) {
        super(src, dest, opts);
        this.proxyErrors = (er) => dest.emit("error", er);
        src.on("error", this.proxyErrors);
      }
    };
    isObjectModeOptions = (o) => !!o.objectMode;
    isEncodingOptions = (o) => !o.objectMode && !!o.encoding && o.encoding !== "buffer";
    Minipass = class extends import_node_events.EventEmitter {
      [FLOWING] = false;
      [PAUSED] = false;
      [PIPES] = [];
      [BUFFER] = [];
      [OBJECTMODE];
      [ENCODING];
      [ASYNC];
      [DECODER];
      [EOF] = false;
      [EMITTED_END] = false;
      [EMITTING_END] = false;
      [CLOSED] = false;
      [EMITTED_ERROR] = null;
      [BUFFERLENGTH] = 0;
      [DESTROYED] = false;
      [SIGNAL];
      [ABORTED] = false;
      [DATALISTENERS] = 0;
      [DISCARDED] = false;
      /**
       * true if the stream can be written
       */
      writable = true;
      /**
       * true if the stream can be read
       */
      readable = true;
      /**
       * If `RType` is Buffer, then options do not need to be provided.
       * Otherwise, an options object must be provided to specify either
       * {@link Minipass.SharedOptions.objectMode} or
       * {@link Minipass.SharedOptions.encoding}, as appropriate.
       */
      constructor(...args) {
        const options = args[0] || {};
        super();
        if (options.objectMode && typeof options.encoding === "string") {
          throw new TypeError("Encoding and objectMode may not be used together");
        }
        if (isObjectModeOptions(options)) {
          this[OBJECTMODE] = true;
          this[ENCODING] = null;
        } else if (isEncodingOptions(options)) {
          this[ENCODING] = options.encoding;
          this[OBJECTMODE] = false;
        } else {
          this[OBJECTMODE] = false;
          this[ENCODING] = null;
        }
        this[ASYNC] = !!options.async;
        this[DECODER] = this[ENCODING] ? new import_node_string_decoder.StringDecoder(this[ENCODING]) : null;
        if (options && options.debugExposeBuffer === true) {
          Object.defineProperty(this, "buffer", { get: () => this[BUFFER] });
        }
        if (options && options.debugExposePipes === true) {
          Object.defineProperty(this, "pipes", { get: () => this[PIPES] });
        }
        const { signal } = options;
        if (signal) {
          this[SIGNAL] = signal;
          if (signal.aborted) {
            this[ABORT]();
          } else {
            signal.addEventListener("abort", () => this[ABORT]());
          }
        }
      }
      /**
       * The amount of data stored in the buffer waiting to be read.
       *
       * For Buffer strings, this will be the total byte length.
       * For string encoding streams, this will be the string character length,
       * according to JavaScript's `string.length` logic.
       * For objectMode streams, this is a count of the items waiting to be
       * emitted.
       */
      get bufferLength() {
        return this[BUFFERLENGTH];
      }
      /**
       * The `BufferEncoding` currently in use, or `null`
       */
      get encoding() {
        return this[ENCODING];
      }
      /**
       * @deprecated - This is a read only property
       */
      set encoding(_enc) {
        throw new Error("Encoding must be set at instantiation time");
      }
      /**
       * @deprecated - Encoding may only be set at instantiation time
       */
      setEncoding(_enc) {
        throw new Error("Encoding must be set at instantiation time");
      }
      /**
       * True if this is an objectMode stream
       */
      get objectMode() {
        return this[OBJECTMODE];
      }
      /**
       * @deprecated - This is a read-only property
       */
      set objectMode(_om) {
        throw new Error("objectMode must be set at instantiation time");
      }
      /**
       * true if this is an async stream
       */
      get ["async"]() {
        return this[ASYNC];
      }
      /**
       * Set to true to make this stream async.
       *
       * Once set, it cannot be unset, as this would potentially cause incorrect
       * behavior.  Ie, a sync stream can be made async, but an async stream
       * cannot be safely made sync.
       */
      set ["async"](a) {
        this[ASYNC] = this[ASYNC] || !!a;
      }
      // drop everything and get out of the flow completely
      [ABORT]() {
        this[ABORTED] = true;
        this.emit("abort", this[SIGNAL]?.reason);
        this.destroy(this[SIGNAL]?.reason);
      }
      /**
       * True if the stream has been aborted.
       */
      get aborted() {
        return this[ABORTED];
      }
      /**
       * No-op setter. Stream aborted status is set via the AbortSignal provided
       * in the constructor options.
       */
      set aborted(_) {
      }
      write(chunk, encoding, cb) {
        if (this[ABORTED])
          return false;
        if (this[EOF])
          throw new Error("write after end");
        if (this[DESTROYED]) {
          this.emit("error", Object.assign(new Error("Cannot call write after a stream was destroyed"), { code: "ERR_STREAM_DESTROYED" }));
          return true;
        }
        if (typeof encoding === "function") {
          cb = encoding;
          encoding = "utf8";
        }
        if (!encoding)
          encoding = "utf8";
        const fn = this[ASYNC] ? defer : nodefer;
        if (!this[OBJECTMODE] && !Buffer.isBuffer(chunk)) {
          if (isArrayBufferView(chunk)) {
            chunk = Buffer.from(chunk.buffer, chunk.byteOffset, chunk.byteLength);
          } else if (isArrayBufferLike(chunk)) {
            chunk = Buffer.from(chunk);
          } else if (typeof chunk !== "string") {
            throw new Error("Non-contiguous data written to non-objectMode stream");
          }
        }
        if (this[OBJECTMODE]) {
          if (this[FLOWING] && this[BUFFERLENGTH] !== 0)
            this[FLUSH](true);
          if (this[FLOWING])
            this.emit("data", chunk);
          else
            this[BUFFERPUSH](chunk);
          if (this[BUFFERLENGTH] !== 0)
            this.emit("readable");
          if (cb)
            fn(cb);
          return this[FLOWING];
        }
        if (!chunk.length) {
          if (this[BUFFERLENGTH] !== 0)
            this.emit("readable");
          if (cb)
            fn(cb);
          return this[FLOWING];
        }
        if (typeof chunk === "string" && // unless it is a string already ready for us to use
        !(encoding === this[ENCODING] && !this[DECODER]?.lastNeed)) {
          chunk = Buffer.from(chunk, encoding);
        }
        if (Buffer.isBuffer(chunk) && this[ENCODING]) {
          chunk = this[DECODER].write(chunk);
        }
        if (this[FLOWING] && this[BUFFERLENGTH] !== 0)
          this[FLUSH](true);
        if (this[FLOWING])
          this.emit("data", chunk);
        else
          this[BUFFERPUSH](chunk);
        if (this[BUFFERLENGTH] !== 0)
          this.emit("readable");
        if (cb)
          fn(cb);
        return this[FLOWING];
      }
      /**
       * Low-level explicit read method.
       *
       * In objectMode, the argument is ignored, and one item is returned if
       * available.
       *
       * `n` is the number of bytes (or in the case of encoding streams,
       * characters) to consume. If `n` is not provided, then the entire buffer
       * is returned, or `null` is returned if no data is available.
       *
       * If `n` is greater that the amount of data in the internal buffer,
       * then `null` is returned.
       */
      read(n) {
        if (this[DESTROYED])
          return null;
        this[DISCARDED] = false;
        if (this[BUFFERLENGTH] === 0 || n === 0 || n && n > this[BUFFERLENGTH]) {
          this[MAYBE_EMIT_END]();
          return null;
        }
        if (this[OBJECTMODE])
          n = null;
        if (this[BUFFER].length > 1 && !this[OBJECTMODE]) {
          this[BUFFER] = [
            this[ENCODING] ? this[BUFFER].join("") : Buffer.concat(this[BUFFER], this[BUFFERLENGTH])
          ];
        }
        const ret = this[READ](n || null, this[BUFFER][0]);
        this[MAYBE_EMIT_END]();
        return ret;
      }
      [READ](n, chunk) {
        if (this[OBJECTMODE])
          this[BUFFERSHIFT]();
        else {
          const c = chunk;
          if (n === c.length || n === null)
            this[BUFFERSHIFT]();
          else if (typeof c === "string") {
            this[BUFFER][0] = c.slice(n);
            chunk = c.slice(0, n);
            this[BUFFERLENGTH] -= n;
          } else {
            this[BUFFER][0] = c.subarray(n);
            chunk = c.subarray(0, n);
            this[BUFFERLENGTH] -= n;
          }
        }
        this.emit("data", chunk);
        if (!this[BUFFER].length && !this[EOF])
          this.emit("drain");
        return chunk;
      }
      end(chunk, encoding, cb) {
        if (typeof chunk === "function") {
          cb = chunk;
          chunk = void 0;
        }
        if (typeof encoding === "function") {
          cb = encoding;
          encoding = "utf8";
        }
        if (chunk !== void 0)
          this.write(chunk, encoding);
        if (cb)
          this.once("end", cb);
        this[EOF] = true;
        this.writable = false;
        if (this[FLOWING] || !this[PAUSED])
          this[MAYBE_EMIT_END]();
        return this;
      }
      // don't let the internal resume be overwritten
      [RESUME]() {
        if (this[DESTROYED])
          return;
        if (!this[DATALISTENERS] && !this[PIPES].length) {
          this[DISCARDED] = true;
        }
        this[PAUSED] = false;
        this[FLOWING] = true;
        this.emit("resume");
        if (this[BUFFER].length)
          this[FLUSH]();
        else if (this[EOF])
          this[MAYBE_EMIT_END]();
        else
          this.emit("drain");
      }
      /**
       * Resume the stream if it is currently in a paused state
       *
       * If called when there are no pipe destinations or `data` event listeners,
       * this will place the stream in a "discarded" state, where all data will
       * be thrown away. The discarded state is removed if a pipe destination or
       * data handler is added, if pause() is called, or if any synchronous or
       * asynchronous iteration is started.
       */
      resume() {
        return this[RESUME]();
      }
      /**
       * Pause the stream
       */
      pause() {
        this[FLOWING] = false;
        this[PAUSED] = true;
        this[DISCARDED] = false;
      }
      /**
       * true if the stream has been forcibly destroyed
       */
      get destroyed() {
        return this[DESTROYED];
      }
      /**
       * true if the stream is currently in a flowing state, meaning that
       * any writes will be immediately emitted.
       */
      get flowing() {
        return this[FLOWING];
      }
      /**
       * true if the stream is currently in a paused state
       */
      get paused() {
        return this[PAUSED];
      }
      [BUFFERPUSH](chunk) {
        if (this[OBJECTMODE])
          this[BUFFERLENGTH] += 1;
        else
          this[BUFFERLENGTH] += chunk.length;
        this[BUFFER].push(chunk);
      }
      [BUFFERSHIFT]() {
        if (this[OBJECTMODE])
          this[BUFFERLENGTH] -= 1;
        else
          this[BUFFERLENGTH] -= this[BUFFER][0].length;
        return this[BUFFER].shift();
      }
      [FLUSH](noDrain = false) {
        do {
        } while (this[FLUSHCHUNK](this[BUFFERSHIFT]()) && this[BUFFER].length);
        if (!noDrain && !this[BUFFER].length && !this[EOF])
          this.emit("drain");
      }
      [FLUSHCHUNK](chunk) {
        this.emit("data", chunk);
        return this[FLOWING];
      }
      /**
       * Pipe all data emitted by this stream into the destination provided.
       *
       * Triggers the flow of data.
       */
      pipe(dest, opts) {
        if (this[DESTROYED])
          return dest;
        this[DISCARDED] = false;
        const ended = this[EMITTED_END];
        opts = opts || {};
        if (dest === proc.stdout || dest === proc.stderr)
          opts.end = false;
        else
          opts.end = opts.end !== false;
        opts.proxyErrors = !!opts.proxyErrors;
        if (ended) {
          if (opts.end)
            dest.end();
        } else {
          this[PIPES].push(!opts.proxyErrors ? new Pipe(this, dest, opts) : new PipeProxyErrors(this, dest, opts));
          if (this[ASYNC])
            defer(() => this[RESUME]());
          else
            this[RESUME]();
        }
        return dest;
      }
      /**
       * Fully unhook a piped destination stream.
       *
       * If the destination stream was the only consumer of this stream (ie,
       * there are no other piped destinations or `'data'` event listeners)
       * then the flow of data will stop until there is another consumer or
       * {@link Minipass#resume} is explicitly called.
       */
      unpipe(dest) {
        const p = this[PIPES].find((p2) => p2.dest === dest);
        if (p) {
          if (this[PIPES].length === 1) {
            if (this[FLOWING] && this[DATALISTENERS] === 0) {
              this[FLOWING] = false;
            }
            this[PIPES] = [];
          } else
            this[PIPES].splice(this[PIPES].indexOf(p), 1);
          p.unpipe();
        }
      }
      /**
       * Alias for {@link Minipass#on}
       */
      addListener(ev, handler) {
        return this.on(ev, handler);
      }
      /**
       * Mostly identical to `EventEmitter.on`, with the following
       * behavior differences to prevent data loss and unnecessary hangs:
       *
       * - Adding a 'data' event handler will trigger the flow of data
       *
       * - Adding a 'readable' event handler when there is data waiting to be read
       *   will cause 'readable' to be emitted immediately.
       *
       * - Adding an 'endish' event handler ('end', 'finish', etc.) which has
       *   already passed will cause the event to be emitted immediately and all
       *   handlers removed.
       *
       * - Adding an 'error' event handler after an error has been emitted will
       *   cause the event to be re-emitted immediately with the error previously
       *   raised.
       */
      on(ev, handler) {
        const ret = super.on(ev, handler);
        if (ev === "data") {
          this[DISCARDED] = false;
          this[DATALISTENERS]++;
          if (!this[PIPES].length && !this[FLOWING]) {
            this[RESUME]();
          }
        } else if (ev === "readable" && this[BUFFERLENGTH] !== 0) {
          super.emit("readable");
        } else if (isEndish(ev) && this[EMITTED_END]) {
          super.emit(ev);
          this.removeAllListeners(ev);
        } else if (ev === "error" && this[EMITTED_ERROR]) {
          const h = handler;
          if (this[ASYNC])
            defer(() => h.call(this, this[EMITTED_ERROR]));
          else
            h.call(this, this[EMITTED_ERROR]);
        }
        return ret;
      }
      /**
       * Alias for {@link Minipass#off}
       */
      removeListener(ev, handler) {
        return this.off(ev, handler);
      }
      /**
       * Mostly identical to `EventEmitter.off`
       *
       * If a 'data' event handler is removed, and it was the last consumer
       * (ie, there are no pipe destinations or other 'data' event listeners),
       * then the flow of data will stop until there is another consumer or
       * {@link Minipass#resume} is explicitly called.
       */
      off(ev, handler) {
        const ret = super.off(ev, handler);
        if (ev === "data") {
          this[DATALISTENERS] = this.listeners("data").length;
          if (this[DATALISTENERS] === 0 && !this[DISCARDED] && !this[PIPES].length) {
            this[FLOWING] = false;
          }
        }
        return ret;
      }
      /**
       * Mostly identical to `EventEmitter.removeAllListeners`
       *
       * If all 'data' event handlers are removed, and they were the last consumer
       * (ie, there are no pipe destinations), then the flow of data will stop
       * until there is another consumer or {@link Minipass#resume} is explicitly
       * called.
       */
      removeAllListeners(ev) {
        const ret = super.removeAllListeners(ev);
        if (ev === "data" || ev === void 0) {
          this[DATALISTENERS] = 0;
          if (!this[DISCARDED] && !this[PIPES].length) {
            this[FLOWING] = false;
          }
        }
        return ret;
      }
      /**
       * true if the 'end' event has been emitted
       */
      get emittedEnd() {
        return this[EMITTED_END];
      }
      [MAYBE_EMIT_END]() {
        if (!this[EMITTING_END] && !this[EMITTED_END] && !this[DESTROYED] && this[BUFFER].length === 0 && this[EOF]) {
          this[EMITTING_END] = true;
          this.emit("end");
          this.emit("prefinish");
          this.emit("finish");
          if (this[CLOSED])
            this.emit("close");
          this[EMITTING_END] = false;
        }
      }
      /**
       * Mostly identical to `EventEmitter.emit`, with the following
       * behavior differences to prevent data loss and unnecessary hangs:
       *
       * If the stream has been destroyed, and the event is something other
       * than 'close' or 'error', then `false` is returned and no handlers
       * are called.
       *
       * If the event is 'end', and has already been emitted, then the event
       * is ignored. If the stream is in a paused or non-flowing state, then
       * the event will be deferred until data flow resumes. If the stream is
       * async, then handlers will be called on the next tick rather than
       * immediately.
       *
       * If the event is 'close', and 'end' has not yet been emitted, then
       * the event will be deferred until after 'end' is emitted.
       *
       * If the event is 'error', and an AbortSignal was provided for the stream,
       * and there are no listeners, then the event is ignored, matching the
       * behavior of node core streams in the presense of an AbortSignal.
       *
       * If the event is 'finish' or 'prefinish', then all listeners will be
       * removed after emitting the event, to prevent double-firing.
       */
      emit(ev, ...args) {
        const data = args[0];
        if (ev !== "error" && ev !== "close" && ev !== DESTROYED && this[DESTROYED]) {
          return false;
        } else if (ev === "data") {
          return !this[OBJECTMODE] && !data ? false : this[ASYNC] ? (defer(() => this[EMITDATA](data)), true) : this[EMITDATA](data);
        } else if (ev === "end") {
          return this[EMITEND]();
        } else if (ev === "close") {
          this[CLOSED] = true;
          if (!this[EMITTED_END] && !this[DESTROYED])
            return false;
          const ret2 = super.emit("close");
          this.removeAllListeners("close");
          return ret2;
        } else if (ev === "error") {
          this[EMITTED_ERROR] = data;
          super.emit(ERROR, data);
          const ret2 = !this[SIGNAL] || this.listeners("error").length ? super.emit("error", data) : false;
          this[MAYBE_EMIT_END]();
          return ret2;
        } else if (ev === "resume") {
          const ret2 = super.emit("resume");
          this[MAYBE_EMIT_END]();
          return ret2;
        } else if (ev === "finish" || ev === "prefinish") {
          const ret2 = super.emit(ev);
          this.removeAllListeners(ev);
          return ret2;
        }
        const ret = super.emit(ev, ...args);
        this[MAYBE_EMIT_END]();
        return ret;
      }
      [EMITDATA](data) {
        for (const p of this[PIPES]) {
          if (p.dest.write(data) === false)
            this.pause();
        }
        const ret = this[DISCARDED] ? false : super.emit("data", data);
        this[MAYBE_EMIT_END]();
        return ret;
      }
      [EMITEND]() {
        if (this[EMITTED_END])
          return false;
        this[EMITTED_END] = true;
        this.readable = false;
        return this[ASYNC] ? (defer(() => this[EMITEND2]()), true) : this[EMITEND2]();
      }
      [EMITEND2]() {
        if (this[DECODER]) {
          const data = this[DECODER].end();
          if (data) {
            for (const p of this[PIPES]) {
              p.dest.write(data);
            }
            if (!this[DISCARDED])
              super.emit("data", data);
          }
        }
        for (const p of this[PIPES]) {
          p.end();
        }
        const ret = super.emit("end");
        this.removeAllListeners("end");
        return ret;
      }
      /**
       * Return a Promise that resolves to an array of all emitted data once
       * the stream ends.
       */
      async collect() {
        const buf = Object.assign([], {
          dataLength: 0
        });
        if (!this[OBJECTMODE])
          buf.dataLength = 0;
        const p = this.promise();
        this.on("data", (c) => {
          buf.push(c);
          if (!this[OBJECTMODE])
            buf.dataLength += c.length;
        });
        await p;
        return buf;
      }
      /**
       * Return a Promise that resolves to the concatenation of all emitted data
       * once the stream ends.
       *
       * Not allowed on objectMode streams.
       */
      async concat() {
        if (this[OBJECTMODE]) {
          throw new Error("cannot concat in objectMode");
        }
        const buf = await this.collect();
        return this[ENCODING] ? buf.join("") : Buffer.concat(buf, buf.dataLength);
      }
      /**
       * Return a void Promise that resolves once the stream ends.
       */
      async promise() {
        return new Promise((resolve, reject) => {
          this.on(DESTROYED, () => reject(new Error("stream destroyed")));
          this.on("error", (er) => reject(er));
          this.on("end", () => resolve());
        });
      }
      /**
       * Asynchronous `for await of` iteration.
       *
       * This will continue emitting all chunks until the stream terminates.
       */
      [Symbol.asyncIterator]() {
        this[DISCARDED] = false;
        let stopped = false;
        const stop = async () => {
          this.pause();
          stopped = true;
          return { value: void 0, done: true };
        };
        const next = () => {
          if (stopped)
            return stop();
          const res = this.read();
          if (res !== null)
            return Promise.resolve({ done: false, value: res });
          if (this[EOF])
            return stop();
          let resolve;
          let reject;
          const onerr = (er) => {
            this.off("data", ondata);
            this.off("end", onend);
            this.off(DESTROYED, ondestroy);
            stop();
            reject(er);
          };
          const ondata = (value) => {
            this.off("error", onerr);
            this.off("end", onend);
            this.off(DESTROYED, ondestroy);
            this.pause();
            resolve({ value, done: !!this[EOF] });
          };
          const onend = () => {
            this.off("error", onerr);
            this.off("data", ondata);
            this.off(DESTROYED, ondestroy);
            stop();
            resolve({ done: true, value: void 0 });
          };
          const ondestroy = () => onerr(new Error("stream destroyed"));
          return new Promise((res2, rej) => {
            reject = rej;
            resolve = res2;
            this.once(DESTROYED, ondestroy);
            this.once("error", onerr);
            this.once("end", onend);
            this.once("data", ondata);
          });
        };
        return {
          next,
          throw: stop,
          return: stop,
          [Symbol.asyncIterator]() {
            return this;
          }
        };
      }
      /**
       * Synchronous `for of` iteration.
       *
       * The iteration will terminate when the internal buffer runs out, even
       * if the stream has not yet terminated.
       */
      [Symbol.iterator]() {
        this[DISCARDED] = false;
        let stopped = false;
        const stop = () => {
          this.pause();
          this.off(ERROR, stop);
          this.off(DESTROYED, stop);
          this.off("end", stop);
          stopped = true;
          return { done: true, value: void 0 };
        };
        const next = () => {
          if (stopped)
            return stop();
          const value = this.read();
          return value === null ? stop() : { done: false, value };
        };
        this.once("end", stop);
        this.once(ERROR, stop);
        this.once(DESTROYED, stop);
        return {
          next,
          throw: stop,
          return: stop,
          [Symbol.iterator]() {
            return this;
          }
        };
      }
      /**
       * Destroy a stream, preventing it from being used for any further purpose.
       *
       * If the stream has a `close()` method, then it will be called on
       * destruction.
       *
       * After destruction, any attempt to write data, read data, or emit most
       * events will be ignored.
       *
       * If an error argument is provided, then it will be emitted in an
       * 'error' event.
       */
      destroy(er) {
        if (this[DESTROYED]) {
          if (er)
            this.emit("error", er);
          else
            this.emit(DESTROYED);
          return this;
        }
        this[DESTROYED] = true;
        this[DISCARDED] = true;
        this[BUFFER].length = 0;
        this[BUFFERLENGTH] = 0;
        const wc = this;
        if (typeof wc.close === "function" && !this[CLOSED])
          wc.close();
        if (er)
          this.emit("error", er);
        else
          this.emit(DESTROYED);
        return this;
      }
      /**
       * Alias for {@link isStream}
       *
       * Former export location, maintained for backwards compatibility.
       *
       * @deprecated
       */
      static get isStream() {
        return isStream;
      }
    };
  }
});

// ../../../.yarn/berry/cache/path-scurry-npm-2.0.0-5a556e8161-10c0.zip/node_modules/path-scurry/dist/esm/index.js
var import_node_path, import_node_url, import_fs, actualFS, import_promises, realpathSync, defaultFS, fsFromOption, uncDriveRegexp, uncToDrive, eitherSep, UNKNOWN, IFIFO, IFCHR, IFDIR, IFBLK, IFREG, IFLNK, IFSOCK, IFMT, IFMT_UNKNOWN, READDIR_CALLED, LSTAT_CALLED, ENOTDIR, ENOENT, ENOREADLINK, ENOREALPATH, ENOCHILD, TYPEMASK, entToType, normalizeCache, normalize, normalizeNocaseCache, normalizeNocase, ResolveCache, ChildrenCache, setAsCwd, PathBase, PathWin32, PathPosix, PathScurryBase, PathScurryWin32, PathScurryPosix, PathScurryDarwin, Path, PathScurry;
var init_esm6 = __esm({
  "../../../.yarn/berry/cache/path-scurry-npm-2.0.0-5a556e8161-10c0.zip/node_modules/path-scurry/dist/esm/index.js"() {
    init_esm4();
    import_node_path = require("node:path");
    import_node_url = require("node:url");
    import_fs = require("fs");
    actualFS = __toESM(require("node:fs"), 1);
    import_promises = require("node:fs/promises");
    init_esm5();
    realpathSync = import_fs.realpathSync.native;
    defaultFS = {
      lstatSync: import_fs.lstatSync,
      readdir: import_fs.readdir,
      readdirSync: import_fs.readdirSync,
      readlinkSync: import_fs.readlinkSync,
      realpathSync,
      promises: {
        lstat: import_promises.lstat,
        readdir: import_promises.readdir,
        readlink: import_promises.readlink,
        realpath: import_promises.realpath
      }
    };
    fsFromOption = (fsOption) => !fsOption || fsOption === defaultFS || fsOption === actualFS ? defaultFS : {
      ...defaultFS,
      ...fsOption,
      promises: {
        ...defaultFS.promises,
        ...fsOption.promises || {}
      }
    };
    uncDriveRegexp = /^\\\\\?\\([a-z]:)\\?$/i;
    uncToDrive = (rootPath) => rootPath.replace(/\//g, "\\").replace(uncDriveRegexp, "$1\\");
    eitherSep = /[\\\/]/;
    UNKNOWN = 0;
    IFIFO = 1;
    IFCHR = 2;
    IFDIR = 4;
    IFBLK = 6;
    IFREG = 8;
    IFLNK = 10;
    IFSOCK = 12;
    IFMT = 15;
    IFMT_UNKNOWN = ~IFMT;
    READDIR_CALLED = 16;
    LSTAT_CALLED = 32;
    ENOTDIR = 64;
    ENOENT = 128;
    ENOREADLINK = 256;
    ENOREALPATH = 512;
    ENOCHILD = ENOTDIR | ENOENT | ENOREALPATH;
    TYPEMASK = 1023;
    entToType = (s) => s.isFile() ? IFREG : s.isDirectory() ? IFDIR : s.isSymbolicLink() ? IFLNK : s.isCharacterDevice() ? IFCHR : s.isBlockDevice() ? IFBLK : s.isSocket() ? IFSOCK : s.isFIFO() ? IFIFO : UNKNOWN;
    normalizeCache = /* @__PURE__ */ new Map();
    normalize = (s) => {
      const c = normalizeCache.get(s);
      if (c)
        return c;
      const n = s.normalize("NFKD");
      normalizeCache.set(s, n);
      return n;
    };
    normalizeNocaseCache = /* @__PURE__ */ new Map();
    normalizeNocase = (s) => {
      const c = normalizeNocaseCache.get(s);
      if (c)
        return c;
      const n = normalize(s.toLowerCase());
      normalizeNocaseCache.set(s, n);
      return n;
    };
    ResolveCache = class extends LRUCache {
      constructor() {
        super({ max: 256 });
      }
    };
    ChildrenCache = class extends LRUCache {
      constructor(maxSize = 16 * 1024) {
        super({
          maxSize,
          // parent + children
          sizeCalculation: (a) => a.length + 1
        });
      }
    };
    setAsCwd = Symbol("PathScurry setAsCwd");
    PathBase = class {
      /**
       * the basename of this path
       *
       * **Important**: *always* test the path name against any test string
       * usingthe {@link isNamed} method, and not by directly comparing this
       * string. Otherwise, unicode path strings that the system sees as identical
       * will not be properly treated as the same path, leading to incorrect
       * behavior and possible security issues.
       */
      name;
      /**
       * the Path entry corresponding to the path root.
       *
       * @internal
       */
      root;
      /**
       * All roots found within the current PathScurry family
       *
       * @internal
       */
      roots;
      /**
       * a reference to the parent path, or undefined in the case of root entries
       *
       * @internal
       */
      parent;
      /**
       * boolean indicating whether paths are compared case-insensitively
       * @internal
       */
      nocase;
      /**
       * boolean indicating that this path is the current working directory
       * of the PathScurry collection that contains it.
       */
      isCWD = false;
      // potential default fs override
      #fs;
      // Stats fields
      #dev;
      get dev() {
        return this.#dev;
      }
      #mode;
      get mode() {
        return this.#mode;
      }
      #nlink;
      get nlink() {
        return this.#nlink;
      }
      #uid;
      get uid() {
        return this.#uid;
      }
      #gid;
      get gid() {
        return this.#gid;
      }
      #rdev;
      get rdev() {
        return this.#rdev;
      }
      #blksize;
      get blksize() {
        return this.#blksize;
      }
      #ino;
      get ino() {
        return this.#ino;
      }
      #size;
      get size() {
        return this.#size;
      }
      #blocks;
      get blocks() {
        return this.#blocks;
      }
      #atimeMs;
      get atimeMs() {
        return this.#atimeMs;
      }
      #mtimeMs;
      get mtimeMs() {
        return this.#mtimeMs;
      }
      #ctimeMs;
      get ctimeMs() {
        return this.#ctimeMs;
      }
      #birthtimeMs;
      get birthtimeMs() {
        return this.#birthtimeMs;
      }
      #atime;
      get atime() {
        return this.#atime;
      }
      #mtime;
      get mtime() {
        return this.#mtime;
      }
      #ctime;
      get ctime() {
        return this.#ctime;
      }
      #birthtime;
      get birthtime() {
        return this.#birthtime;
      }
      #matchName;
      #depth;
      #fullpath;
      #fullpathPosix;
      #relative;
      #relativePosix;
      #type;
      #children;
      #linkTarget;
      #realpath;
      /**
       * This property is for compatibility with the Dirent class as of
       * Node v20, where Dirent['parentPath'] refers to the path of the
       * directory that was passed to readdir. For root entries, it's the path
       * to the entry itself.
       */
      get parentPath() {
        return (this.parent || this).fullpath();
      }
      /**
       * Deprecated alias for Dirent['parentPath'] Somewhat counterintuitively,
       * this property refers to the *parent* path, not the path object itself.
       *
       * @deprecated
       */
      get path() {
        return this.parentPath;
      }
      /**
       * Do not create new Path objects directly.  They should always be accessed
       * via the PathScurry class or other methods on the Path class.
       *
       * @internal
       */
      constructor(name, type = UNKNOWN, root, roots, nocase, children, opts) {
        this.name = name;
        this.#matchName = nocase ? normalizeNocase(name) : normalize(name);
        this.#type = type & TYPEMASK;
        this.nocase = nocase;
        this.roots = roots;
        this.root = root || this;
        this.#children = children;
        this.#fullpath = opts.fullpath;
        this.#relative = opts.relative;
        this.#relativePosix = opts.relativePosix;
        this.parent = opts.parent;
        if (this.parent) {
          this.#fs = this.parent.#fs;
        } else {
          this.#fs = fsFromOption(opts.fs);
        }
      }
      /**
       * Returns the depth of the Path object from its root.
       *
       * For example, a path at `/foo/bar` would have a depth of 2.
       */
      depth() {
        if (this.#depth !== void 0)
          return this.#depth;
        if (!this.parent)
          return this.#depth = 0;
        return this.#depth = this.parent.depth() + 1;
      }
      /**
       * @internal
       */
      childrenCache() {
        return this.#children;
      }
      /**
       * Get the Path object referenced by the string path, resolved from this Path
       */
      resolve(path5) {
        if (!path5) {
          return this;
        }
        const rootPath = this.getRootString(path5);
        const dir = path5.substring(rootPath.length);
        const dirParts = dir.split(this.splitSep);
        const result = rootPath ? this.getRoot(rootPath).#resolveParts(dirParts) : this.#resolveParts(dirParts);
        return result;
      }
      #resolveParts(dirParts) {
        let p = this;
        for (const part of dirParts) {
          p = p.child(part);
        }
        return p;
      }
      /**
       * Returns the cached children Path objects, if still available.  If they
       * have fallen out of the cache, then returns an empty array, and resets the
       * READDIR_CALLED bit, so that future calls to readdir() will require an fs
       * lookup.
       *
       * @internal
       */
      children() {
        const cached = this.#children.get(this);
        if (cached) {
          return cached;
        }
        const children = Object.assign([], { provisional: 0 });
        this.#children.set(this, children);
        this.#type &= ~READDIR_CALLED;
        return children;
      }
      /**
       * Resolves a path portion and returns or creates the child Path.
       *
       * Returns `this` if pathPart is `''` or `'.'`, or `parent` if pathPart is
       * `'..'`.
       *
       * This should not be called directly.  If `pathPart` contains any path
       * separators, it will lead to unsafe undefined behavior.
       *
       * Use `Path.resolve()` instead.
       *
       * @internal
       */
      child(pathPart, opts) {
        if (pathPart === "" || pathPart === ".") {
          return this;
        }
        if (pathPart === "..") {
          return this.parent || this;
        }
        const children = this.children();
        const name = this.nocase ? normalizeNocase(pathPart) : normalize(pathPart);
        for (const p of children) {
          if (p.#matchName === name) {
            return p;
          }
        }
        const s = this.parent ? this.sep : "";
        const fullpath = this.#fullpath ? this.#fullpath + s + pathPart : void 0;
        const pchild = this.newChild(pathPart, UNKNOWN, {
          ...opts,
          parent: this,
          fullpath
        });
        if (!this.canReaddir()) {
          pchild.#type |= ENOENT;
        }
        children.push(pchild);
        return pchild;
      }
      /**
       * The relative path from the cwd. If it does not share an ancestor with
       * the cwd, then this ends up being equivalent to the fullpath()
       */
      relative() {
        if (this.isCWD)
          return "";
        if (this.#relative !== void 0) {
          return this.#relative;
        }
        const name = this.name;
        const p = this.parent;
        if (!p) {
          return this.#relative = this.name;
        }
        const pv = p.relative();
        return pv + (!pv || !p.parent ? "" : this.sep) + name;
      }
      /**
       * The relative path from the cwd, using / as the path separator.
       * If it does not share an ancestor with
       * the cwd, then this ends up being equivalent to the fullpathPosix()
       * On posix systems, this is identical to relative().
       */
      relativePosix() {
        if (this.sep === "/")
          return this.relative();
        if (this.isCWD)
          return "";
        if (this.#relativePosix !== void 0)
          return this.#relativePosix;
        const name = this.name;
        const p = this.parent;
        if (!p) {
          return this.#relativePosix = this.fullpathPosix();
        }
        const pv = p.relativePosix();
        return pv + (!pv || !p.parent ? "" : "/") + name;
      }
      /**
       * The fully resolved path string for this Path entry
       */
      fullpath() {
        if (this.#fullpath !== void 0) {
          return this.#fullpath;
        }
        const name = this.name;
        const p = this.parent;
        if (!p) {
          return this.#fullpath = this.name;
        }
        const pv = p.fullpath();
        const fp = pv + (!p.parent ? "" : this.sep) + name;
        return this.#fullpath = fp;
      }
      /**
       * On platforms other than windows, this is identical to fullpath.
       *
       * On windows, this is overridden to return the forward-slash form of the
       * full UNC path.
       */
      fullpathPosix() {
        if (this.#fullpathPosix !== void 0)
          return this.#fullpathPosix;
        if (this.sep === "/")
          return this.#fullpathPosix = this.fullpath();
        if (!this.parent) {
          const p2 = this.fullpath().replace(/\\/g, "/");
          if (/^[a-z]:\//i.test(p2)) {
            return this.#fullpathPosix = `//?/${p2}`;
          } else {
            return this.#fullpathPosix = p2;
          }
        }
        const p = this.parent;
        const pfpp = p.fullpathPosix();
        const fpp = pfpp + (!pfpp || !p.parent ? "" : "/") + this.name;
        return this.#fullpathPosix = fpp;
      }
      /**
       * Is the Path of an unknown type?
       *
       * Note that we might know *something* about it if there has been a previous
       * filesystem operation, for example that it does not exist, or is not a
       * link, or whether it has child entries.
       */
      isUnknown() {
        return (this.#type & IFMT) === UNKNOWN;
      }
      isType(type) {
        return this[`is${type}`]();
      }
      getType() {
        return this.isUnknown() ? "Unknown" : this.isDirectory() ? "Directory" : this.isFile() ? "File" : this.isSymbolicLink() ? "SymbolicLink" : this.isFIFO() ? "FIFO" : this.isCharacterDevice() ? "CharacterDevice" : this.isBlockDevice() ? "BlockDevice" : (
          /* c8 ignore start */
          this.isSocket() ? "Socket" : "Unknown"
        );
      }
      /**
       * Is the Path a regular file?
       */
      isFile() {
        return (this.#type & IFMT) === IFREG;
      }
      /**
       * Is the Path a directory?
       */
      isDirectory() {
        return (this.#type & IFMT) === IFDIR;
      }
      /**
       * Is the path a character device?
       */
      isCharacterDevice() {
        return (this.#type & IFMT) === IFCHR;
      }
      /**
       * Is the path a block device?
       */
      isBlockDevice() {
        return (this.#type & IFMT) === IFBLK;
      }
      /**
       * Is the path a FIFO pipe?
       */
      isFIFO() {
        return (this.#type & IFMT) === IFIFO;
      }
      /**
       * Is the path a socket?
       */
      isSocket() {
        return (this.#type & IFMT) === IFSOCK;
      }
      /**
       * Is the path a symbolic link?
       */
      isSymbolicLink() {
        return (this.#type & IFLNK) === IFLNK;
      }
      /**
       * Return the entry if it has been subject of a successful lstat, or
       * undefined otherwise.
       *
       * Does not read the filesystem, so an undefined result *could* simply
       * mean that we haven't called lstat on it.
       */
      lstatCached() {
        return this.#type & LSTAT_CALLED ? this : void 0;
      }
      /**
       * Return the cached link target if the entry has been the subject of a
       * successful readlink, or undefined otherwise.
       *
       * Does not read the filesystem, so an undefined result *could* just mean we
       * don't have any cached data. Only use it if you are very sure that a
       * readlink() has been called at some point.
       */
      readlinkCached() {
        return this.#linkTarget;
      }
      /**
       * Returns the cached realpath target if the entry has been the subject
       * of a successful realpath, or undefined otherwise.
       *
       * Does not read the filesystem, so an undefined result *could* just mean we
       * don't have any cached data. Only use it if you are very sure that a
       * realpath() has been called at some point.
       */
      realpathCached() {
        return this.#realpath;
      }
      /**
       * Returns the cached child Path entries array if the entry has been the
       * subject of a successful readdir(), or [] otherwise.
       *
       * Does not read the filesystem, so an empty array *could* just mean we
       * don't have any cached data. Only use it if you are very sure that a
       * readdir() has been called recently enough to still be valid.
       */
      readdirCached() {
        const children = this.children();
        return children.slice(0, children.provisional);
      }
      /**
       * Return true if it's worth trying to readlink.  Ie, we don't (yet) have
       * any indication that readlink will definitely fail.
       *
       * Returns false if the path is known to not be a symlink, if a previous
       * readlink failed, or if the entry does not exist.
       */
      canReadlink() {
        if (this.#linkTarget)
          return true;
        if (!this.parent)
          return false;
        const ifmt = this.#type & IFMT;
        return !(ifmt !== UNKNOWN && ifmt !== IFLNK || this.#type & ENOREADLINK || this.#type & ENOENT);
      }
      /**
       * Return true if readdir has previously been successfully called on this
       * path, indicating that cachedReaddir() is likely valid.
       */
      calledReaddir() {
        return !!(this.#type & READDIR_CALLED);
      }
      /**
       * Returns true if the path is known to not exist. That is, a previous lstat
       * or readdir failed to verify its existence when that would have been
       * expected, or a parent entry was marked either enoent or enotdir.
       */
      isENOENT() {
        return !!(this.#type & ENOENT);
      }
      /**
       * Return true if the path is a match for the given path name.  This handles
       * case sensitivity and unicode normalization.
       *
       * Note: even on case-sensitive systems, it is **not** safe to test the
       * equality of the `.name` property to determine whether a given pathname
       * matches, due to unicode normalization mismatches.
       *
       * Always use this method instead of testing the `path.name` property
       * directly.
       */
      isNamed(n) {
        return !this.nocase ? this.#matchName === normalize(n) : this.#matchName === normalizeNocase(n);
      }
      /**
       * Return the Path object corresponding to the target of a symbolic link.
       *
       * If the Path is not a symbolic link, or if the readlink call fails for any
       * reason, `undefined` is returned.
       *
       * Result is cached, and thus may be outdated if the filesystem is mutated.
       */
      async readlink() {
        const target = this.#linkTarget;
        if (target) {
          return target;
        }
        if (!this.canReadlink()) {
          return void 0;
        }
        if (!this.parent) {
          return void 0;
        }
        try {
          const read = await this.#fs.promises.readlink(this.fullpath());
          const linkTarget = (await this.parent.realpath())?.resolve(read);
          if (linkTarget) {
            return this.#linkTarget = linkTarget;
          }
        } catch (er) {
          this.#readlinkFail(er.code);
          return void 0;
        }
      }
      /**
       * Synchronous {@link PathBase.readlink}
       */
      readlinkSync() {
        const target = this.#linkTarget;
        if (target) {
          return target;
        }
        if (!this.canReadlink()) {
          return void 0;
        }
        if (!this.parent) {
          return void 0;
        }
        try {
          const read = this.#fs.readlinkSync(this.fullpath());
          const linkTarget = this.parent.realpathSync()?.resolve(read);
          if (linkTarget) {
            return this.#linkTarget = linkTarget;
          }
        } catch (er) {
          this.#readlinkFail(er.code);
          return void 0;
        }
      }
      #readdirSuccess(children) {
        this.#type |= READDIR_CALLED;
        for (let p = children.provisional; p < children.length; p++) {
          const c = children[p];
          if (c)
            c.#markENOENT();
        }
      }
      #markENOENT() {
        if (this.#type & ENOENT)
          return;
        this.#type = (this.#type | ENOENT) & IFMT_UNKNOWN;
        this.#markChildrenENOENT();
      }
      #markChildrenENOENT() {
        const children = this.children();
        children.provisional = 0;
        for (const p of children) {
          p.#markENOENT();
        }
      }
      #markENOREALPATH() {
        this.#type |= ENOREALPATH;
        this.#markENOTDIR();
      }
      // save the information when we know the entry is not a dir
      #markENOTDIR() {
        if (this.#type & ENOTDIR)
          return;
        let t = this.#type;
        if ((t & IFMT) === IFDIR)
          t &= IFMT_UNKNOWN;
        this.#type = t | ENOTDIR;
        this.#markChildrenENOENT();
      }
      #readdirFail(code = "") {
        if (code === "ENOTDIR" || code === "EPERM") {
          this.#markENOTDIR();
        } else if (code === "ENOENT") {
          this.#markENOENT();
        } else {
          this.children().provisional = 0;
        }
      }
      #lstatFail(code = "") {
        if (code === "ENOTDIR") {
          const p = this.parent;
          p.#markENOTDIR();
        } else if (code === "ENOENT") {
          this.#markENOENT();
        }
      }
      #readlinkFail(code = "") {
        let ter = this.#type;
        ter |= ENOREADLINK;
        if (code === "ENOENT")
          ter |= ENOENT;
        if (code === "EINVAL" || code === "UNKNOWN") {
          ter &= IFMT_UNKNOWN;
        }
        this.#type = ter;
        if (code === "ENOTDIR" && this.parent) {
          this.parent.#markENOTDIR();
        }
      }
      #readdirAddChild(e, c) {
        return this.#readdirMaybePromoteChild(e, c) || this.#readdirAddNewChild(e, c);
      }
      #readdirAddNewChild(e, c) {
        const type = entToType(e);
        const child = this.newChild(e.name, type, { parent: this });
        const ifmt = child.#type & IFMT;
        if (ifmt !== IFDIR && ifmt !== IFLNK && ifmt !== UNKNOWN) {
          child.#type |= ENOTDIR;
        }
        c.unshift(child);
        c.provisional++;
        return child;
      }
      #readdirMaybePromoteChild(e, c) {
        for (let p = c.provisional; p < c.length; p++) {
          const pchild = c[p];
          const name = this.nocase ? normalizeNocase(e.name) : normalize(e.name);
          if (name !== pchild.#matchName) {
            continue;
          }
          return this.#readdirPromoteChild(e, pchild, p, c);
        }
      }
      #readdirPromoteChild(e, p, index, c) {
        const v = p.name;
        p.#type = p.#type & IFMT_UNKNOWN | entToType(e);
        if (v !== e.name)
          p.name = e.name;
        if (index !== c.provisional) {
          if (index === c.length - 1)
            c.pop();
          else
            c.splice(index, 1);
          c.unshift(p);
        }
        c.provisional++;
        return p;
      }
      /**
       * Call lstat() on this Path, and update all known information that can be
       * determined.
       *
       * Note that unlike `fs.lstat()`, the returned value does not contain some
       * information, such as `mode`, `dev`, `nlink`, and `ino`.  If that
       * information is required, you will need to call `fs.lstat` yourself.
       *
       * If the Path refers to a nonexistent file, or if the lstat call fails for
       * any reason, `undefined` is returned.  Otherwise the updated Path object is
       * returned.
       *
       * Results are cached, and thus may be out of date if the filesystem is
       * mutated.
       */
      async lstat() {
        if ((this.#type & ENOENT) === 0) {
          try {
            this.#applyStat(await this.#fs.promises.lstat(this.fullpath()));
            return this;
          } catch (er) {
            this.#lstatFail(er.code);
          }
        }
      }
      /**
       * synchronous {@link PathBase.lstat}
       */
      lstatSync() {
        if ((this.#type & ENOENT) === 0) {
          try {
            this.#applyStat(this.#fs.lstatSync(this.fullpath()));
            return this;
          } catch (er) {
            this.#lstatFail(er.code);
          }
        }
      }
      #applyStat(st) {
        const { atime, atimeMs, birthtime, birthtimeMs, blksize, blocks, ctime, ctimeMs, dev, gid, ino, mode, mtime, mtimeMs, nlink, rdev, size: size2, uid } = st;
        this.#atime = atime;
        this.#atimeMs = atimeMs;
        this.#birthtime = birthtime;
        this.#birthtimeMs = birthtimeMs;
        this.#blksize = blksize;
        this.#blocks = blocks;
        this.#ctime = ctime;
        this.#ctimeMs = ctimeMs;
        this.#dev = dev;
        this.#gid = gid;
        this.#ino = ino;
        this.#mode = mode;
        this.#mtime = mtime;
        this.#mtimeMs = mtimeMs;
        this.#nlink = nlink;
        this.#rdev = rdev;
        this.#size = size2;
        this.#uid = uid;
        const ifmt = entToType(st);
        this.#type = this.#type & IFMT_UNKNOWN | ifmt | LSTAT_CALLED;
        if (ifmt !== UNKNOWN && ifmt !== IFDIR && ifmt !== IFLNK) {
          this.#type |= ENOTDIR;
        }
      }
      #onReaddirCB = [];
      #readdirCBInFlight = false;
      #callOnReaddirCB(children) {
        this.#readdirCBInFlight = false;
        const cbs = this.#onReaddirCB.slice();
        this.#onReaddirCB.length = 0;
        cbs.forEach((cb) => cb(null, children));
      }
      /**
       * Standard node-style callback interface to get list of directory entries.
       *
       * If the Path cannot or does not contain any children, then an empty array
       * is returned.
       *
       * Results are cached, and thus may be out of date if the filesystem is
       * mutated.
       *
       * @param cb The callback called with (er, entries).  Note that the `er`
       * param is somewhat extraneous, as all readdir() errors are handled and
       * simply result in an empty set of entries being returned.
       * @param allowZalgo Boolean indicating that immediately known results should
       * *not* be deferred with `queueMicrotask`. Defaults to `false`. Release
       * zalgo at your peril, the dark pony lord is devious and unforgiving.
       */
      readdirCB(cb, allowZalgo = false) {
        if (!this.canReaddir()) {
          if (allowZalgo)
            cb(null, []);
          else
            queueMicrotask(() => cb(null, []));
          return;
        }
        const children = this.children();
        if (this.calledReaddir()) {
          const c = children.slice(0, children.provisional);
          if (allowZalgo)
            cb(null, c);
          else
            queueMicrotask(() => cb(null, c));
          return;
        }
        this.#onReaddirCB.push(cb);
        if (this.#readdirCBInFlight) {
          return;
        }
        this.#readdirCBInFlight = true;
        const fullpath = this.fullpath();
        this.#fs.readdir(fullpath, { withFileTypes: true }, (er, entries) => {
          if (er) {
            this.#readdirFail(er.code);
            children.provisional = 0;
          } else {
            for (const e of entries) {
              this.#readdirAddChild(e, children);
            }
            this.#readdirSuccess(children);
          }
          this.#callOnReaddirCB(children.slice(0, children.provisional));
          return;
        });
      }
      #asyncReaddirInFlight;
      /**
       * Return an array of known child entries.
       *
       * If the Path cannot or does not contain any children, then an empty array
       * is returned.
       *
       * Results are cached, and thus may be out of date if the filesystem is
       * mutated.
       */
      async readdir() {
        if (!this.canReaddir()) {
          return [];
        }
        const children = this.children();
        if (this.calledReaddir()) {
          return children.slice(0, children.provisional);
        }
        const fullpath = this.fullpath();
        if (this.#asyncReaddirInFlight) {
          await this.#asyncReaddirInFlight;
        } else {
          let resolve = () => {
          };
          this.#asyncReaddirInFlight = new Promise((res) => resolve = res);
          try {
            for (const e of await this.#fs.promises.readdir(fullpath, {
              withFileTypes: true
            })) {
              this.#readdirAddChild(e, children);
            }
            this.#readdirSuccess(children);
          } catch (er) {
            this.#readdirFail(er.code);
            children.provisional = 0;
          }
          this.#asyncReaddirInFlight = void 0;
          resolve();
        }
        return children.slice(0, children.provisional);
      }
      /**
       * synchronous {@link PathBase.readdir}
       */
      readdirSync() {
        if (!this.canReaddir()) {
          return [];
        }
        const children = this.children();
        if (this.calledReaddir()) {
          return children.slice(0, children.provisional);
        }
        const fullpath = this.fullpath();
        try {
          for (const e of this.#fs.readdirSync(fullpath, {
            withFileTypes: true
          })) {
            this.#readdirAddChild(e, children);
          }
          this.#readdirSuccess(children);
        } catch (er) {
          this.#readdirFail(er.code);
          children.provisional = 0;
        }
        return children.slice(0, children.provisional);
      }
      canReaddir() {
        if (this.#type & ENOCHILD)
          return false;
        const ifmt = IFMT & this.#type;
        if (!(ifmt === UNKNOWN || ifmt === IFDIR || ifmt === IFLNK)) {
          return false;
        }
        return true;
      }
      shouldWalk(dirs, walkFilter) {
        return (this.#type & IFDIR) === IFDIR && !(this.#type & ENOCHILD) && !dirs.has(this) && (!walkFilter || walkFilter(this));
      }
      /**
       * Return the Path object corresponding to path as resolved
       * by realpath(3).
       *
       * If the realpath call fails for any reason, `undefined` is returned.
       *
       * Result is cached, and thus may be outdated if the filesystem is mutated.
       * On success, returns a Path object.
       */
      async realpath() {
        if (this.#realpath)
          return this.#realpath;
        if ((ENOREALPATH | ENOREADLINK | ENOENT) & this.#type)
          return void 0;
        try {
          const rp = await this.#fs.promises.realpath(this.fullpath());
          return this.#realpath = this.resolve(rp);
        } catch (_) {
          this.#markENOREALPATH();
        }
      }
      /**
       * Synchronous {@link realpath}
       */
      realpathSync() {
        if (this.#realpath)
          return this.#realpath;
        if ((ENOREALPATH | ENOREADLINK | ENOENT) & this.#type)
          return void 0;
        try {
          const rp = this.#fs.realpathSync(this.fullpath());
          return this.#realpath = this.resolve(rp);
        } catch (_) {
          this.#markENOREALPATH();
        }
      }
      /**
       * Internal method to mark this Path object as the scurry cwd,
       * called by {@link PathScurry#chdir}
       *
       * @internal
       */
      [setAsCwd](oldCwd) {
        if (oldCwd === this)
          return;
        oldCwd.isCWD = false;
        this.isCWD = true;
        const changed = /* @__PURE__ */ new Set([]);
        let rp = [];
        let p = this;
        while (p && p.parent) {
          changed.add(p);
          p.#relative = rp.join(this.sep);
          p.#relativePosix = rp.join("/");
          p = p.parent;
          rp.push("..");
        }
        p = oldCwd;
        while (p && p.parent && !changed.has(p)) {
          p.#relative = void 0;
          p.#relativePosix = void 0;
          p = p.parent;
        }
      }
    };
    PathWin32 = class _PathWin32 extends PathBase {
      /**
       * Separator for generating path strings.
       */
      sep = "\\";
      /**
       * Separator for parsing path strings.
       */
      splitSep = eitherSep;
      /**
       * Do not create new Path objects directly.  They should always be accessed
       * via the PathScurry class or other methods on the Path class.
       *
       * @internal
       */
      constructor(name, type = UNKNOWN, root, roots, nocase, children, opts) {
        super(name, type, root, roots, nocase, children, opts);
      }
      /**
       * @internal
       */
      newChild(name, type = UNKNOWN, opts = {}) {
        return new _PathWin32(name, type, this.root, this.roots, this.nocase, this.childrenCache(), opts);
      }
      /**
       * @internal
       */
      getRootString(path5) {
        return import_node_path.win32.parse(path5).root;
      }
      /**
       * @internal
       */
      getRoot(rootPath) {
        rootPath = uncToDrive(rootPath.toUpperCase());
        if (rootPath === this.root.name) {
          return this.root;
        }
        for (const [compare, root] of Object.entries(this.roots)) {
          if (this.sameRoot(rootPath, compare)) {
            return this.roots[rootPath] = root;
          }
        }
        return this.roots[rootPath] = new PathScurryWin32(rootPath, this).root;
      }
      /**
       * @internal
       */
      sameRoot(rootPath, compare = this.root.name) {
        rootPath = rootPath.toUpperCase().replace(/\//g, "\\").replace(uncDriveRegexp, "$1\\");
        return rootPath === compare;
      }
    };
    PathPosix = class _PathPosix extends PathBase {
      /**
       * separator for parsing path strings
       */
      splitSep = "/";
      /**
       * separator for generating path strings
       */
      sep = "/";
      /**
       * Do not create new Path objects directly.  They should always be accessed
       * via the PathScurry class or other methods on the Path class.
       *
       * @internal
       */
      constructor(name, type = UNKNOWN, root, roots, nocase, children, opts) {
        super(name, type, root, roots, nocase, children, opts);
      }
      /**
       * @internal
       */
      getRootString(path5) {
        return path5.startsWith("/") ? "/" : "";
      }
      /**
       * @internal
       */
      getRoot(_rootPath) {
        return this.root;
      }
      /**
       * @internal
       */
      newChild(name, type = UNKNOWN, opts = {}) {
        return new _PathPosix(name, type, this.root, this.roots, this.nocase, this.childrenCache(), opts);
      }
    };
    PathScurryBase = class {
      /**
       * The root Path entry for the current working directory of this Scurry
       */
      root;
      /**
       * The string path for the root of this Scurry's current working directory
       */
      rootPath;
      /**
       * A collection of all roots encountered, referenced by rootPath
       */
      roots;
      /**
       * The Path entry corresponding to this PathScurry's current working directory.
       */
      cwd;
      #resolveCache;
      #resolvePosixCache;
      #children;
      /**
       * Perform path comparisons case-insensitively.
       *
       * Defaults true on Darwin and Windows systems, false elsewhere.
       */
      nocase;
      #fs;
      /**
       * This class should not be instantiated directly.
       *
       * Use PathScurryWin32, PathScurryDarwin, PathScurryPosix, or PathScurry
       *
       * @internal
       */
      constructor(cwd = process.cwd(), pathImpl, sep2, { nocase, childrenCacheSize = 16 * 1024, fs: fs4 = defaultFS } = {}) {
        this.#fs = fsFromOption(fs4);
        if (cwd instanceof URL || cwd.startsWith("file://")) {
          cwd = (0, import_node_url.fileURLToPath)(cwd);
        }
        const cwdPath = pathImpl.resolve(cwd);
        this.roots = /* @__PURE__ */ Object.create(null);
        this.rootPath = this.parseRootPath(cwdPath);
        this.#resolveCache = new ResolveCache();
        this.#resolvePosixCache = new ResolveCache();
        this.#children = new ChildrenCache(childrenCacheSize);
        const split2 = cwdPath.substring(this.rootPath.length).split(sep2);
        if (split2.length === 1 && !split2[0]) {
          split2.pop();
        }
        if (nocase === void 0) {
          throw new TypeError("must provide nocase setting to PathScurryBase ctor");
        }
        this.nocase = nocase;
        this.root = this.newRoot(this.#fs);
        this.roots[this.rootPath] = this.root;
        let prev = this.root;
        let len = split2.length - 1;
        const joinSep = pathImpl.sep;
        let abs = this.rootPath;
        let sawFirst = false;
        for (const part of split2) {
          const l = len--;
          prev = prev.child(part, {
            relative: new Array(l).fill("..").join(joinSep),
            relativePosix: new Array(l).fill("..").join("/"),
            fullpath: abs += (sawFirst ? "" : joinSep) + part
          });
          sawFirst = true;
        }
        this.cwd = prev;
      }
      /**
       * Get the depth of a provided path, string, or the cwd
       */
      depth(path5 = this.cwd) {
        if (typeof path5 === "string") {
          path5 = this.cwd.resolve(path5);
        }
        return path5.depth();
      }
      /**
       * Return the cache of child entries.  Exposed so subclasses can create
       * child Path objects in a platform-specific way.
       *
       * @internal
       */
      childrenCache() {
        return this.#children;
      }
      /**
       * Resolve one or more path strings to a resolved string
       *
       * Same interface as require('path').resolve.
       *
       * Much faster than path.resolve() when called multiple times for the same
       * path, because the resolved Path objects are cached.  Much slower
       * otherwise.
       */
      resolve(...paths) {
        let r = "";
        for (let i = paths.length - 1; i >= 0; i--) {
          const p = paths[i];
          if (!p || p === ".")
            continue;
          r = r ? `${p}/${r}` : p;
          if (this.isAbsolute(p)) {
            break;
          }
        }
        const cached = this.#resolveCache.get(r);
        if (cached !== void 0) {
          return cached;
        }
        const result = this.cwd.resolve(r).fullpath();
        this.#resolveCache.set(r, result);
        return result;
      }
      /**
       * Resolve one or more path strings to a resolved string, returning
       * the posix path.  Identical to .resolve() on posix systems, but on
       * windows will return a forward-slash separated UNC path.
       *
       * Same interface as require('path').resolve.
       *
       * Much faster than path.resolve() when called multiple times for the same
       * path, because the resolved Path objects are cached.  Much slower
       * otherwise.
       */
      resolvePosix(...paths) {
        let r = "";
        for (let i = paths.length - 1; i >= 0; i--) {
          const p = paths[i];
          if (!p || p === ".")
            continue;
          r = r ? `${p}/${r}` : p;
          if (this.isAbsolute(p)) {
            break;
          }
        }
        const cached = this.#resolvePosixCache.get(r);
        if (cached !== void 0) {
          return cached;
        }
        const result = this.cwd.resolve(r).fullpathPosix();
        this.#resolvePosixCache.set(r, result);
        return result;
      }
      /**
       * find the relative path from the cwd to the supplied path string or entry
       */
      relative(entry = this.cwd) {
        if (typeof entry === "string") {
          entry = this.cwd.resolve(entry);
        }
        return entry.relative();
      }
      /**
       * find the relative path from the cwd to the supplied path string or
       * entry, using / as the path delimiter, even on Windows.
       */
      relativePosix(entry = this.cwd) {
        if (typeof entry === "string") {
          entry = this.cwd.resolve(entry);
        }
        return entry.relativePosix();
      }
      /**
       * Return the basename for the provided string or Path object
       */
      basename(entry = this.cwd) {
        if (typeof entry === "string") {
          entry = this.cwd.resolve(entry);
        }
        return entry.name;
      }
      /**
       * Return the dirname for the provided string or Path object
       */
      dirname(entry = this.cwd) {
        if (typeof entry === "string") {
          entry = this.cwd.resolve(entry);
        }
        return (entry.parent || entry).fullpath();
      }
      async readdir(entry = this.cwd, opts = {
        withFileTypes: true
      }) {
        if (typeof entry === "string") {
          entry = this.cwd.resolve(entry);
        } else if (!(entry instanceof PathBase)) {
          opts = entry;
          entry = this.cwd;
        }
        const { withFileTypes } = opts;
        if (!entry.canReaddir()) {
          return [];
        } else {
          const p = await entry.readdir();
          return withFileTypes ? p : p.map((e) => e.name);
        }
      }
      readdirSync(entry = this.cwd, opts = {
        withFileTypes: true
      }) {
        if (typeof entry === "string") {
          entry = this.cwd.resolve(entry);
        } else if (!(entry instanceof PathBase)) {
          opts = entry;
          entry = this.cwd;
        }
        const { withFileTypes = true } = opts;
        if (!entry.canReaddir()) {
          return [];
        } else if (withFileTypes) {
          return entry.readdirSync();
        } else {
          return entry.readdirSync().map((e) => e.name);
        }
      }
      /**
       * Call lstat() on the string or Path object, and update all known
       * information that can be determined.
       *
       * Note that unlike `fs.lstat()`, the returned value does not contain some
       * information, such as `mode`, `dev`, `nlink`, and `ino`.  If that
       * information is required, you will need to call `fs.lstat` yourself.
       *
       * If the Path refers to a nonexistent file, or if the lstat call fails for
       * any reason, `undefined` is returned.  Otherwise the updated Path object is
       * returned.
       *
       * Results are cached, and thus may be out of date if the filesystem is
       * mutated.
       */
      async lstat(entry = this.cwd) {
        if (typeof entry === "string") {
          entry = this.cwd.resolve(entry);
        }
        return entry.lstat();
      }
      /**
       * synchronous {@link PathScurryBase.lstat}
       */
      lstatSync(entry = this.cwd) {
        if (typeof entry === "string") {
          entry = this.cwd.resolve(entry);
        }
        return entry.lstatSync();
      }
      async readlink(entry = this.cwd, { withFileTypes } = {
        withFileTypes: false
      }) {
        if (typeof entry === "string") {
          entry = this.cwd.resolve(entry);
        } else if (!(entry instanceof PathBase)) {
          withFileTypes = entry.withFileTypes;
          entry = this.cwd;
        }
        const e = await entry.readlink();
        return withFileTypes ? e : e?.fullpath();
      }
      readlinkSync(entry = this.cwd, { withFileTypes } = {
        withFileTypes: false
      }) {
        if (typeof entry === "string") {
          entry = this.cwd.resolve(entry);
        } else if (!(entry instanceof PathBase)) {
          withFileTypes = entry.withFileTypes;
          entry = this.cwd;
        }
        const e = entry.readlinkSync();
        return withFileTypes ? e : e?.fullpath();
      }
      async realpath(entry = this.cwd, { withFileTypes } = {
        withFileTypes: false
      }) {
        if (typeof entry === "string") {
          entry = this.cwd.resolve(entry);
        } else if (!(entry instanceof PathBase)) {
          withFileTypes = entry.withFileTypes;
          entry = this.cwd;
        }
        const e = await entry.realpath();
        return withFileTypes ? e : e?.fullpath();
      }
      realpathSync(entry = this.cwd, { withFileTypes } = {
        withFileTypes: false
      }) {
        if (typeof entry === "string") {
          entry = this.cwd.resolve(entry);
        } else if (!(entry instanceof PathBase)) {
          withFileTypes = entry.withFileTypes;
          entry = this.cwd;
        }
        const e = entry.realpathSync();
        return withFileTypes ? e : e?.fullpath();
      }
      async walk(entry = this.cwd, opts = {}) {
        if (typeof entry === "string") {
          entry = this.cwd.resolve(entry);
        } else if (!(entry instanceof PathBase)) {
          opts = entry;
          entry = this.cwd;
        }
        const { withFileTypes = true, follow = false, filter: filter2, walkFilter } = opts;
        const results = [];
        if (!filter2 || filter2(entry)) {
          results.push(withFileTypes ? entry : entry.fullpath());
        }
        const dirs = /* @__PURE__ */ new Set();
        const walk2 = (dir, cb) => {
          dirs.add(dir);
          dir.readdirCB((er, entries) => {
            if (er) {
              return cb(er);
            }
            let len = entries.length;
            if (!len)
              return cb();
            const next = () => {
              if (--len === 0) {
                cb();
              }
            };
            for (const e of entries) {
              if (!filter2 || filter2(e)) {
                results.push(withFileTypes ? e : e.fullpath());
              }
              if (follow && e.isSymbolicLink()) {
                e.realpath().then((r) => r?.isUnknown() ? r.lstat() : r).then((r) => r?.shouldWalk(dirs, walkFilter) ? walk2(r, next) : next());
              } else {
                if (e.shouldWalk(dirs, walkFilter)) {
                  walk2(e, next);
                } else {
                  next();
                }
              }
            }
          }, true);
        };
        const start = entry;
        return new Promise((res, rej) => {
          walk2(start, (er) => {
            if (er)
              return rej(er);
            res(results);
          });
        });
      }
      walkSync(entry = this.cwd, opts = {}) {
        if (typeof entry === "string") {
          entry = this.cwd.resolve(entry);
        } else if (!(entry instanceof PathBase)) {
          opts = entry;
          entry = this.cwd;
        }
        const { withFileTypes = true, follow = false, filter: filter2, walkFilter } = opts;
        const results = [];
        if (!filter2 || filter2(entry)) {
          results.push(withFileTypes ? entry : entry.fullpath());
        }
        const dirs = /* @__PURE__ */ new Set([entry]);
        for (const dir of dirs) {
          const entries = dir.readdirSync();
          for (const e of entries) {
            if (!filter2 || filter2(e)) {
              results.push(withFileTypes ? e : e.fullpath());
            }
            let r = e;
            if (e.isSymbolicLink()) {
              if (!(follow && (r = e.realpathSync())))
                continue;
              if (r.isUnknown())
                r.lstatSync();
            }
            if (r.shouldWalk(dirs, walkFilter)) {
              dirs.add(r);
            }
          }
        }
        return results;
      }
      /**
       * Support for `for await`
       *
       * Alias for {@link PathScurryBase.iterate}
       *
       * Note: As of Node 19, this is very slow, compared to other methods of
       * walking.  Consider using {@link PathScurryBase.stream} if memory overhead
       * and backpressure are concerns, or {@link PathScurryBase.walk} if not.
       */
      [Symbol.asyncIterator]() {
        return this.iterate();
      }
      iterate(entry = this.cwd, options = {}) {
        if (typeof entry === "string") {
          entry = this.cwd.resolve(entry);
        } else if (!(entry instanceof PathBase)) {
          options = entry;
          entry = this.cwd;
        }
        return this.stream(entry, options)[Symbol.asyncIterator]();
      }
      /**
       * Iterating over a PathScurry performs a synchronous walk.
       *
       * Alias for {@link PathScurryBase.iterateSync}
       */
      [Symbol.iterator]() {
        return this.iterateSync();
      }
      *iterateSync(entry = this.cwd, opts = {}) {
        if (typeof entry === "string") {
          entry = this.cwd.resolve(entry);
        } else if (!(entry instanceof PathBase)) {
          opts = entry;
          entry = this.cwd;
        }
        const { withFileTypes = true, follow = false, filter: filter2, walkFilter } = opts;
        if (!filter2 || filter2(entry)) {
          yield withFileTypes ? entry : entry.fullpath();
        }
        const dirs = /* @__PURE__ */ new Set([entry]);
        for (const dir of dirs) {
          const entries = dir.readdirSync();
          for (const e of entries) {
            if (!filter2 || filter2(e)) {
              yield withFileTypes ? e : e.fullpath();
            }
            let r = e;
            if (e.isSymbolicLink()) {
              if (!(follow && (r = e.realpathSync())))
                continue;
              if (r.isUnknown())
                r.lstatSync();
            }
            if (r.shouldWalk(dirs, walkFilter)) {
              dirs.add(r);
            }
          }
        }
      }
      stream(entry = this.cwd, opts = {}) {
        if (typeof entry === "string") {
          entry = this.cwd.resolve(entry);
        } else if (!(entry instanceof PathBase)) {
          opts = entry;
          entry = this.cwd;
        }
        const { withFileTypes = true, follow = false, filter: filter2, walkFilter } = opts;
        const results = new Minipass({ objectMode: true });
        if (!filter2 || filter2(entry)) {
          results.write(withFileTypes ? entry : entry.fullpath());
        }
        const dirs = /* @__PURE__ */ new Set();
        const queue = [entry];
        let processing = 0;
        const process3 = () => {
          let paused = false;
          while (!paused) {
            const dir = queue.shift();
            if (!dir) {
              if (processing === 0)
                results.end();
              return;
            }
            processing++;
            dirs.add(dir);
            const onReaddir = (er, entries, didRealpaths = false) => {
              if (er)
                return results.emit("error", er);
              if (follow && !didRealpaths) {
                const promises = [];
                for (const e of entries) {
                  if (e.isSymbolicLink()) {
                    promises.push(e.realpath().then((r) => r?.isUnknown() ? r.lstat() : r));
                  }
                }
                if (promises.length) {
                  Promise.all(promises).then(() => onReaddir(null, entries, true));
                  return;
                }
              }
              for (const e of entries) {
                if (e && (!filter2 || filter2(e))) {
                  if (!results.write(withFileTypes ? e : e.fullpath())) {
                    paused = true;
                  }
                }
              }
              processing--;
              for (const e of entries) {
                const r = e.realpathCached() || e;
                if (r.shouldWalk(dirs, walkFilter)) {
                  queue.push(r);
                }
              }
              if (paused && !results.flowing) {
                results.once("drain", process3);
              } else if (!sync2) {
                process3();
              }
            };
            let sync2 = true;
            dir.readdirCB(onReaddir, true);
            sync2 = false;
          }
        };
        process3();
        return results;
      }
      streamSync(entry = this.cwd, opts = {}) {
        if (typeof entry === "string") {
          entry = this.cwd.resolve(entry);
        } else if (!(entry instanceof PathBase)) {
          opts = entry;
          entry = this.cwd;
        }
        const { withFileTypes = true, follow = false, filter: filter2, walkFilter } = opts;
        const results = new Minipass({ objectMode: true });
        const dirs = /* @__PURE__ */ new Set();
        if (!filter2 || filter2(entry)) {
          results.write(withFileTypes ? entry : entry.fullpath());
        }
        const queue = [entry];
        let processing = 0;
        const process3 = () => {
          let paused = false;
          while (!paused) {
            const dir = queue.shift();
            if (!dir) {
              if (processing === 0)
                results.end();
              return;
            }
            processing++;
            dirs.add(dir);
            const entries = dir.readdirSync();
            for (const e of entries) {
              if (!filter2 || filter2(e)) {
                if (!results.write(withFileTypes ? e : e.fullpath())) {
                  paused = true;
                }
              }
            }
            processing--;
            for (const e of entries) {
              let r = e;
              if (e.isSymbolicLink()) {
                if (!(follow && (r = e.realpathSync())))
                  continue;
                if (r.isUnknown())
                  r.lstatSync();
              }
              if (r.shouldWalk(dirs, walkFilter)) {
                queue.push(r);
              }
            }
          }
          if (paused && !results.flowing)
            results.once("drain", process3);
        };
        process3();
        return results;
      }
      chdir(path5 = this.cwd) {
        const oldCwd = this.cwd;
        this.cwd = typeof path5 === "string" ? this.cwd.resolve(path5) : path5;
        this.cwd[setAsCwd](oldCwd);
      }
    };
    PathScurryWin32 = class extends PathScurryBase {
      /**
       * separator for generating path strings
       */
      sep = "\\";
      constructor(cwd = process.cwd(), opts = {}) {
        const { nocase = true } = opts;
        super(cwd, import_node_path.win32, "\\", { ...opts, nocase });
        this.nocase = nocase;
        for (let p = this.cwd; p; p = p.parent) {
          p.nocase = this.nocase;
        }
      }
      /**
       * @internal
       */
      parseRootPath(dir) {
        return import_node_path.win32.parse(dir).root.toUpperCase();
      }
      /**
       * @internal
       */
      newRoot(fs4) {
        return new PathWin32(this.rootPath, IFDIR, void 0, this.roots, this.nocase, this.childrenCache(), { fs: fs4 });
      }
      /**
       * Return true if the provided path string is an absolute path
       */
      isAbsolute(p) {
        return p.startsWith("/") || p.startsWith("\\") || /^[a-z]:(\/|\\)/i.test(p);
      }
    };
    PathScurryPosix = class extends PathScurryBase {
      /**
       * separator for generating path strings
       */
      sep = "/";
      constructor(cwd = process.cwd(), opts = {}) {
        const { nocase = false } = opts;
        super(cwd, import_node_path.posix, "/", { ...opts, nocase });
        this.nocase = nocase;
      }
      /**
       * @internal
       */
      parseRootPath(_dir) {
        return "/";
      }
      /**
       * @internal
       */
      newRoot(fs4) {
        return new PathPosix(this.rootPath, IFDIR, void 0, this.roots, this.nocase, this.childrenCache(), { fs: fs4 });
      }
      /**
       * Return true if the provided path string is an absolute path
       */
      isAbsolute(p) {
        return p.startsWith("/");
      }
    };
    PathScurryDarwin = class extends PathScurryPosix {
      constructor(cwd = process.cwd(), opts = {}) {
        const { nocase = true } = opts;
        super(cwd, { ...opts, nocase });
      }
    };
    Path = process.platform === "win32" ? PathWin32 : PathPosix;
    PathScurry = process.platform === "win32" ? PathScurryWin32 : process.platform === "darwin" ? PathScurryDarwin : PathScurryPosix;
  }
});

// ../../../.yarn/berry/cache/glob-npm-11.0.3-f68382b3cc-10c0.zip/node_modules/glob/dist/esm/pattern.js
var isPatternList, isGlobList, Pattern;
var init_pattern = __esm({
  "../../../.yarn/berry/cache/glob-npm-11.0.3-f68382b3cc-10c0.zip/node_modules/glob/dist/esm/pattern.js"() {
    init_esm3();
    isPatternList = (pl) => pl.length >= 1;
    isGlobList = (gl) => gl.length >= 1;
    Pattern = class _Pattern {
      #patternList;
      #globList;
      #index;
      length;
      #platform;
      #rest;
      #globString;
      #isDrive;
      #isUNC;
      #isAbsolute;
      #followGlobstar = true;
      constructor(patternList, globList, index, platform) {
        if (!isPatternList(patternList)) {
          throw new TypeError("empty pattern list");
        }
        if (!isGlobList(globList)) {
          throw new TypeError("empty glob list");
        }
        if (globList.length !== patternList.length) {
          throw new TypeError("mismatched pattern list and glob list lengths");
        }
        this.length = patternList.length;
        if (index < 0 || index >= this.length) {
          throw new TypeError("index out of range");
        }
        this.#patternList = patternList;
        this.#globList = globList;
        this.#index = index;
        this.#platform = platform;
        if (this.#index === 0) {
          if (this.isUNC()) {
            const [p0, p1, p2, p3, ...prest] = this.#patternList;
            const [g0, g1, g2, g3, ...grest] = this.#globList;
            if (prest[0] === "") {
              prest.shift();
              grest.shift();
            }
            const p = [p0, p1, p2, p3, ""].join("/");
            const g = [g0, g1, g2, g3, ""].join("/");
            this.#patternList = [p, ...prest];
            this.#globList = [g, ...grest];
            this.length = this.#patternList.length;
          } else if (this.isDrive() || this.isAbsolute()) {
            const [p1, ...prest] = this.#patternList;
            const [g1, ...grest] = this.#globList;
            if (prest[0] === "") {
              prest.shift();
              grest.shift();
            }
            const p = p1 + "/";
            const g = g1 + "/";
            this.#patternList = [p, ...prest];
            this.#globList = [g, ...grest];
            this.length = this.#patternList.length;
          }
        }
      }
      /**
       * The first entry in the parsed list of patterns
       */
      pattern() {
        return this.#patternList[this.#index];
      }
      /**
       * true of if pattern() returns a string
       */
      isString() {
        return typeof this.#patternList[this.#index] === "string";
      }
      /**
       * true of if pattern() returns GLOBSTAR
       */
      isGlobstar() {
        return this.#patternList[this.#index] === GLOBSTAR;
      }
      /**
       * true if pattern() returns a regexp
       */
      isRegExp() {
        return this.#patternList[this.#index] instanceof RegExp;
      }
      /**
       * The /-joined set of glob parts that make up this pattern
       */
      globString() {
        return this.#globString = this.#globString || (this.#index === 0 ? this.isAbsolute() ? this.#globList[0] + this.#globList.slice(1).join("/") : this.#globList.join("/") : this.#globList.slice(this.#index).join("/"));
      }
      /**
       * true if there are more pattern parts after this one
       */
      hasMore() {
        return this.length > this.#index + 1;
      }
      /**
       * The rest of the pattern after this part, or null if this is the end
       */
      rest() {
        if (this.#rest !== void 0)
          return this.#rest;
        if (!this.hasMore())
          return this.#rest = null;
        this.#rest = new _Pattern(this.#patternList, this.#globList, this.#index + 1, this.#platform);
        this.#rest.#isAbsolute = this.#isAbsolute;
        this.#rest.#isUNC = this.#isUNC;
        this.#rest.#isDrive = this.#isDrive;
        return this.#rest;
      }
      /**
       * true if the pattern represents a //unc/path/ on windows
       */
      isUNC() {
        const pl = this.#patternList;
        return this.#isUNC !== void 0 ? this.#isUNC : this.#isUNC = this.#platform === "win32" && this.#index === 0 && pl[0] === "" && pl[1] === "" && typeof pl[2] === "string" && !!pl[2] && typeof pl[3] === "string" && !!pl[3];
      }
      // pattern like C:/...
      // split = ['C:', ...]
      // XXX: would be nice to handle patterns like `c:*` to test the cwd
      // in c: for *, but I don't know of a way to even figure out what that
      // cwd is without actually chdir'ing into it?
      /**
       * True if the pattern starts with a drive letter on Windows
       */
      isDrive() {
        const pl = this.#patternList;
        return this.#isDrive !== void 0 ? this.#isDrive : this.#isDrive = this.#platform === "win32" && this.#index === 0 && this.length > 1 && typeof pl[0] === "string" && /^[a-z]:$/i.test(pl[0]);
      }
      // pattern = '/' or '/...' or '/x/...'
      // split = ['', ''] or ['', ...] or ['', 'x', ...]
      // Drive and UNC both considered absolute on windows
      /**
       * True if the pattern is rooted on an absolute path
       */
      isAbsolute() {
        const pl = this.#patternList;
        return this.#isAbsolute !== void 0 ? this.#isAbsolute : this.#isAbsolute = pl[0] === "" && pl.length > 1 || this.isDrive() || this.isUNC();
      }
      /**
       * consume the root of the pattern, and return it
       */
      root() {
        const p = this.#patternList[0];
        return typeof p === "string" && this.isAbsolute() && this.#index === 0 ? p : "";
      }
      /**
       * Check to see if the current globstar pattern is allowed to follow
       * a symbolic link.
       */
      checkFollowGlobstar() {
        return !(this.#index === 0 || !this.isGlobstar() || !this.#followGlobstar);
      }
      /**
       * Mark that the current globstar pattern is following a symbolic link
       */
      markFollowGlobstar() {
        if (this.#index === 0 || !this.isGlobstar() || !this.#followGlobstar)
          return false;
        this.#followGlobstar = false;
        return true;
      }
    };
  }
});

// ../../../.yarn/berry/cache/glob-npm-11.0.3-f68382b3cc-10c0.zip/node_modules/glob/dist/esm/ignore.js
var defaultPlatform2, Ignore;
var init_ignore = __esm({
  "../../../.yarn/berry/cache/glob-npm-11.0.3-f68382b3cc-10c0.zip/node_modules/glob/dist/esm/ignore.js"() {
    init_esm3();
    init_pattern();
    defaultPlatform2 = typeof process === "object" && process && typeof process.platform === "string" ? process.platform : "linux";
    Ignore = class {
      relative;
      relativeChildren;
      absolute;
      absoluteChildren;
      platform;
      mmopts;
      constructor(ignored, { nobrace, nocase, noext, noglobstar, platform = defaultPlatform2 }) {
        this.relative = [];
        this.absolute = [];
        this.relativeChildren = [];
        this.absoluteChildren = [];
        this.platform = platform;
        this.mmopts = {
          dot: true,
          nobrace,
          nocase,
          noext,
          noglobstar,
          optimizationLevel: 2,
          platform,
          nocomment: true,
          nonegate: true
        };
        for (const ign of ignored)
          this.add(ign);
      }
      add(ign) {
        const mm = new Minimatch(ign, this.mmopts);
        for (let i = 0; i < mm.set.length; i++) {
          const parsed = mm.set[i];
          const globParts = mm.globParts[i];
          if (!parsed || !globParts) {
            throw new Error("invalid pattern object");
          }
          while (parsed[0] === "." && globParts[0] === ".") {
            parsed.shift();
            globParts.shift();
          }
          const p = new Pattern(parsed, globParts, 0, this.platform);
          const m = new Minimatch(p.globString(), this.mmopts);
          const children = globParts[globParts.length - 1] === "**";
          const absolute = p.isAbsolute();
          if (absolute)
            this.absolute.push(m);
          else
            this.relative.push(m);
          if (children) {
            if (absolute)
              this.absoluteChildren.push(m);
            else
              this.relativeChildren.push(m);
          }
        }
      }
      ignored(p) {
        const fullpath = p.fullpath();
        const fullpaths = `${fullpath}/`;
        const relative = p.relative() || ".";
        const relatives = `${relative}/`;
        for (const m of this.relative) {
          if (m.match(relative) || m.match(relatives))
            return true;
        }
        for (const m of this.absolute) {
          if (m.match(fullpath) || m.match(fullpaths))
            return true;
        }
        return false;
      }
      childrenIgnored(p) {
        const fullpath = p.fullpath() + "/";
        const relative = (p.relative() || ".") + "/";
        for (const m of this.relativeChildren) {
          if (m.match(relative))
            return true;
        }
        for (const m of this.absoluteChildren) {
          if (m.match(fullpath))
            return true;
        }
        return false;
      }
    };
  }
});

// ../../../.yarn/berry/cache/glob-npm-11.0.3-f68382b3cc-10c0.zip/node_modules/glob/dist/esm/processor.js
var HasWalkedCache, MatchRecord, SubWalks, Processor;
var init_processor = __esm({
  "../../../.yarn/berry/cache/glob-npm-11.0.3-f68382b3cc-10c0.zip/node_modules/glob/dist/esm/processor.js"() {
    init_esm3();
    HasWalkedCache = class _HasWalkedCache {
      store;
      constructor(store = /* @__PURE__ */ new Map()) {
        this.store = store;
      }
      copy() {
        return new _HasWalkedCache(new Map(this.store));
      }
      hasWalked(target, pattern) {
        return this.store.get(target.fullpath())?.has(pattern.globString());
      }
      storeWalked(target, pattern) {
        const fullpath = target.fullpath();
        const cached = this.store.get(fullpath);
        if (cached)
          cached.add(pattern.globString());
        else
          this.store.set(fullpath, /* @__PURE__ */ new Set([pattern.globString()]));
      }
    };
    MatchRecord = class {
      store = /* @__PURE__ */ new Map();
      add(target, absolute, ifDir) {
        const n = (absolute ? 2 : 0) | (ifDir ? 1 : 0);
        const current = this.store.get(target);
        this.store.set(target, current === void 0 ? n : n & current);
      }
      // match, absolute, ifdir
      entries() {
        return [...this.store.entries()].map(([path5, n]) => [
          path5,
          !!(n & 2),
          !!(n & 1)
        ]);
      }
    };
    SubWalks = class {
      store = /* @__PURE__ */ new Map();
      add(target, pattern) {
        if (!target.canReaddir()) {
          return;
        }
        const subs = this.store.get(target);
        if (subs) {
          if (!subs.find((p) => p.globString() === pattern.globString())) {
            subs.push(pattern);
          }
        } else
          this.store.set(target, [pattern]);
      }
      get(target) {
        const subs = this.store.get(target);
        if (!subs) {
          throw new Error("attempting to walk unknown path");
        }
        return subs;
      }
      entries() {
        return this.keys().map((k) => [k, this.store.get(k)]);
      }
      keys() {
        return [...this.store.keys()].filter((t) => t.canReaddir());
      }
    };
    Processor = class _Processor {
      hasWalkedCache;
      matches = new MatchRecord();
      subwalks = new SubWalks();
      patterns;
      follow;
      dot;
      opts;
      constructor(opts, hasWalkedCache) {
        this.opts = opts;
        this.follow = !!opts.follow;
        this.dot = !!opts.dot;
        this.hasWalkedCache = hasWalkedCache ? hasWalkedCache.copy() : new HasWalkedCache();
      }
      processPatterns(target, patterns) {
        this.patterns = patterns;
        const processingSet = patterns.map((p) => [target, p]);
        for (let [t, pattern] of processingSet) {
          this.hasWalkedCache.storeWalked(t, pattern);
          const root = pattern.root();
          const absolute = pattern.isAbsolute() && this.opts.absolute !== false;
          if (root) {
            t = t.resolve(root === "/" && this.opts.root !== void 0 ? this.opts.root : root);
            const rest2 = pattern.rest();
            if (!rest2) {
              this.matches.add(t, true, false);
              continue;
            } else {
              pattern = rest2;
            }
          }
          if (t.isENOENT())
            continue;
          let p;
          let rest;
          let changed = false;
          while (typeof (p = pattern.pattern()) === "string" && (rest = pattern.rest())) {
            const c = t.resolve(p);
            t = c;
            pattern = rest;
            changed = true;
          }
          p = pattern.pattern();
          rest = pattern.rest();
          if (changed) {
            if (this.hasWalkedCache.hasWalked(t, pattern))
              continue;
            this.hasWalkedCache.storeWalked(t, pattern);
          }
          if (typeof p === "string") {
            const ifDir = p === ".." || p === "" || p === ".";
            this.matches.add(t.resolve(p), absolute, ifDir);
            continue;
          } else if (p === GLOBSTAR) {
            if (!t.isSymbolicLink() || this.follow || pattern.checkFollowGlobstar()) {
              this.subwalks.add(t, pattern);
            }
            const rp = rest?.pattern();
            const rrest = rest?.rest();
            if (!rest || (rp === "" || rp === ".") && !rrest) {
              this.matches.add(t, absolute, rp === "" || rp === ".");
            } else {
              if (rp === "..") {
                const tp = t.parent || t;
                if (!rrest)
                  this.matches.add(tp, absolute, true);
                else if (!this.hasWalkedCache.hasWalked(tp, rrest)) {
                  this.subwalks.add(tp, rrest);
                }
              }
            }
          } else if (p instanceof RegExp) {
            this.subwalks.add(t, pattern);
          }
        }
        return this;
      }
      subwalkTargets() {
        return this.subwalks.keys();
      }
      child() {
        return new _Processor(this.opts, this.hasWalkedCache);
      }
      // return a new Processor containing the subwalks for each
      // child entry, and a set of matches, and
      // a hasWalkedCache that's a copy of this one
      // then we're going to call
      filterEntries(parent, entries) {
        const patterns = this.subwalks.get(parent);
        const results = this.child();
        for (const e of entries) {
          for (const pattern of patterns) {
            const absolute = pattern.isAbsolute();
            const p = pattern.pattern();
            const rest = pattern.rest();
            if (p === GLOBSTAR) {
              results.testGlobstar(e, pattern, rest, absolute);
            } else if (p instanceof RegExp) {
              results.testRegExp(e, p, rest, absolute);
            } else {
              results.testString(e, p, rest, absolute);
            }
          }
        }
        return results;
      }
      testGlobstar(e, pattern, rest, absolute) {
        if (this.dot || !e.name.startsWith(".")) {
          if (!pattern.hasMore()) {
            this.matches.add(e, absolute, false);
          }
          if (e.canReaddir()) {
            if (this.follow || !e.isSymbolicLink()) {
              this.subwalks.add(e, pattern);
            } else if (e.isSymbolicLink()) {
              if (rest && pattern.checkFollowGlobstar()) {
                this.subwalks.add(e, rest);
              } else if (pattern.markFollowGlobstar()) {
                this.subwalks.add(e, pattern);
              }
            }
          }
        }
        if (rest) {
          const rp = rest.pattern();
          if (typeof rp === "string" && // dots and empty were handled already
          rp !== ".." && rp !== "" && rp !== ".") {
            this.testString(e, rp, rest.rest(), absolute);
          } else if (rp === "..") {
            const ep = e.parent || e;
            this.subwalks.add(ep, rest);
          } else if (rp instanceof RegExp) {
            this.testRegExp(e, rp, rest.rest(), absolute);
          }
        }
      }
      testRegExp(e, p, rest, absolute) {
        if (!p.test(e.name))
          return;
        if (!rest) {
          this.matches.add(e, absolute, false);
        } else {
          this.subwalks.add(e, rest);
        }
      }
      testString(e, p, rest, absolute) {
        if (!e.isNamed(p))
          return;
        if (!rest) {
          this.matches.add(e, absolute, false);
        } else {
          this.subwalks.add(e, rest);
        }
      }
    };
  }
});

// ../../../.yarn/berry/cache/glob-npm-11.0.3-f68382b3cc-10c0.zip/node_modules/glob/dist/esm/walker.js
var makeIgnore, GlobUtil, GlobWalker, GlobStream;
var init_walker = __esm({
  "../../../.yarn/berry/cache/glob-npm-11.0.3-f68382b3cc-10c0.zip/node_modules/glob/dist/esm/walker.js"() {
    init_esm5();
    init_ignore();
    init_processor();
    makeIgnore = (ignore, opts) => typeof ignore === "string" ? new Ignore([ignore], opts) : Array.isArray(ignore) ? new Ignore(ignore, opts) : ignore;
    GlobUtil = class {
      path;
      patterns;
      opts;
      seen = /* @__PURE__ */ new Set();
      paused = false;
      aborted = false;
      #onResume = [];
      #ignore;
      #sep;
      signal;
      maxDepth;
      includeChildMatches;
      constructor(patterns, path5, opts) {
        this.patterns = patterns;
        this.path = path5;
        this.opts = opts;
        this.#sep = !opts.posix && opts.platform === "win32" ? "\\" : "/";
        this.includeChildMatches = opts.includeChildMatches !== false;
        if (opts.ignore || !this.includeChildMatches) {
          this.#ignore = makeIgnore(opts.ignore ?? [], opts);
          if (!this.includeChildMatches && typeof this.#ignore.add !== "function") {
            const m = "cannot ignore child matches, ignore lacks add() method.";
            throw new Error(m);
          }
        }
        this.maxDepth = opts.maxDepth || Infinity;
        if (opts.signal) {
          this.signal = opts.signal;
          this.signal.addEventListener("abort", () => {
            this.#onResume.length = 0;
          });
        }
      }
      #ignored(path5) {
        return this.seen.has(path5) || !!this.#ignore?.ignored?.(path5);
      }
      #childrenIgnored(path5) {
        return !!this.#ignore?.childrenIgnored?.(path5);
      }
      // backpressure mechanism
      pause() {
        this.paused = true;
      }
      resume() {
        if (this.signal?.aborted)
          return;
        this.paused = false;
        let fn = void 0;
        while (!this.paused && (fn = this.#onResume.shift())) {
          fn();
        }
      }
      onResume(fn) {
        if (this.signal?.aborted)
          return;
        if (!this.paused) {
          fn();
        } else {
          this.#onResume.push(fn);
        }
      }
      // do the requisite realpath/stat checking, and return the path
      // to add or undefined to filter it out.
      async matchCheck(e, ifDir) {
        if (ifDir && this.opts.nodir)
          return void 0;
        let rpc;
        if (this.opts.realpath) {
          rpc = e.realpathCached() || await e.realpath();
          if (!rpc)
            return void 0;
          e = rpc;
        }
        const needStat = e.isUnknown() || this.opts.stat;
        const s = needStat ? await e.lstat() : e;
        if (this.opts.follow && this.opts.nodir && s?.isSymbolicLink()) {
          const target = await s.realpath();
          if (target && (target.isUnknown() || this.opts.stat)) {
            await target.lstat();
          }
        }
        return this.matchCheckTest(s, ifDir);
      }
      matchCheckTest(e, ifDir) {
        return e && (this.maxDepth === Infinity || e.depth() <= this.maxDepth) && (!ifDir || e.canReaddir()) && (!this.opts.nodir || !e.isDirectory()) && (!this.opts.nodir || !this.opts.follow || !e.isSymbolicLink() || !e.realpathCached()?.isDirectory()) && !this.#ignored(e) ? e : void 0;
      }
      matchCheckSync(e, ifDir) {
        if (ifDir && this.opts.nodir)
          return void 0;
        let rpc;
        if (this.opts.realpath) {
          rpc = e.realpathCached() || e.realpathSync();
          if (!rpc)
            return void 0;
          e = rpc;
        }
        const needStat = e.isUnknown() || this.opts.stat;
        const s = needStat ? e.lstatSync() : e;
        if (this.opts.follow && this.opts.nodir && s?.isSymbolicLink()) {
          const target = s.realpathSync();
          if (target && (target?.isUnknown() || this.opts.stat)) {
            target.lstatSync();
          }
        }
        return this.matchCheckTest(s, ifDir);
      }
      matchFinish(e, absolute) {
        if (this.#ignored(e))
          return;
        if (!this.includeChildMatches && this.#ignore?.add) {
          const ign = `${e.relativePosix()}/**`;
          this.#ignore.add(ign);
        }
        const abs = this.opts.absolute === void 0 ? absolute : this.opts.absolute;
        this.seen.add(e);
        const mark = this.opts.mark && e.isDirectory() ? this.#sep : "";
        if (this.opts.withFileTypes) {
          this.matchEmit(e);
        } else if (abs) {
          const abs2 = this.opts.posix ? e.fullpathPosix() : e.fullpath();
          this.matchEmit(abs2 + mark);
        } else {
          const rel = this.opts.posix ? e.relativePosix() : e.relative();
          const pre = this.opts.dotRelative && !rel.startsWith(".." + this.#sep) ? "." + this.#sep : "";
          this.matchEmit(!rel ? "." + mark : pre + rel + mark);
        }
      }
      async match(e, absolute, ifDir) {
        const p = await this.matchCheck(e, ifDir);
        if (p)
          this.matchFinish(p, absolute);
      }
      matchSync(e, absolute, ifDir) {
        const p = this.matchCheckSync(e, ifDir);
        if (p)
          this.matchFinish(p, absolute);
      }
      walkCB(target, patterns, cb) {
        if (this.signal?.aborted)
          cb();
        this.walkCB2(target, patterns, new Processor(this.opts), cb);
      }
      walkCB2(target, patterns, processor, cb) {
        if (this.#childrenIgnored(target))
          return cb();
        if (this.signal?.aborted)
          cb();
        if (this.paused) {
          this.onResume(() => this.walkCB2(target, patterns, processor, cb));
          return;
        }
        processor.processPatterns(target, patterns);
        let tasks = 1;
        const next = () => {
          if (--tasks === 0)
            cb();
        };
        for (const [m, absolute, ifDir] of processor.matches.entries()) {
          if (this.#ignored(m))
            continue;
          tasks++;
          this.match(m, absolute, ifDir).then(() => next());
        }
        for (const t of processor.subwalkTargets()) {
          if (this.maxDepth !== Infinity && t.depth() >= this.maxDepth) {
            continue;
          }
          tasks++;
          const childrenCached = t.readdirCached();
          if (t.calledReaddir())
            this.walkCB3(t, childrenCached, processor, next);
          else {
            t.readdirCB((_, entries) => this.walkCB3(t, entries, processor, next), true);
          }
        }
        next();
      }
      walkCB3(target, entries, processor, cb) {
        processor = processor.filterEntries(target, entries);
        let tasks = 1;
        const next = () => {
          if (--tasks === 0)
            cb();
        };
        for (const [m, absolute, ifDir] of processor.matches.entries()) {
          if (this.#ignored(m))
            continue;
          tasks++;
          this.match(m, absolute, ifDir).then(() => next());
        }
        for (const [target2, patterns] of processor.subwalks.entries()) {
          tasks++;
          this.walkCB2(target2, patterns, processor.child(), next);
        }
        next();
      }
      walkCBSync(target, patterns, cb) {
        if (this.signal?.aborted)
          cb();
        this.walkCB2Sync(target, patterns, new Processor(this.opts), cb);
      }
      walkCB2Sync(target, patterns, processor, cb) {
        if (this.#childrenIgnored(target))
          return cb();
        if (this.signal?.aborted)
          cb();
        if (this.paused) {
          this.onResume(() => this.walkCB2Sync(target, patterns, processor, cb));
          return;
        }
        processor.processPatterns(target, patterns);
        let tasks = 1;
        const next = () => {
          if (--tasks === 0)
            cb();
        };
        for (const [m, absolute, ifDir] of processor.matches.entries()) {
          if (this.#ignored(m))
            continue;
          this.matchSync(m, absolute, ifDir);
        }
        for (const t of processor.subwalkTargets()) {
          if (this.maxDepth !== Infinity && t.depth() >= this.maxDepth) {
            continue;
          }
          tasks++;
          const children = t.readdirSync();
          this.walkCB3Sync(t, children, processor, next);
        }
        next();
      }
      walkCB3Sync(target, entries, processor, cb) {
        processor = processor.filterEntries(target, entries);
        let tasks = 1;
        const next = () => {
          if (--tasks === 0)
            cb();
        };
        for (const [m, absolute, ifDir] of processor.matches.entries()) {
          if (this.#ignored(m))
            continue;
          this.matchSync(m, absolute, ifDir);
        }
        for (const [target2, patterns] of processor.subwalks.entries()) {
          tasks++;
          this.walkCB2Sync(target2, patterns, processor.child(), next);
        }
        next();
      }
    };
    GlobWalker = class extends GlobUtil {
      matches = /* @__PURE__ */ new Set();
      constructor(patterns, path5, opts) {
        super(patterns, path5, opts);
      }
      matchEmit(e) {
        this.matches.add(e);
      }
      async walk() {
        if (this.signal?.aborted)
          throw this.signal.reason;
        if (this.path.isUnknown()) {
          await this.path.lstat();
        }
        await new Promise((res, rej) => {
          this.walkCB(this.path, this.patterns, () => {
            if (this.signal?.aborted) {
              rej(this.signal.reason);
            } else {
              res(this.matches);
            }
          });
        });
        return this.matches;
      }
      walkSync() {
        if (this.signal?.aborted)
          throw this.signal.reason;
        if (this.path.isUnknown()) {
          this.path.lstatSync();
        }
        this.walkCBSync(this.path, this.patterns, () => {
          if (this.signal?.aborted)
            throw this.signal.reason;
        });
        return this.matches;
      }
    };
    GlobStream = class extends GlobUtil {
      results;
      constructor(patterns, path5, opts) {
        super(patterns, path5, opts);
        this.results = new Minipass({
          signal: this.signal,
          objectMode: true
        });
        this.results.on("drain", () => this.resume());
        this.results.on("resume", () => this.resume());
      }
      matchEmit(e) {
        this.results.write(e);
        if (!this.results.flowing)
          this.pause();
      }
      stream() {
        const target = this.path;
        if (target.isUnknown()) {
          target.lstat().then(() => {
            this.walkCB(target, this.patterns, () => this.results.end());
          });
        } else {
          this.walkCB(target, this.patterns, () => this.results.end());
        }
        return this.results;
      }
      streamSync() {
        if (this.path.isUnknown()) {
          this.path.lstatSync();
        }
        this.walkCBSync(this.path, this.patterns, () => this.results.end());
        return this.results;
      }
    };
  }
});

// ../../../.yarn/berry/cache/glob-npm-11.0.3-f68382b3cc-10c0.zip/node_modules/glob/dist/esm/glob.js
var import_node_url2, defaultPlatform3, Glob;
var init_glob = __esm({
  "../../../.yarn/berry/cache/glob-npm-11.0.3-f68382b3cc-10c0.zip/node_modules/glob/dist/esm/glob.js"() {
    init_esm3();
    import_node_url2 = require("node:url");
    init_esm6();
    init_pattern();
    init_walker();
    defaultPlatform3 = typeof process === "object" && process && typeof process.platform === "string" ? process.platform : "linux";
    Glob = class {
      absolute;
      cwd;
      root;
      dot;
      dotRelative;
      follow;
      ignore;
      magicalBraces;
      mark;
      matchBase;
      maxDepth;
      nobrace;
      nocase;
      nodir;
      noext;
      noglobstar;
      pattern;
      platform;
      realpath;
      scurry;
      stat;
      signal;
      windowsPathsNoEscape;
      withFileTypes;
      includeChildMatches;
      /**
       * The options provided to the constructor.
       */
      opts;
      /**
       * An array of parsed immutable {@link Pattern} objects.
       */
      patterns;
      /**
       * All options are stored as properties on the `Glob` object.
       *
       * See {@link GlobOptions} for full options descriptions.
       *
       * Note that a previous `Glob` object can be passed as the
       * `GlobOptions` to another `Glob` instantiation to re-use settings
       * and caches with a new pattern.
       *
       * Traversal functions can be called multiple times to run the walk
       * again.
       */
      constructor(pattern, opts) {
        if (!opts)
          throw new TypeError("glob options required");
        this.withFileTypes = !!opts.withFileTypes;
        this.signal = opts.signal;
        this.follow = !!opts.follow;
        this.dot = !!opts.dot;
        this.dotRelative = !!opts.dotRelative;
        this.nodir = !!opts.nodir;
        this.mark = !!opts.mark;
        if (!opts.cwd) {
          this.cwd = "";
        } else if (opts.cwd instanceof URL || opts.cwd.startsWith("file://")) {
          opts.cwd = (0, import_node_url2.fileURLToPath)(opts.cwd);
        }
        this.cwd = opts.cwd || "";
        this.root = opts.root;
        this.magicalBraces = !!opts.magicalBraces;
        this.nobrace = !!opts.nobrace;
        this.noext = !!opts.noext;
        this.realpath = !!opts.realpath;
        this.absolute = opts.absolute;
        this.includeChildMatches = opts.includeChildMatches !== false;
        this.noglobstar = !!opts.noglobstar;
        this.matchBase = !!opts.matchBase;
        this.maxDepth = typeof opts.maxDepth === "number" ? opts.maxDepth : Infinity;
        this.stat = !!opts.stat;
        this.ignore = opts.ignore;
        if (this.withFileTypes && this.absolute !== void 0) {
          throw new Error("cannot set absolute and withFileTypes:true");
        }
        if (typeof pattern === "string") {
          pattern = [pattern];
        }
        this.windowsPathsNoEscape = !!opts.windowsPathsNoEscape || opts.allowWindowsEscape === false;
        if (this.windowsPathsNoEscape) {
          pattern = pattern.map((p) => p.replace(/\\/g, "/"));
        }
        if (this.matchBase) {
          if (opts.noglobstar) {
            throw new TypeError("base matching requires globstar");
          }
          pattern = pattern.map((p) => p.includes("/") ? p : `./**/${p}`);
        }
        this.pattern = pattern;
        this.platform = opts.platform || defaultPlatform3;
        this.opts = { ...opts, platform: this.platform };
        if (opts.scurry) {
          this.scurry = opts.scurry;
          if (opts.nocase !== void 0 && opts.nocase !== opts.scurry.nocase) {
            throw new Error("nocase option contradicts provided scurry option");
          }
        } else {
          const Scurry = opts.platform === "win32" ? PathScurryWin32 : opts.platform === "darwin" ? PathScurryDarwin : opts.platform ? PathScurryPosix : PathScurry;
          this.scurry = new Scurry(this.cwd, {
            nocase: opts.nocase,
            fs: opts.fs
          });
        }
        this.nocase = this.scurry.nocase;
        const nocaseMagicOnly = this.platform === "darwin" || this.platform === "win32";
        const mmo = {
          // default nocase based on platform
          ...opts,
          dot: this.dot,
          matchBase: this.matchBase,
          nobrace: this.nobrace,
          nocase: this.nocase,
          nocaseMagicOnly,
          nocomment: true,
          noext: this.noext,
          nonegate: true,
          optimizationLevel: 2,
          platform: this.platform,
          windowsPathsNoEscape: this.windowsPathsNoEscape,
          debug: !!this.opts.debug
        };
        const mms = this.pattern.map((p) => new Minimatch(p, mmo));
        const [matchSet, globParts] = mms.reduce((set, m) => {
          set[0].push(...m.set);
          set[1].push(...m.globParts);
          return set;
        }, [[], []]);
        this.patterns = matchSet.map((set, i) => {
          const g = globParts[i];
          if (!g)
            throw new Error("invalid pattern object");
          return new Pattern(set, g, 0, this.platform);
        });
      }
      async walk() {
        return [
          ...await new GlobWalker(this.patterns, this.scurry.cwd, {
            ...this.opts,
            maxDepth: this.maxDepth !== Infinity ? this.maxDepth + this.scurry.cwd.depth() : Infinity,
            platform: this.platform,
            nocase: this.nocase,
            includeChildMatches: this.includeChildMatches
          }).walk()
        ];
      }
      walkSync() {
        return [
          ...new GlobWalker(this.patterns, this.scurry.cwd, {
            ...this.opts,
            maxDepth: this.maxDepth !== Infinity ? this.maxDepth + this.scurry.cwd.depth() : Infinity,
            platform: this.platform,
            nocase: this.nocase,
            includeChildMatches: this.includeChildMatches
          }).walkSync()
        ];
      }
      stream() {
        return new GlobStream(this.patterns, this.scurry.cwd, {
          ...this.opts,
          maxDepth: this.maxDepth !== Infinity ? this.maxDepth + this.scurry.cwd.depth() : Infinity,
          platform: this.platform,
          nocase: this.nocase,
          includeChildMatches: this.includeChildMatches
        }).stream();
      }
      streamSync() {
        return new GlobStream(this.patterns, this.scurry.cwd, {
          ...this.opts,
          maxDepth: this.maxDepth !== Infinity ? this.maxDepth + this.scurry.cwd.depth() : Infinity,
          platform: this.platform,
          nocase: this.nocase,
          includeChildMatches: this.includeChildMatches
        }).streamSync();
      }
      /**
       * Default sync iteration function. Returns a Generator that
       * iterates over the results.
       */
      iterateSync() {
        return this.streamSync()[Symbol.iterator]();
      }
      [Symbol.iterator]() {
        return this.iterateSync();
      }
      /**
       * Default async iteration function. Returns an AsyncGenerator that
       * iterates over the results.
       */
      iterate() {
        return this.stream()[Symbol.asyncIterator]();
      }
      [Symbol.asyncIterator]() {
        return this.iterate();
      }
    };
  }
});

// ../../../.yarn/berry/cache/glob-npm-11.0.3-f68382b3cc-10c0.zip/node_modules/glob/dist/esm/has-magic.js
var hasMagic;
var init_has_magic = __esm({
  "../../../.yarn/berry/cache/glob-npm-11.0.3-f68382b3cc-10c0.zip/node_modules/glob/dist/esm/has-magic.js"() {
    init_esm3();
    hasMagic = (pattern, options = {}) => {
      if (!Array.isArray(pattern)) {
        pattern = [pattern];
      }
      for (const p of pattern) {
        if (new Minimatch(p, options).hasMagic())
          return true;
      }
      return false;
    };
  }
});

// ../../../.yarn/berry/cache/glob-npm-11.0.3-f68382b3cc-10c0.zip/node_modules/glob/dist/esm/index.js
function globStreamSync(pattern, options = {}) {
  return new Glob(pattern, options).streamSync();
}
function globStream(pattern, options = {}) {
  return new Glob(pattern, options).stream();
}
function globSync(pattern, options = {}) {
  return new Glob(pattern, options).walkSync();
}
async function glob_(pattern, options = {}) {
  return new Glob(pattern, options).walk();
}
function globIterateSync(pattern, options = {}) {
  return new Glob(pattern, options).iterateSync();
}
function globIterate(pattern, options = {}) {
  return new Glob(pattern, options).iterate();
}
var streamSync, stream, iterateSync, iterate, sync, glob;
var init_esm7 = __esm({
  "../../../.yarn/berry/cache/glob-npm-11.0.3-f68382b3cc-10c0.zip/node_modules/glob/dist/esm/index.js"() {
    init_esm3();
    init_glob();
    init_has_magic();
    init_esm3();
    init_glob();
    init_has_magic();
    init_ignore();
    streamSync = globStreamSync;
    stream = Object.assign(globStream, { sync: globStreamSync });
    iterateSync = globIterateSync;
    iterate = Object.assign(globIterate, {
      sync: globIterateSync
    });
    sync = Object.assign(globSync, {
      stream: globStreamSync,
      iterate: globIterateSync
    });
    glob = Object.assign(glob_, {
      glob: glob_,
      globSync,
      sync,
      globStream,
      stream,
      globStreamSync,
      streamSync,
      globIterate,
      iterate,
      globIterateSync,
      iterateSync,
      Glob,
      hasMagic,
      escape,
      unescape
    });
    glob.glob = glob;
  }
});

// .yarn/__virtual__/viem-virtual-9f2f5f3032/4/.yarn/berry/cache/viem-npm-2.31.4-c16a9e3510-10c0.zip/node_modules/viem/_esm/utils/data/isHex.js
function isHex(value, { strict = true } = {}) {
  if (!value)
    return false;
  if (typeof value !== "string")
    return false;
  return strict ? /^0x[0-9a-fA-F]*$/.test(value) : value.startsWith("0x");
}
var init_isHex = __esm({
  ".yarn/__virtual__/viem-virtual-9f2f5f3032/4/.yarn/berry/cache/viem-npm-2.31.4-c16a9e3510-10c0.zip/node_modules/viem/_esm/utils/data/isHex.js"() {
  }
});

// .yarn/__virtual__/viem-virtual-9f2f5f3032/4/.yarn/berry/cache/viem-npm-2.31.4-c16a9e3510-10c0.zip/node_modules/viem/_esm/utils/data/size.js
function size(value) {
  if (isHex(value, { strict: false }))
    return Math.ceil((value.length - 2) / 2);
  return value.length;
}
var init_size = __esm({
  ".yarn/__virtual__/viem-virtual-9f2f5f3032/4/.yarn/berry/cache/viem-npm-2.31.4-c16a9e3510-10c0.zip/node_modules/viem/_esm/utils/data/size.js"() {
    init_isHex();
  }
});

// .yarn/__virtual__/viem-virtual-9f2f5f3032/4/.yarn/berry/cache/viem-npm-2.31.4-c16a9e3510-10c0.zip/node_modules/viem/_esm/errors/version.js
var version;
var init_version = __esm({
  ".yarn/__virtual__/viem-virtual-9f2f5f3032/4/.yarn/berry/cache/viem-npm-2.31.4-c16a9e3510-10c0.zip/node_modules/viem/_esm/errors/version.js"() {
    version = "2.31.4";
  }
});

// .yarn/__virtual__/viem-virtual-9f2f5f3032/4/.yarn/berry/cache/viem-npm-2.31.4-c16a9e3510-10c0.zip/node_modules/viem/_esm/errors/base.js
function walk(err, fn) {
  if (fn?.(err))
    return err;
  if (err && typeof err === "object" && "cause" in err && err.cause !== void 0)
    return walk(err.cause, fn);
  return fn ? null : err;
}
var errorConfig, BaseError;
var init_base = __esm({
  ".yarn/__virtual__/viem-virtual-9f2f5f3032/4/.yarn/berry/cache/viem-npm-2.31.4-c16a9e3510-10c0.zip/node_modules/viem/_esm/errors/base.js"() {
    init_version();
    errorConfig = {
      getDocsUrl: ({ docsBaseUrl, docsPath = "", docsSlug }) => docsPath ? `${docsBaseUrl ?? "https://viem.sh"}${docsPath}${docsSlug ? `#${docsSlug}` : ""}` : void 0,
      version: `viem@${version}`
    };
    BaseError = class _BaseError extends Error {
      constructor(shortMessage, args = {}) {
        const details = (() => {
          if (args.cause instanceof _BaseError)
            return args.cause.details;
          if (args.cause?.message)
            return args.cause.message;
          return args.details;
        })();
        const docsPath = (() => {
          if (args.cause instanceof _BaseError)
            return args.cause.docsPath || args.docsPath;
          return args.docsPath;
        })();
        const docsUrl = errorConfig.getDocsUrl?.({ ...args, docsPath });
        const message = [
          shortMessage || "An error occurred.",
          "",
          ...args.metaMessages ? [...args.metaMessages, ""] : [],
          ...docsUrl ? [`Docs: ${docsUrl}`] : [],
          ...details ? [`Details: ${details}`] : [],
          ...errorConfig.version ? [`Version: ${errorConfig.version}`] : []
        ].join("\n");
        super(message, args.cause ? { cause: args.cause } : void 0);
        Object.defineProperty(this, "details", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "docsPath", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "metaMessages", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "shortMessage", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "version", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "BaseError"
        });
        this.details = details;
        this.docsPath = docsPath;
        this.metaMessages = args.metaMessages;
        this.name = args.name ?? this.name;
        this.shortMessage = shortMessage;
        this.version = version;
      }
      walk(fn) {
        return walk(this, fn);
      }
    };
  }
});

// .yarn/__virtual__/viem-virtual-9f2f5f3032/4/.yarn/berry/cache/viem-npm-2.31.4-c16a9e3510-10c0.zip/node_modules/viem/_esm/errors/data.js
var SizeExceedsPaddingSizeError;
var init_data = __esm({
  ".yarn/__virtual__/viem-virtual-9f2f5f3032/4/.yarn/berry/cache/viem-npm-2.31.4-c16a9e3510-10c0.zip/node_modules/viem/_esm/errors/data.js"() {
    init_base();
    SizeExceedsPaddingSizeError = class extends BaseError {
      constructor({ size: size2, targetSize, type }) {
        super(`${type.charAt(0).toUpperCase()}${type.slice(1).toLowerCase()} size (${size2}) exceeds padding size (${targetSize}).`, { name: "SizeExceedsPaddingSizeError" });
      }
    };
  }
});

// .yarn/__virtual__/viem-virtual-9f2f5f3032/4/.yarn/berry/cache/viem-npm-2.31.4-c16a9e3510-10c0.zip/node_modules/viem/_esm/utils/data/pad.js
function pad(hexOrBytes, { dir, size: size2 = 32 } = {}) {
  if (typeof hexOrBytes === "string")
    return padHex(hexOrBytes, { dir, size: size2 });
  return padBytes(hexOrBytes, { dir, size: size2 });
}
function padHex(hex_, { dir, size: size2 = 32 } = {}) {
  if (size2 === null)
    return hex_;
  const hex = hex_.replace("0x", "");
  if (hex.length > size2 * 2)
    throw new SizeExceedsPaddingSizeError({
      size: Math.ceil(hex.length / 2),
      targetSize: size2,
      type: "hex"
    });
  return `0x${hex[dir === "right" ? "padEnd" : "padStart"](size2 * 2, "0")}`;
}
function padBytes(bytes, { dir, size: size2 = 32 } = {}) {
  if (size2 === null)
    return bytes;
  if (bytes.length > size2)
    throw new SizeExceedsPaddingSizeError({
      size: bytes.length,
      targetSize: size2,
      type: "bytes"
    });
  const paddedBytes = new Uint8Array(size2);
  for (let i = 0; i < size2; i++) {
    const padEnd = dir === "right";
    paddedBytes[padEnd ? i : size2 - i - 1] = bytes[padEnd ? i : bytes.length - i - 1];
  }
  return paddedBytes;
}
var init_pad = __esm({
  ".yarn/__virtual__/viem-virtual-9f2f5f3032/4/.yarn/berry/cache/viem-npm-2.31.4-c16a9e3510-10c0.zip/node_modules/viem/_esm/utils/data/pad.js"() {
    init_data();
  }
});

// .yarn/__virtual__/viem-virtual-9f2f5f3032/4/.yarn/berry/cache/viem-npm-2.31.4-c16a9e3510-10c0.zip/node_modules/viem/_esm/errors/encoding.js
var IntegerOutOfRangeError, SizeOverflowError;
var init_encoding = __esm({
  ".yarn/__virtual__/viem-virtual-9f2f5f3032/4/.yarn/berry/cache/viem-npm-2.31.4-c16a9e3510-10c0.zip/node_modules/viem/_esm/errors/encoding.js"() {
    init_base();
    IntegerOutOfRangeError = class extends BaseError {
      constructor({ max, min, signed, size: size2, value }) {
        super(`Number "${value}" is not in safe ${size2 ? `${size2 * 8}-bit ${signed ? "signed" : "unsigned"} ` : ""}integer range ${max ? `(${min} to ${max})` : `(above ${min})`}`, { name: "IntegerOutOfRangeError" });
      }
    };
    SizeOverflowError = class extends BaseError {
      constructor({ givenSize, maxSize }) {
        super(`Size cannot exceed ${maxSize} bytes. Given size: ${givenSize} bytes.`, { name: "SizeOverflowError" });
      }
    };
  }
});

// .yarn/__virtual__/viem-virtual-9f2f5f3032/4/.yarn/berry/cache/viem-npm-2.31.4-c16a9e3510-10c0.zip/node_modules/viem/_esm/utils/encoding/fromHex.js
function assertSize(hexOrBytes, { size: size2 }) {
  if (size(hexOrBytes) > size2)
    throw new SizeOverflowError({
      givenSize: size(hexOrBytes),
      maxSize: size2
    });
}
var init_fromHex = __esm({
  ".yarn/__virtual__/viem-virtual-9f2f5f3032/4/.yarn/berry/cache/viem-npm-2.31.4-c16a9e3510-10c0.zip/node_modules/viem/_esm/utils/encoding/fromHex.js"() {
    init_encoding();
    init_size();
  }
});

// .yarn/__virtual__/viem-virtual-9f2f5f3032/4/.yarn/berry/cache/viem-npm-2.31.4-c16a9e3510-10c0.zip/node_modules/viem/_esm/utils/encoding/toHex.js
function toHex(value, opts = {}) {
  if (typeof value === "number" || typeof value === "bigint")
    return numberToHex(value, opts);
  if (typeof value === "string") {
    return stringToHex(value, opts);
  }
  if (typeof value === "boolean")
    return boolToHex(value, opts);
  return bytesToHex(value, opts);
}
function boolToHex(value, opts = {}) {
  const hex = `0x${Number(value)}`;
  if (typeof opts.size === "number") {
    assertSize(hex, { size: opts.size });
    return pad(hex, { size: opts.size });
  }
  return hex;
}
function bytesToHex(value, opts = {}) {
  let string = "";
  for (let i = 0; i < value.length; i++) {
    string += hexes[value[i]];
  }
  const hex = `0x${string}`;
  if (typeof opts.size === "number") {
    assertSize(hex, { size: opts.size });
    return pad(hex, { dir: "right", size: opts.size });
  }
  return hex;
}
function numberToHex(value_, opts = {}) {
  const { signed, size: size2 } = opts;
  const value = BigInt(value_);
  let maxValue;
  if (size2) {
    if (signed)
      maxValue = (1n << BigInt(size2) * 8n - 1n) - 1n;
    else
      maxValue = 2n ** (BigInt(size2) * 8n) - 1n;
  } else if (typeof value_ === "number") {
    maxValue = BigInt(Number.MAX_SAFE_INTEGER);
  }
  const minValue = typeof maxValue === "bigint" && signed ? -maxValue - 1n : 0;
  if (maxValue && value > maxValue || value < minValue) {
    const suffix = typeof value_ === "bigint" ? "n" : "";
    throw new IntegerOutOfRangeError({
      max: maxValue ? `${maxValue}${suffix}` : void 0,
      min: `${minValue}${suffix}`,
      signed,
      size: size2,
      value: `${value_}${suffix}`
    });
  }
  const hex = `0x${(signed && value < 0 ? (1n << BigInt(size2 * 8)) + BigInt(value) : value).toString(16)}`;
  if (size2)
    return pad(hex, { size: size2 });
  return hex;
}
function stringToHex(value_, opts = {}) {
  const value = encoder.encode(value_);
  return bytesToHex(value, opts);
}
var hexes, encoder;
var init_toHex = __esm({
  ".yarn/__virtual__/viem-virtual-9f2f5f3032/4/.yarn/berry/cache/viem-npm-2.31.4-c16a9e3510-10c0.zip/node_modules/viem/_esm/utils/encoding/toHex.js"() {
    init_encoding();
    init_pad();
    init_fromHex();
    hexes = /* @__PURE__ */ Array.from({ length: 256 }, (_v, i) => i.toString(16).padStart(2, "0"));
    encoder = /* @__PURE__ */ new TextEncoder();
  }
});

// .yarn/__virtual__/viem-virtual-9f2f5f3032/4/.yarn/berry/cache/viem-npm-2.31.4-c16a9e3510-10c0.zip/node_modules/viem/_esm/utils/encoding/toBytes.js
function toBytes(value, opts = {}) {
  if (typeof value === "number" || typeof value === "bigint")
    return numberToBytes(value, opts);
  if (typeof value === "boolean")
    return boolToBytes(value, opts);
  if (isHex(value))
    return hexToBytes(value, opts);
  return stringToBytes(value, opts);
}
function boolToBytes(value, opts = {}) {
  const bytes = new Uint8Array(1);
  bytes[0] = Number(value);
  if (typeof opts.size === "number") {
    assertSize(bytes, { size: opts.size });
    return pad(bytes, { size: opts.size });
  }
  return bytes;
}
function charCodeToBase16(char) {
  if (char >= charCodeMap.zero && char <= charCodeMap.nine)
    return char - charCodeMap.zero;
  if (char >= charCodeMap.A && char <= charCodeMap.F)
    return char - (charCodeMap.A - 10);
  if (char >= charCodeMap.a && char <= charCodeMap.f)
    return char - (charCodeMap.a - 10);
  return void 0;
}
function hexToBytes(hex_, opts = {}) {
  let hex = hex_;
  if (opts.size) {
    assertSize(hex, { size: opts.size });
    hex = pad(hex, { dir: "right", size: opts.size });
  }
  let hexString = hex.slice(2);
  if (hexString.length % 2)
    hexString = `0${hexString}`;
  const length = hexString.length / 2;
  const bytes = new Uint8Array(length);
  for (let index = 0, j = 0; index < length; index++) {
    const nibbleLeft = charCodeToBase16(hexString.charCodeAt(j++));
    const nibbleRight = charCodeToBase16(hexString.charCodeAt(j++));
    if (nibbleLeft === void 0 || nibbleRight === void 0) {
      throw new BaseError(`Invalid byte sequence ("${hexString[j - 2]}${hexString[j - 1]}" in "${hexString}").`);
    }
    bytes[index] = nibbleLeft * 16 + nibbleRight;
  }
  return bytes;
}
function numberToBytes(value, opts) {
  const hex = numberToHex(value, opts);
  return hexToBytes(hex);
}
function stringToBytes(value, opts = {}) {
  const bytes = encoder2.encode(value);
  if (typeof opts.size === "number") {
    assertSize(bytes, { size: opts.size });
    return pad(bytes, { dir: "right", size: opts.size });
  }
  return bytes;
}
var encoder2, charCodeMap;
var init_toBytes = __esm({
  ".yarn/__virtual__/viem-virtual-9f2f5f3032/4/.yarn/berry/cache/viem-npm-2.31.4-c16a9e3510-10c0.zip/node_modules/viem/_esm/utils/encoding/toBytes.js"() {
    init_base();
    init_isHex();
    init_pad();
    init_fromHex();
    init_toHex();
    encoder2 = /* @__PURE__ */ new TextEncoder();
    charCodeMap = {
      zero: 48,
      nine: 57,
      A: 65,
      F: 70,
      a: 97,
      f: 102
    };
  }
});

// ../../../.yarn/berry/cache/@noble-hashes-npm-1.8.0-a397449e64-10c0.zip/node_modules/@noble/hashes/esm/_u64.js
function fromBig(n, le = false) {
  if (le)
    return { h: Number(n & U32_MASK64), l: Number(n >> _32n & U32_MASK64) };
  return { h: Number(n >> _32n & U32_MASK64) | 0, l: Number(n & U32_MASK64) | 0 };
}
function split(lst, le = false) {
  const len = lst.length;
  let Ah = new Uint32Array(len);
  let Al = new Uint32Array(len);
  for (let i = 0; i < len; i++) {
    const { h, l } = fromBig(lst[i], le);
    [Ah[i], Al[i]] = [h, l];
  }
  return [Ah, Al];
}
var U32_MASK64, _32n, rotlSH, rotlSL, rotlBH, rotlBL;
var init_u64 = __esm({
  "../../../.yarn/berry/cache/@noble-hashes-npm-1.8.0-a397449e64-10c0.zip/node_modules/@noble/hashes/esm/_u64.js"() {
    U32_MASK64 = /* @__PURE__ */ BigInt(2 ** 32 - 1);
    _32n = /* @__PURE__ */ BigInt(32);
    rotlSH = (h, l, s) => h << s | l >>> 32 - s;
    rotlSL = (h, l, s) => l << s | h >>> 32 - s;
    rotlBH = (h, l, s) => l << s - 32 | h >>> 64 - s;
    rotlBL = (h, l, s) => h << s - 32 | l >>> 64 - s;
  }
});

// ../../../.yarn/berry/cache/@noble-hashes-npm-1.8.0-a397449e64-10c0.zip/node_modules/@noble/hashes/esm/utils.js
function isBytes(a) {
  return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array";
}
function anumber(n) {
  if (!Number.isSafeInteger(n) || n < 0)
    throw new Error("positive integer expected, got " + n);
}
function abytes(b, ...lengths) {
  if (!isBytes(b))
    throw new Error("Uint8Array expected");
  if (lengths.length > 0 && !lengths.includes(b.length))
    throw new Error("Uint8Array expected of length " + lengths + ", got length=" + b.length);
}
function aexists(instance, checkFinished = true) {
  if (instance.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (checkFinished && instance.finished)
    throw new Error("Hash#digest() has already been called");
}
function aoutput(out, instance) {
  abytes(out);
  const min = instance.outputLen;
  if (out.length < min) {
    throw new Error("digestInto() expects output buffer of length at least " + min);
  }
}
function u32(arr) {
  return new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
}
function clean(...arrays) {
  for (let i = 0; i < arrays.length; i++) {
    arrays[i].fill(0);
  }
}
function byteSwap(word) {
  return word << 24 & 4278190080 | word << 8 & 16711680 | word >>> 8 & 65280 | word >>> 24 & 255;
}
function byteSwap32(arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i] = byteSwap(arr[i]);
  }
  return arr;
}
function utf8ToBytes(str) {
  if (typeof str !== "string")
    throw new Error("string expected");
  return new Uint8Array(new TextEncoder().encode(str));
}
function toBytes2(data) {
  if (typeof data === "string")
    data = utf8ToBytes(data);
  abytes(data);
  return data;
}
function createHasher(hashCons) {
  const hashC = (msg) => hashCons().update(toBytes2(msg)).digest();
  const tmp = hashCons();
  hashC.outputLen = tmp.outputLen;
  hashC.blockLen = tmp.blockLen;
  hashC.create = () => hashCons();
  return hashC;
}
var isLE, swap32IfBE, Hash;
var init_utils = __esm({
  "../../../.yarn/berry/cache/@noble-hashes-npm-1.8.0-a397449e64-10c0.zip/node_modules/@noble/hashes/esm/utils.js"() {
    isLE = /* @__PURE__ */ (() => new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68)();
    swap32IfBE = isLE ? (u) => u : byteSwap32;
    Hash = class {
    };
  }
});

// ../../../.yarn/berry/cache/@noble-hashes-npm-1.8.0-a397449e64-10c0.zip/node_modules/@noble/hashes/esm/sha3.js
function keccakP(s, rounds = 24) {
  const B = new Uint32Array(5 * 2);
  for (let round = 24 - rounds; round < 24; round++) {
    for (let x = 0; x < 10; x++)
      B[x] = s[x] ^ s[x + 10] ^ s[x + 20] ^ s[x + 30] ^ s[x + 40];
    for (let x = 0; x < 10; x += 2) {
      const idx1 = (x + 8) % 10;
      const idx0 = (x + 2) % 10;
      const B0 = B[idx0];
      const B1 = B[idx0 + 1];
      const Th = rotlH(B0, B1, 1) ^ B[idx1];
      const Tl = rotlL(B0, B1, 1) ^ B[idx1 + 1];
      for (let y = 0; y < 50; y += 10) {
        s[x + y] ^= Th;
        s[x + y + 1] ^= Tl;
      }
    }
    let curH = s[2];
    let curL = s[3];
    for (let t = 0; t < 24; t++) {
      const shift = SHA3_ROTL[t];
      const Th = rotlH(curH, curL, shift);
      const Tl = rotlL(curH, curL, shift);
      const PI = SHA3_PI[t];
      curH = s[PI];
      curL = s[PI + 1];
      s[PI] = Th;
      s[PI + 1] = Tl;
    }
    for (let y = 0; y < 50; y += 10) {
      for (let x = 0; x < 10; x++)
        B[x] = s[y + x];
      for (let x = 0; x < 10; x++)
        s[y + x] ^= ~B[(x + 2) % 10] & B[(x + 4) % 10];
    }
    s[0] ^= SHA3_IOTA_H[round];
    s[1] ^= SHA3_IOTA_L[round];
  }
  clean(B);
}
var _0n, _1n, _2n, _7n, _256n, _0x71n, SHA3_PI, SHA3_ROTL, _SHA3_IOTA, IOTAS, SHA3_IOTA_H, SHA3_IOTA_L, rotlH, rotlL, Keccak, gen, keccak_256;
var init_sha3 = __esm({
  "../../../.yarn/berry/cache/@noble-hashes-npm-1.8.0-a397449e64-10c0.zip/node_modules/@noble/hashes/esm/sha3.js"() {
    init_u64();
    init_utils();
    _0n = BigInt(0);
    _1n = BigInt(1);
    _2n = BigInt(2);
    _7n = BigInt(7);
    _256n = BigInt(256);
    _0x71n = BigInt(113);
    SHA3_PI = [];
    SHA3_ROTL = [];
    _SHA3_IOTA = [];
    for (let round = 0, R = _1n, x = 1, y = 0; round < 24; round++) {
      [x, y] = [y, (2 * x + 3 * y) % 5];
      SHA3_PI.push(2 * (5 * y + x));
      SHA3_ROTL.push((round + 1) * (round + 2) / 2 % 64);
      let t = _0n;
      for (let j = 0; j < 7; j++) {
        R = (R << _1n ^ (R >> _7n) * _0x71n) % _256n;
        if (R & _2n)
          t ^= _1n << (_1n << /* @__PURE__ */ BigInt(j)) - _1n;
      }
      _SHA3_IOTA.push(t);
    }
    IOTAS = split(_SHA3_IOTA, true);
    SHA3_IOTA_H = IOTAS[0];
    SHA3_IOTA_L = IOTAS[1];
    rotlH = (h, l, s) => s > 32 ? rotlBH(h, l, s) : rotlSH(h, l, s);
    rotlL = (h, l, s) => s > 32 ? rotlBL(h, l, s) : rotlSL(h, l, s);
    Keccak = class _Keccak extends Hash {
      // NOTE: we accept arguments in bytes instead of bits here.
      constructor(blockLen, suffix, outputLen, enableXOF = false, rounds = 24) {
        super();
        this.pos = 0;
        this.posOut = 0;
        this.finished = false;
        this.destroyed = false;
        this.enableXOF = false;
        this.blockLen = blockLen;
        this.suffix = suffix;
        this.outputLen = outputLen;
        this.enableXOF = enableXOF;
        this.rounds = rounds;
        anumber(outputLen);
        if (!(0 < blockLen && blockLen < 200))
          throw new Error("only keccak-f1600 function is supported");
        this.state = new Uint8Array(200);
        this.state32 = u32(this.state);
      }
      clone() {
        return this._cloneInto();
      }
      keccak() {
        swap32IfBE(this.state32);
        keccakP(this.state32, this.rounds);
        swap32IfBE(this.state32);
        this.posOut = 0;
        this.pos = 0;
      }
      update(data) {
        aexists(this);
        data = toBytes2(data);
        abytes(data);
        const { blockLen, state } = this;
        const len = data.length;
        for (let pos = 0; pos < len; ) {
          const take = Math.min(blockLen - this.pos, len - pos);
          for (let i = 0; i < take; i++)
            state[this.pos++] ^= data[pos++];
          if (this.pos === blockLen)
            this.keccak();
        }
        return this;
      }
      finish() {
        if (this.finished)
          return;
        this.finished = true;
        const { state, suffix, pos, blockLen } = this;
        state[pos] ^= suffix;
        if ((suffix & 128) !== 0 && pos === blockLen - 1)
          this.keccak();
        state[blockLen - 1] ^= 128;
        this.keccak();
      }
      writeInto(out) {
        aexists(this, false);
        abytes(out);
        this.finish();
        const bufferOut = this.state;
        const { blockLen } = this;
        for (let pos = 0, len = out.length; pos < len; ) {
          if (this.posOut >= blockLen)
            this.keccak();
          const take = Math.min(blockLen - this.posOut, len - pos);
          out.set(bufferOut.subarray(this.posOut, this.posOut + take), pos);
          this.posOut += take;
          pos += take;
        }
        return out;
      }
      xofInto(out) {
        if (!this.enableXOF)
          throw new Error("XOF is not possible for this instance");
        return this.writeInto(out);
      }
      xof(bytes) {
        anumber(bytes);
        return this.xofInto(new Uint8Array(bytes));
      }
      digestInto(out) {
        aoutput(out, this);
        if (this.finished)
          throw new Error("digest() was already called");
        this.writeInto(out);
        this.destroy();
        return out;
      }
      digest() {
        return this.digestInto(new Uint8Array(this.outputLen));
      }
      destroy() {
        this.destroyed = true;
        clean(this.state);
      }
      _cloneInto(to) {
        const { blockLen, suffix, outputLen, rounds, enableXOF } = this;
        to || (to = new _Keccak(blockLen, suffix, outputLen, enableXOF, rounds));
        to.state32.set(this.state32);
        to.pos = this.pos;
        to.posOut = this.posOut;
        to.finished = this.finished;
        to.rounds = rounds;
        to.suffix = suffix;
        to.outputLen = outputLen;
        to.enableXOF = enableXOF;
        to.destroyed = this.destroyed;
        return to;
      }
    };
    gen = (suffix, blockLen, outputLen) => createHasher(() => new Keccak(blockLen, suffix, outputLen));
    keccak_256 = /* @__PURE__ */ (() => gen(1, 136, 256 / 8))();
  }
});

// .yarn/__virtual__/viem-virtual-9f2f5f3032/4/.yarn/berry/cache/viem-npm-2.31.4-c16a9e3510-10c0.zip/node_modules/viem/_esm/utils/hash/keccak256.js
function keccak256(value, to_) {
  const to = to_ || "hex";
  const bytes = keccak_256(isHex(value, { strict: false }) ? toBytes(value) : value);
  if (to === "bytes")
    return bytes;
  return toHex(bytes);
}
var init_keccak256 = __esm({
  ".yarn/__virtual__/viem-virtual-9f2f5f3032/4/.yarn/berry/cache/viem-npm-2.31.4-c16a9e3510-10c0.zip/node_modules/viem/_esm/utils/hash/keccak256.js"() {
    init_sha3();
    init_isHex();
    init_toBytes();
    init_toHex();
  }
});

// .yarn/__virtual__/viem-virtual-9f2f5f3032/4/.yarn/berry/cache/viem-npm-2.31.4-c16a9e3510-10c0.zip/node_modules/viem/_esm/errors/address.js
var InvalidAddressError;
var init_address = __esm({
  ".yarn/__virtual__/viem-virtual-9f2f5f3032/4/.yarn/berry/cache/viem-npm-2.31.4-c16a9e3510-10c0.zip/node_modules/viem/_esm/errors/address.js"() {
    init_base();
    InvalidAddressError = class extends BaseError {
      constructor({ address }) {
        super(`Address "${address}" is invalid.`, {
          metaMessages: [
            "- Address must be a hex value of 20 bytes (40 hex characters).",
            "- Address must match its checksum counterpart."
          ],
          name: "InvalidAddressError"
        });
      }
    };
  }
});

// .yarn/__virtual__/viem-virtual-9f2f5f3032/4/.yarn/berry/cache/viem-npm-2.31.4-c16a9e3510-10c0.zip/node_modules/viem/_esm/utils/lru.js
var LruMap;
var init_lru = __esm({
  ".yarn/__virtual__/viem-virtual-9f2f5f3032/4/.yarn/berry/cache/viem-npm-2.31.4-c16a9e3510-10c0.zip/node_modules/viem/_esm/utils/lru.js"() {
    LruMap = class extends Map {
      constructor(size2) {
        super();
        Object.defineProperty(this, "maxSize", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        this.maxSize = size2;
      }
      get(key) {
        const value = super.get(key);
        if (super.has(key) && value !== void 0) {
          this.delete(key);
          super.set(key, value);
        }
        return value;
      }
      set(key, value) {
        super.set(key, value);
        if (this.maxSize && this.size > this.maxSize) {
          const firstKey = this.keys().next().value;
          if (firstKey)
            this.delete(firstKey);
        }
        return this;
      }
    };
  }
});

// .yarn/__virtual__/viem-virtual-9f2f5f3032/4/.yarn/berry/cache/viem-npm-2.31.4-c16a9e3510-10c0.zip/node_modules/viem/_esm/utils/address/getAddress.js
function checksumAddress(address_, chainId) {
  if (checksumAddressCache.has(`${address_}.${chainId}`))
    return checksumAddressCache.get(`${address_}.${chainId}`);
  const hexAddress = chainId ? `${chainId}${address_.toLowerCase()}` : address_.substring(2).toLowerCase();
  const hash = keccak256(stringToBytes(hexAddress), "bytes");
  const address = (chainId ? hexAddress.substring(`${chainId}0x`.length) : hexAddress).split("");
  for (let i = 0; i < 40; i += 2) {
    if (hash[i >> 1] >> 4 >= 8 && address[i]) {
      address[i] = address[i].toUpperCase();
    }
    if ((hash[i >> 1] & 15) >= 8 && address[i + 1]) {
      address[i + 1] = address[i + 1].toUpperCase();
    }
  }
  const result = `0x${address.join("")}`;
  checksumAddressCache.set(`${address_}.${chainId}`, result);
  return result;
}
function getAddress(address, chainId) {
  if (!isAddress(address, { strict: false }))
    throw new InvalidAddressError({ address });
  return checksumAddress(address, chainId);
}
var checksumAddressCache;
var init_getAddress = __esm({
  ".yarn/__virtual__/viem-virtual-9f2f5f3032/4/.yarn/berry/cache/viem-npm-2.31.4-c16a9e3510-10c0.zip/node_modules/viem/_esm/utils/address/getAddress.js"() {
    init_address();
    init_toBytes();
    init_keccak256();
    init_lru();
    init_isAddress();
    checksumAddressCache = /* @__PURE__ */ new LruMap(8192);
  }
});

// .yarn/__virtual__/viem-virtual-9f2f5f3032/4/.yarn/berry/cache/viem-npm-2.31.4-c16a9e3510-10c0.zip/node_modules/viem/_esm/utils/address/isAddress.js
function isAddress(address, options) {
  const { strict = true } = options ?? {};
  const cacheKey = `${address}.${strict}`;
  if (isAddressCache.has(cacheKey))
    return isAddressCache.get(cacheKey);
  const result = (() => {
    if (!addressRegex.test(address))
      return false;
    if (address.toLowerCase() === address)
      return true;
    if (strict)
      return checksumAddress(address) === address;
    return true;
  })();
  isAddressCache.set(cacheKey, result);
  return result;
}
var addressRegex, isAddressCache;
var init_isAddress = __esm({
  ".yarn/__virtual__/viem-virtual-9f2f5f3032/4/.yarn/berry/cache/viem-npm-2.31.4-c16a9e3510-10c0.zip/node_modules/viem/_esm/utils/address/isAddress.js"() {
    init_lru();
    init_getAddress();
    addressRegex = /^0x[a-fA-F0-9]{40}$/;
    isAddressCache = /* @__PURE__ */ new LruMap(8192);
  }
});

// .yarn/__virtual__/viem-virtual-9f2f5f3032/4/.yarn/berry/cache/viem-npm-2.31.4-c16a9e3510-10c0.zip/node_modules/viem/_esm/index.js
var init_esm8 = __esm({
  ".yarn/__virtual__/viem-virtual-9f2f5f3032/4/.yarn/berry/cache/viem-npm-2.31.4-c16a9e3510-10c0.zip/node_modules/viem/_esm/index.js"() {
    init_getAddress();
  }
});

// src/utils.ts
function getFileChecksum(filePath) {
  return (0, import_crypto.createHash)("sha256").update(filePath).digest("hex");
}
async function loadCache(toolName) {
  const cacheDir = `${process.cwd()}/cache/tools`;
  const cachePath = path2.join(cacheDir, `${toolName}.json`);
  const exists = await import_fs2.promises.access(cachePath).then(
    () => true,
    () => false
  );
  if (!exists) return null;
  const cache = await import_fs2.promises.readFile(cachePath, "utf-8");
  return JSON.parse(cache);
}
async function saveCache(toolName, cache) {
  const cacheDir = `${process.cwd()}/cache/tools`;
  await import_fs2.promises.mkdir(cacheDir, { recursive: true });
  const cachePath = path2.join(cacheDir, `${toolName}.json`);
  await import_fs2.promises.writeFile(cachePath, JSON.stringify(cache, null, 2) + "\n");
}
function hrtime() {
  const [t1, t2] = process.hrtime();
  return t1 * 1e9 + t2;
}
function timeDiff(start) {
  return ((hrtime() - start) / 1e6).toPrecision(3);
}
var import_crypto, import_fs2, path2;
var init_utils2 = __esm({
  "src/utils.ts"() {
    "use strict";
    import_crypto = require("crypto");
    import_fs2 = require("fs");
    path2 = __toESM(require("path"));
  }
});

// src/format-json.ts
var format_json_exports = {};
__export(format_json_exports, {
  executeFormatJson: () => executeFormatJson
});
function convertToChecksum(address) {
  return getAddress(address);
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
  const file = await import_fs3.promises.readFile(filePath, "utf-8");
  const checksum = getFileChecksum(file);
  if (cache && cache[filePath] === checksum) {
    console.log(source_default.gray(filePath), `${timeDiff(t)}ms`, "\u2728");
    return [filePath, checksum];
  }
  const data = JSON.parse(file);
  const updatedData = processJson(filePath, checkOnly, data);
  if (checkOnly) {
    console.log(source_default.gray(filePath), `${timeDiff(t)}ms`, "\u2705");
    return [filePath, checksum];
  }
  const noUpdate = JSON.stringify(data) === JSON.stringify(updatedData);
  if (noUpdate) {
    console.log(source_default.gray(filePath), `${timeDiff(t)}ms`, "\u{1F37B}");
    return [filePath, checksum];
  }
  await import_fs3.promises.writeFile(filePath, JSON.stringify(updatedData, null, 2) + "\n");
  console.log(filePath, `${timeDiff(t)}ms`);
  return [filePath, checksum];
}
async function executeFormatJson(globPattern, checkOnly) {
  const t = hrtime();
  const cache = await loadCache("format-json");
  const files = await glob(globPattern);
  if (files.length === 0) {
    console.warn("[WARN] No files found matching the specified pattern.");
    return;
  }
  const jsonFiles = files.filter((file) => path3.extname(file) === ".json");
  if (jsonFiles.length === 0) {
    throw new Error("No JSON files found in the matched files.");
  }
  const result = await Promise.all(
    jsonFiles.map(
      (filePath) => new Promise(
        (resolve, reject) => processFile(filePath, checkOnly, cache).then(resolve).catch((err) => {
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
var import_fs3, path3, ethereumAddressRegex;
var init_format_json = __esm({
  "src/format-json.ts"() {
    "use strict";
    init_source();
    import_fs3 = require("fs");
    init_esm7();
    path3 = __toESM(require("path"));
    init_esm8();
    init_utils2();
    ethereumAddressRegex = /^0x[a-fA-F0-9]{40}$/;
  }
});

// ../../../.yarn/berry/cache/toml-npm-3.0.0-f993270804-10c0.zip/node_modules/toml/lib/parser.js
var require_parser = __commonJS({
  "../../../.yarn/berry/cache/toml-npm-3.0.0-f993270804-10c0.zip/node_modules/toml/lib/parser.js"(exports2, module2) {
    module2.exports = function() {
      function peg$subclass(child, parent) {
        function ctor() {
          this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
      }
      function SyntaxError(message, expected, found, offset, line, column) {
        this.message = message;
        this.expected = expected;
        this.found = found;
        this.offset = offset;
        this.line = line;
        this.column = column;
        this.name = "SyntaxError";
      }
      peg$subclass(SyntaxError, Error);
      function parse(input) {
        var options = arguments.length > 1 ? arguments[1] : {}, peg$FAILED = {}, peg$startRuleFunctions = { start: peg$parsestart }, peg$startRuleFunction = peg$parsestart, peg$c0 = [], peg$c1 = function() {
          return nodes;
        }, peg$c2 = peg$FAILED, peg$c3 = "#", peg$c4 = { type: "literal", value: "#", description: '"#"' }, peg$c5 = void 0, peg$c6 = { type: "any", description: "any character" }, peg$c7 = "[", peg$c8 = { type: "literal", value: "[", description: '"["' }, peg$c9 = "]", peg$c10 = { type: "literal", value: "]", description: '"]"' }, peg$c11 = function(name) {
          addNode(node("ObjectPath", name, line, column));
        }, peg$c12 = function(name) {
          addNode(node("ArrayPath", name, line, column));
        }, peg$c13 = function(parts, name) {
          return parts.concat(name);
        }, peg$c14 = function(name) {
          return [name];
        }, peg$c15 = function(name) {
          return name;
        }, peg$c16 = ".", peg$c17 = { type: "literal", value: ".", description: '"."' }, peg$c18 = "=", peg$c19 = { type: "literal", value: "=", description: '"="' }, peg$c20 = function(key, value) {
          addNode(node("Assign", value, line, column, key));
        }, peg$c21 = function(chars) {
          return chars.join("");
        }, peg$c22 = function(node2) {
          return node2.value;
        }, peg$c23 = '"""', peg$c24 = { type: "literal", value: '"""', description: '"\\"\\"\\""' }, peg$c25 = null, peg$c26 = function(chars) {
          return node("String", chars.join(""), line, column);
        }, peg$c27 = '"', peg$c28 = { type: "literal", value: '"', description: '"\\""' }, peg$c29 = "'''", peg$c30 = { type: "literal", value: "'''", description: `"'''"` }, peg$c31 = "'", peg$c32 = { type: "literal", value: "'", description: `"'"` }, peg$c33 = function(char) {
          return char;
        }, peg$c34 = function(char) {
          return char;
        }, peg$c35 = "\\", peg$c36 = { type: "literal", value: "\\", description: '"\\\\"' }, peg$c37 = function() {
          return "";
        }, peg$c38 = "e", peg$c39 = { type: "literal", value: "e", description: '"e"' }, peg$c40 = "E", peg$c41 = { type: "literal", value: "E", description: '"E"' }, peg$c42 = function(left, right) {
          return node("Float", parseFloat(left + "e" + right), line, column);
        }, peg$c43 = function(text2) {
          return node("Float", parseFloat(text2), line, column);
        }, peg$c44 = "+", peg$c45 = { type: "literal", value: "+", description: '"+"' }, peg$c46 = function(digits) {
          return digits.join("");
        }, peg$c47 = "-", peg$c48 = { type: "literal", value: "-", description: '"-"' }, peg$c49 = function(digits) {
          return "-" + digits.join("");
        }, peg$c50 = function(text2) {
          return node("Integer", parseInt(text2, 10), line, column);
        }, peg$c51 = "true", peg$c52 = { type: "literal", value: "true", description: '"true"' }, peg$c53 = function() {
          return node("Boolean", true, line, column);
        }, peg$c54 = "false", peg$c55 = { type: "literal", value: "false", description: '"false"' }, peg$c56 = function() {
          return node("Boolean", false, line, column);
        }, peg$c57 = function() {
          return node("Array", [], line, column);
        }, peg$c58 = function(value) {
          return node("Array", value ? [value] : [], line, column);
        }, peg$c59 = function(values) {
          return node("Array", values, line, column);
        }, peg$c60 = function(values, value) {
          return node("Array", values.concat(value), line, column);
        }, peg$c61 = function(value) {
          return value;
        }, peg$c62 = ",", peg$c63 = { type: "literal", value: ",", description: '","' }, peg$c64 = "{", peg$c65 = { type: "literal", value: "{", description: '"{"' }, peg$c66 = "}", peg$c67 = { type: "literal", value: "}", description: '"}"' }, peg$c68 = function(values) {
          return node("InlineTable", values, line, column);
        }, peg$c69 = function(key, value) {
          return node("InlineTableValue", value, line, column, key);
        }, peg$c70 = function(digits) {
          return "." + digits;
        }, peg$c71 = function(date) {
          return date.join("");
        }, peg$c72 = ":", peg$c73 = { type: "literal", value: ":", description: '":"' }, peg$c74 = function(time) {
          return time.join("");
        }, peg$c75 = "T", peg$c76 = { type: "literal", value: "T", description: '"T"' }, peg$c77 = "Z", peg$c78 = { type: "literal", value: "Z", description: '"Z"' }, peg$c79 = function(date, time) {
          return node("Date", /* @__PURE__ */ new Date(date + "T" + time + "Z"), line, column);
        }, peg$c80 = function(date, time) {
          return node("Date", /* @__PURE__ */ new Date(date + "T" + time), line, column);
        }, peg$c81 = /^[ \t]/, peg$c82 = { type: "class", value: "[ \\t]", description: "[ \\t]" }, peg$c83 = "\n", peg$c84 = { type: "literal", value: "\n", description: '"\\n"' }, peg$c85 = "\r", peg$c86 = { type: "literal", value: "\r", description: '"\\r"' }, peg$c87 = /^[0-9a-f]/i, peg$c88 = { type: "class", value: "[0-9a-f]i", description: "[0-9a-f]i" }, peg$c89 = /^[0-9]/, peg$c90 = { type: "class", value: "[0-9]", description: "[0-9]" }, peg$c91 = "_", peg$c92 = { type: "literal", value: "_", description: '"_"' }, peg$c93 = function() {
          return "";
        }, peg$c94 = /^[A-Za-z0-9_\-]/, peg$c95 = { type: "class", value: "[A-Za-z0-9_\\-]", description: "[A-Za-z0-9_\\-]" }, peg$c96 = function(d) {
          return d.join("");
        }, peg$c97 = '\\"', peg$c98 = { type: "literal", value: '\\"', description: '"\\\\\\""' }, peg$c99 = function() {
          return '"';
        }, peg$c100 = "\\\\", peg$c101 = { type: "literal", value: "\\\\", description: '"\\\\\\\\"' }, peg$c102 = function() {
          return "\\";
        }, peg$c103 = "\\b", peg$c104 = { type: "literal", value: "\\b", description: '"\\\\b"' }, peg$c105 = function() {
          return "\b";
        }, peg$c106 = "\\t", peg$c107 = { type: "literal", value: "\\t", description: '"\\\\t"' }, peg$c108 = function() {
          return "	";
        }, peg$c109 = "\\n", peg$c110 = { type: "literal", value: "\\n", description: '"\\\\n"' }, peg$c111 = function() {
          return "\n";
        }, peg$c112 = "\\f", peg$c113 = { type: "literal", value: "\\f", description: '"\\\\f"' }, peg$c114 = function() {
          return "\f";
        }, peg$c115 = "\\r", peg$c116 = { type: "literal", value: "\\r", description: '"\\\\r"' }, peg$c117 = function() {
          return "\r";
        }, peg$c118 = "\\U", peg$c119 = { type: "literal", value: "\\U", description: '"\\\\U"' }, peg$c120 = function(digits) {
          return convertCodePoint(digits.join(""));
        }, peg$c121 = "\\u", peg$c122 = { type: "literal", value: "\\u", description: '"\\\\u"' }, peg$currPos = 0, peg$reportedPos = 0, peg$cachedPos = 0, peg$cachedPosDetails = { line: 1, column: 1, seenCR: false }, peg$maxFailPos = 0, peg$maxFailExpected = [], peg$silentFails = 0, peg$cache = {}, peg$result;
        if ("startRule" in options) {
          if (!(options.startRule in peg$startRuleFunctions)) {
            throw new Error(`Can't start parsing from rule "` + options.startRule + '".');
          }
          peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
        }
        function text() {
          return input.substring(peg$reportedPos, peg$currPos);
        }
        function offset() {
          return peg$reportedPos;
        }
        function line() {
          return peg$computePosDetails(peg$reportedPos).line;
        }
        function column() {
          return peg$computePosDetails(peg$reportedPos).column;
        }
        function expected(description) {
          throw peg$buildException(
            null,
            [{ type: "other", description }],
            peg$reportedPos
          );
        }
        function error(message) {
          throw peg$buildException(message, null, peg$reportedPos);
        }
        function peg$computePosDetails(pos) {
          function advance(details, startPos, endPos) {
            var p, ch;
            for (p = startPos; p < endPos; p++) {
              ch = input.charAt(p);
              if (ch === "\n") {
                if (!details.seenCR) {
                  details.line++;
                }
                details.column = 1;
                details.seenCR = false;
              } else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
                details.line++;
                details.column = 1;
                details.seenCR = true;
              } else {
                details.column++;
                details.seenCR = false;
              }
            }
          }
          if (peg$cachedPos !== pos) {
            if (peg$cachedPos > pos) {
              peg$cachedPos = 0;
              peg$cachedPosDetails = { line: 1, column: 1, seenCR: false };
            }
            advance(peg$cachedPosDetails, peg$cachedPos, pos);
            peg$cachedPos = pos;
          }
          return peg$cachedPosDetails;
        }
        function peg$fail(expected2) {
          if (peg$currPos < peg$maxFailPos) {
            return;
          }
          if (peg$currPos > peg$maxFailPos) {
            peg$maxFailPos = peg$currPos;
            peg$maxFailExpected = [];
          }
          peg$maxFailExpected.push(expected2);
        }
        function peg$buildException(message, expected2, pos) {
          function cleanupExpected(expected3) {
            var i = 1;
            expected3.sort(function(a, b) {
              if (a.description < b.description) {
                return -1;
              } else if (a.description > b.description) {
                return 1;
              } else {
                return 0;
              }
            });
            while (i < expected3.length) {
              if (expected3[i - 1] === expected3[i]) {
                expected3.splice(i, 1);
              } else {
                i++;
              }
            }
          }
          function buildMessage(expected3, found2) {
            function stringEscape(s) {
              function hex(ch) {
                return ch.charCodeAt(0).toString(16).toUpperCase();
              }
              return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\x08/g, "\\b").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\f/g, "\\f").replace(/\r/g, "\\r").replace(/[\x00-\x07\x0B\x0E\x0F]/g, function(ch) {
                return "\\x0" + hex(ch);
              }).replace(/[\x10-\x1F\x80-\xFF]/g, function(ch) {
                return "\\x" + hex(ch);
              }).replace(/[\u0180-\u0FFF]/g, function(ch) {
                return "\\u0" + hex(ch);
              }).replace(/[\u1080-\uFFFF]/g, function(ch) {
                return "\\u" + hex(ch);
              });
            }
            var expectedDescs = new Array(expected3.length), expectedDesc, foundDesc, i;
            for (i = 0; i < expected3.length; i++) {
              expectedDescs[i] = expected3[i].description;
            }
            expectedDesc = expected3.length > 1 ? expectedDescs.slice(0, -1).join(", ") + " or " + expectedDescs[expected3.length - 1] : expectedDescs[0];
            foundDesc = found2 ? '"' + stringEscape(found2) + '"' : "end of input";
            return "Expected " + expectedDesc + " but " + foundDesc + " found.";
          }
          var posDetails = peg$computePosDetails(pos), found = pos < input.length ? input.charAt(pos) : null;
          if (expected2 !== null) {
            cleanupExpected(expected2);
          }
          return new SyntaxError(
            message !== null ? message : buildMessage(expected2, found),
            expected2,
            found,
            pos,
            posDetails.line,
            posDetails.column
          );
        }
        function peg$parsestart() {
          var s0, s1, s2;
          var key = peg$currPos * 49 + 0, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$currPos;
          s1 = [];
          s2 = peg$parseline();
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            s2 = peg$parseline();
          }
          if (s1 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c1();
          }
          s0 = s1;
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        function peg$parseline() {
          var s0, s1, s2, s3, s4, s5, s6;
          var key = peg$currPos * 49 + 1, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$currPos;
          s1 = [];
          s2 = peg$parseS();
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            s2 = peg$parseS();
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$parseexpression();
            if (s2 !== peg$FAILED) {
              s3 = [];
              s4 = peg$parseS();
              while (s4 !== peg$FAILED) {
                s3.push(s4);
                s4 = peg$parseS();
              }
              if (s3 !== peg$FAILED) {
                s4 = [];
                s5 = peg$parsecomment();
                while (s5 !== peg$FAILED) {
                  s4.push(s5);
                  s5 = peg$parsecomment();
                }
                if (s4 !== peg$FAILED) {
                  s5 = [];
                  s6 = peg$parseNL();
                  if (s6 !== peg$FAILED) {
                    while (s6 !== peg$FAILED) {
                      s5.push(s6);
                      s6 = peg$parseNL();
                    }
                  } else {
                    s5 = peg$c2;
                  }
                  if (s5 === peg$FAILED) {
                    s5 = peg$parseEOF();
                  }
                  if (s5 !== peg$FAILED) {
                    s1 = [s1, s2, s3, s4, s5];
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c2;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c2;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            s1 = [];
            s2 = peg$parseS();
            if (s2 !== peg$FAILED) {
              while (s2 !== peg$FAILED) {
                s1.push(s2);
                s2 = peg$parseS();
              }
            } else {
              s1 = peg$c2;
            }
            if (s1 !== peg$FAILED) {
              s2 = [];
              s3 = peg$parseNL();
              if (s3 !== peg$FAILED) {
                while (s3 !== peg$FAILED) {
                  s2.push(s3);
                  s3 = peg$parseNL();
                }
              } else {
                s2 = peg$c2;
              }
              if (s2 === peg$FAILED) {
                s2 = peg$parseEOF();
              }
              if (s2 !== peg$FAILED) {
                s1 = [s1, s2];
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
            if (s0 === peg$FAILED) {
              s0 = peg$parseNL();
            }
          }
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        function peg$parseexpression() {
          var s0;
          var key = peg$currPos * 49 + 2, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$parsecomment();
          if (s0 === peg$FAILED) {
            s0 = peg$parsepath();
            if (s0 === peg$FAILED) {
              s0 = peg$parsetablearray();
              if (s0 === peg$FAILED) {
                s0 = peg$parseassignment();
              }
            }
          }
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        function peg$parsecomment() {
          var s0, s1, s2, s3, s4, s5;
          var key = peg$currPos * 49 + 3, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 35) {
            s1 = peg$c3;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c4);
            }
          }
          if (s1 !== peg$FAILED) {
            s2 = [];
            s3 = peg$currPos;
            s4 = peg$currPos;
            peg$silentFails++;
            s5 = peg$parseNL();
            if (s5 === peg$FAILED) {
              s5 = peg$parseEOF();
            }
            peg$silentFails--;
            if (s5 === peg$FAILED) {
              s4 = peg$c5;
            } else {
              peg$currPos = s4;
              s4 = peg$c2;
            }
            if (s4 !== peg$FAILED) {
              if (input.length > peg$currPos) {
                s5 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s5 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c6);
                }
              }
              if (s5 !== peg$FAILED) {
                s4 = [s4, s5];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$c2;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$c2;
            }
            while (s3 !== peg$FAILED) {
              s2.push(s3);
              s3 = peg$currPos;
              s4 = peg$currPos;
              peg$silentFails++;
              s5 = peg$parseNL();
              if (s5 === peg$FAILED) {
                s5 = peg$parseEOF();
              }
              peg$silentFails--;
              if (s5 === peg$FAILED) {
                s4 = peg$c5;
              } else {
                peg$currPos = s4;
                s4 = peg$c2;
              }
              if (s4 !== peg$FAILED) {
                if (input.length > peg$currPos) {
                  s5 = input.charAt(peg$currPos);
                  peg$currPos++;
                } else {
                  s5 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c6);
                  }
                }
                if (s5 !== peg$FAILED) {
                  s4 = [s4, s5];
                  s3 = s4;
                } else {
                  peg$currPos = s3;
                  s3 = peg$c2;
                }
              } else {
                peg$currPos = s3;
                s3 = peg$c2;
              }
            }
            if (s2 !== peg$FAILED) {
              s1 = [s1, s2];
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        function peg$parsepath() {
          var s0, s1, s2, s3, s4, s5;
          var key = peg$currPos * 49 + 4, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 91) {
            s1 = peg$c7;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c8);
            }
          }
          if (s1 !== peg$FAILED) {
            s2 = [];
            s3 = peg$parseS();
            while (s3 !== peg$FAILED) {
              s2.push(s3);
              s3 = peg$parseS();
            }
            if (s2 !== peg$FAILED) {
              s3 = peg$parsetable_key();
              if (s3 !== peg$FAILED) {
                s4 = [];
                s5 = peg$parseS();
                while (s5 !== peg$FAILED) {
                  s4.push(s5);
                  s5 = peg$parseS();
                }
                if (s4 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 93) {
                    s5 = peg$c9;
                    peg$currPos++;
                  } else {
                    s5 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c10);
                    }
                  }
                  if (s5 !== peg$FAILED) {
                    peg$reportedPos = s0;
                    s1 = peg$c11(s3);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c2;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c2;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        function peg$parsetablearray() {
          var s0, s1, s2, s3, s4, s5, s6, s7;
          var key = peg$currPos * 49 + 5, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 91) {
            s1 = peg$c7;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c8);
            }
          }
          if (s1 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 91) {
              s2 = peg$c7;
              peg$currPos++;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c8);
              }
            }
            if (s2 !== peg$FAILED) {
              s3 = [];
              s4 = peg$parseS();
              while (s4 !== peg$FAILED) {
                s3.push(s4);
                s4 = peg$parseS();
              }
              if (s3 !== peg$FAILED) {
                s4 = peg$parsetable_key();
                if (s4 !== peg$FAILED) {
                  s5 = [];
                  s6 = peg$parseS();
                  while (s6 !== peg$FAILED) {
                    s5.push(s6);
                    s6 = peg$parseS();
                  }
                  if (s5 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 93) {
                      s6 = peg$c9;
                      peg$currPos++;
                    } else {
                      s6 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c10);
                      }
                    }
                    if (s6 !== peg$FAILED) {
                      if (input.charCodeAt(peg$currPos) === 93) {
                        s7 = peg$c9;
                        peg$currPos++;
                      } else {
                        s7 = peg$FAILED;
                        if (peg$silentFails === 0) {
                          peg$fail(peg$c10);
                        }
                      }
                      if (s7 !== peg$FAILED) {
                        peg$reportedPos = s0;
                        s1 = peg$c12(s4);
                        s0 = s1;
                      } else {
                        peg$currPos = s0;
                        s0 = peg$c2;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$c2;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c2;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c2;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        function peg$parsetable_key() {
          var s0, s1, s2;
          var key = peg$currPos * 49 + 6, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$currPos;
          s1 = [];
          s2 = peg$parsedot_ended_table_key_part();
          if (s2 !== peg$FAILED) {
            while (s2 !== peg$FAILED) {
              s1.push(s2);
              s2 = peg$parsedot_ended_table_key_part();
            }
          } else {
            s1 = peg$c2;
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$parsetable_key_part();
            if (s2 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c13(s1, s2);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            s1 = peg$parsetable_key_part();
            if (s1 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c14(s1);
            }
            s0 = s1;
          }
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        function peg$parsetable_key_part() {
          var s0, s1, s2, s3, s4;
          var key = peg$currPos * 49 + 7, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$currPos;
          s1 = [];
          s2 = peg$parseS();
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            s2 = peg$parseS();
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$parsekey();
            if (s2 !== peg$FAILED) {
              s3 = [];
              s4 = peg$parseS();
              while (s4 !== peg$FAILED) {
                s3.push(s4);
                s4 = peg$parseS();
              }
              if (s3 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c15(s2);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            s1 = [];
            s2 = peg$parseS();
            while (s2 !== peg$FAILED) {
              s1.push(s2);
              s2 = peg$parseS();
            }
            if (s1 !== peg$FAILED) {
              s2 = peg$parsequoted_key();
              if (s2 !== peg$FAILED) {
                s3 = [];
                s4 = peg$parseS();
                while (s4 !== peg$FAILED) {
                  s3.push(s4);
                  s4 = peg$parseS();
                }
                if (s3 !== peg$FAILED) {
                  peg$reportedPos = s0;
                  s1 = peg$c15(s2);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$c2;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          }
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        function peg$parsedot_ended_table_key_part() {
          var s0, s1, s2, s3, s4, s5, s6;
          var key = peg$currPos * 49 + 8, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$currPos;
          s1 = [];
          s2 = peg$parseS();
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            s2 = peg$parseS();
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$parsekey();
            if (s2 !== peg$FAILED) {
              s3 = [];
              s4 = peg$parseS();
              while (s4 !== peg$FAILED) {
                s3.push(s4);
                s4 = peg$parseS();
              }
              if (s3 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 46) {
                  s4 = peg$c16;
                  peg$currPos++;
                } else {
                  s4 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c17);
                  }
                }
                if (s4 !== peg$FAILED) {
                  s5 = [];
                  s6 = peg$parseS();
                  while (s6 !== peg$FAILED) {
                    s5.push(s6);
                    s6 = peg$parseS();
                  }
                  if (s5 !== peg$FAILED) {
                    peg$reportedPos = s0;
                    s1 = peg$c15(s2);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c2;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c2;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            s1 = [];
            s2 = peg$parseS();
            while (s2 !== peg$FAILED) {
              s1.push(s2);
              s2 = peg$parseS();
            }
            if (s1 !== peg$FAILED) {
              s2 = peg$parsequoted_key();
              if (s2 !== peg$FAILED) {
                s3 = [];
                s4 = peg$parseS();
                while (s4 !== peg$FAILED) {
                  s3.push(s4);
                  s4 = peg$parseS();
                }
                if (s3 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 46) {
                    s4 = peg$c16;
                    peg$currPos++;
                  } else {
                    s4 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c17);
                    }
                  }
                  if (s4 !== peg$FAILED) {
                    s5 = [];
                    s6 = peg$parseS();
                    while (s6 !== peg$FAILED) {
                      s5.push(s6);
                      s6 = peg$parseS();
                    }
                    if (s5 !== peg$FAILED) {
                      peg$reportedPos = s0;
                      s1 = peg$c15(s2);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$c2;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c2;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c2;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          }
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        function peg$parseassignment() {
          var s0, s1, s2, s3, s4, s5;
          var key = peg$currPos * 49 + 9, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$currPos;
          s1 = peg$parsekey();
          if (s1 !== peg$FAILED) {
            s2 = [];
            s3 = peg$parseS();
            while (s3 !== peg$FAILED) {
              s2.push(s3);
              s3 = peg$parseS();
            }
            if (s2 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 61) {
                s3 = peg$c18;
                peg$currPos++;
              } else {
                s3 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c19);
                }
              }
              if (s3 !== peg$FAILED) {
                s4 = [];
                s5 = peg$parseS();
                while (s5 !== peg$FAILED) {
                  s4.push(s5);
                  s5 = peg$parseS();
                }
                if (s4 !== peg$FAILED) {
                  s5 = peg$parsevalue();
                  if (s5 !== peg$FAILED) {
                    peg$reportedPos = s0;
                    s1 = peg$c20(s1, s5);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c2;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c2;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            s1 = peg$parsequoted_key();
            if (s1 !== peg$FAILED) {
              s2 = [];
              s3 = peg$parseS();
              while (s3 !== peg$FAILED) {
                s2.push(s3);
                s3 = peg$parseS();
              }
              if (s2 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 61) {
                  s3 = peg$c18;
                  peg$currPos++;
                } else {
                  s3 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c19);
                  }
                }
                if (s3 !== peg$FAILED) {
                  s4 = [];
                  s5 = peg$parseS();
                  while (s5 !== peg$FAILED) {
                    s4.push(s5);
                    s5 = peg$parseS();
                  }
                  if (s4 !== peg$FAILED) {
                    s5 = peg$parsevalue();
                    if (s5 !== peg$FAILED) {
                      peg$reportedPos = s0;
                      s1 = peg$c20(s1, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$c2;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c2;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c2;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          }
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        function peg$parsekey() {
          var s0, s1, s2;
          var key = peg$currPos * 49 + 10, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$currPos;
          s1 = [];
          s2 = peg$parseASCII_BASIC();
          if (s2 !== peg$FAILED) {
            while (s2 !== peg$FAILED) {
              s1.push(s2);
              s2 = peg$parseASCII_BASIC();
            }
          } else {
            s1 = peg$c2;
          }
          if (s1 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c21(s1);
          }
          s0 = s1;
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        function peg$parsequoted_key() {
          var s0, s1;
          var key = peg$currPos * 49 + 11, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$currPos;
          s1 = peg$parsedouble_quoted_single_line_string();
          if (s1 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c22(s1);
          }
          s0 = s1;
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            s1 = peg$parsesingle_quoted_single_line_string();
            if (s1 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c22(s1);
            }
            s0 = s1;
          }
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        function peg$parsevalue() {
          var s0;
          var key = peg$currPos * 49 + 12, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$parsestring();
          if (s0 === peg$FAILED) {
            s0 = peg$parsedatetime();
            if (s0 === peg$FAILED) {
              s0 = peg$parsefloat();
              if (s0 === peg$FAILED) {
                s0 = peg$parseinteger();
                if (s0 === peg$FAILED) {
                  s0 = peg$parseboolean();
                  if (s0 === peg$FAILED) {
                    s0 = peg$parsearray();
                    if (s0 === peg$FAILED) {
                      s0 = peg$parseinline_table();
                    }
                  }
                }
              }
            }
          }
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        function peg$parsestring() {
          var s0;
          var key = peg$currPos * 49 + 13, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$parsedouble_quoted_multiline_string();
          if (s0 === peg$FAILED) {
            s0 = peg$parsedouble_quoted_single_line_string();
            if (s0 === peg$FAILED) {
              s0 = peg$parsesingle_quoted_multiline_string();
              if (s0 === peg$FAILED) {
                s0 = peg$parsesingle_quoted_single_line_string();
              }
            }
          }
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        function peg$parsedouble_quoted_multiline_string() {
          var s0, s1, s2, s3, s4;
          var key = peg$currPos * 49 + 14, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$currPos;
          if (input.substr(peg$currPos, 3) === peg$c23) {
            s1 = peg$c23;
            peg$currPos += 3;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c24);
            }
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$parseNL();
            if (s2 === peg$FAILED) {
              s2 = peg$c25;
            }
            if (s2 !== peg$FAILED) {
              s3 = [];
              s4 = peg$parsemultiline_string_char();
              while (s4 !== peg$FAILED) {
                s3.push(s4);
                s4 = peg$parsemultiline_string_char();
              }
              if (s3 !== peg$FAILED) {
                if (input.substr(peg$currPos, 3) === peg$c23) {
                  s4 = peg$c23;
                  peg$currPos += 3;
                } else {
                  s4 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c24);
                  }
                }
                if (s4 !== peg$FAILED) {
                  peg$reportedPos = s0;
                  s1 = peg$c26(s3);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$c2;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        function peg$parsedouble_quoted_single_line_string() {
          var s0, s1, s2, s3;
          var key = peg$currPos * 49 + 15, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 34) {
            s1 = peg$c27;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c28);
            }
          }
          if (s1 !== peg$FAILED) {
            s2 = [];
            s3 = peg$parsestring_char();
            while (s3 !== peg$FAILED) {
              s2.push(s3);
              s3 = peg$parsestring_char();
            }
            if (s2 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 34) {
                s3 = peg$c27;
                peg$currPos++;
              } else {
                s3 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c28);
                }
              }
              if (s3 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c26(s2);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        function peg$parsesingle_quoted_multiline_string() {
          var s0, s1, s2, s3, s4;
          var key = peg$currPos * 49 + 16, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$currPos;
          if (input.substr(peg$currPos, 3) === peg$c29) {
            s1 = peg$c29;
            peg$currPos += 3;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c30);
            }
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$parseNL();
            if (s2 === peg$FAILED) {
              s2 = peg$c25;
            }
            if (s2 !== peg$FAILED) {
              s3 = [];
              s4 = peg$parsemultiline_literal_char();
              while (s4 !== peg$FAILED) {
                s3.push(s4);
                s4 = peg$parsemultiline_literal_char();
              }
              if (s3 !== peg$FAILED) {
                if (input.substr(peg$currPos, 3) === peg$c29) {
                  s4 = peg$c29;
                  peg$currPos += 3;
                } else {
                  s4 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c30);
                  }
                }
                if (s4 !== peg$FAILED) {
                  peg$reportedPos = s0;
                  s1 = peg$c26(s3);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$c2;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        function peg$parsesingle_quoted_single_line_string() {
          var s0, s1, s2, s3;
          var key = peg$currPos * 49 + 17, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 39) {
            s1 = peg$c31;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c32);
            }
          }
          if (s1 !== peg$FAILED) {
            s2 = [];
            s3 = peg$parseliteral_char();
            while (s3 !== peg$FAILED) {
              s2.push(s3);
              s3 = peg$parseliteral_char();
            }
            if (s2 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 39) {
                s3 = peg$c31;
                peg$currPos++;
              } else {
                s3 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c32);
                }
              }
              if (s3 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c26(s2);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        function peg$parsestring_char() {
          var s0, s1, s2;
          var key = peg$currPos * 49 + 18, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$parseESCAPED();
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            s1 = peg$currPos;
            peg$silentFails++;
            if (input.charCodeAt(peg$currPos) === 34) {
              s2 = peg$c27;
              peg$currPos++;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c28);
              }
            }
            peg$silentFails--;
            if (s2 === peg$FAILED) {
              s1 = peg$c5;
            } else {
              peg$currPos = s1;
              s1 = peg$c2;
            }
            if (s1 !== peg$FAILED) {
              if (input.length > peg$currPos) {
                s2 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c6);
                }
              }
              if (s2 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c33(s2);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          }
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        function peg$parseliteral_char() {
          var s0, s1, s2;
          var key = peg$currPos * 49 + 19, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$currPos;
          s1 = peg$currPos;
          peg$silentFails++;
          if (input.charCodeAt(peg$currPos) === 39) {
            s2 = peg$c31;
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c32);
            }
          }
          peg$silentFails--;
          if (s2 === peg$FAILED) {
            s1 = peg$c5;
          } else {
            peg$currPos = s1;
            s1 = peg$c2;
          }
          if (s1 !== peg$FAILED) {
            if (input.length > peg$currPos) {
              s2 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c6);
              }
            }
            if (s2 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c33(s2);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        function peg$parsemultiline_string_char() {
          var s0, s1, s2;
          var key = peg$currPos * 49 + 20, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$parseESCAPED();
          if (s0 === peg$FAILED) {
            s0 = peg$parsemultiline_string_delim();
            if (s0 === peg$FAILED) {
              s0 = peg$currPos;
              s1 = peg$currPos;
              peg$silentFails++;
              if (input.substr(peg$currPos, 3) === peg$c23) {
                s2 = peg$c23;
                peg$currPos += 3;
              } else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c24);
                }
              }
              peg$silentFails--;
              if (s2 === peg$FAILED) {
                s1 = peg$c5;
              } else {
                peg$currPos = s1;
                s1 = peg$c2;
              }
              if (s1 !== peg$FAILED) {
                if (input.length > peg$currPos) {
                  s2 = input.charAt(peg$currPos);
                  peg$currPos++;
                } else {
                  s2 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c6);
                  }
                }
                if (s2 !== peg$FAILED) {
                  peg$reportedPos = s0;
                  s1 = peg$c34(s2);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$c2;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            }
          }
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        function peg$parsemultiline_string_delim() {
          var s0, s1, s2, s3, s4;
          var key = peg$currPos * 49 + 21, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 92) {
            s1 = peg$c35;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c36);
            }
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$parseNL();
            if (s2 !== peg$FAILED) {
              s3 = [];
              s4 = peg$parseNLS();
              while (s4 !== peg$FAILED) {
                s3.push(s4);
                s4 = peg$parseNLS();
              }
              if (s3 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c37();
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        function peg$parsemultiline_literal_char() {
          var s0, s1, s2;
          var key = peg$currPos * 49 + 22, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$currPos;
          s1 = peg$currPos;
          peg$silentFails++;
          if (input.substr(peg$currPos, 3) === peg$c29) {
            s2 = peg$c29;
            peg$currPos += 3;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c30);
            }
          }
          peg$silentFails--;
          if (s2 === peg$FAILED) {
            s1 = peg$c5;
          } else {
            peg$currPos = s1;
            s1 = peg$c2;
          }
          if (s1 !== peg$FAILED) {
            if (input.length > peg$currPos) {
              s2 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c6);
              }
            }
            if (s2 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c33(s2);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        function peg$parsefloat() {
          var s0, s1, s2, s3;
          var key = peg$currPos * 49 + 23, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$currPos;
          s1 = peg$parsefloat_text();
          if (s1 === peg$FAILED) {
            s1 = peg$parseinteger_text();
          }
          if (s1 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 101) {
              s2 = peg$c38;
              peg$currPos++;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c39);
              }
            }
            if (s2 === peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 69) {
                s2 = peg$c40;
                peg$currPos++;
              } else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c41);
                }
              }
            }
            if (s2 !== peg$FAILED) {
              s3 = peg$parseinteger_text();
              if (s3 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c42(s1, s3);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            s1 = peg$parsefloat_text();
            if (s1 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c43(s1);
            }
            s0 = s1;
          }
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        function peg$parsefloat_text() {
          var s0, s1, s2, s3, s4, s5;
          var key = peg$currPos * 49 + 24, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 43) {
            s1 = peg$c44;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c45);
            }
          }
          if (s1 === peg$FAILED) {
            s1 = peg$c25;
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$currPos;
            s3 = peg$parseDIGITS();
            if (s3 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 46) {
                s4 = peg$c16;
                peg$currPos++;
              } else {
                s4 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c17);
                }
              }
              if (s4 !== peg$FAILED) {
                s5 = peg$parseDIGITS();
                if (s5 !== peg$FAILED) {
                  s3 = [s3, s4, s5];
                  s2 = s3;
                } else {
                  peg$currPos = s2;
                  s2 = peg$c2;
                }
              } else {
                peg$currPos = s2;
                s2 = peg$c2;
              }
            } else {
              peg$currPos = s2;
              s2 = peg$c2;
            }
            if (s2 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c46(s2);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 45) {
              s1 = peg$c47;
              peg$currPos++;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c48);
              }
            }
            if (s1 !== peg$FAILED) {
              s2 = peg$currPos;
              s3 = peg$parseDIGITS();
              if (s3 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 46) {
                  s4 = peg$c16;
                  peg$currPos++;
                } else {
                  s4 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c17);
                  }
                }
                if (s4 !== peg$FAILED) {
                  s5 = peg$parseDIGITS();
                  if (s5 !== peg$FAILED) {
                    s3 = [s3, s4, s5];
                    s2 = s3;
                  } else {
                    peg$currPos = s2;
                    s2 = peg$c2;
                  }
                } else {
                  peg$currPos = s2;
                  s2 = peg$c2;
                }
              } else {
                peg$currPos = s2;
                s2 = peg$c2;
              }
              if (s2 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c49(s2);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          }
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        function peg$parseinteger() {
          var s0, s1;
          var key = peg$currPos * 49 + 25, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$currPos;
          s1 = peg$parseinteger_text();
          if (s1 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c50(s1);
          }
          s0 = s1;
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        function peg$parseinteger_text() {
          var s0, s1, s2, s3, s4;
          var key = peg$currPos * 49 + 26, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 43) {
            s1 = peg$c44;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c45);
            }
          }
          if (s1 === peg$FAILED) {
            s1 = peg$c25;
          }
          if (s1 !== peg$FAILED) {
            s2 = [];
            s3 = peg$parseDIGIT_OR_UNDER();
            if (s3 !== peg$FAILED) {
              while (s3 !== peg$FAILED) {
                s2.push(s3);
                s3 = peg$parseDIGIT_OR_UNDER();
              }
            } else {
              s2 = peg$c2;
            }
            if (s2 !== peg$FAILED) {
              s3 = peg$currPos;
              peg$silentFails++;
              if (input.charCodeAt(peg$currPos) === 46) {
                s4 = peg$c16;
                peg$currPos++;
              } else {
                s4 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c17);
                }
              }
              peg$silentFails--;
              if (s4 === peg$FAILED) {
                s3 = peg$c5;
              } else {
                peg$currPos = s3;
                s3 = peg$c2;
              }
              if (s3 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c46(s2);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 45) {
              s1 = peg$c47;
              peg$currPos++;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c48);
              }
            }
            if (s1 !== peg$FAILED) {
              s2 = [];
              s3 = peg$parseDIGIT_OR_UNDER();
              if (s3 !== peg$FAILED) {
                while (s3 !== peg$FAILED) {
                  s2.push(s3);
                  s3 = peg$parseDIGIT_OR_UNDER();
                }
              } else {
                s2 = peg$c2;
              }
              if (s2 !== peg$FAILED) {
                s3 = peg$currPos;
                peg$silentFails++;
                if (input.charCodeAt(peg$currPos) === 46) {
                  s4 = peg$c16;
                  peg$currPos++;
                } else {
                  s4 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c17);
                  }
                }
                peg$silentFails--;
                if (s4 === peg$FAILED) {
                  s3 = peg$c5;
                } else {
                  peg$currPos = s3;
                  s3 = peg$c2;
                }
                if (s3 !== peg$FAILED) {
                  peg$reportedPos = s0;
                  s1 = peg$c49(s2);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$c2;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          }
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        function peg$parseboolean() {
          var s0, s1;
          var key = peg$currPos * 49 + 27, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$currPos;
          if (input.substr(peg$currPos, 4) === peg$c51) {
            s1 = peg$c51;
            peg$currPos += 4;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c52);
            }
          }
          if (s1 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c53();
          }
          s0 = s1;
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            if (input.substr(peg$currPos, 5) === peg$c54) {
              s1 = peg$c54;
              peg$currPos += 5;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c55);
              }
            }
            if (s1 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c56();
            }
            s0 = s1;
          }
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        function peg$parsearray() {
          var s0, s1, s2, s3, s4;
          var key = peg$currPos * 49 + 28, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 91) {
            s1 = peg$c7;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c8);
            }
          }
          if (s1 !== peg$FAILED) {
            s2 = [];
            s3 = peg$parsearray_sep();
            while (s3 !== peg$FAILED) {
              s2.push(s3);
              s3 = peg$parsearray_sep();
            }
            if (s2 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 93) {
                s3 = peg$c9;
                peg$currPos++;
              } else {
                s3 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c10);
                }
              }
              if (s3 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c57();
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 91) {
              s1 = peg$c7;
              peg$currPos++;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c8);
              }
            }
            if (s1 !== peg$FAILED) {
              s2 = peg$parsearray_value();
              if (s2 === peg$FAILED) {
                s2 = peg$c25;
              }
              if (s2 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 93) {
                  s3 = peg$c9;
                  peg$currPos++;
                } else {
                  s3 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c10);
                  }
                }
                if (s3 !== peg$FAILED) {
                  peg$reportedPos = s0;
                  s1 = peg$c58(s2);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$c2;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
            if (s0 === peg$FAILED) {
              s0 = peg$currPos;
              if (input.charCodeAt(peg$currPos) === 91) {
                s1 = peg$c7;
                peg$currPos++;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c8);
                }
              }
              if (s1 !== peg$FAILED) {
                s2 = [];
                s3 = peg$parsearray_value_list();
                if (s3 !== peg$FAILED) {
                  while (s3 !== peg$FAILED) {
                    s2.push(s3);
                    s3 = peg$parsearray_value_list();
                  }
                } else {
                  s2 = peg$c2;
                }
                if (s2 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 93) {
                    s3 = peg$c9;
                    peg$currPos++;
                  } else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c10);
                    }
                  }
                  if (s3 !== peg$FAILED) {
                    peg$reportedPos = s0;
                    s1 = peg$c59(s2);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c2;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c2;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
              if (s0 === peg$FAILED) {
                s0 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 91) {
                  s1 = peg$c7;
                  peg$currPos++;
                } else {
                  s1 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c8);
                  }
                }
                if (s1 !== peg$FAILED) {
                  s2 = [];
                  s3 = peg$parsearray_value_list();
                  if (s3 !== peg$FAILED) {
                    while (s3 !== peg$FAILED) {
                      s2.push(s3);
                      s3 = peg$parsearray_value_list();
                    }
                  } else {
                    s2 = peg$c2;
                  }
                  if (s2 !== peg$FAILED) {
                    s3 = peg$parsearray_value();
                    if (s3 !== peg$FAILED) {
                      if (input.charCodeAt(peg$currPos) === 93) {
                        s4 = peg$c9;
                        peg$currPos++;
                      } else {
                        s4 = peg$FAILED;
                        if (peg$silentFails === 0) {
                          peg$fail(peg$c10);
                        }
                      }
                      if (s4 !== peg$FAILED) {
                        peg$reportedPos = s0;
                        s1 = peg$c60(s2, s3);
                        s0 = s1;
                      } else {
                        peg$currPos = s0;
                        s0 = peg$c2;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$c2;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c2;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c2;
                }
              }
            }
          }
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        function peg$parsearray_value() {
          var s0, s1, s2, s3, s4;
          var key = peg$currPos * 49 + 29, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$currPos;
          s1 = [];
          s2 = peg$parsearray_sep();
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            s2 = peg$parsearray_sep();
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$parsevalue();
            if (s2 !== peg$FAILED) {
              s3 = [];
              s4 = peg$parsearray_sep();
              while (s4 !== peg$FAILED) {
                s3.push(s4);
                s4 = peg$parsearray_sep();
              }
              if (s3 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c61(s2);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        function peg$parsearray_value_list() {
          var s0, s1, s2, s3, s4, s5, s6;
          var key = peg$currPos * 49 + 30, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$currPos;
          s1 = [];
          s2 = peg$parsearray_sep();
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            s2 = peg$parsearray_sep();
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$parsevalue();
            if (s2 !== peg$FAILED) {
              s3 = [];
              s4 = peg$parsearray_sep();
              while (s4 !== peg$FAILED) {
                s3.push(s4);
                s4 = peg$parsearray_sep();
              }
              if (s3 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 44) {
                  s4 = peg$c62;
                  peg$currPos++;
                } else {
                  s4 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c63);
                  }
                }
                if (s4 !== peg$FAILED) {
                  s5 = [];
                  s6 = peg$parsearray_sep();
                  while (s6 !== peg$FAILED) {
                    s5.push(s6);
                    s6 = peg$parsearray_sep();
                  }
                  if (s5 !== peg$FAILED) {
                    peg$reportedPos = s0;
                    s1 = peg$c61(s2);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c2;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c2;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        function peg$parsearray_sep() {
          var s0;
          var key = peg$currPos * 49 + 31, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$parseS();
          if (s0 === peg$FAILED) {
            s0 = peg$parseNL();
            if (s0 === peg$FAILED) {
              s0 = peg$parsecomment();
            }
          }
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        function peg$parseinline_table() {
          var s0, s1, s2, s3, s4, s5;
          var key = peg$currPos * 49 + 32, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 123) {
            s1 = peg$c64;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c65);
            }
          }
          if (s1 !== peg$FAILED) {
            s2 = [];
            s3 = peg$parseS();
            while (s3 !== peg$FAILED) {
              s2.push(s3);
              s3 = peg$parseS();
            }
            if (s2 !== peg$FAILED) {
              s3 = [];
              s4 = peg$parseinline_table_assignment();
              while (s4 !== peg$FAILED) {
                s3.push(s4);
                s4 = peg$parseinline_table_assignment();
              }
              if (s3 !== peg$FAILED) {
                s4 = [];
                s5 = peg$parseS();
                while (s5 !== peg$FAILED) {
                  s4.push(s5);
                  s5 = peg$parseS();
                }
                if (s4 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 125) {
                    s5 = peg$c66;
                    peg$currPos++;
                  } else {
                    s5 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c67);
                    }
                  }
                  if (s5 !== peg$FAILED) {
                    peg$reportedPos = s0;
                    s1 = peg$c68(s3);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c2;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c2;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        function peg$parseinline_table_assignment() {
          var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10;
          var key = peg$currPos * 49 + 33, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$currPos;
          s1 = [];
          s2 = peg$parseS();
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            s2 = peg$parseS();
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$parsekey();
            if (s2 !== peg$FAILED) {
              s3 = [];
              s4 = peg$parseS();
              while (s4 !== peg$FAILED) {
                s3.push(s4);
                s4 = peg$parseS();
              }
              if (s3 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 61) {
                  s4 = peg$c18;
                  peg$currPos++;
                } else {
                  s4 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c19);
                  }
                }
                if (s4 !== peg$FAILED) {
                  s5 = [];
                  s6 = peg$parseS();
                  while (s6 !== peg$FAILED) {
                    s5.push(s6);
                    s6 = peg$parseS();
                  }
                  if (s5 !== peg$FAILED) {
                    s6 = peg$parsevalue();
                    if (s6 !== peg$FAILED) {
                      s7 = [];
                      s8 = peg$parseS();
                      while (s8 !== peg$FAILED) {
                        s7.push(s8);
                        s8 = peg$parseS();
                      }
                      if (s7 !== peg$FAILED) {
                        if (input.charCodeAt(peg$currPos) === 44) {
                          s8 = peg$c62;
                          peg$currPos++;
                        } else {
                          s8 = peg$FAILED;
                          if (peg$silentFails === 0) {
                            peg$fail(peg$c63);
                          }
                        }
                        if (s8 !== peg$FAILED) {
                          s9 = [];
                          s10 = peg$parseS();
                          while (s10 !== peg$FAILED) {
                            s9.push(s10);
                            s10 = peg$parseS();
                          }
                          if (s9 !== peg$FAILED) {
                            peg$reportedPos = s0;
                            s1 = peg$c69(s2, s6);
                            s0 = s1;
                          } else {
                            peg$currPos = s0;
                            s0 = peg$c2;
                          }
                        } else {
                          peg$currPos = s0;
                          s0 = peg$c2;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$c2;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$c2;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c2;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c2;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            s1 = [];
            s2 = peg$parseS();
            while (s2 !== peg$FAILED) {
              s1.push(s2);
              s2 = peg$parseS();
            }
            if (s1 !== peg$FAILED) {
              s2 = peg$parsekey();
              if (s2 !== peg$FAILED) {
                s3 = [];
                s4 = peg$parseS();
                while (s4 !== peg$FAILED) {
                  s3.push(s4);
                  s4 = peg$parseS();
                }
                if (s3 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 61) {
                    s4 = peg$c18;
                    peg$currPos++;
                  } else {
                    s4 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c19);
                    }
                  }
                  if (s4 !== peg$FAILED) {
                    s5 = [];
                    s6 = peg$parseS();
                    while (s6 !== peg$FAILED) {
                      s5.push(s6);
                      s6 = peg$parseS();
                    }
                    if (s5 !== peg$FAILED) {
                      s6 = peg$parsevalue();
                      if (s6 !== peg$FAILED) {
                        peg$reportedPos = s0;
                        s1 = peg$c69(s2, s6);
                        s0 = s1;
                      } else {
                        peg$currPos = s0;
                        s0 = peg$c2;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$c2;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c2;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c2;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          }
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        function peg$parsesecfragment() {
          var s0, s1, s2;
          var key = peg$currPos * 49 + 34, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 46) {
            s1 = peg$c16;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c17);
            }
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$parseDIGITS();
            if (s2 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c70(s2);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        function peg$parsedate() {
          var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11;
          var key = peg$currPos * 49 + 35, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$currPos;
          s1 = peg$currPos;
          s2 = peg$parseDIGIT_OR_UNDER();
          if (s2 !== peg$FAILED) {
            s3 = peg$parseDIGIT_OR_UNDER();
            if (s3 !== peg$FAILED) {
              s4 = peg$parseDIGIT_OR_UNDER();
              if (s4 !== peg$FAILED) {
                s5 = peg$parseDIGIT_OR_UNDER();
                if (s5 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 45) {
                    s6 = peg$c47;
                    peg$currPos++;
                  } else {
                    s6 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c48);
                    }
                  }
                  if (s6 !== peg$FAILED) {
                    s7 = peg$parseDIGIT_OR_UNDER();
                    if (s7 !== peg$FAILED) {
                      s8 = peg$parseDIGIT_OR_UNDER();
                      if (s8 !== peg$FAILED) {
                        if (input.charCodeAt(peg$currPos) === 45) {
                          s9 = peg$c47;
                          peg$currPos++;
                        } else {
                          s9 = peg$FAILED;
                          if (peg$silentFails === 0) {
                            peg$fail(peg$c48);
                          }
                        }
                        if (s9 !== peg$FAILED) {
                          s10 = peg$parseDIGIT_OR_UNDER();
                          if (s10 !== peg$FAILED) {
                            s11 = peg$parseDIGIT_OR_UNDER();
                            if (s11 !== peg$FAILED) {
                              s2 = [s2, s3, s4, s5, s6, s7, s8, s9, s10, s11];
                              s1 = s2;
                            } else {
                              peg$currPos = s1;
                              s1 = peg$c2;
                            }
                          } else {
                            peg$currPos = s1;
                            s1 = peg$c2;
                          }
                        } else {
                          peg$currPos = s1;
                          s1 = peg$c2;
                        }
                      } else {
                        peg$currPos = s1;
                        s1 = peg$c2;
                      }
                    } else {
                      peg$currPos = s1;
                      s1 = peg$c2;
                    }
                  } else {
                    peg$currPos = s1;
                    s1 = peg$c2;
                  }
                } else {
                  peg$currPos = s1;
                  s1 = peg$c2;
                }
              } else {
                peg$currPos = s1;
                s1 = peg$c2;
              }
            } else {
              peg$currPos = s1;
              s1 = peg$c2;
            }
          } else {
            peg$currPos = s1;
            s1 = peg$c2;
          }
          if (s1 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c71(s1);
          }
          s0 = s1;
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        function peg$parsetime() {
          var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10;
          var key = peg$currPos * 49 + 36, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$currPos;
          s1 = peg$currPos;
          s2 = peg$parseDIGIT_OR_UNDER();
          if (s2 !== peg$FAILED) {
            s3 = peg$parseDIGIT_OR_UNDER();
            if (s3 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 58) {
                s4 = peg$c72;
                peg$currPos++;
              } else {
                s4 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c73);
                }
              }
              if (s4 !== peg$FAILED) {
                s5 = peg$parseDIGIT_OR_UNDER();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parseDIGIT_OR_UNDER();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 58) {
                      s7 = peg$c72;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c73);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      s8 = peg$parseDIGIT_OR_UNDER();
                      if (s8 !== peg$FAILED) {
                        s9 = peg$parseDIGIT_OR_UNDER();
                        if (s9 !== peg$FAILED) {
                          s10 = peg$parsesecfragment();
                          if (s10 === peg$FAILED) {
                            s10 = peg$c25;
                          }
                          if (s10 !== peg$FAILED) {
                            s2 = [s2, s3, s4, s5, s6, s7, s8, s9, s10];
                            s1 = s2;
                          } else {
                            peg$currPos = s1;
                            s1 = peg$c2;
                          }
                        } else {
                          peg$currPos = s1;
                          s1 = peg$c2;
                        }
                      } else {
                        peg$currPos = s1;
                        s1 = peg$c2;
                      }
                    } else {
                      peg$currPos = s1;
                      s1 = peg$c2;
                    }
                  } else {
                    peg$currPos = s1;
                    s1 = peg$c2;
                  }
                } else {
                  peg$currPos = s1;
                  s1 = peg$c2;
                }
              } else {
                peg$currPos = s1;
                s1 = peg$c2;
              }
            } else {
              peg$currPos = s1;
              s1 = peg$c2;
            }
          } else {
            peg$currPos = s1;
            s1 = peg$c2;
          }
          if (s1 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c74(s1);
          }
          s0 = s1;
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        function peg$parsetime_with_offset() {
          var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14, s15, s16;
          var key = peg$currPos * 49 + 37, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$currPos;
          s1 = peg$currPos;
          s2 = peg$parseDIGIT_OR_UNDER();
          if (s2 !== peg$FAILED) {
            s3 = peg$parseDIGIT_OR_UNDER();
            if (s3 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 58) {
                s4 = peg$c72;
                peg$currPos++;
              } else {
                s4 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c73);
                }
              }
              if (s4 !== peg$FAILED) {
                s5 = peg$parseDIGIT_OR_UNDER();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parseDIGIT_OR_UNDER();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 58) {
                      s7 = peg$c72;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c73);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      s8 = peg$parseDIGIT_OR_UNDER();
                      if (s8 !== peg$FAILED) {
                        s9 = peg$parseDIGIT_OR_UNDER();
                        if (s9 !== peg$FAILED) {
                          s10 = peg$parsesecfragment();
                          if (s10 === peg$FAILED) {
                            s10 = peg$c25;
                          }
                          if (s10 !== peg$FAILED) {
                            if (input.charCodeAt(peg$currPos) === 45) {
                              s11 = peg$c47;
                              peg$currPos++;
                            } else {
                              s11 = peg$FAILED;
                              if (peg$silentFails === 0) {
                                peg$fail(peg$c48);
                              }
                            }
                            if (s11 === peg$FAILED) {
                              if (input.charCodeAt(peg$currPos) === 43) {
                                s11 = peg$c44;
                                peg$currPos++;
                              } else {
                                s11 = peg$FAILED;
                                if (peg$silentFails === 0) {
                                  peg$fail(peg$c45);
                                }
                              }
                            }
                            if (s11 !== peg$FAILED) {
                              s12 = peg$parseDIGIT_OR_UNDER();
                              if (s12 !== peg$FAILED) {
                                s13 = peg$parseDIGIT_OR_UNDER();
                                if (s13 !== peg$FAILED) {
                                  if (input.charCodeAt(peg$currPos) === 58) {
                                    s14 = peg$c72;
                                    peg$currPos++;
                                  } else {
                                    s14 = peg$FAILED;
                                    if (peg$silentFails === 0) {
                                      peg$fail(peg$c73);
                                    }
                                  }
                                  if (s14 !== peg$FAILED) {
                                    s15 = peg$parseDIGIT_OR_UNDER();
                                    if (s15 !== peg$FAILED) {
                                      s16 = peg$parseDIGIT_OR_UNDER();
                                      if (s16 !== peg$FAILED) {
                                        s2 = [s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14, s15, s16];
                                        s1 = s2;
                                      } else {
                                        peg$currPos = s1;
                                        s1 = peg$c2;
                                      }
                                    } else {
                                      peg$currPos = s1;
                                      s1 = peg$c2;
                                    }
                                  } else {
                                    peg$currPos = s1;
                                    s1 = peg$c2;
                                  }
                                } else {
                                  peg$currPos = s1;
                                  s1 = peg$c2;
                                }
                              } else {
                                peg$currPos = s1;
                                s1 = peg$c2;
                              }
                            } else {
                              peg$currPos = s1;
                              s1 = peg$c2;
                            }
                          } else {
                            peg$currPos = s1;
                            s1 = peg$c2;
                          }
                        } else {
                          peg$currPos = s1;
                          s1 = peg$c2;
                        }
                      } else {
                        peg$currPos = s1;
                        s1 = peg$c2;
                      }
                    } else {
                      peg$currPos = s1;
                      s1 = peg$c2;
                    }
                  } else {
                    peg$currPos = s1;
                    s1 = peg$c2;
                  }
                } else {
                  peg$currPos = s1;
                  s1 = peg$c2;
                }
              } else {
                peg$currPos = s1;
                s1 = peg$c2;
              }
            } else {
              peg$currPos = s1;
              s1 = peg$c2;
            }
          } else {
            peg$currPos = s1;
            s1 = peg$c2;
          }
          if (s1 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c74(s1);
          }
          s0 = s1;
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        function peg$parsedatetime() {
          var s0, s1, s2, s3, s4;
          var key = peg$currPos * 49 + 38, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$currPos;
          s1 = peg$parsedate();
          if (s1 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 84) {
              s2 = peg$c75;
              peg$currPos++;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c76);
              }
            }
            if (s2 !== peg$FAILED) {
              s3 = peg$parsetime();
              if (s3 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 90) {
                  s4 = peg$c77;
                  peg$currPos++;
                } else {
                  s4 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c78);
                  }
                }
                if (s4 !== peg$FAILED) {
                  peg$reportedPos = s0;
                  s1 = peg$c79(s1, s3);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$c2;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            s1 = peg$parsedate();
            if (s1 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 84) {
                s2 = peg$c75;
                peg$currPos++;
              } else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c76);
                }
              }
              if (s2 !== peg$FAILED) {
                s3 = peg$parsetime_with_offset();
                if (s3 !== peg$FAILED) {
                  peg$reportedPos = s0;
                  s1 = peg$c80(s1, s3);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$c2;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          }
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        function peg$parseS() {
          var s0;
          var key = peg$currPos * 49 + 39, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          if (peg$c81.test(input.charAt(peg$currPos))) {
            s0 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c82);
            }
          }
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        function peg$parseNL() {
          var s0, s1, s2;
          var key = peg$currPos * 49 + 40, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          if (input.charCodeAt(peg$currPos) === 10) {
            s0 = peg$c83;
            peg$currPos++;
          } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c84);
            }
          }
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 13) {
              s1 = peg$c85;
              peg$currPos++;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c86);
              }
            }
            if (s1 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 10) {
                s2 = peg$c83;
                peg$currPos++;
              } else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c84);
                }
              }
              if (s2 !== peg$FAILED) {
                s1 = [s1, s2];
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          }
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        function peg$parseNLS() {
          var s0;
          var key = peg$currPos * 49 + 41, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$parseNL();
          if (s0 === peg$FAILED) {
            s0 = peg$parseS();
          }
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        function peg$parseEOF() {
          var s0, s1;
          var key = peg$currPos * 49 + 42, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$currPos;
          peg$silentFails++;
          if (input.length > peg$currPos) {
            s1 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c6);
            }
          }
          peg$silentFails--;
          if (s1 === peg$FAILED) {
            s0 = peg$c5;
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        function peg$parseHEX() {
          var s0;
          var key = peg$currPos * 49 + 43, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          if (peg$c87.test(input.charAt(peg$currPos))) {
            s0 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c88);
            }
          }
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        function peg$parseDIGIT_OR_UNDER() {
          var s0, s1;
          var key = peg$currPos * 49 + 44, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          if (peg$c89.test(input.charAt(peg$currPos))) {
            s0 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c90);
            }
          }
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 95) {
              s1 = peg$c91;
              peg$currPos++;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c92);
              }
            }
            if (s1 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c93();
            }
            s0 = s1;
          }
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        function peg$parseASCII_BASIC() {
          var s0;
          var key = peg$currPos * 49 + 45, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          if (peg$c94.test(input.charAt(peg$currPos))) {
            s0 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c95);
            }
          }
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        function peg$parseDIGITS() {
          var s0, s1, s2;
          var key = peg$currPos * 49 + 46, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$currPos;
          s1 = [];
          s2 = peg$parseDIGIT_OR_UNDER();
          if (s2 !== peg$FAILED) {
            while (s2 !== peg$FAILED) {
              s1.push(s2);
              s2 = peg$parseDIGIT_OR_UNDER();
            }
          } else {
            s1 = peg$c2;
          }
          if (s1 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c96(s1);
          }
          s0 = s1;
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        function peg$parseESCAPED() {
          var s0, s1;
          var key = peg$currPos * 49 + 47, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$currPos;
          if (input.substr(peg$currPos, 2) === peg$c97) {
            s1 = peg$c97;
            peg$currPos += 2;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c98);
            }
          }
          if (s1 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c99();
          }
          s0 = s1;
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            if (input.substr(peg$currPos, 2) === peg$c100) {
              s1 = peg$c100;
              peg$currPos += 2;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c101);
              }
            }
            if (s1 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c102();
            }
            s0 = s1;
            if (s0 === peg$FAILED) {
              s0 = peg$currPos;
              if (input.substr(peg$currPos, 2) === peg$c103) {
                s1 = peg$c103;
                peg$currPos += 2;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c104);
                }
              }
              if (s1 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c105();
              }
              s0 = s1;
              if (s0 === peg$FAILED) {
                s0 = peg$currPos;
                if (input.substr(peg$currPos, 2) === peg$c106) {
                  s1 = peg$c106;
                  peg$currPos += 2;
                } else {
                  s1 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c107);
                  }
                }
                if (s1 !== peg$FAILED) {
                  peg$reportedPos = s0;
                  s1 = peg$c108();
                }
                s0 = s1;
                if (s0 === peg$FAILED) {
                  s0 = peg$currPos;
                  if (input.substr(peg$currPos, 2) === peg$c109) {
                    s1 = peg$c109;
                    peg$currPos += 2;
                  } else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c110);
                    }
                  }
                  if (s1 !== peg$FAILED) {
                    peg$reportedPos = s0;
                    s1 = peg$c111();
                  }
                  s0 = s1;
                  if (s0 === peg$FAILED) {
                    s0 = peg$currPos;
                    if (input.substr(peg$currPos, 2) === peg$c112) {
                      s1 = peg$c112;
                      peg$currPos += 2;
                    } else {
                      s1 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c113);
                      }
                    }
                    if (s1 !== peg$FAILED) {
                      peg$reportedPos = s0;
                      s1 = peg$c114();
                    }
                    s0 = s1;
                    if (s0 === peg$FAILED) {
                      s0 = peg$currPos;
                      if (input.substr(peg$currPos, 2) === peg$c115) {
                        s1 = peg$c115;
                        peg$currPos += 2;
                      } else {
                        s1 = peg$FAILED;
                        if (peg$silentFails === 0) {
                          peg$fail(peg$c116);
                        }
                      }
                      if (s1 !== peg$FAILED) {
                        peg$reportedPos = s0;
                        s1 = peg$c117();
                      }
                      s0 = s1;
                      if (s0 === peg$FAILED) {
                        s0 = peg$parseESCAPED_UNICODE();
                      }
                    }
                  }
                }
              }
            }
          }
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        function peg$parseESCAPED_UNICODE() {
          var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10;
          var key = peg$currPos * 49 + 48, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$currPos;
          if (input.substr(peg$currPos, 2) === peg$c118) {
            s1 = peg$c118;
            peg$currPos += 2;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c119);
            }
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$currPos;
            s3 = peg$parseHEX();
            if (s3 !== peg$FAILED) {
              s4 = peg$parseHEX();
              if (s4 !== peg$FAILED) {
                s5 = peg$parseHEX();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parseHEX();
                  if (s6 !== peg$FAILED) {
                    s7 = peg$parseHEX();
                    if (s7 !== peg$FAILED) {
                      s8 = peg$parseHEX();
                      if (s8 !== peg$FAILED) {
                        s9 = peg$parseHEX();
                        if (s9 !== peg$FAILED) {
                          s10 = peg$parseHEX();
                          if (s10 !== peg$FAILED) {
                            s3 = [s3, s4, s5, s6, s7, s8, s9, s10];
                            s2 = s3;
                          } else {
                            peg$currPos = s2;
                            s2 = peg$c2;
                          }
                        } else {
                          peg$currPos = s2;
                          s2 = peg$c2;
                        }
                      } else {
                        peg$currPos = s2;
                        s2 = peg$c2;
                      }
                    } else {
                      peg$currPos = s2;
                      s2 = peg$c2;
                    }
                  } else {
                    peg$currPos = s2;
                    s2 = peg$c2;
                  }
                } else {
                  peg$currPos = s2;
                  s2 = peg$c2;
                }
              } else {
                peg$currPos = s2;
                s2 = peg$c2;
              }
            } else {
              peg$currPos = s2;
              s2 = peg$c2;
            }
            if (s2 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c120(s2);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            if (input.substr(peg$currPos, 2) === peg$c121) {
              s1 = peg$c121;
              peg$currPos += 2;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c122);
              }
            }
            if (s1 !== peg$FAILED) {
              s2 = peg$currPos;
              s3 = peg$parseHEX();
              if (s3 !== peg$FAILED) {
                s4 = peg$parseHEX();
                if (s4 !== peg$FAILED) {
                  s5 = peg$parseHEX();
                  if (s5 !== peg$FAILED) {
                    s6 = peg$parseHEX();
                    if (s6 !== peg$FAILED) {
                      s3 = [s3, s4, s5, s6];
                      s2 = s3;
                    } else {
                      peg$currPos = s2;
                      s2 = peg$c2;
                    }
                  } else {
                    peg$currPos = s2;
                    s2 = peg$c2;
                  }
                } else {
                  peg$currPos = s2;
                  s2 = peg$c2;
                }
              } else {
                peg$currPos = s2;
                s2 = peg$c2;
              }
              if (s2 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c120(s2);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          }
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        var nodes = [];
        function genError(err, line2, col) {
          var ex = new Error(err);
          ex.line = line2;
          ex.column = col;
          throw ex;
        }
        function addNode(node2) {
          nodes.push(node2);
        }
        function node(type, value, line2, column2, key) {
          var obj = { type, value, line: line2(), column: column2() };
          if (key) obj.key = key;
          return obj;
        }
        function convertCodePoint(str, line2, col) {
          var num = parseInt("0x" + str);
          if (!isFinite(num) || Math.floor(num) != num || num < 0 || num > 1114111 || num > 55295 && num < 57344) {
            genError("Invalid Unicode escape code: " + str, line2, col);
          } else {
            return fromCodePoint(num);
          }
        }
        function fromCodePoint() {
          var MAX_SIZE = 16384;
          var codeUnits = [];
          var highSurrogate;
          var lowSurrogate;
          var index = -1;
          var length = arguments.length;
          if (!length) {
            return "";
          }
          var result = "";
          while (++index < length) {
            var codePoint = Number(arguments[index]);
            if (codePoint <= 65535) {
              codeUnits.push(codePoint);
            } else {
              codePoint -= 65536;
              highSurrogate = (codePoint >> 10) + 55296;
              lowSurrogate = codePoint % 1024 + 56320;
              codeUnits.push(highSurrogate, lowSurrogate);
            }
            if (index + 1 == length || codeUnits.length > MAX_SIZE) {
              result += String.fromCharCode.apply(null, codeUnits);
              codeUnits.length = 0;
            }
          }
          return result;
        }
        peg$result = peg$startRuleFunction();
        if (peg$result !== peg$FAILED && peg$currPos === input.length) {
          return peg$result;
        } else {
          if (peg$result !== peg$FAILED && peg$currPos < input.length) {
            peg$fail({ type: "end", description: "end of input" });
          }
          throw peg$buildException(null, peg$maxFailExpected, peg$maxFailPos);
        }
      }
      return {
        SyntaxError,
        parse
      };
    }();
  }
});

// ../../../.yarn/berry/cache/toml-npm-3.0.0-f993270804-10c0.zip/node_modules/toml/lib/compiler.js
var require_compiler = __commonJS({
  "../../../.yarn/berry/cache/toml-npm-3.0.0-f993270804-10c0.zip/node_modules/toml/lib/compiler.js"(exports2, module2) {
    "use strict";
    function compile(nodes) {
      var assignedPaths = [];
      var valueAssignments = [];
      var currentPath = "";
      var data = /* @__PURE__ */ Object.create(null);
      var context = data;
      var arrayMode = false;
      return reduce(nodes);
      function reduce(nodes2) {
        var node;
        for (var i = 0; i < nodes2.length; i++) {
          node = nodes2[i];
          switch (node.type) {
            case "Assign":
              assign(node);
              break;
            case "ObjectPath":
              setPath(node);
              break;
            case "ArrayPath":
              addTableArray(node);
              break;
          }
        }
        return data;
      }
      function genError(err, line, col) {
        var ex = new Error(err);
        ex.line = line;
        ex.column = col;
        throw ex;
      }
      function assign(node) {
        var key = node.key;
        var value = node.value;
        var line = node.line;
        var column = node.column;
        var fullPath;
        if (currentPath) {
          fullPath = currentPath + "." + key;
        } else {
          fullPath = key;
        }
        if (typeof context[key] !== "undefined") {
          genError("Cannot redefine existing key '" + fullPath + "'.", line, column);
        }
        context[key] = reduceValueNode(value);
        if (!pathAssigned(fullPath)) {
          assignedPaths.push(fullPath);
          valueAssignments.push(fullPath);
        }
      }
      function pathAssigned(path5) {
        return assignedPaths.indexOf(path5) !== -1;
      }
      function reduceValueNode(node) {
        if (node.type === "Array") {
          return reduceArrayWithTypeChecking(node.value);
        } else if (node.type === "InlineTable") {
          return reduceInlineTableNode(node.value);
        } else {
          return node.value;
        }
      }
      function reduceInlineTableNode(values) {
        var obj = /* @__PURE__ */ Object.create(null);
        for (var i = 0; i < values.length; i++) {
          var val = values[i];
          if (val.value.type === "InlineTable") {
            obj[val.key] = reduceInlineTableNode(val.value.value);
          } else if (val.type === "InlineTableValue") {
            obj[val.key] = reduceValueNode(val.value);
          }
        }
        return obj;
      }
      function setPath(node) {
        var path5 = node.value;
        var quotedPath = path5.map(quoteDottedString).join(".");
        var line = node.line;
        var column = node.column;
        if (pathAssigned(quotedPath)) {
          genError("Cannot redefine existing key '" + path5 + "'.", line, column);
        }
        assignedPaths.push(quotedPath);
        context = deepRef(data, path5, /* @__PURE__ */ Object.create(null), line, column);
        currentPath = path5;
      }
      function addTableArray(node) {
        var path5 = node.value;
        var quotedPath = path5.map(quoteDottedString).join(".");
        var line = node.line;
        var column = node.column;
        if (!pathAssigned(quotedPath)) {
          assignedPaths.push(quotedPath);
        }
        assignedPaths = assignedPaths.filter(function(p) {
          return p.indexOf(quotedPath) !== 0;
        });
        assignedPaths.push(quotedPath);
        context = deepRef(data, path5, [], line, column);
        currentPath = quotedPath;
        if (context instanceof Array) {
          var newObj = /* @__PURE__ */ Object.create(null);
          context.push(newObj);
          context = newObj;
        } else {
          genError("Cannot redefine existing key '" + path5 + "'.", line, column);
        }
      }
      function deepRef(start, keys, value, line, column) {
        var traversed = [];
        var traversedPath = "";
        var path5 = keys.join(".");
        var ctx = start;
        for (var i = 0; i < keys.length; i++) {
          var key = keys[i];
          traversed.push(key);
          traversedPath = traversed.join(".");
          if (typeof ctx[key] === "undefined") {
            if (i === keys.length - 1) {
              ctx[key] = value;
            } else {
              ctx[key] = /* @__PURE__ */ Object.create(null);
            }
          } else if (i !== keys.length - 1 && valueAssignments.indexOf(traversedPath) > -1) {
            genError("Cannot redefine existing key '" + traversedPath + "'.", line, column);
          }
          ctx = ctx[key];
          if (ctx instanceof Array && ctx.length && i < keys.length - 1) {
            ctx = ctx[ctx.length - 1];
          }
        }
        return ctx;
      }
      function reduceArrayWithTypeChecking(array) {
        var firstType = null;
        for (var i = 0; i < array.length; i++) {
          var node = array[i];
          if (firstType === null) {
            firstType = node.type;
          } else {
            if (node.type !== firstType) {
              genError("Cannot add value of type " + node.type + " to array of type " + firstType + ".", node.line, node.column);
            }
          }
        }
        return array.map(reduceValueNode);
      }
      function quoteDottedString(str) {
        if (str.indexOf(".") > -1) {
          return '"' + str + '"';
        } else {
          return str;
        }
      }
    }
    module2.exports = {
      compile
    };
  }
});

// ../../../.yarn/berry/cache/toml-npm-3.0.0-f993270804-10c0.zip/node_modules/toml/index.js
var require_toml = __commonJS({
  "../../../.yarn/berry/cache/toml-npm-3.0.0-f993270804-10c0.zip/node_modules/toml/index.js"(exports2, module2) {
    var parser = require_parser();
    var compiler = require_compiler();
    module2.exports = {
      parse: function(input) {
        var nodes = parser.parse(input.toString());
        return compiler.compile(nodes);
      }
    };
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
    const contract = await (0, import_promises2.readFile)(filePath, "utf-8");
    const checksum = getFileChecksum(contract);
    if (cache && cache[filePath] === checksum) {
      console.log(source_default.gray(filePath), `${timeDiff(t)}ms`, "\u2728");
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
      console.log(source_default.gray(filePath), `${timeDiff(t)}ms`, "\u2705");
      return;
    }
    if (!update) {
      console.log(source_default.gray(filePath), `${timeDiff(t)}ms`, "\u{1F37B}");
      return;
    }
    const lines = contract.replaceAll(IMPORT_ALL_REGEX, "").split("\n");
    const pragmaIndex = lines.findIndex((l) => l.startsWith("pragma"));
    const newLines = [...lines];
    newLines.splice(pragmaIndex + 1, 0, output);
    await (0, import_promises2.writeFile)(filePath, newLines.join("\n"));
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
  const files = await glob(options.input);
  const targetFiles = files.filter((file) => import_path.default.extname(file) === ".sol");
  if (targetFiles.length === 0) {
    throw new Error("No target files found in the matched files.");
  }
  try {
    let remappingsList = [];
    if ((0, import_fs4.existsSync)("foundry.toml")) {
      const foundryConfig = await (0, import_promises2.readFile)("foundry.toml", "utf-8");
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
          (resolve, reject) => processContract({ filePath, remappings, cache, options }).then(resolve).catch(reject)
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
            const file = await import_fs4.promises.readFile(filePath, "utf-8");
            const checksum = getFileChecksum(file);
            return [filePath, checksum];
          })
        )
      )
    );
    console.log(`\u2728 Job Done. Total time: ${timeDiff(t)}ms`);
  }
}
var import_child_process, import_fs4, import_promises2, import_path, import_toml, import_util, IMPORT_ALL_REGEX, IMPORT_LINE_REGEX, LINE_BREAK_REGEX;
var init_sort_imports = __esm({
  "src/sort-imports.ts"() {
    "use strict";
    init_source();
    import_child_process = require("child_process");
    import_fs4 = require("fs");
    import_promises2 = require("fs/promises");
    init_esm7();
    import_path = __toESM(require("path"));
    import_toml = __toESM(require_toml());
    import_util = require("util");
    init_utils2();
    IMPORT_ALL_REGEX = /^(import\s+(?:(?:[^;'"]+from\s+)?['"])([^'"]+)['"];?\s*)$/gm;
    IMPORT_LINE_REGEX = /^import\s+(?:(?:[^;'"]+from\s+)?['"])([^'"]+)['"];?\s*$/;
    LINE_BREAK_REGEX = /(?:\r\n|\r|\n)/g;
  }
});

// ../../../.yarn/berry/cache/commander-npm-14.0.0-1e0a7932ab-10c0.zip/node_modules/commander/esm.mjs
var import_index = __toESM(require_commander(), 1);
var {
  program,
  createCommand,
  createArgument,
  createOption,
  CommanderError,
  InvalidArgumentError,
  InvalidOptionArgumentError,
  // deprecated old name
  Command,
  Argument,
  Option,
  Help
} = import_index.default;

// src/index.ts
var program2 = new Command();
program2.name("mito-tools").description("Mito development tools collection").version("1.0.0");
program2.command("format-json").description(
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
program2.command("sort-imports").description("Sort import statements in Solidity files").requiredOption("-i, --input <pattern>", "Glob pattern for files to process").option(
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
program2.parse(process.argv);
/*! Bundled license information:

@noble/hashes/esm/utils.js:
  (*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) *)
*/
