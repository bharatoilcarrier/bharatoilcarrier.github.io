// app.js
import { auth, db } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import {
  collection,
  getDocs,
  query,
  where
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

/**
 * Signup form handler (if page has #signupForm)
 */
const signupForm = document.getElementById('signupForm');
if (signupForm) {
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = signupForm.email.value.trim();
    const password = signupForm.password.value;
    const msg = document.getElementById('signupMessage');
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      msg.textContent = 'Signup successful — please login.';
      signupForm.reset();
    } catch (err) {
      msg.textContent = err.message;
    }
  });
}

/**
 * Login form handler (if page has #loginForm)
 */
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = loginForm.email.value.trim();
    const password = loginForm.password.value;
    const msg = document.getElementById('loginMessage');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // redirect to dashboard
      window.location.href = "/client-portal/dashboard.html";
    } catch (err) {
      msg.textContent = err.message;
    }
  });
}

/**
 * Dashboard behaviour: check auth and show orders
 */
if (document.getElementById('dashboard')) {
  const userInfo = document.getElementById('userInfo');
  const ordersWrap = document.getElementById('ordersList');
  const logoutBtn = document.getElementById('logoutBtn');

  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      // not logged in -> redirect to login
      window.location.href = "/client-portal/";
      return;
    }
    userInfo.textContent = `Logged in as ${user.email}`;

    // fetch sample orders from Firestore collection 'orders'
    try {
      const ordersCol = collection(db, 'orders');
      // for demo we fetch all; in production filter by user ID
      const snapshot = await getDocs(ordersCol);
      const items = [];
      snapshot.forEach(doc => {
        const d = doc.data();
        items.push(`<div class="order-card" style="border:1px solid #ddd;padding:8px;margin-bottom:8px;border-radius:6px;">
          <strong>Order:</strong> ${d.orderNumber || doc.id} <br/>
          <small>Status: ${d.status || 'N/A'}</small><br/>
          <small>Vehicle: ${d.vehicle || '-'}</small>
          </div>`);
      });
      ordersWrap.innerHTML = items.length ? items.join('') : '<p>No orders found.</p>';
    } catch (err) {
      ordersWrap.innerHTML = `<p style="color:red">${err.message}</p>`;
    }
  });

  logoutBtn.addEventListener('click', async () => {
    await signOut(auth);
    window.location.href = "/client-portal/";
  });
}