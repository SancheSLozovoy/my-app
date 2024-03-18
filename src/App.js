// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Entrance from './Entrance';
import Register from './Register';
import Profile from './Profile';
import Main from './Main'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Entrance} />
        <Route path="/register" component={Register} />
        <Route path="/profile" component={Profile} />
        <Route path="/main" component={Main} />
        
      </Switch>
    </Router>
  );
};

export default App;
