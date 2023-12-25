
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAixy0Pf4c2_vRqFIfdGSQyyujLnD8P-9c",
  authDomain: "book-85c3a.firebaseapp.com",
  projectId: "book-85c3a",
  storageBucket: "book-85c3a.appspot.com",
  messagingSenderId: "344989008260",
  appId: "1:344989008260:web:20c6e2159662b2eaa41dd1",
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, serverTimestamp, getDocs }; 

export default app;
