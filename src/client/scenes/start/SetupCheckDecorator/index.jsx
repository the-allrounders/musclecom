import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
// Components
import Loading from './Loading';

const setupCheckDecorator = InnerComponent => {
  const _HOC = ({ actionStore }) => {
    if (typeof actionStore.sensorsCalibrated === 'undefined') {
      return <Loading>Connecting...</Loading>;
    }

    // Calibration has yet to be done...
    if (
      true ||
      actionStore.sensorsCalibrated !== actionStore.sensorsConnected
    ) {
      return <Redirect to="/setup" />;
    }

    return <InnerComponent {...this.props} />;
  };

  _HOC.propTypes = {
    actionStore: PropTypes.shape({
      sensorsCalibrated: PropTypes.number,
      sensorsConnected: PropTypes.number,
    }).isRequired,
  };

  return inject('actionStore')(observer(_HOC));
};

export default setupCheckDecorator;
