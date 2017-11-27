import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { Redirect, Switch, Route } from 'react-router-dom';
import { routes } from '../../router';
// Components
import SetupConnect from './SetupConnect';

export const setupRoutes = {
  SENSORS: '/sensoren',
  CALIBRATION: '/kalibratie',
  ADMIN: '/admin',
};

const SetupScene = ({ actionStore }) => {
  if(typeof actionStore.sensorsCalibrated !== 'undefined' && actionStore.sensorsCalibrated === actionStore.sensorsConnected) {
    return <Redirect to='/main' />
  }

  return (
    <Switch>
      <Route from={routes.SETUP} component={SetupConnect} exact />
      <Route path={`${routes.SETUP}${setupRoutes.SENSORS}`} component={() => <div>Stap 1 - Sensoren</div>} />
      <Route path={`${routes.SETUP}${setupRoutes.CALIBRATION}`} component={() => <div>Stap 2 - Kalibratie</div>} />
      <Route path={`${routes.SETUP}${setupRoutes.ADMIN}`} component={() => <div>Admin</div>} />
    </Switch>
  );
};

SetupScene.propTypes = {
  actionStore: PropTypes.shape({
    sensorsCalibrated: PropTypes.number,
    sensorsConnected: PropTypes.number,
  }).isRequired,
};

export default inject('actionStore')(observer(SetupScene));
