FROM node:16-buster as builder

ENV NODE_ENV=production

WORKDIR /app
COPY package.json ./

RUN npm install
RUN npm install cors --save
RUN npm audit fix --force
COPY . .

ENTRYPOINT ["npm", "start"]