// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkRivd2m99BeWM5ddK-jDTNjwOrY2E7AY",
  authDomain: "repliq-ecommerce.firebaseapp.com",
  projectId: "repliq-ecommerce",
  storageBucket: "repliq-ecommerce.appspot.com",
  messagingSenderId: "853928922679",
  appId: "1:853928922679:web:0c3621966185e0bbf079b2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
