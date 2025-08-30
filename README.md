### Testing Varlock Bun Fix with SEA Executable in DevContainer

This guide shows how to verify the Bun-specific fix using the single-executable CLI `varlock-cli-executable-bun-fix.cjs` inside the isolated DevContainer for `varlock-testing`.

#### What you’ll need
- Bun installed in the DevContainer (the provided container has it)
- `.env.schema`, `.env.development`, `.env.production`, `.env.staging`, and optionally `.env.local`
- Executable: `varlock-cli-executable-bun-fix.cjs` (place in repo root). Optionally the source map `varlock-cli-executable-bun-fix.cjs.map` for better stack traces.

---

### 1) Open the project in the DevContainer
- Open the `varlock-testing` repo in VS Code and “Reopen in Container”.
- Confirm Bun works:
```bash
bun --version
```

Place `varlock-cli-executable-bun-fix.cjs` at the repo root:
```bash
ls -l varlock-cli-executable-bun-fix.cjs
```

---

### 2) Create a simple test script
Create `script.ts` in the repo root (or adjust paths accordingly):

```ts
// script.ts
console.log("APP_ENV =", process.env.APP_ENV);
console.log("NODE_ENV =", process.env.NODE_ENV);
console.log("OVERRIDE_LOADED_FROM =", process.env.OVERRIDE_LOADED_FROM);
```

Note: This script intentionally uses process.env (no import from varlock/env) to validate the runner behavior and Bun dotenv neutralization.

---

### 3) Basic load checks (no child process)
- Pretty summary:
```bash
bun ./varlock-cli-executable-bun-fix.cjs load
```

- JSON format:
```bash
bun ./varlock-cli-executable-bun-fix.cjs load --format json | jq .APP_ENV
```

- Select a specific environment:
```bash
APP_ENV=production bun ./varlock-cli-executable-bun-fix.cjs load --format json | jq .APP_ENV
APP_ENV=staging bun ./varlock-cli-executable-bun-fix.cjs load --format json | jq .APP_ENV
```

Expected:
- `APP_ENV` equals the ambient value you set.
- Values reflect `.env.schema` + `.env.<APP_ENV>` (+ `.env.local` if present).

---

### 4) Bun runner: verify dotenv is neutralized and env is injected
Run your Bun script through Varlock:
```bash
APP_ENV=production bun ./varlock-cli-executable-bun-fix.cjs run -- bun script.ts
```

Expected output:
- `APP_ENV = production`
- `OVERRIDE_LOADED_FROM = production` (from `.env.production` unless `.env.local` overrides it)
- `NODE_ENV` is unchanged by default (unless you opt in below)

Repeat for staging:
```bash
APP_ENV=staging bun ./varlock-cli-executable-bun-fix.cjs run -- bun script.ts
```
Expected: picks up `.env.staging` correctly. Previously this often fell back to “development” due to Bun’s autoload; now it should respect the `@envFlag`-selected file.

---

### 5) Verify `.env.local` include/exclude
- Included by default:
```bash
APP_ENV=production bun ./varlock-cli-executable-bun-fix.cjs run -- bun script.ts
```
If `.env.local` sets `OVERRIDE_LOADED_FROM=local`, you should see:
- `OVERRIDE_LOADED_FROM = local`

- Exclude locals:
```bash
APP_ENV=production bun ./varlock-cli-executable-bun-fix.cjs run --exclude-local -- bun script.ts
```
Expected:
- `OVERRIDE_LOADED_FROM` comes from `.env.production` (or schema) instead of local.

---

### 6) Ambient overrides: off by default, can opt in
By default, ambient `process.env` does not override schema-defined keys. To test both modes:

- Without overrides (default):
```bash
OVERRIDE_LOADED_FROM=ambient \
APP_ENV=production \
bun ./varlock-cli-executable-bun-fix.cjs load --format json | jq .OVERRIDE_LOADED_FROM
```
Expected: value from files, not “ambient”.

- Allow ambient overrides:
```bash
OVERRIDE_LOADED_FROM=ambient \
APP_ENV=production \
bun ./varlock-cli-executable-bun-fix.cjs load --respect-existing-env --format json | jq .OVERRIDE_LOADED_FROM
```
Expected: “ambient”.

---

### 7) Optional: sync NODE_ENV to `@envFlag`
To verify `--bun-sync-node-env`:
```bash
APP_ENV=production bun ./varlock-cli-executable-bun-fix.cjs run --bun-sync-node-env -- bun script.ts
```

Expected:
- `NODE_ENV = production`

Without the flag:
```bash
APP_ENV=production bun ./varlock-cli-executable-bun-fix.cjs run -- bun script.ts
```

Expected:
- `NODE_ENV` remains whatever the DevContainer or environment sets (unchanged by Varlock).

---

### 8) What this proves
- Bun’s dotenv autoloading no longer interferes when running through `varlock run` with `bun`/`bunx`; `.env.<APP_ENV>` is properly selected.
- `.env.local` behavior is explicit and testable (`--exclude-local`).
- Ambient overrides are controlled (`--respect-existing-env`).
- `NODE_ENV` can be optionally synced for Bun runs (`--bun-sync-node-env`).

---

### 9) Troubleshooting
- Ensure you’re running inside the DevContainer to avoid host env differences.
- Confirm `varlock-cli-executable-bun-fix.cjs` is in the repo root and invoked via Bun:
```bash
bun ./varlock-cli-executable-bun-fix.cjs --help
```
- If `jq` is missing for JSON filtering, skip it or install inside the container:
```bash
sudo apt-get update && sudo apt-get install -y jq
```

---

### 10) Quick regression checklist
- Development default:
```bash
bun ./varlock-cli-executable-bun-fix.cjs load --format json | jq .APP_ENV
```
- Production selection:
```bash
APP_ENV=production bun ./varlock-cli-executable-bun-fix.cjs run -- bun script.ts
```
- Staging selection:
```bash
APP_ENV=staging bun ./varlock-cli-executable-bun-fix.cjs run -- bun script.ts
```
- Local exclusion:
```bash
APP_ENV=production bun ./varlock-cli-executable-bun-fix.cjs run --exclude-local -- bun script.ts
```
- Ambient override opt-in:
```bash
OVERRIDE_LOADED_FROM=ambient APP_ENV=production \
bun ./varlock-cli-executable-bun-fix.cjs load --respect-existing-env --format json | jq .OVERRIDE_LOADED_FROM
```
- Optional NODE_ENV sync:
```bash
APP_ENV=production bun ./varlock-cli-executable-bun-fix.cjs run --bun-sync-node-env -- bun script.ts
```


