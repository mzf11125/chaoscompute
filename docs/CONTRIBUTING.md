# Contributing to ChaosCompute

Thanks for your interest in contributing. ChaosCompute is maintained by a sole developer (mzf11125) and contributions are welcome.

## Getting Started

```bash
git clone https://github.com/mzf11125/chaoscompute.git
cd chaoscompute
pnpm install
pnpm --filter gateway dev
```

## How to Contribute

1. **Open an issue** first to discuss your proposed change
2. **Fork the repo** and create a feature branch
3. **Make your changes** following the code conventions below
4. **Run checks** — `pnpm --filter gateway typecheck` and `pnpm --filter gateway build`
5. **Submit a PR** against `main` with a clear description
6. **Wait for review** — the maintainer reviews PRs at their discretion

## Commit Conventions

Use conventional commits:

- `feat:` — new feature
- `fix:` — bug fix
- `docs:` — documentation only
- `refactor:` — code change that neither fixes a bug nor adds a feature
- `chore:` — maintenance, CI, dependencies
- `redesign:` — visual or design system changes

## Code Style

- TypeScript strict mode
- No semicolons
- Single quotes
- 2 space indentation
- Components use named exports from barrel files
- Pages are default exports in their own directories
- Path alias `@/` maps to `src/`

## Design System

- Inter (body) + Instrument Serif italic (display accents)
- HSL tokens: `--foreground`, `--background`, `--card`, `--border`
- Buttons: `rounded-full`, primary = `bg-foreground text-background`
- Cards: `rounded-2xl`, `bg-card border border-border`
- Liquid glass: `backdrop-filter` + gradient mask for glass surfaces

## Anchor Program

For contributing to the Anchor program:

```bash
cd programs/chaos_compute
cargo build-sbf          # Build
cargo test               # Run tests
anchor test              # Run integration tests
```

Rust code style:
- Follow existing patterns in `lib.rs`
- All instructions must have access control
- All financial operations must use escrow PDAs
- Tests for every new instruction

## PR Requirements

All PRs must pass:

- `pnpm --filter gateway typecheck` — no TypeScript errors
- `pnpm --filter gateway build` — production build succeeds
- `cd programs/chaos_compute && cargo test` — Anchor tests pass

The GitHub Actions CI workflow runs these checks automatically on every PR.

## License

By contributing, you agree that your code will be licensed under the MIT License.

## Questions

- GitHub issues for bugs and feature requests
- Discord for discussions: https://discord.gg/xXCKpmt7d
- Weekly community meetings on Discord to discuss the roadmap
