FROM node:18.16.0-slim AS base

RUN apt-get update -y && apt-get install -y openssl

FROM base AS deps

# RUN apk-get install --no-cache libc6-compat
WORKDIR /chat

COPY apps/web/package.json ./apps/web/
COPY apps/api/package.json ./apps/api/
COPY packages/queries/package.json ./packages/queries/

COPY yarn.lock* ./
COPY package.json ./

RUN yarn



FROM base AS builder

WORKDIR /chat

COPY --from=deps /chat/apps/web/node_modules ./apps/web/node_modules
COPY --from=deps /chat/apps/api/node_modules ./apps/api/node_modules
COPY --from=deps /chat/packages/queries/node_modules ./packages/queries/node_modules

COPY --from=deps /chat/node_modules ./node_modules

COPY . .

RUN cd apps/web && yarn db:generate && yarn build

RUN cd apps/api && yarn db:generate && yarn build


FROM base AS runner

WORKDIR /chat

ENV NODE_ENV=production

# RUN addgroup -g 1001 -S nodejs
# RUN adduser -S nextjs -u 1001
COPY --from=builder /chat/package.prod.json ./package.json


RUN yarn add concurrently


# COPY --from=builder --chown=nextjs:nodejs /chat/apps/web/.next/standalone ./
# COPY --from=builder --chown=nextjs:nodejs /chat/apps/web/.next/static ./apps/web/.next/static

# COPY --from=builder --chown=nextjs:nodejs /chat/apps/api/dist/ ./apps/api/dist

COPY --from=builder /chat/apps/web/.next/standalone ./web/
COPY --from=builder /chat/apps/web/.next/static ./web/apps/web/.next/static
COPY --from=builder /chat/apps/web/public/ ./web/public

COPY --from=builder /chat/apps/api/dist ./api/dist
COPY --from=builder /chat/node_modules/.prisma/client/libquery_engine-debian-openssl-3.0.x.so.node ./api/dist/libquery_engine-debian-openssl-3.0.x.so.node
COPY --from=builder /chat/node_modules/.prisma/client/schema.prisma ./api/dist/schema.prisma
COPY --from=builder /chat/.env ./.env


# USER nextjs

# EXPOSE 3000

# ENV HOSTNAME localhost

CMD ["yarn", "start"]