import React from 'react';
import '../../App.css';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
// drop down
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

import {useAuth} from '../../contexts/AuthContext'
import { IconButton } from '@material-ui/core';
import IconLink from "@material-ui/icons/Link";
import IconHelp from "@material-ui/icons/HelpOutline";



function renderGoal(goal) {
  return (
    <Card style={{ margin: "5px", maxWidth: "350px"}}>
    <CardHeader
      action={
        <IconButton type="submit" aria-label="settings" action={goal.link}>
          <IconHelp />
        </IconButton>
      }
      title={goal.id}
    />
    {Object.entries(goal).filter(r=>{return r[0]!="id" & r[0]!='link'}).map((entry) => {
      return ""+entry[0] + " " + entry[1];
      })}
      <CardActions>
        <Button size="small">edit</Button>
        <Button size="small" color="secondary">remove</Button>
      </CardActions>
    </Card>
  )
}

async function getGoals(currentUser,db) {
  const userRef = await db.collection("Users").doc(""+currentUser);
  const goalsRef = await userRef.collection("Goals").get();
  let goals = goalsRef.docs.map( async (doc) =>  {
    let d = doc.data();
    return d;
  });
  return await Promise.all(goals);
}

async function getExercises(db) {
  const exercisesRef = await db.collection("Exercises").get();
  let exercises = await exercisesRef.docs.map( async (doc) => {
    let res = await doc.data()
    res.id = doc.id;
    console.log(res);
    return res;
  } )
  return await Promise.all(exercises);
}

async function createNewGoal(currentUser, db, newGoal) {
  let goal = Object.fromEntries(newGoal.fields)
  goal.id = newGoal.id
  console.log("adding new goal", goal, " for user ", currentUser)
  const userRef  = await db.collection("Users").doc(""+currentUser);
  const goalRef = await userRef.collection("Goals").add(goal);
  // goalRef.set(await Promise.all(goal))
}

export default function Goals() {
  let testuser = "C4QrPxqZN2M4FtdUE38HdGIdykK2"
  const { currentUser, db } = useAuth()
  const [ goals, setGoals ] =         React.useState([]);
  const [ exercises, setExercises ] = React.useState([]);

  // new goal
  const [fields, setFields] =     React.useState([])
  const [exercise, setExercise] = React.useState({id:"select exercise"})

  React.useEffect(async () => {
    // console.log("user's goals", newGoals);
    setGoals(await getGoals(currentUser.uid, db));
    setExercises(await getExercises(db))  //await getExercises(db)
    console.log("got current user", currentUser)
    console.log("got users goals", goals)
    console.log("got exercises", exercises)
  }, [])
  
  const onExerciseChange = (exercise) => {
    setExercise(exercise)
    console.log("ex", exercise)
    setFields(Object.entries(exercise).filter(x=>{return x[0]!="id" & x[0]!="link"}))
    console.log("fields", fields)
  }
  const onFieldChange = (field, newVal) => {
    const newFields = fields.map(x => {
      if(x[0]!=field) 
        return x
      else
        return [field, newVal]
    })
    setFields(newFields)
  }

  function AddGoal(exs) {
    return (
      <Card>
        New Goal
        <FormControl style={{ margin: "5px",minWidth: 120,}}>
          <InputLabel id="demo-simple-select-label">Exercise</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={""+exercise.id}
            onChange={e => onExerciseChange(e.target.value)}
            inputProps={{ 'aria-label': 'Without label' }}
            renderValue={(value) => value.id}
          >
          {exs.map((f) => { 
            return <MenuItem value={f}>{f.id}</MenuItem> 
          })}
          </Select>
        </FormControl>
        {fields.map(x => {return <Card>{x[0]} <TextField
            id="standard-number"
            label="Number"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={e => onFieldChange(x[0], e.target.value)}
            value={x[1]}
          /></Card>})}
        <Button variant="contained" color="primary" onClick={
            e=>createNewGoal(currentUser.uid, db, {id:exercise.id, fields})}>
          Add
        </Button>
      </Card>
    )
  }
  

  return (
    <Card>
      My Goals
      {goals.map((g) => {
        return renderGoal(g)
      })}
      {/* don't show exercises that we are already doing */}
      {AddGoal(exercises.filter(x=>{return goals.reduce((p,n)=>{return p&x.id!=n.id}, true)}))}
    </Card>
  )
}