pipeline {
    agent any

    environment {
        DOCKERHUB_CREDS = credentials('dockerhub-creds')
        IMAGE_BACKEND = "tharunrajravi/skyalert-backend"
        IMAGE_FRONTEND = "tharunrajravi/skyalert-frontend"
        EC2_IP = "13.201.101.78"
    }

    stages {

        stage('Build Images') {
            steps {
                sh 'docker build -t $IMAGE_BACKEND ./backend'
                sh 'docker build -t $IMAGE_FRONTEND ./frontend'
            }
        }

        stage('Login DockerHub') {
            steps {
                sh 'echo $DOCKERHUB_CREDS_PSW | docker login -u $DOCKERHUB_CREDS_USR --password-stdin'
            }
        }

        stage('Push Images') {
            steps {
                sh 'docker push $IMAGE_BACKEND'
                sh 'docker push $IMAGE_FRONTEND'
            }
        }

        stage('Deploy to EC2') {
            steps {
                sshagent(['ec2-ssh']) {
                    sh """
                    ssh -o StrictHostKeyChecking=no ubuntu@$EC2_IP '
                    docker pull tharunrajravi/skyalert-backend:latest
                    docker pull tharunrajravi/skyalert-frontend:latest
                    docker rm -f backend frontend || true
                    docker run -d -p 5000:5000 --name backend tharunrajravi/skyalert-backend
                    docker run -d -p 3000:3000 --name frontend tharunrajravi/skyalert-frontend
                    '
                    """
                }
            }
        }
        
    }
}
