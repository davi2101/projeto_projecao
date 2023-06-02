
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCbB-0u5bClQcte1ms5EEGXjonCgHXIOhM",
  authDomain: "nutrifica-910ef.firebaseapp.com",
  projectId: "nutrifica-910ef",
  storageBucket: "nutrifica-910ef.appspot.com",
  messagingSenderId: "504482551014",
  appId: "1:504482551014:web:481384b9a135572243d727"
};


const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp)

export { auth }