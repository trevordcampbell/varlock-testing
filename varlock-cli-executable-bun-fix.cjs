'use strict';

var y2 = require('node:process');
var child_process = require('node:child_process');
var util = require('node:util');
var fs9 = require('node:fs/promises');
var path8 = require('node:path');
var fs2 = require('node:fs');
var O = require('node:readline');
var stream = require('node:stream');
var tty = require('node:tty');
var url = require('node:url');
var string_decoder = require('node:string_decoder');
var os2 = require('node:os');
var promises = require('node:timers/promises');
var events = require('node:events');
var v8 = require('node:v8');
var promises$1 = require('node:stream/promises');
var buffer = require('node:buffer');
var crypto = require('node:crypto');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var y2__default = /*#__PURE__*/_interopDefault(y2);
var fs9__default = /*#__PURE__*/_interopDefault(fs9);
var path8__default = /*#__PURE__*/_interopDefault(path8);
var fs2__default = /*#__PURE__*/_interopDefault(fs2);
var O__default = /*#__PURE__*/_interopDefault(O);
var tty__default = /*#__PURE__*/_interopDefault(tty);
var os2__default = /*#__PURE__*/_interopDefault(os2);
var crypto__default = /*#__PURE__*/_interopDefault(crypto);

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __require = /* @__PURE__ */ ((x2) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x2, {
  get: (a3, b3) => (typeof require !== "undefined" ? require : a3)[b3]
}) : x2)(function(x2) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x2 + '" is not supported');
});
var __glob = (map2) => (path12) => {
  var fn = map2[path12];
  if (fn) return fn();
  throw new Error("Module not found in bundle: " + path12);
};
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require2() {
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
  __defProp(target, "default", { value: mod, enumerable: true }) ,
  mod
));

// ../../node_modules/.pnpm/gunshi@0.26.3/node_modules/gunshi/lib/utils-D41C8Abf.js
function isLazyCommand(cmd) {
  return typeof cmd === "function" && "commandName" in cmd && !!cmd.commandName;
}
async function resolveLazyCommand(cmd, name, needRunResolving = false) {
  let command;
  if (isLazyCommand(cmd)) {
    command = Object.assign(create(), {
      name: cmd.commandName,
      description: cmd.description,
      args: cmd.args,
      examples: cmd.examples,
      resource: cmd.resource
    });
    if (needRunResolving) {
      const loaded = await cmd();
      if (typeof loaded === "function") command.run = loaded;
      else if (typeof loaded === "object") {
        if (loaded.run == null) throw new TypeError(`'run' is required in command: ${cmd.name || name}`);
        command.run = loaded.run;
        command.name = loaded.name;
        command.description = loaded.description;
        command.args = loaded.args;
        command.examples = loaded.examples;
        command.resource = loaded.resource;
      } else throw new TypeError(`Cannot resolve command: ${cmd.name || name}`);
    }
  } else command = Object.assign(create(), cmd);
  if (command.name == null && name) command.name = name;
  return deepFreeze(command);
}
function resolveBuiltInKey(key) {
  return `${BUILT_IN_PREFIX}${BUILT_IN_KEY_SEPARATOR}${key}`;
}
function resolveArgKey(key) {
  return `${ARG_PREFIX}${BUILT_IN_KEY_SEPARATOR}${key}`;
}
async function resolveExamples(ctx, examples) {
  return typeof examples === "string" ? examples : typeof examples === "function" ? await examples(ctx) : "";
}
function mapResourceWithBuiltinKey(resource) {
  return Object.entries(resource).reduce((acc, [key, value]) => {
    acc[resolveBuiltInKey(key)] = value;
    return acc;
  }, create());
}
function create(obj = null) {
  return Object.create(obj);
}
function log(...args) {
  console.log(...args);
}
function deepFreeze(obj) {
  if (obj === null || typeof obj !== "object") return obj;
  for (const key of Object.keys(obj)) {
    const value = obj[key];
    if (typeof value === "object" && value !== null) deepFreeze(value);
  }
  return Object.freeze(obj);
}
var DEFAULT_LOCALE, BUILT_IN_PREFIX, ARG_PREFIX, BUILT_IN_KEY_SEPARATOR, ANONYMOUS_COMMAND_NAME, NOOP, COMMON_ARGS, COMMAND_OPTIONS_DEFAULT;
var init_utils_D41C8Abf = __esm({
  "../../node_modules/.pnpm/gunshi@0.26.3/node_modules/gunshi/lib/utils-D41C8Abf.js"() {
    DEFAULT_LOCALE = "en-US";
    BUILT_IN_PREFIX = "_";
    ARG_PREFIX = "arg";
    BUILT_IN_KEY_SEPARATOR = ":";
    ANONYMOUS_COMMAND_NAME = "(anonymous)";
    NOOP = /* @__PURE__ */ __name(() => {
    }, "NOOP");
    COMMON_ARGS = {
      help: {
        type: "boolean",
        short: "h",
        description: "Display this help message"
      },
      version: {
        type: "boolean",
        short: "v",
        description: "Display this version"
      }
    };
    COMMAND_OPTIONS_DEFAULT = {
      name: void 0,
      description: void 0,
      version: void 0,
      cwd: void 0,
      usageSilent: false,
      subCommands: void 0,
      leftMargin: 2,
      middleMargin: 10,
      usageOptionType: false,
      usageOptionValue: true,
      renderHeader: void 0,
      renderUsage: void 0,
      renderValidationErrors: void 0,
      translationAdapterFactory: void 0
    };
    __name(isLazyCommand, "isLazyCommand");
    __name(resolveLazyCommand, "resolveLazyCommand");
    __name(resolveBuiltInKey, "resolveBuiltInKey");
    __name(resolveArgKey, "resolveArgKey");
    __name(resolveExamples, "resolveExamples");
    __name(mapResourceWithBuiltinKey, "mapResourceWithBuiltinKey");
    __name(create, "create");
    __name(log, "log");
    __name(deepFreeze, "deepFreeze");
  }
});

// ../../node_modules/.pnpm/gunshi@0.26.3/node_modules/gunshi/lib/locales/en-US.json
var en_US_exports = {};
__export(en_US_exports, {
  default: () => en_US_default
});
var en_US_default;
var init_en_US = __esm({
  "../../node_modules/.pnpm/gunshi@0.26.3/node_modules/gunshi/lib/locales/en-US.json"() {
    en_US_default = {
      COMMAND: "COMMAND",
      COMMANDS: "COMMANDS",
      SUBCOMMAND: "SUBCOMMAND",
      USAGE: "USAGE",
      ARGUMENTS: "ARGUMENTS",
      OPTIONS: "OPTIONS",
      EXAMPLES: "EXAMPLES",
      FORMORE: "For more info, run any command with the `--help` flag:",
      NEGATABLE: "Negatable of",
      DEFAULT: "default",
      CHOICES: "choices",
      help: "Display this help message",
      version: "Display this version"
    };
  }
});

// ../../node_modules/.pnpm/gunshi@0.26.3/node_modules/gunshi/lib/locales/ja-JP.json
var ja_JP_exports = {};
__export(ja_JP_exports, {
  default: () => ja_JP_default
});
var ja_JP_default;
var init_ja_JP = __esm({
  "../../node_modules/.pnpm/gunshi@0.26.3/node_modules/gunshi/lib/locales/ja-JP.json"() {
    ja_JP_default = {
      COMMAND: "\u30B3\u30DE\u30F3\u30C9",
      COMMANDS: "\u30B3\u30DE\u30F3\u30C9",
      SUBCOMMAND: "\u30B5\u30D6\u30B3\u30DE\u30F3\u30C9",
      USAGE: "\u4F7F\u3044\u65B9",
      ARGUMENTS: "\u5F15\u6570",
      OPTIONS: "\u30AA\u30D7\u30B7\u30E7\u30F3",
      EXAMPLES: "\u4F8B",
      FORMORE: "\u8A73\u7D30\u306F\u3001\u30B3\u30DE\u30F3\u30C9\u3068`--help`\u30D5\u30E9\u30B0\u3092\u5B9F\u884C\u3057\u3066\u304F\u3060\u3055\u3044:",
      NEGATABLE: "\u5426\u5B9A\u53EF\u80FD\u306A",
      DEFAULT: "\u30C7\u30D5\u30A9\u30EB\u30C8",
      CHOICES: "\u9078\u629E\u80A2",
      help: "\u3053\u306E\u30D8\u30EB\u30D7\u30E1\u30C3\u30BB\u30FC\u30B8\u3092\u8868\u793A",
      version: "\u3053\u306E\u30D0\u30FC\u30B8\u30E7\u30F3\u3092\u8868\u793A"
    };
  }
});

// import("./locales/**/*.json") in ../../node_modules/.pnpm/gunshi@0.26.3/node_modules/gunshi/lib/context-D_EmfRNA.js
var globImport_locales_json;
var init_ = __esm({
  'import("./locales/**/*.json") in ../../node_modules/.pnpm/gunshi@0.26.3/node_modules/gunshi/lib/context-D_EmfRNA.js'() {
    globImport_locales_json = __glob({
      "./locales/en-US.json": () => Promise.resolve().then(() => (init_en_US(), en_US_exports)),
      "./locales/ja-JP.json": () => Promise.resolve().then(() => (init_ja_JP(), ja_JP_exports))
    });
  }
});

// ../../node_modules/.pnpm/gunshi@0.26.3/node_modules/gunshi/lib/context-D_EmfRNA.js
function createTranslationAdapter(options) {
  return new DefaultTranslation(options);
}
async function createCommandContext({ args, values, positionals, rest, argv, tokens, command, cliOptions, callMode = "entry", omitted = false }) {
  const _args = Object.entries(args).reduce((acc, [key, value]) => {
    acc[key] = Object.assign(create(), value);
    return acc;
  }, create());
  const env = Object.assign(create(), COMMAND_OPTIONS_DEFAULT, cliOptions);
  const locale = resolveLocale(cliOptions.locale);
  const localeStr = locale.toString();
  const translationAdapterFactory = cliOptions.translationAdapterFactory || createTranslationAdapter;
  const adapter = translationAdapterFactory({
    locale: localeStr,
    fallbackLocale: DEFAULT_LOCALE
  });
  const localeResources = /* @__PURE__ */ new Map();
  let builtInLoadedResources;
  localeResources.set(DEFAULT_LOCALE, mapResourceWithBuiltinKey(en_US_default2));
  if (DEFAULT_LOCALE !== localeStr) try {
    builtInLoadedResources = (await globImport_locales_json(`./locales/${localeStr}.json`)).default;
    localeResources.set(localeStr, mapResourceWithBuiltinKey(builtInLoadedResources));
  } catch {
  }
  function translate(key, values$1 = create()) {
    const strKey = key;
    if (strKey.codePointAt(0) === BUILT_IN_PREFIX_CODE) {
      const resource = localeResources.get(localeStr) || localeResources.get(DEFAULT_LOCALE);
      return resource[strKey] || strKey;
    } else return adapter.translate(locale.toString(), strKey, values$1) || "";
  }
  __name(translate, "translate");
  let cachedCommands;
  async function loadCommands() {
    if (cachedCommands) return cachedCommands;
    const subCommands2 = [...cliOptions.subCommands || []];
    return cachedCommands = await Promise.all(subCommands2.map(async ([name, cmd]) => await resolveLazyCommand(cmd, name)));
  }
  __name(loadCommands, "loadCommands");
  const ctx = deepFreeze(Object.assign(create(), {
    name: getCommandName(command),
    description: command.description,
    omitted,
    callMode,
    locale,
    env,
    args: _args,
    values,
    positionals,
    rest,
    _: argv,
    tokens,
    toKebab: command.toKebab,
    log: cliOptions.usageSilent ? NOOP : log,
    loadCommands,
    translate
  }));
  const loadedOptionsResources = Object.entries(args).map(([key, arg]) => {
    const description = arg.description || "";
    return [key, description];
  });
  const defaultCommandResource = loadedOptionsResources.reduce((res, [key, value]) => {
    res[resolveArgKey(key)] = value;
    return res;
  }, create());
  defaultCommandResource.description = command.description || "";
  defaultCommandResource.examples = await resolveExamples(ctx, command.examples);
  adapter.setResource(DEFAULT_LOCALE, defaultCommandResource);
  const originalResource = await loadCommandResource(ctx, command);
  if (originalResource) {
    const resource = Object.assign(create(), originalResource, { examples: await resolveExamples(ctx, originalResource.examples) });
    if (builtInLoadedResources) {
      resource.help = builtInLoadedResources.help;
      resource.version = builtInLoadedResources.version;
    }
    adapter.setResource(localeStr, resource);
  }
  return ctx;
}
function getCommandName(cmd) {
  if (isLazyCommand(cmd)) return cmd.commandName || cmd.name || ANONYMOUS_COMMAND_NAME;
  else if (typeof cmd === "object") return cmd.name || ANONYMOUS_COMMAND_NAME;
  else return ANONYMOUS_COMMAND_NAME;
}
function resolveLocale(locale) {
  return locale instanceof Intl.Locale ? locale : typeof locale === "string" ? new Intl.Locale(locale) : new Intl.Locale(DEFAULT_LOCALE);
}
async function loadCommandResource(ctx, command) {
  let resource;
  try {
    resource = await command.resource?.(ctx);
  } catch {
  }
  return resource;
}
var COMMAND, COMMANDS, SUBCOMMAND, USAGE, ARGUMENTS, OPTIONS, EXAMPLES, FORMORE, NEGATABLE, DEFAULT, CHOICES, help, version, en_US_default2, DefaultTranslation, BUILT_IN_PREFIX_CODE;
var init_context_D_EmfRNA = __esm({
  "../../node_modules/.pnpm/gunshi@0.26.3/node_modules/gunshi/lib/context-D_EmfRNA.js"() {
    init_utils_D41C8Abf();
    init_();
    COMMAND = "COMMAND";
    COMMANDS = "COMMANDS";
    SUBCOMMAND = "SUBCOMMAND";
    USAGE = "USAGE";
    ARGUMENTS = "ARGUMENTS";
    OPTIONS = "OPTIONS";
    EXAMPLES = "EXAMPLES";
    FORMORE = "For more info, run any command with the `--help` flag:";
    NEGATABLE = "Negatable of";
    DEFAULT = "default";
    CHOICES = "choices";
    help = "Display this help message";
    version = "Display this version";
    en_US_default2 = {
      COMMAND,
      COMMANDS,
      SUBCOMMAND,
      USAGE,
      ARGUMENTS,
      OPTIONS,
      EXAMPLES,
      FORMORE,
      NEGATABLE,
      DEFAULT,
      CHOICES,
      help,
      version
    };
    __name(createTranslationAdapter, "createTranslationAdapter");
    DefaultTranslation = class {
      static {
        __name(this, "DefaultTranslation");
      }
      #resources = /* @__PURE__ */ new Map();
      #options;
      constructor(options) {
        this.#options = options;
        this.#resources.set(options.locale, create());
        if (options.locale !== options.fallbackLocale) this.#resources.set(options.fallbackLocale, create());
      }
      getResource(locale) {
        return this.#resources.get(locale);
      }
      setResource(locale, resource) {
        this.#resources.set(locale, resource);
      }
      getMessage(locale, key) {
        const resource = this.getResource(locale);
        if (resource) return resource[key];
        return void 0;
      }
      translate(locale, key, values = create()) {
        let message = this.getMessage(locale, key);
        if (message === void 0 && locale !== this.#options.fallbackLocale) message = this.getMessage(this.#options.fallbackLocale, key);
        if (message === void 0) return;
        return message.replaceAll(/\{\{(\w+)\}\}/g, (_7, name) => {
          return values[name] == null ? "" : values[name].toString();
        });
      }
    };
    BUILT_IN_PREFIX_CODE = BUILT_IN_PREFIX.codePointAt(0);
    __name(createCommandContext, "createCommandContext");
    __name(getCommandName, "getCommandName");
    __name(resolveLocale, "resolveLocale");
    __name(loadCommandResource, "loadCommandResource");
  }
});

// ../../node_modules/.pnpm/gunshi@0.26.3/node_modules/gunshi/lib/definition-wq1Kmbvq.js
function define(definition) {
  return definition;
}
var init_definition_wq1Kmbvq = __esm({
  "../../node_modules/.pnpm/gunshi@0.26.3/node_modules/gunshi/lib/definition-wq1Kmbvq.js"() {
    __name(define, "define");
  }
});

// ../../node_modules/.pnpm/args-tokens@0.20.1/node_modules/args-tokens/lib/utils-N7UlhLbz.js
function kebabnize(str) {
  return str.replace(/[A-Z]/g, (match, offset) => (offset > 0 ? "-" : "") + match.toLowerCase());
}
var init_utils_N7UlhLbz = __esm({
  "../../node_modules/.pnpm/args-tokens@0.20.1/node_modules/args-tokens/lib/utils-N7UlhLbz.js"() {
    __name(kebabnize, "kebabnize");
  }
});

// ../../node_modules/.pnpm/args-tokens@0.20.1/node_modules/args-tokens/lib/utils.js
var init_utils = __esm({
  "../../node_modules/.pnpm/args-tokens@0.20.1/node_modules/args-tokens/lib/utils.js"() {
    init_utils_N7UlhLbz();
  }
});

// ../../node_modules/.pnpm/gunshi@0.26.3/node_modules/gunshi/lib/renderer-BzRfaLdJ.js
function renderHeader(ctx) {
  const title = ctx.env.description || ctx.env.name || "";
  return Promise.resolve(title ? `${title} (${ctx.env.name || ""}${ctx.env.version ? ` v${ctx.env.version}` : ""})` : title);
}
async function renderUsage(ctx) {
  const messages = [];
  if (!ctx.omitted) {
    const description = resolveDescription(ctx);
    if (description) messages.push(description, "");
  }
  messages.push(...await renderUsageSection(ctx), "");
  if (ctx.omitted && await hasCommands(ctx)) messages.push(...await renderCommandsSection(ctx), "");
  if (hasPositionalArgs(ctx)) messages.push(...await renderPositionalArgsSection(ctx), "");
  if (hasOptionalArgs(ctx)) messages.push(...await renderOptionalArgsSection(ctx), "");
  const examples = await renderExamplesSection(ctx);
  if (examples.length > 0) messages.push(...examples, "");
  return messages.join("\n");
}
async function renderPositionalArgsSection(ctx) {
  const messages = [];
  messages.push(`${ctx.translate(resolveBuiltInKey("ARGUMENTS"))}:`);
  messages.push(await generatePositionalArgsUsage(ctx));
  return messages;
}
async function renderOptionalArgsSection(ctx) {
  const messages = [];
  messages.push(`${ctx.translate(resolveBuiltInKey("OPTIONS"))}:`);
  messages.push(await generateOptionalArgsUsage(ctx, getOptionalArgsPairs(ctx)));
  return messages;
}
async function renderExamplesSection(ctx) {
  const messages = [];
  const resolvedExamples = await resolveExamples$1(ctx);
  if (resolvedExamples) {
    const examples = resolvedExamples.split("\n").map((example) => example.padStart(ctx.env.leftMargin + example.length));
    messages.push(`${ctx.translate(resolveBuiltInKey("EXAMPLES"))}:`, ...examples);
  }
  return messages;
}
async function renderUsageSection(ctx) {
  const messages = [`${ctx.translate(resolveBuiltInKey("USAGE"))}:`];
  if (ctx.omitted) {
    const defaultCommand = `${resolveEntry(ctx)}${await hasCommands(ctx) ? ` [${resolveSubCommand(ctx)}]` : ""} ${[generateOptionsSymbols(ctx), generatePositionalSymbols(ctx)].filter(Boolean).join(" ")}`;
    messages.push(defaultCommand.padStart(ctx.env.leftMargin + defaultCommand.length));
    if (await hasCommands(ctx)) {
      const commandsUsage = `${resolveEntry(ctx)} <${ctx.translate(resolveBuiltInKey("COMMANDS"))}>`;
      messages.push(commandsUsage.padStart(ctx.env.leftMargin + commandsUsage.length));
    }
  } else {
    const usageStr = `${resolveEntry(ctx)} ${resolveSubCommand(ctx)} ${[generateOptionsSymbols(ctx), generatePositionalSymbols(ctx)].filter(Boolean).join(" ")}`;
    messages.push(usageStr.padStart(ctx.env.leftMargin + usageStr.length));
  }
  return messages;
}
async function renderCommandsSection(ctx) {
  const messages = [`${ctx.translate(resolveBuiltInKey("COMMANDS"))}:`];
  const loadedCommands = await ctx.loadCommands();
  const commandMaxLength = Math.max(...loadedCommands.map((cmd) => (cmd.name || "").length));
  const commandsStr = await Promise.all(loadedCommands.map((cmd) => {
    const key = cmd.name || "";
    const desc = cmd.description || "";
    const command = `${key.padEnd(commandMaxLength + ctx.env.middleMargin)}${desc} `;
    return `${command.padStart(ctx.env.leftMargin + command.length)} `;
  }));
  messages.push(...commandsStr, "", ctx.translate(resolveBuiltInKey("FORMORE")));
  messages.push(...loadedCommands.map((cmd) => {
    const commandHelp = `${ctx.env.name} ${cmd.name} --help`;
    return `${commandHelp.padStart(ctx.env.leftMargin + commandHelp.length)}`;
  }));
  return messages;
}
function resolveEntry(ctx) {
  return ctx.env.name || ctx.translate(resolveBuiltInKey("COMMAND"));
}
function resolveSubCommand(ctx) {
  return ctx.name || ctx.translate(resolveBuiltInKey("SUBCOMMAND"));
}
function resolveDescription(ctx) {
  return ctx.translate("description") || ctx.description || "";
}
async function resolveExamples$1(ctx) {
  const ret = ctx.translate("examples");
  if (ret) return ret;
  const command = ctx.env.subCommands?.get(ctx.name || "");
  return await resolveExamples(ctx, command?.examples);
}
async function hasCommands(ctx) {
  const loadedCommands = await ctx.loadCommands();
  return loadedCommands.length > 1;
}
function hasOptionalArgs(ctx) {
  return !!(ctx.args && Object.values(ctx.args).some((arg) => arg.type !== "positional"));
}
function hasPositionalArgs(ctx) {
  return !!(ctx.args && Object.values(ctx.args).some((arg) => arg.type === "positional"));
}
function hasAllDefaultOptions(ctx) {
  return !!(ctx.args && Object.values(ctx.args).every((arg) => arg.default));
}
function generateOptionsSymbols(ctx) {
  return hasOptionalArgs(ctx) ? hasAllDefaultOptions(ctx) ? `[${ctx.translate(resolveBuiltInKey("OPTIONS"))}]` : `<${ctx.translate(resolveBuiltInKey("OPTIONS"))}>` : "";
}
function makeShortLongOptionPair(schema, name, toKebab) {
  const displayName = toKebab || schema.toKebab ? kebabnize(name) : name;
  let key = `--${displayName}`;
  if (schema.short) key = `-${schema.short}, ${key}`;
  return key;
}
function getOptionalArgsPairs(ctx) {
  return Object.entries(ctx.args).reduce((acc, [name, schema]) => {
    if (schema.type === "positional") return acc;
    let key = makeShortLongOptionPair(schema, name, ctx.toKebab);
    if (schema.type !== "boolean") {
      const displayName = ctx.toKebab || schema.toKebab ? kebabnize(name) : name;
      key = schema.default ? `${key} [${displayName}]` : `${key} <${displayName}>`;
    }
    acc[name] = key;
    if (schema.type === "boolean" && schema.negatable && !COMMON_ARGS_KEYS.includes(name)) {
      const displayName = ctx.toKebab || schema.toKebab ? kebabnize(name) : name;
      acc[`no-${name}`] = `--no-${displayName}`;
    }
    return acc;
  }, create());
}
function resolveNegatableType(key, ctx) {
  return ctx.args[key.startsWith("no-") ? resolveNegatableKey(key) : key].type;
}
function generateDefaultDisplayValue(ctx, schema) {
  return `${ctx.translate(resolveBuiltInKey("DEFAULT"))}: ${schema.default}`;
}
function resolveDisplayValue(ctx, key) {
  if (COMMON_ARGS_KEYS.includes(key)) return "";
  const schema = ctx.args[key];
  if ((schema.type === "boolean" || schema.type === "number" || schema.type === "string" || schema.type === "custom") && schema.default !== void 0) return `(${generateDefaultDisplayValue(ctx, schema)})`;
  if (schema.type === "enum") {
    const _default = schema.default !== void 0 ? generateDefaultDisplayValue(ctx, schema) : "";
    const choices = `${ctx.translate(resolveBuiltInKey("CHOICES"))}: ${schema.choices.join(" | ")}`;
    return `(${_default ? `${_default}, ${choices}` : choices})`;
  }
  return "";
}
async function generateOptionalArgsUsage(ctx, optionsPairs) {
  const optionsMaxLength = Math.max(...Object.entries(optionsPairs).map(([_7, value]) => value.length));
  const optionSchemaMaxLength = ctx.env.usageOptionType ? Math.max(...Object.entries(optionsPairs).map(([key]) => resolveNegatableType(key, ctx).length)) : 0;
  const usages = await Promise.all(Object.entries(optionsPairs).map(([key, value]) => {
    let rawDesc = ctx.translate(resolveArgKey(key));
    if (!rawDesc && key.startsWith("no-")) {
      const name = resolveNegatableKey(key);
      const schema = ctx.args[name];
      const optionKey = makeShortLongOptionPair(schema, name, ctx.toKebab);
      rawDesc = `${ctx.translate(resolveBuiltInKey("NEGATABLE"))} ${optionKey}`;
    }
    const optionsSchema = ctx.env.usageOptionType ? `[${resolveNegatableType(key, ctx)}] ` : "";
    const valueDesc = key.startsWith("no-") ? "" : resolveDisplayValue(ctx, key);
    const desc = `${optionsSchema ? optionsSchema.padEnd(optionSchemaMaxLength + 3) : ""}${rawDesc}`;
    const option = `${value.padEnd(optionsMaxLength + ctx.env.middleMargin)}${desc}${valueDesc ? ` ${valueDesc}` : ""}`;
    return `${option.padStart(ctx.env.leftMargin + option.length)}`;
  }));
  return usages.join("\n");
}
function getPositionalArgs(ctx) {
  return Object.entries(ctx.args).filter(([_7, schema]) => schema.type === "positional");
}
async function generatePositionalArgsUsage(ctx) {
  const positionals = getPositionalArgs(ctx);
  const argsMaxLength = Math.max(...positionals.map(([name]) => name.length));
  const usages = await Promise.all(positionals.map(([name]) => {
    const desc = ctx.translate(resolveArgKey(name)) || ctx.args[name].description || "";
    const arg = `${name.padEnd(argsMaxLength + ctx.env.middleMargin)} ${desc}`;
    return `${arg.padStart(ctx.env.leftMargin + arg.length)}`;
  }));
  return usages.join("\n");
}
function generatePositionalSymbols(ctx) {
  return hasPositionalArgs(ctx) ? getPositionalArgs(ctx).map(([name]) => `<${name}>`).join(" ") : "";
}
function renderValidationErrors(_ctx, error) {
  const messages = [];
  for (const err of error.errors) messages.push(err.message);
  return Promise.resolve(messages.join("\n"));
}
var COMMON_ARGS_KEYS, resolveNegatableKey;
var init_renderer_BzRfaLdJ = __esm({
  "../../node_modules/.pnpm/gunshi@0.26.3/node_modules/gunshi/lib/renderer-BzRfaLdJ.js"() {
    init_utils_D41C8Abf();
    init_utils();
    __name(renderHeader, "renderHeader");
    COMMON_ARGS_KEYS = Object.keys(COMMON_ARGS);
    __name(renderUsage, "renderUsage");
    __name(renderPositionalArgsSection, "renderPositionalArgsSection");
    __name(renderOptionalArgsSection, "renderOptionalArgsSection");
    __name(renderExamplesSection, "renderExamplesSection");
    __name(renderUsageSection, "renderUsageSection");
    __name(renderCommandsSection, "renderCommandsSection");
    __name(resolveEntry, "resolveEntry");
    __name(resolveSubCommand, "resolveSubCommand");
    __name(resolveDescription, "resolveDescription");
    __name(resolveExamples$1, "resolveExamples$1");
    __name(hasCommands, "hasCommands");
    __name(hasOptionalArgs, "hasOptionalArgs");
    __name(hasPositionalArgs, "hasPositionalArgs");
    __name(hasAllDefaultOptions, "hasAllDefaultOptions");
    __name(generateOptionsSymbols, "generateOptionsSymbols");
    __name(makeShortLongOptionPair, "makeShortLongOptionPair");
    __name(getOptionalArgsPairs, "getOptionalArgsPairs");
    resolveNegatableKey = /* @__PURE__ */ __name((key) => key.split("no-")[1], "resolveNegatableKey");
    __name(resolveNegatableType, "resolveNegatableType");
    __name(generateDefaultDisplayValue, "generateDefaultDisplayValue");
    __name(resolveDisplayValue, "resolveDisplayValue");
    __name(generateOptionalArgsUsage, "generateOptionalArgsUsage");
    __name(getPositionalArgs, "getPositionalArgs");
    __name(generatePositionalArgsUsage, "generatePositionalArgsUsage");
    __name(generatePositionalSymbols, "generatePositionalSymbols");
    __name(renderValidationErrors, "renderValidationErrors");
  }
});

// ../../node_modules/.pnpm/args-tokens@0.20.1/node_modules/args-tokens/lib/parser-Dr4iAGaX.js
function parseArgs(args, options = {}) {
  const { allowCompatible = false } = options;
  const tokens = [];
  const remainings = [...args];
  let index = -1;
  let groupCount = 0;
  let hasShortValueSeparator = false;
  while (remainings.length > 0) {
    const arg = remainings.shift();
    if (arg == void 0) break;
    const nextArg = remainings[0];
    if (groupCount > 0) groupCount--;
    else index++;
    if (arg === TERMINATOR) {
      tokens.push({
        kind: "option-terminator",
        index
      });
      const mapped = remainings.map((arg$1) => {
        return {
          kind: "positional",
          index: ++index,
          value: arg$1
        };
      });
      tokens.push(...mapped);
      break;
    }
    if (isShortOption(arg)) {
      const shortOption = arg.charAt(1);
      let value;
      let inlineValue;
      if (groupCount) {
        tokens.push({
          kind: "option",
          name: shortOption,
          rawName: arg,
          index,
          value,
          inlineValue
        });
        if (groupCount === 1 && hasOptionValue(nextArg)) {
          value = remainings.shift();
          if (hasShortValueSeparator) {
            inlineValue = true;
            hasShortValueSeparator = false;
          }
          tokens.push({
            kind: "option",
            index,
            value,
            inlineValue
          });
        }
      } else tokens.push({
        kind: "option",
        name: shortOption,
        rawName: arg,
        index,
        value,
        inlineValue
      });
      if (value != null) ++index;
      continue;
    }
    if (isShortOptionGroup(arg)) {
      const expanded = [];
      let shortValue = "";
      for (let i2 = 1; i2 < arg.length; i2++) {
        const shortableOption = arg.charAt(i2);
        if (hasShortValueSeparator) shortValue += shortableOption;
        else if (!allowCompatible && shortableOption.codePointAt(0) === EQUAL_CODE) hasShortValueSeparator = true;
        else expanded.push(`${SHORT_OPTION_PREFIX}${shortableOption}`);
      }
      if (shortValue) expanded.push(shortValue);
      remainings.unshift(...expanded);
      groupCount = expanded.length;
      continue;
    }
    if (isLongOption(arg)) {
      const longOption = arg.slice(2);
      tokens.push({
        kind: "option",
        name: longOption,
        rawName: arg,
        index,
        value: void 0,
        inlineValue: void 0
      });
      continue;
    }
    if (isLongOptionAndValue(arg)) {
      const equalIndex = arg.indexOf(EQUAL_CHAR);
      const longOption = arg.slice(2, equalIndex);
      const value = arg.slice(equalIndex + 1);
      tokens.push({
        kind: "option",
        name: longOption,
        rawName: `${LONG_OPTION_PREFIX}${longOption}`,
        index,
        value,
        inlineValue: true
      });
      continue;
    }
    tokens.push({
      kind: "positional",
      index,
      value: arg
    });
  }
  return tokens;
}
function isShortOption(arg) {
  return arg.length === 2 && arg.codePointAt(0) === HYPHEN_CODE && arg.codePointAt(1) !== HYPHEN_CODE;
}
function isShortOptionGroup(arg) {
  if (arg.length <= 2) return false;
  if (arg.codePointAt(0) !== HYPHEN_CODE) return false;
  if (arg.codePointAt(1) === HYPHEN_CODE) return false;
  return true;
}
function isLongOption(arg) {
  return hasLongOptionPrefix(arg) && !arg.includes(EQUAL_CHAR, 3);
}
function isLongOptionAndValue(arg) {
  return hasLongOptionPrefix(arg) && arg.includes(EQUAL_CHAR, 3);
}
function hasLongOptionPrefix(arg) {
  return arg.length > 2 && ~arg.indexOf(LONG_OPTION_PREFIX);
}
function hasOptionValue(value) {
  return !(value == null) && value.codePointAt(0) !== HYPHEN_CODE;
}
var HYPHEN_CHAR, HYPHEN_CODE, EQUAL_CHAR, EQUAL_CODE, TERMINATOR, SHORT_OPTION_PREFIX, LONG_OPTION_PREFIX;
var init_parser_Dr4iAGaX = __esm({
  "../../node_modules/.pnpm/args-tokens@0.20.1/node_modules/args-tokens/lib/parser-Dr4iAGaX.js"() {
    HYPHEN_CHAR = "-";
    HYPHEN_CODE = HYPHEN_CHAR.codePointAt(0);
    EQUAL_CHAR = "=";
    EQUAL_CODE = EQUAL_CHAR.codePointAt(0);
    TERMINATOR = "--";
    SHORT_OPTION_PREFIX = HYPHEN_CHAR;
    LONG_OPTION_PREFIX = "--";
    __name(parseArgs, "parseArgs");
    __name(isShortOption, "isShortOption");
    __name(isShortOptionGroup, "isShortOptionGroup");
    __name(isLongOption, "isLongOption");
    __name(isLongOptionAndValue, "isLongOptionAndValue");
    __name(hasLongOptionPrefix, "hasLongOptionPrefix");
    __name(hasOptionValue, "hasOptionValue");
  }
});

// ../../node_modules/.pnpm/args-tokens@0.20.1/node_modules/args-tokens/lib/resolver-Q4k2fgTW.js
function resolveArgs(args, tokens, { shortGrouping = false, skipPositional = SKIP_POSITIONAL_DEFAULT, toKebab = false } = {}) {
  const skipPositionalIndex = typeof skipPositional === "number" ? Math.max(skipPositional, SKIP_POSITIONAL_DEFAULT) : SKIP_POSITIONAL_DEFAULT;
  const rest = [];
  const optionTokens = [];
  const positionalTokens = [];
  let currentLongOption;
  let currentShortOption;
  const expandableShortOptions = [];
  function toShortValue() {
    if (expandableShortOptions.length === 0) return void 0;
    else {
      const value = expandableShortOptions.map((token) => token.name).join("");
      expandableShortOptions.length = 0;
      return value;
    }
  }
  __name(toShortValue, "toShortValue");
  function applyLongOptionValue(value = void 0) {
    if (currentLongOption) {
      currentLongOption.value = value;
      optionTokens.push({ ...currentLongOption });
      currentLongOption = void 0;
    }
  }
  __name(applyLongOptionValue, "applyLongOptionValue");
  function applyShortOptionValue(value = void 0) {
    if (currentShortOption) {
      currentShortOption.value = value || toShortValue();
      optionTokens.push({ ...currentShortOption });
      currentShortOption = void 0;
    }
  }
  __name(applyShortOptionValue, "applyShortOptionValue");
  const schemas = Object.values(args);
  let terminated = false;
  for (let i2 = 0; i2 < tokens.length; i2++) {
    const token = tokens[i2];
    if (token.kind === "positional") {
      if (terminated && token.value) {
        rest.push(token.value);
        continue;
      }
      if (currentShortOption) {
        const found = schemas.find((schema) => schema.short === currentShortOption.name && schema.type === "boolean");
        if (found) positionalTokens.push({ ...token });
      } else if (currentLongOption) {
        const found = args[currentLongOption.name]?.type === "boolean";
        if (found) positionalTokens.push({ ...token });
      } else positionalTokens.push({ ...token });
      applyLongOptionValue(token.value);
      applyShortOptionValue(token.value);
    } else if (token.kind === "option") if (token.rawName) {
      if (hasLongOptionPrefix(token.rawName)) {
        applyLongOptionValue();
        if (token.inlineValue) optionTokens.push({ ...token });
        else currentLongOption = { ...token };
        applyShortOptionValue();
      } else if (isShortOption(token.rawName)) if (currentShortOption) {
        if (currentShortOption.index === token.index) if (shortGrouping) {
          currentShortOption.value = token.value;
          optionTokens.push({ ...currentShortOption });
          currentShortOption = { ...token };
        } else expandableShortOptions.push({ ...token });
        else {
          currentShortOption.value = toShortValue();
          optionTokens.push({ ...currentShortOption });
          currentShortOption = { ...token };
        }
        applyLongOptionValue();
      } else {
        currentShortOption = { ...token };
        applyLongOptionValue();
      }
    } else {
      if (currentShortOption && currentShortOption.index == token.index && token.inlineValue) {
        currentShortOption.value = token.value;
        optionTokens.push({ ...currentShortOption });
        currentShortOption = void 0;
      }
      applyLongOptionValue();
    }
    else {
      if (token.kind === "option-terminator") terminated = true;
      applyLongOptionValue();
      applyShortOptionValue();
    }
  }
  applyLongOptionValue();
  applyShortOptionValue();
  const values = /* @__PURE__ */ Object.create(null);
  const errors = [];
  function checkTokenName(option, schema, token) {
    return token.name === (schema.type === "boolean" ? schema.negatable && token.name?.startsWith("no-") ? `no-${option}` : option : option);
  }
  __name(checkTokenName, "checkTokenName");
  const positionalItemCount = tokens.filter((token) => token.kind === "positional").length;
  function getPositionalSkipIndex() {
    return Math.min(skipPositionalIndex, positionalItemCount);
  }
  __name(getPositionalSkipIndex, "getPositionalSkipIndex");
  let positionalsCount = 0;
  for (const [rawArg, schema] of Object.entries(args)) {
    const arg = toKebab || schema.toKebab ? kebabnize(rawArg) : rawArg;
    if (schema.required) {
      const found = optionTokens.find((token) => {
        return schema.short && token.name === schema.short || token.rawName && hasLongOptionPrefix(token.rawName) && token.name === arg;
      });
      if (!found) {
        errors.push(createRequireError(arg, schema));
        continue;
      }
    }
    if (schema.type === "positional") {
      if (skipPositionalIndex > SKIP_POSITIONAL_DEFAULT) while (positionalsCount <= getPositionalSkipIndex()) positionalsCount++;
      const positional = positionalTokens[positionalsCount];
      if (positional != null) values[rawArg] = positional.value;
      else errors.push(createRequireError(arg, schema));
      positionalsCount++;
      continue;
    }
    for (let i2 = 0; i2 < optionTokens.length; i2++) {
      const token = optionTokens[i2];
      if (checkTokenName(arg, schema, token) && token.rawName != void 0 && hasLongOptionPrefix(token.rawName) || schema.short === token.name && token.rawName != void 0 && isShortOption(token.rawName)) {
        const invalid = validateRequire(token, arg, schema);
        if (invalid) {
          errors.push(invalid);
          continue;
        }
        if (schema.type === "boolean") token.value = void 0;
        const [parsedValue, error] = parse(token, arg, schema);
        if (error) errors.push(error);
        else if (schema.multiple) {
          values[rawArg] ||= [];
          values[rawArg].push(parsedValue);
        } else values[rawArg] = parsedValue;
      }
    }
    if (values[rawArg] == null && schema.default != null) values[rawArg] = schema.default;
  }
  return {
    values,
    positionals: positionalTokens.map((token) => token.value),
    rest,
    error: errors.length > 0 ? new AggregateError(errors) : void 0
  };
}
function parse(token, option, schema) {
  switch (schema.type) {
    case "string":
      return typeof token.value === "string" ? [token.value || schema.default, void 0] : [void 0, createTypeError(option, schema)];
    case "boolean":
      return token.value ? [token.value || schema.default, void 0] : [!(schema.negatable && token.name.startsWith("no-")), void 0];
    case "number": {
      if (!isNumeric(token.value)) return [void 0, createTypeError(option, schema)];
      return token.value ? [+token.value, void 0] : [+(schema.default || ""), void 0];
    }
    case "enum": {
      if (schema.choices && !schema.choices.includes(token.value)) return [void 0, new ArgResolveError(`Optional argument '--${option}' ${schema.short ? `or '-${schema.short}' ` : ""}should be chosen from '${schema.type}' [${schema.choices.map((c3) => JSON.stringify(c3)).join(", ")}] values`, option, "type", schema)];
      return [token.value || schema.default, void 0];
    }
    case "custom": {
      if (typeof schema.parse !== "function") throw new TypeError(`argument '${option}' should have a 'parse' function`);
      try {
        return [schema.parse(token.value || String(schema.default || "")), void 0];
      } catch (error) {
        return [void 0, error];
      }
    }
    default:
      throw new Error(`Unsupported argument type '${schema.type}' for option '${option}'`);
  }
}
function createRequireError(option, schema) {
  const message = schema.type === "positional" ? `Positional argument '${option}' is required` : `Optional argument '--${option}' ${schema.short ? `or '-${schema.short}' ` : ""}is required`;
  return new ArgResolveError(message, option, "required", schema);
}
function validateRequire(token, option, schema) {
  if (schema.required && schema.type !== "boolean" && !token.value) return createRequireError(option, schema);
}
function isNumeric(str) {
  return str.trim() !== "" && !isNaN(str);
}
function createTypeError(option, schema) {
  return new ArgResolveError(`Optional argument '--${option}' ${schema.short ? `or '-${schema.short}' ` : ""}should be '${schema.type}'`, option, "type", schema);
}
var SKIP_POSITIONAL_DEFAULT, ArgResolveError;
var init_resolver_Q4k2fgTW = __esm({
  "../../node_modules/.pnpm/args-tokens@0.20.1/node_modules/args-tokens/lib/resolver-Q4k2fgTW.js"() {
    init_parser_Dr4iAGaX();
    init_utils_N7UlhLbz();
    SKIP_POSITIONAL_DEFAULT = -1;
    __name(resolveArgs, "resolveArgs");
    __name(parse, "parse");
    __name(createRequireError, "createRequireError");
    ArgResolveError = class extends Error {
      static {
        __name(this, "ArgResolveError");
      }
      name;
      schema;
      type;
      constructor(message, name, type, schema) {
        super(message);
        this.name = name;
        this.type = type;
        this.schema = schema;
      }
    };
    __name(validateRequire, "validateRequire");
    __name(isNumeric, "isNumeric");
    __name(createTypeError, "createTypeError");
  }
});

// ../../node_modules/.pnpm/args-tokens@0.20.1/node_modules/args-tokens/lib/index.js
var init_lib = __esm({
  "../../node_modules/.pnpm/args-tokens@0.20.1/node_modules/args-tokens/lib/index.js"() {
    init_parser_Dr4iAGaX();
    init_utils_N7UlhLbz();
    init_resolver_Q4k2fgTW();
  }
});

// ../../node_modules/.pnpm/gunshi@0.26.3/node_modules/gunshi/lib/cli-DVGNVw3h.js
async function cli(argv, entry, options = {}) {
  const cliOptions = resolveCliOptions(options, entry);
  const tokens = parseArgs(argv);
  const subCommand = getSubCommand(tokens);
  const { commandName: name, command, callMode } = await resolveCommand(subCommand, entry, cliOptions);
  if (!command) throw new Error(`Command not found: ${name || ""}`);
  const args = resolveArguments(getCommandArgs(command));
  const { values, positionals, rest, error } = resolveArgs(args, tokens, {
    shortGrouping: true,
    toKebab: command.toKebab,
    skipPositional: cliOptions.subCommands.size > 0 ? 0 : -1
  });
  const omitted = !subCommand;
  const ctx = await createCommandContext({
    args,
    values,
    positionals,
    rest,
    argv,
    tokens,
    omitted,
    callMode,
    command,
    cliOptions
  });
  if (values.version) {
    showVersion(ctx);
    return;
  }
  const usageBuffer = [];
  const header = await showHeader(ctx);
  if (header) usageBuffer.push(header);
  if (values.help) {
    const usage = await showUsage(ctx);
    if (usage) usageBuffer.push(usage);
    return usageBuffer.join("\n");
  }
  if (error) {
    await showValidationErrors(ctx, error);
    return;
  }
  await executeCommand(command, ctx, name || "");
}
function getCommandArgs(cmd) {
  if (isLazyCommand(cmd)) return cmd.args || create();
  else if (typeof cmd === "object") return cmd.args || create();
  else return create();
}
function resolveArguments(args) {
  return Object.assign(create(), args, COMMON_ARGS);
}
function resolveCliOptions(options, entry) {
  const subCommands2 = new Map(options.subCommands);
  if (options.subCommands) {
    if (isLazyCommand(entry)) subCommands2.set(entry.commandName, entry);
    else if (typeof entry === "object" && entry.name) subCommands2.set(entry.name, entry);
  }
  const resolvedOptions = Object.assign(create(), COMMAND_OPTIONS_DEFAULT, options, { subCommands: subCommands2 });
  return resolvedOptions;
}
function getSubCommand(tokens) {
  const firstToken = tokens[0];
  return firstToken && firstToken.kind === "positional" && firstToken.index === 0 && firstToken.value ? firstToken.value : "";
}
async function showUsage(ctx) {
  if (ctx.env.renderUsage === null) return;
  const usage = await (ctx.env.renderUsage || renderUsage)(ctx);
  if (usage) {
    ctx.log(usage);
    return usage;
  }
}
function showVersion(ctx) {
  ctx.log(ctx.env.version);
}
async function showHeader(ctx) {
  if (ctx.env.renderHeader === null) return;
  const header = await (ctx.env.renderHeader || renderHeader)(ctx);
  if (header) {
    ctx.log(header);
    ctx.log();
    return header;
  }
}
async function showValidationErrors(ctx, error) {
  if (ctx.env.renderValidationErrors === null) return;
  const render = ctx.env.renderValidationErrors || renderValidationErrors;
  ctx.log(await render(ctx, error));
}
async function resolveCommand(sub, entry, options) {
  const omitted = !sub;
  async function doResolveCommand() {
    if (typeof entry === "function") if ("commandName" in entry && entry.commandName) return {
      commandName: entry.commandName,
      command: entry,
      callMode: "entry"
    };
    else return {
      command: { run: entry },
      callMode: "entry"
    };
    else if (typeof entry === "object") return {
      commandName: resolveEntryName(entry),
      command: entry,
      callMode: "entry"
    };
    else return CANNOT_RESOLVE_COMMAND;
  }
  __name(doResolveCommand, "doResolveCommand");
  if (omitted || options.subCommands?.size === 0) return doResolveCommand();
  const cmd = options.subCommands?.get(sub);
  if (cmd == null) return {
    commandName: sub,
    callMode: "unexpected"
  };
  if (isLazyCommand(cmd) && cmd.commandName == null) cmd.commandName = sub;
  else if (typeof cmd === "object" && cmd.name == null) cmd.name = sub;
  return {
    commandName: sub,
    command: cmd,
    callMode: "subCommand"
  };
}
function resolveEntryName(entry) {
  return entry.name || ANONYMOUS_COMMAND_NAME;
}
async function executeCommand(cmd, ctx, name) {
  const resolved = isLazyCommand(cmd) ? await resolveLazyCommand(cmd, name, true) : cmd;
  if (resolved.run == null) throw new Error(`'run' not found on Command \`${name}\``);
  await resolved.run(ctx);
}
var CANNOT_RESOLVE_COMMAND;
var init_cli_DVGNVw3h = __esm({
  "../../node_modules/.pnpm/gunshi@0.26.3/node_modules/gunshi/lib/cli-DVGNVw3h.js"() {
    init_utils_D41C8Abf();
    init_context_D_EmfRNA();
    init_renderer_BzRfaLdJ();
    init_lib();
    __name(cli, "cli");
    __name(getCommandArgs, "getCommandArgs");
    __name(resolveArguments, "resolveArguments");
    __name(resolveCliOptions, "resolveCliOptions");
    __name(getSubCommand, "getSubCommand");
    __name(showUsage, "showUsage");
    __name(showVersion, "showVersion");
    __name(showHeader, "showHeader");
    __name(showValidationErrors, "showValidationErrors");
    CANNOT_RESOLVE_COMMAND = { callMode: "unexpected" };
    __name(resolveCommand, "resolveCommand");
    __name(resolveEntryName, "resolveEntryName");
    __name(executeCommand, "executeCommand");
  }
});

// ../../node_modules/.pnpm/gunshi@0.26.3/node_modules/gunshi/lib/index.js
var init_lib2 = __esm({
  "../../node_modules/.pnpm/gunshi@0.26.3/node_modules/gunshi/lib/index.js"() {
    init_definition_wq1Kmbvq();
    init_cli_DVGNVw3h();
    init_lib();
  }
});
async function exit(shouldManuallyExit, isSynchronous, signal) {
  if (isCalled) {
    return;
  }
  isCalled = true;
  if (asyncCallbacks.size > 0 && isSynchronous) {
    console.error([
      "SYNCHRONOUS TERMINATION NOTICE:",
      "When explicitly exiting the process via process.exit or via a parent process,",
      "asynchronous tasks in your exitHooks will not run. Either remove these tasks,",
      "use gracefulExit() instead of process.exit(), or ensure your parent process",
      "sends a SIGINT to the process running this code."
    ].join(" "));
  }
  const exitCode = 128 + signal;
  const done = /* @__PURE__ */ __name((force = false) => {
    if (force === true || shouldManuallyExit === true) {
      y2__default.default.exit(exitCode);
    }
  }, "done");
  for (const callback of callbacks) {
    callback(exitCode);
  }
  if (isSynchronous) {
    done();
    return;
  }
  const promises = [];
  let forceAfter = 0;
  for (const [callback, wait] of asyncCallbacks) {
    forceAfter = Math.max(forceAfter, wait);
    promises.push(Promise.resolve(callback(exitCode)));
  }
  const asyncTimer = setTimeout(() => {
    done(true);
  }, forceAfter);
  await Promise.all(promises);
  clearTimeout(asyncTimer);
  done();
}
function addHook(options) {
  const { onExit: onExit2, wait, isSynchronous } = options;
  const asyncCallbackConfig = [onExit2, wait];
  if (isSynchronous) {
    callbacks.add(onExit2);
  } else {
    asyncCallbacks.add(asyncCallbackConfig);
  }
  if (!isRegistered) {
    isRegistered = true;
    y2__default.default.once("beforeExit", exit.bind(void 0, true, false, -128));
    y2__default.default.once("SIGINT", exit.bind(void 0, true, false, 2));
    y2__default.default.once("SIGTERM", exit.bind(void 0, true, false, 15));
    y2__default.default.once("exit", exit.bind(void 0, false, true, 0));
    y2__default.default.on("message", (message) => {
      if (message === "shutdown") {
        exit(true, true, -128);
      }
    });
  }
  return () => {
    if (isSynchronous) {
      callbacks.delete(onExit2);
    } else {
      asyncCallbacks.delete(asyncCallbackConfig);
    }
  };
}
function asyncExitHook(onExit2, options = {}) {
  if (typeof onExit2 !== "function") {
    throw new TypeError("onExit must be a function");
  }
  if (!(typeof options.wait === "number" && options.wait > 0)) {
    throw new TypeError("wait must be set to a positive numeric value");
  }
  return addHook({
    onExit: onExit2,
    wait: options.wait,
    isSynchronous: false
  });
}
function gracefulExit(signal = 0) {
  exit(true, false, -128 + signal);
}
var asyncCallbacks, callbacks, isCalled, isRegistered;
var init_exit_hook = __esm({
  "../../node_modules/.pnpm/exit-hook@4.0.0/node_modules/exit-hook/index.js"() {
    asyncCallbacks = /* @__PURE__ */ new Set();
    callbacks = /* @__PURE__ */ new Set();
    isCalled = false;
    isRegistered = false;
    __name(exit, "exit");
    __name(addHook, "addHook");
    __name(asyncExitHook, "asyncExitHook");
    __name(gracefulExit, "gracefulExit");
  }
});

// ../../node_modules/.pnpm/ansis@4.1.0/node_modules/ansis/index.cjs
var require_ansis = __commonJS({
  "../../node_modules/.pnpm/ansis@4.1.0/node_modules/ansis/index.cjs"(exports, module) {
    var e2;
    var t;
    var r2;
    var { defineProperty: n2, setPrototypeOf: l2, create: o3, keys: s } = Object;
    var i2 = "";
    var { round: c3, max: a3 } = Math;
    var p2 = /* @__PURE__ */ __name((e3) => {
      let t2 = /([a-f\d]{3,6})/i.exec(e3)?.[1], r3 = t2?.length, n3 = parseInt(6 ^ r3 ? 3 ^ r3 ? "0" : t2[0] + t2[0] + t2[1] + t2[1] + t2[2] + t2[2] : t2, 16);
      return [n3 >> 16 & 255, n3 >> 8 & 255, 255 & n3];
    }, "p");
    var u3 = /* @__PURE__ */ __name((e3, t2, r3) => e3 ^ t2 || t2 ^ r3 ? 16 + 36 * c3(e3 / 51) + 6 * c3(t2 / 51) + c3(r3 / 51) : 8 > e3 ? 16 : e3 > 248 ? 231 : c3(24 * (e3 - 8) / 247) + 232, "u");
    var d3 = /* @__PURE__ */ __name((e3) => {
      let t2, r3, n3, l3, o4;
      return 8 > e3 ? 30 + e3 : 16 > e3 ? e3 - 8 + 90 : (232 > e3 ? (o4 = (e3 -= 16) % 36, t2 = (e3 / 36 | 0) / 5, r3 = (o4 / 6 | 0) / 5, n3 = o4 % 6 / 5) : t2 = r3 = n3 = (10 * (e3 - 232) + 8) / 255, l3 = 2 * a3(t2, r3, n3), l3 ? 30 + (c3(n3) << 2 | c3(r3) << 1 | c3(t2)) + (2 ^ l3 ? 0 : 60) : 30);
    }, "d");
    var g2 = (() => {
      let r3 = /* @__PURE__ */ __name((e3) => o4.some(((t2) => e3.test(t2))), "r"), n3 = globalThis, l3 = n3.process ?? {}, o4 = l3.argv ?? [], i3 = l3.env ?? {}, c4 = -1;
      try {
        e2 = "," + s(i3).join(",");
      } catch (e3) {
        i3 = {}, c4 = 0;
      }
      let a4 = "FORCE_COLOR", p3 = { false: 0, 0: 0, 1: 1, 2: 2, 3: 3 }[i3[a4]] ?? -1, u4 = a4 in i3 && p3 || r3(/^--color=?(true|always)?$/);
      return u4 && (c4 = p3), ~c4 || (c4 = ((r4, n4, l4) => (t = r4.TERM, { "24bit": 3, truecolor: 3, ansi256: 2, ansi: 1 }[r4.COLORTERM] || (r4.CI ? /,GITHUB/.test(e2) ? 3 : 1 : n4 && "dumb" !== t ? l4 ? 3 : /-256/.test(t) ? 2 : 1 : 0)))(i3, !!i3.PM2_HOME || i3.NEXT_RUNTIME?.includes("edge") || !!l3.stdout?.isTTY, "win32" === l3.platform)), !p3 || i3.NO_COLOR || r3(/^--(no-color|color=(false|never))$/) ? 0 : n3.window?.chrome || u4 && !c4 ? 3 : c4;
    })();
    var f = { open: i2, close: i2 };
    var h3 = 39;
    var b3 = 49;
    var O2 = {};
    var m2 = /* @__PURE__ */ __name(({ p: e3 }, { open: t2, close: n3 }) => {
      let o4 = /* @__PURE__ */ __name((e4, ...r3) => {
        if (!e4) {
          if (t2 && t2 === n3) return t2;
          if ((e4 ?? i2) === i2) return i2;
        }
        let l3, s3 = e4.raw ? String.raw({ raw: e4 }, ...r3) : i2 + e4, c5 = o4.p, a4 = c5.o, p3 = c5.c;
        if (s3.includes("\x1B")) for (; c5; c5 = c5.p) {
          let { open: e5, close: t3 } = c5, r4 = t3.length, n4 = i2, o5 = 0;
          if (r4) for (; ~(l3 = s3.indexOf(t3, o5)); o5 = l3 + r4) n4 += s3.slice(o5, l3) + e5;
          s3 = n4 + s3.slice(o5);
        }
        return a4 + (s3.includes("\n") ? s3.replace(/(\r?\n)/g, p3 + "$1" + a4) : s3) + p3;
      }, "o"), s2 = t2, c4 = n3;
      return e3 && (s2 = e3.o + t2, c4 = n3 + e3.c), l2(o4, r2), o4.p = { open: t2, close: n3, o: s2, c: c4, p: e3 }, o4.open = s2, o4.close = c4, o4;
    }, "m");
    var w2 = /* @__PURE__ */ __name(function(e3 = g2) {
      let t2 = { Ansis: w2, level: e3, isSupported: /* @__PURE__ */ __name(() => s2, "isSupported"), strip: /* @__PURE__ */ __name((e4) => e4.replace(/[][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, i2), "strip"), extend(e4) {
        for (let t3 in e4) {
          let r3 = e4[t3], l3 = (typeof r3)[0], o4 = "s" === l3 ? x2(...p2(r3)) : r3;
          O2[t3] = "f" === l3 ? { get() {
            return (...e5) => m2(this, r3(...e5));
          } } : { get() {
            let e5 = m2(this, o4);
            return n2(this, t3, { value: e5 }), e5;
          } };
        }
        return r2 = o3({}, O2), l2(t2, r2), t2;
      } }, s2 = e3 > 0, c4 = /* @__PURE__ */ __name((e4, t3) => s2 ? { open: `\x1B[${e4}m`, close: `\x1B[${t3}m` } : f, "c"), a4 = /* @__PURE__ */ __name((e4) => (t3) => e4(...p2(t3)), "a"), y4 = /* @__PURE__ */ __name((e4, t3) => (r3, n3, l3) => c4(`${e4}8;2;${r3};${n3};${l3}`, t3), "y"), R2 = /* @__PURE__ */ __name((e4, t3) => (r3, n3, l3) => c4(((e5, t4, r4) => d3(u3(e5, t4, r4)))(r3, n3, l3) + e4, t3), "R"), $3 = /* @__PURE__ */ __name((e4) => (t3, r3, n3) => e4(u3(t3, r3, n3)), "$"), x2 = y4(3, h3), T2 = y4(4, b3), v = /* @__PURE__ */ __name((e4) => c4("38;5;" + e4, h3), "v"), C2 = /* @__PURE__ */ __name((e4) => c4("48;5;" + e4, b3), "C");
      2 === e3 ? (x2 = $3(v), T2 = $3(C2)) : 1 === e3 && (x2 = R2(0, h3), T2 = R2(10, b3), v = /* @__PURE__ */ __name((e4) => c4(d3(e4), h3), "v"), C2 = /* @__PURE__ */ __name((e4) => c4(d3(e4) + 10, b3), "C"));
      let E, M2 = { fg: v, bg: C2, rgb: x2, bgRgb: T2, hex: a4(x2), bgHex: a4(T2), visible: f, reset: c4(0, 0), bold: c4(1, 22), dim: c4(2, 22), italic: c4(3, 23), underline: c4(4, 24), inverse: c4(7, 27), hidden: c4(8, 28), strikethrough: c4(9, 29) }, I2 = "Bright";
      return "black,red,green,yellow,blue,magenta,cyan,white,gray".split(",").map(((e4, t3) => {
        E = "bg" + e4[0].toUpperCase() + e4.slice(1), 8 > t3 ? (M2[e4 + I2] = c4(90 + t3, h3), M2[E + I2] = c4(100 + t3, b3)) : t3 = 60, M2[e4] = c4(30 + t3, h3), M2[E] = c4(40 + t3, b3);
      })), t2.extend(M2);
    }, "w");
    var y3 = new w2();
    module.exports = y3, y3.default = y3;
  }
});

// ../../node_modules/.pnpm/ansis@4.1.0/node_modules/ansis/index.mjs
var import_index, ansis_default, Ansis, fg, bg, rgb, bgRgb, hex, bgHex, reset, inverse, hidden, visible, bold, dim, italic, underline, strikethrough, black, red, green, yellow, blue, magenta, cyan, white, gray, redBright, greenBright, yellowBright, blueBright, magentaBright, cyanBright, whiteBright, bgBlack, bgRed, bgGreen, bgYellow, bgBlue, bgMagenta, bgCyan, bgWhite, bgGray, bgRedBright, bgGreenBright, bgYellowBright, bgBlueBright, bgMagentaBright, bgCyanBright, bgWhiteBright;
var init_ansis = __esm({
  "../../node_modules/.pnpm/ansis@4.1.0/node_modules/ansis/index.mjs"() {
    import_index = __toESM(require_ansis());
    ansis_default = import_index.default;
    ({ Ansis, fg, bg, rgb, bgRgb, hex, bgHex, reset, inverse, hidden, visible, bold, dim, italic, underline, strikethrough, black, red, green, yellow, blue, magenta, cyan, white, gray, redBright, greenBright, yellowBright, blueBright, magentaBright, cyanBright, whiteBright, bgBlack, bgRed, bgGreen, bgYellow, bgBlue, bgMagenta, bgCyan, bgWhite, bgGray, bgRedBright, bgGreenBright, bgYellowBright, bgBlueBright, bgMagentaBright, bgCyanBright, bgWhiteBright } = import_index.default);
  }
});

// ../../node_modules/.pnpm/@sindresorhus+is@7.0.2/node_modules/@sindresorhus/is/distribution/index.js
function isTypedArrayName(name) {
  return typedArrayTypeNames.includes(name);
}
function isObjectTypeName(name) {
  return objectTypeNames.includes(name);
}
function isPrimitiveTypeName(name) {
  return primitiveTypeNames.includes(name);
}
function detect(value) {
  if (value === null) {
    return "null";
  }
  switch (typeof value) {
    case "undefined": {
      return "undefined";
    }
    case "string": {
      return "string";
    }
    case "number": {
      return Number.isNaN(value) ? "NaN" : "number";
    }
    case "boolean": {
      return "boolean";
    }
    case "function": {
      return "Function";
    }
    case "bigint": {
      return "bigint";
    }
    case "symbol": {
      return "symbol";
    }
  }
  if (isObservable(value)) {
    return "Observable";
  }
  if (isArray(value)) {
    return "Array";
  }
  if (isBuffer(value)) {
    return "Buffer";
  }
  const tagType = getObjectType(value);
  if (tagType) {
    return tagType;
  }
  if (value instanceof String || value instanceof Boolean || value instanceof Number) {
    throw new TypeError("Please don't use object wrappers for primitive types");
  }
  return "Object";
}
function hasPromiseApi(value) {
  return isFunction(value?.then) && isFunction(value?.catch);
}
function isAbsoluteModule2(remainder) {
  return (value) => isInteger(value) && Math.abs(value % 2) === remainder;
}
function isAll(predicate, ...values) {
  return predicateOnArray(Array.prototype.every, predicate, values);
}
function isAny(predicate, ...values) {
  const predicates = isArray(predicate) ? predicate : [predicate];
  return predicates.some((singlePredicate) => predicateOnArray(Array.prototype.some, singlePredicate, values));
}
function isArray(value, assertion) {
  if (!Array.isArray(value)) {
    return false;
  }
  if (!isFunction(assertion)) {
    return true;
  }
  return value.every((element) => assertion(element));
}
function isArrayBuffer(value) {
  return getObjectType(value) === "ArrayBuffer";
}
function isArrayLike(value) {
  return !isNullOrUndefined(value) && !isFunction(value) && isValidLength(value.length);
}
function isAsyncFunction(value) {
  return getObjectType(value) === "AsyncFunction";
}
function isAsyncGenerator(value) {
  return isAsyncIterable(value) && isFunction(value.next) && isFunction(value.throw);
}
function isAsyncGeneratorFunction(value) {
  return getObjectType(value) === "AsyncGeneratorFunction";
}
function isAsyncIterable(value) {
  return isFunction(value?.[Symbol.asyncIterator]);
}
function isBigint(value) {
  return typeof value === "bigint";
}
function isBigInt64Array(value) {
  return getObjectType(value) === "BigInt64Array";
}
function isBigUint64Array(value) {
  return getObjectType(value) === "BigUint64Array";
}
function isBlob(value) {
  return getObjectType(value) === "Blob";
}
function isBoolean(value) {
  return value === true || value === false;
}
function isBoundFunction(value) {
  return isFunction(value) && !Object.hasOwn(value, "prototype");
}
function isBuffer(value) {
  return value?.constructor?.isBuffer?.(value) ?? false;
}
function isClass(value) {
  return isFunction(value) && value.toString().startsWith("class ");
}
function isDataView(value) {
  return getObjectType(value) === "DataView";
}
function isDate(value) {
  return getObjectType(value) === "Date";
}
function isDirectInstanceOf(instance, class_) {
  if (instance === void 0 || instance === null) {
    return false;
  }
  return Object.getPrototypeOf(instance) === class_.prototype;
}
function isEmptyArray(value) {
  return isArray(value) && value.length === 0;
}
function isEmptyMap(value) {
  return isMap(value) && value.size === 0;
}
function isEmptyObject(value) {
  return isObject(value) && !isMap(value) && !isSet(value) && Object.keys(value).length === 0;
}
function isEmptySet(value) {
  return isSet(value) && value.size === 0;
}
function isEmptyString(value) {
  return isString(value) && value.length === 0;
}
function isEmptyStringOrWhitespace(value) {
  return isEmptyString(value) || isWhitespaceString(value);
}
function isEnumCase(value, targetEnum) {
  return Object.values(targetEnum).includes(value);
}
function isError(value) {
  return getObjectType(value) === "Error";
}
function isEvenInteger(value) {
  return isAbsoluteModule2(0)(value);
}
function isFalsy(value) {
  return !value;
}
function isFloat32Array(value) {
  return getObjectType(value) === "Float32Array";
}
function isFloat64Array(value) {
  return getObjectType(value) === "Float64Array";
}
function isFormData(value) {
  return getObjectType(value) === "FormData";
}
function isFunction(value) {
  return typeof value === "function";
}
function isGenerator(value) {
  return isIterable(value) && isFunction(value?.next) && isFunction(value?.throw);
}
function isGeneratorFunction(value) {
  return getObjectType(value) === "GeneratorFunction";
}
function isHtmlElement(value) {
  return isObject(value) && value.nodeType === NODE_TYPE_ELEMENT && isString(value.nodeName) && !isPlainObject(value) && DOM_PROPERTIES_TO_CHECK.every((property) => property in value);
}
function isInfinite(value) {
  return value === Number.POSITIVE_INFINITY || value === Number.NEGATIVE_INFINITY;
}
function isInRange(value, range) {
  if (isNumber(range)) {
    return value >= Math.min(0, range) && value <= Math.max(range, 0);
  }
  if (isArray(range) && range.length === 2) {
    return value >= Math.min(...range) && value <= Math.max(...range);
  }
  throw new TypeError(`Invalid range: ${JSON.stringify(range)}`);
}
function isInt16Array(value) {
  return getObjectType(value) === "Int16Array";
}
function isInt32Array(value) {
  return getObjectType(value) === "Int32Array";
}
function isInt8Array(value) {
  return getObjectType(value) === "Int8Array";
}
function isInteger(value) {
  return Number.isInteger(value);
}
function isIterable(value) {
  return isFunction(value?.[Symbol.iterator]);
}
function isMap(value) {
  return getObjectType(value) === "Map";
}
function isNan(value) {
  return Number.isNaN(value);
}
function isNativePromise(value) {
  return getObjectType(value) === "Promise";
}
function isNegativeNumber(value) {
  return isNumber(value) && value < 0;
}
function isNodeStream(value) {
  return isObject(value) && isFunction(value.pipe) && !isObservable(value);
}
function isNonEmptyArray(value) {
  return isArray(value) && value.length > 0;
}
function isNonEmptyMap(value) {
  return isMap(value) && value.size > 0;
}
function isNonEmptyObject(value) {
  return isObject(value) && !isMap(value) && !isSet(value) && Object.keys(value).length > 0;
}
function isNonEmptySet(value) {
  return isSet(value) && value.size > 0;
}
function isNonEmptyString(value) {
  return isString(value) && value.length > 0;
}
function isNonEmptyStringAndNotWhitespace(value) {
  return isString(value) && !isEmptyStringOrWhitespace(value);
}
function isNull(value) {
  return value === null;
}
function isNullOrUndefined(value) {
  return isNull(value) || isUndefined(value);
}
function isNumber(value) {
  return typeof value === "number" && !Number.isNaN(value);
}
function isNumericString(value) {
  return isString(value) && !isEmptyStringOrWhitespace(value) && !Number.isNaN(Number(value));
}
function isObject(value) {
  return !isNull(value) && (typeof value === "object" || isFunction(value));
}
function isObservable(value) {
  if (!value) {
    return false;
  }
  if (Symbol.observable !== void 0 && value === value[Symbol.observable]?.()) {
    return true;
  }
  if (value === value["@@observable"]?.()) {
    return true;
  }
  return false;
}
function isOddInteger(value) {
  return isAbsoluteModule2(1)(value);
}
function isPlainObject(value) {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in value) && !(Symbol.iterator in value);
}
function isPositiveNumber(value) {
  return isNumber(value) && value > 0;
}
function isPrimitive(value) {
  return isNull(value) || isPrimitiveTypeName(typeof value);
}
function isPromise(value) {
  return isNativePromise(value) || hasPromiseApi(value);
}
function isPropertyKey(value) {
  return isAny([isString, isNumber, isSymbol], value);
}
function isRegExp(value) {
  return getObjectType(value) === "RegExp";
}
function isSafeInteger(value) {
  return Number.isSafeInteger(value);
}
function isSet(value) {
  return getObjectType(value) === "Set";
}
function isSharedArrayBuffer(value) {
  return getObjectType(value) === "SharedArrayBuffer";
}
function isString(value) {
  return typeof value === "string";
}
function isSymbol(value) {
  return typeof value === "symbol";
}
function isTruthy(value) {
  return Boolean(value);
}
function isTupleLike(value, guards) {
  if (isArray(guards) && isArray(value) && guards.length === value.length) {
    return guards.every((guard, index) => guard(value[index]));
  }
  return false;
}
function isTypedArray(value) {
  return isTypedArrayName(getObjectType(value));
}
function isUint16Array(value) {
  return getObjectType(value) === "Uint16Array";
}
function isUint32Array(value) {
  return getObjectType(value) === "Uint32Array";
}
function isUint8Array(value) {
  return getObjectType(value) === "Uint8Array";
}
function isUint8ClampedArray(value) {
  return getObjectType(value) === "Uint8ClampedArray";
}
function isUndefined(value) {
  return value === void 0;
}
function isUrlInstance(value) {
  return getObjectType(value) === "URL";
}
function isUrlSearchParams(value) {
  return getObjectType(value) === "URLSearchParams";
}
function isUrlString(value) {
  if (!isString(value)) {
    return false;
  }
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}
function isValidDate(value) {
  return isDate(value) && !isNan(Number(value));
}
function isValidLength(value) {
  return isSafeInteger(value) && value >= 0;
}
function isWeakMap(value) {
  return getObjectType(value) === "WeakMap";
}
function isWeakRef(value) {
  return getObjectType(value) === "WeakRef";
}
function isWeakSet(value) {
  return getObjectType(value) === "WeakSet";
}
function isWhitespaceString(value) {
  return isString(value) && /^\s+$/.test(value);
}
function predicateOnArray(method, predicate, values) {
  if (!isFunction(predicate)) {
    throw new TypeError(`Invalid predicate: ${JSON.stringify(predicate)}`);
  }
  if (values.length === 0) {
    throw new TypeError("Invalid number of values");
  }
  return method.call(values, predicate);
}
function keysOf(value) {
  return Object.keys(value);
}
var typedArrayTypeNames, objectTypeNames, primitiveTypeNames, getObjectType, NODE_TYPE_ELEMENT, DOM_PROPERTIES_TO_CHECK;
var init_distribution = __esm({
  "../../node_modules/.pnpm/@sindresorhus+is@7.0.2/node_modules/@sindresorhus/is/distribution/index.js"() {
    typedArrayTypeNames = [
      "Int8Array",
      "Uint8Array",
      "Uint8ClampedArray",
      "Int16Array",
      "Uint16Array",
      "Int32Array",
      "Uint32Array",
      "Float32Array",
      "Float64Array",
      "BigInt64Array",
      "BigUint64Array"
    ];
    __name(isTypedArrayName, "isTypedArrayName");
    objectTypeNames = [
      "Function",
      "Generator",
      "AsyncGenerator",
      "GeneratorFunction",
      "AsyncGeneratorFunction",
      "AsyncFunction",
      "Observable",
      "Array",
      "Buffer",
      "Blob",
      "Object",
      "RegExp",
      "Date",
      "Error",
      "Map",
      "Set",
      "WeakMap",
      "WeakSet",
      "WeakRef",
      "ArrayBuffer",
      "SharedArrayBuffer",
      "DataView",
      "Promise",
      "URL",
      "FormData",
      "URLSearchParams",
      "HTMLElement",
      "NaN",
      ...typedArrayTypeNames
    ];
    __name(isObjectTypeName, "isObjectTypeName");
    primitiveTypeNames = [
      "null",
      "undefined",
      "string",
      "number",
      "bigint",
      "boolean",
      "symbol"
    ];
    __name(isPrimitiveTypeName, "isPrimitiveTypeName");
    [
      "positive number",
      "negative number",
      "Class",
      "string with a number",
      "null or undefined",
      "Iterable",
      "AsyncIterable",
      "native Promise",
      "EnumCase",
      "string with a URL",
      "truthy",
      "falsy",
      "primitive",
      "integer",
      "plain object",
      "TypedArray",
      "array-like",
      "tuple-like",
      "Node.js Stream",
      "infinite number",
      "empty array",
      "non-empty array",
      "empty string",
      "empty string or whitespace",
      "non-empty string",
      "non-empty string and not whitespace",
      "empty object",
      "non-empty object",
      "empty set",
      "non-empty set",
      "empty map",
      "non-empty map",
      "PropertyKey",
      "even integer",
      "odd integer",
      "T",
      "in range",
      "predicate returns truthy for any value",
      "predicate returns truthy for all values",
      "valid Date",
      "valid length",
      "whitespace string",
      ...objectTypeNames,
      ...primitiveTypeNames
    ];
    getObjectType = /* @__PURE__ */ __name((value) => {
      const objectTypeName = Object.prototype.toString.call(value).slice(8, -1);
      if (/HTML\w+Element/.test(objectTypeName) && isHtmlElement(value)) {
        return "HTMLElement";
      }
      if (isObjectTypeName(objectTypeName)) {
        return objectTypeName;
      }
      return void 0;
    }, "getObjectType");
    __name(detect, "detect");
    __name(hasPromiseApi, "hasPromiseApi");
    Object.assign(detect, {
      all: isAll,
      any: isAny,
      array: isArray,
      arrayBuffer: isArrayBuffer,
      arrayLike: isArrayLike,
      asyncFunction: isAsyncFunction,
      asyncGenerator: isAsyncGenerator,
      asyncGeneratorFunction: isAsyncGeneratorFunction,
      asyncIterable: isAsyncIterable,
      bigint: isBigint,
      bigInt64Array: isBigInt64Array,
      bigUint64Array: isBigUint64Array,
      blob: isBlob,
      boolean: isBoolean,
      boundFunction: isBoundFunction,
      buffer: isBuffer,
      class: isClass,
      dataView: isDataView,
      date: isDate,
      detect,
      directInstanceOf: isDirectInstanceOf,
      emptyArray: isEmptyArray,
      emptyMap: isEmptyMap,
      emptyObject: isEmptyObject,
      emptySet: isEmptySet,
      emptyString: isEmptyString,
      emptyStringOrWhitespace: isEmptyStringOrWhitespace,
      enumCase: isEnumCase,
      error: isError,
      evenInteger: isEvenInteger,
      falsy: isFalsy,
      float32Array: isFloat32Array,
      float64Array: isFloat64Array,
      formData: isFormData,
      function: isFunction,
      generator: isGenerator,
      generatorFunction: isGeneratorFunction,
      htmlElement: isHtmlElement,
      infinite: isInfinite,
      inRange: isInRange,
      int16Array: isInt16Array,
      int32Array: isInt32Array,
      int8Array: isInt8Array,
      integer: isInteger,
      iterable: isIterable,
      map: isMap,
      nan: isNan,
      nativePromise: isNativePromise,
      negativeNumber: isNegativeNumber,
      nodeStream: isNodeStream,
      nonEmptyArray: isNonEmptyArray,
      nonEmptyMap: isNonEmptyMap,
      nonEmptyObject: isNonEmptyObject,
      nonEmptySet: isNonEmptySet,
      nonEmptyString: isNonEmptyString,
      nonEmptyStringAndNotWhitespace: isNonEmptyStringAndNotWhitespace,
      null: isNull,
      nullOrUndefined: isNullOrUndefined,
      number: isNumber,
      numericString: isNumericString,
      object: isObject,
      observable: isObservable,
      oddInteger: isOddInteger,
      plainObject: isPlainObject,
      positiveNumber: isPositiveNumber,
      primitive: isPrimitive,
      promise: isPromise,
      propertyKey: isPropertyKey,
      regExp: isRegExp,
      safeInteger: isSafeInteger,
      set: isSet,
      sharedArrayBuffer: isSharedArrayBuffer,
      string: isString,
      symbol: isSymbol,
      truthy: isTruthy,
      tupleLike: isTupleLike,
      typedArray: isTypedArray,
      uint16Array: isUint16Array,
      uint32Array: isUint32Array,
      uint8Array: isUint8Array,
      uint8ClampedArray: isUint8ClampedArray,
      undefined: isUndefined,
      urlInstance: isUrlInstance,
      urlSearchParams: isUrlSearchParams,
      urlString: isUrlString,
      validDate: isValidDate,
      validLength: isValidLength,
      weakMap: isWeakMap,
      weakRef: isWeakRef,
      weakSet: isWeakSet,
      whitespaceString: isWhitespaceString
    });
    __name(isAbsoluteModule2, "isAbsoluteModule2");
    __name(isAll, "isAll");
    __name(isAny, "isAny");
    __name(isArray, "isArray");
    __name(isArrayBuffer, "isArrayBuffer");
    __name(isArrayLike, "isArrayLike");
    __name(isAsyncFunction, "isAsyncFunction");
    __name(isAsyncGenerator, "isAsyncGenerator");
    __name(isAsyncGeneratorFunction, "isAsyncGeneratorFunction");
    __name(isAsyncIterable, "isAsyncIterable");
    __name(isBigint, "isBigint");
    __name(isBigInt64Array, "isBigInt64Array");
    __name(isBigUint64Array, "isBigUint64Array");
    __name(isBlob, "isBlob");
    __name(isBoolean, "isBoolean");
    __name(isBoundFunction, "isBoundFunction");
    __name(isBuffer, "isBuffer");
    __name(isClass, "isClass");
    __name(isDataView, "isDataView");
    __name(isDate, "isDate");
    __name(isDirectInstanceOf, "isDirectInstanceOf");
    __name(isEmptyArray, "isEmptyArray");
    __name(isEmptyMap, "isEmptyMap");
    __name(isEmptyObject, "isEmptyObject");
    __name(isEmptySet, "isEmptySet");
    __name(isEmptyString, "isEmptyString");
    __name(isEmptyStringOrWhitespace, "isEmptyStringOrWhitespace");
    __name(isEnumCase, "isEnumCase");
    __name(isError, "isError");
    __name(isEvenInteger, "isEvenInteger");
    __name(isFalsy, "isFalsy");
    __name(isFloat32Array, "isFloat32Array");
    __name(isFloat64Array, "isFloat64Array");
    __name(isFormData, "isFormData");
    __name(isFunction, "isFunction");
    __name(isGenerator, "isGenerator");
    __name(isGeneratorFunction, "isGeneratorFunction");
    NODE_TYPE_ELEMENT = 1;
    DOM_PROPERTIES_TO_CHECK = [
      "innerHTML",
      "ownerDocument",
      "style",
      "attributes",
      "nodeValue"
    ];
    __name(isHtmlElement, "isHtmlElement");
    __name(isInfinite, "isInfinite");
    __name(isInRange, "isInRange");
    __name(isInt16Array, "isInt16Array");
    __name(isInt32Array, "isInt32Array");
    __name(isInt8Array, "isInt8Array");
    __name(isInteger, "isInteger");
    __name(isIterable, "isIterable");
    __name(isMap, "isMap");
    __name(isNan, "isNan");
    __name(isNativePromise, "isNativePromise");
    __name(isNegativeNumber, "isNegativeNumber");
    __name(isNodeStream, "isNodeStream");
    __name(isNonEmptyArray, "isNonEmptyArray");
    __name(isNonEmptyMap, "isNonEmptyMap");
    __name(isNonEmptyObject, "isNonEmptyObject");
    __name(isNonEmptySet, "isNonEmptySet");
    __name(isNonEmptyString, "isNonEmptyString");
    __name(isNonEmptyStringAndNotWhitespace, "isNonEmptyStringAndNotWhitespace");
    __name(isNull, "isNull");
    __name(isNullOrUndefined, "isNullOrUndefined");
    __name(isNumber, "isNumber");
    __name(isNumericString, "isNumericString");
    __name(isObject, "isObject");
    __name(isObservable, "isObservable");
    __name(isOddInteger, "isOddInteger");
    __name(isPlainObject, "isPlainObject");
    __name(isPositiveNumber, "isPositiveNumber");
    __name(isPrimitive, "isPrimitive");
    __name(isPromise, "isPromise");
    __name(isPropertyKey, "isPropertyKey");
    __name(isRegExp, "isRegExp");
    __name(isSafeInteger, "isSafeInteger");
    __name(isSet, "isSet");
    __name(isSharedArrayBuffer, "isSharedArrayBuffer");
    __name(isString, "isString");
    __name(isSymbol, "isSymbol");
    __name(isTruthy, "isTruthy");
    __name(isTupleLike, "isTupleLike");
    __name(isTypedArray, "isTypedArray");
    __name(isUint16Array, "isUint16Array");
    __name(isUint32Array, "isUint32Array");
    __name(isUint8Array, "isUint8Array");
    __name(isUint8ClampedArray, "isUint8ClampedArray");
    __name(isUndefined, "isUndefined");
    __name(isUrlInstance, "isUrlInstance");
    __name(isUrlSearchParams, "isUrlSearchParams");
    __name(isUrlString, "isUrlString");
    __name(isValidDate, "isValidDate");
    __name(isValidLength, "isValidLength");
    __name(isWeakMap, "isWeakMap");
    __name(isWeakRef, "isWeakRef");
    __name(isWeakSet, "isWeakSet");
    __name(isWhitespaceString, "isWhitespaceString");
    __name(predicateOnArray, "predicateOnArray");
    __name(keysOf, "keysOf");
  }
});

// ../utils/src/my-dash.ts
function keyBy(array, key) {
  return (array || []).reduce((r2, x2) => ({ ...r2, [String(x2[key])]: x2 }), {});
}
function sortBy(array, compareBy) {
  if (typeof compareBy === "function") {
    const compareMap = /* @__PURE__ */ new Map();
    array.forEach((item) => {
      compareMap.set(item, compareBy(item));
    });
    return array.concat().sort(
      (a3, b3) => compareMap.get(a3) - compareMap.get(b3)
    );
  } else {
    return array.concat().sort(
      (a3, b3) => {
        if (a3[compareBy] > b3[compareBy]) return 1;
        return b3[compareBy] > a3[compareBy] ? -1 : 0;
      }
    );
  }
}
function compact(array) {
  return array.filter((item) => item !== void 0 && item !== false && item !== null);
}
function filter(array, fn) {
  return array.filter(fn);
}
function each(array, fn) {
  if (Array.isArray(array)) {
    array.forEach((item, index) => fn(item, String(index)));
  } else {
    Object.entries(array).forEach(([key, value]) => fn(value, key));
  }
}
function castArray(value) {
  return Array.isArray(value) ? value : [value];
}
function mapValues(obj, fn) {
  return Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, fn(value)]));
}
function times(count2, fn) {
  return Array.from({ length: count2 }, (_7, i2) => fn(i2));
}
function map(array, fn) {
  return array.map(fn);
}
function flatMap(array, fn) {
  return array.flatMap(fn);
}
var _, my_dash_default;
var init_my_dash = __esm({
  "../utils/src/my-dash.ts"() {
    init_distribution();
    __name(keyBy, "keyBy");
    __name(sortBy, "sortBy");
    __name(compact, "compact");
    __name(filter, "filter");
    __name(each, "each");
    __name(castArray, "castArray");
    __name(mapValues, "mapValues");
    __name(times, "times");
    __name(map, "map");
    __name(flatMap, "flatMap");
    _ = {
      keyBy,
      sortBy,
      compact,
      keys: Object.keys,
      values: Object.values,
      some: /* @__PURE__ */ __name((a3, fn) => a3.some(fn), "some"),
      filter,
      each,
      castArray,
      mapValues,
      times,
      map,
      flatMap,
      // type checks
      isString,
      isBoolean,
      isError,
      isPromise,
      isFunction,
      isNan,
      isNumber,
      isPlainObject,
      isArray,
      isInteger
    };
    my_dash_default = _;
  }
});

// ../env-spec-parser/dist/chunk-RQYYQO3M.mjs
function autoCoerce(valStr) {
  if (valStr === "true") return true;
  if (valStr === "false") return false;
  if (valStr === "undefined") return void 0;
  if (VALID_NUMBER_REGEX.test(valStr)) return Number(valStr);
  return valStr;
}
function getDecoratorsObject(comments) {
  const decObj = {};
  comments.forEach((comment) => {
    if (comment instanceof ParsedEnvSpecDecoratorComment) {
      comment.decorators.forEach((decorator) => {
        decObj[decorator.name] = decorator;
      });
    }
  });
  return decObj;
}
function expandExecs(staticVal, _opts) {
  if (typeof staticVal.value !== "string") return staticVal;
  const quote = staticVal.data.quote;
  const quoteStr = quote ?? "";
  if (quote === "'") return staticVal;
  const execMatches = Array.from(staticVal.value.matchAll(EXPAND_EXEC_REGEX));
  if (execMatches.length === 0) return staticVal;
  let lastIndex = 0;
  const parts = [];
  for (const match of execMatches) {
    if (lastIndex < match.index) {
      const preText = staticVal.value.slice(lastIndex, match.index);
      parts.push(new ParsedEnvSpecStaticValue({ rawValue: `${quoteStr}${preText}${quoteStr}`, quote }));
    }
    const shellCmd = match[1];
    parts.push(new ParsedEnvSpecFunctionCall({
      name: "exec",
      args: new ParsedEnvSpecFunctionArgs({
        values: [new ParsedEnvSpecStaticValue({ rawValue: `${quoteStr}${shellCmd}${quoteStr}`, quote })]
      })
    }));
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < staticVal.value.length) {
    const postText = staticVal.value.slice(lastIndex);
    parts.push(new ParsedEnvSpecStaticValue({ rawValue: `${quoteStr}${postText}${quoteStr}`, quote }));
  }
  if (parts.length === 1) return parts[0];
  return new ParsedEnvSpecFunctionCall({
    name: "concat",
    args: new ParsedEnvSpecFunctionArgs({
      values: parts
    })
  });
}
function expandRefs(staticVal, mode) {
  if (typeof staticVal.value !== "string") return staticVal;
  const quote = staticVal.data.quote;
  const quoteStr = quote ?? "";
  if (quote === "'") return staticVal;
  const varMatches = Array.from(staticVal.value.matchAll(mode === "simple" ? EXPAND_VAR_SIMPLE_REGEX : EXPAND_VAR_BRACKETED_REGEX));
  if (varMatches.length === 0) return staticVal;
  let lastIndex = 0;
  const parts = [];
  for (const match of varMatches) {
    if (lastIndex < match.index) {
      const preText = staticVal.value.slice(lastIndex, match.index);
      parts.push(new ParsedEnvSpecStaticValue({ rawValue: `${quoteStr}${preText}${quoteStr}`, quote }));
    }
    const varName = match[1];
    let defaultVal;
    if (mode === "bracketed") {
      match[3];
      defaultVal = match[4];
    }
    const refFnCall = new ParsedEnvSpecFunctionCall({
      name: "ref",
      args: new ParsedEnvSpecFunctionArgs({
        values: [new ParsedEnvSpecStaticValue({ rawValue: varName })]
      })
    });
    if (defaultVal) {
      parts.push(new ParsedEnvSpecFunctionCall({
        name: "fallback",
        args: new ParsedEnvSpecFunctionArgs({
          values: [refFnCall, new ParsedEnvSpecStaticValue({ rawValue: `${quoteStr}${defaultVal}${quoteStr}`, quote })]
        })
      }));
    } else {
      parts.push(refFnCall);
    }
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < staticVal.value.length) {
    const postText = staticVal.value.slice(lastIndex);
    parts.push(new ParsedEnvSpecStaticValue({ rawValue: `${quoteStr}${postText}${quoteStr}`, quote }));
  }
  if (parts.length === 1) return parts[0];
  return new ParsedEnvSpecFunctionCall({
    name: "concat",
    args: new ParsedEnvSpecFunctionArgs({
      values: parts
    })
  });
}
function expandHelper(val, expandStaticFn) {
  if (val instanceof ParsedEnvSpecFunctionCall) {
    const fnName = val.name;
    const newConcatArgs = [];
    val.data.args.values.forEach((v) => {
      const expandedArg = expandHelper(v, expandStaticFn);
      if (fnName === "concat" && expandedArg instanceof ParsedEnvSpecFunctionCall && expandedArg.name === "concat") {
        newConcatArgs.push(...expandedArg.data.args.values);
      } else {
        newConcatArgs.push(expandedArg);
      }
    });
    return new ParsedEnvSpecFunctionCall({
      name: fnName,
      args: new ParsedEnvSpecFunctionArgs({
        values: newConcatArgs
      })
    });
  } else if (val instanceof ParsedEnvSpecKeyValuePair) {
    const expandedVal = expandHelper(val.value, expandStaticFn);
    if (expandedVal instanceof ParsedEnvSpecKeyValuePair) throw new Error("Nested key-value pair found in concat");
    return new ParsedEnvSpecKeyValuePair({
      key: val.key,
      val: expandedVal
    });
  } else if (val instanceof ParsedEnvSpecStaticValue) {
    if (typeof val.value !== "string") return val;
    if (val.data.quote === "'") return val;
    return expandStaticFn(val);
  }
  throw new Error("Unknown value type");
}
function expand(val, _opts) {
  let expandedVal = val;
  expandedVal = expandHelper(expandedVal, (v) => expandExecs(v));
  expandedVal = expandHelper(expandedVal, (v) => expandRefs(v, "simple"));
  expandedVal = expandHelper(expandedVal, (v) => expandRefs(v, "bracketed"));
  return expandedVal;
}
var __defProp2, __name2, VALID_NUMBER_REGEX, ParsedEnvSpecDivider, ParsedEnvSpecStaticValue, ParsedEnvSpecKeyValuePair, ParsedEnvSpecFunctionArgs, ParsedEnvSpecFunctionCall, ParsedEnvSpecDecorator, ParsedEnvSpecComment, ParsedEnvSpecDecoratorComment, ParsedEnvSpecCommentBlock, ParsedEnvSpecBlankLine, ParsedEnvSpecConfigItem, ParsedEnvSpecFile, EXPAND_VAR_BRACKETED_REGEX, EXPAND_VAR_SIMPLE_REGEX, EXPAND_EXEC_REGEX;
var init_chunk_RQYYQO3M = __esm({
  "../env-spec-parser/dist/chunk-RQYYQO3M.mjs"() {
    __defProp2 = Object.defineProperty;
    __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
    VALID_NUMBER_REGEX = /^(0|([1-9][0-9]*))?(\.[0-9]+)?$/;
    __name(autoCoerce, "autoCoerce");
    __name2(autoCoerce, "autoCoerce");
    ParsedEnvSpecDivider = class {
      static {
        __name(this, "ParsedEnvSpecDivider");
      }
      constructor(data) {
        this.data = data;
      }
      static {
        __name2(this, "ParsedEnvSpecDivider");
      }
      toString() {
        return `#${this.data.leadingSpace || ""}${this.data.contents}`;
      }
    };
    ParsedEnvSpecStaticValue = class {
      static {
        __name(this, "ParsedEnvSpecStaticValue");
      }
      constructor(data) {
        this.data = data;
        if (!data.quote) {
          if (typeof data.rawValue === "string") {
            const trimmed = data.rawValue.trim();
            if (trimmed === "") this.value = void 0;
            else this.value = autoCoerce(trimmed);
          } else {
            this.value = autoCoerce(data.rawValue);
          }
        } else {
          const quoteChar = data.quote.substring(0, 1);
          this.value = data.rawValue.slice(data.quote.length, -1 * data.quote.length).replaceAll(`\\${quoteChar}`, quoteChar);
        }
      }
      static {
        __name2(this, "ParsedEnvSpecStaticValue");
      }
      value;
      get unescapedValue() {
        if (typeof this.value !== "string") return this.value;
        let unescaped = this.value;
        if (this.data.quote !== "'") {
          unescaped = unescaped.replaceAll("\\$", "$");
        }
        if (this.data.quote === '"' || this.data.quote === "`") {
          unescaped = unescaped.replaceAll("\\n", "\n");
        }
        return unescaped;
      }
      toString() {
        let strVal = String(this.value);
        if (this.data.quote) {
          strVal = strVal.replaceAll(this.data.quote, `\\${this.data.quote}`);
        }
        return `${this.data.quote || ""}${strVal}${this.data.quote || ""}`;
      }
    };
    ParsedEnvSpecKeyValuePair = class {
      static {
        __name(this, "ParsedEnvSpecKeyValuePair");
      }
      constructor(data) {
        this.data = data;
      }
      static {
        __name2(this, "ParsedEnvSpecKeyValuePair");
      }
      get key() {
        return this.data.key;
      }
      get value() {
        return this.data.val;
      }
      toString() {
        return `${this.key}=${this.data.val.toString()}`;
      }
    };
    ParsedEnvSpecFunctionArgs = class {
      static {
        __name(this, "ParsedEnvSpecFunctionArgs");
      }
      constructor(data) {
        this.data = data;
      }
      static {
        __name2(this, "ParsedEnvSpecFunctionArgs");
      }
      get values() {
        return this.data.values;
      }
      get simplifiedValues() {
        if (this.data.values.length === 0) return [];
        const vals = this.data.values;
        if (vals.every((i2) => i2 instanceof ParsedEnvSpecStaticValue)) {
          return vals.map((val) => val.value);
        } else if (vals.every((i2) => i2 instanceof ParsedEnvSpecKeyValuePair)) {
          const obj = {};
          vals.forEach((val) => {
            if (val.value instanceof ParsedEnvSpecStaticValue) {
              obj[val.key] = val.value.value;
            }
          });
          return obj;
        } else {
          throw new Error("Invalid function args");
        }
      }
      toString() {
        let s = "(";
        s += this.data.values.map((val) => val.toString()).join(", ");
        s += ")";
        return s;
      }
    };
    ParsedEnvSpecFunctionCall = class {
      static {
        __name(this, "ParsedEnvSpecFunctionCall");
      }
      constructor(data) {
        this.data = data;
      }
      static {
        __name2(this, "ParsedEnvSpecFunctionCall");
      }
      get name() {
        return this.data.name;
      }
      get simplifiedArgs() {
        return this.data.args.simplifiedValues;
      }
      toString() {
        return this.data.name + this.data.args.toString();
      }
    };
    ParsedEnvSpecDecorator = class {
      static {
        __name(this, "ParsedEnvSpecDecorator");
      }
      constructor(data) {
        this.data = data;
      }
      static {
        __name2(this, "ParsedEnvSpecDecorator");
      }
      get name() {
        return this.data.name;
      }
      get bareFnArgs() {
        if (this.data.valueOrFnArgs && this.data.valueOrFnArgs instanceof ParsedEnvSpecFunctionArgs) {
          return this.data.valueOrFnArgs;
        }
      }
      get value() {
        if (!this.data.valueOrFnArgs) {
          return new ParsedEnvSpecStaticValue({ rawValue: true, isImplicit: true });
        } else if (!(this.data.valueOrFnArgs instanceof ParsedEnvSpecFunctionArgs)) {
          return this.data.valueOrFnArgs;
        }
      }
      get simplifiedValue() {
        if (this.value instanceof ParsedEnvSpecStaticValue) {
          return this.value.value;
        }
      }
      toString() {
        let s = `@${this.name}`;
        if (!this.data.valueOrFnArgs) return s;
        if (!(this.data.valueOrFnArgs instanceof ParsedEnvSpecFunctionArgs)) s += "=";
        s += this.data.valueOrFnArgs.toString();
        return s;
      }
    };
    ParsedEnvSpecComment = class {
      static {
        __name(this, "ParsedEnvSpecComment");
      }
      constructor(data) {
        this.data = data;
      }
      static {
        __name2(this, "ParsedEnvSpecComment");
      }
      get contents() {
        return this.data.contents;
      }
      toString() {
        return `#${this.data.leadingSpace || ""}${this.data.contents}`;
      }
    };
    ParsedEnvSpecDecoratorComment = class {
      static {
        __name(this, "ParsedEnvSpecDecoratorComment");
      }
      constructor(data) {
        this.data = data;
      }
      static {
        __name2(this, "ParsedEnvSpecDecoratorComment");
      }
      get decorators() {
        return this.data.decorators;
      }
      get postComment() {
        return this.data.postComment;
      }
      toString() {
        let s = "#";
        s += this.data.leadingSpace || "";
        s += this.data.decorators.map((d3) => d3.toString()).join(" ");
        if (this.data.postComment) s += ` ${this.data.postComment.toString()}`;
        return s;
      }
    };
    __name(getDecoratorsObject, "getDecoratorsObject");
    __name2(getDecoratorsObject, "getDecoratorsObject");
    ParsedEnvSpecCommentBlock = class {
      static {
        __name(this, "ParsedEnvSpecCommentBlock");
      }
      constructor(data) {
        this.data = data;
      }
      static {
        __name2(this, "ParsedEnvSpecCommentBlock");
      }
      get comments() {
        return this.data.comments;
      }
      get divider() {
        return this.data.divider || void 0;
      }
      get decoratorsObject() {
        return getDecoratorsObject(this.data.comments);
      }
      toString() {
        return [
          ...this.data.comments.map((comment) => comment.toString()),
          ...this.data.divider ? [this.data.divider.toString()] : []
        ].join("\n");
      }
    };
    ParsedEnvSpecBlankLine = class {
      static {
        __name(this, "ParsedEnvSpecBlankLine");
      }
      constructor(data) {
        this.data = data;
      }
      static {
        __name2(this, "ParsedEnvSpecBlankLine");
      }
      toString() {
        return "";
      }
    };
    ParsedEnvSpecConfigItem = class {
      static {
        __name(this, "ParsedEnvSpecConfigItem");
      }
      constructor(data) {
        this.data = data;
      }
      static {
        __name2(this, "ParsedEnvSpecConfigItem");
      }
      expandedValue;
      get key() {
        return this.data.key;
      }
      get value() {
        if (!this.data.value) {
          return new ParsedEnvSpecStaticValue({ rawValue: void 0, isImplicit: true });
        }
        return this.data.value;
      }
      get decoratorsObject() {
        return getDecoratorsObject([...this.data.preComments, this.data.postComment]);
      }
      get description() {
        const regularComments = this.data.preComments.filter((comment) => comment instanceof ParsedEnvSpecComment);
        return regularComments.map((comment) => comment.contents).join("\n");
      }
      processExpansion(_opts) {
        if (this.data.value) {
          const expanded = expand(this.data.value);
          if (expanded instanceof ParsedEnvSpecKeyValuePair) throw new Error("Nested key-value pair found in config item");
          this.expandedValue = expanded;
        } else {
          this.expandedValue = void 0;
        }
      }
      get resolverDef() {
        if (!this.data.value) {
          return {
            type: "static",
            value: void 0
          };
        } else if (this.data.value instanceof ParsedEnvSpecStaticValue) {
          return {
            type: "static",
            value: this.data.value.value
          };
        } else if (this.data.value instanceof ParsedEnvSpecFunctionCall) {
          return {
            type: "function",
            functionName: this.data.value.name,
            functionArgs: this.data.value.simplifiedArgs
          };
        } else {
          throw new Error("Unknown value resolver type");
        }
      }
      toString() {
        let s = "";
        for (const comment of this.data.preComments) s += `${comment.toString()}
`;
        s += `${this.key}=`;
        if (this.data.value) s += `${this.data.value.toString()}`;
        if (this.data.postComment) s += ` ${this.data.postComment.toString()}`;
        return s;
      }
    };
    ParsedEnvSpecFile = class {
      static {
        __name(this, "ParsedEnvSpecFile");
      }
      static {
        __name2(this, "ParsedEnvSpecFile");
      }
      contents;
      constructor(_contents) {
        this.contents = _contents;
      }
      get configItems() {
        return this.contents.filter((item) => item instanceof ParsedEnvSpecConfigItem);
      }
      get header() {
        for (const item of this.contents) {
          if (item instanceof ParsedEnvSpecCommentBlock && item.divider) {
            return item;
          } else if (!(item instanceof ParsedEnvSpecBlankLine)) {
            return;
          }
        }
      }
      get decoratorsObject() {
        return this.header?.decoratorsObject ?? {};
      }
      toString() {
        return this.contents.map((item) => item.toString()).join("\n");
      }
      /**
       * simple helper to convert an object in a basic case
       * mostly useful for comparison with other env parsers
       * */
      toSimpleObj() {
        const obj = {};
        for (const item of this.contents) {
          if (item instanceof ParsedEnvSpecConfigItem) {
            if (item.value instanceof ParsedEnvSpecStaticValue) {
              obj[item.key] = item.value.value ?? "";
            }
          }
        }
        return obj;
      }
    };
    EXPAND_VAR_BRACKETED_REGEX = /(?<!\\)\${([a-zA-Z_][a-zA-Z0-9_.]*)((:?-)([^}]+))?}/g;
    EXPAND_VAR_SIMPLE_REGEX = /(?<!\\)\$([a-zA-Z_][a-zA-Z0-9_]*)/g;
    EXPAND_EXEC_REGEX = /\$\(([^)]+)\)/g;
    __name(expandExecs, "expandExecs");
    __name2(expandExecs, "expandExecs");
    __name(expandRefs, "expandRefs");
    __name2(expandRefs, "expandRefs");
    __name(expandHelper, "expandHelper");
    __name2(expandHelper, "expandHelper");
    __name(expand, "expand");
    __name2(expand, "expand");
  }
});

// ../env-spec-parser/dist/index.mjs
function ensureHeader(file, newHeaderContents) {
  if (!file.header) {
    newHeaderContents ||= "This env file uses @env-spec - see https://varlock.dev/env-spec for more info\n";
    file.contents.unshift(
      // header is a comment block at the beginning of the file and must end with a divider
      new ParsedEnvSpecCommentBlock({
        // we'll break up the passed in content and add a comment line for each
        comments: newHeaderContents.split("\n").map((line) => new ParsedEnvSpecComment({ contents: line, leadingSpace: " " })),
        divider: new ParsedEnvSpecDivider({ contents: "----------", leadingSpace: " " })
      }),
      new ParsedEnvSpecBlankLine({})
      // add extra blank line after header
    );
  }
}
function createDummyDecoratorNode(decoratorName, valueStr, opts) {
  let decStr = `@${decoratorName}`;
  if (opts?.bareFnArgs) decStr += `(${valueStr})`;
  else if (valueStr !== "true" || opts?.explicitTrue) {
    decStr += `=${valueStr}`;
  }
  const parsed = parseEnvSpecDotEnvFile(`# ${decStr}
# ---`);
  const newDecNode = parsed.decoratorsObject[decoratorName];
  if (!newDecNode) throw new Error("Creating new decorator failed");
  return newDecNode;
}
function setRootDecorator(file, decoratorName, valueStr, opts) {
  ensureHeader(file);
  const newDecNode = createDummyDecoratorNode(decoratorName, valueStr, opts);
  const existingDecorator = file.decoratorsObject[decoratorName];
  if (existingDecorator) {
    existingDecorator.data.valueOrFnArgs = newDecNode.data.valueOrFnArgs;
  } else {
    if (!file.header) throw new Error("No header found");
    const lastComment = file.header.data.comments[file.header.data.comments.length - 1];
    let decCommentLine;
    if (lastComment instanceof ParsedEnvSpecDecoratorComment && lastComment.toString().length < 40) {
      decCommentLine = lastComment;
    } else {
      decCommentLine = new ParsedEnvSpecDecoratorComment({
        decorators: [],
        leadingSpace: " ",
        ...opts?.comment && { postComment: `# ${opts.comment}` }
      });
      file.header.data.comments.push(decCommentLine);
    }
    decCommentLine.decorators.push(newDecNode);
  }
}
function setItemDecorator(file, key, decoratorName, valueStr, opts) {
  let item = file.configItems.find((i2) => i2.key === key);
  if (!item) {
    item = new ParsedEnvSpecConfigItem({
      key,
      value: void 0,
      preComments: [],
      postComment: void 0
    });
    file.contents.push(item);
  }
  const newDecNode = createDummyDecoratorNode(decoratorName, valueStr, opts);
  const existingDecorator = item.decoratorsObject[decoratorName];
  if (existingDecorator) {
    existingDecorator.data.valueOrFnArgs = newDecNode.data.valueOrFnArgs;
  } else {
    const lastComment = item.data.preComments[item.data.preComments.length - 1];
    let decCommentLine;
    if (lastComment instanceof ParsedEnvSpecDecoratorComment && lastComment.toString().length < 40) {
      decCommentLine = lastComment;
    } else {
      decCommentLine = new ParsedEnvSpecDecoratorComment({
        decorators: [],
        leadingSpace: " "
      });
      item.data.preComments.push(decCommentLine);
    }
    decCommentLine.decorators.push(newDecNode);
  }
}
function injectFromStr(file, content, opts) {
  const parsed = parseEnvSpecDotEnvFile(content);
  let injectIndex = file.contents.length;
  if (opts?.location === "start") {
    injectIndex = 0;
  } else if (opts?.location === "after_header") {
    if (file.header) {
      injectIndex = file.contents.indexOf(file.header) + 1;
    } else {
      injectIndex = 0;
    }
  } else if (opts?.location === "items") {
    if (file.configItems[0]) {
      injectIndex = file.contents.indexOf(file.configItems[0]);
    } else if (file.header) {
      injectIndex = file.contents.indexOf(file.header) + 1;
    }
  }
  file.contents.splice(injectIndex, 0, ...parsed.contents);
}
function deleteItem(file, key) {
  const item = file.configItems.find((i2) => i2.key === key);
  if (item) {
    file.contents.splice(file.contents.indexOf(item), 1);
  }
}
function peg$parse(input, options) {
  options = options !== void 0 ? options : {};
  const peg$FAILED = {};
  const peg$source = options.grammarSource;
  const peg$startRuleFunctions = {
    EnvSpecFile: peg$parseEnvSpecFile
  };
  let peg$startRuleFunction = peg$parseEnvSpecFile;
  const peg$c0 = "\n";
  const peg$c1 = "export ";
  const peg$c2 = "=";
  const peg$c3 = "#";
  const peg$c4 = "@";
  const peg$c5 = ":";
  const peg$c6 = "()";
  const peg$c7 = "(";
  const peg$c8 = ")";
  const peg$c9 = ",";
  const peg$c10 = '\\"';
  const peg$c11 = "\\'";
  const peg$c12 = "\\`";
  const peg$c13 = '"""';
  const peg$c14 = '\\"""';
  const peg$c15 = "```";
  const peg$c16 = "\\```";
  const peg$r0 = /^[a-zA-Z_]/;
  const peg$r1 = /^[a-zA-Z0-9_.\-]/;
  const peg$r2 = /^[^\n]/;
  const peg$r3 = /^[a-zA-Z]/;
  const peg$r4 = /^[@#]/;
  const peg$r5 = /^[a-zA-Z0-9_]/;
  const peg$r6 = /^[^ \n,)]/;
  const peg$r7 = /^[\-=*#]/;
  const peg$r8 = /^['"`]/;
  const peg$r9 = /^[^#\n]/;
  const peg$r10 = /^[^# \n]/;
  const peg$r11 = /^["]/;
  const peg$r12 = /^[^"\n]/;
  const peg$r13 = /^[']/;
  const peg$r14 = /^[^'\n]/;
  const peg$r15 = /^[`]/;
  const peg$r16 = /^[^`\n]/;
  const peg$r17 = /^[ \t]/;
  const peg$e0 = peg$literalExpectation("\n", false);
  const peg$e1 = peg$literalExpectation("export ", false);
  const peg$e2 = peg$literalExpectation("=", false);
  const peg$e3 = peg$classExpectation([["a", "z"], ["A", "Z"], "_"], false, false, false);
  const peg$e4 = peg$classExpectation([["a", "z"], ["A", "Z"], ["0", "9"], "_", ".", "-"], false, false, false);
  const peg$e5 = peg$literalExpectation("#", false);
  const peg$e6 = peg$literalExpectation("@", false);
  const peg$e7 = peg$classExpectation(["\n"], true, false, false);
  const peg$e8 = peg$classExpectation([["a", "z"], ["A", "Z"]], false, false, false);
  const peg$e9 = peg$literalExpectation(":", false);
  const peg$e10 = peg$classExpectation(["@", "#"], false, false, false);
  const peg$e11 = peg$literalExpectation("()", false);
  const peg$e12 = peg$literalExpectation("(", false);
  const peg$e13 = peg$literalExpectation(")", false);
  const peg$e14 = peg$classExpectation([["a", "z"], ["A", "Z"], ["0", "9"], "_"], false, false, false);
  const peg$e15 = peg$literalExpectation(",", false);
  const peg$e16 = peg$classExpectation([" ", "\n", ",", ")"], true, false, false);
  const peg$e17 = peg$classExpectation(["-", "=", "*", "#"], false, false, false);
  const peg$e18 = peg$classExpectation(["'", '"', "`"], false, false, false);
  const peg$e19 = peg$classExpectation(["#", "\n"], true, false, false);
  const peg$e20 = peg$classExpectation(["#", " ", "\n"], true, false, false);
  const peg$e21 = peg$classExpectation(['"'], false, false, false);
  const peg$e22 = peg$literalExpectation('\\"', false);
  const peg$e23 = peg$classExpectation(['"', "\n"], true, false, false);
  const peg$e24 = peg$classExpectation(["'"], false, false, false);
  const peg$e25 = peg$literalExpectation("\\'", false);
  const peg$e26 = peg$classExpectation(["'", "\n"], true, false, false);
  const peg$e27 = peg$classExpectation(["`"], false, false, false);
  const peg$e28 = peg$literalExpectation("\\`", false);
  const peg$e29 = peg$classExpectation(["`", "\n"], true, false, false);
  const peg$e30 = peg$literalExpectation('"""', false);
  const peg$e31 = peg$literalExpectation('\\"""', false);
  const peg$e32 = peg$literalExpectation("```", false);
  const peg$e33 = peg$literalExpectation("\\```", false);
  const peg$e34 = peg$anyExpectation();
  const peg$e35 = peg$classExpectation([" ", "	"], false, false, false);
  function peg$f0() {
    return new ParsedEnvSpecBlankLine({ _location: location() });
  }
  __name(peg$f0, "peg$f0");
  __name2(peg$f0, "peg$f0");
  function peg$f1(contents) {
    return new ParsedEnvSpecFile(contents);
  }
  __name(peg$f1, "peg$f1");
  __name2(peg$f1, "peg$f1");
  function peg$f2(preComments, key, value, postComment) {
    return new ParsedEnvSpecConfigItem({
      key,
      preComments,
      postComment,
      value,
      _location: location()
    });
  }
  __name(peg$f2, "peg$f2");
  __name2(peg$f2, "peg$f2");
  function peg$f3(comments, end) {
    return new ParsedEnvSpecCommentBlock({
      comments,
      divider: end instanceof ParsedEnvSpecDivider ? end : void 0,
      _location: location()
    });
  }
  __name(peg$f3, "peg$f3");
  __name2(peg$f3, "peg$f3");
  function peg$f4(leadingSpace, contents) {
    return new ParsedEnvSpecComment({
      contents,
      leadingSpace,
      _location: location()
    });
  }
  __name(peg$f4, "peg$f4");
  __name2(peg$f4, "peg$f4");
  function peg$f5(leadingSpace, contents) {
    return new ParsedEnvSpecComment({ contents, leadingSpace, _location: location() });
  }
  __name(peg$f5, "peg$f5");
  __name2(peg$f5, "peg$f5");
  function peg$f6(leadingSpace, first, rest, postComment) {
    return new ParsedEnvSpecDecoratorComment({
      decorators: [first, ...rest],
      leadingSpace,
      postComment,
      _location: location()
    });
  }
  __name(peg$f6, "peg$f6");
  __name2(peg$f6, "peg$f6");
  function peg$f7(name) {
    return new ParsedEnvSpecFunctionArgs({ values: [] });
  }
  __name(peg$f7, "peg$f7");
  __name2(peg$f7, "peg$f7");
  function peg$f8(name, valueOrFnArgs) {
    return new ParsedEnvSpecDecorator({
      name,
      valueOrFnArgs,
      _location: location()
    });
  }
  __name(peg$f8, "peg$f8");
  __name2(peg$f8, "peg$f8");
  function peg$f9(name, args) {
    return new ParsedEnvSpecFunctionCall({
      name,
      args: args || new ParsedEnvSpecFunctionArgs({ values: [] }),
      _location: location()
    });
  }
  __name(peg$f9, "peg$f9");
  __name2(peg$f9, "peg$f9");
  function peg$f10(key, val) {
    return new ParsedEnvSpecKeyValuePair({ key, val });
  }
  __name(peg$f10, "peg$f10");
  __name2(peg$f10, "peg$f10");
  function peg$f11(values) {
    return new ParsedEnvSpecFunctionArgs({
      values,
      _location: location()
    });
  }
  __name(peg$f11, "peg$f11");
  __name2(peg$f11, "peg$f11");
  function peg$f12() {
    return new ParsedEnvSpecStaticValue({ rawValue: text(), _location: location() });
  }
  __name(peg$f12, "peg$f12");
  __name2(peg$f12, "peg$f12");
  function peg$f13(leadingSpace, contents) {
    return new ParsedEnvSpecDivider({
      contents,
      leadingSpace,
      _location: location()
    });
  }
  __name(peg$f13, "peg$f13");
  __name2(peg$f13, "peg$f13");
  function peg$f14() {
    return new ParsedEnvSpecStaticValue({ rawValue: text(), _location: location() });
  }
  __name(peg$f14, "peg$f14");
  __name2(peg$f14, "peg$f14");
  function peg$f15() {
    return new ParsedEnvSpecStaticValue({ rawValue: text(), _location: location() });
  }
  __name(peg$f15, "peg$f15");
  __name2(peg$f15, "peg$f15");
  function peg$f16(quote) {
    return new ParsedEnvSpecStaticValue({ quote, rawValue: text(), _location: location() });
  }
  __name(peg$f16, "peg$f16");
  __name2(peg$f16, "peg$f16");
  function peg$f17(quote) {
    return new ParsedEnvSpecStaticValue({ quote, rawValue: text(), _location: location() });
  }
  __name(peg$f17, "peg$f17");
  __name2(peg$f17, "peg$f17");
  function peg$f18(quote) {
    return new ParsedEnvSpecStaticValue({ quote, rawValue: text(), _location: location() });
  }
  __name(peg$f18, "peg$f18");
  __name2(peg$f18, "peg$f18");
  function peg$f19(quote) {
    return new ParsedEnvSpecStaticValue({ quote, isMultiLine: true, rawValue: text(), _location: location() });
  }
  __name(peg$f19, "peg$f19");
  __name2(peg$f19, "peg$f19");
  function peg$f20(quote) {
    return new ParsedEnvSpecStaticValue({ quote, isMultiLine: true, rawValue: text(), _location: location() });
  }
  __name(peg$f20, "peg$f20");
  __name2(peg$f20, "peg$f20");
  function peg$f21(quote) {
    return new ParsedEnvSpecStaticValue({ quote, isMultiLine: true, rawValue: text(), _location: location() });
  }
  __name(peg$f21, "peg$f21");
  __name2(peg$f21, "peg$f21");
  function peg$f22(quote) {
    return new ParsedEnvSpecStaticValue({ quote, isMultiLine: true, rawValue: text(), _location: location() });
  }
  __name(peg$f22, "peg$f22");
  __name2(peg$f22, "peg$f22");
  let peg$currPos = options.peg$currPos | 0;
  let peg$savedPos = peg$currPos;
  const peg$posDetailsCache = [{ line: 1, column: 1 }];
  let peg$maxFailPos = peg$currPos;
  let peg$maxFailExpected = options.peg$maxFailExpected || [];
  let peg$silentFails = options.peg$silentFails | 0;
  let peg$result;
  if (options.startRule) {
    if (!(options.startRule in peg$startRuleFunctions)) {
      throw new Error(`Can't start parsing from rule "` + options.startRule + '".');
    }
    peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
  }
  function text() {
    return input.substring(peg$savedPos, peg$currPos);
  }
  __name(text, "text");
  __name2(text, "text");
  function offset() {
    return peg$savedPos;
  }
  __name(offset, "offset");
  __name2(offset, "offset");
  function range() {
    return {
      source: peg$source,
      start: peg$savedPos,
      end: peg$currPos
    };
  }
  __name(range, "range");
  __name2(range, "range");
  function location() {
    return peg$computeLocation(peg$savedPos, peg$currPos);
  }
  __name(location, "location");
  __name2(location, "location");
  function expected(description, location2) {
    location2 = location2 !== void 0 ? location2 : peg$computeLocation(peg$savedPos, peg$currPos);
    throw peg$buildStructuredError(
      [peg$otherExpectation(description)],
      input.substring(peg$savedPos, peg$currPos),
      location2
    );
  }
  __name(expected, "expected");
  __name2(expected, "expected");
  function error(message, location2) {
    location2 = location2 !== void 0 ? location2 : peg$computeLocation(peg$savedPos, peg$currPos);
    throw peg$buildSimpleError(message, location2);
  }
  __name(error, "error");
  __name2(error, "error");
  function peg$getUnicode(pos = peg$currPos) {
    const cp = input.codePointAt(pos);
    if (cp === void 0) {
      return "";
    }
    return String.fromCodePoint(cp);
  }
  __name(peg$getUnicode, "peg$getUnicode");
  __name2(peg$getUnicode, "peg$getUnicode");
  function peg$literalExpectation(text2, ignoreCase) {
    return { type: "literal", text: text2, ignoreCase };
  }
  __name(peg$literalExpectation, "peg$literalExpectation");
  __name2(peg$literalExpectation, "peg$literalExpectation");
  function peg$classExpectation(parts, inverted, ignoreCase, unicode2) {
    return { type: "class", parts, inverted, ignoreCase, unicode: unicode2 };
  }
  __name(peg$classExpectation, "peg$classExpectation");
  __name2(peg$classExpectation, "peg$classExpectation");
  function peg$anyExpectation() {
    return { type: "any" };
  }
  __name(peg$anyExpectation, "peg$anyExpectation");
  __name2(peg$anyExpectation, "peg$anyExpectation");
  function peg$endExpectation() {
    return { type: "end" };
  }
  __name(peg$endExpectation, "peg$endExpectation");
  __name2(peg$endExpectation, "peg$endExpectation");
  function peg$otherExpectation(description) {
    return { type: "other", description };
  }
  __name(peg$otherExpectation, "peg$otherExpectation");
  __name2(peg$otherExpectation, "peg$otherExpectation");
  function peg$computePosDetails(pos) {
    let details = peg$posDetailsCache[pos];
    let p2;
    if (details) {
      return details;
    } else {
      if (pos >= peg$posDetailsCache.length) {
        p2 = peg$posDetailsCache.length - 1;
      } else {
        p2 = pos;
        while (!peg$posDetailsCache[--p2]) {
        }
      }
      details = peg$posDetailsCache[p2];
      details = {
        line: details.line,
        column: details.column
      };
      while (p2 < pos) {
        if (input.charCodeAt(p2) === 10) {
          details.line++;
          details.column = 1;
        } else {
          details.column++;
        }
        p2++;
      }
      peg$posDetailsCache[pos] = details;
      return details;
    }
  }
  __name(peg$computePosDetails, "peg$computePosDetails");
  __name2(peg$computePosDetails, "peg$computePosDetails");
  function peg$computeLocation(startPos, endPos, offset2) {
    const startPosDetails = peg$computePosDetails(startPos);
    const endPosDetails = peg$computePosDetails(endPos);
    const res = {
      source: peg$source,
      start: {
        offset: startPos,
        line: startPosDetails.line,
        column: startPosDetails.column
      },
      end: {
        offset: endPos,
        line: endPosDetails.line,
        column: endPosDetails.column
      }
    };
    if (offset2 && peg$source && typeof peg$source.offset === "function") {
      res.start = peg$source.offset(res.start);
      res.end = peg$source.offset(res.end);
    }
    return res;
  }
  __name(peg$computeLocation, "peg$computeLocation");
  __name2(peg$computeLocation, "peg$computeLocation");
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
  __name(peg$fail, "peg$fail");
  __name2(peg$fail, "peg$fail");
  function peg$buildSimpleError(message, location2) {
    return new peg$SyntaxError(message, null, null, location2);
  }
  __name(peg$buildSimpleError, "peg$buildSimpleError");
  __name2(peg$buildSimpleError, "peg$buildSimpleError");
  function peg$buildStructuredError(expected2, found, location2) {
    return new peg$SyntaxError(
      peg$SyntaxError.buildMessage(expected2, found),
      expected2,
      found,
      location2
    );
  }
  __name(peg$buildStructuredError, "peg$buildStructuredError");
  __name2(peg$buildStructuredError, "peg$buildStructuredError");
  function peg$parseEnvSpecFile() {
    let s0, s1, s2, s3;
    s0 = peg$currPos;
    s1 = [];
    s2 = peg$parseConfigItem();
    if (s2 === peg$FAILED) {
      s2 = peg$parseDivider();
      if (s2 === peg$FAILED) {
        s2 = peg$parseCommentBlock();
        if (s2 === peg$FAILED) {
          s2 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 10) {
            s3 = peg$c0;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e0);
            }
          }
          if (s3 !== peg$FAILED) {
            peg$savedPos = s2;
            s3 = peg$f0();
          }
          s2 = s3;
        }
      }
    }
    while (s2 !== peg$FAILED) {
      s1.push(s2);
      s2 = peg$parseConfigItem();
      if (s2 === peg$FAILED) {
        s2 = peg$parseDivider();
        if (s2 === peg$FAILED) {
          s2 = peg$parseCommentBlock();
          if (s2 === peg$FAILED) {
            s2 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 10) {
              s3 = peg$c0;
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$e0);
              }
            }
            if (s3 !== peg$FAILED) {
              peg$savedPos = s2;
              s3 = peg$f0();
            }
            s2 = s3;
          }
        }
      }
    }
    peg$savedPos = s0;
    s1 = peg$f1(s1);
    s0 = s1;
    return s0;
  }
  __name(peg$parseEnvSpecFile, "peg$parseEnvSpecFile");
  __name2(peg$parseEnvSpecFile, "peg$parseEnvSpecFile");
  function peg$parseConfigItem() {
    let s0, s1, s2, s3, s4, s5, s6, s7, s9, s10;
    s0 = peg$currPos;
    s1 = [];
    s2 = peg$currPos;
    s3 = peg$parseIgnoredDecoratorComment();
    if (s3 === peg$FAILED) {
      s3 = peg$parseDecoratorComment();
      if (s3 === peg$FAILED) {
        s3 = peg$parseComment();
      }
    }
    if (s3 !== peg$FAILED) {
      if (input.charCodeAt(peg$currPos) === 10) {
        s4 = peg$c0;
        peg$currPos++;
      } else {
        s4 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e0);
        }
      }
      if (s4 !== peg$FAILED) {
        s2 = s3;
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }
    } else {
      peg$currPos = s2;
      s2 = peg$FAILED;
    }
    while (s2 !== peg$FAILED) {
      s1.push(s2);
      s2 = peg$currPos;
      s3 = peg$parseIgnoredDecoratorComment();
      if (s3 === peg$FAILED) {
        s3 = peg$parseDecoratorComment();
        if (s3 === peg$FAILED) {
          s3 = peg$parseComment();
        }
      }
      if (s3 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 10) {
          s4 = peg$c0;
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$e0);
          }
        }
        if (s4 !== peg$FAILED) {
          s2 = s3;
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }
    }
    s2 = peg$currPos;
    s3 = peg$parse_();
    if (input.substr(peg$currPos, 7) === peg$c1) {
      s4 = peg$c1;
      peg$currPos += 7;
    } else {
      s4 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$e1);
      }
    }
    if (s4 !== peg$FAILED) {
      s5 = peg$parse_();
      s3 = [s3, s4, s5];
      s2 = s3;
    } else {
      peg$currPos = s2;
      s2 = peg$FAILED;
    }
    if (s2 === peg$FAILED) {
      s2 = null;
    }
    s3 = peg$parse_();
    s4 = peg$parseConfigItemKey();
    if (s4 !== peg$FAILED) {
      s5 = peg$parse_();
      if (input.charCodeAt(peg$currPos) === 61) {
        s6 = peg$c2;
        peg$currPos++;
      } else {
        s6 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e2);
        }
      }
      if (s6 !== peg$FAILED) {
        s7 = peg$parseConfigItemValue();
        if (s7 === peg$FAILED) {
          s7 = null;
        }
        peg$parse_();
        s9 = peg$currPos;
        s10 = peg$parseIgnoredDecoratorComment();
        if (s10 === peg$FAILED) {
          s10 = peg$parseDecoratorComment();
          if (s10 === peg$FAILED) {
            s10 = peg$parseComment();
          }
        }
        if (s10 !== peg$FAILED) {
          s9 = s10;
        } else {
          peg$currPos = s9;
          s9 = peg$FAILED;
        }
        if (s9 === peg$FAILED) {
          s9 = null;
        }
        s10 = peg$parse_n();
        if (s10 !== peg$FAILED) {
          peg$savedPos = s0;
          s0 = peg$f2(s1, s4, s7, s9);
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    return s0;
  }
  __name(peg$parseConfigItem, "peg$parseConfigItem");
  __name2(peg$parseConfigItem, "peg$parseConfigItem");
  function peg$parseConfigItemKey() {
    let s0, s1, s2, s3, s4;
    s0 = peg$currPos;
    s1 = peg$currPos;
    s2 = input.charAt(peg$currPos);
    if (peg$r0.test(s2)) {
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$e3);
      }
    }
    if (s2 !== peg$FAILED) {
      s3 = [];
      s4 = input.charAt(peg$currPos);
      if (peg$r1.test(s4)) {
        peg$currPos++;
      } else {
        s4 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e4);
        }
      }
      while (s4 !== peg$FAILED) {
        s3.push(s4);
        s4 = input.charAt(peg$currPos);
        if (peg$r1.test(s4)) {
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$e4);
          }
        }
      }
      s2 = [s2, s3];
      s1 = s2;
    } else {
      peg$currPos = s1;
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      s0 = input.substring(s0, peg$currPos);
    } else {
      s0 = s1;
    }
    return s0;
  }
  __name(peg$parseConfigItemKey, "peg$parseConfigItemKey");
  __name2(peg$parseConfigItemKey, "peg$parseConfigItemKey");
  function peg$parseConfigItemValue() {
    let s0;
    s0 = peg$parseFunctionCall();
    if (s0 === peg$FAILED) {
      s0 = peg$parsemultiLineString();
      if (s0 === peg$FAILED) {
        s0 = peg$parsequotedString();
        if (s0 === peg$FAILED) {
          s0 = peg$parseunquotedString();
        }
      }
    }
    return s0;
  }
  __name(peg$parseConfigItemValue, "peg$parseConfigItemValue");
  __name2(peg$parseConfigItemValue, "peg$parseConfigItemValue");
  function peg$parseCommentBlock() {
    let s0, s1, s2, s3, s4;
    s0 = peg$currPos;
    s1 = [];
    s2 = peg$currPos;
    s3 = peg$parseIgnoredDecoratorComment();
    if (s3 === peg$FAILED) {
      s3 = peg$parseDecoratorComment();
      if (s3 === peg$FAILED) {
        s3 = peg$parseComment();
      }
    }
    if (s3 !== peg$FAILED) {
      s4 = peg$parse_n();
      if (s4 !== peg$FAILED) {
        s2 = s3;
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }
    } else {
      peg$currPos = s2;
      s2 = peg$FAILED;
    }
    if (s2 !== peg$FAILED) {
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        s2 = peg$currPos;
        s3 = peg$parseIgnoredDecoratorComment();
        if (s3 === peg$FAILED) {
          s3 = peg$parseDecoratorComment();
          if (s3 === peg$FAILED) {
            s3 = peg$parseComment();
          }
        }
        if (s3 !== peg$FAILED) {
          s4 = peg$parse_n();
          if (s4 !== peg$FAILED) {
            s2 = s3;
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
      }
    } else {
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parseDivider();
      if (s2 === peg$FAILED) {
        s2 = peg$parse_n();
      }
      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s0 = peg$f3(s1, s2);
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    return s0;
  }
  __name(peg$parseCommentBlock, "peg$parseCommentBlock");
  __name2(peg$parseCommentBlock, "peg$parseCommentBlock");
  function peg$parseComment() {
    let s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;
    s0 = peg$currPos;
    s1 = peg$currPos;
    peg$silentFails++;
    s2 = peg$parseDivider();
    peg$silentFails--;
    if (s2 === peg$FAILED) {
      s1 = void 0;
    } else {
      peg$currPos = s1;
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      if (input.charCodeAt(peg$currPos) === 35) {
        s2 = peg$c3;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e5);
        }
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$currPos;
        s4 = peg$parse_();
        s3 = input.substring(s3, peg$currPos);
        s4 = peg$currPos;
        s5 = peg$currPos;
        s6 = peg$currPos;
        s7 = peg$currPos;
        peg$silentFails++;
        if (input.charCodeAt(peg$currPos) === 64) {
          s8 = peg$c4;
          peg$currPos++;
        } else {
          s8 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$e6);
          }
        }
        peg$silentFails--;
        if (s8 === peg$FAILED) {
          s7 = void 0;
        } else {
          peg$currPos = s7;
          s7 = peg$FAILED;
        }
        if (s7 !== peg$FAILED) {
          s8 = [];
          s9 = input.charAt(peg$currPos);
          if (peg$r2.test(s9)) {
            peg$currPos++;
          } else {
            s9 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e7);
            }
          }
          while (s9 !== peg$FAILED) {
            s8.push(s9);
            s9 = input.charAt(peg$currPos);
            if (peg$r2.test(s9)) {
              peg$currPos++;
            } else {
              s9 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$e7);
              }
            }
          }
          s7 = [s7, s8];
          s6 = s7;
        } else {
          peg$currPos = s6;
          s6 = peg$FAILED;
        }
        if (s6 === peg$FAILED) {
          s6 = null;
        }
        s5 = input.substring(s5, peg$currPos);
        s4 = input.substring(s4, peg$currPos);
        peg$savedPos = s0;
        s0 = peg$f4(s3, s4);
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    return s0;
  }
  __name(peg$parseComment, "peg$parseComment");
  __name2(peg$parseComment, "peg$parseComment");
  function peg$parseIgnoredDecoratorComment() {
    let s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10;
    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 35) {
      s1 = peg$c3;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$e5);
      }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$currPos;
      s3 = peg$parse_();
      s2 = input.substring(s2, peg$currPos);
      s3 = peg$currPos;
      s4 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 64) {
        s5 = peg$c4;
        peg$currPos++;
      } else {
        s5 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e6);
        }
      }
      if (s5 !== peg$FAILED) {
        s6 = [];
        s7 = input.charAt(peg$currPos);
        if (peg$r3.test(s7)) {
          peg$currPos++;
        } else {
          s7 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$e8);
          }
        }
        if (s7 !== peg$FAILED) {
          while (s7 !== peg$FAILED) {
            s6.push(s7);
            s7 = input.charAt(peg$currPos);
            if (peg$r3.test(s7)) {
              peg$currPos++;
            } else {
              s7 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$e8);
              }
            }
          }
        } else {
          s6 = peg$FAILED;
        }
        if (s6 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 58) {
            s7 = peg$c5;
            peg$currPos++;
          } else {
            s7 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e9);
            }
          }
          if (s7 !== peg$FAILED) {
            s8 = [];
            s9 = input.charAt(peg$currPos);
            if (peg$r2.test(s9)) {
              peg$currPos++;
            } else {
              s9 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$e7);
              }
            }
            while (s9 !== peg$FAILED) {
              s8.push(s9);
              s9 = input.charAt(peg$currPos);
              if (peg$r2.test(s9)) {
                peg$currPos++;
              } else {
                s9 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$e7);
                }
              }
            }
            s5 = [s5, s6, s7, s8];
            s4 = s5;
          } else {
            peg$currPos = s4;
            s4 = peg$FAILED;
          }
        } else {
          peg$currPos = s4;
          s4 = peg$FAILED;
        }
      } else {
        peg$currPos = s4;
        s4 = peg$FAILED;
      }
      if (s4 === peg$FAILED) {
        s4 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 64) {
          s5 = peg$c4;
          peg$currPos++;
        } else {
          s5 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$e6);
          }
        }
        if (s5 !== peg$FAILED) {
          s6 = [];
          s7 = input.charAt(peg$currPos);
          if (peg$r3.test(s7)) {
            peg$currPos++;
          } else {
            s7 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e8);
            }
          }
          if (s7 !== peg$FAILED) {
            while (s7 !== peg$FAILED) {
              s6.push(s7);
              s7 = input.charAt(peg$currPos);
              if (peg$r3.test(s7)) {
                peg$currPos++;
              } else {
                s7 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$e8);
                }
              }
            }
          } else {
            s6 = peg$FAILED;
          }
          if (s6 !== peg$FAILED) {
            s7 = peg$parse__();
            if (s7 !== peg$FAILED) {
              s8 = peg$currPos;
              peg$silentFails++;
              s9 = input.charAt(peg$currPos);
              if (peg$r4.test(s9)) {
                peg$currPos++;
              } else {
                s9 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$e10);
                }
              }
              peg$silentFails--;
              if (s9 === peg$FAILED) {
                s8 = void 0;
              } else {
                peg$currPos = s8;
                s8 = peg$FAILED;
              }
              if (s8 !== peg$FAILED) {
                s9 = [];
                s10 = input.charAt(peg$currPos);
                if (peg$r2.test(s10)) {
                  peg$currPos++;
                } else {
                  s10 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$e7);
                  }
                }
                while (s10 !== peg$FAILED) {
                  s9.push(s10);
                  s10 = input.charAt(peg$currPos);
                  if (peg$r2.test(s10)) {
                    peg$currPos++;
                  } else {
                    s10 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$e7);
                    }
                  }
                }
                s5 = [s5, s6, s7, s8, s9];
                s4 = s5;
              } else {
                peg$currPos = s4;
                s4 = peg$FAILED;
              }
            } else {
              peg$currPos = s4;
              s4 = peg$FAILED;
            }
          } else {
            peg$currPos = s4;
            s4 = peg$FAILED;
          }
        } else {
          peg$currPos = s4;
          s4 = peg$FAILED;
        }
      }
      if (s4 !== peg$FAILED) {
        s3 = input.substring(s3, peg$currPos);
      } else {
        s3 = s4;
      }
      if (s3 !== peg$FAILED) {
        peg$savedPos = s0;
        s0 = peg$f5(s2, s3);
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    return s0;
  }
  __name(peg$parseIgnoredDecoratorComment, "peg$parseIgnoredDecoratorComment");
  __name2(peg$parseIgnoredDecoratorComment, "peg$parseIgnoredDecoratorComment");
  function peg$parseDecoratorComment() {
    let s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10;
    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 35) {
      s1 = peg$c3;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$e5);
      }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$currPos;
      s3 = peg$parse_();
      s2 = input.substring(s2, peg$currPos);
      s3 = peg$parseDecorator();
      if (s3 !== peg$FAILED) {
        s4 = [];
        s5 = peg$currPos;
        s6 = peg$parse__();
        if (s6 !== peg$FAILED) {
          s7 = peg$parseDecorator();
          if (s7 !== peg$FAILED) {
            s5 = s7;
          } else {
            peg$currPos = s5;
            s5 = peg$FAILED;
          }
        } else {
          peg$currPos = s5;
          s5 = peg$FAILED;
        }
        while (s5 !== peg$FAILED) {
          s4.push(s5);
          s5 = peg$currPos;
          s6 = peg$parse__();
          if (s6 !== peg$FAILED) {
            s7 = peg$parseDecorator();
            if (s7 !== peg$FAILED) {
              s5 = s7;
            } else {
              peg$currPos = s5;
              s5 = peg$FAILED;
            }
          } else {
            peg$currPos = s5;
            s5 = peg$FAILED;
          }
        }
        s5 = peg$parse_();
        s6 = peg$currPos;
        s7 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 35) {
          s8 = peg$c3;
          peg$currPos++;
        } else {
          s8 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$e5);
          }
        }
        if (s8 !== peg$FAILED) {
          s9 = [];
          s10 = input.charAt(peg$currPos);
          if (peg$r2.test(s10)) {
            peg$currPos++;
          } else {
            s10 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e7);
            }
          }
          while (s10 !== peg$FAILED) {
            s9.push(s10);
            s10 = input.charAt(peg$currPos);
            if (peg$r2.test(s10)) {
              peg$currPos++;
            } else {
              s10 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$e7);
              }
            }
          }
          s8 = [s8, s9];
          s7 = s8;
        } else {
          peg$currPos = s7;
          s7 = peg$FAILED;
        }
        if (s7 === peg$FAILED) {
          s7 = null;
        }
        s6 = input.substring(s6, peg$currPos);
        peg$savedPos = s0;
        s0 = peg$f6(s2, s3, s4, s6);
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    return s0;
  }
  __name(peg$parseDecoratorComment, "peg$parseDecoratorComment");
  __name2(peg$parseDecoratorComment, "peg$parseDecoratorComment");
  function peg$parseDecorator() {
    let s0, s1, s2, s3, s4, s5, s6;
    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 64) {
      s1 = peg$c4;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$e6);
      }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parseDecoratorName();
      if (s2 !== peg$FAILED) {
        s3 = peg$currPos;
        if (input.substr(peg$currPos, 2) === peg$c6) {
          s4 = peg$c6;
          peg$currPos += 2;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$e11);
          }
        }
        if (s4 !== peg$FAILED) {
          peg$savedPos = s3;
          s4 = peg$f7();
        }
        s3 = s4;
        if (s3 === peg$FAILED) {
          s3 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 40) {
            s4 = peg$c7;
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e12);
            }
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parseFunctionArgs();
            if (s5 === peg$FAILED) {
              s5 = null;
            }
            if (input.charCodeAt(peg$currPos) === 41) {
              s6 = peg$c8;
              peg$currPos++;
            } else {
              s6 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$e13);
              }
            }
            if (s6 !== peg$FAILED) {
              s3 = s5;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
          if (s3 === peg$FAILED) {
            s3 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 61) {
              s4 = peg$c2;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$e2);
              }
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parseDecoratorValue();
              if (s5 !== peg$FAILED) {
                s3 = s5;
              } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          }
        }
        if (s3 === peg$FAILED) {
          s3 = null;
        }
        peg$savedPos = s0;
        s0 = peg$f8(s2, s3);
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    return s0;
  }
  __name(peg$parseDecorator, "peg$parseDecorator");
  __name2(peg$parseDecorator, "peg$parseDecorator");
  function peg$parseDecoratorName() {
    let s0, s1, s2, s3, s4;
    s0 = peg$currPos;
    s1 = peg$currPos;
    s2 = input.charAt(peg$currPos);
    if (peg$r3.test(s2)) {
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$e8);
      }
    }
    if (s2 !== peg$FAILED) {
      s3 = [];
      s4 = input.charAt(peg$currPos);
      if (peg$r5.test(s4)) {
        peg$currPos++;
      } else {
        s4 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e14);
        }
      }
      while (s4 !== peg$FAILED) {
        s3.push(s4);
        s4 = input.charAt(peg$currPos);
        if (peg$r5.test(s4)) {
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$e14);
          }
        }
      }
      s2 = [s2, s3];
      s1 = s2;
    } else {
      peg$currPos = s1;
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      s0 = input.substring(s0, peg$currPos);
    } else {
      s0 = s1;
    }
    return s0;
  }
  __name(peg$parseDecoratorName, "peg$parseDecoratorName");
  __name2(peg$parseDecoratorName, "peg$parseDecoratorName");
  function peg$parseDecoratorValue() {
    let s0;
    s0 = peg$parseFunctionCall();
    if (s0 === peg$FAILED) {
      s0 = peg$parsequotedString();
      if (s0 === peg$FAILED) {
        s0 = peg$parseunquotedStringWithoutSpaces();
      }
    }
    return s0;
  }
  __name(peg$parseDecoratorValue, "peg$parseDecoratorValue");
  __name2(peg$parseDecoratorValue, "peg$parseDecoratorValue");
  function peg$parseFunctionCall() {
    let s0, s1, s2, s4, s6;
    s0 = peg$currPos;
    s1 = peg$parseFunctionName();
    if (s1 !== peg$FAILED) {
      if (input.charCodeAt(peg$currPos) === 40) {
        s2 = peg$c7;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e12);
        }
      }
      if (s2 !== peg$FAILED) {
        peg$parse_();
        s4 = peg$parseFunctionArgs();
        if (s4 === peg$FAILED) {
          s4 = null;
        }
        peg$parse_();
        if (input.charCodeAt(peg$currPos) === 41) {
          s6 = peg$c8;
          peg$currPos++;
        } else {
          s6 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$e13);
          }
        }
        if (s6 !== peg$FAILED) {
          peg$savedPos = s0;
          s0 = peg$f9(s1, s4);
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    return s0;
  }
  __name(peg$parseFunctionCall, "peg$parseFunctionCall");
  __name2(peg$parseFunctionCall, "peg$parseFunctionCall");
  function peg$parseFunctionName() {
    let s0, s1, s2, s3, s4;
    s0 = peg$currPos;
    s1 = peg$currPos;
    s2 = input.charAt(peg$currPos);
    if (peg$r3.test(s2)) {
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$e8);
      }
    }
    if (s2 !== peg$FAILED) {
      s3 = [];
      s4 = input.charAt(peg$currPos);
      if (peg$r5.test(s4)) {
        peg$currPos++;
      } else {
        s4 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e14);
        }
      }
      while (s4 !== peg$FAILED) {
        s3.push(s4);
        s4 = input.charAt(peg$currPos);
        if (peg$r5.test(s4)) {
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$e14);
          }
        }
      }
      s2 = [s2, s3];
      s1 = s2;
    } else {
      peg$currPos = s1;
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      s0 = input.substring(s0, peg$currPos);
    } else {
      s0 = s1;
    }
    return s0;
  }
  __name(peg$parseFunctionName, "peg$parseFunctionName");
  __name2(peg$parseFunctionName, "peg$parseFunctionName");
  function peg$parseFunctionArgs() {
    let s0, s1, s2, s3, s4, s5, s6, s7;
    s0 = peg$currPos;
    s1 = peg$currPos;
    s2 = [];
    s3 = peg$currPos;
    s4 = peg$parseFunctionArgKeyName();
    if (s4 !== peg$FAILED) {
      if (input.charCodeAt(peg$currPos) === 61) {
        s5 = peg$c2;
        peg$currPos++;
      } else {
        s5 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e2);
        }
      }
      if (s5 !== peg$FAILED) {
        s6 = peg$parseFunctionArgValue();
        if (s6 !== peg$FAILED) {
          peg$savedPos = s3;
          s3 = peg$f10(s4, s6);
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      } else {
        peg$currPos = s3;
        s3 = peg$FAILED;
      }
    } else {
      peg$currPos = s3;
      s3 = peg$FAILED;
    }
    if (s3 === peg$FAILED) {
      s3 = peg$parseFunctionArgValue();
    }
    while (s3 !== peg$FAILED) {
      s2.push(s3);
      s3 = peg$currPos;
      s4 = peg$currPos;
      s5 = peg$parse_();
      if (input.charCodeAt(peg$currPos) === 44) {
        s6 = peg$c9;
        peg$currPos++;
      } else {
        s6 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e15);
        }
      }
      if (s6 !== peg$FAILED) {
        s7 = peg$parse_();
        s5 = [s5, s6, s7];
        s4 = s5;
      } else {
        peg$currPos = s4;
        s4 = peg$FAILED;
      }
      if (s4 !== peg$FAILED) {
        s4 = peg$currPos;
        s5 = peg$parseFunctionArgKeyName();
        if (s5 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 61) {
            s6 = peg$c2;
            peg$currPos++;
          } else {
            s6 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e2);
            }
          }
          if (s6 !== peg$FAILED) {
            s7 = peg$parseFunctionArgValue();
            if (s7 !== peg$FAILED) {
              peg$savedPos = s4;
              s4 = peg$f10(s5, s7);
            } else {
              peg$currPos = s4;
              s4 = peg$FAILED;
            }
          } else {
            peg$currPos = s4;
            s4 = peg$FAILED;
          }
        } else {
          peg$currPos = s4;
          s4 = peg$FAILED;
        }
        if (s4 === peg$FAILED) {
          s4 = peg$parseFunctionArgValue();
        }
        if (s4 === peg$FAILED) {
          peg$currPos = s3;
          s3 = peg$FAILED;
        } else {
          s3 = s4;
        }
      } else {
        s3 = s4;
      }
    }
    if (s2.length < 1) {
      peg$currPos = s1;
      s1 = peg$FAILED;
    } else {
      s1 = s2;
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$f11(s1);
    }
    s0 = s1;
    return s0;
  }
  __name(peg$parseFunctionArgs, "peg$parseFunctionArgs");
  __name2(peg$parseFunctionArgs, "peg$parseFunctionArgs");
  function peg$parseFunctionArgKeyName() {
    let s0, s1, s2, s3, s4;
    s0 = peg$currPos;
    s1 = peg$currPos;
    s2 = input.charAt(peg$currPos);
    if (peg$r3.test(s2)) {
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$e8);
      }
    }
    if (s2 !== peg$FAILED) {
      s3 = [];
      s4 = input.charAt(peg$currPos);
      if (peg$r5.test(s4)) {
        peg$currPos++;
      } else {
        s4 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e14);
        }
      }
      while (s4 !== peg$FAILED) {
        s3.push(s4);
        s4 = input.charAt(peg$currPos);
        if (peg$r5.test(s4)) {
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$e14);
          }
        }
      }
      s2 = [s2, s3];
      s1 = s2;
    } else {
      peg$currPos = s1;
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      s0 = input.substring(s0, peg$currPos);
    } else {
      s0 = s1;
    }
    return s0;
  }
  __name(peg$parseFunctionArgKeyName, "peg$parseFunctionArgKeyName");
  __name2(peg$parseFunctionArgKeyName, "peg$parseFunctionArgKeyName");
  function peg$parseFunctionArgValue() {
    let s0, s1, s2, s3;
    s0 = peg$parseFunctionCall();
    if (s0 === peg$FAILED) {
      s0 = peg$parsequotedString();
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$currPos;
        s2 = [];
        s3 = input.charAt(peg$currPos);
        if (peg$r6.test(s3)) {
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$e16);
          }
        }
        if (s3 !== peg$FAILED) {
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = input.charAt(peg$currPos);
            if (peg$r6.test(s3)) {
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$e16);
              }
            }
          }
        } else {
          s2 = peg$FAILED;
        }
        if (s2 !== peg$FAILED) {
          s1 = input.substring(s1, peg$currPos);
        } else {
          s1 = s2;
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$f12();
        }
        s0 = s1;
      }
    }
    return s0;
  }
  __name(peg$parseFunctionArgValue, "peg$parseFunctionArgValue");
  __name2(peg$parseFunctionArgValue, "peg$parseFunctionArgValue");
  function peg$parseDivider() {
    let s0, s1, s2, s3, s4, s5, s6, s7;
    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 35) {
      s1 = peg$c3;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$e5);
      }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$currPos;
      s3 = peg$parse_();
      s2 = input.substring(s2, peg$currPos);
      s3 = peg$currPos;
      s4 = peg$currPos;
      s5 = peg$currPos;
      s6 = [];
      s7 = input.charAt(peg$currPos);
      if (peg$r7.test(s7)) {
        peg$currPos++;
      } else {
        s7 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e17);
        }
      }
      while (s7 !== peg$FAILED) {
        s6.push(s7);
        s7 = input.charAt(peg$currPos);
        if (peg$r7.test(s7)) {
          peg$currPos++;
        } else {
          s7 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$e17);
          }
        }
      }
      if (s6.length < 3) {
        peg$currPos = s5;
        s5 = peg$FAILED;
      } else {
        s5 = s6;
      }
      if (s5 !== peg$FAILED) {
        s6 = [];
        s7 = input.charAt(peg$currPos);
        if (peg$r2.test(s7)) {
          peg$currPos++;
        } else {
          s7 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$e7);
          }
        }
        while (s7 !== peg$FAILED) {
          s6.push(s7);
          s7 = input.charAt(peg$currPos);
          if (peg$r2.test(s7)) {
            peg$currPos++;
          } else {
            s7 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e7);
            }
          }
        }
        s5 = [s5, s6];
        s4 = s5;
      } else {
        peg$currPos = s4;
        s4 = peg$FAILED;
      }
      if (s4 !== peg$FAILED) {
        s3 = input.substring(s3, peg$currPos);
      } else {
        s3 = s4;
      }
      if (s3 !== peg$FAILED) {
        s4 = peg$parse_n();
        if (s4 !== peg$FAILED) {
          peg$savedPos = s0;
          s0 = peg$f13(s2, s3);
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    return s0;
  }
  __name(peg$parseDivider, "peg$parseDivider");
  __name2(peg$parseDivider, "peg$parseDivider");
  function peg$parseunquotedString() {
    let s0, s1, s2, s3, s4, s5, s6;
    s0 = peg$currPos;
    s1 = peg$currPos;
    s2 = peg$currPos;
    s3 = peg$parse_();
    s4 = peg$currPos;
    peg$silentFails++;
    s5 = input.charAt(peg$currPos);
    if (peg$r8.test(s5)) {
      peg$currPos++;
    } else {
      s5 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$e18);
      }
    }
    peg$silentFails--;
    if (s5 === peg$FAILED) {
      s4 = void 0;
    } else {
      peg$currPos = s4;
      s4 = peg$FAILED;
    }
    if (s4 !== peg$FAILED) {
      s5 = [];
      s6 = input.charAt(peg$currPos);
      if (peg$r9.test(s6)) {
        peg$currPos++;
      } else {
        s6 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e19);
        }
      }
      if (s6 !== peg$FAILED) {
        while (s6 !== peg$FAILED) {
          s5.push(s6);
          s6 = input.charAt(peg$currPos);
          if (peg$r9.test(s6)) {
            peg$currPos++;
          } else {
            s6 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e19);
            }
          }
        }
      } else {
        s5 = peg$FAILED;
      }
      if (s5 !== peg$FAILED) {
        s3 = [s3, s4, s5];
        s2 = s3;
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }
    } else {
      peg$currPos = s2;
      s2 = peg$FAILED;
    }
    if (s2 !== peg$FAILED) {
      s1 = input.substring(s1, peg$currPos);
    } else {
      s1 = s2;
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$f14();
    }
    s0 = s1;
    return s0;
  }
  __name(peg$parseunquotedString, "peg$parseunquotedString");
  __name2(peg$parseunquotedString, "peg$parseunquotedString");
  function peg$parseunquotedStringWithoutSpaces() {
    let s0, s1, s2, s3, s4, s5;
    s0 = peg$currPos;
    s1 = peg$currPos;
    s2 = peg$currPos;
    s3 = peg$currPos;
    peg$silentFails++;
    s4 = input.charAt(peg$currPos);
    if (peg$r8.test(s4)) {
      peg$currPos++;
    } else {
      s4 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$e18);
      }
    }
    peg$silentFails--;
    if (s4 === peg$FAILED) {
      s3 = void 0;
    } else {
      peg$currPos = s3;
      s3 = peg$FAILED;
    }
    if (s3 !== peg$FAILED) {
      s4 = [];
      s5 = input.charAt(peg$currPos);
      if (peg$r10.test(s5)) {
        peg$currPos++;
      } else {
        s5 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e20);
        }
      }
      if (s5 !== peg$FAILED) {
        while (s5 !== peg$FAILED) {
          s4.push(s5);
          s5 = input.charAt(peg$currPos);
          if (peg$r10.test(s5)) {
            peg$currPos++;
          } else {
            s5 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e20);
            }
          }
        }
      } else {
        s4 = peg$FAILED;
      }
      if (s4 !== peg$FAILED) {
        s3 = [s3, s4];
        s2 = s3;
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }
    } else {
      peg$currPos = s2;
      s2 = peg$FAILED;
    }
    if (s2 !== peg$FAILED) {
      s1 = input.substring(s1, peg$currPos);
    } else {
      s1 = s2;
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$f15();
    }
    s0 = s1;
    return s0;
  }
  __name(peg$parseunquotedStringWithoutSpaces, "peg$parseunquotedStringWithoutSpaces");
  __name2(peg$parseunquotedStringWithoutSpaces, "peg$parseunquotedStringWithoutSpaces");
  function peg$parsequotedString() {
    let s0;
    s0 = peg$parseDQuotedString();
    if (s0 === peg$FAILED) {
      s0 = peg$parseSQuotedString();
      if (s0 === peg$FAILED) {
        s0 = peg$parseBQuotedString();
      }
    }
    return s0;
  }
  __name(peg$parsequotedString, "peg$parsequotedString");
  __name2(peg$parsequotedString, "peg$parsequotedString");
  function peg$parseDQuotedString() {
    let s0, s1, s2, s3;
    s0 = peg$currPos;
    s1 = input.charAt(peg$currPos);
    if (peg$r11.test(s1)) {
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$e21);
      }
    }
    if (s1 !== peg$FAILED) {
      s2 = [];
      if (input.substr(peg$currPos, 2) === peg$c10) {
        s3 = peg$c10;
        peg$currPos += 2;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e22);
        }
      }
      if (s3 === peg$FAILED) {
        s3 = input.charAt(peg$currPos);
        if (peg$r12.test(s3)) {
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$e23);
          }
        }
      }
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        if (input.substr(peg$currPos, 2) === peg$c10) {
          s3 = peg$c10;
          peg$currPos += 2;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$e22);
          }
        }
        if (s3 === peg$FAILED) {
          s3 = input.charAt(peg$currPos);
          if (peg$r12.test(s3)) {
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e23);
            }
          }
        }
      }
      s3 = input.charAt(peg$currPos);
      if (peg$r11.test(s3)) {
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e21);
        }
      }
      if (s3 !== peg$FAILED) {
        peg$savedPos = s0;
        s0 = peg$f16(s1);
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    return s0;
  }
  __name(peg$parseDQuotedString, "peg$parseDQuotedString");
  __name2(peg$parseDQuotedString, "peg$parseDQuotedString");
  function peg$parseSQuotedString() {
    let s0, s1, s2, s3;
    s0 = peg$currPos;
    s1 = input.charAt(peg$currPos);
    if (peg$r13.test(s1)) {
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$e24);
      }
    }
    if (s1 !== peg$FAILED) {
      s2 = [];
      if (input.substr(peg$currPos, 2) === peg$c11) {
        s3 = peg$c11;
        peg$currPos += 2;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e25);
        }
      }
      if (s3 === peg$FAILED) {
        s3 = input.charAt(peg$currPos);
        if (peg$r14.test(s3)) {
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$e26);
          }
        }
      }
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        if (input.substr(peg$currPos, 2) === peg$c11) {
          s3 = peg$c11;
          peg$currPos += 2;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$e25);
          }
        }
        if (s3 === peg$FAILED) {
          s3 = input.charAt(peg$currPos);
          if (peg$r14.test(s3)) {
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e26);
            }
          }
        }
      }
      s3 = input.charAt(peg$currPos);
      if (peg$r13.test(s3)) {
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e24);
        }
      }
      if (s3 !== peg$FAILED) {
        peg$savedPos = s0;
        s0 = peg$f17(s1);
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    return s0;
  }
  __name(peg$parseSQuotedString, "peg$parseSQuotedString");
  __name2(peg$parseSQuotedString, "peg$parseSQuotedString");
  function peg$parseBQuotedString() {
    let s0, s1, s2, s3;
    s0 = peg$currPos;
    s1 = input.charAt(peg$currPos);
    if (peg$r15.test(s1)) {
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$e27);
      }
    }
    if (s1 !== peg$FAILED) {
      s2 = [];
      if (input.substr(peg$currPos, 2) === peg$c12) {
        s3 = peg$c12;
        peg$currPos += 2;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e28);
        }
      }
      if (s3 === peg$FAILED) {
        s3 = input.charAt(peg$currPos);
        if (peg$r16.test(s3)) {
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$e29);
          }
        }
      }
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        if (input.substr(peg$currPos, 2) === peg$c12) {
          s3 = peg$c12;
          peg$currPos += 2;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$e28);
          }
        }
        if (s3 === peg$FAILED) {
          s3 = input.charAt(peg$currPos);
          if (peg$r16.test(s3)) {
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e29);
            }
          }
        }
      }
      s3 = input.charAt(peg$currPos);
      if (peg$r15.test(s3)) {
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e27);
        }
      }
      if (s3 !== peg$FAILED) {
        peg$savedPos = s0;
        s0 = peg$f18(s1);
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    return s0;
  }
  __name(peg$parseBQuotedString, "peg$parseBQuotedString");
  __name2(peg$parseBQuotedString, "peg$parseBQuotedString");
  function peg$parsemultiLineString() {
    let s0;
    s0 = peg$parsesingleSQuotedMultiLineString();
    if (s0 === peg$FAILED) {
      s0 = peg$parsesingleDQuotedMultiLineString();
      if (s0 === peg$FAILED) {
        s0 = peg$parsetripleDQuotedMultiLineString();
        if (s0 === peg$FAILED) {
          s0 = peg$parsetripleBQuotedMultiLineString();
        }
      }
    }
    return s0;
  }
  __name(peg$parsemultiLineString, "peg$parsemultiLineString");
  __name2(peg$parsemultiLineString, "peg$parsemultiLineString");
  function peg$parsesingleSQuotedMultiLineString() {
    let s0, s1, s2, s3, s4, s5;
    s0 = peg$currPos;
    s1 = input.charAt(peg$currPos);
    if (peg$r13.test(s1)) {
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$e24);
      }
    }
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$currPos;
      s4 = [];
      if (input.substr(peg$currPos, 2) === peg$c11) {
        s5 = peg$c11;
        peg$currPos += 2;
      } else {
        s5 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e25);
        }
      }
      if (s5 === peg$FAILED) {
        s5 = input.charAt(peg$currPos);
        if (peg$r14.test(s5)) {
          peg$currPos++;
        } else {
          s5 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$e26);
          }
        }
      }
      while (s5 !== peg$FAILED) {
        s4.push(s5);
        if (input.substr(peg$currPos, 2) === peg$c11) {
          s5 = peg$c11;
          peg$currPos += 2;
        } else {
          s5 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$e25);
          }
        }
        if (s5 === peg$FAILED) {
          s5 = input.charAt(peg$currPos);
          if (peg$r14.test(s5)) {
            peg$currPos++;
          } else {
            s5 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e26);
            }
          }
        }
      }
      if (input.charCodeAt(peg$currPos) === 10) {
        s5 = peg$c0;
        peg$currPos++;
      } else {
        s5 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e0);
        }
      }
      if (s5 !== peg$FAILED) {
        s4 = [s4, s5];
        s3 = s4;
      } else {
        peg$currPos = s3;
        s3 = peg$FAILED;
      }
      if (s3 !== peg$FAILED) {
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$currPos;
          s4 = [];
          if (input.substr(peg$currPos, 2) === peg$c11) {
            s5 = peg$c11;
            peg$currPos += 2;
          } else {
            s5 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e25);
            }
          }
          if (s5 === peg$FAILED) {
            s5 = input.charAt(peg$currPos);
            if (peg$r14.test(s5)) {
              peg$currPos++;
            } else {
              s5 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$e26);
              }
            }
          }
          while (s5 !== peg$FAILED) {
            s4.push(s5);
            if (input.substr(peg$currPos, 2) === peg$c11) {
              s5 = peg$c11;
              peg$currPos += 2;
            } else {
              s5 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$e25);
              }
            }
            if (s5 === peg$FAILED) {
              s5 = input.charAt(peg$currPos);
              if (peg$r14.test(s5)) {
                peg$currPos++;
              } else {
                s5 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$e26);
                }
              }
            }
          }
          if (input.charCodeAt(peg$currPos) === 10) {
            s5 = peg$c0;
            peg$currPos++;
          } else {
            s5 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e0);
            }
          }
          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        }
      } else {
        s2 = peg$FAILED;
      }
      if (s2 !== peg$FAILED) {
        s3 = [];
        if (input.substr(peg$currPos, 2) === peg$c11) {
          s4 = peg$c11;
          peg$currPos += 2;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$e25);
          }
        }
        if (s4 === peg$FAILED) {
          s4 = input.charAt(peg$currPos);
          if (peg$r14.test(s4)) {
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e26);
            }
          }
        }
        while (s4 !== peg$FAILED) {
          s3.push(s4);
          if (input.substr(peg$currPos, 2) === peg$c11) {
            s4 = peg$c11;
            peg$currPos += 2;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e25);
            }
          }
          if (s4 === peg$FAILED) {
            s4 = input.charAt(peg$currPos);
            if (peg$r14.test(s4)) {
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$e26);
              }
            }
          }
        }
        s4 = input.charAt(peg$currPos);
        if (peg$r13.test(s4)) {
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$e24);
          }
        }
        if (s4 !== peg$FAILED) {
          peg$savedPos = s0;
          s0 = peg$f19(s1);
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    return s0;
  }
  __name(peg$parsesingleSQuotedMultiLineString, "peg$parsesingleSQuotedMultiLineString");
  __name2(peg$parsesingleSQuotedMultiLineString, "peg$parsesingleSQuotedMultiLineString");
  function peg$parsesingleDQuotedMultiLineString() {
    let s0, s1, s2, s3, s4, s5;
    s0 = peg$currPos;
    s1 = input.charAt(peg$currPos);
    if (peg$r11.test(s1)) {
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$e21);
      }
    }
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$currPos;
      s4 = [];
      if (input.substr(peg$currPos, 2) === peg$c10) {
        s5 = peg$c10;
        peg$currPos += 2;
      } else {
        s5 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e22);
        }
      }
      if (s5 === peg$FAILED) {
        s5 = input.charAt(peg$currPos);
        if (peg$r12.test(s5)) {
          peg$currPos++;
        } else {
          s5 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$e23);
          }
        }
      }
      while (s5 !== peg$FAILED) {
        s4.push(s5);
        if (input.substr(peg$currPos, 2) === peg$c10) {
          s5 = peg$c10;
          peg$currPos += 2;
        } else {
          s5 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$e22);
          }
        }
        if (s5 === peg$FAILED) {
          s5 = input.charAt(peg$currPos);
          if (peg$r12.test(s5)) {
            peg$currPos++;
          } else {
            s5 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e23);
            }
          }
        }
      }
      if (input.charCodeAt(peg$currPos) === 10) {
        s5 = peg$c0;
        peg$currPos++;
      } else {
        s5 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e0);
        }
      }
      if (s5 !== peg$FAILED) {
        s4 = [s4, s5];
        s3 = s4;
      } else {
        peg$currPos = s3;
        s3 = peg$FAILED;
      }
      if (s3 !== peg$FAILED) {
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$currPos;
          s4 = [];
          if (input.substr(peg$currPos, 2) === peg$c10) {
            s5 = peg$c10;
            peg$currPos += 2;
          } else {
            s5 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e22);
            }
          }
          if (s5 === peg$FAILED) {
            s5 = input.charAt(peg$currPos);
            if (peg$r12.test(s5)) {
              peg$currPos++;
            } else {
              s5 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$e23);
              }
            }
          }
          while (s5 !== peg$FAILED) {
            s4.push(s5);
            if (input.substr(peg$currPos, 2) === peg$c10) {
              s5 = peg$c10;
              peg$currPos += 2;
            } else {
              s5 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$e22);
              }
            }
            if (s5 === peg$FAILED) {
              s5 = input.charAt(peg$currPos);
              if (peg$r12.test(s5)) {
                peg$currPos++;
              } else {
                s5 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$e23);
                }
              }
            }
          }
          if (input.charCodeAt(peg$currPos) === 10) {
            s5 = peg$c0;
            peg$currPos++;
          } else {
            s5 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e0);
            }
          }
          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        }
      } else {
        s2 = peg$FAILED;
      }
      if (s2 !== peg$FAILED) {
        s3 = [];
        if (input.substr(peg$currPos, 2) === peg$c10) {
          s4 = peg$c10;
          peg$currPos += 2;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$e22);
          }
        }
        if (s4 === peg$FAILED) {
          s4 = input.charAt(peg$currPos);
          if (peg$r12.test(s4)) {
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e23);
            }
          }
        }
        while (s4 !== peg$FAILED) {
          s3.push(s4);
          if (input.substr(peg$currPos, 2) === peg$c10) {
            s4 = peg$c10;
            peg$currPos += 2;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e22);
            }
          }
          if (s4 === peg$FAILED) {
            s4 = input.charAt(peg$currPos);
            if (peg$r12.test(s4)) {
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$e23);
              }
            }
          }
        }
        s4 = input.charAt(peg$currPos);
        if (peg$r11.test(s4)) {
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$e21);
          }
        }
        if (s4 !== peg$FAILED) {
          peg$savedPos = s0;
          s0 = peg$f20(s1);
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    return s0;
  }
  __name(peg$parsesingleDQuotedMultiLineString, "peg$parsesingleDQuotedMultiLineString");
  __name2(peg$parsesingleDQuotedMultiLineString, "peg$parsesingleDQuotedMultiLineString");
  function peg$parsetripleDQuotedMultiLineString() {
    let s0, s1, s2, s3, s4, s5, s6, s7;
    s0 = peg$currPos;
    if (input.substr(peg$currPos, 3) === peg$c13) {
      s1 = peg$c13;
      peg$currPos += 3;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$e30);
      }
    }
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$currPos;
      s4 = [];
      if (input.substr(peg$currPos, 4) === peg$c14) {
        s5 = peg$c14;
        peg$currPos += 4;
      } else {
        s5 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e31);
        }
      }
      if (s5 === peg$FAILED) {
        s5 = peg$currPos;
        s6 = peg$currPos;
        peg$silentFails++;
        if (input.substr(peg$currPos, 3) === peg$c13) {
          s7 = peg$c13;
          peg$currPos += 3;
        } else {
          s7 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$e30);
          }
        }
        peg$silentFails--;
        if (s7 === peg$FAILED) {
          s6 = void 0;
        } else {
          peg$currPos = s6;
          s6 = peg$FAILED;
        }
        if (s6 !== peg$FAILED) {
          s7 = input.charAt(peg$currPos);
          if (peg$r2.test(s7)) {
            peg$currPos++;
          } else {
            s7 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e7);
            }
          }
          if (s7 !== peg$FAILED) {
            s6 = [s6, s7];
            s5 = s6;
          } else {
            peg$currPos = s5;
            s5 = peg$FAILED;
          }
        } else {
          peg$currPos = s5;
          s5 = peg$FAILED;
        }
      }
      while (s5 !== peg$FAILED) {
        s4.push(s5);
        if (input.substr(peg$currPos, 4) === peg$c14) {
          s5 = peg$c14;
          peg$currPos += 4;
        } else {
          s5 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$e31);
          }
        }
        if (s5 === peg$FAILED) {
          s5 = peg$currPos;
          s6 = peg$currPos;
          peg$silentFails++;
          if (input.substr(peg$currPos, 3) === peg$c13) {
            s7 = peg$c13;
            peg$currPos += 3;
          } else {
            s7 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e30);
            }
          }
          peg$silentFails--;
          if (s7 === peg$FAILED) {
            s6 = void 0;
          } else {
            peg$currPos = s6;
            s6 = peg$FAILED;
          }
          if (s6 !== peg$FAILED) {
            s7 = input.charAt(peg$currPos);
            if (peg$r2.test(s7)) {
              peg$currPos++;
            } else {
              s7 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$e7);
              }
            }
            if (s7 !== peg$FAILED) {
              s6 = [s6, s7];
              s5 = s6;
            } else {
              peg$currPos = s5;
              s5 = peg$FAILED;
            }
          } else {
            peg$currPos = s5;
            s5 = peg$FAILED;
          }
        }
      }
      if (input.charCodeAt(peg$currPos) === 10) {
        s5 = peg$c0;
        peg$currPos++;
      } else {
        s5 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e0);
        }
      }
      if (s5 !== peg$FAILED) {
        s4 = [s4, s5];
        s3 = s4;
      } else {
        peg$currPos = s3;
        s3 = peg$FAILED;
      }
      if (s3 !== peg$FAILED) {
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$currPos;
          s4 = [];
          if (input.substr(peg$currPos, 4) === peg$c14) {
            s5 = peg$c14;
            peg$currPos += 4;
          } else {
            s5 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e31);
            }
          }
          if (s5 === peg$FAILED) {
            s5 = peg$currPos;
            s6 = peg$currPos;
            peg$silentFails++;
            if (input.substr(peg$currPos, 3) === peg$c13) {
              s7 = peg$c13;
              peg$currPos += 3;
            } else {
              s7 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$e30);
              }
            }
            peg$silentFails--;
            if (s7 === peg$FAILED) {
              s6 = void 0;
            } else {
              peg$currPos = s6;
              s6 = peg$FAILED;
            }
            if (s6 !== peg$FAILED) {
              s7 = input.charAt(peg$currPos);
              if (peg$r2.test(s7)) {
                peg$currPos++;
              } else {
                s7 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$e7);
                }
              }
              if (s7 !== peg$FAILED) {
                s6 = [s6, s7];
                s5 = s6;
              } else {
                peg$currPos = s5;
                s5 = peg$FAILED;
              }
            } else {
              peg$currPos = s5;
              s5 = peg$FAILED;
            }
          }
          while (s5 !== peg$FAILED) {
            s4.push(s5);
            if (input.substr(peg$currPos, 4) === peg$c14) {
              s5 = peg$c14;
              peg$currPos += 4;
            } else {
              s5 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$e31);
              }
            }
            if (s5 === peg$FAILED) {
              s5 = peg$currPos;
              s6 = peg$currPos;
              peg$silentFails++;
              if (input.substr(peg$currPos, 3) === peg$c13) {
                s7 = peg$c13;
                peg$currPos += 3;
              } else {
                s7 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$e30);
                }
              }
              peg$silentFails--;
              if (s7 === peg$FAILED) {
                s6 = void 0;
              } else {
                peg$currPos = s6;
                s6 = peg$FAILED;
              }
              if (s6 !== peg$FAILED) {
                s7 = input.charAt(peg$currPos);
                if (peg$r2.test(s7)) {
                  peg$currPos++;
                } else {
                  s7 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$e7);
                  }
                }
                if (s7 !== peg$FAILED) {
                  s6 = [s6, s7];
                  s5 = s6;
                } else {
                  peg$currPos = s5;
                  s5 = peg$FAILED;
                }
              } else {
                peg$currPos = s5;
                s5 = peg$FAILED;
              }
            }
          }
          if (input.charCodeAt(peg$currPos) === 10) {
            s5 = peg$c0;
            peg$currPos++;
          } else {
            s5 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e0);
            }
          }
          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        }
      } else {
        s2 = peg$FAILED;
      }
      if (s2 !== peg$FAILED) {
        s3 = [];
        if (input.substr(peg$currPos, 4) === peg$c14) {
          s4 = peg$c14;
          peg$currPos += 4;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$e31);
          }
        }
        if (s4 === peg$FAILED) {
          s4 = peg$currPos;
          s5 = peg$currPos;
          peg$silentFails++;
          if (input.substr(peg$currPos, 3) === peg$c13) {
            s6 = peg$c13;
            peg$currPos += 3;
          } else {
            s6 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e30);
            }
          }
          peg$silentFails--;
          if (s6 === peg$FAILED) {
            s5 = void 0;
          } else {
            peg$currPos = s5;
            s5 = peg$FAILED;
          }
          if (s5 !== peg$FAILED) {
            s6 = input.charAt(peg$currPos);
            if (peg$r2.test(s6)) {
              peg$currPos++;
            } else {
              s6 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$e7);
              }
            }
            if (s6 !== peg$FAILED) {
              s5 = [s5, s6];
              s4 = s5;
            } else {
              peg$currPos = s4;
              s4 = peg$FAILED;
            }
          } else {
            peg$currPos = s4;
            s4 = peg$FAILED;
          }
        }
        while (s4 !== peg$FAILED) {
          s3.push(s4);
          if (input.substr(peg$currPos, 4) === peg$c14) {
            s4 = peg$c14;
            peg$currPos += 4;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e31);
            }
          }
          if (s4 === peg$FAILED) {
            s4 = peg$currPos;
            s5 = peg$currPos;
            peg$silentFails++;
            if (input.substr(peg$currPos, 3) === peg$c13) {
              s6 = peg$c13;
              peg$currPos += 3;
            } else {
              s6 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$e30);
              }
            }
            peg$silentFails--;
            if (s6 === peg$FAILED) {
              s5 = void 0;
            } else {
              peg$currPos = s5;
              s5 = peg$FAILED;
            }
            if (s5 !== peg$FAILED) {
              s6 = input.charAt(peg$currPos);
              if (peg$r2.test(s6)) {
                peg$currPos++;
              } else {
                s6 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$e7);
                }
              }
              if (s6 !== peg$FAILED) {
                s5 = [s5, s6];
                s4 = s5;
              } else {
                peg$currPos = s4;
                s4 = peg$FAILED;
              }
            } else {
              peg$currPos = s4;
              s4 = peg$FAILED;
            }
          }
        }
        if (input.substr(peg$currPos, 3) === peg$c13) {
          s4 = peg$c13;
          peg$currPos += 3;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$e30);
          }
        }
        if (s4 !== peg$FAILED) {
          peg$savedPos = s0;
          s0 = peg$f21(s1);
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    return s0;
  }
  __name(peg$parsetripleDQuotedMultiLineString, "peg$parsetripleDQuotedMultiLineString");
  __name2(peg$parsetripleDQuotedMultiLineString, "peg$parsetripleDQuotedMultiLineString");
  function peg$parsetripleBQuotedMultiLineString() {
    let s0, s1, s2, s3, s4, s5, s6, s7;
    s0 = peg$currPos;
    if (input.substr(peg$currPos, 3) === peg$c15) {
      s1 = peg$c15;
      peg$currPos += 3;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$e32);
      }
    }
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$currPos;
      s4 = [];
      if (input.substr(peg$currPos, 4) === peg$c16) {
        s5 = peg$c16;
        peg$currPos += 4;
      } else {
        s5 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e33);
        }
      }
      if (s5 === peg$FAILED) {
        s5 = peg$currPos;
        s6 = peg$currPos;
        peg$silentFails++;
        if (input.substr(peg$currPos, 3) === peg$c15) {
          s7 = peg$c15;
          peg$currPos += 3;
        } else {
          s7 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$e32);
          }
        }
        peg$silentFails--;
        if (s7 === peg$FAILED) {
          s6 = void 0;
        } else {
          peg$currPos = s6;
          s6 = peg$FAILED;
        }
        if (s6 !== peg$FAILED) {
          s7 = input.charAt(peg$currPos);
          if (peg$r2.test(s7)) {
            peg$currPos++;
          } else {
            s7 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e7);
            }
          }
          if (s7 !== peg$FAILED) {
            s6 = [s6, s7];
            s5 = s6;
          } else {
            peg$currPos = s5;
            s5 = peg$FAILED;
          }
        } else {
          peg$currPos = s5;
          s5 = peg$FAILED;
        }
      }
      while (s5 !== peg$FAILED) {
        s4.push(s5);
        if (input.substr(peg$currPos, 4) === peg$c16) {
          s5 = peg$c16;
          peg$currPos += 4;
        } else {
          s5 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$e33);
          }
        }
        if (s5 === peg$FAILED) {
          s5 = peg$currPos;
          s6 = peg$currPos;
          peg$silentFails++;
          if (input.substr(peg$currPos, 3) === peg$c15) {
            s7 = peg$c15;
            peg$currPos += 3;
          } else {
            s7 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e32);
            }
          }
          peg$silentFails--;
          if (s7 === peg$FAILED) {
            s6 = void 0;
          } else {
            peg$currPos = s6;
            s6 = peg$FAILED;
          }
          if (s6 !== peg$FAILED) {
            s7 = input.charAt(peg$currPos);
            if (peg$r2.test(s7)) {
              peg$currPos++;
            } else {
              s7 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$e7);
              }
            }
            if (s7 !== peg$FAILED) {
              s6 = [s6, s7];
              s5 = s6;
            } else {
              peg$currPos = s5;
              s5 = peg$FAILED;
            }
          } else {
            peg$currPos = s5;
            s5 = peg$FAILED;
          }
        }
      }
      if (input.charCodeAt(peg$currPos) === 10) {
        s5 = peg$c0;
        peg$currPos++;
      } else {
        s5 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e0);
        }
      }
      if (s5 !== peg$FAILED) {
        s4 = [s4, s5];
        s3 = s4;
      } else {
        peg$currPos = s3;
        s3 = peg$FAILED;
      }
      if (s3 !== peg$FAILED) {
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$currPos;
          s4 = [];
          if (input.substr(peg$currPos, 4) === peg$c16) {
            s5 = peg$c16;
            peg$currPos += 4;
          } else {
            s5 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e33);
            }
          }
          if (s5 === peg$FAILED) {
            s5 = peg$currPos;
            s6 = peg$currPos;
            peg$silentFails++;
            if (input.substr(peg$currPos, 3) === peg$c15) {
              s7 = peg$c15;
              peg$currPos += 3;
            } else {
              s7 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$e32);
              }
            }
            peg$silentFails--;
            if (s7 === peg$FAILED) {
              s6 = void 0;
            } else {
              peg$currPos = s6;
              s6 = peg$FAILED;
            }
            if (s6 !== peg$FAILED) {
              s7 = input.charAt(peg$currPos);
              if (peg$r2.test(s7)) {
                peg$currPos++;
              } else {
                s7 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$e7);
                }
              }
              if (s7 !== peg$FAILED) {
                s6 = [s6, s7];
                s5 = s6;
              } else {
                peg$currPos = s5;
                s5 = peg$FAILED;
              }
            } else {
              peg$currPos = s5;
              s5 = peg$FAILED;
            }
          }
          while (s5 !== peg$FAILED) {
            s4.push(s5);
            if (input.substr(peg$currPos, 4) === peg$c16) {
              s5 = peg$c16;
              peg$currPos += 4;
            } else {
              s5 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$e33);
              }
            }
            if (s5 === peg$FAILED) {
              s5 = peg$currPos;
              s6 = peg$currPos;
              peg$silentFails++;
              if (input.substr(peg$currPos, 3) === peg$c15) {
                s7 = peg$c15;
                peg$currPos += 3;
              } else {
                s7 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$e32);
                }
              }
              peg$silentFails--;
              if (s7 === peg$FAILED) {
                s6 = void 0;
              } else {
                peg$currPos = s6;
                s6 = peg$FAILED;
              }
              if (s6 !== peg$FAILED) {
                s7 = input.charAt(peg$currPos);
                if (peg$r2.test(s7)) {
                  peg$currPos++;
                } else {
                  s7 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$e7);
                  }
                }
                if (s7 !== peg$FAILED) {
                  s6 = [s6, s7];
                  s5 = s6;
                } else {
                  peg$currPos = s5;
                  s5 = peg$FAILED;
                }
              } else {
                peg$currPos = s5;
                s5 = peg$FAILED;
              }
            }
          }
          if (input.charCodeAt(peg$currPos) === 10) {
            s5 = peg$c0;
            peg$currPos++;
          } else {
            s5 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e0);
            }
          }
          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        }
      } else {
        s2 = peg$FAILED;
      }
      if (s2 !== peg$FAILED) {
        s3 = [];
        if (input.substr(peg$currPos, 4) === peg$c16) {
          s4 = peg$c16;
          peg$currPos += 4;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$e33);
          }
        }
        if (s4 === peg$FAILED) {
          s4 = peg$currPos;
          s5 = peg$currPos;
          peg$silentFails++;
          if (input.substr(peg$currPos, 3) === peg$c15) {
            s6 = peg$c15;
            peg$currPos += 3;
          } else {
            s6 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e32);
            }
          }
          peg$silentFails--;
          if (s6 === peg$FAILED) {
            s5 = void 0;
          } else {
            peg$currPos = s5;
            s5 = peg$FAILED;
          }
          if (s5 !== peg$FAILED) {
            s6 = input.charAt(peg$currPos);
            if (peg$r2.test(s6)) {
              peg$currPos++;
            } else {
              s6 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$e7);
              }
            }
            if (s6 !== peg$FAILED) {
              s5 = [s5, s6];
              s4 = s5;
            } else {
              peg$currPos = s4;
              s4 = peg$FAILED;
            }
          } else {
            peg$currPos = s4;
            s4 = peg$FAILED;
          }
        }
        while (s4 !== peg$FAILED) {
          s3.push(s4);
          if (input.substr(peg$currPos, 4) === peg$c16) {
            s4 = peg$c16;
            peg$currPos += 4;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e33);
            }
          }
          if (s4 === peg$FAILED) {
            s4 = peg$currPos;
            s5 = peg$currPos;
            peg$silentFails++;
            if (input.substr(peg$currPos, 3) === peg$c15) {
              s6 = peg$c15;
              peg$currPos += 3;
            } else {
              s6 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$e32);
              }
            }
            peg$silentFails--;
            if (s6 === peg$FAILED) {
              s5 = void 0;
            } else {
              peg$currPos = s5;
              s5 = peg$FAILED;
            }
            if (s5 !== peg$FAILED) {
              s6 = input.charAt(peg$currPos);
              if (peg$r2.test(s6)) {
                peg$currPos++;
              } else {
                s6 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$e7);
                }
              }
              if (s6 !== peg$FAILED) {
                s5 = [s5, s6];
                s4 = s5;
              } else {
                peg$currPos = s4;
                s4 = peg$FAILED;
              }
            } else {
              peg$currPos = s4;
              s4 = peg$FAILED;
            }
          }
        }
        if (input.substr(peg$currPos, 3) === peg$c15) {
          s4 = peg$c15;
          peg$currPos += 3;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$e32);
          }
        }
        if (s4 !== peg$FAILED) {
          peg$savedPos = s0;
          s0 = peg$f22(s1);
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    return s0;
  }
  __name(peg$parsetripleBQuotedMultiLineString, "peg$parsetripleBQuotedMultiLineString");
  __name2(peg$parsetripleBQuotedMultiLineString, "peg$parsetripleBQuotedMultiLineString");
  function peg$parse_n() {
    let s0, s1;
    if (input.charCodeAt(peg$currPos) === 10) {
      s0 = peg$c0;
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$e0);
      }
    }
    if (s0 === peg$FAILED) {
      s0 = peg$currPos;
      peg$silentFails++;
      if (input.length > peg$currPos) {
        s1 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e34);
        }
      }
      peg$silentFails--;
      if (s1 === peg$FAILED) {
        s0 = void 0;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    }
    return s0;
  }
  __name(peg$parse_n, "peg$parse_n");
  __name2(peg$parse_n, "peg$parse_n");
  function peg$parse_() {
    let s0, s1;
    s0 = [];
    s1 = input.charAt(peg$currPos);
    if (peg$r17.test(s1)) {
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$e35);
      }
    }
    while (s1 !== peg$FAILED) {
      s0.push(s1);
      s1 = input.charAt(peg$currPos);
      if (peg$r17.test(s1)) {
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e35);
        }
      }
    }
    return s0;
  }
  __name(peg$parse_, "peg$parse_");
  __name2(peg$parse_, "peg$parse_");
  function peg$parse__() {
    let s0, s1;
    s0 = [];
    s1 = input.charAt(peg$currPos);
    if (peg$r17.test(s1)) {
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$e35);
      }
    }
    if (s1 !== peg$FAILED) {
      while (s1 !== peg$FAILED) {
        s0.push(s1);
        s1 = input.charAt(peg$currPos);
        if (peg$r17.test(s1)) {
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$e35);
          }
        }
      }
    } else {
      s0 = peg$FAILED;
    }
    return s0;
  }
  __name(peg$parse__, "peg$parse__");
  __name2(peg$parse__, "peg$parse__");
  peg$result = peg$startRuleFunction();
  const peg$success = peg$result !== peg$FAILED && peg$currPos === input.length;
  function peg$throw() {
    if (peg$result !== peg$FAILED && peg$currPos < input.length) {
      peg$fail(peg$endExpectation());
    }
    throw peg$buildStructuredError(
      peg$maxFailExpected,
      peg$maxFailPos < input.length ? peg$getUnicode(peg$maxFailPos) : null,
      peg$maxFailPos < input.length ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1) : peg$computeLocation(peg$maxFailPos, peg$maxFailPos)
    );
  }
  __name(peg$throw, "peg$throw");
  __name2(peg$throw, "peg$throw");
  if (options.peg$library) {
    return (
      /** @type {any} */
      {
        peg$result,
        peg$currPos,
        peg$FAILED,
        peg$maxFailExpected,
        peg$maxFailPos,
        peg$success,
        peg$throw: peg$success ? void 0 : peg$throw
      }
    );
  }
  if (peg$success) {
    return peg$result;
  } else {
    peg$throw();
  }
}
function parseEnvSpecDotEnvFile(source) {
  return peg$parse(source);
}
var envSpecUpdater, peg$SyntaxError;
var init_dist = __esm({
  "../env-spec-parser/dist/index.mjs"() {
    init_chunk_RQYYQO3M();
    init_chunk_RQYYQO3M();
    __name(ensureHeader, "ensureHeader");
    __name2(ensureHeader, "ensureHeader");
    __name(createDummyDecoratorNode, "createDummyDecoratorNode");
    __name2(createDummyDecoratorNode, "createDummyDecoratorNode");
    __name(setRootDecorator, "setRootDecorator");
    __name2(setRootDecorator, "setRootDecorator");
    __name(setItemDecorator, "setItemDecorator");
    __name2(setItemDecorator, "setItemDecorator");
    __name(injectFromStr, "injectFromStr");
    __name2(injectFromStr, "injectFromStr");
    __name(deleteItem, "deleteItem");
    __name2(deleteItem, "deleteItem");
    envSpecUpdater = {
      ensureHeader,
      setRootDecorator,
      setItemDecorator,
      injectFromStr,
      deleteItem
    };
    peg$SyntaxError = class extends SyntaxError {
      static {
        __name(this, "peg$SyntaxError");
      }
      static {
        __name2(this, "peg$SyntaxError");
      }
      constructor(message, expected, found, location) {
        super(message);
        this.expected = expected;
        this.found = found;
        this.location = location;
        this.name = "SyntaxError";
      }
      format(sources) {
        let str = "Error: " + this.message;
        if (this.location) {
          let src = null;
          const st = sources.find((s2) => s2.source === this.location.source);
          if (st) {
            src = st.text.split(/\r\n|\n|\r/g);
          }
          const s = this.location.start;
          const offset_s = this.location.source && typeof this.location.source.offset === "function" ? this.location.source.offset(s) : s;
          const loc = this.location.source + ":" + offset_s.line + ":" + offset_s.column;
          if (src) {
            const e2 = this.location.end;
            const filler = "".padEnd(offset_s.line.toString().length, " ");
            const line = src[s.line - 1];
            const last = s.line === e2.line ? e2.column : line.length + 1;
            const hatLen = last - s.column || 1;
            str += "\n --> " + loc + "\n" + filler + " |\n" + offset_s.line + " | " + line + "\n" + filler + " | " + "".padEnd(s.column - 1, " ") + "".padEnd(hatLen, "^");
          } else {
            str += "\n at " + loc;
          }
        }
        return str;
      }
      static buildMessage(expected, found) {
        function hex2(ch) {
          return ch.codePointAt(0).toString(16).toUpperCase();
        }
        __name(hex2, "hex");
        __name2(hex2, "hex");
        const nonPrintable = Object.prototype.hasOwnProperty.call(RegExp.prototype, "unicode") ? new RegExp("[\\p{C}\\p{Mn}\\p{Mc}]", "gu") : null;
        function unicodeEscape(s) {
          if (nonPrintable) {
            return s.replace(nonPrintable, (ch) => "\\u{" + hex2(ch) + "}");
          }
          return s;
        }
        __name(unicodeEscape, "unicodeEscape");
        __name2(unicodeEscape, "unicodeEscape");
        function literalEscape(s) {
          return unicodeEscape(s.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, (ch) => "\\x0" + hex2(ch)).replace(/[\x10-\x1F\x7F-\x9F]/g, (ch) => "\\x" + hex2(ch)));
        }
        __name(literalEscape, "literalEscape");
        __name2(literalEscape, "literalEscape");
        function classEscape(s) {
          return unicodeEscape(s.replace(/\\/g, "\\\\").replace(/\]/g, "\\]").replace(/\^/g, "\\^").replace(/-/g, "\\-").replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, (ch) => "\\x0" + hex2(ch)).replace(/[\x10-\x1F\x7F-\x9F]/g, (ch) => "\\x" + hex2(ch)));
        }
        __name(classEscape, "classEscape");
        __name2(classEscape, "classEscape");
        const DESCRIBE_EXPECTATION_FNS = {
          literal(expectation) {
            return '"' + literalEscape(expectation.text) + '"';
          },
          class(expectation) {
            const escapedParts = expectation.parts.map(
              (part) => Array.isArray(part) ? classEscape(part[0]) + "-" + classEscape(part[1]) : classEscape(part)
            );
            return "[" + (expectation.inverted ? "^" : "") + escapedParts.join("") + "]" + (expectation.unicode ? "u" : "");
          },
          any() {
            return "any character";
          },
          end() {
            return "end of input";
          },
          other(expectation) {
            return expectation.description;
          }
        };
        function describeExpectation(expectation) {
          return DESCRIBE_EXPECTATION_FNS[expectation.type](expectation);
        }
        __name(describeExpectation, "describeExpectation");
        __name2(describeExpectation, "describeExpectation");
        function describeExpected(expected2) {
          const descriptions = expected2.map(describeExpectation);
          descriptions.sort();
          if (descriptions.length > 0) {
            let j2 = 1;
            for (let i2 = 1; i2 < descriptions.length; i2++) {
              if (descriptions[i2 - 1] !== descriptions[i2]) {
                descriptions[j2] = descriptions[i2];
                j2++;
              }
            }
            descriptions.length = j2;
          }
          switch (descriptions.length) {
            case 1:
              return descriptions[0];
            case 2:
              return descriptions[0] + " or " + descriptions[1];
            default:
              return descriptions.slice(0, -1).join(", ") + ", or " + descriptions[descriptions.length - 1];
          }
        }
        __name(describeExpected, "describeExpected");
        __name2(describeExpected, "describeExpected");
        function describeFound(found2) {
          return found2 ? '"' + literalEscape(found2) + '"' : "end of input";
        }
        __name(describeFound, "describeFound");
        __name2(describeFound, "describeFound");
        return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
      }
    };
    __name(peg$parse, "peg$parse");
    __name2(peg$parse, "peg$parse");
    __name(parseEnvSpecDotEnvFile, "parseEnvSpecDotEnvFile");
    __name2(parseEnvSpecDotEnvFile, "parseEnvSpecDotEnvFile");
  }
});

// env-graph/lib/errors.ts
var VarlockError, SchemaError, ValidationError, CoercionError, ResolutionError, EmptyRequiredValueError;
var init_errors = __esm({
  "env-graph/lib/errors.ts"() {
    init_my_dash();
    VarlockError = class extends Error {
      constructor(errOrMessage, more) {
        super(my_dash_default.isError(errOrMessage) ? errOrMessage.message : errOrMessage);
        this.more = more;
        if (my_dash_default.isError(errOrMessage)) {
          this.originalError = errOrMessage;
          this.icon = "\u{1F4A5}";
        } else {
          this.originalError = more?.err;
        }
        if (my_dash_default.isArray(more?.tip)) more.tip = more.tip.join("\n");
        this.name = this.constructor.name;
        if (more?.isWarning) this.isWarning = true;
        this.icon ||= this.constructor.defaultIcon;
      }
      static {
        __name(this, "VarlockError");
      }
      originalError;
      get isUnexpected() {
        return !!this.originalError;
      }
      get type() {
        return this.name;
      }
      static defaultIcon = "\u274C";
      icon;
      _isWarning = false;
      get tip() {
        if (!this.more?.tip) return void 0;
        if (my_dash_default.isArray(this.more.tip)) return this.more.tip.join("\n");
        return this.more.tip;
      }
      get code() {
        return this.more?.code;
      }
      get extraMetadata() {
        return this.more?.extraMetadata;
      }
      set isWarning(w2) {
        this._isWarning = w2;
        if (this._isWarning) {
          this.icon = "\u{1F9D0}";
        }
      }
      get isWarning() {
        return this._isWarning;
      }
      toJSON() {
        return {
          icon: this.icon,
          type: this.type,
          name: this.name,
          message: this.message,
          isUnexpected: this.isUnexpected,
          ...this.tip && { tip: this.tip },
          ...this.isWarning && { isWarning: this.isWarning }
        };
      }
    };
    SchemaError = class extends VarlockError {
      static {
        __name(this, "SchemaError");
      }
      static defaultIcon = "\u{1F9F0}";
    };
    ValidationError = class extends VarlockError {
      static {
        __name(this, "ValidationError");
      }
      static defaultIcon = "\u274C";
    };
    CoercionError = class extends VarlockError {
      static {
        __name(this, "CoercionError");
      }
      static defaultIcon = "\u{1F6D1}";
    };
    ResolutionError = class _ResolutionError extends VarlockError {
      static {
        __name(this, "ResolutionError");
      }
      static defaultIcon = "\u26D4";
      _retryable = false;
      set retryable(val) {
        this._retryable = val;
      }
      get retryable() {
        if (this._retryable) return true;
        if (this.originalError instanceof _ResolutionError) return this.originalError.retryable;
        return false;
      }
    };
    EmptyRequiredValueError = class extends ValidationError {
      static {
        __name(this, "EmptyRequiredValueError");
      }
      icon = "\u2753";
      constructor(_val) {
        super("Value is required but is currently empty");
      }
    };
  }
});

// env-graph/lib/data-types.ts
function createEnvGraphDataType(dataTypeDef) {
  const typeFactoryFn = /* @__PURE__ */ __name((...usageOpts) => {
    return new EnvGraphDataType(
      my_dash_default.isFunction(dataTypeDef) ? dataTypeDef(...usageOpts) : dataTypeDef,
      typeFactoryFn
    );
  }, "typeFactoryFn");
  typeFactoryFn._isEnvGraphDataTypeFactory = true;
  const exampleInstance = typeFactoryFn(...[]);
  typeFactoryFn.dataTypeName = exampleInstance.name;
  return typeFactoryFn;
}
function coerceToString(rawVal) {
  if (rawVal === void 0 || rawVal === null) return "";
  return my_dash_default.isString(rawVal) ? rawVal : String(rawVal);
}
function coerceToNumber(rawVal) {
  let numVal;
  if (my_dash_default.isString(rawVal)) {
    const parsed = parseFloat(rawVal);
    if (my_dash_default.isNan(parsed) || parsed === Infinity || parsed === -Infinity) {
      throw new CoercionError("Unable to coerce string to number");
    }
    numVal = parsed;
  } else if (my_dash_default.isNumber(rawVal)) {
    if (numVal === Infinity || numVal === -Infinity) {
      throw new CoercionError("Inifinity is not a valid number");
    }
    numVal = rawVal;
  } else {
    throw new CoercionError(`Cannot convert ${rawVal} to number`);
  }
  return numVal;
}
var EnvGraphDataType, StringDataType, NumberDataType, BooleanDataType, UrlDataType, SimpleObjectDataType, EnumDataType, EMAIL_REGEX, EmailDataType, IP_V4_ADDRESS_REGEX, IP_V6_ADDRESS_REGEX, ipAddressDataType, PortDataType, SEMVER_REGEX, SemverDataType, ISO_DATE_REGEX, IsoDateDataType, UUID_REGEX, UuidDataType, MD5_REGEX, Md5DataType, BaseDataTypes;
var init_data_types = __esm({
  "env-graph/lib/data-types.ts"() {
    init_my_dash();
    init_errors();
    EnvGraphDataType = class {
      constructor(def, factory) {
        this.def = def;
        this.factory = factory;
      }
      static {
        __name(this, "EnvGraphDataType");
      }
      get name() {
        return this.def.name;
      }
      get icon() {
        return this.def.icon;
      }
      /** @internal */
      get _rawDef() {
        return this.def;
      }
      coerce(val) {
        return this.def.coerce ? this.def.coerce(val) : val;
      }
      validate(val) {
        return this.def.validate ? this.def.validate(val) : true;
      }
    };
    __name(createEnvGraphDataType, "createEnvGraphDataType");
    __name(coerceToString, "coerceToString");
    __name(coerceToNumber, "coerceToNumber");
    StringDataType = createEnvGraphDataType(
      (settings) => ({
        name: "string",
        icon: "carbon:string-text",
        coerce: /* @__PURE__ */ __name((rawVal) => {
          let val = coerceToString(rawVal);
          if (settings?.toUpperCase) val = val.toUpperCase();
          if (settings?.toLowerCase) val = val.toLowerCase();
          return val;
        }, "coerce"),
        validate: /* @__PURE__ */ __name((val) => {
          const errors = [];
          if (settings?.minLength !== void 0 && val.length < settings.minLength) {
            errors.push(new ValidationError(`Length must be more than ${settings.minLength}`));
          }
          if (settings?.maxLength !== void 0 && val.length > settings.maxLength) {
            errors.push(new ValidationError(`Length must be less than ${settings.maxLength}`));
          }
          if (settings?.isLength !== void 0 && val.length !== settings.isLength) {
            errors.push(new ValidationError(`Length must be exactly ${settings.isLength}`));
          }
          if (settings?.startsWith && !val.startsWith(settings.startsWith)) {
            errors.push(new ValidationError(`Value must start with "${settings.startsWith}"`));
          }
          if (settings?.endsWith && !val.endsWith(settings.endsWith)) {
            errors.push(new ValidationError(`Value must start with "${settings.endsWith}"`));
          }
          if (settings?.matches) {
            const regex = my_dash_default.isString(settings.matches) ? new RegExp(settings.matches) : settings.matches;
            const matches = val.match(regex);
            if (!matches) {
              errors.push(new ValidationError(`Value must match regex "${settings.matches}"`));
            }
          }
          return errors.length ? errors : true;
        }, "validate")
      })
    );
    NumberDataType = createEnvGraphDataType(
      (settings) => ({
        name: "number",
        icon: "carbon:string-integer",
        coerce(rawVal) {
          let numVal = coerceToNumber(rawVal);
          if (settings?.coerceToMinMaxRange) {
            if (settings?.min !== void 0) numVal = Math.max(settings?.min, numVal);
            if (settings?.max !== void 0) numVal = Math.min(settings?.max, numVal);
          }
          if (settings?.isInt === true || settings?.precision === 0) {
            numVal = Math.round(numVal);
          } else if (settings?.precision) {
            const p2 = 10 ** settings.precision;
            numVal = Math.round(numVal * p2) / p2;
          }
          return numVal;
        },
        validate(val) {
          const errors = [];
          if (settings?.min !== void 0 && val < settings?.min) {
            errors.push(new ValidationError(`Min value is ${settings?.min}`));
          }
          if (settings?.max !== void 0 && val > settings?.max) {
            errors.push(new ValidationError(`Max value is ${settings?.max}`));
          }
          if (settings?.isDivisibleBy !== void 0 && val % settings.isDivisibleBy !== 0) {
            errors.push(new ValidationError(`Value must be divisible by ${settings?.isDivisibleBy}`));
          }
          return errors.length ? errors : true;
        }
      })
    );
    BooleanDataType = createEnvGraphDataType({
      name: "boolean",
      icon: "carbon:boolean",
      // probably want allow some settings
      // - more strict about coercion or adding additional true/false values
      // - coercing to other values - like 0,1
      coerce(val) {
        if (my_dash_default.isBoolean(val)) {
          return val;
        } else if (my_dash_default.isString(val)) {
          const cleanVal = val.toLowerCase().trim();
          if (["t", "true", "yes", "on", "1"].includes(cleanVal)) return true;
          if (["f", "false", "no", "off", "0"].includes(cleanVal)) return false;
          throw new CoercionError("Unable to coerce string value to boolean");
        } else if (my_dash_default.isNumber(val)) {
          if (val === 0) return false;
          if (val === 1) return true;
          throw new CoercionError("Unable to coerce number value to boolean (only 0 or 1 is valid)");
        } else {
          throw new CoercionError("Unable to coerce value to boolean");
        }
      },
      // TODO: add settings to be more strict, or to allow other values to coerce to true/false
      validate(val) {
        if (my_dash_default.isBoolean(val)) return true;
        return new ValidationError("Value must be `true` or `false`");
      }
    });
    UrlDataType = createEnvGraphDataType(
      (settings) => ({
        name: "url",
        icon: "carbon:url",
        coerce(rawVal) {
          const val = coerceToString(rawVal);
          if (settings?.prependHttps && !val.startsWith("https://")) return `https://${val}`;
          return val;
        },
        validate(val) {
          const url = new URL(val);
          if (settings?.allowedDomains && !settings.allowedDomains.includes(url.host.toLowerCase())) {
            return new ValidationError(`Domain (${url.host}) is not in allowed list: ${settings.allowedDomains.join(",")}`);
          }
          return true;
        }
      })
    );
    SimpleObjectDataType = createEnvGraphDataType({
      name: "simple-object",
      icon: "tabler:code-dots",
      // curly brackets with nothing inside
      coerce(val) {
        if (my_dash_default.isPlainObject(val)) return val;
        if (my_dash_default.isString(val)) {
          try {
            const parsedObj = JSON.parse(val);
            if (my_dash_default.isPlainObject(parsedObj)) return parsedObj;
            return new CoercionError("Unable to coerce JSON parsed string to object");
          } catch (err) {
            return new CoercionError("Error parsing JSON string while coercing string to object");
          }
        }
        return new CoercionError("Cannot coerce value to object");
      },
      validate(val) {
        if (my_dash_default.isPlainObject(val)) return true;
        return new ValidationError("Value must be an object");
      }
    });
    EnumDataType = createEnvGraphDataType(
      (...enumOptions) => ({
        name: "enum",
        icon: "material-symbols-light:category",
        // a few shapes... not sure about this one
        coerce(val) {
          if (my_dash_default.isString(val) || my_dash_default.isNumber(val) || my_dash_default.isBoolean(val)) return val;
          return new CoercionError("Value must be a string, number, or boolean");
        },
        validate(val) {
          const possibleValues = enumOptions || [];
          if (!possibleValues.includes(val)) {
            throw new ValidationError("Current value is not in list of possible values", {
              tip: `Possible values are: "${possibleValues.join('", "')}"`
            });
          }
        },
        _rawEnumOptions: enumOptions
      })
    );
    EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    EmailDataType = createEnvGraphDataType(
      (settings) => ({
        name: "email",
        icon: "iconoir:at-sign",
        typeDescription: "standard email address",
        coerce(rawVal) {
          let val = coerceToString(rawVal);
          if (settings?.normalize) val = val.toLowerCase();
          return val;
        },
        validate(val) {
          const result = EMAIL_REGEX.test(val);
          if (result) return true;
          return new ValidationError("Value must be a valid email address");
        }
      })
    );
    IP_V4_ADDRESS_REGEX = /^(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}$/;
    IP_V6_ADDRESS_REGEX = /^(?:(?:[a-fA-F\d]{1,4}:){7}(?:[a-fA-F\d]{1,4}|:)|(?:[a-fA-F\d]{1,4}:){6}(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|:[a-fA-F\d]{1,4}|:)|(?:[a-fA-F\d]{1,4}:){5}(?::(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,2}|:)|(?:[a-fA-F\d]{1,4}:){4}(?:(?::[a-fA-F\d]{1,4}){0,1}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,3}|:)|(?:[a-fA-F\d]{1,4}:){3}(?:(?::[a-fA-F\d]{1,4}){0,2}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,4}|:)|(?:[a-fA-F\d]{1,4}:){2}(?:(?::[a-fA-F\d]{1,4}){0,3}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,5}|:)|(?:[a-fA-F\d]{1,4}:){1}(?:(?::[a-fA-F\d]{1,4}){0,4}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,6}|:)|(?::(?:(?::[a-fA-F\d]{1,4}){0,5}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,7}|:)))(?:%[0-9a-zA-Z]{1,})?$/;
    ipAddressDataType = createEnvGraphDataType(
      (settings) => ({
        name: "ip",
        icon: "iconoir:ip-address-tag",
        typeDescription: "ip v4 or v6 address",
        coerce(rawVal) {
          let val = coerceToString(rawVal);
          if (settings?.normalize) val = val.toLowerCase();
          return val;
        },
        validate(val) {
          const regex = settings?.version === 6 ? IP_V6_ADDRESS_REGEX : IP_V4_ADDRESS_REGEX;
          const result = regex.test(val);
          if (result) return true;
          return new ValidationError("Value must be a valid IP address");
        }
      })
    );
    PortDataType = createEnvGraphDataType(
      (settings) => ({
        name: "port",
        icon: "material-symbols:captive-portal",
        //! globe with arrow - not sure about this one
        typeDescription: "valid port number between 0 and 65535",
        coerce(rawVal) {
          if (my_dash_default.isString(rawVal)) {
            if (rawVal.includes(".")) throw new CoercionError("Port number must be an integer");
            if (rawVal.includes("e")) throw new CoercionError("Port number should be an integer, not in exponential notation");
          }
          return coerceToNumber(rawVal);
        },
        validate(val) {
          if (settings?.min !== void 0 && val < settings?.min) {
            return new ValidationError(`Min value is ${settings?.min}`);
          }
          if (settings?.max !== void 0 && val > settings?.max) {
            return new ValidationError(`Max value is ${settings?.max}`);
          }
          if (val < 0 || val > 65535) {
            return new ValidationError("Value must be a valid port number (0-65535)");
          }
          return true;
        }
      })
    );
    SEMVER_REGEX = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;
    SemverDataType = createEnvGraphDataType(
      (_settings) => ({
        name: "semver",
        icon: "simple-icons:semver",
        typeDescription: "semantic version string",
        validate(val) {
          const result = SEMVER_REGEX.test(val);
          if (result) return true;
          return new ValidationError("Value must be a valid semantic version string");
        }
      })
    );
    ISO_DATE_REGEX = /^(?:[+-]?\d{4}(?!\d{2}\b))(?:(-?)(?:(?:0[1-9]|1[0-2])(?:\1(?:[12]\d|0[1-9]|3[01]))?|W(?:[0-4]\d|5[0-2])(?:-?[1-7])?|(?:00[1-9]|0[1-9]\d|[12]\d{2}|3(?:[0-5]\d|6[1-6])))(?:[T\s](?:(?:(?:[01]\d|2[0-3])(?:(:?)[0-5]\d)?|24:?00)(?:[.,]\d+(?!:))?)?(?:\2[0-5]\d(?:[.,]\d+)?)?(?:[zZ]|(?:[+-])(?:[01]\d|2[0-3]):?(?:[0-5]\d)?)?)?)?$/;
    IsoDateDataType = createEnvGraphDataType({
      name: "isoDate",
      icon: "formkit:datetime",
      typeDescription: "ISO 8601 date string with optional time and milliseconds",
      validate(val) {
        const result = ISO_DATE_REGEX.test(val);
        if (result) return true;
        return new ValidationError("Value must be a valid ISO 8601 date string");
      }
    });
    UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    UuidDataType = createEnvGraphDataType({
      name: "uuid",
      icon: "mdi:identifier",
      typeDescription: "UUID string V1-V5 per RFC4122, including NIL",
      validate(val) {
        const result = UUID_REGEX.test(val);
        if (result) return true;
        return new ValidationError("Value must be a valid UUID string");
      }
    });
    MD5_REGEX = /^[a-f0-9]{32}$/;
    Md5DataType = createEnvGraphDataType({
      name: "md5",
      typeDescription: "MD5 hash string",
      validate(val) {
        const result = MD5_REGEX.test(val);
        if (result) return true;
        return new ValidationError("Value must be a valid MD5 hash string");
      }
    });
    BaseDataTypes = {
      string: StringDataType,
      number: NumberDataType,
      boolean: BooleanDataType,
      simpleObject: SimpleObjectDataType,
      enum: EnumDataType,
      email: EmailDataType,
      url: UrlDataType,
      ipAddress: ipAddressDataType,
      port: PortDataType,
      semver: SemverDataType,
      isoDate: IsoDateDataType,
      uuid: UuidDataType,
      md5: Md5DataType
    };
  }
});

// ../utils/src/try-catch.ts
function isPromise2(obj) {
  return !!obj && (typeof obj === "object" || typeof obj === "function") && typeof obj.then === "function";
}
async function tryCatch(tryFn, catchFn) {
  try {
    return await tryFn();
  } catch (err) {
    const catchResult = catchFn(err);
    if (isPromise2(catchResult)) {
      await catchResult;
    }
  }
}
var init_try_catch = __esm({
  "../utils/src/try-catch.ts"() {
    __name(isPromise2, "isPromise");
    __name(tryCatch, "tryCatch");
  }
});
var asyncExec;
var init_exec_helpers = __esm({
  "../utils/src/exec-helpers.ts"() {
    asyncExec = util.promisify(child_process.exec);
  }
});

// ../utils/src/git-utils.ts
async function checkIsFileGitIgnored(path12, warnIfNotGitRepo = false) {
  try {
    await asyncExec(`git check-ignore ${path12} -q`);
    return true;
  } catch (err) {
    const stderr = err.stderr;
    if (stderr.includes("not found")) return void 0;
    if (err.code === "ENOENT") return void 0;
    if (stderr === "") return false;
    if (stderr.includes("not a git repository")) {
      if (warnIfNotGitRepo) {
        console.log("\u{1F536} Your code is not currently in a git repository - run `git init` to initialize a new repo.");
      }
      return false;
    }
    throw err;
  }
}
var init_git_utils = __esm({
  "../utils/src/git-utils.ts"() {
    init_exec_helpers();
    __name(checkIsFileGitIgnored, "checkIsFileGitIgnored");
  }
});

// env-graph/lib/simple-queue.ts
var SimpleQueue;
var init_simple_queue = __esm({
  "env-graph/lib/simple-queue.ts"() {
    SimpleQueue = class {
      static {
        __name(this, "SimpleQueue");
      }
      queue = [];
      processing = false;
      /** Add a task to the queue and return a promise that resolves when the task is complete */
      async enqueue(task) {
        return new Promise((resolve, reject) => {
          this.queue.push(async () => {
            try {
              const result = await task();
              resolve(result);
            } catch (err) {
              reject(err);
            }
          });
          this.processQueue();
        });
      }
      async processQueue() {
        if (this.processing || this.queue.length === 0) {
          return;
        }
        this.processing = true;
        const task = this.queue.shift();
        if (task) {
          try {
            await task();
          } finally {
            this.processing = false;
            this.processQueue();
          }
        }
      }
    };
  }
});
var execAsync, Resolver, StaticValueResolver, ErrorResolver, ConcatResolver, FallbackResolver, ExecResolver, RefResolver, RegexResolver, RemapResolver, BaseResolvers;
var init_resolver = __esm({
  "env-graph/lib/resolver.ts"() {
    init_my_dash();
    init_errors();
    init_config_item();
    init_simple_queue();
    execAsync = util.promisify(child_process.exec);
    Resolver = class {
      constructor(fnArgs) {
        this.fnArgs = fnArgs;
      }
      static {
        __name(this, "Resolver");
      }
      static fnName;
      inferredType;
      _schemaErrors = [];
      _depsObj = {};
      get childResolvers() {
        return this.fnArgs.flatMap((r2) => my_dash_default.isPlainObject(r2) ? my_dash_default.values(r2) : r2);
      }
      get schemaErrors() {
        return [
          ...this._schemaErrors,
          ...this.childResolvers.flatMap((r2) => r2.schemaErrors)
        ];
      }
      get depsObj() {
        const mergedDepsObj = { ...this._depsObj };
        this.childResolvers.forEach((r2) => Object.assign(mergedDepsObj, r2.depsObj));
        return mergedDepsObj;
      }
      get deps() {
        return Object.keys(this.depsObj);
      }
      configItem;
      async process(configItem) {
        this.configItem = configItem;
        try {
          await this._process(configItem);
        } catch (error) {
          if (error instanceof SchemaError) {
            this._schemaErrors.push(error);
          } else if (error instanceof Error) {
            this._schemaErrors.push(new SchemaError(error));
          } else {
            throw new Error(`Non-error thrown while processing resolver - ${error}`);
          }
        }
        this.childResolvers.forEach((r2) => r2.process(configItem));
      }
      // meant to be used by subclass _process methods
      addDep(key) {
        this._depsObj[key] = true;
        if (!this.configItem) throw new Error("expected configItem to be set");
        if (!this.configItem.envGraph.configSchema[key]) {
          this._schemaErrors.push(new SchemaError(`Unknown referenced key: ${key}`));
        }
      }
      async resolve() {
        const resolvedValue = await this._resolve();
        return resolvedValue;
      }
      // meant to be used by subclass _resolve methods
      getDepValue(key) {
        const depItem = this.configItem?.envGraph.configSchema[key];
        if (!depItem) throw new Error(`Expected to find item - ${key}`);
        return depItem.resolvedValue;
      }
    };
    StaticValueResolver = class extends Resolver {
      constructor(staticValue) {
        super([]);
        this.staticValue = staticValue;
        if (staticValue !== void 0) {
          this.inferredType = typeof staticValue;
        }
      }
      static {
        __name(this, "StaticValueResolver");
      }
      label = "static";
      icon = "bi:dash";
      async _resolve() {
        return this.staticValue;
      }
      async _process() {
      }
    };
    ErrorResolver = class extends Resolver {
      static {
        __name(this, "ErrorResolver");
      }
      constructor(err) {
        super([]);
        this._schemaErrors.push(err);
      }
      label = "error";
      icon = "bi:dash";
      async _resolve() {
        return void 0;
      }
      async _process() {
      }
    };
    ConcatResolver = class extends Resolver {
      static {
        __name(this, "ConcatResolver");
      }
      static fnName = "concat";
      label = "concat";
      icon = "material-symbols:join";
      inferredType = "string";
      async _process() {
        if (this.fnArgs.some((arg) => my_dash_default.isPlainObject(arg))) {
          throw new SchemaError("concat() does not support key-value arguments");
        }
        if (this.fnArgs.length < 2) {
          throw new SchemaError("concat() expects at least two arguments");
        }
      }
      async _resolve() {
        const resolvedValues = [];
        for (const arg of this.fnArgs) {
          if (my_dash_default.isPlainObject(arg)) {
            throw new Error("concat() does not support key-value arguments");
          }
          const resolvedChildValue = await arg.resolve();
          resolvedValues.push(String(resolvedChildValue ?? ""));
        }
        return resolvedValues.join("");
      }
    };
    FallbackResolver = class extends Resolver {
      static {
        __name(this, "FallbackResolver");
      }
      static fnName = "fallback";
      label = "fallback";
      icon = "memory:table-top-stairs-up";
      async _process() {
        if (this.fnArgs.some((arg) => my_dash_default.isPlainObject(arg))) {
          throw new SchemaError("fallback() does not support key-value arguments");
        }
        if (this.fnArgs.length < 2) {
          throw new SchemaError("fallback() expects at least two arguments");
        }
      }
      async _resolve() {
        for (const arg of this.fnArgs) {
          if (my_dash_default.isPlainObject(arg)) throw new Error("fallback() does not support key-value arguments");
          const resolvedChildValue = await arg.resolve();
          if (resolvedChildValue !== void 0 && resolvedChildValue !== "") {
            return resolvedChildValue;
          }
        }
      }
    };
    ExecResolver = class _ExecResolver extends Resolver {
      static {
        __name(this, "ExecResolver");
      }
      static fnName = "exec";
      label = "exec";
      icon = "iconoir:terminal";
      async _process() {
        if (this.fnArgs.length !== 1) {
          throw new SchemaError("exec() expects a single child arg");
        }
        if (this.fnArgs.some((arg) => my_dash_default.isPlainObject(arg))) {
          throw new SchemaError("exec() does not support key-value arguments");
        }
      }
      static execQueue = new SimpleQueue();
      async _resolve() {
        if (my_dash_default.isPlainObject(this.fnArgs[0])) throw new Error("exec() does not support key-value arguments");
        const commandStr = await this.fnArgs[0].resolve();
        if (typeof commandStr !== "string") {
          throw new ResolutionError("exec() expects a string child arg");
        }
        try {
          const { stdout } = await _ExecResolver.execQueue.enqueue(() => execAsync(commandStr));
          return stdout.replace(/\n$/, "");
        } catch (err) {
          console.log("exec() failed", err);
          throw new ResolutionError(`exec() command failed: ${commandStr}`);
        }
      }
    };
    RefResolver = class extends Resolver {
      static {
        __name(this, "RefResolver");
      }
      static fnName = "ref";
      label = "ref";
      icon = "mdi-light:content-duplicate";
      refKey;
      async _process() {
        if (this.fnArgs.length !== 1) {
          throw new SchemaError("ref() expects a single child arg");
        }
        if (!(this.fnArgs[0] instanceof StaticValueResolver)) {
          throw new SchemaError("ref() expects a single static value passed in");
        }
        const keyName = this.fnArgs[0].staticValue;
        if (typeof keyName !== "string") {
          throw new SchemaError("ref() expects a string keyname passed in");
        }
        this.refKey = keyName;
        this.addDep(keyName);
      }
      async _resolve() {
        if (!this.refKey) throw new Error("expected refKey to be set");
        return this.getDepValue(this.refKey);
      }
    };
    RegexResolver = class extends Resolver {
      static {
        __name(this, "RegexResolver");
      }
      static fnName = "regex";
      label = "regex";
      icon = "mdi:regex";
      regex;
      async _process() {
        if (this.fnArgs.length !== 1) {
          throw new SchemaError("regex() expects a single child arg");
        }
        if (!(this.fnArgs[0] instanceof StaticValueResolver)) {
          throw new SchemaError("regex() expects a single static value passed in");
        }
        const regexStr = this.fnArgs[0].staticValue;
        if (typeof regexStr !== "string") {
          throw new SchemaError("regex() expects a string");
        }
        this.regex = new RegExp(regexStr);
      }
      async _resolve() {
        if (!this.regex) throw new Error("expected regex to be set");
        return this.regex;
      }
    };
    RemapResolver = class extends Resolver {
      static {
        __name(this, "RemapResolver");
      }
      static fnName = "remap";
      label = "remap";
      icon = "codicon:replace";
      remappings;
      async _process() {
        if (my_dash_default.isPlainObject(this.fnArgs[0])) {
          throw new SchemaError("remap() expects the first arg to be the value to remap");
        }
        if (!my_dash_default.isPlainObject(this.fnArgs[1])) {
          throw new SchemaError("remap() expects the all args after the first to be key-value pairs of remappings");
        }
        if (this.fnArgs.length !== 2) {
          throw new SchemaError("remap() should not have any additional non key-value args after remappings");
        }
        this.remappings = this.fnArgs[1];
      }
      async _resolve() {
        if (my_dash_default.isPlainObject(this.fnArgs[0])) {
          throw new SchemaError("remap() expects the first arg to be the value to remap");
        }
        if (!my_dash_default.isPlainObject(this.fnArgs[1])) {
          throw new SchemaError("remap() expects the all args after the first to be key-value pairs of remappings");
        }
        const originalValue = await this.fnArgs[0].resolve();
        if (!this.remappings) throw new Error("expected remappings to be set");
        for (const [remappedVal, matchValResolver] of Object.entries(this.remappings)) {
          const matchVal = await matchValResolver.resolve();
          if (matchVal instanceof RegExp && originalValue !== void 0) {
            if (matchVal.test(String(originalValue))) return remappedVal;
          } else {
            if (matchVal === originalValue) return remappedVal;
          }
        }
        return originalValue;
      }
    };
    BaseResolvers = [
      ConcatResolver,
      FallbackResolver,
      RefResolver,
      ExecResolver,
      RemapResolver,
      RegexResolver
    ];
  }
});
var DATA_SOURCE_TYPES, EnvGraphDataSource, ProcessEnvDataSource, EnvSourceParseError, FileBasedDataSource, DotEnvFileDataSource;
var init_data_source = __esm({
  "env-graph/lib/data-source.ts"() {
    init_my_dash();
    init_try_catch();
    init_git_utils();
    init_dist();
    init_config_item();
    init_resolver();
    init_env_graph();
    init_errors();
    DATA_SOURCE_TYPES = Object.freeze({
      schema: {
        fileSuffixes: ["schema"],
        precedence: 0
      },
      example: {
        fileSuffixes: ["sample", "example"],
        precedence: 1
      },
      defaults: {
        fileSuffixes: ["default", "defaults"],
        precedence: 2
      },
      values: {
        fileSuffixes: [],
        precedence: 3
      },
      overrides: {
        fileSuffixes: ["local", "override"],
        precedence: 4
      }
    });
    EnvGraphDataSource = class {
      static {
        __name(this, "EnvGraphDataSource");
      }
      static DATA_SOURCE_TYPES = DATA_SOURCE_TYPES;
      // reference back to the graph
      graph;
      type = "values";
      applyForEnv;
      disabled = false;
      ignoreNewDefs = false;
      /** an error encountered while loading/parsing the data source */
      loadingError;
      get isValid() {
        return !this.loadingError;
      }
      configItemDefs = {};
      decorators = {};
      getStaticValues() {
        const obj = {};
        for (const [key, def] of Object.entries(this.configItemDefs)) {
          if (def.resolver instanceof StaticValueResolver) {
            obj[key] = String(def.resolver.staticValue ?? "");
          }
        }
        return obj;
      }
    };
    ProcessEnvDataSource = class _ProcessEnvDataSource extends EnvGraphDataSource {
      static {
        __name(this, "ProcessEnvDataSource");
      }
      type = "overrides";
      typeLabel = "process";
      label = "process.env";
      ignoreNewDefs = true;
      static processEnvValues;
      // ? do we want to set decorator values from env vars here? -- ex: _ENV_FLAG_KEY
      // depends if we want those to work only within process.env
      constructor() {
        super();
        if (!_ProcessEnvDataSource.processEnvValues) {
          _ProcessEnvDataSource.processEnvValues = {};
          for (const itemKey of Object.keys(process.env)) {
            _ProcessEnvDataSource.processEnvValues[itemKey] = process.env[itemKey];
          }
        }
        for (const itemKey of Object.keys(_ProcessEnvDataSource.processEnvValues)) {
          this.configItemDefs[itemKey] = {
            resolver: new StaticValueResolver(_ProcessEnvDataSource.processEnvValues[itemKey])
          };
        }
      }
    };
    EnvSourceParseError = class extends Error {
      static {
        __name(this, "EnvSourceParseError");
      }
      location;
      constructor(message, _location) {
        super(message);
        this.location = _location;
      }
    };
    FileBasedDataSource = class extends EnvGraphDataSource {
      static {
        __name(this, "FileBasedDataSource");
      }
      isGitIgnored;
      fullPath;
      fileName;
      rawContents;
      get typeLabel() {
        return this.constructor.format;
      }
      get label() {
        return this.fileName;
      }
      static format = "unknown";
      // no abstract static
      static validFileExtensions = [];
      get validFileExtensions() {
        return this.constructor.validFileExtensions;
      }
      constructor(fullPath, opts) {
        super();
        this.fullPath = fullPath;
        this.fileName = path8__default.default.basename(fullPath);
        if (opts?.overrideContents) {
          this.rawContents = opts.overrideContents;
          this.isGitIgnored = opts.overrideGitIgnored;
        }
        if (!this.fileName.startsWith(".env")) {
          throw new Error('file name must start with ".env"');
        }
        const fileNameParts = this.fileName.substring(1).split(".");
        const maybeExtension = fileNameParts[fileNameParts.length - 1];
        if (this.validFileExtensions.includes(maybeExtension)) {
          fileNameParts.pop();
        }
        const maybeFileType = fileNameParts[fileNameParts.length - 1];
        for (const [possibleSourceType, possibleSourceSpec] of Object.entries(DATA_SOURCE_TYPES)) {
          if (possibleSourceSpec.fileSuffixes.includes(maybeFileType)) {
            this.type = possibleSourceType;
            break;
          }
        }
        if (this.type !== "values") fileNameParts.pop();
        if (fileNameParts.length > 2) {
          throw Error(`Unsure how to interpret filename - ${this.fileName}`);
        } else if (fileNameParts.length === 2) {
          this.applyForEnv = fileNameParts[1];
          if (this.applyForEnv === "dev") this.applyForEnv = "development";
          if (this.applyForEnv === "stage") this.applyForEnv = "staging";
          if (this.applyForEnv === "prod") this.applyForEnv = "production";
        }
      }
      // no async constructors... :(
      async finishInit() {
        if (!this.rawContents) {
          this.isGitIgnored = await checkIsFileGitIgnored(this.fullPath);
          this.rawContents = await fs9__default.default.readFile(this.fullPath, "utf8");
        }
        await this._parseContents();
      }
    };
    DotEnvFileDataSource = class extends FileBasedDataSource {
      static {
        __name(this, "DotEnvFileDataSource");
      }
      static format = ".env";
      static validFileExtensions = [];
      // no extension for dotenv files!
      parsedFile;
      convertParserValueToResolvers(value) {
        if (!this.graph) throw new Error("expected graph to be set");
        if (value === void 0) {
          return new StaticValueResolver(void 0);
        } else if (value instanceof ParsedEnvSpecStaticValue) {
          return new StaticValueResolver(value.unescapedValue);
        } else if (value instanceof ParsedEnvSpecFunctionCall) {
          const ResolverFnClass = this.graph.registeredResolverFunctions[value.name];
          if (!ResolverFnClass) {
            return new ErrorResolver(new SchemaError(`Unknown resolver function: ${value.name}()`));
          }
          const argsFromParser = value.data.args.values;
          let keyValueArgs;
          const argsAsResolversArray = [];
          for (const arg of argsFromParser) {
            if (arg instanceof ParsedEnvSpecKeyValuePair) {
              keyValueArgs ??= {};
              keyValueArgs[arg.key] = this.convertParserValueToResolvers(arg.value);
            } else {
              if (keyValueArgs) {
                return new ErrorResolver(new SchemaError("After switching to key-value function args, cannot switch back"));
              }
              argsAsResolversArray.push(this.convertParserValueToResolvers(arg));
            }
          }
          if (keyValueArgs) argsAsResolversArray.push(keyValueArgs);
          return new ResolverFnClass(argsAsResolversArray);
        } else {
          throw new Error("Unknown value type");
        }
      }
      async _parseContents() {
        const rawContents = this.rawContents;
        this.parsedFile = await tryCatch(
          () => parseEnvSpecDotEnvFile(rawContents),
          (error) => {
            this.loadingError = new EnvSourceParseError(error.message, {
              path: this.fullPath,
              lineNumber: error.location.start.line,
              colNumber: error.location.start.column,
              lineStr: rawContents.split("\n")[error.location.start.line - 1]
            });
            this.loadingError.cause = error;
          }
        );
        if (this.loadingError) return;
        if (!this.parsedFile) throw new Error("Failed to parse .env file");
        this.decorators = this.parsedFile.decoratorsObject;
        if (!this.graph) throw new Error("expected graph to be set");
        for (const item of this.parsedFile.configItems) {
          item.processExpansion();
          this.configItemDefs[item.key] = {
            resolver: this.convertParserValueToResolvers(item.expandedValue),
            description: item.description,
            decorators: item.decoratorsObject
          };
        }
      }
    };
  }
});

// env-graph/lib/config-item.ts
var ConfigItem2;
var init_config_item = __esm({
  "env-graph/lib/config-item.ts"() {
    init_my_dash();
    init_dist();
    init_data_types();
    init_env_graph();
    init_errors();
    init_data_source();
    init_resolver();
    ConfigItem2 = class {
      static {
        __name(this, "ConfigItem");
      }
      // annoyingly we cannot use readonly if we want to support `erasableSyntaxOnly`
      #envGraph;
      #key;
      constructor(_envGraph, _key) {
        this.#envGraph = _envGraph;
        this.#key = _key;
      }
      get envGraph() {
        return this.#envGraph;
      }
      get key() {
        return this.#key;
      }
      defs = [];
      addDef(itemDef, source) {
        this.defs.unshift({ itemDef, source });
      }
      get description() {
        for (const def of this.defs) {
          if (def.itemDef.description) return def.itemDef.description;
        }
      }
      get icon() {
        const explicitIcon = this.getDecoratorValueString("icon");
        if (explicitIcon) return explicitIcon;
        return this.dataType?.icon;
      }
      get docsLinks() {
        const links = [];
        const docsUrl = this.getDecoratorValueString("docsUrl");
        if (docsUrl) links.push({ url: docsUrl });
        return links;
      }
      get valueResolver() {
        for (const def of this.defs) {
          if (def.itemDef.resolver) return def.itemDef.resolver;
        }
      }
      getDecorator(decoratorName) {
        for (const def of this.defs) {
          const defDecorators = def.itemDef.decorators || {};
          if (decoratorName in defDecorators) {
            return defDecorators[decoratorName];
          }
        }
      }
      getDecoratorValueRaw(decoratorName) {
        for (const def of this.defs) {
          const defDecorators = def.itemDef.decorators || {};
          if (decoratorName in defDecorators) {
            return defDecorators[decoratorName].value;
          }
        }
      }
      getDecoratorValueString(decoratorName) {
        const dec = this.getDecoratorValueRaw(decoratorName);
        if (dec instanceof ParsedEnvSpecStaticValue) return String(dec.value);
      }
      dataType;
      schemaErrors = [];
      get resolverSchemaErrors() {
        return this.valueResolver?.schemaErrors || [];
      }
      async process() {
        const finalOverrideDef = this.envGraph.finalOverridesDataSource?.configItemDefs[this.key];
        if (finalOverrideDef) {
          const hasSchemaDef = this.defs.some((d3) => d3.source.type === "schema");
          const isEnvFlagKey = this.envGraph.envFlagKey === this.key;
          const allowProcessEnvOverride = isEnvFlagKey || this.envGraph.respectExistingEnv || !hasSchemaDef;
          if (allowProcessEnvOverride) {
            this.defs.unshift({ itemDef: finalOverrideDef, source: this.envGraph.finalOverridesDataSource });
          }
        }
        for (const def of this.defs) {
          await def.itemDef.resolver?.process(this);
        }
        const typeDecoratorValue = this.getDecoratorValueRaw("type");
        let dataTypeName;
        let dataTypeArgs;
        if (typeDecoratorValue instanceof ParsedEnvSpecStaticValue) {
          dataTypeName = typeDecoratorValue.value;
        } else if (typeDecoratorValue instanceof ParsedEnvSpecFunctionCall) {
          dataTypeName = typeDecoratorValue.name;
          dataTypeArgs = typeDecoratorValue.simplifiedArgs;
        }
        if (!dataTypeName) {
          if (this.valueResolver?.inferredType) {
            dataTypeName = this.valueResolver.inferredType;
          }
        }
        dataTypeName ||= "string";
        dataTypeArgs ||= [];
        if (!(dataTypeName in this.envGraph.dataTypesRegistry)) {
          this.schemaErrors.push(new SchemaError(`unknown data type: ${dataTypeName}`));
        } else {
          const dataTypeFactory = this.envGraph.dataTypesRegistry[dataTypeName];
          this.dataType = dataTypeFactory(...my_dash_default.isPlainObject(dataTypeArgs) ? [dataTypeArgs] : dataTypeArgs);
        }
      }
      get isRequired() {
        for (const def of this.defs) {
          const defDecorators = def.itemDef.decorators || {};
          if ("required" in defDecorators) {
            const val = defDecorators.required.simplifiedValue;
            if (typeof val === "boolean") return val;
            if (typeof val === "string") return val === "true";
            return Boolean(val);
          }
          if ("optional" in defDecorators) {
            const val = defDecorators.optional.simplifiedValue;
            if (typeof val === "boolean") return !val;
            if (typeof val === "string") return val !== "true";
            return !val;
          }
          if ("defaultRequired" in def.source.decorators) {
            const val = def.source.decorators.defaultRequired.simplifiedValue;
            if (val === "infer") {
              if (def.source.type === "schema") {
                const resolver = def.itemDef.resolver;
                if (resolver instanceof StaticValueResolver) {
                  return resolver.staticValue !== void 0 && resolver.staticValue !== "";
                } else {
                  return true;
                }
              } else {
                continue;
              }
            }
            return val;
          }
        }
        return true;
      }
      get isSensitive() {
        for (const def of this.defs) {
          const defDecorators = def.itemDef.decorators || {};
          if ("sensitive" in defDecorators) {
            return defDecorators.sensitive.simplifiedValue;
          } else if ("defaultSensitive" in def.source.decorators) {
            const dec = def.source.decorators.defaultSensitive;
            if (dec.value instanceof ParsedEnvSpecFunctionCall && dec.value.name === "inferFromPrefix") {
              const args = dec.value.simplifiedArgs;
              const prefix = Array.isArray(args) && args.length > 0 ? args[0] : void 0;
              if (typeof prefix === "string" && this.key.startsWith(prefix)) {
                return false;
              }
              return true;
            }
            return dec.simplifiedValue;
          }
        }
        return true;
      }
      get errors() {
        return my_dash_default.compact([
          ...this.schemaErrors || [],
          ...this.resolverSchemaErrors || [],
          this.resolutionError,
          this.coercionError,
          ...this.validationErrors || []
        ]);
      }
      get validationState() {
        const errors = this.errors;
        if (!errors.length) return "valid";
        return my_dash_default.some(errors, (e2) => !e2.isWarning) ? "error" : "warn";
      }
      /** resolved value _before coercion_ */
      resolvedRawValue;
      isResolved = false;
      /** resolved value after coercion */
      resolvedValue;
      isValidated = false;
      resolutionError;
      coercionError;
      validationErrors;
      get isCoerced() {
        return this.resolvedRawValue !== this.resolvedValue;
      }
      async resolve() {
        if (this.schemaErrors.length) return;
        if (this.resolverSchemaErrors.length) return;
        if (!this.valueResolver) throw new Error("Expected a resolver to be set");
        if (this.isResolved) {
          return;
        }
        try {
          this.resolvedRawValue = await this.valueResolver.resolve();
        } catch (err) {
          this.resolutionError = new ResolutionError(`error resolving value: ${err}`);
          this.resolutionError.cause = err;
        }
        if (this.resolvedRawValue instanceof RegExp) {
          this.resolutionError = new ResolutionError("regex() is meant to be used within function args, not as a final resolved value");
        }
        if (this.resolutionError) return;
        this.isResolved = true;
        if (this.resolvedRawValue === void 0 || this.resolvedRawValue === "") {
          this.resolvedValue = this.resolvedRawValue;
          if (this.isRequired) {
            this.validationErrors = [new EmptyRequiredValueError(void 0)];
          }
          return;
        }
        if (!this.dataType) throw new Error("expected dataType to be set");
        try {
          const coerceResult = this.dataType.coerce(this.resolvedRawValue);
          if (coerceResult instanceof Error) throw coerceResult;
          this.resolvedValue = coerceResult;
        } catch (err) {
          if (err instanceof CoercionError) {
            this.coercionError = err;
            return;
          } else if (err instanceof Error) {
            this.coercionError = new CoercionError("Unexpected error coercing value");
            this.coercionError.cause = err;
          } else {
            this.coercionError = new CoercionError(`Unexpected non-error throw during coerce - ${err}`);
          }
          return;
        }
        try {
          const validateResult = this.dataType.validate(this.resolvedValue);
          if (validateResult instanceof Error || my_dash_default.isArray(validateResult) && validateResult[0] instanceof Error) throw validateResult;
          if (validateResult === false) {
            throw new ValidationError("validation failed with `false` return value");
          }
          this.isValidated = true;
        } catch (err) {
          if (my_dash_default.isArray(err)) {
            this.validationErrors = err;
          } else if (err instanceof ValidationError) {
            this.validationErrors = [err];
          } else if (err instanceof Error) {
            const validationError = new ValidationError("Unexpected error during validation");
            validationError.cause = err;
            this.validationErrors = [validationError];
          } else {
            const validationError = new ValidationError(`Unexpected non-error thrown during validation - ${err}`);
            validationError.cause = err;
            this.validationErrors = [validationError];
          }
          return;
        }
      }
      get isValid() {
        return this.validationState === "valid";
      }
    };
  }
});

// env-graph/lib/graph-utils.ts
function findGraphCycles(graph) {
  const visited = /* @__PURE__ */ new Set();
  const recursionStack = /* @__PURE__ */ new Set();
  const cycles = [];
  const currentPath = [];
  function dfs(node) {
    if (recursionStack.has(node)) {
      const cycleStart = currentPath.indexOf(node);
      const cycle = currentPath.slice(cycleStart);
      cycles.push(cycle);
      return;
    }
    if (visited.has(node)) {
      return;
    }
    visited.add(node);
    recursionStack.add(node);
    currentPath.push(node);
    for (const neighbor of graph[node] || []) {
      dfs(neighbor);
    }
    recursionStack.delete(node);
    currentPath.pop();
  }
  __name(dfs, "dfs");
  for (const node of Object.keys(graph)) {
    if (!visited.has(node)) {
      dfs(node);
    }
  }
  return cycles;
}
var init_graph_utils = __esm({
  "env-graph/lib/graph-utils.ts"() {
    __name(findGraphCycles, "findGraphCycles");
  }
});
async function fetchIconSvg(iconifyName, color = "808080", iconCacheFolder = "/tmp/varlock-icon-cache") {
  if (!iconCacheFolderInit) {
    fs2__default.default.mkdirSync(iconCacheFolder, { recursive: true });
    iconCacheFolderInit = true;
  }
  const iconPath = `${iconCacheFolder}/${iconifyName}-${ICON_SIZE}.svg`;
  let svgSrc;
  if (iconInMemoryCache[iconPath]) {
    svgSrc = iconInMemoryCache[iconPath];
  } else if (fs2__default.default.existsSync(iconPath)) {
    const svgFileBuffer = await fs2__default.default.promises.readFile(iconPath, "utf-8");
    svgSrc = svgFileBuffer.toString();
    iconInMemoryCache[iconPath] = svgSrc;
  } else {
    try {
      const iconSvg = await fetch(`https://api.iconify.design/${iconifyName.replace(":", "/")}.svg?height=${ICON_SIZE}`);
      svgSrc = await iconSvg.text();
    } catch (err) {
      return;
    }
    if (!svgSrc) return;
    if (svgSrc) {
      await fs2__default.default.promises.writeFile(iconPath, svgSrc, "utf-8");
      iconInMemoryCache[iconPath] = svgSrc;
    }
  }
  const hexColor = color.startsWith("#") ? color : `#${color}`;
  const colorizedSvg = svgSrc.replaceAll("currentColor", hexColor);
  return colorizedSvg;
}
async function getTsDefinitionForItem(item, indentLevel = 0) {
  const i2 = my_dash_default.times(indentLevel, () => "  ").join("");
  const itemSrc = [];
  const jsDocLines = [];
  jsDocLines.push(`**${item.key}**${item.isSensitive ? " \u{1F510} _sensitive_" : ""}`);
  if (item.description) jsDocLines.push(...item.description.split("\n"));
  const iconName = item.icon;
  if (iconName) {
    const iconSvg = await fetchIconSvg(iconName);
    if (iconSvg) jsDocLines.push(`![icon](data:image/svg+xml;utf-8,${encodeURIComponent(iconSvg)}) `);
  }
  const docsLinks = item.docsLinks;
  if (docsLinks.length) {
    jsDocLines.push("");
    docsLinks.forEach((docsEntry) => {
      const docsLink = my_dash_default.compact([docsEntry.url, docsEntry.description]).join(" | ");
      jsDocLines.push(`\u{1F4DA} {@link ${docsLink}}`);
    });
  }
  if (jsDocLines.length === 1) {
    itemSrc.push(`/** ${jsDocLines[0]} */`);
  } else if (jsDocLines.length > 1) {
    itemSrc.push(...[
      "/**",
      // extra 2 trailing spaces are needed to make line breaks visible
      ...my_dash_default.flatMap(jsDocLines, (line) => [` * ${line}  `]),
      " */"
    ]);
  }
  const dataType = item.dataType;
  const dataTypeName = dataType?.name;
  let itemTsType = "string";
  if (dataType) {
    if (dataTypeName === "number" || dataTypeName === "port") {
      itemTsType = "number";
    } else if (dataTypeName === "boolean") {
      itemTsType = "boolean";
    } else if (dataTypeName === "simple-object") {
      itemTsType = "Record<string, any>";
    } else if (dataTypeName === "enum") {
      const rawEnumOptions = dataType._rawDef._rawEnumOptions;
      let enumOptions = [];
      enumOptions = rawEnumOptions;
      if (!enumOptions.length) {
        itemTsType = "never";
      } else {
        itemTsType = my_dash_default.map(enumOptions, JSON.stringify).join(" | ");
      }
    }
  }
  itemSrc.push(`readonly ${item.key}${item.isRequired ? "" : "?"}: ${itemTsType};`);
  itemSrc.push("");
  return my_dash_default.map(itemSrc, (line) => `${i2}${line}`);
}
async function generateTsTypesSrc(graph) {
  const tsSrc = [
    AUTOGENERATED_FILE_BANNER,
    // might want to add some options to let users inject this, or somehow detect eslint, but fine for now
    "/* eslint-disable */",
    "export type CoercedEnvSchema = {"
  ];
  const exposedNonSensitiveKeys = [];
  for (const itemKey in graph.configSchema) {
    const configItem = graph.configSchema[itemKey];
    tsSrc.push(...await getTsDefinitionForItem(configItem, 1));
    if (!configItem.isSensitive) exposedNonSensitiveKeys.push(itemKey);
  }
  tsSrc.push("};\n");
  tsSrc.push(`
declare module 'varlock/env' {
  export interface TypedEnvSchema extends CoercedEnvSchema {}
  export interface PublicTypedEnvSchema extends Pick<CoercedEnvSchema, '${exposedNonSensitiveKeys.join("' | '")}'> {}
}
`);
  tsSrc.push(`
export type EnvSchemaAsStrings = {
  [Property in keyof CoercedEnvSchema]:
    CoercedEnvSchema[Property] extends string ? CoercedEnvSchema[Property]
      : (CoercedEnvSchema[Property] extends boolean ? ('true' | 'false') : string)
};
`);
  const IMPORT_META_AUGMENTATION = `
  // add types for global import.meta.env
  interface ImportMetaEnv extends EnvSchemaAsStrings {}
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }`;
  const PROCESS_ENV_AUGMENTATION = `
  // add types for global process.env
  namespace NodeJS {
    interface ProcessEnv extends EnvSchemaAsStrings {}
  }`;
  tsSrc.push(...[
    "declare global {",
    IMPORT_META_AUGMENTATION,
    PROCESS_ENV_AUGMENTATION,
    "}"
  ].filter(Boolean));
  return tsSrc.join("\n");
}
async function generateTypes(graph, lang, outputPath) {
  if (lang !== "ts") throw new Error(`Unsupported @generateTypes lang: ${lang}`);
  const tsSrc = await generateTsTypesSrc(graph);
  if (!graph.basePath) return;
  const typesPath = path8__default.default.join(graph.basePath, outputPath);
  await fs2__default.default.promises.writeFile(typesPath, tsSrc, "utf-8");
}
var AUTOGENERATED_FILE_BANNER, ICON_SIZE, iconCacheFolderInit, iconInMemoryCache;
var init_type_generation = __esm({
  "env-graph/lib/type-generation.ts"() {
    init_my_dash();
    init_env_graph();
    init_config_item();
    AUTOGENERATED_FILE_BANNER = `
// \u{1F6D1} \u{1F6D1} \u{1F6D1} \u{1F6D1} \u{1F6D1} \u{1F6D1} \u{1F6D1} \u{1F6D1} \u{1F6D1} \u{1F6D1} \u{1F6D1} \u{1F6D1} \u{1F6D1} \u{1F6D1} \u{1F6D1} \u{1F6D1} \u{1F6D1} \u{1F6D1} \u{1F6D1} \u{1F6D1} \u{1F6D1} \u{1F6D1}
// \u{1F6D1} THIS IS AN AUTOGENERATED FILE - DO NOT EDIT DIRECTLY \u{1F6D1}
// \u{1F6D1} \u{1F6D1} \u{1F6D1} \u{1F6D1} \u{1F6D1} \u{1F6D1} \u{1F6D1} \u{1F6D1} \u{1F6D1} \u{1F6D1} \u{1F6D1} \u{1F6D1} \u{1F6D1} \u{1F6D1} \u{1F6D1} \u{1F6D1} \u{1F6D1} \u{1F6D1} \u{1F6D1} \u{1F6D1} \u{1F6D1} \u{1F6D1}
`;
    ICON_SIZE = 20;
    iconCacheFolderInit = false;
    iconInMemoryCache = {};
    __name(fetchIconSvg, "fetchIconSvg");
    __name(getTsDefinitionForItem, "getTsDefinitionForItem");
    __name(generateTsTypesSrc, "generateTsTypesSrc");
    __name(generateTypes, "generateTypes");
  }
});
var EnvGraph4;
var init_env_graph = __esm({
  "env-graph/lib/env-graph.ts"() {
    init_my_dash();
    init_config_item();
    init_data_source();
    init_resolver();
    init_data_types();
    init_graph_utils();
    init_errors();
    init_type_generation();
    EnvGraph4 = class {
      static {
        __name(this, "EnvGraph");
      }
      // TODO: not sure if this should be the graph of _everything_ in a workspace/project
      // or just the files that are relevant to the current resolution attempt
      // (which would mean it's always through the lens of the current directory/package)
      basePath;
      /** control if process.env should override schema-defined keys */
      respectExistingEnv;
      /** array of data sources */
      dataSources = [];
      finalOverridesDataSource;
      /** config item key of env flag (toggles env-specific data sources enabled) */
      envFlagKey;
      /** current value of the environment flag */
      envFlagValue;
      configSchema = {};
      addDataSource(dataSource) {
        dataSource.graph = this;
        this.dataSources.push(dataSource);
      }
      get schemaDataSource() {
        const schemas = this.dataSources.filter((f) => f.type === "schema");
        if (schemas.length > 1) throw new Error("Multiple schema data sources found");
        if (schemas.length === 0) return void 0;
        return schemas[0];
      }
      get sortedDataSources() {
        return my_dash_default.sortBy(this.dataSources, (f) => 10 * EnvGraphDataSource.DATA_SOURCE_TYPES[f.type].precedence + (f.applyForEnv ? 1 : 0));
      }
      registeredResolverFunctions = {};
      registerResolver(resolverClass) {
        const fnName = resolverClass.fnName;
        if (fnName in this.registeredResolverFunctions) {
          throw new Error(`Resolver ${fnName} already registered`);
        }
        this.registeredResolverFunctions[fnName] = resolverClass;
      }
      dataTypesRegistry = {};
      registerDataType(factory) {
        this.dataTypesRegistry[factory.dataTypeName] = factory;
      }
      constructor() {
        for (const dataType of my_dash_default.values(BaseDataTypes)) {
          this.registerDataType(dataType);
        }
        for (const resolverClass of BaseResolvers) {
          this.registerResolver(resolverClass);
        }
      }
      async finishLoad() {
        const sortedDataSources = this.sortedDataSources;
        for (const source of sortedDataSources) {
          if (source.loadingError) {
            throw source.loadingError;
          }
          if (source.type === "example") {
            source.disabled = true;
            continue;
          }
          if (source.decorators?.envFlag) {
            if (source.applyForEnv) {
              throw new Error(`@envFlag cannot be set from within an env-specific data source - ${source.label}`);
            } else if (this.envFlagKey) {
              throw new Error("only a single @envFlag setting is allowed");
            } else {
              const envFlagKey = source.decorators.envFlag.simplifiedValue;
              if (!my_dash_default.isString(envFlagKey)) {
                throw new Error("@envFlag must be a string");
              } else {
                this.envFlagKey = envFlagKey;
              }
            }
          }
          if (source.applyForEnv) {
            if (source.applyForEnv && this.envFlagValue !== source.applyForEnv) {
              source.disabled = true;
              continue;
            }
          }
          if (source.decorators?.disable && source.decorators.disable.simplifiedValue) {
            source.disabled = true;
            continue;
          }
          for (const itemKey in source.configItemDefs) {
            if (source.ignoreNewDefs && !this.configSchema[itemKey]) continue;
            const itemDef = source.configItemDefs[itemKey];
            this.configSchema[itemKey] ??= new ConfigItem2(this, itemKey);
            this.configSchema[itemKey].addDef(itemDef, source);
          }
          if (source.type === "schema" && this.envFlagKey) {
            if (!this.configSchema[this.envFlagKey]) {
              throw new Error(`@envFlag key ${this.envFlagKey} not found in schema`);
            }
            const envFlagItem = this.configSchema[this.envFlagKey];
            await envFlagItem.process();
            for (const depKey of envFlagItem.valueResolver?.deps || []) {
              const depItem = this.configSchema[depKey];
              if (!depItem) {
                throw new Error(`envFlag resolver is using non-existant dependency: ${depKey}`);
              }
              await depItem.process();
              if (depItem.valueResolver?.deps.length) {
                throw new Error("envFlag cannot follow a chain of dependencies");
              }
              await depItem.resolve();
            }
            await envFlagItem.resolve();
            if (!envFlagItem.isValid) {
              const err = new Error("resolved @envFlag value is not valid");
              err.cause = envFlagItem.errors[0];
              throw err;
            }
            if (envFlagItem.resolvedValue) {
              if (!my_dash_default.isString(envFlagItem.resolvedValue)) {
                throw new Error("expected resolved @envFlag value to be a string");
              }
              this.envFlagValue = envFlagItem.resolvedValue;
            }
          }
        }
        for (const itemKey in this.configSchema) {
          const item = this.configSchema[itemKey];
          await item.process();
        }
        const cycles = findGraphCycles(this.graphAdjacencyList);
        for (const cycleItemKeys of cycles) {
          for (const itemKey of cycleItemKeys) {
            const item = this.configSchema[itemKey];
            item.schemaErrors.push(
              new SchemaError(
                cycleItemKeys.length === 1 ? "Item cannot have dependency on itself" : `Dependency cycle detected: (${cycleItemKeys.join(", ")})`
              )
            );
          }
        }
      }
      get graphAdjacencyList() {
        const adjList = {};
        for (const itemKey in this.configSchema) {
          const item = this.configSchema[itemKey];
          adjList[itemKey] = item.valueResolver?.deps || [];
        }
        return adjList;
      }
      async resolveEnvValues() {
        const adjList = this.graphAdjacencyList;
        const reverseAdjList = {};
        for (const itemKey in adjList) {
          const itemDeps = adjList[itemKey];
          for (const dep of itemDeps) {
            reverseAdjList[dep] ??= [];
            reverseAdjList[dep].push(itemKey);
          }
        }
        const itemsToResolveStatus = my_dash_default.mapValues(this.configSchema, () => false);
        const deferred = new Promise((resolve, _reject) => {
          const markItemCompleted = /* @__PURE__ */ __name((itemKey) => {
            delete itemsToResolveStatus[itemKey];
            if (reverseAdjList[itemKey]) {
              reverseAdjList[itemKey].forEach(resolveItem);
            }
            if (my_dash_default.keys(itemsToResolveStatus).length === 0) resolve();
          }, "markItemCompleted");
          const resolveItem = /* @__PURE__ */ __name(async (itemKey) => {
            if (itemsToResolveStatus[itemKey] !== false) return;
            const item = this.configSchema[itemKey];
            if (item.errors.length) {
              markItemCompleted(itemKey);
              return;
            }
            for (const depKey of adjList[itemKey]) {
              const depItem = this.configSchema[depKey];
              if (depItem.validationState === "error") {
                item.resolutionError = new ResolutionError(`Dependency ${depKey} is invalid`);
                markItemCompleted(itemKey);
                return;
              } else if (depKey in itemsToResolveStatus) {
                return;
              }
            }
            itemsToResolveStatus[itemKey] = true;
            await item.resolve();
            markItemCompleted(itemKey);
          }, "resolveItem");
          for (const itemKey in this.configSchema) {
            resolveItem(itemKey);
          }
        });
        return deferred;
      }
      getResolvedEnvObject() {
        const envObject = {};
        for (const itemKey in this.configSchema) {
          const item = this.configSchema[itemKey];
          envObject[itemKey] = item.resolvedValue;
        }
        return envObject;
      }
      getSerializedGraph() {
        const serializedGraph = {
          basePath: this.basePath,
          sources: [],
          config: {},
          settings: {}
        };
        for (const source of this.sortedDataSources) {
          serializedGraph.sources.push({
            label: source.label,
            enabled: !source.disabled,
            path: source instanceof FileBasedDataSource ? path8__default.default.relative(this.basePath ?? "", source.fullPath) : void 0
          });
        }
        for (const itemKey in this.configSchema) {
          const item = this.configSchema[itemKey];
          serializedGraph.config[itemKey] = {
            value: item.resolvedValue,
            isSensitive: item.isSensitive
          };
        }
        serializedGraph.settings.redactLogs = this.getRootDecoratorValue("redactLogs") ?? true;
        serializedGraph.settings.preventLeaks = this.getRootDecoratorValue("preventLeaks") ?? true;
        return serializedGraph;
      }
      get isInvalid() {
        return my_dash_default.some(my_dash_default.values(this.configSchema), (i2) => !i2.isValid);
      }
      async generateTypes(lang, outputPath) {
        await generateTypes(this, lang, outputPath);
      }
      getRootDecoratorValue(decoratorName) {
        const dec = this.schemaDataSource?.decorators?.[decoratorName];
        return dec?.simplifiedValue;
      }
    };
  }
});
async function findEnvFiles(opts) {
  const cwd = opts?.cwd || process.cwd();
  const envFiles = [];
  const filesWithinDir = await fs9__default.default.readdir(cwd);
  for (const fileName of filesWithinDir) {
    if (fileName === ".env" || fileName.startsWith(".env.")) {
      let skip = false;
      for (const fileType of SKIP_FILE_TYPES) {
        if (fileName.endsWith(fileType)) skip = true;
      }
      if (skip) continue;
      envFiles.push(path8__default.default.join(cwd, fileName));
    }
  }
  return envFiles;
}
var SKIP_FILE_TYPES;
var init_find_env_files = __esm({
  "../utils/src/find-env-files.ts"() {
    SKIP_FILE_TYPES = [".md", ".d.ts"];
    __name(findEnvFiles, "findEnvFiles");
  }
});

// env-graph/lib/loader.ts
function autoDetectBasePath() {
  const PWD = process.env.PWD;
  if (!PWD) {
    throw new Error("PWD is not set");
  }
  return PWD;
}
async function loadEnvGraph(opts) {
  const graph = new EnvGraph4();
  graph.basePath = opts?.basePath ?? autoDetectBasePath();
  graph.respectExistingEnv = opts?.respectExistingEnv;
  if (opts?.afterInit) {
    await opts.afterInit(graph);
  }
  if (opts?.currentEnvFallback) {
    graph.envFlagValue = opts.currentEnvFallback;
  }
  const envFilePaths = await findEnvFiles({
    cwd: graph.basePath
  });
  for (const envFilePath of envFilePaths) {
    const fileDataSource = new DotEnvFileDataSource(envFilePath);
    graph.addDataSource(fileDataSource);
    await fileDataSource.finishInit();
    if (opts?.excludeLocal === true) {
      if (fileDataSource.type === "overrides" && /\.local(\.|$)/.test(fileDataSource.fileName)) {
        fileDataSource.disabled = true;
      }
    }
  }
  graph.finalOverridesDataSource = new ProcessEnvDataSource();
  await graph.finishLoad();
  return graph;
}
var init_loader = __esm({
  "env-graph/lib/loader.ts"() {
    init_my_dash();
    init_env_graph();
    init_data_source();
    init_find_env_files();
    __name(autoDetectBasePath, "autoDetectBasePath");
    __name(loadEnvGraph, "loadEnvGraph");
  }
});

// env-graph/index.ts
var init_env_graph2 = __esm({
  "env-graph/index.ts"() {
    init_loader();
    init_env_graph();
    init_data_source();
    init_resolver();
    init_config_item();
    init_errors();
  }
});

// src/runtime/lib/redaction.ts
function redactString(valStr, mode, hideLength = true) {
  if (!valStr) return valStr;
  const hiddenLength = hideLength ? 5 : valStr.length - 2;
  const hiddenStr = "\u2592".repeat(hiddenLength);
  if (mode === "show_last_2") {
    return `${hiddenStr}${valStr.substring(valStr.length - 2, valStr.length)}`;
  } else if (mode === "show_first_last") {
    return `${valStr.substring(0, 1)}${hiddenStr}${valStr.substring(valStr.length - 1, valStr.length)}`;
  } else {
    return `${valStr.substring(0, 2)}${hiddenStr}`;
  }
}
var init_redaction = __esm({
  "src/runtime/lib/redaction.ts"() {
    __name(redactString, "redactString");
  }
});

// src/lib/formatting.ts
function applyMods(str, mods) {
  if (!mods) return str;
  if (my_dash_default.isArray(mods)) {
    let modStr = str;
    mods.forEach((mod) => {
      modStr = ansis_default[mod](modStr);
    });
    return modStr;
  }
  return ansis_default[mods](str);
}
function formattedValue(val, showType = false) {
  let strVal = "";
  let strType = "";
  let mods;
  if (my_dash_default.isBoolean(val)) {
    strVal = val.toString();
    mods = ["yellow", "italic"];
    strType = "boolean";
  } else if (my_dash_default.isNumber(val)) {
    strVal = val.toString();
    mods = "yellow";
    strType = "number";
  } else if (my_dash_default.isString(val)) {
    strVal = `"${val}"`;
    strType = "string";
  } else if (my_dash_default.isPlainObject(val)) {
    strVal = JSON.stringify(val);
    strType = "object";
  } else if (val === null) {
    strVal = "null";
    mods = "gray";
  } else if (val === void 0) {
    strVal = "undefined";
    mods = "gray";
  }
  return [
    applyMods(strVal, mods),
    showType && strType ? ansis_default.gray(` (${strType})`) : ""
  ].join("");
}
function joinAndCompact(strings, joinChar = " ") {
  return strings.filter((s) => (
    // we'll not filter out empty strings - because it's useful to just add newlines
    s !== void 0 && s !== null && s !== false
  )).join(joinChar);
}
function getItemSummary(item) {
  const summary = [];
  const itemErrors = item.errors;
  const icon = itemErrors.length ? itemErrors[0].icon : "\u2705";
  const isSensitive = item.isSensitive;
  const isRequired = item.isRequired;
  summary.push(joinAndCompact([
    icon,
    ansis_default[VALIDATION_STATE_COLORS[item.validationState]](item.key) + (isRequired ? ansis_default.magenta("*") : ""),
    // ansis.gray(`[type = ${item.type.typeLabel}]`),
    isSensitive && ` \u{1F510}${ansis_default.gray.italic("sensitive")}`
    // item.useAt ? ansis.gray.italic(`(${item.useAt?.join(', ')})`) : undefined,
  ]));
  let valAsStr = formattedValue(item.resolvedValue, false);
  if (isSensitive && item.resolvedValue && my_dash_default.isString(item.resolvedValue)) {
    valAsStr = redactString(item.resolvedValue);
  }
  summary.push(joinAndCompact([
    ansis_default.gray("   \u2514"),
    valAsStr,
    item.isCoerced && ansis_default.gray.italic("< coerced from ") + (isSensitive ? formattedValue(item.resolvedRawValue) : formattedValue(item.resolvedRawValue, false))
  ]));
  itemErrors?.forEach((err) => {
    summary.push(ansis_default[err.isWarning ? "yellow" : "red"](`   - ${err.isWarning ? "[WARNING] " : ""}${err.message}`));
    if (err.tip) {
      summary.push(...err.tip.split("\n").map((line) => `     ${line}`));
    }
  });
  return summary.join("\n");
}
var VALIDATION_STATE_COLORS;
var init_formatting = __esm({
  "src/lib/formatting.ts"() {
    init_ansis();
    init_my_dash();
    init_env_graph2();
    init_redaction();
    __name(applyMods, "applyMods");
    __name(formattedValue, "formattedValue");
    __name(joinAndCompact, "joinAndCompact");
    VALIDATION_STATE_COLORS = {
      error: "red",
      warn: "yellow",
      valid: "cyan"
    };
    __name(getItemSummary, "getItemSummary");
  }
});

// src/cli/helpers/exit-error.ts
var CliExitError;
var init_exit_error = __esm({
  "src/cli/helpers/exit-error.ts"() {
    init_ansis();
    init_my_dash();
    init_formatting();
    CliExitError = class extends Error {
      constructor(message, more) {
        super(message);
        this.more = more;
      }
      static {
        __name(this, "CliExitError");
      }
      get forceExit() {
        return !!this.more?.forceExit;
      }
      getFormattedOutput() {
        let msg = `
\u{1F4A5} ${ansis_default.red(this.message)} \u{1F4A5}
`;
        if (this.more?.details) {
          msg += joinAndCompact(my_dash_default.castArray(this.more?.details), "\n");
        }
        if (this.more?.suggestion) {
          msg += joinAndCompact(my_dash_default.castArray(this.more?.suggestion), "\n");
        }
        msg += "\n";
        return msg;
      }
    };
  }
});
async function pathExists(p2) {
  try {
    await fs9.access(p2);
    return true;
  } catch {
    return false;
  }
}
function pathExistsSync(p2) {
  try {
    fs2.accessSync(p2);
    return true;
  } catch {
    return false;
  }
}
var init_fs_utils = __esm({
  "../utils/src/fs-utils.ts"() {
    __name(pathExists, "pathExists");
    __name(pathExistsSync, "pathExistsSync");
  }
});

// ../../node_modules/.pnpm/ms@2.1.3/node_modules/ms/index.js
var require_ms = __commonJS({
  "../../node_modules/.pnpm/ms@2.1.3/node_modules/ms/index.js"(exports, module) {
    var s = 1e3;
    var m2 = s * 60;
    var h3 = m2 * 60;
    var d3 = h3 * 24;
    var w2 = d3 * 7;
    var y3 = d3 * 365.25;
    module.exports = function(val, options) {
      options = options || {};
      var type = typeof val;
      if (type === "string" && val.length > 0) {
        return parse2(val);
      } else if (type === "number" && isFinite(val)) {
        return options.long ? fmtLong(val) : fmtShort(val);
      }
      throw new Error(
        "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
      );
    };
    function parse2(str) {
      str = String(str);
      if (str.length > 100) {
        return;
      }
      var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        str
      );
      if (!match) {
        return;
      }
      var n2 = parseFloat(match[1]);
      var type = (match[2] || "ms").toLowerCase();
      switch (type) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return n2 * y3;
        case "weeks":
        case "week":
        case "w":
          return n2 * w2;
        case "days":
        case "day":
        case "d":
          return n2 * d3;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return n2 * h3;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return n2 * m2;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return n2 * s;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return n2;
        default:
          return void 0;
      }
    }
    __name(parse2, "parse");
    function fmtShort(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d3) {
        return Math.round(ms / d3) + "d";
      }
      if (msAbs >= h3) {
        return Math.round(ms / h3) + "h";
      }
      if (msAbs >= m2) {
        return Math.round(ms / m2) + "m";
      }
      if (msAbs >= s) {
        return Math.round(ms / s) + "s";
      }
      return ms + "ms";
    }
    __name(fmtShort, "fmtShort");
    function fmtLong(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d3) {
        return plural(ms, msAbs, d3, "day");
      }
      if (msAbs >= h3) {
        return plural(ms, msAbs, h3, "hour");
      }
      if (msAbs >= m2) {
        return plural(ms, msAbs, m2, "minute");
      }
      if (msAbs >= s) {
        return plural(ms, msAbs, s, "second");
      }
      return ms + " ms";
    }
    __name(fmtLong, "fmtLong");
    function plural(ms, msAbs, n2, name) {
      var isPlural = msAbs >= n2 * 1.5;
      return Math.round(ms / n2) + " " + name + (isPlural ? "s" : "");
    }
    __name(plural, "plural");
  }
});

// ../../node_modules/.pnpm/debug@4.4.1/node_modules/debug/src/common.js
var require_common = __commonJS({
  "../../node_modules/.pnpm/debug@4.4.1/node_modules/debug/src/common.js"(exports, module) {
    function setup(env) {
      createDebug.debug = createDebug;
      createDebug.default = createDebug;
      createDebug.coerce = coerce;
      createDebug.disable = disable;
      createDebug.enable = enable;
      createDebug.enabled = enabled;
      createDebug.humanize = require_ms();
      createDebug.destroy = destroy;
      Object.keys(env).forEach((key) => {
        createDebug[key] = env[key];
      });
      createDebug.names = [];
      createDebug.skips = [];
      createDebug.formatters = {};
      function selectColor(namespace) {
        let hash = 0;
        for (let i2 = 0; i2 < namespace.length; i2++) {
          hash = (hash << 5) - hash + namespace.charCodeAt(i2);
          hash |= 0;
        }
        return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
      }
      __name(selectColor, "selectColor");
      createDebug.selectColor = selectColor;
      function createDebug(namespace) {
        let prevTime;
        let enableOverride = null;
        let namespacesCache;
        let enabledCache;
        function debug3(...args) {
          if (!debug3.enabled) {
            return;
          }
          const self = debug3;
          const curr = Number(/* @__PURE__ */ new Date());
          const ms = curr - (prevTime || curr);
          self.diff = ms;
          self.prev = prevTime;
          self.curr = curr;
          prevTime = curr;
          args[0] = createDebug.coerce(args[0]);
          if (typeof args[0] !== "string") {
            args.unshift("%O");
          }
          let index = 0;
          args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format2) => {
            if (match === "%%") {
              return "%";
            }
            index++;
            const formatter = createDebug.formatters[format2];
            if (typeof formatter === "function") {
              const val = args[index];
              match = formatter.call(self, val);
              args.splice(index, 1);
              index--;
            }
            return match;
          });
          createDebug.formatArgs.call(self, args);
          const logFn = self.log || createDebug.log;
          logFn.apply(self, args);
        }
        __name(debug3, "debug");
        debug3.namespace = namespace;
        debug3.useColors = createDebug.useColors();
        debug3.color = createDebug.selectColor(namespace);
        debug3.extend = extend;
        debug3.destroy = createDebug.destroy;
        Object.defineProperty(debug3, "enabled", {
          enumerable: true,
          configurable: false,
          get: /* @__PURE__ */ __name(() => {
            if (enableOverride !== null) {
              return enableOverride;
            }
            if (namespacesCache !== createDebug.namespaces) {
              namespacesCache = createDebug.namespaces;
              enabledCache = createDebug.enabled(namespace);
            }
            return enabledCache;
          }, "get"),
          set: /* @__PURE__ */ __name((v) => {
            enableOverride = v;
          }, "set")
        });
        if (typeof createDebug.init === "function") {
          createDebug.init(debug3);
        }
        return debug3;
      }
      __name(createDebug, "createDebug");
      function extend(namespace, delimiter) {
        const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
        newDebug.log = this.log;
        return newDebug;
      }
      __name(extend, "extend");
      function enable(namespaces) {
        createDebug.save(namespaces);
        createDebug.namespaces = namespaces;
        createDebug.names = [];
        createDebug.skips = [];
        const split = (typeof namespaces === "string" ? namespaces : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
        for (const ns of split) {
          if (ns[0] === "-") {
            createDebug.skips.push(ns.slice(1));
          } else {
            createDebug.names.push(ns);
          }
        }
      }
      __name(enable, "enable");
      function matchesTemplate(search, template) {
        let searchIndex = 0;
        let templateIndex = 0;
        let starIndex = -1;
        let matchIndex = 0;
        while (searchIndex < search.length) {
          if (templateIndex < template.length && (template[templateIndex] === search[searchIndex] || template[templateIndex] === "*")) {
            if (template[templateIndex] === "*") {
              starIndex = templateIndex;
              matchIndex = searchIndex;
              templateIndex++;
            } else {
              searchIndex++;
              templateIndex++;
            }
          } else if (starIndex !== -1) {
            templateIndex = starIndex + 1;
            matchIndex++;
            searchIndex = matchIndex;
          } else {
            return false;
          }
        }
        while (templateIndex < template.length && template[templateIndex] === "*") {
          templateIndex++;
        }
        return templateIndex === template.length;
      }
      __name(matchesTemplate, "matchesTemplate");
      function disable() {
        const namespaces = [
          ...createDebug.names,
          ...createDebug.skips.map((namespace) => "-" + namespace)
        ].join(",");
        createDebug.enable("");
        return namespaces;
      }
      __name(disable, "disable");
      function enabled(name) {
        for (const skip of createDebug.skips) {
          if (matchesTemplate(name, skip)) {
            return false;
          }
        }
        for (const ns of createDebug.names) {
          if (matchesTemplate(name, ns)) {
            return true;
          }
        }
        return false;
      }
      __name(enabled, "enabled");
      function coerce(val) {
        if (val instanceof Error) {
          return val.stack || val.message;
        }
        return val;
      }
      __name(coerce, "coerce");
      function destroy() {
        console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
      }
      __name(destroy, "destroy");
      createDebug.enable(createDebug.load());
      return createDebug;
    }
    __name(setup, "setup");
    module.exports = setup;
  }
});

// ../../node_modules/.pnpm/debug@4.4.1/node_modules/debug/src/browser.js
var require_browser = __commonJS({
  "../../node_modules/.pnpm/debug@4.4.1/node_modules/debug/src/browser.js"(exports, module) {
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load2;
    exports.useColors = useColors;
    exports.storage = localstorage();
    exports.destroy = /* @__PURE__ */ (() => {
      let warned = false;
      return () => {
        if (!warned) {
          warned = true;
          console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
        }
      };
    })();
    exports.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function useColors() {
      if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
        return true;
      }
      if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
        return false;
      }
      let m2;
      return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator !== "undefined" && navigator.userAgent && (m2 = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(m2[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    __name(useColors, "useColors");
    function formatArgs(args) {
      args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module.exports.humanize(this.diff);
      if (!this.useColors) {
        return;
      }
      const c3 = "color: " + this.color;
      args.splice(1, 0, c3, "color: inherit");
      let index = 0;
      let lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, (match) => {
        if (match === "%%") {
          return;
        }
        index++;
        if (match === "%c") {
          lastC = index;
        }
      });
      args.splice(lastC, 0, c3);
    }
    __name(formatArgs, "formatArgs");
    exports.log = console.debug || console.log || (() => {
    });
    function save(namespaces) {
      try {
        if (namespaces) {
          exports.storage.setItem("debug", namespaces);
        } else {
          exports.storage.removeItem("debug");
        }
      } catch (error) {
      }
    }
    __name(save, "save");
    function load2() {
      let r2;
      try {
        r2 = exports.storage.getItem("debug") || exports.storage.getItem("DEBUG");
      } catch (error) {
      }
      if (!r2 && typeof process !== "undefined" && "env" in process) {
        r2 = process.env.DEBUG;
      }
      return r2;
    }
    __name(load2, "load");
    function localstorage() {
      try {
        return localStorage;
      } catch (error) {
      }
    }
    __name(localstorage, "localstorage");
    module.exports = require_common()(exports);
    var { formatters } = module.exports;
    formatters.j = function(v) {
      try {
        return JSON.stringify(v);
      } catch (error) {
        return "[UnexpectedJSONParseError]: " + error.message;
      }
    };
  }
});

// ../../node_modules/.pnpm/has-flag@3.0.0/node_modules/has-flag/index.js
var require_has_flag = __commonJS({
  "../../node_modules/.pnpm/has-flag@3.0.0/node_modules/has-flag/index.js"(exports, module) {
    module.exports = (flag, argv) => {
      argv = argv || process.argv;
      const prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--";
      const pos = argv.indexOf(prefix + flag);
      const terminatorPos = argv.indexOf("--");
      return pos !== -1 && (terminatorPos === -1 ? true : pos < terminatorPos);
    };
  }
});

// ../../node_modules/.pnpm/supports-color@5.5.0/node_modules/supports-color/index.js
var require_supports_color = __commonJS({
  "../../node_modules/.pnpm/supports-color@5.5.0/node_modules/supports-color/index.js"(exports, module) {
    var os4 = __require("os");
    var hasFlag = require_has_flag();
    var env = process.env;
    var forceColor;
    if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false")) {
      forceColor = false;
    } else if (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) {
      forceColor = true;
    }
    if ("FORCE_COLOR" in env) {
      forceColor = env.FORCE_COLOR.length === 0 || parseInt(env.FORCE_COLOR, 10) !== 0;
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
    __name(translateLevel, "translateLevel");
    function supportsColor(stream) {
      if (forceColor === false) {
        return 0;
      }
      if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) {
        return 3;
      }
      if (hasFlag("color=256")) {
        return 2;
      }
      if (stream && !stream.isTTY && forceColor !== true) {
        return 0;
      }
      const min = forceColor ? 1 : 0;
      if (process.platform === "win32") {
        const osRelease = os4.release().split(".");
        if (Number(process.versions.node.split(".")[0]) >= 8 && Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
          return Number(osRelease[2]) >= 14931 ? 3 : 2;
        }
        return 1;
      }
      if ("CI" in env) {
        if (["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI"].some((sign) => sign in env) || env.CI_NAME === "codeship") {
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
      if ("TERM_PROGRAM" in env) {
        const version2 = parseInt((env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
        switch (env.TERM_PROGRAM) {
          case "iTerm.app":
            return version2 >= 3 ? 3 : 2;
          case "Apple_Terminal":
            return 2;
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
      if (env.TERM === "dumb") {
        return min;
      }
      return min;
    }
    __name(supportsColor, "supportsColor");
    function getSupportLevel(stream) {
      const level = supportsColor(stream);
      return translateLevel(level);
    }
    __name(getSupportLevel, "getSupportLevel");
    module.exports = {
      supportsColor: getSupportLevel,
      stdout: getSupportLevel(process.stdout),
      stderr: getSupportLevel(process.stderr)
    };
  }
});

// ../../node_modules/.pnpm/debug@4.4.1/node_modules/debug/src/node.js
var require_node = __commonJS({
  "../../node_modules/.pnpm/debug@4.4.1/node_modules/debug/src/node.js"(exports, module) {
    var tty3 = __require("tty");
    var util = __require("util");
    exports.init = init;
    exports.log = log2;
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load2;
    exports.useColors = useColors;
    exports.destroy = util.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    );
    exports.colors = [6, 2, 3, 4, 5, 1];
    try {
      const supportsColor = require_supports_color();
      if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
        exports.colors = [
          20,
          21,
          26,
          27,
          32,
          33,
          38,
          39,
          40,
          41,
          42,
          43,
          44,
          45,
          56,
          57,
          62,
          63,
          68,
          69,
          74,
          75,
          76,
          77,
          78,
          79,
          80,
          81,
          92,
          93,
          98,
          99,
          112,
          113,
          128,
          129,
          134,
          135,
          148,
          149,
          160,
          161,
          162,
          163,
          164,
          165,
          166,
          167,
          168,
          169,
          170,
          171,
          172,
          173,
          178,
          179,
          184,
          185,
          196,
          197,
          198,
          199,
          200,
          201,
          202,
          203,
          204,
          205,
          206,
          207,
          208,
          209,
          214,
          215,
          220,
          221
        ];
      }
    } catch (error) {
    }
    exports.inspectOpts = Object.keys(process.env).filter((key) => {
      return /^debug_/i.test(key);
    }).reduce((obj, key) => {
      const prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, (_7, k3) => {
        return k3.toUpperCase();
      });
      let val = process.env[key];
      if (/^(yes|on|true|enabled)$/i.test(val)) {
        val = true;
      } else if (/^(no|off|false|disabled)$/i.test(val)) {
        val = false;
      } else if (val === "null") {
        val = null;
      } else {
        val = Number(val);
      }
      obj[prop] = val;
      return obj;
    }, {});
    function useColors() {
      return "colors" in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty3.isatty(process.stderr.fd);
    }
    __name(useColors, "useColors");
    function formatArgs(args) {
      const { namespace: name, useColors: useColors2 } = this;
      if (useColors2) {
        const c3 = this.color;
        const colorCode = "\x1B[3" + (c3 < 8 ? c3 : "8;5;" + c3);
        const prefix = `  ${colorCode};1m${name} \x1B[0m`;
        args[0] = prefix + args[0].split("\n").join("\n" + prefix);
        args.push(colorCode + "m+" + module.exports.humanize(this.diff) + "\x1B[0m");
      } else {
        args[0] = getDate() + name + " " + args[0];
      }
    }
    __name(formatArgs, "formatArgs");
    function getDate() {
      if (exports.inspectOpts.hideDate) {
        return "";
      }
      return (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    __name(getDate, "getDate");
    function log2(...args) {
      return process.stderr.write(util.formatWithOptions(exports.inspectOpts, ...args) + "\n");
    }
    __name(log2, "log");
    function save(namespaces) {
      if (namespaces) {
        process.env.DEBUG = namespaces;
      } else {
        delete process.env.DEBUG;
      }
    }
    __name(save, "save");
    function load2() {
      return process.env.DEBUG;
    }
    __name(load2, "load");
    function init(debug3) {
      debug3.inspectOpts = {};
      const keys = Object.keys(exports.inspectOpts);
      for (let i2 = 0; i2 < keys.length; i2++) {
        debug3.inspectOpts[keys[i2]] = exports.inspectOpts[keys[i2]];
      }
    }
    __name(init, "init");
    module.exports = require_common()(exports);
    var { formatters } = module.exports;
    formatters.o = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts).split("\n").map((str) => str.trim()).join(" ");
    };
    formatters.O = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts);
    };
  }
});

// ../../node_modules/.pnpm/debug@4.4.1/node_modules/debug/src/index.js
var require_src = __commonJS({
  "../../node_modules/.pnpm/debug@4.4.1/node_modules/debug/src/index.js"(exports, module) {
    if (typeof process === "undefined" || process.type === "renderer" || process.browser === true || process.__nwjs) {
      module.exports = require_browser();
    } else {
      module.exports = require_node();
    }
  }
});
function detectJsPackageManager(opts) {
  debug("Detecting js package manager");
  let cwd = opts?.cwd || process.cwd();
  do {
    debug(`> scanning ${cwd}`);
    let pm;
    let detectedPm;
    for (pm in JS_PACKAGE_MANAGERS) {
      const lockFilePath = path8__default.default.join(
        cwd,
        JS_PACKAGE_MANAGERS[pm].lockfile
      );
      if (pathExistsSync(lockFilePath)) {
        if (detectedPm) {
          throw new CliExitError("Found multiple js package manager lockfiles", {
            details: `${JS_PACKAGE_MANAGERS[pm].lockfile} and ${JS_PACKAGE_MANAGERS[detectedPm].lockfile}`,
            forceExit: true
          });
        }
        debug(`> found ${JS_PACKAGE_MANAGERS[pm].lockfile}`);
        detectedPm = pm;
      }
    }
    if (detectedPm) return JS_PACKAGE_MANAGERS[detectedPm];
    cwd = path8__default.default.join(cwd, "..");
    if (opts?.workspaceRootPath) {
      if (opts.workspaceRootPath === cwd) {
        debug("> found workspace root");
        break;
      }
    } else {
      if (pathExistsSync(path8__default.default.join(cwd, ".git"))) {
        debug("> found git root");
        break;
      }
    }
  } while (cwd && cwd !== "." && cwd !== "/");
  if (process.env.npm_config_user_agent) {
    const pmFromAgent = process.env.npm_config_user_agent.split("/")[0];
    if (Object.keys(JS_PACKAGE_MANAGERS).includes(pmFromAgent)) {
      debug(`> found ${pmFromAgent} using npm_config_user_agent`);
      return JS_PACKAGE_MANAGERS[pmFromAgent];
    }
  }
  if (opts?.exitIfNotFound) {
    throw new CliExitError("Unable to find detect your JavaScript package manager!", {
      suggestion: "We look for lock files (ex: package-lock.json) so you may just need to run a dependency install (ie `npm install`)",
      forceExit: true
    });
  }
}
function installJsDependency(opts) {
  const packageJsonPath = path8__default.default.join(opts.packagePath || process.cwd(), "package.json");
  if (!fs2.existsSync(packageJsonPath)) return false;
  const packageJson = JSON.parse(fs2__default.default.readFileSync(packageJsonPath, "utf8"));
  if (packageJson.dependencies?.varlock) return false;
  child_process.execSync([
    // move to the correct directory if needed
    opts.packagePath && `cd ${opts.packagePath} &&`,
    // `add` works in all of them
    `${opts.packageManager} add ${opts.packageName}`,
    // tells pnpm to either install in the workspace root explicitly
    // or to not check if we are the in the root
    opts.packageManager === "pnpm" && (opts.isMonoRepoRoot ? "-w" : "--ignore-workspace-root-check")
  ].filter(Boolean).join(" "));
  return true;
}
var import_debug, debug, JS_PACKAGE_MANAGERS;
var init_js_package_manager_utils = __esm({
  "src/cli/helpers/js-package-manager-utils.ts"() {
    init_fs_utils();
    import_debug = __toESM(require_src());
    init_exit_error();
    debug = (0, import_debug.default)("varlock:js-package-manager-utils");
    JS_PACKAGE_MANAGERS = Object.freeze({
      npm: {
        name: "npm",
        lockfile: "package-lock.json",
        add: "npm install",
        // add also works
        exec: "npm exec --",
        dlx: "npx"
      },
      pnpm: {
        name: "pnpm",
        lockfile: "pnpm-lock.yaml",
        add: "pnpm add",
        exec: "pnpm exec",
        dlx: "pnpm dlx"
      },
      yarn: {
        name: "yarn",
        lockfile: "yarn.lock",
        add: "yarn add",
        exec: "yarn exec --",
        dlx: "yarn dlx"
      },
      bun: {
        name: "bun",
        lockfile: "bun.lockb",
        add: "bun add",
        exec: "bun run",
        dlx: "bunx"
      },
      deno: {
        //! deno not fully supported yet
        name: "deno",
        lockfile: "deno.lock",
        add: "deno add",
        // TODO: don't think these are quite right...
        exec: "deno run",
        dlx: "deno run"
      }
    });
    __name(detectJsPackageManager, "detectJsPackageManager");
    __name(installJsDependency, "installJsDependency");
  }
});

// src/cli/helpers/pretty-format.ts
var fmt, logLines;
var init_pretty_format = __esm({
  "src/cli/helpers/pretty-format.ts"() {
    init_ansis();
    init_js_package_manager_utils();
    fmt = {
      decorator: /* @__PURE__ */ __name((s) => ansis_default.magenta(s), "decorator"),
      filePath: /* @__PURE__ */ __name((s) => `\u{1F4C2} ${ansis_default.cyan.italic(s)}`, "filePath"),
      fileName: /* @__PURE__ */ __name((s) => `${ansis_default.cyan.italic(s)}`, "fileName"),
      command: /* @__PURE__ */ __name((s, opts) => {
        let jsPackageManager;
        if (opts?.jsPackageManager === true) {
          jsPackageManager = detectJsPackageManager();
        } else if (opts?.jsPackageManager) {
          jsPackageManager = opts.jsPackageManager;
        }
        if (jsPackageManager) {
          s = `${jsPackageManager.exec} ${s}`;
        }
        return ansis_default.green.italic(s);
      }, "command"),
      packageName: /* @__PURE__ */ __name((s) => ansis_default.green.italic(s), "packageName")
    };
    logLines = /* @__PURE__ */ __name((lines) => {
      for (const line of lines) {
        if (!line && line !== "") continue;
        console.log(line);
      }
    }, "logLines");
  }
});

// ../../node_modules/.pnpm/ci-info@4.3.0/node_modules/ci-info/vendors.json
var require_vendors = __commonJS({
  "../../node_modules/.pnpm/ci-info@4.3.0/node_modules/ci-info/vendors.json"(exports, module) {
    module.exports = [
      {
        name: "Agola CI",
        constant: "AGOLA",
        env: "AGOLA_GIT_REF",
        pr: "AGOLA_PULL_REQUEST_ID"
      },
      {
        name: "Appcircle",
        constant: "APPCIRCLE",
        env: "AC_APPCIRCLE",
        pr: {
          env: "AC_GIT_PR",
          ne: "false"
        }
      },
      {
        name: "AppVeyor",
        constant: "APPVEYOR",
        env: "APPVEYOR",
        pr: "APPVEYOR_PULL_REQUEST_NUMBER"
      },
      {
        name: "AWS CodeBuild",
        constant: "CODEBUILD",
        env: "CODEBUILD_BUILD_ARN",
        pr: {
          env: "CODEBUILD_WEBHOOK_EVENT",
          any: [
            "PULL_REQUEST_CREATED",
            "PULL_REQUEST_UPDATED",
            "PULL_REQUEST_REOPENED"
          ]
        }
      },
      {
        name: "Azure Pipelines",
        constant: "AZURE_PIPELINES",
        env: "TF_BUILD",
        pr: {
          BUILD_REASON: "PullRequest"
        }
      },
      {
        name: "Bamboo",
        constant: "BAMBOO",
        env: "bamboo_planKey"
      },
      {
        name: "Bitbucket Pipelines",
        constant: "BITBUCKET",
        env: "BITBUCKET_COMMIT",
        pr: "BITBUCKET_PR_ID"
      },
      {
        name: "Bitrise",
        constant: "BITRISE",
        env: "BITRISE_IO",
        pr: "BITRISE_PULL_REQUEST"
      },
      {
        name: "Buddy",
        constant: "BUDDY",
        env: "BUDDY_WORKSPACE_ID",
        pr: "BUDDY_EXECUTION_PULL_REQUEST_ID"
      },
      {
        name: "Buildkite",
        constant: "BUILDKITE",
        env: "BUILDKITE",
        pr: {
          env: "BUILDKITE_PULL_REQUEST",
          ne: "false"
        }
      },
      {
        name: "CircleCI",
        constant: "CIRCLE",
        env: "CIRCLECI",
        pr: "CIRCLE_PULL_REQUEST"
      },
      {
        name: "Cirrus CI",
        constant: "CIRRUS",
        env: "CIRRUS_CI",
        pr: "CIRRUS_PR"
      },
      {
        name: "Cloudflare Pages",
        constant: "CLOUDFLARE_PAGES",
        env: "CF_PAGES"
      },
      {
        name: "Cloudflare Workers",
        constant: "CLOUDFLARE_WORKERS",
        env: "WORKERS_CI"
      },
      {
        name: "Codefresh",
        constant: "CODEFRESH",
        env: "CF_BUILD_ID",
        pr: {
          any: [
            "CF_PULL_REQUEST_NUMBER",
            "CF_PULL_REQUEST_ID"
          ]
        }
      },
      {
        name: "Codemagic",
        constant: "CODEMAGIC",
        env: "CM_BUILD_ID",
        pr: "CM_PULL_REQUEST"
      },
      {
        name: "Codeship",
        constant: "CODESHIP",
        env: {
          CI_NAME: "codeship"
        }
      },
      {
        name: "Drone",
        constant: "DRONE",
        env: "DRONE",
        pr: {
          DRONE_BUILD_EVENT: "pull_request"
        }
      },
      {
        name: "dsari",
        constant: "DSARI",
        env: "DSARI"
      },
      {
        name: "Earthly",
        constant: "EARTHLY",
        env: "EARTHLY_CI"
      },
      {
        name: "Expo Application Services",
        constant: "EAS",
        env: "EAS_BUILD"
      },
      {
        name: "Gerrit",
        constant: "GERRIT",
        env: "GERRIT_PROJECT"
      },
      {
        name: "Gitea Actions",
        constant: "GITEA_ACTIONS",
        env: "GITEA_ACTIONS"
      },
      {
        name: "GitHub Actions",
        constant: "GITHUB_ACTIONS",
        env: "GITHUB_ACTIONS",
        pr: {
          GITHUB_EVENT_NAME: "pull_request"
        }
      },
      {
        name: "GitLab CI",
        constant: "GITLAB",
        env: "GITLAB_CI",
        pr: "CI_MERGE_REQUEST_ID"
      },
      {
        name: "GoCD",
        constant: "GOCD",
        env: "GO_PIPELINE_LABEL"
      },
      {
        name: "Google Cloud Build",
        constant: "GOOGLE_CLOUD_BUILD",
        env: "BUILDER_OUTPUT"
      },
      {
        name: "Harness CI",
        constant: "HARNESS",
        env: "HARNESS_BUILD_ID"
      },
      {
        name: "Heroku",
        constant: "HEROKU",
        env: {
          env: "NODE",
          includes: "/app/.heroku/node/bin/node"
        }
      },
      {
        name: "Hudson",
        constant: "HUDSON",
        env: "HUDSON_URL"
      },
      {
        name: "Jenkins",
        constant: "JENKINS",
        env: [
          "JENKINS_URL",
          "BUILD_ID"
        ],
        pr: {
          any: [
            "ghprbPullId",
            "CHANGE_ID"
          ]
        }
      },
      {
        name: "LayerCI",
        constant: "LAYERCI",
        env: "LAYERCI",
        pr: "LAYERCI_PULL_REQUEST"
      },
      {
        name: "Magnum CI",
        constant: "MAGNUM",
        env: "MAGNUM"
      },
      {
        name: "Netlify CI",
        constant: "NETLIFY",
        env: "NETLIFY",
        pr: {
          env: "PULL_REQUEST",
          ne: "false"
        }
      },
      {
        name: "Nevercode",
        constant: "NEVERCODE",
        env: "NEVERCODE",
        pr: {
          env: "NEVERCODE_PULL_REQUEST",
          ne: "false"
        }
      },
      {
        name: "Prow",
        constant: "PROW",
        env: "PROW_JOB_ID"
      },
      {
        name: "ReleaseHub",
        constant: "RELEASEHUB",
        env: "RELEASE_BUILD_ID"
      },
      {
        name: "Render",
        constant: "RENDER",
        env: "RENDER",
        pr: {
          IS_PULL_REQUEST: "true"
        }
      },
      {
        name: "Sail CI",
        constant: "SAIL",
        env: "SAILCI",
        pr: "SAIL_PULL_REQUEST_NUMBER"
      },
      {
        name: "Screwdriver",
        constant: "SCREWDRIVER",
        env: "SCREWDRIVER",
        pr: {
          env: "SD_PULL_REQUEST",
          ne: "false"
        }
      },
      {
        name: "Semaphore",
        constant: "SEMAPHORE",
        env: "SEMAPHORE",
        pr: "PULL_REQUEST_NUMBER"
      },
      {
        name: "Sourcehut",
        constant: "SOURCEHUT",
        env: {
          CI_NAME: "sourcehut"
        }
      },
      {
        name: "Strider CD",
        constant: "STRIDER",
        env: "STRIDER"
      },
      {
        name: "TaskCluster",
        constant: "TASKCLUSTER",
        env: [
          "TASK_ID",
          "RUN_ID"
        ]
      },
      {
        name: "TeamCity",
        constant: "TEAMCITY",
        env: "TEAMCITY_VERSION"
      },
      {
        name: "Travis CI",
        constant: "TRAVIS",
        env: "TRAVIS",
        pr: {
          env: "TRAVIS_PULL_REQUEST",
          ne: "false"
        }
      },
      {
        name: "Vela",
        constant: "VELA",
        env: "VELA",
        pr: {
          VELA_PULL_REQUEST: "1"
        }
      },
      {
        name: "Vercel",
        constant: "VERCEL",
        env: {
          any: [
            "NOW_BUILDER",
            "VERCEL"
          ]
        },
        pr: "VERCEL_GIT_PULL_REQUEST_ID"
      },
      {
        name: "Visual Studio App Center",
        constant: "APPCENTER",
        env: "APPCENTER_BUILD_ID"
      },
      {
        name: "Woodpecker",
        constant: "WOODPECKER",
        env: {
          CI: "woodpecker"
        },
        pr: {
          CI_BUILD_EVENT: "pull_request"
        }
      },
      {
        name: "Xcode Cloud",
        constant: "XCODE_CLOUD",
        env: "CI_XCODE_PROJECT",
        pr: "CI_PULL_REQUEST_NUMBER"
      },
      {
        name: "Xcode Server",
        constant: "XCODE_SERVER",
        env: "XCS"
      }
    ];
  }
});

// ../../node_modules/.pnpm/ci-info@4.3.0/node_modules/ci-info/index.js
var require_ci_info = __commonJS({
  "../../node_modules/.pnpm/ci-info@4.3.0/node_modules/ci-info/index.js"(exports) {
    var vendors = require_vendors();
    var env = process.env;
    Object.defineProperty(exports, "_vendors", {
      value: vendors.map(function(v) {
        return v.constant;
      })
    });
    exports.name = null;
    exports.isPR = null;
    exports.id = null;
    vendors.forEach(function(vendor) {
      const envs = Array.isArray(vendor.env) ? vendor.env : [vendor.env];
      const isCI2 = envs.every(function(obj) {
        return checkEnv(obj);
      });
      exports[vendor.constant] = isCI2;
      if (!isCI2) {
        return;
      }
      exports.name = vendor.name;
      exports.isPR = checkPR(vendor);
      exports.id = vendor.constant;
    });
    exports.isCI = !!(env.CI !== "false" && // Bypass all checks if CI env is explicitly set to 'false'
    (env.BUILD_ID || // Jenkins, Cloudbees
    env.BUILD_NUMBER || // Jenkins, TeamCity
    env.CI || // Travis CI, CircleCI, Cirrus CI, Gitlab CI, Appveyor, CodeShip, dsari, Cloudflare Pages/Workers
    env.CI_APP_ID || // Appflow
    env.CI_BUILD_ID || // Appflow
    env.CI_BUILD_NUMBER || // Appflow
    env.CI_NAME || // Codeship and others
    env.CONTINUOUS_INTEGRATION || // Travis CI, Cirrus CI
    env.RUN_ID || // TaskCluster, dsari
    exports.name || false));
    function checkEnv(obj) {
      if (typeof obj === "string") return !!env[obj];
      if ("env" in obj) {
        return env[obj.env] && env[obj.env].includes(obj.includes);
      }
      if ("any" in obj) {
        return obj.any.some(function(k3) {
          return !!env[k3];
        });
      }
      return Object.keys(obj).every(function(k3) {
        return env[k3] === obj[k3];
      });
    }
    __name(checkEnv, "checkEnv");
    function checkPR(vendor) {
      switch (typeof vendor.pr) {
        case "string":
          return !!env[vendor.pr];
        case "object":
          if ("env" in vendor.pr) {
            if ("any" in vendor.pr) {
              return vendor.pr.any.some(function(key) {
                return env[vendor.pr.env] === key;
              });
            } else {
              return vendor.pr.env in env && env[vendor.pr.env] !== vendor.pr.ne;
            }
          } else if ("any" in vendor.pr) {
            return vendor.pr.any.some(function(key) {
              return !!env[key];
            });
          } else {
            return checkEnv(vendor.pr);
          }
        default:
          return null;
      }
    }
    __name(checkPR, "checkPR");
  }
});

// src/config.ts
var CONFIG;
var init_config = __esm({
  "src/config.ts"() {
    CONFIG = {
      // VARLOCK_API_URL: 'http://localhost:8888',
      VARLOCK_API_URL: "https://api.varlock.dev",
      GITHUB_APP_CLIENT_ID: "Iv23li50gB8bMxLauiJQ",
      // varlock.dev app
      POSTHOG_API_KEY: "phc_bfzH97VIta8yQa8HrsgmitqS6rTydjMISs0m8aqJTnq",
      POSTHOG_HOST: "https://ph.varlock.dev"
    };
  }
});

// src/cli/helpers/error-checks.ts
function checkForSchemaErrors(envGraph) {
  for (const source of envGraph.dataSources) {
    if (source.loadingError) {
      console.log(`\u{1F6A8} Error encountered while loading ${source.label}`);
      console.log(source.loadingError.message);
      if ("location" in source.loadingError) {
        console.log(source.loadingError.location);
        const errLoc = source.loadingError.location;
        const errPreview = [
          errLoc.lineStr,
          `${ansis_default.gray("-".repeat(errLoc.colNumber - 1))}${ansis_default.red("^")}`
        ].join("\n");
        console.log("Error parsing .env file");
        console.log(` ${errLoc.path}:${errLoc.lineNumber}:${errLoc.colNumber}`);
        console.log(errPreview);
      }
      return gracefulExit(1);
    }
  }
}
function checkForConfigErrors(envGraph, opts) {
  const failingItems = my_dash_default.filter(my_dash_default.values(envGraph.configSchema), (item) => item.validationState === "error");
  if (failingItems.length > 0) {
    console.log(`
\u{1F6A8} \u{1F6A8} \u{1F6A8}  ${ansis_default.bold.underline("Configuration is currently invalid ")}  \u{1F6A8} \u{1F6A8} \u{1F6A8}
`);
    console.log("Invalid items:\n");
    my_dash_default.each(failingItems, (item) => {
      console.log(getItemSummary(item));
      console.log();
    });
    if (opts?.showAll) {
      console.log();
      console.log(joinAndCompact([
        "Valid items:",
        ansis_default.italic.gray("(remove `--show-all` flag to hide)")
      ]));
      console.log();
      const validItems = my_dash_default.filter(my_dash_default.values(envGraph.configSchema), (i2) => !!i2.isValid);
      my_dash_default.each(validItems, (item) => {
        console.log(getItemSummary(item));
      });
    }
    throw new InvalidEnvError();
  }
}
var InvalidEnvError;
var init_error_checks = __esm({
  "src/cli/helpers/error-checks.ts"() {
    init_ansis();
    init_env_graph2();
    init_my_dash();
    init_formatting();
    init_exit_hook();
    __name(checkForSchemaErrors, "checkForSchemaErrors");
    InvalidEnvError = class extends Error {
      static {
        __name(this, "InvalidEnvError");
      }
      constructor() {
        super("Resolved config/env did not pass validation");
      }
      getFormattedOutput() {
        return `
\u{1F4A5} ${ansis_default.red(this.message)} \u{1F4A5}
`;
      }
    };
    __name(checkForConfigErrors, "checkForConfigErrors");
  }
});

// ../../node_modules/.pnpm/sisteransi@1.0.5/node_modules/sisteransi/src/index.js
var require_src2 = __commonJS({
  "../../node_modules/.pnpm/sisteransi@1.0.5/node_modules/sisteransi/src/index.js"(exports, module) {
    var ESC = "\x1B";
    var CSI = `${ESC}[`;
    var beep = "\x07";
    var cursor = {
      to(x2, y3) {
        if (!y3) return `${CSI}${x2 + 1}G`;
        return `${CSI}${y3 + 1};${x2 + 1}H`;
      },
      move(x2, y3) {
        let ret = "";
        if (x2 < 0) ret += `${CSI}${-x2}D`;
        else if (x2 > 0) ret += `${CSI}${x2}C`;
        if (y3 < 0) ret += `${CSI}${-y3}A`;
        else if (y3 > 0) ret += `${CSI}${y3}B`;
        return ret;
      },
      up: /* @__PURE__ */ __name((count2 = 1) => `${CSI}${count2}A`, "up"),
      down: /* @__PURE__ */ __name((count2 = 1) => `${CSI}${count2}B`, "down"),
      forward: /* @__PURE__ */ __name((count2 = 1) => `${CSI}${count2}C`, "forward"),
      backward: /* @__PURE__ */ __name((count2 = 1) => `${CSI}${count2}D`, "backward"),
      nextLine: /* @__PURE__ */ __name((count2 = 1) => `${CSI}E`.repeat(count2), "nextLine"),
      prevLine: /* @__PURE__ */ __name((count2 = 1) => `${CSI}F`.repeat(count2), "prevLine"),
      left: `${CSI}G`,
      hide: `${CSI}?25l`,
      show: `${CSI}?25h`,
      save: `${ESC}7`,
      restore: `${ESC}8`
    };
    var scroll = {
      up: /* @__PURE__ */ __name((count2 = 1) => `${CSI}S`.repeat(count2), "up"),
      down: /* @__PURE__ */ __name((count2 = 1) => `${CSI}T`.repeat(count2), "down")
    };
    var erase = {
      screen: `${CSI}2J`,
      up: /* @__PURE__ */ __name((count2 = 1) => `${CSI}1J`.repeat(count2), "up"),
      down: /* @__PURE__ */ __name((count2 = 1) => `${CSI}J`.repeat(count2), "down"),
      line: `${CSI}2K`,
      lineEnd: `${CSI}K`,
      lineStart: `${CSI}1K`,
      lines(count2) {
        let clear = "";
        for (let i2 = 0; i2 < count2; i2++)
          clear += this.line + (i2 < count2 - 1 ? cursor.up() : "");
        if (count2)
          clear += cursor.left;
        return clear;
      }
    };
    module.exports = { cursor, scroll, erase, beep };
  }
});

// ../../node_modules/.pnpm/picocolors@1.1.1/node_modules/picocolors/picocolors.js
var require_picocolors = __commonJS({
  "../../node_modules/.pnpm/picocolors@1.1.1/node_modules/picocolors/picocolors.js"(exports, module) {
    var p2 = process || {};
    var argv = p2.argv || [];
    var env = p2.env || {};
    var isColorSupported = !(!!env.NO_COLOR || argv.includes("--no-color")) && (!!env.FORCE_COLOR || argv.includes("--color") || p2.platform === "win32" || (p2.stdout || {}).isTTY && env.TERM !== "dumb" || !!env.CI);
    var formatter = /* @__PURE__ */ __name((open, close, replace = open) => (input) => {
      let string = "" + input, index = string.indexOf(close, open.length);
      return ~index ? open + replaceClose(string, close, replace, index) + close : open + string + close;
    }, "formatter");
    var replaceClose = /* @__PURE__ */ __name((string, close, replace, index) => {
      let result = "", cursor = 0;
      do {
        result += string.substring(cursor, index) + replace;
        cursor = index + close.length;
        index = string.indexOf(close, cursor);
      } while (~index);
      return result + string.substring(cursor);
    }, "replaceClose");
    var createColors = /* @__PURE__ */ __name((enabled = isColorSupported) => {
      let f = enabled ? formatter : () => String;
      return {
        isColorSupported: enabled,
        reset: f("\x1B[0m", "\x1B[0m"),
        bold: f("\x1B[1m", "\x1B[22m", "\x1B[22m\x1B[1m"),
        dim: f("\x1B[2m", "\x1B[22m", "\x1B[22m\x1B[2m"),
        italic: f("\x1B[3m", "\x1B[23m"),
        underline: f("\x1B[4m", "\x1B[24m"),
        inverse: f("\x1B[7m", "\x1B[27m"),
        hidden: f("\x1B[8m", "\x1B[28m"),
        strikethrough: f("\x1B[9m", "\x1B[29m"),
        black: f("\x1B[30m", "\x1B[39m"),
        red: f("\x1B[31m", "\x1B[39m"),
        green: f("\x1B[32m", "\x1B[39m"),
        yellow: f("\x1B[33m", "\x1B[39m"),
        blue: f("\x1B[34m", "\x1B[39m"),
        magenta: f("\x1B[35m", "\x1B[39m"),
        cyan: f("\x1B[36m", "\x1B[39m"),
        white: f("\x1B[37m", "\x1B[39m"),
        gray: f("\x1B[90m", "\x1B[39m"),
        bgBlack: f("\x1B[40m", "\x1B[49m"),
        bgRed: f("\x1B[41m", "\x1B[49m"),
        bgGreen: f("\x1B[42m", "\x1B[49m"),
        bgYellow: f("\x1B[43m", "\x1B[49m"),
        bgBlue: f("\x1B[44m", "\x1B[49m"),
        bgMagenta: f("\x1B[45m", "\x1B[49m"),
        bgCyan: f("\x1B[46m", "\x1B[49m"),
        bgWhite: f("\x1B[47m", "\x1B[49m"),
        blackBright: f("\x1B[90m", "\x1B[39m"),
        redBright: f("\x1B[91m", "\x1B[39m"),
        greenBright: f("\x1B[92m", "\x1B[39m"),
        yellowBright: f("\x1B[93m", "\x1B[39m"),
        blueBright: f("\x1B[94m", "\x1B[39m"),
        magentaBright: f("\x1B[95m", "\x1B[39m"),
        cyanBright: f("\x1B[96m", "\x1B[39m"),
        whiteBright: f("\x1B[97m", "\x1B[39m"),
        bgBlackBright: f("\x1B[100m", "\x1B[49m"),
        bgRedBright: f("\x1B[101m", "\x1B[49m"),
        bgGreenBright: f("\x1B[102m", "\x1B[49m"),
        bgYellowBright: f("\x1B[103m", "\x1B[49m"),
        bgBlueBright: f("\x1B[104m", "\x1B[49m"),
        bgMagentaBright: f("\x1B[105m", "\x1B[49m"),
        bgCyanBright: f("\x1B[106m", "\x1B[49m"),
        bgWhiteBright: f("\x1B[107m", "\x1B[49m")
      };
    }, "createColors");
    module.exports = createColors();
    module.exports.createColors = createColors;
  }
});
function DD({ onlyFirst: e2 = false } = {}) {
  const t = ["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?(?:\\u0007|\\u001B\\u005C|\\u009C))", "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))"].join("|");
  return new RegExp(t, e2 ? void 0 : "g");
}
function P(e2) {
  if (typeof e2 != "string") throw new TypeError(`Expected a \`string\`, got \`${typeof e2}\``);
  return e2.replace(uD, "");
}
function L(e2) {
  return e2 && e2.__esModule && Object.prototype.hasOwnProperty.call(e2, "default") ? e2.default : e2;
}
function p(e2, u3 = {}) {
  if (typeof e2 != "string" || e2.length === 0 || (u3 = { ambiguousIsNarrow: true, ...u3 }, e2 = P(e2), e2.length === 0)) return 0;
  e2 = e2.replace(sD(), "  ");
  const t = u3.ambiguousIsNarrow ? 1 : 2;
  let F2 = 0;
  for (const s of e2) {
    const i2 = s.codePointAt(0);
    if (i2 <= 31 || i2 >= 127 && i2 <= 159 || i2 >= 768 && i2 <= 879) continue;
    switch (eD.eastAsianWidth(s)) {
      case "F":
      case "W":
        F2 += 2;
        break;
      case "A":
        F2 += t;
        break;
      default:
        F2 += 1;
    }
  }
  return F2;
}
function rD() {
  const e2 = /* @__PURE__ */ new Map();
  for (const [u3, t] of Object.entries(r)) {
    for (const [F2, s] of Object.entries(t)) r[F2] = { open: `\x1B[${s[0]}m`, close: `\x1B[${s[1]}m` }, t[F2] = r[F2], e2.set(s[0], s[1]);
    Object.defineProperty(r, u3, { value: t, enumerable: false });
  }
  return Object.defineProperty(r, "codes", { value: e2, enumerable: false }), r.color.close = "\x1B[39m", r.bgColor.close = "\x1B[49m", r.color.ansi = N(), r.color.ansi256 = I(), r.color.ansi16m = R(), r.bgColor.ansi = N(w), r.bgColor.ansi256 = I(w), r.bgColor.ansi16m = R(w), Object.defineProperties(r, { rgbToAnsi256: { value: /* @__PURE__ */ __name((u3, t, F2) => u3 === t && t === F2 ? u3 < 8 ? 16 : u3 > 248 ? 231 : Math.round((u3 - 8) / 247 * 24) + 232 : 16 + 36 * Math.round(u3 / 255 * 5) + 6 * Math.round(t / 255 * 5) + Math.round(F2 / 255 * 5), "value"), enumerable: false }, hexToRgb: { value: /* @__PURE__ */ __name((u3) => {
    const t = /[a-f\d]{6}|[a-f\d]{3}/i.exec(u3.toString(16));
    if (!t) return [0, 0, 0];
    let [F2] = t;
    F2.length === 3 && (F2 = [...F2].map((i2) => i2 + i2).join(""));
    const s = Number.parseInt(F2, 16);
    return [s >> 16 & 255, s >> 8 & 255, s & 255];
  }, "value"), enumerable: false }, hexToAnsi256: { value: /* @__PURE__ */ __name((u3) => r.rgbToAnsi256(...r.hexToRgb(u3)), "value"), enumerable: false }, ansi256ToAnsi: { value: /* @__PURE__ */ __name((u3) => {
    if (u3 < 8) return 30 + u3;
    if (u3 < 16) return 90 + (u3 - 8);
    let t, F2, s;
    if (u3 >= 232) t = ((u3 - 232) * 10 + 8) / 255, F2 = t, s = t;
    else {
      u3 -= 16;
      const C2 = u3 % 36;
      t = Math.floor(u3 / 36) / 5, F2 = Math.floor(C2 / 6) / 5, s = C2 % 6 / 5;
    }
    const i2 = Math.max(t, F2, s) * 2;
    if (i2 === 0) return 30;
    let D2 = 30 + (Math.round(s) << 2 | Math.round(F2) << 1 | Math.round(t));
    return i2 === 2 && (D2 += 60), D2;
  }, "value"), enumerable: false }, rgbToAnsi: { value: /* @__PURE__ */ __name((u3, t, F2) => r.ansi256ToAnsi(r.rgbToAnsi256(u3, t, F2)), "value"), enumerable: false }, hexToAnsi: { value: /* @__PURE__ */ __name((u3) => r.ansi256ToAnsi(r.hexToAnsi256(u3)), "value"), enumerable: false } }), r;
}
function Y(e2, u3, t) {
  return String(e2).normalize().replace(/\r\n/g, `
`).split(`
`).map((F2) => lD(F2, u3, t)).join(`
`);
}
function $(e2, u3) {
  if (typeof e2 == "string") return B.aliases.get(e2) === u3;
  for (const t of e2) if (t !== void 0 && $(t, u3)) return true;
  return false;
}
function BD(e2, u3) {
  if (e2 === u3) return;
  const t = e2.split(`
`), F2 = u3.split(`
`), s = [];
  for (let i2 = 0; i2 < Math.max(t.length, F2.length); i2++) t[i2] !== F2[i2] && s.push(i2);
  return s;
}
function pD(e2) {
  return e2 === S;
}
function m(e2, u3) {
  const t = e2;
  t.isTTY && t.setRawMode(u3);
}
var import_sisteransi, uD, W, tD, eD, FD, sD, w, N, I, R, r, iD, CD, ED, d, oD, y, V, nD, G, _4, z, K, aD, k, hD, lD, xD, B, S, gD, vD, h, x, dD, kD, $D, H, SD, OD, PD, J, LD;
var init_dist2 = __esm({
  "../../node_modules/.pnpm/@clack+core@0.5.0/node_modules/@clack/core/dist/index.mjs"() {
    import_sisteransi = __toESM(require_src2());
    __name(DD, "DD");
    uD = DD();
    __name(P, "P");
    __name(L, "L");
    W = { exports: {} };
    (function(e2) {
      var u3 = {};
      e2.exports = u3, u3.eastAsianWidth = function(F2) {
        var s = F2.charCodeAt(0), i2 = F2.length == 2 ? F2.charCodeAt(1) : 0, D2 = s;
        return 55296 <= s && s <= 56319 && 56320 <= i2 && i2 <= 57343 && (s &= 1023, i2 &= 1023, D2 = s << 10 | i2, D2 += 65536), D2 == 12288 || 65281 <= D2 && D2 <= 65376 || 65504 <= D2 && D2 <= 65510 ? "F" : D2 == 8361 || 65377 <= D2 && D2 <= 65470 || 65474 <= D2 && D2 <= 65479 || 65482 <= D2 && D2 <= 65487 || 65490 <= D2 && D2 <= 65495 || 65498 <= D2 && D2 <= 65500 || 65512 <= D2 && D2 <= 65518 ? "H" : 4352 <= D2 && D2 <= 4447 || 4515 <= D2 && D2 <= 4519 || 4602 <= D2 && D2 <= 4607 || 9001 <= D2 && D2 <= 9002 || 11904 <= D2 && D2 <= 11929 || 11931 <= D2 && D2 <= 12019 || 12032 <= D2 && D2 <= 12245 || 12272 <= D2 && D2 <= 12283 || 12289 <= D2 && D2 <= 12350 || 12353 <= D2 && D2 <= 12438 || 12441 <= D2 && D2 <= 12543 || 12549 <= D2 && D2 <= 12589 || 12593 <= D2 && D2 <= 12686 || 12688 <= D2 && D2 <= 12730 || 12736 <= D2 && D2 <= 12771 || 12784 <= D2 && D2 <= 12830 || 12832 <= D2 && D2 <= 12871 || 12880 <= D2 && D2 <= 13054 || 13056 <= D2 && D2 <= 19903 || 19968 <= D2 && D2 <= 42124 || 42128 <= D2 && D2 <= 42182 || 43360 <= D2 && D2 <= 43388 || 44032 <= D2 && D2 <= 55203 || 55216 <= D2 && D2 <= 55238 || 55243 <= D2 && D2 <= 55291 || 63744 <= D2 && D2 <= 64255 || 65040 <= D2 && D2 <= 65049 || 65072 <= D2 && D2 <= 65106 || 65108 <= D2 && D2 <= 65126 || 65128 <= D2 && D2 <= 65131 || 110592 <= D2 && D2 <= 110593 || 127488 <= D2 && D2 <= 127490 || 127504 <= D2 && D2 <= 127546 || 127552 <= D2 && D2 <= 127560 || 127568 <= D2 && D2 <= 127569 || 131072 <= D2 && D2 <= 194367 || 177984 <= D2 && D2 <= 196605 || 196608 <= D2 && D2 <= 262141 ? "W" : 32 <= D2 && D2 <= 126 || 162 <= D2 && D2 <= 163 || 165 <= D2 && D2 <= 166 || D2 == 172 || D2 == 175 || 10214 <= D2 && D2 <= 10221 || 10629 <= D2 && D2 <= 10630 ? "Na" : D2 == 161 || D2 == 164 || 167 <= D2 && D2 <= 168 || D2 == 170 || 173 <= D2 && D2 <= 174 || 176 <= D2 && D2 <= 180 || 182 <= D2 && D2 <= 186 || 188 <= D2 && D2 <= 191 || D2 == 198 || D2 == 208 || 215 <= D2 && D2 <= 216 || 222 <= D2 && D2 <= 225 || D2 == 230 || 232 <= D2 && D2 <= 234 || 236 <= D2 && D2 <= 237 || D2 == 240 || 242 <= D2 && D2 <= 243 || 247 <= D2 && D2 <= 250 || D2 == 252 || D2 == 254 || D2 == 257 || D2 == 273 || D2 == 275 || D2 == 283 || 294 <= D2 && D2 <= 295 || D2 == 299 || 305 <= D2 && D2 <= 307 || D2 == 312 || 319 <= D2 && D2 <= 322 || D2 == 324 || 328 <= D2 && D2 <= 331 || D2 == 333 || 338 <= D2 && D2 <= 339 || 358 <= D2 && D2 <= 359 || D2 == 363 || D2 == 462 || D2 == 464 || D2 == 466 || D2 == 468 || D2 == 470 || D2 == 472 || D2 == 474 || D2 == 476 || D2 == 593 || D2 == 609 || D2 == 708 || D2 == 711 || 713 <= D2 && D2 <= 715 || D2 == 717 || D2 == 720 || 728 <= D2 && D2 <= 731 || D2 == 733 || D2 == 735 || 768 <= D2 && D2 <= 879 || 913 <= D2 && D2 <= 929 || 931 <= D2 && D2 <= 937 || 945 <= D2 && D2 <= 961 || 963 <= D2 && D2 <= 969 || D2 == 1025 || 1040 <= D2 && D2 <= 1103 || D2 == 1105 || D2 == 8208 || 8211 <= D2 && D2 <= 8214 || 8216 <= D2 && D2 <= 8217 || 8220 <= D2 && D2 <= 8221 || 8224 <= D2 && D2 <= 8226 || 8228 <= D2 && D2 <= 8231 || D2 == 8240 || 8242 <= D2 && D2 <= 8243 || D2 == 8245 || D2 == 8251 || D2 == 8254 || D2 == 8308 || D2 == 8319 || 8321 <= D2 && D2 <= 8324 || D2 == 8364 || D2 == 8451 || D2 == 8453 || D2 == 8457 || D2 == 8467 || D2 == 8470 || 8481 <= D2 && D2 <= 8482 || D2 == 8486 || D2 == 8491 || 8531 <= D2 && D2 <= 8532 || 8539 <= D2 && D2 <= 8542 || 8544 <= D2 && D2 <= 8555 || 8560 <= D2 && D2 <= 8569 || D2 == 8585 || 8592 <= D2 && D2 <= 8601 || 8632 <= D2 && D2 <= 8633 || D2 == 8658 || D2 == 8660 || D2 == 8679 || D2 == 8704 || 8706 <= D2 && D2 <= 8707 || 8711 <= D2 && D2 <= 8712 || D2 == 8715 || D2 == 8719 || D2 == 8721 || D2 == 8725 || D2 == 8730 || 8733 <= D2 && D2 <= 8736 || D2 == 8739 || D2 == 8741 || 8743 <= D2 && D2 <= 8748 || D2 == 8750 || 8756 <= D2 && D2 <= 8759 || 8764 <= D2 && D2 <= 8765 || D2 == 8776 || D2 == 8780 || D2 == 8786 || 8800 <= D2 && D2 <= 8801 || 8804 <= D2 && D2 <= 8807 || 8810 <= D2 && D2 <= 8811 || 8814 <= D2 && D2 <= 8815 || 8834 <= D2 && D2 <= 8835 || 8838 <= D2 && D2 <= 8839 || D2 == 8853 || D2 == 8857 || D2 == 8869 || D2 == 8895 || D2 == 8978 || 9312 <= D2 && D2 <= 9449 || 9451 <= D2 && D2 <= 9547 || 9552 <= D2 && D2 <= 9587 || 9600 <= D2 && D2 <= 9615 || 9618 <= D2 && D2 <= 9621 || 9632 <= D2 && D2 <= 9633 || 9635 <= D2 && D2 <= 9641 || 9650 <= D2 && D2 <= 9651 || 9654 <= D2 && D2 <= 9655 || 9660 <= D2 && D2 <= 9661 || 9664 <= D2 && D2 <= 9665 || 9670 <= D2 && D2 <= 9672 || D2 == 9675 || 9678 <= D2 && D2 <= 9681 || 9698 <= D2 && D2 <= 9701 || D2 == 9711 || 9733 <= D2 && D2 <= 9734 || D2 == 9737 || 9742 <= D2 && D2 <= 9743 || 9748 <= D2 && D2 <= 9749 || D2 == 9756 || D2 == 9758 || D2 == 9792 || D2 == 9794 || 9824 <= D2 && D2 <= 9825 || 9827 <= D2 && D2 <= 9829 || 9831 <= D2 && D2 <= 9834 || 9836 <= D2 && D2 <= 9837 || D2 == 9839 || 9886 <= D2 && D2 <= 9887 || 9918 <= D2 && D2 <= 9919 || 9924 <= D2 && D2 <= 9933 || 9935 <= D2 && D2 <= 9953 || D2 == 9955 || 9960 <= D2 && D2 <= 9983 || D2 == 10045 || D2 == 10071 || 10102 <= D2 && D2 <= 10111 || 11093 <= D2 && D2 <= 11097 || 12872 <= D2 && D2 <= 12879 || 57344 <= D2 && D2 <= 63743 || 65024 <= D2 && D2 <= 65039 || D2 == 65533 || 127232 <= D2 && D2 <= 127242 || 127248 <= D2 && D2 <= 127277 || 127280 <= D2 && D2 <= 127337 || 127344 <= D2 && D2 <= 127386 || 917760 <= D2 && D2 <= 917999 || 983040 <= D2 && D2 <= 1048573 || 1048576 <= D2 && D2 <= 1114109 ? "A" : "N";
      }, u3.characterLength = function(F2) {
        var s = this.eastAsianWidth(F2);
        return s == "F" || s == "W" || s == "A" ? 2 : 1;
      };
      function t(F2) {
        return F2.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[^\uD800-\uDFFF]/g) || [];
      }
      __name(t, "t");
      u3.length = function(F2) {
        for (var s = t(F2), i2 = 0, D2 = 0; D2 < s.length; D2++) i2 = i2 + this.characterLength(s[D2]);
        return i2;
      }, u3.slice = function(F2, s, i2) {
        textLen = u3.length(F2), s = s || 0, i2 = i2 || 1, s < 0 && (s = textLen + s), i2 < 0 && (i2 = textLen + i2);
        for (var D2 = "", C2 = 0, n2 = t(F2), E = 0; E < n2.length; E++) {
          var a3 = n2[E], o3 = u3.length(a3);
          if (C2 >= s - (o3 == 2 ? 1 : 0)) if (C2 + o3 <= i2) D2 += a3;
          else break;
          C2 += o3;
        }
        return D2;
      };
    })(W);
    tD = W.exports;
    eD = L(tD);
    FD = /* @__PURE__ */ __name(function() {
      return /\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67)\uDB40\uDC7F|(?:\uD83E\uDDD1\uD83C\uDFFF\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFE])|(?:\uD83E\uDDD1\uD83C\uDFFE\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFD\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFC\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFB\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFB\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFC-\uDFFF])|\uD83D\uDC68(?:\uD83C\uDFFB(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF]))|\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFC-\uDFFF])|[\u2695\u2696\u2708]\uFE0F|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))?|(?:\uD83C[\uDFFC-\uDFFF])\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF]))|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFE])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])\uFE0F|\u200D(?:(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D[\uDC66\uDC67])|\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC)?|(?:\uD83D\uDC69(?:\uD83C\uDFFB\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|(?:\uD83C[\uDFFC-\uDFFF])\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69]))|\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1)(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC69(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83E\uDDD1(?:\u200D(?:\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83E\uDDD1(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|\uD83D\uDC69(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|\uD83D\uDE36\u200D\uD83C\uDF2B|\uD83C\uDFF3\uFE0F\u200D\u26A7|\uD83D\uDC3B\u200D\u2744|(?:(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\uD83C\uDFF4\u200D\u2620|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])\u200D[\u2640\u2642]|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u2600-\u2604\u260E\u2611\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26B0\u26B1\u26C8\u26CF\u26D1\u26D3\u26E9\u26F0\u26F1\u26F4\u26F7\u26F8\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2763\u27A1\u2934\u2935\u2B05-\u2B07\u3030\u303D\u3297\u3299]|\uD83C[\uDD70\uDD71\uDD7E\uDD7F\uDE02\uDE37\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF5\uDFF7]|\uD83D[\uDC3F\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3])\uFE0F|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83D\uDE35\u200D\uD83D\uDCAB|\uD83D\uDE2E\u200D\uD83D\uDCA8|\uD83D\uDC15\u200D\uD83E\uDDBA|\uD83E\uDDD1(?:\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC|\uD83C\uDFFB)?|\uD83D\uDC69(?:\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC|\uD83C\uDFFB)?|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF6\uD83C\uDDE6|\uD83C\uDDF4\uD83C\uDDF2|\uD83D\uDC08\u200D\u2B1B|\u2764\uFE0F\u200D(?:\uD83D\uDD25|\uD83E\uDE79)|\uD83D\uDC41\uFE0F|\uD83C\uDFF3\uFE0F|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|[#\*0-9]\uFE0F\u20E3|\u2764\uFE0F|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])|\uD83C\uDFF4|(?:[\u270A\u270B]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270C\u270D]|\uD83D[\uDD74\uDD90])(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])|[\u270A\u270B]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC08\uDC15\uDC3B\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE2E\uDE35\uDE36\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5]|\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD]|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF]|[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF84\uDF86-\uDF93\uDFA0-\uDFC1\uDFC5\uDFC6\uDFC8\uDFC9\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC07\uDC09-\uDC14\uDC16-\uDC3A\uDC3C-\uDC3E\uDC40\uDC44\uDC45\uDC51-\uDC65\uDC6A\uDC79-\uDC7B\uDC7D-\uDC80\uDC84\uDC88-\uDC8E\uDC90\uDC92-\uDCA9\uDCAB-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDDA4\uDDFB-\uDE2D\uDE2F-\uDE34\uDE37-\uDE44\uDE48-\uDE4A\uDE80-\uDEA2\uDEA4-\uDEB3\uDEB7-\uDEBF\uDEC1-\uDEC5\uDED0-\uDED2\uDED5-\uDED7\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0D\uDD0E\uDD10-\uDD17\uDD1D\uDD20-\uDD25\uDD27-\uDD2F\uDD3A\uDD3F-\uDD45\uDD47-\uDD76\uDD78\uDD7A-\uDDB4\uDDB7\uDDBA\uDDBC-\uDDCB\uDDD0\uDDE0-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6]|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDED5-\uDED7\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDD78\uDD7A-\uDDCB\uDDCD-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26A7\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDED5-\uDED7\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDD78\uDD7A-\uDDCB\uDDCD-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6])\uFE0F|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDC8F\uDC91\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1F\uDD26\uDD30-\uDD39\uDD3C-\uDD3E\uDD77\uDDB5\uDDB6\uDDB8\uDDB9\uDDBB\uDDCD-\uDDCF\uDDD1-\uDDDD])/g;
    }, "FD");
    sD = L(FD);
    __name(p, "p");
    w = 10;
    N = /* @__PURE__ */ __name((e2 = 0) => (u3) => `\x1B[${u3 + e2}m`, "N");
    I = /* @__PURE__ */ __name((e2 = 0) => (u3) => `\x1B[${38 + e2};5;${u3}m`, "I");
    R = /* @__PURE__ */ __name((e2 = 0) => (u3, t, F2) => `\x1B[${38 + e2};2;${u3};${t};${F2}m`, "R");
    r = { modifier: { reset: [0, 0], bold: [1, 22], dim: [2, 22], italic: [3, 23], underline: [4, 24], overline: [53, 55], inverse: [7, 27], hidden: [8, 28], strikethrough: [9, 29] }, color: { black: [30, 39], red: [31, 39], green: [32, 39], yellow: [33, 39], blue: [34, 39], magenta: [35, 39], cyan: [36, 39], white: [37, 39], blackBright: [90, 39], gray: [90, 39], grey: [90, 39], redBright: [91, 39], greenBright: [92, 39], yellowBright: [93, 39], blueBright: [94, 39], magentaBright: [95, 39], cyanBright: [96, 39], whiteBright: [97, 39] }, bgColor: { bgBlack: [40, 49], bgRed: [41, 49], bgGreen: [42, 49], bgYellow: [43, 49], bgBlue: [44, 49], bgMagenta: [45, 49], bgCyan: [46, 49], bgWhite: [47, 49], bgBlackBright: [100, 49], bgGray: [100, 49], bgGrey: [100, 49], bgRedBright: [101, 49], bgGreenBright: [102, 49], bgYellowBright: [103, 49], bgBlueBright: [104, 49], bgMagentaBright: [105, 49], bgCyanBright: [106, 49], bgWhiteBright: [107, 49] } };
    Object.keys(r.modifier);
    iD = Object.keys(r.color);
    CD = Object.keys(r.bgColor);
    [...iD, ...CD];
    __name(rD, "rD");
    ED = rD();
    d = /* @__PURE__ */ new Set(["\x1B", "\x9B"]);
    oD = 39;
    y = "\x07";
    V = "[";
    nD = "]";
    G = "m";
    _4 = `${nD}8;;`;
    z = /* @__PURE__ */ __name((e2) => `${d.values().next().value}${V}${e2}${G}`, "z");
    K = /* @__PURE__ */ __name((e2) => `${d.values().next().value}${_4}${e2}${y}`, "K");
    aD = /* @__PURE__ */ __name((e2) => e2.split(" ").map((u3) => p(u3)), "aD");
    k = /* @__PURE__ */ __name((e2, u3, t) => {
      const F2 = [...u3];
      let s = false, i2 = false, D2 = p(P(e2[e2.length - 1]));
      for (const [C2, n2] of F2.entries()) {
        const E = p(n2);
        if (D2 + E <= t ? e2[e2.length - 1] += n2 : (e2.push(n2), D2 = 0), d.has(n2) && (s = true, i2 = F2.slice(C2 + 1).join("").startsWith(_4)), s) {
          i2 ? n2 === y && (s = false, i2 = false) : n2 === G && (s = false);
          continue;
        }
        D2 += E, D2 === t && C2 < F2.length - 1 && (e2.push(""), D2 = 0);
      }
      !D2 && e2[e2.length - 1].length > 0 && e2.length > 1 && (e2[e2.length - 2] += e2.pop());
    }, "k");
    hD = /* @__PURE__ */ __name((e2) => {
      const u3 = e2.split(" ");
      let t = u3.length;
      for (; t > 0 && !(p(u3[t - 1]) > 0); ) t--;
      return t === u3.length ? e2 : u3.slice(0, t).join(" ") + u3.slice(t).join("");
    }, "hD");
    lD = /* @__PURE__ */ __name((e2, u3, t = {}) => {
      if (t.trim !== false && e2.trim() === "") return "";
      let F2 = "", s, i2;
      const D2 = aD(e2);
      let C2 = [""];
      for (const [E, a3] of e2.split(" ").entries()) {
        t.trim !== false && (C2[C2.length - 1] = C2[C2.length - 1].trimStart());
        let o3 = p(C2[C2.length - 1]);
        if (E !== 0 && (o3 >= u3 && (t.wordWrap === false || t.trim === false) && (C2.push(""), o3 = 0), (o3 > 0 || t.trim === false) && (C2[C2.length - 1] += " ", o3++)), t.hard && D2[E] > u3) {
          const c3 = u3 - o3, f = 1 + Math.floor((D2[E] - c3 - 1) / u3);
          Math.floor((D2[E] - 1) / u3) < f && C2.push(""), k(C2, a3, u3);
          continue;
        }
        if (o3 + D2[E] > u3 && o3 > 0 && D2[E] > 0) {
          if (t.wordWrap === false && o3 < u3) {
            k(C2, a3, u3);
            continue;
          }
          C2.push("");
        }
        if (o3 + D2[E] > u3 && t.wordWrap === false) {
          k(C2, a3, u3);
          continue;
        }
        C2[C2.length - 1] += a3;
      }
      t.trim !== false && (C2 = C2.map((E) => hD(E)));
      const n2 = [...C2.join(`
`)];
      for (const [E, a3] of n2.entries()) {
        if (F2 += a3, d.has(a3)) {
          const { groups: c3 } = new RegExp(`(?:\\${V}(?<code>\\d+)m|\\${_4}(?<uri>.*)${y})`).exec(n2.slice(E).join("")) || { groups: {} };
          if (c3.code !== void 0) {
            const f = Number.parseFloat(c3.code);
            s = f === oD ? void 0 : f;
          } else c3.uri !== void 0 && (i2 = c3.uri.length === 0 ? void 0 : c3.uri);
        }
        const o3 = ED.codes.get(Number(s));
        n2[E + 1] === `
` ? (i2 && (F2 += K("")), s && o3 && (F2 += z(o3))) : a3 === `
` && (s && o3 && (F2 += z(s)), i2 && (F2 += K(i2)));
      }
      return F2;
    }, "lD");
    __name(Y, "Y");
    xD = ["up", "down", "left", "right", "space", "enter", "cancel"];
    B = { actions: new Set(xD), aliases: /* @__PURE__ */ new Map([["k", "up"], ["j", "down"], ["h", "left"], ["l", "right"], ["", "cancel"], ["escape", "cancel"]]) };
    __name($, "$");
    __name(BD, "BD");
    globalThis.process.platform.startsWith("win");
    S = Symbol("clack:cancel");
    __name(pD, "pD");
    __name(m, "m");
    gD = Object.defineProperty;
    vD = /* @__PURE__ */ __name((e2, u3, t) => u3 in e2 ? gD(e2, u3, { enumerable: true, configurable: true, writable: true, value: t }) : e2[u3] = t, "vD");
    h = /* @__PURE__ */ __name((e2, u3, t) => (vD(e2, typeof u3 != "symbol" ? u3 + "" : u3, t), t), "h");
    x = class {
      static {
        __name(this, "x");
      }
      constructor(u3, t = true) {
        h(this, "input"), h(this, "output"), h(this, "_abortSignal"), h(this, "rl"), h(this, "opts"), h(this, "_render"), h(this, "_track", false), h(this, "_prevFrame", ""), h(this, "_subscribers", /* @__PURE__ */ new Map()), h(this, "_cursor", 0), h(this, "state", "initial"), h(this, "error", ""), h(this, "value");
        const { input: F2 = y2.stdin, output: s = y2.stdout, render: i2, signal: D2, ...C2 } = u3;
        this.opts = C2, this.onKeypress = this.onKeypress.bind(this), this.close = this.close.bind(this), this.render = this.render.bind(this), this._render = i2.bind(this), this._track = t, this._abortSignal = D2, this.input = F2, this.output = s;
      }
      unsubscribe() {
        this._subscribers.clear();
      }
      setSubscriber(u3, t) {
        const F2 = this._subscribers.get(u3) ?? [];
        F2.push(t), this._subscribers.set(u3, F2);
      }
      on(u3, t) {
        this.setSubscriber(u3, { cb: t });
      }
      once(u3, t) {
        this.setSubscriber(u3, { cb: t, once: true });
      }
      emit(u3, ...t) {
        const F2 = this._subscribers.get(u3) ?? [], s = [];
        for (const i2 of F2) i2.cb(...t), i2.once && s.push(() => F2.splice(F2.indexOf(i2), 1));
        for (const i2 of s) i2();
      }
      prompt() {
        return new Promise((u3, t) => {
          if (this._abortSignal) {
            if (this._abortSignal.aborted) return this.state = "cancel", this.close(), u3(S);
            this._abortSignal.addEventListener("abort", () => {
              this.state = "cancel", this.close();
            }, { once: true });
          }
          const F2 = new stream.Writable();
          F2._write = (s, i2, D2) => {
            this._track && (this.value = this.rl?.line.replace(/\t/g, ""), this._cursor = this.rl?.cursor ?? 0, this.emit("value", this.value)), D2();
          }, this.input.pipe(F2), this.rl = O__default.default.createInterface({ input: this.input, output: F2, tabSize: 2, prompt: "", escapeCodeTimeout: 50, terminal: true }), O__default.default.emitKeypressEvents(this.input, this.rl), this.rl.prompt(), this.opts.initialValue !== void 0 && this._track && this.rl.write(this.opts.initialValue), this.input.on("keypress", this.onKeypress), m(this.input, true), this.output.on("resize", this.render), this.render(), this.once("submit", () => {
            this.output.write(import_sisteransi.cursor.show), this.output.off("resize", this.render), m(this.input, false), u3(this.value);
          }), this.once("cancel", () => {
            this.output.write(import_sisteransi.cursor.show), this.output.off("resize", this.render), m(this.input, false), u3(S);
          });
        });
      }
      onKeypress(u3, t) {
        if (this.state === "error" && (this.state = "active"), t?.name && (!this._track && B.aliases.has(t.name) && this.emit("cursor", B.aliases.get(t.name)), B.actions.has(t.name) && this.emit("cursor", t.name)), u3 && (u3.toLowerCase() === "y" || u3.toLowerCase() === "n") && this.emit("confirm", u3.toLowerCase() === "y"), u3 === "	" && this.opts.placeholder && (this.value || (this.rl?.write(this.opts.placeholder), this.emit("value", this.opts.placeholder))), u3 && this.emit("key", u3.toLowerCase()), t?.name === "return") {
          if (this.opts.validate) {
            const F2 = this.opts.validate(this.value);
            F2 && (this.error = F2 instanceof Error ? F2.message : F2, this.state = "error", this.rl?.write(this.value));
          }
          this.state !== "error" && (this.state = "submit");
        }
        $([u3, t?.name, t?.sequence], "cancel") && (this.state = "cancel"), (this.state === "submit" || this.state === "cancel") && this.emit("finalize"), this.render(), (this.state === "submit" || this.state === "cancel") && this.close();
      }
      close() {
        this.input.unpipe(), this.input.removeListener("keypress", this.onKeypress), this.output.write(`
`), m(this.input, false), this.rl?.close(), this.rl = void 0, this.emit(`${this.state}`, this.value), this.unsubscribe();
      }
      restoreCursor() {
        const u3 = Y(this._prevFrame, process.stdout.columns, { hard: true }).split(`
`).length - 1;
        this.output.write(import_sisteransi.cursor.move(-999, u3 * -1));
      }
      render() {
        const u3 = Y(this._render(this) ?? "", process.stdout.columns, { hard: true });
        if (u3 !== this._prevFrame) {
          if (this.state === "initial") this.output.write(import_sisteransi.cursor.hide);
          else {
            const t = BD(this._prevFrame, u3);
            if (this.restoreCursor(), t && t?.length === 1) {
              const F2 = t[0];
              this.output.write(import_sisteransi.cursor.move(0, F2)), this.output.write(import_sisteransi.erase.lines(1));
              const s = u3.split(`
`);
              this.output.write(s[F2]), this._prevFrame = u3, this.output.write(import_sisteransi.cursor.move(0, s.length - F2 - 1));
              return;
            }
            if (t && t?.length > 1) {
              const F2 = t[0];
              this.output.write(import_sisteransi.cursor.move(0, F2)), this.output.write(import_sisteransi.erase.down());
              const s = u3.split(`
`).slice(F2);
              this.output.write(s.join(`
`)), this._prevFrame = u3;
              return;
            }
            this.output.write(import_sisteransi.erase.down());
          }
          this.output.write(u3), this.state === "initial" && (this.state = "active"), this._prevFrame = u3;
        }
      }
    };
    dD = class extends x {
      static {
        __name(this, "dD");
      }
      get cursor() {
        return this.value ? 0 : 1;
      }
      get _value() {
        return this.cursor === 0;
      }
      constructor(u3) {
        super(u3, false), this.value = !!u3.initialValue, this.on("value", () => {
          this.value = this._value;
        }), this.on("confirm", (t) => {
          this.output.write(import_sisteransi.cursor.move(0, -1)), this.value = t, this.state = "submit", this.close();
        }), this.on("cursor", () => {
          this.value = !this.value;
        });
      }
    };
    kD = Object.defineProperty;
    $D = /* @__PURE__ */ __name((e2, u3, t) => u3 in e2 ? kD(e2, u3, { enumerable: true, configurable: true, writable: true, value: t }) : e2[u3] = t, "$D");
    H = /* @__PURE__ */ __name((e2, u3, t) => ($D(e2, typeof u3 != "symbol" ? u3 + "" : u3, t), t), "H");
    SD = class extends x {
      static {
        __name(this, "SD");
      }
      constructor(u3) {
        super(u3, false), H(this, "options"), H(this, "cursor", 0), this.options = u3.options, this.value = [...u3.initialValues ?? []], this.cursor = Math.max(this.options.findIndex(({ value: t }) => t === u3.cursorAt), 0), this.on("key", (t) => {
          t === "a" && this.toggleAll();
        }), this.on("cursor", (t) => {
          switch (t) {
            case "left":
            case "up":
              this.cursor = this.cursor === 0 ? this.options.length - 1 : this.cursor - 1;
              break;
            case "down":
            case "right":
              this.cursor = this.cursor === this.options.length - 1 ? 0 : this.cursor + 1;
              break;
            case "space":
              this.toggleValue();
              break;
          }
        });
      }
      get _value() {
        return this.options[this.cursor].value;
      }
      toggleAll() {
        const u3 = this.value.length === this.options.length;
        this.value = u3 ? [] : this.options.map((t) => t.value);
      }
      toggleValue() {
        const u3 = this.value.includes(this._value);
        this.value = u3 ? this.value.filter((t) => t !== this._value) : [...this.value, this._value];
      }
    };
    OD = Object.defineProperty;
    PD = /* @__PURE__ */ __name((e2, u3, t) => u3 in e2 ? OD(e2, u3, { enumerable: true, configurable: true, writable: true, value: t }) : e2[u3] = t, "PD");
    J = /* @__PURE__ */ __name((e2, u3, t) => (PD(e2, typeof u3 != "symbol" ? u3 + "" : u3, t), t), "J");
    LD = class extends x {
      static {
        __name(this, "LD");
      }
      constructor(u3) {
        super(u3, false), J(this, "options"), J(this, "cursor", 0), this.options = u3.options, this.cursor = this.options.findIndex(({ value: t }) => t === u3.initialValue), this.cursor === -1 && (this.cursor = 0), this.changeValue(), this.on("cursor", (t) => {
          switch (t) {
            case "left":
            case "up":
              this.cursor = this.cursor === 0 ? this.options.length - 1 : this.cursor - 1;
              break;
            case "down":
            case "right":
              this.cursor = this.cursor === this.options.length - 1 ? 0 : this.cursor + 1;
              break;
          }
          this.changeValue();
        });
      }
      get _value() {
        return this.options[this.cursor];
      }
      changeValue() {
        this.value = this._value.value;
      }
    };
  }
});
function ce() {
  return y2__default.default.platform !== "win32" ? y2__default.default.env.TERM !== "linux" : !!y2__default.default.env.CI || !!y2__default.default.env.WT_SESSION || !!y2__default.default.env.TERMINUS_SUBLIME || y2__default.default.env.ConEmuTask === "{cmd::Cmder}" || y2__default.default.env.TERM_PROGRAM === "Terminus-Sublime" || y2__default.default.env.TERM_PROGRAM === "vscode" || y2__default.default.env.TERM === "xterm-256color" || y2__default.default.env.TERM === "alacritty" || y2__default.default.env.TERMINAL_EMULATOR === "JetBrains-JediTerm";
}
var import_picocolors, V2, u, le, L2, W2, C, o, d2, k2, P2, b2, G2, ve;
var init_dist3 = __esm({
  "../../node_modules/.pnpm/@clack+prompts@0.11.0/node_modules/@clack/prompts/dist/index.mjs"() {
    init_dist2();
    init_dist2();
    import_picocolors = __toESM(require_picocolors());
    __toESM(require_src2());
    __name(ce, "ce");
    V2 = ce();
    u = /* @__PURE__ */ __name((t, n2) => V2 ? t : n2, "u");
    le = u("\u25C6", "*");
    L2 = u("\u25A0", "x");
    W2 = u("\u25B2", "x");
    C = u("\u25C7", "o");
    u("\u250C", "T");
    o = u("\u2502", "|");
    d2 = u("\u2514", "\u2014");
    k2 = u("\u25CF", ">");
    P2 = u("\u25CB", " ");
    u("\u25FB", "[\u2022]");
    u("\u25FC", "[+]");
    u("\u25FB", "[ ]");
    u("\u25AA", "\u2022");
    u("\u2500", "-");
    u("\u256E", "+");
    u("\u251C", "+");
    u("\u256F", "+");
    u("\u25CF", "\u2022");
    u("\u25C6", "*");
    u("\u25B2", "!");
    u("\u25A0", "x");
    b2 = /* @__PURE__ */ __name((t) => {
      switch (t) {
        case "initial":
        case "active":
          return import_picocolors.default.cyan(le);
        case "cancel":
          return import_picocolors.default.red(L2);
        case "error":
          return import_picocolors.default.yellow(W2);
        case "submit":
          return import_picocolors.default.green(C);
      }
    }, "b");
    G2 = /* @__PURE__ */ __name((t) => {
      const { cursor: n2, options: r2, style: i2 } = t, s = t.maxItems ?? Number.POSITIVE_INFINITY, c3 = Math.max(process.stdout.rows - 4, 0), a3 = Math.min(c3, Math.max(s, 5));
      let l2 = 0;
      n2 >= l2 + a3 - 3 ? l2 = Math.max(Math.min(n2 - a3 + 3, r2.length - a3), 0) : n2 < l2 + 2 && (l2 = Math.max(n2 - 2, 0));
      const $3 = a3 < r2.length && l2 > 0, g2 = a3 < r2.length && l2 + a3 < r2.length;
      return r2.slice(l2, l2 + a3).map((p2, v, f) => {
        const j2 = v === 0 && $3, E = v === f.length - 1 && g2;
        return j2 || E ? import_picocolors.default.dim("...") : i2(p2, v + l2 === n2);
      });
    }, "G");
    ve = /* @__PURE__ */ __name((t) => {
      const n2 = /* @__PURE__ */ __name((r2, i2) => {
        const s = r2.label ?? String(r2.value);
        switch (i2) {
          case "selected":
            return `${import_picocolors.default.dim(s)}`;
          case "active":
            return `${import_picocolors.default.green(k2)} ${s} ${r2.hint ? import_picocolors.default.dim(`(${r2.hint})`) : ""}`;
          case "cancelled":
            return `${import_picocolors.default.strikethrough(import_picocolors.default.dim(s))}`;
          default:
            return `${import_picocolors.default.dim(P2)} ${import_picocolors.default.dim(s)}`;
        }
      }, "n");
      return new LD({ options: t.options, initialValue: t.initialValue, render() {
        const r2 = `${import_picocolors.default.gray(o)}
${b2(this.state)}  ${t.message}
`;
        switch (this.state) {
          case "submit":
            return `${r2}${import_picocolors.default.gray(o)}  ${n2(this.options[this.cursor], "selected")}`;
          case "cancel":
            return `${r2}${import_picocolors.default.gray(o)}  ${n2(this.options[this.cursor], "cancelled")}
${import_picocolors.default.gray(o)}`;
          default:
            return `${r2}${import_picocolors.default.cyan(o)}  ${G2({ cursor: this.cursor, options: this.options, maxItems: t.maxItems, style: /* @__PURE__ */ __name((i2, s) => n2(i2, s ? "active" : "inactive"), "style") }).join(`
${import_picocolors.default.cyan(o)}  `)}
${import_picocolors.default.cyan(d2)}
`;
        }
      } }).prompt();
    }, "ve");
    `${import_picocolors.default.gray(o)}  `;
  }
});

// src/lib/load-graph.ts
async function loadVarlockEnvGraph(opts) {
  const envGraph = await loadEnvGraph({
    ...opts,
    afterInit: /* @__PURE__ */ __name(async (_g) => {
    }, "afterInit")
  });
  return envGraph;
}
var init_load_graph = __esm({
  "src/lib/load-graph.ts"() {
    init_env_graph2();
    __name(loadVarlockEnvGraph, "loadVarlockEnvGraph");
  }
});
function isUnicodeSupported() {
  const { env } = y2__default.default;
  const { TERM, TERM_PROGRAM } = env;
  if (y2__default.default.platform !== "win32") {
    return TERM !== "linux";
  }
  return Boolean(env.WT_SESSION) || Boolean(env.TERMINUS_SUBLIME) || env.ConEmuTask === "{cmd::Cmder}" || TERM_PROGRAM === "Terminus-Sublime" || TERM_PROGRAM === "vscode" || TERM === "xterm-256color" || TERM === "alacritty" || TERM === "rxvt-unicode" || TERM === "rxvt-unicode-256color" || env.TERMINAL_EMULATOR === "JetBrains-JediTerm";
}
var init_is_unicode_supported = __esm({
  "../../node_modules/.pnpm/is-unicode-supported@2.1.0/node_modules/is-unicode-supported/index.js"() {
    __name(isUnicodeSupported, "isUnicodeSupported");
  }
});
var unicode, unicodeOr, S_STEP_ACTIVE, S_STEP_CANCEL, S_STEP_ERROR, S_STEP_SUBMIT, S_BAR, S_BAR_END, S_RADIO_ACTIVE, S_RADIO_INACTIVE, S_CHECKBOX_ACTIVE, S_CHECKBOX_SELECTED, S_CHECKBOX_INACTIVE, symbol, limitOptions, confirm, select, multiselect, prompts, prompts_default;
var init_prompts = __esm({
  "src/cli/helpers/prompts.ts"() {
    init_dist2();
    init_ansis();
    init_is_unicode_supported();
    unicode = isUnicodeSupported();
    unicodeOr = /* @__PURE__ */ __name((c3, fallback) => unicode ? c3 : fallback, "unicodeOr");
    S_STEP_ACTIVE = unicodeOr("\u25C6", "*");
    S_STEP_CANCEL = unicodeOr("\u25A0", "x");
    S_STEP_ERROR = unicodeOr("\u25B2", "x");
    S_STEP_SUBMIT = unicodeOr("\u25C7", "o");
    unicodeOr("\u250C", "T");
    S_BAR = unicodeOr("\u2502", "|");
    S_BAR_END = unicodeOr("\u2514", "\u2014");
    S_RADIO_ACTIVE = unicodeOr("\u25CF", ">");
    S_RADIO_INACTIVE = unicodeOr("\u25CB", " ");
    S_CHECKBOX_ACTIVE = unicodeOr("\u25FB", "[\u2022]");
    S_CHECKBOX_SELECTED = unicodeOr("\u25FC", "[+]");
    S_CHECKBOX_INACTIVE = unicodeOr("\u25FB", "[ ]");
    unicodeOr("\u25AA", "\u2022");
    unicodeOr("\u2500", "-");
    unicodeOr("\u256E", "+");
    unicodeOr("\u251C", "+");
    unicodeOr("\u256F", "+");
    unicodeOr("\u25CF", "\u2022");
    unicodeOr("\u25C6", "*");
    unicodeOr("\u25B2", "!");
    unicodeOr("\u25A0", "x");
    symbol = /* @__PURE__ */ __name((state) => {
      switch (state) {
        case "initial":
        case "active":
          return ansis_default.cyan(S_STEP_ACTIVE);
        case "cancel":
          return ansis_default.red(S_STEP_CANCEL);
        case "error":
          return ansis_default.yellow(S_STEP_ERROR);
        case "submit":
          return ansis_default.green(S_STEP_SUBMIT);
      }
    }, "symbol");
    limitOptions = /* @__PURE__ */ __name((params) => {
      const { cursor, options, style } = params;
      const output = params.output ?? process.stdout;
      const rows = output instanceof tty.WriteStream && output.rows !== void 0 ? output.rows : 10;
      const paramMaxItems = params.maxItems ?? Number.POSITIVE_INFINITY;
      const outputMaxItems = Math.max(rows - 4, 0);
      const maxItems = Math.min(outputMaxItems, Math.max(paramMaxItems, 5));
      let slidingWindowLocation = 0;
      if (cursor >= slidingWindowLocation + maxItems - 3) {
        slidingWindowLocation = Math.max(Math.min(cursor - maxItems + 3, options.length - maxItems), 0);
      } else if (cursor < slidingWindowLocation + 2) {
        slidingWindowLocation = Math.max(cursor - 2, 0);
      }
      const shouldRenderTopEllipsis = maxItems < options.length && slidingWindowLocation > 0;
      const shouldRenderBottomEllipsis = maxItems < options.length && slidingWindowLocation + maxItems < options.length;
      return options.slice(slidingWindowLocation, slidingWindowLocation + maxItems).map((option, i2, arr) => {
        const isTopLimit = i2 === 0 && shouldRenderTopEllipsis;
        const isBottomLimit = i2 === arr.length - 1 && shouldRenderBottomEllipsis;
        return isTopLimit || isBottomLimit ? ansis_default.dim("...") : style(option, i2 + slidingWindowLocation === cursor);
      });
    }, "limitOptions");
    confirm = /* @__PURE__ */ __name((opts) => {
      const active = opts.active ?? "Yes";
      const inactive = opts.inactive ?? "No";
      return new dD({
        active,
        inactive,
        input: opts.input,
        output: opts.output,
        initialValue: opts.initialValue ?? true,
        render() {
          const title = `
${symbol(this.state)} ${opts.message}
`;
          const value = this.value ? active : inactive;
          switch (this.state) {
            case "submit":
              return `${title}\u200E ${ansis_default.dim(value)}`;
            case "cancel":
              return `${title}\u200E ${ansis_default.strikethrough(
                ansis_default.dim(value)
              )}
`;
            default: {
              return `${title}\u200E ${this.value ? `${ansis_default.green(S_RADIO_ACTIVE)} ${active}` : `${ansis_default.dim(S_RADIO_INACTIVE)} ${ansis_default.dim(active)}`} ${ansis_default.dim("/")} ${!this.value ? `${ansis_default.green(S_RADIO_ACTIVE)} ${inactive}` : `${ansis_default.dim(S_RADIO_INACTIVE)} ${ansis_default.dim(inactive)}`}
`;
            }
          }
        }
      }).prompt();
    }, "confirm");
    select = /* @__PURE__ */ __name((opts) => {
      const opt = /* @__PURE__ */ __name((option, state) => {
        const label = option.label ?? String(option.value);
        switch (state) {
          case "selected":
            return `${ansis_default.dim(label)}`;
          case "active":
            return `${ansis_default.green(S_RADIO_ACTIVE)} ${label} ${option.hint ? ansis_default.dim(`(${option.hint})`) : ""}`;
          case "cancelled":
            return `${ansis_default.strikethrough(ansis_default.dim(label))}`;
          default:
            return `${ansis_default.dim(S_RADIO_INACTIVE)} ${ansis_default.dim(label)}`;
        }
      }, "opt");
      return new LD({
        options: opts.options,
        input: opts.input,
        output: opts.output,
        initialValue: opts.initialValue,
        render() {
          const title = `${ansis_default.gray(S_BAR)}
${symbol(this.state)}  ${opts.message}
`;
          switch (this.state) {
            case "submit":
              return `${title}${ansis_default.gray(S_BAR)}  ${opt(this.options[this.cursor], "selected")}`;
            case "cancel":
              return `${title}${ansis_default.gray(S_BAR)}  ${opt(
                this.options[this.cursor],
                "cancelled"
              )}
${ansis_default.gray(S_BAR)}`;
            default: {
              return `${title}${ansis_default.cyan(S_BAR)}  ${limitOptions({
                output: opts.output,
                cursor: this.cursor,
                options: this.options,
                maxItems: opts.maxItems,
                style: /* @__PURE__ */ __name((item, active) => opt(item, active ? "active" : "inactive"), "style")
              }).join(`
${ansis_default.cyan(S_BAR)}  `)}
${ansis_default.cyan(S_BAR_END)}
`;
            }
          }
        }
      }).prompt();
    }, "select");
    multiselect = /* @__PURE__ */ __name((opts) => {
      const opt = /* @__PURE__ */ __name((option, state) => {
        const label = option.label ?? String(option.value);
        if (state === "active") {
          return `${ansis_default.cyan(S_CHECKBOX_ACTIVE)} ${label} ${option.hint ? ansis_default.dim(`(${option.hint})`) : ""}`;
        }
        if (state === "selected") {
          return `${ansis_default.green(S_CHECKBOX_SELECTED)} ${ansis_default.dim(label)} ${option.hint ? ansis_default.dim(`(${option.hint})`) : ""}`;
        }
        if (state === "cancelled") {
          return `${ansis_default.strikethrough(ansis_default.dim(label))}`;
        }
        if (state === "active-selected") {
          return `${ansis_default.green(S_CHECKBOX_SELECTED)} ${label} ${option.hint ? ansis_default.dim(`(${option.hint})`) : ""}`;
        }
        if (state === "submitted") {
          return `${ansis_default.dim(label)}`;
        }
        return `${ansis_default.dim(S_CHECKBOX_INACTIVE)} ${ansis_default.dim(label)}`;
      }, "opt");
      return new SD({
        options: opts.options,
        input: opts.input,
        output: opts.output,
        initialValues: opts.initialValues,
        required: opts.required ?? true,
        cursorAt: opts.cursorAt,
        validate(selected) {
          if (this.required && selected.length === 0) {
            return `Please select at least one option.
${ansis_default.reset(
              ansis_default.dim(
                `Press ${ansis_default.gray(ansis_default.bgWhite(ansis_default.inverse(" space ")))} to select, ${ansis_default.gray(
                  ansis_default.bgWhite(ansis_default.inverse(" enter "))
                )} to submit`
              )
            )}`;
          }
        },
        render() {
          let title = `${ansis_default.gray(S_BAR)}
${symbol(this.state)}  ${opts.message}
`;
          if (opts.details) title += `${ansis_default.gray(S_BAR)} ${opts.details}
`;
          const styleOption = /* @__PURE__ */ __name((option, active) => {
            const selected = this.value.includes(option.value);
            if (active && selected) {
              return opt(option, "active-selected");
            }
            if (selected) {
              return opt(option, "selected");
            }
            return opt(option, active ? "active" : "inactive");
          }, "styleOption");
          switch (this.state) {
            case "submit": {
              return `${title}${ansis_default.gray(S_BAR)}  ${this.options.filter(({ value }) => this.value.includes(value)).map((option) => opt(option, "submitted")).join(ansis_default.dim(", ")) || ansis_default.dim("none")}`;
            }
            case "cancel": {
              const label = this.options.filter(({ value }) => this.value.includes(value)).map((option) => opt(option, "cancelled")).join(ansis_default.dim(", "));
              return `${title}${ansis_default.gray(S_BAR)}  ${label.trim() ? `${label}
${ansis_default.gray(S_BAR)}` : ""}`;
            }
            case "error": {
              const footer = this.error.split("\n").map((ln, i2) => i2 === 0 ? `${ansis_default.yellow(S_BAR_END)}  ${ansis_default.yellow(ln)}` : `   ${ln}`).join("\n");
              return `${title + ansis_default.yellow(S_BAR)}  ${limitOptions({
                output: opts.output,
                options: this.options,
                cursor: this.cursor,
                maxItems: opts.maxItems,
                style: styleOption
              }).join(`
${ansis_default.yellow(S_BAR)}  `)}
${footer}
`;
            }
            default: {
              return `${title}${ansis_default.cyan(S_BAR)}  ${limitOptions({
                output: opts.output,
                options: this.options,
                cursor: this.cursor,
                maxItems: opts.maxItems,
                style: styleOption
              }).join(`
${ansis_default.cyan(S_BAR)}  `)}
${ansis_default.cyan(S_BAR_END)}
`;
            }
          }
        }
      }).prompt();
    }, "multiselect");
    prompts = {
      confirm,
      select,
      multiselect
    };
    prompts_default = prompts;
  }
});
function isValidUrl(val) {
  try {
    const u3 = new URL(val);
    return true;
  } catch (err) {
    return false;
  }
}
function inferItemDecorators(file, itemKey, valueStr) {
  let itemIsPublic = false;
  if (PUBLIC_PREFIXES.some((prefix) => itemKey.startsWith(prefix))) itemIsPublic = true;
  if (PUBLIC_KEYWORDS.some((keyword) => itemKey.includes(keyword))) itemIsPublic = true;
  let itemIsSensitive = false;
  if (SENSITIVE_KEYWORDS.some((keyword) => itemKey.includes(keyword))) itemIsSensitive = true;
  if (itemIsPublic) ; else if (itemIsSensitive) {
    envSpecUpdater.setItemDecorator(file, itemKey, "sensitive", "true");
  }
  if (itemKey === "PORT" || itemKey.endsWith("_PORT")) {
    envSpecUpdater.setItemDecorator(file, itemKey, "type", "port");
  } else if (itemKey.endsWith("_EMAIL")) {
    envSpecUpdater.setItemDecorator(file, itemKey, "type", "email");
  } else if (itemKey.endsWith("_URL") || itemKey.endsWith("_URI")) {
    envSpecUpdater.setItemDecorator(file, itemKey, "type", "url");
  } else if (valueStr) {
    if (valueStr.startsWith("<") && valueStr.endsWith(">")) {
      envSpecUpdater.setItemDecorator(file, itemKey, "example", valueStr);
    }
    if (valueStr === "true" || valueStr === "false") {
      envSpecUpdater.setItemDecorator(file, itemKey, "type", "boolean");
    } else if (EMAIL_REGEX2.test(valueStr)) {
      envSpecUpdater.setItemDecorator(file, itemKey, "type", "email");
    } else if (valueStr !== "0" && valueStr !== "1" && VALID_NUMBER_REGEX2.test(valueStr)) {
      envSpecUpdater.setItemDecorator(file, itemKey, "type", "number");
    } else if (isValidUrl(valueStr)) {
      envSpecUpdater.setItemDecorator(file, itemKey, "type", "url");
    }
  }
}
function inferSchemaUpdates(file) {
  for (const item of file.configItems) {
    const valueStr = item.value instanceof ParsedEnvSpecStaticValue && item.value.value?.toString() || "";
    inferItemDecorators(file, item.key, valueStr);
  }
}
function ensureAllItemsExist(envGraph, schemaFile) {
  const addedItemKeys = [];
  for (const itemKey in envGraph.configSchema) {
    const item = envGraph.configSchema[itemKey];
    const itemInSchema = schemaFile.configItems.find((i2) => i2.key === itemKey);
    if (!itemInSchema) {
      if (addedItemKeys.length === 0) {
        envSpecUpdater.injectFromStr(schemaFile, [
          "",
          "# items added to schema by `varlock init`",
          "# that were missing in example, but detected in other env files",
          "# PLEASE REVIEW THESE!",
          "# ---",
          ""
        ].join("\n"), { location: "end" });
      }
      addedItemKeys.push(itemKey);
      envSpecUpdater.injectFromStr(schemaFile, [`${itemKey}=`].join("\n"));
      const itemValue = item.valueResolver instanceof StaticValueResolver && item.valueResolver.staticValue || "";
      inferItemDecorators(schemaFile, itemKey, String(itemValue));
    }
  }
}
async function detectRedundantValues(envGraph, opts = {}) {
  const schema = envGraph.schemaDataSource;
  if (!schema) return {};
  const redundantItemsBySourcePath = {};
  const schemaValues = schema.getStaticValues();
  for (const source of envGraph.dataSources) {
    if (source === schema) continue;
    if (source.type === "example") continue;
    if (!(source instanceof DotEnvFileDataSource) || !source.parsedFile) continue;
    const sourceValues = source.getStaticValues();
    for (const [key, value] of Object.entries(sourceValues)) {
      if (schemaValues[key] !== value) continue;
      redundantItemsBySourcePath[source.fullPath] ||= [];
      redundantItemsBySourcePath[source.fullPath].push(key);
      if (opts.delete) {
        envSpecUpdater.deleteItem(source.parsedFile, key);
      }
    }
    if (opts.delete) {
      await fs9__default.default.writeFile(source.fullPath, source.parsedFile.toString(), "utf8");
    }
  }
  return redundantItemsBySourcePath;
}
var PUBLIC_PREFIXES, PUBLIC_KEYWORDS, SENSITIVE_KEYWORDS, EMAIL_REGEX2, VALID_NUMBER_REGEX2;
var init_infer_schema = __esm({
  "src/cli/helpers/infer-schema.ts"() {
    init_env_graph2();
    init_dist();
    PUBLIC_PREFIXES = [
      "PUBLIC",
      "VITE",
      "NEXT_PUBLIC",
      "NUXT_PUBLIC"
    ];
    PUBLIC_KEYWORDS = ["PUBLIC"];
    SENSITIVE_KEYWORDS = [
      "SECRET",
      "API_KEY",
      "PASSWORD",
      "TOKEN",
      "PRIVATE",
      "CREDENTIALS"
    ];
    __name(isValidUrl, "isValidUrl");
    EMAIL_REGEX2 = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    VALID_NUMBER_REGEX2 = /^(0|([1-9][0-9]*))?(\.[0-9]+)?$/;
    __name(inferItemDecorators, "inferItemDecorators");
    __name(inferSchemaUpdates, "inferSchemaUpdates");
    __name(ensureAllItemsExist, "ensureAllItemsExist");
    __name(detectRedundantValues, "detectRedundantValues");
  }
});

// src/cli/helpers/gunshi-type-utils.ts
var init_gunshi_type_utils = __esm({
  "src/cli/helpers/gunshi-type-utils.ts"() {
  }
});

// src/cli/commands/init.command.ts
var init_command_exports = {};
__export(init_command_exports, {
  commandFn: () => commandFn,
  commandSpec: () => commandSpec
});
var commandSpec, commandFn;
var init_init_command = __esm({
  "src/cli/commands/init.command.ts"() {
    init_ansis();
    init_dist3();
    init_lib2();
    init_my_dash();
    init_env_graph2();
    init_dist();
    init_git_utils();
    init_fs_utils();
    init_load_graph();
    init_prompts();
    init_pretty_format();
    init_infer_schema();
    init_js_package_manager_utils();
    init_gunshi_type_utils();
    init_exit_hook();
    commandSpec = define({
      name: "init",
      description: "Set up varlock in the current project",
      args: {}
    });
    commandFn = /* @__PURE__ */ __name(async (ctx) => {
      const jsPackageManager = detectJsPackageManager();
      console.log("\u{1F9D9} Hello and welcome to Varlock \u{1F512}\u{1F525}\u2728");
      let envGraph = await loadVarlockEnvGraph();
      const existingSchemaFile = envGraph.dataSources.find((dataSource) => {
        return dataSource.type === "schema";
      });
      if (existingSchemaFile) {
        logLines([
          `It looks like you already have a ${fmt.fileName(".env.schema")} file \u{1F389}`,
          "This init helper is meant to help you get a new project set up.",
          "If you need to make changes to your schema or values, you can update your files directly.",
          "See more docs at https://varlock.dev/guides/schema"
        ]);
      } else {
        let exampleFileToConvert = null;
        const allExampleFiles = envGraph.dataSources.filter((dataSource) => {
          return dataSource instanceof DotEnvFileDataSource && dataSource.type === "example";
        });
        if (allExampleFiles.length === 1) {
          exampleFileToConvert = allExampleFiles[0];
        } else if (allExampleFiles.length > 1) {
          console.log("");
          const selectedExample = await ve({
            message: `We detected more than one example .env file. Which one should we use to create your new ${fmt.fileName(".env.schema")}?`,
            options: allExampleFiles.map((file) => ({
              label: file.fileName,
              value: file
            }))
          });
          if (pD(selectedExample)) return gracefulExit(0);
          exampleFileToConvert = selectedExample;
        }
        const parsedEnvFile = exampleFileToConvert?.parsedFile || parseEnvSpecDotEnvFile("");
        if (!parsedEnvFile) throw new Error("No parsed .env file found");
        envSpecUpdater.ensureHeader(parsedEnvFile, [
          "This env file uses @env-spec - see https://varlock.dev/env-spec for more info",
          ""
          // TODO: add env spec version? real links?
        ].join("\n"));
        envSpecUpdater.setRootDecorator(parsedEnvFile, "defaultRequired", "false", { explicitTrue: true });
        envSpecUpdater.setRootDecorator(parsedEnvFile, "defaultSensitive", "false", { explicitTrue: true });
        envSpecUpdater.setRootDecorator(parsedEnvFile, "generateTypes", "lang=ts, path=env.d.ts", { bareFnArgs: true });
        envSpecUpdater.injectFromStr(parsedEnvFile, [
          "",
          "# example env variable injected by `varlock init` \u26A0\uFE0F DELETE THIS ITEM! \u26A0\uFE0F",
          '# @required @sensitive @example="example value"',
          'EXAMPLE_ITEM="delete me!"',
          ""
        ].join("\n"), { location: "after_header" });
        inferSchemaUpdates(parsedEnvFile);
        ensureAllItemsExist(envGraph, parsedEnvFile);
        const schemaFilePath = path8__default.default.join(process.cwd(), ".env.schema");
        await fs9__default.default.writeFile(schemaFilePath, parsedEnvFile.toString());
        if (exampleFileToConvert) {
          logLines([
            "",
            `Your ${fmt.fileName(exampleFileToConvert.fileName)} has been used to generate your new ${fmt.fileName(".env.schema")}:`,
            fmt.filePath(schemaFilePath)
          ]);
        } else {
          logLines([
            "",
            `Your new ${fmt.fileName(".env.schema")} file has been created:`,
            fmt.filePath(schemaFilePath)
          ]);
        }
        if (await checkIsFileGitIgnored(schemaFilePath)) {
          logLines([ansis_default.dim(`(and updated ${fmt.fileName(".gitignore")} to ensure it will be tracked by git)`)]);
          await fs9__default.default.appendFile(".gitignore", "\n!.env.schema");
        }
        logLines([
          "",
          ansis_default.bold(`\u{1F6A7} Please review and update your new ${fmt.fileName(".env.schema")} file! \u{1F6A7}`),
          `We've done our best to get you started, but you must review and make sure it is correct!`,
          "",
          `\u{1F449} Some helpful pointers to get you started:`,
          `- add a description to each item when the name is not self explanitory - it will come through in generated types`,
          `- use ${fmt.decorator("@required")} (or ${fmt.decorator("@optional")}) to tag items that should fail validation when empty`,
          `- use ${fmt.decorator("@sensitive")} to tag items that contain sensitive secrets, and must be handled accordingly`,
          `- use ${fmt.decorator("@type")} to set an item's data type (if not a basic string), which affects validation and coercion logic`,
          `- if an item value is a ${ansis_default.italic("useful example")} rather than a default, use ${fmt.decorator("@example")}`,
          `- if an item value is just a dummy placeholder, delete it`
        ]);
        const confirmReviewed = await prompts_default.confirm({
          message: `Have you reviewed and updated your new ${fmt.fileName(".env.schema")} file?`
        });
        if (pD(confirmReviewed)) return gracefulExit(0);
        envGraph = await loadVarlockEnvGraph();
        if (envGraph.configSchema.EXAMPLE_ITEM) {
          logLines([
            "",
            ansis_default.bold(`\u{1F6A8} Really? ${ansis_default.red("You didn't remove the EXAMPLE_ITEM!")}`),
            `Please make sure your schema is all correct before using it...`
          ]);
        }
        if (exampleFileToConvert) {
          const confirmDeleteExample = await prompts_default.confirm({
            message: `Should we delete your ${fmt.fileName(exampleFileToConvert.fileName)} file? ${ansis_default.italic.gray("(you can always do this yourself later)")}`
          });
          if (pD(confirmDeleteExample)) return gracefulExit(0);
          if (confirmDeleteExample) {
            await fs9__default.default.unlink(exampleFileToConvert.fullPath);
          }
        }
        const defaultsFile = envGraph.dataSources.find((dataSource) => {
          return dataSource instanceof DotEnvFileDataSource && dataSource.type === "defaults";
        });
        if (defaultsFile) {
          logLines([
            "",
            `\u{1F6A7} We detected a ${fmt.fileName(defaultsFile.fileName)} file in your project`,
            `You should migrate these default values into ${fmt.fileName(".env.schema")} and delete ${fmt.fileName(defaultsFile.fileName)}`
          ]);
        }
        const redundantInfo = await detectRedundantValues(envGraph);
        if (Object.keys(redundantInfo).length > 0) {
          logLines([
            "",
            ansis_default.bold("\u203C\uFE0F  Now that your schema contains defaults, some values in your other .env files are redundant:")
          ]);
          for (const [sourcePath, itemKeys] of Object.entries(redundantInfo)) {
            console.log(fmt.filePath(sourcePath));
            console.log("  ", itemKeys.map((k3) => ansis_default.italic(k3)).join(", "));
          }
          const confirmDeleteRedundant = await prompts_default.confirm({
            message: "Should we delete these redundant values from your other .env files?"
          });
          if (pD(confirmDeleteRedundant)) return gracefulExit(0);
          if (confirmDeleteRedundant) {
            await detectRedundantValues(envGraph, { delete: true });
          }
        }
        logLines([
          "",
          ansis_default.bold("\u{1F389} Great!"),
          `You can run ${fmt.command("varlock load", { jsPackageManager })} to attempt loading your env vars validate against your new schema.`,
          "",
          "Check out our docs for more info about integrating into your application.",
          "",
          "\u{1F4D6} https://varlock.dev \u{1F448}",
          ""
        ]);
      }
      if (jsPackageManager && await pathExists(path8__default.default.join(process.cwd(), "package.json"))) {
        const installResult = installJsDependency({
          packageManager: jsPackageManager.name,
          packageName: "varlock"
        });
        if (installResult) {
          logLines([
            "",
            `\u2705 Added ${fmt.packageName("varlock")} as a dependency in your package.json`
          ]);
        }
      }
    }, "commandFn");
  }
});

// src/cli/commands/load.command.ts
var load_command_exports = {};
__export(load_command_exports, {
  commandFn: () => commandFn2,
  commandSpec: () => commandSpec2
});
var commandSpec2, commandFn2;
var init_load_command = __esm({
  "src/cli/commands/load.command.ts"() {
    init_lib2();
    init_my_dash();
    init_load_graph();
    init_formatting();
    init_error_checks();
    init_gunshi_type_utils();
    commandSpec2 = define({
      name: "load",
      description: "Load env according to schema and resolve values",
      args: {
        format: {
          type: "enum",
          short: "f",
          choices: ["pretty", "json", "env", "json-full"],
          description: "Format of output",
          default: "pretty"
        },
        "show-all": {
          type: "boolean",
          description: "When load is failing, show all items rather than only failing items"
        },
        env: {
          type: "string",
          description: "Set the environment (e.g., production, development, etc) - will be overridden by @envFlag in the schema if present"
        },
        "respect-existing-env": {
          type: "boolean",
          description: "Allow process.env to override schema-defined keys"
        },
        "exclude-local": {
          type: "boolean",
          description: "Exclude .env.local and .env.[env].local from loading"
        }
      }
    });
    commandFn2 = /* @__PURE__ */ __name(async (ctx) => {
      const { format: format2, "show-all": showAll } = ctx.values;
      const envGraph = await loadVarlockEnvGraph({
        currentEnvFallback: ctx.values.env,
        respectExistingEnv: Boolean(ctx.values["respect-existing-env"]),
        excludeLocal: ctx.values["exclude-local"] === true ? true : void 0
      });
      checkForSchemaErrors(envGraph);
      if (envGraph.schemaDataSource?.decorators.generateTypes) {
        const typeGenSettings = envGraph.schemaDataSource?.decorators.generateTypes.bareFnArgs?.simplifiedValues;
        if (!my_dash_default.isPlainObject(typeGenSettings)) {
          throw new Error("@generateTypes - must be a fn call with key/value args");
        }
        if (!typeGenSettings.lang) throw new Error("@generateTypes - must set `lang` arg");
        if (typeGenSettings.lang !== "ts") throw new Error(`@generateTypes - unsupported language: ${typeGenSettings.lang}`);
        if (!typeGenSettings.path) throw new Error("@generateTypes - must set `path` arg");
        if (!my_dash_default.isString(typeGenSettings.path)) throw new Error("@generateTypes - `path` arg must be a string");
        await envGraph.generateTypes(typeGenSettings.lang, typeGenSettings.path);
      }
      await envGraph.resolveEnvValues();
      checkForConfigErrors(envGraph, { showAll });
      if (format2 === "pretty") {
        for (const itemKey in envGraph.configSchema) {
          const item = envGraph.configSchema[itemKey];
          console.log(getItemSummary(item));
        }
      } else if (format2 === "json") {
        console.log(JSON.stringify(envGraph.getResolvedEnvObject(), null, 2));
      } else if (format2 === "json-full") {
        console.log(JSON.stringify(envGraph.getSerializedGraph(), null, 2));
      } else if (format2 === "env") {
        const resolvedEnv = envGraph.getResolvedEnvObject();
        for (const key in resolvedEnv) {
          const value = resolvedEnv[key];
          let strValue;
          if (value === void 0) {
            strValue = "";
          } else if (typeof value === "string") {
            strValue = `"${value.replaceAll('"', '\\"').replaceAll("\n", "\\n")}"`;
          } else {
            strValue = JSON.stringify(value);
          }
          console.log(`${key}=${strValue}`);
        }
      } else {
        throw new Error(`Unknown format: ${format2}`);
      }
    }, "commandFn");
  }
});

// ../../node_modules/.pnpm/is-plain-obj@4.1.0/node_modules/is-plain-obj/index.js
function isPlainObject2(value) {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in value) && !(Symbol.iterator in value);
}
var init_is_plain_obj = __esm({
  "../../node_modules/.pnpm/is-plain-obj@4.1.0/node_modules/is-plain-obj/index.js"() {
    __name(isPlainObject2, "isPlainObject");
  }
});
var safeNormalizeFileUrl, normalizeDenoExecPath, isDenoExecPath, normalizeFileUrl;
var init_file_url = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/arguments/file-url.js"() {
    safeNormalizeFileUrl = /* @__PURE__ */ __name((file, name) => {
      const fileString = normalizeFileUrl(normalizeDenoExecPath(file));
      if (typeof fileString !== "string") {
        throw new TypeError(`${name} must be a string or a file URL: ${fileString}.`);
      }
      return fileString;
    }, "safeNormalizeFileUrl");
    normalizeDenoExecPath = /* @__PURE__ */ __name((file) => isDenoExecPath(file) ? file.toString() : file, "normalizeDenoExecPath");
    isDenoExecPath = /* @__PURE__ */ __name((file) => typeof file !== "string" && file && Object.getPrototypeOf(file) === String.prototype, "isDenoExecPath");
    normalizeFileUrl = /* @__PURE__ */ __name((file) => file instanceof URL ? url.fileURLToPath(file) : file, "normalizeFileUrl");
  }
});

// ../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/methods/parameters.js
var normalizeParameters;
var init_parameters = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/methods/parameters.js"() {
    init_is_plain_obj();
    init_file_url();
    normalizeParameters = /* @__PURE__ */ __name((rawFile, rawArguments = [], rawOptions = {}) => {
      const filePath = safeNormalizeFileUrl(rawFile, "First argument");
      const [commandArguments, options] = isPlainObject2(rawArguments) ? [[], rawArguments] : [rawArguments, rawOptions];
      if (!Array.isArray(commandArguments)) {
        throw new TypeError(`Second argument must be either an array of arguments or an options object: ${commandArguments}`);
      }
      if (commandArguments.some((commandArgument) => typeof commandArgument === "object" && commandArgument !== null)) {
        throw new TypeError(`Second argument must be an array of strings: ${commandArguments}`);
      }
      const normalizedArguments = commandArguments.map(String);
      const nullByteArgument = normalizedArguments.find((normalizedArgument) => normalizedArgument.includes("\0"));
      if (nullByteArgument !== void 0) {
        throw new TypeError(`Arguments cannot contain null bytes ("\\0"): ${nullByteArgument}`);
      }
      if (!isPlainObject2(options)) {
        throw new TypeError(`Last argument must be an options object: ${options}`);
      }
      return [filePath, normalizedArguments, options];
    }, "normalizeParameters");
  }
});
var objectToString, isArrayBuffer2, isUint8Array2, bufferToUint8Array, textEncoder, stringToUint8Array, textDecoder, uint8ArrayToString, joinToString, uint8ArraysToStrings, joinToUint8Array, stringsToUint8Arrays, concatUint8Arrays, getJoinLength;
var init_uint_array = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/utils/uint-array.js"() {
    ({ toString: objectToString } = Object.prototype);
    isArrayBuffer2 = /* @__PURE__ */ __name((value) => objectToString.call(value) === "[object ArrayBuffer]", "isArrayBuffer");
    isUint8Array2 = /* @__PURE__ */ __name((value) => objectToString.call(value) === "[object Uint8Array]", "isUint8Array");
    bufferToUint8Array = /* @__PURE__ */ __name((buffer) => new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength), "bufferToUint8Array");
    textEncoder = new TextEncoder();
    stringToUint8Array = /* @__PURE__ */ __name((string) => textEncoder.encode(string), "stringToUint8Array");
    textDecoder = new TextDecoder();
    uint8ArrayToString = /* @__PURE__ */ __name((uint8Array) => textDecoder.decode(uint8Array), "uint8ArrayToString");
    joinToString = /* @__PURE__ */ __name((uint8ArraysOrStrings, encoding) => {
      const strings = uint8ArraysToStrings(uint8ArraysOrStrings, encoding);
      return strings.join("");
    }, "joinToString");
    uint8ArraysToStrings = /* @__PURE__ */ __name((uint8ArraysOrStrings, encoding) => {
      if (encoding === "utf8" && uint8ArraysOrStrings.every((uint8ArrayOrString) => typeof uint8ArrayOrString === "string")) {
        return uint8ArraysOrStrings;
      }
      const decoder = new string_decoder.StringDecoder(encoding);
      const strings = uint8ArraysOrStrings.map((uint8ArrayOrString) => typeof uint8ArrayOrString === "string" ? stringToUint8Array(uint8ArrayOrString) : uint8ArrayOrString).map((uint8Array) => decoder.write(uint8Array));
      const finalString = decoder.end();
      return finalString === "" ? strings : [...strings, finalString];
    }, "uint8ArraysToStrings");
    joinToUint8Array = /* @__PURE__ */ __name((uint8ArraysOrStrings) => {
      if (uint8ArraysOrStrings.length === 1 && isUint8Array2(uint8ArraysOrStrings[0])) {
        return uint8ArraysOrStrings[0];
      }
      return concatUint8Arrays(stringsToUint8Arrays(uint8ArraysOrStrings));
    }, "joinToUint8Array");
    stringsToUint8Arrays = /* @__PURE__ */ __name((uint8ArraysOrStrings) => uint8ArraysOrStrings.map((uint8ArrayOrString) => typeof uint8ArrayOrString === "string" ? stringToUint8Array(uint8ArrayOrString) : uint8ArrayOrString), "stringsToUint8Arrays");
    concatUint8Arrays = /* @__PURE__ */ __name((uint8Arrays) => {
      const result = new Uint8Array(getJoinLength(uint8Arrays));
      let index = 0;
      for (const uint8Array of uint8Arrays) {
        result.set(uint8Array, index);
        index += uint8Array.length;
      }
      return result;
    }, "concatUint8Arrays");
    getJoinLength = /* @__PURE__ */ __name((uint8Arrays) => {
      let joinLength = 0;
      for (const uint8Array of uint8Arrays) {
        joinLength += uint8Array.length;
      }
      return joinLength;
    }, "getJoinLength");
  }
});
var isTemplateString, parseTemplates, parseTemplate, splitByWhitespaces, DELIMITERS, ESCAPE_LENGTH, concatTokens, parseExpression, getSubprocessResult;
var init_template = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/methods/template.js"() {
    init_is_plain_obj();
    init_uint_array();
    isTemplateString = /* @__PURE__ */ __name((templates) => Array.isArray(templates) && Array.isArray(templates.raw), "isTemplateString");
    parseTemplates = /* @__PURE__ */ __name((templates, expressions) => {
      let tokens = [];
      for (const [index, template] of templates.entries()) {
        tokens = parseTemplate({
          templates,
          expressions,
          tokens,
          index,
          template
        });
      }
      if (tokens.length === 0) {
        throw new TypeError("Template script must not be empty");
      }
      const [file, ...commandArguments] = tokens;
      return [file, commandArguments, {}];
    }, "parseTemplates");
    parseTemplate = /* @__PURE__ */ __name(({ templates, expressions, tokens, index, template }) => {
      if (template === void 0) {
        throw new TypeError(`Invalid backslash sequence: ${templates.raw[index]}`);
      }
      const { nextTokens, leadingWhitespaces, trailingWhitespaces } = splitByWhitespaces(template, templates.raw[index]);
      const newTokens = concatTokens(tokens, nextTokens, leadingWhitespaces);
      if (index === expressions.length) {
        return newTokens;
      }
      const expression = expressions[index];
      const expressionTokens = Array.isArray(expression) ? expression.map((expression2) => parseExpression(expression2)) : [parseExpression(expression)];
      return concatTokens(newTokens, expressionTokens, trailingWhitespaces);
    }, "parseTemplate");
    splitByWhitespaces = /* @__PURE__ */ __name((template, rawTemplate) => {
      if (rawTemplate.length === 0) {
        return { nextTokens: [], leadingWhitespaces: false, trailingWhitespaces: false };
      }
      const nextTokens = [];
      let templateStart = 0;
      const leadingWhitespaces = DELIMITERS.has(rawTemplate[0]);
      for (let templateIndex = 0, rawIndex = 0; templateIndex < template.length; templateIndex += 1, rawIndex += 1) {
        const rawCharacter = rawTemplate[rawIndex];
        if (DELIMITERS.has(rawCharacter)) {
          if (templateStart !== templateIndex) {
            nextTokens.push(template.slice(templateStart, templateIndex));
          }
          templateStart = templateIndex + 1;
        } else if (rawCharacter === "\\") {
          const nextRawCharacter = rawTemplate[rawIndex + 1];
          if (nextRawCharacter === "\n") {
            templateIndex -= 1;
            rawIndex += 1;
          } else if (nextRawCharacter === "u" && rawTemplate[rawIndex + 2] === "{") {
            rawIndex = rawTemplate.indexOf("}", rawIndex + 3);
          } else {
            rawIndex += ESCAPE_LENGTH[nextRawCharacter] ?? 1;
          }
        }
      }
      const trailingWhitespaces = templateStart === template.length;
      if (!trailingWhitespaces) {
        nextTokens.push(template.slice(templateStart));
      }
      return { nextTokens, leadingWhitespaces, trailingWhitespaces };
    }, "splitByWhitespaces");
    DELIMITERS = /* @__PURE__ */ new Set([" ", "	", "\r", "\n"]);
    ESCAPE_LENGTH = { x: 3, u: 5 };
    concatTokens = /* @__PURE__ */ __name((tokens, nextTokens, isSeparated) => isSeparated || tokens.length === 0 || nextTokens.length === 0 ? [...tokens, ...nextTokens] : [
      ...tokens.slice(0, -1),
      `${tokens.at(-1)}${nextTokens[0]}`,
      ...nextTokens.slice(1)
    ], "concatTokens");
    parseExpression = /* @__PURE__ */ __name((expression) => {
      const typeOfExpression = typeof expression;
      if (typeOfExpression === "string") {
        return expression;
      }
      if (typeOfExpression === "number") {
        return String(expression);
      }
      if (isPlainObject2(expression) && ("stdout" in expression || "isMaxBuffer" in expression)) {
        return getSubprocessResult(expression);
      }
      if (expression instanceof child_process.ChildProcess || Object.prototype.toString.call(expression) === "[object Promise]") {
        throw new TypeError("Unexpected subprocess in template expression. Please use ${await subprocess} instead of ${subprocess}.");
      }
      throw new TypeError(`Unexpected "${typeOfExpression}" in template expression`);
    }, "parseExpression");
    getSubprocessResult = /* @__PURE__ */ __name(({ stdout }) => {
      if (typeof stdout === "string") {
        return stdout;
      }
      if (isUint8Array2(stdout)) {
        return uint8ArrayToString(stdout);
      }
      if (stdout === void 0) {
        throw new TypeError(`Missing result.stdout in template expression. This is probably due to the previous subprocess' "stdout" option.`);
      }
      throw new TypeError(`Unexpected "${typeof stdout}" stdout in template expression`);
    }, "getSubprocessResult");
  }
});
var isStandardStream, STANDARD_STREAMS, STANDARD_STREAMS_ALIASES, getStreamName;
var init_standard_stream = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/utils/standard-stream.js"() {
    isStandardStream = /* @__PURE__ */ __name((stream) => STANDARD_STREAMS.includes(stream), "isStandardStream");
    STANDARD_STREAMS = [y2__default.default.stdin, y2__default.default.stdout, y2__default.default.stderr];
    STANDARD_STREAMS_ALIASES = ["stdin", "stdout", "stderr"];
    getStreamName = /* @__PURE__ */ __name((fdNumber) => STANDARD_STREAMS_ALIASES[fdNumber] ?? `stdio[${fdNumber}]`, "getStreamName");
  }
});
var normalizeFdSpecificOptions, normalizeFdSpecificOption, getStdioLength, normalizeFdSpecificValue, normalizeOptionObject, compareFdName, getFdNameOrder, parseFdName, parseFd, FD_REGEXP, addDefaultValue, verboseDefault, DEFAULT_OPTIONS, FD_SPECIFIC_OPTIONS, getFdSpecificValue;
var init_specific = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/arguments/specific.js"() {
    init_is_plain_obj();
    init_standard_stream();
    normalizeFdSpecificOptions = /* @__PURE__ */ __name((options) => {
      const optionsCopy = { ...options };
      for (const optionName of FD_SPECIFIC_OPTIONS) {
        optionsCopy[optionName] = normalizeFdSpecificOption(options, optionName);
      }
      return optionsCopy;
    }, "normalizeFdSpecificOptions");
    normalizeFdSpecificOption = /* @__PURE__ */ __name((options, optionName) => {
      const optionBaseArray = Array.from({ length: getStdioLength(options) + 1 });
      const optionArray = normalizeFdSpecificValue(options[optionName], optionBaseArray, optionName);
      return addDefaultValue(optionArray, optionName);
    }, "normalizeFdSpecificOption");
    getStdioLength = /* @__PURE__ */ __name(({ stdio }) => Array.isArray(stdio) ? Math.max(stdio.length, STANDARD_STREAMS_ALIASES.length) : STANDARD_STREAMS_ALIASES.length, "getStdioLength");
    normalizeFdSpecificValue = /* @__PURE__ */ __name((optionValue, optionArray, optionName) => isPlainObject2(optionValue) ? normalizeOptionObject(optionValue, optionArray, optionName) : optionArray.fill(optionValue), "normalizeFdSpecificValue");
    normalizeOptionObject = /* @__PURE__ */ __name((optionValue, optionArray, optionName) => {
      for (const fdName of Object.keys(optionValue).sort(compareFdName)) {
        for (const fdNumber of parseFdName(fdName, optionName, optionArray)) {
          optionArray[fdNumber] = optionValue[fdName];
        }
      }
      return optionArray;
    }, "normalizeOptionObject");
    compareFdName = /* @__PURE__ */ __name((fdNameA, fdNameB) => getFdNameOrder(fdNameA) < getFdNameOrder(fdNameB) ? 1 : -1, "compareFdName");
    getFdNameOrder = /* @__PURE__ */ __name((fdName) => {
      if (fdName === "stdout" || fdName === "stderr") {
        return 0;
      }
      return fdName === "all" ? 2 : 1;
    }, "getFdNameOrder");
    parseFdName = /* @__PURE__ */ __name((fdName, optionName, optionArray) => {
      if (fdName === "ipc") {
        return [optionArray.length - 1];
      }
      const fdNumber = parseFd(fdName);
      if (fdNumber === void 0 || fdNumber === 0) {
        throw new TypeError(`"${optionName}.${fdName}" is invalid.
It must be "${optionName}.stdout", "${optionName}.stderr", "${optionName}.all", "${optionName}.ipc", or "${optionName}.fd3", "${optionName}.fd4" (and so on).`);
      }
      if (fdNumber >= optionArray.length) {
        throw new TypeError(`"${optionName}.${fdName}" is invalid: that file descriptor does not exist.
Please set the "stdio" option to ensure that file descriptor exists.`);
      }
      return fdNumber === "all" ? [1, 2] : [fdNumber];
    }, "parseFdName");
    parseFd = /* @__PURE__ */ __name((fdName) => {
      if (fdName === "all") {
        return fdName;
      }
      if (STANDARD_STREAMS_ALIASES.includes(fdName)) {
        return STANDARD_STREAMS_ALIASES.indexOf(fdName);
      }
      const regexpResult = FD_REGEXP.exec(fdName);
      if (regexpResult !== null) {
        return Number(regexpResult[1]);
      }
    }, "parseFd");
    FD_REGEXP = /^fd(\d+)$/;
    addDefaultValue = /* @__PURE__ */ __name((optionArray, optionName) => optionArray.map((optionValue) => optionValue === void 0 ? DEFAULT_OPTIONS[optionName] : optionValue), "addDefaultValue");
    verboseDefault = util.debuglog("execa").enabled ? "full" : "none";
    DEFAULT_OPTIONS = {
      lines: false,
      buffer: true,
      maxBuffer: 1e3 * 1e3 * 100,
      verbose: verboseDefault,
      stripFinalNewline: true
    };
    FD_SPECIFIC_OPTIONS = ["lines", "buffer", "maxBuffer", "verbose", "stripFinalNewline"];
    getFdSpecificValue = /* @__PURE__ */ __name((optionArray, fdNumber) => fdNumber === "ipc" ? optionArray.at(-1) : optionArray[fdNumber], "getFdSpecificValue");
  }
});

// ../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/verbose/values.js
var isVerbose, isFullVerbose, getVerboseFunction, getFdVerbose, getFdGenericVerbose, isVerboseFunction, VERBOSE_VALUES;
var init_values = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/verbose/values.js"() {
    init_specific();
    isVerbose = /* @__PURE__ */ __name(({ verbose }, fdNumber) => getFdVerbose(verbose, fdNumber) !== "none", "isVerbose");
    isFullVerbose = /* @__PURE__ */ __name(({ verbose }, fdNumber) => !["none", "short"].includes(getFdVerbose(verbose, fdNumber)), "isFullVerbose");
    getVerboseFunction = /* @__PURE__ */ __name(({ verbose }, fdNumber) => {
      const fdVerbose = getFdVerbose(verbose, fdNumber);
      return isVerboseFunction(fdVerbose) ? fdVerbose : void 0;
    }, "getVerboseFunction");
    getFdVerbose = /* @__PURE__ */ __name((verbose, fdNumber) => fdNumber === void 0 ? getFdGenericVerbose(verbose) : getFdSpecificValue(verbose, fdNumber), "getFdVerbose");
    getFdGenericVerbose = /* @__PURE__ */ __name((verbose) => verbose.find((fdVerbose) => isVerboseFunction(fdVerbose)) ?? VERBOSE_VALUES.findLast((fdVerbose) => verbose.includes(fdVerbose)), "getFdGenericVerbose");
    isVerboseFunction = /* @__PURE__ */ __name((fdVerbose) => typeof fdVerbose === "function", "isVerboseFunction");
    VERBOSE_VALUES = ["none", "short", "full"];
  }
});
var joinCommand, escapeLines, escapeControlCharacters, escapeControlCharacter, getSpecialCharRegExp, SPECIAL_CHAR_REGEXP, COMMON_ESCAPES, ASTRAL_START, quoteString, NO_ESCAPE_REGEXP;
var init_escape = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/arguments/escape.js"() {
    joinCommand = /* @__PURE__ */ __name((filePath, rawArguments) => {
      const fileAndArguments = [filePath, ...rawArguments];
      const command = fileAndArguments.join(" ");
      const escapedCommand = fileAndArguments.map((fileAndArgument) => quoteString(escapeControlCharacters(fileAndArgument))).join(" ");
      return { command, escapedCommand };
    }, "joinCommand");
    escapeLines = /* @__PURE__ */ __name((lines) => util.stripVTControlCharacters(lines).split("\n").map((line) => escapeControlCharacters(line)).join("\n"), "escapeLines");
    escapeControlCharacters = /* @__PURE__ */ __name((line) => line.replaceAll(SPECIAL_CHAR_REGEXP, (character) => escapeControlCharacter(character)), "escapeControlCharacters");
    escapeControlCharacter = /* @__PURE__ */ __name((character) => {
      const commonEscape = COMMON_ESCAPES[character];
      if (commonEscape !== void 0) {
        return commonEscape;
      }
      const codepoint = character.codePointAt(0);
      const codepointHex = codepoint.toString(16);
      return codepoint <= ASTRAL_START ? `\\u${codepointHex.padStart(4, "0")}` : `\\U${codepointHex}`;
    }, "escapeControlCharacter");
    getSpecialCharRegExp = /* @__PURE__ */ __name(() => {
      try {
        return new RegExp("\\p{Separator}|\\p{Other}", "gu");
      } catch {
        return /[\s\u0000-\u001F\u007F-\u009F\u00AD]/g;
      }
    }, "getSpecialCharRegExp");
    SPECIAL_CHAR_REGEXP = getSpecialCharRegExp();
    COMMON_ESCAPES = {
      " ": " ",
      "\b": "\\b",
      "\f": "\\f",
      "\n": "\\n",
      "\r": "\\r",
      "	": "\\t"
    };
    ASTRAL_START = 65535;
    quoteString = /* @__PURE__ */ __name((escapedArgument) => {
      if (NO_ESCAPE_REGEXP.test(escapedArgument)) {
        return escapedArgument;
      }
      return y2.platform === "win32" ? `"${escapedArgument.replaceAll('"', '""')}"` : `'${escapedArgument.replaceAll("'", "'\\''")}'`;
    }, "quoteString");
    NO_ESCAPE_REGEXP = /^[\w./-]+$/;
  }
});

// ../../node_modules/.pnpm/figures@6.1.0/node_modules/figures/index.js
var common, specialMainSymbols, specialFallbackSymbols, mainSymbols, fallbackSymbols, shouldUseMain, figures, figures_default;
var init_figures = __esm({
  "../../node_modules/.pnpm/figures@6.1.0/node_modules/figures/index.js"() {
    init_is_unicode_supported();
    common = {
      circleQuestionMark: "(?)",
      questionMarkPrefix: "(?)",
      square: "\u2588",
      squareDarkShade: "\u2593",
      squareMediumShade: "\u2592",
      squareLightShade: "\u2591",
      squareTop: "\u2580",
      squareBottom: "\u2584",
      squareLeft: "\u258C",
      squareRight: "\u2590",
      squareCenter: "\u25A0",
      bullet: "\u25CF",
      dot: "\u2024",
      ellipsis: "\u2026",
      pointerSmall: "\u203A",
      triangleUp: "\u25B2",
      triangleUpSmall: "\u25B4",
      triangleDown: "\u25BC",
      triangleDownSmall: "\u25BE",
      triangleLeftSmall: "\u25C2",
      triangleRightSmall: "\u25B8",
      home: "\u2302",
      heart: "\u2665",
      musicNote: "\u266A",
      musicNoteBeamed: "\u266B",
      arrowUp: "\u2191",
      arrowDown: "\u2193",
      arrowLeft: "\u2190",
      arrowRight: "\u2192",
      arrowLeftRight: "\u2194",
      arrowUpDown: "\u2195",
      almostEqual: "\u2248",
      notEqual: "\u2260",
      lessOrEqual: "\u2264",
      greaterOrEqual: "\u2265",
      identical: "\u2261",
      infinity: "\u221E",
      subscriptZero: "\u2080",
      subscriptOne: "\u2081",
      subscriptTwo: "\u2082",
      subscriptThree: "\u2083",
      subscriptFour: "\u2084",
      subscriptFive: "\u2085",
      subscriptSix: "\u2086",
      subscriptSeven: "\u2087",
      subscriptEight: "\u2088",
      subscriptNine: "\u2089",
      oneHalf: "\xBD",
      oneThird: "\u2153",
      oneQuarter: "\xBC",
      oneFifth: "\u2155",
      oneSixth: "\u2159",
      oneEighth: "\u215B",
      twoThirds: "\u2154",
      twoFifths: "\u2156",
      threeQuarters: "\xBE",
      threeFifths: "\u2157",
      threeEighths: "\u215C",
      fourFifths: "\u2158",
      fiveSixths: "\u215A",
      fiveEighths: "\u215D",
      sevenEighths: "\u215E",
      line: "\u2500",
      lineBold: "\u2501",
      lineDouble: "\u2550",
      lineDashed0: "\u2504",
      lineDashed1: "\u2505",
      lineDashed2: "\u2508",
      lineDashed3: "\u2509",
      lineDashed4: "\u254C",
      lineDashed5: "\u254D",
      lineDashed6: "\u2574",
      lineDashed7: "\u2576",
      lineDashed8: "\u2578",
      lineDashed9: "\u257A",
      lineDashed10: "\u257C",
      lineDashed11: "\u257E",
      lineDashed12: "\u2212",
      lineDashed13: "\u2013",
      lineDashed14: "\u2010",
      lineDashed15: "\u2043",
      lineVertical: "\u2502",
      lineVerticalBold: "\u2503",
      lineVerticalDouble: "\u2551",
      lineVerticalDashed0: "\u2506",
      lineVerticalDashed1: "\u2507",
      lineVerticalDashed2: "\u250A",
      lineVerticalDashed3: "\u250B",
      lineVerticalDashed4: "\u254E",
      lineVerticalDashed5: "\u254F",
      lineVerticalDashed6: "\u2575",
      lineVerticalDashed7: "\u2577",
      lineVerticalDashed8: "\u2579",
      lineVerticalDashed9: "\u257B",
      lineVerticalDashed10: "\u257D",
      lineVerticalDashed11: "\u257F",
      lineDownLeft: "\u2510",
      lineDownLeftArc: "\u256E",
      lineDownBoldLeftBold: "\u2513",
      lineDownBoldLeft: "\u2512",
      lineDownLeftBold: "\u2511",
      lineDownDoubleLeftDouble: "\u2557",
      lineDownDoubleLeft: "\u2556",
      lineDownLeftDouble: "\u2555",
      lineDownRight: "\u250C",
      lineDownRightArc: "\u256D",
      lineDownBoldRightBold: "\u250F",
      lineDownBoldRight: "\u250E",
      lineDownRightBold: "\u250D",
      lineDownDoubleRightDouble: "\u2554",
      lineDownDoubleRight: "\u2553",
      lineDownRightDouble: "\u2552",
      lineUpLeft: "\u2518",
      lineUpLeftArc: "\u256F",
      lineUpBoldLeftBold: "\u251B",
      lineUpBoldLeft: "\u251A",
      lineUpLeftBold: "\u2519",
      lineUpDoubleLeftDouble: "\u255D",
      lineUpDoubleLeft: "\u255C",
      lineUpLeftDouble: "\u255B",
      lineUpRight: "\u2514",
      lineUpRightArc: "\u2570",
      lineUpBoldRightBold: "\u2517",
      lineUpBoldRight: "\u2516",
      lineUpRightBold: "\u2515",
      lineUpDoubleRightDouble: "\u255A",
      lineUpDoubleRight: "\u2559",
      lineUpRightDouble: "\u2558",
      lineUpDownLeft: "\u2524",
      lineUpBoldDownBoldLeftBold: "\u252B",
      lineUpBoldDownBoldLeft: "\u2528",
      lineUpDownLeftBold: "\u2525",
      lineUpBoldDownLeftBold: "\u2529",
      lineUpDownBoldLeftBold: "\u252A",
      lineUpDownBoldLeft: "\u2527",
      lineUpBoldDownLeft: "\u2526",
      lineUpDoubleDownDoubleLeftDouble: "\u2563",
      lineUpDoubleDownDoubleLeft: "\u2562",
      lineUpDownLeftDouble: "\u2561",
      lineUpDownRight: "\u251C",
      lineUpBoldDownBoldRightBold: "\u2523",
      lineUpBoldDownBoldRight: "\u2520",
      lineUpDownRightBold: "\u251D",
      lineUpBoldDownRightBold: "\u2521",
      lineUpDownBoldRightBold: "\u2522",
      lineUpDownBoldRight: "\u251F",
      lineUpBoldDownRight: "\u251E",
      lineUpDoubleDownDoubleRightDouble: "\u2560",
      lineUpDoubleDownDoubleRight: "\u255F",
      lineUpDownRightDouble: "\u255E",
      lineDownLeftRight: "\u252C",
      lineDownBoldLeftBoldRightBold: "\u2533",
      lineDownLeftBoldRightBold: "\u252F",
      lineDownBoldLeftRight: "\u2530",
      lineDownBoldLeftBoldRight: "\u2531",
      lineDownBoldLeftRightBold: "\u2532",
      lineDownLeftRightBold: "\u252E",
      lineDownLeftBoldRight: "\u252D",
      lineDownDoubleLeftDoubleRightDouble: "\u2566",
      lineDownDoubleLeftRight: "\u2565",
      lineDownLeftDoubleRightDouble: "\u2564",
      lineUpLeftRight: "\u2534",
      lineUpBoldLeftBoldRightBold: "\u253B",
      lineUpLeftBoldRightBold: "\u2537",
      lineUpBoldLeftRight: "\u2538",
      lineUpBoldLeftBoldRight: "\u2539",
      lineUpBoldLeftRightBold: "\u253A",
      lineUpLeftRightBold: "\u2536",
      lineUpLeftBoldRight: "\u2535",
      lineUpDoubleLeftDoubleRightDouble: "\u2569",
      lineUpDoubleLeftRight: "\u2568",
      lineUpLeftDoubleRightDouble: "\u2567",
      lineUpDownLeftRight: "\u253C",
      lineUpBoldDownBoldLeftBoldRightBold: "\u254B",
      lineUpDownBoldLeftBoldRightBold: "\u2548",
      lineUpBoldDownLeftBoldRightBold: "\u2547",
      lineUpBoldDownBoldLeftRightBold: "\u254A",
      lineUpBoldDownBoldLeftBoldRight: "\u2549",
      lineUpBoldDownLeftRight: "\u2540",
      lineUpDownBoldLeftRight: "\u2541",
      lineUpDownLeftBoldRight: "\u253D",
      lineUpDownLeftRightBold: "\u253E",
      lineUpBoldDownBoldLeftRight: "\u2542",
      lineUpDownLeftBoldRightBold: "\u253F",
      lineUpBoldDownLeftBoldRight: "\u2543",
      lineUpBoldDownLeftRightBold: "\u2544",
      lineUpDownBoldLeftBoldRight: "\u2545",
      lineUpDownBoldLeftRightBold: "\u2546",
      lineUpDoubleDownDoubleLeftDoubleRightDouble: "\u256C",
      lineUpDoubleDownDoubleLeftRight: "\u256B",
      lineUpDownLeftDoubleRightDouble: "\u256A",
      lineCross: "\u2573",
      lineBackslash: "\u2572",
      lineSlash: "\u2571"
    };
    specialMainSymbols = {
      tick: "\u2714",
      info: "\u2139",
      warning: "\u26A0",
      cross: "\u2718",
      squareSmall: "\u25FB",
      squareSmallFilled: "\u25FC",
      circle: "\u25EF",
      circleFilled: "\u25C9",
      circleDotted: "\u25CC",
      circleDouble: "\u25CE",
      circleCircle: "\u24DE",
      circleCross: "\u24E7",
      circlePipe: "\u24BE",
      radioOn: "\u25C9",
      radioOff: "\u25EF",
      checkboxOn: "\u2612",
      checkboxOff: "\u2610",
      checkboxCircleOn: "\u24E7",
      checkboxCircleOff: "\u24BE",
      pointer: "\u276F",
      triangleUpOutline: "\u25B3",
      triangleLeft: "\u25C0",
      triangleRight: "\u25B6",
      lozenge: "\u25C6",
      lozengeOutline: "\u25C7",
      hamburger: "\u2630",
      smiley: "\u32E1",
      mustache: "\u0DF4",
      star: "\u2605",
      play: "\u25B6",
      nodejs: "\u2B22",
      oneSeventh: "\u2150",
      oneNinth: "\u2151",
      oneTenth: "\u2152"
    };
    specialFallbackSymbols = {
      tick: "\u221A",
      info: "i",
      warning: "\u203C",
      cross: "\xD7",
      squareSmall: "\u25A1",
      squareSmallFilled: "\u25A0",
      circle: "( )",
      circleFilled: "(*)",
      circleDotted: "( )",
      circleDouble: "( )",
      circleCircle: "(\u25CB)",
      circleCross: "(\xD7)",
      circlePipe: "(\u2502)",
      radioOn: "(*)",
      radioOff: "( )",
      checkboxOn: "[\xD7]",
      checkboxOff: "[ ]",
      checkboxCircleOn: "(\xD7)",
      checkboxCircleOff: "( )",
      pointer: ">",
      triangleUpOutline: "\u2206",
      triangleLeft: "\u25C4",
      triangleRight: "\u25BA",
      lozenge: "\u2666",
      lozengeOutline: "\u25CA",
      hamburger: "\u2261",
      smiley: "\u263A",
      mustache: "\u250C\u2500\u2510",
      star: "\u2736",
      play: "\u25BA",
      nodejs: "\u2666",
      oneSeventh: "1/7",
      oneNinth: "1/9",
      oneTenth: "1/10"
    };
    mainSymbols = { ...common, ...specialMainSymbols };
    fallbackSymbols = { ...common, ...specialFallbackSymbols };
    shouldUseMain = isUnicodeSupported();
    figures = shouldUseMain ? mainSymbols : fallbackSymbols;
    figures_default = figures;
    Object.entries(specialMainSymbols);
  }
});
var hasColors, format, bold2, gray2, redBright2, yellowBright2;
var init_base = __esm({
  "../../node_modules/.pnpm/yoctocolors@2.1.2/node_modules/yoctocolors/base.js"() {
    hasColors = tty__default.default?.WriteStream?.prototype?.hasColors?.() ?? false;
    format = /* @__PURE__ */ __name((open, close) => {
      if (!hasColors) {
        return (input) => input;
      }
      const openCode = `\x1B[${open}m`;
      const closeCode = `\x1B[${close}m`;
      return (input) => {
        const string = input + "";
        let index = string.indexOf(closeCode);
        if (index === -1) {
          return openCode + string + closeCode;
        }
        let result = openCode;
        let lastIndex = 0;
        const reopenOnNestedClose = close === 22;
        const replaceCode = (reopenOnNestedClose ? closeCode : "") + openCode;
        while (index !== -1) {
          result += string.slice(lastIndex, index) + replaceCode;
          lastIndex = index + closeCode.length;
          index = string.indexOf(closeCode, lastIndex);
        }
        result += string.slice(lastIndex) + closeCode;
        return result;
      };
    }, "format");
    format(0, 0);
    bold2 = format(1, 22);
    format(2, 22);
    format(3, 23);
    format(4, 24);
    format(53, 55);
    format(7, 27);
    format(8, 28);
    format(9, 29);
    format(30, 39);
    format(31, 39);
    format(32, 39);
    format(33, 39);
    format(34, 39);
    format(35, 39);
    format(36, 39);
    format(37, 39);
    gray2 = format(90, 39);
    format(40, 49);
    format(41, 49);
    format(42, 49);
    format(43, 49);
    format(44, 49);
    format(45, 49);
    format(46, 49);
    format(47, 49);
    format(100, 49);
    redBright2 = format(91, 39);
    format(92, 39);
    yellowBright2 = format(93, 39);
    format(94, 39);
    format(95, 39);
    format(96, 39);
    format(97, 39);
    format(101, 49);
    format(102, 49);
    format(103, 49);
    format(104, 49);
    format(105, 49);
    format(106, 49);
    format(107, 49);
  }
});

// ../../node_modules/.pnpm/yoctocolors@2.1.2/node_modules/yoctocolors/index.js
var init_yoctocolors = __esm({
  "../../node_modules/.pnpm/yoctocolors@2.1.2/node_modules/yoctocolors/index.js"() {
    init_base();
    init_base();
  }
});

// ../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/verbose/default.js
var defaultVerboseFunction, serializeTimestamp, padField, getFinalIcon, ICONS, identity, COLORS;
var init_default = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/verbose/default.js"() {
    init_figures();
    init_yoctocolors();
    defaultVerboseFunction = /* @__PURE__ */ __name(({
      type,
      message,
      timestamp,
      piped,
      commandId,
      result: { failed = false } = {},
      options: { reject = true }
    }) => {
      const timestampString = serializeTimestamp(timestamp);
      const icon = ICONS[type]({ failed, reject, piped });
      const color = COLORS[type]({ reject });
      return `${gray2(`[${timestampString}]`)} ${gray2(`[${commandId}]`)} ${color(icon)} ${color(message)}`;
    }, "defaultVerboseFunction");
    serializeTimestamp = /* @__PURE__ */ __name((timestamp) => `${padField(timestamp.getHours(), 2)}:${padField(timestamp.getMinutes(), 2)}:${padField(timestamp.getSeconds(), 2)}.${padField(timestamp.getMilliseconds(), 3)}`, "serializeTimestamp");
    padField = /* @__PURE__ */ __name((field, padding) => String(field).padStart(padding, "0"), "padField");
    getFinalIcon = /* @__PURE__ */ __name(({ failed, reject }) => {
      if (!failed) {
        return figures_default.tick;
      }
      return reject ? figures_default.cross : figures_default.warning;
    }, "getFinalIcon");
    ICONS = {
      command: /* @__PURE__ */ __name(({ piped }) => piped ? "|" : "$", "command"),
      output: /* @__PURE__ */ __name(() => " ", "output"),
      ipc: /* @__PURE__ */ __name(() => "*", "ipc"),
      error: getFinalIcon,
      duration: getFinalIcon
    };
    identity = /* @__PURE__ */ __name((string) => string, "identity");
    COLORS = {
      command: /* @__PURE__ */ __name(() => bold2, "command"),
      output: /* @__PURE__ */ __name(() => identity, "output"),
      ipc: /* @__PURE__ */ __name(() => identity, "ipc"),
      error: /* @__PURE__ */ __name(({ reject }) => reject ? redBright2 : yellowBright2, "error"),
      duration: /* @__PURE__ */ __name(() => gray2, "duration")
    };
  }
});

// ../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/verbose/custom.js
var applyVerboseOnLines, applyVerboseFunction, appendNewline;
var init_custom = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/verbose/custom.js"() {
    init_values();
    applyVerboseOnLines = /* @__PURE__ */ __name((printedLines, verboseInfo, fdNumber) => {
      const verboseFunction = getVerboseFunction(verboseInfo, fdNumber);
      return printedLines.map(({ verboseLine, verboseObject }) => applyVerboseFunction(verboseLine, verboseObject, verboseFunction)).filter((printedLine) => printedLine !== void 0).map((printedLine) => appendNewline(printedLine)).join("");
    }, "applyVerboseOnLines");
    applyVerboseFunction = /* @__PURE__ */ __name((verboseLine, verboseObject, verboseFunction) => {
      if (verboseFunction === void 0) {
        return verboseLine;
      }
      const printedLine = verboseFunction(verboseLine, verboseObject);
      if (typeof printedLine === "string") {
        return printedLine;
      }
    }, "applyVerboseFunction");
    appendNewline = /* @__PURE__ */ __name((printedLine) => printedLine.endsWith("\n") ? printedLine : `${printedLine}
`, "appendNewline");
  }
});
var verboseLog, getVerboseObject, getPrintedLines, getPrintedLine, serializeVerboseMessage, TAB_SIZE;
var init_log = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/verbose/log.js"() {
    init_escape();
    init_default();
    init_custom();
    verboseLog = /* @__PURE__ */ __name(({ type, verboseMessage, fdNumber, verboseInfo, result }) => {
      const verboseObject = getVerboseObject({ type, result, verboseInfo });
      const printedLines = getPrintedLines(verboseMessage, verboseObject);
      const finalLines = applyVerboseOnLines(printedLines, verboseInfo, fdNumber);
      if (finalLines !== "") {
        console.warn(finalLines.slice(0, -1));
      }
    }, "verboseLog");
    getVerboseObject = /* @__PURE__ */ __name(({
      type,
      result,
      verboseInfo: { escapedCommand, commandId, rawOptions: { piped = false, ...options } }
    }) => ({
      type,
      escapedCommand,
      commandId: `${commandId}`,
      timestamp: /* @__PURE__ */ new Date(),
      piped,
      result,
      options
    }), "getVerboseObject");
    getPrintedLines = /* @__PURE__ */ __name((verboseMessage, verboseObject) => verboseMessage.split("\n").map((message) => getPrintedLine({ ...verboseObject, message })), "getPrintedLines");
    getPrintedLine = /* @__PURE__ */ __name((verboseObject) => {
      const verboseLine = defaultVerboseFunction(verboseObject);
      return { verboseLine, verboseObject };
    }, "getPrintedLine");
    serializeVerboseMessage = /* @__PURE__ */ __name((message) => {
      const messageString = typeof message === "string" ? message : util.inspect(message);
      const escapedMessage = escapeLines(messageString);
      return escapedMessage.replaceAll("	", " ".repeat(TAB_SIZE));
    }, "serializeVerboseMessage");
    TAB_SIZE = 2;
  }
});

// ../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/verbose/start.js
var logCommand;
var init_start = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/verbose/start.js"() {
    init_values();
    init_log();
    logCommand = /* @__PURE__ */ __name((escapedCommand, verboseInfo) => {
      if (!isVerbose(verboseInfo)) {
        return;
      }
      verboseLog({
        type: "command",
        verboseMessage: escapedCommand,
        verboseInfo
      });
    }, "logCommand");
  }
});

// ../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/verbose/info.js
var getVerboseInfo, getCommandId, COMMAND_ID, validateVerbose;
var init_info = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/verbose/info.js"() {
    init_values();
    getVerboseInfo = /* @__PURE__ */ __name((verbose, escapedCommand, rawOptions) => {
      validateVerbose(verbose);
      const commandId = getCommandId(verbose);
      return {
        verbose,
        escapedCommand,
        commandId,
        rawOptions
      };
    }, "getVerboseInfo");
    getCommandId = /* @__PURE__ */ __name((verbose) => isVerbose({ verbose }) ? COMMAND_ID++ : void 0, "getCommandId");
    COMMAND_ID = 0n;
    validateVerbose = /* @__PURE__ */ __name((verbose) => {
      for (const fdVerbose of verbose) {
        if (fdVerbose === false) {
          throw new TypeError(`The "verbose: false" option was renamed to "verbose: 'none'".`);
        }
        if (fdVerbose === true) {
          throw new TypeError(`The "verbose: true" option was renamed to "verbose: 'short'".`);
        }
        if (!VERBOSE_VALUES.includes(fdVerbose) && !isVerboseFunction(fdVerbose)) {
          const allowedValues = VERBOSE_VALUES.map((allowedValue) => `'${allowedValue}'`).join(", ");
          throw new TypeError(`The "verbose" option must not be ${fdVerbose}. Allowed values are: ${allowedValues} or a function.`);
        }
      }
    }, "validateVerbose");
  }
});
var getStartTime, getDurationMs;
var init_duration = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/return/duration.js"() {
    getStartTime = /* @__PURE__ */ __name(() => y2.hrtime.bigint(), "getStartTime");
    getDurationMs = /* @__PURE__ */ __name((startTime) => Number(y2.hrtime.bigint() - startTime) / 1e6, "getDurationMs");
  }
});

// ../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/arguments/command.js
var handleCommand;
var init_command = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/arguments/command.js"() {
    init_start();
    init_info();
    init_duration();
    init_escape();
    init_specific();
    handleCommand = /* @__PURE__ */ __name((filePath, rawArguments, rawOptions) => {
      const startTime = getStartTime();
      const { command, escapedCommand } = joinCommand(filePath, rawArguments);
      const verbose = normalizeFdSpecificOption(rawOptions, "verbose");
      const verboseInfo = getVerboseInfo(verbose, escapedCommand, { ...rawOptions });
      logCommand(escapedCommand, verboseInfo);
      return {
        command,
        escapedCommand,
        startTime,
        verboseInfo
      };
    }, "handleCommand");
  }
});

// ../../node_modules/.pnpm/isexe@2.0.0/node_modules/isexe/windows.js
var require_windows = __commonJS({
  "../../node_modules/.pnpm/isexe@2.0.0/node_modules/isexe/windows.js"(exports, module) {
    module.exports = isexe;
    isexe.sync = sync;
    var fs10 = __require("fs");
    function checkPathExt(path12, options) {
      var pathext = options.pathExt !== void 0 ? options.pathExt : process.env.PATHEXT;
      if (!pathext) {
        return true;
      }
      pathext = pathext.split(";");
      if (pathext.indexOf("") !== -1) {
        return true;
      }
      for (var i2 = 0; i2 < pathext.length; i2++) {
        var p2 = pathext[i2].toLowerCase();
        if (p2 && path12.substr(-p2.length).toLowerCase() === p2) {
          return true;
        }
      }
      return false;
    }
    __name(checkPathExt, "checkPathExt");
    function checkStat(stat, path12, options) {
      if (!stat.isSymbolicLink() && !stat.isFile()) {
        return false;
      }
      return checkPathExt(path12, options);
    }
    __name(checkStat, "checkStat");
    function isexe(path12, options, cb) {
      fs10.stat(path12, function(er, stat) {
        cb(er, er ? false : checkStat(stat, path12, options));
      });
    }
    __name(isexe, "isexe");
    function sync(path12, options) {
      return checkStat(fs10.statSync(path12), path12, options);
    }
    __name(sync, "sync");
  }
});

// ../../node_modules/.pnpm/isexe@2.0.0/node_modules/isexe/mode.js
var require_mode = __commonJS({
  "../../node_modules/.pnpm/isexe@2.0.0/node_modules/isexe/mode.js"(exports, module) {
    module.exports = isexe;
    isexe.sync = sync;
    var fs10 = __require("fs");
    function isexe(path12, options, cb) {
      fs10.stat(path12, function(er, stat) {
        cb(er, er ? false : checkStat(stat, options));
      });
    }
    __name(isexe, "isexe");
    function sync(path12, options) {
      return checkStat(fs10.statSync(path12), options);
    }
    __name(sync, "sync");
    function checkStat(stat, options) {
      return stat.isFile() && checkMode(stat, options);
    }
    __name(checkStat, "checkStat");
    function checkMode(stat, options) {
      var mod = stat.mode;
      var uid = stat.uid;
      var gid = stat.gid;
      var myUid = options.uid !== void 0 ? options.uid : process.getuid && process.getuid();
      var myGid = options.gid !== void 0 ? options.gid : process.getgid && process.getgid();
      var u3 = parseInt("100", 8);
      var g2 = parseInt("010", 8);
      var o3 = parseInt("001", 8);
      var ug = u3 | g2;
      var ret = mod & o3 || mod & g2 && gid === myGid || mod & u3 && uid === myUid || mod & ug && myUid === 0;
      return ret;
    }
    __name(checkMode, "checkMode");
  }
});

// ../../node_modules/.pnpm/isexe@2.0.0/node_modules/isexe/index.js
var require_isexe = __commonJS({
  "../../node_modules/.pnpm/isexe@2.0.0/node_modules/isexe/index.js"(exports, module) {
    __require("fs");
    var core;
    if (process.platform === "win32" || global.TESTING_WINDOWS) {
      core = require_windows();
    } else {
      core = require_mode();
    }
    module.exports = isexe;
    isexe.sync = sync;
    function isexe(path12, options, cb) {
      if (typeof options === "function") {
        cb = options;
        options = {};
      }
      if (!cb) {
        if (typeof Promise !== "function") {
          throw new TypeError("callback not provided");
        }
        return new Promise(function(resolve, reject) {
          isexe(path12, options || {}, function(er, is2) {
            if (er) {
              reject(er);
            } else {
              resolve(is2);
            }
          });
        });
      }
      core(path12, options || {}, function(er, is2) {
        if (er) {
          if (er.code === "EACCES" || options && options.ignoreErrors) {
            er = null;
            is2 = false;
          }
        }
        cb(er, is2);
      });
    }
    __name(isexe, "isexe");
    function sync(path12, options) {
      try {
        return core.sync(path12, options || {});
      } catch (er) {
        if (options && options.ignoreErrors || er.code === "EACCES") {
          return false;
        } else {
          throw er;
        }
      }
    }
    __name(sync, "sync");
  }
});

// ../../node_modules/.pnpm/which@2.0.2/node_modules/which/which.js
var require_which = __commonJS({
  "../../node_modules/.pnpm/which@2.0.2/node_modules/which/which.js"(exports, module) {
    var isWindows2 = process.platform === "win32" || process.env.OSTYPE === "cygwin" || process.env.OSTYPE === "msys";
    var path12 = __require("path");
    var COLON = isWindows2 ? ";" : ":";
    var isexe = require_isexe();
    var getNotFoundError = /* @__PURE__ */ __name((cmd) => Object.assign(new Error(`not found: ${cmd}`), { code: "ENOENT" }), "getNotFoundError");
    var getPathInfo = /* @__PURE__ */ __name((cmd, opt) => {
      const colon = opt.colon || COLON;
      const pathEnv = cmd.match(/\//) || isWindows2 && cmd.match(/\\/) ? [""] : [
        // windows always checks the cwd first
        ...isWindows2 ? [process.cwd()] : [],
        ...(opt.path || process.env.PATH || /* istanbul ignore next: very unusual */
        "").split(colon)
      ];
      const pathExtExe = isWindows2 ? opt.pathExt || process.env.PATHEXT || ".EXE;.CMD;.BAT;.COM" : "";
      const pathExt = isWindows2 ? pathExtExe.split(colon) : [""];
      if (isWindows2) {
        if (cmd.indexOf(".") !== -1 && pathExt[0] !== "")
          pathExt.unshift("");
      }
      return {
        pathEnv,
        pathExt,
        pathExtExe
      };
    }, "getPathInfo");
    var which2 = /* @__PURE__ */ __name((cmd, opt, cb) => {
      if (typeof opt === "function") {
        cb = opt;
        opt = {};
      }
      if (!opt)
        opt = {};
      const { pathEnv, pathExt, pathExtExe } = getPathInfo(cmd, opt);
      const found = [];
      const step = /* @__PURE__ */ __name((i2) => new Promise((resolve, reject) => {
        if (i2 === pathEnv.length)
          return opt.all && found.length ? resolve(found) : reject(getNotFoundError(cmd));
        const ppRaw = pathEnv[i2];
        const pathPart = /^".*"$/.test(ppRaw) ? ppRaw.slice(1, -1) : ppRaw;
        const pCmd = path12.join(pathPart, cmd);
        const p2 = !pathPart && /^\.[\\\/]/.test(cmd) ? cmd.slice(0, 2) + pCmd : pCmd;
        resolve(subStep(p2, i2, 0));
      }), "step");
      const subStep = /* @__PURE__ */ __name((p2, i2, ii) => new Promise((resolve, reject) => {
        if (ii === pathExt.length)
          return resolve(step(i2 + 1));
        const ext = pathExt[ii];
        isexe(p2 + ext, { pathExt: pathExtExe }, (er, is2) => {
          if (!er && is2) {
            if (opt.all)
              found.push(p2 + ext);
            else
              return resolve(p2 + ext);
          }
          return resolve(subStep(p2, i2, ii + 1));
        });
      }), "subStep");
      return cb ? step(0).then((res) => cb(null, res), cb) : step(0);
    }, "which");
    var whichSync = /* @__PURE__ */ __name((cmd, opt) => {
      opt = opt || {};
      const { pathEnv, pathExt, pathExtExe } = getPathInfo(cmd, opt);
      const found = [];
      for (let i2 = 0; i2 < pathEnv.length; i2++) {
        const ppRaw = pathEnv[i2];
        const pathPart = /^".*"$/.test(ppRaw) ? ppRaw.slice(1, -1) : ppRaw;
        const pCmd = path12.join(pathPart, cmd);
        const p2 = !pathPart && /^\.[\\\/]/.test(cmd) ? cmd.slice(0, 2) + pCmd : pCmd;
        for (let j2 = 0; j2 < pathExt.length; j2++) {
          const cur = p2 + pathExt[j2];
          try {
            const is2 = isexe.sync(cur, { pathExt: pathExtExe });
            if (is2) {
              if (opt.all)
                found.push(cur);
              else
                return cur;
            }
          } catch (ex) {
          }
        }
      }
      if (opt.all && found.length)
        return found;
      if (opt.nothrow)
        return null;
      throw getNotFoundError(cmd);
    }, "whichSync");
    module.exports = which2;
    which2.sync = whichSync;
  }
});

// ../../node_modules/.pnpm/path-key@3.1.1/node_modules/path-key/index.js
var require_path_key = __commonJS({
  "../../node_modules/.pnpm/path-key@3.1.1/node_modules/path-key/index.js"(exports, module) {
    var pathKey2 = /* @__PURE__ */ __name((options = {}) => {
      const environment = options.env || process.env;
      const platform3 = options.platform || process.platform;
      if (platform3 !== "win32") {
        return "PATH";
      }
      return Object.keys(environment).reverse().find((key) => key.toUpperCase() === "PATH") || "Path";
    }, "pathKey");
    module.exports = pathKey2;
    module.exports.default = pathKey2;
  }
});

// ../../node_modules/.pnpm/cross-spawn@7.0.6/node_modules/cross-spawn/lib/util/resolveCommand.js
var require_resolveCommand = __commonJS({
  "../../node_modules/.pnpm/cross-spawn@7.0.6/node_modules/cross-spawn/lib/util/resolveCommand.js"(exports, module) {
    var path12 = __require("path");
    var which2 = require_which();
    var getPathKey = require_path_key();
    function resolveCommandAttempt(parsed, withoutPathExt) {
      const env = parsed.options.env || process.env;
      const cwd = process.cwd();
      const hasCustomCwd = parsed.options.cwd != null;
      const shouldSwitchCwd = hasCustomCwd && process.chdir !== void 0 && !process.chdir.disabled;
      if (shouldSwitchCwd) {
        try {
          process.chdir(parsed.options.cwd);
        } catch (err) {
        }
      }
      let resolved;
      try {
        resolved = which2.sync(parsed.command, {
          path: env[getPathKey({ env })],
          pathExt: withoutPathExt ? path12.delimiter : void 0
        });
      } catch (e2) {
      } finally {
        if (shouldSwitchCwd) {
          process.chdir(cwd);
        }
      }
      if (resolved) {
        resolved = path12.resolve(hasCustomCwd ? parsed.options.cwd : "", resolved);
      }
      return resolved;
    }
    __name(resolveCommandAttempt, "resolveCommandAttempt");
    function resolveCommand2(parsed) {
      return resolveCommandAttempt(parsed) || resolveCommandAttempt(parsed, true);
    }
    __name(resolveCommand2, "resolveCommand");
    module.exports = resolveCommand2;
  }
});

// ../../node_modules/.pnpm/cross-spawn@7.0.6/node_modules/cross-spawn/lib/util/escape.js
var require_escape = __commonJS({
  "../../node_modules/.pnpm/cross-spawn@7.0.6/node_modules/cross-spawn/lib/util/escape.js"(exports, module) {
    var metaCharsRegExp = /([()\][%!^"`<>&|;, *?])/g;
    function escapeCommand(arg) {
      arg = arg.replace(metaCharsRegExp, "^$1");
      return arg;
    }
    __name(escapeCommand, "escapeCommand");
    function escapeArgument(arg, doubleEscapeMetaChars) {
      arg = `${arg}`;
      arg = arg.replace(/(?=(\\+?)?)\1"/g, '$1$1\\"');
      arg = arg.replace(/(?=(\\+?)?)\1$/, "$1$1");
      arg = `"${arg}"`;
      arg = arg.replace(metaCharsRegExp, "^$1");
      if (doubleEscapeMetaChars) {
        arg = arg.replace(metaCharsRegExp, "^$1");
      }
      return arg;
    }
    __name(escapeArgument, "escapeArgument");
    module.exports.command = escapeCommand;
    module.exports.argument = escapeArgument;
  }
});

// ../../node_modules/.pnpm/shebang-regex@3.0.0/node_modules/shebang-regex/index.js
var require_shebang_regex = __commonJS({
  "../../node_modules/.pnpm/shebang-regex@3.0.0/node_modules/shebang-regex/index.js"(exports, module) {
    module.exports = /^#!(.*)/;
  }
});

// ../../node_modules/.pnpm/shebang-command@2.0.0/node_modules/shebang-command/index.js
var require_shebang_command = __commonJS({
  "../../node_modules/.pnpm/shebang-command@2.0.0/node_modules/shebang-command/index.js"(exports, module) {
    var shebangRegex = require_shebang_regex();
    module.exports = (string = "") => {
      const match = string.match(shebangRegex);
      if (!match) {
        return null;
      }
      const [path12, argument] = match[0].replace(/#! ?/, "").split(" ");
      const binary = path12.split("/").pop();
      if (binary === "env") {
        return argument;
      }
      return argument ? `${binary} ${argument}` : binary;
    };
  }
});

// ../../node_modules/.pnpm/cross-spawn@7.0.6/node_modules/cross-spawn/lib/util/readShebang.js
var require_readShebang = __commonJS({
  "../../node_modules/.pnpm/cross-spawn@7.0.6/node_modules/cross-spawn/lib/util/readShebang.js"(exports, module) {
    var fs10 = __require("fs");
    var shebangCommand = require_shebang_command();
    function readShebang(command) {
      const size = 150;
      const buffer = Buffer.alloc(size);
      let fd;
      try {
        fd = fs10.openSync(command, "r");
        fs10.readSync(fd, buffer, 0, size, 0);
        fs10.closeSync(fd);
      } catch (e2) {
      }
      return shebangCommand(buffer.toString());
    }
    __name(readShebang, "readShebang");
    module.exports = readShebang;
  }
});

// ../../node_modules/.pnpm/cross-spawn@7.0.6/node_modules/cross-spawn/lib/parse.js
var require_parse = __commonJS({
  "../../node_modules/.pnpm/cross-spawn@7.0.6/node_modules/cross-spawn/lib/parse.js"(exports, module) {
    var path12 = __require("path");
    var resolveCommand2 = require_resolveCommand();
    var escape = require_escape();
    var readShebang = require_readShebang();
    var isWin = process.platform === "win32";
    var isExecutableRegExp = /\.(?:com|exe)$/i;
    var isCmdShimRegExp = /node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i;
    function detectShebang(parsed) {
      parsed.file = resolveCommand2(parsed);
      const shebang = parsed.file && readShebang(parsed.file);
      if (shebang) {
        parsed.args.unshift(parsed.file);
        parsed.command = shebang;
        return resolveCommand2(parsed);
      }
      return parsed.file;
    }
    __name(detectShebang, "detectShebang");
    function parseNonShell(parsed) {
      if (!isWin) {
        return parsed;
      }
      const commandFile = detectShebang(parsed);
      const needsShell = !isExecutableRegExp.test(commandFile);
      if (parsed.options.forceShell || needsShell) {
        const needsDoubleEscapeMetaChars = isCmdShimRegExp.test(commandFile);
        parsed.command = path12.normalize(parsed.command);
        parsed.command = escape.command(parsed.command);
        parsed.args = parsed.args.map((arg) => escape.argument(arg, needsDoubleEscapeMetaChars));
        const shellCommand = [parsed.command].concat(parsed.args).join(" ");
        parsed.args = ["/d", "/s", "/c", `"${shellCommand}"`];
        parsed.command = process.env.comspec || "cmd.exe";
        parsed.options.windowsVerbatimArguments = true;
      }
      return parsed;
    }
    __name(parseNonShell, "parseNonShell");
    function parse2(command, args, options) {
      if (args && !Array.isArray(args)) {
        options = args;
        args = null;
      }
      args = args ? args.slice(0) : [];
      options = Object.assign({}, options);
      const parsed = {
        command,
        args,
        options,
        file: void 0,
        original: {
          command,
          args
        }
      };
      return options.shell ? parsed : parseNonShell(parsed);
    }
    __name(parse2, "parse");
    module.exports = parse2;
  }
});

// ../../node_modules/.pnpm/cross-spawn@7.0.6/node_modules/cross-spawn/lib/enoent.js
var require_enoent = __commonJS({
  "../../node_modules/.pnpm/cross-spawn@7.0.6/node_modules/cross-spawn/lib/enoent.js"(exports, module) {
    var isWin = process.platform === "win32";
    function notFoundError(original, syscall) {
      return Object.assign(new Error(`${syscall} ${original.command} ENOENT`), {
        code: "ENOENT",
        errno: "ENOENT",
        syscall: `${syscall} ${original.command}`,
        path: original.command,
        spawnargs: original.args
      });
    }
    __name(notFoundError, "notFoundError");
    function hookChildProcess(cp, parsed) {
      if (!isWin) {
        return;
      }
      const originalEmit = cp.emit;
      cp.emit = function(name, arg1) {
        if (name === "exit") {
          const err = verifyENOENT(arg1, parsed);
          if (err) {
            return originalEmit.call(cp, "error", err);
          }
        }
        return originalEmit.apply(cp, arguments);
      };
    }
    __name(hookChildProcess, "hookChildProcess");
    function verifyENOENT(status, parsed) {
      if (isWin && status === 1 && !parsed.file) {
        return notFoundError(parsed.original, "spawn");
      }
      return null;
    }
    __name(verifyENOENT, "verifyENOENT");
    function verifyENOENTSync(status, parsed) {
      if (isWin && status === 1 && !parsed.file) {
        return notFoundError(parsed.original, "spawnSync");
      }
      return null;
    }
    __name(verifyENOENTSync, "verifyENOENTSync");
    module.exports = {
      hookChildProcess,
      verifyENOENT,
      verifyENOENTSync,
      notFoundError
    };
  }
});

// ../../node_modules/.pnpm/cross-spawn@7.0.6/node_modules/cross-spawn/index.js
var require_cross_spawn = __commonJS({
  "../../node_modules/.pnpm/cross-spawn@7.0.6/node_modules/cross-spawn/index.js"(exports, module) {
    var cp = __require("child_process");
    var parse2 = require_parse();
    var enoent = require_enoent();
    function spawn4(command, args, options) {
      const parsed = parse2(command, args, options);
      const spawned = cp.spawn(parsed.command, parsed.args, parsed.options);
      enoent.hookChildProcess(spawned, parsed);
      return spawned;
    }
    __name(spawn4, "spawn");
    function spawnSync2(command, args, options) {
      const parsed = parse2(command, args, options);
      const result = cp.spawnSync(parsed.command, parsed.args, parsed.options);
      result.error = result.error || enoent.verifyENOENTSync(result.status, parsed);
      return result;
    }
    __name(spawnSync2, "spawnSync");
    module.exports = spawn4;
    module.exports.spawn = spawn4;
    module.exports.sync = spawnSync2;
    module.exports._parse = parse2;
    module.exports._enoent = enoent;
  }
});

// ../../node_modules/.pnpm/path-key@4.0.0/node_modules/path-key/index.js
function pathKey(options = {}) {
  const {
    env = process.env,
    platform: platform3 = process.platform
  } = options;
  if (platform3 !== "win32") {
    return "PATH";
  }
  return Object.keys(env).reverse().find((key) => key.toUpperCase() === "PATH") || "Path";
}
var init_path_key = __esm({
  "../../node_modules/.pnpm/path-key@4.0.0/node_modules/path-key/index.js"() {
    __name(pathKey, "pathKey");
  }
});

// ../../node_modules/.pnpm/unicorn-magic@0.3.0/node_modules/unicorn-magic/default.js
var init_default2 = __esm({
  "../../node_modules/.pnpm/unicorn-magic@0.3.0/node_modules/unicorn-magic/default.js"() {
  }
});
function toPath(urlOrPath) {
  return urlOrPath instanceof URL ? url.fileURLToPath(urlOrPath) : urlOrPath;
}
function traversePathUp(startPath) {
  return {
    *[Symbol.iterator]() {
      let currentPath = path8__default.default.resolve(toPath(startPath));
      let previousPath;
      while (previousPath !== currentPath) {
        yield currentPath;
        previousPath = currentPath;
        currentPath = path8__default.default.resolve(currentPath, "..");
      }
    }
  };
}
var init_node = __esm({
  "../../node_modules/.pnpm/unicorn-magic@0.3.0/node_modules/unicorn-magic/node.js"() {
    init_default2();
    util.promisify(child_process.execFile);
    __name(toPath, "toPath");
    __name(traversePathUp, "traversePathUp");
  }
});
var npmRunPath, applyPreferLocal, applyExecPath, npmRunPathEnv;
var init_npm_run_path = __esm({
  "../../node_modules/.pnpm/npm-run-path@6.0.0/node_modules/npm-run-path/index.js"() {
    init_path_key();
    init_node();
    npmRunPath = /* @__PURE__ */ __name(({
      cwd = y2__default.default.cwd(),
      path: pathOption = y2__default.default.env[pathKey()],
      preferLocal = true,
      execPath: execPath2 = y2__default.default.execPath,
      addExecPath = true
    } = {}) => {
      const cwdPath = path8__default.default.resolve(toPath(cwd));
      const result = [];
      const pathParts = pathOption.split(path8__default.default.delimiter);
      if (preferLocal) {
        applyPreferLocal(result, pathParts, cwdPath);
      }
      if (addExecPath) {
        applyExecPath(result, pathParts, execPath2, cwdPath);
      }
      return pathOption === "" || pathOption === path8__default.default.delimiter ? `${result.join(path8__default.default.delimiter)}${pathOption}` : [...result, pathOption].join(path8__default.default.delimiter);
    }, "npmRunPath");
    applyPreferLocal = /* @__PURE__ */ __name((result, pathParts, cwdPath) => {
      for (const directory of traversePathUp(cwdPath)) {
        const pathPart = path8__default.default.join(directory, "node_modules/.bin");
        if (!pathParts.includes(pathPart)) {
          result.push(pathPart);
        }
      }
    }, "applyPreferLocal");
    applyExecPath = /* @__PURE__ */ __name((result, pathParts, execPath2, cwdPath) => {
      const pathPart = path8__default.default.resolve(cwdPath, toPath(execPath2), "..");
      if (!pathParts.includes(pathPart)) {
        result.push(pathPart);
      }
    }, "applyExecPath");
    npmRunPathEnv = /* @__PURE__ */ __name(({ env = y2__default.default.env, ...options } = {}) => {
      env = { ...env };
      const pathName = pathKey({ env });
      options.path = env[pathName];
      env[pathName] = npmRunPath(options);
      return env;
    }, "npmRunPathEnv");
  }
});

// ../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/return/final-error.js
var getFinalError, DiscardedError, setErrorName, isExecaError, execaErrorSymbol, isErrorInstance, ExecaError, ExecaSyncError;
var init_final_error = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/return/final-error.js"() {
    getFinalError = /* @__PURE__ */ __name((originalError, message, isSync) => {
      const ErrorClass = isSync ? ExecaSyncError : ExecaError;
      const options = originalError instanceof DiscardedError ? {} : { cause: originalError };
      return new ErrorClass(message, options);
    }, "getFinalError");
    DiscardedError = class extends Error {
      static {
        __name(this, "DiscardedError");
      }
    };
    setErrorName = /* @__PURE__ */ __name((ErrorClass, value) => {
      Object.defineProperty(ErrorClass.prototype, "name", {
        value,
        writable: true,
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(ErrorClass.prototype, execaErrorSymbol, {
        value: true,
        writable: false,
        enumerable: false,
        configurable: false
      });
    }, "setErrorName");
    isExecaError = /* @__PURE__ */ __name((error) => isErrorInstance(error) && execaErrorSymbol in error, "isExecaError");
    execaErrorSymbol = Symbol("isExecaError");
    isErrorInstance = /* @__PURE__ */ __name((value) => Object.prototype.toString.call(value) === "[object Error]", "isErrorInstance");
    ExecaError = class extends Error {
      static {
        __name(this, "ExecaError");
      }
    };
    setErrorName(ExecaError, ExecaError.name);
    ExecaSyncError = class extends Error {
      static {
        __name(this, "ExecaSyncError");
      }
    };
    setErrorName(ExecaSyncError, ExecaSyncError.name);
  }
});

// ../../node_modules/.pnpm/human-signals@8.0.1/node_modules/human-signals/build/src/realtime.js
var getRealtimeSignals, getRealtimeSignal, SIGRTMIN, SIGRTMAX;
var init_realtime = __esm({
  "../../node_modules/.pnpm/human-signals@8.0.1/node_modules/human-signals/build/src/realtime.js"() {
    getRealtimeSignals = /* @__PURE__ */ __name(() => {
      const length = SIGRTMAX - SIGRTMIN + 1;
      return Array.from({ length }, getRealtimeSignal);
    }, "getRealtimeSignals");
    getRealtimeSignal = /* @__PURE__ */ __name((value, index) => ({
      name: `SIGRT${index + 1}`,
      number: SIGRTMIN + index,
      action: "terminate",
      description: "Application-specific signal (realtime)",
      standard: "posix"
    }), "getRealtimeSignal");
    SIGRTMIN = 34;
    SIGRTMAX = 64;
  }
});

// ../../node_modules/.pnpm/human-signals@8.0.1/node_modules/human-signals/build/src/core.js
var SIGNALS;
var init_core = __esm({
  "../../node_modules/.pnpm/human-signals@8.0.1/node_modules/human-signals/build/src/core.js"() {
    SIGNALS = [
      {
        name: "SIGHUP",
        number: 1,
        action: "terminate",
        description: "Terminal closed",
        standard: "posix"
      },
      {
        name: "SIGINT",
        number: 2,
        action: "terminate",
        description: "User interruption with CTRL-C",
        standard: "ansi"
      },
      {
        name: "SIGQUIT",
        number: 3,
        action: "core",
        description: "User interruption with CTRL-\\",
        standard: "posix"
      },
      {
        name: "SIGILL",
        number: 4,
        action: "core",
        description: "Invalid machine instruction",
        standard: "ansi"
      },
      {
        name: "SIGTRAP",
        number: 5,
        action: "core",
        description: "Debugger breakpoint",
        standard: "posix"
      },
      {
        name: "SIGABRT",
        number: 6,
        action: "core",
        description: "Aborted",
        standard: "ansi"
      },
      {
        name: "SIGIOT",
        number: 6,
        action: "core",
        description: "Aborted",
        standard: "bsd"
      },
      {
        name: "SIGBUS",
        number: 7,
        action: "core",
        description: "Bus error due to misaligned, non-existing address or paging error",
        standard: "bsd"
      },
      {
        name: "SIGEMT",
        number: 7,
        action: "terminate",
        description: "Command should be emulated but is not implemented",
        standard: "other"
      },
      {
        name: "SIGFPE",
        number: 8,
        action: "core",
        description: "Floating point arithmetic error",
        standard: "ansi"
      },
      {
        name: "SIGKILL",
        number: 9,
        action: "terminate",
        description: "Forced termination",
        standard: "posix",
        forced: true
      },
      {
        name: "SIGUSR1",
        number: 10,
        action: "terminate",
        description: "Application-specific signal",
        standard: "posix"
      },
      {
        name: "SIGSEGV",
        number: 11,
        action: "core",
        description: "Segmentation fault",
        standard: "ansi"
      },
      {
        name: "SIGUSR2",
        number: 12,
        action: "terminate",
        description: "Application-specific signal",
        standard: "posix"
      },
      {
        name: "SIGPIPE",
        number: 13,
        action: "terminate",
        description: "Broken pipe or socket",
        standard: "posix"
      },
      {
        name: "SIGALRM",
        number: 14,
        action: "terminate",
        description: "Timeout or timer",
        standard: "posix"
      },
      {
        name: "SIGTERM",
        number: 15,
        action: "terminate",
        description: "Termination",
        standard: "ansi"
      },
      {
        name: "SIGSTKFLT",
        number: 16,
        action: "terminate",
        description: "Stack is empty or overflowed",
        standard: "other"
      },
      {
        name: "SIGCHLD",
        number: 17,
        action: "ignore",
        description: "Child process terminated, paused or unpaused",
        standard: "posix"
      },
      {
        name: "SIGCLD",
        number: 17,
        action: "ignore",
        description: "Child process terminated, paused or unpaused",
        standard: "other"
      },
      {
        name: "SIGCONT",
        number: 18,
        action: "unpause",
        description: "Unpaused",
        standard: "posix",
        forced: true
      },
      {
        name: "SIGSTOP",
        number: 19,
        action: "pause",
        description: "Paused",
        standard: "posix",
        forced: true
      },
      {
        name: "SIGTSTP",
        number: 20,
        action: "pause",
        description: 'Paused using CTRL-Z or "suspend"',
        standard: "posix"
      },
      {
        name: "SIGTTIN",
        number: 21,
        action: "pause",
        description: "Background process cannot read terminal input",
        standard: "posix"
      },
      {
        name: "SIGBREAK",
        number: 21,
        action: "terminate",
        description: "User interruption with CTRL-BREAK",
        standard: "other"
      },
      {
        name: "SIGTTOU",
        number: 22,
        action: "pause",
        description: "Background process cannot write to terminal output",
        standard: "posix"
      },
      {
        name: "SIGURG",
        number: 23,
        action: "ignore",
        description: "Socket received out-of-band data",
        standard: "bsd"
      },
      {
        name: "SIGXCPU",
        number: 24,
        action: "core",
        description: "Process timed out",
        standard: "bsd"
      },
      {
        name: "SIGXFSZ",
        number: 25,
        action: "core",
        description: "File too big",
        standard: "bsd"
      },
      {
        name: "SIGVTALRM",
        number: 26,
        action: "terminate",
        description: "Timeout or timer",
        standard: "bsd"
      },
      {
        name: "SIGPROF",
        number: 27,
        action: "terminate",
        description: "Timeout or timer",
        standard: "bsd"
      },
      {
        name: "SIGWINCH",
        number: 28,
        action: "ignore",
        description: "Terminal window size changed",
        standard: "bsd"
      },
      {
        name: "SIGIO",
        number: 29,
        action: "terminate",
        description: "I/O is available",
        standard: "other"
      },
      {
        name: "SIGPOLL",
        number: 29,
        action: "terminate",
        description: "Watched event",
        standard: "other"
      },
      {
        name: "SIGINFO",
        number: 29,
        action: "ignore",
        description: "Request for process information",
        standard: "other"
      },
      {
        name: "SIGPWR",
        number: 30,
        action: "terminate",
        description: "Device running out of power",
        standard: "systemv"
      },
      {
        name: "SIGSYS",
        number: 31,
        action: "core",
        description: "Invalid system call",
        standard: "other"
      },
      {
        name: "SIGUNUSED",
        number: 31,
        action: "terminate",
        description: "Invalid system call",
        standard: "other"
      }
    ];
  }
});
var getSignals, normalizeSignal;
var init_signals = __esm({
  "../../node_modules/.pnpm/human-signals@8.0.1/node_modules/human-signals/build/src/signals.js"() {
    init_core();
    init_realtime();
    getSignals = /* @__PURE__ */ __name(() => {
      const realtimeSignals = getRealtimeSignals();
      const signals2 = [...SIGNALS, ...realtimeSignals].map(normalizeSignal);
      return signals2;
    }, "getSignals");
    normalizeSignal = /* @__PURE__ */ __name(({
      name,
      number: defaultNumber,
      description,
      action,
      forced = false,
      standard
    }) => {
      const {
        signals: { [name]: constantSignal }
      } = os2.constants;
      const supported = constantSignal !== void 0;
      const number = supported ? constantSignal : defaultNumber;
      return { name, number, description, supported, action, forced, standard };
    }, "normalizeSignal");
  }
});
var getSignalsByName, getSignalByName, signalsByName, getSignalsByNumber, getSignalByNumber, findSignalByNumber;
var init_main = __esm({
  "../../node_modules/.pnpm/human-signals@8.0.1/node_modules/human-signals/build/src/main.js"() {
    init_realtime();
    init_signals();
    getSignalsByName = /* @__PURE__ */ __name(() => {
      const signals2 = getSignals();
      return Object.fromEntries(signals2.map(getSignalByName));
    }, "getSignalsByName");
    getSignalByName = /* @__PURE__ */ __name(({
      name,
      number,
      description,
      supported,
      action,
      forced,
      standard
    }) => [name, { name, number, description, supported, action, forced, standard }], "getSignalByName");
    signalsByName = getSignalsByName();
    getSignalsByNumber = /* @__PURE__ */ __name(() => {
      const signals2 = getSignals();
      const length = SIGRTMAX + 1;
      const signalsA = Array.from(
        { length },
        (value, number) => getSignalByNumber(number, signals2)
      );
      return Object.assign({}, ...signalsA);
    }, "getSignalsByNumber");
    getSignalByNumber = /* @__PURE__ */ __name((number, signals2) => {
      const signal = findSignalByNumber(number, signals2);
      if (signal === void 0) {
        return {};
      }
      const { name, description, supported, action, forced, standard } = signal;
      return {
        [number]: {
          name,
          number,
          description,
          supported,
          action,
          forced,
          standard
        }
      };
    }, "getSignalByNumber");
    findSignalByNumber = /* @__PURE__ */ __name((number, signals2) => {
      const signal = signals2.find(({ name }) => os2.constants.signals[name] === number);
      if (signal !== void 0) {
        return signal;
      }
      return signals2.find((signalA) => signalA.number === number);
    }, "findSignalByNumber");
    getSignalsByNumber();
  }
});
var normalizeKillSignal, normalizeSignalArgument, normalizeSignal2, normalizeSignalInteger, getSignalsIntegerToName, signalsIntegerToName, normalizeSignalName, getAvailableSignals, getAvailableSignalNames, getAvailableSignalIntegers, getSignalDescription;
var init_signal = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/terminate/signal.js"() {
    init_main();
    normalizeKillSignal = /* @__PURE__ */ __name((killSignal) => {
      const optionName = "option `killSignal`";
      if (killSignal === 0) {
        throw new TypeError(`Invalid ${optionName}: 0 cannot be used.`);
      }
      return normalizeSignal2(killSignal, optionName);
    }, "normalizeKillSignal");
    normalizeSignalArgument = /* @__PURE__ */ __name((signal) => signal === 0 ? signal : normalizeSignal2(signal, "`subprocess.kill()`'s argument"), "normalizeSignalArgument");
    normalizeSignal2 = /* @__PURE__ */ __name((signalNameOrInteger, optionName) => {
      if (Number.isInteger(signalNameOrInteger)) {
        return normalizeSignalInteger(signalNameOrInteger, optionName);
      }
      if (typeof signalNameOrInteger === "string") {
        return normalizeSignalName(signalNameOrInteger, optionName);
      }
      throw new TypeError(`Invalid ${optionName} ${String(signalNameOrInteger)}: it must be a string or an integer.
${getAvailableSignals()}`);
    }, "normalizeSignal");
    normalizeSignalInteger = /* @__PURE__ */ __name((signalInteger, optionName) => {
      if (signalsIntegerToName.has(signalInteger)) {
        return signalsIntegerToName.get(signalInteger);
      }
      throw new TypeError(`Invalid ${optionName} ${signalInteger}: this signal integer does not exist.
${getAvailableSignals()}`);
    }, "normalizeSignalInteger");
    getSignalsIntegerToName = /* @__PURE__ */ __name(() => new Map(Object.entries(os2.constants.signals).reverse().map(([signalName, signalInteger]) => [signalInteger, signalName])), "getSignalsIntegerToName");
    signalsIntegerToName = getSignalsIntegerToName();
    normalizeSignalName = /* @__PURE__ */ __name((signalName, optionName) => {
      if (signalName in os2.constants.signals) {
        return signalName;
      }
      if (signalName.toUpperCase() in os2.constants.signals) {
        throw new TypeError(`Invalid ${optionName} '${signalName}': please rename it to '${signalName.toUpperCase()}'.`);
      }
      throw new TypeError(`Invalid ${optionName} '${signalName}': this signal name does not exist.
${getAvailableSignals()}`);
    }, "normalizeSignalName");
    getAvailableSignals = /* @__PURE__ */ __name(() => `Available signal names: ${getAvailableSignalNames()}.
Available signal numbers: ${getAvailableSignalIntegers()}.`, "getAvailableSignals");
    getAvailableSignalNames = /* @__PURE__ */ __name(() => Object.keys(os2.constants.signals).sort().map((signalName) => `'${signalName}'`).join(", "), "getAvailableSignalNames");
    getAvailableSignalIntegers = /* @__PURE__ */ __name(() => [...new Set(Object.values(os2.constants.signals).sort((signalInteger, signalIntegerTwo) => signalInteger - signalIntegerTwo))].join(", "), "getAvailableSignalIntegers");
    getSignalDescription = /* @__PURE__ */ __name((signal) => signalsByName[signal].description, "getSignalDescription");
  }
});
var normalizeForceKillAfterDelay, DEFAULT_FORCE_KILL_TIMEOUT, subprocessKill, parseKillArguments, emitKillError, setKillTimeout, killOnTimeout;
var init_kill = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/terminate/kill.js"() {
    init_final_error();
    init_signal();
    normalizeForceKillAfterDelay = /* @__PURE__ */ __name((forceKillAfterDelay) => {
      if (forceKillAfterDelay === false) {
        return forceKillAfterDelay;
      }
      if (forceKillAfterDelay === true) {
        return DEFAULT_FORCE_KILL_TIMEOUT;
      }
      if (!Number.isFinite(forceKillAfterDelay) || forceKillAfterDelay < 0) {
        throw new TypeError(`Expected the \`forceKillAfterDelay\` option to be a non-negative integer, got \`${forceKillAfterDelay}\` (${typeof forceKillAfterDelay})`);
      }
      return forceKillAfterDelay;
    }, "normalizeForceKillAfterDelay");
    DEFAULT_FORCE_KILL_TIMEOUT = 1e3 * 5;
    subprocessKill = /* @__PURE__ */ __name(({ kill, options: { forceKillAfterDelay, killSignal }, onInternalError, context, controller }, signalOrError, errorArgument) => {
      const { signal, error } = parseKillArguments(signalOrError, errorArgument, killSignal);
      emitKillError(error, onInternalError);
      const killResult = kill(signal);
      setKillTimeout({
        kill,
        signal,
        forceKillAfterDelay,
        killSignal,
        killResult,
        context,
        controller
      });
      return killResult;
    }, "subprocessKill");
    parseKillArguments = /* @__PURE__ */ __name((signalOrError, errorArgument, killSignal) => {
      const [signal = killSignal, error] = isErrorInstance(signalOrError) ? [void 0, signalOrError] : [signalOrError, errorArgument];
      if (typeof signal !== "string" && !Number.isInteger(signal)) {
        throw new TypeError(`The first argument must be an error instance or a signal name string/integer: ${String(signal)}`);
      }
      if (error !== void 0 && !isErrorInstance(error)) {
        throw new TypeError(`The second argument is optional. If specified, it must be an error instance: ${error}`);
      }
      return { signal: normalizeSignalArgument(signal), error };
    }, "parseKillArguments");
    emitKillError = /* @__PURE__ */ __name((error, onInternalError) => {
      if (error !== void 0) {
        onInternalError.reject(error);
      }
    }, "emitKillError");
    setKillTimeout = /* @__PURE__ */ __name(async ({ kill, signal, forceKillAfterDelay, killSignal, killResult, context, controller }) => {
      if (signal === killSignal && killResult) {
        killOnTimeout({
          kill,
          forceKillAfterDelay,
          context,
          controllerSignal: controller.signal
        });
      }
    }, "setKillTimeout");
    killOnTimeout = /* @__PURE__ */ __name(async ({ kill, forceKillAfterDelay, context, controllerSignal }) => {
      if (forceKillAfterDelay === false) {
        return;
      }
      try {
        await promises.setTimeout(forceKillAfterDelay, void 0, { signal: controllerSignal });
        if (kill("SIGKILL")) {
          context.isForcefullyTerminated ??= true;
        }
      } catch {
      }
    }, "killOnTimeout");
  }
});
var onAbortedSignal;
var init_abort_signal = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/utils/abort-signal.js"() {
    onAbortedSignal = /* @__PURE__ */ __name(async (mainSignal, stopSignal) => {
      if (!mainSignal.aborted) {
        await events.once(mainSignal, "abort", { signal: stopSignal });
      }
    }, "onAbortedSignal");
  }
});

// ../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/terminate/cancel.js
var validateCancelSignal, throwOnCancel, terminateOnCancel;
var init_cancel = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/terminate/cancel.js"() {
    init_abort_signal();
    validateCancelSignal = /* @__PURE__ */ __name(({ cancelSignal }) => {
      if (cancelSignal !== void 0 && Object.prototype.toString.call(cancelSignal) !== "[object AbortSignal]") {
        throw new Error(`The \`cancelSignal\` option must be an AbortSignal: ${String(cancelSignal)}`);
      }
    }, "validateCancelSignal");
    throwOnCancel = /* @__PURE__ */ __name(({ subprocess, cancelSignal, gracefulCancel, context, controller }) => cancelSignal === void 0 || gracefulCancel ? [] : [terminateOnCancel(subprocess, cancelSignal, context, controller)], "throwOnCancel");
    terminateOnCancel = /* @__PURE__ */ __name(async (subprocess, cancelSignal, context, { signal }) => {
      await onAbortedSignal(cancelSignal, signal);
      context.terminationReason ??= "cancel";
      subprocess.kill();
      throw cancelSignal.reason;
    }, "terminateOnCancel");
  }
});

// ../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/ipc/validation.js
var validateIpcMethod, validateIpcOption, validateConnection, throwOnEarlyDisconnect, throwOnStrictDeadlockError, getStrictResponseError, throwOnMissingStrict, throwOnStrictDisconnect, getAbortDisconnectError, throwOnMissingParent, handleEpipeError, handleSerializationError, isSerializationError, SERIALIZATION_ERROR_CODES, SERIALIZATION_ERROR_MESSAGES, getMethodName, getNamespaceName, getOtherProcessName, disconnect;
var init_validation = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/ipc/validation.js"() {
    validateIpcMethod = /* @__PURE__ */ __name(({ methodName, isSubprocess, ipc, isConnected: isConnected2 }) => {
      validateIpcOption(methodName, isSubprocess, ipc);
      validateConnection(methodName, isSubprocess, isConnected2);
    }, "validateIpcMethod");
    validateIpcOption = /* @__PURE__ */ __name((methodName, isSubprocess, ipc) => {
      if (!ipc) {
        throw new Error(`${getMethodName(methodName, isSubprocess)} can only be used if the \`ipc\` option is \`true\`.`);
      }
    }, "validateIpcOption");
    validateConnection = /* @__PURE__ */ __name((methodName, isSubprocess, isConnected2) => {
      if (!isConnected2) {
        throw new Error(`${getMethodName(methodName, isSubprocess)} cannot be used: the ${getOtherProcessName(isSubprocess)} has already exited or disconnected.`);
      }
    }, "validateConnection");
    throwOnEarlyDisconnect = /* @__PURE__ */ __name((isSubprocess) => {
      throw new Error(`${getMethodName("getOneMessage", isSubprocess)} could not complete: the ${getOtherProcessName(isSubprocess)} exited or disconnected.`);
    }, "throwOnEarlyDisconnect");
    throwOnStrictDeadlockError = /* @__PURE__ */ __name((isSubprocess) => {
      throw new Error(`${getMethodName("sendMessage", isSubprocess)} failed: the ${getOtherProcessName(isSubprocess)} is sending a message too, instead of listening to incoming messages.
This can be fixed by both sending a message and listening to incoming messages at the same time:

const [receivedMessage] = await Promise.all([
	${getMethodName("getOneMessage", isSubprocess)},
	${getMethodName("sendMessage", isSubprocess, "message, {strict: true}")},
]);`);
    }, "throwOnStrictDeadlockError");
    getStrictResponseError = /* @__PURE__ */ __name((error, isSubprocess) => new Error(`${getMethodName("sendMessage", isSubprocess)} failed when sending an acknowledgment response to the ${getOtherProcessName(isSubprocess)}.`, { cause: error }), "getStrictResponseError");
    throwOnMissingStrict = /* @__PURE__ */ __name((isSubprocess) => {
      throw new Error(`${getMethodName("sendMessage", isSubprocess)} failed: the ${getOtherProcessName(isSubprocess)} is not listening to incoming messages.`);
    }, "throwOnMissingStrict");
    throwOnStrictDisconnect = /* @__PURE__ */ __name((isSubprocess) => {
      throw new Error(`${getMethodName("sendMessage", isSubprocess)} failed: the ${getOtherProcessName(isSubprocess)} exited without listening to incoming messages.`);
    }, "throwOnStrictDisconnect");
    getAbortDisconnectError = /* @__PURE__ */ __name(() => new Error(`\`cancelSignal\` aborted: the ${getOtherProcessName(true)} disconnected.`), "getAbortDisconnectError");
    throwOnMissingParent = /* @__PURE__ */ __name(() => {
      throw new Error("`getCancelSignal()` cannot be used without setting the `cancelSignal` subprocess option.");
    }, "throwOnMissingParent");
    handleEpipeError = /* @__PURE__ */ __name(({ error, methodName, isSubprocess }) => {
      if (error.code === "EPIPE") {
        throw new Error(`${getMethodName(methodName, isSubprocess)} cannot be used: the ${getOtherProcessName(isSubprocess)} is disconnecting.`, { cause: error });
      }
    }, "handleEpipeError");
    handleSerializationError = /* @__PURE__ */ __name(({ error, methodName, isSubprocess, message }) => {
      if (isSerializationError(error)) {
        throw new Error(`${getMethodName(methodName, isSubprocess)}'s argument type is invalid: the message cannot be serialized: ${String(message)}.`, { cause: error });
      }
    }, "handleSerializationError");
    isSerializationError = /* @__PURE__ */ __name(({ code, message }) => SERIALIZATION_ERROR_CODES.has(code) || SERIALIZATION_ERROR_MESSAGES.some((serializationErrorMessage) => message.includes(serializationErrorMessage)), "isSerializationError");
    SERIALIZATION_ERROR_CODES = /* @__PURE__ */ new Set([
      // Message is `undefined`
      "ERR_MISSING_ARGS",
      // Message is a function, a bigint, a symbol
      "ERR_INVALID_ARG_TYPE"
    ]);
    SERIALIZATION_ERROR_MESSAGES = [
      // Message is a promise or a proxy, with `serialization: 'advanced'`
      "could not be cloned",
      // Message has cycles, with `serialization: 'json'`
      "circular structure",
      // Message has cycles inside toJSON(), with `serialization: 'json'`
      "call stack size exceeded"
    ];
    getMethodName = /* @__PURE__ */ __name((methodName, isSubprocess, parameters = "") => methodName === "cancelSignal" ? "`cancelSignal`'s `controller.abort()`" : `${getNamespaceName(isSubprocess)}${methodName}(${parameters})`, "getMethodName");
    getNamespaceName = /* @__PURE__ */ __name((isSubprocess) => isSubprocess ? "" : "subprocess.", "getNamespaceName");
    getOtherProcessName = /* @__PURE__ */ __name((isSubprocess) => isSubprocess ? "parent process" : "subprocess", "getOtherProcessName");
    disconnect = /* @__PURE__ */ __name((anyProcess) => {
      if (anyProcess.connected) {
        anyProcess.disconnect();
      }
    }, "disconnect");
  }
});

// ../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/utils/deferred.js
var createDeferred;
var init_deferred = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/utils/deferred.js"() {
    createDeferred = /* @__PURE__ */ __name(() => {
      const methods = {};
      const promise = new Promise((resolve, reject) => {
        Object.assign(methods, { resolve, reject });
      });
      return Object.assign(promise, methods);
    }, "createDeferred");
  }
});

// ../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/arguments/fd-options.js
var getToStream, getFromStream, SUBPROCESS_OPTIONS, getFdNumber, parseFdNumber, validateFdNumber, getInvalidStdioOptionMessage, getInvalidStdioOption, getUsedDescriptor, getOptionName, serializeOptionValue;
var init_fd_options = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/arguments/fd-options.js"() {
    init_specific();
    getToStream = /* @__PURE__ */ __name((destination, to = "stdin") => {
      const isWritable = true;
      const { options, fileDescriptors } = SUBPROCESS_OPTIONS.get(destination);
      const fdNumber = getFdNumber(fileDescriptors, to, isWritable);
      const destinationStream = destination.stdio[fdNumber];
      if (destinationStream === null) {
        throw new TypeError(getInvalidStdioOptionMessage(fdNumber, to, options, isWritable));
      }
      return destinationStream;
    }, "getToStream");
    getFromStream = /* @__PURE__ */ __name((source, from = "stdout") => {
      const isWritable = false;
      const { options, fileDescriptors } = SUBPROCESS_OPTIONS.get(source);
      const fdNumber = getFdNumber(fileDescriptors, from, isWritable);
      const sourceStream = fdNumber === "all" ? source.all : source.stdio[fdNumber];
      if (sourceStream === null || sourceStream === void 0) {
        throw new TypeError(getInvalidStdioOptionMessage(fdNumber, from, options, isWritable));
      }
      return sourceStream;
    }, "getFromStream");
    SUBPROCESS_OPTIONS = /* @__PURE__ */ new WeakMap();
    getFdNumber = /* @__PURE__ */ __name((fileDescriptors, fdName, isWritable) => {
      const fdNumber = parseFdNumber(fdName, isWritable);
      validateFdNumber(fdNumber, fdName, isWritable, fileDescriptors);
      return fdNumber;
    }, "getFdNumber");
    parseFdNumber = /* @__PURE__ */ __name((fdName, isWritable) => {
      const fdNumber = parseFd(fdName);
      if (fdNumber !== void 0) {
        return fdNumber;
      }
      const { validOptions, defaultValue } = isWritable ? { validOptions: '"stdin"', defaultValue: "stdin" } : { validOptions: '"stdout", "stderr", "all"', defaultValue: "stdout" };
      throw new TypeError(`"${getOptionName(isWritable)}" must not be "${fdName}".
It must be ${validOptions} or "fd3", "fd4" (and so on).
It is optional and defaults to "${defaultValue}".`);
    }, "parseFdNumber");
    validateFdNumber = /* @__PURE__ */ __name((fdNumber, fdName, isWritable, fileDescriptors) => {
      const fileDescriptor = fileDescriptors[getUsedDescriptor(fdNumber)];
      if (fileDescriptor === void 0) {
        throw new TypeError(`"${getOptionName(isWritable)}" must not be ${fdName}. That file descriptor does not exist.
Please set the "stdio" option to ensure that file descriptor exists.`);
      }
      if (fileDescriptor.direction === "input" && !isWritable) {
        throw new TypeError(`"${getOptionName(isWritable)}" must not be ${fdName}. It must be a readable stream, not writable.`);
      }
      if (fileDescriptor.direction !== "input" && isWritable) {
        throw new TypeError(`"${getOptionName(isWritable)}" must not be ${fdName}. It must be a writable stream, not readable.`);
      }
    }, "validateFdNumber");
    getInvalidStdioOptionMessage = /* @__PURE__ */ __name((fdNumber, fdName, options, isWritable) => {
      if (fdNumber === "all" && !options.all) {
        return `The "all" option must be true to use "from: 'all'".`;
      }
      const { optionName, optionValue } = getInvalidStdioOption(fdNumber, options);
      return `The "${optionName}: ${serializeOptionValue(optionValue)}" option is incompatible with using "${getOptionName(isWritable)}: ${serializeOptionValue(fdName)}".
Please set this option with "pipe" instead.`;
    }, "getInvalidStdioOptionMessage");
    getInvalidStdioOption = /* @__PURE__ */ __name((fdNumber, { stdin, stdout, stderr, stdio }) => {
      const usedDescriptor = getUsedDescriptor(fdNumber);
      if (usedDescriptor === 0 && stdin !== void 0) {
        return { optionName: "stdin", optionValue: stdin };
      }
      if (usedDescriptor === 1 && stdout !== void 0) {
        return { optionName: "stdout", optionValue: stdout };
      }
      if (usedDescriptor === 2 && stderr !== void 0) {
        return { optionName: "stderr", optionValue: stderr };
      }
      return { optionName: `stdio[${usedDescriptor}]`, optionValue: stdio[usedDescriptor] };
    }, "getInvalidStdioOption");
    getUsedDescriptor = /* @__PURE__ */ __name((fdNumber) => fdNumber === "all" ? 1 : fdNumber, "getUsedDescriptor");
    getOptionName = /* @__PURE__ */ __name((isWritable) => isWritable ? "to" : "from", "getOptionName");
    serializeOptionValue = /* @__PURE__ */ __name((value) => {
      if (typeof value === "string") {
        return `'${value}'`;
      }
      return typeof value === "number" ? `${value}` : "Stream";
    }, "serializeOptionValue");
  }
});
var incrementMaxListeners;
var init_max_listeners = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/utils/max-listeners.js"() {
    incrementMaxListeners = /* @__PURE__ */ __name((eventEmitter, maxListenersIncrement, signal) => {
      const maxListeners = eventEmitter.getMaxListeners();
      if (maxListeners === 0 || maxListeners === Number.POSITIVE_INFINITY) {
        return;
      }
      eventEmitter.setMaxListeners(maxListeners + maxListenersIncrement);
      events.addAbortListener(signal, () => {
        eventEmitter.setMaxListeners(eventEmitter.getMaxListeners() - maxListenersIncrement);
      });
    }, "incrementMaxListeners");
  }
});

// ../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/ipc/reference.js
var addReference, addReferenceCount, removeReference, removeReferenceCount, undoAddedReferences, redoAddedReferences;
var init_reference = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/ipc/reference.js"() {
    addReference = /* @__PURE__ */ __name((channel, reference) => {
      if (reference) {
        addReferenceCount(channel);
      }
    }, "addReference");
    addReferenceCount = /* @__PURE__ */ __name((channel) => {
      channel.refCounted();
    }, "addReferenceCount");
    removeReference = /* @__PURE__ */ __name((channel, reference) => {
      if (reference) {
        removeReferenceCount(channel);
      }
    }, "removeReference");
    removeReferenceCount = /* @__PURE__ */ __name((channel) => {
      channel.unrefCounted();
    }, "removeReferenceCount");
    undoAddedReferences = /* @__PURE__ */ __name((channel, isSubprocess) => {
      if (isSubprocess) {
        removeReferenceCount(channel);
        removeReferenceCount(channel);
      }
    }, "undoAddedReferences");
    redoAddedReferences = /* @__PURE__ */ __name((channel, isSubprocess) => {
      if (isSubprocess) {
        addReferenceCount(channel);
        addReferenceCount(channel);
      }
    }, "redoAddedReferences");
  }
});
var onMessage, onDisconnect, INCOMING_MESSAGES;
var init_incoming = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/ipc/incoming.js"() {
    init_outgoing();
    init_reference();
    init_strict();
    init_graceful();
    onMessage = /* @__PURE__ */ __name(async ({ anyProcess, channel, isSubprocess, ipcEmitter }, wrappedMessage) => {
      if (handleStrictResponse(wrappedMessage) || handleAbort(wrappedMessage)) {
        return;
      }
      if (!INCOMING_MESSAGES.has(anyProcess)) {
        INCOMING_MESSAGES.set(anyProcess, []);
      }
      const incomingMessages = INCOMING_MESSAGES.get(anyProcess);
      incomingMessages.push(wrappedMessage);
      if (incomingMessages.length > 1) {
        return;
      }
      while (incomingMessages.length > 0) {
        await waitForOutgoingMessages(anyProcess, ipcEmitter, wrappedMessage);
        await promises.scheduler.yield();
        const message = await handleStrictRequest({
          wrappedMessage: incomingMessages[0],
          anyProcess,
          channel,
          isSubprocess,
          ipcEmitter
        });
        incomingMessages.shift();
        ipcEmitter.emit("message", message);
        ipcEmitter.emit("message:done");
      }
    }, "onMessage");
    onDisconnect = /* @__PURE__ */ __name(async ({ anyProcess, channel, isSubprocess, ipcEmitter, boundOnMessage }) => {
      abortOnDisconnect();
      const incomingMessages = INCOMING_MESSAGES.get(anyProcess);
      while (incomingMessages?.length > 0) {
        await events.once(ipcEmitter, "message:done");
      }
      anyProcess.removeListener("message", boundOnMessage);
      redoAddedReferences(channel, isSubprocess);
      ipcEmitter.connected = false;
      ipcEmitter.emit("disconnect");
    }, "onDisconnect");
    INCOMING_MESSAGES = /* @__PURE__ */ new WeakMap();
  }
});
var getIpcEmitter, IPC_EMITTERS, forwardEvents, isConnected;
var init_forward = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/ipc/forward.js"() {
    init_incoming();
    init_reference();
    getIpcEmitter = /* @__PURE__ */ __name((anyProcess, channel, isSubprocess) => {
      if (IPC_EMITTERS.has(anyProcess)) {
        return IPC_EMITTERS.get(anyProcess);
      }
      const ipcEmitter = new events.EventEmitter();
      ipcEmitter.connected = true;
      IPC_EMITTERS.set(anyProcess, ipcEmitter);
      forwardEvents({
        ipcEmitter,
        anyProcess,
        channel,
        isSubprocess
      });
      return ipcEmitter;
    }, "getIpcEmitter");
    IPC_EMITTERS = /* @__PURE__ */ new WeakMap();
    forwardEvents = /* @__PURE__ */ __name(({ ipcEmitter, anyProcess, channel, isSubprocess }) => {
      const boundOnMessage = onMessage.bind(void 0, {
        anyProcess,
        channel,
        isSubprocess,
        ipcEmitter
      });
      anyProcess.on("message", boundOnMessage);
      anyProcess.once("disconnect", onDisconnect.bind(void 0, {
        anyProcess,
        channel,
        isSubprocess,
        ipcEmitter,
        boundOnMessage
      }));
      undoAddedReferences(channel, isSubprocess);
    }, "forwardEvents");
    isConnected = /* @__PURE__ */ __name((anyProcess) => {
      const ipcEmitter = IPC_EMITTERS.get(anyProcess);
      return ipcEmitter === void 0 ? anyProcess.channel !== null : ipcEmitter.connected;
    }, "isConnected");
  }
});
var handleSendStrict, count, validateStrictDeadlock, handleStrictRequest, handleStrictResponse, waitForStrictResponse, STRICT_RESPONSES, throwOnDisconnect, REQUEST_TYPE, RESPONSE_TYPE;
var init_strict = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/ipc/strict.js"() {
    init_deferred();
    init_max_listeners();
    init_send();
    init_validation();
    init_forward();
    init_outgoing();
    handleSendStrict = /* @__PURE__ */ __name(({ anyProcess, channel, isSubprocess, message, strict }) => {
      if (!strict) {
        return message;
      }
      const ipcEmitter = getIpcEmitter(anyProcess, channel, isSubprocess);
      const hasListeners = hasMessageListeners(anyProcess, ipcEmitter);
      return {
        id: count++,
        type: REQUEST_TYPE,
        message,
        hasListeners
      };
    }, "handleSendStrict");
    count = 0n;
    validateStrictDeadlock = /* @__PURE__ */ __name((outgoingMessages, wrappedMessage) => {
      if (wrappedMessage?.type !== REQUEST_TYPE || wrappedMessage.hasListeners) {
        return;
      }
      for (const { id } of outgoingMessages) {
        if (id !== void 0) {
          STRICT_RESPONSES[id].resolve({ isDeadlock: true, hasListeners: false });
        }
      }
    }, "validateStrictDeadlock");
    handleStrictRequest = /* @__PURE__ */ __name(async ({ wrappedMessage, anyProcess, channel, isSubprocess, ipcEmitter }) => {
      if (wrappedMessage?.type !== REQUEST_TYPE || !anyProcess.connected) {
        return wrappedMessage;
      }
      const { id, message } = wrappedMessage;
      const response = { id, type: RESPONSE_TYPE, message: hasMessageListeners(anyProcess, ipcEmitter) };
      try {
        await sendMessage({
          anyProcess,
          channel,
          isSubprocess,
          ipc: true
        }, response);
      } catch (error) {
        ipcEmitter.emit("strict:error", error);
      }
      return message;
    }, "handleStrictRequest");
    handleStrictResponse = /* @__PURE__ */ __name((wrappedMessage) => {
      if (wrappedMessage?.type !== RESPONSE_TYPE) {
        return false;
      }
      const { id, message: hasListeners } = wrappedMessage;
      STRICT_RESPONSES[id]?.resolve({ isDeadlock: false, hasListeners });
      return true;
    }, "handleStrictResponse");
    waitForStrictResponse = /* @__PURE__ */ __name(async (wrappedMessage, anyProcess, isSubprocess) => {
      if (wrappedMessage?.type !== REQUEST_TYPE) {
        return;
      }
      const deferred = createDeferred();
      STRICT_RESPONSES[wrappedMessage.id] = deferred;
      const controller = new AbortController();
      try {
        const { isDeadlock, hasListeners } = await Promise.race([
          deferred,
          throwOnDisconnect(anyProcess, isSubprocess, controller)
        ]);
        if (isDeadlock) {
          throwOnStrictDeadlockError(isSubprocess);
        }
        if (!hasListeners) {
          throwOnMissingStrict(isSubprocess);
        }
      } finally {
        controller.abort();
        delete STRICT_RESPONSES[wrappedMessage.id];
      }
    }, "waitForStrictResponse");
    STRICT_RESPONSES = {};
    throwOnDisconnect = /* @__PURE__ */ __name(async (anyProcess, isSubprocess, { signal }) => {
      incrementMaxListeners(anyProcess, 1, signal);
      await events.once(anyProcess, "disconnect", { signal });
      throwOnStrictDisconnect(isSubprocess);
    }, "throwOnDisconnect");
    REQUEST_TYPE = "execa:ipc:request";
    RESPONSE_TYPE = "execa:ipc:response";
  }
});

// ../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/ipc/outgoing.js
var startSendMessage, endSendMessage, waitForOutgoingMessages, OUTGOING_MESSAGES, hasMessageListeners, getMinListenerCount;
var init_outgoing = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/ipc/outgoing.js"() {
    init_deferred();
    init_specific();
    init_fd_options();
    init_strict();
    startSendMessage = /* @__PURE__ */ __name((anyProcess, wrappedMessage, strict) => {
      if (!OUTGOING_MESSAGES.has(anyProcess)) {
        OUTGOING_MESSAGES.set(anyProcess, /* @__PURE__ */ new Set());
      }
      const outgoingMessages = OUTGOING_MESSAGES.get(anyProcess);
      const onMessageSent = createDeferred();
      const id = strict ? wrappedMessage.id : void 0;
      const outgoingMessage = { onMessageSent, id };
      outgoingMessages.add(outgoingMessage);
      return { outgoingMessages, outgoingMessage };
    }, "startSendMessage");
    endSendMessage = /* @__PURE__ */ __name(({ outgoingMessages, outgoingMessage }) => {
      outgoingMessages.delete(outgoingMessage);
      outgoingMessage.onMessageSent.resolve();
    }, "endSendMessage");
    waitForOutgoingMessages = /* @__PURE__ */ __name(async (anyProcess, ipcEmitter, wrappedMessage) => {
      while (!hasMessageListeners(anyProcess, ipcEmitter) && OUTGOING_MESSAGES.get(anyProcess)?.size > 0) {
        const outgoingMessages = [...OUTGOING_MESSAGES.get(anyProcess)];
        validateStrictDeadlock(outgoingMessages, wrappedMessage);
        await Promise.all(outgoingMessages.map(({ onMessageSent }) => onMessageSent));
      }
    }, "waitForOutgoingMessages");
    OUTGOING_MESSAGES = /* @__PURE__ */ new WeakMap();
    hasMessageListeners = /* @__PURE__ */ __name((anyProcess, ipcEmitter) => ipcEmitter.listenerCount("message") > getMinListenerCount(anyProcess), "hasMessageListeners");
    getMinListenerCount = /* @__PURE__ */ __name((anyProcess) => SUBPROCESS_OPTIONS.has(anyProcess) && !getFdSpecificValue(SUBPROCESS_OPTIONS.get(anyProcess).options.buffer, "ipc") ? 1 : 0, "getMinListenerCount");
  }
});
var sendMessage, sendMessageAsync, sendOneMessage, getSendMethod, PROCESS_SEND_METHODS;
var init_send = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/ipc/send.js"() {
    init_validation();
    init_outgoing();
    init_strict();
    sendMessage = /* @__PURE__ */ __name(({ anyProcess, channel, isSubprocess, ipc }, message, { strict = false } = {}) => {
      const methodName = "sendMessage";
      validateIpcMethod({
        methodName,
        isSubprocess,
        ipc,
        isConnected: anyProcess.connected
      });
      return sendMessageAsync({
        anyProcess,
        channel,
        methodName,
        isSubprocess,
        message,
        strict
      });
    }, "sendMessage");
    sendMessageAsync = /* @__PURE__ */ __name(async ({ anyProcess, channel, methodName, isSubprocess, message, strict }) => {
      const wrappedMessage = handleSendStrict({
        anyProcess,
        channel,
        isSubprocess,
        message,
        strict
      });
      const outgoingMessagesState = startSendMessage(anyProcess, wrappedMessage, strict);
      try {
        await sendOneMessage({
          anyProcess,
          methodName,
          isSubprocess,
          wrappedMessage,
          message
        });
      } catch (error) {
        disconnect(anyProcess);
        throw error;
      } finally {
        endSendMessage(outgoingMessagesState);
      }
    }, "sendMessageAsync");
    sendOneMessage = /* @__PURE__ */ __name(async ({ anyProcess, methodName, isSubprocess, wrappedMessage, message }) => {
      const sendMethod = getSendMethod(anyProcess);
      try {
        await Promise.all([
          waitForStrictResponse(wrappedMessage, anyProcess, isSubprocess),
          sendMethod(wrappedMessage)
        ]);
      } catch (error) {
        handleEpipeError({ error, methodName, isSubprocess });
        handleSerializationError({
          error,
          methodName,
          isSubprocess,
          message
        });
        throw error;
      }
    }, "sendOneMessage");
    getSendMethod = /* @__PURE__ */ __name((anyProcess) => {
      if (PROCESS_SEND_METHODS.has(anyProcess)) {
        return PROCESS_SEND_METHODS.get(anyProcess);
      }
      const sendMethod = util.promisify(anyProcess.send.bind(anyProcess));
      PROCESS_SEND_METHODS.set(anyProcess, sendMethod);
      return sendMethod;
    }, "getSendMethod");
    PROCESS_SEND_METHODS = /* @__PURE__ */ new WeakMap();
  }
});
var sendAbort, getCancelSignal, startIpc, cancelListening, handleAbort, GRACEFUL_CANCEL_TYPE, abortOnDisconnect, cancelController;
var init_graceful = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/ipc/graceful.js"() {
    init_send();
    init_forward();
    init_validation();
    sendAbort = /* @__PURE__ */ __name((subprocess, message) => {
      const methodName = "cancelSignal";
      validateConnection(methodName, false, subprocess.connected);
      return sendOneMessage({
        anyProcess: subprocess,
        methodName,
        isSubprocess: false,
        wrappedMessage: { type: GRACEFUL_CANCEL_TYPE, message },
        message
      });
    }, "sendAbort");
    getCancelSignal = /* @__PURE__ */ __name(async ({ anyProcess, channel, isSubprocess, ipc }) => {
      await startIpc({
        anyProcess,
        channel,
        isSubprocess,
        ipc
      });
      return cancelController.signal;
    }, "getCancelSignal");
    startIpc = /* @__PURE__ */ __name(async ({ anyProcess, channel, isSubprocess, ipc }) => {
      if (cancelListening) {
        return;
      }
      cancelListening = true;
      if (!ipc) {
        throwOnMissingParent();
        return;
      }
      if (channel === null) {
        abortOnDisconnect();
        return;
      }
      getIpcEmitter(anyProcess, channel, isSubprocess);
      await promises.scheduler.yield();
    }, "startIpc");
    cancelListening = false;
    handleAbort = /* @__PURE__ */ __name((wrappedMessage) => {
      if (wrappedMessage?.type !== GRACEFUL_CANCEL_TYPE) {
        return false;
      }
      cancelController.abort(wrappedMessage.message);
      return true;
    }, "handleAbort");
    GRACEFUL_CANCEL_TYPE = "execa:ipc:cancel";
    abortOnDisconnect = /* @__PURE__ */ __name(() => {
      cancelController.abort(getAbortDisconnectError());
    }, "abortOnDisconnect");
    cancelController = new AbortController();
  }
});

// ../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/terminate/graceful.js
var validateGracefulCancel, throwOnGracefulCancel, sendOnAbort, getReason;
var init_graceful2 = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/terminate/graceful.js"() {
    init_abort_signal();
    init_graceful();
    init_kill();
    validateGracefulCancel = /* @__PURE__ */ __name(({ gracefulCancel, cancelSignal, ipc, serialization }) => {
      if (!gracefulCancel) {
        return;
      }
      if (cancelSignal === void 0) {
        throw new Error("The `cancelSignal` option must be defined when setting the `gracefulCancel` option.");
      }
      if (!ipc) {
        throw new Error("The `ipc` option cannot be false when setting the `gracefulCancel` option.");
      }
      if (serialization === "json") {
        throw new Error("The `serialization` option cannot be 'json' when setting the `gracefulCancel` option.");
      }
    }, "validateGracefulCancel");
    throwOnGracefulCancel = /* @__PURE__ */ __name(({
      subprocess,
      cancelSignal,
      gracefulCancel,
      forceKillAfterDelay,
      context,
      controller
    }) => gracefulCancel ? [sendOnAbort({
      subprocess,
      cancelSignal,
      forceKillAfterDelay,
      context,
      controller
    })] : [], "throwOnGracefulCancel");
    sendOnAbort = /* @__PURE__ */ __name(async ({ subprocess, cancelSignal, forceKillAfterDelay, context, controller: { signal } }) => {
      await onAbortedSignal(cancelSignal, signal);
      const reason = getReason(cancelSignal);
      await sendAbort(subprocess, reason);
      killOnTimeout({
        kill: subprocess.kill,
        forceKillAfterDelay,
        context,
        controllerSignal: signal
      });
      context.terminationReason ??= "gracefulCancel";
      throw cancelSignal.reason;
    }, "sendOnAbort");
    getReason = /* @__PURE__ */ __name(({ reason }) => {
      if (!(reason instanceof DOMException)) {
        return reason;
      }
      const error = new Error(reason.message);
      Object.defineProperty(error, "stack", {
        value: reason.stack,
        enumerable: false,
        configurable: true,
        writable: true
      });
      return error;
    }, "getReason");
  }
});
var validateTimeout, throwOnTimeout, killAfterTimeout;
var init_timeout = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/terminate/timeout.js"() {
    init_final_error();
    validateTimeout = /* @__PURE__ */ __name(({ timeout }) => {
      if (timeout !== void 0 && (!Number.isFinite(timeout) || timeout < 0)) {
        throw new TypeError(`Expected the \`timeout\` option to be a non-negative integer, got \`${timeout}\` (${typeof timeout})`);
      }
    }, "validateTimeout");
    throwOnTimeout = /* @__PURE__ */ __name((subprocess, timeout, context, controller) => timeout === 0 || timeout === void 0 ? [] : [killAfterTimeout(subprocess, timeout, context, controller)], "throwOnTimeout");
    killAfterTimeout = /* @__PURE__ */ __name(async (subprocess, timeout, context, { signal }) => {
      await promises.setTimeout(timeout, void 0, { signal });
      context.terminationReason ??= "timeout";
      subprocess.kill();
      throw new DiscardedError();
    }, "killAfterTimeout");
  }
});
var mapNode, handleNodeOption;
var init_node2 = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/methods/node.js"() {
    init_file_url();
    mapNode = /* @__PURE__ */ __name(({ options }) => {
      if (options.node === false) {
        throw new TypeError('The "node" option cannot be false with `execaNode()`.');
      }
      return { options: { ...options, node: true } };
    }, "mapNode");
    handleNodeOption = /* @__PURE__ */ __name((file, commandArguments, {
      node: shouldHandleNode = false,
      nodePath = y2.execPath,
      nodeOptions = y2.execArgv.filter((nodeOption) => !nodeOption.startsWith("--inspect")),
      cwd,
      execPath: formerNodePath,
      ...options
    }) => {
      if (formerNodePath !== void 0) {
        throw new TypeError('The "execPath" option has been removed. Please use the "nodePath" option instead.');
      }
      const normalizedNodePath = safeNormalizeFileUrl(nodePath, 'The "nodePath" option');
      const resolvedNodePath = path8__default.default.resolve(cwd, normalizedNodePath);
      const newOptions = {
        ...options,
        nodePath: resolvedNodePath,
        node: shouldHandleNode,
        cwd
      };
      if (!shouldHandleNode) {
        return [file, commandArguments, newOptions];
      }
      if (path8__default.default.basename(file, ".exe") === "node") {
        throw new TypeError('When the "node" option is true, the first argument does not need to be "node".');
      }
      return [
        resolvedNodePath,
        [...nodeOptions, file, ...commandArguments],
        { ipc: true, ...newOptions, shell: false }
      ];
    }, "handleNodeOption");
  }
});
var validateIpcInputOption, validateAdvancedInput, validateJsonInput, validateIpcInput, sendIpcInput;
var init_ipc_input = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/ipc/ipc-input.js"() {
    validateIpcInputOption = /* @__PURE__ */ __name(({ ipcInput, ipc, serialization }) => {
      if (ipcInput === void 0) {
        return;
      }
      if (!ipc) {
        throw new Error("The `ipcInput` option cannot be set unless the `ipc` option is `true`.");
      }
      validateIpcInput[serialization](ipcInput);
    }, "validateIpcInputOption");
    validateAdvancedInput = /* @__PURE__ */ __name((ipcInput) => {
      try {
        v8.serialize(ipcInput);
      } catch (error) {
        throw new Error("The `ipcInput` option is not serializable with a structured clone.", { cause: error });
      }
    }, "validateAdvancedInput");
    validateJsonInput = /* @__PURE__ */ __name((ipcInput) => {
      try {
        JSON.stringify(ipcInput);
      } catch (error) {
        throw new Error("The `ipcInput` option is not serializable with JSON.", { cause: error });
      }
    }, "validateJsonInput");
    validateIpcInput = {
      advanced: validateAdvancedInput,
      json: validateJsonInput
    };
    sendIpcInput = /* @__PURE__ */ __name(async (subprocess, ipcInput) => {
      if (ipcInput === void 0) {
        return;
      }
      await subprocess.sendMessage(ipcInput);
    }, "sendIpcInput");
  }
});

// ../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/arguments/encoding-option.js
var validateEncoding, TEXT_ENCODINGS, BINARY_ENCODINGS, ENCODINGS, getCorrectEncoding, ENCODING_ALIASES, serializeEncoding;
var init_encoding_option = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/arguments/encoding-option.js"() {
    validateEncoding = /* @__PURE__ */ __name(({ encoding }) => {
      if (ENCODINGS.has(encoding)) {
        return;
      }
      const correctEncoding = getCorrectEncoding(encoding);
      if (correctEncoding !== void 0) {
        throw new TypeError(`Invalid option \`encoding: ${serializeEncoding(encoding)}\`.
Please rename it to ${serializeEncoding(correctEncoding)}.`);
      }
      const correctEncodings = [...ENCODINGS].map((correctEncoding2) => serializeEncoding(correctEncoding2)).join(", ");
      throw new TypeError(`Invalid option \`encoding: ${serializeEncoding(encoding)}\`.
Please rename it to one of: ${correctEncodings}.`);
    }, "validateEncoding");
    TEXT_ENCODINGS = /* @__PURE__ */ new Set(["utf8", "utf16le"]);
    BINARY_ENCODINGS = /* @__PURE__ */ new Set(["buffer", "hex", "base64", "base64url", "latin1", "ascii"]);
    ENCODINGS = /* @__PURE__ */ new Set([...TEXT_ENCODINGS, ...BINARY_ENCODINGS]);
    getCorrectEncoding = /* @__PURE__ */ __name((encoding) => {
      if (encoding === null) {
        return "buffer";
      }
      if (typeof encoding !== "string") {
        return;
      }
      const lowerEncoding = encoding.toLowerCase();
      if (lowerEncoding in ENCODING_ALIASES) {
        return ENCODING_ALIASES[lowerEncoding];
      }
      if (ENCODINGS.has(lowerEncoding)) {
        return lowerEncoding;
      }
    }, "getCorrectEncoding");
    ENCODING_ALIASES = {
      // eslint-disable-next-line unicorn/text-encoding-identifier-case
      "utf-8": "utf8",
      "utf-16le": "utf16le",
      "ucs-2": "utf16le",
      ucs2: "utf16le",
      binary: "latin1"
    };
    serializeEncoding = /* @__PURE__ */ __name((encoding) => typeof encoding === "string" ? `"${encoding}"` : String(encoding), "serializeEncoding");
  }
});
var normalizeCwd, getDefaultCwd, fixCwdError;
var init_cwd = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/arguments/cwd.js"() {
    init_file_url();
    normalizeCwd = /* @__PURE__ */ __name((cwd = getDefaultCwd()) => {
      const cwdString = safeNormalizeFileUrl(cwd, 'The "cwd" option');
      return path8__default.default.resolve(cwdString);
    }, "normalizeCwd");
    getDefaultCwd = /* @__PURE__ */ __name(() => {
      try {
        return y2__default.default.cwd();
      } catch (error) {
        error.message = `The current directory does not exist.
${error.message}`;
        throw error;
      }
    }, "getDefaultCwd");
    fixCwdError = /* @__PURE__ */ __name((originalMessage, cwd) => {
      if (cwd === getDefaultCwd()) {
        return originalMessage;
      }
      let cwdStat;
      try {
        cwdStat = fs2.statSync(cwd);
      } catch (error) {
        return `The "cwd" option is invalid: ${cwd}.
${error.message}
${originalMessage}`;
      }
      if (!cwdStat.isDirectory()) {
        return `The "cwd" option is not a directory: ${cwd}.
${originalMessage}`;
      }
      return originalMessage;
    }, "fixCwdError");
  }
});
var import_cross_spawn, normalizeOptions, addDefaultOptions, getEnv;
var init_options = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/arguments/options.js"() {
    import_cross_spawn = __toESM(require_cross_spawn());
    init_npm_run_path();
    init_kill();
    init_signal();
    init_cancel();
    init_graceful2();
    init_timeout();
    init_node2();
    init_ipc_input();
    init_encoding_option();
    init_cwd();
    init_file_url();
    init_specific();
    normalizeOptions = /* @__PURE__ */ __name((filePath, rawArguments, rawOptions) => {
      rawOptions.cwd = normalizeCwd(rawOptions.cwd);
      const [processedFile, processedArguments, processedOptions] = handleNodeOption(filePath, rawArguments, rawOptions);
      const { command: file, args: commandArguments, options: initialOptions } = import_cross_spawn.default._parse(processedFile, processedArguments, processedOptions);
      const fdOptions = normalizeFdSpecificOptions(initialOptions);
      const options = addDefaultOptions(fdOptions);
      validateTimeout(options);
      validateEncoding(options);
      validateIpcInputOption(options);
      validateCancelSignal(options);
      validateGracefulCancel(options);
      options.shell = normalizeFileUrl(options.shell);
      options.env = getEnv(options);
      options.killSignal = normalizeKillSignal(options.killSignal);
      options.forceKillAfterDelay = normalizeForceKillAfterDelay(options.forceKillAfterDelay);
      options.lines = options.lines.map((lines, fdNumber) => lines && !BINARY_ENCODINGS.has(options.encoding) && options.buffer[fdNumber]);
      if (y2__default.default.platform === "win32" && path8__default.default.basename(file, ".exe") === "cmd") {
        commandArguments.unshift("/q");
      }
      return { file, commandArguments, options };
    }, "normalizeOptions");
    addDefaultOptions = /* @__PURE__ */ __name(({
      extendEnv = true,
      preferLocal = false,
      cwd,
      localDir: localDirectory = cwd,
      encoding = "utf8",
      reject = true,
      cleanup = true,
      all = false,
      windowsHide = true,
      killSignal = "SIGTERM",
      forceKillAfterDelay = true,
      gracefulCancel = false,
      ipcInput,
      ipc = ipcInput !== void 0 || gracefulCancel,
      serialization = "advanced",
      ...options
    }) => ({
      ...options,
      extendEnv,
      preferLocal,
      cwd,
      localDirectory,
      encoding,
      reject,
      cleanup,
      all,
      windowsHide,
      killSignal,
      forceKillAfterDelay,
      gracefulCancel,
      ipcInput,
      ipc,
      serialization
    }), "addDefaultOptions");
    getEnv = /* @__PURE__ */ __name(({ env: envOption, extendEnv, preferLocal, node, localDirectory, nodePath }) => {
      const env = extendEnv ? { ...y2__default.default.env, ...envOption } : envOption;
      if (preferLocal || node) {
        return npmRunPathEnv({
          env,
          cwd: localDirectory,
          execPath: nodePath,
          preferLocal,
          addExecPath: node
        });
      }
      return env;
    }, "getEnv");
  }
});

// ../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/arguments/shell.js
var concatenateShell;
var init_shell = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/arguments/shell.js"() {
    concatenateShell = /* @__PURE__ */ __name((file, commandArguments, options) => options.shell && commandArguments.length > 0 ? [[file, ...commandArguments].join(" "), [], options] : [file, commandArguments, options], "concatenateShell");
  }
});

// ../../node_modules/.pnpm/strip-final-newline@4.0.0/node_modules/strip-final-newline/index.js
function stripFinalNewline(input) {
  if (typeof input === "string") {
    return stripFinalNewlineString(input);
  }
  if (!(ArrayBuffer.isView(input) && input.BYTES_PER_ELEMENT === 1)) {
    throw new Error("Input must be a string or a Uint8Array");
  }
  return stripFinalNewlineBinary(input);
}
var stripFinalNewlineString, stripFinalNewlineBinary, LF, LF_BINARY, CR, CR_BINARY;
var init_strip_final_newline = __esm({
  "../../node_modules/.pnpm/strip-final-newline@4.0.0/node_modules/strip-final-newline/index.js"() {
    __name(stripFinalNewline, "stripFinalNewline");
    stripFinalNewlineString = /* @__PURE__ */ __name((input) => input.at(-1) === LF ? input.slice(0, input.at(-2) === CR ? -2 : -1) : input, "stripFinalNewlineString");
    stripFinalNewlineBinary = /* @__PURE__ */ __name((input) => input.at(-1) === LF_BINARY ? input.subarray(0, input.at(-2) === CR_BINARY ? -2 : -1) : input, "stripFinalNewlineBinary");
    LF = "\n";
    LF_BINARY = LF.codePointAt(0);
    CR = "\r";
    CR_BINARY = CR.codePointAt(0);
  }
});

// ../../node_modules/.pnpm/is-stream@4.0.1/node_modules/is-stream/index.js
function isStream(stream, { checkOpen = true } = {}) {
  return stream !== null && typeof stream === "object" && (stream.writable || stream.readable || !checkOpen || stream.writable === void 0 && stream.readable === void 0) && typeof stream.pipe === "function";
}
function isWritableStream(stream, { checkOpen = true } = {}) {
  return isStream(stream, { checkOpen }) && (stream.writable || !checkOpen) && typeof stream.write === "function" && typeof stream.end === "function" && typeof stream.writable === "boolean" && typeof stream.writableObjectMode === "boolean" && typeof stream.destroy === "function" && typeof stream.destroyed === "boolean";
}
function isReadableStream(stream, { checkOpen = true } = {}) {
  return isStream(stream, { checkOpen }) && (stream.readable || !checkOpen) && typeof stream.read === "function" && typeof stream.readable === "boolean" && typeof stream.readableObjectMode === "boolean" && typeof stream.destroy === "function" && typeof stream.destroyed === "boolean";
}
function isDuplexStream(stream, options) {
  return isWritableStream(stream, options) && isReadableStream(stream, options);
}
var init_is_stream = __esm({
  "../../node_modules/.pnpm/is-stream@4.0.1/node_modules/is-stream/index.js"() {
    __name(isStream, "isStream");
    __name(isWritableStream, "isWritableStream");
    __name(isReadableStream, "isReadableStream");
    __name(isDuplexStream, "isDuplexStream");
  }
});

// ../../node_modules/.pnpm/@sec-ant+readable-stream@0.4.1/node_modules/@sec-ant/readable-stream/dist/ponyfill/asyncIterator.js
function i() {
  return this[n].next();
}
function o2(r2) {
  return this[n].return(r2);
}
function h2({ preventCancel: r2 = false } = {}) {
  const e2 = this.getReader(), t = new c(
    e2,
    r2
  ), s = Object.create(u2);
  return s[n] = t, s;
}
var a2, c, n, u2;
var init_asyncIterator = __esm({
  "../../node_modules/.pnpm/@sec-ant+readable-stream@0.4.1/node_modules/@sec-ant/readable-stream/dist/ponyfill/asyncIterator.js"() {
    a2 = Object.getPrototypeOf(
      Object.getPrototypeOf(
        /* istanbul ignore next */
        async function* () {
        }
      ).prototype
    );
    c = class {
      static {
        __name(this, "c");
      }
      #t;
      #n;
      #r = false;
      #e = void 0;
      constructor(e2, t) {
        this.#t = e2, this.#n = t;
      }
      next() {
        const e2 = /* @__PURE__ */ __name(() => this.#s(), "e");
        return this.#e = this.#e ? this.#e.then(e2, e2) : e2(), this.#e;
      }
      return(e2) {
        const t = /* @__PURE__ */ __name(() => this.#i(e2), "t");
        return this.#e ? this.#e.then(t, t) : t();
      }
      async #s() {
        if (this.#r)
          return {
            done: true,
            value: void 0
          };
        let e2;
        try {
          e2 = await this.#t.read();
        } catch (t) {
          throw this.#e = void 0, this.#r = true, this.#t.releaseLock(), t;
        }
        return e2.done && (this.#e = void 0, this.#r = true, this.#t.releaseLock()), e2;
      }
      async #i(e2) {
        if (this.#r)
          return {
            done: true,
            value: e2
          };
        if (this.#r = true, !this.#n) {
          const t = this.#t.cancel(e2);
          return this.#t.releaseLock(), await t, {
            done: true,
            value: e2
          };
        }
        return this.#t.releaseLock(), {
          done: true,
          value: e2
        };
      }
    };
    n = Symbol();
    __name(i, "i");
    Object.defineProperty(i, "name", { value: "next" });
    __name(o2, "o");
    Object.defineProperty(o2, "name", { value: "return" });
    u2 = Object.create(a2, {
      next: {
        enumerable: true,
        configurable: true,
        writable: true,
        value: i
      },
      return: {
        enumerable: true,
        configurable: true,
        writable: true,
        value: o2
      }
    });
    __name(h2, "h");
  }
});

// ../../node_modules/.pnpm/@sec-ant+readable-stream@0.4.1/node_modules/@sec-ant/readable-stream/dist/ponyfill/fromAnyIterable.js
var init_fromAnyIterable = __esm({
  "../../node_modules/.pnpm/@sec-ant+readable-stream@0.4.1/node_modules/@sec-ant/readable-stream/dist/ponyfill/fromAnyIterable.js"() {
  }
});

// ../../node_modules/.pnpm/@sec-ant+readable-stream@0.4.1/node_modules/@sec-ant/readable-stream/dist/ponyfill/index.js
var init_ponyfill = __esm({
  "../../node_modules/.pnpm/@sec-ant+readable-stream@0.4.1/node_modules/@sec-ant/readable-stream/dist/ponyfill/index.js"() {
    init_asyncIterator();
    init_fromAnyIterable();
  }
});

// ../../node_modules/.pnpm/get-stream@9.0.1/node_modules/get-stream/source/stream.js
var getAsyncIterable, toString, getStreamIterable, handleStreamEnd, nodeImports;
var init_stream = __esm({
  "../../node_modules/.pnpm/get-stream@9.0.1/node_modules/get-stream/source/stream.js"() {
    init_is_stream();
    init_ponyfill();
    getAsyncIterable = /* @__PURE__ */ __name((stream) => {
      if (isReadableStream(stream, { checkOpen: false }) && nodeImports.on !== void 0) {
        return getStreamIterable(stream);
      }
      if (typeof stream?.[Symbol.asyncIterator] === "function") {
        return stream;
      }
      if (toString.call(stream) === "[object ReadableStream]") {
        return h2.call(stream);
      }
      throw new TypeError("The first argument must be a Readable, a ReadableStream, or an async iterable.");
    }, "getAsyncIterable");
    ({ toString } = Object.prototype);
    getStreamIterable = /* @__PURE__ */ __name(async function* (stream) {
      const controller = new AbortController();
      const state = {};
      handleStreamEnd(stream, controller, state);
      try {
        for await (const [chunk] of nodeImports.on(stream, "data", { signal: controller.signal })) {
          yield chunk;
        }
      } catch (error) {
        if (state.error !== void 0) {
          throw state.error;
        } else if (!controller.signal.aborted) {
          throw error;
        }
      } finally {
        stream.destroy();
      }
    }, "getStreamIterable");
    handleStreamEnd = /* @__PURE__ */ __name(async (stream, controller, state) => {
      try {
        await nodeImports.finished(stream, {
          cleanup: true,
          readable: true,
          writable: false,
          error: false
        });
      } catch (error) {
        state.error = error;
      } finally {
        controller.abort();
      }
    }, "handleStreamEnd");
    nodeImports = {};
  }
});

// ../../node_modules/.pnpm/get-stream@9.0.1/node_modules/get-stream/source/contents.js
var getStreamContents, appendFinalChunk, appendChunk, addNewChunk, getChunkType, objectToString2, MaxBufferError;
var init_contents = __esm({
  "../../node_modules/.pnpm/get-stream@9.0.1/node_modules/get-stream/source/contents.js"() {
    init_stream();
    getStreamContents = /* @__PURE__ */ __name(async (stream, { init, convertChunk, getSize, truncateChunk, addChunk, getFinalChunk, finalize }, { maxBuffer = Number.POSITIVE_INFINITY } = {}) => {
      const asyncIterable = getAsyncIterable(stream);
      const state = init();
      state.length = 0;
      try {
        for await (const chunk of asyncIterable) {
          const chunkType = getChunkType(chunk);
          const convertedChunk = convertChunk[chunkType](chunk, state);
          appendChunk({
            convertedChunk,
            state,
            getSize,
            truncateChunk,
            addChunk,
            maxBuffer
          });
        }
        appendFinalChunk({
          state,
          convertChunk,
          getSize,
          truncateChunk,
          addChunk,
          getFinalChunk,
          maxBuffer
        });
        return finalize(state);
      } catch (error) {
        const normalizedError = typeof error === "object" && error !== null ? error : new Error(error);
        normalizedError.bufferedData = finalize(state);
        throw normalizedError;
      }
    }, "getStreamContents");
    appendFinalChunk = /* @__PURE__ */ __name(({ state, getSize, truncateChunk, addChunk, getFinalChunk, maxBuffer }) => {
      const convertedChunk = getFinalChunk(state);
      if (convertedChunk !== void 0) {
        appendChunk({
          convertedChunk,
          state,
          getSize,
          truncateChunk,
          addChunk,
          maxBuffer
        });
      }
    }, "appendFinalChunk");
    appendChunk = /* @__PURE__ */ __name(({ convertedChunk, state, getSize, truncateChunk, addChunk, maxBuffer }) => {
      const chunkSize = getSize(convertedChunk);
      const newLength = state.length + chunkSize;
      if (newLength <= maxBuffer) {
        addNewChunk(convertedChunk, state, addChunk, newLength);
        return;
      }
      const truncatedChunk = truncateChunk(convertedChunk, maxBuffer - state.length);
      if (truncatedChunk !== void 0) {
        addNewChunk(truncatedChunk, state, addChunk, maxBuffer);
      }
      throw new MaxBufferError();
    }, "appendChunk");
    addNewChunk = /* @__PURE__ */ __name((convertedChunk, state, addChunk, newLength) => {
      state.contents = addChunk(convertedChunk, state, newLength);
      state.length = newLength;
    }, "addNewChunk");
    getChunkType = /* @__PURE__ */ __name((chunk) => {
      const typeOfChunk = typeof chunk;
      if (typeOfChunk === "string") {
        return "string";
      }
      if (typeOfChunk !== "object" || chunk === null) {
        return "others";
      }
      if (globalThis.Buffer?.isBuffer(chunk)) {
        return "buffer";
      }
      const prototypeName = objectToString2.call(chunk);
      if (prototypeName === "[object ArrayBuffer]") {
        return "arrayBuffer";
      }
      if (prototypeName === "[object DataView]") {
        return "dataView";
      }
      if (Number.isInteger(chunk.byteLength) && Number.isInteger(chunk.byteOffset) && objectToString2.call(chunk.buffer) === "[object ArrayBuffer]") {
        return "typedArray";
      }
      return "others";
    }, "getChunkType");
    ({ toString: objectToString2 } = Object.prototype);
    MaxBufferError = class extends Error {
      static {
        __name(this, "MaxBufferError");
      }
      name = "MaxBufferError";
      constructor() {
        super("maxBuffer exceeded");
      }
    };
  }
});

// ../../node_modules/.pnpm/get-stream@9.0.1/node_modules/get-stream/source/utils.js
var identity2, noop, getContentsProperty, throwObjectStream, getLengthProperty;
var init_utils2 = __esm({
  "../../node_modules/.pnpm/get-stream@9.0.1/node_modules/get-stream/source/utils.js"() {
    identity2 = /* @__PURE__ */ __name((value) => value, "identity");
    noop = /* @__PURE__ */ __name(() => void 0, "noop");
    getContentsProperty = /* @__PURE__ */ __name(({ contents }) => contents, "getContentsProperty");
    throwObjectStream = /* @__PURE__ */ __name((chunk) => {
      throw new Error(`Streams in object mode are not supported: ${String(chunk)}`);
    }, "throwObjectStream");
    getLengthProperty = /* @__PURE__ */ __name((convertedChunk) => convertedChunk.length, "getLengthProperty");
  }
});

// ../../node_modules/.pnpm/get-stream@9.0.1/node_modules/get-stream/source/array.js
async function getStreamAsArray(stream, options) {
  return getStreamContents(stream, arrayMethods, options);
}
var initArray, increment, addArrayChunk, arrayMethods;
var init_array = __esm({
  "../../node_modules/.pnpm/get-stream@9.0.1/node_modules/get-stream/source/array.js"() {
    init_contents();
    init_utils2();
    __name(getStreamAsArray, "getStreamAsArray");
    initArray = /* @__PURE__ */ __name(() => ({ contents: [] }), "initArray");
    increment = /* @__PURE__ */ __name(() => 1, "increment");
    addArrayChunk = /* @__PURE__ */ __name((convertedChunk, { contents }) => {
      contents.push(convertedChunk);
      return contents;
    }, "addArrayChunk");
    arrayMethods = {
      init: initArray,
      convertChunk: {
        string: identity2,
        buffer: identity2,
        arrayBuffer: identity2,
        dataView: identity2,
        typedArray: identity2,
        others: identity2
      },
      getSize: increment,
      truncateChunk: noop,
      addChunk: addArrayChunk,
      getFinalChunk: noop,
      finalize: getContentsProperty
    };
  }
});

// ../../node_modules/.pnpm/get-stream@9.0.1/node_modules/get-stream/source/array-buffer.js
async function getStreamAsArrayBuffer(stream, options) {
  return getStreamContents(stream, arrayBufferMethods, options);
}
var initArrayBuffer, useTextEncoder, textEncoder2, useUint8Array, useUint8ArrayWithOffset, truncateArrayBufferChunk, addArrayBufferChunk, resizeArrayBufferSlow, resizeArrayBuffer, getNewContentsLength, SCALE_FACTOR, finalizeArrayBuffer, hasArrayBufferResize, arrayBufferMethods;
var init_array_buffer = __esm({
  "../../node_modules/.pnpm/get-stream@9.0.1/node_modules/get-stream/source/array-buffer.js"() {
    init_contents();
    init_utils2();
    __name(getStreamAsArrayBuffer, "getStreamAsArrayBuffer");
    initArrayBuffer = /* @__PURE__ */ __name(() => ({ contents: new ArrayBuffer(0) }), "initArrayBuffer");
    useTextEncoder = /* @__PURE__ */ __name((chunk) => textEncoder2.encode(chunk), "useTextEncoder");
    textEncoder2 = new TextEncoder();
    useUint8Array = /* @__PURE__ */ __name((chunk) => new Uint8Array(chunk), "useUint8Array");
    useUint8ArrayWithOffset = /* @__PURE__ */ __name((chunk) => new Uint8Array(chunk.buffer, chunk.byteOffset, chunk.byteLength), "useUint8ArrayWithOffset");
    truncateArrayBufferChunk = /* @__PURE__ */ __name((convertedChunk, chunkSize) => convertedChunk.slice(0, chunkSize), "truncateArrayBufferChunk");
    addArrayBufferChunk = /* @__PURE__ */ __name((convertedChunk, { contents, length: previousLength }, length) => {
      const newContents = hasArrayBufferResize() ? resizeArrayBuffer(contents, length) : resizeArrayBufferSlow(contents, length);
      new Uint8Array(newContents).set(convertedChunk, previousLength);
      return newContents;
    }, "addArrayBufferChunk");
    resizeArrayBufferSlow = /* @__PURE__ */ __name((contents, length) => {
      if (length <= contents.byteLength) {
        return contents;
      }
      const arrayBuffer = new ArrayBuffer(getNewContentsLength(length));
      new Uint8Array(arrayBuffer).set(new Uint8Array(contents), 0);
      return arrayBuffer;
    }, "resizeArrayBufferSlow");
    resizeArrayBuffer = /* @__PURE__ */ __name((contents, length) => {
      if (length <= contents.maxByteLength) {
        contents.resize(length);
        return contents;
      }
      const arrayBuffer = new ArrayBuffer(length, { maxByteLength: getNewContentsLength(length) });
      new Uint8Array(arrayBuffer).set(new Uint8Array(contents), 0);
      return arrayBuffer;
    }, "resizeArrayBuffer");
    getNewContentsLength = /* @__PURE__ */ __name((length) => SCALE_FACTOR ** Math.ceil(Math.log(length) / Math.log(SCALE_FACTOR)), "getNewContentsLength");
    SCALE_FACTOR = 2;
    finalizeArrayBuffer = /* @__PURE__ */ __name(({ contents, length }) => hasArrayBufferResize() ? contents : contents.slice(0, length), "finalizeArrayBuffer");
    hasArrayBufferResize = /* @__PURE__ */ __name(() => "resize" in ArrayBuffer.prototype, "hasArrayBufferResize");
    arrayBufferMethods = {
      init: initArrayBuffer,
      convertChunk: {
        string: useTextEncoder,
        buffer: useUint8Array,
        arrayBuffer: useUint8Array,
        dataView: useUint8ArrayWithOffset,
        typedArray: useUint8ArrayWithOffset,
        others: throwObjectStream
      },
      getSize: getLengthProperty,
      truncateChunk: truncateArrayBufferChunk,
      addChunk: addArrayBufferChunk,
      getFinalChunk: noop,
      finalize: finalizeArrayBuffer
    };
  }
});

// ../../node_modules/.pnpm/get-stream@9.0.1/node_modules/get-stream/source/string.js
async function getStreamAsString(stream, options) {
  return getStreamContents(stream, stringMethods, options);
}
var initString, useTextDecoder, addStringChunk, truncateStringChunk, getFinalStringChunk, stringMethods;
var init_string = __esm({
  "../../node_modules/.pnpm/get-stream@9.0.1/node_modules/get-stream/source/string.js"() {
    init_contents();
    init_utils2();
    __name(getStreamAsString, "getStreamAsString");
    initString = /* @__PURE__ */ __name(() => ({ contents: "", textDecoder: new TextDecoder() }), "initString");
    useTextDecoder = /* @__PURE__ */ __name((chunk, { textDecoder: textDecoder2 }) => textDecoder2.decode(chunk, { stream: true }), "useTextDecoder");
    addStringChunk = /* @__PURE__ */ __name((convertedChunk, { contents }) => contents + convertedChunk, "addStringChunk");
    truncateStringChunk = /* @__PURE__ */ __name((convertedChunk, chunkSize) => convertedChunk.slice(0, chunkSize), "truncateStringChunk");
    getFinalStringChunk = /* @__PURE__ */ __name(({ textDecoder: textDecoder2 }) => {
      const finalChunk = textDecoder2.decode();
      return finalChunk === "" ? void 0 : finalChunk;
    }, "getFinalStringChunk");
    stringMethods = {
      init: initString,
      convertChunk: {
        string: identity2,
        buffer: useTextDecoder,
        arrayBuffer: useTextDecoder,
        dataView: useTextDecoder,
        typedArray: useTextDecoder,
        others: throwObjectStream
      },
      getSize: getLengthProperty,
      truncateChunk: truncateStringChunk,
      addChunk: addStringChunk,
      getFinalChunk: getFinalStringChunk,
      finalize: getContentsProperty
    };
  }
});

// ../../node_modules/.pnpm/get-stream@9.0.1/node_modules/get-stream/source/exports.js
var init_exports = __esm({
  "../../node_modules/.pnpm/get-stream@9.0.1/node_modules/get-stream/source/exports.js"() {
    init_array();
    init_array_buffer();
    init_string();
    init_contents();
  }
});
var init_source = __esm({
  "../../node_modules/.pnpm/get-stream@9.0.1/node_modules/get-stream/source/index.js"() {
    init_stream();
    init_exports();
    Object.assign(nodeImports, { on: events.on, finished: promises$1.finished });
  }
});

// ../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/io/max-buffer.js
var handleMaxBuffer, getMaxBufferUnit, checkIpcMaxBuffer, getMaxBufferMessage, getMaxBufferInfo, isMaxBufferSync, truncateMaxBufferSync, getMaxBufferSync;
var init_max_buffer = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/io/max-buffer.js"() {
    init_source();
    init_standard_stream();
    init_specific();
    handleMaxBuffer = /* @__PURE__ */ __name(({ error, stream, readableObjectMode, lines, encoding, fdNumber }) => {
      if (!(error instanceof MaxBufferError)) {
        throw error;
      }
      if (fdNumber === "all") {
        return error;
      }
      const unit = getMaxBufferUnit(readableObjectMode, lines, encoding);
      error.maxBufferInfo = { fdNumber, unit };
      stream.destroy();
      throw error;
    }, "handleMaxBuffer");
    getMaxBufferUnit = /* @__PURE__ */ __name((readableObjectMode, lines, encoding) => {
      if (readableObjectMode) {
        return "objects";
      }
      if (lines) {
        return "lines";
      }
      if (encoding === "buffer") {
        return "bytes";
      }
      return "characters";
    }, "getMaxBufferUnit");
    checkIpcMaxBuffer = /* @__PURE__ */ __name((subprocess, ipcOutput, maxBuffer) => {
      if (ipcOutput.length !== maxBuffer) {
        return;
      }
      const error = new MaxBufferError();
      error.maxBufferInfo = { fdNumber: "ipc" };
      throw error;
    }, "checkIpcMaxBuffer");
    getMaxBufferMessage = /* @__PURE__ */ __name((error, maxBuffer) => {
      const { streamName, threshold, unit } = getMaxBufferInfo(error, maxBuffer);
      return `Command's ${streamName} was larger than ${threshold} ${unit}`;
    }, "getMaxBufferMessage");
    getMaxBufferInfo = /* @__PURE__ */ __name((error, maxBuffer) => {
      if (error?.maxBufferInfo === void 0) {
        return { streamName: "output", threshold: maxBuffer[1], unit: "bytes" };
      }
      const { maxBufferInfo: { fdNumber, unit } } = error;
      delete error.maxBufferInfo;
      const threshold = getFdSpecificValue(maxBuffer, fdNumber);
      if (fdNumber === "ipc") {
        return { streamName: "IPC output", threshold, unit: "messages" };
      }
      return { streamName: getStreamName(fdNumber), threshold, unit };
    }, "getMaxBufferInfo");
    isMaxBufferSync = /* @__PURE__ */ __name((resultError, output, maxBuffer) => resultError?.code === "ENOBUFS" && output !== null && output.some((result) => result !== null && result.length > getMaxBufferSync(maxBuffer)), "isMaxBufferSync");
    truncateMaxBufferSync = /* @__PURE__ */ __name((result, isMaxBuffer, maxBuffer) => {
      if (!isMaxBuffer) {
        return result;
      }
      const maxBufferValue = getMaxBufferSync(maxBuffer);
      return result.length > maxBufferValue ? result.slice(0, maxBufferValue) : result;
    }, "truncateMaxBufferSync");
    getMaxBufferSync = /* @__PURE__ */ __name(([, stdoutMaxBuffer]) => stdoutMaxBuffer, "getMaxBufferSync");
  }
});
var createMessages, getErrorPrefix, getForcefulSuffix, getOriginalMessage, serializeIpcMessage, serializeMessagePart, serializeMessageItem;
var init_message = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/return/message.js"() {
    init_strip_final_newline();
    init_uint_array();
    init_cwd();
    init_escape();
    init_max_buffer();
    init_signal();
    init_final_error();
    createMessages = /* @__PURE__ */ __name(({
      stdio,
      all,
      ipcOutput,
      originalError,
      signal,
      signalDescription,
      exitCode,
      escapedCommand,
      timedOut,
      isCanceled,
      isGracefullyCanceled,
      isMaxBuffer,
      isForcefullyTerminated,
      forceKillAfterDelay,
      killSignal,
      maxBuffer,
      timeout,
      cwd
    }) => {
      const errorCode = originalError?.code;
      const prefix = getErrorPrefix({
        originalError,
        timedOut,
        timeout,
        isMaxBuffer,
        maxBuffer,
        errorCode,
        signal,
        signalDescription,
        exitCode,
        isCanceled,
        isGracefullyCanceled,
        isForcefullyTerminated,
        forceKillAfterDelay,
        killSignal
      });
      const originalMessage = getOriginalMessage(originalError, cwd);
      const suffix = originalMessage === void 0 ? "" : `
${originalMessage}`;
      const shortMessage = `${prefix}: ${escapedCommand}${suffix}`;
      const messageStdio = all === void 0 ? [stdio[2], stdio[1]] : [all];
      const message = [
        shortMessage,
        ...messageStdio,
        ...stdio.slice(3),
        ipcOutput.map((ipcMessage) => serializeIpcMessage(ipcMessage)).join("\n")
      ].map((messagePart) => escapeLines(stripFinalNewline(serializeMessagePart(messagePart)))).filter(Boolean).join("\n\n");
      return { originalMessage, shortMessage, message };
    }, "createMessages");
    getErrorPrefix = /* @__PURE__ */ __name(({
      originalError,
      timedOut,
      timeout,
      isMaxBuffer,
      maxBuffer,
      errorCode,
      signal,
      signalDescription,
      exitCode,
      isCanceled,
      isGracefullyCanceled,
      isForcefullyTerminated,
      forceKillAfterDelay,
      killSignal
    }) => {
      const forcefulSuffix = getForcefulSuffix(isForcefullyTerminated, forceKillAfterDelay);
      if (timedOut) {
        return `Command timed out after ${timeout} milliseconds${forcefulSuffix}`;
      }
      if (isGracefullyCanceled) {
        if (signal === void 0) {
          return `Command was gracefully canceled with exit code ${exitCode}`;
        }
        return isForcefullyTerminated ? `Command was gracefully canceled${forcefulSuffix}` : `Command was gracefully canceled with ${signal} (${signalDescription})`;
      }
      if (isCanceled) {
        return `Command was canceled${forcefulSuffix}`;
      }
      if (isMaxBuffer) {
        return `${getMaxBufferMessage(originalError, maxBuffer)}${forcefulSuffix}`;
      }
      if (errorCode !== void 0) {
        return `Command failed with ${errorCode}${forcefulSuffix}`;
      }
      if (isForcefullyTerminated) {
        return `Command was killed with ${killSignal} (${getSignalDescription(killSignal)})${forcefulSuffix}`;
      }
      if (signal !== void 0) {
        return `Command was killed with ${signal} (${signalDescription})`;
      }
      if (exitCode !== void 0) {
        return `Command failed with exit code ${exitCode}`;
      }
      return "Command failed";
    }, "getErrorPrefix");
    getForcefulSuffix = /* @__PURE__ */ __name((isForcefullyTerminated, forceKillAfterDelay) => isForcefullyTerminated ? ` and was forcefully terminated after ${forceKillAfterDelay} milliseconds` : "", "getForcefulSuffix");
    getOriginalMessage = /* @__PURE__ */ __name((originalError, cwd) => {
      if (originalError instanceof DiscardedError) {
        return;
      }
      const originalMessage = isExecaError(originalError) ? originalError.originalMessage : String(originalError?.message ?? originalError);
      const escapedOriginalMessage = escapeLines(fixCwdError(originalMessage, cwd));
      return escapedOriginalMessage === "" ? void 0 : escapedOriginalMessage;
    }, "getOriginalMessage");
    serializeIpcMessage = /* @__PURE__ */ __name((ipcMessage) => typeof ipcMessage === "string" ? ipcMessage : util.inspect(ipcMessage), "serializeIpcMessage");
    serializeMessagePart = /* @__PURE__ */ __name((messagePart) => Array.isArray(messagePart) ? messagePart.map((messageItem) => stripFinalNewline(serializeMessageItem(messageItem))).filter(Boolean).join("\n") : serializeMessageItem(messagePart), "serializeMessagePart");
    serializeMessageItem = /* @__PURE__ */ __name((messageItem) => {
      if (typeof messageItem === "string") {
        return messageItem;
      }
      if (isUint8Array2(messageItem)) {
        return uint8ArrayToString(messageItem);
      }
      return "";
    }, "serializeMessageItem");
  }
});

// ../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/return/result.js
var makeSuccessResult, makeEarlyError, makeError, getErrorProperties, omitUndefinedProperties, normalizeExitPayload;
var init_result = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/return/result.js"() {
    init_signal();
    init_duration();
    init_final_error();
    init_message();
    makeSuccessResult = /* @__PURE__ */ __name(({
      command,
      escapedCommand,
      stdio,
      all,
      ipcOutput,
      options: { cwd },
      startTime
    }) => omitUndefinedProperties({
      command,
      escapedCommand,
      cwd,
      durationMs: getDurationMs(startTime),
      failed: false,
      timedOut: false,
      isCanceled: false,
      isGracefullyCanceled: false,
      isTerminated: false,
      isMaxBuffer: false,
      isForcefullyTerminated: false,
      exitCode: 0,
      stdout: stdio[1],
      stderr: stdio[2],
      all,
      stdio,
      ipcOutput,
      pipedFrom: []
    }), "makeSuccessResult");
    makeEarlyError = /* @__PURE__ */ __name(({
      error,
      command,
      escapedCommand,
      fileDescriptors,
      options,
      startTime,
      isSync
    }) => makeError({
      error,
      command,
      escapedCommand,
      startTime,
      timedOut: false,
      isCanceled: false,
      isGracefullyCanceled: false,
      isMaxBuffer: false,
      isForcefullyTerminated: false,
      stdio: Array.from({ length: fileDescriptors.length }),
      ipcOutput: [],
      options,
      isSync
    }), "makeEarlyError");
    makeError = /* @__PURE__ */ __name(({
      error: originalError,
      command,
      escapedCommand,
      startTime,
      timedOut,
      isCanceled,
      isGracefullyCanceled,
      isMaxBuffer,
      isForcefullyTerminated,
      exitCode: rawExitCode,
      signal: rawSignal,
      stdio,
      all,
      ipcOutput,
      options: {
        timeoutDuration,
        timeout = timeoutDuration,
        forceKillAfterDelay,
        killSignal,
        cwd,
        maxBuffer
      },
      isSync
    }) => {
      const { exitCode, signal, signalDescription } = normalizeExitPayload(rawExitCode, rawSignal);
      const { originalMessage, shortMessage, message } = createMessages({
        stdio,
        all,
        ipcOutput,
        originalError,
        signal,
        signalDescription,
        exitCode,
        escapedCommand,
        timedOut,
        isCanceled,
        isGracefullyCanceled,
        isMaxBuffer,
        isForcefullyTerminated,
        forceKillAfterDelay,
        killSignal,
        maxBuffer,
        timeout,
        cwd
      });
      const error = getFinalError(originalError, message, isSync);
      Object.assign(error, getErrorProperties({
        error,
        command,
        escapedCommand,
        startTime,
        timedOut,
        isCanceled,
        isGracefullyCanceled,
        isMaxBuffer,
        isForcefullyTerminated,
        exitCode,
        signal,
        signalDescription,
        stdio,
        all,
        ipcOutput,
        cwd,
        originalMessage,
        shortMessage
      }));
      return error;
    }, "makeError");
    getErrorProperties = /* @__PURE__ */ __name(({
      error,
      command,
      escapedCommand,
      startTime,
      timedOut,
      isCanceled,
      isGracefullyCanceled,
      isMaxBuffer,
      isForcefullyTerminated,
      exitCode,
      signal,
      signalDescription,
      stdio,
      all,
      ipcOutput,
      cwd,
      originalMessage,
      shortMessage
    }) => omitUndefinedProperties({
      shortMessage,
      originalMessage,
      command,
      escapedCommand,
      cwd,
      durationMs: getDurationMs(startTime),
      failed: true,
      timedOut,
      isCanceled,
      isGracefullyCanceled,
      isTerminated: signal !== void 0,
      isMaxBuffer,
      isForcefullyTerminated,
      exitCode,
      signal,
      signalDescription,
      code: error.cause?.code,
      stdout: stdio[1],
      stderr: stdio[2],
      all,
      stdio,
      ipcOutput,
      pipedFrom: []
    }), "getErrorProperties");
    omitUndefinedProperties = /* @__PURE__ */ __name((result) => Object.fromEntries(Object.entries(result).filter(([, value]) => value !== void 0)), "omitUndefinedProperties");
    normalizeExitPayload = /* @__PURE__ */ __name((rawExitCode, rawSignal) => {
      const exitCode = rawExitCode === null ? void 0 : rawExitCode;
      const signal = rawSignal === null ? void 0 : rawSignal;
      const signalDescription = signal === void 0 ? void 0 : getSignalDescription(rawSignal);
      return { exitCode, signal, signalDescription };
    }, "normalizeExitPayload");
  }
});

// ../../node_modules/.pnpm/parse-ms@4.0.0/node_modules/parse-ms/index.js
function parseNumber(milliseconds) {
  return {
    days: Math.trunc(milliseconds / 864e5),
    hours: Math.trunc(milliseconds / 36e5 % 24),
    minutes: Math.trunc(milliseconds / 6e4 % 60),
    seconds: Math.trunc(milliseconds / 1e3 % 60),
    milliseconds: Math.trunc(milliseconds % 1e3),
    microseconds: Math.trunc(toZeroIfInfinity(milliseconds * 1e3) % 1e3),
    nanoseconds: Math.trunc(toZeroIfInfinity(milliseconds * 1e6) % 1e3)
  };
}
function parseBigint(milliseconds) {
  return {
    days: milliseconds / 86400000n,
    hours: milliseconds / 3600000n % 24n,
    minutes: milliseconds / 60000n % 60n,
    seconds: milliseconds / 1000n % 60n,
    milliseconds: milliseconds % 1000n,
    microseconds: 0n,
    nanoseconds: 0n
  };
}
function parseMilliseconds(milliseconds) {
  switch (typeof milliseconds) {
    case "number": {
      if (Number.isFinite(milliseconds)) {
        return parseNumber(milliseconds);
      }
      break;
    }
    case "bigint": {
      return parseBigint(milliseconds);
    }
  }
  throw new TypeError("Expected a finite number or bigint");
}
var toZeroIfInfinity;
var init_parse_ms = __esm({
  "../../node_modules/.pnpm/parse-ms@4.0.0/node_modules/parse-ms/index.js"() {
    toZeroIfInfinity = /* @__PURE__ */ __name((value) => Number.isFinite(value) ? value : 0, "toZeroIfInfinity");
    __name(parseNumber, "parseNumber");
    __name(parseBigint, "parseBigint");
    __name(parseMilliseconds, "parseMilliseconds");
  }
});

// ../../node_modules/.pnpm/pretty-ms@9.2.0/node_modules/pretty-ms/index.js
function prettyMilliseconds(milliseconds, options) {
  const isBigInt = typeof milliseconds === "bigint";
  if (!isBigInt && !Number.isFinite(milliseconds)) {
    throw new TypeError("Expected a finite number or bigint");
  }
  options = { ...options };
  const sign = milliseconds < 0 ? "-" : "";
  milliseconds = milliseconds < 0 ? -milliseconds : milliseconds;
  if (options.colonNotation) {
    options.compact = false;
    options.formatSubMilliseconds = false;
    options.separateMilliseconds = false;
    options.verbose = false;
  }
  if (options.compact) {
    options.unitCount = 1;
    options.secondsDecimalDigits = 0;
    options.millisecondsDecimalDigits = 0;
  }
  let result = [];
  const floorDecimals = /* @__PURE__ */ __name((value, decimalDigits) => {
    const flooredInterimValue = Math.floor(value * 10 ** decimalDigits + SECOND_ROUNDING_EPSILON);
    const flooredValue = Math.round(flooredInterimValue) / 10 ** decimalDigits;
    return flooredValue.toFixed(decimalDigits);
  }, "floorDecimals");
  const add = /* @__PURE__ */ __name((value, long, short, valueString) => {
    if ((result.length === 0 || !options.colonNotation) && isZero(value) && !(options.colonNotation && short === "m")) {
      return;
    }
    valueString ??= String(value);
    if (options.colonNotation) {
      const wholeDigits = valueString.includes(".") ? valueString.split(".")[0].length : valueString.length;
      const minLength = result.length > 0 ? 2 : 1;
      valueString = "0".repeat(Math.max(0, minLength - wholeDigits)) + valueString;
    } else {
      valueString += options.verbose ? " " + pluralize(long, value) : short;
    }
    result.push(valueString);
  }, "add");
  const parsed = parseMilliseconds(milliseconds);
  const days = BigInt(parsed.days);
  if (options.hideYearAndDays) {
    add(BigInt(days) * 24n + BigInt(parsed.hours), "hour", "h");
  } else {
    if (options.hideYear) {
      add(days, "day", "d");
    } else {
      add(days / 365n, "year", "y");
      add(days % 365n, "day", "d");
    }
    add(Number(parsed.hours), "hour", "h");
  }
  add(Number(parsed.minutes), "minute", "m");
  if (!options.hideSeconds) {
    if (options.separateMilliseconds || options.formatSubMilliseconds || !options.colonNotation && milliseconds < 1e3) {
      const seconds = Number(parsed.seconds);
      const milliseconds2 = Number(parsed.milliseconds);
      const microseconds = Number(parsed.microseconds);
      const nanoseconds = Number(parsed.nanoseconds);
      add(seconds, "second", "s");
      if (options.formatSubMilliseconds) {
        add(milliseconds2, "millisecond", "ms");
        add(microseconds, "microsecond", "\xB5s");
        add(nanoseconds, "nanosecond", "ns");
      } else {
        const millisecondsAndBelow = milliseconds2 + microseconds / 1e3 + nanoseconds / 1e6;
        const millisecondsDecimalDigits = typeof options.millisecondsDecimalDigits === "number" ? options.millisecondsDecimalDigits : 0;
        const roundedMilliseconds = millisecondsAndBelow >= 1 ? Math.round(millisecondsAndBelow) : Math.ceil(millisecondsAndBelow);
        const millisecondsString = millisecondsDecimalDigits ? millisecondsAndBelow.toFixed(millisecondsDecimalDigits) : roundedMilliseconds;
        add(
          Number.parseFloat(millisecondsString),
          "millisecond",
          "ms",
          millisecondsString
        );
      }
    } else {
      const seconds = (isBigInt ? Number(milliseconds % ONE_DAY_IN_MILLISECONDS) : milliseconds) / 1e3 % 60;
      const secondsDecimalDigits = typeof options.secondsDecimalDigits === "number" ? options.secondsDecimalDigits : 1;
      const secondsFixed = floorDecimals(seconds, secondsDecimalDigits);
      const secondsString = options.keepDecimalsOnWholeSeconds ? secondsFixed : secondsFixed.replace(/\.0+$/, "");
      add(Number.parseFloat(secondsString), "second", "s", secondsString);
    }
  }
  if (result.length === 0) {
    return sign + "0" + (options.verbose ? " milliseconds" : "ms");
  }
  const separator = options.colonNotation ? ":" : " ";
  if (typeof options.unitCount === "number") {
    result = result.slice(0, Math.max(options.unitCount, 1));
  }
  return sign + result.join(separator);
}
var isZero, pluralize, SECOND_ROUNDING_EPSILON, ONE_DAY_IN_MILLISECONDS;
var init_pretty_ms = __esm({
  "../../node_modules/.pnpm/pretty-ms@9.2.0/node_modules/pretty-ms/index.js"() {
    init_parse_ms();
    isZero = /* @__PURE__ */ __name((value) => value === 0 || value === 0n, "isZero");
    pluralize = /* @__PURE__ */ __name((word, count2) => count2 === 1 || count2 === 1n ? word : `${word}s`, "pluralize");
    SECOND_ROUNDING_EPSILON = 1e-7;
    ONE_DAY_IN_MILLISECONDS = 24n * 60n * 60n * 1000n;
    __name(prettyMilliseconds, "prettyMilliseconds");
  }
});

// ../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/verbose/error.js
var logError;
var init_error = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/verbose/error.js"() {
    init_log();
    logError = /* @__PURE__ */ __name((result, verboseInfo) => {
      if (result.failed) {
        verboseLog({
          type: "error",
          verboseMessage: result.shortMessage,
          verboseInfo,
          result
        });
      }
    }, "logError");
  }
});

// ../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/verbose/complete.js
var logResult, logDuration;
var init_complete = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/verbose/complete.js"() {
    init_pretty_ms();
    init_values();
    init_log();
    init_error();
    logResult = /* @__PURE__ */ __name((result, verboseInfo) => {
      if (!isVerbose(verboseInfo)) {
        return;
      }
      logError(result, verboseInfo);
      logDuration(result, verboseInfo);
    }, "logResult");
    logDuration = /* @__PURE__ */ __name((result, verboseInfo) => {
      const verboseMessage = `(done in ${prettyMilliseconds(result.durationMs)})`;
      verboseLog({
        type: "duration",
        verboseMessage,
        verboseInfo,
        result
      });
    }, "logDuration");
  }
});

// ../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/return/reject.js
var handleResult;
var init_reject = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/return/reject.js"() {
    init_complete();
    handleResult = /* @__PURE__ */ __name((result, verboseInfo, { reject }) => {
      logResult(result, verboseInfo);
      if (result.failed && reject) {
        throw result;
      }
      return result;
    }, "handleResult");
  }
});

// ../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/stdio/type.js
var getStdioItemType, getTransformObjectType, getDuplexType, getTransformStreamType, validateNonGeneratorType, checkUndefinedOption, getGeneratorObjectType, checkBooleanOption, isGenerator2, isAsyncGenerator2, isSyncGenerator, isTransformOptions, isUrl, isRegularUrl, isFilePathObject, FILE_PATH_KEYS, isFilePathString, isUnknownStdioString, KNOWN_STDIO_STRINGS, isReadableStream2, isWritableStream2, isWebStream, isTransformStream, isAsyncIterableObject, isIterableObject, isObject2, TRANSFORM_TYPES, FILE_TYPES, SPECIAL_DUPLICATE_TYPES_SYNC, SPECIAL_DUPLICATE_TYPES, FORBID_DUPLICATE_TYPES, TYPE_TO_MESSAGE;
var init_type = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/stdio/type.js"() {
    init_is_stream();
    init_is_plain_obj();
    init_uint_array();
    getStdioItemType = /* @__PURE__ */ __name((value, optionName) => {
      if (isAsyncGenerator2(value)) {
        return "asyncGenerator";
      }
      if (isSyncGenerator(value)) {
        return "generator";
      }
      if (isUrl(value)) {
        return "fileUrl";
      }
      if (isFilePathObject(value)) {
        return "filePath";
      }
      if (isWebStream(value)) {
        return "webStream";
      }
      if (isStream(value, { checkOpen: false })) {
        return "native";
      }
      if (isUint8Array2(value)) {
        return "uint8Array";
      }
      if (isAsyncIterableObject(value)) {
        return "asyncIterable";
      }
      if (isIterableObject(value)) {
        return "iterable";
      }
      if (isTransformStream(value)) {
        return getTransformStreamType({ transform: value }, optionName);
      }
      if (isTransformOptions(value)) {
        return getTransformObjectType(value, optionName);
      }
      return "native";
    }, "getStdioItemType");
    getTransformObjectType = /* @__PURE__ */ __name((value, optionName) => {
      if (isDuplexStream(value.transform, { checkOpen: false })) {
        return getDuplexType(value, optionName);
      }
      if (isTransformStream(value.transform)) {
        return getTransformStreamType(value, optionName);
      }
      return getGeneratorObjectType(value, optionName);
    }, "getTransformObjectType");
    getDuplexType = /* @__PURE__ */ __name((value, optionName) => {
      validateNonGeneratorType(value, optionName, "Duplex stream");
      return "duplex";
    }, "getDuplexType");
    getTransformStreamType = /* @__PURE__ */ __name((value, optionName) => {
      validateNonGeneratorType(value, optionName, "web TransformStream");
      return "webTransform";
    }, "getTransformStreamType");
    validateNonGeneratorType = /* @__PURE__ */ __name(({ final, binary, objectMode }, optionName, typeName) => {
      checkUndefinedOption(final, `${optionName}.final`, typeName);
      checkUndefinedOption(binary, `${optionName}.binary`, typeName);
      checkBooleanOption(objectMode, `${optionName}.objectMode`);
    }, "validateNonGeneratorType");
    checkUndefinedOption = /* @__PURE__ */ __name((value, optionName, typeName) => {
      if (value !== void 0) {
        throw new TypeError(`The \`${optionName}\` option can only be defined when using a generator, not a ${typeName}.`);
      }
    }, "checkUndefinedOption");
    getGeneratorObjectType = /* @__PURE__ */ __name(({ transform, final, binary, objectMode }, optionName) => {
      if (transform !== void 0 && !isGenerator2(transform)) {
        throw new TypeError(`The \`${optionName}.transform\` option must be a generator, a Duplex stream or a web TransformStream.`);
      }
      if (isDuplexStream(final, { checkOpen: false })) {
        throw new TypeError(`The \`${optionName}.final\` option must not be a Duplex stream.`);
      }
      if (isTransformStream(final)) {
        throw new TypeError(`The \`${optionName}.final\` option must not be a web TransformStream.`);
      }
      if (final !== void 0 && !isGenerator2(final)) {
        throw new TypeError(`The \`${optionName}.final\` option must be a generator.`);
      }
      checkBooleanOption(binary, `${optionName}.binary`);
      checkBooleanOption(objectMode, `${optionName}.objectMode`);
      return isAsyncGenerator2(transform) || isAsyncGenerator2(final) ? "asyncGenerator" : "generator";
    }, "getGeneratorObjectType");
    checkBooleanOption = /* @__PURE__ */ __name((value, optionName) => {
      if (value !== void 0 && typeof value !== "boolean") {
        throw new TypeError(`The \`${optionName}\` option must use a boolean.`);
      }
    }, "checkBooleanOption");
    isGenerator2 = /* @__PURE__ */ __name((value) => isAsyncGenerator2(value) || isSyncGenerator(value), "isGenerator");
    isAsyncGenerator2 = /* @__PURE__ */ __name((value) => Object.prototype.toString.call(value) === "[object AsyncGeneratorFunction]", "isAsyncGenerator");
    isSyncGenerator = /* @__PURE__ */ __name((value) => Object.prototype.toString.call(value) === "[object GeneratorFunction]", "isSyncGenerator");
    isTransformOptions = /* @__PURE__ */ __name((value) => isPlainObject2(value) && (value.transform !== void 0 || value.final !== void 0), "isTransformOptions");
    isUrl = /* @__PURE__ */ __name((value) => Object.prototype.toString.call(value) === "[object URL]", "isUrl");
    isRegularUrl = /* @__PURE__ */ __name((value) => isUrl(value) && value.protocol !== "file:", "isRegularUrl");
    isFilePathObject = /* @__PURE__ */ __name((value) => isPlainObject2(value) && Object.keys(value).length > 0 && Object.keys(value).every((key) => FILE_PATH_KEYS.has(key)) && isFilePathString(value.file), "isFilePathObject");
    FILE_PATH_KEYS = /* @__PURE__ */ new Set(["file", "append"]);
    isFilePathString = /* @__PURE__ */ __name((file) => typeof file === "string", "isFilePathString");
    isUnknownStdioString = /* @__PURE__ */ __name((type, value) => type === "native" && typeof value === "string" && !KNOWN_STDIO_STRINGS.has(value), "isUnknownStdioString");
    KNOWN_STDIO_STRINGS = /* @__PURE__ */ new Set(["ipc", "ignore", "inherit", "overlapped", "pipe"]);
    isReadableStream2 = /* @__PURE__ */ __name((value) => Object.prototype.toString.call(value) === "[object ReadableStream]", "isReadableStream");
    isWritableStream2 = /* @__PURE__ */ __name((value) => Object.prototype.toString.call(value) === "[object WritableStream]", "isWritableStream");
    isWebStream = /* @__PURE__ */ __name((value) => isReadableStream2(value) || isWritableStream2(value), "isWebStream");
    isTransformStream = /* @__PURE__ */ __name((value) => isReadableStream2(value?.readable) && isWritableStream2(value?.writable), "isTransformStream");
    isAsyncIterableObject = /* @__PURE__ */ __name((value) => isObject2(value) && typeof value[Symbol.asyncIterator] === "function", "isAsyncIterableObject");
    isIterableObject = /* @__PURE__ */ __name((value) => isObject2(value) && typeof value[Symbol.iterator] === "function", "isIterableObject");
    isObject2 = /* @__PURE__ */ __name((value) => typeof value === "object" && value !== null, "isObject");
    TRANSFORM_TYPES = /* @__PURE__ */ new Set(["generator", "asyncGenerator", "duplex", "webTransform"]);
    FILE_TYPES = /* @__PURE__ */ new Set(["fileUrl", "filePath", "fileNumber"]);
    SPECIAL_DUPLICATE_TYPES_SYNC = /* @__PURE__ */ new Set(["fileUrl", "filePath"]);
    SPECIAL_DUPLICATE_TYPES = /* @__PURE__ */ new Set([...SPECIAL_DUPLICATE_TYPES_SYNC, "webStream", "nodeStream"]);
    FORBID_DUPLICATE_TYPES = /* @__PURE__ */ new Set(["webTransform", "duplex"]);
    TYPE_TO_MESSAGE = {
      generator: "a generator",
      asyncGenerator: "an async generator",
      fileUrl: "a file URL",
      filePath: "a file path string",
      fileNumber: "a file descriptor number",
      webStream: "a web stream",
      nodeStream: "a Node.js stream",
      webTransform: "a web TransformStream",
      duplex: "a Duplex stream",
      native: "any value",
      iterable: "an iterable",
      asyncIterable: "an async iterable",
      string: "a string",
      uint8Array: "a Uint8Array"
    };
  }
});

// ../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/transform/object-mode.js
var getTransformObjectModes, getOutputObjectModes, getInputObjectModes, getFdObjectMode;
var init_object_mode = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/transform/object-mode.js"() {
    init_type();
    getTransformObjectModes = /* @__PURE__ */ __name((objectMode, index, newTransforms, direction) => direction === "output" ? getOutputObjectModes(objectMode, index, newTransforms) : getInputObjectModes(objectMode, index, newTransforms), "getTransformObjectModes");
    getOutputObjectModes = /* @__PURE__ */ __name((objectMode, index, newTransforms) => {
      const writableObjectMode = index !== 0 && newTransforms[index - 1].value.readableObjectMode;
      const readableObjectMode = objectMode ?? writableObjectMode;
      return { writableObjectMode, readableObjectMode };
    }, "getOutputObjectModes");
    getInputObjectModes = /* @__PURE__ */ __name((objectMode, index, newTransforms) => {
      const writableObjectMode = index === 0 ? objectMode === true : newTransforms[index - 1].value.readableObjectMode;
      const readableObjectMode = index !== newTransforms.length - 1 && (objectMode ?? writableObjectMode);
      return { writableObjectMode, readableObjectMode };
    }, "getInputObjectModes");
    getFdObjectMode = /* @__PURE__ */ __name((stdioItems, direction) => {
      const lastTransform = stdioItems.findLast(({ type }) => TRANSFORM_TYPES.has(type));
      if (lastTransform === void 0) {
        return false;
      }
      return direction === "input" ? lastTransform.value.writableObjectMode : lastTransform.value.readableObjectMode;
    }, "getFdObjectMode");
  }
});

// ../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/transform/normalize.js
var normalizeTransforms, getTransforms, normalizeTransform, normalizeDuplex, normalizeTransformStream, normalizeGenerator, sortTransforms;
var init_normalize = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/transform/normalize.js"() {
    init_is_plain_obj();
    init_encoding_option();
    init_type();
    init_object_mode();
    normalizeTransforms = /* @__PURE__ */ __name((stdioItems, optionName, direction, options) => [
      ...stdioItems.filter(({ type }) => !TRANSFORM_TYPES.has(type)),
      ...getTransforms(stdioItems, optionName, direction, options)
    ], "normalizeTransforms");
    getTransforms = /* @__PURE__ */ __name((stdioItems, optionName, direction, { encoding }) => {
      const transforms = stdioItems.filter(({ type }) => TRANSFORM_TYPES.has(type));
      const newTransforms = Array.from({ length: transforms.length });
      for (const [index, stdioItem] of Object.entries(transforms)) {
        newTransforms[index] = normalizeTransform({
          stdioItem,
          index: Number(index),
          newTransforms,
          optionName,
          direction,
          encoding
        });
      }
      return sortTransforms(newTransforms, direction);
    }, "getTransforms");
    normalizeTransform = /* @__PURE__ */ __name(({ stdioItem, stdioItem: { type }, index, newTransforms, optionName, direction, encoding }) => {
      if (type === "duplex") {
        return normalizeDuplex({ stdioItem, optionName });
      }
      if (type === "webTransform") {
        return normalizeTransformStream({
          stdioItem,
          index,
          newTransforms,
          direction
        });
      }
      return normalizeGenerator({
        stdioItem,
        index,
        newTransforms,
        direction,
        encoding
      });
    }, "normalizeTransform");
    normalizeDuplex = /* @__PURE__ */ __name(({
      stdioItem,
      stdioItem: {
        value: {
          transform,
          transform: { writableObjectMode, readableObjectMode },
          objectMode = readableObjectMode
        }
      },
      optionName
    }) => {
      if (objectMode && !readableObjectMode) {
        throw new TypeError(`The \`${optionName}.objectMode\` option can only be \`true\` if \`new Duplex({objectMode: true})\` is used.`);
      }
      if (!objectMode && readableObjectMode) {
        throw new TypeError(`The \`${optionName}.objectMode\` option cannot be \`false\` if \`new Duplex({objectMode: true})\` is used.`);
      }
      return {
        ...stdioItem,
        value: { transform, writableObjectMode, readableObjectMode }
      };
    }, "normalizeDuplex");
    normalizeTransformStream = /* @__PURE__ */ __name(({ stdioItem, stdioItem: { value }, index, newTransforms, direction }) => {
      const { transform, objectMode } = isPlainObject2(value) ? value : { transform: value };
      const { writableObjectMode, readableObjectMode } = getTransformObjectModes(objectMode, index, newTransforms, direction);
      return {
        ...stdioItem,
        value: { transform, writableObjectMode, readableObjectMode }
      };
    }, "normalizeTransformStream");
    normalizeGenerator = /* @__PURE__ */ __name(({ stdioItem, stdioItem: { value }, index, newTransforms, direction, encoding }) => {
      const {
        transform,
        final,
        binary: binaryOption = false,
        preserveNewlines = false,
        objectMode
      } = isPlainObject2(value) ? value : { transform: value };
      const binary = binaryOption || BINARY_ENCODINGS.has(encoding);
      const { writableObjectMode, readableObjectMode } = getTransformObjectModes(objectMode, index, newTransforms, direction);
      return {
        ...stdioItem,
        value: {
          transform,
          final,
          binary,
          preserveNewlines,
          writableObjectMode,
          readableObjectMode
        }
      };
    }, "normalizeGenerator");
    sortTransforms = /* @__PURE__ */ __name((newTransforms, direction) => direction === "input" ? newTransforms.reverse() : newTransforms, "sortTransforms");
  }
});
var getStreamDirection, getStdioItemDirection, KNOWN_DIRECTIONS, anyDirection, alwaysInput, guessStreamDirection, getStandardStreamDirection, DEFAULT_DIRECTION;
var init_direction = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/stdio/direction.js"() {
    init_is_stream();
    init_type();
    getStreamDirection = /* @__PURE__ */ __name((stdioItems, fdNumber, optionName) => {
      const directions = stdioItems.map((stdioItem) => getStdioItemDirection(stdioItem, fdNumber));
      if (directions.includes("input") && directions.includes("output")) {
        throw new TypeError(`The \`${optionName}\` option must not be an array of both readable and writable values.`);
      }
      return directions.find(Boolean) ?? DEFAULT_DIRECTION;
    }, "getStreamDirection");
    getStdioItemDirection = /* @__PURE__ */ __name(({ type, value }, fdNumber) => KNOWN_DIRECTIONS[fdNumber] ?? guessStreamDirection[type](value), "getStdioItemDirection");
    KNOWN_DIRECTIONS = ["input", "output", "output"];
    anyDirection = /* @__PURE__ */ __name(() => void 0, "anyDirection");
    alwaysInput = /* @__PURE__ */ __name(() => "input", "alwaysInput");
    guessStreamDirection = {
      generator: anyDirection,
      asyncGenerator: anyDirection,
      fileUrl: anyDirection,
      filePath: anyDirection,
      iterable: alwaysInput,
      asyncIterable: alwaysInput,
      uint8Array: alwaysInput,
      webStream: /* @__PURE__ */ __name((value) => isWritableStream2(value) ? "output" : "input", "webStream"),
      nodeStream(value) {
        if (!isReadableStream(value, { checkOpen: false })) {
          return "output";
        }
        return isWritableStream(value, { checkOpen: false }) ? void 0 : "input";
      },
      webTransform: anyDirection,
      duplex: anyDirection,
      native(value) {
        const standardStreamDirection = getStandardStreamDirection(value);
        if (standardStreamDirection !== void 0) {
          return standardStreamDirection;
        }
        if (isStream(value, { checkOpen: false })) {
          return guessStreamDirection.nodeStream(value);
        }
      }
    };
    getStandardStreamDirection = /* @__PURE__ */ __name((value) => {
      if ([0, y2__default.default.stdin].includes(value)) {
        return "input";
      }
      if ([1, 2, y2__default.default.stdout, y2__default.default.stderr].includes(value)) {
        return "output";
      }
    }, "getStandardStreamDirection");
    DEFAULT_DIRECTION = "output";
  }
});

// ../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/ipc/array.js
var normalizeIpcStdioArray;
var init_array2 = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/ipc/array.js"() {
    normalizeIpcStdioArray = /* @__PURE__ */ __name((stdioArray, ipc) => ipc && !stdioArray.includes("ipc") ? [...stdioArray, "ipc"] : stdioArray, "normalizeIpcStdioArray");
  }
});

// ../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/stdio/stdio-option.js
var normalizeStdioOption, getStdioArray, hasAlias, addDefaultValue2, normalizeStdioSync, isOutputPipeOnly;
var init_stdio_option = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/stdio/stdio-option.js"() {
    init_standard_stream();
    init_array2();
    init_values();
    normalizeStdioOption = /* @__PURE__ */ __name(({ stdio, ipc, buffer, ...options }, verboseInfo, isSync) => {
      const stdioArray = getStdioArray(stdio, options).map((stdioOption, fdNumber) => addDefaultValue2(stdioOption, fdNumber));
      return isSync ? normalizeStdioSync(stdioArray, buffer, verboseInfo) : normalizeIpcStdioArray(stdioArray, ipc);
    }, "normalizeStdioOption");
    getStdioArray = /* @__PURE__ */ __name((stdio, options) => {
      if (stdio === void 0) {
        return STANDARD_STREAMS_ALIASES.map((alias) => options[alias]);
      }
      if (hasAlias(options)) {
        throw new Error(`It's not possible to provide \`stdio\` in combination with one of ${STANDARD_STREAMS_ALIASES.map((alias) => `\`${alias}\``).join(", ")}`);
      }
      if (typeof stdio === "string") {
        return [stdio, stdio, stdio];
      }
      if (!Array.isArray(stdio)) {
        throw new TypeError(`Expected \`stdio\` to be of type \`string\` or \`Array\`, got \`${typeof stdio}\``);
      }
      const length = Math.max(stdio.length, STANDARD_STREAMS_ALIASES.length);
      return Array.from({ length }, (_7, fdNumber) => stdio[fdNumber]);
    }, "getStdioArray");
    hasAlias = /* @__PURE__ */ __name((options) => STANDARD_STREAMS_ALIASES.some((alias) => options[alias] !== void 0), "hasAlias");
    addDefaultValue2 = /* @__PURE__ */ __name((stdioOption, fdNumber) => {
      if (Array.isArray(stdioOption)) {
        return stdioOption.map((item) => addDefaultValue2(item, fdNumber));
      }
      if (stdioOption === null || stdioOption === void 0) {
        return fdNumber >= STANDARD_STREAMS_ALIASES.length ? "ignore" : "pipe";
      }
      return stdioOption;
    }, "addDefaultValue");
    normalizeStdioSync = /* @__PURE__ */ __name((stdioArray, buffer, verboseInfo) => stdioArray.map((stdioOption, fdNumber) => !buffer[fdNumber] && fdNumber !== 0 && !isFullVerbose(verboseInfo, fdNumber) && isOutputPipeOnly(stdioOption) ? "ignore" : stdioOption), "normalizeStdioSync");
    isOutputPipeOnly = /* @__PURE__ */ __name((stdioOption) => stdioOption === "pipe" || Array.isArray(stdioOption) && stdioOption.every((item) => item === "pipe"), "isOutputPipeOnly");
  }
});
var handleNativeStream, handleNativeStreamSync, getTargetFd, getTargetFdNumber, handleNativeStreamAsync, getStandardStream;
var init_native = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/stdio/native.js"() {
    init_is_stream();
    init_standard_stream();
    init_uint_array();
    init_fd_options();
    handleNativeStream = /* @__PURE__ */ __name(({ stdioItem, stdioItem: { type }, isStdioArray, fdNumber, direction, isSync }) => {
      if (!isStdioArray || type !== "native") {
        return stdioItem;
      }
      return isSync ? handleNativeStreamSync({ stdioItem, fdNumber, direction }) : handleNativeStreamAsync({ stdioItem, fdNumber });
    }, "handleNativeStream");
    handleNativeStreamSync = /* @__PURE__ */ __name(({ stdioItem, stdioItem: { value, optionName }, fdNumber, direction }) => {
      const targetFd = getTargetFd({
        value,
        optionName,
        fdNumber,
        direction
      });
      if (targetFd !== void 0) {
        return targetFd;
      }
      if (isStream(value, { checkOpen: false })) {
        throw new TypeError(`The \`${optionName}: Stream\` option cannot both be an array and include a stream with synchronous methods.`);
      }
      return stdioItem;
    }, "handleNativeStreamSync");
    getTargetFd = /* @__PURE__ */ __name(({ value, optionName, fdNumber, direction }) => {
      const targetFdNumber = getTargetFdNumber(value, fdNumber);
      if (targetFdNumber === void 0) {
        return;
      }
      if (direction === "output") {
        return { type: "fileNumber", value: targetFdNumber, optionName };
      }
      if (tty__default.default.isatty(targetFdNumber)) {
        throw new TypeError(`The \`${optionName}: ${serializeOptionValue(value)}\` option is invalid: it cannot be a TTY with synchronous methods.`);
      }
      return { type: "uint8Array", value: bufferToUint8Array(fs2.readFileSync(targetFdNumber)), optionName };
    }, "getTargetFd");
    getTargetFdNumber = /* @__PURE__ */ __name((value, fdNumber) => {
      if (value === "inherit") {
        return fdNumber;
      }
      if (typeof value === "number") {
        return value;
      }
      const standardStreamIndex = STANDARD_STREAMS.indexOf(value);
      if (standardStreamIndex !== -1) {
        return standardStreamIndex;
      }
    }, "getTargetFdNumber");
    handleNativeStreamAsync = /* @__PURE__ */ __name(({ stdioItem, stdioItem: { value, optionName }, fdNumber }) => {
      if (value === "inherit") {
        return { type: "nodeStream", value: getStandardStream(fdNumber, value, optionName), optionName };
      }
      if (typeof value === "number") {
        return { type: "nodeStream", value: getStandardStream(value, value, optionName), optionName };
      }
      if (isStream(value, { checkOpen: false })) {
        return { type: "nodeStream", value, optionName };
      }
      return stdioItem;
    }, "handleNativeStreamAsync");
    getStandardStream = /* @__PURE__ */ __name((fdNumber, value, optionName) => {
      const standardStream = STANDARD_STREAMS[fdNumber];
      if (standardStream === void 0) {
        throw new TypeError(`The \`${optionName}: ${value}\` option is invalid: no such standard stream.`);
      }
      return standardStream;
    }, "getStandardStream");
  }
});

// ../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/stdio/input-option.js
var handleInputOptions, handleInputOption, getInputType, handleInputFileOption, getInputFileType;
var init_input_option = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/stdio/input-option.js"() {
    init_is_stream();
    init_uint_array();
    init_type();
    handleInputOptions = /* @__PURE__ */ __name(({ input, inputFile }, fdNumber) => fdNumber === 0 ? [
      ...handleInputOption(input),
      ...handleInputFileOption(inputFile)
    ] : [], "handleInputOptions");
    handleInputOption = /* @__PURE__ */ __name((input) => input === void 0 ? [] : [{
      type: getInputType(input),
      value: input,
      optionName: "input"
    }], "handleInputOption");
    getInputType = /* @__PURE__ */ __name((input) => {
      if (isReadableStream(input, { checkOpen: false })) {
        return "nodeStream";
      }
      if (typeof input === "string") {
        return "string";
      }
      if (isUint8Array2(input)) {
        return "uint8Array";
      }
      throw new Error("The `input` option must be a string, a Uint8Array or a Node.js Readable stream.");
    }, "getInputType");
    handleInputFileOption = /* @__PURE__ */ __name((inputFile) => inputFile === void 0 ? [] : [{
      ...getInputFileType(inputFile),
      optionName: "inputFile"
    }], "handleInputFileOption");
    getInputFileType = /* @__PURE__ */ __name((inputFile) => {
      if (isUrl(inputFile)) {
        return { type: "fileUrl", value: inputFile };
      }
      if (isFilePathString(inputFile)) {
        return { type: "filePath", value: { file: inputFile } };
      }
      throw new Error("The `inputFile` option must be a file path string or a file URL.");
    }, "getInputFileType");
  }
});

// ../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/stdio/duplicate.js
var filterDuplicates, getDuplicateStream, getOtherStdioItems, validateDuplicateStreamSync, getDuplicateStreamInstance, hasSameValue, validateDuplicateTransform, throwOnDuplicateStream;
var init_duplicate = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/stdio/duplicate.js"() {
    init_type();
    filterDuplicates = /* @__PURE__ */ __name((stdioItems) => stdioItems.filter((stdioItemOne, indexOne) => stdioItems.every((stdioItemTwo, indexTwo) => stdioItemOne.value !== stdioItemTwo.value || indexOne >= indexTwo || stdioItemOne.type === "generator" || stdioItemOne.type === "asyncGenerator")), "filterDuplicates");
    getDuplicateStream = /* @__PURE__ */ __name(({ stdioItem: { type, value, optionName }, direction, fileDescriptors, isSync }) => {
      const otherStdioItems = getOtherStdioItems(fileDescriptors, type);
      if (otherStdioItems.length === 0) {
        return;
      }
      if (isSync) {
        validateDuplicateStreamSync({
          otherStdioItems,
          type,
          value,
          optionName,
          direction
        });
        return;
      }
      if (SPECIAL_DUPLICATE_TYPES.has(type)) {
        return getDuplicateStreamInstance({
          otherStdioItems,
          type,
          value,
          optionName,
          direction
        });
      }
      if (FORBID_DUPLICATE_TYPES.has(type)) {
        validateDuplicateTransform({
          otherStdioItems,
          type,
          value,
          optionName
        });
      }
    }, "getDuplicateStream");
    getOtherStdioItems = /* @__PURE__ */ __name((fileDescriptors, type) => fileDescriptors.flatMap(({ direction, stdioItems }) => stdioItems.filter((stdioItem) => stdioItem.type === type).map(((stdioItem) => ({ ...stdioItem, direction })))), "getOtherStdioItems");
    validateDuplicateStreamSync = /* @__PURE__ */ __name(({ otherStdioItems, type, value, optionName, direction }) => {
      if (SPECIAL_DUPLICATE_TYPES_SYNC.has(type)) {
        getDuplicateStreamInstance({
          otherStdioItems,
          type,
          value,
          optionName,
          direction
        });
      }
    }, "validateDuplicateStreamSync");
    getDuplicateStreamInstance = /* @__PURE__ */ __name(({ otherStdioItems, type, value, optionName, direction }) => {
      const duplicateStdioItems = otherStdioItems.filter((stdioItem) => hasSameValue(stdioItem, value));
      if (duplicateStdioItems.length === 0) {
        return;
      }
      const differentStdioItem = duplicateStdioItems.find((stdioItem) => stdioItem.direction !== direction);
      throwOnDuplicateStream(differentStdioItem, optionName, type);
      return direction === "output" ? duplicateStdioItems[0].stream : void 0;
    }, "getDuplicateStreamInstance");
    hasSameValue = /* @__PURE__ */ __name(({ type, value }, secondValue) => {
      if (type === "filePath") {
        return value.file === secondValue.file;
      }
      if (type === "fileUrl") {
        return value.href === secondValue.href;
      }
      return value === secondValue;
    }, "hasSameValue");
    validateDuplicateTransform = /* @__PURE__ */ __name(({ otherStdioItems, type, value, optionName }) => {
      const duplicateStdioItem = otherStdioItems.find(({ value: { transform } }) => transform === value.transform);
      throwOnDuplicateStream(duplicateStdioItem, optionName, type);
    }, "validateDuplicateTransform");
    throwOnDuplicateStream = /* @__PURE__ */ __name((stdioItem, optionName, type) => {
      if (stdioItem !== void 0) {
        throw new TypeError(`The \`${stdioItem.optionName}\` and \`${optionName}\` options must not target ${TYPE_TO_MESSAGE[type]} that is the same.`);
      }
    }, "throwOnDuplicateStream");
  }
});

// ../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/stdio/handle.js
var handleStdio, getFileDescriptor, initializeStdioItems, initializeStdioItem, validateStdioArray, INVALID_STDIO_ARRAY_OPTIONS, validateStreams, validateFileStdio, validateFileObjectMode, getFinalFileDescriptors, getFinalFileDescriptor, addStreamProperties, cleanupCustomStreams, forwardStdio;
var init_handle = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/stdio/handle.js"() {
    init_standard_stream();
    init_normalize();
    init_object_mode();
    init_type();
    init_direction();
    init_stdio_option();
    init_native();
    init_input_option();
    init_duplicate();
    handleStdio = /* @__PURE__ */ __name((addProperties3, options, verboseInfo, isSync) => {
      const stdio = normalizeStdioOption(options, verboseInfo, isSync);
      const initialFileDescriptors = stdio.map((stdioOption, fdNumber) => getFileDescriptor({
        stdioOption,
        fdNumber,
        options,
        isSync
      }));
      const fileDescriptors = getFinalFileDescriptors({
        initialFileDescriptors,
        addProperties: addProperties3,
        options,
        isSync
      });
      options.stdio = fileDescriptors.map(({ stdioItems }) => forwardStdio(stdioItems));
      return fileDescriptors;
    }, "handleStdio");
    getFileDescriptor = /* @__PURE__ */ __name(({ stdioOption, fdNumber, options, isSync }) => {
      const optionName = getStreamName(fdNumber);
      const { stdioItems: initialStdioItems, isStdioArray } = initializeStdioItems({
        stdioOption,
        fdNumber,
        options,
        optionName
      });
      const direction = getStreamDirection(initialStdioItems, fdNumber, optionName);
      const stdioItems = initialStdioItems.map((stdioItem) => handleNativeStream({
        stdioItem,
        isStdioArray,
        fdNumber,
        direction,
        isSync
      }));
      const normalizedStdioItems = normalizeTransforms(stdioItems, optionName, direction, options);
      const objectMode = getFdObjectMode(normalizedStdioItems, direction);
      validateFileObjectMode(normalizedStdioItems, objectMode);
      return { direction, objectMode, stdioItems: normalizedStdioItems };
    }, "getFileDescriptor");
    initializeStdioItems = /* @__PURE__ */ __name(({ stdioOption, fdNumber, options, optionName }) => {
      const values = Array.isArray(stdioOption) ? stdioOption : [stdioOption];
      const initialStdioItems = [
        ...values.map((value) => initializeStdioItem(value, optionName)),
        ...handleInputOptions(options, fdNumber)
      ];
      const stdioItems = filterDuplicates(initialStdioItems);
      const isStdioArray = stdioItems.length > 1;
      validateStdioArray(stdioItems, isStdioArray, optionName);
      validateStreams(stdioItems);
      return { stdioItems, isStdioArray };
    }, "initializeStdioItems");
    initializeStdioItem = /* @__PURE__ */ __name((value, optionName) => ({
      type: getStdioItemType(value, optionName),
      value,
      optionName
    }), "initializeStdioItem");
    validateStdioArray = /* @__PURE__ */ __name((stdioItems, isStdioArray, optionName) => {
      if (stdioItems.length === 0) {
        throw new TypeError(`The \`${optionName}\` option must not be an empty array.`);
      }
      if (!isStdioArray) {
        return;
      }
      for (const { value, optionName: optionName2 } of stdioItems) {
        if (INVALID_STDIO_ARRAY_OPTIONS.has(value)) {
          throw new Error(`The \`${optionName2}\` option must not include \`${value}\`.`);
        }
      }
    }, "validateStdioArray");
    INVALID_STDIO_ARRAY_OPTIONS = /* @__PURE__ */ new Set(["ignore", "ipc"]);
    validateStreams = /* @__PURE__ */ __name((stdioItems) => {
      for (const stdioItem of stdioItems) {
        validateFileStdio(stdioItem);
      }
    }, "validateStreams");
    validateFileStdio = /* @__PURE__ */ __name(({ type, value, optionName }) => {
      if (isRegularUrl(value)) {
        throw new TypeError(`The \`${optionName}: URL\` option must use the \`file:\` scheme.
For example, you can use the \`pathToFileURL()\` method of the \`url\` core module.`);
      }
      if (isUnknownStdioString(type, value)) {
        throw new TypeError(`The \`${optionName}: { file: '...' }\` option must be used instead of \`${optionName}: '...'\`.`);
      }
    }, "validateFileStdio");
    validateFileObjectMode = /* @__PURE__ */ __name((stdioItems, objectMode) => {
      if (!objectMode) {
        return;
      }
      const fileStdioItem = stdioItems.find(({ type }) => FILE_TYPES.has(type));
      if (fileStdioItem !== void 0) {
        throw new TypeError(`The \`${fileStdioItem.optionName}\` option cannot use both files and transforms in objectMode.`);
      }
    }, "validateFileObjectMode");
    getFinalFileDescriptors = /* @__PURE__ */ __name(({ initialFileDescriptors, addProperties: addProperties3, options, isSync }) => {
      const fileDescriptors = [];
      try {
        for (const fileDescriptor of initialFileDescriptors) {
          fileDescriptors.push(getFinalFileDescriptor({
            fileDescriptor,
            fileDescriptors,
            addProperties: addProperties3,
            options,
            isSync
          }));
        }
        return fileDescriptors;
      } catch (error) {
        cleanupCustomStreams(fileDescriptors);
        throw error;
      }
    }, "getFinalFileDescriptors");
    getFinalFileDescriptor = /* @__PURE__ */ __name(({
      fileDescriptor: { direction, objectMode, stdioItems },
      fileDescriptors,
      addProperties: addProperties3,
      options,
      isSync
    }) => {
      const finalStdioItems = stdioItems.map((stdioItem) => addStreamProperties({
        stdioItem,
        addProperties: addProperties3,
        direction,
        options,
        fileDescriptors,
        isSync
      }));
      return { direction, objectMode, stdioItems: finalStdioItems };
    }, "getFinalFileDescriptor");
    addStreamProperties = /* @__PURE__ */ __name(({ stdioItem, addProperties: addProperties3, direction, options, fileDescriptors, isSync }) => {
      const duplicateStream = getDuplicateStream({
        stdioItem,
        direction,
        fileDescriptors,
        isSync
      });
      if (duplicateStream !== void 0) {
        return { ...stdioItem, stream: duplicateStream };
      }
      return {
        ...stdioItem,
        ...addProperties3[direction][stdioItem.type](stdioItem, options)
      };
    }, "addStreamProperties");
    cleanupCustomStreams = /* @__PURE__ */ __name((fileDescriptors) => {
      for (const { stdioItems } of fileDescriptors) {
        for (const { stream } of stdioItems) {
          if (stream !== void 0 && !isStandardStream(stream)) {
            stream.destroy();
          }
        }
      }
    }, "cleanupCustomStreams");
    forwardStdio = /* @__PURE__ */ __name((stdioItems) => {
      if (stdioItems.length > 1) {
        return stdioItems.some(({ value: value2 }) => value2 === "overlapped") ? "overlapped" : "pipe";
      }
      const [{ type, value }] = stdioItems;
      return type === "native" ? value : "pipe";
    }, "forwardStdio");
  }
});
var handleStdioSync, forbiddenIfSync, forbiddenNativeIfSync, throwInvalidSyncValue, addProperties, addPropertiesSync;
var init_handle_sync = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/stdio/handle-sync.js"() {
    init_uint_array();
    init_handle();
    init_type();
    handleStdioSync = /* @__PURE__ */ __name((options, verboseInfo) => handleStdio(addPropertiesSync, options, verboseInfo, true), "handleStdioSync");
    forbiddenIfSync = /* @__PURE__ */ __name(({ type, optionName }) => {
      throwInvalidSyncValue(optionName, TYPE_TO_MESSAGE[type]);
    }, "forbiddenIfSync");
    forbiddenNativeIfSync = /* @__PURE__ */ __name(({ optionName, value }) => {
      if (value === "ipc" || value === "overlapped") {
        throwInvalidSyncValue(optionName, `"${value}"`);
      }
      return {};
    }, "forbiddenNativeIfSync");
    throwInvalidSyncValue = /* @__PURE__ */ __name((optionName, value) => {
      throw new TypeError(`The \`${optionName}\` option cannot be ${value} with synchronous methods.`);
    }, "throwInvalidSyncValue");
    addProperties = {
      generator() {
      },
      asyncGenerator: forbiddenIfSync,
      webStream: forbiddenIfSync,
      nodeStream: forbiddenIfSync,
      webTransform: forbiddenIfSync,
      duplex: forbiddenIfSync,
      asyncIterable: forbiddenIfSync,
      native: forbiddenNativeIfSync
    };
    addPropertiesSync = {
      input: {
        ...addProperties,
        fileUrl: /* @__PURE__ */ __name(({ value }) => ({ contents: [bufferToUint8Array(fs2.readFileSync(value))] }), "fileUrl"),
        filePath: /* @__PURE__ */ __name(({ value: { file } }) => ({ contents: [bufferToUint8Array(fs2.readFileSync(file))] }), "filePath"),
        fileNumber: forbiddenIfSync,
        iterable: /* @__PURE__ */ __name(({ value }) => ({ contents: [...value] }), "iterable"),
        string: /* @__PURE__ */ __name(({ value }) => ({ contents: [value] }), "string"),
        uint8Array: /* @__PURE__ */ __name(({ value }) => ({ contents: [value] }), "uint8Array")
      },
      output: {
        ...addProperties,
        fileUrl: /* @__PURE__ */ __name(({ value }) => ({ path: value }), "fileUrl"),
        filePath: /* @__PURE__ */ __name(({ value: { file, append } }) => ({ path: file, append }), "filePath"),
        fileNumber: /* @__PURE__ */ __name(({ value }) => ({ path: value }), "fileNumber"),
        iterable: forbiddenIfSync,
        string: forbiddenIfSync,
        uint8Array: forbiddenIfSync
      }
    };
  }
});

// ../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/io/strip-newline.js
var stripNewline, getStripFinalNewline;
var init_strip_newline = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/io/strip-newline.js"() {
    init_strip_final_newline();
    stripNewline = /* @__PURE__ */ __name((value, { stripFinalNewline: stripFinalNewline2 }, fdNumber) => getStripFinalNewline(stripFinalNewline2, fdNumber) && value !== void 0 && !Array.isArray(value) ? stripFinalNewline(value) : value, "stripNewline");
    getStripFinalNewline = /* @__PURE__ */ __name((stripFinalNewline2, fdNumber) => fdNumber === "all" ? stripFinalNewline2[1] || stripFinalNewline2[2] : stripFinalNewline2[fdNumber], "getStripFinalNewline");
  }
});

// ../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/transform/split.js
var getSplitLinesGenerator, splitLinesSync, splitLinesItemSync, initializeSplitLines, splitGenerator, getNewlineLength, linesFinal, getAppendNewlineGenerator, appendNewlineGenerator, concatString, linesStringInfo, concatUint8Array, linesUint8ArrayInfo;
var init_split = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/transform/split.js"() {
    getSplitLinesGenerator = /* @__PURE__ */ __name((binary, preserveNewlines, skipped, state) => binary || skipped ? void 0 : initializeSplitLines(preserveNewlines, state), "getSplitLinesGenerator");
    splitLinesSync = /* @__PURE__ */ __name((chunk, preserveNewlines, objectMode) => objectMode ? chunk.flatMap((item) => splitLinesItemSync(item, preserveNewlines)) : splitLinesItemSync(chunk, preserveNewlines), "splitLinesSync");
    splitLinesItemSync = /* @__PURE__ */ __name((chunk, preserveNewlines) => {
      const { transform, final } = initializeSplitLines(preserveNewlines, {});
      return [...transform(chunk), ...final()];
    }, "splitLinesItemSync");
    initializeSplitLines = /* @__PURE__ */ __name((preserveNewlines, state) => {
      state.previousChunks = "";
      return {
        transform: splitGenerator.bind(void 0, state, preserveNewlines),
        final: linesFinal.bind(void 0, state)
      };
    }, "initializeSplitLines");
    splitGenerator = /* @__PURE__ */ __name(function* (state, preserveNewlines, chunk) {
      if (typeof chunk !== "string") {
        yield chunk;
        return;
      }
      let { previousChunks } = state;
      let start = -1;
      for (let end = 0; end < chunk.length; end += 1) {
        if (chunk[end] === "\n") {
          const newlineLength = getNewlineLength(chunk, end, preserveNewlines, state);
          let line = chunk.slice(start + 1, end + 1 - newlineLength);
          if (previousChunks.length > 0) {
            line = concatString(previousChunks, line);
            previousChunks = "";
          }
          yield line;
          start = end;
        }
      }
      if (start !== chunk.length - 1) {
        previousChunks = concatString(previousChunks, chunk.slice(start + 1));
      }
      state.previousChunks = previousChunks;
    }, "splitGenerator");
    getNewlineLength = /* @__PURE__ */ __name((chunk, end, preserveNewlines, state) => {
      if (preserveNewlines) {
        return 0;
      }
      state.isWindowsNewline = end !== 0 && chunk[end - 1] === "\r";
      return state.isWindowsNewline ? 2 : 1;
    }, "getNewlineLength");
    linesFinal = /* @__PURE__ */ __name(function* ({ previousChunks }) {
      if (previousChunks.length > 0) {
        yield previousChunks;
      }
    }, "linesFinal");
    getAppendNewlineGenerator = /* @__PURE__ */ __name(({ binary, preserveNewlines, readableObjectMode, state }) => binary || preserveNewlines || readableObjectMode ? void 0 : { transform: appendNewlineGenerator.bind(void 0, state) }, "getAppendNewlineGenerator");
    appendNewlineGenerator = /* @__PURE__ */ __name(function* ({ isWindowsNewline = false }, chunk) {
      const { unixNewline, windowsNewline, LF: LF2, concatBytes } = typeof chunk === "string" ? linesStringInfo : linesUint8ArrayInfo;
      if (chunk.at(-1) === LF2) {
        yield chunk;
        return;
      }
      const newline = isWindowsNewline ? windowsNewline : unixNewline;
      yield concatBytes(chunk, newline);
    }, "appendNewlineGenerator");
    concatString = /* @__PURE__ */ __name((firstChunk, secondChunk) => `${firstChunk}${secondChunk}`, "concatString");
    linesStringInfo = {
      windowsNewline: "\r\n",
      unixNewline: "\n",
      LF: "\n",
      concatBytes: concatString
    };
    concatUint8Array = /* @__PURE__ */ __name((firstChunk, secondChunk) => {
      const chunk = new Uint8Array(firstChunk.length + secondChunk.length);
      chunk.set(firstChunk, 0);
      chunk.set(secondChunk, firstChunk.length);
      return chunk;
    }, "concatUint8Array");
    linesUint8ArrayInfo = {
      windowsNewline: new Uint8Array([13, 10]),
      unixNewline: new Uint8Array([10]),
      LF: 10,
      concatBytes: concatUint8Array
    };
  }
});
var getValidateTransformInput, validateStringTransformInput, getValidateTransformReturn, validateObjectTransformReturn, validateStringTransformReturn, validateEmptyReturn;
var init_validate = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/transform/validate.js"() {
    init_uint_array();
    getValidateTransformInput = /* @__PURE__ */ __name((writableObjectMode, optionName) => writableObjectMode ? void 0 : validateStringTransformInput.bind(void 0, optionName), "getValidateTransformInput");
    validateStringTransformInput = /* @__PURE__ */ __name(function* (optionName, chunk) {
      if (typeof chunk !== "string" && !isUint8Array2(chunk) && !buffer.Buffer.isBuffer(chunk)) {
        throw new TypeError(`The \`${optionName}\` option's transform must use "objectMode: true" to receive as input: ${typeof chunk}.`);
      }
      yield chunk;
    }, "validateStringTransformInput");
    getValidateTransformReturn = /* @__PURE__ */ __name((readableObjectMode, optionName) => readableObjectMode ? validateObjectTransformReturn.bind(void 0, optionName) : validateStringTransformReturn.bind(void 0, optionName), "getValidateTransformReturn");
    validateObjectTransformReturn = /* @__PURE__ */ __name(function* (optionName, chunk) {
      validateEmptyReturn(optionName, chunk);
      yield chunk;
    }, "validateObjectTransformReturn");
    validateStringTransformReturn = /* @__PURE__ */ __name(function* (optionName, chunk) {
      validateEmptyReturn(optionName, chunk);
      if (typeof chunk !== "string" && !isUint8Array2(chunk)) {
        throw new TypeError(`The \`${optionName}\` option's function must yield a string or an Uint8Array, not ${typeof chunk}.`);
      }
      yield chunk;
    }, "validateStringTransformReturn");
    validateEmptyReturn = /* @__PURE__ */ __name((optionName, chunk) => {
      if (chunk === null || chunk === void 0) {
        throw new TypeError(`The \`${optionName}\` option's function must not call \`yield ${chunk}\`.
Instead, \`yield\` should either be called with a value, or not be called at all. For example:
  if (condition) { yield value; }`);
      }
    }, "validateEmptyReturn");
  }
});
var getEncodingTransformGenerator, encodingUint8ArrayGenerator, encodingStringGenerator, encodingStringFinal;
var init_encoding_transform = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/transform/encoding-transform.js"() {
    init_uint_array();
    getEncodingTransformGenerator = /* @__PURE__ */ __name((binary, encoding, skipped) => {
      if (skipped) {
        return;
      }
      if (binary) {
        return { transform: encodingUint8ArrayGenerator.bind(void 0, new TextEncoder()) };
      }
      const stringDecoder = new string_decoder.StringDecoder(encoding);
      return {
        transform: encodingStringGenerator.bind(void 0, stringDecoder),
        final: encodingStringFinal.bind(void 0, stringDecoder)
      };
    }, "getEncodingTransformGenerator");
    encodingUint8ArrayGenerator = /* @__PURE__ */ __name(function* (textEncoder3, chunk) {
      if (buffer.Buffer.isBuffer(chunk)) {
        yield bufferToUint8Array(chunk);
      } else if (typeof chunk === "string") {
        yield textEncoder3.encode(chunk);
      } else {
        yield chunk;
      }
    }, "encodingUint8ArrayGenerator");
    encodingStringGenerator = /* @__PURE__ */ __name(function* (stringDecoder, chunk) {
      yield isUint8Array2(chunk) ? stringDecoder.write(chunk) : chunk;
    }, "encodingStringGenerator");
    encodingStringFinal = /* @__PURE__ */ __name(function* (stringDecoder) {
      const lastChunk = stringDecoder.end();
      if (lastChunk !== "") {
        yield lastChunk;
      }
    }, "encodingStringFinal");
  }
});
var pushChunks, transformChunk, finalChunks, generatorFinalChunks, destroyTransform, identityGenerator;
var init_run_async = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/transform/run-async.js"() {
    pushChunks = util.callbackify(async (getChunks, state, getChunksArguments, transformStream) => {
      state.currentIterable = getChunks(...getChunksArguments);
      try {
        for await (const chunk of state.currentIterable) {
          transformStream.push(chunk);
        }
      } finally {
        delete state.currentIterable;
      }
    });
    transformChunk = /* @__PURE__ */ __name(async function* (chunk, generators, index) {
      if (index === generators.length) {
        yield chunk;
        return;
      }
      const { transform = identityGenerator } = generators[index];
      for await (const transformedChunk of transform(chunk)) {
        yield* transformChunk(transformedChunk, generators, index + 1);
      }
    }, "transformChunk");
    finalChunks = /* @__PURE__ */ __name(async function* (generators) {
      for (const [index, { final }] of Object.entries(generators)) {
        yield* generatorFinalChunks(final, Number(index), generators);
      }
    }, "finalChunks");
    generatorFinalChunks = /* @__PURE__ */ __name(async function* (final, index, generators) {
      if (final === void 0) {
        return;
      }
      for await (const finalChunk of final()) {
        yield* transformChunk(finalChunk, generators, index + 1);
      }
    }, "generatorFinalChunks");
    destroyTransform = util.callbackify(async ({ currentIterable }, error) => {
      if (currentIterable !== void 0) {
        await (error ? currentIterable.throw(error) : currentIterable.return());
        return;
      }
      if (error) {
        throw error;
      }
    });
    identityGenerator = /* @__PURE__ */ __name(function* (chunk) {
      yield chunk;
    }, "identityGenerator");
  }
});

// ../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/transform/run-sync.js
var pushChunksSync, runTransformSync, transformChunkSync, finalChunksSync, generatorFinalChunksSync, identityGenerator2;
var init_run_sync = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/transform/run-sync.js"() {
    pushChunksSync = /* @__PURE__ */ __name((getChunksSync, getChunksArguments, transformStream, done) => {
      try {
        for (const chunk of getChunksSync(...getChunksArguments)) {
          transformStream.push(chunk);
        }
        done();
      } catch (error) {
        done(error);
      }
    }, "pushChunksSync");
    runTransformSync = /* @__PURE__ */ __name((generators, chunks) => [
      ...chunks.flatMap((chunk) => [...transformChunkSync(chunk, generators, 0)]),
      ...finalChunksSync(generators)
    ], "runTransformSync");
    transformChunkSync = /* @__PURE__ */ __name(function* (chunk, generators, index) {
      if (index === generators.length) {
        yield chunk;
        return;
      }
      const { transform = identityGenerator2 } = generators[index];
      for (const transformedChunk of transform(chunk)) {
        yield* transformChunkSync(transformedChunk, generators, index + 1);
      }
    }, "transformChunkSync");
    finalChunksSync = /* @__PURE__ */ __name(function* (generators) {
      for (const [index, { final }] of Object.entries(generators)) {
        yield* generatorFinalChunksSync(final, Number(index), generators);
      }
    }, "finalChunksSync");
    generatorFinalChunksSync = /* @__PURE__ */ __name(function* (final, index, generators) {
      if (final === void 0) {
        return;
      }
      for (const finalChunk of final()) {
        yield* transformChunkSync(finalChunk, generators, index + 1);
      }
    }, "generatorFinalChunksSync");
    identityGenerator2 = /* @__PURE__ */ __name(function* (chunk) {
      yield chunk;
    }, "identityGenerator");
  }
});
var generatorToStream, runGeneratorsSync, addInternalGenerators;
var init_generator = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/transform/generator.js"() {
    init_type();
    init_split();
    init_validate();
    init_encoding_transform();
    init_run_async();
    init_run_sync();
    generatorToStream = /* @__PURE__ */ __name(({
      value,
      value: { transform, final, writableObjectMode, readableObjectMode },
      optionName
    }, { encoding }) => {
      const state = {};
      const generators = addInternalGenerators(value, encoding, optionName);
      const transformAsync = isAsyncGenerator2(transform);
      const finalAsync = isAsyncGenerator2(final);
      const transformMethod = transformAsync ? pushChunks.bind(void 0, transformChunk, state) : pushChunksSync.bind(void 0, transformChunkSync);
      const finalMethod = transformAsync || finalAsync ? pushChunks.bind(void 0, finalChunks, state) : pushChunksSync.bind(void 0, finalChunksSync);
      const destroyMethod = transformAsync || finalAsync ? destroyTransform.bind(void 0, state) : void 0;
      const stream$1 = new stream.Transform({
        writableObjectMode,
        writableHighWaterMark: stream.getDefaultHighWaterMark(writableObjectMode),
        readableObjectMode,
        readableHighWaterMark: stream.getDefaultHighWaterMark(readableObjectMode),
        transform(chunk, encoding2, done) {
          transformMethod([chunk, generators, 0], this, done);
        },
        flush(done) {
          finalMethod([generators], this, done);
        },
        destroy: destroyMethod
      });
      return { stream: stream$1 };
    }, "generatorToStream");
    runGeneratorsSync = /* @__PURE__ */ __name((chunks, stdioItems, encoding, isInput) => {
      const generators = stdioItems.filter(({ type }) => type === "generator");
      const reversedGenerators = isInput ? generators.reverse() : generators;
      for (const { value, optionName } of reversedGenerators) {
        const generators2 = addInternalGenerators(value, encoding, optionName);
        chunks = runTransformSync(generators2, chunks);
      }
      return chunks;
    }, "runGeneratorsSync");
    addInternalGenerators = /* @__PURE__ */ __name(({ transform, final, binary, writableObjectMode, readableObjectMode, preserveNewlines }, encoding, optionName) => {
      const state = {};
      return [
        { transform: getValidateTransformInput(writableObjectMode, optionName) },
        getEncodingTransformGenerator(binary, encoding, writableObjectMode),
        getSplitLinesGenerator(binary, preserveNewlines, writableObjectMode, state),
        { transform, final },
        { transform: getValidateTransformReturn(readableObjectMode, optionName) },
        getAppendNewlineGenerator({
          binary,
          preserveNewlines,
          readableObjectMode,
          state
        })
      ].filter(Boolean);
    }, "addInternalGenerators");
  }
});

// ../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/io/input-sync.js
var addInputOptionsSync, getInputFdNumbers, addInputOptionSync, applySingleInputGeneratorsSync, validateSerializable;
var init_input_sync = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/io/input-sync.js"() {
    init_generator();
    init_uint_array();
    init_type();
    addInputOptionsSync = /* @__PURE__ */ __name((fileDescriptors, options) => {
      for (const fdNumber of getInputFdNumbers(fileDescriptors)) {
        addInputOptionSync(fileDescriptors, fdNumber, options);
      }
    }, "addInputOptionsSync");
    getInputFdNumbers = /* @__PURE__ */ __name((fileDescriptors) => new Set(Object.entries(fileDescriptors).filter(([, { direction }]) => direction === "input").map(([fdNumber]) => Number(fdNumber))), "getInputFdNumbers");
    addInputOptionSync = /* @__PURE__ */ __name((fileDescriptors, fdNumber, options) => {
      const { stdioItems } = fileDescriptors[fdNumber];
      const allStdioItems = stdioItems.filter(({ contents }) => contents !== void 0);
      if (allStdioItems.length === 0) {
        return;
      }
      if (fdNumber !== 0) {
        const [{ type, optionName }] = allStdioItems;
        throw new TypeError(`Only the \`stdin\` option, not \`${optionName}\`, can be ${TYPE_TO_MESSAGE[type]} with synchronous methods.`);
      }
      const allContents = allStdioItems.map(({ contents }) => contents);
      const transformedContents = allContents.map((contents) => applySingleInputGeneratorsSync(contents, stdioItems));
      options.input = joinToUint8Array(transformedContents);
    }, "addInputOptionSync");
    applySingleInputGeneratorsSync = /* @__PURE__ */ __name((contents, stdioItems) => {
      const newContents = runGeneratorsSync(contents, stdioItems, "utf8", true);
      validateSerializable(newContents);
      return joinToUint8Array(newContents);
    }, "applySingleInputGeneratorsSync");
    validateSerializable = /* @__PURE__ */ __name((newContents) => {
      const invalidItem = newContents.find((item) => typeof item !== "string" && !isUint8Array2(item));
      if (invalidItem !== void 0) {
        throw new TypeError(`The \`stdin\` option is invalid: when passing objects as input, a transform must be used to serialize them to strings or Uint8Arrays: ${invalidItem}.`);
      }
    }, "validateSerializable");
  }
});

// ../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/verbose/output.js
var shouldLogOutput, fdUsesVerbose, PIPED_STDIO_VALUES, logLines2, logLinesSync, isPipingStream, logLine;
var init_output = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/verbose/output.js"() {
    init_encoding_option();
    init_type();
    init_log();
    init_values();
    shouldLogOutput = /* @__PURE__ */ __name(({ stdioItems, encoding, verboseInfo, fdNumber }) => fdNumber !== "all" && isFullVerbose(verboseInfo, fdNumber) && !BINARY_ENCODINGS.has(encoding) && fdUsesVerbose(fdNumber) && (stdioItems.some(({ type, value }) => type === "native" && PIPED_STDIO_VALUES.has(value)) || stdioItems.every(({ type }) => TRANSFORM_TYPES.has(type))), "shouldLogOutput");
    fdUsesVerbose = /* @__PURE__ */ __name((fdNumber) => fdNumber === 1 || fdNumber === 2, "fdUsesVerbose");
    PIPED_STDIO_VALUES = /* @__PURE__ */ new Set(["pipe", "overlapped"]);
    logLines2 = /* @__PURE__ */ __name(async (linesIterable, stream, fdNumber, verboseInfo) => {
      for await (const line of linesIterable) {
        if (!isPipingStream(stream)) {
          logLine(line, fdNumber, verboseInfo);
        }
      }
    }, "logLines");
    logLinesSync = /* @__PURE__ */ __name((linesArray, fdNumber, verboseInfo) => {
      for (const line of linesArray) {
        logLine(line, fdNumber, verboseInfo);
      }
    }, "logLinesSync");
    isPipingStream = /* @__PURE__ */ __name((stream) => stream._readableState.pipes.length > 0, "isPipingStream");
    logLine = /* @__PURE__ */ __name((line, fdNumber, verboseInfo) => {
      const verboseMessage = serializeVerboseMessage(line);
      verboseLog({
        type: "output",
        verboseMessage,
        fdNumber,
        verboseInfo
      });
    }, "logLine");
  }
});
var transformOutputSync, transformOutputResultSync, runOutputGeneratorsSync, serializeChunks, logOutputSync, writeToFiles;
var init_output_sync = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/io/output-sync.js"() {
    init_output();
    init_generator();
    init_split();
    init_uint_array();
    init_type();
    init_max_buffer();
    transformOutputSync = /* @__PURE__ */ __name(({ fileDescriptors, syncResult: { output }, options, isMaxBuffer, verboseInfo }) => {
      if (output === null) {
        return { output: Array.from({ length: 3 }) };
      }
      const state = {};
      const outputFiles = /* @__PURE__ */ new Set([]);
      const transformedOutput = output.map((result, fdNumber) => transformOutputResultSync({
        result,
        fileDescriptors,
        fdNumber,
        state,
        outputFiles,
        isMaxBuffer,
        verboseInfo
      }, options));
      return { output: transformedOutput, ...state };
    }, "transformOutputSync");
    transformOutputResultSync = /* @__PURE__ */ __name(({ result, fileDescriptors, fdNumber, state, outputFiles, isMaxBuffer, verboseInfo }, { buffer, encoding, lines, stripFinalNewline: stripFinalNewline2, maxBuffer }) => {
      if (result === null) {
        return;
      }
      const truncatedResult = truncateMaxBufferSync(result, isMaxBuffer, maxBuffer);
      const uint8ArrayResult = bufferToUint8Array(truncatedResult);
      const { stdioItems, objectMode } = fileDescriptors[fdNumber];
      const chunks = runOutputGeneratorsSync([uint8ArrayResult], stdioItems, encoding, state);
      const { serializedResult, finalResult = serializedResult } = serializeChunks({
        chunks,
        objectMode,
        encoding,
        lines,
        stripFinalNewline: stripFinalNewline2,
        fdNumber
      });
      logOutputSync({
        serializedResult,
        fdNumber,
        state,
        verboseInfo,
        encoding,
        stdioItems,
        objectMode
      });
      const returnedResult = buffer[fdNumber] ? finalResult : void 0;
      try {
        if (state.error === void 0) {
          writeToFiles(serializedResult, stdioItems, outputFiles);
        }
        return returnedResult;
      } catch (error) {
        state.error = error;
        return returnedResult;
      }
    }, "transformOutputResultSync");
    runOutputGeneratorsSync = /* @__PURE__ */ __name((chunks, stdioItems, encoding, state) => {
      try {
        return runGeneratorsSync(chunks, stdioItems, encoding, false);
      } catch (error) {
        state.error = error;
        return chunks;
      }
    }, "runOutputGeneratorsSync");
    serializeChunks = /* @__PURE__ */ __name(({ chunks, objectMode, encoding, lines, stripFinalNewline: stripFinalNewline2, fdNumber }) => {
      if (objectMode) {
        return { serializedResult: chunks };
      }
      if (encoding === "buffer") {
        return { serializedResult: joinToUint8Array(chunks) };
      }
      const serializedResult = joinToString(chunks, encoding);
      if (lines[fdNumber]) {
        return { serializedResult, finalResult: splitLinesSync(serializedResult, !stripFinalNewline2[fdNumber], objectMode) };
      }
      return { serializedResult };
    }, "serializeChunks");
    logOutputSync = /* @__PURE__ */ __name(({ serializedResult, fdNumber, state, verboseInfo, encoding, stdioItems, objectMode }) => {
      if (!shouldLogOutput({
        stdioItems,
        encoding,
        verboseInfo,
        fdNumber
      })) {
        return;
      }
      const linesArray = splitLinesSync(serializedResult, false, objectMode);
      try {
        logLinesSync(linesArray, fdNumber, verboseInfo);
      } catch (error) {
        state.error ??= error;
      }
    }, "logOutputSync");
    writeToFiles = /* @__PURE__ */ __name((serializedResult, stdioItems, outputFiles) => {
      for (const { path: path12, append } of stdioItems.filter(({ type }) => FILE_TYPES.has(type))) {
        const pathString = typeof path12 === "string" ? path12 : path12.toString();
        if (append || outputFiles.has(pathString)) {
          fs2.appendFileSync(path12, serializedResult);
        } else {
          outputFiles.add(pathString);
          fs2.writeFileSync(path12, serializedResult);
        }
      }
    }, "writeToFiles");
  }
});

// ../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/resolve/all-sync.js
var getAllSync;
var init_all_sync = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/resolve/all-sync.js"() {
    init_uint_array();
    init_strip_newline();
    getAllSync = /* @__PURE__ */ __name(([, stdout, stderr], options) => {
      if (!options.all) {
        return;
      }
      if (stdout === void 0) {
        return stderr;
      }
      if (stderr === void 0) {
        return stdout;
      }
      if (Array.isArray(stdout)) {
        return Array.isArray(stderr) ? [...stdout, ...stderr] : [...stdout, stripNewline(stderr, options, "all")];
      }
      if (Array.isArray(stderr)) {
        return [stripNewline(stdout, options, "all"), ...stderr];
      }
      if (isUint8Array2(stdout) && isUint8Array2(stderr)) {
        return concatUint8Arrays([stdout, stderr]);
      }
      return `${stdout}${stderr}`;
    }, "getAllSync");
  }
});
var waitForExit, waitForExitOrError, waitForSubprocessExit, waitForSuccessfulExit, isSubprocessErrorExit, isFailedExit;
var init_exit_async = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/resolve/exit-async.js"() {
    init_final_error();
    waitForExit = /* @__PURE__ */ __name(async (subprocess, context) => {
      const [exitCode, signal] = await waitForExitOrError(subprocess);
      context.isForcefullyTerminated ??= false;
      return [exitCode, signal];
    }, "waitForExit");
    waitForExitOrError = /* @__PURE__ */ __name(async (subprocess) => {
      const [spawnPayload, exitPayload] = await Promise.allSettled([
        events.once(subprocess, "spawn"),
        events.once(subprocess, "exit")
      ]);
      if (spawnPayload.status === "rejected") {
        return [];
      }
      return exitPayload.status === "rejected" ? waitForSubprocessExit(subprocess) : exitPayload.value;
    }, "waitForExitOrError");
    waitForSubprocessExit = /* @__PURE__ */ __name(async (subprocess) => {
      try {
        return await events.once(subprocess, "exit");
      } catch {
        return waitForSubprocessExit(subprocess);
      }
    }, "waitForSubprocessExit");
    waitForSuccessfulExit = /* @__PURE__ */ __name(async (exitPromise) => {
      const [exitCode, signal] = await exitPromise;
      if (!isSubprocessErrorExit(exitCode, signal) && isFailedExit(exitCode, signal)) {
        throw new DiscardedError();
      }
      return [exitCode, signal];
    }, "waitForSuccessfulExit");
    isSubprocessErrorExit = /* @__PURE__ */ __name((exitCode, signal) => exitCode === void 0 && signal === void 0, "isSubprocessErrorExit");
    isFailedExit = /* @__PURE__ */ __name((exitCode, signal) => exitCode !== 0 || signal !== null, "isFailedExit");
  }
});

// ../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/resolve/exit-sync.js
var getExitResultSync, getResultError;
var init_exit_sync = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/resolve/exit-sync.js"() {
    init_final_error();
    init_max_buffer();
    init_exit_async();
    getExitResultSync = /* @__PURE__ */ __name(({ error, status: exitCode, signal, output }, { maxBuffer }) => {
      const resultError = getResultError(error, exitCode, signal);
      const timedOut = resultError?.code === "ETIMEDOUT";
      const isMaxBuffer = isMaxBufferSync(resultError, output, maxBuffer);
      return {
        resultError,
        exitCode,
        signal,
        timedOut,
        isMaxBuffer
      };
    }, "getExitResultSync");
    getResultError = /* @__PURE__ */ __name((error, exitCode, signal) => {
      if (error !== void 0) {
        return error;
      }
      return isFailedExit(exitCode, signal) ? new DiscardedError() : void 0;
    }, "getResultError");
  }
});
var execaCoreSync, handleSyncArguments, normalizeSyncOptions, validateSyncOptions, throwInvalidSyncOption, spawnSubprocessSync, runSubprocessSync, normalizeSpawnSyncOptions, getSyncResult;
var init_main_sync = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/methods/main-sync.js"() {
    init_command();
    init_options();
    init_shell();
    init_result();
    init_reject();
    init_handle_sync();
    init_strip_newline();
    init_input_sync();
    init_output_sync();
    init_max_buffer();
    init_all_sync();
    init_exit_sync();
    execaCoreSync = /* @__PURE__ */ __name((rawFile, rawArguments, rawOptions) => {
      const { file, commandArguments, command, escapedCommand, startTime, verboseInfo, options, fileDescriptors } = handleSyncArguments(rawFile, rawArguments, rawOptions);
      const result = spawnSubprocessSync({
        file,
        commandArguments,
        options,
        command,
        escapedCommand,
        verboseInfo,
        fileDescriptors,
        startTime
      });
      return handleResult(result, verboseInfo, options);
    }, "execaCoreSync");
    handleSyncArguments = /* @__PURE__ */ __name((rawFile, rawArguments, rawOptions) => {
      const { command, escapedCommand, startTime, verboseInfo } = handleCommand(rawFile, rawArguments, rawOptions);
      const syncOptions = normalizeSyncOptions(rawOptions);
      const { file, commandArguments, options } = normalizeOptions(rawFile, rawArguments, syncOptions);
      validateSyncOptions(options);
      const fileDescriptors = handleStdioSync(options, verboseInfo);
      return {
        file,
        commandArguments,
        command,
        escapedCommand,
        startTime,
        verboseInfo,
        options,
        fileDescriptors
      };
    }, "handleSyncArguments");
    normalizeSyncOptions = /* @__PURE__ */ __name((options) => options.node && !options.ipc ? { ...options, ipc: false } : options, "normalizeSyncOptions");
    validateSyncOptions = /* @__PURE__ */ __name(({ ipc, ipcInput, detached, cancelSignal }) => {
      if (ipcInput) {
        throwInvalidSyncOption("ipcInput");
      }
      if (ipc) {
        throwInvalidSyncOption("ipc: true");
      }
      if (detached) {
        throwInvalidSyncOption("detached: true");
      }
      if (cancelSignal) {
        throwInvalidSyncOption("cancelSignal");
      }
    }, "validateSyncOptions");
    throwInvalidSyncOption = /* @__PURE__ */ __name((value) => {
      throw new TypeError(`The "${value}" option cannot be used with synchronous methods.`);
    }, "throwInvalidSyncOption");
    spawnSubprocessSync = /* @__PURE__ */ __name(({ file, commandArguments, options, command, escapedCommand, verboseInfo, fileDescriptors, startTime }) => {
      const syncResult = runSubprocessSync({
        file,
        commandArguments,
        options,
        command,
        escapedCommand,
        fileDescriptors,
        startTime
      });
      if (syncResult.failed) {
        return syncResult;
      }
      const { resultError, exitCode, signal, timedOut, isMaxBuffer } = getExitResultSync(syncResult, options);
      const { output, error = resultError } = transformOutputSync({
        fileDescriptors,
        syncResult,
        options,
        isMaxBuffer,
        verboseInfo
      });
      const stdio = output.map((stdioOutput, fdNumber) => stripNewline(stdioOutput, options, fdNumber));
      const all = stripNewline(getAllSync(output, options), options, "all");
      return getSyncResult({
        error,
        exitCode,
        signal,
        timedOut,
        isMaxBuffer,
        stdio,
        all,
        options,
        command,
        escapedCommand,
        startTime
      });
    }, "spawnSubprocessSync");
    runSubprocessSync = /* @__PURE__ */ __name(({ file, commandArguments, options, command, escapedCommand, fileDescriptors, startTime }) => {
      try {
        addInputOptionsSync(fileDescriptors, options);
        const normalizedOptions = normalizeSpawnSyncOptions(options);
        return child_process.spawnSync(...concatenateShell(file, commandArguments, normalizedOptions));
      } catch (error) {
        return makeEarlyError({
          error,
          command,
          escapedCommand,
          fileDescriptors,
          options,
          startTime,
          isSync: true
        });
      }
    }, "runSubprocessSync");
    normalizeSpawnSyncOptions = /* @__PURE__ */ __name(({ encoding, maxBuffer, ...options }) => ({ ...options, encoding: "buffer", maxBuffer: getMaxBufferSync(maxBuffer) }), "normalizeSpawnSyncOptions");
    getSyncResult = /* @__PURE__ */ __name(({ error, exitCode, signal, timedOut, isMaxBuffer, stdio, all, options, command, escapedCommand, startTime }) => error === void 0 ? makeSuccessResult({
      command,
      escapedCommand,
      stdio,
      all,
      ipcOutput: [],
      options,
      startTime
    }) : makeError({
      error,
      command,
      escapedCommand,
      timedOut,
      isCanceled: false,
      isGracefullyCanceled: false,
      isMaxBuffer,
      isForcefullyTerminated: false,
      exitCode,
      signal,
      stdio,
      all,
      ipcOutput: [],
      options,
      startTime,
      isSync: true
    }), "getSyncResult");
  }
});
var getOneMessage, getOneMessageAsync, getMessage, throwOnDisconnect2, throwOnStrictError;
var init_get_one = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/ipc/get-one.js"() {
    init_validation();
    init_forward();
    init_reference();
    getOneMessage = /* @__PURE__ */ __name(({ anyProcess, channel, isSubprocess, ipc }, { reference = true, filter: filter2 } = {}) => {
      validateIpcMethod({
        methodName: "getOneMessage",
        isSubprocess,
        ipc,
        isConnected: isConnected(anyProcess)
      });
      return getOneMessageAsync({
        anyProcess,
        channel,
        isSubprocess,
        filter: filter2,
        reference
      });
    }, "getOneMessage");
    getOneMessageAsync = /* @__PURE__ */ __name(async ({ anyProcess, channel, isSubprocess, filter: filter2, reference }) => {
      addReference(channel, reference);
      const ipcEmitter = getIpcEmitter(anyProcess, channel, isSubprocess);
      const controller = new AbortController();
      try {
        return await Promise.race([
          getMessage(ipcEmitter, filter2, controller),
          throwOnDisconnect2(ipcEmitter, isSubprocess, controller),
          throwOnStrictError(ipcEmitter, isSubprocess, controller)
        ]);
      } catch (error) {
        disconnect(anyProcess);
        throw error;
      } finally {
        controller.abort();
        removeReference(channel, reference);
      }
    }, "getOneMessageAsync");
    getMessage = /* @__PURE__ */ __name(async (ipcEmitter, filter2, { signal }) => {
      if (filter2 === void 0) {
        const [message] = await events.once(ipcEmitter, "message", { signal });
        return message;
      }
      for await (const [message] of events.on(ipcEmitter, "message", { signal })) {
        if (filter2(message)) {
          return message;
        }
      }
    }, "getMessage");
    throwOnDisconnect2 = /* @__PURE__ */ __name(async (ipcEmitter, isSubprocess, { signal }) => {
      await events.once(ipcEmitter, "disconnect", { signal });
      throwOnEarlyDisconnect(isSubprocess);
    }, "throwOnDisconnect");
    throwOnStrictError = /* @__PURE__ */ __name(async (ipcEmitter, isSubprocess, { signal }) => {
      const [error] = await events.once(ipcEmitter, "strict:error", { signal });
      throw getStrictResponseError(error, isSubprocess);
    }, "throwOnStrictError");
  }
});
var getEachMessage, loopOnMessages, stopOnDisconnect, abortOnStrictError, iterateOnMessages, throwIfStrictError;
var init_get_each = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/ipc/get-each.js"() {
    init_validation();
    init_forward();
    init_reference();
    getEachMessage = /* @__PURE__ */ __name(({ anyProcess, channel, isSubprocess, ipc }, { reference = true } = {}) => loopOnMessages({
      anyProcess,
      channel,
      isSubprocess,
      ipc,
      shouldAwait: !isSubprocess,
      reference
    }), "getEachMessage");
    loopOnMessages = /* @__PURE__ */ __name(({ anyProcess, channel, isSubprocess, ipc, shouldAwait, reference }) => {
      validateIpcMethod({
        methodName: "getEachMessage",
        isSubprocess,
        ipc,
        isConnected: isConnected(anyProcess)
      });
      addReference(channel, reference);
      const ipcEmitter = getIpcEmitter(anyProcess, channel, isSubprocess);
      const controller = new AbortController();
      const state = {};
      stopOnDisconnect(anyProcess, ipcEmitter, controller);
      abortOnStrictError({
        ipcEmitter,
        isSubprocess,
        controller,
        state
      });
      return iterateOnMessages({
        anyProcess,
        channel,
        ipcEmitter,
        isSubprocess,
        shouldAwait,
        controller,
        state,
        reference
      });
    }, "loopOnMessages");
    stopOnDisconnect = /* @__PURE__ */ __name(async (anyProcess, ipcEmitter, controller) => {
      try {
        await events.once(ipcEmitter, "disconnect", { signal: controller.signal });
        controller.abort();
      } catch {
      }
    }, "stopOnDisconnect");
    abortOnStrictError = /* @__PURE__ */ __name(async ({ ipcEmitter, isSubprocess, controller, state }) => {
      try {
        const [error] = await events.once(ipcEmitter, "strict:error", { signal: controller.signal });
        state.error = getStrictResponseError(error, isSubprocess);
        controller.abort();
      } catch {
      }
    }, "abortOnStrictError");
    iterateOnMessages = /* @__PURE__ */ __name(async function* ({ anyProcess, channel, ipcEmitter, isSubprocess, shouldAwait, controller, state, reference }) {
      try {
        for await (const [message] of events.on(ipcEmitter, "message", { signal: controller.signal })) {
          throwIfStrictError(state);
          yield message;
        }
      } catch {
        throwIfStrictError(state);
      } finally {
        controller.abort();
        removeReference(channel, reference);
        if (!isSubprocess) {
          disconnect(anyProcess);
        }
        if (shouldAwait) {
          await anyProcess;
        }
      }
    }, "iterateOnMessages");
    throwIfStrictError = /* @__PURE__ */ __name(({ error }) => {
      if (error) {
        throw error;
      }
    }, "throwIfStrictError");
  }
});
var addIpcMethods, getIpcExport, getIpcMethods;
var init_methods = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/ipc/methods.js"() {
    init_send();
    init_get_one();
    init_get_each();
    init_graceful();
    addIpcMethods = /* @__PURE__ */ __name((subprocess, { ipc }) => {
      Object.assign(subprocess, getIpcMethods(subprocess, false, ipc));
    }, "addIpcMethods");
    getIpcExport = /* @__PURE__ */ __name(() => {
      const anyProcess = y2__default.default;
      const isSubprocess = true;
      const ipc = y2__default.default.channel !== void 0;
      return {
        ...getIpcMethods(anyProcess, isSubprocess, ipc),
        getCancelSignal: getCancelSignal.bind(void 0, {
          anyProcess,
          channel: anyProcess.channel,
          isSubprocess,
          ipc
        })
      };
    }, "getIpcExport");
    getIpcMethods = /* @__PURE__ */ __name((anyProcess, isSubprocess, ipc) => ({
      sendMessage: sendMessage.bind(void 0, {
        anyProcess,
        channel: anyProcess.channel,
        isSubprocess,
        ipc
      }),
      getOneMessage: getOneMessage.bind(void 0, {
        anyProcess,
        channel: anyProcess.channel,
        isSubprocess,
        ipc
      }),
      getEachMessage: getEachMessage.bind(void 0, {
        anyProcess,
        channel: anyProcess.channel,
        isSubprocess,
        ipc
      })
    }), "getIpcMethods");
  }
});
var handleEarlyError, createDummyStreams, createDummyStream, readable, writable, duplex, handleDummyPromise;
var init_early_error = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/return/early-error.js"() {
    init_handle();
    init_result();
    init_reject();
    handleEarlyError = /* @__PURE__ */ __name(({ error, command, escapedCommand, fileDescriptors, options, startTime, verboseInfo }) => {
      cleanupCustomStreams(fileDescriptors);
      const subprocess = new child_process.ChildProcess();
      createDummyStreams(subprocess, fileDescriptors);
      Object.assign(subprocess, { readable, writable, duplex });
      const earlyError = makeEarlyError({
        error,
        command,
        escapedCommand,
        fileDescriptors,
        options,
        startTime,
        isSync: false
      });
      const promise = handleDummyPromise(earlyError, verboseInfo, options);
      return { subprocess, promise };
    }, "handleEarlyError");
    createDummyStreams = /* @__PURE__ */ __name((subprocess, fileDescriptors) => {
      const stdin = createDummyStream();
      const stdout = createDummyStream();
      const stderr = createDummyStream();
      const extraStdio = Array.from({ length: fileDescriptors.length - 3 }, createDummyStream);
      const all = createDummyStream();
      const stdio = [stdin, stdout, stderr, ...extraStdio];
      Object.assign(subprocess, {
        stdin,
        stdout,
        stderr,
        all,
        stdio
      });
    }, "createDummyStreams");
    createDummyStream = /* @__PURE__ */ __name(() => {
      const stream$1 = new stream.PassThrough();
      stream$1.end();
      return stream$1;
    }, "createDummyStream");
    readable = /* @__PURE__ */ __name(() => new stream.Readable({ read() {
    } }), "readable");
    writable = /* @__PURE__ */ __name(() => new stream.Writable({ write() {
    } }), "writable");
    duplex = /* @__PURE__ */ __name(() => new stream.Duplex({ read() {
    }, write() {
    } }), "duplex");
    handleDummyPromise = /* @__PURE__ */ __name(async (error, verboseInfo, options) => handleResult(error, verboseInfo, options), "handleDummyPromise");
  }
});
var handleStdioAsync, forbiddenIfAsync, addProperties2, addPropertiesAsync;
var init_handle_async = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/stdio/handle-async.js"() {
    init_generator();
    init_handle();
    init_type();
    handleStdioAsync = /* @__PURE__ */ __name((options, verboseInfo) => handleStdio(addPropertiesAsync, options, verboseInfo, false), "handleStdioAsync");
    forbiddenIfAsync = /* @__PURE__ */ __name(({ type, optionName }) => {
      throw new TypeError(`The \`${optionName}\` option cannot be ${TYPE_TO_MESSAGE[type]}.`);
    }, "forbiddenIfAsync");
    addProperties2 = {
      fileNumber: forbiddenIfAsync,
      generator: generatorToStream,
      asyncGenerator: generatorToStream,
      nodeStream: /* @__PURE__ */ __name(({ value }) => ({ stream: value }), "nodeStream"),
      webTransform({ value: { transform, writableObjectMode, readableObjectMode } }) {
        const objectMode = writableObjectMode || readableObjectMode;
        const stream$1 = stream.Duplex.fromWeb(transform, { objectMode });
        return { stream: stream$1 };
      },
      duplex: /* @__PURE__ */ __name(({ value: { transform } }) => ({ stream: transform }), "duplex"),
      native() {
      }
    };
    addPropertiesAsync = {
      input: {
        ...addProperties2,
        fileUrl: /* @__PURE__ */ __name(({ value }) => ({ stream: fs2.createReadStream(value) }), "fileUrl"),
        filePath: /* @__PURE__ */ __name(({ value: { file } }) => ({ stream: fs2.createReadStream(file) }), "filePath"),
        webStream: /* @__PURE__ */ __name(({ value }) => ({ stream: stream.Readable.fromWeb(value) }), "webStream"),
        iterable: /* @__PURE__ */ __name(({ value }) => ({ stream: stream.Readable.from(value) }), "iterable"),
        asyncIterable: /* @__PURE__ */ __name(({ value }) => ({ stream: stream.Readable.from(value) }), "asyncIterable"),
        string: /* @__PURE__ */ __name(({ value }) => ({ stream: stream.Readable.from(value) }), "string"),
        uint8Array: /* @__PURE__ */ __name(({ value }) => ({ stream: stream.Readable.from(buffer.Buffer.from(value)) }), "uint8Array")
      },
      output: {
        ...addProperties2,
        fileUrl: /* @__PURE__ */ __name(({ value }) => ({ stream: fs2.createWriteStream(value) }), "fileUrl"),
        filePath: /* @__PURE__ */ __name(({ value: { file, append } }) => ({ stream: fs2.createWriteStream(file, append ? { flags: "a" } : {}) }), "filePath"),
        webStream: /* @__PURE__ */ __name(({ value }) => ({ stream: stream.Writable.fromWeb(value) }), "webStream"),
        iterable: forbiddenIfAsync,
        asyncIterable: forbiddenIfAsync,
        string: forbiddenIfAsync,
        uint8Array: forbiddenIfAsync
      }
    };
  }
});
function mergeStreams(streams) {
  if (!Array.isArray(streams)) {
    throw new TypeError(`Expected an array, got \`${typeof streams}\`.`);
  }
  for (const stream of streams) {
    validateStream(stream);
  }
  const objectMode = streams.some(({ readableObjectMode }) => readableObjectMode);
  const highWaterMark = getHighWaterMark(streams, objectMode);
  const passThroughStream = new MergedStream({
    objectMode,
    writableHighWaterMark: highWaterMark,
    readableHighWaterMark: highWaterMark
  });
  for (const stream of streams) {
    passThroughStream.add(stream);
  }
  return passThroughStream;
}
var getHighWaterMark, MergedStream, onMergedStreamFinished, onMergedStreamEnd, onInputStreamsUnpipe, validateStream, endWhenStreamsDone, afterMergedStreamFinished, onInputStreamEnd, onInputStreamUnpipe, endStream, errorOrAbortStream, isAbortError, abortStream, errorStream, noop2, updateMaxListeners, PASSTHROUGH_LISTENERS_COUNT, PASSTHROUGH_LISTENERS_PER_STREAM;
var init_merge_streams = __esm({
  "../../node_modules/.pnpm/@sindresorhus+merge-streams@4.0.0/node_modules/@sindresorhus/merge-streams/index.js"() {
    __name(mergeStreams, "mergeStreams");
    getHighWaterMark = /* @__PURE__ */ __name((streams, objectMode) => {
      if (streams.length === 0) {
        return stream.getDefaultHighWaterMark(objectMode);
      }
      const highWaterMarks = streams.filter(({ readableObjectMode }) => readableObjectMode === objectMode).map(({ readableHighWaterMark }) => readableHighWaterMark);
      return Math.max(...highWaterMarks);
    }, "getHighWaterMark");
    MergedStream = class extends stream.PassThrough {
      static {
        __name(this, "MergedStream");
      }
      #streams = /* @__PURE__ */ new Set([]);
      #ended = /* @__PURE__ */ new Set([]);
      #aborted = /* @__PURE__ */ new Set([]);
      #onFinished;
      #unpipeEvent = Symbol("unpipe");
      #streamPromises = /* @__PURE__ */ new WeakMap();
      add(stream) {
        validateStream(stream);
        if (this.#streams.has(stream)) {
          return;
        }
        this.#streams.add(stream);
        this.#onFinished ??= onMergedStreamFinished(this, this.#streams, this.#unpipeEvent);
        const streamPromise = endWhenStreamsDone({
          passThroughStream: this,
          stream,
          streams: this.#streams,
          ended: this.#ended,
          aborted: this.#aborted,
          onFinished: this.#onFinished,
          unpipeEvent: this.#unpipeEvent
        });
        this.#streamPromises.set(stream, streamPromise);
        stream.pipe(this, { end: false });
      }
      async remove(stream) {
        validateStream(stream);
        if (!this.#streams.has(stream)) {
          return false;
        }
        const streamPromise = this.#streamPromises.get(stream);
        if (streamPromise === void 0) {
          return false;
        }
        this.#streamPromises.delete(stream);
        stream.unpipe(this);
        await streamPromise;
        return true;
      }
    };
    onMergedStreamFinished = /* @__PURE__ */ __name(async (passThroughStream, streams, unpipeEvent) => {
      updateMaxListeners(passThroughStream, PASSTHROUGH_LISTENERS_COUNT);
      const controller = new AbortController();
      try {
        await Promise.race([
          onMergedStreamEnd(passThroughStream, controller),
          onInputStreamsUnpipe(passThroughStream, streams, unpipeEvent, controller)
        ]);
      } finally {
        controller.abort();
        updateMaxListeners(passThroughStream, -PASSTHROUGH_LISTENERS_COUNT);
      }
    }, "onMergedStreamFinished");
    onMergedStreamEnd = /* @__PURE__ */ __name(async (passThroughStream, { signal }) => {
      try {
        await promises$1.finished(passThroughStream, { signal, cleanup: true });
      } catch (error) {
        errorOrAbortStream(passThroughStream, error);
        throw error;
      }
    }, "onMergedStreamEnd");
    onInputStreamsUnpipe = /* @__PURE__ */ __name(async (passThroughStream, streams, unpipeEvent, { signal }) => {
      for await (const [unpipedStream] of events.on(passThroughStream, "unpipe", { signal })) {
        if (streams.has(unpipedStream)) {
          unpipedStream.emit(unpipeEvent);
        }
      }
    }, "onInputStreamsUnpipe");
    validateStream = /* @__PURE__ */ __name((stream) => {
      if (typeof stream?.pipe !== "function") {
        throw new TypeError(`Expected a readable stream, got: \`${typeof stream}\`.`);
      }
    }, "validateStream");
    endWhenStreamsDone = /* @__PURE__ */ __name(async ({ passThroughStream, stream, streams, ended, aborted: aborted2, onFinished, unpipeEvent }) => {
      updateMaxListeners(passThroughStream, PASSTHROUGH_LISTENERS_PER_STREAM);
      const controller = new AbortController();
      try {
        await Promise.race([
          afterMergedStreamFinished(onFinished, stream, controller),
          onInputStreamEnd({
            passThroughStream,
            stream,
            streams,
            ended,
            aborted: aborted2,
            controller
          }),
          onInputStreamUnpipe({
            stream,
            streams,
            ended,
            aborted: aborted2,
            unpipeEvent,
            controller
          })
        ]);
      } finally {
        controller.abort();
        updateMaxListeners(passThroughStream, -PASSTHROUGH_LISTENERS_PER_STREAM);
      }
      if (streams.size > 0 && streams.size === ended.size + aborted2.size) {
        if (ended.size === 0 && aborted2.size > 0) {
          abortStream(passThroughStream);
        } else {
          endStream(passThroughStream);
        }
      }
    }, "endWhenStreamsDone");
    afterMergedStreamFinished = /* @__PURE__ */ __name(async (onFinished, stream, { signal }) => {
      try {
        await onFinished;
        if (!signal.aborted) {
          abortStream(stream);
        }
      } catch (error) {
        if (!signal.aborted) {
          errorOrAbortStream(stream, error);
        }
      }
    }, "afterMergedStreamFinished");
    onInputStreamEnd = /* @__PURE__ */ __name(async ({ passThroughStream, stream, streams, ended, aborted: aborted2, controller: { signal } }) => {
      try {
        await promises$1.finished(stream, {
          signal,
          cleanup: true,
          readable: true,
          writable: false
        });
        if (streams.has(stream)) {
          ended.add(stream);
        }
      } catch (error) {
        if (signal.aborted || !streams.has(stream)) {
          return;
        }
        if (isAbortError(error)) {
          aborted2.add(stream);
        } else {
          errorStream(passThroughStream, error);
        }
      }
    }, "onInputStreamEnd");
    onInputStreamUnpipe = /* @__PURE__ */ __name(async ({ stream, streams, ended, aborted: aborted2, unpipeEvent, controller: { signal } }) => {
      await events.once(stream, unpipeEvent, { signal });
      if (!stream.readable) {
        return events.once(signal, "abort", { signal });
      }
      streams.delete(stream);
      ended.delete(stream);
      aborted2.delete(stream);
    }, "onInputStreamUnpipe");
    endStream = /* @__PURE__ */ __name((stream) => {
      if (stream.writable) {
        stream.end();
      }
    }, "endStream");
    errorOrAbortStream = /* @__PURE__ */ __name((stream, error) => {
      if (isAbortError(error)) {
        abortStream(stream);
      } else {
        errorStream(stream, error);
      }
    }, "errorOrAbortStream");
    isAbortError = /* @__PURE__ */ __name((error) => error?.code === "ERR_STREAM_PREMATURE_CLOSE", "isAbortError");
    abortStream = /* @__PURE__ */ __name((stream) => {
      if (stream.readable || stream.writable) {
        stream.destroy();
      }
    }, "abortStream");
    errorStream = /* @__PURE__ */ __name((stream, error) => {
      if (!stream.destroyed) {
        stream.once("error", noop2);
        stream.destroy(error);
      }
    }, "errorStream");
    noop2 = /* @__PURE__ */ __name(() => {
    }, "noop");
    updateMaxListeners = /* @__PURE__ */ __name((passThroughStream, increment2) => {
      const maxListeners = passThroughStream.getMaxListeners();
      if (maxListeners !== 0 && maxListeners !== Number.POSITIVE_INFINITY) {
        passThroughStream.setMaxListeners(maxListeners + increment2);
      }
    }, "updateMaxListeners");
    PASSTHROUGH_LISTENERS_COUNT = 2;
    PASSTHROUGH_LISTENERS_PER_STREAM = 1;
  }
});
var pipeStreams, onSourceFinish, endDestinationStream, onDestinationFinish, abortSourceStream;
var init_pipeline = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/io/pipeline.js"() {
    init_standard_stream();
    pipeStreams = /* @__PURE__ */ __name((source, destination) => {
      source.pipe(destination);
      onSourceFinish(source, destination);
      onDestinationFinish(source, destination);
    }, "pipeStreams");
    onSourceFinish = /* @__PURE__ */ __name(async (source, destination) => {
      if (isStandardStream(source) || isStandardStream(destination)) {
        return;
      }
      try {
        await promises$1.finished(source, { cleanup: true, readable: true, writable: false });
      } catch {
      }
      endDestinationStream(destination);
    }, "onSourceFinish");
    endDestinationStream = /* @__PURE__ */ __name((destination) => {
      if (destination.writable) {
        destination.end();
      }
    }, "endDestinationStream");
    onDestinationFinish = /* @__PURE__ */ __name(async (source, destination) => {
      if (isStandardStream(source) || isStandardStream(destination)) {
        return;
      }
      try {
        await promises$1.finished(destination, { cleanup: true, readable: false, writable: true });
      } catch {
      }
      abortSourceStream(source);
    }, "onDestinationFinish");
    abortSourceStream = /* @__PURE__ */ __name((source) => {
      if (source.readable) {
        source.destroy();
      }
    }, "abortSourceStream");
  }
});

// ../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/io/output-async.js
var pipeOutputAsync, pipeTransform, SUBPROCESS_STREAM_PROPERTIES, pipeStdioItem, setStandardStreamMaxListeners, MAX_LISTENERS_INCREMENT;
var init_output_async = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/io/output-async.js"() {
    init_merge_streams();
    init_standard_stream();
    init_max_listeners();
    init_type();
    init_pipeline();
    pipeOutputAsync = /* @__PURE__ */ __name((subprocess, fileDescriptors, controller) => {
      const pipeGroups = /* @__PURE__ */ new Map();
      for (const [fdNumber, { stdioItems, direction }] of Object.entries(fileDescriptors)) {
        for (const { stream } of stdioItems.filter(({ type }) => TRANSFORM_TYPES.has(type))) {
          pipeTransform(subprocess, stream, direction, fdNumber);
        }
        for (const { stream } of stdioItems.filter(({ type }) => !TRANSFORM_TYPES.has(type))) {
          pipeStdioItem({
            subprocess,
            stream,
            direction,
            fdNumber,
            pipeGroups,
            controller
          });
        }
      }
      for (const [outputStream, inputStreams] of pipeGroups.entries()) {
        const inputStream = inputStreams.length === 1 ? inputStreams[0] : mergeStreams(inputStreams);
        pipeStreams(inputStream, outputStream);
      }
    }, "pipeOutputAsync");
    pipeTransform = /* @__PURE__ */ __name((subprocess, stream, direction, fdNumber) => {
      if (direction === "output") {
        pipeStreams(subprocess.stdio[fdNumber], stream);
      } else {
        pipeStreams(stream, subprocess.stdio[fdNumber]);
      }
      const streamProperty = SUBPROCESS_STREAM_PROPERTIES[fdNumber];
      if (streamProperty !== void 0) {
        subprocess[streamProperty] = stream;
      }
      subprocess.stdio[fdNumber] = stream;
    }, "pipeTransform");
    SUBPROCESS_STREAM_PROPERTIES = ["stdin", "stdout", "stderr"];
    pipeStdioItem = /* @__PURE__ */ __name(({ subprocess, stream, direction, fdNumber, pipeGroups, controller }) => {
      if (stream === void 0) {
        return;
      }
      setStandardStreamMaxListeners(stream, controller);
      const [inputStream, outputStream] = direction === "output" ? [stream, subprocess.stdio[fdNumber]] : [subprocess.stdio[fdNumber], stream];
      const outputStreams = pipeGroups.get(inputStream) ?? [];
      pipeGroups.set(inputStream, [...outputStreams, outputStream]);
    }, "pipeStdioItem");
    setStandardStreamMaxListeners = /* @__PURE__ */ __name((stream, { signal }) => {
      if (isStandardStream(stream)) {
        incrementMaxListeners(stream, MAX_LISTENERS_INCREMENT, signal);
      }
    }, "setStandardStreamMaxListeners");
    MAX_LISTENERS_INCREMENT = 2;
  }
});

// ../../node_modules/.pnpm/signal-exit@4.1.0/node_modules/signal-exit/dist/mjs/signals.js
var signals;
var init_signals2 = __esm({
  "../../node_modules/.pnpm/signal-exit@4.1.0/node_modules/signal-exit/dist/mjs/signals.js"() {
    signals = [];
    signals.push("SIGHUP", "SIGINT", "SIGTERM");
    if (process.platform !== "win32") {
      signals.push(
        "SIGALRM",
        "SIGABRT",
        "SIGVTALRM",
        "SIGXCPU",
        "SIGXFSZ",
        "SIGUSR2",
        "SIGTRAP",
        "SIGSYS",
        "SIGQUIT",
        "SIGIOT"
        // should detect profiler and enable/disable accordingly.
        // see #21
        // 'SIGPROF'
      );
    }
    if (process.platform === "linux") {
      signals.push("SIGIO", "SIGPOLL", "SIGPWR", "SIGSTKFLT");
    }
  }
});

// ../../node_modules/.pnpm/signal-exit@4.1.0/node_modules/signal-exit/dist/mjs/index.js
var processOk, kExitEmitter, global2, ObjectDefineProperty, Emitter, SignalExitBase, signalExitWrap, SignalExitFallback, SignalExit, process11, onExit, load, unload;
var init_mjs = __esm({
  "../../node_modules/.pnpm/signal-exit@4.1.0/node_modules/signal-exit/dist/mjs/index.js"() {
    init_signals2();
    processOk = /* @__PURE__ */ __name((process12) => !!process12 && typeof process12 === "object" && typeof process12.removeListener === "function" && typeof process12.emit === "function" && typeof process12.reallyExit === "function" && typeof process12.listeners === "function" && typeof process12.kill === "function" && typeof process12.pid === "number" && typeof process12.on === "function", "processOk");
    kExitEmitter = Symbol.for("signal-exit emitter");
    global2 = globalThis;
    ObjectDefineProperty = Object.defineProperty.bind(Object);
    Emitter = class {
      static {
        __name(this, "Emitter");
      }
      emitted = {
        afterExit: false,
        exit: false
      };
      listeners = {
        afterExit: [],
        exit: []
      };
      count = 0;
      id = Math.random();
      constructor() {
        if (global2[kExitEmitter]) {
          return global2[kExitEmitter];
        }
        ObjectDefineProperty(global2, kExitEmitter, {
          value: this,
          writable: false,
          enumerable: false,
          configurable: false
        });
      }
      on(ev, fn) {
        this.listeners[ev].push(fn);
      }
      removeListener(ev, fn) {
        const list = this.listeners[ev];
        const i2 = list.indexOf(fn);
        if (i2 === -1) {
          return;
        }
        if (i2 === 0 && list.length === 1) {
          list.length = 0;
        } else {
          list.splice(i2, 1);
        }
      }
      emit(ev, code, signal) {
        if (this.emitted[ev]) {
          return false;
        }
        this.emitted[ev] = true;
        let ret = false;
        for (const fn of this.listeners[ev]) {
          ret = fn(code, signal) === true || ret;
        }
        if (ev === "exit") {
          ret = this.emit("afterExit", code, signal) || ret;
        }
        return ret;
      }
    };
    SignalExitBase = class {
      static {
        __name(this, "SignalExitBase");
      }
    };
    signalExitWrap = /* @__PURE__ */ __name((handler) => {
      return {
        onExit(cb, opts) {
          return handler.onExit(cb, opts);
        },
        load() {
          return handler.load();
        },
        unload() {
          return handler.unload();
        }
      };
    }, "signalExitWrap");
    SignalExitFallback = class extends SignalExitBase {
      static {
        __name(this, "SignalExitFallback");
      }
      onExit() {
        return () => {
        };
      }
      load() {
      }
      unload() {
      }
    };
    SignalExit = class extends SignalExitBase {
      static {
        __name(this, "SignalExit");
      }
      // "SIGHUP" throws an `ENOSYS` error on Windows,
      // so use a supported signal instead
      /* c8 ignore start */
      #hupSig = process11.platform === "win32" ? "SIGINT" : "SIGHUP";
      /* c8 ignore stop */
      #emitter = new Emitter();
      #process;
      #originalProcessEmit;
      #originalProcessReallyExit;
      #sigListeners = {};
      #loaded = false;
      constructor(process12) {
        super();
        this.#process = process12;
        this.#sigListeners = {};
        for (const sig of signals) {
          this.#sigListeners[sig] = () => {
            const listeners = this.#process.listeners(sig);
            let { count: count2 } = this.#emitter;
            const p2 = process12;
            if (typeof p2.__signal_exit_emitter__ === "object" && typeof p2.__signal_exit_emitter__.count === "number") {
              count2 += p2.__signal_exit_emitter__.count;
            }
            if (listeners.length === count2) {
              this.unload();
              const ret = this.#emitter.emit("exit", null, sig);
              const s = sig === "SIGHUP" ? this.#hupSig : sig;
              if (!ret)
                process12.kill(process12.pid, s);
            }
          };
        }
        this.#originalProcessReallyExit = process12.reallyExit;
        this.#originalProcessEmit = process12.emit;
      }
      onExit(cb, opts) {
        if (!processOk(this.#process)) {
          return () => {
          };
        }
        if (this.#loaded === false) {
          this.load();
        }
        const ev = opts?.alwaysLast ? "afterExit" : "exit";
        this.#emitter.on(ev, cb);
        return () => {
          this.#emitter.removeListener(ev, cb);
          if (this.#emitter.listeners["exit"].length === 0 && this.#emitter.listeners["afterExit"].length === 0) {
            this.unload();
          }
        };
      }
      load() {
        if (this.#loaded) {
          return;
        }
        this.#loaded = true;
        this.#emitter.count += 1;
        for (const sig of signals) {
          try {
            const fn = this.#sigListeners[sig];
            if (fn)
              this.#process.on(sig, fn);
          } catch (_7) {
          }
        }
        this.#process.emit = (ev, ...a3) => {
          return this.#processEmit(ev, ...a3);
        };
        this.#process.reallyExit = (code) => {
          return this.#processReallyExit(code);
        };
      }
      unload() {
        if (!this.#loaded) {
          return;
        }
        this.#loaded = false;
        signals.forEach((sig) => {
          const listener = this.#sigListeners[sig];
          if (!listener) {
            throw new Error("Listener not defined for signal: " + sig);
          }
          try {
            this.#process.removeListener(sig, listener);
          } catch (_7) {
          }
        });
        this.#process.emit = this.#originalProcessEmit;
        this.#process.reallyExit = this.#originalProcessReallyExit;
        this.#emitter.count -= 1;
      }
      #processReallyExit(code) {
        if (!processOk(this.#process)) {
          return 0;
        }
        this.#process.exitCode = code || 0;
        this.#emitter.emit("exit", this.#process.exitCode, null);
        return this.#originalProcessReallyExit.call(this.#process, this.#process.exitCode);
      }
      #processEmit(ev, ...args) {
        const og = this.#originalProcessEmit;
        if (ev === "exit" && processOk(this.#process)) {
          if (typeof args[0] === "number") {
            this.#process.exitCode = args[0];
          }
          const ret = og.call(this.#process, ev, ...args);
          this.#emitter.emit("exit", this.#process.exitCode, null);
          return ret;
        } else {
          return og.call(this.#process, ev, ...args);
        }
      }
    };
    process11 = globalThis.process;
    ({
      onExit: (
        /**
         * Called when the process is exiting, whether via signal, explicit
         * exit, or running out of stuff to do.
         *
         * If the global process object is not suitable for instrumentation,
         * then this will be a no-op.
         *
         * Returns a function that may be used to unload signal-exit.
         */
        onExit
      ),
      load: (
        /**
         * Load the listeners.  Likely you never need to call this, unless
         * doing a rather deep integration with signal-exit functionality.
         * Mostly exposed for the benefit of testing.
         *
         * @internal
         */
        load
      ),
      unload: (
        /**
         * Unload the listeners.  Likely you never need to call this, unless
         * doing a rather deep integration with signal-exit functionality.
         * Mostly exposed for the benefit of testing.
         *
         * @internal
         */
        unload
      )
    } = signalExitWrap(processOk(process11) ? new SignalExit(process11) : new SignalExitFallback()));
  }
});
var cleanupOnExit;
var init_cleanup = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/terminate/cleanup.js"() {
    init_mjs();
    cleanupOnExit = /* @__PURE__ */ __name((subprocess, { cleanup, detached }, { signal }) => {
      if (!cleanup || detached) {
        return;
      }
      const removeExitHandler = onExit(() => {
        subprocess.kill();
      });
      events.addAbortListener(signal, () => {
        removeExitHandler();
      });
    }, "cleanupOnExit");
  }
});

// ../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/pipe/pipe-arguments.js
var normalizePipeArguments, getDestinationStream, getDestination, mapDestinationArguments, getSourceStream;
var init_pipe_arguments = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/pipe/pipe-arguments.js"() {
    init_parameters();
    init_duration();
    init_fd_options();
    init_file_url();
    normalizePipeArguments = /* @__PURE__ */ __name(({ source, sourcePromise, boundOptions, createNested }, ...pipeArguments) => {
      const startTime = getStartTime();
      const {
        destination,
        destinationStream,
        destinationError,
        from,
        unpipeSignal
      } = getDestinationStream(boundOptions, createNested, pipeArguments);
      const { sourceStream, sourceError } = getSourceStream(source, from);
      const { options: sourceOptions, fileDescriptors } = SUBPROCESS_OPTIONS.get(source);
      return {
        sourcePromise,
        sourceStream,
        sourceOptions,
        sourceError,
        destination,
        destinationStream,
        destinationError,
        unpipeSignal,
        fileDescriptors,
        startTime
      };
    }, "normalizePipeArguments");
    getDestinationStream = /* @__PURE__ */ __name((boundOptions, createNested, pipeArguments) => {
      try {
        const {
          destination,
          pipeOptions: { from, to, unpipeSignal } = {}
        } = getDestination(boundOptions, createNested, ...pipeArguments);
        const destinationStream = getToStream(destination, to);
        return {
          destination,
          destinationStream,
          from,
          unpipeSignal
        };
      } catch (error) {
        return { destinationError: error };
      }
    }, "getDestinationStream");
    getDestination = /* @__PURE__ */ __name((boundOptions, createNested, firstArgument, ...pipeArguments) => {
      if (Array.isArray(firstArgument)) {
        const destination = createNested(mapDestinationArguments, boundOptions)(firstArgument, ...pipeArguments);
        return { destination, pipeOptions: boundOptions };
      }
      if (typeof firstArgument === "string" || firstArgument instanceof URL || isDenoExecPath(firstArgument)) {
        if (Object.keys(boundOptions).length > 0) {
          throw new TypeError('Please use .pipe("file", ..., options) or .pipe(execa("file", ..., options)) instead of .pipe(options)("file", ...).');
        }
        const [rawFile, rawArguments, rawOptions] = normalizeParameters(firstArgument, ...pipeArguments);
        const destination = createNested(mapDestinationArguments)(rawFile, rawArguments, rawOptions);
        return { destination, pipeOptions: rawOptions };
      }
      if (SUBPROCESS_OPTIONS.has(firstArgument)) {
        if (Object.keys(boundOptions).length > 0) {
          throw new TypeError("Please use .pipe(options)`command` or .pipe($(options)`command`) instead of .pipe(options)($`command`).");
        }
        return { destination: firstArgument, pipeOptions: pipeArguments[0] };
      }
      throw new TypeError(`The first argument must be a template string, an options object, or an Execa subprocess: ${firstArgument}`);
    }, "getDestination");
    mapDestinationArguments = /* @__PURE__ */ __name(({ options }) => ({ options: { ...options, stdin: "pipe", piped: true } }), "mapDestinationArguments");
    getSourceStream = /* @__PURE__ */ __name((source, from) => {
      try {
        const sourceStream = getFromStream(source, from);
        return { sourceStream };
      } catch (error) {
        return { sourceError: error };
      }
    }, "getSourceStream");
  }
});

// ../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/pipe/throw.js
var handlePipeArgumentsError, getPipeArgumentsError, createNonCommandError, PIPE_COMMAND_MESSAGE;
var init_throw = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/pipe/throw.js"() {
    init_result();
    init_pipeline();
    handlePipeArgumentsError = /* @__PURE__ */ __name(({
      sourceStream,
      sourceError,
      destinationStream,
      destinationError,
      fileDescriptors,
      sourceOptions,
      startTime
    }) => {
      const error = getPipeArgumentsError({
        sourceStream,
        sourceError,
        destinationStream,
        destinationError
      });
      if (error !== void 0) {
        throw createNonCommandError({
          error,
          fileDescriptors,
          sourceOptions,
          startTime
        });
      }
    }, "handlePipeArgumentsError");
    getPipeArgumentsError = /* @__PURE__ */ __name(({ sourceStream, sourceError, destinationStream, destinationError }) => {
      if (sourceError !== void 0 && destinationError !== void 0) {
        return destinationError;
      }
      if (destinationError !== void 0) {
        abortSourceStream(sourceStream);
        return destinationError;
      }
      if (sourceError !== void 0) {
        endDestinationStream(destinationStream);
        return sourceError;
      }
    }, "getPipeArgumentsError");
    createNonCommandError = /* @__PURE__ */ __name(({ error, fileDescriptors, sourceOptions, startTime }) => makeEarlyError({
      error,
      command: PIPE_COMMAND_MESSAGE,
      escapedCommand: PIPE_COMMAND_MESSAGE,
      fileDescriptors,
      options: sourceOptions,
      startTime,
      isSync: false
    }), "createNonCommandError");
    PIPE_COMMAND_MESSAGE = "source.pipe(destination)";
  }
});

// ../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/pipe/sequence.js
var waitForBothSubprocesses;
var init_sequence = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/pipe/sequence.js"() {
    waitForBothSubprocesses = /* @__PURE__ */ __name(async (subprocessPromises) => {
      const [
        { status: sourceStatus, reason: sourceReason, value: sourceResult = sourceReason },
        { status: destinationStatus, reason: destinationReason, value: destinationResult = destinationReason }
      ] = await subprocessPromises;
      if (!destinationResult.pipedFrom.includes(sourceResult)) {
        destinationResult.pipedFrom.push(sourceResult);
      }
      if (destinationStatus === "rejected") {
        throw destinationResult;
      }
      if (sourceStatus === "rejected") {
        throw sourceResult;
      }
      return destinationResult;
    }, "waitForBothSubprocesses");
  }
});
var pipeSubprocessStream, pipeFirstSubprocessStream, pipeMoreSubprocessStream, cleanupMergedStreamsMap, MERGED_STREAMS, SOURCE_LISTENERS_PER_PIPE, DESTINATION_LISTENERS_PER_PIPE;
var init_streaming = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/pipe/streaming.js"() {
    init_merge_streams();
    init_max_listeners();
    init_pipeline();
    pipeSubprocessStream = /* @__PURE__ */ __name((sourceStream, destinationStream, maxListenersController) => {
      const mergedStream = MERGED_STREAMS.has(destinationStream) ? pipeMoreSubprocessStream(sourceStream, destinationStream) : pipeFirstSubprocessStream(sourceStream, destinationStream);
      incrementMaxListeners(sourceStream, SOURCE_LISTENERS_PER_PIPE, maxListenersController.signal);
      incrementMaxListeners(destinationStream, DESTINATION_LISTENERS_PER_PIPE, maxListenersController.signal);
      cleanupMergedStreamsMap(destinationStream);
      return mergedStream;
    }, "pipeSubprocessStream");
    pipeFirstSubprocessStream = /* @__PURE__ */ __name((sourceStream, destinationStream) => {
      const mergedStream = mergeStreams([sourceStream]);
      pipeStreams(mergedStream, destinationStream);
      MERGED_STREAMS.set(destinationStream, mergedStream);
      return mergedStream;
    }, "pipeFirstSubprocessStream");
    pipeMoreSubprocessStream = /* @__PURE__ */ __name((sourceStream, destinationStream) => {
      const mergedStream = MERGED_STREAMS.get(destinationStream);
      mergedStream.add(sourceStream);
      return mergedStream;
    }, "pipeMoreSubprocessStream");
    cleanupMergedStreamsMap = /* @__PURE__ */ __name(async (destinationStream) => {
      try {
        await promises$1.finished(destinationStream, { cleanup: true, readable: false, writable: true });
      } catch {
      }
      MERGED_STREAMS.delete(destinationStream);
    }, "cleanupMergedStreamsMap");
    MERGED_STREAMS = /* @__PURE__ */ new WeakMap();
    SOURCE_LISTENERS_PER_PIPE = 2;
    DESTINATION_LISTENERS_PER_PIPE = 1;
  }
});
var unpipeOnAbort, unpipeOnSignalAbort;
var init_abort = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/pipe/abort.js"() {
    init_throw();
    unpipeOnAbort = /* @__PURE__ */ __name((unpipeSignal, unpipeContext) => unpipeSignal === void 0 ? [] : [unpipeOnSignalAbort(unpipeSignal, unpipeContext)], "unpipeOnAbort");
    unpipeOnSignalAbort = /* @__PURE__ */ __name(async (unpipeSignal, { sourceStream, mergedStream, fileDescriptors, sourceOptions, startTime }) => {
      await util.aborted(unpipeSignal, sourceStream);
      await mergedStream.remove(sourceStream);
      const error = new Error("Pipe canceled by `unpipeSignal` option.");
      throw createNonCommandError({
        error,
        fileDescriptors,
        sourceOptions,
        startTime
      });
    }, "unpipeOnSignalAbort");
  }
});

// ../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/pipe/setup.js
var pipeToSubprocess, handlePipePromise, getSubprocessPromises;
var init_setup = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/pipe/setup.js"() {
    init_is_plain_obj();
    init_pipe_arguments();
    init_throw();
    init_sequence();
    init_streaming();
    init_abort();
    pipeToSubprocess = /* @__PURE__ */ __name((sourceInfo, ...pipeArguments) => {
      if (isPlainObject2(pipeArguments[0])) {
        return pipeToSubprocess.bind(void 0, {
          ...sourceInfo,
          boundOptions: { ...sourceInfo.boundOptions, ...pipeArguments[0] }
        });
      }
      const { destination, ...normalizedInfo } = normalizePipeArguments(sourceInfo, ...pipeArguments);
      const promise = handlePipePromise({ ...normalizedInfo, destination });
      promise.pipe = pipeToSubprocess.bind(void 0, {
        ...sourceInfo,
        source: destination,
        sourcePromise: promise,
        boundOptions: {}
      });
      return promise;
    }, "pipeToSubprocess");
    handlePipePromise = /* @__PURE__ */ __name(async ({
      sourcePromise,
      sourceStream,
      sourceOptions,
      sourceError,
      destination,
      destinationStream,
      destinationError,
      unpipeSignal,
      fileDescriptors,
      startTime
    }) => {
      const subprocessPromises = getSubprocessPromises(sourcePromise, destination);
      handlePipeArgumentsError({
        sourceStream,
        sourceError,
        destinationStream,
        destinationError,
        fileDescriptors,
        sourceOptions,
        startTime
      });
      const maxListenersController = new AbortController();
      try {
        const mergedStream = pipeSubprocessStream(sourceStream, destinationStream, maxListenersController);
        return await Promise.race([
          waitForBothSubprocesses(subprocessPromises),
          ...unpipeOnAbort(unpipeSignal, {
            sourceStream,
            mergedStream,
            sourceOptions,
            fileDescriptors,
            startTime
          })
        ]);
      } finally {
        maxListenersController.abort();
      }
    }, "handlePipePromise");
    getSubprocessPromises = /* @__PURE__ */ __name((sourcePromise, destination) => Promise.allSettled([sourcePromise, destination]), "getSubprocessPromises");
  }
});
var iterateOnSubprocessStream, stopReadingOnExit, iterateForResult, stopReadingOnStreamEnd, iterateOnStream, DEFAULT_OBJECT_HIGH_WATER_MARK, HIGH_WATER_MARK, iterateOnData, getGenerators;
var init_iterate = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/io/iterate.js"() {
    init_encoding_transform();
    init_split();
    init_run_sync();
    iterateOnSubprocessStream = /* @__PURE__ */ __name(({ subprocessStdout, subprocess, binary, shouldEncode, encoding, preserveNewlines }) => {
      const controller = new AbortController();
      stopReadingOnExit(subprocess, controller);
      return iterateOnStream({
        stream: subprocessStdout,
        controller,
        binary,
        shouldEncode: !subprocessStdout.readableObjectMode && shouldEncode,
        encoding,
        shouldSplit: !subprocessStdout.readableObjectMode,
        preserveNewlines
      });
    }, "iterateOnSubprocessStream");
    stopReadingOnExit = /* @__PURE__ */ __name(async (subprocess, controller) => {
      try {
        await subprocess;
      } catch {
      } finally {
        controller.abort();
      }
    }, "stopReadingOnExit");
    iterateForResult = /* @__PURE__ */ __name(({ stream, onStreamEnd, lines, encoding, stripFinalNewline: stripFinalNewline2, allMixed }) => {
      const controller = new AbortController();
      stopReadingOnStreamEnd(onStreamEnd, controller, stream);
      const objectMode = stream.readableObjectMode && !allMixed;
      return iterateOnStream({
        stream,
        controller,
        binary: encoding === "buffer",
        shouldEncode: !objectMode,
        encoding,
        shouldSplit: !objectMode && lines,
        preserveNewlines: !stripFinalNewline2
      });
    }, "iterateForResult");
    stopReadingOnStreamEnd = /* @__PURE__ */ __name(async (onStreamEnd, controller, stream) => {
      try {
        await onStreamEnd;
      } catch {
        stream.destroy();
      } finally {
        controller.abort();
      }
    }, "stopReadingOnStreamEnd");
    iterateOnStream = /* @__PURE__ */ __name(({ stream, controller, binary, shouldEncode, encoding, shouldSplit, preserveNewlines }) => {
      const onStdoutChunk = events.on(stream, "data", {
        signal: controller.signal,
        highWaterMark: HIGH_WATER_MARK,
        // Backward compatibility with older name for this option
        // See https://github.com/nodejs/node/pull/52080#discussion_r1525227861
        // @todo Remove after removing support for Node 21
        highWatermark: HIGH_WATER_MARK
      });
      return iterateOnData({
        onStdoutChunk,
        controller,
        binary,
        shouldEncode,
        encoding,
        shouldSplit,
        preserveNewlines
      });
    }, "iterateOnStream");
    DEFAULT_OBJECT_HIGH_WATER_MARK = stream.getDefaultHighWaterMark(true);
    HIGH_WATER_MARK = DEFAULT_OBJECT_HIGH_WATER_MARK;
    iterateOnData = /* @__PURE__ */ __name(async function* ({ onStdoutChunk, controller, binary, shouldEncode, encoding, shouldSplit, preserveNewlines }) {
      const generators = getGenerators({
        binary,
        shouldEncode,
        encoding,
        shouldSplit,
        preserveNewlines
      });
      try {
        for await (const [chunk] of onStdoutChunk) {
          yield* transformChunkSync(chunk, generators, 0);
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          throw error;
        }
      } finally {
        yield* finalChunksSync(generators);
      }
    }, "iterateOnData");
    getGenerators = /* @__PURE__ */ __name(({ binary, shouldEncode, encoding, shouldSplit, preserveNewlines }) => [
      getEncodingTransformGenerator(binary, encoding, !shouldEncode),
      getSplitLinesGenerator(binary, preserveNewlines, !shouldSplit, {})
    ].filter(Boolean), "getGenerators");
  }
});
var getStreamOutput, logOutputAsync, resumeStream, getStreamContents2, getBufferedData, handleBufferedData;
var init_contents2 = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/io/contents.js"() {
    init_source();
    init_uint_array();
    init_output();
    init_iterate();
    init_max_buffer();
    init_strip_newline();
    getStreamOutput = /* @__PURE__ */ __name(async ({ stream, onStreamEnd, fdNumber, encoding, buffer, maxBuffer, lines, allMixed, stripFinalNewline: stripFinalNewline2, verboseInfo, streamInfo }) => {
      const logPromise = logOutputAsync({
        stream,
        onStreamEnd,
        fdNumber,
        encoding,
        allMixed,
        verboseInfo,
        streamInfo
      });
      if (!buffer) {
        await Promise.all([resumeStream(stream), logPromise]);
        return;
      }
      const stripFinalNewlineValue = getStripFinalNewline(stripFinalNewline2, fdNumber);
      const iterable = iterateForResult({
        stream,
        onStreamEnd,
        lines,
        encoding,
        stripFinalNewline: stripFinalNewlineValue,
        allMixed
      });
      const [output] = await Promise.all([
        getStreamContents2({
          stream,
          iterable,
          fdNumber,
          encoding,
          maxBuffer,
          lines
        }),
        logPromise
      ]);
      return output;
    }, "getStreamOutput");
    logOutputAsync = /* @__PURE__ */ __name(async ({ stream, onStreamEnd, fdNumber, encoding, allMixed, verboseInfo, streamInfo: { fileDescriptors } }) => {
      if (!shouldLogOutput({
        stdioItems: fileDescriptors[fdNumber]?.stdioItems,
        encoding,
        verboseInfo,
        fdNumber
      })) {
        return;
      }
      const linesIterable = iterateForResult({
        stream,
        onStreamEnd,
        lines: true,
        encoding,
        stripFinalNewline: true,
        allMixed
      });
      await logLines2(linesIterable, stream, fdNumber, verboseInfo);
    }, "logOutputAsync");
    resumeStream = /* @__PURE__ */ __name(async (stream) => {
      await promises.setImmediate();
      if (stream.readableFlowing === null) {
        stream.resume();
      }
    }, "resumeStream");
    getStreamContents2 = /* @__PURE__ */ __name(async ({ stream, stream: { readableObjectMode }, iterable, fdNumber, encoding, maxBuffer, lines }) => {
      try {
        if (readableObjectMode || lines) {
          return await getStreamAsArray(iterable, { maxBuffer });
        }
        if (encoding === "buffer") {
          return new Uint8Array(await getStreamAsArrayBuffer(iterable, { maxBuffer }));
        }
        return await getStreamAsString(iterable, { maxBuffer });
      } catch (error) {
        return handleBufferedData(handleMaxBuffer({
          error,
          stream,
          readableObjectMode,
          lines,
          encoding,
          fdNumber
        }));
      }
    }, "getStreamContents");
    getBufferedData = /* @__PURE__ */ __name(async (streamPromise) => {
      try {
        return await streamPromise;
      } catch (error) {
        return handleBufferedData(error);
      }
    }, "getBufferedData");
    handleBufferedData = /* @__PURE__ */ __name(({ bufferedData }) => isArrayBuffer2(bufferedData) ? new Uint8Array(bufferedData) : bufferedData, "handleBufferedData");
  }
});
var waitForStream, handleStdinDestroy, spyOnStdinDestroy, setStdinCleanedUp, handleStreamError, shouldIgnoreStreamError, isInputFileDescriptor, isStreamAbort, isStreamEpipe;
var init_wait_stream = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/resolve/wait-stream.js"() {
    waitForStream = /* @__PURE__ */ __name(async (stream, fdNumber, streamInfo, { isSameDirection, stopOnExit = false } = {}) => {
      const state = handleStdinDestroy(stream, streamInfo);
      const abortController = new AbortController();
      try {
        await Promise.race([
          ...stopOnExit ? [streamInfo.exitPromise] : [],
          promises$1.finished(stream, { cleanup: true, signal: abortController.signal })
        ]);
      } catch (error) {
        if (!state.stdinCleanedUp) {
          handleStreamError(error, fdNumber, streamInfo, isSameDirection);
        }
      } finally {
        abortController.abort();
      }
    }, "waitForStream");
    handleStdinDestroy = /* @__PURE__ */ __name((stream, { originalStreams: [originalStdin], subprocess }) => {
      const state = { stdinCleanedUp: false };
      if (stream === originalStdin) {
        spyOnStdinDestroy(stream, subprocess, state);
      }
      return state;
    }, "handleStdinDestroy");
    spyOnStdinDestroy = /* @__PURE__ */ __name((subprocessStdin, subprocess, state) => {
      const { _destroy } = subprocessStdin;
      subprocessStdin._destroy = (...destroyArguments) => {
        setStdinCleanedUp(subprocess, state);
        _destroy.call(subprocessStdin, ...destroyArguments);
      };
    }, "spyOnStdinDestroy");
    setStdinCleanedUp = /* @__PURE__ */ __name(({ exitCode, signalCode }, state) => {
      if (exitCode !== null || signalCode !== null) {
        state.stdinCleanedUp = true;
      }
    }, "setStdinCleanedUp");
    handleStreamError = /* @__PURE__ */ __name((error, fdNumber, streamInfo, isSameDirection) => {
      if (!shouldIgnoreStreamError(error, fdNumber, streamInfo, isSameDirection)) {
        throw error;
      }
    }, "handleStreamError");
    shouldIgnoreStreamError = /* @__PURE__ */ __name((error, fdNumber, streamInfo, isSameDirection = true) => {
      if (streamInfo.propagating) {
        return isStreamEpipe(error) || isStreamAbort(error);
      }
      streamInfo.propagating = true;
      return isInputFileDescriptor(streamInfo, fdNumber) === isSameDirection ? isStreamEpipe(error) : isStreamAbort(error);
    }, "shouldIgnoreStreamError");
    isInputFileDescriptor = /* @__PURE__ */ __name(({ fileDescriptors }, fdNumber) => fdNumber !== "all" && fileDescriptors[fdNumber].direction === "input", "isInputFileDescriptor");
    isStreamAbort = /* @__PURE__ */ __name((error) => error?.code === "ERR_STREAM_PREMATURE_CLOSE", "isStreamAbort");
    isStreamEpipe = /* @__PURE__ */ __name((error) => error?.code === "EPIPE", "isStreamEpipe");
  }
});

// ../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/resolve/stdio.js
var waitForStdioStreams, waitForSubprocessStream;
var init_stdio = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/resolve/stdio.js"() {
    init_contents2();
    init_wait_stream();
    waitForStdioStreams = /* @__PURE__ */ __name(({ subprocess, encoding, buffer, maxBuffer, lines, stripFinalNewline: stripFinalNewline2, verboseInfo, streamInfo }) => subprocess.stdio.map((stream, fdNumber) => waitForSubprocessStream({
      stream,
      fdNumber,
      encoding,
      buffer: buffer[fdNumber],
      maxBuffer: maxBuffer[fdNumber],
      lines: lines[fdNumber],
      allMixed: false,
      stripFinalNewline: stripFinalNewline2,
      verboseInfo,
      streamInfo
    })), "waitForStdioStreams");
    waitForSubprocessStream = /* @__PURE__ */ __name(async ({ stream, fdNumber, encoding, buffer, maxBuffer, lines, allMixed, stripFinalNewline: stripFinalNewline2, verboseInfo, streamInfo }) => {
      if (!stream) {
        return;
      }
      const onStreamEnd = waitForStream(stream, fdNumber, streamInfo);
      if (isInputFileDescriptor(streamInfo, fdNumber)) {
        await onStreamEnd;
        return;
      }
      const [output] = await Promise.all([
        getStreamOutput({
          stream,
          onStreamEnd,
          fdNumber,
          encoding,
          buffer,
          maxBuffer,
          lines,
          allMixed,
          stripFinalNewline: stripFinalNewline2,
          verboseInfo,
          streamInfo
        }),
        onStreamEnd
      ]);
      return output;
    }, "waitForSubprocessStream");
  }
});

// ../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/resolve/all-async.js
var makeAllStream, waitForAllStream, getAllStream, getAllMixed;
var init_all_async = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/resolve/all-async.js"() {
    init_merge_streams();
    init_stdio();
    makeAllStream = /* @__PURE__ */ __name(({ stdout, stderr }, { all }) => all && (stdout || stderr) ? mergeStreams([stdout, stderr].filter(Boolean)) : void 0, "makeAllStream");
    waitForAllStream = /* @__PURE__ */ __name(({ subprocess, encoding, buffer, maxBuffer, lines, stripFinalNewline: stripFinalNewline2, verboseInfo, streamInfo }) => waitForSubprocessStream({
      ...getAllStream(subprocess, buffer),
      fdNumber: "all",
      encoding,
      maxBuffer: maxBuffer[1] + maxBuffer[2],
      lines: lines[1] || lines[2],
      allMixed: getAllMixed(subprocess),
      stripFinalNewline: stripFinalNewline2,
      verboseInfo,
      streamInfo
    }), "waitForAllStream");
    getAllStream = /* @__PURE__ */ __name(({ stdout, stderr, all }, [, bufferStdout, bufferStderr]) => {
      const buffer = bufferStdout || bufferStderr;
      if (!buffer) {
        return { stream: all, buffer };
      }
      if (!bufferStdout) {
        return { stream: stderr, buffer };
      }
      if (!bufferStderr) {
        return { stream: stdout, buffer };
      }
      return { stream: all, buffer };
    }, "getAllStream");
    getAllMixed = /* @__PURE__ */ __name(({ all, stdout, stderr }) => all && stdout && stderr && stdout.readableObjectMode !== stderr.readableObjectMode, "getAllMixed");
  }
});

// ../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/verbose/ipc.js
var shouldLogIpc, logIpcOutput;
var init_ipc = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/verbose/ipc.js"() {
    init_log();
    init_values();
    shouldLogIpc = /* @__PURE__ */ __name((verboseInfo) => isFullVerbose(verboseInfo, "ipc"), "shouldLogIpc");
    logIpcOutput = /* @__PURE__ */ __name((message, verboseInfo) => {
      const verboseMessage = serializeVerboseMessage(message);
      verboseLog({
        type: "ipc",
        verboseMessage,
        fdNumber: "ipc",
        verboseInfo
      });
    }, "logIpcOutput");
  }
});

// ../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/ipc/buffer-messages.js
var waitForIpcOutput, getBufferedIpcOutput;
var init_buffer_messages = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/ipc/buffer-messages.js"() {
    init_max_buffer();
    init_ipc();
    init_specific();
    init_get_each();
    waitForIpcOutput = /* @__PURE__ */ __name(async ({
      subprocess,
      buffer: bufferArray,
      maxBuffer: maxBufferArray,
      ipc,
      ipcOutput,
      verboseInfo
    }) => {
      if (!ipc) {
        return ipcOutput;
      }
      const isVerbose2 = shouldLogIpc(verboseInfo);
      const buffer = getFdSpecificValue(bufferArray, "ipc");
      const maxBuffer = getFdSpecificValue(maxBufferArray, "ipc");
      for await (const message of loopOnMessages({
        anyProcess: subprocess,
        channel: subprocess.channel,
        isSubprocess: false,
        ipc,
        shouldAwait: false,
        reference: true
      })) {
        if (buffer) {
          checkIpcMaxBuffer(subprocess, ipcOutput, maxBuffer);
          ipcOutput.push(message);
        }
        if (isVerbose2) {
          logIpcOutput(message, verboseInfo);
        }
      }
      return ipcOutput;
    }, "waitForIpcOutput");
    getBufferedIpcOutput = /* @__PURE__ */ __name(async (ipcOutputPromise, ipcOutput) => {
      await Promise.allSettled([ipcOutputPromise]);
      return ipcOutput;
    }, "getBufferedIpcOutput");
  }
});
var waitForSubprocessResult, waitForOriginalStreams, waitForCustomStreamsEnd, throwOnSubprocessError;
var init_wait_subprocess = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/resolve/wait-subprocess.js"() {
    init_is_stream();
    init_timeout();
    init_cancel();
    init_graceful2();
    init_standard_stream();
    init_type();
    init_contents2();
    init_buffer_messages();
    init_ipc_input();
    init_all_async();
    init_stdio();
    init_exit_async();
    init_wait_stream();
    waitForSubprocessResult = /* @__PURE__ */ __name(async ({
      subprocess,
      options: {
        encoding,
        buffer,
        maxBuffer,
        lines,
        timeoutDuration: timeout,
        cancelSignal,
        gracefulCancel,
        forceKillAfterDelay,
        stripFinalNewline: stripFinalNewline2,
        ipc,
        ipcInput
      },
      context,
      verboseInfo,
      fileDescriptors,
      originalStreams,
      onInternalError,
      controller
    }) => {
      const exitPromise = waitForExit(subprocess, context);
      const streamInfo = {
        originalStreams,
        fileDescriptors,
        subprocess,
        exitPromise,
        propagating: false
      };
      const stdioPromises = waitForStdioStreams({
        subprocess,
        encoding,
        buffer,
        maxBuffer,
        lines,
        stripFinalNewline: stripFinalNewline2,
        verboseInfo,
        streamInfo
      });
      const allPromise = waitForAllStream({
        subprocess,
        encoding,
        buffer,
        maxBuffer,
        lines,
        stripFinalNewline: stripFinalNewline2,
        verboseInfo,
        streamInfo
      });
      const ipcOutput = [];
      const ipcOutputPromise = waitForIpcOutput({
        subprocess,
        buffer,
        maxBuffer,
        ipc,
        ipcOutput,
        verboseInfo
      });
      const originalPromises = waitForOriginalStreams(originalStreams, subprocess, streamInfo);
      const customStreamsEndPromises = waitForCustomStreamsEnd(fileDescriptors, streamInfo);
      try {
        return await Promise.race([
          Promise.all([
            {},
            waitForSuccessfulExit(exitPromise),
            Promise.all(stdioPromises),
            allPromise,
            ipcOutputPromise,
            sendIpcInput(subprocess, ipcInput),
            ...originalPromises,
            ...customStreamsEndPromises
          ]),
          onInternalError,
          throwOnSubprocessError(subprocess, controller),
          ...throwOnTimeout(subprocess, timeout, context, controller),
          ...throwOnCancel({
            subprocess,
            cancelSignal,
            gracefulCancel,
            context,
            controller
          }),
          ...throwOnGracefulCancel({
            subprocess,
            cancelSignal,
            gracefulCancel,
            forceKillAfterDelay,
            context,
            controller
          })
        ]);
      } catch (error) {
        context.terminationReason ??= "other";
        return Promise.all([
          { error },
          exitPromise,
          Promise.all(stdioPromises.map((stdioPromise) => getBufferedData(stdioPromise))),
          getBufferedData(allPromise),
          getBufferedIpcOutput(ipcOutputPromise, ipcOutput),
          Promise.allSettled(originalPromises),
          Promise.allSettled(customStreamsEndPromises)
        ]);
      }
    }, "waitForSubprocessResult");
    waitForOriginalStreams = /* @__PURE__ */ __name((originalStreams, subprocess, streamInfo) => originalStreams.map((stream, fdNumber) => stream === subprocess.stdio[fdNumber] ? void 0 : waitForStream(stream, fdNumber, streamInfo)), "waitForOriginalStreams");
    waitForCustomStreamsEnd = /* @__PURE__ */ __name((fileDescriptors, streamInfo) => fileDescriptors.flatMap(({ stdioItems }, fdNumber) => stdioItems.filter(({ value, stream = value }) => isStream(stream, { checkOpen: false }) && !isStandardStream(stream)).map(({ type, value, stream = value }) => waitForStream(stream, fdNumber, streamInfo, {
      isSameDirection: TRANSFORM_TYPES.has(type),
      stopOnExit: type === "native"
    }))), "waitForCustomStreamsEnd");
    throwOnSubprocessError = /* @__PURE__ */ __name(async (subprocess, { signal }) => {
      const [error] = await events.once(subprocess, "error", { signal });
      throw error;
    }, "throwOnSubprocessError");
  }
});

// ../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/convert/concurrent.js
var initializeConcurrentStreams, addConcurrentStream, waitForConcurrentStreams;
var init_concurrent = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/convert/concurrent.js"() {
    init_deferred();
    initializeConcurrentStreams = /* @__PURE__ */ __name(() => ({
      readableDestroy: /* @__PURE__ */ new WeakMap(),
      writableFinal: /* @__PURE__ */ new WeakMap(),
      writableDestroy: /* @__PURE__ */ new WeakMap()
    }), "initializeConcurrentStreams");
    addConcurrentStream = /* @__PURE__ */ __name((concurrentStreams, stream, waitName) => {
      const weakMap = concurrentStreams[waitName];
      if (!weakMap.has(stream)) {
        weakMap.set(stream, []);
      }
      const promises = weakMap.get(stream);
      const promise = createDeferred();
      promises.push(promise);
      const resolve = promise.resolve.bind(promise);
      return { resolve, promises };
    }, "addConcurrentStream");
    waitForConcurrentStreams = /* @__PURE__ */ __name(async ({ resolve, promises }, subprocess) => {
      resolve();
      const [isSubprocessExit] = await Promise.race([
        Promise.allSettled([true, subprocess]),
        Promise.all([false, ...promises])
      ]);
      return !isSubprocessExit;
    }, "waitForConcurrentStreams");
  }
});
var safeWaitForSubprocessStdin, safeWaitForSubprocessStdout, waitForSubprocessStdin, waitForSubprocessStdout, waitForSubprocess, destroyOtherStream;
var init_shared = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/convert/shared.js"() {
    init_wait_stream();
    safeWaitForSubprocessStdin = /* @__PURE__ */ __name(async (subprocessStdin) => {
      if (subprocessStdin === void 0) {
        return;
      }
      try {
        await waitForSubprocessStdin(subprocessStdin);
      } catch {
      }
    }, "safeWaitForSubprocessStdin");
    safeWaitForSubprocessStdout = /* @__PURE__ */ __name(async (subprocessStdout) => {
      if (subprocessStdout === void 0) {
        return;
      }
      try {
        await waitForSubprocessStdout(subprocessStdout);
      } catch {
      }
    }, "safeWaitForSubprocessStdout");
    waitForSubprocessStdin = /* @__PURE__ */ __name(async (subprocessStdin) => {
      await promises$1.finished(subprocessStdin, { cleanup: true, readable: false, writable: true });
    }, "waitForSubprocessStdin");
    waitForSubprocessStdout = /* @__PURE__ */ __name(async (subprocessStdout) => {
      await promises$1.finished(subprocessStdout, { cleanup: true, readable: true, writable: false });
    }, "waitForSubprocessStdout");
    waitForSubprocess = /* @__PURE__ */ __name(async (subprocess, error) => {
      await subprocess;
      if (error) {
        throw error;
      }
    }, "waitForSubprocess");
    destroyOtherStream = /* @__PURE__ */ __name((stream, isOpen, error) => {
      if (error && !isStreamAbort(error)) {
        stream.destroy(error);
      } else if (isOpen) {
        stream.destroy();
      }
    }, "destroyOtherStream");
  }
});
var createReadable, getSubprocessStdout, getReadableOptions, getReadableMethods, onRead, onStdoutFinished, onReadableDestroy, destroyOtherReadable;
var init_readable = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/convert/readable.js"() {
    init_encoding_option();
    init_fd_options();
    init_iterate();
    init_deferred();
    init_concurrent();
    init_shared();
    createReadable = /* @__PURE__ */ __name(({ subprocess, concurrentStreams, encoding }, { from, binary: binaryOption = true, preserveNewlines = true } = {}) => {
      const binary = binaryOption || BINARY_ENCODINGS.has(encoding);
      const { subprocessStdout, waitReadableDestroy } = getSubprocessStdout(subprocess, from, concurrentStreams);
      const { readableEncoding, readableObjectMode, readableHighWaterMark } = getReadableOptions(subprocessStdout, binary);
      const { read, onStdoutDataDone } = getReadableMethods({
        subprocessStdout,
        subprocess,
        binary,
        encoding,
        preserveNewlines
      });
      const readable2 = new stream.Readable({
        read,
        destroy: util.callbackify(onReadableDestroy.bind(void 0, { subprocessStdout, subprocess, waitReadableDestroy })),
        highWaterMark: readableHighWaterMark,
        objectMode: readableObjectMode,
        encoding: readableEncoding
      });
      onStdoutFinished({
        subprocessStdout,
        onStdoutDataDone,
        readable: readable2,
        subprocess
      });
      return readable2;
    }, "createReadable");
    getSubprocessStdout = /* @__PURE__ */ __name((subprocess, from, concurrentStreams) => {
      const subprocessStdout = getFromStream(subprocess, from);
      const waitReadableDestroy = addConcurrentStream(concurrentStreams, subprocessStdout, "readableDestroy");
      return { subprocessStdout, waitReadableDestroy };
    }, "getSubprocessStdout");
    getReadableOptions = /* @__PURE__ */ __name(({ readableEncoding, readableObjectMode, readableHighWaterMark }, binary) => binary ? { readableEncoding, readableObjectMode, readableHighWaterMark } : { readableEncoding, readableObjectMode: true, readableHighWaterMark: DEFAULT_OBJECT_HIGH_WATER_MARK }, "getReadableOptions");
    getReadableMethods = /* @__PURE__ */ __name(({ subprocessStdout, subprocess, binary, encoding, preserveNewlines }) => {
      const onStdoutDataDone = createDeferred();
      const onStdoutData = iterateOnSubprocessStream({
        subprocessStdout,
        subprocess,
        binary,
        shouldEncode: !binary,
        encoding,
        preserveNewlines
      });
      return {
        read() {
          onRead(this, onStdoutData, onStdoutDataDone);
        },
        onStdoutDataDone
      };
    }, "getReadableMethods");
    onRead = /* @__PURE__ */ __name(async (readable2, onStdoutData, onStdoutDataDone) => {
      try {
        const { value, done } = await onStdoutData.next();
        if (done) {
          onStdoutDataDone.resolve();
        } else {
          readable2.push(value);
        }
      } catch {
      }
    }, "onRead");
    onStdoutFinished = /* @__PURE__ */ __name(async ({ subprocessStdout, onStdoutDataDone, readable: readable2, subprocess, subprocessStdin }) => {
      try {
        await waitForSubprocessStdout(subprocessStdout);
        await subprocess;
        await safeWaitForSubprocessStdin(subprocessStdin);
        await onStdoutDataDone;
        if (readable2.readable) {
          readable2.push(null);
        }
      } catch (error) {
        await safeWaitForSubprocessStdin(subprocessStdin);
        destroyOtherReadable(readable2, error);
      }
    }, "onStdoutFinished");
    onReadableDestroy = /* @__PURE__ */ __name(async ({ subprocessStdout, subprocess, waitReadableDestroy }, error) => {
      if (await waitForConcurrentStreams(waitReadableDestroy, subprocess)) {
        destroyOtherReadable(subprocessStdout, error);
        await waitForSubprocess(subprocess, error);
      }
    }, "onReadableDestroy");
    destroyOtherReadable = /* @__PURE__ */ __name((stream, error) => {
      destroyOtherStream(stream, stream.readable, error);
    }, "destroyOtherReadable");
  }
});
var createWritable, getSubprocessStdin, getWritableMethods, onWrite, onWritableFinal, onStdinFinished, onWritableDestroy, destroyOtherWritable;
var init_writable = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/convert/writable.js"() {
    init_fd_options();
    init_concurrent();
    init_shared();
    createWritable = /* @__PURE__ */ __name(({ subprocess, concurrentStreams }, { to } = {}) => {
      const { subprocessStdin, waitWritableFinal, waitWritableDestroy } = getSubprocessStdin(subprocess, to, concurrentStreams);
      const writable2 = new stream.Writable({
        ...getWritableMethods(subprocessStdin, subprocess, waitWritableFinal),
        destroy: util.callbackify(onWritableDestroy.bind(void 0, {
          subprocessStdin,
          subprocess,
          waitWritableFinal,
          waitWritableDestroy
        })),
        highWaterMark: subprocessStdin.writableHighWaterMark,
        objectMode: subprocessStdin.writableObjectMode
      });
      onStdinFinished(subprocessStdin, writable2);
      return writable2;
    }, "createWritable");
    getSubprocessStdin = /* @__PURE__ */ __name((subprocess, to, concurrentStreams) => {
      const subprocessStdin = getToStream(subprocess, to);
      const waitWritableFinal = addConcurrentStream(concurrentStreams, subprocessStdin, "writableFinal");
      const waitWritableDestroy = addConcurrentStream(concurrentStreams, subprocessStdin, "writableDestroy");
      return { subprocessStdin, waitWritableFinal, waitWritableDestroy };
    }, "getSubprocessStdin");
    getWritableMethods = /* @__PURE__ */ __name((subprocessStdin, subprocess, waitWritableFinal) => ({
      write: onWrite.bind(void 0, subprocessStdin),
      final: util.callbackify(onWritableFinal.bind(void 0, subprocessStdin, subprocess, waitWritableFinal))
    }), "getWritableMethods");
    onWrite = /* @__PURE__ */ __name((subprocessStdin, chunk, encoding, done) => {
      if (subprocessStdin.write(chunk, encoding)) {
        done();
      } else {
        subprocessStdin.once("drain", done);
      }
    }, "onWrite");
    onWritableFinal = /* @__PURE__ */ __name(async (subprocessStdin, subprocess, waitWritableFinal) => {
      if (await waitForConcurrentStreams(waitWritableFinal, subprocess)) {
        if (subprocessStdin.writable) {
          subprocessStdin.end();
        }
        await subprocess;
      }
    }, "onWritableFinal");
    onStdinFinished = /* @__PURE__ */ __name(async (subprocessStdin, writable2, subprocessStdout) => {
      try {
        await waitForSubprocessStdin(subprocessStdin);
        if (writable2.writable) {
          writable2.end();
        }
      } catch (error) {
        await safeWaitForSubprocessStdout(subprocessStdout);
        destroyOtherWritable(writable2, error);
      }
    }, "onStdinFinished");
    onWritableDestroy = /* @__PURE__ */ __name(async ({ subprocessStdin, subprocess, waitWritableFinal, waitWritableDestroy }, error) => {
      await waitForConcurrentStreams(waitWritableFinal, subprocess);
      if (await waitForConcurrentStreams(waitWritableDestroy, subprocess)) {
        destroyOtherWritable(subprocessStdin, error);
        await waitForSubprocess(subprocess, error);
      }
    }, "onWritableDestroy");
    destroyOtherWritable = /* @__PURE__ */ __name((stream, error) => {
      destroyOtherStream(stream, stream.writable, error);
    }, "destroyOtherWritable");
  }
});
var createDuplex, onDuplexDestroy;
var init_duplex = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/convert/duplex.js"() {
    init_encoding_option();
    init_readable();
    init_writable();
    createDuplex = /* @__PURE__ */ __name(({ subprocess, concurrentStreams, encoding }, { from, to, binary: binaryOption = true, preserveNewlines = true } = {}) => {
      const binary = binaryOption || BINARY_ENCODINGS.has(encoding);
      const { subprocessStdout, waitReadableDestroy } = getSubprocessStdout(subprocess, from, concurrentStreams);
      const { subprocessStdin, waitWritableFinal, waitWritableDestroy } = getSubprocessStdin(subprocess, to, concurrentStreams);
      const { readableEncoding, readableObjectMode, readableHighWaterMark } = getReadableOptions(subprocessStdout, binary);
      const { read, onStdoutDataDone } = getReadableMethods({
        subprocessStdout,
        subprocess,
        binary,
        encoding,
        preserveNewlines
      });
      const duplex2 = new stream.Duplex({
        read,
        ...getWritableMethods(subprocessStdin, subprocess, waitWritableFinal),
        destroy: util.callbackify(onDuplexDestroy.bind(void 0, {
          subprocessStdout,
          subprocessStdin,
          subprocess,
          waitReadableDestroy,
          waitWritableFinal,
          waitWritableDestroy
        })),
        readableHighWaterMark,
        writableHighWaterMark: subprocessStdin.writableHighWaterMark,
        readableObjectMode,
        writableObjectMode: subprocessStdin.writableObjectMode,
        encoding: readableEncoding
      });
      onStdoutFinished({
        subprocessStdout,
        onStdoutDataDone,
        readable: duplex2,
        subprocess,
        subprocessStdin
      });
      onStdinFinished(subprocessStdin, duplex2, subprocessStdout);
      return duplex2;
    }, "createDuplex");
    onDuplexDestroy = /* @__PURE__ */ __name(async ({ subprocessStdout, subprocessStdin, subprocess, waitReadableDestroy, waitWritableFinal, waitWritableDestroy }, error) => {
      await Promise.all([
        onReadableDestroy({ subprocessStdout, subprocess, waitReadableDestroy }, error),
        onWritableDestroy({
          subprocessStdin,
          subprocess,
          waitWritableFinal,
          waitWritableDestroy
        }, error)
      ]);
    }, "onDuplexDestroy");
  }
});

// ../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/convert/iterable.js
var createIterable, iterateOnStdoutData;
var init_iterable = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/convert/iterable.js"() {
    init_encoding_option();
    init_fd_options();
    init_iterate();
    createIterable = /* @__PURE__ */ __name((subprocess, encoding, {
      from,
      binary: binaryOption = false,
      preserveNewlines = false
    } = {}) => {
      const binary = binaryOption || BINARY_ENCODINGS.has(encoding);
      const subprocessStdout = getFromStream(subprocess, from);
      const onStdoutData = iterateOnSubprocessStream({
        subprocessStdout,
        subprocess,
        binary,
        shouldEncode: true,
        encoding,
        preserveNewlines
      });
      return iterateOnStdoutData(onStdoutData, subprocessStdout, subprocess);
    }, "createIterable");
    iterateOnStdoutData = /* @__PURE__ */ __name(async function* (onStdoutData, subprocessStdout, subprocess) {
      try {
        yield* onStdoutData;
      } finally {
        if (subprocessStdout.readable) {
          subprocessStdout.destroy();
        }
        await subprocess;
      }
    }, "iterateOnStdoutData");
  }
});

// ../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/convert/add.js
var addConvertedStreams;
var init_add = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/convert/add.js"() {
    init_concurrent();
    init_readable();
    init_writable();
    init_duplex();
    init_iterable();
    addConvertedStreams = /* @__PURE__ */ __name((subprocess, { encoding }) => {
      const concurrentStreams = initializeConcurrentStreams();
      subprocess.readable = createReadable.bind(void 0, { subprocess, concurrentStreams, encoding });
      subprocess.writable = createWritable.bind(void 0, { subprocess, concurrentStreams });
      subprocess.duplex = createDuplex.bind(void 0, { subprocess, concurrentStreams, encoding });
      subprocess.iterable = createIterable.bind(void 0, subprocess, encoding);
      subprocess[Symbol.asyncIterator] = createIterable.bind(void 0, subprocess, encoding, {});
    }, "addConvertedStreams");
  }
});

// ../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/methods/promise.js
var mergePromise, nativePromisePrototype, descriptors;
var init_promise = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/methods/promise.js"() {
    mergePromise = /* @__PURE__ */ __name((subprocess, promise) => {
      for (const [property, descriptor] of descriptors) {
        const value = descriptor.value.bind(promise);
        Reflect.defineProperty(subprocess, property, { ...descriptor, value });
      }
    }, "mergePromise");
    nativePromisePrototype = (async () => {
    })().constructor.prototype;
    descriptors = ["then", "catch", "finally"].map((property) => [
      property,
      Reflect.getOwnPropertyDescriptor(nativePromisePrototype, property)
    ]);
  }
});
var execaCoreAsync, handleAsyncArguments, handleAsyncOptions, spawnSubprocessAsync, handlePromise, getAsyncResult;
var init_main_async = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/methods/main-async.js"() {
    init_source();
    init_command();
    init_options();
    init_fd_options();
    init_shell();
    init_methods();
    init_result();
    init_reject();
    init_early_error();
    init_handle_async();
    init_strip_newline();
    init_output_async();
    init_kill();
    init_cleanup();
    init_setup();
    init_all_async();
    init_wait_subprocess();
    init_add();
    init_deferred();
    init_promise();
    execaCoreAsync = /* @__PURE__ */ __name((rawFile, rawArguments, rawOptions, createNested) => {
      const { file, commandArguments, command, escapedCommand, startTime, verboseInfo, options, fileDescriptors } = handleAsyncArguments(rawFile, rawArguments, rawOptions);
      const { subprocess, promise } = spawnSubprocessAsync({
        file,
        commandArguments,
        options,
        startTime,
        verboseInfo,
        command,
        escapedCommand,
        fileDescriptors
      });
      subprocess.pipe = pipeToSubprocess.bind(void 0, {
        source: subprocess,
        sourcePromise: promise,
        boundOptions: {},
        createNested
      });
      mergePromise(subprocess, promise);
      SUBPROCESS_OPTIONS.set(subprocess, { options, fileDescriptors });
      return subprocess;
    }, "execaCoreAsync");
    handleAsyncArguments = /* @__PURE__ */ __name((rawFile, rawArguments, rawOptions) => {
      const { command, escapedCommand, startTime, verboseInfo } = handleCommand(rawFile, rawArguments, rawOptions);
      const { file, commandArguments, options: normalizedOptions } = normalizeOptions(rawFile, rawArguments, rawOptions);
      const options = handleAsyncOptions(normalizedOptions);
      const fileDescriptors = handleStdioAsync(options, verboseInfo);
      return {
        file,
        commandArguments,
        command,
        escapedCommand,
        startTime,
        verboseInfo,
        options,
        fileDescriptors
      };
    }, "handleAsyncArguments");
    handleAsyncOptions = /* @__PURE__ */ __name(({ timeout, signal, ...options }) => {
      if (signal !== void 0) {
        throw new TypeError('The "signal" option has been renamed to "cancelSignal" instead.');
      }
      return { ...options, timeoutDuration: timeout };
    }, "handleAsyncOptions");
    spawnSubprocessAsync = /* @__PURE__ */ __name(({ file, commandArguments, options, startTime, verboseInfo, command, escapedCommand, fileDescriptors }) => {
      let subprocess;
      try {
        subprocess = child_process.spawn(...concatenateShell(file, commandArguments, options));
      } catch (error) {
        return handleEarlyError({
          error,
          command,
          escapedCommand,
          fileDescriptors,
          options,
          startTime,
          verboseInfo
        });
      }
      const controller = new AbortController();
      events.setMaxListeners(Number.POSITIVE_INFINITY, controller.signal);
      const originalStreams = [...subprocess.stdio];
      pipeOutputAsync(subprocess, fileDescriptors, controller);
      cleanupOnExit(subprocess, options, controller);
      const context = {};
      const onInternalError = createDeferred();
      subprocess.kill = subprocessKill.bind(void 0, {
        kill: subprocess.kill.bind(subprocess),
        options,
        onInternalError,
        context,
        controller
      });
      subprocess.all = makeAllStream(subprocess, options);
      addConvertedStreams(subprocess, options);
      addIpcMethods(subprocess, options);
      const promise = handlePromise({
        subprocess,
        options,
        startTime,
        verboseInfo,
        fileDescriptors,
        originalStreams,
        command,
        escapedCommand,
        context,
        onInternalError,
        controller
      });
      return { subprocess, promise };
    }, "spawnSubprocessAsync");
    handlePromise = /* @__PURE__ */ __name(async ({ subprocess, options, startTime, verboseInfo, fileDescriptors, originalStreams, command, escapedCommand, context, onInternalError, controller }) => {
      const [
        errorInfo,
        [exitCode, signal],
        stdioResults,
        allResult,
        ipcOutput
      ] = await waitForSubprocessResult({
        subprocess,
        options,
        context,
        verboseInfo,
        fileDescriptors,
        originalStreams,
        onInternalError,
        controller
      });
      controller.abort();
      onInternalError.resolve();
      const stdio = stdioResults.map((stdioResult, fdNumber) => stripNewline(stdioResult, options, fdNumber));
      const all = stripNewline(allResult, options, "all");
      const result = getAsyncResult({
        errorInfo,
        exitCode,
        signal,
        stdio,
        all,
        ipcOutput,
        context,
        options,
        command,
        escapedCommand,
        startTime
      });
      return handleResult(result, verboseInfo, options);
    }, "handlePromise");
    getAsyncResult = /* @__PURE__ */ __name(({ errorInfo, exitCode, signal, stdio, all, ipcOutput, context, options, command, escapedCommand, startTime }) => "error" in errorInfo ? makeError({
      error: errorInfo.error,
      command,
      escapedCommand,
      timedOut: context.terminationReason === "timeout",
      isCanceled: context.terminationReason === "cancel" || context.terminationReason === "gracefulCancel",
      isGracefullyCanceled: context.terminationReason === "gracefulCancel",
      isMaxBuffer: errorInfo.error instanceof MaxBufferError,
      isForcefullyTerminated: context.isForcefullyTerminated,
      exitCode,
      signal,
      stdio,
      all,
      ipcOutput,
      options,
      startTime,
      isSync: false
    }) : makeSuccessResult({
      command,
      escapedCommand,
      stdio,
      all,
      ipcOutput,
      options,
      startTime
    }), "getAsyncResult");
  }
});

// ../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/methods/bind.js
var mergeOptions, mergeOption, DEEP_OPTIONS;
var init_bind = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/methods/bind.js"() {
    init_is_plain_obj();
    init_specific();
    mergeOptions = /* @__PURE__ */ __name((boundOptions, options) => {
      const newOptions = Object.fromEntries(
        Object.entries(options).map(([optionName, optionValue]) => [
          optionName,
          mergeOption(optionName, boundOptions[optionName], optionValue)
        ])
      );
      return { ...boundOptions, ...newOptions };
    }, "mergeOptions");
    mergeOption = /* @__PURE__ */ __name((optionName, boundOptionValue, optionValue) => {
      if (DEEP_OPTIONS.has(optionName) && isPlainObject2(boundOptionValue) && isPlainObject2(optionValue)) {
        return { ...boundOptionValue, ...optionValue };
      }
      return optionValue;
    }, "mergeOption");
    DEEP_OPTIONS = /* @__PURE__ */ new Set(["env", ...FD_SPECIFIC_OPTIONS]);
  }
});

// ../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/methods/create.js
var createExeca, callBoundExeca, parseArguments;
var init_create = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/methods/create.js"() {
    init_is_plain_obj();
    init_parameters();
    init_template();
    init_main_sync();
    init_main_async();
    init_bind();
    createExeca = /* @__PURE__ */ __name((mapArguments, boundOptions, deepOptions, setBoundExeca) => {
      const createNested = /* @__PURE__ */ __name((mapArguments2, boundOptions2, setBoundExeca2) => createExeca(mapArguments2, boundOptions2, deepOptions, setBoundExeca2), "createNested");
      const boundExeca = /* @__PURE__ */ __name((...execaArguments) => callBoundExeca({
        mapArguments,
        deepOptions,
        boundOptions,
        setBoundExeca,
        createNested
      }, ...execaArguments), "boundExeca");
      if (setBoundExeca !== void 0) {
        setBoundExeca(boundExeca, createNested, boundOptions);
      }
      return boundExeca;
    }, "createExeca");
    callBoundExeca = /* @__PURE__ */ __name(({ mapArguments, deepOptions = {}, boundOptions = {}, setBoundExeca, createNested }, firstArgument, ...nextArguments) => {
      if (isPlainObject2(firstArgument)) {
        return createNested(mapArguments, mergeOptions(boundOptions, firstArgument), setBoundExeca);
      }
      const { file, commandArguments, options, isSync } = parseArguments({
        mapArguments,
        firstArgument,
        nextArguments,
        deepOptions,
        boundOptions
      });
      return isSync ? execaCoreSync(file, commandArguments, options) : execaCoreAsync(file, commandArguments, options, createNested);
    }, "callBoundExeca");
    parseArguments = /* @__PURE__ */ __name(({ mapArguments, firstArgument, nextArguments, deepOptions, boundOptions }) => {
      const callArguments = isTemplateString(firstArgument) ? parseTemplates(firstArgument, nextArguments) : [firstArgument, ...nextArguments];
      const [initialFile, initialArguments, initialOptions] = normalizeParameters(...callArguments);
      const mergedOptions = mergeOptions(mergeOptions(deepOptions, boundOptions), initialOptions);
      const {
        file = initialFile,
        commandArguments = initialArguments,
        options = mergedOptions,
        isSync = false
      } = mapArguments({ file: initialFile, commandArguments: initialArguments, options: mergedOptions });
      return {
        file,
        commandArguments,
        options,
        isSync
      };
    }, "parseArguments");
  }
});

// ../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/methods/command.js
var mapCommandAsync, mapCommandSync, parseCommand, parseCommandString, SPACES_REGEXP;
var init_command2 = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/methods/command.js"() {
    mapCommandAsync = /* @__PURE__ */ __name(({ file, commandArguments }) => parseCommand(file, commandArguments), "mapCommandAsync");
    mapCommandSync = /* @__PURE__ */ __name(({ file, commandArguments }) => ({ ...parseCommand(file, commandArguments), isSync: true }), "mapCommandSync");
    parseCommand = /* @__PURE__ */ __name((command, unusedArguments) => {
      if (unusedArguments.length > 0) {
        throw new TypeError(`The command and its arguments must be passed as a single string: ${command} ${unusedArguments}.`);
      }
      const [file, ...commandArguments] = parseCommandString(command);
      return { file, commandArguments };
    }, "parseCommand");
    parseCommandString = /* @__PURE__ */ __name((command) => {
      if (typeof command !== "string") {
        throw new TypeError(`The command must be a string: ${String(command)}.`);
      }
      const trimmedCommand = command.trim();
      if (trimmedCommand === "") {
        return [];
      }
      const tokens = [];
      for (const token of trimmedCommand.split(SPACES_REGEXP)) {
        const previousToken = tokens.at(-1);
        if (previousToken && previousToken.endsWith("\\")) {
          tokens[tokens.length - 1] = `${previousToken.slice(0, -1)} ${token}`;
        } else {
          tokens.push(token);
        }
      }
      return tokens;
    }, "parseCommandString");
    SPACES_REGEXP = / +/g;
  }
});

// ../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/methods/script.js
var setScriptSync, mapScriptAsync, mapScriptSync, getScriptOptions, getScriptStdinOption, deepScriptOptions;
var init_script = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/lib/methods/script.js"() {
    setScriptSync = /* @__PURE__ */ __name((boundExeca, createNested, boundOptions) => {
      boundExeca.sync = createNested(mapScriptSync, boundOptions);
      boundExeca.s = boundExeca.sync;
    }, "setScriptSync");
    mapScriptAsync = /* @__PURE__ */ __name(({ options }) => getScriptOptions(options), "mapScriptAsync");
    mapScriptSync = /* @__PURE__ */ __name(({ options }) => ({ ...getScriptOptions(options), isSync: true }), "mapScriptSync");
    getScriptOptions = /* @__PURE__ */ __name((options) => ({ options: { ...getScriptStdinOption(options), ...options } }), "getScriptOptions");
    getScriptStdinOption = /* @__PURE__ */ __name(({ input, inputFile, stdio }) => input === void 0 && inputFile === void 0 && stdio === void 0 ? { stdin: "inherit" } : {}, "getScriptStdinOption");
    deepScriptOptions = { preferLocal: true };
  }
});

// ../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/index.js
var execa, sendMessage2, getOneMessage2, getEachMessage2, getCancelSignal2;
var init_execa = __esm({
  "../../node_modules/.pnpm/execa@9.6.0/node_modules/execa/index.js"() {
    init_create();
    init_command2();
    init_node2();
    init_script();
    init_methods();
    execa = createExeca(() => ({}));
    createExeca(() => ({ isSync: true }));
    createExeca(mapCommandAsync);
    createExeca(mapCommandSync);
    createExeca(mapNode);
    createExeca(mapScriptAsync, {}, deepScriptOptions, setScriptSync);
    ({
      sendMessage: sendMessage2,
      getOneMessage: getOneMessage2,
      getEachMessage: getEachMessage2,
      getCancelSignal: getCancelSignal2
    } = getIpcExport());
  }
});

// ../../node_modules/.pnpm/isexe@3.1.1/node_modules/isexe/dist/cjs/posix.js
var require_posix = __commonJS({
  "../../node_modules/.pnpm/isexe@3.1.1/node_modules/isexe/dist/cjs/posix.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.sync = exports.isexe = void 0;
    var fs_1 = __require("fs");
    var promises_1 = __require("fs/promises");
    var isexe = /* @__PURE__ */ __name(async (path12, options = {}) => {
      const { ignoreErrors = false } = options;
      try {
        return checkStat(await (0, promises_1.stat)(path12), options);
      } catch (e2) {
        const er = e2;
        if (ignoreErrors || er.code === "EACCES")
          return false;
        throw er;
      }
    }, "isexe");
    exports.isexe = isexe;
    var sync = /* @__PURE__ */ __name((path12, options = {}) => {
      const { ignoreErrors = false } = options;
      try {
        return checkStat((0, fs_1.statSync)(path12), options);
      } catch (e2) {
        const er = e2;
        if (ignoreErrors || er.code === "EACCES")
          return false;
        throw er;
      }
    }, "sync");
    exports.sync = sync;
    var checkStat = /* @__PURE__ */ __name((stat, options) => stat.isFile() && checkMode(stat, options), "checkStat");
    var checkMode = /* @__PURE__ */ __name((stat, options) => {
      const myUid = options.uid ?? process.getuid?.();
      const myGroups = options.groups ?? process.getgroups?.() ?? [];
      const myGid = options.gid ?? process.getgid?.() ?? myGroups[0];
      if (myUid === void 0 || myGid === void 0) {
        throw new Error("cannot get uid or gid");
      }
      const groups = /* @__PURE__ */ new Set([myGid, ...myGroups]);
      const mod = stat.mode;
      const uid = stat.uid;
      const gid = stat.gid;
      const u3 = parseInt("100", 8);
      const g2 = parseInt("010", 8);
      const o3 = parseInt("001", 8);
      const ug = u3 | g2;
      return !!(mod & o3 || mod & g2 && groups.has(gid) || mod & u3 && uid === myUid || mod & ug && myUid === 0);
    }, "checkMode");
  }
});

// ../../node_modules/.pnpm/isexe@3.1.1/node_modules/isexe/dist/cjs/win32.js
var require_win32 = __commonJS({
  "../../node_modules/.pnpm/isexe@3.1.1/node_modules/isexe/dist/cjs/win32.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.sync = exports.isexe = void 0;
    var fs_1 = __require("fs");
    var promises_1 = __require("fs/promises");
    var isexe = /* @__PURE__ */ __name(async (path12, options = {}) => {
      const { ignoreErrors = false } = options;
      try {
        return checkStat(await (0, promises_1.stat)(path12), path12, options);
      } catch (e2) {
        const er = e2;
        if (ignoreErrors || er.code === "EACCES")
          return false;
        throw er;
      }
    }, "isexe");
    exports.isexe = isexe;
    var sync = /* @__PURE__ */ __name((path12, options = {}) => {
      const { ignoreErrors = false } = options;
      try {
        return checkStat((0, fs_1.statSync)(path12), path12, options);
      } catch (e2) {
        const er = e2;
        if (ignoreErrors || er.code === "EACCES")
          return false;
        throw er;
      }
    }, "sync");
    exports.sync = sync;
    var checkPathExt = /* @__PURE__ */ __name((path12, options) => {
      const { pathExt = process.env.PATHEXT || "" } = options;
      const peSplit = pathExt.split(";");
      if (peSplit.indexOf("") !== -1) {
        return true;
      }
      for (let i2 = 0; i2 < peSplit.length; i2++) {
        const p2 = peSplit[i2].toLowerCase();
        const ext = path12.substring(path12.length - p2.length).toLowerCase();
        if (p2 && ext === p2) {
          return true;
        }
      }
      return false;
    }, "checkPathExt");
    var checkStat = /* @__PURE__ */ __name((stat, path12, options) => stat.isFile() && checkPathExt(path12, options), "checkStat");
  }
});

// ../../node_modules/.pnpm/isexe@3.1.1/node_modules/isexe/dist/cjs/options.js
var require_options = __commonJS({
  "../../node_modules/.pnpm/isexe@3.1.1/node_modules/isexe/dist/cjs/options.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// ../../node_modules/.pnpm/isexe@3.1.1/node_modules/isexe/dist/cjs/index.js
var require_cjs = __commonJS({
  "../../node_modules/.pnpm/isexe@3.1.1/node_modules/isexe/dist/cjs/index.js"(exports) {
    var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o3, m2, k3, k22) {
      if (k22 === void 0) k22 = k3;
      var desc = Object.getOwnPropertyDescriptor(m2, k3);
      if (!desc || ("get" in desc ? !m2.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: /* @__PURE__ */ __name(function() {
          return m2[k3];
        }, "get") };
      }
      Object.defineProperty(o3, k22, desc);
    }) : (function(o3, m2, k3, k22) {
      if (k22 === void 0) k22 = k3;
      o3[k22] = m2[k3];
    }));
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o3, v) {
      Object.defineProperty(o3, "default", { enumerable: true, value: v });
    }) : function(o3, v) {
      o3["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k3 in mod) if (k3 !== "default" && Object.prototype.hasOwnProperty.call(mod, k3)) __createBinding(result, mod, k3);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __exportStar = exports && exports.__exportStar || function(m2, exports2) {
      for (var p2 in m2) if (p2 !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p2)) __createBinding(exports2, m2, p2);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.sync = exports.isexe = exports.posix = exports.win32 = void 0;
    var posix = __importStar(require_posix());
    exports.posix = posix;
    var win32 = __importStar(require_win32());
    exports.win32 = win32;
    __exportStar(require_options(), exports);
    var platform3 = process.env._ISEXE_TEST_PLATFORM_ || process.platform;
    var impl = platform3 === "win32" ? win32 : posix;
    exports.isexe = impl.isexe;
    exports.sync = impl.sync;
  }
});

// ../../node_modules/.pnpm/which@5.0.0/node_modules/which/lib/index.js
var require_lib = __commonJS({
  "../../node_modules/.pnpm/which@5.0.0/node_modules/which/lib/index.js"(exports, module) {
    var { isexe, sync: isexeSync } = require_cjs();
    var { join: join4, delimiter, sep, posix } = __require("path");
    var isWindows2 = process.platform === "win32";
    var rSlash = new RegExp(`[${posix.sep}${sep === posix.sep ? "" : sep}]`.replace(/(\\)/g, "\\$1"));
    var rRel = new RegExp(`^\\.${rSlash.source}`);
    var getNotFoundError = /* @__PURE__ */ __name((cmd) => Object.assign(new Error(`not found: ${cmd}`), { code: "ENOENT" }), "getNotFoundError");
    var getPathInfo = /* @__PURE__ */ __name((cmd, {
      path: optPath = process.env.PATH,
      pathExt: optPathExt = process.env.PATHEXT,
      delimiter: optDelimiter = delimiter
    }) => {
      const pathEnv = cmd.match(rSlash) ? [""] : [
        // windows always checks the cwd first
        ...isWindows2 ? [process.cwd()] : [],
        ...(optPath || /* istanbul ignore next: very unusual */
        "").split(optDelimiter)
      ];
      if (isWindows2) {
        const pathExtExe = optPathExt || [".EXE", ".CMD", ".BAT", ".COM"].join(optDelimiter);
        const pathExt = pathExtExe.split(optDelimiter).flatMap((item) => [item, item.toLowerCase()]);
        if (cmd.includes(".") && pathExt[0] !== "") {
          pathExt.unshift("");
        }
        return { pathEnv, pathExt, pathExtExe };
      }
      return { pathEnv, pathExt: [""] };
    }, "getPathInfo");
    var getPathPart = /* @__PURE__ */ __name((raw, cmd) => {
      const pathPart = /^".*"$/.test(raw) ? raw.slice(1, -1) : raw;
      const prefix = !pathPart && rRel.test(cmd) ? cmd.slice(0, 2) : "";
      return prefix + join4(pathPart, cmd);
    }, "getPathPart");
    var which2 = /* @__PURE__ */ __name(async (cmd, opt = {}) => {
      const { pathEnv, pathExt, pathExtExe } = getPathInfo(cmd, opt);
      const found = [];
      for (const envPart of pathEnv) {
        const p2 = getPathPart(envPart, cmd);
        for (const ext of pathExt) {
          const withExt = p2 + ext;
          const is2 = await isexe(withExt, { pathExt: pathExtExe, ignoreErrors: true });
          if (is2) {
            if (!opt.all) {
              return withExt;
            }
            found.push(withExt);
          }
        }
      }
      if (opt.all && found.length) {
        return found;
      }
      if (opt.nothrow) {
        return null;
      }
      throw getNotFoundError(cmd);
    }, "which");
    var whichSync = /* @__PURE__ */ __name((cmd, opt = {}) => {
      const { pathEnv, pathExt, pathExtExe } = getPathInfo(cmd, opt);
      const found = [];
      for (const pathEnvPart of pathEnv) {
        const p2 = getPathPart(pathEnvPart, cmd);
        for (const ext of pathExt) {
          const withExt = p2 + ext;
          const is2 = isexeSync(withExt, { pathExt: pathExtExe, ignoreErrors: true });
          if (is2) {
            if (!opt.all) {
              return withExt;
            }
            found.push(withExt);
          }
        }
      }
      if (opt.all && found.length) {
        return found;
      }
      if (opt.nothrow) {
        return null;
      }
      throw getNotFoundError(cmd);
    }, "whichSync");
    module.exports = which2;
    which2.sync = whichSync;
  }
});

// src/cli/commands/run.command.ts
var run_command_exports = {};
__export(run_command_exports, {
  commandFn: () => commandFn3,
  commandSpec: () => commandSpec3
});
var import_which, commandSpec3, commandProcess, childCommandKilledFromRestart, isWatchModeRestart, commandFn3;
var init_run_command = __esm({
  "src/cli/commands/run.command.ts"() {
    init_execa();
    import_which = __toESM(require_lib());
    init_lib2();
    init_load_graph();
    init_error_checks();
    init_gunshi_type_utils();
    init_exit_hook();
    commandSpec3 = define({
      name: "run",
      description: "Run a command with your environment variables injected",
      args: {
        "exclude-local": {
          type: "boolean",
          description: "Exclude .env.local and .env.[env].local from loading"
        },
        "bun-sync-node-env": {
          type: "boolean",
          description: "When running Bun, set NODE_ENV to the resolved @envFlag value"
        },
        "respect-existing-env": {
          type: "boolean",
          description: "Allow process.env to override schema-defined keys"
        },
        env: {
          type: "string",
          description: "Set the environment (e.g., production, development, etc) - will be overridden by @envFlag in the schema if present"
        }
        // watch: {
        //   type: 'boolean',
        //   short: 'w',
        //   description: 'Watch mode',
        // },
      }
    });
    childCommandKilledFromRestart = false;
    isWatchModeRestart = false;
    commandFn3 = /* @__PURE__ */ __name(async (ctx) => {
      const argv = process.argv.slice(2);
      let restCommandArgs = [];
      if (argv.includes("--")) {
        const doubleDashIndex = argv.indexOf("--");
        restCommandArgs = argv.slice(doubleDashIndex + 1);
      } else {
        throw new Error("No command to run! Your command should look like `varlock run -- <your-command>`");
      }
      const commandToRunAsArgs = restCommandArgs;
      const commandToRunStr = restCommandArgs.join(" ");
      const rawCommand = commandToRunAsArgs[0];
      const commandArgsOnly = commandToRunAsArgs.slice(1);
      const pathAwareCommand = import_which.default.sync(rawCommand, { nothrow: true });
      const excludeLocal = ctx.values["exclude-local"] === true ? true : void 0;
      const respectExistingEnv = Boolean(ctx.values["respect-existing-env"]);
      const currentEnvFallback = ctx.values.env;
      const envGraph = await loadVarlockEnvGraph({ excludeLocal, respectExistingEnv, currentEnvFallback });
      checkForSchemaErrors(envGraph);
      await envGraph.resolveEnvValues();
      checkForConfigErrors(envGraph);
      const resolvedEnv = envGraph.getResolvedEnvObject();
      function buildChildEnv(resolved, mode = "whitelist") {
        const whitelist = /* @__PURE__ */ new Set(["PATH", "HOME", "SHELL", "TERM", "TZ", "LANG", "LC_ALL", "PWD", "TMPDIR", "TEMP", "TMP"]);
        let base = {};
        if (mode === "all") {
          base = { ...process.env };
        } else if (mode === "whitelist") {
          for (const key of whitelist) {
            if (process.env[key] != null) base[key] = String(process.env[key]);
          }
        }
        const merged = { ...base };
        for (const k3 in resolved) merged[k3] = resolved[k3] === void 0 ? "" : String(resolved[k3]);
        merged.__VARLOCK_RUN = "1";
        merged.__VARLOCK_ENV = JSON.stringify(envGraph.getSerializedGraph());
        return merged;
      }
      __name(buildChildEnv, "buildChildEnv");
      const fullInjectedEnv = buildChildEnv(resolvedEnv);
      const isBun = /* @__PURE__ */ __name((cmd) => cmd === "bun" || cmd === "bunx", "isBun");
      const finalCommand = pathAwareCommand || rawCommand;
      let finalArgs = commandArgsOnly.slice();
      let emptyEnvPath;
      if (isBun(rawCommand)) {
        emptyEnvPath = path8.join(os2.tmpdir(), `.varlock-empty-${process.pid}-${Date.now()}.env`);
        try {
          fs2.writeFileSync(emptyEnvPath, "");
        } catch (e2) {
        }
        finalArgs = ["--env-file", emptyEnvPath, ...finalArgs];
        if (ctx.values["bun-sync-node-env"]) {
          const envFlagKey = envGraph.envFlagKey;
          const envFlagVal = envFlagKey ? String(resolvedEnv[envFlagKey] ?? "") : "";
          if (envFlagVal) fullInjectedEnv.NODE_ENV = envFlagVal;
        }
      }
      commandProcess = execa(finalCommand, finalArgs, {
        stdio: "inherit",
        env: fullInjectedEnv
      });
      commandProcess.finally(() => {
        if (emptyEnvPath) {
          try {
            fs2.unlinkSync(emptyEnvPath);
          } catch (e2) {
          }
        }
      });
      if (!isWatchModeRestart) {
        process.on("exit", (_code, _signal) => {
          commandProcess?.kill(9);
        });
        ["SIGTERM", "SIGINT"].forEach((signal) => {
          process.on(signal, () => {
            commandProcess?.kill(9);
            gracefulExit(1);
          });
        });
      }
      let exitCode;
      try {
        const commandResult = await commandProcess;
        exitCode = commandResult.exitCode;
      } catch (error) {
        if (error.signal === "SIGINT" && childCommandKilledFromRestart) {
          childCommandKilledFromRestart = false;
          return;
        }
        if (error.signal === "SIGINT" || error.signal === "SIGKILL") {
          gracefulExit(1);
        } else {
          console.log(error.message);
          console.log(`command [${commandToRunStr}] failed`);
          console.log("try running the same command without dmno");
          console.log("if you get a different result, dmno may be the problem...");
        }
        exitCode = error.exitCode || 1;
      }
      {
        return gracefulExit(exitCode);
      }
    }, "commandFn");
  }
});

// src/cli/commands/help.command.ts
var help_command_exports = {};
__export(help_command_exports, {
  commandFn: () => commandFn4,
  commandSpec: () => commandSpec4
});
var commandSpec4, commandFn4;
var init_help_command = __esm({
  "src/cli/commands/help.command.ts"() {
    init_lib2();
    init_gunshi_type_utils();
    commandSpec4 = define({
      name: "help",
      description: "Show help info for varlock",
      args: {}
    });
    commandFn4 = /* @__PURE__ */ __name(async (ctx) => {
    }, "commandFn");
  }
});

// src/cli/commands/telemetry.command.ts
var telemetry_command_exports = {};
__export(telemetry_command_exports, {
  commandFn: () => commandFn5,
  commandSpec: () => commandSpec5
});
var commandSpec5, commandFn5;
var init_telemetry_command = __esm({
  "src/cli/commands/telemetry.command.ts"() {
    init_lib2();
    init_gunshi_type_utils();
    init_exit_hook();
    init_pretty_format();
    init_exit_error();
    commandSpec5 = define({
      name: "telemetry",
      description: "Enable/disable anonymous usage analytics",
      args: {
        mode: {
          type: "positional",
          description: '"enable" or "disable"'
        }
      }
    });
    commandFn5 = /* @__PURE__ */ __name(async (ctx) => {
      if (!["enable", "disable"].includes(ctx.values.mode)) {
        throw new CliExitError('additional arg must be "enable" or "disable"', {
          forceExit: true
        });
      }
      const configDir = path8.join(os2.homedir(), ".varlock");
      const configPath = path8.join(configDir, "config.json");
      try {
        if (!fs2.existsSync(configDir)) {
          await fs9.mkdir(configDir, { recursive: true });
        }
        let config = {};
        if (fs2.existsSync(configPath)) {
          const configContent = await fs9.readFile(configPath, "utf-8");
          config = JSON.parse(configContent);
        }
        if (ctx.values.mode === "disable") config.telemetryDisabled = true;
        else delete config.telemetryDisabled;
        await fs9.writeFile(configPath, JSON.stringify(config, null, 2));
        if (ctx.values.mode) {
          console.log("\u2705 Successfully enabled anonymous usage analytics");
        } else {
          console.log("\u2705 Successfully disabled anonymous usage analytics");
        }
        console.log("> saved in:", fmt.filePath(configPath));
      } catch (error) {
        console.error("Failed to opt out of analytics:", error);
        return gracefulExit(1);
      }
    }, "commandFn");
  }
});
function openUrl(url) {
  if (isWindows) {
    child_process.spawn("cmd", ["/c", "start", " ", url], { detached: true });
  } else if (isMac) {
    child_process.spawn("open", [url], { detached: true });
  } else if (isLinux) {
    child_process.spawn("xdg-open", [url], { detached: true });
  }
}
var platform2, isWindows, isMac, isLinux;
var init_open_url = __esm({
  "src/cli/helpers/open-url.ts"() {
    platform2 = os2__default.default.platform();
    isWindows = platform2.match(/^win/i);
    isMac = platform2.match(/^darwin/i);
    isLinux = !isWindows && !isMac;
    __name(openUrl, "openUrl");
  }
});

// src/cli/helpers/key-press.ts
async function keyPressed(keys = true) {
  process.stdin.setRawMode(true);
  return new Promise((resolve) => {
    function keyPressHandler(d3) {
      const keyStr = d3.toString();
      if (["", ""].includes(keyStr)) {
        return gracefulExit(1);
      }
      if (keys === true || keys.includes(keyStr)) {
        process.stdin.setRawMode(false);
        process.stdin.off("data", keyPressHandler);
        resolve();
      }
    }
    __name(keyPressHandler, "keyPressHandler");
    process.stdin.on("data", keyPressHandler);
  });
}
var init_key_press = __esm({
  "src/cli/helpers/key-press.ts"() {
    init_exit_hook();
    __name(keyPressed, "keyPressed");
  }
});

// src/cli/commands/login.command.ts
var login_command_exports = {};
__export(login_command_exports, {
  commandFn: () => commandFn6,
  commandSpec: () => commandSpec6
});
var commandSpec6, commandFn6;
var init_login_command = __esm({
  "src/cli/commands/login.command.ts"() {
    init_ansis();
    init_lib2();
    init_pretty_format();
    init_config();
    init_open_url();
    init_key_press();
    init_gunshi_type_utils();
    init_exit_hook();
    commandSpec6 = define({
      name: "login",
      description: "Authenticate (using GitHub)",
      args: {}
    });
    commandFn6 = /* @__PURE__ */ __name(async (ctx) => {
      const codeReq = await fetch("https://github.com/login/device/code", {
        method: "POST",
        body: JSON.stringify({
          client_id: CONFIG.GITHUB_APP_CLIENT_ID
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      });
      if (codeReq.status !== 200) {
        console.log("Failed to initiate GitHub device flow login!");
        return gracefulExit(1);
      }
      const ghCodeInfo = await codeReq.json();
      logLines([
        "\u{1F511} Authenticating using GitHub:",
        "",
        `First please copy this code: ${ansis_default.bold.magenta(ghCodeInfo.user_code)}`,
        "",
        `Log in @ ${ghCodeInfo.verification_uri}`,
        "",
        "Press ENTER to open in your default browser..."
      ]);
      await keyPressed(["\r"]);
      console.log(ansis_default.italic.gray("... please complete login on github.com ..."));
      openUrl(ghCodeInfo.verification_uri);
      const pollMs = ghCodeInfo.interval * 1e3;
      const expiresMs = ghCodeInfo.expires_in * 1e3;
      const startAt = /* @__PURE__ */ new Date();
      let oauthStatus;
      while (true) {
        await promises.setTimeout(pollMs);
        try {
          const oauthStatusReq = await fetch("https://github.com/login/oauth/access_token", {
            method: "POST",
            body: JSON.stringify({
              client_id: CONFIG.GITHUB_APP_CLIENT_ID,
              device_code: ghCodeInfo.device_code,
              grant_type: "urn:ietf:params:oauth:grant-type:device_code"
            }),
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            }
          });
          oauthStatus = await oauthStatusReq.json();
        } catch (err) {
          console.log(err);
        }
        if (oauthStatus.error === "access_denied") {
          console.log("\u274C Login attempt was cancelled! Please try again.");
          return gracefulExit(1);
        }
        if (oauthStatus.access_token) break;
        if ((/* @__PURE__ */ new Date()).getTime() - startAt.getTime() > expiresMs) {
          console.log("\u274C Login timed out! Please try again.");
          return gracefulExit(1);
        }
      }
      const authReq = await fetch(`${CONFIG.VARLOCK_API_URL}/github/auth-from-device-flow`, {
        method: "POST",
        body: JSON.stringify({
          accessToken: oauthStatus.access_token,
          refreshToken: oauthStatus.refresh_token,
          accessTokenExpiresAt: new Date(Date.now() + oauthStatus.expires_in * 1e3).toISOString(),
          refreshTokenExpiresAt: new Date(Date.now() + oauthStatus.refresh_token_expires_in * 1e3).toISOString(),
          tokenType: oauthStatus.token_type,
          scope: oauthStatus.scope
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      });
      if (authReq.status !== 200) {
        console.log(await authReq.json());
        return gracefulExit(1);
      }
      const authRes = await authReq.json();
      console.log(`\u2705 Logged in as ${authRes.user.githubUsername} (${authRes.user.name})!`);
    }, "commandFn");
  }
});

// src/cli/cli-executable.ts
init_lib2();
init_exit_hook();

// src/lib/ascii-art.ts
init_ansis();
var VARLOCK_BANNER = [
  "",
  " \u2588\u2588\u2592   \u2588\u2593 \u2584\u2584\u2584       \u2588\u2588\u2580\u2588\u2588\u2588   \u2588\u2588\u2593     \u2592\u2588\u2588\u2588\u2588\u2588   \u2584\u2588\u2588\u2588\u2588\u2584   \u2588\u2588 \u2584\u2588\u2580",
  " \u2593\u2588\u2588\u2591   \u2588\u2592\u2592\u2588\u2588\u2588\u2588\u2584    \u2593\u2588\u2588 \u2592 \u2588\u2588\u2592\u2593\u2588\u2588\u2592    \u2592\u2588\u2588\u2592  \u2588\u2588\u2592\u2592\u2588\u2588\u2580 \u2580\u2588   \u2588\u2588\u2584\u2588\u2592 ",
  "  \u2593\u2588\u2588  \u2588\u2592\u2591\u2592\u2588\u2588  \u2580\u2588\u2584  \u2593\u2588\u2588 \u2591\u2584\u2588 \u2592\u2592\u2588\u2588\u2591    \u2592\u2588\u2588\u2591  \u2588\u2588\u2592\u2592\u2588\u2588    \u2584 \u2593\u2588\u2588\u2588\u2584\u2591 ",
  "   \u2592\u2588\u2588 \u2588\u2591\u2591\u2591\u2588\u2588\u2584\u2584\u2584\u2584\u2588\u2588 \u2592\u2588\u2588\u2580\u2580\u2588\u2584  \u2592\u2588\u2588\u2591    \u2592\u2588\u2588   \u2588\u2588\u2591\u2592\u2588\u2588\u2584 \u2584\u2588\u2588\u2592\u2593\u2588\u2588 \u2588\u2584 ",
  "    \u2592\u2580\u2588\u2591   \u2593\u2588   \u2593\u2588\u2588\u2592\u2591\u2588\u2588\u2593 \u2592\u2588\u2588\u2592\u2591\u2588\u2588\u2588\u2588\u2588\u2588\u2592\u2591 \u2588\u2588\u2588\u2588\u2588\u2592\u2591\u2592 \u2588\u2588\u2588\u2588\u2580 \u2591\u2592\u2588\u2588\u2592 \u2588\u2584",
  "    \u2591 \u2590\u2591   \u2592\u2592   \u2593\u2592\u2588\u2591\u2591 \u2592\u2593 \u2591\u2592\u2593\u2591\u2591 \u2592\u2591\u2593  \u2591\u2591 \u2592\u2591\u2592\u2591\u2592\u2591 \u2591 \u2591\u2592 \u2592  \u2591\u2592 \u2592\u2592 \u2593\u2592",
  "    \u2591 \u2591\u2591    \u2592   \u2592\u2592 \u2591  \u2591\u2592 \u2591 \u2592\u2591\u2591 \u2591 \u2592  \u2591  \u2591 \u2592 \u2592\u2591   \u2591  \u2592   \u2591 \u2591\u2592 \u2592\u2591",
  "      \u2591\u2591    \u2591   \u2592     \u2591\u2591   \u2591   \u2591 \u2591   \u2591 \u2591 \u2591 \u2592  \u2591        \u2591 \u2591\u2591 \u2591 ",
  "       \u2591        \u2591  \u2591   \u2591         \u2591  \u2591    \u2591 \u2591  \u2591 \u2591      \u2591  \u2591   "
  // '      ░                                       ░               ',
].join("\n");
var VARLOCK_BANNER_COLOR = VARLOCK_BANNER.replaceAll(/([▀▁▂▃▄▅▆▇█▉▊▋▌▍▎▏▐▔▕▖▗▘▙▚▛▜▝▞▟]+)/g, (m2) => ansis_default.hex("#DD0000")(m2)).replaceAll(/([▓░▒]+)/g, (m2) => ansis_default.blue(m2));

// src/cli/cli-executable.ts
init_exit_error();
init_env_graph2();
init_ansis();
init_pretty_format();

// src/cli/helpers/telemetry.ts
init_exit_hook();
var import_debug2 = __toESM(require_src());
var import_ci_info = __toESM(require_ci_info());
var isDockerCached;
function hasDockerEnv() {
  try {
    fs2__default.default.statSync("/.dockerenv");
    return true;
  } catch {
    return false;
  }
}
__name(hasDockerEnv, "hasDockerEnv");
function hasDockerCGroup() {
  try {
    return fs2__default.default.readFileSync("/proc/self/cgroup", "utf8").includes("docker");
  } catch {
    return false;
  }
}
__name(hasDockerCGroup, "hasDockerCGroup");
function isDocker() {
  if (isDockerCached === void 0) {
    isDockerCached = hasDockerEnv() || hasDockerCGroup();
  }
  return isDockerCached;
}
__name(isDocker, "isDocker");
var cachedResult;
var hasContainerEnv = /* @__PURE__ */ __name(() => {
  try {
    fs2__default.default.statSync("/run/.containerenv");
    return true;
  } catch {
    return false;
  }
}, "hasContainerEnv");
function isInsideContainer() {
  if (cachedResult === void 0) {
    cachedResult = hasContainerEnv() || isDocker();
  }
  return cachedResult;
}
__name(isInsideContainer, "isInsideContainer");

// ../../node_modules/.pnpm/is-wsl@3.1.0/node_modules/is-wsl/index.js
var isWsl = /* @__PURE__ */ __name(() => {
  if (y2__default.default.platform !== "linux") {
    return false;
  }
  if (os2__default.default.release().toLowerCase().includes("microsoft")) {
    if (isInsideContainer()) {
      return false;
    }
    return true;
  }
  try {
    return fs2__default.default.readFileSync("/proc/version", "utf8").toLowerCase().includes("microsoft") ? !isInsideContainer() : false;
  } catch {
    return false;
  }
}, "isWsl");
var is_wsl_default = y2__default.default.env.__IS_WSL_TEST__ ? isWsl : isWsl();

// package.json
var package_default = {
  version: "0.0.11"};

// src/cli/helpers/telemetry.ts
init_config();
var debug2 = (0, import_debug2.default)("varlock:telemetry");
var varlockConfigDirPath = path8.join(os2__default.default.homedir(), ".varlock");
var varlockConfigFilePath = path8.join(varlockConfigDirPath, "config.json");
var varlockConfigFileContents;
function getConfigFileContents() {
  if (varlockConfigFileContents) return varlockConfigFileContents;
  try {
    const configContent = fs2.readFileSync(varlockConfigFilePath, "utf-8");
    varlockConfigFileContents = JSON.parse(configContent);
    return varlockConfigFileContents;
  } catch (error) {
    debug2("Failed to read varlock config:", error);
    return {};
  }
}
__name(getConfigFileContents, "getConfigFileContents");
var cachedAnonymousId;
function getAnonymousId() {
  if (cachedAnonymousId) return cachedAnonymousId;
  const configFileContents = getConfigFileContents();
  if (configFileContents?.anonymousId) {
    cachedAnonymousId = configFileContents.anonymousId;
    return configFileContents.anonymousId;
  }
  const newAnonymousId = `${import_ci_info.isCI ? "ci-" : ""}${crypto__default.default.randomUUID()}`;
  if (!fs2.existsSync(varlockConfigDirPath)) {
    fs2.mkdirSync(varlockConfigDirPath, { recursive: true });
  }
  fs2.writeFileSync(
    varlockConfigFilePath,
    JSON.stringify({
      ...configFileContents,
      anonymousId: newAnonymousId
    }, null, 2),
    { flag: "w" }
  );
  cachedAnonymousId = newAnonymousId;
  return newAnonymousId;
}
__name(getAnonymousId, "getAnonymousId");
function checkIsOptedOut() {
  {
    debug2("telemetry opted out - dev build");
    return true;
  }
}
__name(checkIsOptedOut, "checkIsOptedOut");
function anonymizeValue(payload) {
  if (payload === "") {
    return payload;
  }
  const hash = crypto.createHash("sha256");
  hash.update(payload);
  return hash.digest("hex");
}
__name(anonymizeValue, "anonymizeValue");
function getProjectGitRemoteUrl() {
  try {
    let gitDirPath;
    let currentDir = process.cwd();
    while (currentDir && currentDir !== "/") {
      const possibleGitDirPath = path8.join(currentDir, ".git");
      if (fs2.existsSync(possibleGitDirPath)) {
        gitDirPath = possibleGitDirPath;
        break;
      }
      currentDir = path8.join(currentDir, "..");
    }
    if (!gitDirPath) return void 0;
    const gitConfigContents = fs2.readFileSync(path8.join(gitDirPath, "config"), "utf-8");
    const remoteUpstreamPos = gitConfigContents.indexOf('[remote "upstream"]');
    if (remoteUpstreamPos !== -1) {
      const remoteUpstreamUrl = gitConfigContents.slice(remoteUpstreamPos).match(/url = (.+)/)?.[1];
      return remoteUpstreamUrl;
    }
    const remoteOriginPos = gitConfigContents.indexOf('[remote "origin"]');
    if (remoteOriginPos === -1) return void 0;
    const remoteOriginUrl = gitConfigContents.slice(remoteOriginPos).match(/url = (.+)/)?.[1];
    return remoteOriginUrl;
  } catch (err) {
    return void 0;
  }
}
__name(getProjectGitRemoteUrl, "getProjectGitRemoteUrl");
function getAnonymousProjectId() {
  const gitRemoteUrl = getProjectGitRemoteUrl();
  if (!gitRemoteUrl) return null;
  return anonymizeValue(gitRemoteUrl);
}
__name(getAnonymousProjectId, "getAnonymousProjectId");
var cachedTelemetryMetadata;
function getTelemetryMeta() {
  if (cachedTelemetryMetadata) return cachedTelemetryMetadata;
  const cpus = os2__default.default.cpus() || [];
  let versionIdentifier = package_default.version;
  versionIdentifier += `-${"dev"}`;
  cachedTelemetryMetadata = {
    anonymous_project_id: getAnonymousProjectId(),
    node_version: process.version.replace(/^v?/, ""),
    varlock_version: versionIdentifier,
    // TODO: pass through version info for specific integrations/plugins?
    system_platform: os2__default.default.platform(),
    system_release: os2__default.default.release(),
    system_architecture: os2__default.default.arch(),
    cpu_count: cpus.length,
    cpu_model: cpus.length ? cpus[0].model : null,
    cpu_speed: cpus.length ? cpus[0].speed : null,
    memory_mb: Math.trunc(os2__default.default.totalmem() / 1024 ** 2),
    is_docker: isDocker(),
    is_tty: process.stdout.isTTY,
    is_wsl: is_wsl_default,
    is_ci: import_ci_info.isCI,
    ci_name: import_ci_info.name,
    is_sea: true
  };
  return cachedTelemetryMetadata;
}
__name(getTelemetryMeta, "getTelemetryMeta");
var isOptedOut = checkIsOptedOut();
var lastTelemetryReq;
async function posthogCapture(event, properties) {
  const telemetryMeta = getTelemetryMeta();
  const payload = {
    api_key: CONFIG.POSTHOG_API_KEY,
    event,
    properties: {
      $process_person_profile: false,
      ...telemetryMeta,
      ...properties
    },
    distinct_id: getAnonymousId()
  };
  debug2(`track${isOptedOut ? " (disabled)" : ""}`, payload);
  if (isOptedOut) return;
  const removeExitHook = asyncExitHook(async () => {
    await lastTelemetryReq;
  }, { wait: 500 });
  lastTelemetryReq = fetch(`${CONFIG.POSTHOG_HOST}/i/v0/e/`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json"
    }
  }).then((res) => {
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res.text();
  }).then((text) => debug2("telemetry response:", text)).catch((error) => {
    debug2("telemetry error:", error);
  }).finally(() => {
    removeExitHook();
  });
}
__name(posthogCapture, "posthogCapture");
async function trackCommand(command, properties) {
  await posthogCapture("cli_command_executed", {
    command,
    ...properties
  });
}
__name(trackCommand, "trackCommand");
async function trackInstall(source) {
  await posthogCapture("cli_install", {
    source
  });
}
__name(trackInstall, "trackInstall");

// src/cli/cli-executable.ts
init_error_checks();
init_init_command();
init_load_command();
init_run_command();
init_help_command();
init_telemetry_command();
init_login_command();
var versionId = package_default.version;
versionId += `-${"dev"}`;
function buildLazyCommand(commandSpec7, loadCommandFn) {
  const commandName = commandSpec7.name;
  return {
    ...commandSpec7,
    run: /* @__PURE__ */ __name(async (...args) => {
      await trackCommand(commandName, { command: commandName });
      const commandSpecAndFn = await loadCommandFn();
      return commandSpecAndFn.commandFn(...args);
    }, "run")
  };
}
__name(buildLazyCommand, "buildLazyCommand");
var subCommands = /* @__PURE__ */ new Map();
subCommands.set("init", buildLazyCommand(commandSpec, async () => await Promise.resolve().then(() => (init_init_command(), init_command_exports))));
subCommands.set("load", buildLazyCommand(commandSpec2, async () => await Promise.resolve().then(() => (init_load_command(), load_command_exports))));
subCommands.set("run", buildLazyCommand(commandSpec3, async () => await Promise.resolve().then(() => (init_run_command(), run_command_exports))));
subCommands.set("help", buildLazyCommand(commandSpec4, async () => await Promise.resolve().then(() => (init_help_command(), help_command_exports))));
subCommands.set("telemetry", buildLazyCommand(commandSpec5, async () => await Promise.resolve().then(() => (init_telemetry_command(), telemetry_command_exports))));
subCommands.set("login", buildLazyCommand(commandSpec6, async () => await Promise.resolve().then(() => (init_login_command(), login_command_exports))));
(/* @__PURE__ */ __name(async function go() {
  try {
    let args = process.argv.slice(2);
    if (args[0] === "help") args = ["--help"];
    if (true) {
      if (args[0] === "--post-install") {
        await trackInstall(args[1]);
        console.log(versionId);
        gracefulExit();
      }
    }
    if (args[0] === "--version") {
      await trackCommand("version");
    }
    await cli(args, {
      // main command - triggered if you just run `varlock` with no args
      run: /* @__PURE__ */ __name(() => {
        console.log("Please run one of the sub-commands. Run `varlock --help` for more info.");
      }, "run")
    }, {
      name: "varlock",
      description: "Encrypt and protect your env vars",
      version: versionId,
      subCommands,
      renderHeader: /* @__PURE__ */ __name(async (ctx) => {
        if (ctx.name) return "";
        return VARLOCK_BANNER_COLOR;
      }, "renderHeader")
    });
    gracefulExit();
  } catch (error) {
    if (error instanceof Error && error.message.startsWith("Command not found: ")) {
      const badCommandName = error.message.split(": ")[1];
      const badCommandErr = new CliExitError(`Invalid subcommand: ${badCommandName}`, {
        suggestion: `Run \`${fmt.command("varlock --help", { jsPackageManager: true })}\` for more info.`
      });
      console.error(badCommandErr.getFormattedOutput());
      gracefulExit(1);
    } else if (error instanceof CliExitError || error instanceof InvalidEnvError) {
      console.error(error.getFormattedOutput());
    } else if (error instanceof EnvSourceParseError) {
      console.error(`\u{1F6A8} Error encountered while loading ${error.location.path}`);
      console.error(error.message);
      const errLoc = error.location;
      const errPreview = [
        errLoc.lineStr,
        `${ansis_default.gray("-".repeat(errLoc.colNumber - 1))}${ansis_default.red("^")}`
      ].join("\n");
      console.error("Error parsing .env file");
      console.error(fmt.filePath(`${errLoc.path}:${errLoc.lineNumber}:${errLoc.colNumber}`));
      console.error(errPreview);
      gracefulExit(1);
    } else {
      throw error;
    }
    gracefulExit(1);
  }
}, "go"))();
//! this ouput is used by homebrew formula to check installed version is correct
/*! Bundled license information:

args-tokens/lib/utils-N7UlhLbz.js:
  (**
  * @author kazuya kawaguchi (a.k.a. kazupon)
  * @license MIT
  *)
*/
//# sourceMappingURL=cli-executable.cjs.map
//# sourceMappingURL=cli-executable.cjs.map