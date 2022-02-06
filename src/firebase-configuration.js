// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDd4NltJ5X0jU098qC5DXpJiNttDDPe_go',
  authDomain: 'simple-blog-site-3ddd4.firebaseapp.com',
  projectId: 'simple-blog-site-3ddd4',
  storageBucket: 'simple-blog-site-3ddd4.appspot.com',
  messagingSenderId: '808108246473',
  appId: '1:808108246473:web:3e66166caa670cc787d418',
  measurementId: 'G-DGLS47V8G7',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
