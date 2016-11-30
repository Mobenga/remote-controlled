#!/usr/bin/env bash
root=$PWD

echo "\n+  Building todo app\n"
cd ${root}/todo-app
npm run build

echo "\n+  Building remote control app\n"
cd ${root}/remote-control-app
npm run build

echo "\n+  Building remote control server \n"
cd ${root}/remote-control-server
npm run build

echo "\n+  Building websocket server \n"
cd ${root}/websocket-server
gradle build
cd ${root}

echo "\n+  Building Docker image for remote-control-app \n"
docker build remote-control-app -t remote-control-app

echo "\n+  Building Docker image for todo-app \n"
docker build todo-app -t todo-app

echo "\n+  Building Docker image for websocket-server \n"
docker build websocket-server -t websocket-server

echo "\n+  Building Docker image for remote-control-server \n"
docker build remote-control-server -t remote-control-server

echo "\n+  Done! \n"

