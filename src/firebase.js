// config
import { initializeApp } from "firebase/app";
import {
  getFirestore
} from "firebase/firestore";
import {
  getAuth
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDcgcVjrT63CuUPOj5GFUq9yGEGIRG_Xbc",
  authDomain: "turfplusapp.firebaseapp.com",
  projectId: "turfplusapp",
  storageBucket: "turfplusapp.appspot.com",
  messagingSenderId: "85824225234",
  appId: "1:85824225234:web:c97963adafa65b9dd8920b",
};

// init firebase
const app = initializeApp(firebaseConfig);

// init services
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth }