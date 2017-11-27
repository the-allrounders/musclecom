import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import setupCheckDecorator from './SetupCheckDecorator';
// import { toJS } from 'mobx';

const StartScene = () => 
  // console.log(toJS(actionStore.calibrationInfo));

  // No data is received yet...
   <Redirect to={'/main'} />;

StartScene.propTypes = {
  actionStore: PropTypes.shape({
    calibrationInfo: PropTypes.array,
  }).isRequired,
};

export default setupCheckDecorator(StartScene);
