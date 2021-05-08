import React, { useRef, useState } from "react"
// import "bootstrap/dist/css/bootstrap.css"
import {useAuth} from '../../contexts/AuthContext'
import { Form, Button, Card, Row, Alert } from "react-bootstrap"
import { Link } from "react-router-dom"
import './Profile.css';
var ReactDOM = require('react-dom');


//Profile in progress
export default function Profile() {

  const { currentUser, db } = useAuth()
  const nameRef = useRef()
  const heightRef = useRef()
  const weightRef = useRef()
  const sexRef = useRef()
  const ageRef = useRef()
  const profilePath = db.collection("Users")

  var nameVal = ""
  var sexVal =""
  var weightVal =""
  var heightVal =""
  var ageVal =""

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
      
  e.preventDefault()
    try {
      setError("")
      setLoading(true)
      profilePath.doc(currentUser.uid).set({
        name:   nameRef.current.value,
        sex:    sexRef.current.value,
        height: heightRef.current.value,
        weight: weightRef.current.value,
        age:    ageRef.current.value,
        email:  currentUser.email
      })
      setError("Profile Updated")
    } catch {
      setError("Profile faied to update")
    }
    
    setLoading(false)
  }

  if(currentUser && currentUser.email){
    profilePath.doc(currentUser.uid).onSnapshot((doc) => {
      nameVal   = doc.data().name
      sexVal    = doc.data().sex
      ageVal    = doc.data().age
      weightVal = doc.data().weight
      heightVal = doc.data().height
      const element = ( 
        <>
          <h1>PROFILE</h1>
          <div className="break" />
          <div className="profile">
            <h3>Welcome, {nameVal}</h3>
            <div className="break" />
            <h5>sample message{/*MESSAGE*/}</h5>
            <div className="break" />
            <div className="user-data"> 
              <div className="user-data-wrapper">
                <div className="user-data-item">
                  <h2>Sex </h2>
                  <p>{sexVal}</p>
                </div>
                <div className="user-data-item">
                  <h2>Age </h2>
                  <p>{ageVal}</p>
                </div>
                <div className="user-data-item">
                  <h2>Height </h2>
                  <p>{heightVal}</p>
                </div>
                <div className="user-data-item">
                  <h2>Weight </h2>
                  <p>{weightVal}</p>
                </div>
                <div className="break" />
              </div>
            </div>  
          </div>
        </>   
      );
      ReactDOM.render(element, document.getElementById('Results'));
    });
  
    return( 
      <>
      <div className="page-wrapper">
      <div id="Results" className="w-100 text-center mt-2" />
      <Card className="edit-card">
        <Card.Body>
          <h2 className="text-center mb-4">Edit Profile</h2>
          {error && <Alert variant="success">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} id="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" ref={nameRef} defaultValue = {nameVal} />
            </Form.Group>

            <Form.Group as={Row} id="sex">
              <Form.Label>Gender</Form.Label>
              <Form.Control as="select" ref ={sexRef} defaultValue = "Female">
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Row} id="height">
              <Form.Label>Height</Form.Label>
              <Form.Control type="text" ref={heightRef}  />
            </Form.Group>

            <Form.Group as={Row} id="weight">
              <Form.Label>Weight</Form.Label>
              <Form.Control type="text" ref={weightRef}  />
            </Form.Group>

            <Form.Group as={Row} id="age">
              <Form.Label>Age</Form.Label>
              <Form.Control type="text" ref={ageRef}  />
            </Form.Group>

            <Button disabled={loading} className="w-100" type="submit">
              Update Profile
            </Button>
          </Form>
        </Card.Body>
      </Card>
      </div>
      </>
    )
  }

  return(
  <>
  <div className="page-wrapper">
  <h1>You are not logged in!</h1>

  <div className="w-100 text-center mt-2">
    Click on the link to <Link to="/signup">Login or Sign up!</Link>
  </div>
  </div>
  </>
  )
}