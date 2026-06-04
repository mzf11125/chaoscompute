# Contributing to ChaosCompute

## Getting Started

```bash
git clone https://github.com/protocoldaemon-sec/chaoscompute.git
cd chaoscompute
pnpm install
pnpm --filter gateway dev
```

## Monorepo Structure

```
chaoscompute/
├── packages/gateway/    ← Main app (Vite + React)
├── packages/sdk/        ← Python + Node.js SDKs
├── programs/            ← Anchor on-chain program (Rust)
└── docs/                ← Documentation
```

## Development Workflow

1. Create a feature branch: `git checkout -b feat/my-feature`
2. Make changes, run checks: `pnpm lint && pnpm typecheck`
3. Commit with conventional commits: `feat:`, `fix:`, `docs:`, `chore:`
4. Open a PR against `main`

## Code Style

- TypeScript strict mode
- No semicolons
- Single quotes
- 2-space indentation
- Components: named exports, barrel files
- Path aliases: `@/` → `src/`

## Design System

Use the Dark Cinematic design system for all UI:
- Colors: `--color-surface` (#000), `--color-accent` (#DEDBC8)
- Buttons: `rounded-full` (pill)
- Cards: `rounded-3xl`, `bg-[--color-surface-elevated]`
- Font: Manrope (UI), Geist Mono (code)
- Animations: framer-motion, `cubic-bezier(0.16, 1, 0.3, 1)`

## Testing

```bash
pnpm test                    # Run all tests
pnpm --filter gateway test   # Gateway tests
cd programs/chaos_compute && anchor test
```

## Adding a Provider

1. Create `packages/gateway/src/lib/providers/<provider>.ts`
2. Implement the `Provider` interface from `src/lib/routing/types.ts`
3. Add to provider registry in `src/lib/routing/providers.ts`
4. Test with a real API key

## License

MIT
