import firebase from 'firebase';



const config = {
    apiKey: "AIzaSyCMzVlBAdYbt16j5O-X7hSnv1RG2Vc7Vqo",
    authDomain: "react-native-firebase-70a83.firebaseapp.com",
    databaseURL: "https://react-native-firebase-70a83.firebaseio.com",
    projectId: "react-native-firebase-70a83",
    storageBucket: "react-native-firebase-70a83.appspot.com",
    messagingSenderId: "174372582495",
    appId: "1:174372582495:web:a03a37bcebab0d3ceb97ea",
    measurementId: "G-SG07RTB5DV"
  };
const Firebase = firebase.initializeApp(config);
export default Firebase;