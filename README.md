# varlock-testing

A test project demonstrating environment variable loading with Varlock.

## Installation

To install dependencies:

```bash
bun install
```

## Environment Setup

This project uses [Varlock](https://varlock.dev) for environment variable management with the following structure:

### Base Configuration
- **`.env.schema`** - Schema definition with default values and type validation
- **`env.d.ts`** - Auto-generated TypeScript types for environment variables

### Environment-Specific Overrides
- **`.env.development`** - Development environment overrides
- **`.env.staging`** - Staging environment overrides
- **`.env.production`** - Production environment overrides

## Usage

### Loading Environment Variables
```bash
# Load environment for current APP_ENV (defaults to development)
bun varlock load

# Load specific environment
APP_ENV=production bun varlock load
APP_ENV=staging bun varlock load
```

### Running Commands with Environment
```bash
# Run with specific environment
APP_ENV=production bunx varlock run -- bun script.ts

# Development (default)
bun run dev
```

### Validation Commands
```bash
# Validate current environment
bun run env:validate

# Validate specific environment
bun run env:validate:dev
bun run env:validate:staging
bun run env:validate:prod
```

## Known Issues

### Environment Override Loading Bug

**Issue**: Varlock is not properly loading environment-specific override files based on the `APP_ENV` variable.

**Symptoms**:
- Setting `APP_ENV=production` still loads development overrides
- The `OVERRIDE_LOADED_FROM` variable always shows "development" regardless of `APP_ENV`
- Environment-specific values are not applied correctly

**Test Results**:
```
# APP_ENV=production should load .env.production
# Expected: OVERRIDE_LOADED_FROM=production
# Actual: OVERRIDE_LOADED_FROM=development
```

This project was created using `bun init` in bun v1.2.21. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
