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

app.getUserInfo('/getUserInfo', (req, res) => {
    console.log("getUserInfo")
    const docRef = db.collection('users').doc('pushups');
    var result = {"data"}
    res.json(result);
})

app.registerUser('/registerUser', (req, res) => {
    console.log("registerUser")
    user = req;
    const docRef = await db.collection('Users').doc(user.username);
    docRef.set({
        "height": user.height,
        "weight": user.weight,
        "age": user.age,
        "gender": user.gender,
        "goals": []
    })
    res.json(result);
})

app.loginUser('/loginUser', (req, res) => {
    console.log("loginUser")
    const docRef = db.collection('users').doc('pushups');
    var result = {"data"}
    res.json(result);
})

app.getAvailableExercises('/getAvailableExercises', (req, res) => {
    console.log("getAvailableExercises")
    const docRef = db.collection('Excercises').get();
    var result = {"data"}
    res.json(result);
})

app.registerUser('/registerUser', (req, res) => {
    console.log("registerUser")
    user = req;
    const docRef = await db.collection('Users').doc(user.username);
    docRef.set({
        "height": user.height,
        "weight": user.weight,
        "age": user.age,
        "gender": user.gender,
        "goals": []
    })
    res.json(result);
})

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})