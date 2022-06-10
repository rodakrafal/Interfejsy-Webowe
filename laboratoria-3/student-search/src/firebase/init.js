import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAH3CDhnI5f9Fzsd4YeVLm25Mwvo4S2qZ8",
  authDomain: "piw-laboratoria5.firebaseapp.com",
  projectId: "piw-laboratoria5",
  storageBucket: "piw-laboratoria5.appspot.com",
  messagingSenderId: "758475752892",
  appId: "1:758475752892:web:86deec191c9fdd043e17b9",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
