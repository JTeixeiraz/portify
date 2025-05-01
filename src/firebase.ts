import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyDg0-_S0P0SuWcIhrfNlKiDUzeA4bek5PY",

  authDomain: "portifolio-generator.firebaseapp.com",

  projectId: "portifolio-generator",

  storageBucket: "portifolio-generator.appspot.com",

  messagingSenderId: "833775112428",

  appId: "1:833775112428:web:2a1059dd6ec68a06f695c9",

  measurementId: "G-D8G5ZPXPSY"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db  = getFirestore(app);
const storage = getStorage(app);

export {auth, db, storage};