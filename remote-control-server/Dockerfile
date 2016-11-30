FROM node:6.9.1

RUN mkdir -p /remote-control-server

COPY node_modules /remote-control-server/node_modules
COPY src /remote-control-server/src
WORKDIR /remote-control-server/src

CMD ["node", "app.js"]
