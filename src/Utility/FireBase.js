import firebase from "firebase/compat/app";
// auth
import {getAuth} from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDV0fKjbY4URlY1u1SxLZteMHBp4Cat69o",
  authDomain: "clone-6789b.firebaseapp.com",
  projectId: "clone-6789b",
  storageBucket: "clone-6789b.appspot.com",
  messagingSenderId: "561366362054",
  appId: "1:561366362054:web:34a66e59b1fe92d623f4c7"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = app.firestore(); 