import { auth, firestore } from "./init";
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import { setDoc, getDoc, doc } from "firebase/firestore";

const googleProvider = new GoogleAuthProvider();
export const logInWithGoogle = async () => {
  try {
    const response = await signInWithPopup(auth, googleProvider);

    const user = response.user;
    const q = doc(firestore, "users", user.uid);
    const docs = await getDoc(q);
    if (!docs.exists()) {
      await setDoc(q, {
        name: user.displayName,
        authProvider: "google",
        email: user.email,
        roles: ["admin", "doctor"],
      });
    }
  } catch (err) {
    console.error({ err });
    alert(err.message);
  }
};

export const logInWithEmailAndPassword = async (email, password) => {};
const gitHubProvider = new GithubAuthProvider();

export const logInWithGithub = async () => {
  try {
    const response = await signInWithPopup(auth, gitHubProvider);

    const user = response.user;
    const q = doc(firestore, "users", user.uid);
    const docs = await getDoc(q);
    if (!docs.exists()) {
      await setDoc(q, {
        name: user.displayName,
        authProvider: "google",
        email: user.email,
        roles: ["admin", "doctor"],
      });
    }
  } catch (err) {
    console.error({ err });
    alert(err.message);
  }
};

export const logoutExternal = () => {
  signOut(auth);
};