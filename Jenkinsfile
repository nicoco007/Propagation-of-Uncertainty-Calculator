pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        sh 'npm install -d'
        sh 'ng build --prod'
        archiveArtifacts 'dist/**'
      }
    }
  }
}
