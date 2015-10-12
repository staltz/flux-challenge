FROM node:4.1

COPY ./server/package.json /host/package.json
WORKDIR /host
RUN npm install
CMD npm start