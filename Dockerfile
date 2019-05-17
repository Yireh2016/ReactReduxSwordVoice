### STAGE 1: Build ###

# We label our stage as 'builder'



FROM node:chakracore-10.13.0
ENV MONGOLAB_URI mongodb://biza:J16032309.@ds157946.mlab.com:57946/swordvoice
ENV NODE_ENV production
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm cache clean --force && npm install

COPY . /app

ENV PORT 8080
EXPOSE 80

CMD [ "npm", "run", "build-start"]

