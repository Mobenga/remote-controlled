FROM node:6.9.1
RUN mkdir -p /client/build
RUN mkdir -p /client/public
RUN mkdir /server
ADD client/build /client/build
ADD client/public /client/public
ADD server /server
WORKDIR /server
ENTRYPOINT ["node", "app.js"]

