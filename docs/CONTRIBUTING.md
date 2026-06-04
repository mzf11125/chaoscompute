# Contributing to ChaosCompute

## Getting Started

```bash
git clone https://github.com/mzf11125/chaoscompute.git
cd chaoscompute
pnpm install
pnpm --filter gateway dev
# → http://localhost:20128
```

## Monorepo

```
chaoscompute/
├── packages/gateway/    ← Vite + React app
├── packages/sdk/        ← Python + Node.js SDKs
├── programs/            ← Anchor on-chain program (Rust)
└── docs/                ← Documentation
```

## Development

1. Create a feature branch: `git checkout -b feat/my-feature`
2. Make changes, run checks: `pnpm lint && pnpm typecheck`
3. Commit: `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `redesign:`
4. Open a PR against `main`

## Code Style

- TypeScript strict mode
- No semicolons, single quotes, 2-space indent
- Components: named exports, barrel files
- Path aliases: `@/` → `src/`

## Design System

- Inter (body) + Instrument Serif italic (accents)
- HSL tokens: `--background`, `--foreground`, `--card`, `--border`
- Buttons: `rounded-full`, primary = `bg-foreground text-background`
- Cards: `rounded-2xl`, `bg-card border border-border`
- Liquid glass: `backdrop-filter: blur(4px)` + gradient mask

## Testing

```bash
pnpm test                              # All tests
pnpm --filter gateway test             # Gateway tests
cd programs/chaos_compute && anchor test
```

## License

MIT
