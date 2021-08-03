FROM node:14-alpine3.13

COPY package.json /home/node/app/package.json

RUN cd /home/node/app && npm install && chown -R node:node /home/node/app
