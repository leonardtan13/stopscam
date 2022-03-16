// i had to change to firebase/compat cause it keep using error of
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import 'firebase/compat/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  // I dont know why apikey cannot work when its in ENV
  apiKey: "AIzaSyBcBgtpntzLgUy4IaaLM_p__y0M2u_Kll0",
  authDomain: "stopscam.firebaseapp.com",
  projectId: "stopscam",
  storageBucket: "stopscam.appspot.com",
  messagingSenderId: "177473080818",
  appId: "1:177473080818:web:293ec4064da89a51646f6b",
};

// i had to split exports for my part, but also when i export they say firebase database not a func
export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebase.firestore();
