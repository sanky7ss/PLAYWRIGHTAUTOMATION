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
        bat 'npx playwright install '
        bat 'npx playwright test tests/WebAIPIpart1.spec.js'
      }
    }
    stage('Generate Allure Report') {
     steps {
        bat 'npx allure generate allure-results --clean -o allure-report'
      }
    }
    
}
post {
    always {
        echo 'Publishing Allure Report'
        allure([
            includeProperties: false,
            jdk: '',
            results: [[path: 'allure-results']]
        ])
    }
}}