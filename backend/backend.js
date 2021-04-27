const express        = require('express')
const bodyParser     = require('body-parser')
require("firebase/firestore");
const firebase = require('firebase-admin');
const serviceAccount = require("./fitness-tracker-5c549-firebase-adminsdk-yzgd2-2110dfef74.json")
var firebaseConfig   = require("./prod.json")
firebaseConfig.credential = firebase.credential.cert(serviceAccount)
firebase.initializeApp(firebaseConfig)

const db = firebase.firestore();

const app = express()
const port = 3000

app.getAvailableExercises('/getExercises', (req, res) => {
    console.log("getExercises")
    const docRef = db.collection('excercises').doc('pushups');
    var result = {"data"}
    res.json(result);
})

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})