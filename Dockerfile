FROM node:carbon-alpine

WORKDIR /usr/src/app
COPY . .
RUN apk -U upgrade && npm install && npm install -g nodemon && rm -rf /var/cache/apk/*
EXPOSE 9000
CMD ["nodemon", "index.js"]
