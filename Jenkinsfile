node {
    stage('Build') {
        dir('websocket-server') {
            sh 'gradlew build -x test'
            stash name: "jar", includes: "build/libs/websocket-server-1.0.jar"
        }
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
        sh "curl -s http://websocket-server:8080/api/info"
    }
}
