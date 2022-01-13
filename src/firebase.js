import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCij-NvX83eAjJnuNPdJTHZ2I1PUEiU7JQ",
  authDomain: "fb-crud-react-71386.firebaseapp.com",
  projectId: "fb-crud-react-71386",
  storageBucket: "fb-crud-react-71386.appspot.com",
  messagingSenderId: "1027891550937",
  appId: "1:1027891550937:web:c9f90d199960c991e07cc8"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export const db = app.firestore();

