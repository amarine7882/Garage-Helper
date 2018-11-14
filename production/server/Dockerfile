FROM node:10-alpine

WORKDIR /server

COPY . /server

RUN yarn install

EXPOSE 80

ENV NODE_ENV production
ENV PORT 80

CMD ["yarn", "start"]