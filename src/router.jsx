import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import scenes from './scenes';

const Router = () => (
  <Switch>
    <Redirect exact from={'/'} to={'/main'} />
    <Route path={'/main'} component={scenes.MainScene} />
    <Route path={'/mario'} component={scenes.MarioScene} />
    <Route path={'/menu'} component={scenes.MenuScene} />
    <Route path={'/setup'} component={scenes.SetupScene} />
    <Route path={'/settings'} component={scenes.SettingsScene} />
  </Switch>
);

export default Router;
