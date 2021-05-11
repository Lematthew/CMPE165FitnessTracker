import React, { useRef, useState } from "react"
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import TextField from "@material-ui/core/TextField";
import FormControl from '@material-ui/core/FormControl';

import Alert from '@material-ui/lab/Alert';
import { useAuth, AuthProvider } from "../../contexts/AuthContext.js"
import { useHistory } from "react-router-dom"

import { auth } from "../../firebase"
import firebase from "firebase/app"

// import "bootstrap/dist/css/bootstrap.css"

export default function Signup() {
  //Sign up Refs
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  //Login Refs
  const emailRef2 = useRef()
  const passwordRef2 = useRef()

  const {currentUser, signup, login, logout, db}  = useAuth()
  const profilePath = db.collection('Users')

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const authCont = useAuth()

  async function handleSignInSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    try {
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value).then((userCredential) => {
        // Signed in 
        var user = userCredential.user;
        profilePath.doc(user.uid).set({
          email: user.email
        })
        // ...
      })
      .catch((error) => {
        var errorCode = error.code
        var errorMessage = error.message
        console.log(errorCode)
        console.log(errorMessage)
        setError("Failed to log in")
    })
    } catch {
      setError("Failed to create an account. Email already in use.")
    }

    setLoading(false)
  }

  async function handleLogInSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await login(emailRef2.current.value, passwordRef2.current.value)
      history.push("/profile")
    } catch {
      setError("Failed to log in")
    }

    setLoading(false)
  }

  async function handleLogOutSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await logout()
      history.push("/")
    } catch {
      setError("Failed to log out")
    }

    setLoading(false)
  }


  if(currentUser)
    return(
    <>
      <h1>Signed in as {currentUser.email}</h1>
      <Card>
        <TextField onSubmit={handleLogOutSubmit}>
          <Button disabled={loading} className="w-100" type="submit">      
            Log Out
          </Button>
        </TextField>
      </Card>
    </>
    )

  return (
    <>
      <Card>
        {error && <Alert variant="danger">{error}</Alert>}
        <h2 className="text-center mb-4">Log In</h2>
        <form onSubmit={handleLogInSubmit}>
          <TextField id="standard-basic" label="email">
            <FormControl type="email" ref={emailRef2} required />
          </TextField>
          <TextField id="standard-basic" label="password">
            <FormControl type="password" ref={passwordRef2} required />
          </TextField>
          <Button disabled={loading} className="w-100" type="submit">
            Log In
          </Button>
          <Button disabled={loading} onClick={()=>{
            var provider = new firebase.auth.GoogleAuthProvider();

            auth.signInWithPopup(provider)
            .then((result) => {
              /** @type {auth.OAuthCredential} */
              var credential = result.credential;

              // This gives you a Google Access Token. You can use it to access the Google API.
              var token = credential.accessToken;
              // The signed-in user info.
              var user = result.user;
              console.log("logged in user ", user)
              // ...
            }).catch((error) => {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              // ...
              console.log("error logging in user ", email)
            });
            }}>
            Log In With Google
          </Button>
        </form>
      </Card>



      <Card>
        <h2 className="text-center mb-4">Sign Up</h2>
        <TextField onSubmit={handleSignInSubmit}>
          <TextField id="standard-basic" label="email">
            <FormControl type="email" ref={emailRef} required />
          </TextField>
          <TextField id="standard-basic" label="password">
            <FormControl type="password" ref={passwordRef} required />
          </TextField>
          <TextField id="standard-basic" label="password-confirm">
            <FormControl type="password" ref={passwordConfirmRef} required />
          </TextField>
          <Button disabled={loading} className="w-100" type="submit">
            Sign Up
          </Button>
        </TextField>
      </Card>

    </>
  )
}