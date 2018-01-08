pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        sh 'npm install'
        sh 'ng build --prod --base-href /propagation-of-uncertainty/'
        archiveArtifacts 'dist/**'
      }
    }
    stage('Deploy') {
      steps {
        sh 'cp -r dist/* /var/www/gnyra.com/public_html/propagation-of-uncertainty/'
      }
    }
  }
}
