import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB8gzPNQQjHvKhZhBVNliUiEKX2kcA65Vg",
  authDomain: "migrant-care.firebaseapp.com",
  projectId: "migrant-care",
  storageBucket: "migrant-care.firebasestorage.app",
  messagingSenderId: "810197309536",
  appId: "1:810197309536:web:edd898329552370be7cb05",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
