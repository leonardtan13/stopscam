import firebase from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.FIREBASE_API_KEY,
  authDomain: "stopscam.firebaseapp.com",
  projectId: "stopscam",
  storageBucket: "stopscam.appspot.com",
  messagingSenderId: "177473080818",
  appId: "1:177473080818:web:293ec4064da89a51646f6b",
};

firebase.initializeApp(firebaseConfig);
export default firebase.database();
