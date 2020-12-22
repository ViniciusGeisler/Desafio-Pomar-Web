import React from 'react';

import { Switch } from 'react-router-dom';

import Route from './Route';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Trees from '../pages/Trees';
import Species from '../pages/Species';
import TreesGroups from '../pages/TreesGroups';
import Harvest from '../pages/Harvest';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/signup" exact component={SignUp} />
      <Route path="/trees" isPrivate component={Trees} />
      <Route path="/species" isPrivate component={Species} />
      <Route path="/trees-groups" isPrivate component={TreesGroups} />
      <Route path="/harvest" isPrivate component={Harvest} />
    </Switch>
  );
};

export default Routes;