import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyArs0__b4r94-m5BD6VtBHdFDSKcjpXgdE",
  authDomain: "life-cycle-analysis-842bb.firebaseapp.com",
  projectId: "life-cycle-analysis-842bb",
  storageBucket: "life-cycle-analysis-842bb.firebasestorage.app",
  messagingSenderId: "517672157639",
  appId: "1:517672157639:web:83c349179b7a07d78519e2",
  measurementId: "G-8PYFZZH3ZQ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;