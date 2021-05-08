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
import { useAuth } from "../../contexts/AuthContext.js"
import { useHistory } from "react-router-dom"
// import "bootstrap/dist/css/bootstrap.css"

export default function Signup() {
  //Sign up Refs
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  //Login Refs
  const emailRef2 = useRef()
  const passwordRef2 = useRef()

  const {signup, login, logout, db}  = useAuth()
  const profilePath = db.collection('Users')

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const { currentUser} = useAuth()

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
      <h1>You are already Signed in! {currentUser.email}</h1>
      <Card>
        <Card.Body>
          <TextField onSubmit={handleLogOutSubmit}>
            <Button disabled={loading} className="w-100" type="submit">      
              Log Out
            </Button>
          </TextField>
        </Card.Body>
      </Card>
      </>
      )

  return (
    <>
      <Card>
        <Card.Body>
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
        </form>
        </Card.Body>
      </Card>



      <Card>
        <Card.Body>
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
        </Card.Body>
      </Card>

    </>
  )
}