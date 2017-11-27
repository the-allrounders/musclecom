import React from 'react';
import { Switch, Route } from 'react-router-dom';
import scenes from './scenes';

const Router = () => (
  <Switch>
    <Route path={'/'} component={scenes.StartScene} exact />
    <Route path={'/main'} component={scenes.MainScene} />
    <Route path={'/mario'} component={scenes.MarioScene} />
    <Route path={'/menu'} component={scenes.MenuScene} />
    <Route path={'/setup'} component={scenes.SetupScene} />
    <Route path={'/settings'} component={scenes.SettingsScene} />
  </Switch>
);

export default Router;
