pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                sh 'websocket-server/gradlew -p websocket-server build'
            }
        }
    }
}