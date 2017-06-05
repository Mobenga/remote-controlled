node('maven') {
    stage('Clone repository') {
        checkout scm
    }

    stage('Configure Openshift') {
        sh 'oc apply -f openshift/image-streams.yml'
    }

    stage('Build Todo App') {
        sh 'oc apply -f openshift/todo-app.yml'
        sh 'oc start-build todo-app-image --from-dir=todo-app --follow'
    }
    stage('Build Remote Control Server') {
        sh 'oc apply -f openshift/remote-control-server.yml'
        sh 'oc start-build remote-control-server-image --from-dir=remote-control-server --follow'
    }
    stage('Build Remote Control App') {
        sh 'oc apply -f openshift/remote-control-app.yml'
        sh 'oc start-build remote-control-app-image --from-dir=remote-control-app --follow'
    }
    dir('websocket-server') {
        stage('Build Websocket Server: gradle') {
            sh './gradlew build -x test'
        }
        stage('Test Websocket Server') {
            sh './gradlew test'
        }
        stage('Build Websocket Server: image') {
            sh 'oc apply -f ../openshift/websocket-server.yml'
            sh 'oc start-build websocket-server-image --from-file=build/libs/websocket-server-1.0.jar --follow'
        }
    }

    stage('Ensure Redis') {
        sh 'oc apply -f openshift/redis.yml'
    }

    stage('Deploy Todo App') {
        openshiftDeploy depCfg: 'todo-app'
        openshiftVerifyDeployment depCfg: 'todo-app', replicaCount: 1, verifyReplicaCount: true
    }
    stage('System Test Todo App') {
        sh 'curl -s http://todo-app:4000/'
    }


    stage('Deploy Remote Control Server') {
        openshiftDeploy depCfg: 'remote-control-server'
        openshiftVerifyDeployment depCfg: 'remote-control-server', replicaCount: 1, verifyReplicaCount: true
    }
    stage('System Test Remote Control Server') {
        sh 'curl -s http://remote-control-server:8100/'
    }


    stage('Deploy Remote Control App') {
        openshiftDeploy depCfg: 'remote-control-app'
        openshiftVerifyDeployment depCfg: 'remote-control-app', replicaCount: 1, verifyReplicaCount: true
    }
    stage('System Test Remote Control App') {
        sh 'curl -s http://remote-control-app:5000/'
    }


    stage('Deploy Websocket Server') {
        openshiftDeploy depCfg: 'websocket-server'
        openshiftVerifyDeployment depCfg: 'websocket-server', replicaCount: 1, verifyReplicaCount: true
    }
    stage('System Test Websocket Server') {
        sh 'curl -s http://websocket-server:8090/todo-websocket'
    }
}