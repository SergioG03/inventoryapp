pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            parallel {
                stage('Frontend Dependencies') {
                    steps {
                        dir('frontend') {
                            sh 'npm install'
                        }
                    }
                }
                stage('Backend Dependencies') {
                    steps {
                        dir('backend') {
                            sh 'npm install'
                        }
                    }
                }
            }
        }

        stage('Build') {
            steps {
                sh 'docker compose build'
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    docker stop inventory-frontend inventory-backend || true
                    docker rm inventory-frontend inventory-backend || true
                    docker compose up -d
                '''
            }
        }
    }

    post {
        success {
            echo 'Pipeline ejecutado exitosamente!'
        }
        failure {
            echo 'El pipeline ha fallado'
        }
    }
}
