import { initializeApp } from "firebase/app";

import { getFirestore } from "@firebase/firestore";
import { getAuth } from "@firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbm6B4dk5xq1ujQC_jFXIEgncgygSp93k",
  authDomain: "react-docs-b2085.firebaseapp.com",
  projectId: "react-docs-b2085",
  storageBucket: "react-docs-b2085.appspot.com",
  messagingSenderId: "1089526621149",
  appId: "1:1089526621149:web:be485917d2aba88a148c34",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const auth = getAuth(app);

export { firestore, auth };
