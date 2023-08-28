import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { getStorage } from 'firebase/storage';
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCW35q2tPz-Q3Ln7n1ec5wFTWfXUbgSnCY",
  authDomain: "proyecto-web-8d460.firebaseapp.com",
  projectId: "proyecto-web-8d460",
  storageBucket: "proyecto-web-8d460.appspot.com",
  messagingSenderId: "81284053779",
  appId: "1:81284053779:web:12e831701c546c01fef8e6",
  measurementId: "G-C0PFF4TWM0"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);