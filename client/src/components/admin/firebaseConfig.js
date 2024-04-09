import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDapuYZ_8cJhXxrNd7V3rbcC1EQmAex7qU",
  authDomain: "spm-project-cd3d5.firebaseapp.com",
  projectId: "spm-project-cd3d5",
  storageBucket: "spm-project-cd3d5.appspot.com",
  messagingSenderId: "953427963506",
  appId: "1:953427963506:web:45697c02fbf480a2409ceb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
