import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Entrance from './Entrance';
import Register from './Register';

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Entrance} />
        <Route path="/register" component={Register} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
