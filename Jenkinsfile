pipeline {
    agent any

    environment {
        DOCKERHUB_CREDS = credentials('dockerhub-creds')
        IMAGE_BACKEND = "tharunrajravi/skyalert-backend"
        IMAGE_FRONTEND = "tharunrajravi/skyalert-frontend"
        EC2_IP = "13.206.54.183"
        REPO_URL = "https://github.com/Tharunrajravi/skyalert-devops.git"
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
                sh 'docker build -t $IMAGE_BACKEND:latest ./backend'
                sh 'docker build -t $IMAGE_FRONTEND:latest ./frontend'
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
                sh 'docker push $IMAGE_BACKEND:latest'
                sh 'docker push $IMAGE_FRONTEND:latest'
            }
        }

        stage('Deploy to EC2') {
            steps {
                echo "Deploying application using Docker Compose..."
                sshagent(['ec2-ssh']) {
                    sh """
                    ssh -o StrictHostKeyChecking=no ubuntu@$EC2_IP '

                    echo "Cloning or updating repository..."
                    if [ ! -d skyalert-devops ]; then
                        git clone $REPO_URL
                    fi

                    cd skyalert-devops
                    git pull origin main

                    echo "Pulling latest images..."
                    docker compose pull

                    echo "Recreating application stack..."
                    docker compose up -d --remove-orphans

                    echo "Cleaning unused images..."
                    docker image prune -f

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
