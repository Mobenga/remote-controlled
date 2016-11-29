#!/usr/bin/env bash
root=$PWD
echo "\n+  Building todo app client \n"
cd ${root}/todo-app/client
npm install
npm run build
echo "\n+  Building todo app server \n"
cd ${root}/todo-app/server
npm install
cd ${root}/websocket-server
echo "\n+  Building websocket server \n"
gradle build
cd ${root}
echo "\n+  Building Docker image for todo-app \n"
docker build todo-app -t todo-app
echo "\n+  Building Docker image for websocket-server \n"
docker build websocket-server -t websocket-server
echo "\n+  Done! \n"

