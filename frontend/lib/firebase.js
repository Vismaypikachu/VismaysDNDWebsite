// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import {
    collection,
    getDocs,
    getFirestore,
    limit,
    query,
    where,
} from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAMLi4AUaNZgwgg3OfPlOrBtDNqpuqnXv0",
    authDomain: "tech-savvy-youth-website.firebaseapp.com",
    projectId: "tech-savvy-youth-website",
    storageBucket: "tech-savvy-youth-website.appspot.com",
    messagingSenderId: "1013292471375",
    appId: "1:1013292471375:web:51eba0c6537ffbe519063a",
    measurementId: "G-E69EY4Y9RL",
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const analytics = typeof window !== "undefined" && getAnalytics(app);
export const storage = getStorage(app);

export const googleAuthProvider = new GoogleAuthProvider();

export async function getUserWithUsername(username) {
    const usersRef = collection(firestore, "users");
    const q = query(usersRef, where("username", "==", username), limit(1));
    const userDoc = (await getDocs(q)).docs[0];
    return userDoc;
}
