#packageインストール
FROM node:16.15.1-alpine AS package

WORKDIR /front
COPY ./package.json ./package-lock.json ./
RUN npm install --no-progress

#実行環境
FROM node:14.16.1-alpine as runtime

WORKDIR /front
COPY ./public ./public
COPY ./src ./src
COPY package.json package-lock.json ./
COPY --from=package /front/node_modules ./node_modules

EXPOSE 3000
CMD ["npm","start"]