# ---------- Build ----------
FROM mcr.microsoft.com/devcontainers/typescript-node:22 AS build
WORKDIR /app

COPY package*.json ./
# força instalar devDependencies no build stage
RUN npm ci --include=dev

COPY tsconfig.json ./
COPY src ./src
RUN npm run build

# ---------- Runtime ----------
FROM mcr.microsoft.com/devcontainers/javascript-node:22
WORKDIR /app
ENV NODE_ENV=production

# utilitário para healthcheck (opcional)
RUN apt-get update && apt-get install -y --no-install-recommends curl && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
# só prod deps no runtime
RUN npm install --include=dev

COPY --from=build /app/dist ./dist

EXPOSE 4000
ENV PORT=4000
CMD ["node", "dist/server.js"]
