import React from 'react';
import { inject, observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';

const SetupScene = ({ actionStore }) => {
  if(actionStore.sensorsCalibrated === actionStore.sensorsConnected) {
    return <Redirect to={'/main'} />
  }

  return (
    'Setup'
  );
};

export default inject('actionStore')(observer(SetupScene));
