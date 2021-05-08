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
import Select from '@material-ui/core/Select';


import {useAuth} from '../../contexts/AuthContext'


function renderGoal(goal) {
  return (
    <Card style={{ margin: "5px"}}>
    <CardHeader
      // action={
      //   <IconButton aria-label="settings">
      //     <MoreVertIcon />
      //   </IconButton>
      // }
      title={goal.exercise}
    />
    {Object.entries(goal).filter(r=>{return r[0]!="exercise"}).map((entry) => {
      return <Card style={{ margin: "5px"}}>{entry[0]} {entry[1]}</Card>;
      })}
    </Card>
  )
}

function AddGoal(exercises) {
  const exs = exercises.map(e => {return e.id})
  const [exercise, setExercise] = React.useState("select exercise")
  const [fields, setFileds] =     React.useState({})
  const onExerciseChange = (exercise) => {
    setExercise(exercise)
    setFileds(Object.entries(exercises).filter())
  }
  return (
    <Card>
      New Goal
      <FormControl style={{ margin: "5px",minWidth: 120,}}>
        <InputLabel id="demo-simple-select-label">Exercise</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={exercise}
          onChange={onExerciseChange}
          inputProps={{ 'aria-label': 'Without label' }}
        >
        {exs.map((f) => { 
          return <MenuItem value={f}>{f}</MenuItem> 
        })}
        </Select>
      </FormControl>
    </Card>
  )
}

async function getGoals(currentUser,db) {
  const userRef = await db.collection("Users").doc(""+currentUser);
  const goalsRef = await userRef.collection("Goals").get();
  let goals = goalsRef.docs.map( async (doc) =>  {
    let d = doc.data();
    d.exercise = await d.exercise.id
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

export default function Goals() {
  let testuser = "C4QrPxqZN2M4FtdUE38HdGIdykK2"
  const { currentUser, db } = useAuth()
  const [ goals, setGoals ] =         React.useState([]);
  const [ exercises, setExercises ] = React.useState([]);
  React.useEffect(async () => {
    // console.log("user's goals", newGoals);
    setGoals(await getGoals(currentUser, db));
    setExercises([{dist:5, d:4, id:"running"},{dist:5, d:3, id:"thing"}])  //await getExercises(db)
    console.log(currentUser)
    console.log(exercises)
  }, [])

  return (
    <Card>
      My Goals
      {goals.map((g) => {
        return renderGoal(g)
      })}
      {AddGoal(exercises)}
    </Card>
  )
}