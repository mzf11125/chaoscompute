FROM node:22-alpine AS builder

WORKDIR /app
RUN corepack enable && corepack prepare pnpm@latest --activate

COPY pnpm-workspace.yaml package.json ./
COPY packages/gateway/package.json packages/gateway/
COPY packages/sdk/node/package.json packages/sdk/node/

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm --filter gateway build

FROM node:22-alpine AS runner
WORKDIR /app

COPY --from=builder /app/packages/gateway/dist ./dist
COPY --from=builder /app/packages/gateway/index.html ./
COPY --from=builder /app/packages/gateway/public ./public

EXPOSE 20128
ENV PORT=20128
ENV HOSTNAME=0.0.0.0
ENV NODE_ENV=production

CMD ["npx", "serve", "-s", "dist", "-l", "20128"]
