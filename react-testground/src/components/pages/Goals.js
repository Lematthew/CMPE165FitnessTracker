import React from 'react';
import '../../App.css';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import {useAuth} from '../../contexts/AuthContext'


class GoalDisplay extends React.Component {
  state = {
    goals: [["a", "2"]]
  }
  async componentDidMount() {
    const goals = await getGoals(this.props.currentUser, this.props.db);

    console.log("state", this.state.goals);
    await console.log("goals", goals);
    this.setState({ goals:goals }, () => console.log(this.state))
}
  renderGoal(goal) {
    return (
      <Card style={{ }}>
      <CardHeader
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title={goal[0]}
      />
      {goal[0]}+{goal.map((metric) => {
        return <Card>{metric}</Card>;
        })}
      </Card>
    )
  }
  render() {
    return (
      <Card>
      My Goals
      {this.state.goals.map((g) => {
        return this.renderGoal(g)
      })}
      </Card>
    )
  }
}

async function getGoals(currentUser,db) {
  const userRef = await db.collection("Users").doc(""+currentUser);
  const goalsRef = await userRef.collection("Goals").get();
  console.log("goals ref ", goalsRef);
  let goals = goalsRef.docs.map( async (doc) =>  {
    console.log(doc.id, '=>', doc.data());
    let d = doc.data();
    let ex = await d.exercise.get()
    let flatgoals = [d.exercise.id].concat(Object.values(ex.data()))
    flatgoals = flatgoals.concat(d.metrics)
    const finalFlatGoals = await Promise.all(flatgoals);
    return finalFlatGoals;
  });
  return await Promise.all(goals);
}

export default function Goals() {
  let testuser = "C4QrPxqZN2M4FtdUE38HdGIdykK2"
  const { currentUser, db } = useAuth()
  // let goals=getGoals(currentUser, db).then((goals) => {

  // });
  // console.log(goals);
  return <GoalDisplay currentUser={testuser} db={db}/>
}