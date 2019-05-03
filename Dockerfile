### STAGE 1: Build ###

# We label our stage as 'builder'
FROM node:chakracore-10.13.0
WORKDIR /app

ADD . /app

