const firebaseConfig = {

  apiKey: "AIzaSyCPWH_HUEfR4Pt3LnC7_SJNnrdHeG7ttt4",

  authDomain: "myblogsite-64e74.firebaseapp.com",

  projectId: "myblogsite-64e74",

  storageBucket: "myblogsite-64e74.appspot.com",

  messagingSenderId: "25202841409",

  appId: "1:25202841409:web:e035c20d48bc4223fd73c0"

};


// Initialize Firebase

const app = firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();
