// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: "tourism-53817",
  storageBucket: "tourism-53817.firebasestorage.app",
  messagingSenderId: "552765702161",
  appId: "1:552765702161:web:f3882fe07375b5946e31b0",
  measurementId: "G-RZNZ33WS9W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
