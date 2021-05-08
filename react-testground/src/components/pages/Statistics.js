import React, { useState } from "react"
import "bootstrap/dist/css/bootstrap.css"
import {useAuth} from '../../contexts/AuthContext'
import { Link } from "react-router-dom"
import LineGraph from '../LineGraph'
import './Statistics.css';
var ReactDOM = require('react-dom');


//Profile in progress
export default function Statistics() {

  const { currentUser, db } = useAuth()
  const profilePath = db.collection("Users")

  let excerciseVal = []
  var metric0Val =""
  var metric1Val =""
  let ActivityData = []
  let GoalData = []

    // sample code
    let BaseTime = new Date('2021-05-03T00:00:00').getTime();
    for(var i = 0; i < 100; i++) {
        ActivityData.push({
            time: new Date(BaseTime + i*24*60*60*1000),
            value: Math.round(100*Math.random())
        });
    }

    for(var j = 0; j < 100; j++) {
        GoalData.push({
            time: new Date(BaseTime + j*24*60*60*1000),
            value: Math.round(100*Math.random())
        });
    }

    excerciseVal.push({
        title: 'Random Data',
        aData: ActivityData,
        gData: GoalData
    });

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
                <LineGraph activityData={excerciseVal[0].aData} goalsData={excerciseVal[0].gData} title={excerciseVal[0].title} color="#478125" />
            </div>
        <div id="CHARTPLACEHOLDER"></div>
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