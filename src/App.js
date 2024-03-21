// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Entrance from './pages/enterance/Entrance';
import Register from './pages/register/Register';
import Profile from './pages/profile/Profile';
import Main from './pages/main/Main'
import Statistics from "./pages/statistics/Statistics";

const App = () => {

  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/login"  component={Entrance} />
        <Route path="/register" component={Register} />
        <Route path="/profile" component={Profile} />
        <Route path="/statistics" component={Statistics} />
      </Switch>
    </Router>
  );
};

export default App;
