FROM node:20-alpine3.19 AS development

WORKDIR /var/www

# Install pnpm
RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm i

COPY . ./

EXPOSE 5173

CMD ["pnpm", "run", "dev"]