import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import scenes from './scenes';

const Router = () => (
  <Switch>
    <Redirect exact from={'/'} to={'/main'} />
    <Route path={'/admin'} component={scenes.AdminScene} />
    <Route path={'/main'} component={scenes.MainScene} />
    <Route path={'/mario'} component={scenes.MarioScene} />
    <Route path={'/menu'} component={scenes.MenuScene} />
  </Switch>
);

export default Router;