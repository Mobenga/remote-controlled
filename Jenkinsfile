node('nodejs') {
    checkout scm
    dir('todo-app') {
        stage('Build Todo App') {
            sh 'node -v'
            sh 'npm run build'
        }
        stage('Build Image') {
             echo "building with Dockerfile"
             sh "oc start-build todo-app --from-file=todo-app/Dockerfile --follow"
        }
        stage('Deploy') {
             echo "Deploying..."
        }
    }
}

node('maven') {
    checkout scm
    dir('websocket-server') {
        stage('Build') {
            sh './gradlew build -x test'
            stash name: "jar", includes: "build/libs/websocket-server-1.0.jar"
        }
        stage('Test') {
            sh './gradlew test'
        }

        stage('Build Image') {
            unstash name: "jar"
            sh "oc start-build websocket-server-image --from-file=build/libs/websocket-server-1.0.jar --follow"

        }
        stage('Deploy') {
            openshiftDeploy depCfg: 'websocket-server'
            openshiftVerifyDeployment depCfg: 'websocket-server', replicaCount: 1, verifyReplicaCount: true
        }
        stage('System Test') {
            sh "curl -s http://websocket-server:8090/todo-websocket"
        }
    }
}
