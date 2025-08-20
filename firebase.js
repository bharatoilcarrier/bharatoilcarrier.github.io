// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAjqjVXxtxN93L-fn3bKNCdlDE3nDf1s7s",
  authDomain: "boc-billmanager.firebaseapp.com",
  projectId: "boc-billmanager",
  storageBucket: "boc-billmanager.firebasestorage.app",
  messagingSenderId: "626232964549",
  appId: "1:626232964549:web:ed516c84693c45bda207ac",
  measurementId: "G-KCXMM1J2G1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);