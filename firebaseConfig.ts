import { initializeApp, getApps } from 'firebase/app';

export const firebaseConfig = {
  apiKey: "AIzaSyA-REALKEY-EXAMPLE",
  authDomain: "carparklocatorapp.firebaseapp.com",
  projectId: "carparklocatorapp",
  storageBucket: "carparklocatorapp.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};

export const firebaseApp = getApps().length === 0
  ? initializeApp(firebaseConfig)
  : getApps()[0];
