FROM node:14

WORKDIR /usr/app

COPY package*.json ./

RUN npm install 

COPY . .

EXPOSE 8000

CMD node fixtures.js; node server.js

