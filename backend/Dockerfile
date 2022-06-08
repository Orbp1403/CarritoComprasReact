FROM node:14-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install --loglevel verbose

COPY . .

EXPOSE 4000

CMD ["node", "index.js"]