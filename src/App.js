import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Entrance from './Entrance';
import Register from './Register';

const App = () => {
  return (
    <Switch>
      <Route path="/" exact component={Entrance} />
      <Route path="/register" component={Register} />
    </Switch>
  );
}

export default App;
