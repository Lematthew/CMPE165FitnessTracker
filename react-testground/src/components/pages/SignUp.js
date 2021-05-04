import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
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
      <Form onSubmit={handleLogOutSubmit}>
                      <Button disabled={loading} className="w-100" type="submit">
              
              Log Out
            </Button>
      </Form>
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
          <Form onSubmit={handleLogInSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef2} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef2} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Log In
            </Button>
        </Form>
        </Card.Body>
        </Card>



      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          <Form onSubmit={handleSignInSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>

    </>
  )
}