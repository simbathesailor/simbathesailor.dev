import firebase from "firebase/app"
import "firebase/firestore"
import firbaseConfigFromEnv from "./firbase.config"

var firebaseConfig = firbaseConfigFromEnv

firebase.initializeApp(firebaseConfig)

export const firestore = firebase.firestore()

export default firebase
