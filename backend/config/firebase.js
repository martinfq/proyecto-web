import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAvgdKqm_3QJtzXhsh7XrW_ZraHssJbxSo",
  authDomain: "studentapp-93a25.firebaseapp.com",
  projectId: "studentapp-93a25",
  storageBucket: "studentapp-93a25.appspot.com",
  messagingSenderId: "724972778784",
  appId: "1:724972778784:web:04ada0790466b4dee85345"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
