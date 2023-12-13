import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth, GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDA2wVUzrOQOSu3D02gtWX5fZloBB8AKs8",
  authDomain: "todo-74a79.firebaseapp.com",
  projectId: "todo-74a79",
  storageBucket: "todo-74a79.appspot.com",
  messagingSenderId: "33305926224",
  appId: "1:33305926224:web:cbbc133d273cce0ea04f55"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };