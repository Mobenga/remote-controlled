pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                dir ('websocket-server') {
                    sh './gradlew build'
                }
            }
        }
    }
}