FROM node:10-alpine

WORKDIR /home/node/app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install --only=production

COPY . .

USER node

CMD ["node", "server.js"]
