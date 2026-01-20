pipeline {  
  agent any

  triggers {
    githubPush()
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install Dependencies') {
      steps {
        bat 'npm ci'
      }
    }

    stage('Run Playwright Tests') {
      steps {
        bat 'npx playwright install --with-deps'
        bat 'npx playwright test'
      }
    }
  }
}
