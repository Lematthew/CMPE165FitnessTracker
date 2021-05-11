import React, { useEffect } from "react"
// import "bootstrap/dist/css/bootstrap.css"
import {useAuth} from '../../contexts/AuthContext'
import { Link } from "react-router-dom"
import LineGraph from '../LineGraph'
import './Statistics.css';
var ReactDOM = require('react-dom');


//Profile in progress
export default function Statistics() {

  const { currentUser, db } = useAuth()
  const profilePath = db.collection("Users")

  const [ excerciseVal, setExerciseVal] = React.useState([])
  const [ metric0Val, setMetric0Val]  = React.useState("")
  const [ metric1Val, setMetric1Val] = React.useState("")
  const [ ActivityData, setActiveData] = React.useState([])
  const [ GoalData, setGoalData ] = React.useState([])

  // useEffect(() => {
  //   doMath();
  // }, []);

  // const doMath = () => {
    // Promise.all
    // sample code
  useEffect(async () => {
    let BaseTime = new Date('2021-05-03T00:00:00').getTime();
    let newAD = []
    let newGD = []
    let acc = 50
    for(var i = 0; i < 100; i++) {
      let diff = Math.round(5*Math.random()) - 2.5
      acc += diff;
      newAD.push({
        time: new Date(BaseTime + i*24*60*60*1000),
        value: Math.round(acc)
      });
    }
    setActiveData(await Promise.all(newAD))
    for(var j = 0; j < 100; j++) {
      let diff = Math.round(5*Math.random()) - 1
      let dat = (newAD.slice(Math.max(0, j-10), j).map(x=>{
        return x.value})).reduce((a,b)=>{return a+b}, 0)/(Math.min(10, j+1)) + diff;
      newGD.push({
        time: new Date(BaseTime + j*24*60*60*1000),
        value: Math.round(dat)
      });
    }
    setGoalData(await Promise.all(newGD))
    setExerciseVal([{
      title: 'Random Data',
      aData: newAD,
      gData: newGD
    }])
    console.log("saved data ", excerciseVal)
    // excerciseVal.push({
    //     title: 'Random Data',
    //     aData: ActivityData,
    //     gData: GoalData
    // });
  }, [])
  

  // };

  if(currentUser && currentUser.email){
    profilePath.doc(currentUser.uid).onSnapshot((doc) => {

    // TODO: 
    // data fetching and conversion to json object
    // metric calculation logic
        // for entry e in activity history:
        //  activityData[e] = (e.metric1.value NOT null) ? e.metric0.value * e.metric1.value : e.metric0.value
        // for entry e in goal history:
        //  activityData[e] = (e.metric1.value NOT null) ? e.metric0.value * e.metric1.value : e.metric0.value
    // procedural rendering

    });
  
    return(   
      <>
      <div className="page-wrapper">
            <div className="chart-wrapper">
                {/* <LineGraph activityData={ActivityData} goalData={GoalData} title={excerciseVal} color="#478125" /> */}
                {excerciseVal.map(d=> {
                  return <LineGraph activityData={excerciseVal[0].aData} goalsData={excerciseVal[0].gData} title={excerciseVal[0].title} color="#478125" />
                })}
            </div>
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