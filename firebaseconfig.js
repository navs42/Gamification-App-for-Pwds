
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOmhev-1UFvBBPQitPHLuHwftM-M9Shv8",
  authDomain: "reachplus-82fef.firebaseapp.com",
  projectId: "reachplus-82fef",
  storageBucket: "reachplus-82fef.firebasestorage.app",
  messagingSenderId: "917670375033",
  appId: "1:917670375033:web:07b04836853416d530aea8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
