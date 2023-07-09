### STAGE 1: Build ###

# We label our stage as 'builder'

FROM node:14.21.3-bullseye

RUN mkdir -p /app
COPY . /app
WORKDIR /app



RUN npm install
RUN npm install webpack@4.20.2 -g webpack-cli@3.1.2 -g
RUN npm run build
EXPOSE 8080

CMD npm run start