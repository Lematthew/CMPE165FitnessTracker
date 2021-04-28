import React, { useRef, useState } from "react"
import "bootstrap/dist/css/bootstrap.css"
import {useAuth} from '../../contexts/AuthContext'
import { Form, Button, Card,  Row } from "react-bootstrap"

//Profile in progress
export default function Profile() {

    const { currentUser, db } = useAuth()
    const nameRef = useRef()
    const heightRef = useRef()
    const weightRef = useRef()
    const sexRef = useRef()
    const ageRef = useRef()
    const profilePath = db.collection("Users")

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)


    async function handleSubmit(e) {
    
        try {
          setError("")
          setLoading(true)
          profilePath.doc(currentUser.uid).set({
            name:   nameRef.current.value,
            sex:    sexRef.current.value,
            height: heightRef.current.value,
            weight: weightRef.current.value,
            age:    ageRef.current.value
          })
        } catch {
          setError("Profile faied to update")
        }
    
        setLoading(false)
      }


    if(currentUser && currentUser.email){

        /*
     db.collection("Users").doc(currentUser.uid)
        .onSnapshot((doc) => {

        });

        */
    return( 
    <>  
    <Card>
    <Card.Body>
      <h2 className="text-center mb-4">Edit Profile</h2>
      <Form onSubmit={handleSubmit}>

            <Form.Group as={Row} id="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" ref={nameRef}  />
            </Form.Group>

            <Form.Group as={Row} id="sex">
            <Form.Label>Gender</Form.Label>
                <Form.Control as="select" ref ={sexRef}>
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
                <Form.Label>weight</Form.Label>
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
        </>

    
    )
    }

    return(<h1>You are nothing</h1>)
}