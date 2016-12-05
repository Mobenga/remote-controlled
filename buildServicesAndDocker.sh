#!/usr/bin/env bash
root=$PWD

if [ $# != 1 ]
then
    echo "One and only one parameter required. Either use 'all' to build all services or specific service name."
else
    if [ $1 == "all" ] || [ $1 == "todo-app" ]
    then
        echo "\n+  Building todo app\n"
        cd ${root}/todo-app
        npm run build
    fi

    if [ $1 == "all" ] || [ $1 == "remote-control-app" ]
    then
        echo "\n+  Building remote control app\n"
        cd ${root}/remote-control-app
        npm run build
    fi
    if [ $1 == "all" ] || [ $1 == "remote-control-server" ]
    then
        echo "\n+  Building remote control server \n"
        cd ${root}/remote-control-server
        npm run build
    fi
    if [ $1 == "all" ] || [ $1 == "websocket-server" ]
    then
        echo "\n+  Building websocket server \n"
        cd ${root}/websocket-server
        gradle build
        cd ${root}
    fi
    if [ $1 == "all" ] || [ $1 == "remote-control-app" ]
    then
        echo "\n+  Building Docker image for remote-control-app \n"
        docker build remote-control-app -t remote-control-app
    fi
    if [ $1 == "all" ] || [ $1 == "todo-app" ]
    then
        echo "\n+  Building Docker image for todo-app \n"
        docker build todo-app -t todo-app
    fi
    if [ $1 == "all" ] || [ $1 == "websocket-server" ]
    then
        echo "\n+  Building Docker image for websocket-server \n"
        docker build websocket-server -t websocket-server
    fi
    if [ $1 == "all" ] || [ $1 == "remote-control-server" ]
    then
        echo "\n+  Building Docker image for remote-control-server \n"
        docker build remote-control-server -t remote-control-server
    fi
fi
