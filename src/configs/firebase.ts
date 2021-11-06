import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyA1IRV-McGt6DWuRaYmfQxKnHO5ANNoHrk',
  authDomain: 'todolist-84445.firebaseapp.com',
  projectId: 'todolist-84445',
  storageBucket: 'todolist-84445.appspot.com',
  messagingSenderId: '644578229707',
  appId: '1:644578229707:web:595195bc9970d407864a4e',
};

const app = firebase.initializeApp(config);

export default app;
