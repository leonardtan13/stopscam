import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import firebase from "firebase/compat/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.FIREBASE_API_KEY,
  authDomain: "stopscam.firebaseapp.com",
  projectId: "stopscam",
  storageBucket: "stopscam.appspot.com",
  messagingSenderId: "177473080818",
  appId: "1:177473080818:web:293ec4064da89a51646f6b",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const app = createApp(App);

app.use(router);

app.mount("#app");
