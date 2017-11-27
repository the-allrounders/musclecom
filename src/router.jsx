import React from 'react';
import { Switch, Route } from 'react-router-dom';
import scenes from './scenes';

export const routes = {
  START: '/',
  MAIN: '/main',
  MARIO: '/mario',
  MENU: '/menu',
  SETUP: '/setup',
  SETTINGS: '/settings',
};

const Router = () => (
  <Switch>
    <Route path={routes.START} component={scenes.StartScene} exact />
    <Route path={routes.MAIN} component={scenes.MainScene} />
    <Route path={routes.MARIO} component={scenes.MarioScene} />
    <Route path={routes.MENU} component={scenes.MenuScene} />
    <Route path={routes.SETUP} component={scenes.SetupScene} />
    <Route path={routes.SETTINGS} component={scenes.SettingsScene} />
  </Switch>
);

export default Router;
