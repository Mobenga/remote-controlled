#!/usr/bin/env bash
root=$PWD

if [ $# -gt 1 ]
then
    printf "To build all services, don't supply any parameters.\n"
    printf "Otherwise supply one parameter for the service that should be built.\n"
    printf "Multiple parameters are not allowed.\n"
    exit
fi

if [ ${1:-todo-app} == "todo-app" ]
then
    printf "\n+  Building todo app\n"
    cd ${root}/todo-app
    npm run build
fi

if [ ${1:-remote-control-app} == "remote-control-app" ]
then
    printf "\n+  Building remote control app\n"
    cd ${root}/remote-control-app
    npm run build
fi
if [ ${1:-remote-control-server} == "remote-control-server" ]
then
    printf "\n+  Building remote control server \n"
    cd ${root}/remote-control-server
    npm run build
fi
if [ ${1:-websocket-server} == "websocket-server" ]
then
    printf "\n+  Building websocket server \n"
    cd ${root}/websocket-server
    gradle build
fi

cd ${root}

if [ ${1:-remote-control-app} == "remote-control-app" ]
then
    printf "\n+  Building Docker image for remote-control-app \n"
    docker build remote-control-app -t remote-control-app
fi
if [ ${1:-todo-app} == "todo-app" ]
then
    printf "\n+  Building Docker image for todo-app \n"
    docker build todo-app -t todo-app
fi
if [ ${1:-websocket-server} == "websocket-server" ]
then
    printf "\n+  Building Docker image for websocket-server \n"
    docker build websocket-server -t websocket-server
fi
if [ ${1:-remote-control-server} == "remote-control-server" ]
then
    printf "\n+  Building Docker image for remote-control-server \n"
    docker build remote-control-server -t remote-control-server
fi
