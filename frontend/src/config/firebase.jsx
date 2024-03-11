// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdNfwQeIo6WxaD9YNVPC0cJtFFZ2B_Ij8",
  authDomain: "circlesync-eedc1.firebaseapp.com",
  projectId: "circlesync-eedc1",
  storageBucket: "circlesync-eedc1.appspot.com",
  messagingSenderId: "448568773230",
  appId: "1:448568773230:web:7d708c09b8a31db858f47f",
  measurementId: "G-GF91TRXB21",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
