// /firebase.js
// Browser-friendly ES module version (works with <script type="module"> in your pages)
// This file initializes Firebase and exports auth & firestore for use in app.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// --- YOUR FIREBASE CONFIG (already from your project) ---
const firebaseConfig = {
  apiKey: "AIzaSyAjqjVXxtxN93L-fn3bKNCdlDE3nDf1s7s",
  authDomain: "boc-billmanager.firebaseapp.com",
  projectId: "boc-billmanager",
  storageBucket: "boc-billmanager.firebasestorage.app",
  messagingSenderId: "626232964549",
  appId: "1:626232964549:web:9d74212333fb0564a207ac",
  measurementId: "G-K2ZVHR4TZE"
};

// Initialize Firebase app (default)
const app = initializeApp(firebaseConfig);

// Export Auth & Firestore instances to be used by other module scripts (eg. app.js)
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;