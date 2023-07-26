import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAO0khKw01vltbM6Rmz9_bHM-j07_B1NJQ",
  authDomain: "react-native-image-book-c3bab.firebaseapp.com",
  databaseURL:
    "https://react-native-image-book-c3bab-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "react-native-image-book-c3bab",
  storageBucket: "react-native-image-book-c3bab.appspot.com",
  messagingSenderId: "947221524479",
  appId: "1:947221524479:web:161a3b290e3751e48181ca",
  measurementId: "G-8S8GT2E0Y0",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
