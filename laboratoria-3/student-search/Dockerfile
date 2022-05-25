FROM ubuntu:latest

RUN apt update && apt install -y nodejs npm

RUN mkdir /app

COPY package.json /app/ 

RUN npm install

RUN ./ /app/

ENTRYPOINT [ "npm", "start" ]