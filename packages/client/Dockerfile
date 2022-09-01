FROM node:alpine

WORKDIR /app

COPY ./packages/client/ ./packages/client
COPY ./packages/common/ ./packages/common

COPY ./package*.json ./
COPY ./tsconfig.json ./

RUN npm install typescript vite -D
RUN npm install

ENV PORT=8080

EXPOSE 8080

CMD ["npm", "--prefix", "./packages/client", "run", "dev"]
