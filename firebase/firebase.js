import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPeqxBk09L43FNUFQKD-qy1cszc8YvOgo",
  authDomain: "shoesly-a992b.firebaseapp.com",
  projectId: "shoesly-a992b",
  storageBucket: "shoesly-a992b.appspot.com",
  messagingSenderId: "334952989225",
  appId: "1:334952989225:web:a3c105cc68e097a0a35238",
  measurementId: "G-PEQ52QWQ9F",
  databaseURL: "https://shoesly-a992b-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const database = getDatabase(app);