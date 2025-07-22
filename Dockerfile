FROM node:22-alpine AS development

WORKDIR /var/www

# Install pnpm
RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm i

COPY . ./

EXPOSE 5173

CMD ["pnpm", "run", "dev"]


FROM node:22-alpine3.22 AS builder

WORKDIR /var/www

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . ./

RUN pnpm build


FROM nginx:1.28-alpine3.21 AS production

COPY --from=builder /var/www/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
