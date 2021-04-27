import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

const app = firebase.initializeApp({
    "apiKey": "AIzaSyD1G7sOUHwg5X-AqKRrRURbuHB8G6qH-A0",
    "authDomain": "fitness-tracker-5c549.firebaseapp.com",
    "databaseURL": "https://fitness-tracker-5c549-default-rtdb.firebaseio.com",
    "projectId": "fitness-tracker-5c549",
    "storageBucket": "fitness-tracker-5c549.appspot.com",
    "messagingSenderId": "279044668457",
    "appId": "1:279044668457:web:62083e64045711c0caf038"
})

export const auth = app.auth()
export const firestore = app.firestore()
export default app