import firebase from 'firebase/compat/app';
import "firebase/compat/firestore";
import 'firebase/compat/auth';
import 'firebase/compat/storage';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAIOQd9NM6Y0yhfTSSrzV9Y45LMcA4j8GM",
    authDomain: "instagram-clone-react-b13b9.firebaseapp.com",
    projectId: "instagram-clone-react-b13b9",
    storageBucket: "instagram-clone-react-b13b9.appspot.com",
    messagingSenderId: "16137807105",
    appId: "1:16137807105:web:e038ee213769eff85ea700",
    measurementId: "G-XDKFS84G2G"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };