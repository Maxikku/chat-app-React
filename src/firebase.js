import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCuLdwXbPwW_xeCC8c4ffvm1kBTrLDTQMs",
    authDomain: "chat-app-7caa8.firebaseapp.com",
    databaseURL: "https://chat-app-7caa8.firebaseio.com",
    projectId: "chat-app-7caa8",
    storageBucket: "chat-app-7caa8.appspot.com",
    messagingSenderId: "1079697006079",
    appId: "1:1079697006079:web:b90d68f8bfc3213e6c1bca",
    measurementId: "G-DS206QE5WH"
};


const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider};
export default db;
