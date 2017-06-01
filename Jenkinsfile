parallel node('nodejs') {
    stage 'Clone repository'
    checkout scm

    stage 'Build Image Todo App'
    sh 'oc start-build todo-app-image --from-dir=todo-app --follow'

    stage 'Deploy Todo App'
    openshiftDeploy depCfg: 'todo-app'
    openshiftVerifyDeployment depCfg: 'todo-app', replicaCount: 1, verifyReplicaCount: true

    stage 'System Test Todo App'
    sh 'curl -s http://todo-app:4000/'
}

node('maven') {
    checkout scm
    dir('websocket-server') {
        stage 'Build Websocket Server'
        sh './gradlew build -x test'

        stage 'Test Websocket Server'
        sh './gradlew test'

        stage 'Build Image Websocket Server'
        sh 'oc start-build websocket-server-image --from-file=build/libs/websocket-server-1.0.jar --follow'

        stage 'Deploy Websocket Server'
        openshiftDeploy depCfg: 'websocket-server'
        openshiftVerifyDeployment depCfg: 'websocket-server', replicaCount: 1, verifyReplicaCount: true

        stage 'System Test Websocket Server'
        sh 'curl -s http://websocket-server:8090/todo-websocket'
    }
}
