import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDjSfa8yXZ5fASm4WfBjRDkL-xHDMO89Q8",
  authDomain: "taskflow-14c2f.firebaseapp.com",
  projectId: "taskflow-14c2f",
  storageBucket: "taskflow-14c2f.firebasestorage.app",
  messagingSenderId: "988177022763",
  appId: "1:988177022763:web:15f8ba9cbd1c52b8b08f6e",
  measurementId: "G-YQ0272K0CP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export default app;