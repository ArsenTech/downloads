import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-storage.js";
import { firebaseConfig } from "./firebase-init.js";
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);