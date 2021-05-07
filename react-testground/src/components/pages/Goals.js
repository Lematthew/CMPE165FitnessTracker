import React from 'react';
import '../../App.css';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

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

async function getGoals(currentUser,db) {
  const userRef = await db.collection("Users").doc(""+currentUser);
  const goalsRef = await userRef.collection("Goals").get();
  console.log("goals ref ", goalsRef);
  let goals = goalsRef.docs.map( async (doc) =>  {
    let d = doc.data();
    d.exercise = await d.exercise.id
    return d;
  });
  return await Promise.all(goals);
}

export default function Goals() {
  let testuser = "C4QrPxqZN2M4FtdUE38HdGIdykK2"
  const { currentUser, db } = useAuth()
  const [ goals, setGoals ] = React.useState([]);
  React.useEffect(async () => {
    const newGoals = await getGoals(testuser, db);
    // console.log("user's goals", newGoals);
    setGoals(newGoals);
  }, [])

  return (
    <Card>
      My Goals
      {goals.map((g) => {
        return renderGoal(g)
      })}
    </Card>
  )
}