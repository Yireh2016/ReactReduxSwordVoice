### STAGE 1: Build ###

# We label our stage as 'builder'



FROM node:8-alpine

WORKDIR /app
COPY . /app

RUN npm cache clean --force && npm install
RUN webpack --config webpack.config.js --mode=production

EXPOSE 8080
CMD ["node","server/server.js"]

