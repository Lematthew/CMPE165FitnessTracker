import React from 'react';
import '../../App.css';
import Card from '@material-ui/core/Card';
import {useAuth} from '../../contexts/AuthContext'


class GoalDisplay extends React.Component {
  state = {
    goals: [["a", "2"]]
  }
  async componentDidMount() {
    const goals = await getGoals(this.props.currentUser, this.props.db);
    
    console.log("state", this.state.goals);
    await console.log("goals", goals);
    await this.setState({ goals })
    console.log(this.state);
}
  render() {
    return (
      <Card>
      My Goals
      {this.state.goals.map((g) => {
        return <Card>{g}+{g.map((metric) => {
          return <Card>{metric}</Card>;
          })}</Card>
      })}
      </Card>
    )
  }
}

async function getGoals(currentUser,db) {
  const userRef = await db.collection("Users").doc(""+currentUser);
  const goalsRef = await userRef.collection("Goals").get();
  let goals = []
  await goalsRef.forEach(async doc =>  {
    console.log(doc.id, '=>', doc.data());
    let d = doc.data();
    const ex = await d.exercise.get()
    let flatgoals = [d.exercise.id].concat(Object.values(ex.data()))
    flatgoals = flatgoals.concat(d.metrics)
    goals.push(flatgoals);
  });
  return goals
}

export default function Goals() {
  let testuser = "C4QrPxqZN2M4FtdUE38HdGIdykK2"
  const { currentUser, db } = useAuth()
  // let goals=getGoals(currentUser, db).then((goals) => {

  // });
  // console.log(goals);
  return <GoalDisplay currentUser={testuser} db={db}/>
}