pipeline {
    agent any

    environment {
        DOCKERHUB_CREDS = credentials('dockerhub-creds')
        IMAGE_BACKEND = "tharunrajravi/skyalert-backend"
        IMAGE_FRONTEND = "tharunrajravi/skyalert-frontend"
        EC2_IP = "13.206.54.183"
    }

    stages {

        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Build Images') {
            steps {
                echo "Building Docker images..."
                sh 'docker build -t $IMAGE_BACKEND ./backend'
                sh 'docker build -t $IMAGE_FRONTEND ./frontend'
            }
        }

        stage('Login DockerHub') {
            steps {
                echo "Logging into DockerHub..."
                sh 'echo $DOCKERHUB_CREDS_PSW | docker login -u $DOCKERHUB_CREDS_USR --password-stdin'
            }
        }

        stage('Push Images') {
            steps {
                echo "Pushing images to DockerHub..."
                sh 'docker push $IMAGE_BACKEND'
                sh 'docker push $IMAGE_FRONTEND'
            }
        }

        stage('Deploy to EC2') {
            steps {
                echo "Deploying application to EC2..."
                sshagent(['ec2-ssh']) {
                    sh """
                    ssh -o StrictHostKeyChecking=no ubuntu@$EC2_IP '
                    
                    echo "Stopping old containers..."
                    docker stop backend || true
                    docker stop frontend || true
                    
                    echo "Removing old containers..."
                    docker rm backend || true
                    docker rm frontend || true
                    
                    echo "Pulling latest images..."
                    docker pull $IMAGE_BACKEND:latest
                    docker pull $IMAGE_FRONTEND:latest
                    
                    echo "Starting new containers..."
                    docker run -d -p 5000:5000 --name backend $IMAGE_BACKEND:latest
                    docker run -d -p 3000:3000 --name frontend $IMAGE_FRONTEND:latest
                    
                    echo "Deployment completed successfully!"
                    '
                    """
                }
            }
        }

    }

    post {
        success {
            echo "CI/CD Pipeline completed successfully!"
        }
        failure {
            echo "Pipeline failed. Check logs."
        }
    }
}
