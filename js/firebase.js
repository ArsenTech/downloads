import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-storage.js";
const firebaseConfig = {
     apiKey: "AIzaSyB28gnqEvnuiQmif6Ia7h3SI5b2HB8HCo0",
     authDomain: "downloads-arsentech-2005.firebaseapp.com",
     projectId: "downloads-arsentech-2005",
     storageBucket: "downloads-arsentech-2005.appspot.com",
     messagingSenderId: "646551451666",
     appId: "1:646551451666:web:e66c5e3bd72bcf075d00cb",
     measurementId: "G-1GEPXGNQ86"
};
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);