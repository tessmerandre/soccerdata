FROM node:11-alpine

WORKDIR /usr/src/app
COPY server /usr/src/app/

WORKDIR /usr/src/app/server

RUN npm install
# CMD ["npm", "start"]