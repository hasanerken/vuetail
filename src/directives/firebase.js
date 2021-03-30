import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

// firebase init - add your own config here
const firebaseConfig = {
  apiKey: "AIzaSyAhPJX18HBhNAjasEpA7P89Ou6ERT23tEM",
  authDomain: "menunuzburada.firebaseapp.com",
  databaseURL: "https://menunuzburada-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "menunuzburada",
  storageBucket: "menunuzburada.appspot.com",
  messagingSenderId: "199060013880",
  appId: "1:199060013880:web:c1c6d7bee1687f7af377cd",
  measurementId: "G-MTRF7DNM4E"
};

let firebaseApp = firebase.initializeApp(firebaseConfig);

let auth = firebaseApp.auth()
let db = firebaseApp.database()
let storage = firebaseApp.storage()

// collection references

// export utils/refs
export {
  db,
  auth,
  storage
};