### STAGE 1: Build ###

# We label our stage as 'builder'

FROM node:8-alpine

RUN mkdir -p /app
COPY . /app
WORKDIR /app

RUN npm install
RUN npm install webpack@4.20.0 -g webpack-cli@3.1.2 -g

EXPOSE 8080

CMD npm run build-start