import { ENV } from "varlock/env";

// biome-ignore lint/suspicious/noConsole: allow
console.log(`NODE_ENV: ${ENV.NODE_ENV}`);
// biome-ignore lint/suspicious/noConsole: allow
console.log(`LOG_LEVEL: ${ENV.LOG_LEVEL}`);
// biome-ignore lint/suspicious/noConsole: allow
console.log(`OVERRIDE_LOADED_FROM: ${ENV.OVERRIDE_LOADED_FROM}`);
