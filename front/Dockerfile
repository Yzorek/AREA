FROM node:16-buster as prod

ENV NODE_ENV=production

WORKDIR /app
COPY package.json ./

RUN npm install
COPY . .

ENTRYPOINT ["npm", "start"]