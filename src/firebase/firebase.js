import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDtmyU5ppjCuhE-7fb9a5T8ja65WqWyik4",
    authDomain: "juniority-42d4f.firebaseapp.com",
    projectId: "juniority-42d4f",
    storageBucket: "juniority-42d4f.appspot.com",
    messagingSenderId: "883239890046",
    appId: "1:883239890046:web:d19666aaa0a7f569573c2f",
    measurementId: "G-S2HJRF622Z"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const providerGoogle = new firebase.auth.GoogleAuthProvider();

const providerFacebook = new firebase.auth.FacebookAuthProvider();

export { db, auth, providerGoogle, providerFacebook }