FROM node:12-alpine
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn --production

EXPOSE 8080

COPY . .
CMD ["yarn", "start:production"]
