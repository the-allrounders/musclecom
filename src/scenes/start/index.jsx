import React from 'react';
import { Redirect } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
// import { toJS } from 'mobx';
// Components
import Loading from './Loading';

const StartScene = ({ actionStore }) => {
  // console.log(toJS(actionStore.calibrationInfo));

  // No data is received yet...
  if(typeof actionStore.calibrationInfo === 'undefined') {
    return <Loading>Connecting...</Loading>;
  }

  // Calibration has yet to be done...
  if(actionStore.calibrationInfo.length === 0) {
    return <Redirect to={'/setup'} />;
  }

  // Redirect to main scene
  return <Redirect to={'/main'} />;
};

StartScene.propTypes = {
  actionStore: PropTypes.shape({
    calibrationInfo: PropTypes.array,
  }).isRequired,
};

export default inject('actionStore')(observer(StartScene));
