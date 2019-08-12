FROM node:carbon-slim

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm install

# Bundle app source
COPY ./ .

EXPOSE 3000

CMD npm start
