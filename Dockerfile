FROM node:10.13.0-alpine

RUN apk add --no-cache --virtual .dep python make g++

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

RUN apk del .dep

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]
