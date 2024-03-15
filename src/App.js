import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Entrance from './Entrance';
import Register from './Register';
import Profile from './Profile'

const App = () => {
  return (
    <Switch>
      <Route path="/" exact component={Entrance} />
      <Route path="/register" component={Register} />
      <Route path='/profile' component={Profile}/>
    </Switch>
  );
}

export default App;
