import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBvU-DGvSpRus3UHzebLv9x0RzdylFPNEs",
  authDomain: "mynotes2-a999e.firebaseapp.com",
  projectId: "mynotes2-a999e",
  storageBucket: "mynotes2-a999e.appspot.com",
  messagingSenderId: "834910137132",
  appId: "1:834910137132:web:59979c27f679ab5fb61a89",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export default db;
