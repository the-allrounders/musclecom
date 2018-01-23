import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Reboot } from 'material-ui';
import { observer } from 'mobx-react';
import { actionStore } from './stores';
import scenes from './components';

export const routes = {
  SCREEN: '/',
  REMOTE: '/admin',
};

const Router = () => {
  const ScreenScene =
    actionStore.step < 3 ? scenes.SetupScene : scenes.MenuScene;
  const RemoteScene =
    actionStore.step < 3 ? scenes.RemoteSetupScene : scenes.RemoteSettingsScene;

  return (
    <main style={{ height: '100%' }}>
      <Reboot />
      <Switch>
        <Route path={routes.REMOTE} component={RemoteScene} />
        <Route component={ScreenScene} />
      </Switch>
    </main>
  );
};

export default observer(Router);
