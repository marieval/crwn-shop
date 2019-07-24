import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
    apiKey: "AIzaSyBnC-Iu74Oz03u9HUvAW6VOFad0Lnb_2OA",
    authDomain: "crwn-db-18a18.firebaseapp.com",
    databaseURL: "https://crwn-db-18a18.firebaseio.com",
    projectId: "crwn-db-18a18",
    storageBucket: "",
    messagingSenderId: "648461074550",
    appId: "1:648461074550:web:8c7fc6f748cc9a58"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

/*     console.log(firestore.doc("users/128fdashs")) */

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();
    
    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName, 
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log("error creating user", error.message);
        }
    }

    return userRef;
}


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;