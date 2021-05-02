import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './components/pages/Home';
import Profile from './components/pages/Profile';
import Goals from './components/pages/Goals';
import Statistics from './components/pages/Statistics';
import SignUp from './components/pages/SignUp';
import { Container } from 'react-bootstrap';
import { AuthProvider } from './contexts/AuthContext.js';

//AuthProvider grants acess to the functions and variables in AuthContext.js
function App() {
  return (
    <>
    <Container>
      <Router> 
        <AuthProvider>
        <Navbar />
        <Switch>
        </Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/profile" exact component={Profile}/>
          <Route path="/goals" exact component={Goals}/>
          <Route path="/statistics" exact component={Statistics}/>
          <Route path="/signup" exact component={SignUp}/>
          </AuthProvider>
      </Router>
      </Container>
    </>
  );
}

export default App;
