import React, { useRef, useState, useEffect } from "react"
import {useAuth} from '../../contexts/AuthContext'
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import TextField from "@material-ui/core/TextField";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';


import Alert from '@material-ui/lab/Alert';

import { Link } from "react-router-dom"
import './Profile.css';
var ReactDOM = require('react-dom');


//Profile in progress
export default function Profile() {

  const { currentUser, db } = useAuth()
  const nameRef =   useRef()
  const heightRef = useRef()
  const weightRef = useRef()
  const sexRef =    useRef()
  const ageRef =    useRef()
  const profilePath = db.collection("Users")

  const [nameVal,   setName ] =   useState("")
  const [sexVal,    setSex ] =    useState("")
  const [weightVal, setWeight ] = useState("")
  const [heightVal, setHeight ] = useState("")
  const [ageVal,    setAge ] =    useState("")

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if(currentUser && currentUser.email){
      profilePath.doc(currentUser.uid).onSnapshot((doc) => {
        setName(doc.data().name)
        setSex(doc.data().sex)
        setAge(doc.data().age)
        setWeight(doc.data().weight)
        setHeight(doc.data().height)
      });
    }
  }, [])

  async function handleSubmit(e) {     
    console.log("submitting")
    e.preventDefault()
    try {
      setError("")
      setLoading(true)
      profilePath.doc(currentUser.uid).set({
        name:   nameVal,
        sex:    sexVal,
        height: heightVal,
        weight: weightVal,
        age:    ageVal,
        email:  currentUser.email
      })
      setError("Profile Updated")
    } catch {
      setError("Profile faied to update")
    }
    
    setLoading(false)
  }

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
              <h2>Date of Birth </h2>
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
    // 
    //   {/* <div id="Results" className="w-100 text-center mt-2" /> */}
    return( 
      <>
      {element}
      {/* <div className="page-wrapper"></div> */}
      <Card className="edit-card">
          {/* <h2 className="text-center mb-4">Edit Profile</h2> */}
          {/* {error && <Alert variant="success">{error}</Alert>} */}
        <TextField id="standard-basic" label="name" value={nameVal} onChange={(e)=> {setName(e.target.value) }}>
          <TextField.Label>Name</TextField.Label>
          <FormControl type="text" value={nameVal} defaultValue = {nameVal} />
        </TextField>

        <Select id="demo-simple-select" value={sexVal} onChange={(e)=> { setSex(e.target.value) }}>
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </Select>

        <TextField id="standard-basic" label="height" value={heightVal} onChange={(e)=> { setHeight(e.target.value) }}>
          <FormControl type="text" ref={heightRef}  />
        </TextField>

        <TextField id="standard-basic" label="weight" value={weightVal} onChange={(e)=> { setWeight(e.target.value) }}>
          <FormControl type="text" ref={weightRef}  />
        </TextField>

        <TextField id="standard-basic" label="Date of Birth" value={ageVal} onChange={(e)=> { setAge(e.target.value) }}>
          <FormControl type="text" ref={ageRef}  />
        </TextField>

        <Button onClick={(e) => handleSubmit(e)} disabled={loading} className="w-100" type="submit">
          Update Profile
        </Button>
      </Card>
      </>
    )

  // return(
  // <>
  // <div className="page-wrapper">
  // <h1>You are not logged in!</h1>

  // <div className="w-100 text-center mt-2">
  //   Click on the link to <Link to="/signup">Login or Sign up!</Link>
  // </div>
  // </div>
  // </>
  // )
  
}