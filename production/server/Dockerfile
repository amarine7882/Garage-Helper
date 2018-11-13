FROM node:10-alpine

WORKDIR /server

COPY . ./server

RUN yarn install

EXPOSE 3000

ENV NODE_ENV production

CMD ["yarn", "start"]