FROM node:alpine

WORKDIR /app

COPY ./packages/server/ ./packages/server
COPY ./packages/common/ ./packages/common

COPY ./package*.json ./
COPY ./tsconfig.json ./

RUN npm install typescript ts-node -D
RUN npm install

ENV PORT=3000

EXPOSE 3000

CMD ["npm", "--prefix", "./packages/server", "run", "start"]
