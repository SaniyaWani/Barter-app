import firebase from 'firebase';
require('@firebase/firestore')


var firebaseConfig = {
  apiKey: "AIzaSyAKhZ2n92NI6b9qZcpCW2wJL1F8pXtfvD0",
  authDomain: "app1-72527.firebaseapp.com",
  projectId: "app1-72527",
  storageBucket: "app1-72527.appspot.com",
  messagingSenderId: "192100408545",
  appId: "1:192100408545:web:9b7fb5658ffe9f63e7aba0"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();